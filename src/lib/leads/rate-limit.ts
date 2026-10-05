import "server-only";

/**
 * Limitation simple par adresse IP, en mémoire. Elle freine les envois
 * répétés sur une même instance ; pour un trafic important, la remplacer par
 * un stockage partagé (ex. Upstash) ou le pare-feu de l'hébergeur.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_REQUESTS;
}
