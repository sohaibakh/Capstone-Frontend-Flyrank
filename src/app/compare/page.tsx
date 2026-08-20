import PriceGrid from "@/components/PriceGrid";
import AiInsights from "@/components/AiInsights";
import SpecMatrix from "@/components/SpecMatrix";
import CompareSearchPanel from "@/components/CompareSearchPanel";
import { buildCompareResponse, CompareResponse, ShoppingListing } from "@/lib/shopping";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { TrendingIcon } from "@/components/icons/TrendingIcon";

export const dynamic = "force-dynamic";
export const maxDuration = 10;

const MAX_QUERY_LENGTH = 80;
const MAX_COUNTRIES = 4;

interface ComparePageProps {
  searchParams: Promise<{ q?: string; query?: string; countries?: string; sort?: string; minTrust?: string; risk?: string; condition?: string }>;
}

async function getCompareData(searchQuery: string, countries: string): Promise<CompareResponse> {
  return buildCompareResponse(
    searchQuery.trim().slice(0, MAX_QUERY_LENGTH) || "MacBook Pro M3",
    countries
      .split(",")
      .map((country) => country.trim())
      .filter(Boolean)
      .slice(0, MAX_COUNTRIES)
  );
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || resolvedParams.query || "MacBook Pro M3";
  const countries = resolvedParams.countries || "US,GB,PK";
  const sort = resolvedParams.sort || "country-platform";
  const minTrust = resolvedParams.minTrust || "0";
  const risk = resolvedParams.risk || "all";
  const condition = resolvedParams.condition || "all";
  const data = await getCompareData(query, countries);
  const filteredListings = filterAndSortListings(data.listings, { sort, minTrust, risk, condition });
  const filteredCountryGroups = regroupCountries(data.countryGroups, filteredListings);
  const filteredPlatformGroups = regroupPlatforms(data.platformGroups, filteredListings);

  return (
    <div className="animate-page-in mx-auto w-full max-w-[1200px] space-y-10 pb-16">
      <section className="cb-surface animate-soft-scale p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="mb-4 inline-flex rounded-[100px] bg-white px-4 py-1.5 text-xs font-semibold uppercase text-[#5b616e]">
              {data.category}
            </span>
            <h1 className="cb-display max-w-4xl text-5xl leading-none text-[#0a0b0d] sm:text-6xl">{data.productName}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5b616e]">
              Results are grouped by country and platform. Ratings, seller signals, site reputation, and warranty risk are
              processed into a trust-first buying view.
            </p>
          </div>

          <div className="cb-stagger grid gap-3 sm:grid-cols-3 lg:min-w-[460px]">
            <Stat label="Lowest" value={formatCurrency(data.lowestPrice, data.currency)} />
            <Stat label="Average" value={formatCurrency(data.averagePrice, data.currency)} />
            <Stat label="Countries" value={data.countries.join(", ")} />
          </div>
        </div>
      </section>

      <CompareSearchPanel
        query={query}
        countries={countries.split(",").map((country) => country.trim()).filter(Boolean)}
        sort={sort}
        minTrust={minTrust}
        risk={risk}
        condition={condition}
      />

      <section className="cb-stagger grid gap-4 md:grid-cols-3">
        <SourceCard icon={SearchIcon} label="Shopping retrieval" value={data.datasource.shopping} />
        <SourceCard icon={TrendingIcon} label="Trust analysis" value={data.datasource.trustAgent} />
        <SourceCard icon={SearchIcon} label="Generated" value={new Date(data.generatedAt).toLocaleString()} />
      </section>

      <AiInsights aiAudit={data.aiAudit} datasource={data.datasource} />
      <PriceGrid listings={filteredListings} />
      <SpecMatrix countryGroups={filteredCountryGroups} platformGroups={filteredPlatformGroups} />
    </div>
  );
}

function filterAndSortListings(
  listings: ShoppingListing[],
  filters: { sort: string; minTrust: string; risk: string; condition: string }
): ShoppingListing[] {
  const minimumTrust = Number.parseInt(filters.minTrust, 10) || 0;
  const riskRank = { Low: 0, Medium: 1, High: 2 };

  return listings
    .filter((listing) => listing.siteTrustScore >= minimumTrust)
    .filter((listing) => {
      if (filters.risk === "Low") return listing.sellerRisk === "Low";
      if (filters.risk === "Medium") return listing.sellerRisk === "Low" || listing.sellerRisk === "Medium";
      return true;
    })
    .filter((listing) => filters.condition === "all" || listing.condition === filters.condition)
    .sort((a, b) => {
      if (filters.sort === "price-low") return a.price - b.price;
      if (filters.sort === "trust-high") return b.siteTrustScore - a.siteTrustScore || a.price - b.price;
      if (filters.sort === "risk-low") return riskRank[a.sellerRisk] - riskRank[b.sellerRisk] || riskRank[a.warrantyRisk] - riskRank[b.warrantyRisk];
      return a.country.localeCompare(b.country) || a.platform.localeCompare(b.platform) || a.price - b.price;
    });
}

function regroupCountries(originalGroups: CompareResponse["countryGroups"], listings: ShoppingListing[]): CompareResponse["countryGroups"] {
  return originalGroups
    .map((group) => {
      const groupListings = listings.filter((listing) => listing.country === group.country);
      const prices = groupListings.map((listing) => listing.price);

      return {
        ...group,
        listings: groupListings,
        lowestPrice: prices.length ? Math.min(...prices) : 0,
        averagePrice: prices.length ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : 0,
      };
    })
    .filter((group) => group.listings.length > 0);
}

function regroupPlatforms(originalGroups: CompareResponse["platformGroups"], listings: ShoppingListing[]): CompareResponse["platformGroups"] {
  return originalGroups
    .map((group) => {
      const platformListings = listings.filter((listing) => listing.platform === group.platform);
      const prices = platformListings.map((listing) => listing.price);

      return {
        ...group,
        listingsCount: platformListings.length,
        countries: Array.from(new Set(platformListings.map((listing) => listing.country))),
        averagePrice: prices.length ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : 0,
        averageTrustScore: platformListings.length
          ? Math.round(platformListings.reduce((sum, listing) => sum + listing.siteTrustScore, 0) / platformListings.length)
          : 0,
      };
    })
    .filter((group) => group.listingsCount > 0);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#dee1e6] bg-white p-5 shadow-sm">
      <p className="text-xs text-[#5b616e]">{label}</p>
      <p className="cb-number mt-2 text-xl text-[#0a0b0d]">{value}</p>
    </div>
  );
}

function SourceCard({ icon: Icon, label, value }: { icon: typeof SearchIcon; label: string; value: string }) {
  return (
    <div className="cb-card p-5">
      <Icon className="h-5 w-5 text-[#0052ff]" />
      <p className="mt-4 text-xs text-[#5b616e]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#0a0b0d]">{value}</p>
    </div>
  );
}

function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `$${value}`;
  }
}
