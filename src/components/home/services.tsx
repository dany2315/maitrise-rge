"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

const accentDot: Record<Service["accent"], string> = {
  brand: "bg-brand-500",
  sky: "bg-sky-500",
  sun: "bg-sun-400",
};

export function Services({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="prestations" aria-labelledby="prestations-title" className="relative bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* Colonne fixe : titre + photo de la prestation survolée */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Nos prestations
              </p>
              <h2 id="prestations-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
                Six métiers pour une maison plus sobre et plus confortable.
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted">
                Du chauffage à l&apos;isolation, chaque solution est proposée après avoir compris
                votre logement et vos usages.
              </p>

              <div className="relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-[2rem] bg-paper-deep lg:block">
                {services.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.photo.src}
                    alt={i === active ? s.photo.alt : ""}
                    fill
                    sizes="(min-width: 1280px) 520px, 40vw"
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-700 ease-out",
                      i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                    )}
                  />
                ))}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/90 px-5 py-3.5 backdrop-blur">
                  <span className="font-display text-lg font-semibold">{current.title}</span>
                  <span className="font-display text-sm font-semibold text-muted">{current.number} / 06</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des prestations */}
          <ol className="lg:col-span-7">
            {services.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                className={cn(
                  "group relative scroll-mt-28 border-t border-line py-9 transition-colors first:border-t-0 first:pt-0 lg:first:pt-2",
                )}
              >
                <div className="flex items-start gap-5 sm:gap-8">
                  <span
                    className={cn(
                      "font-display text-sm font-semibold tabular-nums transition-colors sm:pt-2 sm:text-base",
                      i === active ? "text-brand-700" : "text-muted/70",
                    )}
                  >
                    {s.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                      <span aria-hidden="true" className={cn("size-2 rounded-full", accentDot[s.accent])} />
                      {s.kicker}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold sm:text-[1.9rem]">{s.title}</h3>

                    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                      <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 640px) 80vw, 92vw" className="object-cover" />
                    </div>

                    <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{s.summary}</p>

                    <ul className="mt-5 grid gap-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.98rem] text-ink-soft">
                          <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-brand-600" fill="none">
                            <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 rounded-2xl bg-paper px-5 py-4 text-[0.95rem] leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">Bon à savoir · </span>
                      {s.goodToKnow}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {s.simulatorWork ? (
                        <Link
                          href={`/simulateur?travaux=${s.simulatorWork}`}
                          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-800 underline-offset-4 hover:underline"
                        >
                          Estimer les aides pour ce projet
                          <ArrowIcon />
                        </Link>
                      ) : (
                        <Link
                          href="/#contact"
                          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-800 underline-offset-4 hover:underline"
                        >
                          Parler de ce projet
                          <ArrowIcon />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
