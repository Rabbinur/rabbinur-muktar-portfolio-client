"use client";

import { useGetSettingsQuery } from "@/components/Redux/RTK/portfolioApi";
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Smartphone } from "lucide-react";
import Link from "next/link";
import { usePwa } from "@/components/Provider/PwaProvider";
import { toast } from "sonner";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const EMAIL_SUBJECT = "Project Inquiry – Let's Work Together";
const EMAIL_BODY = `Hi Rabbinur,

I came across your portfolio and I'm interested in discussing a potential project with you.

[Please describe your project here]

Looking forward to hearing from you!`;

export default function Footer() {
  const { data: settingsRes } = useGetSettingsQuery(undefined);
  const settings = settingsRes?.data || {};
  const socials = settings?.socialLinks || {};
  const personal = settings?.personalInfo || {};
  const contact = settings?.contactInfo || {};

  const { isInstallable, isStandalone, installApp } = usePwa();

  const handleDownloadApp = async () => {
    if (isInstallable) {
      await installApp();
    } else if (isStandalone) {
      toast.success("You are already running the standalone application!");
    } else {
      toast.info(
        "To install this app:\n• iOS Safari: Tap Share 📤 then 'Add to Home Screen' ➕\n• Chrome/Edge/Firefox: Tap menu ••• then 'Install' or 'Add to Home Screen'",
        { duration: 8000 }
      );
    }
  };

  const email = contact.email || "rabbinur345@gmail.com";
  const phone = contact.phone || "+8801685111860";
  const location = personal.location || "Bangladesh";
  const whatsapp = contact.whatsapp || "+8801685111860";
  const instagram = contact.instagram || "https://www.instagram.com/rabbinur_muktar/";

  const whatsappNumber = whatsapp.replace(/[^0-9]/g, "");
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(
    EMAIL_BODY
  )}`;
  const socialIcons = [
    { href: socials.github || "https://github.com/rabbinur", icon: Github, label: "GitHub" },
    { href: socials.linkedin || "https://www.linkedin.com/in/md-rabbinur-muktar-89a364232/", icon: Linkedin, label: "LinkedIn" },

    { href: socials.facebook || "#", icon: Facebook, label: "Facebook" },
    { href: instagram, icon: Instagram, label: "Instagram" },
    { href: gmailComposeUrl, icon: Mail, label: "Email", self: true },
  ];

  return (
    <footer className="border-t border-border/40 bg-slate-50 dark:bg-slate-50 py-14 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-border/40">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link href="#home" className="inline-block group">
              <span className="font-heading font-black text-xl tracking-tight text-foreground transition-colors group-hover:text-secondary">
                {personal.name || "Rabbinur Muktar"}<span className="text-secondary">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-500 font-medium leading-relaxed max-w-[220px]">
              {personal.role || "Full Stack Developer"} based in {location}. Building modern, beautiful, and highly scalable web applications with clean code and rich aesthetics.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {socialIcons.map(({ href, icon: Icon, label, self }) => (
                <a
                  key={label}
                  href={href}
                  target={self ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full border border-secondary/25 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,107,74,0.2)] hover:scale-105"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            {/* PWA Download App Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary/35 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-[1.02] text-xs font-bold cursor-pointer"
              >
                <Smartphone size={14} />
                {isStandalone ? "App Installed ✓" : "Download App"}
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground/80">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-secondary transition-colors font-medium flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-secondary transition-all duration-300 rounded" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Communication */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground/80">Direct Communication</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-secondary transition-colors font-medium group"
                >
                  <span className="w-7 h-7 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                    <MessageCircle size={13} className="text-green-500 group-hover:text-white transition-colors" />
                  </span>
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-secondary transition-colors font-medium group"
                >
                  <span className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all">
                    <Mail size={13} className="text-secondary group-hover:text-white transition-colors" />
                  </span>
                  {email}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-sm text-slate-500 font-medium">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <MapPin size={13} className="text-blue-400" />
                  </span>
                  {location}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Me */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground/80">Follow Me</h4>
            <div className="grid grid-cols-3 gap-2">
              {socialIcons.map(({ href, icon: Icon, label, self }) => (
                <a
                  key={label}
                  href={href}
                  target={self ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl border border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(255,107,74,0.2)] flex items-center justify-center"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Based in {location}. Available to work with clients worldwide.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs font-semibold text-slate-500">
          <p className="uppercase tracking-widest text-[10px] text-center md:text-left">
            © {new Date().getFullYear()} {personal.name || "Rabbinur Muktar"}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-secondary transition-colors">About</a>
            <span className="text-slate-300">•</span>
            <a href="#projects" className="hover:text-secondary transition-colors">Projects</a>
            <span className="text-slate-300">•</span>
            <a href="#contact" className="hover:text-secondary transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
