"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Code, ExternalLink, Info, Tag, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react"; // ১. useEffect ইম্পোর্ট করুন

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

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailsModalProps) {

  // ২. মোডাল ওপেন হলে ব্যাকগ্রাউন্ড স্ক্রোল লক করার জন্য এই useEffect টি যোগ করুন
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      // যদি html ট্যাগও স্ক্রোল হয়, তার জন্য:
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!project) return null;;



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden bg-[#04060a]/80 backdrop-blur-md">          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#04060a]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#0b0d13] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent z-10 text-slate-100"
          >
            {/* Soft background glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#fc6d5c]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#4745a7]/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button X */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#121620] border border-slate-800 text-slate-400 hover:text-white transition-colors duration-300 z-20"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Modal Body */}
            <div className="space-y-6 relative z-10 text-left pr-2">
              <h2 className="text-3xl md:text-4xl font-heading font-black text-[#fc6d5c] tracking-tight leading-tight pr-8">
                {project.title}
              </h2>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm font-semibold text-slate-400 border-b border-slate-800 pb-5">
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-[#6366f1] shrink-0" />
                    <span className="truncate max-w-[280px] sm:max-w-xs md:max-w-md">
                      {project.techStack.join(" • ")}
                    </span>
                  </div>
                )}

                {project.techStack && project.techStack.length > 0 && (
                  <span className="hidden sm:inline text-slate-700">•</span>
                )}

                <div className="flex items-center gap-2">
                  <Tag size={15} className="text-[#fc6d5c] shrink-0" />
                  <span className="uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>

                {project.status && (
                  <>
                    <span className="hidden sm:inline text-slate-700">•</span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span>{project.status}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Screenshots */}
              {project.screenshots?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">Screenshots</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {project.screenshots.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 hover:scale-105 transition duration-300"
                      >
                        <Image
                          src={image}
                          fill
                          alt={`Screenshot ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description Paragraph */}
              <div className="text-slate-300 text-sm md:text-base leading-relaxed font-sans whitespace-pre-line font-medium">
                {project.description}
              </div>

              {/* Key Features */}
              {project.features?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#121620] p-4"
                      >
                        <CheckCircle2 size={18} className="text-emerald-400" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges Faced */}
              {project.challenges && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-orange-400">
                    Challenges Faced
                  </h3>
                  <div className="rounded-2xl bg-[#121620] border border-slate-800 p-6">
                    <p className="whitespace-pre-line text-slate-300 leading-8">
                      {project.challenges}
                    </p>
                  </div>
                </div>
              )}

              {/* Results Delivered */}
              {project.results && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-emerald-400">
                    Results Delivered
                  </h3>
                  <div className="rounded-2xl bg-[#121620] border border-slate-800 p-6">
                    <p className="whitespace-pre-line text-slate-300 leading-8">
                      {project.results}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-900">
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#fc6d5c] hover:bg-[#fc6d5c]/90 text-white font-bold text-sm rounded-xl transition duration-300 shadow-[0_4px_20px_rgba(252,109,92,0.15)] hover:scale-105 transform"
                  >
                    <ExternalLink size={16} />
                    Visit Website
                  </a>
                )}

                {project.githubLink && project.githubLink !== "#" && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#121620] border border-slate-800 hover:border-slate-700 hover:bg-[#181d2a] text-white font-bold text-sm rounded-xl transition duration-300"
                  >
                    <Code size={16} className="text-[#6366f1]" />
                    Github Code
                  </a>
                )}

                {!project.liveLink && !project.githubLink && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <Info size={14} />
                    <span>No live deployment url configured yet</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}