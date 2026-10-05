import type { Heating, Housing, IncomeCategory, Region, SimulatorWork } from "./options";

export type SimulatorAnswers = {
  heating: Heating;
  housing: Housing;
  work: SimulatorWork;
  region: Region;
  householdSize: number;
  income: IncomeCategory;
};

type ByIncome = Record<IncomeCategory, number>;

export type WorkRule = {
  /** Coût estimatif TTC des travaux, en euros. */
  cost: number;
  /** Forfait MaPrimeRénov' par catégorie de revenus (0 = non éligible). */
  maPrimeRenov: ByIncome;
  /** Prime CEE par catégorie de revenus. */
  cee: ByIncome;
  /** Types de logement pour lesquels le geste est proposé en ligne. */
  housing: Housing[];
  /** Bonus CEE (multiplicateur) selon l'énergie remplacée, ex. sortie du fioul. */
  ceeHeatingFactor?: Partial<Record<Heating, number>>;
};

export type CommercialDiscount = {
  enabled: boolean;
  label: string;
  /** "forfait" : montant fixe ; "pourcentage" : part du reste à charge. */
  type: "forfait" | "pourcentage";
  value: number;
  /** Travaux concernés ; vide = tous. */
  works: SimulatorWork[];
  /** Conditions affichées à côté de la remise. */
  conditions: string;
};

export type SimulatorRules = {
  /**
   * "exemple" : données fictives pour tester le parcours, jamais présentées
   * comme une estimation réelle en production.
   * "valide" : barèmes vérifiés et validés par Maîtrise RGE.
   */
  status: "exemple" | "valide";
  version: string;
  /** Note interne sur l'origine des données. */
  note: string;
  works: Record<SimulatorWork, WorkRule>;
  /**
   * Plafond du cumul des aides publiques (MaPrimeRénov' + CEE) en part du coût
   * des travaux, selon les revenus. MaPrimeRénov' est réduite en premier.
   */
  publicAidCap: ByIncome;
  discount: CommercialDiscount;
};

export type SimulationResult = {
  eligible: boolean;
  /** Raison d'une non-éligibilité au calcul en ligne. */
  reason?: string;
  cost: number;
  maPrimeRenov: number;
  cee: number;
  publicAidTotal: number;
  /** true si le plafond de cumul a réduit les aides. */
  capped: boolean;
  discount: number;
  discountLabel: string | null;
  totalSupport: number;
  financedPercent: number;
  remaining: number;
  rulesStatus: SimulatorRules["status"];
  rulesVersion: string;
};

/** Ce que le simulateur reçoit du serveur selon le mode d'affichage. */
export type SimulatorMode =
  | { kind: "live"; rules: SimulatorRules }
  | { kind: "demo"; rules: SimulatorRules }
  | { kind: "unavailable" };
