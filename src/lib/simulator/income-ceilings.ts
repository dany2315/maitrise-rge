import type { IncomeCategory, Region } from "./options";

/**
 * Plafonds de revenu fiscal de référence (RFR) qui déterminent la catégorie
 * de revenus MaPrimeRénov' du foyer.
 *
 * Source : barème publié sur https://france-renov.gouv.fr/bareme, relevé le
 * 6 octobre 2026. Les plafonds sont révisés par l'Anah : à contrôler avant
 * chaque mise à jour du site (mettre à jour `checkedAt`).
 *
 * Les foyers au-delà du plafond « intermédiaires » relèvent de la catégorie
 * « supérieurs ».
 */
export const incomeCeilings = {
  source: "https://france-renov.gouv.fr/bareme",
  checkedAt: "2026-10-06",
  verified: true,
  /** Index 0 = 1 personne … index 4 = 5 personnes. */
  grid: {
    hors_idf: {
      tres_modestes: [17_363, 25_393, 30_540, 35_676, 40_835],
      modestes: [22_259, 32_553, 39_148, 45_735, 52_348],
      intermediaires: [31_185, 45_842, 55_196, 64_550, 73_907],
    },
    idf: {
      tres_modestes: [24_031, 35_270, 42_357, 49_455, 56_580],
      modestes: [29_253, 42_933, 51_564, 60_208, 68_877],
      intermediaires: [40_851, 60_051, 71_846, 84_562, 96_817],
    },
  },
  perAdditionalPerson: {
    hors_idf: { tres_modestes: 5_151, modestes: 6_598, intermediaires: 9_357 },
    idf: { tres_modestes: 7_116, modestes: 8_663, intermediaires: 12_257 },
  },
} as const;

export type CappedCategory = Exclude<IncomeCategory, "superieurs">;

/** Plafond d'une catégorie pour une personne seule, hors Île-de-France. */
export const singlePersonCeiling = (category: CappedCategory, region: Region = "hors_idf") =>
  incomeCeilings.grid[region][category][0];
