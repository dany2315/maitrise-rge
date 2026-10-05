/**
 * Positionnement, engagements et preuve sociale de Maîtrise RGE.
 *
 * Règle : un engagement commercial (délai, garantie, prise en charge…) ne
 * s'affiche en production que s'il a été confirmé par Maîtrise RGE
 * (`confirmed: true`). En mode revue, les engagements non confirmés
 * apparaissent avec un badge « À confirmer ».
 */

export const about = {
  eyebrow: "Qui sommes-nous",
  title: "Rendre la rénovation énergétique simple, lisible et maîtrisée.",
  paragraphs: [
    "Chez Maîtrise RGE, nous partons d'un constat : beaucoup de propriétaires renoncent à rénover, non par manque d'envie, mais parce que tout paraît compliqué. Des aides dont les règles changent, des devis difficiles à comparer, des démarches qu'on ne sait pas par où prendre.",
    "Notre métier est de remettre de l'ordre dans tout cela. Nous étudions votre logement avant de proposer une solution, nous vous expliquons ce que chaque équipement change concrètement, et nous préparons avec vous les demandes d'aides au bon moment.",
    "Pompes à chaleur, isolation, solaire et eau chaude : nous réunissons les principaux leviers de la rénovation énergétique pour construire, avec vous, un projet cohérent plutôt qu'une simple vente d'équipement.",
  ],
  pillars: [
    { value: "6", label: "solutions de rénovation, de l'isolation au chauffage" },
    { value: "2", label: "grandes aides étudiées pour chaque projet : MaPrimeRénov' et CEE" },
    { value: "5", label: "étapes claires, de l'estimation à la mise en service" },
  ],
} as const;

export type Commitment = {
  title: string;
  text: string;
  /** true : engagement validé par Maîtrise RGE, publiable en production. */
  confirmed: boolean;
};

export const commitments: Commitment[] = [
  {
    title: "Des aides présentées honnêtement",
    text: "Aides publiques estimées et remise commerciale toujours sur des lignes distinctes. Aucune estimation n'est présentée comme une attribution d'aide.",
    confirmed: true,
  },
  {
    title: "Une solution choisie pour votre logement",
    text: "La proposition repose sur l'étude de votre maison : isolation, émetteurs, usages. Pas d'équipement surdimensionné pour gonfler le devis.",
    confirmed: true,
  },
  {
    title: "Un devis clair, ligne par ligne",
    text: "Équipements, quantités, main-d'œuvre et aides estimées détaillés, pour comparer en toute connaissance de cause.",
    confirmed: true,
  },
  {
    title: "Les démarches d'aides préparées avec vous",
    text: "Nous vous indiquons quoi faire et à quel moment, et constituons avec vous les dossiers MaPrimeRénov' et CEE.",
    confirmed: false,
  },
  {
    title: "Un interlocuteur unique",
    text: "La même personne vous suit du premier échange à la mise en service de votre installation.",
    confirmed: false,
  },
  {
    title: "Un suivi après les travaux",
    text: "Mise en service, explications d'usage et réponse à vos questions une fois l'installation en fonctionnement.",
    confirmed: false,
  },
];

/**
 * Note Google affichée dans le hero. Renseigner uniquement les valeurs
 * réelles de la fiche Google Business Profile de Maîtrise RGE.
 */
export const googleReviews = {
  rating: null as number | null, // ex. 4.9
  count: null as number | null, // ex. 37
  url: null as string | null, // lien vers les avis de la fiche Google
};
