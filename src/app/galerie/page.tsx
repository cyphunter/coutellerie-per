import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { KNIFE_CATEGORIES, knives, type KnifeCategory } from "@/data/knives";
import { KnifeCard } from "@/components/public/knife-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaSection } from "@/components/public/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Galerie",
  description:
    "Galerie des couteaux artisanaux de Coutellerie Per : pliants, droits, Sgian Dubh, Puukko, Ulu, marins. Pièces uniques forgées à la main à Vannes.",
  path: "/galerie",
});

const CATEGORY_ORDER: KnifeCategory[] = [
  "pliant",
  "droit",
  "sgian-dubh",
  "puukko",
  "ulu",
  "marin",
  "usage",
];

export default function GaleriePage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Galerie", path: "/galerie" },
        ])}
      />
      <main id="main-content">
        {/* Header */}
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>Galerie</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              Les couteaux de l'atelier,{" "}
              <span className="italic text-brand-accent">par famille</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              {knives.length} pièces uniques, classées par usage. Chaque couteau
              présenté ici a déjà existé en exemplaire unique — il peut être
              décliné ou réinterprété pour vous, sur commande.
            </p>
          </div>

          {/* Navigation par ancres */}
          <div className="mx-auto mt-12 max-w-6xl px-6">
            <nav aria-label="Catégories de couteaux">
              <ul className="flex flex-wrap gap-2">
                {CATEGORY_ORDER.map((cat) => {
                  const count = knives.filter((k) => k.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <li key={cat}>
                      <a
                        href={`#${cat}`}
                        className="inline-flex items-center gap-2 rounded-sm border border-rule bg-paper px-4 py-2 text-sm text-ink/80 transition-colors hover:border-brand-accent hover:text-brand-accent"
                      >
                        {KNIFE_CATEGORIES[cat].label}
                        <span className="text-xs text-muted">({count})</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </section>

        {/* Catégories */}
        {CATEGORY_ORDER.map((cat) => {
          const items = knives.filter((k) => k.category === cat);
          if (items.length === 0) return null;
          const meta = KNIFE_CATEGORIES[cat];

          return (
            <section
              key={cat}
              id={cat}
              className="scroll-mt-24 border-b border-rule bg-paper py-20 md:py-28 odd:bg-paper-deep"
            >
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    <Eyebrow>{`${items.length} pièce${items.length > 1 ? "s" : ""}`}</Eyebrow>
                    <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                      {meta.label}
                    </h2>
                  </div>
                  <p className="text-muted lg:col-span-5">{meta.description}</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((knife) => (
                    <KnifeCard key={knife.slug} knife={knife} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Bandeau prix */}
        <section className="bg-paper py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="justify-center">Prix sur devis</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Chaque pièce étant unique, les prix ne sont pas affichés en
              ligne — ils dépendent du choix de l'acier, du manche, des
              finitions et des gravures éventuelles. Un devis détaillé et gratuit
              vous est remis sous deux jours ouvrés.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
            >
              Demander un devis
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </section>

        <CtaSection
          eyebrow="Pièce sur-mesure"
          title="Pas trouvé exactement ce que vous cherchiez ?"
          description="Aucune de ces pièces ne correspond ? Pas grave : 80 % des couteaux qui sortent de l'atelier sont des commandes individuelles. Décrivez-nous votre projet."
          primary={{ label: "Lancer un projet", href: "/contact" }}
          secondary={{ label: "Voir les services", href: "/services" }}
        />
      </main>
    </>
  );
}
