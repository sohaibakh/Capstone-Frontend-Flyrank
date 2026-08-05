import { ShieldIcon, BellIcon, KeyIcon } from "@/components/Icons";

export const metadata = {
  title: "Settings — DealSight AI",
  description: "User settings and preference configuration",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Settings & Preferences
        </h1>
        <p className="mt-1 text-sm text-[#a6a6a6]">
          Manage your account profile, notification preferences, and API credentials.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section Placeholder */}
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 shadow-[0_0_0_1px_rgba(0,153,255,0.15)] space-y-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <ShieldIcon className="w-5 h-5 text-[#0099ff]" />
            <span>User Profile</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#a6a6a6] uppercase tracking-wider mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                disabled
                defaultValue="Capstone User"
                className="w-full rounded-full border border-white/15 bg-[#000000] px-4 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#a6a6a6] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                defaultValue="user@dealsight-ai.com"
                className="w-full rounded-full border border-white/15 bg-[#000000] px-4 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section Placeholder */}
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 shadow-[0_0_0_1px_rgba(0,153,255,0.15)] space-y-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-[#0099ff]" />
            <span>Notification Settings</span>
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-xs text-white">
              <input type="checkbox" defaultChecked disabled className="rounded-full border-white/30 text-[#0099ff] focus:ring-[#0099ff]" />
              Email alerts for legitimate MSRP price drops
            </label>
            <label className="flex items-center gap-3 text-xs text-white">
              <input type="checkbox" defaultChecked disabled className="rounded-full border-white/30 text-[#0099ff] focus:ring-[#0099ff]" />
              Weekly executive deal intelligence summary
            </label>
          </div>
        </div>

        {/* API Credentials Placeholder */}
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 shadow-[0_0_0_1px_rgba(0,153,255,0.15)] space-y-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-[#0099ff]" />
            <span>API Keys & Verification</span>
          </h2>
          <p className="text-xs text-[#a6a6a6]">
            Use your API key to authenticate requests against backend endpoints.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="pk_sample_key_placeholder"
              className="flex-1 font-mono rounded-full border border-white/15 bg-[#000000] px-4 py-2 text-xs text-[#0099ff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
