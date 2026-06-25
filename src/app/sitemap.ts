import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rabbinurmuktar.vercel.app";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || `${BASE_URL}/api`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic project pages
  try {
    const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
    const json = await res.json();
    const projects: any[] = json?.data?.data || json?.data || [];

    projects.forEach((proj) => {
      if (proj?.slug) {
        routes.push({
          url: `${BASE_URL}/projects/${proj.slug}`,
          lastModified: proj.updatedAt ? new Date(proj.updatedAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });
  } catch {
    console.error("Failed to generate dynamic sitemap routes. Falling back to base routes.");
  }

  return routes;
}
