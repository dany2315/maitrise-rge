"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contactLeadSchema, fieldErrors } from "@/lib/leads/schema";
import { housingOptions, quoteWorkOptions } from "@/lib/simulator/options";
import { ConsentCheckbox, Honeypot, SelectField, TextArea, TextField } from "./fields";
import { useLeadSubmit } from "./use-lead-submit";

const initial = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  postalCode: "",
  housing: "",
  work: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);
  const { state, setState, serverErrors, submit, markStarted } = useLeadSubmit();

  const payload = () => ({ source: "contact" as const, ...values, consent, website, startedAt: 1 });

  const validate = (data = payload()) => {
    const result = contactLeadSchema.safeParse(data);
    const next = result.success ? {} : fieldErrors(result.error);
    setErrors(next);
    return next;
  };

  const update = (key: keyof typeof initial) => (value: string) => {
    markStarted();
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) validate({ ...payload(), ...next });
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const found = validate();
    if (Object.keys(found).length > 0) {
      setState({ status: "idle" });
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    const ok = await submit({ source: "contact", ...values, consent, website });
    if (ok) {
      setValues(initial);
      setConsent(false);
      setAttempted(false);
    }
  }

  const err = (key: string) => errors[key] ?? serverErrors[key];

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start rounded-[1.75rem] bg-brand-50 p-8 ring-1 ring-brand-200 sm:p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-700 text-white">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none">
            <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl font-semibold">Votre message a bien été enregistré.</h3>
        <p className="mt-3 text-ink-soft">
          Merci. Notre équipe a reçu votre demande et reviendra vers vous pour en parler.
        </p>
        <Button variant="secondary" className="mt-7" onClick={() => setState({ status: "idle" })}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="relative grid gap-5 sm:grid-cols-2" aria-describedby="contact-required">
      <p id="contact-required" className="text-sm text-muted sm:col-span-2">
        Tous les champs sont obligatoires, sauf mention contraire.
      </p>
      <TextField id="firstName" label="Prénom" autoComplete="given-name" value={values.firstName} onChange={(e) => update("firstName")(e.target.value)} error={err("firstName")} />
      <TextField id="lastName" label="Nom" autoComplete="family-name" value={values.lastName} onChange={(e) => update("lastName")(e.target.value)} error={err("lastName")} />
      <TextField id="phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={values.phone} onChange={(e) => update("phone")(e.target.value)} error={err("phone")} />
      <TextField id="email" label="Email" type="email" inputMode="email" autoComplete="email" placeholder="nom@domaine.fr" value={values.email} onChange={(e) => update("email")(e.target.value)} error={err("email")} />
      <TextField id="postalCode" label="Code postal" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="75001" value={values.postalCode} onChange={(e) => update("postalCode")(e.target.value)} error={err("postalCode")} />
      <SelectField id="housing" label="Logement" options={housingOptions} value={values.housing} onChange={(e) => update("housing")(e.target.value)} error={err("housing")} />
      <SelectField id="work" label="Travaux envisagés" className="sm:col-span-2" options={quoteWorkOptions} value={values.work} onChange={(e) => update("work")(e.target.value)} error={err("work")} />
      <TextArea id="message" label="Votre message" className="sm:col-span-2" placeholder="Décrivez votre projet : surface, chauffage actuel, délais souhaités…" value={values.message} onChange={(e) => update("message")(e.target.value)} error={err("message")} />

      <div className="sm:col-span-2">
        <ConsentCheckbox id="consent" checked={consent} onChange={(v) => { setConsent(v); if (attempted) validate({ ...payload(), consent: v }); }} error={err("consent")}>
          J&apos;accepte que Maîtrise RGE utilise ces informations pour me recontacter au sujet de ma
          demande.
        </ConsentCheckbox>
      </div>

      <Honeypot value={website} onChange={setWebsite} />

      {state.status === "error" && (
        <div role="alert" className="rounded-2xl bg-danger-soft px-5 py-4 text-[0.95rem] font-medium text-danger sm:col-span-2">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Vos données servent uniquement à traiter votre demande. Voir notre{" "}
          <Link href="/confidentialite" className="font-semibold text-brand-800 underline underline-offset-2">
            politique de confidentialité
          </Link>
          .
        </p>
        <Button type="submit" size="lg" disabled={state.status === "sending"} aria-busy={state.status === "sending"}>
          {state.status === "sending" ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Envoi en cours…
            </>
          ) : (
            "Envoyer mon message"
          )}
        </Button>
      </div>
    </form>
  );
}
