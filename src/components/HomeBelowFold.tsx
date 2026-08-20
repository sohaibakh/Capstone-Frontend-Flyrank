"use client";

import Image from "next/image";
import Link from "next/link";
import { AuditIcon, BrainIcon, MatrixIcon, SearchIcon, ShieldIcon, StoreIcon } from "@/components/Icons";

const agentSteps = [
  {
    title: "Retrieve listings",
    body: "The shopping index collects product listings, prices, ratings, seller names, URLs, and local market signals.",
    icon: SearchIcon,
  },
  {
    title: "Review seller trust",
    body: "The AI trust engine evaluates seller/site reputation, warranty wording, product-match confidence, and suspicious discount patterns.",
    icon: BrainIcon,
  },
  {
    title: "Rank by country",
    body: "Results are normalized country-wise first, then platform-wise, so the user can compare real buying options.",
    icon: MatrixIcon,
  },
];

const marketSnapshots = [
  { label: "United States", store: "Best Buy", price: "$1,649", trust: "92" },
  { label: "United Kingdom", store: "Currys", price: "£1,589", trust: "89" },
  { label: "Pakistan", store: "Import seller", price: "Rs 462k", trust: "68" },
];

const productSignals = [
  { label: "Fake discount", value: "Medium", detail: "Price is below the market spread, but not impossible." },
  { label: "Warranty language", value: "Low risk", detail: "Retailer policy is clear and country-specific." },
  { label: "Seller confidence", value: "88%", detail: "Known marketplace history with enough public signals." },
];

export default function HomeBelowFold() {
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-16">
      <section className="cb-stagger grid gap-4 md:grid-cols-3">
        {agentSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="cb-card p-8">
              <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-[#0a0b0d]">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5b616e]">{step.body}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-[#0a0b0d] text-white shadow-2xl shadow-black/15">
          <Image
            src="/shopping-trust-cover.jpg"
            alt="Online shopping and trust decision"
            fill
            quality={70}
            className="object-cover object-center opacity-[0.72]"
            sizes="(min-width: 1024px) 620px, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.18)_0%,rgba(10,11,13,0.9)_100%)]" />
          <div className="relative flex min-h-[520px] flex-col justify-end p-6 sm:p-8">
            <span className="w-fit rounded-[100px] bg-white/12 px-4 py-1.5 text-xs font-semibold uppercase text-white/78 backdrop-blur">
              Visual audit workspace
            </span>
            <h2 className="cb-display mt-5 max-w-xl text-4xl leading-tight sm:text-5xl">
              A cleaner way to compare prices without trusting every deal.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#d8dbe0]">
              The interface keeps price, seller quality, country context, and warranty risk in one visual decision surface.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="cb-card overflow-hidden p-0">
            <div className="relative h-44 bg-[#eef0f3]">
              <Image
                src="/shopify-commerce-dashboard.webp"
                alt="Commerce dashboard preview"
                fill
                quality={70}
                className="object-cover object-left-top"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase text-[#5b616e]">Market snapshot</p>
              <div className="mt-4 space-y-3">
                {marketSnapshots.map((market) => (
                  <div key={market.label} className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-[#dee1e6] bg-[#f7f7f7] p-4">
                    <div>
                      <p className="text-sm font-semibold text-[#0a0b0d]">{market.label}</p>
                      <p className="mt-1 text-xs text-[#5b616e]">{market.store}</p>
                    </div>
                    <div className="text-right">
                      <p className="cb-number text-sm text-[#0a0b0d]">{market.price}</p>
                      <p className="cb-number mt-1 text-xs text-[#0052ff]">{market.trust} trust</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[#0052ff] p-6 text-white shadow-2xl shadow-[#0052ff]/20">
            <p className="text-xs font-semibold uppercase text-white/76">AI readout</p>
            <h3 className="mt-4 text-xl font-semibold">Prefer verified retail unless the cheaper listing proves warranty.</h3>
            <p className="mt-3 text-sm leading-6 text-white/82">
              This is the kind of decision support the app turns into structured cards, scores, and listing evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="cb-surface animate-rise-in delay-2 p-6 sm:p-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="cb-display text-4xl text-[#0a0b0d]">What the AI actually does</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5b616e]">
              The core AI output is structured, inspectable, and useful to the interface. It is not a basic chat panel.
            </p>
          </div>
          <Link
            href="/compare?q=MacBook+Pro+M3&countries=US%2CGB%2CPK&sort=country-platform&minTrust=0&risk=all&condition=all"
            className="cb-action rounded-[100px] bg-[#0052ff] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]"
          >
            Open comparison
          </Link>
        </div>

        <div className="cb-stagger grid gap-4 lg:grid-cols-3">
          {[
            { label: "Product match", value: "Filters wrong models, accessories, and variants.", icon: StoreIcon },
            { label: "Trust score", value: "Scores sellers and sites using search snippets and listing evidence.", icon: AuditIcon },
            { label: "Risk verdict", value: "Flags fake discounts, import warranty, suspicious pricing, and weak reputation.", icon: ShieldIcon },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="cb-card p-6">
                <Icon className="h-5 w-5 text-[#0052ff]" />
                <h3 className="mt-5 text-base font-semibold text-[#0a0b0d]">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b616e]">{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {productSignals.map((signal) => (
          <div key={signal.label} className="cb-card p-6">
            <p className="text-xs font-semibold uppercase text-[#5b616e]">{signal.label}</p>
            <p className="mt-4 text-2xl font-semibold text-[#0a0b0d]">{signal.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#5b616e]">{signal.detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
