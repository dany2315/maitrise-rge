import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas } from "@/config/site";
import { promises } from "@/content/company";
import { photos } from "@/content/photos";
import { cn } from "@/lib/cn";
import { heatingOptions } from "@/lib/simulator/options";
import { GoogleRating } from "./google-rating";
import { PromiseIcon } from "./promise-icon";

export function Hero({ reviewMode }: { reviewMode: boolean }) {
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

      <Container className="relative grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6 lg:pt-6 lg:pb-16 xl:pt-8">
        <div className="order-1 lg:col-span-6">
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-brand-800 shadow-soft ring-1 ring-brand-100">
            <span className="rounded-full bg-brand-700 px-2.5 py-0.5 text-xs tracking-wide text-white uppercase">
              Particuliers
            </span>
            Rénovation énergétique durable
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-rise text-[2.6rem] leading-[1.04] font-semibold [animation-delay:80ms] sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem]"
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

          <p className="mt-7 max-w-xl animate-rise text-lg lg:mt-5 lg:max-w-[29rem] xl:max-w-xl leading-relaxed text-ink-soft [animation-delay:160ms] sm:text-xl">
            Pompes à chaleur, isolation, solaire et eau chaude : Maîtrise RGE étudie votre logement
            lors d&apos;une pré-visite gratuite, puis gère pour vous les aides MaPrimeRénov&apos; et
            CEE.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 lg:mt-7 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href={ctas.simulator.href} size="lg" icon={<ArrowIcon />}>
              {ctas.simulator.label}
            </ButtonLink>
            <ButtonLink href={ctas.quote.href} size="lg" variant="secondary">
              {ctas.quote.label}
            </ButtonLink>
          </div>

          <div className="mt-8 animate-rise [animation-delay:300ms] lg:mt-6">
            <GoogleRating reviewMode={reviewMode} />
          </div>

        </div>

        <div className="relative order-3 lg:order-2 lg:col-span-6 lg:pl-6 xl:pl-10">
          {/* Photo en forme d'arche, clin d'œil au toit du logo */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:aspect-[5/4] lg:rounded-t-[14rem] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] shadow-lift ring-1 ring-black/5 sm:max-w-lg lg:max-w-none">
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
          <div className="relative z-10 mx-auto -mt-24 w-[calc(100%-1.5rem)] max-w-sm rounded-3xl bg-white/95 p-5 shadow-lift ring-1 ring-black/5 backdrop-blur sm:p-6 lg:absolute lg:bottom-8 lg:-left-4 lg:mt-0 lg:w-80 xl:-left-10">
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

        {/* Les 5 atouts : sous les boutons sur mobile, en pleine largeur sur ordinateur */}
        <div className="order-2 -mt-4 animate-rise [animation-delay:320ms] lg:order-3 lg:col-span-12 lg:mt-0">
          <h2 className="sr-only">Les atouts Maîtrise RGE</h2>
          <ul className="grid overflow-hidden rounded-[1.75rem] bg-white/90 shadow-soft ring-1 ring-line backdrop-blur max-lg:divide-y max-lg:divide-line sm:grid-cols-2 lg:grid-cols-[1.05fr_0.85fr_0.95fr_1.2fr_0.95fr] lg:divide-x lg:divide-line">
            {promises.map((p, i) => (
              <li
                key={p.title}
                className={cn(
                  "flex items-center gap-3.5 px-5 py-3.5 sm:py-4 lg:gap-2.5 lg:px-3 lg:py-4 xl:gap-3 xl:px-5",
                  i === promises.length - 1 && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl lg:size-8 lg:rounded-lg xl:size-10 xl:rounded-xl",
                    i % 3 === 0 && "bg-brand-50 text-brand-700",
                    i % 3 === 1 && "bg-sky-50 text-sky-700",
                    i % 3 === 2 && "bg-sun-50 text-sun-800",
                  )}
                >
                  <PromiseIcon name={p.icon} />
                </span>
                <span className="text-[0.98rem] leading-snug font-semibold text-ink lg:text-[0.86rem] xl:text-[0.98rem]">{p.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
