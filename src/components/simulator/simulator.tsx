"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon, Button } from "@/components/ui/button";
import { ReviewBadge } from "@/components/ui/layout";
import { cn, formatEuros } from "@/lib/cn";
import { calculateSimulation } from "@/lib/simulator/calculate";
import { incomeBands, incomeCeilings } from "@/lib/simulator/income-ceilings";
import {
  heatingOptions,
  housingOptions,
  incomeCategoryOptions,
  labelOf,
  regionOptions,
  simulatorWorkOptions,
  type Heating,
  type Housing,
  type IncomeCategory,
  type Region,
  type SimulatorWork,
} from "@/lib/simulator/options";
import type { SimulatorAnswers, SimulatorMode } from "@/lib/simulator/types";
import { ChoiceGroup } from "./choice-group";
import { heatingIcons, housingIcons, workIcons } from "./icons";
import { QuoteForm } from "./quote-form";
import { Result, SimulationDisclaimer } from "./result";

const STEPS = [
  { key: "heating", label: "Chauffage", title: "Comment votre logement est-il chauffé aujourd'hui ?" },
  { key: "housing", label: "Logement", title: "Dans quel type de logement vivez-vous ?" },
  { key: "work", label: "Travaux", title: "Quels travaux envisagez-vous ?" },
  { key: "income", label: "Revenus", title: "Quelle est la situation de votre foyer ?" },
  { key: "result", label: "Résultat", title: "Votre estimation" },
] as const;

type Draft = {
  heating?: Heating;
  housing?: Housing;
  work?: SimulatorWork;
  region?: Region;
  householdSize: number;
  income?: IncomeCategory;
};

const STORAGE_KEY = "maitrise-rge:simulateur";
const isIn = <T extends string>(options: readonly { value: T }[], v: unknown): v is T =>
  typeof v === "string" && options.some((o) => o.value === v);

function readStored(): { draft: Draft; step: number } | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { draft: Draft; step: number }) : null;
  } catch {
    return null;
  }
}

