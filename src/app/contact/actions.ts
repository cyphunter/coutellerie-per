"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { contactSchema, getCategoryLabel } from "@/lib/schemas/contact";
import { sanitize } from "@/lib/sanitize";
import { siteConfig } from "@/lib/site-config";
import ContactNotificationEmail from "@/emails/contact-notification";
import ContactConfirmationEmail from "@/emails/contact-confirmation";
import { getDbAsync } from "@/lib/db";
import { contactRequest } from "@/lib/db/schema";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string>>;
    };

const DATE_FR = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Paris",
});

/**
 * Hash SHA-256 d'une IP — on garde une empreinte non-réversible pour la
 * détection d'abus (rate limit, spam) sans stocker d'IP brute (RGPD).
 */
async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  const encoded = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

async function getClientIp(): Promise<string | null> {
  try {
    const hdrs = await headers();
    const cfIp = hdrs.get("cf-connecting-ip");
    if (cfIp) return cfIp;
    const xff = hdrs.get("x-forwarded-for");
    if (xff) return xff.split(",")[0]!.trim();
    return hdrs.get("x-real-ip");
  } catch {
    return null;
  }
}

async function getUserAgent(): Promise<string | null> {
  try {
    const hdrs = await headers();
    return hdrs.get("user-agent");
  } catch {
    return null;
  }
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    category: String(formData.get("category") ?? "autre"),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    website: String(formData.get("website") ?? ""),
    consent: formData.get("consent") === "on",
  };

  // Honeypot : si le champ caché "website" est rempli, on simule un succès
  // pour ne pas alerter le bot. Aucun email, aucune écriture.
  if (raw.website) {
    return { status: "success", message: "Merci, votre message a bien été reçu." };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Veuillez corriger les champs indiqués avant d'envoyer.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const safeMessage = sanitize(data.message);
  const safeSubject = sanitize(data.subject);
  const categoryLabel = getCategoryLabel(data.category);
  const now = new Date();

  try {
    const { env } = getCloudflareContext();
    const inbox =
      (env as unknown as { CONTACT_INBOX?: string }).CONTACT_INBOX ??
      siteConfig.contact.email;
    const apiKey = (env as unknown as { RESEND_API_KEY?: string }).RESEND_API_KEY;

    // Trace DB (best-effort, ne bloque pas l'envoi mail si DB indisponible)
    try {
      const db = await getDbAsync();
      const ip = await getClientIp();
      const ipHash = await hashIp(ip);
      const ua = await getUserAgent();
      await db.insert(contactRequest).values({
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        category: data.category,
        subject: safeSubject,
        message: safeMessage,
        ipHash,
        userAgent: ua,
        status: "new",
        createdAt: now,
      });
    } catch (dbError) {
      console.error("[contact] DB insert failed:", dbError);
    }

    if (apiKey) {
      const resend = new Resend(apiKey);
      const receivedAt = DATE_FR.format(now);

      // Notification interne
      await resend.emails.send({
        from: `Coutellerie Per <contact@coutellerie-per.fr>`,
        to: inbox,
        replyTo: data.email,
        subject: `[Coutellerie Per] ${categoryLabel} — ${safeSubject}`,
        react: ContactNotificationEmail({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          categoryLabel,
          subject: safeSubject,
          message: safeMessage,
          receivedAt,
        }),
      });

      // Confirmation au client
      await resend.emails.send({
        from: `Coutellerie Per <contact@coutellerie-per.fr>`,
        to: data.email,
        replyTo: inbox,
        subject: "Votre demande à la Coutellerie Per",
        react: ContactConfirmationEmail({
          name: data.name,
          subject: safeSubject,
          message: safeMessage,
        }),
      });
    } else {
      console.warn(
        "[contact] RESEND_API_KEY non défini — message reçu mais aucun email envoyé.",
      );
    }

    return {
      status: "success",
      message:
        "Merci pour votre message. Nous vous répondons sous deux à trois jours ouvrés.",
    };
  } catch (error) {
    console.error("[contact] submission failed:", error);
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Vous pouvez nous joindre directement par téléphone si urgent.",
    };
  }
}
