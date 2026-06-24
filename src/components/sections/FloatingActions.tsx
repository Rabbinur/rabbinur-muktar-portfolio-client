"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function FloatingActions() {
    return (
        <>
            {/* 🚀 এক জোড়া ফ্লোটিং বাটন: ডান পাশে একসাথে স্তুপ করে রাখা */}
            <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 lg:right-6 z-50 flex flex-col gap-3 items-end">

                {/* 🟢 WhatsApp Button (ওপরে থাকবে) */}
                <motion.a
                    href="https://wa.me/01685111860"
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25d366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.25)] cursor-pointer"
                >
                    <motion.div
                        animate={{ scale: [1, 1.35, 1.5], opacity: [0.4, 0.15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-[#25d366] -z-10"
                    />
                    <BsWhatsapp size={22} className="fill-current sm:size-[24px]" />
                </motion.a>

                {/* 🟠 Download CV Button (নিচে থাকবে) */}
                <motion.a
                    href="/your-cv.pdf"
                    download="My_CV.pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
    group
    relative
    flex
    items-center
    justify-center
    h-12
    w-12
    hover:w-44
    overflow-hidden
    rounded-full
    bg-white
    border
    border-[#fc6d5c]/20
    shadow-[0_8px_30px_rgba(252,109,92,0.15)]
    transition-all
    duration-500
    ease-out
  "
                >
                    <Download
                        size={20}
                        className="
      shrink-0
      text-[#fc6d5c]
      transition-transform
      duration-300
      group-hover:rotate-12
    "
                    />

                    <span
                        className="
      whitespace-nowrap
      overflow-hidden
      max-w-0
      opacity-0
      ml-0
      text-sm
      font-bold
      text-[#0f172a]
      transition-all
      duration-500
      group-hover:max-w-[120px]
      group-hover:opacity-100
      group-hover:ml-3
    "
                    >
                        Download CV
                    </span>
                </motion.a>

            </div>
        </>
    );
}