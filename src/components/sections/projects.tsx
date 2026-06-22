"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, ShoppingCart, Users, Settings, Activity, ArrowUpRight } from "lucide-react";

export default function Projects({ projects }: { projects: any[] }) {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  const openDetails = (proj: any) => {
    setActiveProject(proj);
    setActiveScreenshotIdx(0);
  };

  const handleNextScreenshot = () => {
    if (!activeProject?.screenshots?.length) return;
    setActiveScreenshotIdx((prev) => (prev + 1) % activeProject.screenshots.length);
  };

  const handlePrevScreenshot = () => {
    if (!activeProject?.screenshots?.length) return;
    setActiveScreenshotIdx((prev) =>
      prev === 0 ? activeProject.screenshots.length - 1 : prev - 1
    );
  };

  // Render a dynamic project visual mockup based on project type
  const renderProjectMockup = (proj: any) => {
    const slug = (proj.slug || "").toLowerCase();
    const title = (proj.title || "").toLowerCase();

    // 1. E-commerce / ShoppingCart.bd
    if (slug.includes("shopping") || title.includes("shopping") || slug.includes("cart") || title.includes("cart") || slug.includes("commerce")) {
      return (
        <div className="w-full h-64 sm:h-80 bg-[#080d1a] border border-border/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,107,74,0.03)] font-sans relative overflow-hidden group">
          {/* Decorative gradients */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-border/5 pb-3">
            <span className="text-[10px] uppercase font-black tracking-wider text-secondary flex items-center gap-1.5">
              <ShoppingCart size={12} />
              ShoppingCart.bd Portal
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-4 my-auto">
            {/* Mock Checkout Gateway Selector */}
            <div className="bg-[#0b0f19] p-3.5 rounded-xl border border-border/5 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400">
                <span>ACTIVE GATEWAY</span>
                <span className="text-secondary font-bold">bKash Verified</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#ff6b4a]/10 border border-[#ff6b4a]/30 text-white rounded-lg p-2 text-center text-xs font-bold">
                  bKash Pay
                </div>
                <div className="flex-1 bg-[#05070a] border border-border/5 text-slate-500 rounded-lg p-2 text-center text-xs font-semibold">
                  Stripe Checkout
                </div>
              </div>
            </div>

            {/* Price block */}
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-black text-slate-500">Transaction Status</span>
                <p className="text-xs text-emerald-400 font-bold">Success. Order #9421</p>
              </div>
              <p className="text-xl font-heading font-black text-white">$149.00</p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-left">
            $ bkash-api: payment response success (200 OK)
          </div>
        </div>
      );
    }

    // 2. Matrimonial / USA Marry
    if (slug.includes("marry") || title.includes("marry") || slug.includes("matrimon")) {
      return (
        <div className="w-full h-64 sm:h-80 bg-[#080d1a] border border-border/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,107,74,0.03)] font-sans relative overflow-hidden group">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-border/5 pb-3">
            <span className="text-[10px] uppercase font-black tracking-wider text-secondary flex items-center gap-1.5">
              <Users size={12} />
              USA Marry Matrimonial
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">SEO Configured</span>
          </div>

          <div className="space-y-3.5 my-auto">
            {/* Matching profile card mockup */}
            <div className="bg-[#0b0f19] border border-border/5 rounded-xl p-3.5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-white">
                JD
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white leading-none">Jane Doe</h4>
                  <span className="text-[9px] text-emerald-400 font-black">98% Match</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: "98%" }} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-slate-500">Google SEO Rank Index</span>
              <p className="text-xs text-white font-bold">Dynamic OpenGraph Pre-rendering Enabled</p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-left">
            $ next-seo: pre-cached profiles edge routes (45ms)
          </div>
        </div>
      );
    }

    // 3. CRM Distributor
    if (slug.includes("crm") || title.includes("crm") || slug.includes("distrib")) {
      return (
        <div className="w-full h-64 sm:h-80 bg-[#080d1a] border border-border/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,107,74,0.03)] font-sans relative overflow-hidden group">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-border/5 pb-3">
            <span className="text-[10px] uppercase font-black tracking-wider text-secondary flex items-center gap-1.5">
              <Settings size={12} />
              CRM Operations Center
            </span>
            <span className="bg-secondary/15 text-secondary text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
              RBAC Secure
            </span>
          </div>

          <div className="space-y-3 my-auto">
            {/* Inventory table row list */}
            <div className="space-y-2">
              <div className="bg-[#0b0f19] border border-border/5 px-3.5 py-2.5 rounded-lg flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>Dynamic Stock Tracker</span>
                <span className="text-slate-400">4,850 units</span>
              </div>
              <div className="bg-[#0b0f19] border border-border/5 px-3.5 py-2.5 rounded-lg flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>Loading Sheets Compiler</span>
                <span className="text-emerald-400 font-bold">80ms processing</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-left">
            $ aggregated: mongodb collections indexed (0.8ms query)
          </div>
        </div>
      );
    }

    // 4. Enterprise Dashboard / Analytics
    if (slug.includes("dash") || title.includes("dash") || slug.includes("analytics") || title.includes("metrics")) {
      return (
        <div className="w-full h-64 sm:h-80 bg-[#080d1a] border border-border/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,107,74,0.03)] font-sans relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-border/5 pb-3">
            <span className="text-[10px] uppercase font-black tracking-wider text-secondary flex items-center gap-1.5">
              <Activity size={12} />
              Metrics Dashboard
            </span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase">Realtime Active</span>
          </div>

          <div className="my-auto space-y-3">
            {/* SVG line chart mockup */}
            <svg className="w-full h-24 stroke-secondary fill-none" viewBox="0 0 300 100">
              <path 
                d="M10 90 Q 50 20, 100 70 T 200 10 T 290 40" 
                strokeWidth="3" 
                className="stroke-secondary"
              />
              <path 
                d="M10 90 Q 50 20, 100 70 T 200 10 T 290 40 L 290 100 L 10 100 Z" 
                fill="url(#gradient)" 
                strokeWidth="0"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between items-center text-[10px] font-black text-slate-500">
              <span>ACTIVE USER INDEX: +24%</span>
              <span>STABLE 60 FPS</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-left">
            $ telemetry: charts rendering on hardware canvas hooks
          </div>
        </div>
      );
    }

    // 5. Generic Code Terminal Mockup (matching Battleship style in provided template)
    return (
      <div className="w-full h-64 sm:h-80 bg-[#080d1a] border border-border/5 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,107,74,0.03)] font-mono relative overflow-hidden group text-left">
        <div className="flex items-center justify-between border-b border-border/5 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">shell console</span>
        </div>

        <div className="text-[11px] text-slate-300 leading-relaxed my-auto space-y-1.5">
          <p className="text-secondary">$ node app.js</p>
          <p className="text-slate-400">&gt; Starting production micro-services...</p>
          <p className="text-emerald-400">&gt; Live API server listening on port 5005</p>
          <p className="text-slate-500">&gt; MongoDB connection established successfully</p>
          <p className="text-slate-500">&gt; Redis persistent sessions initialized</p>
          <p className="text-[#ff6b4a]">&gt; Status 200 OK — project queries mapped</p>
        </div>

        <div className="text-[9px] text-slate-500">
          SYSTEM HEALTH: 100% | CPU LOAD: 0.12
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-28 relative bg-[#05070a] border-t border-border/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight leading-none">
            Projects
          </h2>
          <div className="h-10 w-[1px] bg-secondary/50 mx-auto" />
        </div>

        {/* Zigzag Project Rows */}
        <div className="space-y-24">
          {projects.map((proj: any, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={proj.id || proj._id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Left/Right Side Mockup */}
                <div className="w-full lg:w-1/2">
                  {renderProjectMockup(proj)}
                </div>

                {/* Left/Right Side Content */}
                <div className="w-full lg:w-1/2 space-y-6 text-left">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-heading font-black text-white leading-none">
                      {proj.title}
                    </h3>
                    
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack?.map((tech: string) => (
                        <span key={tech} className="text-[10px] font-black uppercase bg-[#0b0f19] border border-border/5 text-slate-400 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-white font-black text-xs px-6 py-2.5 rounded-xl hover:opacity-95 transition-opacity"
                      >
                        View Github
                      </a>
                    )}
                    <button
                      onClick={() => openDetails(proj)}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-slate-300 hover:text-secondary transition-colors"
                    >
                      <span>View project</span>
                      <ArrowUpRight size={14} className="text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Details Dialog Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#080d1a] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border/5 flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header banner */}
            <div className="p-5 border-b border-border/5 flex items-center justify-between bg-slate-950/20">
              <div>
                <h3 className="text-xl font-heading font-black text-white">{activeProject.title}</h3>
                <p className="text-xs text-slate-400 font-semibold">Case Study Details</p>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-xl border border-border/10 hover:bg-input transition-colors text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 space-y-8 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Visual carousel side (3 columns) */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Image Display */}
                  <div className="relative h-64 sm:h-80 rounded-2xl border border-border/5 overflow-hidden bg-[#05070a]/50">
                    {activeProject.screenshots?.length > 0 ? (
                      <>
                        <Image
                          src={activeProject.screenshots[activeScreenshotIdx]}
                          alt={`${activeProject.title} screenshot ${activeScreenshotIdx}`}
                          fill
                          className="object-cover"
                        />
                        {activeProject.screenshots.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevScreenshot}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors shadow-sm"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={handleNextScreenshot}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors shadow-sm"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </>
                    ) : activeProject.thumbnail ? (
                      <Image
                        src={activeProject.thumbnail}
                        alt={activeProject.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        No showcase screenshots
                      </div>
                    )}
                  </div>

                  {/* Screenshot Indicators */}
                  {activeProject.screenshots?.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto py-1">
                      {activeProject.screenshots.map((url: string, idx: number) => (
                        <button
                          key={url}
                          onClick={() => setActiveScreenshotIdx(idx)}
                          className={`relative h-12 w-20 rounded-lg overflow-hidden border shrink-0 transition-all ${
                            idx === activeScreenshotIdx ? "border-secondary scale-95" : "border-border/5 opacity-70"
                          }`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Challenges & Results */}
                  <div className="space-y-4 pt-4 border-t border-border/5">
                    {activeProject.challenges && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Challenges faced</h4>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          {activeProject.challenges}
                        </p>
                      </div>
                    )}
                    {activeProject.results && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Results achieved</h4>
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          {activeProject.results}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech & Info sidebar side (2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {activeProject.liveLink && (
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-secondary text-white py-2.5 rounded-xl text-xs font-black hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {activeProject.githubLink && (
                      <a
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 border border-border/10 text-slate-300 py-2.5 rounded-xl text-xs font-black hover:bg-input transition-colors"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack?.map((tech: string) => (
                        <span key={tech} className="text-xs font-bold bg-[#0b0f19] border border-border/5 text-slate-300 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  {activeProject.features && activeProject.features.length > 0 && (
                    <div className="space-y-2 border-t border-border/5 pt-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Key Features</h4>
                      <ul className="space-y-2">
                        {activeProject.features.map((feat: string, i: number) => (
                          <li key={i} className="text-xs text-slate-400 font-semibold flex items-start gap-2">
                            <span className="h-1.5 w-1.5 bg-secondary rounded-full mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Main Overview */}
                  <div className="space-y-1.5 border-t border-border/5 pt-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Project Overview</h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-border/5 flex items-center justify-end bg-slate-950/20">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 bg-secondary text-white rounded-xl text-xs font-black hover:opacity-95 transition-opacity"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
