/**
 * Qualifications, dispositifs et marques.
 *
 * Un élément n'est affiché publiquement que si `confirmed` vaut `true` ET
 * qu'un justificatif est référencé (`proof`). En mode revue (développement,
 * prévisualisation), les éléments non confirmés apparaissent avec un badge
 * « À confirmer » pour faciliter la validation par le client.
 */
export type TrustItem = {
  id: string;
  kind: "qualification" | "dispositif" | "marque";
  name: string;
  /** Texte affiché une fois validé. Il décrit la relation réelle, sans l'exagérer. */
  description: string;
  confirmed: boolean;
  /** Référence du justificatif fourni (n° de certificat, attestation, contrat…). */
  proof: string | null;
  /** Lien de vérification publique éventuel. */
  verifyUrl?: string;
};

export const trustItems: TrustItem[] = [
  {
    id: "rge",
    kind: "qualification",
    name: "Qualification RGE",
    description:
      "Qualification « Reconnu Garant de l'Environnement » pour les domaines de travaux couverts par le certificat en cours de validité.",
    confirmed: false,
    proof: null,
    verifyUrl: "https://france-renov.gouv.fr/annuaires-professionnels/artisan-rge-architectes",
  },
  {
    id: "maprimerenov",
    kind: "dispositif",
    name: "MaPrimeRénov'",
    description:
      "Aide publique de l'Anah. Nous vous aidons à vérifier si votre projet peut en bénéficier ; l'attribution relève de l'Anah.",
    confirmed: false,
    proof: null,
  },
  {
    id: "cee",
    kind: "dispositif",
    name: "Certificats d'économies d'énergie (CEE)",
    description:
      "Primes versées par des fournisseurs d'énergie. Les modalités dépendent du partenaire CEE retenu pour votre dossier.",
    confirmed: false,
    proof: null,
  },
  {
    id: "de-dietrich",
    kind: "marque",
    name: "De Dietrich",
    description: "Marque d'équipements de chauffage installée par nos équipes.",
    confirmed: false,
    proof: null,
  },
  {
    id: "atlantic",
    kind: "marque",
    name: "Atlantic",
    description: "Marque d'équipements de chauffage et d'eau chaude installée par nos équipes.",
    confirmed: false,
    proof: null,
  },
  {
    id: "chappee",
    kind: "marque",
    name: "Chappée",
    description: "Marque d'équipements de chauffage installée par nos équipes.",
    confirmed: false,
    proof: null,
  },
];

export const isPubliclyVisible = (item: TrustItem) => item.confirmed && Boolean(item.proof);
