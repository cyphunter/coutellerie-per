import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du site Coutellerie Per et conditions de vente des couteaux artisanaux.",
  path: "/cgu",
  noindex: true,
});

export default function CguPage() {
  const { legalName, contact, url } = siteConfig;

  return (
    <main id="main-content" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">
          Mentions
        </p>
        <h1 className="mt-4 font-display text-[var(--text-display-lg)] text-ink">
          Conditions générales
        </h1>
        <p className="mt-6 text-muted">
          Mise à jour le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date())}.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-brand-accent">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales (« CGU/CGV ») régissent
            l'utilisation du site {url} et les ventes réalisées par {legalName},
            ci-après désigné « le vendeur ». Elles s'appliquent à toute commande
            passée auprès de l'atelier.
          </p>

          <h2>2. Produits</h2>
          <p>
            Les couteaux présentés sur le site sont des pièces uniques fabriquées
            artisanalement. Les caractéristiques (matériaux, dimensions, finitions)
            indiquées le sont à titre informatif et peuvent varier légèrement,
            chaque pièce étant entièrement réalisée à la main. Les photographies
            sont les plus fidèles possible mais ne sauraient engager le vendeur
            sur la perception exacte des nuances de matières (bois, damas, ambre).
          </p>

          <h2>3. Commande</h2>
          <p>
            Toute commande fait l'objet d'un devis personnalisé établi après
            échange par téléphone, email ou en atelier. La commande est validée
            après acceptation écrite du devis par le client et versement
            éventuel d'un acompte (50 % du montant pour les pièces sur-mesure).
          </p>

          <h2>4. Prix et paiement</h2>
          <p>
            Les prix sont indiqués en euros toutes taxes comprises pour les
            particuliers. Le paiement s'effectue par virement bancaire, par
            chèque ou en espèces à l'atelier (selon les seuils légaux).
            Le solde est dû à la livraison ou à l'enlèvement de la pièce.
          </p>

          <h2>5. Délais de fabrication</h2>
          <p>
            Le délai de réalisation d'une pièce sur-mesure est annoncé dans le
            devis et varie en fonction du carnet de commandes et de la complexité
            du projet (généralement de quatre à douze semaines). Les délais sont
            donnés à titre indicatif ; un retard ne peut donner lieu à annulation
            ou indemnisation, sauf retard supérieur à trois mois sans justification.
          </p>

          <h2>6. Livraison</h2>
          <p>
            Les pièces sont remises en main propre à l'atelier ou expédiées en
            colis suivi et assuré. Les frais de port sont à la charge du client
            et indiqués sur le devis. Le transfert des risques s'opère à la
            remise au transporteur.
          </p>

          <h2>7. Droit de rétractation</h2>
          <p>
            Conformément à l'article L221-28 du Code de la consommation, le
            droit de rétractation ne s'applique pas aux biens confectionnés
            selon les spécifications du consommateur ou nettement personnalisés
            (ce qui est le cas des couteaux sur-mesure). Pour les pièces
            standard achetées à distance, un délai de rétractation de quatorze
            jours s'applique à compter de la réception, le bien devant être
            retourné neuf, dans son emballage d'origine et à l'état d'origine.
          </p>

          <h2>8. Garanties</h2>
          <p>
            Chaque couteau bénéficie de la garantie légale de conformité
            (articles L217-3 et suivants du Code de la consommation) et de la
            garantie des vices cachés (articles 1641 et suivants du Code civil).
            L'atelier accompagne chaque pièce d'un service d'entretien à vie :
            réaffûtage à prix coûtant, conseils, expertise.
          </p>

          <h2>9. Réglementation sur les armes</h2>
          <p>
            Les couteaux vendus relèvent de la catégorie D (acquisition libre,
            sans formalité). Toutefois, le port et le transport en lieu public
            sont encadrés par la loi française : un motif légitime (chasse,
            pêche, profession, déplacement vers le domicile depuis le lieu
            d'achat) est requis. Il appartient à l'acheteur de respecter la
            réglementation en vigueur et de transporter le couteau dans son étui.
          </p>

          <h2>10. Propriété intellectuelle</h2>
          <p>
            Les designs, photographies et textes du site sont protégés par le
            droit d'auteur et restent la propriété de {legalName}. Toute
            reproduction sans autorisation écrite est interdite.
          </p>

          <h2>11. Données personnelles</h2>
          <p>
            Le traitement de vos données est détaillé dans la{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>.
          </p>

          <h2>12. Médiation</h2>
          <p>
            En cas de litige, le client peut recourir gratuitement au médiateur
            de la consommation après avoir tenté une résolution amiable directe
            avec l'atelier. Les présentes CGU/CGV sont soumises au droit
            français ; tout litige relève des tribunaux français compétents.
          </p>

          <h2>13. Contact</h2>
          <p>
            Pour toute question : <a href={`mailto:${contact.email}`}>{contact.email}</a> · {contact.phoneDisplay}.
          </p>
        </div>
      </div>
    </main>
  );
}