export function Simulator({ mode, reviewMode }: { mode: SimulatorMode; reviewMode: boolean }) {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ householdSize: 2 });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Restaure les réponses de la session, puis applique un éventuel pré-remplissage par lien.
  useEffect(() => {
    const stored = readStored();
    const next: Draft = stored?.draft ?? { householdSize: 2 };
    let nextStep = stored?.step ?? 0;
    const heating = params.get("chauffage");
    const work = params.get("travaux");
    if (isIn(heatingOptions, heating)) {
      next.heating = heating;
      nextStep = Math.max(nextStep, 1);
    }
    if (isIn(simulatorWorkOptions, work)) next.work = work;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique du stockage navigateur après hydratation
    setDraft(next);
    setStep(Math.min(nextStep, 3));
    setHydrated(true);
  }, [params]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, step: Math.min(step, 3) }));
    } catch {
      /* stockage indisponible : les réponses restent en mémoire */
    }
  }, [draft, step, hydrated]);

  // Place le focus sur le titre de l'étape et ramène l'étape en vue.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    titleRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.4) {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const answers: SimulatorAnswers | null =
    draft.heating && draft.housing && draft.work && draft.region && draft.income
      ? {
          heating: draft.heating,
          housing: draft.housing,
          work: draft.work,
          region: draft.region,
          householdSize: draft.householdSize,
          income: draft.income,
        }
      : null;

  const result = useMemo(
    () => (answers && mode.kind !== "unavailable" ? calculateSimulation(answers, mode.rules) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `answers` est dérivé de `draft`
    [draft, mode],
  );

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setError(null);
  };

  function stepError(): string | null {
    switch (STEPS[step].key) {
      case "heating":
        return draft.heating ? null : "Sélectionnez votre mode de chauffage pour continuer.";
      case "housing":
        return draft.housing ? null : "Sélectionnez votre type de logement pour continuer.";
      case "work":
        return draft.work ? null : "Sélectionnez les travaux envisagés pour continuer.";
      case "income":
        if (!draft.region) return "Indiquez la région de votre logement.";
        if (!draft.income) return "Sélectionnez la catégorie de revenus de votre foyer.";
        return null;
      default:
        return null;
    }
  }

  const next = () => {
    const problem = stepError();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const restart = () => {
    setDraft({ householdSize: 2 });
    setSent(false);
    setError(null);
    setStep(0);
  };

  const current = STEPS[step];
  const isResult = current.key === "result";
  const bands = draft.region ? incomeBands(draft.region, draft.householdSize) : null;

  const recap = [
    { step: 0, label: "Chauffage", value: labelOf(heatingOptions, draft.heating) },
    { step: 1, label: "Logement", value: labelOf(housingOptions, draft.housing) },
    { step: 2, label: "Travaux", value: labelOf(simulatorWorkOptions, draft.work) },
    {
      step: 3,
      label: "Foyer",
      value: draft.income
        ? `${labelOf(incomeCategoryOptions, draft.income)} · ${draft.householdSize} pers. · ${labelOf(regionOptions, draft.region)}`
        : "",
    },
  ];

  return (
    <div ref={rootRef} className="scroll-mt-24 lg:grid lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div className="rounded-[2rem] bg-white shadow-lift ring-1 ring-line">
          {/* Progression */}
          <div className="border-b border-line px-5 pt-6 pb-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-brand-700">
                Étape {step + 1} sur {STEPS.length}
                <span className="text-muted"> · {current.label}</span>
              </p>
              {mode.kind === "demo" && <ReviewBadge>Barèmes d&apos;exemple</ReviewBadge>}
            </div>
            <div
              role="progressbar"
              aria-label="Progression du simulateur"
              aria-valuemin={1}
              aria-valuemax={STEPS.length}
              aria-valuenow={step + 1}
              aria-valuetext={`Étape ${step + 1} sur ${STEPS.length} : ${current.label}`}
              className="mt-4 grid grid-cols-5 gap-1.5"
            >
              {STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-500",
                    i < step ? "bg-brand-600" : i === step ? "bg-brand-400" : "bg-paper-deep",
                  )}
                />
              ))}
            </div>
            <ol aria-hidden="true" className="mt-2.5 hidden grid-cols-5 gap-1.5 text-xs font-medium text-muted sm:grid">
              {STEPS.map((s, i) => (
                <li key={s.key} className={cn(i === step && "text-ink")}>
                  {s.label}
                </li>
              ))}
            </ol>
          </div>

          <div key={step} className="animate-rise px-5 py-7 sm:px-8 sm:py-9">
            <h2 ref={titleRef} tabIndex={-1} className="text-[1.65rem] leading-tight font-semibold outline-none sm:text-3xl">
              {current.title}
            </h2>

            <div className="mt-7">
              {current.key === "heating" && (
                <ChoiceGroup
                  name="heating"
                  legend={current.title}
                  options={heatingOptions}
                  value={draft.heating}
                  onChange={(v) => set("heating", v)}
                  error={error ?? undefined}
                  icons={heatingIcons}
                />
              )}

              {current.key === "housing" && (
                <ChoiceGroup
                  name="housing"
                  legend={current.title}
                  options={housingOptions}
                  value={draft.housing}
                  onChange={(v) => set("housing", v)}
                  error={error ?? undefined}
                  icons={housingIcons}
                />
              )}

              {current.key === "work" && (
                <ChoiceGroup
                  name="work"
                  legend={current.title}
                  options={simulatorWorkOptions}
                  value={draft.work}
                  onChange={(v) => set("work", v)}
                  error={error ?? undefined}
                  icons={workIcons}
                />
              )}

              {current.key === "income" && (
                <div className="space-y-9">
                  <div>
                    <p id="region-label" className="text-lg font-semibold">
                      Où se situe le logement ?
                    </p>
                    <div role="radiogroup" aria-labelledby="region-label" className="mt-3 grid grid-cols-2 gap-3">
                      {regionOptions.map((o) => (
                        <label
                          key={o.value}
                          className={cn(
                            "flex min-h-14 cursor-pointer items-center justify-center rounded-2xl px-4 text-center font-semibold ring-1 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sky-500/40",
                            draft.region === o.value
                              ? "bg-brand-700 text-white ring-brand-700"
                              : "bg-white text-ink ring-line hover:ring-brand-300",
                          )}
                        >
                          <input
                            type="radio"
                            name="region"
                            value={o.value}
                            checked={draft.region === o.value}
                            onChange={() => set("region", o.value)}
                            className="sr-only"
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p id="people-label" className="text-lg font-semibold">
                      Combien de personnes composent votre foyer fiscal ?
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-paper p-1.5 ring-1 ring-line">
                      <button
                        type="button"
                        aria-label="Retirer une personne"
                        disabled={draft.householdSize <= 1}
                        onClick={() => set("householdSize", Math.max(1, draft.householdSize - 1))}
                        className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl font-semibold text-ink shadow-soft transition hover:bg-brand-50 disabled:opacity-40"
                      >
                        −
                      </button>
                      <output aria-labelledby="people-label" aria-live="polite" className="min-w-24 text-center font-display text-xl font-semibold">
                        {draft.householdSize} {draft.householdSize > 1 ? "personnes" : "personne"}
                      </output>
                      <button
                        type="button"
                        aria-label="Ajouter une personne"
                        disabled={draft.householdSize >= 12}
                        onClick={() => set("householdSize", Math.min(12, draft.householdSize + 1))}
                        className="flex size-12 items-center justify-center rounded-xl bg-white text-2xl font-semibold text-ink shadow-soft transition hover:bg-brand-50 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-lg font-semibold">Revenu fiscal de référence du foyer</p>
                    <p className="mt-1 text-[0.95rem] text-muted">
                      Il figure sur votre dernier avis d&apos;imposition.{" "}
                      {!draft.region && "Choisissez d'abord la région pour afficher les plafonds."}
                    </p>
                    <div className="mt-4">
                      <ChoiceGroup
                        name="income"
                        legend="Catégorie de revenus"
                        options={incomeCategoryOptions}
                        value={draft.income}
                        onChange={(v) => set("income", v)}
                        error={draft.region ? (error ?? undefined) : undefined}
                        describe={
                          bands
                            ? (v) => {
                                const b = bands[v] as { min?: number; max?: number };
                                if (b.max && !b.min) return `Jusqu'à ${formatEuros(b.max)}`;
                                if (b.min && b.max) return `De ${formatEuros(b.min)} à ${formatEuros(b.max)}`;
                                return `Au-delà de ${formatEuros(b.min ?? 0)}`;
                              }
                            : undefined
                        }
                      />
                    </div>
                    {!draft.region && error && (
                      <p role="alert" className="mt-4 text-[0.95rem] font-medium text-danger">
                        {error}
                      </p>
                    )}
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
                      Plafonds {incomeCeilings.millesime} publiés par l&apos;Anah, donnés à titre indicatif.
                      {!incomeCeilings.verified && reviewMode && <ReviewBadge>Grille à vérifier</ReviewBadge>}
                    </p>
                  </div>
                </div>
              )}

              {isResult && answers && (
                <div className="space-y-10">
                  <Result mode={mode} result={result} workLabel={labelOf(simulatorWorkOptions, answers.work)} />
                  <SimulationDisclaimer />

                  <div id="demande-devis" className="scroll-mt-28 border-t border-line pt-9">
                    {sent ? (
                      <div role="status" className="rounded-[1.75rem] bg-brand-50 p-7 ring-1 ring-brand-200 sm:p-9">
                        <h3 className="text-2xl font-semibold">Votre demande de devis est enregistrée.</h3>
                        <p className="mt-3 text-ink-soft">
                          Merci. Vos coordonnées et vos réponses au simulateur ont bien été transmises à
                          notre équipe, qui reviendra vers vous pour étudier votre projet.
                        </p>
                        <Button variant="secondary" className="mt-6" onClick={restart}>
                          Faire une nouvelle simulation
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-2xl font-semibold sm:text-[1.75rem]">Recevoir un devis personnalisé</h3>
                        <p className="mt-2 mb-7 text-ink-soft">
                          Votre logement et vos travaux sont repris ci-dessous ; vous pouvez les ajuster.
                        </p>
                        <QuoteForm answers={answers} onSuccess={() => setSent(true)} />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation entre étapes, collée en bas de l'écran sur mobile */}
          <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 rounded-b-[2rem] border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:static sm:px-8 sm:py-5">
            {step > 0 ? (
              <Button variant="ghost" onClick={back} className="-ml-2 px-3">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4.5 rotate-180" fill="none">
                  <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isResult ? "Modifier mes réponses" : "Précédent"}
              </Button>
            ) : (
              <span />
            )}
            {isResult ? (
              <Button variant="secondary" onClick={restart}>
                Recommencer
              </Button>
            ) : (
              <Button onClick={next} size="lg" className="min-w-36">
                {step === STEPS.length - 2 ? "Voir l'estimation" : "Suivant"}
                <ArrowIcon />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Récapitulatif (grand écran) */}
      <aside aria-label="Vos réponses" className="mt-8 lg:col-span-4 lg:mt-0">
        <div className="space-y-5 lg:sticky lg:top-28">
          <div className="hidden rounded-[1.75rem] bg-white p-6 ring-1 ring-line lg:block">
            <p className="font-display text-lg font-semibold">Vos réponses</p>
            <dl className="mt-4 divide-y divide-line">
              {recap.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <dt className="text-sm text-muted">{r.label}</dt>
                    <dd className={cn("mt-0.5 font-semibold", !r.value && "font-normal text-muted/70")}>
                      {r.value || "—"}
                    </dd>
                  </div>
                  {r.value && r.step < step && (
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setStep(r.step);
                      }}
                      className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
                    >
                      Modifier<span className="sr-only"> {r.label.toLowerCase()}</span>
                    </button>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[1.75rem] bg-sky-50 p-6 ring-1 ring-sky-100">
            <p className="font-display text-lg font-semibold text-sky-700">À savoir</p>
            <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              <li>Le résultat est indicatif et soumis à l&apos;étude de votre projet.</li>
              <li>Les aides publiques et la remise commerciale sont présentées séparément.</li>
              <li>
                Conseil public gratuit :{" "}
                <a href="https://france-renov.gouv.fr" target="_blank" rel="noopener" className="font-semibold text-sky-700 underline underline-offset-2">
                  France Rénov&apos;
                </a>
                .
              </li>
            </ul>
            <Link href="/conseils/aides-maprimerenov-cee" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-800">
              Comprendre les aides
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
