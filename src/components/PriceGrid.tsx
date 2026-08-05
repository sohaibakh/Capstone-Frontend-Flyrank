"use client";

import { StoreDeal } from "@/app/api/compare/route";
import { StoreIcon, TruckIcon } from "@/components/Icons";

interface PriceGridProps {
  deals: StoreDeal[];
  productName: string;
}

export default function PriceGrid({ deals }: PriceGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
          <StoreIcon className="w-5 h-5 text-[#0099ff]" />
          <span>Multi-Store Live Price Comparison</span>
        </h2>
        <span className="text-xs text-[#a6a6a6] font-mono">
          Updated Real-Time
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((deal, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl p-5 transition-all flex flex-col justify-between ${
              deal.isLowestPrice
                ? "bg-[#090909] border border-[#0099ff]/50 shadow-[0_0_15px_rgba(0,153,255,0.25)]"
                : "bg-[#090909] border border-white/10 hover:border-white/20"
            }`}
          >
            {deal.isLowestPrice && (
              <div className="absolute -top-3 right-4 rounded-full bg-[#0099ff] text-white px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider shadow-md">
                Best Price
              </div>
            )}

            <div>
              {/* Store Name & Rating */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-white">{deal.store}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#a6a6a6] mt-0.5">
                    <span className="text-amber-400 font-semibold">★ {deal.rating}</span>
                    <span>({deal.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <span
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                    deal.inStock
                      ? "bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30"
                      : "bg-white/10 text-[#a6a6a6]"
                  }`}
                >
                  {deal.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Pricing */}
              <div className="my-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    ${deal.price.toFixed(2)}
                  </span>
                  {deal.originalPrice > deal.price && (
                    <span className="text-sm line-through text-[#a6a6a6] font-mono">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {deal.discountPercentage > 0 && (
                  <p className="text-xs font-semibold text-[#0099ff] mt-1">
                    Save {deal.discountPercentage}% (${(deal.originalPrice - deal.price).toFixed(2)})
                  </p>
                )}
                <p className="text-xs text-[#a6a6a6] mt-2 flex items-center gap-1.5">
                  <TruckIcon className="w-3.5 h-3.5 text-[#a6a6a6]" />
                  <span>{deal.shipping}</span>
                </p>
              </div>
            </div>

            {/* Framer Pill CTA Button */}
            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2.5 px-4 rounded-full font-semibold text-xs text-center transition-all ${
                deal.isLowestPrice
                  ? "bg-[#0099ff] text-white hover:opacity-90 shadow-[0_0_12px_rgba(0,153,255,0.3)]"
                  : "bg-white text-black hover:bg-slate-200"
              }`}
            >
              View at {deal.store} &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
