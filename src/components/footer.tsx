"use client";

import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import { useGetSettingsQuery } from "@/components/Redux/RTK/portfolioApi";

export default function Footer() {
  const { data: settingsRes } = useGetSettingsQuery(undefined);
  const settings = settingsRes?.data || {};
  const socials = settings?.socialLinks || {};
  const personal = settings?.personalInfo || {};

  return (
    <footer className="border-t border-border/40 bg-slate-50 dark:bg-slate-50 py-16 relative overflow-hidden">
      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Row: Name Brand & Social Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-border/40">
          
          {/* Logo Name & Short Desc */}
          <div className="text-center md:text-left space-y-2">
            <Link href="#home" className="inline-block group">
              <span className="font-heading font-black text-xl tracking-tight text-foreground transition-colors group-hover:text-secondary">
                {personal.name || "Rabbinur Muktar"}<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm">
              {personal.role || "Full Stack Developer"} based in {personal.location || "Bangladesh"}. Crafting high-fidelity, premium web solutions.
            </p>
          </div>

          {/* Social Icons (Coral Theme) */}
          <div className="flex items-center gap-3">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-secondary/25 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,107,74,0.05)] hover:shadow-[0_0_15px_rgba(255,107,74,0.2)] hover:scale-105"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-secondary/25 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,107,74,0.05)] hover:shadow-[0_0_15px_rgba(255,107,74,0.2)] hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-secondary/25 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,107,74,0.05)] hover:shadow-[0_0_15px_rgba(255,107,74,0.2)] hover:scale-105"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            )}
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-secondary/25 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,107,74,0.05)] hover:shadow-[0_0_15px_rgba(255,107,74,0.2)] hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Lower Row: Copyright Statement & Navigation Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs font-semibold text-slate-500">
          <p className="uppercase tracking-widest text-[10px] text-center md:text-left">
            © {new Date().getFullYear()} {personal.name || "Rabbinur Muktar"}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-secondary transition-colors">About</a>
            <span className="text-slate-300 dark:text-slate-800">•</span>
            <a href="#projects" className="hover:text-secondary transition-colors">Projects</a>
            <span className="text-slate-300 dark:text-slate-800">•</span>
            <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
