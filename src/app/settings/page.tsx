export const metadata = {
  title: "Settings - FlyRank",
  description: "User settings and preference configuration placeholder",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Settings & Preferences
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account profile, notification preferences, and API credentials.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section Placeholder */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            User Profile
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Display Name
              </label>
              <input
                type="text"
                disabled
                defaultValue="Capstone User"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                defaultValue="user@flyrank-capstone.com"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section Placeholder */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Notification Settings
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input type="checkbox" defaultChecked disabled className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
              Email alerts for ranking drops
            </label>
            <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <input type="checkbox" defaultChecked disabled className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
              Weekly executive SEO reports digest
            </label>
          </div>
        </div>

        {/* API Credentials Placeholder */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            API Keys & Verification
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            Use your API key to authenticate requests against backend endpoints.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="pk_sample_key_placeholder"
              className="flex-1 font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
