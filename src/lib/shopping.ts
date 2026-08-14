export type RiskLevel = "Low" | "Medium" | "High";
export type TrustVerdict = "Recommended" | "Verify Seller" | "Wait" | "Avoid";

export interface TrustSignal {
  productMatchConfidence: number;
  siteTrustScore: number;
  sellerRisk: RiskLevel;
  warrantyRisk: RiskLevel;
  fakeDiscountRisk: RiskLevel;
  verdict: TrustVerdict;
  trustSummary: string;
  evidence: string[];
}

export interface ShoppingListing extends TrustSignal {
  id: string;
  title: string;
  country: string;
  countryName: string;
  platform: string;
  seller: string;
  domain: string;
  url: string;
  price: number;
  priceDisplay: string;
  currency: string;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  delivery?: string;
  condition: string;
  imageUrl?: string;
  offers?: string;
  position: number;
  reputationQueries: string[];
  reputationSnippets: ReputationSnippet[];
  flags: string[];
  isLowestInCountry?: boolean;
  isLowestOverall?: boolean;
}

export interface ReputationSnippet {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

export interface CountryGroup {
  country: string;
  countryName: string;
  currency: string;
  averagePrice: number;
  lowestPrice: number;
  listings: ShoppingListing[];
}

export interface PlatformGroup {
  platform: string;
  averageTrustScore: number;
  averagePrice: number;
  listingsCount: number;
  countries: string[];
  verdict: TrustVerdict;
}

export interface AiAudit {
  verdict: "BUY NOW" | "VERIFY SELLER" | "WAIT" | "AVOID";
  confidenceScore: number;
  summary: string;
  fakeDiscountReport: string;
  sellerReputationReport: string;
  warrantyRiskReport: string;
  recommendedAction: string;
}

export interface CompareResponse {
  query: string;
  productName: string;
  category: string;
  generatedAt: string;
  lowestPrice: number;
  averagePrice: number;
  currency: string;
  countries: string[];
  listings: ShoppingListing[];
  countryGroups: CountryGroup[];
  platformGroups: PlatformGroup[];
  aiAudit: AiAudit;
  datasource: {
    shopping: "Live shopping index" | "Demo shopping index";
    trustAgent: "AI trust engine" | "Heuristic trust engine";
  };
}

interface SerperShoppingItem {
  title?: string;
  source?: string;
  link?: string;
  price?: string;
  delivery?: string;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  offers?: string;
  productId?: string;
  position?: number;
}

interface SerperOrganicItem {
  title?: string;
  link?: string;
  snippet?: string;
  source?: string;
}

interface SerperResponse {
  shopping?: SerperShoppingItem[];
  organic?: SerperOrganicItem[];
}

const COUNTRY_OPTIONS: Record<string, { name: string; currency: string; gl: string; hl: string }> = {
  US: { name: "United States", currency: "USD", gl: "us", hl: "en" },
  GB: { name: "United Kingdom", currency: "GBP", gl: "gb", hl: "en" },
  CA: { name: "Canada", currency: "CAD", gl: "ca", hl: "en" },
  AU: { name: "Australia", currency: "AUD", gl: "au", hl: "en" },
  PK: { name: "Pakistan", currency: "PKR", gl: "pk", hl: "en" },
};

const TRUSTED_PLATFORMS = ["amazon", "apple", "best buy", "walmart", "target", "b&h", "ebay", "currys", "john lewis"];
const WARRANTY_WARNINGS = ["renewed", "refurbished", "used", "open box", "international", "seller warranty", "no warranty"];

export async function buildCompareResponse(query: string, countries: string[]): Promise<CompareResponse> {
  const selectedCountries = normalizeCountries(countries);
  const serperKey = process.env.SERPER_API_KEY;
  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  const rawListings = serperKey
    ? await fetchSerperListings(query, selectedCountries, serperKey)
    : createDemoListings(query, selectedCountries);

  const listingsWithReputation = serperKey
    ? await attachReputationSnippets(rawListings, serperKey)
    : rawListings;

  const trustedListings = grokKey
    ? await analyzeWithGrok(query, listingsWithReputation, grokKey)
    : listingsWithReputation.map((listing) => ({ ...listing, ...scoreListingHeuristically(query, listing) }));

  const listings = markLowestPrices(trustedListings);
  const countryGroups = groupByCountry(listings);
  const platformGroups = groupByPlatform(listings);
  const prices = listings.map((listing) => listing.price).filter((price) => price > 0);
  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const averagePrice = prices.length ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : 0;

  return {
    query,
    productName: formatTitle(query),
    category: inferCategory(query),
    generatedAt: new Date().toISOString(),
    lowestPrice,
    averagePrice,
    currency: countryGroups[0]?.currency || "USD",
    countries: selectedCountries,
    listings,
    countryGroups,
    platformGroups,
    aiAudit: buildAiAudit(listings, lowestPrice, averagePrice),
    datasource: {
      shopping: serperKey ? "Live shopping index" : "Demo shopping index",
      trustAgent: grokKey ? "AI trust engine" : "Heuristic trust engine",
    },
  };
}

function normalizeCountries(countries: string[]): string[] {
  const normalized = countries
    .map((country) => country.trim().toUpperCase())
    .filter((country) => COUNTRY_OPTIONS[country]);

  return normalized.length ? Array.from(new Set(normalized)).slice(0, 4) : ["US", "GB", "PK"];
}

async function fetchSerperListings(query: string, countries: string[], apiKey: string): Promise<ShoppingListing[]> {
  const batches = await Promise.all(
    countries.map(async (country) => {
      const locale = COUNTRY_OPTIONS[country];
      const response = await fetch("https://google.serper.dev/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({ q: query, gl: locale.gl, hl: locale.hl, num: 10 }),
      });

      if (!response.ok) {
        throw new Error(`Serper shopping request failed for ${country}`);
      }

      const data = (await response.json()) as SerperResponse;
      return (data.shopping || []).slice(0, 8).map((item, index) => normalizeSerperItem(item, country, index));
    })
  );

