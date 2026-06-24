"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";

import { Project } from "@/components/hooks/useProjects";
import { ProjectCard } from "./ProjectCard";

interface StickyScrollCardsProps {
    projects: Project[];
    onCardClick: (project: Project) => void;
}

export function StickyScrollCards({
    projects,
    onCardClick,
}: StickyScrollCardsProps) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end center"],
    });

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{
                height: `${Math.max(projects.length * 100, 500)}vh`,
            }}
        >
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    totalCards={projects.length}
                    progress={scrollYProgress}
                    onClick={() => onCardClick(project)}
                />
            ))}
        </div>
    );
}
