import "server-only";
import { isReviewMode } from "@/lib/env";
import { simulatorRules } from "./rules";
import type { SimulatorMode } from "./types";

/**
 * Détermine ce que le simulateur peut afficher :
 * - barèmes validés → estimation chiffrée ;
 * - barèmes d'exemple en mode revue → chiffres marqués « exemple » ;
 * - barèmes d'exemple en production → aucun montant, demande d'étude.
 *
 * Les barèmes d'exemple ne sont jamais envoyés au navigateur en production.
 */
export function getSimulatorMode(): SimulatorMode {
  if (simulatorRules.status === "valide") return { kind: "live", rules: simulatorRules };
  if (isReviewMode()) return { kind: "demo", rules: simulatorRules };
  return { kind: "unavailable" };
}