  return batches.flat();
}

async function attachReputationSnippets(listings: ShoppingListing[], apiKey: string): Promise<ShoppingListing[]> {
  const uniqueDomains = Array.from(new Set(listings.map((listing) => listing.domain))).slice(0, 8);
  const snippetMap = new Map<string, ReputationSnippet[]>();

  await Promise.all(
    uniqueDomains.map(async (domain) => {
      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({ q: `${domain} reviews complaints warranty return policy`, num: 4 }),
      });

      if (!response.ok) return;
      const data = (await response.json()) as SerperResponse;
      snippetMap.set(
        domain,
        (data.organic || []).slice(0, 4).map((item) => ({
          title: item.title || "Reputation result",
          link: item.link || "",
          snippet: item.snippet || "",
          source: item.source || domain,
        }))
      );
    })
  );

  return listings.map((listing) => ({
    ...listing,
    reputationSnippets: snippetMap.get(listing.domain) || [],
  }));
}

function normalizeSerperItem(item: SerperShoppingItem, country: string, index: number): ShoppingListing {
  const url = item.link || "";
  const source = item.source || getDomain(url) || "Unknown seller";
  const price = parsePrice(item.price || "");
  const locale = COUNTRY_OPTIONS[country];
  const domain = getDomain(url) || source.toLowerCase();
  const providerId = item.productId || hashString(`${item.title}${url}`).toString();

  return {
    id: `${country}-${index}-${domain}-${providerId}`,
    title: item.title || "Untitled product listing",
    country,
    countryName: locale.name,
    platform: normalizePlatform(source, url),
    seller: source,
    domain,
    url,
    price,
    priceDisplay: item.price || formatMoney(price, locale.currency),
    currency: locale.currency,
    rating: item.rating,
    reviewsCount: item.ratingCount,
    delivery: item.delivery,
    condition: inferCondition(item.title || ""),
    imageUrl: item.imageUrl,
    offers: item.offers,
    position: item.position || index + 1,
    reputationQueries: [`${source} reviews`, `${getDomain(url)} complaints`, `${getDomain(url)} warranty return policy`],
    reputationSnippets: [],
    flags: [],
    ...neutralTrustSignal(),
  };
}

