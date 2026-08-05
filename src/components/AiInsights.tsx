"use client";

import { AiAudit } from "@/app/api/compare/route";
import { BrainIcon, ScaleIcon, AuditIcon, TargetIcon, LightbulbIcon } from "@/components/Icons";

interface AiInsightsProps {
  aiAudit: AiAudit;
  lowestPrice: number;
  msrp: number;
  datasource?: string;
}

export default function AiInsights({ aiAudit, datasource }: AiInsightsProps) {
  const getBadgeStyle = (verdict: string) => {
    switch (verdict) {
      case "BUY NOW":
        return "bg-[#0099ff]/20 text-[#0099ff] border-[#0099ff]/40";
      case "WAIT FOR SALE":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "CONSIDER REFURBISHED":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="rounded-2xl border border-[#0099ff]/20 bg-[#090909] p-6 shadow-[0_0_0_1px_rgba(0,153,255,0.15)] relative overflow-hidden">
      {/* Framer Blue subtle radial aura */}
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#0099ff]/10 blur-3xl pointer-events-none" />

      {/* Header with AI badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0099ff]/15 border border-[#0099ff]/30 text-[#0099ff]">
            <BrainIcon className="w-5 h-5 text-[#0099ff]" />
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
              AI Deal Audit & Intelligence
            </h2>
            <p className="text-xs text-[#a6a6a6] mt-0.5">
              Automated Price vs Specs ratio & discount legitimacy check
            </p>
          </div>
        </div>

        {/* Verdict Pill Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#a6a6a6]">Verdict:</span>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${getBadgeStyle(aiAudit.verdict)}`}>
            {aiAudit.verdict}
          </span>
        </div>
      </div>

      {/* Grid of Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Specs to Price ratio */}
        <div className="rounded-xl bg-[#000000]/60 p-4 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#0099ff] tracking-wider mb-2">
            <ScaleIcon className="w-4 h-4 text-[#0099ff]" />
            <span>Price vs. Specs Ratio</span>
          </div>
          <p className="text-xs text-[#a6a6a6] leading-relaxed">
            {aiAudit.specsToPriceRatio}
          </p>
        </div>

        {/* Fake Discount Check */}
        <div className="rounded-xl bg-[#000000]/60 p-4 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#0099ff] tracking-wider mb-2">
            <AuditIcon className="w-4 h-4 text-[#0099ff]" />
            <span>MSRP Discount Audit</span>
          </div>
          <p className="text-xs text-[#a6a6a6] leading-relaxed">
            {aiAudit.fakeDiscountReport}
          </p>
        </div>

        {/* Confidence Score & Savings */}
        <div className="rounded-xl bg-[#000000]/60 p-4 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-400 tracking-wider mb-2">
            <TargetIcon className="w-4 h-4 text-amber-400" />
            <span>Deal Score & Savings</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-white">{aiAudit.confidenceScore}/100</span>
            <span className="text-xs text-[#a6a6a6]">Confidence</span>
          </div>
          <p className="text-xs text-[#0099ff] font-semibold">
            {aiAudit.potentialSavings}
          </p>
        </div>
      </div>

      {/* Structured Recommendation Box */}
      <div className="rounded-xl bg-[#000000]/80 p-4 border border-[#0099ff]/30">
        <h3 className="text-xs font-semibold uppercase text-[#0099ff] tracking-wider mb-1 flex items-center gap-2">
          <LightbulbIcon className="w-4 h-4 text-[#0099ff]" />
          <span>AI Buying Advice Summary</span>
        </h3>
        <p className="text-xs text-[#a6a6a6] leading-relaxed">
          {aiAudit.recommendationDetails}
        </p>
      </div>

      {datasource && (
        <div className="mt-4 text-right">
          <span className="text-[10px] text-white/40 font-mono">
            Engine: {datasource}
          </span>
        </div>
      )}
    </div>
  );
}
