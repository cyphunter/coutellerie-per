/**
 * Seed local DB pour le développement.
 * Idempotent : INSERT OR IGNORE. Sécurisé à relancer.
 *
 * Usage : `npm run db:seed:local` (après migrate:local)
 *
 * Note : ce script utilise better-sqlite3 directement sur le fichier wrangler
 * local (.wrangler/state/v3/d1) — NE PAS utiliser en prod.
 */
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "node:fs";
import path from "node:path";

function findLocalD1(): string {
  const stateDir = path.join(process.cwd(), ".wrangler/state/v3/d1");
  if (!fs.existsSync(stateDir)) {
    throw new Error("Pas de D1 locale trouvée. Lance d'abord : npm run db:migrate:local");
  }
  // Chercher le fichier .sqlite le plus récent
  const walk = (dir: string): string[] => {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : p.endsWith(".sqlite") ? [p] : [];
    });
  };
  const files = walk(stateDir);
  if (files.length === 0) {
    throw new Error("Aucun .sqlite local. Lance : npm run db:migrate:local");
  }
  return files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
}

async function main() {
  const dbPath = findLocalD1();
  console.log(`[seed] DB locale : ${dbPath}`);

  const sqlite = new Database(dbPath);
  const _db = drizzle(sqlite);

  // ─── Insérer ici tes données seed ─────────────────────────────
  // Ex :
  // await _db.insert(schema.user).values({
  //   id: "seed-admin",
  //   name: "Admin",
  //   email: "admin@example.com",
  //   role: "admin",
  //   emailVerified: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // }).onConflictDoNothing();

  console.log("[seed] OK");
  sqlite.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
