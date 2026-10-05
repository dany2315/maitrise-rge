"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ConsentCheckbox, Honeypot, SelectField, TextField } from "@/components/forms/fields";
import { useLeadSubmit } from "@/components/forms/use-lead-submit";
import { Button } from "@/components/ui/button";
import { fieldErrors, quoteLeadSchema } from "@/lib/leads/schema";
import { housingOptions, quoteWorkOptions } from "@/lib/simulator/options";
import type { SimulatorAnswers } from "@/lib/simulator/types";

/** Demande de devis proposée après la simulation, avec reprise des réponses. */
export function QuoteForm({ answers, onSuccess }: { answers: SimulatorAnswers; onSuccess: () => void }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    postalCode: "",
    housing: answers.housing as string,
    work: answers.work as string,
  });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);
  const { state, serverErrors, submit, markStarted } = useLeadSubmit();

  const payload = (patch: Partial<typeof values> & { consent?: boolean } = {}) => ({
    source: "simulateur" as const,
    ...values,
    consent,
    ...patch,
    website,
    simulation: answers,
    startedAt: 1,
  });

  const validate = (data = payload()) => {
    const result = quoteLeadSchema.safeParse(data);
    const next = result.success ? {} : fieldErrors(result.error);
    setErrors(next);
    return next;
  };

  const update = (key: keyof typeof values) => (value: string) => {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
    if (attempted) validate(payload({ [key]: value }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const found = validate();
    if (Object.keys(found).length > 0) {
      document.getElementById(`q-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const ok = await submit({ source: "simulateur", ...values, consent, website, simulation: answers });
    if (ok) onSuccess();
  }

  const err = (key: string) => errors[key] ?? serverErrors[key];

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="relative grid gap-5 sm:grid-cols-2">
      <TextField id="q-firstName" name="firstName" label="Prénom" autoComplete="given-name" value={values.firstName} onChange={(e) => update("firstName")(e.target.value)} error={err("firstName")} />
      <TextField id="q-lastName" name="lastName" label="Nom" autoComplete="family-name" value={values.lastName} onChange={(e) => update("lastName")(e.target.value)} error={err("lastName")} />
      <TextField id="q-phone" name="phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={values.phone} onChange={(e) => update("phone")(e.target.value)} error={err("phone")} />
      <TextField id="q-postalCode" name="postalCode" label="Code postal" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="75001" value={values.postalCode} onChange={(e) => update("postalCode")(e.target.value)} error={err("postalCode")} />
      <TextField id="q-email" name="email" label="Email" type="email" inputMode="email" autoComplete="email" placeholder="nom@domaine.fr" className="sm:col-span-2" value={values.email} onChange={(e) => update("email")(e.target.value)} error={err("email")} />
      <SelectField id="q-housing" name="housing" label="Logement" options={housingOptions} value={values.housing} onChange={(e) => update("housing")(e.target.value)} error={err("housing")} />
      <SelectField id="q-work" name="work" label="Travaux" options={quoteWorkOptions} value={values.work} onChange={(e) => update("work")(e.target.value)} error={err("work")} />

      <div className="sm:col-span-2">
        <ConsentCheckbox
          id="q-consent"
          checked={consent}
          onChange={(v) => {
            setConsent(v);
            if (attempted) validate(payload({ consent: v }));
          }}
          error={err("consent")}
        >
          J&apos;accepte d&apos;être recontacté(e) par Maîtrise RGE au sujet de ma demande de devis.
          Mes réponses au simulateur sont jointes à la demande.
        </ConsentCheckbox>
      </div>

      <Honeypot value={website} onChange={setWebsite} />

      {state.status === "error" && (
        <div role="alert" className="rounded-2xl bg-danger-soft px-5 py-4 text-[0.95rem] font-medium text-danger sm:col-span-2">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto sm:self-start" disabled={state.status === "sending"} aria-busy={state.status === "sending"}>
          {state.status === "sending" ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Envoi en cours…
            </>
          ) : (
            "Demander mon devis"
          )}
        </Button>
        <p className="text-sm leading-relaxed text-muted">
          Vos données sont utilisées par Maîtrise RGE pour traiter votre demande. Pour en savoir plus
          et exercer vos droits, consultez la{" "}
          <Link href="/confidentialite" className="font-semibold text-brand-800 underline underline-offset-2">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
