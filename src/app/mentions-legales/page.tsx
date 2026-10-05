import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Value } from "@/components/legal/legal-page";
import { legal } from "@/config/legal";
import { photoCredits } from "@/content/photos";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Maîtrise RGE : éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const { company: c, host } = legal;

  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations relatives à l'éditeur et à l'hébergeur du site, conformément à la loi pour la confiance dans l'économie numérique."
      current="/mentions-legales"
    >
      <section>
        <h2>Éditeur du site</h2>
        <ul>
          <li>
            Raison sociale : <Value>{c.name}</Value>
          </li>
          <li>
            Forme juridique et capital : <Value>{c.legalForm}</Value> — <Value>{c.capital}</Value>
          </li>
          <li>
            Siège social : <Value>{c.address}</Value>
          </li>
          <li>
            Immatriculation : <Value>{c.rcs}</Value> — SIREN <Value>{c.siren}</Value>
          </li>
          <li>
            N° de TVA intracommunautaire : <Value>{c.vatNumber}</Value>
          </li>
          <li>
            Téléphone : <Value>{c.phone}</Value> — Email : <Value>{c.email}</Value>
          </li>
          <li>
            Directeur ou directrice de la publication : <Value>{c.publicationDirector}</Value>
          </li>
          <li>
            Assurance professionnelle : <Value>{c.insurance}</Value>
          </li>
        </ul>
      </section>

      <section>
        <h2>Hébergement</h2>
        <ul>
          <li>
            Hébergeur : <Value>{host.name}</Value>
          </li>
          <li>
            Adresse : <Value>{host.address}</Value>
          </li>
          <li>
            Contact : <Value>{host.contact}</Value>
          </li>
        </ul>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le logo, les textes et la mise en page de ce site sont la propriété de Maîtrise RGE ou
          utilisés avec autorisation. Toute reproduction sans accord préalable est interdite.
        </p>
        <p>
          Les photographies sont des illustrations issues de la plateforme Unsplash, utilisées
          conformément à sa licence ; elles ne représentent pas des chantiers réalisés par Maîtrise
          RGE. Crédits : {photoCredits.join(", ")}.
        </p>
      </section>

      <section>
        <h2>Simulateur et informations publiées</h2>
        <p>
          Les estimations du simulateur sont indicatives. Elles ne constituent ni une attribution
          d&apos;aides ni un devis. Les articles de l&apos;espace Conseils sont fournis à titre
          d&apos;information générale ; les conditions des aides publiques évoluent et doivent être
          vérifiées auprès des organismes compétents, notamment{" "}
          <a href="https://france-renov.gouv.fr">France Rénov&apos;</a>.
        </p>
      </section>

      <section>
        <h2>Données personnelles et cookies</h2>
        <p>
          Le traitement des données transmises via les formulaires est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>. L&apos;utilisation des
          traceurs est détaillée dans la page <Link href="/cookies">cookies</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
