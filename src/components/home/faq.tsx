import { Container } from "@/components/ui/layout";
import { franceRenov } from "@/config/site";
import { faq } from "@/content/home";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
              Questions fréquentes
            </p>
            <h2 id="faq-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
              Les réponses, sans détour.
            </h2>
            <div className="mt-8 rounded-[1.75rem] bg-sky-50 p-6 ring-1 ring-sky-100">
              <p className="font-display text-lg font-semibold text-sky-700">Besoin d&apos;un avis public ?</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                France Rénov&apos;, le service public de la rénovation, conseille gratuitement les
                particuliers.
              </p>
              <a
                href={`tel:${franceRenov.phoneE164}`}
                className="mt-4 inline-flex min-h-11 items-center font-display text-xl font-semibold text-sky-700"
              >
                {franceRenov.phoneDisplay}
              </a>
              <p className="text-sm text-muted">Service gratuit + prix d&apos;un appel</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <li key={item.q}>
                <details className="group">
                  <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold text-ink transition hover:text-brand-800 sm:text-xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-line transition group-open:rotate-45 group-open:bg-brand-700 group-open:ring-brand-700"
                    >
                      <span className="absolute h-0.5 w-3.5 rounded-full bg-ink group-open:bg-white" />
                      <span className="absolute h-3.5 w-0.5 rounded-full bg-ink group-open:bg-white" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pr-14 pb-7 text-[1.02rem] leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
