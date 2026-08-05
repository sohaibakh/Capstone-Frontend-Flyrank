import Link from "next/link";
import { TrendingIcon, ShieldIcon, AuditIcon, MatrixIcon } from "@/components/Icons";

export const metadata = {
  title: "Dashboard — DealSight AI",
  description: "Main app feature dashboard & analytics overview",
};

export default function DashboardPage() {
  const stats = [
    { name: "Tracked Keywords & Deals", value: "1,248", change: "+12%", changeType: "positive" },
    { name: "Average Savings / Deal", value: "$48.50", change: "+18%", changeType: "positive" },
    { name: "Retailers Monitored", value: "5 Stores", change: "Live", changeType: "neutral" },
    { name: "Health & Integrity Score", value: "98/100", change: "Optimal", changeType: "positive" },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Analytics & Deal Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#a6a6a6]">
            Real-time multi-retailer monitoring and AI deal audit statistics.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
          <Link
            href="/api/health"
            target="_blank"
            className="inline-flex items-center rounded-full bg-white text-black hover:bg-slate-200 px-5 py-2 text-xs font-semibold shadow-md transition-all"
          >
            Check API Health &rarr;
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-white/10 bg-[#090909] p-5 shadow-[0_0_0_1px_rgba(0,153,255,0.15)] flex flex-col justify-between"
          >
            <dt className="truncate text-xs font-semibold text-[#a6a6a6] uppercase tracking-wider">{item.name}</dt>
            <dd className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {item.value}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-[#0099ff]/20 text-[#0099ff] border border-[#0099ff]/40">
                {item.change}
              </span>
            </dd>
          </div>
        ))}
      </div>

      {/* Main Content Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#090909] p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <TrendingIcon className="w-5 h-5 text-[#0099ff]" />
              <span>Ranking & Performance Analytics</span>
            </h2>
            <p className="mt-1 text-xs text-[#a6a6a6]">
              Interactive price trend analytics and performance charts.
            </p>
          </div>
          <div className="flex h-52 w-full items-center justify-center rounded-xl border border-white/10 bg-[#000000] text-[#a6a6a6] text-xs font-mono">
            [ Framer Performance Analytics Visualization Placeholder ]
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <AuditIcon className="w-5 h-5 text-[#0099ff]" />
              <span>Recent Activity Log</span>
            </h2>
            <p className="mt-1 text-xs text-[#a6a6a6]">
              Real-time site auditing and deal detection logs.
            </p>
          </div>
          <ul className="divide-y divide-white/5 text-xs">
            <li className="py-3 flex justify-between">
              <span className="text-white font-medium flex items-center gap-2">
                <ShieldIcon className="w-3.5 h-3.5 text-[#0099ff]" />
                Sony WH-1000XM5 re-audited
              </span>
              <span className="text-[#a6a6a6]">10m ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span className="text-white font-medium flex items-center gap-2">
                <MatrixIcon className="w-3.5 h-3.5 text-[#0099ff]" />
                28 MacBook deals indexed
              </span>
              <span className="text-[#a6a6a6]">1h ago</span>
            </li>
            <li className="py-3 flex justify-between">
              <span className="text-white font-medium flex items-center gap-2">
                <TrendingIcon className="w-3.5 h-3.5 text-[#0099ff]" />
                Nintendo Switch price dropped
              </span>
              <span className="text-[#a6a6a6]">3h ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
