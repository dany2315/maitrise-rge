import type { Metadata } from "next";
import { ConsentPreferencesButton } from "@/components/consent/consent-manager";
import { LegalPage } from "@/components/legal/legal-page";
import { consentCategories } from "@/config/consent";

export const metadata: Metadata = {
  title: "Cookies et traceurs",
  description: "Les cookies et traceurs utilisés sur le site Maîtrise RGE et la gestion de vos préférences.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  const hasTrackers = consentCategories.length > 0;

  return (
    <LegalPage
      title="Cookies et traceurs"
      intro="Ce que ce site dépose ou lit dans votre navigateur, et comment gérer vos préférences."
      current="/cookies"
    >
      <section>
        <h2>Traceurs soumis à votre consentement</h2>
        {hasTrackers ? (
          <>
            <p>Avec votre accord, les traceurs suivants peuvent être utilisés :</p>
            <ul>
              {consentCategories.map((c) => (
                <li key={c.id}>
                  <strong>{c.label}</strong> : {c.description} ({c.vendors.join(", ")})
                </li>
              ))}
            </ul>
            <p>Vous pouvez accepter, refuser ou modifier vos choix à tout moment :</p>
            <div className="not-prose mt-5">
              <ConsentPreferencesButton />
            </div>
          </>
        ) : (
          <p>
            <strong>Ce site n&apos;utilise aucun cookie ni traceur nécessitant votre consentement</strong>{" "}
            : pas de mesure d&apos;audience, pas de publicité, pas de réseau social intégré. C&apos;est
            pourquoi aucun bandeau de consentement ne vous est présenté. Si cela devait changer, votre
            accord serait demandé au préalable et vous pourriez le modifier depuis cette page.
          </p>
        )}
      </section>

      <section>
        <h2>Stockage strictement nécessaire</h2>
        <p>
          Le simulateur conserve vos réponses dans le stockage de session de votre navigateur
          (sessionStorage) pour que vous puissiez revenir en arrière ou recharger la page sans tout
          ressaisir. Ces données ne quittent pas votre appareil tant que vous n&apos;envoyez pas de
          demande de devis, et sont effacées à la fermeture de l&apos;onglet. Ce stockage, nécessaire
          au service que vous demandez, n&apos;est pas soumis au consentement.
        </p>
      </section>

      <section>
        <h2>Contenus tiers</h2>
        <p>
          Les polices de caractères et les images sont servies par le site lui-même : votre navigateur
          ne contacte pas de service tiers pour les afficher.
        </p>
      </section>
    </LegalPage>
  );
}
