"use client";

import { useRef, useState } from "react";

export type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Envoie une demande à /api/leads. Le succès n'est affiché qu'après la
 * confirmation du serveur, elle-même conditionnée à la réponse de Google Sheets.
 */
export function useLeadSubmit() {
  const startedAt = useRef<number>(0);
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function submit(payload: Record<string, unknown>) {
    setState({ status: "sending" });
    setServerErrors({});
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current || Date.now() }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; message?: string; errors?: Record<string, string> }
        | null;
      if (response.ok && data?.ok) {
        setState({ status: "success" });
        return true;
      }
      if (data?.errors) setServerErrors(data.errors);
      setState({
        status: "error",
        message: data?.message ?? "L'envoi a échoué. Merci de réessayer dans un instant.",
      });
    } catch {
      setState({
        status: "error",
        message: "Connexion impossible. Vérifiez votre accès à Internet puis réessayez.",
      });
    }
    return false;
  }

  return { state, setState, serverErrors, submit, markStarted };
}
