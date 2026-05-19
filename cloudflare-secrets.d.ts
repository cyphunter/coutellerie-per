/**
 * Type CloudflareEnv déclaré à la main (committé, pas généré).
 *
 * On évite d'utiliser `wrangler types` en CI parce que :
 *   - le fichier généré est gitignoré → manquant en CI
 *   - lancer `cf-typegen` au build CI a posé des problèmes de boucle
 *   - on garde une source de vérité unique, contrôlée, lisible
 *
 * Quand tu modifies un binding ou une var dans `wrangler.jsonc`,
 * pense à mettre à jour ce fichier en parallèle.
 *
 * Pour déployer les secrets :
 *   wrangler secret put BETTER_AUTH_SECRET
 *   wrangler secret put RESEND_API_KEY
 *   wrangler secret put CONTACT_INBOX            # optionnel
 *   wrangler secret put RESEND_WEBHOOK_SECRET    # optionnel
 */

interface CloudflareEnv {
  // ─── Vars publiques (wrangler.jsonc → vars) ──────────────────────
  NEXT_PUBLIC_SITE_URL: string;
  SITE_ID: string;
  AUTH_COOKIE_NAME: string;

  // ─── Bindings (wrangler.jsonc → assets / d1_databases / kv / r2) ─
  ASSETS: Fetcher;
  // DB est commenté dans wrangler.jsonc (le site n'a pas encore besoin de DB).
  // Déclaré ici pour que le code drizzle compile ; runtime crash si on tente
  // d'utiliser la DB. Réactiver le binding D1 quand auth/admin/contact-log
  // seront nécessaires.
  DB: D1Database;

  // ─── Secrets (wrangler secret put) ───────────────────────────────
  BETTER_AUTH_SECRET: string;
  RESEND_API_KEY: string;
  CONTACT_INBOX?: string;
  RESEND_WEBHOOK_SECRET?: string;
}
