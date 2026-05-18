import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { press } from "@/data/press";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PlaceholderImage } from "@/components/public/placeholder-image";
import { CtaSection } from "@/components/public/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "L'atelier",
  description:
    "Coutellerie Per — l'atelier de P. et G. Chémereau à Vannes : forge, trempe, montage à la main. Pièces uniques depuis plus de quarante ans.",
  path: "/atelier",
});

const STEPS = [
  {
    title: "Dessin",
    body:
      "Chaque couteau commence par un trait. Silhouette, point d'équilibre, choix de la soie — tout est fixé sur le papier avant la première étincelle.",
  },
  {
    title: "Forge",
    body:
      "L'acier est chauffé à plus de 800 °C, puis battu pour resserrer sa structure. Pour les damas, dix à cent vingt couches sont soudées, étirées, repliées.",
  },
  {
    title: "Trempe",
    body:
      "La lame est portée au rouge cerise puis brutalement refroidie. C'est ce choc qui durcit l'acier — geste irréversible, contrôlé à la flamme.",
  },
  {
    title: "Émouture",
    body:
      "Le fil est dégagé à la meule à eau. Plate, scandinave, convexe : la géométrie est choisie en fonction de l'usage prévu, sans surchauffe.",
  },
  {
    title: "Montage",
    body:
      "Mitres, soie traversante, manche bois ou os, rivets. Tout est ajusté à la lime, à la main — pas de colle structurelle, du laiton, du bronze, du temps.",
  },
  {
    title: "Finition",
    body:
      "Polissage doux, ravivage de la lame, huile sur le bois, étui cuir cousu main pour les couteaux droits. La pièce est numérotée et part vivre.",
  },
];

export default function AtelierPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "L'atelier", path: "/atelier" },
        ])}
      />
      <main id="main-content">
        {/* Header */}
        <section className="border-b border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow>L'atelier</Eyebrow>
            <h1 className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-ink">
              P. et G. Chémereau,{" "}
              <span className="italic text-brand-accent">artisans couteliers</span>{" "}
              à Vannes.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              Un atelier indépendant fondé en {siteConfig.foundedYear}, où chaque
              couteau est dessiné, forgé, trempé et monté de la même paire de
              mains, dans la même pièce, à quelques mètres du Golfe.
            </p>
          </div>
        </section>

        {/* Récit */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <PlaceholderImage
                variant="atelier"
                seed="atelier-portrait"
                alt="Vue d'atelier de coutellerie — enclume, marteau, couteau en cours de montage sur l'établi"
                className="aspect-[4/5] w-full rounded-sm"
              />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-ink/85 lg:col-span-7">
              <Eyebrow as="p">Un métier, pas une marque</Eyebrow>
              <h2 className="font-display text-[var(--text-display-md)] leading-[1.15] text-ink">
                « Un couteau, ce n'est pas un objet, c'est un service rendu. »
              </h2>
              <p>
                L'atelier ne suit pas de mode. Pas de collection capsule, pas de
                série limitée d'apparat — chaque pièce sort à son rythme, lorsque
                la lame, le manche et le geste se rencontrent. Cette lenteur n'est
                pas un argument marketing : c'est la condition même du métier.
              </p>
              <p>
                Le quotidien est partagé entre la forge, la meule, l'établi, et le
                bureau où sont reçus collectionneurs, marins, chasseurs, cuisiniers
                — tous ceux qui veulent un couteau pensé pour eux.
              </p>
              <p>
                À côté de la fabrication, l'atelier accepte aussi les couteaux des
                autres : pour leur rendre un fil, redresser un dos faussé, ou
                ressusciter une lame de famille piquée par les ans.
              </p>
            </div>
          </div>
        </section>

        {/* Étapes */}
        <section className="border-t border-rule bg-paper-deep py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <Eyebrow>Six étapes</Eyebrow>
              <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                Du croquis à l'étui — comment naît un couteau.
              </h2>
            </div>

            <ol className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step, idx) => (
                <li key={step.title} className="relative pl-12">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-sm bg-ink font-display text-lg text-paper"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Apparitions presse */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <Eyebrow>Médias</Eyebrow>
              <h2 className="mt-4 font-display text-[var(--text-display-lg)] leading-[1.1] text-ink">
                Le coutelier de Vannes, à l'antenne.
              </h2>
            </div>

            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {press.map((item) => (
                <li
                  key={`${item.outlet}-${item.date}`}
                  className="rounded-sm border border-rule bg-paper-deep p-8"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
                    {item.dateLabel}
                  </p>
                  <p className="mt-4 font-display text-3xl text-ink">
                    {item.outlet}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.program}</p>
                  <p className="mt-6 text-sm leading-relaxed text-ink/80">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Link
                href="/galerie"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
              >
                Voir les couteaux en galerie
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <CtaSection
          eyebrow="Visiter l'atelier"
          title="Pousser la porte de l'atelier."
          description="L'atelier est ouvert aux visiteurs aux horaires d'ouverture, et sur rendez-vous le reste du temps. C'est aussi le meilleur moyen de discuter d'un projet."
          primary={{ label: "Plan d'accès", href: "/plan-acces" }}
          secondary={{ label: "Écrire à l'atelier", href: "/contact" }}
        />
      </main>
    </>
  );
}
