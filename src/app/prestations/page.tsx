import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Prestations de rénovation énergétique : pompe à chaleur, isolation, solaire",
  description:
    "Pompe à chaleur air/eau, isolation des combles, isolation par l'extérieur, système solaire combiné, ballon thermodynamique et panneaux photovoltaïques : les prestations de Maîtrise RGE.",
  alternates: { canonical: "/prestations" },
  openGraph: { url: "/prestations" },
};

// Disposition « bento » : tuiles larges et hautes en alternance sur grand écran.
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function PrestationsPage() {
  return (
    <div className="pb-20 sm:pb-28">
      <Container>
        <header className="grid gap-6 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-7">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Nos prestations</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
              Toute la rénovation énergétique, <span className="text-brand-700">sous un même toit</span>.
            </h1>
          </div>
          <p className="text-lg text-ink-soft lg:col-span-5">
            Chauffage, isolation, solaire, eau chaude : découvrez chaque solution en détail, puis
            estimez les aides auxquelles votre projet peut prétendre.
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-12">
          {services.map((s, i) => (
            <li key={s.id} className={cn("min-h-[19rem] sm:min-h-[21rem] lg:min-h-0", spans[i])}>
              <Link
                href={`/prestations/${s.id}`}
                className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[2rem] p-6 sm:p-8"
              >
                <Image
                  src={s.photo.src}
                  alt=""
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 94vw" : "(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 94vw"}
                  className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/0" />
                <span className="absolute top-6 left-6 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-ink backdrop-blur sm:top-8 sm:left-8">
                  {s.number} · {s.kicker}
                </span>
                <h2 className={cn("font-semibold text-white", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>{s.title}</h2>
                {i === 0 && <p className="mt-3 max-w-lg text-brand-50/85">{s.summary}</p>}
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-white">
                  Découvrir
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <aside className="mt-16 flex flex-col items-start gap-6 rounded-[2rem] bg-brand-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-display text-2xl font-semibold">Vous hésitez entre plusieurs solutions ?</p>
            <p className="mt-2 text-brand-100/80">Estimez vos aides ou décrivez-nous votre logement : nous vous orientons.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/simulateur" variant="light" icon={<ArrowIcon />}>
              Estimer mes aides
            </ButtonLink>
            <ButtonLink href="/#contact" className="bg-transparent text-white shadow-none ring-1 ring-white/30 ring-inset hover:bg-white/10">
              Demander un devis
            </ButtonLink>
          </div>
        </aside>
      </Container>
    </div>
  );
}
