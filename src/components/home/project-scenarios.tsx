"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn, formatEuros } from "@/lib/cn";
import { calculateSimulation } from "@/lib/simulator/calculate";
import { heatingOptions, incomeCategoryOptions, labelOf, simulatorWorkOptions } from "@/lib/simulator/options";
import type { SimulatorAnswers, SimulatorRules } from "@/lib/simulator/types";

type Scenario = {
  id: string;
  tab: string;
  home: string;
  details: string[];
  answers: SimulatorAnswers;
};

/** Scénarios types : des situations fréquentes, pas des chantiers réels. */
const scenarios: Scenario[] = [
  {
    id: "pac",
    tab: "Sortir du fioul",
    home: "Maison des années 1980 chauffée au fioul",
    details: ["Radiateurs en acier conservés", "Foyer de 3 personnes", "Remplacement de la chaudière"],
    answers: { heating: "fioul", housing: "maison", work: "pac_air_eau", income: "modestes" },
  },
  {
    id: "combles",
    tab: "Isoler le toit",
    home: "Pavillon aux combles perdus non isolés",
    details: ["100 m² de plancher de combles", "Chauffage électrique", "Isolant soufflé"],
    answers: { heating: "electricite", housing: "maison", work: "isolation_combles", surface: 100, income: "tres_modestes" },
  },
  {
    id: "ballon",
    tab: "Eau chaude",
    home: "Maison équipée d'un vieux chauffe-eau électrique",
    details: ["Garage non chauffé disponible", "Foyer de 4 personnes", "Ballon de 200 litres"],
    answers: { heating: "gaz", housing: "maison", work: "ballon_thermo", income: "intermediaires" },
  },
];

export function ProjectScenarios({ rules, isExample }: { rules: SimulatorRules; isExample: boolean }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const scenario = scenarios[active];
  const result = calculateSimulation(scenario.answers, rules);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + scenarios.length) % scenarios.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const lines = [
    { label: "Coût estimatif des travaux", value: result.cost, kind: "cost" as const },
    { label: "MaPrimeRénov'", value: -result.maPrimeRenov, kind: "aid" as const },
    { label: "Primes CEE", value: -result.cee, kind: "aid" as const },
    ...(result.discount > 0 ? [{ label: "Remise Maîtrise RGE", value: -result.discount, kind: "discount" as const }] : []),
  ];

  return (
    <section id="projet-a-la-loupe" aria-labelledby="loupe-title" className="relative overflow-hidden bg-paper-deep py-20 sm:py-28">
      {/* Trame de plan d'architecte */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(#cfdcc4_1px,transparent_1px),linear-gradient(90deg,#cfdcc4_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Un projet à la loupe</p>
            <h2 id="loupe-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
              Du devis au reste à charge, <span className="text-brand-700">ligne par ligne</span>.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Trois situations fréquentes, décomposées comme sur une étude : coût des travaux, aides
              publiques, remise éventuelle et reste à payer.
            </p>

            <div role="tablist" aria-label="Scénarios types" className="mt-9 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {scenarios.map((s, i) => (
                <button
                  key={s.id}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "flex min-h-14 items-center justify-between gap-3 rounded-2xl px-5 text-left font-semibold transition",
                    i === active ? "bg-ink text-white shadow-lift" : "bg-white/80 text-ink ring-1 ring-line hover:bg-white",
                  )}
                >
                  <span>
                    <span className={cn("block text-xs font-medium tracking-wide uppercase", i === active ? "text-brand-200" : "text-muted")}>
                      {labelOf(simulatorWorkOptions, s.answers.work)}
                    </span>
                    {s.tab}
                  </span>
                  <ArrowIcon className={cn("transition", i === active ? "opacity-100" : "opacity-30")} />
                </button>
              ))}
            </div>
          </div>

          {/* Le ticket */}
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="lg:col-span-7"
          >
            <div key={scenario.id} className="relative mx-auto max-w-xl animate-rise">
              <div className="relative rounded-t-[2rem] bg-white px-6 pt-8 pb-6 shadow-lift sm:px-10 sm:pt-10">
                {isExample && (
                  <span className="absolute top-6 right-6 rotate-6 rounded-lg border-2 border-sun-600/70 px-2.5 py-1 font-display text-xs font-bold tracking-[0.2em] text-sun-800 uppercase sm:top-8 sm:right-8">
                    Exemple
                  </span>
                )}
                <p className="text-sm font-semibold tracking-wide text-muted uppercase">Scénario type</p>
                <h3 className="mt-2 max-w-[80%] text-2xl font-semibold">{scenario.home}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {[
                    ...scenario.details,
                    `Chauffage : ${labelOf(heatingOptions, scenario.answers.heating).toLowerCase()}`,
                    `Revenus ${labelOf(incomeCategoryOptions, scenario.answers.income).toLowerCase()}`,
                  ].map((d) => (
                    <li key={d} className="rounded-full bg-paper px-3 py-1 text-sm text-ink-soft ring-1 ring-line">
                      {d}
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 space-y-4 font-display">
                  {lines.map((l) => (
                    <div key={l.label} className="flex items-baseline gap-3">
                      <dt className={cn("shrink-0", l.kind === "cost" ? "font-semibold text-ink" : "text-ink-soft")}>{l.label}</dt>
                      <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.3rem] border-b-2 border-dotted border-line" />
                      <dd
                        className={cn(
                          "shrink-0 font-semibold tabular-nums",
                          l.kind === "aid" && "text-brand-700",
                          l.kind === "discount" && "text-sun-800",
                        )}
                      >
                        {l.value < 0 ? `− ${formatEuros(-l.value)}` : formatEuros(l.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Découpe du ticket */}
              <div aria-hidden="true" className="relative h-6 bg-white">
                <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full bg-paper-deep" />
                <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full bg-paper-deep" />
                <span className="absolute inset-x-6 top-1/2 border-t-2 border-dashed border-line" />
              </div>

              <div className="rounded-b-[2rem] bg-white px-6 pt-4 pb-8 shadow-lift sm:px-10 sm:pb-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-muted uppercase">Reste à charge estimé</p>
                    <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-ink tabular-nums">{formatEuros(result.remaining)}</p>
                  </div>
                  <p className="rounded-2xl bg-brand-50 px-4 py-3 text-right">
                    <span className="block font-display text-3xl font-semibold text-brand-700 tabular-nums">{result.financedPercent} %</span>
                    <span className="text-sm text-ink-soft">du projet financé</span>
                  </p>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  {isExample
                    ? "Montants fictifs destinés à illustrer le calcul : ils ne constituent pas une estimation."
                    : "Scénario type à titre indicatif : votre situation fera l'objet d'une étude personnalisée."}{" "}
                  Les aides dépendent des conditions en vigueur et de la décision des organismes.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-ink">
                Et pour votre maison ?
                <span className="block text-sm font-medium text-muted">Et les dossiers d&apos;aides ? Nous nous en chargeons.</span>
              </p>
              <ButtonLink href={`/simulateur?travaux=${scenario.answers.work}`} icon={<ArrowIcon />}>
                Estimer mes aides
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
