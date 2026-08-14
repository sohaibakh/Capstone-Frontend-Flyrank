export default function Loading() {
  return (
    <main className="animate-page-in space-y-8 pb-16">
      <section className="rounded-[32px] bg-[#f7f7f7] p-8">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot" />
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-1" />
          <span className="h-3 w-3 rounded-full bg-[#0052ff] animate-pulse-dot delay-2" />
          <p className="ml-2 text-sm font-semibold text-[#0a0b0d]">Preparing trust intelligence</p>
        </div>
        <div className="mt-8 h-14 max-w-2xl rounded-[24px] animate-shimmer" />
        <div className="mt-4 h-5 max-w-lg rounded-[100px] animate-shimmer" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="cb-card p-5">
            <div className="h-10 w-10 rounded-full animate-shimmer" />
            <div className="mt-5 h-3 w-24 rounded-[100px] animate-shimmer" />
            <div className="mt-3 h-4 w-36 rounded-[100px] animate-shimmer" />
          </div>
        ))}
      </section>
    </main>
  );
}
