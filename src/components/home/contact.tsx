import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/layout";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import { PromiseIcon } from "./promise-icon";

export function Contact({
  defaultWork,
  title = "Parlons de votre projet.",
  intro = "Décrivez-nous votre logement et vos travaux. Nous revenons vers vous pour approfondir et préparer une visite si nécessaire.",
}: {
  defaultWork?: string;
  title?: string;
  intro?: string;
}) {
  const { phoneDisplay, phoneE164, email, openingHours } = site.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-paper py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-lift ring-1 ring-line lg:grid lg:grid-cols-12">
          {/* Panneau d'introduction illustré */}
          <div className="relative isolate flex flex-col justify-between gap-10 overflow-hidden bg-brand-800 p-8 text-white sm:p-12 lg:col-span-5">
            <Image
              src={photos.pacGarden.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="-z-20 object-cover opacity-30 mix-blend-luminosity"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900/95 via-brand-800/85 to-brand-700/70" />

            <div>
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-sun-300 uppercase">
                Contact &amp; devis
              </p>
              <h2 id="contact-title" className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-sm text-lg text-brand-50/85">{intro}</p>
            </div>

            <dl className="grid gap-5 text-[0.98rem]">
              {/* Atout « un seul interlocuteur » */}
              <div className="grid grid-cols-[3rem_1fr] items-center gap-x-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm">
                <dt className="contents">
                  <span className="row-span-2 flex size-12 items-center justify-center rounded-full bg-sun-400 text-brand-950">
                    <PromiseIcon name="contact" className="size-6" />
                  </span>
                  <span className="font-display text-lg font-semibold text-white">Un conseiller dédié</span>
                </dt>
                <dd className="text-brand-50/85">La même personne vous suit du premier appel à la mise en service.</dd>
              </div>
              {phoneDisplay && phoneE164 && (
                <div>
                  <dt className="text-sm font-semibold tracking-wide text-brand-200 uppercase">Téléphone</dt>
                  <dd className="mt-1.5">
                    <a href={`tel:${phoneE164}`} className="font-display text-2xl font-semibold text-white">
                      {phoneDisplay}
                    </a>
                    {openingHours && <span className="block text-brand-100/75">{openingHours}</span>}
                  </dd>
                </div>
              )}
              {email && (
                <div>
                  <dt className="text-sm font-semibold tracking-wide text-brand-200 uppercase">Email</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${email}`} className="font-semibold text-white underline underline-offset-4">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="p-6 sm:p-12 lg:col-span-7">
            <ContactForm defaultWork={defaultWork} />
          </div>
        </div>
      </Container>
    </section>
  );
}
