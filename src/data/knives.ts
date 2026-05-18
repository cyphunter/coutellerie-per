/**
 * Catalogue des couteaux fabriqués par l'atelier Coutellerie Per.
 *
 * Source unique pour la galerie et la page "Dernières créations".
 * Le client peut éditer ce fichier pour ajouter / retirer des pièces
 * sans toucher au reste du code.
 *
 * Convention :
 *  - `slug` : kebab-case, unique, utilisé dans l'URL si pages détail un jour
 *  - `category` : pliant | droit | sgian-dubh | puukko | ulu | marin | usage
 *  - `featured: true` → affiché en avant sur la page d'accueil
 *  - `recent: true` → affiché dans la section "Dernières créations"
 *  - `imageAlt` : description visuelle accessible (jamais vide pour image illustrative)
 *  - `imagePath` : webp 1600 px max, importé depuis l'ancien site
 *    france-artisanat.fr et compressé (voir `scripts/scrape-gallery.mjs`
 *    et `scripts/convert-gallery.mjs`).
 */

export type KnifeCategory =
  | "pliant"
  | "droit"
  | "sgian-dubh"
  | "puukko"
  | "ulu"
  | "marin"
  | "usage";

export type Knife = {
  slug: string;
  name: string;
  category: KnifeCategory;
  blade: string;
  handle: string;
  totalLength?: string;
  bladeLength?: string;
  year?: number;
  description: string;
  /** "sur devis" si pièce unique ou commande sur-mesure */
  price?: string;
  imagePath: string;
  imageAlt: string;
  featured?: boolean;
  recent?: boolean;
};

export const KNIFE_CATEGORIES: Record<KnifeCategory, { label: string; description: string }> = {
  pliant: {
    label: "Couteaux pliants",
    description:
      "Couteaux de poche à lame repliable. Mécanismes traditionnels — friction, cran forcé, liner-lock — montés à la main.",
  },
  droit: {
    label: "Couteaux droits",
    description:
      "Lames fixes de chasse, d'usage ou de collection. Soie traversante, mitre forgée, manches en bois précieux ou matériaux nobles.",
  },
  "sgian-dubh": {
    label: "Sgian Dubh",
    description:
      "Petit couteau traditionnel écossais porté à la chaussette dans le costume des Highlands. Lame courte, manche sculpté, gravure possible.",
  },
  puukko: {
    label: "Puukko",
    description:
      "Couteau finlandais traditionnel, lame scandinave courte et robuste. Outil polyvalent du nord, taillé pour la forêt.",
  },
  ulu: {
    label: "Ulu",
    description:
      "Couteau inuit en forme de demi-lune, à manche perpendiculaire. Lame à pousser ou à bercer, pour découper viande, peau, herbes.",
  },
  marin: {
    label: "Couteaux marins",
    description:
      "Couteaux d'usage marin : lame inox brossée, manche stabilisé résistant à l'eau salée. Pour la navigation et la pêche.",
  },
  usage: {
    label: "Couteaux d'usage",
    description:
      "Couteaux du quotidien — cuisine, table, jardin. Lames forgées, manches confortables, équilibre étudié.",
  },
};