async function analyzeWithGrok(query: string, listings: ShoppingListing[], apiKey: string): Promise<ShoppingListing[]> {
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROK_MODEL || "latest",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a shopping trust agent. Return strict JSON only. Do not invent facts beyond the provided listings and reputation snippets.",
          },
          {
            role: "user",
            content: JSON.stringify({
              task:
                "Score each listing for product match, seller/site reputation, fake discount risk, and warranty risk. Evidence must reference supplied fields or snippets.",
              requestedProduct: query,
              allowedVerdicts: ["Recommended", "Verify Seller", "Wait", "Avoid"],
              allowedRiskLevels: ["Low", "Medium", "High"],
              outputShape: {
                listings: [
                  {
                    id: "string",
                    productMatchConfidence: "0-100 number",
                    siteTrustScore: "0-100 number",
                    sellerRisk: "Low|Medium|High",
                    warrantyRisk: "Low|Medium|High",
                    fakeDiscountRisk: "Low|Medium|High",
                    verdict: "Recommended|Verify Seller|Wait|Avoid",
                    trustSummary: "short sentence",
                    evidence: ["2-4 short evidence strings"],
                    flags: ["short warning labels"],
                  },
                ],
              },
              listings: listings.map(toGrokListing),
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Grok request failed");
    }

    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content) as { listings?: Partial<TrustSignal & { id: string; flags: string[] }>[] };
    const signalMap = new Map((parsed.listings || []).map((item) => [item.id, item]));

    return listings.map((listing) => {
      const grokSignal = signalMap.get(listing.id);
      const fallback = scoreListingHeuristically(query, listing);

      return {
        ...listing,
        ...fallback,
        ...sanitizeTrustSignal(grokSignal),
        flags: grokSignal?.flags?.length ? grokSignal.flags.slice(0, 4) : fallback.flags,
      };
    });
  } catch {
    return listings.map((listing) => ({ ...listing, ...scoreListingHeuristically(query, listing) }));
  }
}

function toGrokListing(listing: ShoppingListing) {
  return {
    id: listing.id,
    title: listing.title,
    country: listing.countryName,
    platform: listing.platform,
    seller: listing.seller,
    domain: listing.domain,
    price: listing.priceDisplay,
    rating: listing.rating,
    reviewsCount: listing.reviewsCount,
    delivery: listing.delivery,
    condition: listing.condition,
    url: listing.url,
    reputationSnippets: listing.reputationSnippets,
  };
}

function sanitizeTrustSignal(signal?: Partial<TrustSignal>): Partial<TrustSignal> {
  if (!signal) return {};

  return {
    productMatchConfidence: clampScore(signal.productMatchConfidence),
    siteTrustScore: clampScore(signal.siteTrustScore),
    sellerRisk: sanitizeRisk(signal.sellerRisk),
    warrantyRisk: sanitizeRisk(signal.warrantyRisk),
    fakeDiscountRisk: sanitizeRisk(signal.fakeDiscountRisk),
    verdict: sanitizeVerdict(signal.verdict),
    trustSummary: signal.trustSummary || undefined,
    evidence: Array.isArray(signal.evidence) ? signal.evidence.slice(0, 4) : undefined,
  };
}

function scoreListingHeuristically(query: string, listing: ShoppingListing): TrustSignal & { flags: string[] } {
  const title = listing.title.toLowerCase();
  const queryTokens = query.toLowerCase().split(/\s+/).filter((token) => token.length > 2);
  const matchedTokens = queryTokens.filter((token) => title.includes(token)).length;
  const productMatchConfidence = queryTokens.length ? Math.round((matchedTokens / queryTokens.length) * 100) : 70;
  const trustedPlatform = TRUSTED_PLATFORMS.some((platform) => `${listing.platform} ${listing.domain}`.toLowerCase().includes(platform));
  const warrantyWarning = WARRANTY_WARNINGS.some((warning) => title.includes(warning) || listing.condition.toLowerCase().includes(warning));
  const suspiciousLowPrice = listing.originalPrice ? listing.price < listing.originalPrice * 0.65 : false;
  const siteTrustScore = trustedPlatform ? 86 : listing.reputationSnippets.length ? 68 : 55;
  const sellerRisk = trustedPlatform ? "Low" : listing.reputationSnippets.length ? "Medium" : "High";
  const warrantyRisk = warrantyWarning ? "High" : listing.delivery?.toLowerCase().includes("free") ? "Low" : "Medium";
  const fakeDiscountRisk = suspiciousLowPrice ? "High" : listing.price > 0 ? "Medium" : "High";
  const verdict = productMatchConfidence < 55 || sellerRisk === "High" ? "Verify Seller" : warrantyRisk === "High" ? "Wait" : "Recommended";
  const flags = [
    ...(productMatchConfidence < 70 ? ["Product match needs review"] : []),
    ...(sellerRisk === "High" ? ["Unknown seller reputation"] : []),
    ...(warrantyRisk === "High" ? ["Warranty terms may be risky"] : []),
    ...(fakeDiscountRisk === "High" ? ["Price appears unusually low"] : []),
  ];

  return {
    productMatchConfidence,
    siteTrustScore,
    sellerRisk,
    warrantyRisk,
    fakeDiscountRisk,
    verdict,
    trustSummary: trustedPlatform
      ? "Known marketplace or retailer with a generally reliable listing context."
      : "Seller reputation should be verified before purchase.",
    evidence: [
      `Product title matched ${matchedTokens} of ${Math.max(queryTokens.length, 1)} important query terms.`,
      trustedPlatform ? "Platform appears in the trusted retailer list." : "Platform is not in the trusted retailer list.",
      warrantyWarning ? "Listing language includes refurbished, used, or warranty warning terms." : "No obvious warranty warning terms were detected.",
    ],
    flags,
  };
}

