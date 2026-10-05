import type { SimulatorRules } from "./types";

/**
 * Barèmes du simulateur.
 *
 * ⚠️ DONNÉES D'EXEMPLE — FICTIVES.
 * Ces montants servent uniquement à tester le parcours et l'affichage. Ils ne
 * proviennent d'aucun barème officiel et ne reprennent pas ceux d'un autre
 * site. Tant que `status` vaut "exemple", aucun montant n'est affiché en
 * production (voir getSimulatorMode).
 *
 * Pour passer en production :
 *  1. remplacer chaque montant par les tarifs Maîtrise RGE et les barèmes
 *     MaPrimeRénov' / CEE en vigueur (sources : Anah, partenaire CEE) ;
 *  2. confirmer les règles de cumul (`publicAidCap`) et la remise commerciale ;
 *  3. passer `status` à "valide" et renseigner `version`.
 */
export const simulatorRules: SimulatorRules = {
  status: "exemple",
  version: "exemple-1",
  note: "Valeurs fictives arrondies, à remplacer par des données validées.",
  works: {
    pac_air_eau: {
      cost: 15_000,
      maPrimeRenov: { tres_modestes: 5_000, modestes: 4_000, intermediaires: 2_500, superieurs: 0 },
      cee: { tres_modestes: 4_000, modestes: 3_500, intermediaires: 2_500, superieurs: 2_000 },
      housing: ["maison"],
      ceeHeatingFactor: { fioul: 1.2, gaz: 1.1 },
    },
    pac_ballon: {
      cost: 18_500,
      maPrimeRenov: { tres_modestes: 6_000, modestes: 4_800, intermediaires: 3_000, superieurs: 0 },
      cee: { tres_modestes: 4_500, modestes: 4_000, intermediaires: 3_000, superieurs: 2_200 },
      housing: ["maison"],
      ceeHeatingFactor: { fioul: 1.2, gaz: 1.1 },
    },
    ballon_thermo: {
      cost: 3_500,
      maPrimeRenov: { tres_modestes: 1_000, modestes: 700, intermediaires: 400, superieurs: 0 },
      cee: { tres_modestes: 300, modestes: 250, intermediaires: 150, superieurs: 100 },
      housing: ["maison", "appartement"],
    },
    isolation_combles: {
      cost: 4_000,
      maPrimeRenov: { tres_modestes: 1_500, modestes: 1_200, intermediaires: 800, superieurs: 0 },
      cee: { tres_modestes: 1_200, modestes: 1_000, intermediaires: 600, superieurs: 400 },
      housing: ["maison", "appartement"],
    },
    isolation_exterieure: {
      cost: 20_000,
      maPrimeRenov: { tres_modestes: 7_000, modestes: 5_500, intermediaires: 3_500, superieurs: 0 },
      cee: { tres_modestes: 3_000, modestes: 2_500, intermediaires: 1_500, superieurs: 1_000 },
      housing: ["maison"],
    },
    ssc: {
      cost: 19_000,
      maPrimeRenov: { tres_modestes: 9_000, modestes: 7_000, intermediaires: 3_500, superieurs: 0 },
      cee: { tres_modestes: 2_500, modestes: 2_000, intermediaires: 1_500, superieurs: 1_000 },
      housing: ["maison"],
    },
  },
  publicAidCap: { tres_modestes: 0.9, modestes: 0.75, intermediaires: 0.6, superieurs: 0.4 },
  discount: {
    enabled: true,
    label: "Remise Maîtrise RGE (exemple)",
    type: "forfait",
    value: 500,
    works: [],
    conditions: "Exemple de remise commerciale, modalités à définir par Maîtrise RGE.",
  },
};
