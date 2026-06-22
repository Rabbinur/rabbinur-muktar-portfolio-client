"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export default function ProjectsPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { data: projectsRes, isLoading } = useGetProjectsQuery(undefined);
    const projectsData = projectsRes?.data?.data || [];

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fafcff] text-[#0f172a] flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <span className="w-12 h-12 rounded-full border-4 border-[#fc6d5c] border-t-transparent animate-spin" />
                    <span className="text-xs uppercase tracking-widest text-[#fc6d5c] font-bold">Loading Deployments...</span>
                </div>
            </div>
        );
    }

    const projects: Project[] = projectsData.map((p: any) => ({
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

    const handleCardClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fafcff] to-[#ebe3fa] text-[#0f172a] relative overflow-hidden selection:bg-[#fc6d5c]/30 font-sans">

            {/* ==========================================
          ✨ ব্যাকগ্রাউন্ড গ্লো এবং সাইবার গ্রিড ওভারলে
         ========================================== */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #4745a7 1px, transparent 1px), linear-gradient(to bottom, #4745a7 1px, transparent 1px)`,
                    backgroundSize: "50px 50px"
                }}
            />

            {/* নিয়ন ডাইনামিক লাইটিং অরбиটস */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4745a7]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-[#fc6d5c]/5 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-[#4745a7]/3 rounded-full blur-[130px] pointer-events-none" />

            <main className="max-w-7xl mx-auto px-6 py-32 relative z-10 space-y-32">

                {/* ==========================================
            🎯 ২. প্রজেক্টস শোকেস গ্রিড (Main Showcase)
           ========================================== */}
                <section>
                    <div className="mb-16 text-left border-l-2 border-[#fc6d5c] pl-6">
                        <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-[#0f172a] uppercase">
                            Selected <span className="text-[#fc6d5c] drop-shadow-[0_0_15px_rgba(252,109,92,0.15)]">Deployments</span>
                        </h1>
                        <p className="mt-3 text-slate-500 max-w-2xl text-xs md:text-sm tracking-wide leading-relaxed font-sans font-medium">
                            A carefully curated log of enterprise web apps and production portals combining microservice logic with optimized client UI.
                        </p>
                    </div>

                    {/* কার্ড গ্রিড লেআউট */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project: Project, index: number) => (
                            <motion.div
                                key={project.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handleCardClick(project)}
                                className="group relative flex flex-col justify-between bg-[#1a2340] border border-fuchsia-500/10 rounded-[28px] overflow-hidden shadow-2xl transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_15px_40px_rgba(71,69,167,0.15)] cursor-pointer text-slate-100"
                            >
                                <div>
                                    {/* থাম্বনেইল মক-আপ ব্যানার */}
                                    <div className="h-44 bg-[#121620] w-full p-5 relative overflow-hidden border-b border-slate-900 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#4745a7]/5 to-[#fc6d5c]/5 opacity-40" />

                                        {/* ট্যাগসমূহ */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                                            <span className="text-[10px] font-black tracking-wider bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2.5 py-1 rounded-md uppercase">
                                                {project.type}
                                            </span>
                                            <span className="text-[10px] font-bold tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* থাম্বনেইল ইমেজ বা মক নাম ডিসপ্লে */}
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                                            />
                                        ) : (
                                            <span className="text-xl font-black text-slate-800 tracking-widest uppercase select-none group-hover:text-slate-700 transition-colors">
                                                {project.title.split(" ")[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* কন্টেন্ট ডিটেইলস */}
                                    <div className="p-6 space-y-4">
                                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#fc6d5c] transition-colors tracking-wide">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3 font-medium">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* টেক স্ট্যাক ও লিংক বাটন */}
                                <div className="p-6 pt-0 space-y-6">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack?.slice(0, 5).map((tech: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-[10px] bg-pink-600/20 text-pink-300 px-2 py-0.5 rounded border border-pink-600/30 font-semibold"
                                            >
                                                {tech.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/65 text-xs font-bold">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCardClick(project);
                                            }}
                                            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors font-sans font-bold"
                                        >
                                            View Details
                                            <span className="text-xs">&rarr;</span>
                                        </button>

                                        {project.liveLink && project.liveLink !== "#" ? (
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[#fc6d5c] hover:text-[#fc6d5c]/85 flex items-center gap-1.5 tracking-wider hover:underline"
                                            >
                                                Live Demo
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 002-2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <span className="text-slate-600 italic font-sans text-[10px]">No Demo Url</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ==========================================
            ⚙️ ৩. অতিরিক্ত সেকশন ১: আর্কিটেকচার গ্রিড
           ========================================== */}
                <section className="bg-white/60 border border-black/[0.04] rounded-[28px] p-6 md:p-10 relative overflow-hidden backdrop-blur-md shadow-sm text-[#0f172a]">
                    <div className="absolute top-0 right-0 p-4 font-bold text-[9px] text-slate-400 tracking-widest">
                        SYS_REF // CRITICAL_INFRA
                    </div>
                    <div className="mb-10">
                        <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-[#0f172a]">
                            &gt; Core Technical <span className="text-[#4745a7]">Architecture</span>
                        </h2>
                        <p className="text-slate-500 text-xs mt-1">আমার ডেভেলপমেন্ট স্ট্রাকচারের মূল মেকানিজম এনভায়রনমেন্ট:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 tracking-wide font-medium">
                        <div className="p-5 border border-black/[0.04] bg-white/50 rounded-2xl space-y-2 shadow-inner">
                            <span className="text-[#fc6d5c] font-black">01 / HYDRATED RUNTIME</span>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-medium">Next.js SSR এবং ISR আর্কিটেকচার দিয়ে স্ট্যাটিক স্পিড ও ডাইনামিক ডাটা রেন্ডারিং নিশ্চিত করা।</p>
                        </div>
                        <div className="p-5 border border-black/[0.04] bg-white/50 rounded-2xl space-y-2 shadow-inner">
                            <span className="text-[#4745a7] font-black">02 / SECURE EDGE HOOKS</span>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-medium">JWT সেশন অথেন্টিকেশন, কাস্টম RBAC মিডলওয়্যার এবং ক্লাউড এনভায়রনমেন্ট ডেটা আইসোলেশন।</p>
                        </div>
                        <div className="p-5 border border-black/[0.04] bg-white/50 rounded-2xl space-y-2 shadow-inner">
                            <span className="text-emerald-600 font-black">03 / TRANSACTION RIG</span>
                            <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-medium">বিকাশ (bKash) মার্চেন্ট ও স্ট্রাইপ গেটওয়ের রিভার্সাল-সুরক্ষিত পেমেন্ট স্টেট মেশিন হ্যান্ডলিং।</p>
                        </div>
                    </div>
                </section>

                {/* ==========================================
            📊 ৪. অতিরিক্ত সেকশন ২: সিস্টেম টেলিমეტ্রি লগস
           ========================================== */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="text-[10px] bg-[#4745a7]/10 text-[#4745a7] border border-[#4745a7]/20 px-3 py-1 rounded w-max font-bold tracking-widest uppercase">
                            Live Infrastructure Telemetry
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0f172a]">
                            System Uplink Metrics
                        </h2>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                            আমার তৈরিকৃত প্রজেক্টসমূহ এবং এপিআই সার্ভিসগুলোর পারফরম্যান্স রিয়েল-টাইমে মনিটর করা হয় যাতে কোনো ডাউনটাইম ছাড়াই সিকিউর গেটওয়ে সচল থাকে।
                        </p>
                    </div>

                    {/* রিয়েল-টাইম স্ট্যাটাস বার বক্স */}
                    <div className="bg-[#1a2340] border border-slate-800 rounded-2xl p-6 font-mono text-[11px] space-y-3.5 text-slate-300 shadow-xl">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-slate-400 font-bold">
                            <span>METRIC METRICS</span>
                            <span>VALUE_STATUS</span>
                        </div>
                        <div className="flex justify-between">
                            <span>API Gateway Status</span>
                            <span className="text-emerald-400 font-bold">ONLINE // 99.98%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Average Page Load Latency</span>
                            <span className="text-cyan-400 font-bold">&lt; 240ms</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Database Query Security Pipeline</span>
                            <span className="text-[#fc6d5c] font-bold">ENCRYPTED_AES256</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Session Log Token: #RAB-2026</span>
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                Uplink Stable
                            </span>
                        </div>
                    </div>
                </section>

            </main>

            <ProjectDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />
        </div>
    );
}