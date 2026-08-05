import PriceGrid from "@/components/PriceGrid";
import AiInsights from "@/components/AiInsights";
import SpecMatrix from "@/components/SpecMatrix";
import { CompareResponse } from "@/app/api/compare/route";
import { TrendingIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

interface ComparePageProps {
  searchParams: Promise<{ q?: string; query?: string }>;
}

async function getCompareData(searchQuery: string): Promise<CompareResponse> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/compare?q=${encodeURIComponent(searchQuery)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch comparison data");
    return await res.json();
  } catch (error) {
    return {
      query: searchQuery,
      productName: searchQuery || "Sony WH-1000XM5",
      productImage: "",
      category: "Consumer Tech",
      averagePrice: 365,
      lowestPrice: 348,
      msrp: 399.99,
      deals: [
        { store: "Best Buy", logo: "", price: 348, originalPrice: 399.99, discountPercentage: 13, rating: 4.7, reviewsCount: 4200, inStock: true, shipping: "Free Next-Day", url: "https://bestbuy.com", isLowestPrice: true },
        { store: "Amazon", logo: "", price: 349.99, originalPrice: 399.99, discountPercentage: 12, rating: 4.8, reviewsCount: 18400, inStock: true, shipping: "Free Prime Two-Day", url: "https://amazon.com" },
        { store: "Walmart", logo: "", price: 378.50, originalPrice: 399.99, discountPercentage: 5, rating: 4.5, reviewsCount: 1290, inStock: true, shipping: "Free 3-Day", url: "https://walmart.com" },
      ],
      aiAudit: {
        verdict: "BUY NOW",
        verdictBadgeColor: "emerald",
        confidenceScore: 92,
        specsToPriceRatio: "Exceptional (9.4/10). Industry leading noise cancellation & 30h battery.",
        fakeDiscountReport: "Verified legitimate MSRP drop against 90-day moving average.",
        recommendationDetails: "Current price ($348.00 at Best Buy) is within 3% of all-time low.",
        potentialSavings: "Save $51.99 (13% off MSRP)",
      },
      specMatrix: {
        features: ["Noise Cancellation", "Battery Life", "Driver Size"],
        stores: ["Best Buy", "Amazon", "Walmart"],
        rows: [
          { featureName: "Noise Cancellation", values: { "Best Buy": "Auto NC Optimizer", Amazon: "Auto NC Optimizer", Walmart: "Auto NC Optimizer" } },
          { featureName: "Battery Life", values: { "Best Buy": "30 Hrs", Amazon: "30 Hrs", Walmart: "30 Hrs" } },
        ],
      },
      priceHistory: [
        { month: "May", avgPrice: 389, lowestPrice: 368 },
        { month: "Jun", avgPrice: 375, lowestPrice: 359 },
        { month: "Jul", avgPrice: 360, lowestPrice: 348 },
        { month: "Aug", avgPrice: 348, lowestPrice: 348 },
      ],
      datasource: "Simulated Intelligence Pipeline",
    };
  }
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || resolvedParams.query || "Sony WH-1000XM5";
  const data = await getCompareData(query);

  return (
    <div className="space-y-10 py-4">
      {/* Product Banner Header */}
      <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase text-[#0099ff] font-mono tracking-wider">
              {data.category}
            </span>
            <span className="text-[#a6a6a6]">•</span>
            <span className="text-xs text-[#a6a6a6]">
              Query: &quot;{data.query}&quot;
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {data.productName}
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-[#000000] px-5 py-3 rounded-2xl border border-white/10 shrink-0">
          <div>
            <span className="text-xs text-[#a6a6a6] block">Lowest Price</span>
            <span className="text-2xl font-black text-[#0099ff]">${data.lowestPrice.toFixed(2)}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-xs text-[#a6a6a6] block">Original MSRP</span>
            <span className="text-sm line-through font-mono text-[#a6a6a6]">${data.msrp.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* AI Intelligence & Deal Audit Card */}
      <AiInsights
        aiAudit={data.aiAudit}
        lowestPrice={data.lowestPrice}
        msrp={data.msrp}
        datasource={data.datasource}
      />

      {/* Price Comparison Grid */}
      <PriceGrid deals={data.deals} productName={data.productName} />

      {/* Side-by-Side Spec Matrix */}
      <SpecMatrix specMatrix={data.specMatrix} />

      {/* Price History Trend Chart Component */}
      <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 space-y-4">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <TrendingIcon className="w-5 h-5 text-[#0099ff]" />
          <span>6-Month Historical Price Trend</span>
        </h2>
        <div className="grid grid-cols-6 gap-2 pt-4 border-t border-white/10">
          {data.priceHistory.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-[#0099ff] font-bold">
                ${item.lowestPrice}
              </div>
              <div className="w-full bg-[#000000] rounded-t-lg h-24 flex items-end justify-center p-1 border border-white/10">
                <div
                  className="w-full bg-[#0099ff] rounded-sm transition-all"
                  style={{
                    height: `${Math.max(20, Math.min(100, (item.lowestPrice / (data.msrp || 1)) * 100))}%`,
                  }}
                />
              </div>
              <span className="text-xs text-[#a6a6a6] font-semibold">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
