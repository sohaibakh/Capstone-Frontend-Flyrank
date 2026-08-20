"use client";

import { AiAudit, CompareResponse } from "@/lib/shopping";
import { AuditIcon } from "@/components/icons/AuditIcon";
import { BrainIcon } from "@/components/icons/BrainIcon";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";

interface AiInsightsProps {
  aiAudit: AiAudit;
  datasource: CompareResponse["datasource"];
}

const verdictStyles: Record<AiAudit["verdict"], string> = {
  "BUY NOW": "text-[#05b169]",
  "VERIFY SELLER": "text-[#0052ff]",
  WAIT: "text-[#a8acb3]",
  AVOID: "text-[#cf202f]",
};

export default function AiInsights({ aiAudit, datasource }: AiInsightsProps) {
  return (
    <section className="animate-rise-in delay-1 rounded-lg bg-[#0a0b0d] p-6 text-white shadow-2xl shadow-black/15 sm:p-8">
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-start">
        <div>
          <span className="mb-4 inline-flex rounded-[100px] bg-[#16181c] px-4 py-1.5 text-xs font-semibold uppercase text-[#a8acb3]">
            Shopping trust agent
          </span>
          <h2 className="cb-display text-4xl leading-tight">AI verdict: {aiAudit.verdict}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#a8acb3]">{aiAudit.summary}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#16181c] p-5">
          <p className="text-xs text-[#a8acb3]">Confidence</p>
          <p className={`cb-number mt-1 text-5xl ${verdictStyles[aiAudit.verdict]}`}>{aiAudit.confidenceScore}</p>
          <p className="mt-1 text-xs text-[#a8acb3]">out of 100</p>
        </div>
      </div>

      <div className="cb-stagger mt-6 grid gap-4 md:grid-cols-3">
        <InsightCard icon={AuditIcon} title="Fake Discount Review" body={aiAudit.fakeDiscountReport} />
        <InsightCard icon={ShieldIcon} title="Seller Reputation" body={aiAudit.sellerReputationReport} />
        <InsightCard icon={TargetIcon} title="Warranty Risk" body={aiAudit.warrantyRiskReport} />
      </div>

      <div className="mt-6 rounded-lg bg-white p-5 text-[#0a0b0d]">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
            <BrainIcon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Recommended action</h3>
            <p className="mt-1 text-sm leading-6 text-[#5b616e]">{aiAudit.recommendedAction}</p>
            <p className="mt-3 text-xs text-[#5b616e]">
              Data: {datasource.shopping} · Trust layer: {datasource.trustAgent}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ icon: Icon, title, body }: { icon: typeof AuditIcon; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#16181c] p-5">
      <Icon className="h-5 w-5 text-[#0052ff]" />
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#a8acb3]">{body}</p>
    </div>
  );
}
