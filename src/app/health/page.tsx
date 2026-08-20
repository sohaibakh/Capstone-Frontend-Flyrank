import { CheckIcon } from "@/components/icons/CheckIcon";
import { HealthIcon } from "@/components/icons/HealthIcon";
import { ShieldIcon } from "@/components/icons/ShieldIcon";

export const dynamic = "force-dynamic";

function getHealthStatus() {
  return {
    status: "ok",
    service: "DealSight AI Shopping Trust Engine",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    serperConfigured: Boolean(process.env.SERPER_API_KEY),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  };
}

export default function HealthPage() {
  const data = getHealthStatus();

  return (
    <main className="animate-page-in mx-auto max-w-3xl space-y-6 pb-16">
      <section className="cb-surface animate-soft-scale p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f3] text-[#0052ff]">
              <HealthIcon className="h-5 w-5" />
            </span>
            <div>
              <h1 className="cb-display text-4xl text-[#0a0b0d]">System health</h1>
              <p className="mt-1 text-sm text-[#5b616e]">Configuration status for shopping retrieval and AI trust analysis.</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-[100px] bg-white px-4 py-2 text-xs font-semibold text-[#047a46]">
            <CheckIcon className="h-4 w-4" />
            Operational
          </span>
        </div>
      </section>

      <section className="cb-card animate-rise-in p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase text-[#5b616e]">
            <ShieldIcon className="h-4 w-4 text-[#0052ff]" />
            Diagnostics payload
          </span>
          <span className="cb-number text-xs text-[#5b616e]">JSON</span>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-[#0a0b0d] p-5 text-xs leading-6 text-white shadow-inner">
          {JSON.stringify(data, null, 2)}
        </pre>
      </section>
    </main>
  );
}
