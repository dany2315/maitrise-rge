import "server-only";
import { calculateSimulation } from "@/lib/simulator/calculate";
import { getSimulatorMode } from "@/lib/simulator/mode";
import {
  heatingOptions,
  housingOptions,
  incomeCategoryOptions,
  labelOf,
  quoteWorkOptions,
  simulatorWorkOptions,
  surfaceSettings,
} from "@/lib/simulator/options";
import type { Lead } from "./schema";

/**
 * Colonnes du Google Sheet, dans l'ordre. Créer cette ligne d'en-tête dans
 * l'onglet cible avant la mise en service.
 */
export const SHEET_HEADERS = [
  "Date",
  "Provenance",
  "Prénom",
  "Nom",
  "Téléphone",
  "Email",
  "Code postal",
  "Logement",
  "Travaux",
  "Message",
  "Accord recontact",
  "Simulation : chauffage actuel",
  "Simulation : travaux",
  "Simulation : surface (m²)",
  "Simulation : revenus",
  "Statut barème",
  "Coût travaux (€)",
  "MaPrimeRénov' (€)",
  "CEE (€)",
  "Plafonnement des aides (€)",
  "Remise Maîtrise RGE (€)",
  "Total aides et remise (€)",
  "Part financée (%)",
  "Reste à charge (€)",
] as const;

const RESULT_COLUMNS = 9;

const parisDate = (date: Date) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);

export function buildRow(lead: Lead, receivedAt = new Date()): (string | number)[] {
  const common = [
    parisDate(receivedAt),
    lead.source,
    lead.firstName,
    lead.lastName,
    lead.phone,
    lead.email,
    lead.postalCode,
    labelOf(housingOptions, lead.housing),
    labelOf(quoteWorkOptions, lead.work),
    lead.message ?? "",
    lead.consent ? "Oui" : "Non",
  ];

  const simulation = lead.source === "simulateur" ? lead.simulation : undefined;
  if (!simulation) return [...common, ...Array(SHEET_HEADERS.length - common.length).fill("")];

  const usesSurface = Boolean(surfaceSettings[simulation.work]);
  const answers = [
    labelOf(heatingOptions, simulation.heating),
    labelOf(simulatorWorkOptions, simulation.work),
    usesSurface ? (simulation.surface ?? "") : "",
    labelOf(incomeCategoryOptions, simulation.income),
  ];
  const empty = Array(RESULT_COLUMNS - 1).fill("");

  // Le résultat est recalculé côté serveur : aucun montant transmis par le
  // navigateur n'est enregistré.
  const mode = getSimulatorMode();
  if (mode.kind === "unavailable") {
    return [...common, ...answers, "Barèmes non validés — aucun montant", ...empty];
  }
  const result = calculateSimulation(simulation, mode.rules);
  const status = mode.kind === "demo" ? `EXEMPLE (${result.rulesVersion})` : `Validé (${result.rulesVersion})`;
  if (!result.eligible) return [...common, ...answers, `${status} — étude nécessaire`, ...empty];

  return [
    ...common,
    ...answers,
    status,
    result.cost,
    result.maPrimeRenov,
    result.cee,
    result.capReduction,
    result.discount,
    result.totalSupport,
    result.financedPercent,
    result.remaining,
  ];
}
