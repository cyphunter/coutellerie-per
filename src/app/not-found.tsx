import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="bg-paper-deep flex min-h-[70vh] items-center justify-center px-6 py-20"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
          Erreur 404
        </p>
        <p className="mt-6 font-display text-[clamp(5rem,12vw,9rem)] leading-none text-ink">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          La page demandée s'est égarée.
        </h1>
        <p className="mt-4 max-w-md mx-auto text-muted">
          Le couteau, lui, ne se perd pas en chemin — mais cette page si. Elle
          n'existe pas ou a été déplacée.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
          >
            <ArrowLeft size={16} aria-hidden />
            Retour à l'accueil
          </Link>
          <Link
            href="/galerie"
            className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink/30 px-6 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Voir la galerie
          </Link>
        </div>
      </div>
    </main>
  );
}
