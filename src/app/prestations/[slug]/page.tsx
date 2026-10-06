import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/contact";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/config/site";
import { photos, type Photo } from "@/content/photos";
import { servicePages } from "@/content/service-pages";
import { getService, services, type Service } from "@/content/services";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/prestations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages[slug];
  const service = getService(slug);
  if (!page || !service) return {};
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/prestations/${slug}` },
    openGraph: {
      url: `/prestations/${slug}`,
      title: `${page.seoTitle} | Maîtrise RGE`,
      description: page.metaDescription,
      images: [{ url: `${service.photo.src}&w=1200&h=630&q=75`, width: 1200, height: 630, alt: service.photo.alt }],
    },
  };
}

const secondaryPhoto: Record<string, Photo> = {
  "pompe-a-chaleur-air-eau": photos.pacGarden,
  "isolation-des-combles": photos.atticFloor,
  "isolation-thermique-exterieure": photos.insulationWall,
  "systeme-solaire-combine": photos.solarHouse,
  "equipements-thermodynamiques": photos.pacGarden,
  "panneaux-photovoltaiques": photos.solarInstall,
};

const accent: Record<Service["accent"], { text: string; bg: string; soft: string; ring: string; block: string }> = {
  brand: { text: "text-brand-700", bg: "bg-brand-600", soft: "bg-brand-50", ring: "ring-brand-200", block: "bg-brand-200" },
  sky: { text: "text-sky-700", bg: "bg-sky-600", soft: "bg-sky-50", ring: "ring-sky-100", block: "bg-sky-100" },
  sun: { text: "text-sun-800", bg: "bg-sun-400", soft: "bg-sun-50", ring: "ring-sun-300", block: "bg-sun-100" },
};

export default async function ServicePage({ params }: PageProps<"/prestations/[slug]">) {
  const { slug } = await params;
  const page = servicePages[slug];
  const service = getService(slug);
  if (!page || !service) notFound();

  const tone = accent[service.accent];
  const simulatorHref = service.simulatorWork ? `/simulateur?travaux=${service.simulatorWork}` : null;
  const related = page.related.map(getService).filter((s) => s !== undefined);
  const second = secondaryPhoto[slug] ?? service.photo;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: page.metaDescription,
      url: `${site.url}/prestations/${slug}`,
      provider: { "@type": "HomeAndConstructionBusiness", name: site.name, url: site.url },
      ...(site.contact.serviceArea && { areaServed: site.contact.serviceArea }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Prestations", item: `${site.url}/prestations` },
        { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/prestations/${slug}` },
      ],
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="service-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-paper to-paper" />
        <Container className="pt-6 pb-16 sm:pt-8 lg:pb-24">
          <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-800">Accueil</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/prestations" className="hover:text-brand-800">Prestations</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">{service.title}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <p className={cn("inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold shadow-soft ring-1", tone.text, tone.ring)}>
                <span className="font-display tabular-nums">{service.number}</span>
                <span aria-hidden="true" className="h-3.5 w-px bg-current opacity-30" />
                {service.kicker}
              </p>
              <h1 id="service-title" className="mt-6 animate-rise text-[2.4rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.6rem]">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-ink-soft [animation-delay:100ms] sm:text-xl">
                {page.heroLead}
              </p>
              <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:180ms] sm:flex-row">
                {simulatorHref ? (
                  <ButtonLink href={simulatorHref} size="lg" icon={<ArrowIcon />}>
                    Estimer mes aides
                  </ButtonLink>
                ) : (
                  <ButtonLink href="#contact" size="lg" icon={<ArrowIcon />}>
                    Demander une étude
                  </ButtonLink>
                )}
                <ButtonLink href="#contact" size="lg" variant="secondary">
                  Demander un devis
                </ButtonLink>
              </div>
              <div className="mt-9 animate-rise [animation-delay:260ms]">
                <p className="text-sm font-semibold tracking-wide text-muted uppercase">Aides mobilisables</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {page.aids.map((a) => (
                    <li key={a.name} className="rounded-full bg-white px-3.5 py-2 text-sm ring-1 ring-line">
                      <span className="font-semibold text-ink">{a.name}</span>
                      <span className="text-muted"> · {a.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div aria-hidden="true" className={cn("absolute -top-4 -right-3 h-3/4 w-2/3 rotate-3 rounded-[2.5rem] sm:-right-5", tone.block)} />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5 sm:aspect-[5/4]">
                <Image
                  src={service.photo.src}
                  alt={service.photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 94vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
              <div className="relative mx-auto -mt-10 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white/95 p-5 shadow-lift ring-1 ring-black/5 backdrop-blur sm:absolute sm:bottom-6 sm:-left-6 sm:mt-0 sm:w-72">
                <p className="text-sm font-semibold text-brand-700">Bon à savoir</p>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{service.goodToKnow}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Bénéfices */}
      <section aria-labelledby="benefices-title" className="bg-white py-20 sm:py-24">
        <Container>
          <h2 id="benefices-title" className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            {page.benefits.length} bonnes raisons de passer à l&apos;action
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {page.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 90} className="relative overflow-hidden rounded-[1.75rem] bg-paper p-7 ring-1 ring-line sm:p-8">
                <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-1", tone.bg)} />
                <span className={cn("font-display text-5xl leading-none font-semibold", tone.text)}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Fonctionnement */}
      <section aria-labelledby="fonctionnement-title" className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-96 rounded-full bg-sun-400/15 blur-3xl" />
        <Container className="relative">
          <div className="max-w-2xl">
            <h2 id="fonctionnement-title" className="text-3xl font-semibold text-white sm:text-4xl">{page.how.title}</h2>
            <p className="mt-4 text-lg text-brand-100/80">{page.how.intro}</p>
          </div>
          <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
            {page.how.steps.map((step, i) => (
              <li key={step.title} className="relative">
                {i < page.how.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute top-7 left-16 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-brand-300/60 to-transparent md:block" />
                )}
                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-white/10 font-display text-xl font-semibold text-sun-300 ring-1 ring-white/15">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-brand-100/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 4. Variantes */}
      <section aria-labelledby="variantes-title" className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="variantes-title" className="text-3xl font-semibold sm:text-4xl">{page.variants.title}</h2>
            <p className="mt-4 text-lg text-muted">{page.variants.intro}</p>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {page.variants.items.map((v, i) => (
              <Reveal as="li" key={v.name} delay={i * 90} className="flex flex-col rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-line sm:p-8">
                <h3 className="font-display text-2xl font-semibold">{v.name}</h3>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{v.text}</p>
                <p className={cn("mt-6 rounded-2xl px-4 py-3 text-[0.95rem]", tone.soft)}>
                  <span className={cn("block text-xs font-semibold tracking-wide uppercase", tone.text)}>Idéal pour</span>
                  <span className="mt-0.5 block font-medium text-ink">{v.bestFor}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Compatibilité */}
      <section aria-labelledby="compatibilite-title" className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-[2rem] lg:order-first lg:col-span-5 lg:aspect-[4/5]">
            <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 40vw, 94vw" className="object-cover" />
          </div>
          <div className="lg:col-span-7">
            <h2 id="compatibilite-title" className="text-3xl font-semibold sm:text-4xl">{page.fit.title}</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {page.fit.items.map((item) => (
                <li key={item} className="flex gap-4 py-4">
                  <span className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-white", tone.bg)}>
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none">
                      <path d="m3.5 8.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.98rem] text-muted">
              Un doute sur l&apos;un de ces points ? C&apos;est précisément l&apos;objet de la visite technique.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. Aides */}
      <section aria-labelledby="aides-title" className="bg-white pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-10 overflow-hidden rounded-[2.5rem] bg-sky-50 p-7 ring-1 ring-sky-100 sm:p-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-display text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">Financement</p>
              <h2 id="aides-title" className="mt-3 text-3xl font-semibold sm:text-4xl">Les aides pour votre projet</h2>
              <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
                {page.aidsText.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <Link href="/conseils/aides-maprimerenov-cee" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-sky-700">
                Comprendre MaPrimeRénov&apos; et les CEE
                <ArrowIcon />
              </Link>
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-sky-100 lg:col-span-5">
              <div>
                <p className="font-display text-xl font-semibold">
                  {simulatorHref ? "Estimez vos aides en 5 étapes" : "Faites étudier votre projet"}
                </p>
                <p className="mt-2 text-[0.98rem] text-ink-soft">
                  {simulatorHref
                    ? "Chauffage, logement, travaux, revenus : une première estimation indicative, sans engagement."
                    : "Décrivez votre toiture et vos consommations : nous étudions la faisabilité et la production attendue."}
                </p>
              </div>
              <ButtonLink href={simulatorHref ?? "#contact"} size="lg" className="mt-7 w-full" icon={<ArrowIcon />}>
                {simulatorHref ? "Lancer le simulateur" : "Demander une étude"}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Déroulé */}
      <section aria-labelledby="deroule-title" className="bg-paper-deep py-20 sm:py-24">
        <Container>
          <h2 id="deroule-title" className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Votre projet, étape par étape
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="relative rounded-[1.5rem] bg-white p-6 ring-1 ring-line sm:p-7">
                <span className="flex items-center gap-3">
                  <span className={cn("flex size-10 items-center justify-center rounded-full font-display font-semibold text-white", tone.bg, service.accent === "sun" && "text-brand-950")}>
                    {i + 1}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 8. FAQ */}
      <section aria-labelledby="faq-service-title" className="bg-white py-20 sm:py-24">
        <Container className="max-w-4xl">
          <h2 id="faq-service-title" className="text-center text-3xl font-semibold sm:text-4xl">
            Vos questions sur {page.subject}
          </h2>
          <ul className="mt-10 space-y-3">
            {page.faq.map((f) => (
              <li key={f.q}>
                <details className="group rounded-2xl bg-paper ring-1 ring-line open:bg-white open:shadow-soft">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-display text-[1.08rem] font-semibold sm:px-7 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-brand-700 transition-transform group-open:rotate-180" fill="none">
                      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-ink-soft sm:px-7">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 9. Solutions complémentaires */}
      <section aria-labelledby="combiner-title" className="bg-white pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-4 border-t border-line pt-14 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="combiner-title" className="text-3xl font-semibold sm:text-4xl">À combiner avec</h2>
            <Link href="/prestations" className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-800">
              Toutes nos prestations
              <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/prestations/${r.id}`} className="group block overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line transition hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={r.photo.src} alt="" fill sizes="(min-width: 768px) 30vw, 94vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <p className="text-sm font-semibold text-muted">{r.kicker}</p>
                      <p className="mt-1 font-display text-xl font-semibold group-hover:text-brand-800">{r.title}</p>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line transition group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700">
                      <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 10. Contact */}
      <Contact
        defaultWork={service.quoteWork}
        title="Votre projet mérite une étude sérieuse."
        intro={`Parlez-nous de votre logement : nous revenons vers vous pour étudier votre projet et répondre à vos questions sur ${page.subject}.`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
