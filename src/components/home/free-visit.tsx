import Image from "next/image";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { photos } from "@/content/photos";

/** Atout « pré-visite & diagnostic gratuits », mis en scène seul. */
export function FreeVisit() {
  return (
    <section aria-labelledby="pre-visite-title" className="bg-white pb-20 sm:pb-28">
      <Container>
        <div className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-brand-950 lg:grid-cols-12">
          <div className="relative min-h-72 sm:min-h-96 lg:col-span-6 lg:min-h-[32rem]">
            <Image src={photos.attic.src} alt={photos.attic.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-brand-950/10 lg:to-brand-950" />
            {/* Tampon « offert » */}
            <span className="absolute top-6 left-6 flex size-24 -rotate-12 flex-col items-center justify-center rounded-full bg-sun-400 text-center font-display leading-none text-brand-950 shadow-lift ring-4 ring-sun-300/60 sm:size-28">
              <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase">Pré-visite</span>
              <span className="mt-1 text-2xl font-bold sm:text-[1.7rem]">Offerte</span>
            </span>
          </div>

          <div className="relative flex flex-col justify-center p-8 text-white sm:p-12 lg:col-span-6 lg:p-14">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-sun-300 uppercase">Pour bien commencer</p>
            <h2 id="pre-visite-title" className="mt-4 text-4xl leading-[1.08] font-semibold text-white sm:text-5xl">
              Avant tout devis, nous venons chez vous. <span className="text-sun-300">Gratuitement.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-100/85">
              Un technicien inspecte votre logement : isolation, chauffage en place, radiateurs,
              emplacement des futurs équipements. Vous repartez avec un diagnostic clair, sans frais et
              sans engagement.
            </p>
            <ul className="mt-7 grid gap-3 text-[0.98rem] text-white/90 sm:grid-cols-2">
              {["Visite à domicile", "Diagnostic du logement", "Conseils personnalisés", "Aucun engagement"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sun-400 text-brand-950">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none">
                      <path d="m3.5 8.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/#contact" variant="light" size="lg" className="mt-9 w-full sm:w-auto sm:self-start" icon={<ArrowIcon />}>
              Réserver ma pré-visite gratuite
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
