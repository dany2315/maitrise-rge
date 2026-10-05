/**
 * Informations légales fournies par Maîtrise RGE.
 * Toute valeur `null` s'affiche « À compléter » sur les pages légales :
 * elles doivent être renseignées avant la mise en ligne.
 */
export const legal = {
  company: {
    name: null as string | null, // Raison sociale
    legalForm: null as string | null, // ex. SAS, SARL
    capital: null as string | null, // ex. « 10 000 € »
    address: null as string | null,
    rcs: null as string | null, // ex. « RCS Paris 123 456 789 »
    siren: null as string | null,
    vatNumber: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    publicationDirector: null as string | null,
    /** Assurance professionnelle (assureur, n° de contrat, zone couverte). */
    insurance: null as string | null,
  },
  host: {
    name: null as string | null, // ex. Vercel Inc.
    address: null as string | null,
    contact: null as string | null,
  },
  privacy: {
    /** Email ou adresse pour exercer les droits RGPD. */
    contact: null as string | null,
    /** Durée de conservation des demandes ; proposition à valider par le client. */
    retention:
      "3 ans à compter du dernier contact de votre part, sauf si une relation contractuelle s'engage (proposition à valider)." as string,
  },
  /** Date de dernière mise à jour des pages légales. */
  updatedAt: "2026-10-06",
} as const;
