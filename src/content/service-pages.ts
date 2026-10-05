/**
 * Contenu détaillé des pages prestations (/prestations/[slug]).
 * Les clés correspondent aux `id` de src/content/services.ts.
 *
 * Rédaction factuelle : aucun montant, délai ou garantie n'est annoncé tant
 * qu'il n'a pas été validé par Maîtrise RGE. Les estimations chiffrées
 * passent par le simulateur.
 */

export type ServicePage = {
  /** Sujet avec son article, ex. « l'isolation des combles ». */
  subject: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroLead: string;
  aids: { name: string; note: string }[];
  benefits: { title: string; text: string }[];
  how: { title: string; intro: string; steps: { title: string; text: string }[] };
  variants: { title: string; intro: string; items: { name: string; text: string; bestFor: string }[] };
  fit: { title: string; items: string[] };
  aidsText: string[];
  process: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const servicePages: Record<string, ServicePage> = {
  "pompe-a-chaleur-air-eau": {
    subject: "la pompe à chaleur air/eau",
    seoTitle: "Pompe à chaleur air/eau : installation et aides",
    metaDescription:
      "Installation de pompe à chaleur air/eau par Maîtrise RGE : remplacement de chaudière fioul ou gaz, dimensionnement sur mesure, aides MaPrimeRénov' et CEE. Estimez vos aides en ligne.",
    keywords: ["pompe à chaleur air eau", "installation pompe à chaleur", "remplacement chaudière fioul", "PAC air/eau aides", "MaPrimeRénov' pompe à chaleur"],
    heroTitle: "Pompe à chaleur air/eau : chauffez mieux, dépensez moins.",
    heroLead:
      "La solution de référence pour remplacer une chaudière fioul ou gaz. Elle puise les calories de l'air extérieur pour alimenter vos radiateurs ou votre plancher chauffant, et peut aussi produire votre eau chaude.",
    aids: [
      { name: "MaPrimeRénov'", note: "selon revenus" },
      { name: "Primes CEE", note: "bonifiées en sortie du fioul ou du gaz" },
      { name: "TVA réduite", note: "sous conditions" },
    ],
    benefits: [
      {
        title: "Une facture de chauffage allégée",
        text: "Pour chaque kilowattheure d'électricité consommé, une pompe à chaleur bien dimensionnée restitue plusieurs kilowattheures de chaleur. C'est ce rendement qui fait baisser durablement la dépense de chauffage.",
      },
      {
        title: "La fin du fioul et du gaz",
        text: "Plus de livraison de fioul, plus de combustion dans la maison : vous réduisez votre dépendance aux énergies fossiles et à leurs variations de prix.",
      },
      {
        title: "Un logement mieux valorisé",
        text: "Remplacer une chaudière fossile par une pompe à chaleur améliore en général l'étiquette du diagnostic de performance énergétique, un atout pour vivre comme pour vendre ou louer.",
      },
    ],
    how: {
      title: "Comment fonctionne une pompe à chaleur air/eau ?",
      intro:
        "Le principe est celui d'un réfrigérateur inversé : la machine déplace la chaleur au lieu de la produire, ce qui explique son excellent rendement.",
      steps: [
        { title: "Captation", text: "L'unité extérieure aspire l'air ambiant. Même froid, il contient de l'énergie que capte un fluide frigorigène en s'évaporant." },
        { title: "Compression", text: "Le compresseur comprime ce fluide, ce qui fait fortement monter sa température. C'est la seule étape qui consomme de l'électricité." },
        { title: "Restitution", text: "Un échangeur transmet la chaleur à l'eau de votre circuit de chauffage, qui alimente radiateurs ou plancher, et éventuellement le ballon d'eau chaude." },
      ],
    },
    variants: {
      title: "Quelle pompe à chaleur pour votre maison ?",
      intro: "Le choix dépend de vos émetteurs, de la place disponible et de la configuration de la maison.",
      items: [
        { name: "Monobloc", text: "Tous les composants frigorifiques sont dans l'unité extérieure, reliée à la maison par des tuyaux d'eau. Installation simplifiée.", bestFor: "Maisons où l'unité extérieure peut être placée près du point de raccordement" },
        { name: "Bi-bloc (split)", text: "Une unité extérieure et un module hydraulique intérieur, reliés par une liaison frigorifique. Plus de souplesse d'implantation.", bestFor: "Maisons disposant d'un local technique ou d'un cellier" },
        { name: "Haute température", text: "Conçue pour produire une eau plus chaude, compatible avec des radiateurs anciens prévus pour une chaudière.", bestFor: "Maisons équipées de radiateurs en fonte, peu ou moyennement isolées" },
      ],
    },
    fit: {
      title: "Votre logement est-il compatible ?",
      items: [
        "Un chauffage central à eau existe déjà : radiateurs ou plancher chauffant.",
        "Un emplacement extérieur permet de poser l'unité, à distance des chambres voisines.",
        "L'isolation est correcte, ou des travaux d'isolation sont prévus.",
        "L'installation électrique peut accueillir l'équipement, quitte à adapter l'abonnement.",
        "Le logement est chauffé au fioul, au gaz ou au bois : l'électricité directe relève d'autres solutions.",
      ],
    },
    aidsText: [
      "L'installation d'une pompe à chaleur air/eau par une entreprise RGE peut être soutenue par MaPrimeRénov', dont le montant dépend des revenus du foyer, et par les primes CEE, souvent bonifiées lorsque la pompe à chaleur remplace une chaudière au fioul ou au gaz.",
      "Ces aides sont plafonnées et leurs conditions évoluent : le simulateur vous donne un premier ordre de grandeur, confirmé ensuite par l'étude de votre projet.",
    ],
    process: [
      { title: "Visite technique", text: "Relevé des pièces, des émetteurs et de l'isolation pour calculer les besoins réels de chauffage." },
      { title: "Dimensionnement et devis", text: "Choix du modèle et de sa puissance, emplacement des unités, devis détaillé avec les aides estimées." },
      { title: "Demandes d'aides", text: "Engagement des démarches CEE et MaPrimeRénov' au bon moment, avant la signature et avant les travaux." },
      { title: "Installation et mise en service", text: "Dépose de l'ancienne chaudière, pose, raccordement, réglages et explications d'utilisation." },
    ],
    faq: [
      { q: "Une pompe à chaleur chauffe-t-elle quand il gèle ?", a: "Oui. Les pompes à chaleur air/eau sont conçues pour fonctionner à des températures négatives. Leur rendement diminue quand il fait très froid, c'est pourquoi le dimensionnement tient compte des températures les plus basses de votre région." },
      { q: "Dois-je changer mes radiateurs ?", a: "Pas forcément. Beaucoup de radiateurs existants fonctionnent avec une pompe à chaleur basse ou moyenne température. Pour des radiateurs anciens prévus pour une eau très chaude, un modèle haute température ou le remplacement de quelques radiateurs peut être recommandé." },
      { q: "L'unité extérieure fait-elle du bruit ?", a: "Elle produit un bruit de ventilation, modéré sur les modèles récents. Le choix de l'emplacement, le support antivibratile et l'orientation permettent de limiter la gêne, chez vous comme chez vos voisins." },
      { q: "Quel entretien prévoir ?", a: "Un entretien régulier par un professionnel garantit le rendement et la longévité de l'installation. Les obligations d'entretien et de contrôle dépendent de l'équipement installé : nous vous les précisons lors du devis." },
      { q: "Combien de temps durent les travaux ?", a: "Le plus souvent quelques jours, selon la configuration de la maison et les travaux annexes. La durée prévue figure dans le devis." },
    ],
    related: ["isolation-des-combles", "equipements-thermodynamiques", "panneaux-photovoltaiques"],
  },

  "isolation-des-combles": {
    subject: "l'isolation des combles",
    seoTitle: "Isolation des combles perdus et aménagés : prix et aides",
    metaDescription:
      "Isolation des combles perdus ou aménagés par Maîtrise RGE : soufflage, rouleaux ou isolation sous rampants. Plus de confort, moins de déperditions, aides CEE et MaPrimeRénov' selon conditions.",
    keywords: ["isolation des combles", "isolation combles perdus", "isolation sous rampants", "soufflage laine combles", "aides isolation combles"],
    heroTitle: "Isolation des combles : le premier geste qui change tout.",
    heroLead:
      "La toiture est l'un des principaux points de fuite de la chaleur. Isoler vos combles améliore le confort dès le premier hiver et protège la maison de la chaleur l'été.",
    aids: [
      { name: "Primes CEE", note: "selon le type de combles" },
      { name: "MaPrimeRénov'", note: "selon conditions en vigueur" },
      { name: "TVA réduite", note: "sous conditions" },
    ],
    benefits: [
      { title: "Moins de chaleur perdue", text: "L'air chaud monte : sans isolant, une grande partie de la chaleur produite s'échappe par le toit. Une isolation performante la garde dans les pièces de vie." },
      { title: "Un confort toute l'année", text: "L'hiver, les pièces sous la toiture restent chaudes ; l'été, l'isolant freine la chaleur qui s'accumule sous les tuiles." },
      { title: "Un chantier rapide", text: "En combles perdus, l'intervention est courte et se fait sans toucher aux pièces habitées." },
    ],
    how: {
      title: "Pourquoi commencer par la toiture ?",
      intro: "Isoler les combles, c'est traiter la paroi qui perd le plus de chaleur avec un chantier simple. Trois notions à connaître :",
      steps: [
        { title: "La résistance thermique", text: "Notée R, elle mesure la capacité d'un isolant à freiner la chaleur. Plus elle est élevée, plus l'isolation est performante ; les aides imposent une valeur minimale." },
        { title: "La continuité", text: "Un isolant posé sans interruption, y compris autour des trappes et des gaines, évite les ponts thermiques et les zones froides." },
        { title: "La gestion de la vapeur", text: "Une membrane adaptée, en combles aménagés notamment, protège l'isolant de l'humidité intérieure et préserve sa performance." },
      ],
    },
    variants: {
      title: "Quelle méthode pour vos combles ?",
      intro: "Elle dépend de l'usage de l'espace sous la toiture et de son accessibilité.",
      items: [
        { name: "Soufflage", text: "Un isolant en flocons (laine minérale, ouate de cellulose) est projeté uniformément sur le plancher des combles.", bestFor: "Combles perdus, y compris peu accessibles" },
        { name: "Rouleaux ou panneaux", text: "L'isolant est déroulé sur le plancher, souvent en deux couches croisées pour supprimer les jonctions.", bestFor: "Combles perdus accessibles et dégagés" },
        { name: "Sous rampants", text: "Des panneaux sont posés entre et sous les chevrons, avec une membrane d'étanchéité à l'air, puis un parement.", bestFor: "Combles aménagés ou à aménager" },
      ],
    },
    fit: {
      title: "Ce que nous vérifions avant d'isoler",
      items: [
        "L'accès aux combles et la hauteur disponible.",
        "L'état de la charpente et de la couverture : pas d'infiltration ni d'humidité.",
        "La présence de spots, gaines et conduits à protéger ou à déporter.",
        "L'isolant existant : à compléter, à retirer ou à conserver.",
        "La ventilation du logement, essentielle une fois la maison mieux isolée.",
      ],
    },
    aidsText: [
      "L'isolation des combles réalisée par une entreprise RGE peut bénéficier de primes CEE et, selon les gestes et la période, de MaPrimeRénov'. Les aides imposent une résistance thermique minimale, indiquée sur le devis.",
      "Le simulateur prend en compte la surface à isoler pour vous donner une première estimation.",
    ],
    process: [
      { title: "Visite des combles", text: "Mesure de la surface, contrôle de la charpente, repérage des points singuliers." },
      { title: "Choix de la technique et devis", text: "Méthode, isolant, épaisseur et résistance thermique détaillés, avec les aides estimées." },
      { title: "Demandes d'aides", text: "Démarches engagées avant la signature et avant le démarrage du chantier." },
      { title: "Pose et contrôle", text: "Protection des points sensibles, pose de l'isolant, repérage de l'épaisseur et nettoyage." },
    ],
    faq: [
      { q: "Quelle épaisseur d'isolant faut-il ?", a: "On raisonne en résistance thermique plutôt qu'en épaisseur : chaque isolant a sa propre performance. L'épaisseur posée découle de la résistance visée, qui conditionne aussi l'accès aux aides." },
      { q: "Faut-il vider les combles avant l'intervention ?", a: "Pour des combles perdus, il faut libérer l'accès et l'espace de travail. Les objets stockés doivent être retirés ; nous vous indiquons précisément quoi faire lors de la visite." },
      { q: "Peut-on encore marcher dans les combles après isolation ?", a: "Pas sur un isolant soufflé, qui se tasserait. Si vous avez besoin d'accéder à un équipement, un cheminement peut être prévu." },
      { q: "L'isolation des combles suffit-elle à améliorer le DPE ?", a: "Elle y contribue nettement lorsque la toiture n'était pas isolée. Le gain dépend de l'ensemble du logement : murs, fenêtres et chauffage comptent aussi." },
    ],
    related: ["isolation-thermique-exterieure", "pompe-a-chaleur-air-eau", "equipements-thermodynamiques"],
  },

  "isolation-thermique-exterieure": {
    subject: "l'isolation par l'extérieur",
    seoTitle: "Isolation thermique par l'extérieur (ITE) : enduit ou bardage",
    metaDescription:
      "Isolation thermique par l'extérieur avec Maîtrise RGE : murs isolés sans perte de surface, ponts thermiques traités, façade rénovée. Enduit ou bardage, aides CEE selon conditions.",
    keywords: ["isolation thermique par l'extérieur", "ITE maison", "isolation des murs par l'extérieur", "bardage isolant", "aides ITE"],
    heroTitle: "Isolation par l'extérieur : des murs performants, une façade neuve.",
    heroLead:
      "L'isolant enveloppe la maison par l'extérieur, puis reçoit un enduit ou un bardage. Vous gagnez en confort sans perdre un mètre carré, et la façade est rénovée dans le même chantier.",
    aids: [
      { name: "Primes CEE", note: "selon la surface isolée" },
      { name: "Aides publiques", note: "selon conditions en vigueur" },
      { name: "TVA réduite", note: "sous conditions" },
    ],
    benefits: [
      { title: "Aucune surface perdue", text: "Tout se passe à l'extérieur : les pièces gardent leurs dimensions et vous continuez à vivre normalement pendant le chantier." },
      { title: "Des ponts thermiques traités", text: "L'isolant passe devant les planchers et les murs de refend, là où la chaleur fuit lorsqu'on isole par l'intérieur." },
      { title: "Une façade rénovée", text: "Fissures, enduit vieilli, couleur passée : la finition neuve redonne de l'allure à la maison." },
    ],
    how: {
      title: "Comment se déroule une isolation par l'extérieur ?",
      intro: "Un système d'ITE se compose de plusieurs couches posées dans un ordre précis.",
      steps: [
        { title: "Préparation", text: "Échafaudage, protection des abords, dépose des éléments en façade et vérification du support." },
        { title: "Pose de l'isolant", text: "Les panneaux sont collés et/ou chevillés sur les murs, en continu, y compris autour des ouvertures." },
        { title: "Finition", text: "Une armature et un enduit en plusieurs passes, ou une ossature recevant un bardage, protègent l'isolant." },
      ],
    },
    variants: {
      title: "Quelle finition pour votre façade ?",
      intro: "Le choix tient compte de l'esthétique souhaitée, des règles d'urbanisme et du support.",
      items: [
        { name: "Enduit sur polystyrène", text: "Système léger et économique, avec un large choix de teintes et de textures d'enduit.", bestFor: "Façades courantes en maçonnerie" },
        { name: "Enduit sur laine de roche", text: "Isolant incombustible et perméable à la vapeur d'eau, apprécié pour son confort acoustique.", bestFor: "Murs anciens ou exigences de sécurité incendie" },
        { name: "Bardage ventilé", text: "Un parement en bois, composite ou fibre-ciment posé sur ossature, avec une lame d'air ventilée.", bestFor: "Changer franchement l'aspect de la maison" },
      ],
    },
    fit: {
      title: "Les points étudiés avant l'ITE",
      items: [
        "Les règles d'urbanisme de la commune et les éventuelles zones protégées.",
        "L'état des murs : fissures, humidité, nature du support.",
        "Les débords de toiture, appuis de fenêtres et descentes d'eaux pluviales.",
        "La distance avec la limite de propriété et l'accès pour l'échafaudage.",
        "Les fenêtres : leur remplacement éventuel se prévoit avant l'isolation.",
      ],
    },
    aidsText: [
      "L'isolation des murs par l'extérieur réalisée par une entreprise RGE peut bénéficier de primes CEE calculées selon la surface isolée, et d'autres aides selon les conditions en vigueur.",
      "Une déclaration préalable de travaux est généralement nécessaire : nous vous indiquons les démarches à prévoir.",
    ],
    process: [
      { title: "Étude de la façade", text: "Métré, contrôle du support et des contraintes d'urbanisme." },
      { title: "Choix du système et devis", text: "Isolant, épaisseur, finition et traitement des points singuliers détaillés." },
      { title: "Autorisations et aides", text: "Déclaration préalable en mairie et demandes d'aides au bon moment." },
      { title: "Chantier et finitions", text: "Échafaudage, pose de l'isolant, finition, repose des équipements et nettoyage." },
    ],
    faq: [
      { q: "Faut-il une autorisation pour isoler par l'extérieur ?", a: "Oui, en général : l'aspect extérieur de la maison change, ce qui nécessite une déclaration préalable en mairie. Dans certains secteurs protégés, l'avis de l'architecte des Bâtiments de France est requis." },
      { q: "Peut-on rester chez soi pendant les travaux ?", a: "Oui. Le chantier se déroule à l'extérieur ; seuls l'accès à certaines fenêtres et l'usage du jardin peuvent être temporairement limités." },
      { q: "ITE ou isolation par l'intérieur : que choisir ?", a: "L'isolation par l'extérieur préserve la surface habitable et traite mieux les ponts thermiques, mais demande un chantier plus important. L'isolation par l'intérieur peut convenir pièce par pièce. Nous comparons les deux selon votre maison." },
      { q: "La façade demande-t-elle un entretien ?", a: "Un nettoyage périodique adapté à la finition suffit généralement à préserver l'aspect et la protection de l'enduit ou du bardage." },
    ],
    related: ["isolation-des-combles", "pompe-a-chaleur-air-eau", "systeme-solaire-combine"],
  },

  "systeme-solaire-combine": {
    subject: "le système solaire combiné",
    seoTitle: "Système solaire combiné : chauffage et eau chaude solaires",
    metaDescription:
      "Système solaire combiné (SSC) avec Maîtrise RGE : capteurs solaires thermiques pour le chauffage et l'eau chaude, ballon de stockage et appoint. Aides MaPrimeRénov' et CEE selon conditions.",
    keywords: ["système solaire combiné", "SSC chauffage solaire", "chauffage solaire maison", "capteurs solaires thermiques", "aides système solaire combiné"],
    heroTitle: "Système solaire combiné : le soleil chauffe la maison et l'eau.",
    heroLead:
      "Des capteurs solaires thermiques alimentent un ballon de stockage qui assure à la fois le chauffage et l'eau chaude. Un appoint prend le relais quand le soleil se fait rare.",
    aids: [
      { name: "MaPrimeRénov'", note: "selon revenus" },
      { name: "Primes CEE", note: "selon conditions" },
      { name: "TVA réduite", note: "sous conditions" },
    ],
    benefits: [
      { title: "Deux besoins couverts", text: "Chauffage et eau chaude sanitaire profitent de la même installation solaire." },
      { title: "Une énergie gratuite", text: "La chaleur captée sur le toit ne coûte rien : l'appoint ne fonctionne que pour compléter." },
      { title: "Un logement plus sobre", text: "En réduisant la part d'énergie achetée, le système améliore le bilan énergétique de la maison." },
    ],
    how: {
      title: "Les trois éléments d'un système solaire combiné",
      intro: "Leur dimensionnement conjoint fait la performance de l'installation.",
      steps: [
        { title: "Les capteurs", text: "Posés sur la toiture ou au sol, ils chauffent un liquide caloporteur sous l'effet du rayonnement solaire." },
        { title: "Le ballon de stockage", text: "Il accumule la chaleur captée et la redistribue vers le chauffage et l'eau chaude." },
        { title: "La régulation et l'appoint", text: "La régulation priorise le solaire ; l'appoint complète lorsque l'ensoleillement ne suffit pas." },
      ],
    },
    variants: {
      title: "Solaire thermique ou photovoltaïque ?",
      intro: "Les deux utilisent le soleil, mais ne produisent pas la même énergie.",
      items: [
        { name: "Système solaire combiné", text: "Produit de la chaleur pour le chauffage et l'eau chaude.", bestFor: "Réduire la facture de chauffage et d'eau chaude" },
        { name: "Chauffe-eau solaire", text: "Variante limitée à l'eau chaude sanitaire, plus compacte.", bestFor: "Besoins d'eau chaude importants, chauffage déjà performant" },
        { name: "Panneaux photovoltaïques", text: "Produisent de l'électricité, consommée sur place ou revendue.", bestFor: "Réduire l'électricité achetée au réseau" },
      ],
    },
    fit: {
      title: "Les conditions d'une installation réussie",
      items: [
        "Une toiture ou un terrain bien exposés, de préférence au sud, avec peu d'ombrage.",
        "Un local pour accueillir le ballon de stockage.",
        "Des émetteurs basse température, comme un plancher chauffant, pour en tirer le meilleur.",
        "Une maison correctement isolée, qui limite les besoins de chauffage.",
      ],
    },
    aidsText: [
      "Un système solaire combiné installé par une entreprise RGE peut être soutenu par MaPrimeRénov', selon les revenus du foyer, et par des primes CEE selon les conditions en vigueur.",
      "Le simulateur vous donne une première estimation de ces aides et de votre reste à charge.",
    ],
    process: [
      { title: "Étude solaire", text: "Orientation, inclinaison, ombrages et besoins du foyer analysés." },
      { title: "Dimensionnement et devis", text: "Surface de capteurs, volume de stockage et appoint calculés ensemble." },
      { title: "Demandes d'aides", text: "Démarches engagées avant la signature et avant les travaux." },
      { title: "Installation et réglages", text: "Pose des capteurs et du ballon, raccordements, mise en service de la régulation." },
    ],
    faq: [
      { q: "Le système fonctionne-t-il en hiver ?", a: "Oui, mais les apports solaires sont plus faibles. L'appoint prend alors une part plus importante du chauffage ; le système est dimensionné en conséquence." },
      { q: "Quel entretien prévoir ?", a: "Un contrôle périodique du liquide caloporteur, de la pression et de la régulation, réalisé par un professionnel, préserve les performances." },
      { q: "Faut-il une autorisation pour poser des capteurs ?", a: "La pose de capteurs en toiture modifie l'aspect extérieur : une déclaration préalable en mairie est généralement nécessaire." },
      { q: "Peut-on combiner solaire et pompe à chaleur ?", a: "Oui, l'appoint d'un système solaire peut être assuré par différents générateurs. Nous étudions la combinaison la plus pertinente pour votre maison." },
    ],
    related: ["panneaux-photovoltaiques", "equipements-thermodynamiques", "isolation-des-combles"],
  },

  "equipements-thermodynamiques": {
    subject: "le ballon thermodynamique",
    seoTitle: "Ballon thermodynamique : eau chaude économique, installation et aides",
    metaDescription:
      "Ballon thermodynamique et équipements thermodynamiques par Maîtrise RGE : une eau chaude produite avec beaucoup moins d'électricité qu'un chauffe-eau classique. Aides selon conditions.",
    keywords: ["ballon thermodynamique", "chauffe-eau thermodynamique", "installation ballon thermodynamique", "eau chaude économique", "aides chauffe-eau thermodynamique"],
    heroTitle: "Ballon thermodynamique : votre eau chaude, en consommant bien moins.",
    heroLead:
      "Une petite pompe à chaleur intégrée au ballon récupère les calories de l'air pour chauffer l'eau. Le résultat : une eau chaude produite avec nettement moins d'électricité qu'un chauffe-eau électrique classique.",
    aids: [
      { name: "MaPrimeRénov'", note: "selon revenus" },
      { name: "Primes CEE", note: "selon conditions" },
      { name: "TVA réduite", note: "sous conditions" },
    ],
    benefits: [
      { title: "Moins d'électricité consommée", text: "La pompe à chaleur du ballon fait l'essentiel du travail ; la résistance électrique n'intervient qu'en appoint." },
      { title: "Une installation simple", text: "Il remplace votre chauffe-eau existant, généralement sans gros travaux." },
      { title: "Un allié du solaire", text: "Programmé aux heures de production, il valorise l'électricité de panneaux photovoltaïques." },
    ],
    how: {
      title: "Comment le ballon thermodynamique chauffe votre eau",
      intro: "Le même principe que la pompe à chaleur, appliqué à l'eau chaude sanitaire.",
      steps: [
        { title: "Captation", text: "Un ventilateur fait circuler l'air du local, ou de l'extérieur, sur un évaporateur qui en capte les calories." },
        { title: "Compression", text: "Le compresseur élève la température du fluide frigorigène." },
        { title: "Transfert", text: "Un condenseur transmet cette chaleur à l'eau du ballon, prête à l'usage." },
      ],
    },
    variants: {
      title: "Quel modèle selon votre logement ?",
      intro: "La différence se joue sur l'air utilisé et l'emplacement disponible.",
      items: [
        { name: "Sur air ambiant", text: "Il puise les calories de la pièce où il est installé, de préférence un local non chauffé.", bestFor: "Garage, cellier ou buanderie spacieux" },
        { name: "Sur air extérieur (gainé)", text: "Des gaines relient le ballon à l'extérieur pour aspirer et rejeter l'air.", bestFor: "Logements sans local de volume suffisant" },
        { name: "Split", text: "Une unité extérieure séparée du ballon, reliée par une liaison frigorifique.", bestFor: "Petits espaces intérieurs, installation discrète" },
      ],
    },
    fit: {
      title: "Ce que nous vérifions",
      items: [
        "Le nombre d'occupants et vos habitudes, pour choisir la capacité.",
        "Le local d'installation : volume, température, hauteur sous plafond.",
        "La possibilité de gainer vers l'extérieur si nécessaire.",
        "L'évacuation des condensats et l'alimentation électrique.",
      ],
    },
    aidsText: [
      "Un ballon thermodynamique posé par une entreprise RGE peut bénéficier de MaPrimeRénov' selon les revenus du foyer, et de primes CEE selon les conditions en vigueur.",
      "Associé à une pompe à chaleur air/eau, il permet de renouveler chauffage et eau chaude dans un même projet.",
    ],
    process: [
      { title: "Visite technique", text: "Évaluation des besoins en eau chaude et du local d'installation." },
      { title: "Choix du modèle et devis", text: "Capacité, type d'air et emplacement définis, aides estimées." },
      { title: "Demandes d'aides", text: "Démarches engagées avant la signature et avant les travaux." },
      { title: "Installation", text: "Dépose de l'ancien chauffe-eau, pose, raccordements, mise en service et réglages." },
    ],
    faq: [
      { q: "Un ballon thermodynamique est-il bruyant ?", a: "Son ventilateur et son compresseur produisent un léger bruit de fonctionnement, comparable à celui d'un appareil électroménager. C'est une raison de l'installer hors des pièces de vie." },
      { q: "Refroidit-il la pièce où il est installé ?", a: "Oui, légèrement, puisqu'il en capte les calories. C'est pourquoi un local non chauffé est préférable, ou un modèle gainé vers l'extérieur." },
      { q: "Quelle capacité choisir ?", a: "Elle dépend du nombre de personnes et des usages (bains, douches). Nous la déterminons avec vous lors de la visite." },
      { q: "Peut-on l'associer à une pompe à chaleur ?", a: "Oui. C'est même une combinaison fréquente : la pompe à chaleur air/eau chauffe la maison, le ballon thermodynamique produit l'eau chaude." },
    ],
    related: ["pompe-a-chaleur-air-eau", "panneaux-photovoltaiques", "systeme-solaire-combine"],
  },

  "panneaux-photovoltaiques": {
    subject: "les panneaux photovoltaïques",
    seoTitle: "Panneaux photovoltaïques : produire sa propre électricité",
    metaDescription:
      "Installation de panneaux photovoltaïques avec Maîtrise RGE : autoconsommation, vente du surplus, étude de toiture et démarches de raccordement. Réduisez l'électricité achetée au réseau.",
    keywords: ["panneaux photovoltaïques", "installation panneaux solaires", "autoconsommation solaire", "vente surplus électricité", "photovoltaïque maison"],
    heroTitle: "Panneaux photovoltaïques : produisez votre propre électricité.",
    heroLead:
      "Vos panneaux transforment la lumière en électricité, consommée directement dans la maison. Le surplus peut être revendu : vous achetez moins d'électricité au réseau.",
    aids: [
      { name: "Prime à l'autoconsommation", note: "selon conditions" },
      { name: "Vente du surplus", note: "selon contrat de rachat" },
    ],
    benefits: [
      { title: "Moins d'électricité achetée", text: "Chaque kilowattheure produit et consommé sur place est un kilowattheure que vous n'achetez pas." },
      { title: "Un surplus valorisé", text: "L'électricité non consommée peut être injectée sur le réseau et rémunérée dans le cadre d'un contrat de rachat." },
      { title: "Des démarches encadrées", text: "Autorisation d'urbanisme, raccordement, conformité : les étapes administratives sont identifiées dès le départ." },
    ],
    how: {
      title: "Le photovoltaïque, comment ça marche ?",
      intro: "Une installation se compose de panneaux, d'un système de conversion et d'un raccordement.",
      steps: [
        { title: "Production", text: "Les cellules des panneaux produisent un courant continu lorsqu'elles reçoivent la lumière." },
        { title: "Conversion", text: "Un onduleur, central ou micro-onduleurs, transforme ce courant en courant alternatif utilisable." },
        { title: "Consommation et surplus", text: "La maison consomme en priorité sa production ; le surplus part vers le réseau." },
      ],
    },
    variants: {
      title: "Quelle configuration pour votre projet ?",
      intro: "Elle dépend de vos consommations et de vos objectifs.",
      items: [
        { name: "Autoconsommation avec vente du surplus", text: "Vous consommez votre production et vendez ce qui n'est pas utilisé.", bestFor: "La plupart des maisons individuelles" },
        { name: "Autoconsommation totale", text: "Toute la production est consommée sur place, sans contrat de vente.", bestFor: "Petites installations dimensionnées au plus juste" },
        { name: "Avec pilotage des usages", text: "Ballon d'eau chaude, pompe à chaleur ou recharge programmés aux heures de production.", bestFor: "Maximiser la part d'électricité autoconsommée" },
      ],
    },
    fit: {
      title: "Les critères d'une bonne installation",
      items: [
        "Une toiture orientée entre le sud-est et le sud-ouest, avec peu d'ombre portée.",
        "Une charpente et une couverture en bon état pour accueillir les panneaux.",
        "Une part de votre consommation en journée, quand les panneaux produisent.",
        "Le respect des règles d'urbanisme locales.",
      ],
    },
    aidsText: [
      "Le photovoltaïque n'entre pas dans MaPrimeRénov'. Selon la puissance et les conditions en vigueur, une prime à l'autoconsommation et un tarif de rachat du surplus peuvent s'appliquer.",
      "Ces dispositifs évoluent : ils sont vérifiés lors de l'étude de votre projet.",
    ],
    process: [
      { title: "Étude de faisabilité", text: "Orientation, ombrages, état de la toiture et analyse de vos consommations." },
      { title: "Dimensionnement et devis", text: "Puissance, matériel et estimation de production détaillés." },
      { title: "Démarches administratives", text: "Déclaration en mairie et demande de raccordement." },
      { title: "Pose et mise en service", text: "Installation des panneaux, raccordement, contrôle de conformité et mise en service." },
    ],
    faq: [
      { q: "Faut-il une autorisation pour installer des panneaux ?", a: "Oui, une déclaration préalable de travaux en mairie est généralement nécessaire, car l'aspect de la toiture change." },
      { q: "Que devient l'électricité non consommée ?", a: "Elle est injectée sur le réseau. Avec un contrat de vente du surplus, elle est rémunérée selon les conditions du contrat." },
      { q: "Les panneaux produisent-ils par temps nuageux ?", a: "Oui, mais moins qu'en plein soleil. La production varie selon la saison, la météo et l'orientation." },
      { q: "Quelle puissance installer ?", a: "Elle se calcule à partir de vos consommations, de la surface de toiture disponible et de votre objectif d'autoconsommation." },
    ],
    related: ["equipements-thermodynamiques", "systeme-solaire-combine", "pompe-a-chaleur-air-eau"],
  },
};
