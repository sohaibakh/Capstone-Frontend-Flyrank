import { type NextRequest } from "next/server";
import { buildCompareResponse } from "@/lib/shopping";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || searchParams.get("query") || "MacBook Pro M3";
  const countries = (searchParams.get("countries") || "US,GB,PK")
    .split(",")
    .map((country) => country.trim())
    .filter(Boolean);

  try {
    const data = await buildCompareResponse(query.trim(), countries);
    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to compare product listings";

    return Response.json(
      {
        error: message,
        hint: "Check SERPER_API_KEY for shopping results and GROK_API_KEY or XAI_API_KEY for trust-agent analysis.",
      },
      { status: 502 }
    );
  }
}
