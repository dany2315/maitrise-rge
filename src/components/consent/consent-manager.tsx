"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  consentCategories,
} from "@/config/consent";

const STORAGE_KEY = "maitrise-rge:consent";
const OPEN_EVENT = "maitrise-rge:open-consent";

type Stored = { version: number; date: number; choices: Record<string, boolean> };

function readConsent(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    const expired = Date.now() - parsed.date > CONSENT_MAX_AGE_DAYS * 86_400_000;
    return parsed.version === CONSENT_VERSION && !expired ? parsed : null;
  } catch {
    return null;
  }
}

/** À utiliser avant de charger un traceur déclaré dans config/consent.ts. */
export function hasConsent(categoryId: string): boolean {
  return readConsent()?.choices[categoryId] === true;
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * Bandeau de consentement : n'apparaît que si des traceurs soumis au
 * consentement sont déclarés. Refuser est aussi simple qu'accepter.
 */
export function ConsentManager() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState<Record<string, boolean>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consentCategories.length === 0) return;
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du choix enregistré après hydratation
    if (!stored) setVisible(true);
    else setChoices(stored.choices);
    const open = () => {
      setChoices(readConsent()?.choices ?? {});
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (visible) panelRef.current?.focus();
  }, [visible]);

  if (consentCategories.length === 0 || !visible) return null;

  const save = (next: Record<string, boolean>) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: CONSENT_VERSION, date: Date.now(), choices: next } satisfies Stored),
      );
    } catch {
      /* stockage indisponible : le bandeau réapparaîtra à la prochaine visite */
    }
    setChoices(next);
    setVisible(false);
    setCustomizing(false);
  };

  const all = (value: boolean) => Object.fromEntries(consentCategories.map((c) => [c.id, value]));

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-[1.75rem] bg-white p-6 shadow-lift ring-1 ring-line outline-none sm:inset-x-6 sm:bottom-6 sm:p-7"
    >
      <h2 id="consent-title" className="text-xl font-semibold">
        Vos préférences de confidentialité
      </h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
        Avec votre accord, nous utilisons des traceurs pour les usages décrits ci-dessous. Vous pouvez
        changer d&apos;avis à tout moment depuis la page{" "}
        <Link href="/cookies" className="font-semibold text-brand-800 underline">
          cookies
        </Link>
        .
      </p>

      {customizing && (
        <ul className="mt-5 divide-y divide-line rounded-2xl ring-1 ring-line">
          {consentCategories.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-4 p-4">
              <label htmlFor={`consent-${c.id}`} className="cursor-pointer">
                <span className="block font-semibold">{c.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{c.description}</span>
              </label>
              <input
                id={`consent-${c.id}`}
                type="checkbox"
                checked={choices[c.id] === true}
                onChange={(e) => setChoices((prev) => ({ ...prev, [c.id]: e.target.checked }))}
                className="mt-1 size-5 shrink-0 accent-brand-700"
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        {customizing ? (
          <Button onClick={() => save(choices)}>Enregistrer mes choix</Button>
        ) : (
          <Button variant="ghost" onClick={() => setCustomizing(true)}>
            Personnaliser
          </Button>
        )}
        <Button variant="secondary" onClick={() => save(all(false))}>
          Tout refuser
        </Button>
        <Button onClick={() => save(all(true))}>Tout accepter</Button>
      </div>
    </div>
  );
}

export function ConsentPreferencesButton() {
  if (consentCategories.length === 0) return null;
  return (
    <Button variant="secondary" onClick={openConsentPreferences}>
      Modifier mes préférences
    </Button>
  );
}
