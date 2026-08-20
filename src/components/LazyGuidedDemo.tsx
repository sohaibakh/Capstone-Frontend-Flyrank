"use client";

import dynamic from "next/dynamic";

const GuidedDemo = dynamic(() => import("@/components/GuidedDemo"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[calc(100dvh-112px)] place-items-center rounded-lg bg-[#05070d] px-4 text-center text-white">
      <div>
        <p className="text-xs font-semibold uppercase text-[#788294]">Guided demo</p>
        <h1 className="cb-display mt-4 text-4xl leading-tight sm:text-5xl">Loading the demo workspace.</h1>
      </div>
    </div>
  ),
});

export default GuidedDemo;
