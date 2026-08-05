import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
  });
}
