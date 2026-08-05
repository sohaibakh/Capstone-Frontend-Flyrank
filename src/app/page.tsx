"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HeadphonesIcon, LaptopIcon, GamepadIcon, SmartphoneIcon, FlameIcon } from "@/components/Icons";

const featuredCategories = [
  { name: "Audio & Headphones", query: "Sony WH-1000XM5", icon: HeadphonesIcon, dealsCount: "14 Live Deals", badge: "Hot" },
  { name: "Laptops & Computing", query: "MacBook Pro M3", icon: LaptopIcon, dealsCount: "28 Live Deals", badge: "Trending" },
  { name: "Gaming & Consoles", query: "Nintendo Switch OLED", icon: GamepadIcon, dealsCount: "19 Live Deals", badge: "Popular" },
  { name: "Smartphones", query: "iPhone 15 Pro", icon: SmartphoneIcon, dealsCount: "32 Live Deals", badge: "Top Rated" },
];

const trendingDeals = [
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    query: "Sony WH-1000XM5",
    lowestPrice: "$348.00",
    msrp: "$399.99",
    savings: "Save $52.00 (13%)",
    stores: ["Best Buy", "Amazon", "Walmart", "eBay"],
    verdict: "BUY NOW",
    badgeColor: "bg-[#0099ff]/20 text-[#0099ff] border-[#0099ff]/40",
  },
  {
    title: "Apple MacBook Pro 14-inch (M3 Pro)",
    query: "MacBook Pro M3",
    lowestPrice: "$1,699.00",
    msrp: "$1,999.00",
    savings: "Save $300.00 (15%)",
    stores: ["Amazon", "Best Buy", "B&H Photo"],
    verdict: "BUY NOW",
    badgeColor: "bg-[#0099ff]/20 text-[#0099ff] border-[#0099ff]/40",
  },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/compare?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section on Pure Black Void Canvas */}
      <section className="text-center py-16 px-6 rounded-3xl bg-[#000000] border border-white/10 relative overflow-hidden">
        {/* Radial Blue Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0099ff]/15 blur-[120px] pointer-events-none rounded-full" />

        {/* Frosted Badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white mb-8 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#0099ff] animate-pulse" />
          AI Intelligence Layer for Multi-Store Deals
        </span>

        {/* Headline with Compressed Negative Letter-Spacing */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-white max-w-4xl mx-auto leading-[0.95]">
          Stop Getting Fooled By{" "}
          <span className="text-[#0099ff]">
            Fake Discounts
          </span>
        </h1>

        {/* Body Description in Muted Silver */}
        <p className="mt-6 text-base sm:text-lg text-[#a6a6a6] max-w-2xl mx-auto leading-relaxed">
          DealSight AI cross-checks live prices across Amazon, Best Buy, Walmart & eBay with LLM deal audit intelligence, MSRP verification, and feature spec matrixes.
        </p>

        {/* Search Input Bar with Framer Pill CTA */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row gap-2 rounded-full bg-[#090909] p-2 border border-white/15 shadow-2xl focus-within:border-[#0099ff] transition-all">
            <input
              type="text"
              placeholder="Search product (e.g. Sony WH-1000XM5, MacBook Pro M3)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-6 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white text-black hover:bg-slate-200 px-8 py-3.5 text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
            >
              <span>Compare & Audit</span> &rarr;
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-[#a6a6a6] relative z-10">
          <span className="font-semibold text-white/50 self-center">Popular:</span>
          {["Sony WH-1000XM5", "MacBook Pro M3", "Nintendo Switch OLED"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => router.push(`/compare?q=${encodeURIComponent(item)}`)}
              className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs text-white hover:bg-white/20 border border-white/10 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Deal Categories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Category Intelligence
          </h2>
          <span className="text-xs text-[#a6a6a6] font-mono">Multi-Retailer Direct Index</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCategories.map((cat, idx) => {
            const CategoryIcon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/compare?q=${encodeURIComponent(cat.query)}`}
                className="rounded-2xl border border-white/10 bg-[#090909] p-6 hover:border-[#0099ff]/50 hover:shadow-[0_0_15px_rgba(0,153,255,0.2)] transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#0099ff]">
                    <CategoryIcon className="w-5 h-5 text-[#0099ff]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-base group-hover:text-[#0099ff] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#a6a6a6] mt-1 font-mono">{cat.dealsCount}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending Audited Deals */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FlameIcon className="w-6 h-6 text-[#0099ff]" />
            <span>AI Audited Deals Today</span>
          </h2>
          <Link href="/compare" className="text-xs font-semibold text-[#0099ff] hover:underline">
            View All Comparisons &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingDeals.map((deal, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#090909] p-6 flex flex-col justify-between hover:border-[#0099ff]/40 transition-all"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${deal.badgeColor}`}>
                    {deal.verdict}
                  </span>
                  <span className="text-xs font-mono text-[#0099ff] font-semibold">{deal.savings}</span>
                </div>
                <h3 className="font-extrabold text-xl text-white mb-2 tracking-tight">
                  {deal.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-extrabold text-white">{deal.lowestPrice}</span>
                  <span className="text-xs line-through text-[#a6a6a6] font-mono">MSRP {deal.msrp}</span>
                </div>
                <p className="text-xs text-[#a6a6a6] mb-6">
                  Cross-checked across {deal.stores.join(", ")}
                </p>
              </div>

              <Link
                href={`/compare?q=${encodeURIComponent(deal.query)}`}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs text-center hover:bg-slate-200 transition-all"
              >
                Inspect Price Grid & Spec Matrix &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
