"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, Server, Sparkles } from "lucide-react";
import ServicePills from "./Pill";
import SkillCloud from "./SkillCloud";

export interface AboutProps {
  settings: any;
  projectCount: number;
}

export default function About({ settings, projectCount }: AboutProps) {
  const personal = settings?.personalInfo || {};

  const services = [
    {
      title: "Front-end Development",
      description: "Next.js, React.js, TypeScript, and Tailwind CSS structures.",
      projectsCount: `${projectCount * 3 || 12} Projects`,
      icon: <Code2 className="w-5 h-5 text-[#FF7849]" />,
      bg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Back-end Engineering",
      description: "Node.js, Express.js REST APIs, and authentication flows.",
      projectsCount: `${projectCount * 2 || 8} Projects`,
      icon: <Server className="w-5 h-5 text-[#6366f1]" />,
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Database & Architecture",
      description: "MongoDB collections, AWS S3 storage, and performance tuning.",
      projectsCount: `${projectCount || 4} Projects`,
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-24 relative bg-background border-y border-border/40">
      {/* Visual background continuous with hero */}
      <div className="absolute inset-0 grid-bg-overlay opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#6366f1]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Why Hire Me Narrative */}
          <motion.div
            className="space-y-8 text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Sparkles size={14} className="animate-pulse" />
                <span>About Me</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-heading font-black text-foreground leading-none tracking-tight">
                Why you <span className="text-[#FF7849]">hire me</span> for<br />
                <span className="text-slate-500 block mt-2 ">your <span className="text-primary">next project?</span> </span>
              </h2>

              <p className="text-sm font-medium text-slate-600  leading-relaxed pt-2">
                {personal.bio ||
                  "I am a passionate Full Stack Developer with professional experience building web applications. Specializing in JavaScript, TypeScript, Next.js, and Node.js, I bridge the gap between backend scalability and sleek frontend aesthetics. I love crafting products that solve real-world problems while delivering exceptional user experiences."}
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#FF7849] hover:bg-[#FF7849]/90 text-white font-bold text-xs px-8 py-3.5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(255,120,73,0.15)]"
              >
                Hire Me
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Stack Cards (Jhon Smith Visual Layout) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                className="
                  glass-card
                  p-5 sm:p-6
                  rounded-2xl
                  flex
                  flex-col sm:flex-row
                  sm:items-center
                  justify-between
                  gap-4 sm:gap-6
                  transition-all
                  duration-500
                  origin-bottom-left
                "
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotate: -1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-xl border shrink-0 ${svc.bg}`}>
                    {svc.icon}
                  </div>
                  <div className="text-left space-y-1">
                    <h3 className="font-heading font-black text-base text-foreground animate-in">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 pl-14 sm:pl-0">
                  <span className="text-[10px] font-black uppercase text-[#FF7849] bg-[#FF7849]/5 border border-[#FF7849]/10 px-3 py-1.5 rounded-full tracking-wider inline-block">
                    {svc.projectsCount}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

  
    </section>
  );
}
