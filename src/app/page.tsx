"use client";

import { type RefObject, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
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

const guideStorageKey = "dealsight-guide-complete";

const guideProducts = [
  {
    query: "MacBook Pro M3",
    verdict: "Buy from Apple or Best Buy",
    summary: "The cheaper import listing saves money upfront, but the trusted retailer has clearer warranty coverage.",
    price: "$1,649",
    trust: "92",
  },
  {
    query: "Sony WH-1000XM5",
    verdict: "Verify seller before buying",
    summary: "The lowest marketplace price is attractive, but review volume and return policy need one more check.",
    price: "$319",
    trust: "86",
  },
  {
    query: "Nintendo Switch OLED",
    verdict: "Wait for a better listing",
    summary: "The current low price is paired with unclear delivery text and weak seller history.",
    price: "$294",
    trust: "74",
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

const guideAuditItems = [
  ["Product match", "96%", "Confirms this is the exact model, not an accessory or older variant."],
  ["Seller reputation", "88%", "Checks marketplace history, review signals, and source reliability."],
  ["Warranty risk", "Low", "Reads listing language for import, refurbished, or seller-only warranty issues."],
  ["Discount risk", "Medium", "Compares the deal against the market spread to catch suspicious pricing."],
];

const guideExplainCards = [
  {
    title: "Country grouping",
    body: "Listings are grouped by market first, so a cheaper price in one country does not hide risk in another.",
  },
  {
    title: "Trust score",
    body: "The score combines product match, seller reputation, warranty language, and fake discount signals.",
  },
  {
    title: "Final verdict",
    body: "The response explains what to buy, what to verify, and which low-price result deserves caution.",
  },
];

export default function Home() {
  const guideComplete = useSyncExternalStore(subscribeToGuideState, getGuideSnapshot, getGuideServerSnapshot);

  const openHome = () => {
    window.localStorage.setItem(guideStorageKey, "true");
    window.dispatchEvent(new Event("dealsight-guide-change"));
  };

  if (!guideComplete) {
    return <LandingGuide onComplete={openHome} />;
  }

  return <HomeExperience />;
}

function subscribeToGuideState(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("dealsight-guide-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("dealsight-guide-change", callback);
  };
}

function getGuideSnapshot() {
  return window.localStorage.getItem(guideStorageKey) === "true";
}

function getGuideServerSnapshot() {
  return false;
}

function scrollToSection(ref: RefObject<HTMLElement | null>) {
  window.setTimeout(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, 80);
}

function HomeExperience() {
  return (
    <div className="animate-page-in space-y-16 pb-16">
      <section
        className="animate-soft-scale relative grid min-h-[calc(100dvh-112px)] gap-x-8 gap-y-24 overflow-hidden rounded-lg bg-[#0a0b0d]/82 px-6 py-14 text-white shadow-2xl shadow-black/15 backdrop-blur-sm sm:px-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-12 lg:py-16"
      >
        <Image
          src="/hero-flyrank.jpg"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover object-center opacity-90"
          sizes="100vw"
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
                  src="/shopify-commerce-dashboard.png"
                  alt="Commerce dashboard preview"
                  fill
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
    </div>
  );
}

function LandingGuide({ onComplete }: { onComplete: () => void }) {
  const [selectedProduct, setSelectedProduct] = useState<(typeof guideProducts)[number] | null>(null);
  const [auditComplete, setAuditComplete] = useState(false);
  const [focusedSignalIndex, setFocusedSignalIndex] = useState(0);
  const searchSectionRef = useRef<HTMLElement>(null);
  const responseSectionRef = useRef<HTMLElement>(null);
  const explanationSectionRef = useRef<HTMLElement>(null);
  const startSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedProduct) return;

    const timeout = window.setTimeout(() => {
      setAuditComplete(true);
      scrollToSection(responseSectionRef);
    }, 1300);

    return () => window.clearTimeout(timeout);
  }, [selectedProduct]);

  const activeProduct = selectedProduct || guideProducts[0];

  const runDemoAudit = (product: (typeof guideProducts)[number]) => {
    setAuditComplete(false);
    setFocusedSignalIndex(0);
    setSelectedProduct(product);
    scrollToSection(responseSectionRef);
  };

  const explainSignals = () => {
    setFocusedSignalIndex(0);
    scrollToSection(explanationSectionRef);
  };

  const showNextSignal = () => {
    const nextIndex = focusedSignalIndex + 1;

    if (nextIndex >= guideAuditItems.length) {
      scrollToSection(startSectionRef);
      return;
    }

    setFocusedSignalIndex(nextIndex);
  };

  return (
    <div className="animate-page-in pb-8">
      <section className="onboarding-starfield relative overflow-hidden rounded-lg bg-[#05070d] px-4 py-5 text-white shadow-2xl shadow-black/20 sm:px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-[#0052ff]/20 blur-3xl" />
          <div className="absolute bottom-[10%] right-[12%] h-56 w-56 rounded-full bg-[#2a7cff]/18 blur-3xl" />
        </div>

        <div className="relative z-10 flex justify-end">
          <button
            type="button"
            onClick={onComplete}
            className="cb-action rounded-[100px] border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/16"
          >
            Skip
          </button>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <section ref={searchSectionRef} className="grid min-h-[calc(100dvh-180px)] scroll-mt-8 items-center py-8">
            <div className="mx-auto w-full max-w-2xl text-center">
            <span className="inline-flex rounded-[100px] border border-white/12 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-[#d8dbe0] backdrop-blur">
              Guided demo
            </span>
            <h1 className="cb-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Try a sample audit before entering the workspace.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#b9c0cc] lg:mx-0">
              Choose one built-in search. DealSight will generate a fake response so you can learn how every trust signal works.
            </p>

            <div className="mx-auto mt-8 w-full max-w-xl rounded-lg border border-white/14 bg-white/10 p-3 backdrop-blur-xl">
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 text-[#0a0b0d]">
                <SearchIcon className="h-5 w-5 shrink-0 text-[#0052ff]" />
                <input
                  value={selectedProduct?.query || ""}
                  readOnly
                  placeholder="Pick a sample product below"
                  aria-label="Selected demo product"
                  className="h-10 min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[#5b616e]"
                />
                <span className="hidden rounded-[100px] bg-[#eef0f3] px-3 py-1 text-xs font-semibold text-[#5b616e] sm:inline-flex">
                  Demo
                </span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {guideProducts.map((product) => {
                  const active = activeProduct.query === product.query && selectedProduct !== null;

                  return (
                    <button
                      key={product.query}
                      type="button"
                      onClick={() => runDemoAudit(product)}
                      aria-pressed={active}
                      className={`cb-action rounded-lg border px-3 py-3 text-left text-xs font-semibold ${
                        active
                          ? "border-[#0052ff] bg-[#0052ff] text-white shadow-lg shadow-[#0052ff]/20"
                          : "border-white/12 bg-white/8 text-[#d8dbe0] hover:bg-white/12"
                      }`}
                    >
                      {product.query}
                    </button>
                  );
                })}
              </div>
            </div>

            {!selectedProduct && (
              <p className="mt-5 text-xs font-semibold uppercase text-[#788294]">Select a product to start the demo audit</p>
            )}
            </div>
          </section>

          {selectedProduct && (
            <section ref={responseSectionRef} className="grid min-h-[calc(100dvh-112px)] scroll-mt-8 items-center py-12">
              <div className="mx-auto grid w-full items-center gap-8 lg:grid-cols-[0.72fr_1fr]">
                <div className="max-w-md">
                  <span className="rounded-[100px] border border-white/12 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-[#d8dbe0]">
                    Generated response
                  </span>
                  <h2 className="cb-display mt-5 text-4xl leading-tight sm:text-5xl">
                    Watch the audit turn raw listings into a decision.
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#b9c0cc]">
                    This is a hardcoded response, but it mirrors the real app: safe price, trust score, verdict, and the reasons behind it.
                  </p>
                </div>

                <div className="onboarding-float mx-auto w-full max-w-xl rounded-lg border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
            <div className="rounded-lg bg-white p-5 text-[#0a0b0d] shadow-2xl shadow-black/25">
                <div className="min-h-[420px]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-[#5b616e]">Running audit</p>
                      <h2 className="mt-1 text-lg font-semibold">{activeProduct.query}</h2>
                    </div>
                    <span className="rounded-[100px] bg-[#eef0f3] px-3 py-1 text-xs font-semibold text-[#5b616e]">
                      US, GB, PK
                    </span>
                  </div>

                  {!auditComplete ? (
                    <div className="mt-8 space-y-5">
                      <div className="onboarding-scan h-2 rounded-full bg-[#eef0f3]" />
                      {["Retrieving listings", "Checking seller reputation", "Scoring warranty risk"].map((item, index) => (
                        <div key={item} className="onboarding-response-line flex items-center gap-3" style={{ animationDelay: `${index * 140}ms` }}>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0052ff]" />
                          <span className="text-sm font-semibold text-[#5b616e]">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="onboarding-result-enter mt-6">
                      <div className="flex flex-col justify-between gap-4 border-y border-[#dee1e6] py-5 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-xs font-semibold uppercase text-[#5b616e]">Best safe price</p>
                          <p className="cb-number mt-1 text-4xl">{activeProduct.price}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xs font-semibold uppercase text-[#5b616e]">Trust score</p>
                          <p className="cb-number mt-1 text-4xl text-[#0052ff]">{activeProduct.trust}</p>
                        </div>
                      </div>

                      <h3 className="mt-5 text-base font-semibold">{activeProduct.verdict}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5b616e]">{activeProduct.summary}</p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {guideAuditItems.map(([label, value, helper], index) => (
                          <div key={label} className="rounded-lg border border-[#dee1e6] bg-[#f7f7f7] p-4 onboarding-response-line" style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-xs font-semibold text-[#5b616e]">{label}</p>
                              <p className="cb-number text-sm text-[#0052ff]">{value}</p>
                            </div>
                            <p className="mt-2 text-xs leading-5 text-[#5b616e]">{helper}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            </div>

            {auditComplete && (
              <div className="onboarding-result-enter mt-4">
                <button
                  type="button"
                  onClick={explainSignals}
                  className="cb-action h-12 w-full rounded-[100px] bg-white px-6 text-sm font-semibold text-[#0052ff] shadow-lg shadow-black/10 hover:bg-[#eef0f3]"
                >
                  Explain what these scores mean
                </button>
              </div>
            )}
                </div>
              </div>
            </section>
          )}

          {auditComplete && (
            <section ref={explanationSectionRef} className="grid min-h-[calc(100dvh-112px)] scroll-mt-8 items-center py-12">
              <div className="mx-auto grid w-full items-center gap-8 lg:grid-cols-[0.84fr_1fr]">
                <div>
                  <span className="rounded-[100px] border border-white/12 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-[#d8dbe0]">
                    Focus mode
                  </span>
                  <h2 className="cb-display mt-5 text-4xl leading-tight sm:text-5xl">
                    One signal at a time, so the result makes sense.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-[#b9c0cc]">
                    Click through each score. The card on the right explains what the system checked and why it affects the final verdict.
                  </p>
                </div>

                <div className="rounded-lg border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {guideAuditItems.map(([label, value], index) => {
                      const isFocused = focusedSignalIndex === index;

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setFocusedSignalIndex(index)}
                          aria-pressed={isFocused}
                          className={`cb-action rounded-lg border p-4 text-left ${
                            isFocused
                              ? "border-[#0052ff] bg-[#0052ff] text-white shadow-lg shadow-[#0052ff]/20"
                              : "border-white/12 bg-white/8 text-[#d8dbe0] hover:bg-white/12"
                          }`}
                        >
                          <span className="block text-xs font-semibold uppercase opacity-70">{label}</span>
                          <span className="cb-number mt-3 block text-2xl">{value}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="onboarding-result-enter mt-4 rounded-lg bg-white p-5 text-[#0a0b0d]">
                    <p className="text-xs font-semibold uppercase text-[#5b616e]">{guideAuditItems[focusedSignalIndex][0]}</p>
                    <h3 className="mt-3 text-lg font-semibold">{guideExplainCards[focusedSignalIndex]?.title || guideAuditItems[focusedSignalIndex][0]}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5b616e]">{guideAuditItems[focusedSignalIndex][2]}</p>
                    <p className="mt-3 text-xs leading-5 text-[#5b616e]">
                      {guideExplainCards[focusedSignalIndex]?.body || "This signal helps the recommendation avoid listings that look cheap but are risky to buy."}
                    </p>
                    <button
                      type="button"
                      onClick={showNextSignal}
                      className="cb-action mt-5 h-11 rounded-[100px] bg-[#0052ff] px-5 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]"
                    >
                      {focusedSignalIndex >= guideAuditItems.length - 1 ? "Continue to workspace" : "Next signal"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {auditComplete && (
            <section ref={startSectionRef} className="grid min-h-[calc(100dvh-112px)] scroll-mt-8 items-center py-12">
              <div className="mx-auto max-w-2xl rounded-lg border border-white/12 bg-white/10 p-6 text-center backdrop-blur-xl sm:p-8">
                <h2 className="cb-display text-4xl leading-tight sm:text-5xl">Now try it with your own product.</h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#b9c0cc]">
                  The real workspace lets you search any product, adjust countries and filters, and inspect every listing behind the verdict.
                </p>
                <button
                  type="button"
                  onClick={onComplete}
                  className="cb-action mt-7 h-12 rounded-[100px] bg-[#0052ff] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0052ff]/20 hover:bg-[#003ecc]"
                >
                  Let&apos;s start our work
                </button>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
