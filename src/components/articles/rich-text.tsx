import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/content/articles";

/** Transforme **gras** et [lien](url) en éléments React. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(<strong key={i++}>{match[1]}</strong>);
    } else {
      const href = match[3];
      parts.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href}>
            {match[2]}
          </Link>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener">
            {match[2]}
          </a>
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <aside key={i} className="not-prose my-8 rounded-2xl border-l-4 border-sun-400 bg-sun-50 px-6 py-5">
                <p className="font-display text-lg font-semibold text-ink">{block.title}</p>
                <p className="mt-1.5 text-ink-soft">
                  <Inline text={block.text} />
                </p>
              </aside>
            );
        }
      })}
    </>
  );
}
