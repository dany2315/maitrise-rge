"use client";

import { formatEuros } from "@/lib/cn";
import type { SimulationResult, SimulatorMode } from "@/lib/simulator/types";

export function SimulationDisclaimer() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      Estimation indicative fondée sur vos réponses, soumise à l&apos;étude de votre projet. Elle ne
      constitue ni une attribution d&apos;aides ni un devis définitif : les aides dépendent des
      décisions des organismes qui les versent et des conditions en vigueur au moment de la demande.
    </p>
  );
}

export function Result({
  mode,
  result,
  workLabel,
}: {
  mode: SimulatorMode;
  result: SimulationResult | null;
  workLabel: string;
}) {
  if (mode.kind === "unavailable" || !result) {
    return (
      <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-8">
        <p className="font-display text-sm font-semibold tracking-[0.16em] text-brand-700 uppercase">
          Votre estimation
        </p>
        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">Une estimation chiffrée établie pour votre projet</h3>
        <p className="mt-4 text-ink-soft">
          Les barèmes du simulateur sont en cours de validation. Plutôt que d&apos;afficher un montant
          approximatif, nous préférons calculer vos aides et votre reste à charge à partir de votre
          situation réelle. Laissez vos coordonnées ci-dessous : vos réponses sont jointes à la
          demande.
        </p>
      </div>
    );
  }

  if (!result.eligible) {
    return (
      <div className="rounded-[1.75rem] bg-sky-50 p-6 ring-1 ring-sky-100 sm:p-8">
        <h3 className="text-2xl font-semibold">Une étude personnalisée est nécessaire</h3>
        <p className="mt-3 text-ink-soft">{result.reason}</p>
      </div>
    );
  }

  const isDemo = mode.kind === "demo";
  const segments = [
    { key: "mpr", label: "MaPrimeRénov'", value: result.maPrimeRenov, color: "bg-brand-600" },
    { key: "cee", label: "Primes CEE", value: result.cee, color: "bg-sky-500" },
    { key: "remise", label: "Remise Maîtrise RGE", value: result.discount, color: "bg-sun-400" },
    { key: "reste", label: "Reste à charge", value: result.remaining, color: "bg-line" },
  ].filter((s) => s.value > 0);

  return (
    <div className="relative">
      {isDemo && (
        <div role="note" className="mb-5 flex gap-3 rounded-2xl bg-sun-100 px-5 py-4 text-sun-800 ring-1 ring-sun-300">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" fill="currentColor">
            <path d="M10 2 1 18h18L10 2Zm-.8 6h1.6v4.5H9.2V8Zm0 6h1.6v1.6H9.2V14Z" />
          </svg>
          <p className="text-[0.95rem] leading-relaxed">
            <strong className="font-semibold">Exemple — données fictives.</strong> Montants de test
            destinés à valider le parcours. Ils ne constituent pas une estimation et ne sont jamais
            affichés en production.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-line">
        {/* Synthèse */}
        <div className="relative isolate overflow-hidden bg-brand-900 p-6 text-white sm:p-8">
          <div aria-hidden="true" className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-sun-400/25 blur-3xl" />
          <p className="text-sm font-semibold tracking-wide text-brand-200 uppercase">{workLabel}</p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-brand-100/80">Reste à charge estimatif</p>
              <p className="mt-1 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                {formatEuros(result.remaining)}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-brand-100/80">Part financée</p>
              <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-sun-300 sm:text-6xl">
                {result.financedPercent} %
              </p>
            </div>
          </div>

          <div aria-hidden="true" className="mt-7 flex h-3 overflow-hidden rounded-full bg-white/10">
            {segments.map((s) => (
              <span key={s.key} className={s.color} style={{ width: `${(s.value / result.cost) * 100}%` }} />
            ))}
          </div>
          <ul aria-hidden="true" className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-brand-100/80">
            {segments.map((s) => (
              <li key={s.key} className="flex items-center gap-2">
                <span className={`size-2.5 rounded-full ${s.color}`} />
                {s.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Détail */}
        <dl className="divide-y divide-line bg-white text-[1rem]">
          <Row label="Coût estimatif des travaux" value={result.cost} strong />

          <div className="bg-paper/60 px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">Aides publiques estimées</p>
            <dl className="mt-3 space-y-2.5">
              <SubRow label="MaPrimeRénov'" value={result.maPrimeRenov} />
              <SubRow label="Primes CEE" value={result.cee} />
              <SubRow label="Total des aides publiques" value={result.publicAidTotal} strong />
            </dl>
            {result.capReduction > 0 && (
              <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3 text-[0.95rem]">
                <span className="text-ink-soft">
                  dont plafonnement du cumul des aides, selon vos revenus
                </span>
                <span className="tabular-nums font-medium text-ink-soft">−{formatEuros(result.capReduction)}</span>
              </div>
            )}
          </div>

          <div className="px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold tracking-wide text-sun-800 uppercase">Remise commerciale</p>
            <dl className="mt-3">
              <SubRow
                label={result.discountLabel ?? "Remise Maîtrise RGE"}
                value={result.discount}
                empty="Non applicable"
              />
            </dl>
            <p className="mt-2 text-sm text-muted">
              Consentie par Maîtrise RGE, elle ne constitue pas une aide publique.
            </p>
          </div>

          <Row label="Total aides et remise" value={result.totalSupport} strong />
          <Row label="Reste à charge estimatif" value={result.remaining} strong highlight />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value, strong, highlight }: { label: string; value: number; strong?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 px-6 py-4 sm:px-8 ${highlight ? "bg-brand-50" : ""}`}>
      <dt className={strong ? "font-semibold text-ink" : "text-ink-soft"}>{label}</dt>
      <dd className={`font-display tabular-nums ${highlight ? "text-xl font-semibold text-brand-800" : "text-lg font-semibold"}`}>
        {formatEuros(value)}
      </dd>
    </div>
  );
}

function SubRow({ label, value, strong, empty }: { label: string; value: number; strong?: boolean; empty?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? "font-semibold text-ink" : "text-ink-soft"}>{label}</dt>
      <dd className={`tabular-nums ${strong ? "font-display font-semibold" : "font-medium"}`}>
        {value === 0 && empty ? <span className="text-muted">{empty}</span> : formatEuros(value)}
      </dd>
    </div>
  );
}
