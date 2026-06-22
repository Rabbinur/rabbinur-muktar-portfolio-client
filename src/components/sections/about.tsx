"use client";

import { Award, CheckCircle, Code2, Sparkles } from "lucide-react";

interface AboutProps {
  settings: any;
  projectCount: number;
  experiences: any[];
}

export default function About({ settings, projectCount, experiences = [] }: AboutProps) {
  const personal = settings?.personalInfo || {};

  const stats = [
    { label: "Completed Projects", value: `${projectCount || 4}+` },
    { label: "Client satisfaction", value: "99%" },
    { label: "Years experience", value: "3+" },
  ];

  return (
    <section id="about" className="py-28 relative bg-[#05070a] border-y border-border/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Dynamic Timeline (Services layout matching template) */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-secondary tracking-widest flex items-center gap-2">
                <Code2 size={14} />
                Professional Timeline
              </h3>
              <h2 className="text-3xl font-heading font-black text-white tracking-tight leading-none">
                My Experience
              </h2>
            </div>

            {/* Vertical timeline line */}
            <div className="relative border-l border-secondary/20 pl-8 ml-3 space-y-10 pt-2 pb-2">
              {experiences.length > 0 ? (
                experiences.map((exp: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Glowing Accent Dot */}
                    <span className="absolute -left-[37px] top-1 h-[11px] w-[11px] rounded-full bg-secondary border-2 border-[#05070a] shadow-[0_0_10px_rgba(255,107,74,0.8)]" />
                    
                    <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{exp.duration}</span>
                    <h4 className="text-base font-heading font-black text-white">{exp.role}</h4>
                    <p className="text-xs text-slate-400 font-semibold">{exp.company} — {exp.location}</p>
                    
                    {exp.description && exp.description.length > 0 && (
                      <ul className="text-xs text-slate-500 font-medium space-y-1.5 list-disc pl-4 pt-2">
                        {exp.description.map((bullet: string, i: number) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-xs font-bold">No experiences added yet.</div>
              )}
            </div>
          </div>

          {/* Right Column: About Details and Stats */}
          <div className="space-y-8 lg:pt-2">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-secondary tracking-widest flex items-center gap-2">
                <Sparkles size={14} />
                About me
              </h3>
              <h2 className="text-3xl font-heading font-black text-white tracking-tight leading-none">
                The Developer Story
              </h2>
              <p className="text-sm font-medium text-slate-400 leading-relaxed whitespace-pre-line">
                {personal.bio ||
                  "I am a passionate Full Stack Developer with professional experience building web applications. Specializing in JavaScript, TypeScript, Next.js, and Node.js, I bridge the gap between backend scalability and sleek frontend aesthetics. I love crafting products that solve real-world problems while delivering exceptional user experiences."}
              </p>
            </div>

            {/* Statistics Bento Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((st) => (
                <div
                  key={st.label}
                  className="bg-[#0b0f19]/30 border border-border/5 p-6 rounded-2xl text-center space-y-2 hover:border-secondary/20 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
                >
                  <p className="text-2xl sm:text-3xl font-heading font-black text-secondary leading-none">
                    {st.value}
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
