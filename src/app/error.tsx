"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="bg-paper-deep flex min-h-[70vh] items-center justify-center px-6 py-20"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
          Erreur serveur
        </p>
        <p className="mt-6 font-display text-[clamp(5rem,12vw,9rem)] leading-none text-ink">
          500
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          L'atelier traverse un petit pépin.
        </h1>
        <p className="mt-4 max-w-md mx-auto text-muted">
          Une erreur inattendue s'est produite. Réessayez dans un instant — ou
          revenez à l'accueil. Si le problème persiste, contactez-nous.
        </p>
        {error.digest ? (
          <p className="mt-4 text-xs text-muted">Référence : {error.digest}</p>
        ) : null}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand-accent px-6 text-sm font-medium text-white transition-colors hover:bg-brand-accent-soft hover:text-paper"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink/30 px-6 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
