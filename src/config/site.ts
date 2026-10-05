/**
 * Informations publiques de Maîtrise RGE.
 *
 * Laisser une valeur à `null` tant qu'elle n'a pas été transmise et validée
 * par le client : l'interface masque alors l'élément correspondant au lieu
 * d'afficher une information inventée.
 */
export const site = {
  name: "Maîtrise RGE",
  shortDescription:
    "Rénovation énergétique : pompes à chaleur, isolation, solaire et équipements thermodynamiques.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "fr_FR",

  contact: {
    /** Numéro affiché, ex. « 01 23 45 67 89 ». */
    phoneDisplay: null as string | null,
    /** Numéro au format international pour le lien tel:, ex. « +33123456789 ». */
    phoneE164: null as string | null,
    email: null as string | null,
    /** Adresse postale affichée en pied de page. */
    address: null as string | null,
    /** Zone d'intervention, ex. « Île-de-France ». */
    serviceArea: null as string | null,
    openingHours: null as string | null,
  },
} as const;

export const primaryNav = [
  { href: "/prestations", label: "Prestations" },
  { href: "/#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/simulateur", label: "Simulateur" },
  { href: "/conseils", label: "Conseils" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const legalNav = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cookies", label: "Cookies" },
] as const;

export const ctas = {
  simulator: { href: "/simulateur", label: "Estimer mes aides" },
  quote: { href: "/#contact", label: "Demander un devis" },
} as const;

/** Service public d'information, cité comme ressource indépendante. */
export const franceRenov = {
  url: "https://france-renov.gouv.fr",
  phoneDisplay: "0 808 800 700",
  phoneE164: "+33808800700",
} as const;
