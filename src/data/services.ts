/**
 * Services proposés par l'atelier Coutellerie Per.
 * Le client peut éditer / réordonner / ajouter ici.
 */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  points: readonly string[];
  iconName: "hammer" | "scissors" | "wrench" | "scroll";
};

export const services: readonly Service[] = [
  {
    slug: "fabrication-sur-mesure",
    title: "Fabrication sur-mesure",
    short:
      "Pièces uniques pensées avec vous. De l'acier à choisir au manche à dessiner, chaque couteau est une commande individuelle.",
    description:
      "Vous décrivez l'usage — chasse, cuisine, marine, table, pièce de collection — et nous concevons ensemble la silhouette, le choix de la lame, du manche, des mitres. Le couteau est ensuite forgé, trempé, affûté et monté à la main dans l'atelier de Vannes. Comptez quatre à douze semaines selon la complexité.",
    points: [
      "Choix de la lame : acier carbone, inox, damas multicouche ou torsadé",
      "Choix du manche : bois précieux (if, buis, bouleau, hêtre), morta, bois de cerf, os scrimshaw, ambre, fibre de carbone, G10",
      "Travail des mitres : laiton, bronze, argent, acier bleui",
      "Étui cuir cousu main inclus pour les couteaux droits",
      "Engagement traçabilité — chaque pièce est unique et numérotée",
    ],
    iconName: "hammer",
  },
  {
    slug: "affutage",
    title: "Affûtage professionnel",
    short:
      "Retrouver le tranchant d'origine, sans abîmer la géométrie ni surchauffer la lame.",
    description:
      "Tous nos affûtages sont menés à l'eau, à la main, sur pierres japonaises de différents grains. Pas de touret à sec : la lame conserve son trempage, sa géométrie, son aspect. Couteaux de cuisine, de chasse, de poche, sabres et lames anciennes — l'atelier accepte presque tout ce qui se découpe.",
    points: [
      "Affûtage à l'eau sur pierres naturelles et synthétiques",
      "Conservation de la géométrie d'origine (émouture plate, scandinave, convexe)",
      "Polissage de finition sur cuir et pâte verte",
      "Devis immédiat à l'atelier, prise en charge sous 48h",
      "Retour postal possible (forfait emballage protégé)",
    ],
    iconName: "scissors",
  },
  {
    slug: "restauration",
    title: "Restauration de couteaux anciens",
    short:
      "Redonner vie aux couteaux de famille, sans trahir leur histoire.",
    description:
      "Manche fendu, lame piquée, soie cassée, virole disparue : l'atelier remet en état les couteaux anciens et de transmission. Le geste est minimal — on conserve les patines, on respecte les techniques d'origine. Un devis détaillé est remis avant toute intervention.",
    points: [
      "Diagnostic photo + devis détaillé avant intervention",
      "Reforgeage ou redressage de lame possible si la trempe le permet",
      "Refonte de manche à l'identique (essence d'origine si retrouvable)",
      "Polissage doux, ravivage des gravures, conservation des patines",
      "Restitution avec carnet d'intervention pour la transmission familiale",
    ],
    iconName: "wrench",
  },
  {
    slug: "gravure-personnalisation",
    title: "Gravure et personnalisation",
    short:
      "Initiales, dates, motifs celtiques ou marins — gravés à la pointe sèche ou au burin.",
    description:
      "Sur la lame, la mitre, le manche d'os : gravure manuelle réalisée à l'aiguille (scrimshaw) ou au burin sur métal. Idéal pour un couteau de baptême, de mariage, de transmission. Devis selon la complexité du motif et la surface à graver.",
    points: [
      "Scrimshaw sur os, ivoire de mammouth, ambre",
      "Burin sur acier, laiton, argent",
      "Motifs personnalisés : héraldique, marine, celtique, faune locale",
      "Gravure de dédicaces sur la soie ou la mitre",
    ],
    iconName: "scroll",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
