import Link from "next/link";
import { BellIcon } from "@/components/Icons";

export const metadata = {
  title: "Price Alert Tracker & Search History — DealSight AI",
  description: "View saved deal comparisons, active price alerts, and historical search logs.",
};

const savedAlerts = [
  {
    id: "1",
    product: "Sony WH-1000XM5 Wireless Headphones",
    query: "Sony WH-1000XM5",
    targetPrice: "$330.00",
    currentLowest: "$348.00",
    status: "Active Tracking",
    storesChecked: 5,
    lastChecked: "12 minutes ago",
  },
  {
    id: "2",
    product: "Apple MacBook Pro 14-inch (M3 Pro)",
    query: "MacBook Pro M3",
    targetPrice: "$1,700.00",
    currentLowest: "$1,699.00",
    status: "Target Price Hit!",
    storesChecked: 4,
    lastChecked: "1 hour ago",
  },
  {
    id: "3",
    product: "Nintendo Switch OLED Model",
    query: "Nintendo Switch OLED",
    targetPrice: "$299.00",
    currentLowest: "$319.99",
    status: "Active Tracking",
    storesChecked: 4,
    lastChecked: "3 hours ago",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Saved Searches & Price Alerts
        </h1>
        <p className="mt-2 text-sm text-[#a6a6a6]">
          Track historical price alerts, target price notifications, and saved AI deal audits.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <dt className="text-xs font-semibold text-[#a6a6a6] uppercase tracking-wider">Tracked Products</dt>
          <dd className="mt-2 text-3xl font-black text-white">3 Items</dd>
        </div>
        <div className="rounded-2xl border border-[#0099ff]/30 bg-[#090909] p-6">
          <dt className="text-xs font-semibold text-[#0099ff] uppercase tracking-wider">Triggered Price Alerts</dt>
          <dd className="mt-2 text-3xl font-black text-[#0099ff]">1 Deal Match</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <dt className="text-xs font-semibold text-[#a6a6a6] uppercase tracking-wider">Stores Monitored</dt>
          <dd className="mt-2 text-3xl font-black text-white">5 Retailers</dd>
        </div>
      </div>

      {/* Price Alerts Table */}
      <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-[#0099ff]" />
            <span>Active Price Target Watches</span>
          </h2>
          <span className="text-xs text-[#a6a6a6]">Real-time alert status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#a6a6a6]">
            <thead className="bg-[#000000] text-xs uppercase text-[#a6a6a6] font-semibold tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-white">Product</th>
                <th className="py-3.5 px-4 font-semibold text-white">Target Price</th>
                <th className="py-3.5 px-4 font-semibold text-white">Current Lowest</th>
                <th className="py-3.5 px-4 font-semibold text-white">Status</th>
                <th className="py-3.5 px-4 font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {savedAlerts.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    {item.product}
                    <span className="block text-xs font-normal text-[#a6a6a6] font-mono mt-0.5">
                      Checked {item.lastChecked} ({item.storesChecked} stores)
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[#a6a6a6]">
                    {item.targetPrice}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#0099ff]">
                    {item.currentLowest}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold border ${
                        item.status.includes("Hit")
                          ? "bg-[#0099ff]/20 text-[#0099ff] border-[#0099ff]/40"
                          : "bg-white/10 text-white border-white/15"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/compare?q=${encodeURIComponent(item.query)}`}
                      className="inline-flex items-center text-xs font-semibold text-[#0099ff] hover:underline"
                    >
                      Re-Audit Deal &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
