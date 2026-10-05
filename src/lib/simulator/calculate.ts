import { surfaceSettings } from "./options";
import type { SimulationResult, SimulatorAnswers, SimulatorRules } from "./types";

const round = (n: number) => Math.round(n);

/**
 * Calcule une estimation indicative à partir des réponses et des barèmes.
 * Fonction pure, sans dépendance à l'interface : testable et réutilisée côté
 * serveur pour recalculer le résultat enregistré dans Google Sheets.
 *
 * Ordre appliqué :
 *  1. coût et aides publiques (MaPrimeRénov' + CEE), au forfait ou au m² ;
 *  2. plafond de cumul des aides publiques (en part du coût), MaPrimeRénov'
 *     réduite en premier ;
 *  3. remise commerciale, distincte des aides, limitée au reste à charge.
 */
export function calculateSimulation(
  answers: SimulatorAnswers,
  rules: SimulatorRules,
): SimulationResult {
  const rule = rules.works[answers.work];
  const base = { rulesStatus: rules.status, rulesVersion: rules.version };

  if (!rule.housing.includes(answers.housing)) {
    return {
      ...base,
      eligible: false,
      reason:
        "Ces travaux en appartement dépendent de la copropriété et de la configuration du logement : une étude personnalisée est nécessaire.",
      cost: 0,
      maPrimeRenov: 0,
      cee: 0,
      publicAidTotal: 0,
      capReduction: 0,
      discount: 0,
      discountLabel: null,
      totalSupport: 0,
      financedPercent: 0,
      remaining: 0,
    };
  }

  let cost: number;
  let maPrimeRenov: number;
  let cee: number;
  if (rule.pricing === "m2") {
    const settings = surfaceSettings[answers.work];
    const surface = Math.min(
      settings?.max ?? Infinity,
      Math.max(settings?.min ?? 1, answers.surface ?? settings?.default ?? 1),
    );
    cost = rule.costPerM2 * surface;
    maPrimeRenov = rule.maPrimeRenovPerM2[answers.income] * surface;
    cee = rule.ceePerM2[answers.income] * surface;
  } else {
    cost = rule.cost;
    maPrimeRenov = rule.maPrimeRenov[answers.income];
    cee = rule.cee[answers.income] * (rule.ceeHeatingFactor?.[answers.heating] ?? 1);
  }

  const beforeCap = maPrimeRenov + cee;
  const cap = cost * rules.publicAidCap[answers.income];
  if (beforeCap > cap) {
    maPrimeRenov = Math.max(0, cap - cee);
    cee = Math.min(cee, cap);
  }

  maPrimeRenov = round(maPrimeRenov);
  cee = round(cee);
  const publicAidTotal = maPrimeRenov + cee;
  const capReduction = Math.max(0, round(beforeCap) - publicAidTotal);
  const beforeDiscount = Math.max(0, cost - publicAidTotal);

  const { discount: d } = rules;
  const discountApplies = d.enabled && (d.works.length === 0 || d.works.includes(answers.work));
  let discount = 0;
  if (discountApplies) {
    discount = d.type === "forfait" ? d.value : (beforeDiscount * d.value) / 100;
    discount = round(Math.min(discount, beforeDiscount));
  }

  const totalSupport = publicAidTotal + discount;
  const remaining = Math.max(0, round(cost) - totalSupport);

  return {
    ...base,
    eligible: true,
    cost: round(cost),
    maPrimeRenov,
    cee,
    publicAidTotal,
    capReduction,
    discount,
    discountLabel: discount > 0 ? d.label : null,
    totalSupport,
    financedPercent: cost > 0 ? Math.round((totalSupport / cost) * 100) : 0,
    remaining,
  };
}
