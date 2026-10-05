import type { Metadata } from "next";
import { Suspense } from "react";
import { Simulator } from "@/components/simulator/simulator";
import { Container } from "@/components/ui/layout";
import { isReviewMode } from "@/lib/env";
import { getSimulatorMode } from "@/lib/simulator/mode";

export const metadata: Metadata = {
  title: "Simulateur d'aides MaPrimeRénov' et CEE",
  description:
    "Estimez en 5 étapes les aides MaPrimeRénov' et CEE et le reste à charge de votre projet de pompe à chaleur, d'isolation ou de solaire. Résultat indicatif, sans engagement.",
  alternates: { canonical: "/simulateur" },
  openGraph: { url: "/simulateur" },
};

export default function SimulatorPage() {
  const mode = getSimulatorMode();

  return (
    <div className="relative overflow-hidden pb-20 sm:pb-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-gradient-to-b from-brand-100/70 via-paper to-paper" />
      <div aria-hidden="true" className="absolute -top-24 right-[-8rem] -z-10 size-[30rem] rounded-full bg-sun-300/25 blur-3xl" />

      <Container>
        <header className="max-w-3xl pt-10 pb-10 sm:pt-14 sm:pb-14">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
            Simulateur d&apos;aides
          </p>
          <h1 className="mt-4 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
            Estimez vos aides en <span className="text-brand-700">5 étapes</span>.
          </h1>
          <p className="mt-5 text-lg text-ink-soft sm:text-xl">
            Chauffage, logement, travaux, revenus : quelques réponses suffisent pour une première
            estimation de MaPrimeRénov&apos;, des primes CEE et de votre reste à charge.
          </p>
        </header>

        <Suspense fallback={<div className="h-[36rem] animate-pulse rounded-[2rem] bg-white/70 ring-1 ring-line" />}>
          <Simulator mode={mode} reviewMode={isReviewMode()} />
        </Suspense>
      </Container>
    </div>
  );
}
