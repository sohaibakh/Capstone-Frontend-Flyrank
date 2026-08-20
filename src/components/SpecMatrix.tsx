"use client";

import { CompareResponse } from "@/lib/shopping";
import { MatrixIcon } from "@/components/icons/MatrixIcon";

interface SpecMatrixProps {
  countryGroups: CompareResponse["countryGroups"];
  platformGroups: CompareResponse["platformGroups"];
}

export default function SpecMatrix({ countryGroups, platformGroups }: SpecMatrixProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="cb-card animate-rise-in overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[#dee1e6] p-6">
          <MatrixIcon className="h-5 w-5 text-[#0052ff]" />
          <div>
            <h2 className="text-lg font-semibold text-[#0a0b0d]">Country and platform matrix</h2>
            <p className="text-sm text-[#5b616e]">Normalized pricing and trust scores by market.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Product listings by country, platform, price, trust score, and verdict.
            </caption>
            <thead className="bg-[#f7f7f7] text-xs text-[#5b616e]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Country</th>
                <th scope="col" className="px-6 py-4 font-semibold">Platform</th>
                <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                <th scope="col" className="px-6 py-4 font-semibold">Trust</th>
                <th scope="col" className="px-6 py-4 font-semibold">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee1e6]">
              {countryGroups.flatMap((group) =>
                group.listings.map((listing) => (
                  <tr key={listing.id} className="cb-table-row">
                    <th scope="row" className="px-6 py-4 text-left font-semibold text-[#0a0b0d]">{group.countryName}</th>
                    <td className="px-6 py-4 text-[#5b616e]">{listing.platform}</td>
                    <td className="cb-number px-6 py-4 text-[#0a0b0d]">{listing.priceDisplay}</td>
                    <td className="cb-number px-6 py-4 text-[#0052ff]">{listing.siteTrustScore}</td>
                    <td className="px-6 py-4 text-[#5b616e]">{listing.verdict}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="cb-surface animate-rise-in delay-1 p-6">
        <h3 className="text-lg font-semibold text-[#0a0b0d]">Platform rollup</h3>
        <div className="cb-stagger mt-5 space-y-4">
          {platformGroups.map((platform) => (
            <div key={platform.platform} className="rounded-lg border border-[#dee1e6] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#0a0b0d]">{platform.platform}</p>
                  <p className="mt-1 text-xs text-[#5b616e]">{platform.listingsCount} listing(s)</p>
                </div>
                <span className="cb-number text-[#0052ff]">{platform.averageTrustScore}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#5b616e]">
                <span>Countries</span>
                <span>{platform.countries.join(", ")}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#5b616e]">
                <span>Verdict</span>
                <span>{platform.verdict}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
