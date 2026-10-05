/**
 * Textes de l'accueil qui décrivent la démarche de Maîtrise RGE.
 * Ils restent volontairement factuels : aucun délai, garantie ou gratuité
 * n'est annoncé tant que le client ne l'a pas confirmé.
 */

export const approachSteps = [
  {
    title: "Vous décrivez votre projet",
    text: "Par le simulateur ou le formulaire de contact : votre logement, votre chauffage actuel et les travaux envisagés.",
  },
  {
    title: "Nous étudions votre logement",
    text: "Un échange puis une visite technique pour relever ce qui compte vraiment : isolation, émetteurs, emplacement des équipements.",
  },
  {
    title: "Vous recevez un devis détaillé",
    text: "Équipements, quantités et prix ligne par ligne, avec les aides estimées présentées séparément de toute remise commerciale.",
  },
  {
    title: "Les aides sont préparées au bon moment",
    text: "Nous vous indiquons les démarches à engager avant la signature et avant le démarrage des travaux, et les pièces à fournir.",
  },
  {
    title: "Les travaux sont réalisés et mis en service",
    text: "Installation, réglages et explications d'usage, pour que vous sachiez utiliser et entretenir votre nouvel équipement.",
  },
] as const;

export const faq = [
  {
    q: "Le résultat du simulateur est-il garanti ?",
    a: "Non. Il s'agit d'une estimation indicative, établie à partir de vos réponses. Elle ne vaut ni attribution d'aides ni devis : le montant des aides dépend de l'étude de votre projet et des décisions des organismes qui les versent.",
  },
  {
    q: "Qui peut bénéficier de MaPrimeRénov' ?",
    a: "Les propriétaires, sous conditions, pour des travaux dans un logement qui respecte les critères de l'Anah. Le montant dépend des revenus du foyer, classés en quatre catégories, et des travaux réalisés. Les conditions évoluent : elles sont vérifiées au moment de l'étude.",
  },
  {
    q: "Peut-on cumuler MaPrimeRénov' et les primes CEE ?",
    a: "En général oui, pour un même geste. Le total des aides publiques est cependant plafonné selon les revenus du foyer : au-delà, MaPrimeRénov' est réduite.",
  },
  {
    q: "Pourquoi faire appel à une entreprise qualifiée RGE ?",
    a: "La qualification RGE est exigée pour la plupart des aides à la rénovation énergétique. Elle est attribuée par domaine de travaux et peut être vérifiée dans l'annuaire officiel de France Rénov'.",
  },
  {
    q: "Dans quel ordre réaliser les travaux ?",
    a: "Le plus souvent, on réduit d'abord les pertes de chaleur (combles, murs) avant de remplacer le chauffage. L'équipement peut alors être dimensionné au plus juste. Chaque maison reste un cas particulier.",
  },
  {
    q: "Une pompe à chaleur fonctionne-t-elle avec mes radiateurs actuels ?",
    a: "Souvent, mais pas toujours. Tout dépend de la température d'eau dont vos radiateurs ont besoin pour chauffer correctement. La visite technique permet de le vérifier pièce par pièce.",
  },
  {
    q: "Quelles informations préparer pour une demande de devis ?",
    a: "Votre code postal, le type de logement, le mode de chauffage actuel, les travaux envisagés et, pour les aides, votre dernier avis d'imposition. Des photos de la chaudière ou des combles peuvent aussi être utiles.",
  },
  {
    q: "Où obtenir un conseil public et indépendant ?",
    a: "Le service public France Rénov' informe gratuitement les particuliers sur les aides et les travaux, en ligne sur france-renov.gouv.fr ou au 0 808 800 700 (service gratuit + prix d'un appel).",
  },
] as const;
