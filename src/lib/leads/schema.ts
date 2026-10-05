import { z } from "zod";
import {
  heatingOptions,
  housingOptions,
  incomeCategoryOptions,
  quoteWorkOptions,
  regionOptions,
  simulatorWorkOptions,
  values,
} from "@/lib/simulator/options";

const trimmed = (label: string, max: number) =>
  z
    .string({ error: `${label} est obligatoire.` })
    .trim()
    .min(1, `${label} est obligatoire.`)
    .max(max, `${label} ne doit pas dépasser ${max} caractères.`);

const phone = z
  .string({ error: "Le téléphone est obligatoire." })
  .trim()
  .min(1, "Le téléphone est obligatoire.")
  .refine(
    (v) => /^(?:(?:\+|00)33\s?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}$/.test(v),
    "Indiquez un numéro français valide, par exemple 06 12 34 56 78.",
  );

const contactFields = {
  firstName: trimmed("Le prénom", 60),
  lastName: trimmed("Le nom", 60),
  phone,
  email: z
    .string({ error: "L'adresse email est obligatoire." })
    .trim()
    .min(1, "L'adresse email est obligatoire.")
    .pipe(z.email("Indiquez une adresse email valide, par exemple nom@domaine.fr.")),
  postalCode: z
    .string({ error: "Le code postal est obligatoire." })
    .trim()
    .regex(/^\d{5}$/, "Le code postal doit comporter 5 chiffres."),
  consent: z.literal(true, {
    error: "Votre accord est nécessaire pour que nous puissions vous recontacter.",
  }),
};

/** Champs anti-spam communs, vérifiés côté serveur. */
const antiSpam = {
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
};

export const simulationAnswersSchema = z.object({
  heating: z.enum(values(heatingOptions)),
  housing: z.enum(values(housingOptions)),
  work: z.enum(values(simulatorWorkOptions)),
  region: z.enum(values(regionOptions)),
  householdSize: z.number().int().min(1).max(12),
  income: z.enum(values(incomeCategoryOptions)),
});

export const quoteLeadSchema = z.object({
  source: z.literal("simulateur"),
  ...contactFields,
  housing: z.enum(values(housingOptions), { error: "Sélectionnez votre type de logement." }),
  work: z.enum(values(quoteWorkOptions), { error: "Sélectionnez les travaux envisagés." }),
  message: z.string().trim().max(2000).optional(),
  simulation: simulationAnswersSchema.optional(),
  ...antiSpam,
});

export const contactLeadSchema = z.object({
  source: z.literal("contact"),
  ...contactFields,
  housing: z.enum(values(housingOptions), { error: "Sélectionnez votre type de logement." }),
  work: z.enum(values(quoteWorkOptions), { error: "Sélectionnez les travaux envisagés." }),
  message: z
    .string({ error: "Le message est obligatoire." })
    .trim()
    .min(10, "Votre message doit comporter au moins 10 caractères.")
    .max(2000, "Votre message ne doit pas dépasser 2000 caractères."),
  ...antiSpam,
});

export const leadSchema = z.discriminatedUnion("source", [quoteLeadSchema, contactLeadSchema]);

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type SimulationAnswersInput = z.output<typeof simulationAnswersSchema>;

/** Transforme les erreurs zod en dictionnaire champ → message. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
