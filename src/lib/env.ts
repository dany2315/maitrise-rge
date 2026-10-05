import "server-only";

/**
 * Mode revue : développement local, prévisualisation Vercel ou activation
 * explicite (SITE_REVIEW_MODE=true). Il affiche les éléments en attente de
 * validation (exemples du simulateur, marques à confirmer…) avec des badges
 * explicites. En production, ces éléments sont masqués.
 */
export function isReviewMode(): boolean {
  if (process.env.SITE_REVIEW_MODE === "true") return true;
  if (process.env.SITE_REVIEW_MODE === "false") return false;
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV !== "production";
  return process.env.NODE_ENV !== "production";
}
