"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    screenshots: string[];
    techStack: string[];
    features: string[];
    challenges: string;
    results: string;
    type: string;
    status: string;
    liveLink: string;
    githubLink: string;
    detailsLink: string;
};

interface ProjectCardProps {
    project: Project;
    index: number;
    onViewDetails: (project: Project) => void;
}

export default function ProjectCard({
    project,
    index,
    onViewDetails,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onViewDetails(project)}
            className="group relative flex flex-col h-full justify-between bg-[#1a2340] border border-fuchsia-500/10 rounded-[28px] overflow-hidden shadow-2xl transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_15px_40px_rgba(71,69,167,0.15)] cursor-pointer text-slate-100"
        >
            <div>
                {/* Thumbnail */}
                <div className="relative  flex items-center justify-center h-44 w-full overflow-hidden border-b border-slate-900 bg-[#121620] p-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4745a7]/5 to-[#fc6d5c]/5 opacity-40" />

                    {/* Tags */}
                    <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
                        <span className="rounded-md border border-pink-500/30 bg-pink-500/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-pink-400">
                            {project.type}
                        </span>

                        <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-400">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                            {project.status}
                        </span>
                    </div>

                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={500}
                            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                        />
                    ) : (
                        <span className="select-none text-xl font-black uppercase tracking-widest text-slate-800 transition-colors group-hover:text-slate-700">
                            {project.title.split(" ")[0]}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-4 p-6">
                    <h3 className="text-lg font-bold tracking-wide transition-colors group-hover:text-[#fc6d5c]">
                        {project.title}
                    </h3>

                    <p className="line-clamp-3 text-xs font-medium leading-relaxed text-slate-300">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="space-y-6 p-6 pt-0">
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack?.slice(0, 5).map((tech, i) => (
                        <span
                            key={i}
                            className="rounded border border-pink-600/30 bg-pink-600/20 px-2 py-0.5 text-[10px] font-semibold text-pink-300"
                        >
                            {tech.toUpperCase()}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/65 pt-4 text-xs font-bold">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(project);
                        }}
                        className="flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                    >
                        View Details
                        <span>&rarr;</span>
                    </button>

                    {project.liveLink && project.liveLink !== "#" ? (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 tracking-wider text-[#fc6d5c] transition hover:text-[#fc6d5c]/80 hover:underline"
                        >
                            Live Demo

                            <svg
                                className="h-3.5 w-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    ) : (
                        <span className="text-[10px] italic text-slate-600">
                            No Demo Url
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}