"use client";

import Link from "next/link";
import CompareSearchPanel from "@/components/CompareSearchPanel";
import { AuditIcon, BrainIcon, MatrixIcon, SearchIcon, ShieldIcon, StoreIcon } from "@/components/Icons";

const demoQueries = ["MacBook Pro M3", "Sony WH-1000XM5", "iPhone 15 Pro", "Nintendo Switch OLED"];

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

export default function Home() {
  return (
    <div className="animate-page-in space-y-16 pb-16">
      <section className="animate-soft-scale grid gap-x-8 gap-y-20 rounded-[32px] bg-[#0a0b0d] px-6 py-12 text-white sm:px-10 lg:grid-cols-[1fr_440px] lg:px-12 lg:py-16">
        <div className="flex flex-col justify-center">
          <span className="mb-6 w-fit rounded-[100px] bg-[#16181c] px-4 py-1.5 text-xs font-semibold uppercase tracking-0 text-[#a8acb3]">
            Frontend AI Engineering Capstone
          </span>
          <h1 className="cb-display max-w-3xl text-5xl leading-none sm:text-6xl lg:text-7xl">
            Shopping trust intelligence for prices, sellers, and warranty risk.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#a8acb3]">
            DealSight AI turns raw shopping results into a country-wise buying decision. The shopping index retrieves market
            data, then the AI trust agent reviews seller reputation, site risk, fake discounts, and product match quality.
          </p>

        </div>

        <div className="relative min-h-[580px]">
          <div className="absolute right-0 top-4 w-full rounded-[24px] bg-[#16181c] p-6 text-white lg:w-[390px]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#a8acb3]">Trust score</p>
                <p className="cb-number mt-1 text-4xl">92</p>
              </div>
              <span className="rounded-[100px] bg-[#0052ff] px-4 py-2 text-xs font-semibold">Recommended</span>
            </div>
            {[
              ["Product match", "96%", "#05b169"],
              ["Seller reputation", "88%", "#05b169"],
              ["Warranty risk", "Low", "#05b169"],
              ["Fake discount risk", "Medium", "#f4b000"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between border-t border-white/10 py-4">
                <span className="text-sm text-[#a8acb3]">{label}</span>
                <span className="cb-number text-sm" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-0 w-[86%] rounded-[24px] border border-white/10 bg-white p-6 text-[#0a0b0d] shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">AI trust agent</p>
                <p className="text-xs text-[#5b616e]">Seller and site reputation review</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-[#5b616e]">
              Prefer the known retailer. The third-party import listing is cheaper, but warranty and seller history require
              verification before purchase.
            </p>
          </div>
        </div>

        <div className="pt-10 lg:col-span-2 lg:pt-16">
          <CompareSearchPanel
            query="MacBook Pro M3"
            countries={["US", "GB", "PK"]}
            sort="country-platform"
            minTrust="0"
            risk="all"
            condition="all"
            suggestions={demoQueries}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {agentSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="cb-card animate-rise-in p-8">
              <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-[#0a0b0d]">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5b616e]">{step.body}</p>
            </div>
          );
        })}
      </section>

      <section className="animate-rise-in delay-2 rounded-[32px] bg-[#f7f7f7] p-6 sm:p-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="cb-display text-4xl text-[#0a0b0d]">What the AI actually does</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5b616e]">
              The core AI output is structured, inspectable, and useful to the interface. It is not a basic chat panel.
            </p>
          </div>
          <Link href="/compare?q=MacBook%20Pro%20M3" className="rounded-[100px] bg-[#0052ff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003ecc]">
            Open comparison
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { label: "Product match", value: "Filters wrong models, accessories, and variants.", icon: StoreIcon },
            { label: "Trust score", value: "Scores sellers and sites using search snippets and listing evidence.", icon: AuditIcon },
            { label: "Risk verdict", value: "Flags fake discounts, import warranty, suspicious pricing, and weak reputation.", icon: ShieldIcon },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="animate-rise-in rounded-[24px] border border-[#dee1e6] bg-white p-6">
                <Icon className="h-5 w-5 text-[#0052ff]" />
                <h3 className="mt-5 text-base font-semibold text-[#0a0b0d]">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b616e]">{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
