"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/Icons";

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
  {
    title: "Risk warning",
    body: "The interface explains when a low price needs another check before the user buys.",
  },
];

function scrollToSection(ref: React.RefObject<HTMLElement | null>) {
  window.setTimeout(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, 80);
}

export default function GuidedDemo() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof guideProducts)[number] | null>(null);
  const [auditComplete, setAuditComplete] = useState(false);
  const [focusedSignalIndex, setFocusedSignalIndex] = useState(0);
  const responseSectionRef = useRef<HTMLElement>(null);
  const explanationSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedProduct) return;

    const timeout = window.setTimeout(() => {
      setAuditComplete(true);
      scrollToSection(responseSectionRef);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [selectedProduct]);

  const activeProduct = selectedProduct || guideProducts[0];

  const runDemoAudit = (product: (typeof guideProducts)[number]) => {
    setAuditComplete(false);
    setFocusedSignalIndex(0);
    setSelectedProduct(product);
    scrollToSection(responseSectionRef);
  };

  const showNextSignal = () => {
    setFocusedSignalIndex((current) => (current + 1 >= guideAuditItems.length ? 0 : current + 1));
  };

  return (
    <div className="animate-page-in pb-8">
      <section className="onboarding-starfield relative overflow-hidden rounded-lg bg-[#05070d] px-4 py-5 text-white shadow-2xl shadow-black/20 sm:px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-[#0052ff]/20 blur-3xl" />
          <div className="absolute bottom-[10%] right-[12%] h-56 w-56 rounded-full bg-[#2a7cff]/18 blur-3xl" />
        </div>

        <div className="relative z-10 flex justify-end">
          <Link
            href="/"
            className="cb-action rounded-[100px] border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/16"
          >
            Skip
          </Link>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <section className="grid min-h-[calc(100dvh-180px)] scroll-mt-8 items-center py-8">
            <div className="mx-auto w-full max-w-2xl text-center">
              <span className="inline-flex rounded-[100px] border border-white/12 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-[#d8dbe0] backdrop-blur">
                Guided demo
              </span>
              <h1 className="cb-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Try a sample audit before entering the workspace.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#b9c0cc]">
                Choose one built-in search. DealSight will generate a sample response so you can learn how every trust signal works.
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
                    This mirrors the real app: safe price, trust score, verdict, and the reasons behind it.
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

                          <button
                            type="button"
                            onClick={() => scrollToSection(explanationSectionRef)}
                            className="cb-action mt-5 h-12 w-full rounded-[100px] bg-[#0052ff] px-6 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]"
                          >
                            Explain what these scores mean
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
                    Click through each score. The card explains what the system checked and why it affects the final verdict.
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
                    <h3 className="mt-3 text-lg font-semibold">{guideExplainCards[focusedSignalIndex].title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5b616e]">{guideAuditItems[focusedSignalIndex][2]}</p>
                    <p className="mt-3 text-xs leading-5 text-[#5b616e]">{guideExplainCards[focusedSignalIndex].body}</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={showNextSignal}
                        className="cb-action h-11 rounded-[100px] bg-[#0052ff] px-5 text-sm font-semibold text-white shadow-sm shadow-[#0052ff]/20 hover:bg-[#003ecc]"
                      >
                        Next signal
                      </button>
                      <Link
                        href="/"
                        className="cb-action inline-flex h-11 items-center justify-center rounded-[100px] bg-[#eef0f3] px-5 text-sm font-semibold text-[#0a0b0d] hover:bg-[#dee1e6]"
                      >
                        Continue to workspace
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
