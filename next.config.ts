import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE;
const mediaHost = mediaBase ? new URL(mediaBase).hostname : undefined;
const mediaOrigin = mediaHost ? `https://${mediaHost}` : "";
const isProd = process.env.NODE_ENV === "production";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${mediaOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${mediaOrigin}`.trim(),
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' javascript:",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  /** Fixe la racine Turbopack pour ce projet (évite la confusion avec
   * d'éventuels lockfiles parents dans `freelance/`). */
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: mediaHost
      ? [{ protocol: "https", hostname: mediaHost, pathname: "/**" }]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

// ─── OpenNext Cloudflare dev bindings ────────────────────────────────
// Activer UNIQUEMENT quand `wrangler.jsonc` a un vrai `database_id` D1 et
// un vrai `id` KV. Sinon wrangler tente de se connecter à des bindings
// inexistants en boucle → 100 % RAM en quelques secondes (cf. incident dev).
//
// Décommenter quand prêt :
//   initOpenNextCloudflareForDev();
void initOpenNextCloudflareForDev;

export default nextConfig;
