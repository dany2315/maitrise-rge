import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/content/company";
import { photos } from "@/content/photos";

const accents = ["from-brand-400 to-brand-600", "from-sky-500 to-sky-600", "from-sun-300 to-sun-400"];

export function About() {
  return (
    <section id="qui-sommes-nous" aria-labelledby="about-title" className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Filigrane : le symbole de la maison du logo, en trait */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 180"
        className="pointer-events-none absolute -top-16 -right-48 hidden w-[30rem] text-brand-100/70 xl:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M20 90 100 22l80 68M40 76v86h120V76M150 40V18h14v34" />
      </svg>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-3 font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
              {about.eyebrow}
            </p>
            <h2 id="about-title" className="mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.3rem]">
              Rendre la rénovation énergétique <span className="text-brand-700">simple</span>, lisible et{" "}
              <span className="relative inline-block">
                maîtrisée
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-sun-300/70" />
              </span>
              .
            </h2>
          </div>

          <div className="space-y-5 text-[1.08rem] leading-relaxed text-ink-soft lg:col-span-7 lg:pt-12">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-xl leading-relaxed font-medium text-ink sm:text-2xl" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
          {about.pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 100} className="relative sm:pr-6">
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className={`bg-gradient-to-br bg-clip-text font-display text-7xl leading-none font-semibold text-transparent ${accents[i]}`}>
                  {p.value}
                </span>
                <span className="mt-3 block max-w-xs text-[1.02rem] leading-snug text-ink-soft">{p.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="relative mt-16 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <div className="relative aspect-[4/5] sm:aspect-[21/9]">
            <Image
              src={photos.pacFacade.src}
              alt={photos.pacFacade.alt}
              fill
              sizes="(min-width: 1280px) 1216px, 94vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/25 to-transparent sm:bg-gradient-to-r sm:from-brand-950/85 sm:via-brand-950/40" />
          </div>
          <figure className="absolute inset-x-0 bottom-0 p-7 sm:inset-y-0 sm:right-auto sm:flex sm:max-w-xl sm:flex-col sm:justify-center sm:p-12">
            <blockquote className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              « Votre confort au service d&apos;un avenir <span className="text-brand-300">plus vert</span>. »
            </blockquote>
            <figcaption className="mt-4 text-brand-100/85">La conviction qui guide chacun de nos projets.</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
