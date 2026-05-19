import { NextResponse, type NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";

/**
 * Proxy global (anciennement `middleware` jusqu'à Next 15).
 *
 * Responsabilités :
 *  1. 301 legacy redirects (à activer lors d'une refonte)
 *  2. Protéger /admin via Better-Auth
 *
 * Note : les headers de sécurité sont émis via next.config.ts → headers().
 *
 * Runtime Edge obligatoire — Next 16 met le proxy/middleware en Node.js par
 * défaut, mais OpenNext sur Cloudflare exige Edge.
 */
export const runtime = "edge";

const LEGACY_REDIRECTS: Record<string, string> = {
  // "/ancien-chemin": "/nouveau-chemin",
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ─── Legacy redirects (refonte) ───────────────────────────────
  const redirect = LEGACY_REDIRECTS[pathname];
  if (redirect) {
    const url = req.nextUrl.clone();
    url.pathname = redirect;
    return NextResponse.redirect(url, 301);
  }

  // ─── Protection /admin ────────────────────────────────────────
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: req.nextUrl.origin,
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon-|apple-touch-|manifest|robots.txt|sitemap.xml).*)",
  ],
};
