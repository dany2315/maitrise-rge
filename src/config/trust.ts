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
  /** Logo officiel de la marque (dossier public/brands), le cas échéant. */
  logo?: { src: string; width: number; height: number; /** Affichage plus haut pour les logos compacts. */ tall?: boolean };
};

export const trustItems: TrustItem[] = [
  {
    id: "rge",
    kind: "qualification",
    name: "Qualification RGE",
    description:
      "Qualification « Reconnu Garant de l'Environnement » pour les domaines de travaux couverts par le certificat en cours de validité.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/rge.png", width: 282, height: 68 },
    verifyUrl: "https://france-renov.gouv.fr/annuaires-professionnels/artisan-rge-architectes",
  },
  {
    id: "maprimerenov",
    kind: "dispositif",
    name: "MaPrimeRénov'",
    description:
      "Aide publique de l'Anah. Nous vous aidons à vérifier si votre projet peut en bénéficier ; l'attribution relève de l'Anah.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/maprimerenov.png", width: 855, height: 554, tall: true },
  },
  {
    id: "cee",
    kind: "dispositif",
    name: "Certificats d'économies d'énergie (CEE)",
    description:
      "Primes versées par des fournisseurs d'énergie. Les modalités dépendent du partenaire CEE retenu pour votre dossier.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/cee.svg", width: 120, height: 120, tall: true },
  },
  {
    id: "daikin",
    kind: "marque",
    name: "Daikin",
    description: "Marque de pompes à chaleur et de climatisation installée par nos équipes.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/daikin.svg", width: 300, height: 65 },
  },
  {
    id: "de-dietrich",
    kind: "marque",
    name: "De Dietrich",
    description: "Marque d'équipements de chauffage installée par nos équipes.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/de-dietrich.png", width: 571, height: 120 },
  },
  {
    id: "atlantic",
    kind: "marque",
    name: "Atlantic",
    description: "Marque d'équipements de chauffage et d'eau chaude installée par nos équipes.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/atlantic.svg", width: 210, height: 40 },
  },
  {
    id: "chappee",
    kind: "marque",
    name: "Chappée",
    description: "Marque d'équipements de chauffage installée par nos équipes.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/chappee.svg", width: 167, height: 38 },
  },
  {
    id: "airwell",
    kind: "marque",
    name: "Airwell",
    description: "Marque de pompes à chaleur et de climatisation installée par nos équipes.",
    confirmed: true,
    proof: "Affichage demandé par l'agence le 06/10/2026 — justificatif client à archiver",
    logo: { src: "/brands/airwell.svg", width: 157, height: 38 },
  },
];

export const isPubliclyVisible = (item: TrustItem) => item.confirmed && Boolean(item.proof);
