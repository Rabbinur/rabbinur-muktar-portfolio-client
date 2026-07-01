"use client";

import { useTrackResumeDownloadMutation } from "@/components/Redux/RTK/portfolioApi";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import HeroTyping from "../common/HeroTyping";

interface HeroProps {
  settings: any;
  apiUrl: string;
  projectCount?: number;
}

export default function Hero({ settings, apiUrl, projectCount = 34 }: HeroProps) {
  const personal = settings?.personalInfo || {};
  const [trackResumeDownload] = useTrackResumeDownloadMutation();

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await trackResumeDownload(undefined).unwrap();
    } catch {
      // silently fail — don't block the download
    }

    if (!personal.resumeUrl) return;

    try {
      const response = await fetch(personal.resumeUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "MD Rabbinur Muktar.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      toast.success("Resume download started!");
    } catch (error) {
      // Fallback: if fetch is blocked by CORS, open in new tab
      window.open(personal.resumeUrl, "_blank");
      toast.success("Opening resume...");
    }
  };

  const techItems = ["HTML5", "CSS3", "JavaScript", "TypeScript", "Next.js", "React.js", "Redux", "Node.js", "Express.js", "MongoDB", "AWS S3", "Git", "GitHub"];
  const marqueeItems = [...techItems, ...techItems, ...techItems];

  const bgSnippets = [
    { text: "console.log()", size: "text-sm font-mono", top: "12%", left: "10%", delay: 0.1, blur: "blur-[0.5px]", opacity: "opacity-12" },
    { text: "Front-End", size: "text-2xl font-black", top: "35%", left: "5%", delay: 0.2, blur: "blur-[1.5px]", opacity: "opacity-8" },
    { text: "$ npm install", size: "text-sm font-mono font-bold", top: "25%", left: "15%", delay: 0.4, blur: "blur-0", opacity: "opacity-12" },
    { text: "<html>", size: "text-lg font-mono", top: "20%", right: "15%", delay: 0.3, blur: "blur-[1px]", opacity: "opacity-10" },
    { text: "class=\"container\"", size: "text-xs font-mono", top: "42%", right: "5%", delay: 0.5, blur: "blur-[0.5px]", opacity: "opacity-8" },
    { text: "Mobile First", size: "text-sm font-bold italic", top: "52%", right: "12%", delay: 0.2, blur: "blur-0", opacity: "opacity-11" },
    { text: "React", size: "text-3xl font-extrabold", top: "68%", left: "8%", delay: 0.6, blur: "blur-[2px]", opacity: "opacity-7" },
    { text: "Next.js", size: "text-2xl font-black", top: "62%", right: "18%", delay: 0.7, blur: "blur-[1.5px]", opacity: "opacity-9" },
    { text: "TypeScript", size: "text-base font-semibold", top: "78%", left: "28%", delay: 0.8, blur: "blur-[0.5px]", opacity: "opacity-12" },
    { text: "Tailwind CSS", size: "text-sm font-bold", top: "82%", right: "10%", delay: 0.9, blur: "blur-0", opacity: "opacity-12" },
  ];

  const EMAIL_SUBJECT = "Project Inquiry – Let's Work Together";
  const EMAIL_BODY = `Hi Rabbinur,

I came across your portfolio and I'm interested in discussing a potential project with you.

[Please describe your project here]

Looking forward to hearing from you!`;

  const email = settings?.contactInfo?.email || "rabbinur345@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(
    EMAIL_BODY
  )}`;
  const stats = [
    {
      label: settings?.stat1Label || "Completed Projects",
      value: settings?.stat1Value || `${projectCount}+`
    },
    {
      label: settings?.stat2Label || "Client satisfaction",
      value: settings?.stat2Value || "99%"
    },
    {
      label: settings?.stat3Label || "Years experience",
      value: settings?.stat3Value || "3+"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"

      className="relative lg:min-h-screen pt-16 flex flex-col justify-between bg-background  overflow-hidden"
    >
      <div className="absolute inset-0 ">
        {/* Left */}
        <div className="absolute left-0 top-0 h-full w-[58%] bg-[#FDF7F5]" />

        {/* Right */}
        <div className="absolute right-0 top-0 h-full w-[42%] bg-[#EAF4FF]" />

        {/* Blend Area */}
        <div
          className="absolute top-0 left-[48%] h-full w-[20%]"
          style={{
            background:
              "linear-gradient(90deg,#FDF7F5 0%,#fefaf8 20%,#f8fbff 70%,#EAF4FF 100%)",
          }}
        />
      </div>
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-bg-overlay [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center w-full relative z-10 py-12 ">

        {/* Floating Dashboard Card wrapper (Jhon Smith Aesthetic) */}
        <div className="  flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">

          {/* Left Side: Content & Statistics (55% Width) */}
          <motion.div
            className="space-y-8 text-left w-full lg:w-[55%] flex flex-col justify-center order-1 lg:order-2 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-5">
              {/* "Hello." Typography: 20px, text-foreground, orange dot */}
              <motion.div className="flex items-center" variants={itemVariants}>
                <Sparkles size={14} className="animate-pulse text-secondary mr-1" />  <span className="font-heading font-extrabold text-[20px] text-secondary tracking-wide">
                  Welcome to my world<span className="text-[#FF7849]">.</span>
                </span>
              </motion.div>

              {/* Title Block */}
              <div className="space-y-3">
                {/* "I'm Rabbinur Muktar" customized Jhon Smith style */}
                <motion.h1
                  className="text-[36px] lg:text-[48px] font-heading font-medium tracking-tight text-foreground leading-none"
                  variants={itemVariants}
                >
                  Hi, I'm <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF7849] to-[#6366f1]">Rabbinur</span>{" "}
                  <span className="text-transparent  font-extrabold  [-webkit-text-stroke:1px_var(--secondary)]">Muktar</span>
                </motion.h1>

                {/* "Full Stack Developer": 64px desktop, 42px mobile, 900 weight, deep indigo */}
                <motion.div variants={itemVariants}>
                  {/* <TypeAnimation
                    sequence={[
                      "Full Stack Developer",
                      2500,
                      "MERN Stack Developer",
                      2500,
                      "Next.js Developer",
                      2500,
                    ]}
                    speed={90}
                    deletionSpeed={95}
                    repeat={Infinity}
                    cursor={true}
                    preRenderFirstString={true}
                     wrapper="h2"
                  
                    className="
    text-[32px]
    lg:text-[48px]
    font-black
    font-heading
    tracking-tight
    text-primary/80
    leading-[1.05]
    min-h-[60px]
  "
                  /> */}
                  <HeroTyping
                    strings={[
                      "Full Stack Developer",
                      "MERN Stack Developer",
                      "Next.js Developer",
                    ]}
                    className="
    text-[32px]
    lg:text-[48px]
    font-black
    font-heading
    tracking-tight
    text-primary
    leading-[1.05]
  "
                  />
                </motion.div>
              </div>

              {/* Description: max-width 500px, responsive slate */}
              <motion.p
                className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-[500px]"
                variants={itemVariants}
              >
                {settings?.heroSubtitle || "I build high fidelity client portals and robust server-side infrastructures specializing in Next.js, Node.js, and MongoDB."}
              </motion.p>

              {/* Social Icons row matching the Jhon Smith reference model */}
              <motion.div className="flex items-center gap-5 text-slate-400 dark:text-slate-500 pt-1" variants={itemVariants}>
                {settings?.socialLinks?.github && (
                  <a href={settings.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:text-[#FF7849] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                )}
                {settings?.socialLinks?.linkedin && (
                  <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-[#FF7849] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
                )}

                {email && (
                  <a onClick={() => window.open(gmailUrl, "_blank")} aria-label="Send email" className="cursor-pointer hover:text-[#FF7849] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </a>
                )}
              </motion.div>
            </div>

            {/* CTA Actions */}
            <motion.div className="flex flex-wrap items-center gap-4 pt-2" variants={itemVariants}>
              {/* Primary Button: Background #FF7849, Text White, Rounded-md */}
              <a
                href="#contact"
                className="bg-[#FF7849] hover:bg-[#FF7849]/90 text-white font-bold text-xs px-8 py-3.5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(255,120,73,0.15)] flex items-center gap-2"
              >
                Got a project?
                <ArrowRight size={13} />
              </a>

              {/* Secondary Button: Download CV custom underline */}
              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  onClick={handleDownload}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground bg-transparent font-black text-xs px-4 py-3.5 hover:text-[#FF7849] transition-all duration-300 underline underline-offset-8 decoration-2 decoration-[#FF7849]"
                >
                  Download CV
                </a>
              )}
            </motion.div>

            {/* Statistics Bento Grid row below CTAs */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-[500px]"
              variants={itemVariants}
            >
              {stats.map((st) => (
                <div
                  key={st.label}
                  className="glass-card p-3 sm:p-5 rounded-xl text-center flex flex-col justify-center items-center space-y-1.5 hover:border-[#FF7849]/20 transition-all duration-300"
                >
                  <p className="text-lg sm:text-2xl font-heading font-black text-[#FF7849] leading-none">
                    {st.value}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 font-black uppercase tracking-wider leading-tight">
                    {st.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Developer Image & Blended Snippet Background (45% Width) */}
          <div className="relative hidden lg:block w-full h-full lg:w-[45%] flex items-center justify-center select-none shrink-0 py-8 order-1 lg:order-2">
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(circle at center, #e2f0fe 0%, #e2f0fe 60%, #e2f0fe 100%)",
                filter: "blur(40px)",
              }}
            />


            {/* Snippets Layer */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              {bgSnippets.map((s, idx) => (
                <motion.div
                  key={idx}
                  className={`
    absolute
    font-heading
    tracking-widest
    text-primary/25
    ${s.size}
  `}
                  style={{
                    top: s.top,
                    left: s.left,
                    right: s.right,
                  }}
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: s.delay,
                  }}
                >
                  {s.text}
                </motion.div>
              ))}
            </div>

            {/* Image Circle Frame with thick border, white background in light mode */}
            <motion.div
              className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[360px] lg:w-[360px]  flex items-center justify-center mx-auto z-20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute top-1/2 -left-12 -translate-y-1/2 text-primary/20 text-5xl font-black font-sans leading-none animate-pulse z-20">{"<"}</span>

              <div className="relative h-full w-full rounded-full overflow-hidden">
                <Image
                  src="/rabbinur.jpeg"
                  alt="Rabbinur Muktar - Full Stack Developer"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1023px) 0px, (max-width: 1280px) 280px, 360px"
                  className="rounded-full object-cover"
                />
              </div>
              {/* Decorative > bracket element */}
              <span className="absolute top-1/2 -right-12 -translate-y-1/2 text-primary/20 text-5xl font-black font-sans leading-none animate-pulse z-20">{">"}</span>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Marquee Tech Stack Footer */}
      {/* <div className="w-full overflow-hidden py-6 border-y border-border/40 bg-slate-100/50 dark:bg-slate-950/20 backdrop-blur-sm mt-16">
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
      </div> */}
    </section>
  );
}
