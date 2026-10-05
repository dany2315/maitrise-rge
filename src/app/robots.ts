import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { isReviewMode } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  // Les prévisualisations ne doivent pas être indexées.
  if (isReviewMode()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
