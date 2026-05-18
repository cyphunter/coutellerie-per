/**
 * Source unique de vérité pour les informations du site Coutellerie Per.
 *
 * Le client (P. et G. Chémereau) ou Kevin peut éditer ce fichier pour mettre
 * à jour coordonnées, slogans, navigation, mentions légales — sans toucher
 * au reste du code.
 *
 * Chaque clé est commentée pour qu'un non-développeur puisse comprendre.
 */

export const siteConfig = {
  // ─── Identité ─────────────────────────────────────────────────────
  name: "Coutellerie Per",
  shortName: "Coutellerie Per",
  legalName: "SARL Coutellerie Per — P. et G. Chémereau",
  baseline: "Couteaux artisanaux forgés à Vannes",
  description:
    "Coutellerie artisanale à Vannes : couteaux pliants, droits, Sgian Dubh et Puukko forgés à la main par P. et G. Chémereau. Affûtage et restauration de couteaux anciens.",
  /** Année de fondation de l'atelier — à confirmer avec le client. */
  foundedYear: 1985,

  // ─── URL & locale ────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://coutellerie-per.fr",
  locale: "fr-FR",
  language: "fr",

  // ─── Contact ─────────────────────────────────────────────────────
  // /!\ Les coordonnées exactes (adresse, téléphone) sont à confirmer avec
  // le client avant mise en ligne. Les valeurs ci-dessous sont des
  // placeholders cohérents (Vannes, Morbihan).
  contact: {
    phone: "+33 2 97 00 00 00",
    phoneDisplay: "02 97 00 00 00",
    email: "contact@coutellerie-per.fr",
    address: "Atelier de l'artisan coutelier",
    postalCode: "56000",
    city: "Vannes",
    region: "Bretagne",
    department: "Morbihan",
    country: "FR",
    countryName: "France",
    /** Coordonnées GPS Vannes centre (à ajuster avec l'adresse exacte). */
    geo: { latitude: 47.6587, longitude: -2.7603 },
    /** Format schema.org `OpeningHoursSpecification`. */
    openingHours: ["Tu-Fr 10:00-12:00", "Tu-Fr 14:00-18:00", "Sa 10:00-12:00"],
    /** Format affichage public (texte libre, multi-lignes). */
    openingHoursLabel:
      "Mardi — Vendredi · 10h–12h et 14h–18h\nSamedi · 10h–12h\nFermé dimanche et lundi",
    /** Sur rendez-vous hors horaires (texte libre). */
    appointmentNote: "Visite d'atelier également possible sur rendez-vous.",
  },

  // ─── Réseaux sociaux (laisser vide si non utilisé) ───────────────
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },

  // ─── Mentions légales ────────────────────────────────────────────
  // À renseigner avec les vraies informations Kbis avant mise en ligne.
  legal: {
    siret: "000 000 000 00000",
    rcs: "RCS Vannes",
    capital: "7 500 €",
    publisher: "P. et G. Chémereau",
    host: {
      name: "Cloudflare Inc.",
      address: "101 Townsend Street, San Francisco, CA 94107, USA",
    },
    dpoEmail: "contact@coutellerie-per.fr",
  },

  // ─── Navigation principale ───────────────────────────────────────
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "L'atelier", href: "/atelier" },
    { label: "Galerie", href: "/galerie" },
    { label: "Dernières créations", href: "/creations" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  // ─── Navigation footer (légal + utile) ───────────────────────────
  footerNavigation: [
    { label: "Plan d'accès", href: "/plan-acces" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Conditions générales", href: "/cgu" },
  ],

  // ─── Métadonnées métier ──────────────────────────────────────────
  /** Zone géographique servie (utilisée par JSON-LD LocalBusiness). */
  serviceArea: [
    "Vannes",
    "Morbihan",
    "Bretagne",
    "Auray",
    "Lorient",
    "Quiberon",
    "Sarzeau",
    "Theix",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Construit une URL absolue canonique à partir d'un chemin.
 * Ex: canonicalUrl("/galerie") → "https://coutellerie-per.fr/galerie"
 */
export function canonicalUrl(path: string): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean === "/" ? "" : clean}`;
}
