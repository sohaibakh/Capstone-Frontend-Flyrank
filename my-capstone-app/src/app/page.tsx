import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-3xl dark:from-indigo-950/20">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 mb-4">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Capstone FE Platform
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">FlyRank</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A high-performance frontend boilerplate built with Next.js App Router, Tailwind CSS, and Server Components by default.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Go to Dashboard &rarr;
          </Link>
          <Link
            href="/settings"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Settings
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
            01
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">App Router Architecture</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Standard file-based routing architecture with nested layouts and automatic code-splitting.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
            02
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Server Components First</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Optimal bundle size and performance using React Server Components as default, client components only when interactive.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
            03
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Health Verification</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Built-in backend verification endpoint available at <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 text-indigo-600 dark:text-indigo-400">/api/health</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
