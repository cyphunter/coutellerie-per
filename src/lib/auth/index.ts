import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";

/**
 * Better-Auth configuré pour Cloudflare D1 via Drizzle.
 *
 * Évaluation paresseuse : `buildAuth()` n'est appelée qu'à la première
 * requête vers `/api/auth/...`. Sans ça, importer ce module au build
 * appelle `getCloudflareContext()` hors d'une requête → crash / boucle.
 *
 * Cf. CONVENTIONS.md §13.
 */
// Binding D1 temporairement désactivé dans wrangler.jsonc (cf. src/lib/db/index.ts).
type EnvWithDb = CloudflareEnv & { DB: D1Database };

function buildAuth() {
  const { env } = getCloudflareContext();
  const db = drizzle((env as EnvWithDb).DB, { schema });

  return betterAuth({
    baseURL: env.NEXT_PUBLIC_SITE_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      autoSignIn: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    advanced: {
      cookies: {
        sessionToken: {
          name: env.AUTH_COOKIE_NAME ?? "coutellerie_per_session",
          attributes: { sameSite: "strict", secure: true, httpOnly: true },
        },
      },
    },
    rateLimit: {
      enabled: true,
      window: 60 * 15,
      max: 5,
    },
  });
}

type AuthInstance = ReturnType<typeof buildAuth>;
let _instance: AuthInstance | null = null;

export function getAuth(): AuthInstance {
  if (!_instance) _instance = buildAuth();
  return _instance;
}

/**
 * Proxy paresseux : `auth.handler(...)` n'instancie qu'au premier accès.
 * Permet d'importer ce module sans déclencher `getCloudflareContext()`
 * au build / en dev sans bindings configurés.
 */
export const auth = new Proxy({} as AuthInstance, {
  get(_target, prop) {
    const real = getAuth() as unknown as Record<string | symbol, unknown>;
    return real[prop];
  },
});

export type Session = AuthInstance["$Infer"]["Session"];
