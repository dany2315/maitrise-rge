import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Badge visible uniquement en mode revue pour signaler un contenu à valider. */
export function ReviewBadge({ children = "À confirmer" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-sun-800 ring-1 ring-sun-300">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-sun-600" />
      {children}
    </span>
  );
}
