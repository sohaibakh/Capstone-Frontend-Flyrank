"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, ShieldIcon } from "@/components/Icons";

const countryOptions = [
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "PK", label: "Pakistan" },
];

interface CompareSearchPanelProps {
  query: string;
  countries: string[];
  sort: string;
  minTrust: string;
  risk: string;
  condition: string;
  suggestions?: string[];
}

export default function CompareSearchPanel({
  query,
  countries,
  sort,
  minTrust,
  risk,
  condition,
  suggestions = [],
}: CompareSearchPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftQuery, setDraftQuery] = useState(query);
  const [selectedCountries, setSelectedCountries] = useState(countries.length ? countries : ["US", "GB", "PK"]);
  const [selectedSort, setSelectedSort] = useState(sort || "country-platform");
  const [selectedMinTrust, setSelectedMinTrust] = useState(minTrust || "0");
  const [selectedRisk, setSelectedRisk] = useState(risk || "all");
  const [selectedCondition, setSelectedCondition] = useState(condition || "all");

  const activeSummary = useMemo(
    () => `${selectedCountries.join(", ")} · ${selectedMinTrust}+ trust · ${selectedRisk === "all" ? "all risks" : selectedRisk}`,
    [selectedCountries, selectedMinTrust, selectedRisk]
  );

  useEffect(() => {
    if (!isSubmitting || isPending) return;
    const timeout = window.setTimeout(() => setIsSubmitting(false), 700);
    return () => window.clearTimeout(timeout);
  }, [isPending, isSubmitting]);

  const toggleCountry = (country: string) => {
    setSelectedCountries((current) => {
      if (current.includes(country)) {
        const next = current.filter((item) => item !== country);
        return next.length ? next : current;
      }
      return [...current, country];
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      q: draftQuery.trim() || "MacBook Pro M3",
      countries: selectedCountries.join(","),
      sort: selectedSort,
      minTrust: selectedMinTrust,
      risk: selectedRisk,
      condition: selectedCondition,
    });

    setIsSubmitting(true);
    startTransition(() => {
      router.push(`/compare?${params.toString()}`);
    });
  };

  return (
    <>
      {(isSubmitting || isPending) && <AuditLoadingOverlay />}

      <form onSubmit={handleSubmit} className="animate-rise-in rounded-[32px] border border-[#dee1e6] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <label className="relative flex-1">
            <span className="mb-2 block text-xs font-semibold uppercase text-[#7c828a]">Product search</span>
            <SearchIcon className="absolute bottom-4 left-4 h-5 w-5 text-[#7c828a]" />
            <input
              type="text"
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              className="h-14 w-full rounded-[100px] border border-[#dee1e6] bg-[#f7f7f7] px-5 pl-12 text-base text-[#0a0b0d] outline-none transition focus:border-[#0052ff] focus:bg-white"
              placeholder="MacBook Pro M3, Sony WH-1000XM5, iPhone 15 Pro"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
            <Select label="Sort by" value={selectedSort} onChange={setSelectedSort}>
              <option value="country-platform">Country, then platform</option>
              <option value="price-low">Lowest price</option>
              <option value="trust-high">Highest trust</option>
              <option value="risk-low">Lowest risk first</option>
            </Select>
            <Select label="Minimum trust" value={selectedMinTrust} onChange={setSelectedMinTrust}>
              <option value="0">Any trust score</option>
              <option value="60">60+</option>
              <option value="75">75+</option>
              <option value="85">85+</option>
            </Select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_420px]">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase text-[#7c828a]">Filter by country</span>
            <div className="flex flex-wrap gap-2">
              {countryOptions.map((country) => {
                const active = selectedCountries.includes(country.code);
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => toggleCountry(country.code)}
                    className={`rounded-[100px] px-4 py-2 text-sm font-semibold transition ${
                      active ? "bg-[#0052ff] text-white" : "bg-[#eef0f3] text-[#0a0b0d] hover:bg-[#dee1e6]"
                    }`}
                  >
                    {country.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Select label="Seller risk" value={selectedRisk} onChange={setSelectedRisk}>
              <option value="all">All seller risk</option>
              <option value="Low">Low only</option>
              <option value="Medium">Low + medium</option>
            </Select>
            <Select label="Condition" value={selectedCondition} onChange={setSelectedCondition}>
              <option value="all">All conditions</option>
              <option value="New">New only</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Used">Used</option>
              <option value="Open box">Open box</option>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#dee1e6] pt-5 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs text-[#5b616e]">
              <ShieldIcon className="h-4 w-4 text-[#0052ff]" />
              Active scope: {activeSummary}
            </p>
            {suggestions.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase text-[#7c828a]">Popular searches</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setDraftQuery(suggestion)}
                    className="rounded-[100px] bg-[#eef0f3] px-3 py-1.5 text-xs font-semibold text-[#0a0b0d] transition hover:bg-[#dee1e6]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="h-12 rounded-[100px] bg-[#0052ff] px-6 text-sm font-semibold text-white hover:bg-[#003ecc] disabled:cursor-wait disabled:bg-[#a8b8cc]"
          >
            {isSubmitting || isPending ? "Auditing..." : "Run audit"}
          </button>
        </div>
      </form>
    </>
  );
}

function AuditLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-white/92 px-4 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-[1100px] space-y-6">
        <section className="animate-soft-scale rounded-[32px] bg-[#f7f7f7] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot" />
            <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-1" />
            <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-2" />
            <p className="ml-2 text-sm font-semibold text-[#0a0b0d]">Running shopping trust audit</p>
          </div>
          <div className="mt-7 h-12 max-w-3xl rounded-[24px] animate-shimmer" />
          <div className="mt-4 h-5 max-w-xl rounded-[100px] animate-shimmer" />
        </section>

        <section className="rounded-[32px] bg-[#0a0b0d] p-6 sm:p-8">
          <div className="h-5 w-44 rounded-[100px] bg-[#16181c]" />
          <div className="mt-6 h-10 max-w-lg rounded-[24px] bg-[#16181c]" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-32 rounded-[24px] bg-[#16181c]" />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="rounded-[24px] border border-[#dee1e6] bg-white p-6">
              <div className="h-5 w-28 rounded-[100px] animate-shimmer" />
              <div className="mt-5 h-6 w-3/4 rounded-[100px] animate-shimmer" />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((metric) => (
                  <div key={metric} className="h-12 rounded-[16px] animate-shimmer" />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold uppercase text-[#7c828a]">{label}</span>
      <span className="relative block h-14 overflow-hidden rounded-[100px] border border-[#dee1e6] bg-[#f7f7f7] transition focus-within:border-[#0052ff] focus-within:bg-white">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-full w-full appearance-none rounded-[100px] bg-transparent px-5 pr-11 text-sm font-medium text-[#0a0b0d] outline-none"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-5 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#5b616e]" />
      </span>
    </label>
  );
}