function createDemoListings(query: string, countries: string[]): ShoppingListing[] {
  const base = Math.floor(Math.abs(hashString(query)) % 500) + 699;
  const demoPlatforms = [
    { platform: "Amazon", seller: "Amazon marketplace seller", domain: "amazon.com", multiplier: 1 },
    { platform: "Best Buy", seller: "Best Buy", domain: "bestbuy.com", multiplier: 1.04 },
    { platform: "eBay", seller: "Certified refurbished seller", domain: "ebay.com", multiplier: 0.82, condition: "Certified refurbished" },
    { platform: "Third-party store", seller: "ABC Discount Warehouse", domain: "abc-discounts.example", multiplier: 0.68, condition: "International seller warranty" },
  ];

  return countries.flatMap((country, countryIndex) => {
    const locale = COUNTRY_OPTIONS[country];
    return demoPlatforms.map((item, index) => {
      const price = Math.round(base * item.multiplier * (1 + countryIndex * 0.08));
      const listing: ShoppingListing = {
        id: `${country}-${index}-${hashString(`${query}${item.domain}`)}`,
        title: `${formatTitle(query)} ${index === 3 ? "Limited import deal" : "official listing"}`,
        country,
        countryName: locale.name,
        platform: item.platform,
        seller: item.seller,
        domain: item.domain,
        url: `https://${item.domain}`,
        price,
        priceDisplay: formatMoney(price, locale.currency),
        currency: locale.currency,
        originalPrice: Math.round(price * 1.18),
        rating: index === 3 ? 3.8 : 4.6,
        reviewsCount: index === 3 ? 42 : 1200 + index * 330,
        delivery: index === 3 ? "Shipping and returns unclear" : "Free shipping available",
        condition: item.condition || "New",
        imageUrl: "",
        offers: index === 0 ? "10+" : "3",
        position: index + 1,
        reputationQueries: [`${item.seller} reviews`, `${item.domain} complaints`, `${item.domain} warranty`],
        reputationSnippets: [
          {
            title: `${item.platform} reputation signal`,
            link: `https://${item.domain}`,
            snippet: index === 3 ? "Limited public review information found for this seller." : "Known retailer or marketplace result.",
            source: item.domain,
          },
        ],
        flags: [],
        ...neutralTrustSignal(),
      };

      return { ...listing, ...scoreListingHeuristically(query, listing) };
    });
  });
}

function markLowestPrices(listings: ShoppingListing[]): ShoppingListing[] {
  const lowestOverall = Math.min(...listings.map((listing) => listing.price));
  const lowestByCountry = new Map<string, number>();

  listings.forEach((listing) => {
    const currentLowest = lowestByCountry.get(listing.country) || Number.POSITIVE_INFINITY;
    lowestByCountry.set(listing.country, Math.min(currentLowest, listing.price));
  });

  return listings
    .map((listing) => ({
      ...listing,
      isLowestOverall: listing.price === lowestOverall,
      isLowestInCountry: listing.price === lowestByCountry.get(listing.country),
    }))
    .sort((a, b) => a.country.localeCompare(b.country) || a.platform.localeCompare(b.platform) || a.price - b.price);
}

function groupByCountry(listings: ShoppingListing[]): CountryGroup[] {
  return Array.from(new Set(listings.map((listing) => listing.country))).map((country) => {
    const countryListings = listings.filter((listing) => listing.country === country).sort((a, b) => a.platform.localeCompare(b.platform));
    const prices = countryListings.map((listing) => listing.price);
    return {
      country,
      countryName: countryListings[0]?.countryName || country,
      currency: countryListings[0]?.currency || "USD",
      averagePrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / Math.max(prices.length, 1)),
      lowestPrice: Math.min(...prices),
      listings: countryListings,
    };
  });
}

