import type { MetadataRoute } from "next";

const BASE = "https://www.inovers.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"
  ) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry("/accelerator", 0.95, "daily"),
    entry("/accelerator/apply", 0.9, "daily"),
    entry("/accelerator/program", 0.8),
    entry("/accelerator/deal", 0.8),
    entry("/accelerator/faq", 0.7),
    entry("/accelerator/companies", 0.6),
    entry("/ideas", 0.6),
    entry("/manifesto", 0.5, "monthly"),
    entry("/waitlist", 0.5, "monthly"),
  ];
}
