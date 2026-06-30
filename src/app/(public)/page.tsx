"use client";

import UltimatePortfolioLoader from "@/components/common/UltimatePortfolioLoader";
import { useGetExperiencesQuery, useGetProjectsQuery, useGetSettingsQuery } from "@/components/Redux/RTK/portfolioApi";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import GetSection from "@/components/sections/GetSection";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/service";
import TechStackSection from "@/components/sections/tech-stack";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
const API_URL = "/api";
let hasLoadedOnce = false;

export default function Home() {
  const [isLoading, setIsLoading] = useState(!hasLoadedOnce);

  const { data: settingsRes, isLoading: settingsLoading } = useGetSettingsQuery(undefined);
  const { data: projectsRes, isLoading: projectsLoading } = useGetProjectsQuery(undefined);
  const { data: experiencesRes, isLoading: experiencesLoading } = useGetExperiencesQuery(undefined);

  const isDataLoading = settingsLoading || projectsLoading || experiencesLoading;

  const settings = settingsRes?.data || {};
  const projects = projectsRes?.data?.data || [];
  const experiences = experiencesRes?.data?.data || [];

  const showLoader = !hasLoadedOnce && (isLoading || isDataLoading);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Sections */}
          <Hero settings={settings} apiUrl={API_URL} projectCount={projects.length} />
          <About settings={settings} projectCount={projects.length} />
          <Services settings={settings} projectCount={projects.length} />

          <TechStackSection />
          <Experience experiences={experiences} />
          <Projects />
          <GetSection />
          <Contact settings={settings} apiUrl={API_URL} />
        </main>
      </div>

      <AnimatePresence>
        {showLoader && (
          <UltimatePortfolioLoader
            onComplete={() => {
              setIsLoading(false);
              hasLoadedOnce = true;
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}