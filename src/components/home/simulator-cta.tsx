import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas } from "@/config/site";
import { PromiseIcon } from "./promise-icon";

const steps = ["Chauffage actuel", "Logement", "Travaux", "Revenus", "Estimation"];

export function SimulatorCta() {
  return (
    <section aria-labelledby="simulateur-cta-title" className="bg-white pb-20 sm:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Soleil et vague du logo, en lumière */}
          <div aria-hidden="true" className="absolute -top-32 -right-24 -z-10 size-[26rem] rounded-full bg-gradient-to-br from-sun-300/50 via-sun-400/20 to-transparent blur-2xl" />
          <svg aria-hidden="true" className="absolute right-0 bottom-0 -z-10 h-full w-2/3 opacity-30" viewBox="0 0 600 400" preserveAspectRatio="none">
            <path d="M0 330C150 260 260 300 380 240S560 120 600 130" fill="none" stroke="#5bbbe8" strokeWidth="2" />
            <path d="M0 370C170 300 280 340 400 280S570 170 600 180" fill="none" stroke="#93ca76" strokeWidth="2" />
          </svg>

          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-sun-300 uppercase">
                Simulateur d&apos;aides
              </p>
              <h2 id="simulateur-cta-title" className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                Combien pourriez-vous recevoir pour votre projet ?
              </h2>
              <p className="mt-5 max-w-xl text-lg text-brand-100/85">
                Cinq questions pour une première estimation de MaPrimeRénov&apos;, des primes CEE et de
                votre reste à charge. Indicatif, sans engagement.
              </p>
              {/* Atout « gestion administrative de A à Z » */}
              <p className="mt-7 flex max-w-xl items-center gap-4 rounded-2xl bg-white/[0.08] p-4 ring-1 ring-white/15">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sun-400 text-brand-950">
                  <PromiseIcon name="admin" className="size-6" />
                </span>
                <span className="text-[0.98rem] leading-snug text-white">
                  <span className="block font-display text-lg font-semibold">Les dossiers d&apos;aides ? On s&apos;en charge.</span>
                  <span className="text-brand-100/80">Constitution, dépôt et suivi : de A à Z, sans paperasse pour vous.</span>
                </span>
              </p>
              <ButtonLink href={ctas.simulator.href} variant="light" size="lg" className="mt-8" icon={<ArrowIcon />}>
                Commencer l&apos;estimation
              </ButtonLink>
            </div>

            <ol className="space-y-2.5 lg:col-span-5">
              {steps.map((label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.07] px-5 py-4 text-white ring-1 ring-white/10 backdrop-blur-sm"
                  style={{ marginLeft: `${Math.min(i, 3) * 0.75}rem` }}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                      i === steps.length - 1 ? "bg-sun-400 text-brand-950" : "bg-white/10 text-brand-100"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
