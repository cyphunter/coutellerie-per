import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export type Db = ReturnType<typeof drizzle<typeof schema>>;

// Binding D1 temporairement désactivé dans wrangler.jsonc tant que le site
// n'a pas besoin de DB. Le cast permet au typecheck CI de passer ; tout
// appel runtime (admin, auth, /api/auth/*, /health) échouera proprement.
type EnvWithDb = CloudflareEnv & { DB: D1Database };

export function getDb(): Db {
  const { env } = getCloudflareContext();
  return drizzle((env as EnvWithDb).DB, { schema });
}

export async function getDbAsync(): Promise<Db> {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle((env as EnvWithDb).DB, { schema });
}

export { schema };
