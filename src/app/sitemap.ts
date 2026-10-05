import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/content/articles";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/prestations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${site.url}/prestations/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/simulateur`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/conseils`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Seuls les articles validés par le client sont proposés à l'indexation.
  const published = articles
    .filter((a) => a.status === "publie")
    .map((a) => ({
      url: `${site.url}/conseils/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  return [...pages, ...published];
}
