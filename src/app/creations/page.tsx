import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { knives, getRecent } from "@/data/knives";
import { KnifeCard } from "@/components/public/knife-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaSection } from "@/components/public/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Dernières créations",
  description:
    "Les couteaux récemment sortis de l'atelier Coutellerie Per — pièces fraîches du tas, en commande ou en cours. Vannes, Bretagne.",
  path: "/creations",
});

export default function CreationsPage() {
  const recent = getRecent();
  const olderByYear = knives
    .filter((k) => !k.recent && k.year)
    .reduce<Record<number, typeof knives>>((acc, k) => {
      const y = k.year!;
      if (!acc[y]) acc[y] = [];
      (acc[y] as typeof knives extends readonly (infer U)[] ? U[] : never[]).push(
        k as never,
      );
      return acc;
    }, {});

  const olderYears = Object.keys(olderByYear)
    .map((y) => Number(y))
    .sort((a, b) => b - a);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Dernières créations", path: "/creations" },
        ])}
      />
      <main id="main-content">
        {/* Header */}
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>Dernières créations</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              Sorties{" "}
              <span className="italic text-brand-accent">récentes</span> de
              l'atelier.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              Pièces uniques fraîchement montées. Certaines sont disponibles à
              l'achat, d'autres déjà parties — toutes peuvent inspirer une commande
              sur-mesure.
            </p>
          </div>
        </section>

        {/* Sélection actuelle */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>{`${new Date().getFullYear()}`}</Eyebrow>
                <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                  Cette année à l'établi.
                </h2>
              </div>
              <p className="hidden text-sm text-muted md:block">
                {recent.length} pièce{recent.length > 1 ? "s" : ""}
              </p>
            </div>

            {recent.length > 0 ? (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recent.map((knife) => (
                  <KnifeCard key={knife.slug} knife={knife} />
                ))}
              </div>
            ) : (
              <p className="mt-12 text-muted">
                Aucune pièce récente pour le moment — l'atelier est en commande.
                Revenez bientôt ou écrivez-nous pour vous tenir informé.
              </p>
            )}
          </div>
        </section>

        {/* Archives par année */}
        {olderYears.length > 0 ? (
          <section className="border-t border-rule bg-paper-deep py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <div className="max-w-2xl">
                <Eyebrow>
                  <Calendar size={14} aria-hidden />
                  Archives
                </Eyebrow>
                <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                  Pièces des années précédentes.
                </h2>
                <p className="mt-4 text-muted">
                  Toutes les pièces ci-dessous sont parties chez leur propriétaire.
                  Elles restent en ligne à titre de référence, pour inspirer une
                  prochaine commande.
                </p>
              </div>

              {olderYears.map((year) => {
                const items = olderByYear[year]!;
                return (
                  <div key={year} className="mt-16">
                    <h3 className="font-display text-3xl text-ink">{year}</h3>
                    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {items.map((knife) => (
                        <KnifeCard key={knife.slug} knife={knife} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="bg-paper py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="justify-center">Galerie complète</Eyebrow>
            <p className="mt-6 text-lg text-ink/85">
              Pour voir l'ensemble du travail classé par type de couteau, rendez-vous
              dans la galerie.
            </p>
            <Link
              href="/galerie"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-sm border border-ink/30 px-6 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Galerie par catégorie
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </section>

        <CtaSection
          eyebrow="Commande individuelle"
          title="Et le prochain — sera peut-être le vôtre."
          description="Lancez votre projet : dessin, choix des matériaux, prototype, forge. Comptez quatre à douze semaines selon la complexité."
          primary={{ label: "Démarrer un projet", href: "/contact" }}
        />
      </main>
    </>
  );
}
