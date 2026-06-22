"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Hero({ settings, apiUrl }: { settings: any; apiUrl: string }) {
  const personal = settings?.personalInfo || {};
  const socials = settings?.socialLinks || {};

  const handleDownload = async () => {
    try {
      await fetch(`${apiUrl}/resume/download`, {
        method: "POST",
      });
      toast.success("Resume download started!");
    } catch (error) {
      console.error("Failed to log resume download", error);
    }
  };

  const techItems = ["HTML5", "CSS3", "JavaScript", "TypeScript", "Next.js", "React.js", "Redux", "Node.js", "Express.js", "MongoDB", "AWS S3", "Git", "GitHub"];
  const marqueeItems = [...techItems, ...techItems, ...techItems];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 overflow-hidden bg-[#090D16]"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-bg-overlay [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col md:flex-row items-center justify-between gap-12 w-full relative z-10 py-12 md:py-20">
        
        {/* Left Side: Content (45% Width) */}
        <div className="space-y-8 text-left w-full md:w-[45%] flex flex-col justify-center">
          
          <div className="space-y-5">
            {/* "Hello." Typography: 20px, white, orange dot */}
            <div className="flex items-center">
              <span className="font-heading font-extrabold text-[20px] text-white tracking-wide">
                Hello<span className="text-[#FF7849]">.</span>
              </span>
            </div>

            {/* Title Block */}
            <div className="space-y-3">
              {/* "I'm Rabbinur": 36px, light gray */}
              <p className="text-[36px] font-heading font-medium tracking-tight text-[#d1d5db] leading-none">
                I'm {personal.name || "Rabbinur Muktar"}
              </p>
              
              {/* "Full Stack Developer": 64px desktop, 42px mobile, 900 weight, white */}
              <h1 className="text-[42px] lg:text-[64px] font-black font-heading tracking-tight text-white leading-[1.05]">
                {personal.role || "Full Stack Developer"}
              </h1>
            </div>

            {/* Description: max-width 500px, muted gray */}
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-[500px]">
              {settings?.heroSubtitle || "I build high fidelity client portals and robust server-side infrastructures specializing in Next.js, Node.js, and MongoDB."}
            </p>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Button: Background #FF7849, Text White, Rounded-md */}
            <a
              href="#contact"
              className="bg-[#FF7849] hover:bg-[#FF7849]/90 text-white font-bold text-xs px-8 py-3.5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(255,120,73,0.15)] flex items-center gap-2"
            >
              Got a project?
              <ArrowRight size={13} />
            </a>

            {/* Secondary Button: Border #FF7849, Transparent, Rounded-md */}
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                onClick={handleDownload}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#FF7849] text-white bg-transparent font-bold text-xs px-8 py-3.5 rounded-md hover:bg-[#FF7849]/10 transition-all duration-300"
              >
                My resume
              </a>
            )}
          </div>
        </div>

        {/* Right Side: Profile Circle Widget (55% Width) */}
        <div className="relative w-full md:w-[55%] flex items-center justify-center select-none shrink-0 py-8">
          {/* Decorative < element */}
          <span className="absolute left-0 lg:left-6 text-[#FF7849]/20 text-5xl font-black font-sans leading-none animate-pulse">{"<"}</span>

          {/* Wrapper for the profile circle and soft radial orange glow */}
          <div className="relative flex items-center justify-center">
            {/* Soft radial orange glow behind profile image */}
            <div className="absolute -inset-16 bg-[radial-gradient(circle_at_center,rgba(255,120,73,0.18)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none z-0" />

            {/* Image Circle Frame with one thick orange ring (Border 16px, Color #FF7849, Opacity 80%) */}
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full border-[16px] border-[#FF7849]/80 flex items-center justify-center p-2 shadow-[0_0_50px_rgba(255,120,73,0.25)] bg-[#090D16] z-10">
              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src={personal.profileImage || "/rabbinur.jpeg"}
                  alt={personal.name || "Rabbinur Muktar"}
                  fill
                  priority
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Decorative > element */}
          <span className="absolute right-0 lg:right-6 text-[#FF7849]/20 text-5xl font-black font-sans leading-none animate-pulse">{">"}</span>
        </div>
      </div>

      {/* Marquee Tech Stack Footer */}
      <div className="w-full overflow-hidden py-6 border-y border-border/5 bg-slate-950/20 backdrop-blur-sm mt-16">
        <div className="animate-marquee gap-20 flex">
          {marqueeItems.map((item, idx) => (
            <span
              key={idx}
              className="font-heading font-bold text-xs tracking-widest text-slate-500 uppercase hover:text-[#FF7849] transition-all duration-300 cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
