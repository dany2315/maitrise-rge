import { Container, ReviewBadge } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { commitments } from "@/content/company";

const icons = [
  <path key="0" d="M4 7h16M4 12h16M4 17h10" />,
  <path key="1" d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5" />,
  <path key="2" d="M7 3h7l5 5v13H7V3Zm7 0v5h5M10 13h6M10 17h4" />,
  <path key="3" d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  <path key="4" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" />,
  <path key="5" d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />,
];

export function Commitments({ reviewMode }: { reviewMode: boolean }) {
  const list = commitments
    .map((c, i) => ({ ...c, icon: icons[i % icons.length] }))
    .filter((c) => c.confirmed || reviewMode);
  if (list.length === 0) return null;

  return (
    <section id="engagements" aria-labelledby="engagements-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 size-80 rounded-full bg-sky-500/15 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-brand-300 uppercase">Nos engagements</p>
            <h2 id="engagements-title" className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Ce que vous pouvez attendre de nous, <span className="text-sun-300">noir sur blanc</span>.
            </h2>
          </div>
          <p className="text-lg text-white/70 lg:col-span-5">
            Des principes de travail concrets, appliqués à chaque projet, pour que vous avanciez en
            confiance.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 90} className="group relative bg-ink p-7 transition-colors duration-300 hover:bg-[#182a37] sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.06] text-brand-300 ring-1 ring-white/10 transition group-hover:bg-brand-500/20 group-hover:text-brand-200">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </span>
                <span className="font-display text-sm font-semibold text-white/35 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold text-white sm:text-[1.35rem]">{c.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-white/70">{c.text}</p>
              {!c.confirmed && (
                <div className="mt-5">
                  <ReviewBadge>À confirmer par Maîtrise RGE</ReviewBadge>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
