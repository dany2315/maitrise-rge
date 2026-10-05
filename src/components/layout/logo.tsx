import Image from "next/image";
import Link from "next/link";
import symbol from "../../../public/brand/symbol.png";
import wordmark from "../../../public/brand/wordmark.png";
import wordmarkLight from "../../../public/brand/wordmark-light.png";
import { cn } from "@/lib/cn";

/**
 * Logo horizontal : symbole à gauche, nom « Maîtrise RGE » à droite.
 * Les proportions sont celles du logo fourni ; seule la disposition change.
 */
export function Logo({
  tone = "dark",
  size = "md",
  className,
  priority,
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Maîtrise RGE — accueil"
      className={cn("group inline-flex shrink-0 items-center gap-2.5 rounded-lg", className)}
    >
      <Image
        src={symbol}
        alt=""
        priority={priority}
        sizes="80px"
        className={cn(
          "w-auto transition-transform duration-500 ease-out group-hover:-rotate-3",
          size === "md" ? "h-10 sm:h-11" : "h-14 sm:h-16",
        )}
      />
      <Image
        src={tone === "dark" ? wordmark : wordmarkLight}
        alt=""
        priority={priority}
        sizes="200px"
        className={cn("w-auto", size === "md" ? "h-[1.15rem] sm:h-[1.35rem]" : "h-7 sm:h-8")}
      />
    </Link>
  );
}
