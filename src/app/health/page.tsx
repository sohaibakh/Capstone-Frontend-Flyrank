export const dynamic = "force-dynamic";

async function getHealthStatus() {
  // Use relative URL or environment variable for production safety
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";
    
  try {
    const res = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch health status",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    };
  }
}

export default async function HealthPage() {
  const data = await getHealthStatus();

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">System Health Status</h1>
      <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto border border-slate-800">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
