export async function GET() {
  return Response.json({
    status: "ok",
    service: "DealSight AI Shopping Trust Engine",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    grokConfigured: Boolean(process.env.GROK_API_KEY || process.env.XAI_API_KEY),
    serperConfigured: Boolean(process.env.SERPER_API_KEY),
  });
}
