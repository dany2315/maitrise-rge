import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/articles/rich-text";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, ReviewBadge } from "@/components/ui/layout";
import { site } from "@/config/site";
import { articles, getArticle } from "@/content/articles";
import { isReviewMode } from "@/lib/env";
import { slugify } from "@/lib/slugify";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.description,
    alternates: { canonical: `/conseils/${article.slug}` },
    // Un article non validé par le client n'est pas indexé.
    robots: article.status === "publie" ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: `/conseils/${article.slug}`,
      title: article.seoTitle,
      description: article.description,
      modifiedTime: article.updatedAt,
    },
  };
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(iso));

export default async function ArticlePage({ params }: PageProps<"/conseils/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const reviewMode = isReviewMode();
  const related = article.related.map(getArticle).filter((a) => a !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    image: article.photo.src,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/brand/symbol.png` },
    mainEntityOfPage: `${site.url}/conseils/${article.slug}`,
  };

  return (
    <article className="pb-20 sm:pb-28">
      <Container>
        <nav aria-label="Fil d'Ariane" className="pt-8 text-sm text-muted sm:pt-10">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-800">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/conseils" className="hover:text-brand-800">
                Conseils
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-ink-soft">
              {article.category}
            </li>
          </ol>
        </nav>

        <header className="mx-auto max-w-4xl pt-8 text-center sm:pt-12">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-brand-700">
            {article.category}
            <span aria-hidden="true" className="text-line">
              ●
            </span>
            <span className="font-medium text-muted">{article.readingMinutes} min de lecture</span>
          </p>
          <h1 className="mt-5 text-[2.1rem] leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem]">
            {article.title}
          </h1>
          <p className="mt-5 text-sm text-muted">Mis à jour le {formatDate(article.updatedAt)}</p>
        </header>

        {reviewMode && article.status === "a-valider" && (
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-sun-50 p-5 ring-1 ring-sun-300">
            <ReviewBadge>Article à valider</ReviewBadge>
            <p className="mt-3 text-[0.95rem] text-sun-800">
              Non indexé tant qu&apos;il n&apos;est pas validé. Points à vérifier avant publication :
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] text-sun-800">
              {article.toCheck.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-6xl overflow-hidden rounded-[2rem] sm:mt-14 sm:aspect-[21/9]">
          <Image
            src={article.photo.src}
            alt={article.photo.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1152px, 94vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 sm:mt-16 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Sommaire" className="sticky top-28">
              <p className="font-display text-sm font-semibold tracking-[0.16em] text-muted uppercase">Sommaire</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {article.sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slugify(s.heading)}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] leading-snug text-ink-soft transition hover:border-brand-500 hover:text-brand-800"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <p className="font-display text-xl leading-relaxed font-medium text-ink sm:text-2xl sm:leading-relaxed">
              {article.lead}
            </p>
            <div className="prose-rge mt-4">
              {article.sections.map((s) => (
                <section key={s.heading} aria-labelledby={slugify(s.heading)}>
                  <h2 id={slugify(s.heading)} className="scroll-mt-28">
                    {s.heading}
                  </h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
            </div>

            <div className="mt-14 overflow-hidden rounded-[2rem] bg-brand-900 p-8 text-white sm:p-10">
              <p className="font-display text-2xl font-semibold sm:text-3xl">Et pour votre maison ?</p>
              <p className="mt-3 max-w-lg text-brand-100/85">
                Faites une première estimation des aides, ou décrivez-nous votre projet pour une étude
                personnalisée.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/simulateur" variant="light" icon={<ArrowIcon />}>
                  Estimer mes aides
                </ButtonLink>
                <ButtonLink
                  href="/#contact"
                  className="bg-transparent text-white shadow-none ring-1 ring-white/30 ring-inset hover:bg-white/10"
                >
                  Demander un devis
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mx-auto mt-20 max-w-6xl border-t border-line pt-12">
            <h2 id="related-title" className="text-2xl font-semibold sm:text-3xl">
              À lire aussi
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/conseils/${r.slug}`}
                    className="group flex h-full gap-5 rounded-[1.5rem] bg-white p-4 ring-1 ring-line transition hover:shadow-soft hover:ring-brand-200"
                  >
                    <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
                      <Image src={r.photo.src} alt="" fill sizes="112px" className="object-cover" />
                    </div>
                    <div className="py-1">
                      <p className="text-sm font-semibold text-brand-700">{r.category}</p>
                      <p className="mt-1 font-display text-lg leading-snug font-semibold group-hover:text-brand-800">
                        {r.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
