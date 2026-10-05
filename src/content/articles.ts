import { photos, type Photo } from "./photos";

/**
 * Articles de l'espace Conseils.
 *
 * Texte enrichi minimal : **gras** et [lien](/chemin) dans les paragraphes
 * et les listes. Chaque article reste en statut « a-valider » tant que le
 * client n'a pas relu et validé son contenu : il est alors exclu du sitemap
 * et marqué noindex. `toCheck` liste les points factuels à vérifier.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  readingMinutes: number;
  updatedAt: string;
  status: "a-valider" | "publie";
  photo: Photo;
  lead: string;
  sections: { heading: string; blocks: Block[] }[];
  toCheck: string[];
  related: string[];
};

export const articles: Article[] = [
  {
    slug: "pompe-a-chaleur-air-eau-maison",
    title: "Pompe à chaleur air/eau : comment savoir si elle convient à votre maison",
    seoTitle: "Pompe à chaleur air/eau : est-elle adaptée à votre maison ?",
    description:
      "Fonctionnement, compatibilité avec vos radiateurs, isolation, emplacement : les points à vérifier avant d'installer une pompe à chaleur air/eau.",
    category: "Chauffage",
    readingMinutes: 7,
    updatedAt: "2026-10-06",
    status: "a-valider",
    photo: photos.pacFacade,
    lead: "La pompe à chaleur air/eau est devenue la solution de référence pour remplacer une chaudière fioul ou gaz. Elle peut réduire fortement la consommation de chauffage, à condition d'être choisie et installée pour votre maison, pas pour une maison type.",
    sections: [
      {
        heading: "Comment fonctionne une pompe à chaleur air/eau ?",
        blocks: [
          {
            type: "p",
            text: "Une pompe à chaleur air/eau prélève la chaleur présente dans l'air extérieur, même lorsqu'il fait froid, et la transfère à l'eau de votre circuit de chauffage. Cette eau circule ensuite dans vos radiateurs ou votre plancher chauffant, comme avec une chaudière.",
          },
          {
            type: "p",
            text: "L'appareil consomme de l'électricité pour faire fonctionner son compresseur, mais il restitue davantage d'énergie qu'il n'en consomme. Ce rapport est exprimé par le **coefficient de performance (COP)** et, sur une saison entière, par le **SCOP**. Plus ces valeurs sont élevées, plus l'installation est économe.",
          },
          {
            type: "p",
            text: "Selon les modèles, la pompe à chaleur peut aussi produire l'eau chaude sanitaire, soit grâce à un ballon intégré, soit en complément d'un [ballon thermodynamique](/conseils/eau-chaude-solaire-thermodynamique-photovoltaique).",
          },
        ],
      },
      {
        heading: "Vos radiateurs sont-ils compatibles ?",
        blocks: [
          {
            type: "p",
            text: "C'est la première question à se poser. Une pompe à chaleur est d'autant plus performante que la température de l'eau envoyée dans les émetteurs est basse.",
          },
          {
            type: "ul",
            items: [
              "**Plancher chauffant** : idéal, il fonctionne avec une eau peu chaude.",
              "**Radiateurs récents ou surdimensionnés** : généralement compatibles avec une pompe à chaleur basse ou moyenne température.",
              "**Anciens radiateurs en fonte prévus pour une eau très chaude** : une pompe à chaleur haute température ou le remplacement de certains radiateurs peut être nécessaire.",
            ],
          },
          {
            type: "p",
            text: "Un relevé pièce par pièce lors de la visite technique permet de trancher. C'est aussi l'occasion de vérifier l'état du circuit : un désembouage est parfois recommandé avant le raccordement.",
          },
        ],
      },
      {
        heading: "Pourquoi l'isolation change tout",
        blocks: [
          {
            type: "p",
            text: "La puissance d'une pompe à chaleur se calcule à partir des **déperditions** de la maison, c'est-à-dire la chaleur qu'elle perd par le toit, les murs, les fenêtres et le renouvellement d'air. Une maison peu isolée demande une machine plus puissante, donc plus chère, qui fonctionnera davantage.",
          },
          {
            type: "p",
            text: "Lorsque la toiture n'est pas isolée, il est souvent pertinent de commencer par les [combles](/conseils/isolation-combles-ou-murs-exterieurs) : le chantier est court et la pompe à chaleur pourra ensuite être dimensionnée au plus juste.",
          },
          {
            type: "callout",
            title: "À retenir",
            text: "Une pompe à chaleur surdimensionnée n'est pas plus confortable : elle démarre et s'arrête trop souvent, s'use plus vite et perd en rendement.",
          },
        ],
      },
      {
        heading: "Où installer l'unité extérieure ?",
        blocks: [
          {
            type: "p",
            text: "L'unité extérieure contient le ventilateur et le compresseur. Son emplacement doit être choisi avec soin :",
          },
          {
            type: "ul",
            items: [
              "à distance des fenêtres de chambres, chez vous comme chez vos voisins, pour limiter la gêne sonore ;",
              "sur un support stable, surélevé si besoin pour l'évacuation des condensats et la neige ;",
              "avec un dégagement suffisant pour la circulation de l'air et l'entretien ;",
              "en respectant les règles locales d'urbanisme ou de copropriété le cas échéant.",
            ],
          },
        ],
      },
      {
        heading: "Quel budget et quelles aides ?",
        blocks: [
          {
            type: "p",
            text: "Le coût dépend de la puissance nécessaire, de la production d'eau chaude, de l'état du circuit et des travaux annexes (dépose de l'ancienne chaudière, électricité, maçonnerie légère). Seul un devis établi après visite permet de le connaître précisément.",
          },
          {
            type: "p",
            text: "L'installation peut ouvrir droit à des aides publiques, notamment **MaPrimeRénov'** et les **certificats d'économies d'énergie (CEE)**, si elle est réalisée par une entreprise qualifiée RGE et si les conditions du moment sont remplies. Notre article sur [les aides à la rénovation](/conseils/aides-maprimerenov-cee) détaille leur fonctionnement, et le [simulateur](/simulateur) donne une première estimation indicative.",
          },
        ],
      },
      {
        heading: "Les bonnes questions à poser avant de signer",
        blocks: [
          {
            type: "ol",
            items: [
              "La puissance proposée repose-t-elle sur un calcul de déperditions de ma maison ?",
              "Mes radiateurs actuels sont-ils conservés, et à quelle température fonctionneront-ils ?",
              "Comment l'eau chaude sanitaire sera-t-elle produite ?",
              "Où sera placée l'unité extérieure, et quel est son niveau sonore ?",
              "Quel entretien est prévu, et à quelle fréquence ?",
            ],
          },
        ],
      },
    ],
    toCheck: [
      "Exigences techniques et montants des aides applicables à la date de publication.",
      "Obligations d'entretien et de contrôle en vigueur pour les pompes à chaleur.",
    ],
    related: ["aides-maprimerenov-cee", "isolation-combles-ou-murs-exterieurs"],
  },
  {
    slug: "aides-maprimerenov-cee",
    title: "MaPrimeRénov' et CEE : comprendre les aides à la rénovation énergétique",
    seoTitle: "MaPrimeRénov' et CEE : fonctionnement, cumul et démarches",
    description:
      "Qui peut en bénéficier, comment sont calculées les aides, peut-on les cumuler et dans quel ordre faire les démarches : l'essentiel pour préparer votre projet.",
    category: "Aides",
    readingMinutes: 8,
    updatedAt: "2026-10-06",
    status: "a-valider",
    photo: photos.solarHouse,
    lead: "Deux dispositifs financent la plupart des travaux de rénovation énergétique des particuliers : MaPrimeRénov', versée par l'État via l'Anah, et les primes issues des certificats d'économies d'énergie (CEE), financées par les fournisseurs d'énergie. Voici comment ils fonctionnent, sans jargon.",
    sections: [
      {
        heading: "MaPrimeRénov' : une aide publique calculée selon vos revenus",
        blocks: [
          {
            type: "p",
            text: "MaPrimeRénov' est gérée par l'**Agence nationale de l'habitat (Anah)**. Son montant dépend principalement de deux éléments : les travaux réalisés et les revenus du foyer.",
          },
          {
            type: "p",
            text: "Les foyers sont répartis en quatre catégories selon leur **revenu fiscal de référence** et le nombre de personnes qui le composent : revenus très modestes, modestes, intermédiaires et supérieurs. Les plafonds sont différents en Île-de-France et dans les autres régions, et ils sont révisés régulièrement.",
          },
          {
            type: "p",
            text: "Le logement doit en principe être une résidence principale et respecter des conditions d'ancienneté. Les conditions précises, les travaux éligibles et les montants évoluent : ils doivent toujours être vérifiés à la date de votre projet.",
          },
        ],
      },
      {
        heading: "Les CEE : des primes financées par les fournisseurs d'énergie",
        blocks: [
          {
            type: "p",
            text: "Le dispositif des certificats d'économies d'énergie oblige les fournisseurs d'énergie à financer des économies d'énergie chez leurs clients. Concrètement, ils versent des primes pour des travaux qui répondent à des **fiches techniques standardisées**.",
          },
          {
            type: "p",
            text: "Le montant dépend du type de travaux, de la zone climatique, du logement et parfois des revenus. Des bonifications ponctuelles, appelées « coups de pouce », peuvent s'ajouter, par exemple lors du remplacement d'une chaudière fioul ou gaz.",
          },
          {
            type: "callout",
            title: "Point de vigilance",
            text: "Pour les CEE, l'engagement auprès de l'organisme qui verse la prime doit intervenir avant la signature du devis. Une prime demandée après coup peut être refusée.",
          },
        ],
      },
      {
        heading: "Peut-on cumuler MaPrimeRénov' et les CEE ?",
        blocks: [
          {
            type: "p",
            text: "Oui, les deux aides sont en général cumulables pour un même geste. Le cumul est toutefois **plafonné** : l'ensemble des aides publiques ne peut pas dépasser une certaine part du coût des travaux, et cette part dépend des revenus du foyer. Lorsque le plafond est atteint, MaPrimeRénov' est réduite.",
          },
          {
            type: "p",
            text: "D'autres dispositifs peuvent compléter le financement selon les cas : taux de TVA réduit sur certains travaux, éco-prêt à taux zéro, aides locales de collectivités. Leur compatibilité se vérifie projet par projet.",
          },
        ],
      },
      {
        heading: "Pourquoi l'entreprise doit être RGE",
        blocks: [
          {
            type: "p",
            text: "Pour la plupart des aides, les travaux doivent être réalisés par une entreprise titulaire de la qualification **RGE (Reconnu Garant de l'Environnement)** dans le domaine concerné. La qualification est attribuée par domaine de travaux : une entreprise RGE en isolation ne l'est pas forcément pour les pompes à chaleur.",
          },
          {
            type: "p",
            text: "Vous pouvez vérifier la qualification d'une entreprise dans l'annuaire officiel publié sur [france-renov.gouv.fr](https://france-renov.gouv.fr).",
          },
        ],
      },
      {
        heading: "Dans quel ordre faire les démarches ?",
        blocks: [
          {
            type: "ol",
            items: [
              "**Faire le point sur le projet** : travaux envisagés, état du logement, revenus du foyer. Le [simulateur](/simulateur) donne un premier ordre de grandeur.",
              "**Obtenir un devis détaillé** après visite technique, mentionnant la qualification RGE et les caractéristiques des équipements.",
              "**Engager les demandes d'aides** avant de signer (CEE) et avant de démarrer les travaux (MaPrimeRénov').",
              "**Réaliser les travaux** puis transmettre la facture et les justificatifs demandés.",
              "**Percevoir les aides**, selon les modalités et délais propres à chaque organisme.",
            ],
          },
        ],
      },
      {
        heading: "Se faire conseiller gratuitement",
        blocks: [
          {
            type: "p",
            text: "Le service public **France Rénov'** propose un conseil gratuit et indépendant, en ligne ou par téléphone au 0 808 800 700 (service gratuit + prix d'un appel). C'est un bon réflexe pour confirmer votre éligibilité.",
          },
          {
            type: "p",
            text: "Méfiez-vous des démarchages agressifs, des promesses de travaux « gratuits » et des demandes d'acompte avant toute étude : aucun organisme public ne démarche les particuliers par téléphone pour vendre des travaux.",
          },
        ],
      },
    ],
    toCheck: [
      "Conditions d'éligibilité MaPrimeRénov' (ancienneté du logement, résidence principale) en vigueur.",
      "Règles de cumul et taux de plafonnement en vigueur.",
      "Calendrier des démarches CEE et MaPrimeRénov' (avant signature / avant travaux).",
    ],
    related: ["pompe-a-chaleur-air-eau-maison", "isolation-combles-ou-murs-exterieurs"],
  },
  {
    slug: "isolation-combles-ou-murs-exterieurs",
    title: "Isolation des combles ou des murs par l'extérieur : par où commencer ?",
    seoTitle: "Isoler les combles ou les murs par l'extérieur : par où commencer ?",
    description:
      "Combles perdus, combles aménagés, isolation thermique par l'extérieur : comprendre les différences et choisir l'ordre des travaux pour gagner en confort.",
    category: "Isolation",
    readingMinutes: 7,
    updatedAt: "2026-10-06",
    status: "a-valider",
    photo: photos.insulationWall,
    lead: "Avant de changer de chauffage, il est souvent plus efficace de réduire la chaleur qui s'échappe. Toiture et murs sont les deux grands chantiers d'isolation d'une maison : voici comment les aborder et dans quel ordre.",
    sections: [
      {
        heading: "Pourquoi isoler en priorité",
        blocks: [
          {
            type: "p",
            text: "Une maison mal isolée perd sa chaleur par la toiture, les murs, les fenêtres, le plancher bas et les fuites d'air. La toiture représente généralement la part la plus importante, car l'air chaud monte.",
          },
          {
            type: "p",
            text: "Isoler apporte un double bénéfice : moins de besoins de chauffage et un meilleur confort, avec des parois moins froides en hiver et une maison qui chauffe moins en été. Cela permet aussi, ensuite, de choisir un équipement de chauffage moins puissant.",
          },
        ],
      },
      {
        heading: "L'isolation des combles",
        blocks: [
          {
            type: "p",
            text: "Tout dépend de l'usage de l'espace sous la toiture.",
          },
          {
            type: "ul",
            items: [
              "**Combles perdus** (non habitables) : l'isolant est posé sur le plancher, soit en rouleaux, soit soufflé en flocons. C'est rapide et généralement réalisé en une journée.",
              "**Combles aménagés** : l'isolant est posé sous les rampants de la toiture, entre et sous les chevrons, avec une membrane assurant l'étanchéité à l'air.",
            ],
          },
          {
            type: "p",
            text: "La performance d'un isolant s'exprime par sa **résistance thermique (R)** : plus elle est élevée, plus il isole. Les aides imposent des valeurs minimales selon la partie de la maison isolée ; le devis doit indiquer la résistance thermique et l'épaisseur posées.",
          },
        ],
      },
      {
        heading: "L'isolation thermique par l'extérieur (ITE)",
        blocks: [
          {
            type: "p",
            text: "L'ITE consiste à envelopper les façades d'un isolant, protégé ensuite par un enduit ou un bardage. Ses avantages sont nombreux :",
          },
          {
            type: "ul",
            items: [
              "aucune perte de surface habitable ;",
              "traitement continu des ponts thermiques, là où les planchers rejoignent les murs ;",
              "travaux réalisés depuis l'extérieur, sans vider les pièces ;",
              "rénovation de l'aspect de la façade en même temps.",
            ],
          },
          {
            type: "p",
            text: "C'est un chantier plus important : échafaudage, reprise des appuis de fenêtres, descentes d'eaux pluviales et éléments en façade. Comme l'aspect extérieur change, une **déclaration préalable de travaux** en mairie est généralement nécessaire, et certaines zones protégées imposent des contraintes particulières.",
          },
        ],
      },
      {
        heading: "Par où commencer ?",
        blocks: [
          {
            type: "p",
            text: "Il n'existe pas de règle unique, mais une logique simple :",
          },
          {
            type: "ol",
            items: [
              "**Les combles d'abord** lorsqu'ils ne sont pas ou peu isolés : le rapport entre coût et gain est souvent le plus favorable.",
              "**Les murs ensuite**, en particulier si la façade doit de toute façon être rénovée.",
              "**Le chauffage en dernier**, une fois les besoins réduits, pour dimensionner l'équipement au plus juste.",
            ],
          },
          {
            type: "callout",
            title: "Pensez à la ventilation",
            text: "Une maison mieux isolée est aussi plus étanche à l'air. Une ventilation efficace est indispensable pour préserver la qualité de l'air intérieur et éviter l'humidité.",
          },
        ],
      },
      {
        heading: "Quelles aides pour l'isolation ?",
        blocks: [
          {
            type: "p",
            text: "Selon les travaux et la période, l'isolation peut être soutenue par les primes CEE et, pour certains gestes, par MaPrimeRénov'. Les conditions évoluent régulièrement : consultez notre article sur [MaPrimeRénov' et les CEE](/conseils/aides-maprimerenov-cee) et faites une [première estimation](/simulateur).",
          },
        ],
      },
    ],
    toCheck: [
      "Résistances thermiques minimales exigées pour chaque type de paroi.",
      "Gestes d'isolation éligibles à MaPrimeRénov' et aux CEE à la date de publication.",
    ],
    related: ["aides-maprimerenov-cee", "pompe-a-chaleur-air-eau-maison"],
  },
  {
    slug: "eau-chaude-solaire-thermodynamique-photovoltaique",
    title: "Ballon thermodynamique, système solaire combiné ou photovoltaïque : quelles différences ?",
    seoTitle: "Ballon thermodynamique, solaire combiné ou photovoltaïque : que choisir ?",
    description:
      "Eau chaude, chauffage ou électricité : trois technologies souvent confondues. Leur fonctionnement, leurs atouts et les questions à se poser avant de choisir.",
    category: "Solaire & eau chaude",
    readingMinutes: 7,
    updatedAt: "2026-10-06",
    status: "a-valider",
    photo: photos.solarInstall,
    lead: "Ballon thermodynamique, capteurs solaires thermiques, panneaux photovoltaïques : ces équipements visent tous à réduire votre facture d'énergie, mais ils ne répondent pas au même besoin. Les distinguer aide à choisir la solution adaptée à votre maison.",
    sections: [
      {
        heading: "Le ballon thermodynamique : l'eau chaude économe",
        blocks: [
          {
            type: "p",
            text: "Un ballon thermodynamique associe un réservoir d'eau chaude à une petite pompe à chaleur. Celle-ci récupère la chaleur de l'air ambiant d'une pièce non chauffée, ou de l'air extérieur, pour chauffer l'eau. Il consomme nettement moins d'électricité qu'un chauffe-eau électrique classique.",
          },
          {
            type: "ul",
            items: [
              "**Pour qui ?** Les foyers équipés d'un chauffe-eau électrique ou dont la chaudière produit aussi l'eau chaude.",
              "**Où l'installer ?** Dans un garage, un cellier ou une buanderie d'un volume suffisant, ou avec une gaine vers l'extérieur.",
              "**Quelle capacité ?** Elle se choisit selon le nombre d'occupants et les habitudes.",
            ],
          },
        ],
      },
      {
        heading: "Le système solaire combiné : chauffage et eau chaude par le soleil",
        blocks: [
          {
            type: "p",
            text: "Un système solaire combiné utilise des **capteurs solaires thermiques** : ils chauffent un liquide qui transmet sa chaleur à un ballon de stockage. Ce ballon alimente le chauffage et l'eau chaude sanitaire. Un appoint prend le relais lorsque l'ensoleillement ne suffit pas.",
          },
          {
            type: "p",
            text: "Cette solution convient aux maisons disposant d'une toiture bien orientée, d'émetteurs basse température et de la place nécessaire pour le stockage. Elle demande une étude soignée pour équilibrer surface de capteurs, volume de stockage et appoint.",
          },
        ],
      },
      {
        heading: "Les panneaux photovoltaïques : produire son électricité",
        blocks: [
          {
            type: "p",
            text: "Les panneaux photovoltaïques transforment la lumière en **électricité**, et non en chaleur. Le plus souvent, cette électricité est consommée directement dans la maison (autoconsommation) et le surplus peut être revendu.",
          },
          {
            type: "p",
            text: "La rentabilité dépend de l'orientation, de l'ombrage, de la puissance installée et surtout de votre capacité à consommer l'électricité au moment où elle est produite. Programmer un ballon d'eau chaude ou une pompe à chaleur en journée peut l'améliorer.",
          },
          {
            type: "p",
            text: "Le photovoltaïque n'est pas financé par MaPrimeRénov'. D'autres dispositifs peuvent exister, comme une prime à l'autoconsommation ou un tarif de rachat du surplus, dont les conditions évoluent régulièrement.",
          },
        ],
      },
      {
        heading: "Comment choisir ?",
        blocks: [
          {
            type: "ul",
            items: [
              "Votre priorité est de **réduire le coût de l'eau chaude** : le ballon thermodynamique est souvent la solution la plus simple.",
              "Vous voulez que le soleil participe **au chauffage et à l'eau chaude** : le système solaire combiné est à étudier.",
              "Vous souhaitez **réduire l'électricité achetée** au réseau : le photovoltaïque est la piste naturelle.",
            ],
          },
          {
            type: "callout",
            title: "Penser global",
            text: "Ces solutions se combinent : par exemple, une pompe à chaleur air/eau associée à un ballon thermodynamique, ou des panneaux photovoltaïques qui alimentent une partie des équipements.",
          },
        ],
      },
      {
        heading: "Aides et prochaines étapes",
        blocks: [
          {
            type: "p",
            text: "Le ballon thermodynamique et le système solaire combiné peuvent ouvrir droit à des aides lorsqu'ils sont posés par une entreprise RGE, selon les conditions en vigueur. Pour en savoir plus, lisez notre article sur [MaPrimeRénov' et les CEE](/conseils/aides-maprimerenov-cee) ou lancez le [simulateur](/simulateur).",
          },
        ],
      },
    ],
    toCheck: [
      "Éligibilité du ballon thermodynamique et du système solaire combiné aux aides à la date de publication.",
      "Dispositifs en vigueur pour le photovoltaïque (prime à l'autoconsommation, tarif de rachat).",
    ],
    related: ["pompe-a-chaleur-air-eau-maison", "aides-maprimerenov-cee"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
