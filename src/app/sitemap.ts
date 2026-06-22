import { MetadataRoute } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/api/v1";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://muktar.dev";
  
  // Default static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  try {
    const projectsRes = await fetch(`${API_URL}/projects`, { next: { revalidate: 60 } }).then((r) => r.json());
    const projects = projectsRes?.data || [];

    projects.forEach((proj: any) => {
      routes.push({
        url: `${baseUrl}/projects/${proj.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes. Falling back to base routes.");
  }

  return routes;
}
