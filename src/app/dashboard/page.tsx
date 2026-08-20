import Link from "next/link";
import { AuditIcon } from "@/components/icons/AuditIcon";
import { MatrixIcon } from "@/components/icons/MatrixIcon";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { TrendingIcon } from "@/components/icons/TrendingIcon";

export const metadata = {
  title: "Dashboard - DealSight AI",
  description: "Shopping trust agent dashboard.",
};

const stats = [
  { name: "Markets ready", value: "US, GB, PK", change: "Default" },
  { name: "Shopping source", value: "Index", change: process.env.SERPER_API_KEY ? "Connected" : "Demo" },
  { name: "Trust agent", value: "AI", change: process.env.GEMINI_API_KEY ? "Connected" : "Heuristic" },
  { name: "Risk modules", value: "4", change: "Active" },
];

export default function DashboardPage() {
  return (
    <div className="animate-page-in mx-auto w-full max-w-[1200px] space-y-8 pb-16">
      <section className="cb-surface animate-soft-scale p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="cb-display text-5xl text-[#0a0b0d]">Trust agent dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5b616e]">
              Operational view for the capstone pipeline: retrieval, normalization, AI trust analysis, and country-wise ranking.
            </p>
          </div>
          <Link href="/compare?q=MacBook%20Pro%20M3" className="cb-action rounded-[100px] bg-[#0052ff] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]">
            Run audit
          </Link>
        </div>
      </section>

      <section className="cb-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="cb-card p-6">
            <p className="text-xs font-semibold uppercase text-[#5b616e]">{item.name}</p>
            <p className="cb-number mt-3 text-2xl text-[#0a0b0d]">{item.value}</p>
            <span className="mt-4 inline-flex rounded-[100px] bg-[#eef0f3] px-3 py-1 text-xs font-semibold text-[#0a0b0d]">
              {item.change}
            </span>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="cb-card animate-rise-in p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0a0b0d]">
            <TrendingIcon className="h-5 w-5 text-[#0052ff]" />
            Pipeline stages
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Shopping retrieval", "Collects shopping listings, prices, seller names, ratings, URLs, and snippets."],
              ["Country normalization", "Groups market results by country first and platform second."],
              ["AI trust review", "Scores product match, seller/site reputation, warranty, and fake discount risk."],
              ["Buying verdict", "Produces a structured recommendation that the frontend renders as evidence."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-[#dee1e6] bg-[#f7f7f7] p-5">
                <p className="font-semibold text-[#0a0b0d]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#5b616e]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise-in delay-1 rounded-lg bg-[#0a0b0d] p-6 text-white shadow-2xl shadow-black/15">
          <h2 className="text-lg font-semibold">Risk modules</h2>
          <div className="mt-5 space-y-4">
            {[
              [ShieldIcon, "Seller reputation"],
              [AuditIcon, "Fake discount review"],
              [MatrixIcon, "Product match confidence"],
              [TrendingIcon, "Warranty risk"],
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof ShieldIcon;
              return (
                <div key={label as string} className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-3 text-sm text-[#a8acb3]">
                    <TypedIcon className="h-4 w-4 text-[#0052ff]" />
                    {label as string}
                  </span>
                  <span className="rounded-[100px] bg-[#16181c] px-3 py-1 text-xs font-semibold">Active</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
