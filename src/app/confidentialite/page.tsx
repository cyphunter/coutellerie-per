import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et traitement des données personnelles — Coutellerie Per.",
  path: "/confidentialite",
  noindex: true,
});

export default function Confidentialite() {
  return (
    <main id="main-content" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
          Vie privée
        </p>
        <h1 className="mt-4 font-display text-[var(--text-display-lg)] text-ink">
          Politique de confidentialité
        </h1>

        <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand-accent">
          <p>
            La présente politique décrit comment {siteConfig.legalName} traite vos
            données personnelles lorsque vous utilisez ce site ({siteConfig.url}).
            Elle est rédigée en conformité avec le Règlement général sur la
            protection des données (RGPD).
          </p>

          <h2>1. Données collectées</h2>
          <ul>
            <li>
              <strong>Formulaire de contact</strong> : nom, email, téléphone
              (facultatif), catégorie de demande, sujet, message.
            </li>
            <li>
              <strong>Empreinte technique</strong> : un hash non-réversible de
              votre adresse IP est conservé pour la prévention des abus
              (anti-spam, rate-limiting). Aucune IP brute n'est conservée.
            </li>
            <li>
              <strong>Analytics</strong> : Cloudflare Web Analytics — métriques
              agrégées anonymes (pages vues, performances). Aucun cookie tiers,
              aucune donnée personnelle.
            </li>
          </ul>

          <h2>2. Finalités</h2>
          <ul>
            <li>Répondre à vos demandes via le formulaire de contact.</li>
            <li>Établir un devis et assurer le suivi commercial.</li>
            <li>Prévenir les abus (spam, attaques) sur le site.</li>
            <li>Mesurer l'audience du site de façon anonyme.</li>
          </ul>

          <h2>3. Base légale</h2>
          <p>
            Consentement (formulaire de contact, case à cocher RGPD non
            pré-cochée) ou intérêt légitime (analytics anonymes, sécurité).
          </p>

          <h2>4. Durée de conservation</h2>
          <ul>
            <li>Demandes de contact : 3 ans après le dernier échange.</li>
            <li>Devis et commandes : 10 ans à des fins légales et comptables.</li>
            <li>Hash IP anti-spam : 30 jours.</li>
            <li>Analytics : données agrégées, pas de stockage individuel.</li>
          </ul>

          <h2>5. Destinataires</h2>
          <p>
            Vos données sont accessibles uniquement à {siteConfig.legalName}.
            Elles ne sont jamais cédées, vendues ou louées à un tiers. Le
            prestataire d'envoi d'emails (Resend) traite les emails uniquement
            pour leur acheminement technique.
          </p>

          <h2>6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification, d'effacement, de limitation, de portabilité et
            d'opposition. Pour exercer ces droits :{" "}
            <a href={`mailto:${siteConfig.legal.dpoEmail}`}>
              {siteConfig.legal.dpoEmail}
            </a>
            .
          </p>
          <p>
            Vous pouvez également déposer une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>
            .
          </p>

          <h2>7. Cookies</h2>
          <p>
            Ce site n'utilise que des cookies strictement nécessaires à son
            fonctionnement (session si vous êtes connecté à un compte). Aucun
            cookie tiers de tracking n'est déposé. Cloudflare Web Analytics
            fonctionne sans cookie.
          </p>

          <h2>8. Hébergement</h2>
          <p>
            Le site est hébergé par {siteConfig.legal.host.name}
            {" — "}
            {siteConfig.legal.host.address}. Les serveurs Cloudflare utilisent
            par défaut un réseau mondial ; les requêtes provenant d'Europe sont
            servies depuis l'Europe.
          </p>

          <h2>9. Mises à jour</h2>
          <p>
            Cette politique peut être mise à jour pour refléter les évolutions
            du site ou de la réglementation. La date de dernière mise à jour
            sera indiquée ici.
          </p>
        </div>
      </div>
    </main>
  );
}
