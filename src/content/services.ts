import { photos, type Photo } from "./photos";
import type { QuoteWork, SimulatorWork } from "@/lib/simulator/options";

export type Service = {
  id: string;
  number: string;
  title: string;
  /** Libellé court pour les menus. */
  shortTitle: string;
  kicker: string;
  summary: string;
  points: string[];
  goodToKnow: string;
  photo: Photo;
  /** Travaux correspondants dans le simulateur, s'il y en a. */
  simulatorWork?: SimulatorWork;
  /** Valeur pré-sélectionnée dans le formulaire de contact. */
  quoteWork: QuoteWork;
  accent: "brand" | "sky" | "sun";
};

export const services: Service[] = [
  {
    id: "pompe-a-chaleur-air-eau",
    shortTitle: "Pompe à chaleur",
    quoteWork: "pac_air_eau",
    number: "01",
    title: "Pompe à chaleur air/eau",
    kicker: "Chauffage",
    summary:
      "Elle capte les calories de l'air extérieur pour chauffer l'eau de vos radiateurs ou de votre plancher chauffant, et peut aussi produire l'eau chaude. C'est la solution la plus courante pour remplacer une chaudière fioul ou gaz.",
    points: [
      "Dimensionnement selon les déperditions réelles de la maison",
      "Compatibilité vérifiée avec vos radiateurs existants",
      "Emplacement de l'unité extérieure étudié (bruit, voisinage, entretien)",
    ],
    goodToKnow:
      "Une maison mal isolée demande une pompe à chaleur plus puissante : isoler d'abord peut réduire l'investissement.",
    photo: photos.pacModern,
    simulatorWork: "pac_air_eau",
    accent: "brand",
  },
  {
    id: "isolation-des-combles",
    shortTitle: "Isolation combles",
    quoteWork: "isolation_combles",
    number: "02",
    title: "Isolation des combles",
    kicker: "Isolation",
    summary:
      "La toiture est l'une des principales sources de pertes de chaleur. Isoler les combles perdus ou aménagés améliore rapidement le confort, été comme hiver.",
    points: [
      "Combles perdus : isolant soufflé ou déroulé sur le plancher",
      "Combles aménagés : isolation sous rampants",
      "Contrôle de l'épaisseur et de la résistance thermique posée",
    ],
    goodToKnow:
      "C'est souvent le premier geste conseillé : un chantier court pour un gain de confort sensible.",
    photo: photos.attic,
    simulatorWork: "isolation_combles",
    accent: "sun",
  },
  {
    id: "isolation-thermique-exterieure",
    shortTitle: "Isolation extérieure",
    quoteWork: "isolation_exterieure",
    number: "03",
    title: "Isolation thermique par l'extérieur",
    kicker: "Isolation",
    summary:
      "Un isolant fixé sur les façades puis recouvert d'un enduit ou d'un bardage. Les murs sont isolés sans réduire la surface habitable et la façade est rénovée en même temps.",
    points: [
      "Traitement des ponts thermiques (planchers, refends)",
      "Choix de la finition : enduit ou bardage",
      "Vérification des règles d'urbanisme avant travaux",
    ],
    goodToKnow:
      "Une déclaration préalable en mairie est généralement nécessaire, car l'aspect extérieur change.",
    photo: photos.facadeWorks,
    simulatorWork: "isolation_exterieure",
    accent: "sky",
  },
  {
    id: "systeme-solaire-combine",
    shortTitle: "Solaire combiné",
    quoteWork: "ssc",
    number: "04",
    title: "Système solaire combiné",
    kicker: "Solaire thermique",
    summary:
      "Des capteurs solaires thermiques chauffent un ballon de stockage qui alimente à la fois le chauffage et l'eau chaude, avec un appoint pour les jours sans soleil.",
    points: [
      "Étude de l'orientation et de l'inclinaison de la toiture",
      "Ballon de stockage dimensionné pour le foyer",
      "Appoint adapté à votre installation",
    ],
    goodToKnow:
      "Adapté aux maisons disposant d'une toiture bien exposée et de la place pour un ballon de stockage.",
    photo: photos.solarRoofs,
    simulatorWork: "ssc",
    accent: "sun",
  },
  {
    id: "equipements-thermodynamiques",
    shortTitle: "Ballon thermo.",
    quoteWork: "ballon_thermo",
    number: "05",
    title: "Équipements thermodynamiques",
    kicker: "Eau chaude",
    summary:
      "Le ballon thermodynamique fonctionne comme une petite pompe à chaleur dédiée à l'eau chaude sanitaire. Il consomme nettement moins qu'un chauffe-eau électrique classique.",
    points: [
      "Capacité choisie selon le nombre d'occupants",
      "Installation en volume non chauffé ou sur air extérieur",
      "Peut être associé à une pompe à chaleur air/eau",
    ],
    goodToKnow:
      "L'emplacement compte : garage, cellier ou buanderie d'un volume suffisant sont souvent privilégiés.",
    photo: photos.pacWood,
    simulatorWork: "ballon_thermo",
    accent: "sky",
  },
  {
    id: "panneaux-photovoltaiques",
    shortTitle: "Photovoltaïque",
    quoteWork: "photovoltaique",
    number: "06",
    title: "Panneaux photovoltaïques",
    kicker: "Électricité solaire",
    summary:
      "Les panneaux produisent de l'électricité consommée directement dans la maison ; le surplus peut être revendu. Une façon de réduire la part d'électricité achetée au réseau.",
    points: [
      "Puissance adaptée à votre consommation réelle",
      "Étude d'ombrage et de la charpente",
      "Démarches de raccordement à prévoir",
    ],
    goodToKnow:
      "Le photovoltaïque ne relève pas de MaPrimeRénov' ; d'autres dispositifs peuvent s'appliquer selon le projet.",
    photo: photos.solarHouse,
    accent: "brand",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
