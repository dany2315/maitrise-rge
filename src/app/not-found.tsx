import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Erreur 404</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">Cette page est introuvable.</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        Elle a peut-être été déplacée. Vous pouvez revenir à l&apos;accueil ou estimer directement vos
        aides.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/simulateur" variant="secondary" icon={<ArrowIcon />}>
          Estimer mes aides
        </ButtonLink>
      </div>
    </Container>
  );
}
