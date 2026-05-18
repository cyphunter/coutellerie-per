import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez Coutellerie Per à Vannes — demande de devis, affûtage, restauration ou visite d'atelier. Réponse sous 48h.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <main id="main-content">
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              Écrire à{" "}
              <span className="italic text-brand-accent">l'atelier</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              Un projet de couteau, un couteau à affûter, une restauration, ou
              simplement l'envie de discuter du métier ? L'atelier répond sous
              deux à trois jours ouvrés.
            </p>
          </div>
        </section>

        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12">
            {/* Coordonnées */}
            <aside className="lg:col-span-4">
              <h2 className="font-display text-2xl text-ink">Coordonnées</h2>
              <ul className="mt-8 space-y-6 text-sm">
                <li className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
                  >
                    <MapPin size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-medium uppercase tracking-[0.18em] text-xs text-ink">
                      Atelier
                    </p>
                    <address className="not-italic mt-1 text-muted">
                      {contact.address}
                      <br />
                      {contact.postalCode} {contact.city}
                      <br />
                      {contact.region}, {contact.countryName}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
                  >
                    <Phone size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-medium uppercase tracking-[0.18em] text-xs text-ink">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="mt-1 block text-muted hover:text-ink"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
                  >
                    <Mail size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-medium uppercase tracking-[0.18em] text-xs text-ink">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block text-muted hover:text-ink"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
                  >
                    <Clock size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-medium uppercase tracking-[0.18em] text-xs text-ink">
                      Horaires
                    </p>
                    <p className="mt-1 whitespace-pre-line text-muted">
                      {contact.openingHoursLabel}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      {contact.appointmentNote}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 rounded-sm border border-rule bg-paper-deep p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  Bon à savoir
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">
                  Pour un envoi de couteau à affûter ou restaurer, contactez
                  l'atelier au préalable pour valider la prise en charge et
                  l'emballage. Nous vous indiquons la procédure exacte.
                </p>
              </div>
            </aside>

            {/* Formulaire */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl text-ink">
                Formulaire de contact
              </h2>
              <p className="mt-2 text-sm text-muted">
                Décrivez votre demande aussi précisément que possible —
                cela permet de vous répondre plus vite et plus juste.
              </p>
              <div className="mt-8">
                <Suspense
                  fallback={
                    <div className="h-64 animate-pulse rounded-sm bg-paper-deep" />
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
