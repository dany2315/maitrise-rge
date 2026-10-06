"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { ctas, primaryNav, site } from "@/config/site";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

export function Header({ logo }: { logo: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { phoneDisplay, phoneE164 } = site.contact;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = panel.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-white/90 shadow-[0_1px_0_rgb(19_32_43/0.06),0_10px_30px_-20px_rgb(19_32_43/0.3)] backdrop-blur-xl"
          : "bg-paper/0",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        {logo}

        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink-soft transition hover:bg-brand-50 hover:text-brand-900",
                    isActive(item.href) && "text-brand-800 after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-500",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {phoneDisplay && phoneE164 && (
            <a
              href={`tel:${phoneE164}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] font-semibold text-ink hover:bg-brand-50 2xl:inline-flex"
            >
              <PhoneIcon />
              {phoneDisplay}
            </a>
          )}
          <ButtonLink href={ctas.quote.href} variant="secondary" className="max-lg:hidden">
            {ctas.quote.label}
          </ButtonLink>
          <ButtonLink href={ctas.simulator.href} className="max-md:hidden" icon={<ArrowIcon />}>
            {ctas.simulator.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="relative inline-flex size-12 items-center justify-center rounded-full text-ink ring-1 ring-line ring-inset transition hover:bg-brand-50 xl:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute top-1.5 left-0 h-0.5 rounded-full bg-current transition-all duration-300",
                  open ? "w-0 opacity-0" : "w-3.5",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

    </header>

      {/* Panneau mobile et tablette : hors de l'en-tête, dont le flou d'arrière-plan
          créerait un bloc conteneur pour les éléments fixes. */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white sm:top-20 xl:hidden"
      >
        {/* Conçu pour tenir sur un seul écran de téléphone, boutons compris. */}
        <div className="mx-auto flex min-h-full max-w-2xl flex-col px-4 pt-3 pb-[max(env(safe-area-inset-bottom),1rem)] sm:px-6 sm:pt-6 [@media(max-height:640px)]:pt-1 [@media(max-height:640px)]:pb-[max(env(safe-area-inset-bottom),0.75rem)]">
          <nav aria-label="Navigation mobile">
            <ul className="divide-y divide-line">
              {primaryNav.map((item, i) => (
                <li key={item.href} style={{ animationDelay: `${i * 40}ms` }} className="animate-rise">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[3.25rem] items-center justify-between py-1.5 font-display text-[1.35rem] [@media(max-height:640px)]:min-h-11 [@media(max-height:640px)]:text-[1.15rem] font-semibold text-ink aria-[current=page]:text-brand-700 sm:min-h-16 sm:text-2xl"
                  >
                    {item.label}
                    <ArrowIcon className="size-5 text-brand-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 border-t border-line pt-4 sm:mt-7 [@media(max-height:640px)]:mt-2 [@media(max-height:640px)]:pt-2.5">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase [@media(max-height:640px)]:sr-only">Nos prestations</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2 [@media(max-height:640px)]:mt-0">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/prestations/${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center gap-2 rounded-xl bg-paper px-3 text-[0.9rem] font-semibold whitespace-nowrap text-ink ring-1 ring-line transition active:bg-brand-50 sm:min-h-13 sm:text-[0.95rem]"
                  >
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="truncate">{s.shortTitle}</span>
                    <span className="sr-only"> : {s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-4 [@media(max-height:640px)]:pt-2.5">
            <ButtonLink href={ctas.simulator.href} onClick={() => setOpen(false)} className="min-h-12 px-2 text-[0.92rem] whitespace-nowrap">
              {ctas.simulator.label}
            </ButtonLink>
            <ButtonLink href={ctas.quote.href} variant="secondary" onClick={() => setOpen(false)} className="min-h-12 px-2 text-[0.92rem] whitespace-nowrap">
              {ctas.quote.label}
            </ButtonLink>
            {phoneDisplay && phoneE164 && (
              <a
                href={`tel:${phoneE164}`}
                className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-50 px-6 text-base font-semibold text-brand-900"
              >
                <PhoneIcon />
                Appeler le {phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4.5" fill="none">
      <path
        d="M4.5 3h2.6l1.3 3.4-1.7 1.1a9.6 9.6 0 0 0 5.8 5.8l1.1-1.7L17 13v2.6A1.5 1.5 0 0 1 15.4 17 12.9 12.9 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
