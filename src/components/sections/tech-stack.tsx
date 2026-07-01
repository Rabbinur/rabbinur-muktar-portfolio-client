"use client";

import { useState } from "react";
import { X, ArrowUpRight, Layout, Server, Database, Cpu } from "lucide-react";
import {
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiExpress,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiRedux,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
  SiSupabase,
  SiFigma,
  SiSocketdotio,
  SiGit,
} from "react-icons/si";

export const technologies = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Layout,
    color: "#fc6d5c", // --secondary
    description: "Building responsive, accessible and performant user interfaces with modern frameworks and tools.",
    skills: [
      { name: "React.js", icon: FaReact, level: "Expert", description: "Component-based UI library for building interactive web applications with hooks and state management." },
      { name: "TypeScript", icon: SiTypescript, level: "Expert", description: "Typed superset of JavaScript for building scalable and maintainable applications." },
      { name: "Next.js", icon: SiNextdotjs, level: "Intermediate", description: "React framework for production with SSR, SSG, and API routes built-in." },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: "Advanced", description: "Utility-first CSS framework for rapidly building custom designs." },
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Server,
    color: "#4745a7", // --primary
    description: "Designing and implementing scalable APIs, microservices, and server-side applications.",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: "Expert", description: "Asynchronous event-driven JavaScript runtime environment." },
      { name: "Express.js", icon: SiExpress, level: "Expert", description: "Minimalist and flexible web application framework for REST APIs." },
      { name: "Redis", icon: SiRedis, level: "Advanced", description: "In-memory data structure store used as a database, cache, and message broker." },
    ]
  },
  {
    id: "database",
    title: "Database & ORM",
    icon: Database,
    color: "#10b981", 
    description: "Managing data integrity, designing schemas, and implementing efficient query caching.",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: "Advanced", description: "Document-based distributed NoSQL database designed for modern apps." },
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", description: "Powerful, open-source object-relational database system." },
      { name: "Supabase", icon: SiSupabase, level: "Advanced", description: "Open source Firebase alternative with real-time Postgres capabilities." }
    ]
  },
  {
    id: "tools",
    title: "Real-Time & Tools",
    icon: Cpu,
    color: "#a855f7", 
    description: "Utilizing modern collaboration tools, version control, and real-time communication protocols.",
    skills: [
      { name: "Figma", icon: SiFigma, level: "Advanced", description: "Collaborative interface design tool for modern UI/UX workflows." },
      { name: "Socket.io", icon: SiSocketdotio, level: "Advanced", description: "Bidirectional and low-latency communication channel between client and server." },
      { name: "Git", icon: SiGit, level: "Expert", description: "Distributed version control system to track source code changes." },
    ]
  }
];

// লাইট থিম মডাল কম্পোনেন্ট
function SkillModal({ tech, onClose }: { tech: any; onClose: () => void }) {
  if (!tech) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[24px] border border-black/5 bg-[#ffffff] p-6 md:p-10 shadow-2xl custom-scrollbar text-[#0f172a]">
        
        <button 
          onClick={onClose}
          aria-label="Close skill details modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#0f172a] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${tech.color}15` }}>
            <tech.icon size={28} style={{ color: tech.color }} />
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#0f172a] mb-2">{tech.title}</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl">{tech.description}</p>
          </div>
        </div>

        <hr className="border-slate-100 mb-8" />

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">Technologies & Skills</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {tech.skills.map((skill: any) => {
              const SkillIcon = skill.icon;
              return (
                <div key={skill.name} className="group/item flex flex-col p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <SkillIcon size={22} className="text-slate-500 group-hover/item:text-[#0f172a] transition-colors" />
                      <span className="font-semibold text-[#0f172a]">{skill.name}</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full border font-medium bg-slate-100 text-slate-600 border-slate-200">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// লাইট থিম কার্ড কম্পোনেন্ট
function TechCard({ tech, isDefaultActive, onClick }: { tech: any; isDefaultActive: boolean; onClick: () => void }) {
  const Icon = tech.icon;

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[24px] cursor-pointer border p-8 transition-all duration-500 hover:-translate-y-2
        ${isDefaultActive 
          ? "border-[#fc6d5c]/60 bg-[#ffffff] shadow-[0_15px_40px_rgba(252,109,92,0.08)]" 
          : "border-black/[0.06] bg-[#ffffff]"
        } 
        hover:border-[#fc6d5c] hover:shadow-[0_20px_40px_rgba(252,109,92,0.12)]`}
    >
      {/* লাইট গ্লো রেডিয়াল ইফেক্ট - হোভার করলে শুধুমাত্র সেকেন্ডারি অরেঞ্জ ব্লেন্ড হবে */}
      <div
        className={`absolute inset-0 transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100
          ${isDefaultActive ? "opacity-100" : ""}`}
        style={{
          background: `radial-gradient(circle at 15% 15%, #fc6d5c0c 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-13 h-13 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100">
            <Icon size={26} style={{ color: isDefaultActive ? "#fc6d5c" : tech.color }} className="group-hover:!text-[#fc6d5c] transition-colors duration-300" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:text-[#fc6d5c] transition-all">
            ✦ Click
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-[#0f172a] group-hover:text-[#fc6d5c] transition-colors duration-300">
          {tech.title}
        </h3>

        <p className="text-slate-500 text-sm mb-6 leading-relaxed min-h-[44px]">
          {tech.description}
        </p>

        {/* ইনলাইন ছোট পিলস (image_7f0dc4.jpg এর লাইট ভেরিয়েন্ট স্ট্রাকচার) */}
        <div className="flex flex-wrap gap-2">
          {tech.skills.slice(0, 5).map((skill: any) => {
            const SkillIcon = skill.icon;
            return (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:border-slate-200 transition-colors"
              >
                <SkillIcon size={14} className="text-slate-400 group-hover:text-[#0f172a]" />
                <span className="text-xs font-semibold">{skill.name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
            Click to explore
          </span>
          <ArrowUpRight size={18} className="text-slate-400 group-hover:text-[#fc6d5c] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState<any>(null);

  return (
    <section id="skills" className="relative py-20 lg:py-24  px-4  bg-[#fafcff] text-[#0f172a]">
      {/* হেডার */}
      <div className="relative mb-16 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
          My <span className="bg-gradient-to-r from-[#fc6d5c] to-[#ff7849] bg-clip-text text-transparent">Skills</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-500">
          Technologies and domains I specialize in, click to explore
        </p>
      </div>

      {/* গ্রিড */}
      <div className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto">
        {technologies.map((tech, index) => (
          <TechCard
            key={tech.id}
            tech={tech}
            isDefaultActive={index === 0} // ১ম কার্ডটি ডিফল্ট একটি অ্যাক্টিভ বর্ডার শ্যাডো নিয়ে থাকবে
            onClick={() => setSelectedTech(tech)}
          />
        ))}
      </div>

      {/* মডাল ওভারলে */}
      {selectedTech && (
        <SkillModal 
          tech={selectedTech} 
          onClose={() => setSelectedTech(null)} 
        />
      )}
    </section>
  );
}