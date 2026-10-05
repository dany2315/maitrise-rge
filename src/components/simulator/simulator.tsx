"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon, Button } from "@/components/ui/button";
import { ReviewBadge } from "@/components/ui/layout";
import { cn, formatEuros } from "@/lib/cn";
import { calculateSimulation } from "@/lib/simulator/calculate";
import { singlePersonCeiling } from "@/lib/simulator/income-ceilings";
import {
  electricFallbackWork,
  heatingOptions,
  housingOptions,
  incomeCategoryOptions,
  isWorkBlocked,
  labelOf,
  simulatorWorkOptions,
  surfaceSettings,
  type Heating,
  type Housing,
  type IncomeCategory,
  type SimulatorWork,
} from "@/lib/simulator/options";
import type { SimulatorAnswers, SimulatorMode } from "@/lib/simulator/types";
import { ChoiceGroup } from "./choice-group";
import { heatingIcons, housingIcons, workIcons } from "./icons";
import { IncomeGridDialog } from "./income-grid-dialog";
import { QuoteForm } from "./quote-form";
import { Result, SimulationDisclaimer } from "./result";

const STEPS = [
  { key: "heating", label: "Chauffage", title: "Votre énergie de chauffage", sub: "Qu'est-ce qui chauffe votre logement aujourd'hui ?" },
  { key: "housing", label: "Logement", title: "Votre logement", sub: "Maison individuelle ou appartement ?" },
  { key: "work", label: "Travaux", title: "Vos travaux", sub: "Quels travaux envisagez-vous ?" },
  { key: "income", label: "Revenus", title: "Vos revenus", sub: "Pour estimer vos droits aux aides." },
  { key: "result", label: "Estimation", title: "Vos aides estimées", sub: "Voici l'estimation correspondant à vos réponses." },
] as const;

type Draft = {
  heating?: Heating;
  housing?: Housing;
  work?: SimulatorWork;
  surface?: number;
  income?: IncomeCategory;
};

const STORAGE_KEY = "maitrise-rge:simulateur:v2";
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

const incomeHint = (value: IncomeCategory) =>
  value === "superieurs"
    ? "Au-delà des plafonds intermédiaires"
    : `Jusqu'à ${formatEuros(singlePersonCeiling(value))} pour 1 personne hors Île-de-France`;

