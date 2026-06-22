"use client";

import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function Experience({ experiences }: { experiences: any[] }) {
  return (
    <section id="experience" className="py-24 relative bg-slate-50/50 dark:bg-black/20 border-y border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Professional History</h2>
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-widest">Chronological Engineering steps</p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground text-xs font-bold bg-background border border-border/40 p-10 rounded-2xl">
            No work experience seeded yet.
          </div>
        ) : (
          <div className="relative border-l border-border/60 ml-4 md:ml-6 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={exp.id || exp._id} className="relative pl-8 md:pl-10 group">
                
                {/* Timeline Dot Indicator */}
                <span className="absolute left-[-11px] top-1.5 h-5.5 w-5.5 rounded-full border-4 border-background bg-secondary flex items-center justify-center shadow transition-all duration-300 group-hover:scale-110" />

                {/* Card Container */}
                <div className="bg-background border border-border/40 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-border transition-colors duration-300 space-y-4">
                  
                  {/* Job title & company */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-secondary font-extrabold mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    {exp.isCurrent && (
                      <span className="h-fit w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold self-start sm:self-center">
                        Active Job
                      </span>
                    )}
                  </div>

                  {/* Metadata labels */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-secondary" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-secondary" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Bullet points */}
                  {exp.description && exp.description.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-xs font-medium text-muted-foreground leading-relaxed">
                      {exp.description.map((bullet: string, i: number) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
