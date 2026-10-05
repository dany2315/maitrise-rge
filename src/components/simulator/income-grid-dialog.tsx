"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatEuros } from "@/lib/cn";
import { incomeCeilings, type CappedCategory } from "@/lib/simulator/income-ceilings";
import { regionOptions, type Region } from "@/lib/simulator/options";

const columns: { key: CappedCategory; label: string; dot: string }[] = [
  { key: "tres_modestes", label: "Très modestes", dot: "bg-sky-600" },
  { key: "modestes", label: "Modestes", dot: "bg-sun-400" },
  { key: "intermediaires", label: "Intermédiaires", dot: "bg-[#8b5cf6]" },
];

const people = ["1 personne", "2 personnes", "3 personnes", "4 personnes", "5 personnes"];

export function IncomeGridDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [region, setRegion] = useState<Region>("hors_idf");
  const grid = incomeCeilings.grid[region];
  const extra = incomeCeilings.perAdditionalPerson[region];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="grille-revenus-titre"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-[1.75rem] bg-white p-0 text-ink shadow-lift backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[92dvh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 pt-6 pb-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">Barème Anah en vigueur</p>
            <h2 id="grille-revenus-titre" className="mt-1.5 text-2xl font-semibold">
              Grille de revenus MaPrimeRénov&apos;
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la grille"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-2xl leading-none ring-1 ring-line transition hover:bg-brand-50"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-8">
          <div role="radiogroup" aria-label="Région du logement" className="grid grid-cols-2 gap-1.5 rounded-2xl bg-paper p-1.5 ring-1 ring-line">
            {regionOptions.map((o) => (
              <label
                key={o.value}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center justify-center rounded-xl px-3 text-center text-[0.95rem] font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sky-500/40",
                  region === o.value ? "bg-brand-700 text-white shadow-soft" : "text-ink-soft hover:bg-white",
                )}
              >
                <input
                  type="radio"
                  name="grille-region"
                  value={o.value}
                  checked={region === o.value}
                  onChange={() => setRegion(o.value)}
                  className="sr-only"
                />
                {o.label}
              </label>
            ))}
          </div>

          <p className="mt-5 text-[0.95rem] text-ink-soft">
            Plafonds annuels du <strong>revenu fiscal de référence</strong> du foyer (dernier avis
            d&apos;imposition), qui déterminent votre catégorie.
          </p>

          {/* Tableau : tablette et ordinateur */}
          <table className="mt-5 hidden w-full border-separate border-spacing-0 text-[0.95rem] sm:table">
            <thead>
              <tr>
                <th scope="col" className="sr-only">
                  Composition du foyer
                </th>
                {columns.map((c) => (
                  <th key={c.key} scope="col" className="px-3 pb-3 text-left font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className={`size-2.5 rounded-full ${c.dot}`} />
                      {c.label}
                    </span>
                  </th>
                ))}
                <th scope="col" className="px-3 pb-3 text-left font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ec4899]" />
                    Supérieurs
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {people.map((label, i) => (
                <tr key={label} className="odd:bg-paper/70">
                  <th scope="row" className="rounded-l-xl px-3 py-3 text-left font-semibold whitespace-nowrap">
                    {label}
                  </th>
                  {columns.map((c) => (
                    <td key={c.key} className="px-3 py-3 tabular-nums whitespace-nowrap">
                      ≤ {formatEuros(grid[c.key][i])}
                    </td>
                  ))}
                  <td className="rounded-r-xl px-3 py-3 tabular-nums whitespace-nowrap">
                    &gt; {formatEuros(grid.intermediaires[i])}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-3 py-3 text-left text-sm font-semibold text-muted">
                  Par personne en plus
                </th>
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-3 text-sm tabular-nums text-muted">
                    + {formatEuros(extra[c.key])}
                  </td>
                ))}
                <td className="px-3 py-3 text-sm text-muted">—</td>
              </tr>
            </tbody>
          </table>

          {/* Cartes : mobile */}
          <ul className="mt-5 space-y-3 sm:hidden">
            {people.map((label, i) => (
              <li key={label} className="rounded-2xl bg-paper p-4 ring-1 ring-line">
                <p className="font-semibold">{label}</p>
                <dl className="mt-2 space-y-1.5 text-[0.95rem]">
                  {columns.map((c) => (
                    <div key={c.key} className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-ink-soft">
                        <span aria-hidden="true" className={`size-2 rounded-full ${c.dot}`} />
                        {c.label}
                      </dt>
                      <dd className="font-medium tabular-nums">≤ {formatEuros(grid[c.key][i])}</dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-ink-soft">
                      <span aria-hidden="true" className="size-2 rounded-full bg-[#ec4899]" />
                      Supérieurs
                    </dt>
                    <dd className="font-medium tabular-nums">&gt; {formatEuros(grid.intermediaires[i])}</dd>
                  </div>
                </dl>
              </li>
            ))}
            <li className="px-1 text-sm text-muted">
              Par personne en plus : + {formatEuros(extra.tres_modestes)} / + {formatEuros(extra.modestes)} / +{" "}
              {formatEuros(extra.intermediaires)} selon la catégorie.
            </li>
          </ul>

          <p className="mt-5 text-sm text-muted">
            Source :{" "}
            <a href={incomeCeilings.source} target="_blank" rel="noopener" className="font-semibold text-brand-800 underline underline-offset-2">
              france-renov.gouv.fr
            </a>
            , barème consulté le{" "}
            {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(incomeCeilings.checkedAt))}.
            Votre catégorie est confirmée lors de l&apos;étude de votre dossier.
          </p>
        </div>
      </div>
    </dialog>
  );
}
