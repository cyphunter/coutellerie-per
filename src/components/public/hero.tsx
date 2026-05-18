import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";

/* Image hero — pour changer, pointer vers un autre .webp de
 * `public/images/knives/` et adapter l'alt. Si la composition cadre mal,
 * jouer sur `objectPosition` (ex. "55% 60%"). */
const HERO_IMAGE = {
  src: "/images/knives/droit-cerf-acier.webp",
  alt: "Couteau droit forgé à la main, manche en bois de cerf et étui cuir sur un plan d'atelier de coutellerie",
  objectPosition: "60% 55%",
} as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper-deep"
    >
      {/* Image de fond plein écran */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: HERO_IMAGE.objectPosition }}
        className="-z-10"
      />

      {/* Voiles sombres — overlay indépendant de la palette pour garantir
          la lisibilité du texte par-dessus la photo. Plus dense en bas
          pour ancrer le contenu. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/45 to-black/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/20 to-transparent"
      />

      {/* Contenu — ancré en bas-gauche sur desktop, centré bas sur mobile */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pb-28 lg:pb-32">
        <div className="max-w-2xl">
          <Eyebrow className="text-brand-accent-soft">
            Atelier de coutellerie d'art · depuis {siteConfig.foundedYear}
          </Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[var(--text-display-xl)] leading-[1.05] text-white"
          >
            Couteaux forgés{" "}
            <span className="italic text-brand-accent-soft">à la main</span> dans
            l'atelier de Vannes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            P. et G. Chémereau dessinent, forgent, trempent et montent chaque
            couteau — pliants, droits, Sgian Dubh, Puukko — comme une pièce unique
            destinée à durer toute une vie.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/galerie"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white shadow-md transition-colors hover:bg-brand-accent-soft hover:text-paper"
            >
              Découvrir la galerie
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-white/30 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Demander un devis sur-mesure
            </Link>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll — animation discrète, respect reduced-motion */}
      <a
        href="#after-hero"
        aria-label="Faire défiler vers la suite"
        className="group absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white motion-safe:animate-bounce"
      >
        <span aria-hidden>Découvrir</span>
        <ArrowDown size={16} strokeWidth={1.5} aria-hidden />
      </a>
    </section>
  );
}
