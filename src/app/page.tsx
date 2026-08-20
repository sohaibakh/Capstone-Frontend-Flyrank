import Image from "next/image";
import CompareSearchPanel from "@/components/CompareSearchPanel";
import HomeBelowFold from "@/components/HomeBelowFold";
import { ShieldIcon } from "@/components/Icons";

export const revalidate = 60;

const demoQueries = ["MacBook Pro M3", "Sony WH-1000XM5", "iPhone 15 Pro", "Nintendo Switch OLED"];

export default function Home() {
  return (
    <div className="animate-page-in space-y-16 pb-16">
      <section
        className="animate-soft-scale relative grid min-h-[calc(100dvh-112px)] gap-x-8 gap-y-24 overflow-hidden rounded-lg bg-[#0a0b0d]/82 px-6 py-14 text-white shadow-2xl shadow-black/15 backdrop-blur-sm sm:px-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-12 lg:py-16"
      >
        <Image
          src="/hero-flyrank.webp"
          alt=""
          fill
          priority={true}
          loading="eager"
          fetchPriority="high"
          quality={68}
          className="absolute inset-0 object-cover object-center opacity-90"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,13,0.82)_0%,rgba(10,11,13,0.58)_48%,rgba(10,11,13,0.32)_100%)]" />
        <div className="relative z-10 flex flex-col justify-center">
          <span className="mb-6 w-fit rounded-[100px] bg-[#16181c]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-0 text-[#d8dbe0] backdrop-blur">
            Frontend AI Engineering Capstone
          </span>
          <h1 className="cb-display max-w-3xl text-5xl leading-none sm:text-6xl lg:text-7xl">
            Shopping trust intelligence for prices, sellers, and warranty risk.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8dbe0]">
            DealSight AI turns raw shopping results into a country-wise buying decision. The shopping index retrieves market
            data, then the AI trust agent reviews seller reputation, site risk, fake discounts, and product match quality.
          </p>
        </div>

        <div className="relative z-10 min-h-[580px]">
          <div className="animate-rise-in delay-1 absolute right-0 top-4 w-full rounded-lg border border-white/10 bg-[#16181c]/90 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur lg:w-[390px]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#d8dbe0]">Trust score</p>
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
                <span className="text-sm text-[#d8dbe0]">{label}</span>
                <span className="cb-number text-sm" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-rise-in delay-2 absolute bottom-4 left-0 w-[86%] rounded-lg border border-white/40 bg-white/95 p-6 text-[#0a0b0d] shadow-2xl shadow-black/20 backdrop-blur">
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

        <div className="relative z-10 pt-10 lg:col-span-2 lg:pt-16">
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

      <HomeBelowFold />
    </div>
  );
}
