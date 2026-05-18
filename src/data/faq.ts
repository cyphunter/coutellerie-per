/**
 * Questions fréquentes — utilisées en page contact et JSON-LD FAQPage.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: readonly FaqItem[] = [
  {
    question: "Combien de temps prend une commande sur-mesure ?",
    answer:
      "Le délai dépend de la complexité de la pièce et du carnet de commandes de l'atelier. Comptez en moyenne quatre à douze semaines entre la validation du dessin et la livraison. Un calendrier précis vous est communiqué après le devis.",
  },
  {
    question: "Quel est le prix d'un couteau Coutellerie Per ?",
    answer:
      "Chaque pièce est unique, le prix se fait sur devis. À titre indicatif, un couteau d'usage en acier carbone et bois local commence autour de quelques centaines d'euros, une pièce de collection en damas avec gravure peut atteindre plusieurs milliers. Le devis est gratuit et sans engagement.",
  },
  {
    question: "Acceptez-vous les couteaux d'autres ateliers en affûtage ou restauration ?",
    answer:
      "Oui, sans réserve. Couteaux de cuisine, de chasse, de poche, sabres, couperets — tout ce qui se découpe peut être affûté. Pour la restauration, un examen préalable permet de juger de la faisabilité ; en cas d'impossibilité (trempe perdue, acier trop fragilisé) nous vous le disons franchement.",
  },
  {
    question: "Peut-on visiter l'atelier ?",
    answer:
      "Avec plaisir, aux horaires d'ouverture ou sur rendez-vous. C'est l'occasion de voir le travail de forge, de discuter d'un projet, ou simplement de comprendre comment un couteau se fabrique. Téléphoner au préalable est conseillé.",
  },
  {
    question: "Vos couteaux sont-ils légaux à porter ?",
    answer:
      "Les couteaux fabriqués à l'atelier relèvent de la catégorie D (arme à acquisition libre, sans formalité). En revanche le port et le transport hors du domicile sont encadrés par la loi française — un motif légitime (chasse, pêche, profession) est requis. Nous recommandons de toujours transporter votre couteau dans son étui et de vous renseigner sur les règles locales avant tout déplacement.",
  },
  {
    question: "Expédiez-vous en dehors de la Bretagne ?",
    answer:
      "Oui, dans toute la France métropolitaine et l'Union européenne. Les couteaux sont expédiés en colis suivi assuré, dans un emballage protégé. Pour les expéditions hors UE, contactez-nous : la réglementation varie selon le pays.",
  },
  {
    question: "Proposez-vous des bons d'achat ou cartes cadeaux ?",
    answer:
      "Oui, sur simple demande. Le bon est nominatif, valable un an, et permet de commander la pièce de son choix dans nos collections ou en sur-mesure.",
  },
  {
    question: "Comment entretenir un couteau forgé main ?",
    answer:
      "Acier carbone : sécher après chaque usage, huiler la lame de temps à autre (huile de camélia ou minérale). Acier inox : un essuyage suffit. Manche bois : passer un linge huilé une à deux fois par an pour préserver la patine. Affûtage : sur pierre à eau, jamais sur touret. En cas de doute, nous reprenons l'affûtage à l'atelier.",
  },
];
