/**
 * Libellés et valeurs des réponses du simulateur. Partagé par l'interface,
 * la validation serveur et l'export Google Sheets.
 */

export const heatingOptions = [
  { value: "electricite", label: "Électricité", hint: "Radiateurs, plancher chauffant électrique…" },
  { value: "gaz", label: "Gaz", hint: "Chaudière gaz de ville ou propane" },
  { value: "fioul", label: "Fioul", hint: "Chaudière fioul" },
  { value: "autre", label: "Autre", hint: "Bois, granulés, réseau de chaleur…" },
] as const;

export const housingOptions = [
  { value: "maison", label: "Maison individuelle", hint: "Vous occupez une maison" },
  { value: "appartement", label: "Appartement", hint: "Logement en immeuble collectif" },
] as const;

export const simulatorWorkOptions = [
  {
    value: "pac_air_eau",
    label: "Pompe à chaleur air/eau",
    hint: "Remplace la chaudière, alimente radiateurs ou plancher",
  },
  {
    value: "pac_ballon",
    label: "PAC air/eau + ballon thermodynamique",
    hint: "Chauffage et eau chaude renouvelés ensemble",
  },
  {
    value: "ballon_thermo",
    label: "Ballon thermodynamique",
    hint: "Eau chaude sanitaire économe",
  },
  {
    value: "isolation_combles",
    label: "Isolation des combles",
    hint: "Combles perdus ou aménagés",
  },
  {
    value: "isolation_exterieure",
    label: "Isolation thermique extérieure",
    hint: "Isolation des murs par l'extérieur (ITE)",
  },
  {
    value: "ssc",
    label: "Système solaire combiné",
    hint: "Chauffage et eau chaude par capteurs solaires",
  },
] as const;

/** Choix du formulaire de devis : travaux du simulateur + choix complémentaires. */
export const quoteWorkOptions = [
  ...simulatorWorkOptions.map(({ value, label }) => ({ value, label })),
  { value: "photovoltaique", label: "Panneaux photovoltaïques" },
  { value: "plusieurs", label: "Plusieurs travaux" },
  { value: "ne_sais_pas", label: "Je ne sais pas encore" },
] as const;

export const incomeCategoryOptions = [
  { value: "tres_modestes", label: "Très modestes" },
  { value: "modestes", label: "Modestes" },
  { value: "intermediaires", label: "Intermédiaires" },
  { value: "superieurs", label: "Supérieurs" },
] as const;

export const regionOptions = [
  { value: "idf", label: "Île-de-France" },
  { value: "hors_idf", label: "Autre région" },
] as const;

export type Heating = (typeof heatingOptions)[number]["value"];
export type Housing = (typeof housingOptions)[number]["value"];
export type SimulatorWork = (typeof simulatorWorkOptions)[number]["value"];
export type QuoteWork = (typeof quoteWorkOptions)[number]["value"];
export type IncomeCategory = (typeof incomeCategoryOptions)[number]["value"];
export type Region = (typeof regionOptions)[number]["value"];

export const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export const labelOf = (
  options: readonly { value: string; label: string }[],
  value: string | null | undefined,
) => options.find((o) => o.value === value)?.label ?? "";
