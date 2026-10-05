import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas } from "@/config/site";
import { photos } from "@/content/photos";
import { heatingOptions } from "@/lib/simulator/options";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-18 overflow-hidden pt-18 sm:-mt-20 sm:pt-20">
      {/* Fond : vague verte → bleue inspirée du logo */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full text-brand-100"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#dcefd2" />
            <stop offset="0.65" stopColor="#e7f3dd" />
            <stop offset="1" stopColor="#d6ecfa" />
          </linearGradient>
        </defs>
        <path d="M0 180C240 90 470 70 720 150s520 120 720 10V400H0Z" fill="url(#hero-wave)" />
        <path d="M0 250c260-70 520-60 760 0s460 60 680-20" fill="none" stroke="#bde0aa" strokeWidth="1.5" />
      </svg>

      <Container className="relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-brand-800 shadow-soft ring-1 ring-brand-100">
            <span className="rounded-full bg-brand-700 px-2.5 py-0.5 text-xs tracking-wide text-white uppercase">
              Particuliers
            </span>
            Rénovation énergétique durable
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-rise text-[2.6rem] leading-[1.04] font-semibold [animation-delay:80ms] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            Rénover votre maison,{" "}
            <span className="relative whitespace-nowrap text-brand-700">
              maîtriser
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-2 left-0 h-3 w-full text-sun-400"
                preserveAspectRatio="none"
              >
                <path d="M3 13C70 4 180 2 297 9" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            votre énergie.
          </h1>

          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:160ms] sm:text-xl">
            Pompes à chaleur, isolation, solaire et eau chaude : Maîtrise RGE étudie votre logement
            et vous aide à y voir clair sur les aides MaPrimeRénov&apos; et CEE.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href={ctas.simulator.href} size="lg" icon={<ArrowIcon />}>
              {ctas.simulator.label}
            </ButtonLink>
            <ButtonLink href={ctas.quote.href} size="lg" variant="secondary">
              {ctas.quote.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid animate-rise gap-x-8 gap-y-3 text-[0.95rem] text-ink-soft [animation-delay:320ms] sm:grid-cols-2">
            {[
              "Estimation indicative en 5 étapes",
              "Aides publiques et remise présentées séparément",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-brand-600" fill="none">
                  <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
                  <path d="m6.5 10.2 2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 lg:pl-6 xl:pl-10">
          {/* Photo en forme d'arche, clin d'œil au toit du logo */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-[2rem] shadow-lift ring-1 ring-black/5 sm:max-w-lg lg:max-w-none">
            <Image
              src={photos.heroHouse.src}
              alt={photos.heroHouse.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 512px, 92vw"
              quality={80}
              className="object-cover object-[60%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent" />
          </div>

          {/* Mini-simulateur : chaque choix ouvre le parcours pré-rempli */}
          <div className="relative z-10 mx-auto -mt-24 w-[calc(100%-1.5rem)] max-w-sm rounded-3xl bg-white/95 p-5 shadow-lift ring-1 ring-black/5 backdrop-blur sm:p-6 lg:absolute lg:bottom-10 lg:-left-10 lg:mt-0 lg:w-80 xl:-left-16">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-700">Étape 1 sur 5</p>
              <div aria-hidden="true" className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`h-1.5 rounded-full ${i === 0 ? "w-6 bg-brand-600" : "w-2.5 bg-brand-100"}`} />
                ))}
              </div>
            </div>
            <p className="mt-3 font-display text-xl leading-snug font-semibold">
              Comment chauffez-vous votre logement ?
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {heatingOptions.map((o) => (
                <li key={o.value}>
                  <Link
                    href={`/simulateur?chauffage=${o.value}`}
                    className="flex min-h-12 items-center justify-center rounded-2xl bg-paper px-3 text-center text-[0.95rem] font-semibold text-ink ring-1 ring-line transition hover:bg-brand-50 hover:ring-brand-300"
                  >
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pastille soleil / flocon */}
          <div
            aria-hidden="true"
            className="absolute top-8 -right-2 hidden size-24 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-black/5 sm:flex lg:-right-4"
          >
            <svg viewBox="0 0 48 48" className="size-12">
              <circle cx="20" cy="24" r="9" fill="#f7b928" />
              <path d="M20 9v4M20 35v4M5 24h4M8.5 12.5l2.8 2.8M8.5 35.5l2.8-2.8" stroke="#f08a1c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M30 14c6 4 6 16 0 20" fill="none" stroke="#2a93d5" strokeWidth="3" strokeLinecap="round" />
              <path d="M36 12c8 6 8 18 0 24" fill="none" stroke="#5bbbe8" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
