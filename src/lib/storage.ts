/**
 * Helpers R2 — résolution URL publique d'un fichier média.
 *
 * Stratégie :
 *  - Si NEXT_PUBLIC_MEDIA_BASE défini (ex. https://media.PROJECT.fr) → URL directe (0 hit Worker)
 *  - Sinon → route proxy /media/<path> servie par le Worker (auth possible, marche partout)
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getMediaUrl(storagePath: string | null | undefined): string | null {
  if (!storagePath) return null;
  const cleanPath = storagePath.replace(/^\/+/, "");
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE;
  if (base) {
    return `${base.replace(/\/+$/, "")}/${cleanPath}`;
  }
  return `/media/${cleanPath}`;
}

export async function getMediaBucket() {
  const { env } = await getCloudflareContext({ async: true });
  return env.MEDIA_BUCKET;
}

/**
 * Upload côté serveur. Valider taille + MIME AVANT d'appeler.
 * Préférer compresser côté client (browser-image-compression) avant POST.
 */
export async function uploadMedia(
  path: string,
  body: ReadableStream | ArrayBuffer | string | Blob,
  contentType: string,
): Promise<void> {
  const bucket = await getMediaBucket();
  await bucket.put(path, body, {
    httpMetadata: { contentType, cacheControl: "public, max-age=31536000, immutable" },
  });
}

export const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
] as const;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
