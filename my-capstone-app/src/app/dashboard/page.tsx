import Link from "next/link";

export const metadata = {
  title: "Dashboard - FlyRank",
  description: "Main app feature dashboard placeholder",
};

export default function DashboardPage() {
  const stats = [
    { name: "Total Tracked Keywords", value: "1,248", change: "+12%", changeType: "positive" },
    { name: "Average Rank Position", value: "4.2", change: "-0.8", changeType: "positive" },
    { name: "Indexed Pages", value: "342", change: "+24", changeType: "positive" },
    { name: "Health Score", value: "98/100", change: "Optimal", changeType: "neutral" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Main application feature screen placeholder & SEO overview.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 gap-3">
          <Link
            href="/api/health"
            target="_blank"
            className="inline-flex items-center rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3.5 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Check API Health &rarr;
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-5 shadow-sm sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.name}</dt>
            <dd className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {item.value}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  item.changeType === "positive"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {item.change}
              </span>
            </dd>
          </div>
        ))}
      </div>

      {/* Main Content Placeholder Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm min-h-[280px] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Ranking Performance Analytics</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Interactive ranking analytics and performance charts placeholder.
            </p>
          </div>
          <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-sm">
            [ Dynamic Chart / Visualization Component Placeholder ]
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm min-h-[280px] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Real-time site auditing and keyword tracking events.
            </p>
          </div>
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
            <li className="py-2.5 flex justify-between">
              <span className="text-zinc-700 dark:text-zinc-300">Site audit finished</span>
              <span className="text-zinc-400 text-xs">10m ago</span>
            </li>
            <li className="py-2.5 flex justify-between">
              <span className="text-zinc-700 dark:text-zinc-300">24 keywords re-indexed</span>
              <span className="text-zinc-400 text-xs">1h ago</span>
            </li>
            <li className="py-2.5 flex justify-between">
              <span className="text-zinc-700 dark:text-zinc-300">Sitemap updated</span>
              <span className="text-zinc-400 text-xs">3h ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
