import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook Resend — bounces, complaints, deliveries.
 * Doc : https://resend.com/docs/dashboard/webhooks/introduction
 *
 * Vérifier la signature Svix (headers `svix-id`, `svix-timestamp`, `svix-signature`).
 * Secret webhook à mettre via `wrangler secret put RESEND_WEBHOOK_SECRET`.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const id = req.headers.get("svix-id");
  const ts = req.headers.get("svix-timestamp");
  const sig = req.headers.get("svix-signature");

  if (!id || !ts || !sig) {
    return NextResponse.json({ ok: false, error: "missing-headers" }, { status: 400 });
  }

  // TODO : vérifier signature avec librairie svix ou Web Crypto HMAC
  // const valid = await verifySvixSignature(body, id, ts, sig, env.RESEND_WEBHOOK_SECRET);
  // if (!valid) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const event = JSON.parse(body) as { type: string; data: Record<string, unknown> };
    switch (event.type) {
      case "email.bounced":
      case "email.complained":
        // TODO : marquer l'email comme hard-bounced en DB
        break;
      case "email.delivered":
      case "email.opened":
      case "email.clicked":
        // analytics email — optionnel
        break;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }
}