export const knives: readonly Knife[] = [
  // ─── Pliants ───────────────────────────────────────────────────
  {
    slug: "cabestan-loupe-bouleau",
    name: "Cabestan — loupe de bouleau",
    category: "pliant",
    blade: "Lame forgée à la main",
    handle: "Manche en loupe de bouleau teintée et stabilisée, mitres laiton",
    description:
      "Couteau pliant Cabestan, version loupe de bouleau. Le bois est teinté puis stabilisé sous pression pour figer le veinage et lui donner sa profondeur miel.",
    price: "Sur devis",
    imagePath: "/images/knives/cabestan-loupe-bouleau.webp",
    imageAlt:
      "Couteau pliant Cabestan ouvert, manche en loupe de bouleau teintée aux nuances miel et acajou, lame brillante",
    featured: true,
    recent: true,
  },
  {
    slug: "cabestan-iii-os",
    name: "Cabestan III — os",
    category: "pliant",
    blade: "Lame forgée à la main",
    handle: "Manche en os, mitres laiton",
    description:
      "Troisième édition du Cabestan. Manche en os naturel, matière noble qui se patine au fil des années pour prendre une teinte ivoire chaud.",
    price: "Sur devis",
    imagePath: "/images/knives/cabestan-iii-os.webp",
    imageAlt:
      "Couteau pliant Cabestan III ouvert, manche en os clair ivoirin et lame d'acier",
    recent: true,
  },
  {
    slug: "curragh-bouleau",
    name: "Curragh — bouleau stabilisé",
    category: "pliant",
    blade: "Lame acier forgée",
    handle: "Manche en bouleau stabilisé",
    description:
      "Pliant inspiré des barques d'osier des côtes celtes. Manche en bouleau stabilisé sous résine pour résister à l'humidité sans perdre le grain du bois.",
    price: "Sur devis",
    imagePath: "/images/knives/curragh-bouleau.webp",
    imageAlt:
      "Couteau pliant Curragh, manche en bouleau stabilisé veiné, lame d'acier ouverte",
    featured: true,
  },
  {
    slug: "kenseurt-ii-buis",
    name: "Kenseurt II — vieux buis",
    category: "pliant",
    blade: "Lame acier forgé",
    handle: "Manche en vieux buis",
    description:
      "Seconde édition du Kenseurt en vieux buis — bois dur, dense, légèrement doré, qui se patine en miel profond au fil de l'usage.",
    price: "Sur devis",
    imagePath: "/images/knives/kenseurt-ii-buis.webp",
    imageAlt:
      "Couteau pliant Kenseurt II ouvert, manche en vieux buis doré et lame d'acier brillant",
  },
  {
    slug: "pliant-carbone-damas",
    name: "Pliant carbone — damas",
    category: "pliant",
    blade: "Lame damas multicouche",
    handle: "Manche en fibre de carbone tressée",
    description:
      "Pliant moderne. Carbone tressé pour la légèreté et la résistance, lame damas pour les ondes du métal forgé. Un objet contemporain dans l'esprit du métier.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-carbone-damas.webp",
    imageAlt:
      "Couteau pliant à manche en fibre de carbone tressée noire et lame damas moirée",
  },
  {
    slug: "pliant-damas",
    name: "Pliant damas",
    category: "pliant",
    blade: "Lame damas multicouche",
    handle: "Manche en bois précieux",
    description:
      "Pliant traditionnel à lame damas. Acier feuilleté plié et martelé pour faire apparaître les ondes caractéristiques après attaque à l'acide.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-damas.webp",
    imageAlt: "Couteau pliant ouvert, lame damas aux ondes contrastées, manche bois",
  },
  {
    slug: "pliant-g10",
    name: "Pliant G10",
    category: "pliant",
    blade: "Lame acier",
    handle: "Manche en G10 composite",
    description:
      "Pliant d'usage moderne. Le G10 — composite fibre de verre et résine — offre une accroche parfaite, insensible à l'humidité et aux variations de température.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-g10.webp",
    imageAlt: "Couteau pliant à manche en G10 composite noir et lame d'acier",
  },
  {
    slug: "pliant-os-scrimshaw",
    name: "Pliant scrimshaw — os gravé",
    category: "pliant",
    blade: "Lame acier",
    handle: "Manche en os gravé à la technique scrimshaw",
    description:
      "Pièce de collection. Manche en os gravé point par point à l'aiguille, technique scrimshaw héritée des marins du XVIIIᵉ siècle.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-os-scrimshaw.webp",
    imageAlt:
      "Couteau pliant de collection, manche en os ivoirin gravé scrimshaw d'un motif marin",
    featured: true,
  },
  {
    slug: "petit-pliant-maillechort",
    name: "Petit pliant — maillechort et damas inox",
    category: "pliant",
    blade: "Lame damas inox",
    handle: "Mitres maillechort, plaquettes bois",
    description:
      "Petit format de poche. Damas inox pour résister à la patine, mitres en maillechort — alliage cuivre, nickel, zinc — qui ne ternissent pas et imitent l'argent sans son entretien.",
    price: "Sur devis",
    imagePath: "/images/knives/petit-pliant-maillechort.webp",
    imageAlt:
      "Petit couteau pliant à mitres maillechort claires et lame damas inox moirée",
    recent: true,
  },
  {
    slug: "pliant-classique-i",
    name: "Pliant classique",
    category: "pliant",
    blade: "Lame acier",
    handle: "Manche bois précieux",
    description:
      "Pliant traditionnel à friction. Sobriété du dessin, qualité de la coutellerie : l'équilibre, l'ouverture, la fermeture — tout est ajusté à la main.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-classique-i.webp",
    imageAlt: "Couteau pliant classique ouvert, manche en bois et lame d'acier",
  },
  {
    slug: "pliant-classique-ii",
    name: "Pliant classique (II)",
    category: "pliant",
    blade: "Lame acier",
    handle: "Manche bois précieux",
    description:
      "Variation du pliant classique sur une autre essence de bois. Chaque pièce est unique : le manche est choisi, ajusté et fini selon les caractéristiques du fragment travaillé.",
    price: "Sur devis",
    imagePath: "/images/knives/pliant-classique-ii.webp",
    imageAlt: "Couteau pliant à manche bois et lame d'acier brillante",
  },

  // ─── Droits ────────────────────────────────────────────────────
  {
    slug: "droit-brut-de-forge",
    name: "Couteau droit — brut de forge",
    category: "droit",
    blade: "Lame acier forgée, finition brute martelée",
    handle: "Manche bois, soie traversante",
    description:
      "Lame conservée brute après forge — on garde le grain du martelage et la trace du marteau sur l'acier. Un objet vivant, brut, sans fioritures.",
    price: "Sur devis",
    imagePath: "/images/knives/droit-brut-de-forge.webp",
    imageAlt:
      "Couteau droit à lame brute de forge martelée, manche bois et soie traversante",
    featured: true,
    recent: true,
  },
  {
    slug: "droit-cerf-acier",
    name: "Couteau droit — bois de cerf",
    category: "droit",
    blade: "Lame acier forgée",
    handle: "Manche en bois de cerf naturel",
    description:
      "Bois de cerf de ramure, sélectionné pour sa forme et sa densité, livré avec sa croûte d'origine. Soie traversante rivetée à l'arrière du manche.",
    price: "Sur devis",
    imagePath: "/images/knives/droit-cerf-acier.webp",
    imageAlt:
      "Couteau droit, lame acier forgée, manche en bois de cerf naturel brut",
  },
  {
    slug: "droit-bouleau-teinte",
    name: "Couteau droit — bouleau teinté",
    category: "droit",
    blade: "Lame acier",
    handle: "Manche en bouleau teinté et stabilisé",
    description:
      "Bouleau teinté pour appuyer le veinage, puis stabilisé sous résine. La couleur devient profonde, le bois devient inaltérable.",
    price: "Sur devis",
    imagePath: "/images/knives/droit-bouleau-teinte.webp",
    imageAlt:
      "Couteau droit, manche en bouleau teinté aux reflets ambrés et stabilisé",
  },
  {
    slug: "brut-de-forge-buis",
    name: "Brut de forge — buis",
    category: "droit",
    blade: "Lame acier forgée, finition brute",
    handle: "Manche en buis",
    description:
      "Lame brute de forge sur manche de buis huilé. Le buis se patine au fil des années pour devenir d'un miel sourd, presque cireux.",
    price: "Sur devis",
    imagePath: "/images/knives/brut-de-forge-buis.webp",
    imageAlt:
      "Couteau droit à lame brute de forge martelée et manche en buis clair veiné",
  },
  {
    slug: "brut-de-forge-volute-if",
    name: "Brut de forge Volute — if",
    category: "droit",
    blade: "Lame forgée, dos volute",
    handle: "Manche en if",
    description:
      "Modèle Volute : le dos de la lame est travaillé en courbe douce qui sculpte le brut de forge. Manche en if des landes bretonnes, bois précieux à grain serré.",
    price: "Sur devis",
    imagePath: "/images/knives/brut-de-forge-volute-if.webp",
    imageAlt:
      "Couteau droit modèle Volute, lame brute de forge, manche en if doré veiné",
  },
  {
    slug: "brut-de-forge-collection",
    name: "Brut de forge — collection",
    category: "droit",
    blade: "Lame forgée, finition brute",
    handle: "Manche bois précieux, soie traversante",
    description:
      "Pièce de collection à lame brute de forge. Ces pièces racontent le travail du forgeron — chaque marque du marteau est laissée visible.",
    price: "Sur devis",
    imagePath: "/images/knives/brut-de-forge-collection.webp",
    imageAlt:
      "Couteau droit de collection, lame brute de forge martelée, manche bois précieux",
  },

  // ─── Sgian Dubh ────────────────────────────────────────────────
  {
    slug: "sgian-dubh-classique",
    name: "Sgian Dubh",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche bois sculpté",
    description:
      "Sgian Dubh classique — couteau noir des Highlands. Porté à la chaussette dans le costume traditionnel écossais, lame courte et manche sculpté.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-classique.webp",
    imageAlt:
      "Sgian Dubh écossais à manche bois sculpté et lame d'acier brillante",
    featured: true,
  },
  {
    slug: "sgian-dubh-cerf-ambre",
    name: "Sgian Dubh — bois de cerf et ambre",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche en bois de cerf, incrustation ambre",
    description:
      "Pièce d'exception : manche en bois de cerf, rehaussé d'une incrustation d'ambre véritable. Mariage de matières chaudes pour un objet de cérémonie.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-cerf-ambre.webp",
    imageAlt:
      "Sgian Dubh à manche en bois de cerf naturel et incrustation d'ambre miel",
    recent: true,
  },
  {
    slug: "sgian-dubh-ebene-damas",
    name: "Sgian Dubh — ébène et damas inox",
    category: "sgian-dubh",
    blade: "Lame damas inox",
    handle: "Manche en ébène",
    description:
      "Ébène noir profond et damas inox aux ondes claires : contraste fort, métal qui résiste à la patine, bois qui se polit au toucher.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-ebene-damas.webp",
    imageAlt:
      "Sgian Dubh à manche en ébène noir et lame damas inox moirée",
  },
  {
    slug: "sgian-dubh-morta-i",
    name: "Sgian Dubh — morta (I)",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche en morta stabilisé",
    description:
      "Manche en morta — chêne enfoui dans les tourbières depuis des millénaires, devenu noir d'encre. Stabilisé pour figer le matériau et lui donner sa solidité.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-morta-i.webp",
    imageAlt:
      "Sgian Dubh à manche en morta noir profond et lame d'acier",
  },
  {
    slug: "sgian-dubh-morta-ii",
    name: "Sgian Dubh — morta (II)",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche en morta stabilisé",
    description:
      "Variation de la série morta. Chaque pièce est unique : la morta n'est jamais deux fois identique — densité, veinage, infimes inclusions varient d'un bloc à l'autre.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-morta-ii.webp",
    imageAlt:
      "Sgian Dubh à manche en morta noir veiné et lame d'acier brillant",
  },
  {
    slug: "sgian-dubh-morta-iii",
    name: "Sgian Dubh — morta (III)",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche en morta stabilisé",
    description:
      "Troisième pièce de la série morta. Le chêne fossilisé est l'un des matériaux les plus rares utilisés en coutellerie d'art — chaque manche est un fragment d'arbre tombé il y a plusieurs millénaires.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-morta-iii.webp",
    imageAlt:
      "Sgian Dubh à manche en morta noir et lame d'acier",
  },
  {
    slug: "sgian-dubh-morta-iv",
    name: "Sgian Dubh — morta (IV)",
    category: "sgian-dubh",
    blade: "Lame acier",
    handle: "Manche en morta stabilisé",
    description:
      "Quatrième déclinaison de la série morta. Une matière, quatre lectures — le coutelier laisse parler le bloc qu'il a sous les mains.",
    price: "Sur devis",
    imagePath: "/images/knives/sgian-dubh-morta-iv.webp",
    imageAlt:
      "Sgian Dubh à manche en morta noir profond et lame d'acier brillante",
  },

  // ─── Puukko ────────────────────────────────────────────────────
  {
    slug: "puukko-damas",
    name: "Puukko — damas",
    category: "puukko",
    blade: "Lame damas multicouche",
    handle: "Manche bois traditionnel",
    description:
      "Puukko finlandais à lame damas. Outil scandinave de la forêt, simple, équilibré, taillé pour servir longtemps.",
    price: "Sur devis",
    imagePath: "/images/knives/puukko-damas.webp",
    imageAlt:
      "Couteau Puukko à lame damas moirée et manche bois clair",
    recent: true,
  },
  {
    slug: "puukko-if",
    name: "Puukko — if",
    category: "puukko",
    blade: "Lame acier forgé, finition brute",
    handle: "Manche et étui en if, étui cuir cousu main",
    description:
      "Puukko brut de forge sur if des landes. Livré avec un étui cuir tanné végétal, cousu main, assorti au manche.",
    price: "Sur devis",
    imagePath: "/images/knives/puukko-if.webp",
    imageAlt:
      "Couteau Puukko à lame brute de forge, manche et étui en if doré, finitions cuir",
  },
  {
    slug: "puukko-hetre",
    name: "Puukko — hêtre stabilisé",
    category: "puukko",
    blade: "Lame acier forgé, finition brute",
    handle: "Manche en hêtre stabilisé",
    description:
      "Puukko brut de forge, manche en hêtre stabilisé pour résister à l'humidité et aux chocs sans perdre la chaleur du bois.",
    price: "Sur devis",
    imagePath: "/images/knives/puukko-hetre.webp",
    imageAlt:
      "Couteau Puukko à lame brute de forge et manche en hêtre stabilisé",
  },

  // ─── Ulu ───────────────────────────────────────────────────────
  {
    slug: "ulu-classique",
    name: "Ulu",
    category: "ulu",
    blade: "Lame inox demi-lune",
    handle: "Manche bois perpendiculaire",
    description:
      "Couteau inuit traditionnel pour la cuisine. Manche perpendiculaire à la lame en demi-lune — geste de berceau qui hache herbes et viandes sans effort.",
    price: "Sur devis",
    imagePath: "/images/knives/ulu-classique.webp",
    imageAlt: "Couteau Ulu inuit, lame demi-lune brillante, manche bois clair",
  },

  // ─── Marin ─────────────────────────────────────────────────────
  {
    slug: "marin-usage",
    name: "Couteau d'usage marin",
    category: "marin",
    blade: "Lame inox brossée",
    handle: "Manche résistant à l'eau salée",
    description:
      "Conçu pour le bord. Inox marin, manche hydrophobe, perçage pour dragonne. Une lame qui ne craint ni l'embrun ni l'usure du gréement.",
    price: "Sur devis",
    imagePath: "/images/knives/marin-usage.webp",
    imageAlt:
      "Couteau d'usage marin, lame inox brossée et manche stabilisé",
    featured: true,
  },

  // ─── Usage / pièces atelier ────────────────────────────────────
  {
    slug: "piece-atelier",
    name: "Pièce de l'atelier",
    category: "usage",
    blade: "Lame acier forgée à la main",
    handle: "Manche bois précieux",
    description:
      "Une pièce sortie de l'atelier — chaque couteau Coutellerie Per est forgé, monté et fini à la main par P. et G. Chémereau dans leur atelier de Vannes.",
    price: "Sur devis",
    imagePath: "/images/knives/piece-atelier.webp",
    imageAlt: "Couteau artisanal sorti de l'atelier Coutellerie Per",
  },
];

export function getRecent(): readonly Knife[] {
  return knives.filter((k) => k.recent);
}

export function getFeatured(): readonly Knife[] {
  return knives.filter((k) => k.featured);
}

export function getByCategory(category: KnifeCategory): readonly Knife[] {
  return knives.filter((k) => k.category === category);
}