function groupByPlatform(listings: ShoppingListing[]): PlatformGroup[] {
  return Array.from(new Set(listings.map((listing) => listing.platform))).map((platform) => {
    const platformListings = listings.filter((listing) => listing.platform === platform);
    const prices = platformListings.map((listing) => listing.price);
    const averageTrustScore = Math.round(
      platformListings.reduce((sum, listing) => sum + listing.siteTrustScore, 0) / Math.max(platformListings.length, 1)
    );

    return {
      platform,
      averageTrustScore,
      averagePrice: Math.round(prices.reduce((sum, price) => sum + price, 0) / Math.max(prices.length, 1)),
      listingsCount: platformListings.length,
      countries: Array.from(new Set(platformListings.map((listing) => listing.country))),
      verdict: averageTrustScore >= 80 ? "Recommended" : averageTrustScore >= 60 ? "Verify Seller" : "Avoid",
    };
  });
}

function buildAiAudit(listings: ShoppingListing[], lowestPrice: number, averagePrice: number): AiAudit {
  const averageTrust = Math.round(listings.reduce((sum, listing) => sum + listing.siteTrustScore, 0) / Math.max(listings.length, 1));
  const riskyListings = listings.filter((listing) => listing.verdict === "Avoid" || listing.verdict === "Verify Seller");
  const warrantyRisks = listings.filter((listing) => listing.warrantyRisk !== "Low");
  const fakeDiscountRisks = listings.filter((listing) => listing.fakeDiscountRisk === "High");
  const bestListing = listings
    .filter((listing) => listing.verdict === "Recommended")
    .sort((a, b) => a.price - b.price || b.siteTrustScore - a.siteTrustScore)[0];

  return {
    verdict: averageTrust >= 80 && bestListing ? "BUY NOW" : riskyListings.length > listings.length / 2 ? "VERIFY SELLER" : "WAIT",
    confidenceScore: averageTrust || 0,
    summary: bestListing
      ? `${bestListing.platform} in ${bestListing.countryName} is the strongest trusted option at ${bestListing.priceDisplay}.`
      : "The agent found price options, but seller and warranty signals need verification before purchase.",
    fakeDiscountReport: fakeDiscountRisks.length
      ? `${fakeDiscountRisks.length} listing(s) look unusually discounted compared with the market spread.`
      : `Lowest price is ${formatMoney(lowestPrice, listings[0]?.currency || "USD")} versus an average of ${formatMoney(averagePrice, listings[0]?.currency || "USD")}.`,
    sellerReputationReport: `${riskyListings.length} of ${listings.length} listing(s) require seller reputation review.`,
    warrantyRiskReport: `${warrantyRisks.length} listing(s) include non-low warranty risk signals such as refurbished, import, unclear return, or seller warranty language.`,
    recommendedAction: bestListing
      ? `Prefer ${bestListing.platform} unless a lower listing can prove official warranty and seller history.`
      : "Shortlist only listings with clear seller identity, warranty terms, and product match evidence.",
  };
}

function neutralTrustSignal(): TrustSignal {
  return {
    productMatchConfidence: 0,
    siteTrustScore: 0,
    sellerRisk: "Medium",
    warrantyRisk: "Medium",
    fakeDiscountRisk: "Medium",
    verdict: "Verify Seller",
    trustSummary: "Awaiting trust analysis.",
    evidence: [],
  };
}

function parsePrice(value: string): number {
  const numeric = value.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(numeric);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function normalizePlatform(source: string, url: string): string {
  const sourceName = source.split(" - ")[0].trim();
  if (sourceName) return sourceName;
  const domain = getDomain(url).split(".")[0];
  return domain ? formatTitle(domain) : "Unknown platform";
}

function inferCondition(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("refurbished") || lower.includes("renewed")) return "Refurbished";
  if (lower.includes("used")) return "Used";
  if (lower.includes("open box")) return "Open box";
  return "New";
}

function inferCategory(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("macbook") || lower.includes("laptop")) return "Computers";
  if (lower.includes("iphone") || lower.includes("phone")) return "Smartphones";
  if (lower.includes("headphone") || lower.includes("sony wh")) return "Audio";
  if (lower.includes("switch") || lower.includes("playstation") || lower.includes("xbox")) return "Gaming";
  return "Shopping intelligence";
}

function formatTitle(str: string): string {
  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatMoney(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `$${value}`;
  }
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function clampScore(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function sanitizeRisk(value: unknown): RiskLevel | undefined {
  return value === "Low" || value === "Medium" || value === "High" ? value : undefined;
}

function sanitizeVerdict(value: unknown): TrustVerdict | undefined {
  return value === "Recommended" || value === "Verify Seller" || value === "Wait" || value === "Avoid" ? value : undefined;
}