export function Simulator({ mode }: { mode: SimulatorMode }) {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({});
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Restaure les réponses de la session, puis applique un éventuel pré-remplissage par lien.
  useEffect(() => {
    const stored = readStored();
    const next: Draft = stored?.draft ?? {};
    let nextStep = stored?.step ?? 0;
    const heating = params.get("chauffage");
    const work = params.get("travaux");
    if (isIn(heatingOptions, heating)) {
      next.heating = heating;
      nextStep = Math.max(nextStep, 1);
    }
    if (isIn(simulatorWorkOptions, work)) {
      next.work = work;
      if (surfaceSettings[work]) next.surface = surfaceSettings[work]?.default;
    }
    if (next.work && isWorkBlocked(next.work, next.heating)) next.work = undefined;
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

  // Place le focus sur le titre de l'étape et ramène le simulateur en vue.
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
    draft.heating && draft.housing && draft.work && draft.income
      ? {
          heating: draft.heating,
          housing: draft.housing,
          work: draft.work,
          surface: surfaceSettings[draft.work] ? draft.surface : undefined,
          income: draft.income,
        }
      : null;

  const result = useMemo(
    () => (answers && mode.kind !== "unavailable" ? calculateSimulation(answers, mode.rules) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `answers` est dérivé de `draft`
    [draft, mode],
  );

  const chooseHeating = (heating: Heating) => {
    setError(null);
    if (draft.work && isWorkBlocked(draft.work, heating)) {
      setNotice(
        `Avec un chauffage électrique, « ${labelOf(simulatorWorkOptions, draft.work)} » n'est pas proposé : votre choix de travaux a été remplacé par « ${labelOf(simulatorWorkOptions, electricFallbackWork)} ».`,
      );
      setDraft({ ...draft, heating, work: electricFallbackWork, surface: surfaceSettings[electricFallbackWork]?.default });
      return;
    }
    setDraft({ ...draft, heating });
  };

  const chooseWork = (work: SimulatorWork) => {
    setError(null);
    setNotice(null);
    setDraft((d) => ({ ...d, work, surface: surfaceSettings[work]?.default }));
  };

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setError(null);
  };

  const current = STEPS[step];
  const isResult = current.key === "result";
  const answered =
    (current.key === "heating" && Boolean(draft.heating)) ||
    (current.key === "housing" && Boolean(draft.housing)) ||
    (current.key === "work" && Boolean(draft.work)) ||
    (current.key === "income" && Boolean(draft.income)) ||
    isResult;

  const missingMessage: Record<string, string> = {
    heating: "Sélectionnez votre énergie de chauffage pour continuer.",
    housing: "Sélectionnez votre type de logement pour continuer.",
    work: "Sélectionnez les travaux envisagés pour continuer.",
    income: "Sélectionnez la catégorie de revenus de votre foyer pour continuer.",
  };

  const next = () => {
    if (!answered) {
      setError(missingMessage[current.key]);
      return;
    }
    setError(null);
    // Le message de bascule automatique reste visible jusqu'à la sortie de l'étape Travaux.
    if (current.key === "work") setNotice(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setShowForm(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const goTo = (target: number) => {
    setError(null);
    setShowForm(false);
    setStep(target);
  };

  const openForm = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      formRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    });
  };

  const restart = () => {
    setDraft({});
    setSent(false);
    setShowForm(false);
    setError(null);
    setNotice(null);
    setStep(0);
  };

  const surface = draft.work ? surfaceSettings[draft.work] : undefined;
  const recap = [
    { step: 0, label: "Chauffage actuel", value: labelOf(heatingOptions, draft.heating) },
    { step: 1, label: "Logement", value: labelOf(housingOptions, draft.housing) },
    {
      step: 2,
      label: "Travaux",
      value: draft.work
        ? `${labelOf(simulatorWorkOptions, draft.work)}${surface && draft.surface ? ` · ${draft.surface} m²` : ""}`
        : "",
    },
    { step: 3, label: "Revenus", value: draft.income ? `Foyer ${labelOf(incomeCategoryOptions, draft.income).toLowerCase()}` : "" },
  ];

  return (
    <div ref={rootRef} className="scroll-mt-24 lg:grid lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div className="rounded-[2rem] bg-white shadow-lift ring-1 ring-line">
          {/* Progression */}
          <div className="border-b border-line px-5 pt-6 pb-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-brand-700">
                Étape {step + 1} / {STEPS.length}
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
              className="mt-4 h-2 overflow-hidden rounded-full bg-paper-deep"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-[width] duration-500 ease-out"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <ol aria-hidden="true" className="mt-2.5 hidden grid-cols-5 gap-1.5 text-xs font-medium text-muted sm:grid">
              {STEPS.map((s, i) => (
                <li key={s.key} className={cn(i <= step && "text-ink")}>
                  {s.label}
                </li>
              ))}
            </ol>
          </div>

          <div key={step} className="animate-rise px-5 py-7 sm:px-8 sm:py-9">
            <h2 ref={titleRef} tabIndex={-1} className="text-[1.65rem] leading-tight font-semibold outline-none sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-2 text-lg text-ink-soft">{current.sub}</p>

            <div className="mt-7">
              {current.key === "heating" && (
                <ChoiceGroup
                  name="heating"
                  legend={current.sub}
                  options={heatingOptions}
                  value={draft.heating}
                  onChange={chooseHeating}
                  error={error ?? undefined}
                  icons={heatingIcons}
                />
              )}

              {current.key === "housing" && (
                <ChoiceGroup
                  name="housing"
                  legend={current.sub}
                  options={housingOptions}
                  value={draft.housing}
                  onChange={(v) => set("housing", v)}
                  error={error ?? undefined}
                  icons={housingIcons}
                />
              )}

              {current.key === "work" && (
                <div className="space-y-8">
                  {notice && (
                    <p role="status" className="rounded-2xl bg-sky-50 px-5 py-4 text-[0.95rem] text-sky-700 ring-1 ring-sky-100">
                      {notice}
                    </p>
                  )}
                  <ChoiceGroup
                    name="work"
                    legend={current.sub}
                    options={simulatorWorkOptions}
                    value={draft.work}
                    onChange={chooseWork}
                    error={error ?? undefined}
                    icons={workIcons}
                    isDisabled={(v) => isWorkBlocked(v, draft.heating)}
                    disabledNote="Non proposé avec un chauffage électrique"
                  />

                  {draft.work && surface && (
                    <div className="rounded-2xl bg-paper p-5 ring-1 ring-line sm:p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="surface" className="text-lg font-semibold">
                          Surface à isoler
                        </label>
                        <output htmlFor="surface" className="font-display text-2xl font-semibold text-brand-800 tabular-nums">
                          {draft.surface ?? surface.default} m²
                        </output>
                      </div>
                      <input
                        id="surface"
                        type="range"
                        min={surface.min}
                        max={surface.max}
                        step={surface.step}
                        value={draft.surface ?? surface.default}
                        onChange={(e) => set("surface", Number(e.target.value))}
                        aria-valuetext={`${draft.surface ?? surface.default} mètres carrés`}
                        className="mt-5 h-11 w-full cursor-pointer accent-brand-700"
                      />
                      <div aria-hidden="true" className="flex justify-between text-sm text-muted">
                        <span>{surface.min} m²</span>
                        <span>{surface.max} m²</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {current.key === "income" && (
                <div>
                  <ChoiceGroup
                    name="income"
                    legend="Revenus du foyer"
                    options={incomeCategoryOptions.map((o) => ({ ...o, hint: incomeHint(o.value) }))}
                    value={draft.income}
                    onChange={(v) => set("income", v)}
                    error={error ?? undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setGridOpen(true)}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full font-semibold text-brand-800 underline-offset-4 hover:underline"
                  >
                    Voir la grille de revenus complète
                    <ArrowIcon />
                  </button>
                  <p className="mt-1 text-sm text-muted">
                    Votre catégorie dépend du revenu fiscal de référence, du nombre de personnes du foyer
                    et de la région.
                  </p>
                  <IncomeGridDialog open={gridOpen} onClose={() => setGridOpen(false)} />
                </div>
              )}

              {isResult && answers && (
                <div className="space-y-8">
                  <Result mode={mode} result={result} workLabel={recap[2].value} />
                  <SimulationDisclaimer />

                  {(showForm || sent) && (
                    <div ref={formRef} id="demande-devis" className="scroll-mt-28 border-t border-line pt-9">
                      {sent ? (
                        <div role="status" className="rounded-[1.75rem] bg-brand-50 p-7 ring-1 ring-brand-200 sm:p-9">
                          <h3 className="text-2xl font-semibold">Votre demande de devis est enregistrée.</h3>
                          <p className="mt-3 text-ink-soft">
                            Merci. Vos coordonnées et votre simulation ont bien été transmises à notre
                            équipe, qui reviendra vers vous pour étudier votre projet.
                          </p>
                          <Button variant="secondary" className="mt-6" onClick={restart}>
                            Faire une nouvelle simulation
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-2xl font-semibold sm:text-[1.75rem]">Obtenir mon devis</h3>
                          <div className="mt-5 mb-7 rounded-2xl bg-paper p-5 ring-1 ring-line">
                            <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">Votre simulation</p>
                            <dl className="mt-3 grid gap-x-6 gap-y-2 text-[0.95rem] sm:grid-cols-2">
                              {recap.map((r) => (
                                <div key={r.label} className="flex justify-between gap-3 sm:block">
                                  <dt className="text-muted">{r.label}</dt>
                                  <dd className="text-right font-semibold sm:text-left">{r.value}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                          <QuoteForm answers={answers} onSuccess={() => setSent(true)} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation entre étapes, collée en bas de l'écran sur mobile */}
          {!sent && (
            <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 rounded-b-[2rem] border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:static sm:px-8 sm:py-5">
              <Button variant="ghost" onClick={back} disabled={step === 0} className="-ml-2 px-3">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4.5 rotate-180" fill="none">
                  <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Précédent
              </Button>
              {isResult ? (
                !showForm && (
                  <Button onClick={openForm} size="lg">
                    Obtenir mon devis
                    <ArrowIcon />
                  </Button>
                )
              ) : (
                <Button
                  onClick={next}
                  size="lg"
                  aria-disabled={!answered}
                  className={cn("min-w-36", !answered && "opacity-50")}
                >
                  {step === STEPS.length - 2 ? "Voir mes aides" : "Suivant"}
                  <ArrowIcon />
                </Button>
              )}
            </div>
          )}
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
                  {r.value && r.step < step && !sent && (
                    <button
                      type="button"
                      onClick={() => goTo(r.step)}
                      className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
                    >
                      Modifier<span className="sr-only"> : {r.label.toLowerCase()}</span>
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
                , 0 808 800 700 (service gratuit + prix d&apos;un appel).
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
