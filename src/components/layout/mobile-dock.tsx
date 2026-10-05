"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Dock d'actions mobile : « Estimer mes aides » et « Contact » restent à
 * portée de pouce sans gêner la lecture.
 * - apparaît une fois le hero dépassé ;
 * - deux boutons pleins, libellés et cliquables sur toute leur surface ;
 * - s'efface quand le formulaire de contact ou le pied de page est visible ;
 * - absent du simulateur, qui a sa propre barre d'actions.
 */
export function MobileDock() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [contactHref, setContactHref] = useState("/#contact");
  const { phoneE164 } = site.contact;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setPastHero(y > Math.min(520, window.innerHeight * 0.6));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Masque le dock quand une zone d'action équivalente est déjà à l'écran.
  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dépend du DOM de la page affichée
    setContactHref(document.getElementById("contact") ? "#contact" : "/#contact");
    if (!("IntersectionObserver" in window) || targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setBlocked(visible.size > 0);
      },
      { threshold: 0.12 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/simulateur")) return null;
  const shown = pastHero && !blocked;

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:hidden",
        shown ? "translate-y-0 opacity-100" : "translate-y-[140%] opacity-0",
      )}
    >
      <nav
        aria-label="Actions rapides"
        className={cn(
          "pointer-events-auto grid w-full max-w-md gap-1.5 rounded-[1.75rem] bg-ink/90 p-1.5 shadow-[0_18px_40px_-12px_rgb(19_32_43/0.55)] ring-1 ring-white/10 backdrop-blur-xl",
          phoneE164 ? "grid-cols-[1fr_1fr_auto]" : "grid-cols-2",
        )}
      >
        <Link
          href="/simulateur"
          className="flex min-h-13 items-center justify-center gap-2 rounded-[1.375rem] bg-brand-600 px-3 font-semibold text-white transition active:scale-[0.98] active:bg-brand-700"
        >
          {/* Soleil et flocon : les deux faces de l'énergie du logo */}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
            <circle cx="9" cy="12" r="3.6" fill="#fbcf5c" />
            <path d="M9 4.5v1.6M9 17.9v1.6M2.5 12h1.6M4.4 7.4l1.1 1.1M4.4 16.6l1.1-1.1" stroke="#fbcf5c" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M15.5 7.5c2.2 1.4 2.2 7.6 0 9M18.5 6c3 2.2 3 9.8 0 12" stroke="#d6ecfa" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="text-[0.95rem] whitespace-nowrap">Estimer mes aides</span>
        </Link>

        <Link
          href={contactHref}
          className="flex min-h-13 items-center justify-center gap-2 rounded-[1.375rem] bg-white px-3 font-semibold text-ink transition active:scale-[0.98] active:bg-brand-50"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5.5h16v10H9l-5 4v-14Z" />
            <path d="M8 10h8M8 13h5" />
          </svg>
          <span className="text-[0.95rem] whitespace-nowrap">Contact</span>
        </Link>

        {phoneE164 && (
          <a
            href={`tel:${phoneE164}`}
            aria-label="Appeler Maîtrise RGE"
            className="flex size-13 items-center justify-center rounded-[1.375rem] bg-white/10 text-white transition active:scale-[0.96]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
              <path d="M4.5 3h2.6l1.3 3.4-1.7 1.1a9.6 9.6 0 0 0 5.8 5.8l1.1-1.7L17 13v2.6A1.5 1.5 0 0 1 15.4 17 12.9 12.9 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </nav>
    </div>
  );
}
