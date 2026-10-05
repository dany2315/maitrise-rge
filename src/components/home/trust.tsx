import { Container, ReviewBadge } from "@/components/ui/layout";
import { isPubliclyVisible, trustItems, type TrustItem } from "@/config/trust";

const kindLabel: Record<TrustItem["kind"], string> = {
  qualification: "Qualification",
  dispositif: "Dispositif d'aide",
  marque: "Marque",
};

const principles = [
  {
    title: "Aides et remise jamais confondues",
    text: "Les aides publiques estimées et une éventuelle remise commerciale sont toujours présentées sur des lignes distinctes.",
    icon: (
      <path d="M5 8h14M5 12h14M5 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    ),
    tone: "bg-brand-50 text-brand-700",
  },
  {
    title: "Des qualifications vérifiables",
    text: "Une qualification RGE se vérifie dans l'annuaire officiel de France Rénov', domaine de travaux par domaine.",
    icon: (
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    tone: "bg-sky-50 text-sky-700",
  },
  {
    title: "Une estimation, pas une promesse",
    text: "Le simulateur donne un ordre de grandeur. Le montant des aides est confirmé par l'étude et par les organismes qui les attribuent.",
    icon: (
      <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    ),
    tone: "bg-sun-50 text-sun-800",
  },
];

export function Trust({ reviewMode }: { reviewMode: boolean }) {
  const visible = trustItems.filter((item) => isPubliclyVisible(item) || reviewMode);

  return (
    <section id="qualifications" aria-labelledby="qualifications-title" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
            Qualifications &amp; transparence
          </p>
          <h2 id="qualifications-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
            Ce que nous affichons, nous pouvons le justifier.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Qualifications, dispositifs et marques ne figurent ici qu&apos;avec un justificatif à
            l&apos;appui.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="rounded-[1.75rem] bg-paper p-7 ring-1 ring-line sm:p-8">
              <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${p.tone}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
                  {p.icon}
                </svg>
              </span>
              <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>

        {visible.length > 0 && (
          <div className="mt-14">
            {reviewMode && (
              <p className="mb-5 rounded-2xl bg-sun-50 px-5 py-4 text-[0.95rem] text-sun-800 ring-1 ring-sun-300">
                Mode revue : les éléments marqués « À confirmer » sont masqués en production tant
                qu&apos;un justificatif n&apos;est pas renseigné dans <code>src/config/trust.ts</code>.
              </p>
            )}
            <ul className="grid gap-px overflow-hidden rounded-[1.75rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <li key={item.id} className="flex flex-col bg-white p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-muted">{kindLabel[item.kind]}</span>
                    {!isPubliclyVisible(item) && <ReviewBadge />}
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold">{item.name}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.description}</p>
                  {item.verifyUrl && isPubliclyVisible(item) && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-800 underline underline-offset-4"
                    >
                      Vérifier dans l&apos;annuaire officiel
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-[0.95rem] text-muted">
          Avant de signer avec une entreprise, quelle qu&apos;elle soit, vérifiez sa qualification dans
          l&apos;{" "}
          <a
            href="https://france-renov.gouv.fr/annuaires-professionnels/artisan-rge-architectes"
            target="_blank"
            rel="noopener"
            className="font-semibold text-brand-800 underline underline-offset-4"
          >
            annuaire des professionnels RGE
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
