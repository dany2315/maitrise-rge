import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import type { Article } from "@/content/articles";

export function ArticlesPreview({ articles }: { articles: Article[] }) {
  const [featured, ...others] = articles;
  if (!featured) return null;

  return (
    <section aria-labelledby="conseils-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
              Conseils
            </p>
            <h2 id="conseils-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
              Comprendre avant de décider.
            </h2>
          </div>
          <Link
            href="/conseils"
            className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand-800 underline-offset-4 hover:underline sm:self-auto"
          >
            Tous les conseils
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Link
            href={`/conseils/${featured.slug}`}
            className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] p-7 sm:min-h-[30rem] sm:p-10 lg:col-span-7"
          >
            <Image
              src={featured.photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 56vw, 92vw"
              className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/5" />
            <span className="self-start rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-brand-900">
              {featured.category}
            </span>
            <h3 className="mt-4 max-w-xl text-2xl font-semibold text-white sm:text-[2rem]">{featured.title}</h3>
            <p className="mt-3 max-w-xl text-brand-50/85">{featured.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">
              Lire l&apos;article · {featured.readingMinutes} min
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <ul className="flex flex-col divide-y divide-line lg:col-span-5">
            {others.map((a) => (
              <li key={a.slug} className="py-6 first:pt-0 last:pb-0">
                <Link href={`/conseils/${a.slug}`} className="group grid grid-cols-[6.5rem_1fr] gap-5 sm:grid-cols-[8rem_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={a.photo.src}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-700">
                      {a.category} · {a.readingMinutes} min
                    </p>
                    <h3 className="mt-1.5 text-lg leading-snug font-semibold group-hover:text-brand-800 sm:text-xl">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
