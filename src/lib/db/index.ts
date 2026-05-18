import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export type Db = ReturnType<typeof drizzle<typeof schema>>;

export function getDb(): Db {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}

export async function getDbAsync(): Promise<Db> {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}

export { schema };
