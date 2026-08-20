"use client";

import dynamic from "next/dynamic";

const CompareSearchPanel = dynamic(() => import("@/components/CompareSearchPanel"), {
  ssr: false,
  loading: () => null,
});

export default CompareSearchPanel;
