import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { approachSteps } from "@/content/home";
import { photos } from "@/content/photos";

export function Approach() {
  return (
    <section
      id="accompagnement"
      aria-labelledby="accompagnement-title"
      className="relative overflow-hidden bg-paper-deep py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-sky-700 uppercase">
              Accompagnement
            </p>
            <h2 id="accompagnement-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
              Un projet clair, <span className="text-brand-700">de la première question</span> à la mise
              en service.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Rénover suppose des choix techniques et des démarches précises. Nous vous expliquons chaque
              étape pour que vous décidiez en connaissance de cause.
            </p>
          </div>

          {/* Duo de photos décalées */}
          <div className="relative h-72 sm:h-80 lg:col-span-6 lg:h-96">
            <div className="absolute top-0 right-0 h-[82%] w-[72%] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={photos.solarInstall.src}
                alt={photos.solarInstall.alt}
                fill
                sizes="(min-width: 1024px) 34vw, 70vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 h-[58%] w-[46%] overflow-hidden rounded-[1.5rem] shadow-lift ring-6 ring-paper-deep">
              <Image
                src={photos.atticFloor.src}
                alt={photos.atticFloor.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-0 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* Tracé reliant les étapes (horizontal sur grand écran) */}
          <svg
            aria-hidden="true"
            className="absolute top-7 left-0 hidden h-6 w-full lg:block"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
          >
            <path
              d="M40 12C200 -4 300 28 500 12s300-16 460 0"
              fill="none"
              stroke="#93ca76"
              strokeWidth="2"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {approachSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 90}
              className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
            >
              {/* Tracé vertical (mobile et tablette) */}
              {i < approachSteps.length - 1 && (
                <span aria-hidden="true" className="absolute top-14 bottom-0 left-7 w-px bg-brand-300 lg:hidden" />
              )}
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-white font-display text-lg font-semibold text-brand-800 shadow-soft ring-1 ring-brand-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 lg:pt-6">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
