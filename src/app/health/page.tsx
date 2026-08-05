import { HealthIcon, ShieldIcon, CheckIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

async function getHealthStatus() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";
    
  try {
    const res = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch health status",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY),
      shoppingApiConfigured: Boolean(process.env.SERPAPI_KEY),
    };
  }
}

export default async function HealthPage() {
  const data = await getHealthStatus();

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-2xl mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0099ff]/15 border border-[#0099ff]/30 text-[#0099ff]">
            <HealthIcon className="w-5 h-5 text-[#0099ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">System Health Status</h1>
            <p className="text-xs text-[#a6a6a6] mt-0.5">Real-time pipeline & infrastructure diagnostic</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0099ff]/20 text-[#0099ff] border border-[#0099ff]/40">
          <CheckIcon className="w-3.5 h-3.5 text-[#0099ff]" />
          Operational
        </span>
      </div>

      <div className="rounded-2xl border border-[#0099ff]/20 bg-[#090909] p-6 shadow-[0_0_15px_rgba(0,153,255,0.15)] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-[#0099ff] tracking-wider flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-[#0099ff]" />
            Live Diagnostics Output
          </span>
          <span className="text-[10px] font-mono text-[#a6a6a6]">JSON Payload</span>
        </div>

        <pre className="bg-[#000000] text-[#0099ff] p-5 rounded-xl text-xs font-mono border border-white/10 overflow-x-auto leading-relaxed shadow-inner">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}
