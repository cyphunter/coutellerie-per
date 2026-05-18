import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hammer, Scissors, Wrench, Scroll, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { services, type Service } from "@/data/services";
import { faq } from "@/data/faq";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaSection } from "@/components/public/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Coutellerie Per propose la fabrication sur-mesure de couteaux artisanaux, l'affûtage professionnel à la pierre à eau, la restauration de couteaux anciens et la gravure manuelle.",
  path: "/services",
});

const ICONS: Record<Service["iconName"], LucideIcon> = {
  hammer: Hammer,
  scissors: Scissors,
  wrench: Wrench,
  scroll: Scroll,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd schema={faqSchema(faq)} />

      <main id="main-content">
        {/* Header */}
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              Quatre métiers,{" "}
              <span className="italic text-brand-accent">un seul atelier</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              Forger un couteau neuf, affûter un fil émoussé, redonner vie à une
              lame ancienne ou graver une mitre — l'atelier vous accompagne sur
              ces quatre métiers complémentaires.
            </p>
          </div>

          {/* Sommaire ancres */}
          <div className="mx-auto mt-10 max-w-6xl px-6">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-sm border border-rule bg-paper px-4 py-2 text-sm text-ink/80 hover:border-brand-accent hover:text-brand-accent"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sections services */}
        {services.map((service, idx) => {
          const Icon = ICONS[service.iconName];
          const isEven = idx % 2 === 0;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className={`scroll-mt-24 py-20 md:py-28 ${
                isEven ? "bg-paper" : "bg-paper-deep border-y border-rule"
              }`}
            >
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-5">
                    <span
                      aria-hidden
                      className="inline-flex h-14 w-14 items-center justify-center rounded-sm bg-ink text-brand-accent-soft"
                    >
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <Eyebrow as="p" className="mt-6">
                      Service {String(idx + 1).padStart(2, "0")}
                    </Eyebrow>
                    <h2 className="mt-4 font-display text-[var(--text-display-md)] leading-[1.15] text-ink">
                      {service.title}
                    </h2>
                    <p className="mt-6 text-muted">{service.short}</p>
                    <Link
                      href={`/contact?categorie=${service.slug}`}
                      className="mt-8 inline-flex h-11 items-center gap-2 rounded-sm bg-brand-accent px-5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
                    >
                      Demander pour ce service
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-ink/85">
                      {service.description}
                    </p>
                    <ul className="mt-10 space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-ink/85">
                          <span
                            aria-hidden
                            className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent"
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* FAQ */}
        <section className="border-t border-rule bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
              Vous vous demandez peut-être…
            </h2>

            <dl className="mt-12 divide-y divide-rule border-y border-rule">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group py-6"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-ink hover:text-brand-accent">
                    <dt className="font-display text-xl leading-snug">
                      {item.question}
                    </dt>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rule text-xs text-brand-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 text-muted">{item.answer}</dd>
                </details>
              ))}
            </dl>
          </div>
        </section>

        <CtaSection
          eyebrow="Pas de question stupide"
          title="Une question, un projet, un doute ?"
          description="Le téléphone marche toujours, l'email aussi. L'atelier répond sous deux jours ouvrés — souvent moins."
          primary={{ label: "Écrire à l'atelier", href: "/contact" }}
          secondary={{ label: "Voir la galerie", href: "/galerie" }}
        />
      </main>
    </>
  );
}
