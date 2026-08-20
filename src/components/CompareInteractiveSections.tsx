"use client";

import dynamic from "next/dynamic";
import type { CompareResponse, ShoppingListing } from "@/lib/shopping";

const AiInsights = dynamic(() => import("@/components/AiInsights"), {
  ssr: false,
  loading: () => null,
});

const PriceGrid = dynamic(() => import("@/components/PriceGrid"), {
  ssr: false,
  loading: () => null,
});

const SpecMatrix = dynamic(() => import("@/components/SpecMatrix"), {
  ssr: false,
  loading: () => null,
});

interface CompareInteractiveSectionsProps {
  data: CompareResponse;
  filteredListings: ShoppingListing[];
  filteredCountryGroups: CompareResponse["countryGroups"];
  filteredPlatformGroups: CompareResponse["platformGroups"];
}

export default function CompareInteractiveSections({
  data,
  filteredListings,
  filteredCountryGroups,
  filteredPlatformGroups,
}: CompareInteractiveSectionsProps) {
  return (
    <>
      <AiInsights aiAudit={data.aiAudit} datasource={data.datasource} />
      <PriceGrid listings={filteredListings} />
      <SpecMatrix countryGroups={filteredCountryGroups} platformGroups={filteredPlatformGroups} />
    </>
  );
}
