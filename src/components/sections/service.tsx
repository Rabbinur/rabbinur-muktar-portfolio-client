"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AboutProps } from "./about";

import ServicePills from "./Pill";


const Services = ({ settings, projectCount }: AboutProps) => {
    const [activeService, setActiveService] = useState(0);
    const services = [
        {
            title: "Planning & Strategy",
            description:
                "We'll collaborate to understand your business goals, target audience, and project requirements. Together we'll define the roadmap, user flow, and key features before development begins.",
            projectsCount: "Step 01",
        },
        {
            title: "Development & Progress",
            description:
                "After approval, I begin building your project using modern technologies. You'll receive regular updates, previews, and feedback opportunities throughout the development process.",
            projectsCount: "Step 02",
        },
        {
            title: "Launch & Optimization",
            description:
                "Once everything is tested and polished, your project goes live. Performance, SEO, responsiveness, and user experience are optimized for long-term success.",
            projectsCount: "Step 03",
        },
    ];
    const pills = [
        { title: "Next.js", color: "bg-cyan-500" },
        { title: "React.js", color: "bg-yellow-400 text-black" },
        { title: "Node.js", color: "bg-pink-500" },
        { title: "MongoDB", color: "bg-emerald-500" },
        { title: "TypeScript", color: "bg-sky-500" },
        { title: "REST API", color: "bg-yellow-400 text-black" },
        { title: "AWS S3", color: "bg-pink-500" },
        { title: "Tailwind CSS", color: "bg-emerald-500" },
    ];
    return (
        <section
            id="services"
            className="relative py-20 lg:py-24  overflow-hidden bg-gradient-to-r from-[#faf7f5] to-[#e2f0fe]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-lg  ">
                            Development Process
                        </span>

                        <h2 className="mt-4 text-4xl sm:text-5xl font-black leading-tight">
                            How I Turn
                            <br />
                            <span className="text-secondary">
                                Ideas Into Reality.
                            </span>
                        </h2>

                        <p className="mt-8 text-slate-600 text-lg leading-relaxed max-w-lg">
                            Every successful project begins with a clear strategy.
                            From planning and development to launch and optimization,
                            I follow a structured process that ensures quality,
                            performance, and long-term scalability.
                        </p>

                        {/* Floating Pills */}
                        <div className="relative mt-20 h-[320px]">

                            <ServicePills services={pills} />
                        </div>
                    </motion.div>


                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="border-l border-slate-300 pl-10"
                    >
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="
        border-b border-slate-200
        py-8
        cursor-pointer
        transition-all
        duration-300
        hover:pl-4
      "
                                onMouseEnter={() => setActiveService(index)}
                            >
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
                                    <span
                                        className={`
            text-3xl font-black transition-all duration-300
            ${activeService === index
                                                ? "text-[#4745a7]"
                                                : "text-slate-400"
                                            }
          `}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="flex-1">
                                        <h3
                                            className={`
              text-2xl sm:text-3xl font-black leading-tight
              transition-all duration-300
              ${activeService === index
                                                    ? "text-[#4745a7]"
                                                    : "text-slate-900"
                                                }
            `}
                                        >
                                            {service.title}
                                        </h3>

                                        <AnimatePresence mode="wait">
                                            {activeService === index && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.35,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="mt-6 text-slate-600 leading-relaxed text-lg max-w-xl">
                                                        {service.description}
                                                    </p>

                                                    <div className="mt-6 flex items-center gap-4">
                                                        <span
                                                            className="
                      inline-flex
                      px-4 py-2
                      rounded-full
                      bg-[#fc6d5c]/10
                      text-[#fc6d5c]
                      font-semibold
                      text-sm
                    "
                                                        >
                                                            {service.projectsCount}
                                                        </span>

                                                        <div className="h-px flex-1 bg-gradient-to-r from-[#4745a7]/30 to-transparent" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Services;