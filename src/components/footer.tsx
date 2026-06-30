"use client";

import { usePwa } from "@/components/Provider/PwaProvider";
import { useGetSettingsQuery } from "@/components/Redux/RTK/portfolioApi";
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const { isInstallable, isStandalone, isAlreadyInstalled, isNativeSupported, installApp } = usePwa();

  const handleDownloadApp = async () => {
    if (isInstallable) {
      await installApp();
      return;
    }

    if (isAlreadyInstalled || isStandalone) {
      toast.success("This app is already installed on your device!");
      return;
    }

    // Check if we are in development mode or non-secure local IP (both block PWAs)
    const isDev = process.env.NODE_ENV === "development";
    const isLocalIP = typeof window !== "undefined" && 
        window.location.protocol === "http:" && 
        window.location.hostname !== "localhost" && 
        window.location.hostname !== "127.0.0.1";

    if (isDev) {
        toast.warning(
            "You are in Development Mode. PWA features are disabled by default in development. Please build the project ('npm run build && npm run start') to test installation.",
            { duration: 8000 }
        );
        return;
    }

    if (isLocalIP) {
        toast.warning(
            "PWA installation requires a secure context (HTTPS) on mobile. Please connect via HTTPS or test on localhost.",
            { duration: 8000 }
        );
        return;
    }

    const UA = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOS = /iPhone|iPad|iPod/i.test(UA) || (typeof navigator !== "undefined" && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(UA);
    const isMobileScreen = typeof window !== "undefined" && (window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);
    const isMobile = isMobileUA || isMobileScreen;

    if (isIOS) {
      toast.info(
        "To install this app:\n• Tap the Share button 📤 in your Safari browser and select 'Add to Home Screen' ➕",
        { duration: 8000 }
      );
    } else if (isMobile) {
      toast.info(
        "App installer is initializing... If it doesn't prompt, you can install it by tapping your browser menu ••• and selecting 'Install App' or 'Add to Home Screen'.",
        { duration: 8000 }
      );
    } else if (isNativeSupported) {
      toast.info(
        "App installer is initializing... If it doesn't appear, you can also click the install icon 🖥️ in the top-right of your address bar, or refresh the page.",
        { duration: 8000 }
      );
    } else {
      toast.info(
        "To install this app:\n• Click your browser menu ••• and select 'Install' or 'Add to Home Screen'.",
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
              <Image
                src="/rabbinur-logo.png"
                alt="Rabbinur Muktar"
                width={100}
                height={100}
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
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
