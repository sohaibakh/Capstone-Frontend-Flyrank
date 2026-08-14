import { KeyIcon, ShieldIcon } from "@/components/Icons";

export const metadata = {
  title: "Settings - DealSight AI",
  description: "API key and trust-agent configuration guidance.",
};

const envRows = [
  { key: "SERPER_API_KEY", purpose: "Shopping results, ratings, seller names, source URLs, and reputation snippets." },
  { key: "GROK_API_KEY", purpose: "Grok trust agent for seller/site reputation, warranty risk, fake discount risk, and verdicts." },
  { key: "XAI_API_KEY", purpose: "Alternative xAI key name supported by the backend if you prefer xAI naming." },
  { key: "GROK_MODEL", purpose: "Optional model override. Defaults to latest." },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-16">
      <section className="rounded-[32px] bg-[#f7f7f7] p-8">
        <h1 className="cb-display text-5xl text-[#0a0b0d]">Agent configuration</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5b616e]">
          Add these variables to `.env.local` when your Serper.dev and Grok keys are ready. The app runs in demo mode until
          they are present.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="cb-card overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#dee1e6] p-6">
            <KeyIcon className="h-5 w-5 text-[#0052ff]" />
            <h2 className="text-lg font-semibold text-[#0a0b0d]">Environment variables</h2>
          </div>
          <div className="divide-y divide-[#dee1e6]">
            {envRows.map((row) => (
              <div key={row.key} className="grid gap-2 p-6 sm:grid-cols-[180px_1fr]">
                <code className="cb-number text-sm text-[#0052ff]">{row.key}</code>
                <p className="text-sm leading-6 text-[#5b616e]">{row.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[24px] bg-[#0a0b0d] p-6 text-white">
          <ShieldIcon className="h-5 w-5 text-[#0052ff]" />
          <h2 className="mt-5 text-lg font-semibold">Current mode</h2>
          <div className="mt-5 space-y-4">
            <Status label="Serper" active={Boolean(process.env.SERPER_API_KEY)} />
            <Status label="Grok" active={Boolean(process.env.GROK_API_KEY || process.env.XAI_API_KEY)} />
          </div>
          <p className="mt-6 text-sm leading-6 text-[#a8acb3]">
            Missing keys use demo shopping data and heuristic scoring so the frontend remains presentable during development.
          </p>
        </aside>
      </section>
    </div>
  );
}

function Status({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 pt-4">
      <span className="text-sm text-[#a8acb3]">{label}</span>
      <span className={`rounded-[100px] px-3 py-1 text-xs font-semibold ${active ? "bg-[#0052ff] text-white" : "bg-[#16181c] text-[#a8acb3]"}`}>
        {active ? "Connected" : "Demo"}
      </span>
    </div>
  );
}
