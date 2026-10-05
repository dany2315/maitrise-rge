import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Champs accessibles : libellé relié, aide et erreur annoncées via
 * aria-describedby, texte jamais inférieur à 16 px (pas de zoom sur mobile).
 */

const control =
  "block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 shadow-[inset_0_1px_2px_rgb(19_32_43/0.04)] transition focus:outline-none focus:ring-4";

const stateClasses = (invalid: boolean) =>
  invalid
    ? "border-danger focus:border-danger focus:ring-danger/15"
    : "border-line hover:border-brand-300 focus:border-brand-500 focus:ring-brand-500/15";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
};

function FieldShell({ id, label, error, hint, optional, className, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-base font-semibold text-ink">
        <span>{label}</span>
        {optional && <span className="text-sm font-normal text-muted">facultatif</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm-.75 3.25h1.5v4.5h-1.5v-4.5Zm0 5.75h1.5V12h-1.5v-1.5Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...input
}: BaseProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <FieldShell {...{ id, label, error, hint, optional, className }}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, stateClasses(Boolean(error)))}
        {...input}
      />
    </FieldShell>
  );
}

export function TextArea({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...input
}: BaseProps & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <FieldShell {...{ id, label, error, hint, optional, className }}>
      <textarea
        id={id}
        name={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "min-h-36 resize-y", stateClasses(Boolean(error)))}
        {...input}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  options,
  placeholder = "Sélectionnez",
  ...select
}: BaseProps &
  Omit<ComponentProps<"select">, "id"> & {
    options: readonly { value: string; label: string }[];
    placeholder?: string;
  }) {
  return (
    <FieldShell {...{ id, label, error, hint, optional, className }}>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "appearance-none pr-11", stateClasses(Boolean(error)))}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted"
          fill="none"
        >
          <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-5 shrink-0 cursor-pointer rounded border-line accent-brand-700"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-8 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Champ piège invisible pour les robots ; ignoré par les lecteurs d'écran. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Ne pas remplir ce champ</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
