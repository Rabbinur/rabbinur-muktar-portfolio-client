"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useGetProjectsQuery } from "@/components/Redux/RTK/portfolioApi";
import ProjectDetailsModal from "@/components/common/ProjectDetailsModal";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  type: string;
  status: string;
  liveLink: string;
  githubLink: string;
  detailsLink: string;
};

export default function ProjectsSection() {
  const { data: projectsRes, isLoading } = useGetProjectsQuery(undefined);
  const dbProjects = projectsRes?.data?.data || [];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = dbProjects.map((p: any) => ({
    id: p._id || p.id,
    title: p.title,
    description: p.description,
    image: p.thumbnail || "/project1.png",
    techStack: p.techStack || [],
    type: p.type || "WEB APP",
    status: p.status || "Completed",
    liveLink: p.liveLink || "",
    githubLink: p.githubLink || "",
    detailsLink: p.detailsLink || "",
  }));

  if (isLoading || projects.length === 0) {
    return null; // Don't render sections if loading or empty
  }

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="relative bg-[#ebe3fa] py-20 lg:py-24 ">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold ">My <span className="text-[#fc6d5c]">Projects</span></h2>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            This is where I share the projects I've built, combining innovation
            with clean, efficient code.
          </p>
        </div>

        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        <div className="flex justify-center mt-24">
          <Link
            href="/projects"
            className="
              group
              flex
              items-center
              gap-3
              rounded-full
              bg-[#fc6d5c]
              px-8
              py-4
              text-white
              font-semibold
              transition-all
              duration-300
              hover:bg-[#4745a7]
              hover:scale-105
              shadow-lg
            "
          >
            Check Out More Projects

            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onCardClick,
}: {
  project: Project;
  index: number;
  onCardClick: (project: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div
      ref={ref}
      className="lg:sticky top-24 mb-32 cursor-pointer"
      style={{
        zIndex: index + 1,
      }}
      onClick={() => onCardClick(project)}
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="overflow-hidden group rounded-[32px] border border-fuchsia-500/30 bg-[#1a2340] backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/50"
      >
        <div className="grid lg:grid-cols-2">
          {/* Left */}
          <div className="p-10 lg:p-16 flex flex-col justify-between order-2 lg:order-1">
            <div className="space-y-6">
              {/* Type and Status Badges */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-wider bg-pink-500/20 text-pink-400 border border-pink-500/30 px-3 py-1 rounded-full uppercase">
                  {project.type}
                </span>
                <span className="text-[10px] font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                {project.title}
              </h3>

              <p className="text-base leading-relaxed text-slate-300 line-clamp-4">
                {project.description}
              </p>
            </div>

            <div>
              <div className="mt-8 flex flex-wrap gap-4" onClick={(e) => e.stopPropagation()}>
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-pink-500 px-6 py-3 text-white hover:bg-pink-500 transition text-sm font-semibold rounded-md"
                  >
                    Live View
                  </a>
                )}

                {project.githubLink && project.githubLink !== "#" && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-pink-500 px-6 py-3 text-white hover:bg-pink-500 transition text-sm font-semibold rounded-md"
                  >
                    Github Code
                  </a>
                )}
              </div>

              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-pink-600/20 border border-pink-600/30 px-4 py-1.5 text-xs font-semibold text-pink-300"
                    >
                      {item.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="relative min-h-[280px] sm:min-h-[350px] lg:min-h-[500px] overflow-hidden lg:overflow-visible order-1 lg:order-2">
            <div
              className="
                relative lg:absolute
                top-0 lg:top-10
                right-0 lg:-right-20
                w-full lg:w-[115%]
                p-6 lg:p-0
                rotate-0
                transition-all
                duration-500
                group-hover:-translate-y-3
                group-hover:rotate-[-2deg]
              "
            >
              <img
                src={project.image || "/reference2.png"}
                alt={project.title}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                  object-cover
                  max-h-[420px]
                "
              />
            </div>

            {/* optional glow */}
            <div
              className="
                absolute
                bottom-20
                left-10
                h-40
                w-40
                rounded-full
                bg-pink-500/30
                blur-[100px]
              "
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}