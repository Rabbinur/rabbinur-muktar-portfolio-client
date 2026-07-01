
import HomeClient from "./HomeClient";
import {
  fetchSettings,
  fetchProjects,
  fetchExperiences,
} from "@/lib/homeApi";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafcff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Home — Next.js 16 App Router Server Component
 *
 * Fetches all required data in parallel on the server using Promise.all().
 * Data is then passed to HomeClient (Client Component) which handles:
 *   - sessionStorage-based loader detection
 *   - UltimatePortfolioLoader animation on first visit
 *   - Rendering all portfolio sections
 *
 * No RTK Query hooks are used here. RTK Query remains intact globally for
 * Dashboard, Login, and all other authenticated modules.
 */
export default async function Home() {
  const [settings, projects, experiences] = await Promise.all([
    fetchSettings(),
    fetchProjects(),
    fetchExperiences(),
  ]);

  return (
    <HomeClient
      settings={settings}
      projects={projects}
      experiences={experiences}
    />
  );
}