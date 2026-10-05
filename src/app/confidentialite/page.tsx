import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Value } from "@/components/legal/legal-page";
import { legal } from "@/config/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Maîtrise RGE traite les données transmises via le simulateur et le formulaire de contact, et comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  const { company: c, privacy, host } = legal;

  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Cette page explique quelles données nous recueillons via ce site, pourquoi, combien de temps nous les conservons et comment exercer vos droits."
      current="/confidentialite"
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <Value>{c.name}</Value>, <Value>{c.address}</Value>. Contact pour toute question relative à
          vos données : <Value>{privacy.contact}</Value>.
        </p>
      </section>

      <section>
        <h2>Données recueillies</h2>
        <p>Nous recueillons uniquement les informations que vous saisissez dans nos formulaires :</p>
        <ul>
          <li>
            <strong>Demande de devis après simulation</strong> : prénom, nom, téléphone, code postal,
            email, type de logement, travaux envisagés, ainsi que vos réponses au simulateur
            (chauffage actuel, région, nombre de personnes du foyer, catégorie de revenus) et le
            résultat estimatif lorsqu&apos;il est disponible.
          </li>
          <li>
            <strong>Formulaire de contact</strong> : prénom, nom, téléphone, code postal, email, type
            de logement, travaux envisagés et votre message.
          </li>
          <li>La date de la demande et sa provenance (simulateur ou contact).</li>
        </ul>
        <p>
          Le simulateur ne demande pas le montant exact de vos revenus, seulement la catégorie dont
          relève votre foyer. Tant que vous n&apos;envoyez pas de demande de devis, vos réponses
          restent dans votre navigateur.
        </p>
      </section>

      <section>
        <h2>Finalités et base légale</h2>
        <p>
          Ces données servent à répondre à votre demande : vous recontacter, étudier votre projet et
          établir un devis. Le traitement repose sur votre demande (mesures précontractuelles) et sur
          votre accord explicite pour être recontacté, recueilli par la case à cocher du formulaire.
          Elles ne sont ni vendues ni utilisées pour de la publicité.
        </p>
      </section>

      <section>
        <h2>Destinataires et sous-traitants</h2>
        <ul>
          <li>Les équipes de Maîtrise RGE chargées de traiter votre demande.</li>
          <li>
            Google, qui fournit le service Google Sheets dans lequel les demandes sont enregistrées,
            en qualité de sous-traitant.
          </li>
          <li>
            L&apos;hébergeur du site : <Value>{host.name}</Value>.
          </li>
        </ul>
        <p>
          Certains de ces prestataires peuvent traiter des données hors de l&apos;Union européenne.
          Les garanties encadrant ces transferts : <Value>{null}</Value>.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>{privacy.retention}</p>
      </section>

      <section>
        <h2>Sécurité et protection contre les abus</h2>
        <p>
          Les formulaires sont transmis de manière chiffrée (HTTPS) et les identifiants d&apos;accès au
          tableur restent sur le serveur. Pour limiter les envois automatisés, nous utilisons des
          contrôles techniques sans cookie ; votre adresse IP n&apos;est pas enregistrée dans le tableur et
          n&apos;est conservée que temporairement, en mémoire, pour limiter les envois répétés.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de
          définir des directives sur leur sort après votre décès. Vous pouvez retirer votre accord à
          tout moment.
        </p>
        <p>
          Pour exercer ces droits, écrivez à : <Value>{privacy.contact}</Value>. Si vous estimez que
          vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la{" "}
          <a href="https://www.cnil.fr">CNIL</a>.
        </p>
      </section>

      <section>
        <h2>Cookies et traceurs</h2>
        <p>
          Voir la page <Link href="/cookies">cookies</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
