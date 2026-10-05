import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { legalNav } from "@/config/site";
import { legal } from "@/config/legal";

/** Valeur légale ou mention explicite qu'elle reste à fournir. */
export function Value({ children }: { children: string | null | undefined }) {
  if (children) return <>{children}</>;
  return (
    <span className="rounded-md bg-sun-100 px-1.5 py-0.5 text-[0.95em] font-medium text-sun-800">
      À compléter
    </span>
  );
}

export function LegalPage({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro: ReactNode;
  current: string;
  children: ReactNode;
}) {
  return (
    <div className="pb-20 sm:pb-28">
      <div className="border-b border-line bg-white">
        <Container className="py-12 sm:py-16">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
            Informations légales
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{intro}</p>
          <p className="mt-4 text-sm text-muted">
            Dernière mise à jour :{" "}
            {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(legal.updatedAt))}
          </p>
        </Container>
      </div>
      <Container className="grid gap-12 pt-12 lg:grid-cols-12">
        <nav aria-label="Pages légales" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === current ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium text-ink-soft ring-1 ring-line transition hover:bg-white aria-[current=page]:bg-brand-700 aria-[current=page]:text-white aria-[current=page]:ring-brand-700 lg:w-full"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="prose-rge max-w-3xl lg:col-span-9 [&>section:first-child>h2]:mt-0">{children}</div>
      </Container>
    </div>
  );
}
