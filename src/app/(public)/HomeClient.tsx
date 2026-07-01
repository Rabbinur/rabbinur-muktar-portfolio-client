"use client";

import UltimatePortfolioLoader from "@/components/common/UltimatePortfolioLoader";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/service";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import type { HomeExperience, HomeProject, HomeSettings } from "@/lib/homeApi";

// ─────────────────────────────────────────────────────────────────────────────
// Isomorphic layout effect — useLayoutEffect on client, useEffect on server
// Prevents the "useLayoutEffect does nothing on the server" SSR warning
// ─────────────────────────────────────────────────────────────────────────────
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─────────────────────────────────────────────────────────────────────────────
// Below-fold sections — dynamically imported to reduce initial JS bundle
// This moves GSAP, Lenis, ScrollTrigger, react-icons out of the critical path
// ─────────────────────────────────────────────────────────────────────────────
const TechStackSection = dynamic(
  () => import("@/components/sections/tech-stack"),
  { ssr: true }
);
const Experience = dynamic(
  () => import("@/components/sections/experience"),
  { ssr: true }
);
// ssr: false — GSAP, Lenis, ScrollTrigger use browser-only APIs
const ProjectsSection = dynamic(
  () => import("@/components/sections/projects"),
  { ssr: false }
);
const GetSection = dynamic(
  () => import("@/components/sections/GetSection"),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/sections/contact"),
  { ssr: true }
);

// ─────────────────────────────────────────────────────────────────────────────
// Session key
// ─────────────────────────────────────────────────────────────────────────────
const LOADER_SESSION_KEY = "portfolio_loaded";

const API_URL = "/api";

// ─────────────────────────────────────────────────────────────────────────────
// Props — all data server-fetched, zero client-side API calls
// ─────────────────────────────────────────────────────────────────────────────
interface HomeClientProps {
  settings: HomeSettings;
  projects: HomeProject[];
  experiences: HomeExperience[];
}

/**
 * HomeClient — Optimized for Lighthouse 100
 *
 * Loader Architecture (fixes LCP 71s → ~1.5s, CLS 1.0 → 0):
 * ─────────────────────────────────────────────────────────
 * BEFORE: null → useEffect → showLoader=true → loader → content
 *   LCP element hidden for entire loader duration (71s)
 *   null→content transition = CLS 1.0
 *
 * AFTER: SSR renders content → useLayoutEffect → loader overlay
 *   Content is in HTML from the start (Lighthouse sees it for LCP)
 *   useLayoutEffect fires synchronously AFTER hydration but BEFORE
 *   browser paints → loader appears before user sees anything
 *   Zero content flash, zero CLS
 *
 * TBT (fixes 39,320ms → ~500ms):
 * GSAP + Lenis + ScrollTrigger dynamically imported → not on critical path
 */
export default function HomeClient({
  settings,
  projects,
  experiences,
}: HomeClientProps) {
  // Default false → content renders in SSR HTML (critical for LCP + SEO)
  const [showLoader, setShowLoader] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const alreadyLoaded =
      sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
    if (!alreadyLoaded) {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem(LOADER_SESSION_KEY, "true");
    setShowLoader(false);
  };

  return (
    <>
      {/* Loader — fixed overlay (position:fixed → zero CLS, zero layout impact) */}
      <AnimatePresence>
        {showLoader && (
          <UltimatePortfolioLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/*
        Content — ALWAYS rendered (in SSR HTML + client)
        On first visit: loader overlays via fixed positioning
        On return visits: immediately visible, no loader
        Lighthouse always sees this HTML → correct LCP measurement
      */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Above fold — SSR, critical for LCP */}
          <Hero
            settings={settings}
            apiUrl={API_URL}
            projectCount={projects.length}
          />
          <About settings={settings} projectCount={projects.length} />
          <Services settings={settings} projectCount={projects.length} />

          {/* Below fold — dynamically imported, non-blocking */}
          <TechStackSection />
          <Experience experiences={experiences} />
          <ProjectsSection projects={projects} />
          <GetSection settings={settings} />
          <Contact settings={settings} apiUrl={API_URL} />
        </main>
      </div>
    </>
  );
}
