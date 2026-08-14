export default function CompareLoading() {
  return (
    <div className="animate-page-in space-y-10 pb-16">
      <section className="rounded-[32px] bg-[#f7f7f7] p-8">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot" />
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-1" />
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-2" />
          <p className="ml-2 text-sm font-semibold text-[#0a0b0d]">Auditing shopping results</p>
        </div>
        <div className="mt-8 h-16 max-w-3xl rounded-[24px] animate-shimmer" />
        <div className="mt-4 h-5 max-w-xl rounded-[100px] animate-shimmer" />
      </section>

      <section className="rounded-[32px] bg-[#0a0b0d] p-8">
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
          <div key={item} className="cb-card p-6">
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
  );
}
