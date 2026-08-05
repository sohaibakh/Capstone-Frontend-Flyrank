import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "DealSight AI Engine",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY),
    shoppingApiConfigured: Boolean(process.env.SERPAPI_KEY || process.env.RAINFOREST_API_KEY || process.env.UNWRANGLE_API_KEY),
  });
}
