import type { Heating, Housing, IncomeCategory, SimulatorWork } from "./options";

export type SimulatorAnswers = {
  heating: Heating;
  housing: Housing;
  work: SimulatorWork;
  /** Surface à isoler en m², pour les travaux chiffrés au m². */
  surface?: number;
  income: IncomeCategory;
};

type ByIncome = Record<IncomeCategory, number>;

export type WorkRule =
  | {
      pricing: "forfait";
      /** Coût estimatif TTC des travaux, en euros. */
      cost: number;
      /** Forfait MaPrimeRénov' par catégorie de revenus (0 = non éligible). */
      maPrimeRenov: ByIncome;
      /** Prime CEE par catégorie de revenus. */
      cee: ByIncome;
      /** Multiplicateur CEE selon l'énergie remplacée (ex. bonification sortie du fioul). */
      ceeHeatingFactor?: Partial<Record<Heating, number>>;
      housing: Housing[];
    }
  | {
      pricing: "m2";
      /** Coût estimatif TTC par m². */
      costPerM2: number;
      maPrimeRenovPerM2: ByIncome;
      ceePerM2: ByIncome;
      housing: Housing[];
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
  /** Montant retiré par le plafonnement du cumul des aides publiques. */
  capReduction: number;
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
