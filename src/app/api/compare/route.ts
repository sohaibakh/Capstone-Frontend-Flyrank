import { type NextRequest } from "next/server";
import { buildCompareResponse } from "@/lib/shopping";

export const dynamic = "force-dynamic";
export const maxDuration = 10;

const MAX_QUERY_LENGTH = 80;
const MAX_COUNTRIES = 4;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get("q") || searchParams.get("query") || "MacBook Pro M3").trim().slice(0, MAX_QUERY_LENGTH);
  const countries = (searchParams.get("countries") || "US,GB,PK")
    .split(",")
    .map((country) => country.trim())
    .filter(Boolean)
    .slice(0, MAX_COUNTRIES);

  try {
    const data = await buildCompareResponse(query || "MacBook Pro M3", countries);
    return Response.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to compare product listings";

    return Response.json(
      {
        error: message,
        hint: "Check SERPER_API_KEY for shopping results and GEMINI_API_KEY for trust-agent analysis.",
      },
      { status: 502 }
    );
  }
}
