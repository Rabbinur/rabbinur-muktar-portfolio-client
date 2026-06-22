"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function FloatingActions() {
    return (
        <>
            <div className="fixed bottom-6 left-6 sm:top-1/2 sm:left-6 sm:-translate-y-1/2 sm:bottom-auto z-50">
                <motion.a
                    href="https://wa.me/01685111860" // আপনার হোয়াটস্অ্যাপ লিঙ্ক
                    target="_blank"
                    rel="noopener noreferrer"
                    // 🔄 Tailwind animate-pulse এর মতো পুরো বাটনটি পালস (ধকধক) করবে
                    animate={{
                        scale: [1, 1.05, 1], // বাটনটি আলতো করে একটু বড় হয়ে আবার আগের সাইজে ফিরবে
                    }}
                    transition={{
                        duration: 2, // প্রতি ২ সেকেন্ডে একটি কমপ্লিট পালস হবে
                        repeat: Infinity,
                        ease: "easeInOut" // ওঠা-নামাটা একদম মসৃণ হবে
                    }}
                    whileHover={{ scale: 1.1 }} // মাউস নিলে আরেকটু বড় হবে
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25d366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.25)] cursor-pointer"
                >
                    {/* ✨ ব্যাকগ্রাউন্ড গ্লো - যা বাটনের পালসের সাথে ম্যাচ করে হালকা ছড়িয়ে যাবে */}
                    <motion.div
                        animate={{
                            scale: [1, 1.35, 1.5],
                            opacity: [0.4, 0.15, 0] // একদম হালকা গ্লো
                        }}
                        transition={{
                            duration: 2, // বাটনের টাইমিং (২ সেকেন্ড) এর সাথে হুবহু মিল রাখা হয়েছে
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                        className="absolute inset-0 rounded-full bg-[#25d366] -z-10"
                    />

                    <BsWhatsapp size={24} className="fill-current" />
                </motion.a>
            </div>

            {/* 🟠 ডানে: Download CV Floating Button */}
            <div className="fixed bottom-6 right-10 sm:right-6 lg:right-6 z-50">
                <motion.a
                    href="/your-cv.pdf" // এখানে আপনার CV ফাইলের পাথটি বসাবেন public ফোল্ডার থেকে
                    download="My_CV.pdf" // ফাইলটি ডাউনলোড করার জন্য ব্রাউজার ট্রিগার
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 p-3.5 sm:px-6 sm:py-3.5 rounded-full bg-[#ffffff] border border-[#fc6d5c]/20 text-[#0f172a] font-bold text-sm shadow-[0_8px_30px_rgba(252,109,92,0.15)] hover:shadow-[0_15px_35px_rgba(252,109,92,0.3)] hover:border-[#fc6d5c]/40 transition-all duration-300 group"
                >
                    {/* আইকন কালার আপনার সেকেন্ডারি অরেঞ্জ কালার */}
                    <Download size={18} className="text-[#fc6d5c] group-hover:translate-y-0.5 transition-transform duration-300" />
                    <span className="hidden sm:inline">Download CV</span>
                </motion.a>
            </div>
        </>
    );
}
