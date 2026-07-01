"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import type { HomeSettings } from "@/lib/homeApi";

// Fallback contact data
const FALLBACK = {
  email: "rabbinur345@gmail.com",
  phone: "+8801685111860",
  whatsapp: "+8801685111860",
  github: "https://github.com/rabbinur",
  linkedin: "https://www.linkedin.com/in/md-rabbinur-muktar-89a364232/",
  twitter: "https://twitter.com/rabbinurmuktar",
  instagram: "https://www.instagram.com/rabbinur_muktar/",
};

const EMAIL_SUBJECT = "Project Inquiry – Let's Work Together";
const EMAIL_BODY = `Hi Rabbinur,

I came across your portfolio and I'm interested in discussing a potential project with you.

[Please describe your project here]

Looking forward to hearing from you!`;

export default function ContactSection({ settings }: { settings: HomeSettings }) {
  const contact = settings?.contactInfo || {};
  const socials = settings?.socialLinks || {};

  const email = contact.email || FALLBACK.email;
  const phone = contact.phone || FALLBACK.phone;
  const whatsapp = contact.whatsapp || FALLBACK.whatsapp;
  const github = socials.github || FALLBACK.github;
  const linkedin = socials.linkedin || FALLBACK.linkedin;
  const twitter = socials.twitter || FALLBACK.twitter;
  const instagram = contact.instagram || FALLBACK.instagram;

  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(EMAIL_BODY)}`;

  const whatsappNumber = whatsapp.replace(/[^0-9]/g, "");
  const contacts = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      value: whatsapp,
      icon: MessageCircle,
      href: `https://wa.me/${whatsappNumber}`,
      iconColor: "#22c55e",
      glow: "rgba(34, 197, 94, 0.25)",
    },
    {
      id: "github",
      name: "GitHub",
      value: github.replace("https://github.com/", "@"),
      icon: Github,
      href: github,
      iconColor: "#4745a7",
      glow: "rgba(71, 69, 167, 0.25)",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      value: "@" + (linkedin.split("/in/")[1]?.replace(/\/$/, "") || "rabbinur-muktar"),
      icon: Linkedin,
      href: linkedin,
      iconColor: "#0ea5e9",
      glow: "rgba(14, 165, 233, 0.25)",
    },
    {
      id: "twitter",
      name: "Twitter / X",
      value: "@" + (twitter.split("twitter.com/")[1]?.replace(/\/$/, "") || "rabbinurmuktar"),
      icon: Twitter,
      href: twitter,
      iconColor: "#1d9bf0",
      glow: "rgba(29, 155, 240, 0.25)",
    },
    {
      id: "instagram",
      name: "Instagram",
      value: "@" + (instagram.split("instagram.com/")[1]?.replace(/\/$/, "") || "rabbinur_muktar"),
      icon: Instagram,
      href: instagram,
      iconColor: "#ec4899",
      glow: "rgba(236, 72, 153, 0.25)",
    },
    {
      id: "email",
      name: "Email",
      value: email,
      icon: Mail,
      href: emailHref,
      iconColor: "#fc6d5c",
      glow: "rgba(252, 109, 92, 0.25)",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-[#fafcff] via-[#f1f5ff] to-[#fff5f2] border-t border-black/[0.03]"
    >
      {/* Background glows */}
      <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-[#4745a7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[450px] h-[450px] bg-[#fc6d5c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
            Get in <span className="bg-gradient-to-r from-[#fc6d5c] to-[#ff7849] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 font-semibold tracking-wide">
            Let's connect! Feel free to reach out through any of these platforms.
          </p>
        </div>

        {/* Contact grid */}
   
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const isEmail = contact.id === "email";

            const handleClick = (e: React.MouseEvent) => {
              if (!isEmail) return;

              e.preventDefault();

              // FORCE Gmail open
              const gmailLink = contact.href;

              window.open(gmailLink, "_blank", "noopener,noreferrer");
            };

            return (
              <motion.a
                key={contact.id}
                href={contact.href}
                target={isEmail ? "_blank" : "_blank"}
                rel="noopener noreferrer"
                onClick={isEmail ? handleClick : undefined}
                whileHover={{ y: -6, scale: 1.01 }}
                style={{ "--glow-color": contact.glow } as React.CSSProperties}
                className="group relative flex items-center gap-5 p-6 bg-transparent backdrop-blur-sm border border-black/[0.04] rounded-[24px] cursor-pointer transition-all duration-300"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[24px] transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10 blur-xl"
                  style={{ boxShadow: `0 20px 40px var(--glow-color)` }}
                />

                {/* Hover border */}
                <div className="absolute inset-0 rounded-[24px] border border-transparent group-hover:border-slate-200 transition-colors duration-300 -z-10" />

                {/* Icon box */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-sm bg-[#ffffff] group-hover:scale-105"
                  style={{
                    borderColor: `${contact.iconColor}25`,
                    backgroundColor: `${contact.iconColor}08`,
                  }}
                >
                  <Icon
                    size={24}
                    style={{ color: contact.iconColor }}
                    className="transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: contact.iconColor }}
                  >
                    {contact.name}
                  </span>
                  <span className="text-sm font-bold text-[#0f172a] mt-0.5 truncate max-w-[180px] md:max-w-full">
                    {contact.value}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-bold"
                  style={{ color: contact.iconColor }}
                >
                  ↗
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}