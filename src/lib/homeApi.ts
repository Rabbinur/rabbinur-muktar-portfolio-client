/**
 * homeApi.ts
 *
 * Server-side fetch utilities for the Home page (Next.js 16 App Router).
 * These functions are intentionally NOT exported to the client bundle.
 *
 * - Uses absolute URLs required for server-side fetch()
 * - ISR revalidate: 3600s — aligned with (public)/layout.tsx
 * - Returns safe fallback values on fetch/parse errors
 * - Compatible with Next.js request memoization for same-render deduplication
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || `${BASE_URL}/api`;

const REVALIDATE_SECONDS = 3600;

// ─────────────────────────────────────────────
// Type definitions matching API response shapes
// ─────────────────────────────────────────────

export interface HomeSettings {
  // Personal info
  personalInfo?: {
    name?: string;
    role?: string;
    bio?: string;
    profileImage?: string;
    resumeUrl?: string;
  };
  // Contact
  contactInfo?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    instagram?: string;
  };
  // Social
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  // SEO
  seoSettings?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  // Hero
  heroSubtitle?: string;
  // Stats
  stat1Label?: string;
  stat1Value?: string;
  stat2Label?: string;
  stat2Value?: string;
  stat3Label?: string;
  stat3Value?: string;
  // Allow any additional CMS fields
  [key: string]: unknown;
}

export interface HomeProject {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
  [key: string]: unknown;
}

export interface HomeExperience {
  _id: string;
  role?: string;
  company?: string;
  duration?: string;
  location?: string;
  summary?: string;
  description?: string[];
  [key: string]: unknown;
}

// ─────────────────────────────────────────────
// Fetch helpers
// ─────────────────────────────────────────────

/**
 * Fetches portfolio settings from the server.
 * Returns an empty object as fallback on failure.
 */
export async function fetchSettings(): Promise<HomeSettings> {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[homeApi] fetchSettings failed: ${res.status} ${res.statusText}`);
      return {};
    }

    const json = await res.json();
    return (json?.data as HomeSettings) ?? {};
  } catch (err) {
    console.error("[homeApi] fetchSettings error:", err);
    return {};
  }
}

/**
 * Fetches all projects from the server.
 * Returns an empty array as fallback on failure.
 */
export async function fetchProjects(): Promise<HomeProject[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[homeApi] fetchProjects failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    // API shape: { data: { data: Project[] } }
    return (json?.data?.data as HomeProject[]) ?? [];
  } catch (err) {
    console.error("[homeApi] fetchProjects error:", err);
    return [];
  }
}

/**
 * Fetches all work experiences from the server.
 * Returns an empty array as fallback on failure.
 */
export async function fetchExperiences(): Promise<HomeExperience[]> {
  try {
    const res = await fetch(`${API_BASE}/experiences`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[homeApi] fetchExperiences failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    // API shape: { data: { data: Experience[] } }
    return (json?.data?.data as HomeExperience[]) ?? [];
  } catch (err) {
    console.error("[homeApi] fetchExperiences error:", err);
    return [];
  }
}
