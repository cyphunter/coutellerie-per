import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  const start = Date.now();
  let dbStatus: "ok" | "error" = "ok";
  let dbError: string | undefined;

  try {
    const db = getDb();
    await db.run(sql`SELECT 1`);
  } catch (e) {
    dbStatus = "error";
    dbError = e instanceof Error ? e.message : "unknown";
  }

  const ok = dbStatus === "ok";
  return Response.json(
    {
      status: ok ? "ok" : "degraded",
      db: dbStatus,
      ...(dbError ? { dbError } : {}),
      version: process.env.NEXT_PUBLIC_VERSION ?? "dev",
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
