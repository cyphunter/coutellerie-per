/**
 * Secrets Cloudflare — ajoutés via `wrangler secret put NOM`.
 *
 * `wrangler types` ne génère QUE les bindings/vars déclarés dans
 * `wrangler.jsonc`. Les secrets, qui n'y figurent pas (pour éviter
 * tout commit accidentel), doivent être déclarés ici à la main.
 *
 * TypeScript fusionne automatiquement cette déclaration avec
 * l'interface `CloudflareEnv` générée par `wrangler types`.
 *
 * Pour déployer, lancer :
 *   wrangler secret put BETTER_AUTH_SECRET
 *   wrangler secret put RESEND_API_KEY
 *   wrangler secret put CONTACT_INBOX            # optionnel
 *   wrangler secret put RESEND_WEBHOOK_SECRET    # optionnel
 */

interface CloudflareEnv {
  BETTER_AUTH_SECRET: string;
  RESEND_API_KEY: string;
  CONTACT_INBOX?: string;
  RESEND_WEBHOOK_SECRET?: string;
}
