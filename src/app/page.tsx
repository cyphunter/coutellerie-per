import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Hammer, MapPin, Phone } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getFeatured, getRecent } from "@/data/knives";
import { Hero } from "@/components/public/hero";
import { PressStrip } from "@/components/public/press-strip";
import { ServicesOverview } from "@/components/public/services-overview";
import { KnifeCard } from "@/components/public/knife-card";
import { CtaSection } from "@/components/public/cta-section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: null,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeatured();
  const recent = getRecent();

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Accueil", path: "/" }])} />
      <main id="main-content">
        <Hero />
        <div id="after-hero" />
        <PressStrip />

        {/* Section "L'atelier en quelques mots" */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Eyebrow>L'atelier</Eyebrow>
                <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                  Forge, lame, manche — gestes inchangés depuis quarante ans.
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-ink/85 lg:col-span-7">
                <p>
                  À deux pas du port de Vannes, l'atelier Coutellerie Per dessine,
                  forge, trempe et monte des couteaux à la main depuis plus de
                  quatre décennies. Aucune chaîne, aucune machine de série :
                  chaque pièce sort de la même paire de mains, dans le même atelier.
                </p>
                <p>
                  La lame est choisie pour son acier — carbone XC, inox marin,
                  damas multicouche ou torsadé. Le manche est sélectionné dans le
                  bois local (if, bouleau, hêtre, buis), la morta noire des
                  tourbières celtes, ou des matières plus rares — os scrimshaw,
                  ambre baltique, bois de cerf, fibre de carbone.
                </p>
                <p>
                  Ce qui sort de l'atelier est destiné à durer : à un usage, à une
                  vie, à une transmission.
                </p>

                <div className="pt-2">
                  <Link
                    href="/atelier"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
                  >
                    Découvrir l'atelier et la démarche
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>

            {/* Chiffres-clés */}
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-4">
              {[
                { label: "Année de fondation", value: siteConfig.foundedYear.toString() },
                { label: "Pièces uniques montées", value: "+ 2 000" },
                { label: "Apparitions TV", value: "2" },
                { label: "Métiers cumulés", value: "4" },
              ].map((stat) => (
                <div key={stat.label} className="bg-paper-deep p-6">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-3xl text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Pièces emblématiques */}
        <section className="border-y border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Pièces emblématiques</Eyebrow>
                <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                  Trois couteaux, trois manières de raconter le métier.
                </h2>
              </div>
              <Link
                href="/galerie"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
              >
                Galerie complète
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((knife) => (
                <KnifeCard key={knife.slug} knife={knife} />
              ))}
            </div>
          </div>
        </section>

        <ServicesOverview />

        {/* Dernières créations */}
        <section className="bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Dernières créations</Eyebrow>
                <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                  Sorties récentes de l'atelier.
                </h2>
                <p className="mt-4 text-muted">
                  Pièces uniques, fraîches du tas — disponibles ou en cours.
                </p>
              </div>
              <Link
                href="/creations"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
              >
                Toutes les créations récentes
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recent.slice(0, 3).map((knife) => (
                <KnifeCard key={knife.slug} knife={knife} />
              ))}
            </div>
          </div>
        </section>

        {/* Bandeau atelier — coordonnées et visite */}
        <section className="bg-paper py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
            <div className="flex gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
              >
                <MapPin size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">
                  Visiter l'atelier
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {siteConfig.contact.address}
                  <br />
                  {siteConfig.contact.postalCode} {siteConfig.contact.city}
                </p>
                <Link
                  href="/plan-acces"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                >
                  Plan d'accès <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
              >
                <Phone size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">Téléphoner</h3>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="mt-2 block text-sm text-muted hover:text-ink"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <p className="mt-3 text-xs text-muted whitespace-pre-line">
                  {siteConfig.contact.openingHoursLabel}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-paper-deep text-brand-accent"
              >
                <Hammer size={20} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">
                  Commander sur-mesure
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Un couteau dessiné avec vous, forgé pour votre main, votre
                  usage, votre transmission.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                >
                  Demander un devis <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CtaSection
          eyebrow="Un projet de couteau ?"
          title="Parlons-en autour de l'établi."
          description="Que ce soit pour une commande sur-mesure, un affûtage de qualité ou la remise en état d'un couteau de famille — l'atelier vous répond sous deux jours ouvrés."
          primary={{ label: "Écrire à l'atelier", href: "/contact" }}
          secondary={{ label: "Voir la galerie", href: "/galerie" }}
        />
      </main>
    </>
  );
}
