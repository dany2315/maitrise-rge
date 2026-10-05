import Link from "next/link";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ctas, franceRenov, legalNav, site } from "@/config/site";
import { photoCredits } from "@/content/photos";
import { services } from "@/content/services";
import { Logo } from "./logo";

export function Footer() {
  const { phoneDisplay, phoneE164, email, address, serviceArea, openingHours } = site.contact;
  const hasContact = Boolean(phoneDisplay || email || address || serviceArea);

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      {/* Halo discret reprenant le soleil et le flocon du logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[28rem] rounded-full bg-sun-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-sky-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between lg:py-16">
          <div className="max-w-xl">
            <p className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Votre confort au service d&apos;un avenir{" "}
              <span className="text-brand-300">plus vert</span>.
            </p>
            <p className="mt-4 text-brand-100/75">
              Une première estimation en quelques minutes, puis une étude de votre logement.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctas.simulator.href} variant="light" size="lg" icon={<ArrowIcon />}>
              {ctas.simulator.label}
            </ButtonLink>
            <ButtonLink
              href={ctas.quote.href}
              size="lg"
              className="bg-transparent text-white shadow-none ring-1 ring-white/30 ring-inset hover:bg-white/10"
            >
              {ctas.quote.label}
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-brand-100/70">
              Rénovation énergétique pour les particuliers : chauffage, isolation, solaire et eau
              chaude.
            </p>
          </div>

          <nav aria-label="Prestations" className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Prestations
            </h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/prestations/${s.id}`}
                    className="inline-flex min-h-10 items-center text-[0.95rem] text-brand-100/80 transition hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ressources" className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Ressources
            </h2>
            <ul className="mt-4 space-y-1">
              {[
                { href: "/simulateur", label: "Simulateur d'aides" },
                { href: "/conseils", label: "Conseils" },
                { href: "/#faq", label: "Questions fréquentes" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-10 items-center text-[0.95rem] text-brand-100/80 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Nous joindre
            </h2>
            {hasContact ? (
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                {phoneDisplay && phoneE164 && (
                  <li>
                    <a href={`tel:${phoneE164}`} className="font-semibold text-white hover:text-brand-200">
                      {phoneDisplay}
                    </a>
                    {openingHours && <span className="block text-brand-100/60">{openingHours}</span>}
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-brand-100/85 underline-offset-4 hover:text-white hover:underline">
                      {email}
                    </a>
                  </li>
                )}
                {address && <li className="text-brand-100/75">{address}</li>}
                {serviceArea && <li className="text-brand-100/75">Intervention : {serviceArea}</li>}
              </ul>
            ) : (
              <p className="mt-4 text-[0.95rem] text-brand-100/75">
                Écrivez-nous via le{" "}
                <Link href="/#contact" className="font-semibold text-white underline underline-offset-4">
                  formulaire de contact
                </Link>
                .
              </p>
            )}
            <p className="mt-6 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-brand-100/70 ring-1 ring-white/10">
              Conseil public et indépendant :{" "}
              <a href={franceRenov.url} className="font-semibold text-white underline underline-offset-4" rel="noopener" target="_blank">
                France Rénov&apos;
              </a>
              , {franceRenov.phoneDisplay} (service gratuit + prix d&apos;un appel).
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-brand-100/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Photos d&apos;illustration : {photoCredits.join(", ")} (Unsplash).
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
