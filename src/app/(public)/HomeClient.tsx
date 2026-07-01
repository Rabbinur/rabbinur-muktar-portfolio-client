"use client";

import UltimatePortfolioLoader from "@/components/common/UltimatePortfolioLoader";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/service";
import type { HomeExperience, HomeProject, HomeSettings } from "@/lib/homeApi";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useState } from "react";

// Isomorphic layout effect — useLayoutEffect on client, useEffect on server
// Fires synchronously before browser paint → zero flash for return visitors
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Below-fold sections — dynamically imported to reduce initial JS bundle
const TechStackSection = dynamic(
  () => import("@/components/sections/tech-stack"),
  { ssr: true }
);
const Experience = dynamic(
  () => import("@/components/sections/experience"),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/projects"),
  { ssr: true }
);
const GetSection = dynamic(
  () => import("@/components/sections/GetSection"),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/sections/contact"),
  { ssr: true }
);

const LOADER_SESSION_KEY = "portfolio_loaded";
const API_URL = "/api";

interface HomeClientProps {
  settings: HomeSettings;
  projects: HomeProject[];
  experiences: HomeExperience[];
}

export default function HomeClient({
  settings,
  projects,
  experiences,
}: HomeClientProps) {
  /**
   * Loader Strategy:
   *
   * useState(true) → Loader is in SSR HTML from the very first byte.
   * The loader (fixed inset-0 z-[9999]) covers Navbar, Footer, and all
   * page content — nothing is visible until loader completes.
   *
   * useIsomorphicLayoutEffect fires synchronously after DOM mutations
   * but BEFORE the browser paints — so for return visitors the loader
   * is removed before any pixel is drawn. Zero flash, zero layout shift.
   *
   * SSR (true) + Client hydration (true) = exact match → zero hydration mismatch.
   */
  const [showLoader, setShowLoader] = useState(true);

  useIsomorphicLayoutEffect(() => {
    try {
      const alreadyLoaded =
        sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
      if (alreadyLoaded) {
        // Return visitor: remove loader before browser paints — no flash
        setShowLoader(false);
      }
      // First visit: showLoader stays true, loader runs normally to 100%
    } catch {
      // sessionStorage unavailable (private mode edge case): skip loader
      setShowLoader(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem(LOADER_SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable — graceful fallback
    }
    setShowLoader(false);
  };

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <UltimatePortfolioLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <div className="portfolio-page-root flex flex-col min-h-screen">
        <main className="flex-grow">
          <Hero
            settings={settings}
            apiUrl={API_URL}
            projectCount={projects.length}
          />
          <About settings={settings} projectCount={projects.length} />
          <Services settings={settings} projectCount={projects.length} />
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
