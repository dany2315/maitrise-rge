import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, ReviewBadge } from "@/components/ui/layout";
import { articles } from "@/content/articles";
import { isReviewMode } from "@/lib/env";

export const metadata: Metadata = {
  title: "Conseils rénovation énergétique",
  description:
    "Pompe à chaleur, isolation, solaire, MaPrimeRénov' et CEE : des conseils clairs pour préparer votre projet de rénovation énergétique.",
  alternates: { canonical: "/conseils" },
  openGraph: { url: "/conseils" },
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(iso));

export default function ConseilsPage() {
  const reviewMode = isReviewMode();

  return (
    <div className="pb-20 sm:pb-28">
      <Container>
        <header className="grid gap-8 border-b border-line pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="lg:col-span-7">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
              Conseils
            </p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl">
              Bien comprendre pour <span className="text-brand-700">bien rénover</span>.
            </h1>
          </div>
          <p className="text-lg text-ink-soft lg:col-span-5">
            Fonctionnement des équipements, ordre des travaux, aides disponibles : nos articles vous
            aident à préparer votre projet et à poser les bonnes questions.
          </p>
        </header>

        <ol className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {articles.map((a, i) => (
            <li key={a.slug} className={i === 0 ? "md:col-span-2" : undefined}>
              <article className={i === 0 ? "group grid gap-8 lg:grid-cols-12 lg:items-center" : "group"}>
                <Link
                  href={`/conseils/${a.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`relative block overflow-hidden rounded-[2rem] ${i === 0 ? "aspect-[16/10] lg:col-span-7" : "aspect-[16/10]"}`}
                >
                  <Image
                    src={a.photo.src}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 56vw, 92vw" : "(min-width: 768px) 45vw, 92vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-ink backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
                <div className={i === 0 ? "lg:col-span-5" : "mt-6"}>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-brand-700">
                    {a.category}
                    <span aria-hidden="true" className="text-line">
                      ●
                    </span>
                    <span className="font-medium text-muted">{a.readingMinutes} min de lecture</span>
                    {reviewMode && a.status === "a-valider" && <ReviewBadge>À valider</ReviewBadge>}
                  </p>
                  <h2 className={`mt-3 font-semibold ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                    <Link href={`/conseils/${a.slug}`} className="transition hover:text-brand-800">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-soft">{a.description}</p>
                  <p className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
                    <span>Mis à jour le {formatDate(a.updatedAt)}</span>
                    <Link
                      href={`/conseils/${a.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-800"
                    >
                      Lire<span className="sr-only"> : {a.title}</span>
                      <ArrowIcon />
                    </Link>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <aside className="mt-20 flex flex-col items-start gap-6 rounded-[2rem] bg-brand-50 p-8 ring-1 ring-brand-100 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-display text-2xl font-semibold">Une question sur votre projet ?</p>
            <p className="mt-2 text-ink-soft">Faites une première estimation ou écrivez-nous.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/simulateur" icon={<ArrowIcon />}>
              Estimer mes aides
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Demander un devis
            </ButtonLink>
          </div>
        </aside>
      </Container>
    </div>
  );
}
