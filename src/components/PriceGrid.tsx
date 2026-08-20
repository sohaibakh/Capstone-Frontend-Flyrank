"use client";

import { useState } from "react";
import { ShoppingListing } from "@/lib/shopping";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { StoreIcon } from "@/components/icons/StoreIcon";
import { TruckIcon } from "@/components/icons/TruckIcon";

interface PriceGridProps {
  listings: ShoppingListing[];
}

const riskColor = {
  Low: "text-[#047a46]",
  Medium: "text-[#0052ff]",
  High: "text-[#cf202f]",
};

const verdictColor = {
  Recommended: "text-[#047a46]",
  "Verify Seller": "text-[#0052ff]",
  Wait: "text-[#5b616e]",
  Avoid: "text-[#cf202f]",
};

export default function PriceGrid({ listings }: PriceGridProps) {
  const listSignature = listings.map((listing) => listing.id).join("|");
  const [pagination, setPagination] = useState({ signature: listSignature, count: 6 });
  const visibleCount = pagination.signature === listSignature ? pagination.count : 6;
  const visibleListings = listings.slice(0, visibleCount);
  const remainingCount = Math.max(0, listings.length - visibleCount);

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="cb-display text-4xl text-[#0a0b0d]">Country-wise trusted listings</h2>
          <p className="mt-2 text-sm text-[#5b616e]">Sorted by country first, then platform and price.</p>
        </div>
        <span className="rounded-[100px] bg-[#eef0f3] px-4 py-2 text-xs font-semibold text-[#0a0b0d]">
          Showing {Math.min(visibleCount, listings.length)} of {listings.length} normalized results
        </span>
      </div>

      <div className="cb-stagger grid gap-4 lg:grid-cols-2">
        {listings.length === 0 && (
          <div className="cb-card col-span-full p-8 text-center">
            <h3 className="text-lg font-semibold text-[#0a0b0d]">No listings match these filters</h3>
            <p className="mt-2 text-sm text-[#5b616e]">Try lowering the trust threshold, adding another country, or allowing more seller risk.</p>
          </div>
        )}
        {visibleListings.map((listing) => (
          <article key={listing.id} className="cb-card p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-[100px] bg-[#eef0f3] px-3 py-1 text-xs font-semibold text-[#0a0b0d]">
                    {listing.countryName}
                  </span>
                  {listing.isLowestInCountry && (
                    <span className="rounded-[100px] bg-[#0052ff] px-3 py-1 text-xs font-semibold text-white">
                      Lowest in country
                    </span>
                  )}
                  {listing.isLowestOverall && (
                    <span className="rounded-[100px] bg-[#0a0b0d] px-3 py-1 text-xs font-semibold text-white">
                      Lowest overall
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-[#0a0b0d]">{listing.title}</h3>
                <p className="mt-2 text-sm text-[#5b616e]">
                  {listing.platform} · Seller: {listing.seller}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="cb-number text-3xl text-[#0a0b0d]">{listing.priceDisplay}</p>
                <p className={`mt-1 text-sm font-semibold ${verdictColor[listing.verdict]}`}>{listing.verdict}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-y border-[#dee1e6] py-5 sm:grid-cols-4">
              <Metric label="Match" value={`${listing.productMatchConfidence}%`} />
              <Metric label="Site trust" value={`${listing.siteTrustScore}/100`} />
              <Metric label="Seller risk" value={listing.sellerRisk} color={riskColor[listing.sellerRisk]} />
              <Metric label="Warranty" value={listing.warrantyRisk} color={riskColor[listing.warrantyRisk]} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
              <div>
                <p className="text-sm leading-6 text-[#5b616e]">{listing.trustSummary}</p>
                <ul className="mt-3 space-y-2">
                  {listing.evidence.slice(0, 3).map((item, index) => (
                    <li key={`${listing.id}-evidence-${index}`} className="flex gap-2 text-xs leading-5 text-[#5b616e]">
                      <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0052ff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#dee1e6] bg-[#f7f7f7] p-4">
                <div className="flex items-center gap-2 text-xs text-[#5b616e]">
                  <StoreIcon className="h-4 w-4 text-[#0052ff]" />
                  <span>{listing.domain}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#5b616e]">
                  <TruckIcon className="h-4 w-4 text-[#5b616e]" />
                  <span>{listing.delivery || "Delivery not listed"}</span>
                </div>
                <p className="cb-number mt-3 text-sm text-[#0a0b0d]">
                  {listing.rating ? `${listing.rating} rating` : "No rating"}{" "}
                  {listing.reviewsCount ? `(${listing.reviewsCount.toLocaleString("en-US")})` : ""}
                </p>
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cb-action mt-4 inline-flex h-10 w-full items-center justify-center rounded-[100px] bg-[#0052ff] px-4 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]"
                >
                  View listing
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {remainingCount > 0 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setPagination({ signature: listSignature, count: visibleCount + 8 })}
            className="cb-action h-12 rounded-[100px] bg-[#eef0f3] px-6 text-sm font-semibold text-[#0a0b0d] hover:bg-[#dee1e6]"
          >
            Show more results ({remainingCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
}

function Metric({ label, value, color = "text-[#0a0b0d]" }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <p className="text-xs text-[#5b616e]">{label}</p>
      <p className={`cb-number mt-1 text-base ${color}`}>{value}</p>
    </div>
  );
}
