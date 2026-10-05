"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Groupe de choix uniques sous forme de grandes cartes tactiles, construit sur
 * de vrais boutons radio : navigation clavier native (flèches), libellés lus
 * par les lecteurs d'écran.
 */
export function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  columns = 2,
  icons,
  describe,
  isDisabled,
  disabledNote,
}: {
  name: string;
  legend: string;
  options: readonly { value: T; label: string; hint?: string }[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
  columns?: 2 | 3;
  icons?: Partial<Record<T, ReactNode>>;
  describe?: (value: T) => ReactNode;
  isDisabled?: (value: T) => boolean;
  disabledNote?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={error ? true : undefined}>
      <legend className="sr-only">{legend}</legend>
      <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
        {options.map((o) => {
          const checked = value === o.value;
          const disabled = isDisabled?.(o.value) ?? false;
          return (
            <label
              key={o.value}
              className={cn(
                "group relative flex min-h-20 items-center gap-4 rounded-2xl p-4 ring-1 transition duration-200 sm:p-5",
                "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sky-500/40",
                disabled
                  ? "cursor-not-allowed bg-paper/70 opacity-60 ring-line"
                  : checked
                    ? "cursor-pointer bg-brand-50 ring-2 ring-brand-600 shadow-[0_10px_30px_-18px_rgb(47_106_34/0.6)]"
                    : "cursor-pointer bg-white ring-line hover:ring-brand-300 hover:shadow-soft",
                error && !checked && "ring-danger/60",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(o.value)}
                className="peer sr-only"
              />
              {icons?.[o.value] && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl transition",
                    checked ? "bg-brand-700 text-white" : "bg-paper text-brand-700 group-hover:bg-brand-50",
                  )}
                >
                  {icons[o.value]}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[1.05rem] leading-snug font-semibold text-ink">{o.label}</span>
                {disabled && disabledNote ? (
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{disabledNote}</span>
                ) : (
                  o.hint && <span className="mt-0.5 block text-sm leading-snug text-muted">{o.hint}</span>
                )}
                {describe && <span className="mt-1 block text-sm text-ink-soft">{describe(o.value)}</span>}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full ring-2 transition",
                  checked ? "bg-brand-700 ring-brand-700" : "ring-line group-hover:ring-brand-300",
                )}
              >
                {checked && (
                  <svg viewBox="0 0 16 16" className="size-3.5 text-white" fill="none">
                    <path d="m3.5 8.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-4 flex items-center gap-2 text-[0.95rem] font-medium text-danger">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm-.75 3.25h1.5v4.5h-1.5v-4.5Zm0 5.75h1.5V12h-1.5v-1.5Z" />
          </svg>
          {error}
        </p>
      )}
    </fieldset>
  );
}
