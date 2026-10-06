import Image from "next/image";
import type { ReactNode } from "react";
import { ReviewBadge } from "@/components/ui/layout";
import { isPubliclyVisible, trustItems, type TrustItem } from "@/config/trust";

/**
 * Bandeau défilant des marques d'équipements et des dispositifs.
 * Chaque élément s'affiche avec son logo officiel (dossier public/brands) ;
 * à défaut de logo, une pastille typographique prend le relais.
 */
const labelStyle: Record<string, { short: string; detail: string; tone: string; icon: ReactNode }> = {
  rge: {
    short: "RGE",
    detail: "Reconnu Garant de l'Environnement",
    tone: "bg-brand-50 text-brand-800 ring-brand-200",
    icon: <path d="M12 3c4 2.5 6 5.6 6 9.2A6 6 0 0 1 12 18a6 6 0 0 1-6-5.8C6 8.6 8 5.5 12 3Zm0 15v3" />,
  },
  maprimerenov: {
    short: "MaPrimeRénov'",
    detail: "Aide de l'Anah",
    tone: "bg-sky-50 text-sky-700 ring-sky-100",
    icon: <path d="M4 11 12 4l8 7M6.5 9.5V20h11V9.5M10 20v-5h4v5" />,
  },
  cee: {
    short: "CEE",
    detail: "Certificats d'économies d'énergie",
    tone: "bg-sun-50 text-sun-800 ring-sun-300",
    icon: <path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z" />,
  },
};

function Item({ item }: { item: TrustItem }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo.src}
        alt={item.name}
        width={item.logo.width}
        height={item.logo.height}
        unoptimized={item.logo.src.endsWith(".svg")}
        sizes="200px"
        className={`${item.logo.tall ? "h-12 sm:h-14" : "h-8 sm:h-9"} w-auto transition duration-300 hover:scale-105`}
      />
    );
  }
  const style = labelStyle[item.id];
  if (!style) return null;
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 ring-1 ${style.tone}`}>
      <span className="flex size-7 items-center justify-center rounded-full bg-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {style.icon}
        </svg>
      </span>
      <span className="font-display text-[0.95rem] font-semibold whitespace-nowrap">{style.short}</span>
      <span className="hidden text-sm whitespace-nowrap opacity-75 md:inline">{style.detail}</span>
    </span>
  );
}

export function BrandsMarquee({ reviewMode }: { reviewMode: boolean }) {
  const brands = trustItems.filter((i) => i.kind === "marque" && (isPubliclyVisible(i) || reviewMode));
  const labels = trustItems.filter((i) => i.kind !== "marque" && (isPubliclyVisible(i) || reviewMode));
  // Alterne marques et labels pour un rythme visuel régulier.
  const items: TrustItem[] = [];
  for (let i = 0; i < Math.max(brands.length, labels.length); i++) {
    if (brands[i]) items.push(brands[i]);
    if (labels[i]) items.push(labels[i]);
  }
  if (items.length === 0) return null;
  const pending = items.some((i) => !isPubliclyVisible(i));

  return (
    <section aria-labelledby="marques-title" className="relative border-y border-line/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:py-7">
        <div className="flex shrink-0 items-center justify-between gap-3 lg:block lg:w-52">
          <h2 id="marques-title" className="font-display text-sm leading-snug font-semibold tracking-[0.12em] text-muted uppercase">
            Équipements de grandes marques <span className="text-brand-700">&amp; aides</span>
          </h2>
          {reviewMode && pending && (
            <span className="lg:mt-2 lg:block">
              <ReviewBadge>À confirmer</ReviewBadge>
            </span>
          )}
        </div>

        <div className="group/marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
          <div className="flex w-max animate-marquee items-center gap-12 group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-8">
            <ul className="flex shrink-0 items-center gap-12 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex shrink-0 items-center">
                  <Item item={item} />
                </li>
              ))}
            </ul>
            {/* Copie pour la boucle continue, ignorée par les lecteurs d'écran */}
            <ul aria-hidden="true" className="flex shrink-0 items-center gap-12 motion-reduce:hidden">
              {items.map((item) => (
                <li key={item.id} className="flex shrink-0 items-center">
                  <Item item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
