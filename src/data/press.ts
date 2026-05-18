/**
 * Apparitions presse / TV de l'atelier Coutellerie Per.
 */

export type PressItem = {
  outlet: string;
  program: string;
  date: string;
  /** Format affichage texte FR (ex: "27 mars 2019"). */
  dateLabel: string;
  summary: string;
  url?: string;
};

export const press: readonly PressItem[] = [
  {
    outlet: "France 3",
    program: "Les artisans d'art — Le métal",
    date: "2019-03-27",
    dateLabel: "27 mars 2019",
    summary:
      "Reportage sur les artisans d'art travaillant le métal. L'atelier de P. Chémereau est filmé en pleine forge — émouture, trempe, montage des mitres.",
  },
  {
    outlet: "TF1",
    program: "Journal de 13 heures",
    date: "2012-11-03",
    dateLabel: "3 novembre 2012",
    summary:
      "Sujet consacré au coutelier de Vannes, ses gestes ancestraux et ses pièces uniques pensées pour la mer.",
  },
];
