import type { Metadata } from "next";
import type {
  LocalBusiness,
  WithContext,
  FAQPage,
  BreadcrumbList,
  DayOfWeek,
} from "schema-dts";
import { canonicalUrl, siteConfig } from "./site-config";

type PageMetadataInput = {
  /** Titre court — sera concaténé avec le template du layout. */
  title?: string | null;
  description?: string | null;
  /** Chemin canonique sans le domaine, ex: "/galerie". */
  path: string;
  /** URL absolue ou chemin relatif d'une image OG (1200×630 recommandé). */
  imageUrl?: string | null;
  /** Désindexer la page (mentions légales, brouillons, etc.). */
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
  noindex,
}: PageMetadataInput): Metadata {
  const finalTitle = title ?? siteConfig.name;
  const finalDesc = description ?? siteConfig.description;
  const url = canonicalUrl(path);

  const ogImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
    : null;

  return {
    title: finalTitle,
    description: finalDesc,
    alternates: { canonical: url },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: siteConfig.name,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * JSON-LD `LocalBusiness` — coordonnées + horaires + zone servie.
 * À placer dans le layout racine.
 */
export function localBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    image: `${siteConfig.url}/og-image.jpg`,
    priceRange: "€€€",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      postalCode: siteConfig.contact.postalCode,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      addressCountry: siteConfig.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    openingHoursSpecification: siteConfig.contact.openingHours.map((spec) => {
      const [days, range] = spec.split(" ");
      const [opens, closes] = range.split("-");
      return {
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: expandDays(days),
        opens,
        closes,
      };
    }),
    areaServed: siteConfig.serviceArea.map((name) => ({
      "@type": "Place" as const,
      name,
    })),
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/**
 * JSON-LD `BreadcrumbList` à partir d'un tableau de paliers.
 * Chaque palier : `{ name, path }`. Le dernier est la page courante.
 */
export function breadcrumbSchema(
  items: readonly { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/**
 * JSON-LD `FAQPage` — utilisé sur les pages avec section FAQ.
 */
export function faqSchema(
  items: readonly { question: string; answer: string }[],
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Helpers privés ────────────────────────────────────────────────
const DAY_MAP = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
} as const satisfies Record<string, DayOfWeek>;

function expandDays(spec: string): DayOfWeek[] {
  const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
  type ShortDay = (typeof order)[number];
  const isShort = (s: string): s is ShortDay =>
    (order as readonly string[]).includes(s);

  if (spec.includes("-")) {
    const [start, end] = spec.split("-");
    if (!isShort(start) || !isShort(end)) return [];
    const startIdx = order.indexOf(start);
    const endIdx = order.indexOf(end);
    return order.slice(startIdx, endIdx + 1).map((d) => DAY_MAP[d]);
  }
  return isShort(spec) ? [DAY_MAP[spec]] : [];
}
