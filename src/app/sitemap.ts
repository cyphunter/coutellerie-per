import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/+$/, "");
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/atelier`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/galerie`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/creations`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/plan-acces`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
