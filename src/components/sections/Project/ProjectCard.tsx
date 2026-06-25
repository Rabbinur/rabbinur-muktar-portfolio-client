"use client";

import { Project } from "@/components/hooks/useProjects";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";


interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onClick: () => void;
}

export function ProjectCard({
  project,
  index,
  totalCards,
  progress,
  onClick,
}: ProjectCardProps) {
  const scale = useTransform(
    progress,
    [index / totalCards, (index + 1) / totalCards],
    [1, index === totalCards - 1 ? 1 : 0.92]
  );

  return (
    <div
      className="sticky"
      style={{
        top: `${80 + index * 20}px`,
        zIndex: totalCards - index,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        onClick={onClick}
        className="
          cursor-pointer
          mb-10
          overflow-hidden
          rounded-[32px]
          border
          border-fuchsia-500/20
          bg-[#111827]
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        "
      >
        <div className="grid lg:grid-cols-2">
          {/* Content */}
          <div className="p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <div className="flex gap-3 mb-5">
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-400">
                  {project.type}
                </span>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                  {project.status}
                </span>
              </div>

              <h3 className="text-4xl font-bold text-white mb-4">
                {project.title}
              </h3>

              <p className="text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {project.techStack?.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      bg-pink-600/20
                      border
                      border-pink-600/30
                      px-3
                      py-1
                      text-xs
                      text-pink-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative p-8">
            <Image
              width={500}
              height={500}
              src={project.image}
              alt={project.title}
              className="
                w-full
                rounded-2xl
                object-cover
                border
                border-white/10
              "
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
