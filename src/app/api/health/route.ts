export async function GET() {
  return Response.json({
    status: "ok",
    service: "DealSight AI Shopping Trust Engine",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    serperConfigured: Boolean(process.env.SERPER_API_KEY),
  });
}
