"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Sparkles, X } from "lucide-react";
import { useState } from "react";

// ১. মডাল কম্পোনেন্ট (Outside Click Close সহ লাইট থিম)
function ExperienceModal({ exp, onClose }: { exp: any; onClose: () => void }) {
  if (!exp) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/30 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-[28px] border border-black/5 bg-[#ffffff] p-6 md:p-10 shadow-2xl text-[#0f172a]"
      >
        {/* ক্লোজ বাটন */}
        <button
          onClick={onClose}
          aria-label="Close experience details modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#0f172a] transition-colors"
        >
          <X size={18} />
        </button>

        {/* হেডার ডিটেইলস */}
        <div className="space-y-4">
          <h3 className="text-3xl font-extrabold text-[#4745a7]">
            {exp.role || "Software Developer"}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-[#fc6d5c]">
              <Briefcase size={16} /> {exp.company || "Company"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} /> {exp.duration || "2025"}
            </span>
            {exp.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={16} /> {exp.location}
              </span>
            )}
          </div>
        </div>

        <hr className="border-slate-100 my-6" />

        {/* কন্টেন্ট বডি */}
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-base">
            {exp.summary || "Full ownership of features from concept to deployment, focusing on robust architecture."}
          </p>

          {exp.description?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Highlights:
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-600">
                {exp.description.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#fc6d5c] mt-1 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ২. মেইন এক্সপেরিয়েন্স কম্পোনেন্ট
export default function Experience({ experiences = [] }: { experiences: any[] }) {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="experience" className="py-20 lg:py-24  relative bg-[#f2f2ff] border-y border-black/[0.04]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* হেডার */}
        <div className="text-center space-y-3">
         
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a]">
            My Professional Journey
          </h2>
          <p className="text-sm text-slate-500 font-bold  tracking -widest">
            A combination of professional experience, technical expertise, and modern development tools used to build scalable, high-performance, and user-focused digital products.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs font-bold bg-[#ffffff] border border-black/5 p-10 rounded-2xl">
            No work experience seeded yet.
          </div>
        ) : (
          <div className="relative max-w-3xl mx-auto py-12">

            {/* টাইমলাইন মেইন গাইডলাইন */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4745a7] via-[#fc6d5c] to-[#4745a7] md:-translate-x-1/2" />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {experiences.map((exp, index) => {
                // অল্টারনেটিভ ডিরেকশন (ডানে ও বামে সাজানো)
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={exp.id || exp._id || index}
                    className={`relative flex flex-col md:flex-row items-start md:items-center pl-10 md:pl-0 ${isLeft ? "md:justify-start" : "md:justify-end"
                      }`}
                  >
                    {/* টাইমলাইন ডট */}
                    <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#ffffff] border-[4px] border-[#4745a7] shadow-sm z-20" />

                    {/* ক্লিকযোগ্য কার্ড */}
                    <motion.div
                      onClick={() => setSelectedExp(exp)}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="w-full md:w-[45%] bg-[#ffffff] border border-black/[0.05] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer hover:border-[#fc6d5c]/60 hover:shadow-[0_10px_30px_rgba(252,109,92,0.06)] transition-all duration-300"
                    >
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-[#0f172a] hover:text-[#4745a7] transition-colors">
                          {exp.role || "Software Developer"}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4745a7] mt-1">
                          <Briefcase size={13} />
                          <span>{exp.company || "NewEraCom"}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mt-2">
                          <Calendar size={13} />
                          <span>{exp.duration || "2025"}</span>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm mt-4 line-clamp-2 leading-relaxed">
                        {exp.summary || "Click to read full details regarding features optimization and architecture deployment."}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>✦ View Case</span>
                        <span className="text-[#fc6d5c]">Read More →</span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>

      {/* এনিমেটেড মডাল পপআপ */}
      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal
            exp={selectedExp}
            onClose={() => setSelectedExp(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}