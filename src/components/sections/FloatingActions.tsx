"use client";

import { useGetSettingsQuery, useTrackResumeDownloadMutation } from "@/components/Redux/RTK/portfolioApi";
import { usePwa } from "@/components/Provider/PwaProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Smartphone } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { toast } from "sonner";

export default function FloatingActions() {
    const { data: settingsRes } = useGetSettingsQuery(undefined);
    const resumeUrl = settingsRes?.data?.personalInfo?.resumeUrl || "";
    const whatsapp = settingsRes?.data?.contactInfo?.whatsapp || "01685111860";

    const { isInstallable, isStandalone, isAlreadyInstalled, isNativeSupported, installApp } = usePwa();
    const [trackResumeDownload] = useTrackResumeDownloadMutation();

    const handleInstallClick = async () => {
        if (isInstallable) {
            await installApp();
        } else if (isAlreadyInstalled || isStandalone) {
            toast.success("This app is already installed on your device!");
        } else if (isNativeSupported) {
            toast.info(
                "App installer is initializing... If it doesn't appear, you can also click the install icon 🖥️ in the top-right of your address bar, or refresh the page.",
                { duration: 8000 }
            );
        } else {
            toast.info(
                "To install this app:\n• iOS Safari: Tap Share 📤 then 'Add to Home Screen' ➕\n• Other browsers: Tap menu ••• then 'Add to Home Screen'",
                { duration: 8000 }
            );
        }
    };

    const handleDownloadClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Track the download silently
        trackResumeDownload(undefined).catch(() => {});

        if (!resumeUrl) return;

        e.preventDefault();

        try {
            const response = await fetch(resumeUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "MD Rabbinur Muktar.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            // Fallback: if fetch is blocked by CORS, open in new tab
            window.open(resumeUrl, "_blank");
        }
    };

    return (
        <>
            {/* 🚀 ফ্লোটিং বাটন: ডান পাশে */}
            <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 lg:right-6 z-50 flex flex-col gap-3 items-end">

                {/* 🟢 WhatsApp Button */}
                <motion.a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
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

                {/* 🟠 Download CV Button */}
                {resumeUrl ? (
                    <motion.a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        onClick={handleDownloadClick}
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
                ) : null}

                {/* 📱 PWA Install App Button */}
                <AnimatePresence>
                    {!isStandalone && (
                        <motion.button
                            onClick={handleInstallClick}
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 15 }}
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
                                bg-gradient-to-r
                                from-[#4745a7]
                                to-[#6366f1]
                                text-white
                                border
                                border-[#4745a7]/20
                                shadow-[0_8px_30px_rgba(71,69,167,0.3)]
                                transition-all
                                duration-500
                                ease-out
                                cursor-pointer
                            "
                        >
                            <motion.div
                                animate={{ scale: [1, 1.35, 1.5], opacity: [0.4, 0.15, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full bg-[#4745a7] -z-10"
                            />
                            <Smartphone
                                size={20}
                                className="
                                    shrink-0
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
                                    transition-all
                                    duration-500
                                    group-hover:max-w-[120px]
                                    group-hover:opacity-100
                                    group-hover:ml-3
                                "
                            >
                                Install App
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>

            </div>
        </>
    );
}