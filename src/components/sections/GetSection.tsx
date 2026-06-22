"use client";

import { MessageCircle, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const contacts = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      value: "+212 767 589 573",
      icon: MessageCircle,
      href: "https://wa.me/212767589573",
      iconColor: "#22c55e", // বাই-ডিফল্ট আইকন এবং বক্স বর্ডার কালার
      glow: "rgba(34, 197, 94, 0.25)", // হোভার গ্লো শ্যাডো
    },
    {
      id: "github",
      name: "GitHub",
      value: "@Yassine-Ben-Zr...",
      icon: Github,
      href: "https://github.com",
      iconColor: "#4745a7", 
      glow: "rgba(71, 69, 167, 0.25)",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      value: "@Yassine-Ben-Zr...",
      icon: Linkedin,
      href: "https://linkedin.com",
      iconColor: "#0ea5e9",
      glow: "rgba(14, 165, 233, 0.25)",
    },
    {
      id: "twitter",
      name: "Twitter",
      value: "@Yassine-Ben-Zr...",
      icon: Twitter,
      href: "https://twitter.com",
      iconColor: "#1d9bf0",
      glow: "rgba(29, 155, 240, 0.25)",
    },
    {
      id: "instagram",
      name: "Instagram",
      value: "@Yassine-Ben-Zr...",
      icon: Instagram,
      href: "https://instagram.com",
      iconColor: "#ec4899",
      glow: "rgba(236, 72, 153, 0.25)",
    },
    {
      id: "email",
      name: "Email",
      value: "yassinebenzriouil...",
      icon: Mail,
      href: "mailto:yassinebenzriouil@example.com",
      iconColor: "#fc6d5c", 
      glow: "rgba(252, 109, 92, 0.25)",
    },
  ];

  return (
    // পুরো সেকশনের ব্যাকগ্রাউন্ডে প্রিমিয়াম লিনিয়ার গ্রেডিয়েন্ট
    <section 
      id="contact" 
      className="py-20 lg:py-24  relative overflow-hidden bg-gradient-to-br from-[#fafcff] via-[#f1f5ff] to-[#fff5f2] border-t border-black/[0.03]"
    >
      {/* ব্যাকগ্রাউন্ডের ভেতরের সফট গ্লো অরবিটস */}
      <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-[#4745a7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[450px] h-[450px] bg-[#fc6d5c]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* হেডার */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
            Get in <span className="bg-gradient-to-r from-[#fc6d5c] to-[#ff7849] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 font-semibold tracking-wide">
            Let's connect! Feel free to reach out through any of these platforms.
          </p>
        </div>

        {/* কন্টাক্ট গ্রিড */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;

            return (
              <motion.a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.01 }}
                style={{ "--glow-color": contact.glow } as React.CSSProperties}
                className="group relative flex items-center gap-5 p-6 bg-transparent backdrop-blur-sm border border-black/[0.04] rounded-[24px] cursor-pointer transition-all duration-300"
              >
                {/* হোভার গ্লো ইফেক্ট (বক্স শ্যাডো) */}
                <div 
                  className="absolute inset-0 rounded-[24px] transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10 blur-xl"
                  style={{ boxShadow: `0 20px 40px var(--glow-color)` }}
                />

                {/* হোভার বর্ডার হাইলাইট */}
                <div className="absolute inset-0 rounded-[24px] border border-transparent group-hover:border-slate-200 transition-colors duration-300 -z-10" />

                {/* আইকন বক্স কন্টেইনার (bydefault কালারড ব্যাকগ্রাউন্ড ও বর্ডার) */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-sm bg-[#ffffff] group-hover:scale-105"
                  style={{
                    borderColor: `${contact.iconColor}25`, // ডিফল্ট লাইট বর্ডার
                    backgroundColor: `${contact.iconColor}08` // ডিফল্ট লাইট ব্যাকগ্রাউন্ড
                  }}
                >
                  <Icon 
                    size={24} 
                    style={{ color: contact.iconColor }} // বাই-ডিফল্ট ওরিজিনাল কালার
                    className="transition-transform duration-300" 
                  />
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="flex flex-col min-w-0">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: contact.iconColor }} // নামটিও আইকনের সাথে ম্যাচড থাকবে
                  >
                    {contact.name}
                  </span>
                  <span className="text-base font-bold text-[#0f172a] mt-0.5 truncate max-w-[180px] md:max-w-full">
                    {contact.value}
                  </span>
                </div>

                {/* টপ রাইট এরো */}
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