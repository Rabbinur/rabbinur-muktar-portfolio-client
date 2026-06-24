"use client";

import { useGetProjectsQuery } from "@/components/Redux/RTK/portfolioApi";
import ProjectDetailsModal from "@/components/common/ProjectDetailsModal";
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  type: string;
  status: string;
  liveLink: string;
  githubLink: string;
  detailsLink: string;
};

export default function ProjectsSection() {
  const { data: projectsRes, isLoading } = useGetProjectsQuery(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects: Project[] =
    projectsRes?.data?.data?.map((p: any) => ({
      id: p._id || p.id,
      title: p.title,
      description: p.description,
      image: p.thumbnail,
      techStack: p.techStack || [],
      type: p.type || "WEB APP",
      status: p.status || "Completed",
      liveLink: p.liveLink || "",
      githubLink: p.githubLink || "",
      detailsLink: p.detailsLink || "",
    })) || [];

  useEffect(() => {
    if (isLoading || !projects.length || !wrapperRef.current) return;

    // ১. smooth scrolling এর জন্য Lenis ইনিশিয়ালাইজ করা হলো
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ২. শুধু ভ্যালিড কার্ড এলিমেন্টগুলো ফিল্টার করা হলো
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cardElements.length;

    if (totalCards === 0) return;

    // ৩. কার্ডগুলোর প্রাথমিক পজিশন সেট করা (Initial positions)
    cardElements.forEach((card, i) => {
      if (i === 0) {
        // প্রথম কার্ডটি স্ক্রিনে ফুল স্কেলে থাকবে
        gsap.set(card, { y: 0, scale: 1, opacity: 1 });
      } else {
        // বাকি কার্ডগুলো স্ক্রিনের নিচে লুকানো থাকবে এবং স্কেল ছোট থাকবে
        const targetScale = i === 1 ? 0.85 : i === 2 ? 0.9 : 0.95;
        gsap.set(card, { y: "100%", scale: targetScale, opacity: 0.5 });
      }
    });

    // ৪. GSAP Timeline এবং ScrollTrigger তৈরি (প্যারেন্টকে pin করা হচ্ছে)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${(totalCards - 1) * 100}%`, // reference app-এর মতো dynamic end
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // ৫. সিকুয়েন্স অনুযায়ী কার্ডের অ্যানিমেশন (Sequential Animation)
    cardElements.forEach((card, i) => {
      if (i === 0) {
        // ১ম কার্ডটি স্কেল ডাউন ও ফেইড হবে যখন ২য় কার্ডটি উঠবে
        tl.to(card, { scale: 0.85, opacity: 0.4, duration: 1, ease: "power2.inOut" }, i);
      } else {
        const startTime = i - 1;
        const targetScale = i === 1 ? 0.85 : i === 2 ? 0.9 : 0.95;

        // বর্তমান কার্ডটি নিচ থেকে ওপরে উঠবে (ওভারল্যাপ হবে)
        tl.to(card, { y: "0%", scale: 1, opacity: 1, duration: 1, ease: "power2.inOut" }, startTime);

        // আগের কার্ডটি আরও ছোট এবং ঝাপসা হয়ে যাবে
        if (i > 0) {
          const prevCard = cardElements[i - 1];
          const prevScale = i - 1 === 0 ? 0.8 : 0.85;
          tl.to(prevCard, { scale: prevScale, opacity: 0.3, duration: 1, ease: "power2.inOut" }, startTime);
        }
      }
    });

    // Lenis স্ক্রল হলে ScrollTrigger আপডেট করা
    lenis.on("scroll", ScrollTrigger.update);

    // ক্লিনআপ ফাংশন (মেমোরি লিক ও ডুপ্লিকেট ট্রিগার বন্ধ করতে)
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, projects.length]);

  if (isLoading || !projects.length) return null;

  return (
    <section id="projects" className="relative bg-[#ebe3fa] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold">
            My <span className="text-[#fc6d5c]">Projects</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-slate-500">
            This is where I share the projects I've built, combining innovation with clean, efficient code.
          </p>
        </div>

        {/* GSAP wrapper wrapperRef ব্যবহার করা হয়েছে */}
        <div
          ref={wrapperRef}
          className="relative w-full overflow-hidden"
          style={{
            height: "100vh", // স্ক্রিন লক বা পিন করার জন্য এটি স্ক্রিন সাইজের হবে
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4"
            >
              <div
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                /* 
                  image_dcfb9f.png এর মতো হোভার কালার পরিবর্তন:
                  - নরমাল ব্যাকগ্রাউন্ড: bg-[#111827], বর্ডার: border-transparent
                  - হোভার ব্যাকগ্রাউন্ড: bg-[#3b2d54] (পার্পল টোন) এবং গ্লোয়িং বর্ডার
                */
                className="
        group
        cursor-pointer
        w-full
        max-w-5xl
        max-h-[85vh]
        overflow-hidden
        rounded-[32px]
        border
        border-transparent
        bg-blue-950  [#111827]
        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        hover:bg-[#3b2d54]
        hover:border-fuchsia-500/40
        hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]
        transition-all
        duration-500
        ease-out
      "
              >
                <div className="grid lg:grid-cols-2 items-center h- full">
                  {/* Content Section */}
                  <div className="p-10 lg:p-14 flex flex-col justify-between h- full">
                    <div className="space-y-3">
                      <div className="flex gap-3 mb-5">
                        <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-400">
                          {project.type}
                        </span>
                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                          {project.status}
                        </span>
                      </div>

                      {/* টেক্সটের কালার হোভারে লাইট পার্পল/পিংক গ্রেডিয়েন্টে গ্লো করবে */}
                      <h3 className="text-3xl font-bold text-white  group-hover:text-fuchsia-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed line-clamp-4 group-hover:text-slate-200 transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="">
                    

                      <div className="flex flex-wrap gap-2  my-3">
                        {project.techStack?.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="  rounded-full hover:scale-105 bg-pink-600/20 border border-pink-600/30 px-3 py-1 text-xs text-pink-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link href={project.liveLink}>
                          <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="border border-white/20 px-4 py-2 rounded-lg text-white font-medium group-hover:border-fuchsia-400 transition-colors inline-flex items-center gap-2 rounded-lg  px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                          >
                            Live View
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.button>
                        </Link>

                        {project.githubLink && (
                          <Link href={project.githubLink}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="border border-white/20 px-4 py-2 rounded-lg text-white font-medium group-hover:border-fuchsia-400 transition-colors inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-700/50 hover:border-slate-600"
                            >
                              GitHub Code
                              <ArrowUpRight className="h-4 w-4" />
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 
          Image Section: 
          image_dcfb9f.png এর মতো 3D পপ-আউট ট্রিল্ট করার জন্য 
          [perspective:1000px] ব্যবহার করা হয়েছে।
        */}
                  <div className="relative p-8 flex items-center justify-center [perspective:1000px]">
                    <div
                      className="
              w-full 
              rounded-2xl 
              border 
              border-white/10 
              overflow-hidden
              shadow-2xl
              transition-all 
              duration-500 
              ease-out
              /* হোভার করলে ইমেজটি সামনের দিকে কাত হয়ে ভেসে উঠবে (Perspective Shift) */
              group-hover:scale-105 
              group-hover:rotate-y-[-6deg] 
              group-hover:rotate-x-[4deg]
              group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]
            "
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="
                w-full
                max-h-[350px]
                object-cover
                transition-transform
                duration-500
              "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <Link
            href="/projects"
            className="rounded-full bg-[#fc6d5c] px-8 py-4 text-white font-semibold hover:bg-[#4745a7] transition"
          >
            Check Out More Projects
          </Link>
        </div>
      </div>

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}