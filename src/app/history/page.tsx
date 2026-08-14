import Link from "next/link";
import { BellIcon } from "@/components/Icons";

export const metadata = {
  title: "Saved Audits - DealSight AI",
  description: "Saved shopping trust audits and price watches.",
};

const savedAudits = [
  { product: "MacBook Pro M3", target: "$1,700", trust: "92", status: "Recommended", countries: "US, GB, PK" },
  { product: "Sony WH-1000XM5", target: "$330", trust: "88", status: "Verify seller", countries: "US, GB" },
  { product: "Nintendo Switch OLED", target: "$299", trust: "74", status: "Wait", countries: "US, CA" },
];

export default function HistoryPage() {
  return (
    <div className="animate-page-in space-y-8 pb-16">
      <section className="animate-soft-scale rounded-[32px] bg-[#f7f7f7] p-8">
        <h1 className="cb-display text-5xl text-[#0a0b0d]">Saved audits</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5b616e]">
          A product-ready area for saved trust runs, target prices, and future alert history.
        </p>
      </section>

      <section className="cb-card animate-rise-in overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[#dee1e6] p-6">
          <BellIcon className="h-5 w-5 text-[#0052ff]" />
          <h2 className="text-lg font-semibold text-[#0a0b0d]">Recent product watches</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f7] text-xs text-[#5b616e]">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Target</th>
                <th className="px-6 py-4 font-semibold">Trust</th>
                <th className="px-6 py-4 font-semibold">Markets</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee1e6]">
              {savedAudits.map((item) => (
                <tr key={item.product}>
                  <td className="px-6 py-4 font-semibold text-[#0a0b0d]">
                    {item.product}
                    <span className="block text-xs font-normal text-[#5b616e]">{item.status}</span>
                  </td>
                  <td className="cb-number px-6 py-4 text-[#0a0b0d]">{item.target}</td>
                  <td className="cb-number px-6 py-4 text-[#0052ff]">{item.trust}</td>
                  <td className="px-6 py-4 text-[#5b616e]">{item.countries}</td>
                  <td className="px-6 py-4">
                    <Link href={`/compare?q=${encodeURIComponent(item.product)}`} className="font-semibold text-[#0052ff]">
                      Re-run audit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
