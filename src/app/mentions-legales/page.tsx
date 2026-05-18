import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Coutellerie Per — identité éditeur et hébergeur.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegales() {
  const { legalName, legal, contact, url } = siteConfig;

  return (
    <main id="main-content" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
          Mentions
        </p>
        <h1 className="mt-4 font-display text-[var(--text-display-lg)] text-ink">
          Mentions légales
        </h1>

        <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand-accent">
          <h2>Éditeur du site</h2>
          <p>
            <strong>{legalName}</strong>
            <br />
            SIRET : {legal.siret} — {legal.rcs}
            <br />
            Capital social : {legal.capital}
            <br />
            Siège social : {contact.address}, {contact.postalCode} {contact.city}, {contact.countryName}
            <br />
            Téléphone : {contact.phoneDisplay}
            <br />
            Email : {contact.email}
            <br />
            Directeur de la publication : {legal.publisher}
          </p>

          <h2>Hébergeur</h2>
          <p>
            <strong>{legal.host.name}</strong>
            <br />
            {legal.host.address}
          </p>

          <h2>Conception et réalisation du site</h2>
          <p>
            Site conçu et développé par Kevin — développeur freelance — sur stack
            Next.js et Cloudflare Workers.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site ({url}) — textes,
            photographies, dessins, logos, vidéos — sont la propriété exclusive
            de {legalName} ou de leurs auteurs respectifs. Les couteaux présentés
            sont des créations originales protégées par le droit d'auteur. Toute
            reproduction, représentation, modification ou adaptation, totale ou
            partielle, sans autorisation écrite préalable est interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées via ce site est
            décrit dans la <a href="/confidentialite">politique de confidentialité</a>.
            Pour exercer vos droits RGPD, contactez : <a href={`mailto:${legal.dpoEmail}`}>{legal.dpoEmail}</a>.
          </p>

          <h2>Liens externes</h2>
          <p>
            Ce site peut comporter des liens vers d'autres sites internet. Ces
            liens sont fournis à titre informatif ; {legalName} décline toute
            responsabilité quant au contenu des sites tiers.
          </p>
        </div>
      </div>
    </main>
  );
}
