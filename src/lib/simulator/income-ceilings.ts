import type { IncomeCategory, Region } from "./options";

/**
 * Plafonds de revenu fiscal de référence (RFR) servant à classer un foyer
 * dans les catégories de revenus MaPrimeRénov'.
 *
 * ⚠️ Grille à vérifier avant chaque mise en production : les plafonds sont
 * révisés par l'Anah. Mettre à jour `millesime`, les montants et passer
 * `verified` à `true` après contrôle sur la source officielle.
 *
 * Les foyers au-delà du plafond « intermédiaires » relèvent de la catégorie
 * « supérieurs ».
 */
export const incomeCeilings = {
  millesime: "2025",
  verified: false,
  source: "https://www.anah.gouv.fr/",
  /** Index 0 = 1 personne … index 4 = 5 personnes. */
  grid: {
    idf: {
      tres_modestes: [23_768, 34_884, 41_893, 48_914, 55_961],
      modestes: [28_933, 42_463, 51_000, 59_549, 68_123],
      intermediaires: [40_404, 59_394, 71_060, 83_637, 95_758],
    },
    hors_idf: {
      tres_modestes: [17_173, 25_115, 30_206, 35_285, 40_388],
      modestes: [22_015, 32_197, 38_719, 45_234, 51_775],
      intermediaires: [30_844, 45_340, 54_592, 63_844, 73_098],
    },
  },
  perAdditionalPerson: {
    idf: { tres_modestes: 7_038, modestes: 8_568, intermediaires: 12_122 },
    hors_idf: { tres_modestes: 5_094, modestes: 6_525, intermediaires: 9_254 },
  },
} as const;

type CappedCategory = Exclude<IncomeCategory, "superieurs">;

export function ceilingFor(region: Region, people: number, category: CappedCategory): number {
  const base = incomeCeilings.grid[region][category];
  if (people <= base.length) return base[Math.max(1, people) - 1];
  const extra = incomeCeilings.perAdditionalPerson[region][category];
  return base[base.length - 1] + extra * (people - base.length);
}

/** Bornes affichées pour chaque catégorie, pour une région et une taille de foyer. */
export function incomeBands(region: Region, people: number) {
  const tm = ceilingFor(region, people, "tres_modestes");
  const m = ceilingFor(region, people, "modestes");
  const i = ceilingFor(region, people, "intermediaires");
  return {
    tres_modestes: { max: tm },
    modestes: { min: tm + 1, max: m },
    intermediaires: { min: m + 1, max: i },
    superieurs: { min: i + 1 },
  } satisfies Record<IncomeCategory, { min?: number; max?: number }>;
}
