"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UltimatePortfolioLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // প্রতিটি লাইন আলাদা আলাদা অবজেক্টে ভাগ করা সিকোয়েন্স
  const loadingLogs = [
    { text: "initializing portfolio core ........... OK", progressTarget: 20 },
    { text: "mounting ui/ux subsystems ............. OK", progressTarget: 45 },
    { text: "optimizing framer animations .......... OK", progressTarget: 70 },
    { text: "compiling production-ready code ........ OK", progressTarget: 90 },
    { text: "establishing secure uplink ............. OK", progressTarget: 95 },
    { text: "system log ==#26 OK", progressTarget: 98 },
    { text: "READY--------", progressTarget: 100 },
  ];

  const subTexts = [
    "⚡ Initializing design parameters...",
    "🎨 Rendering pixel-perfect layouts...",
    "🚀 Injecting clean and efficient code...",
    "🛠️ Fine-tuning performance logs...",
    "🔒 Establishing secure connection...",
    "⚙️ Fetching latest core logs...",
    "✨ Launching Rabbinur's universe...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000); // সব লাইন প্রিন্ট হওয়ার পর ১ সেকেন্ড হোল্ড করবে
          return 100;
        }
        
        const currentTarget = loadingLogs[logIndex]?.progressTarget || 100;
        if (prev >= currentTarget && logIndex < loadingLogs.length - 1) {
          setLogIndex((v) => v + 1);
        }

        return prev + 1;
      });
    }, 15); 

    return () => clearInterval(interval);
  }, [logIndex, onComplete]);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#04060a] z-[9999] flex flex-col justify-between p-6 md:p-16 font-mono overflow-hidden select-none"
    >
      
      {/* 🕸️ সাইবার গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #4745a7 1px, transparent 1px), linear-gradient(to bottom, #4745a7 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />
      
      {/* ব্যাকগ্রাউন্ড রিচ গ্লো ওভ্যাল */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fc6d5c]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 🖥️ টপ সেকশন: টার্মিনাল লগ */}
      <div className="w-full max-w-2xl text-left space-y-2 z-10 text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-wide text-slate-400 font-mono self-start">
        <div className="text-slate-500 font-bold mb-4 flex items-center gap-2 tracking-widest text-[10px] md:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#fc6d5c] animate-pulse" />
          RABBINUR OS · V3.0.26
        </div>
        
        {loadingLogs.slice(0, logIndex + 1).map((log, i) => {
          const isCurrentLine = i === logIndex;
          const cleanText = log.text.replace(" OK", "");
          const hasOK = log.text.includes("OK");
          const isReadyLine = log.text.includes("READY");

          return (
            <div key={i} className="flex items-center min-h-[20px] flex-wrap">
              <span className="text-[#4745a7] mr-2 font-bold shrink-0">&gt;</span>
              
              {isCurrentLine ? (
                <div className="flex items-center relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 0.35, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap flex items-center"
                  >
                    {/* READY লাইনের জন্য কাস্টম রেড কালার এবং ব্লিংক ইফেক্ট */}
                    <span className={isReadyLine ? "text-red-500 font-extrabold tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse" : "text-[#fc6d5c]"}>
                      {cleanText}
                    </span>
                    
                    {hasOK && <span className="text-emerald-400 font-bold ml-1">OK</span>}
                  </motion.div>

                  {/* 💡 ব্লিংকিং রিয়েল কার্সার ব্লক */}
                  <motion.span
                    animate={{ opacity: [1, 1, 0, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    className="inline-block w-2 h-4 bg-[#fc6d5c] ml-1 shrink-0"
                  />
                </div>
              ) : (
                /* অলরেডি টাইপ হয়ে যাওয়া প্রিভিয়াস লাইনের স্ট্যাটিক ভিউ */
                <div className="text-slate-500">
                  <span className={isReadyLine ? "text-red-500/80 font-bold" : ""}>{cleanText}</span>
                  {hasOK && <span className="text-emerald-500/70 font-semibold ml-1">OK</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🍊 মিডল সেকশন: ব্র্যান্ডিং ও কাউন্টার */}
      <div className="flex flex-col items-center justify-center text-center flex-grow z-10 my-auto">
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.1em] sm:tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#fc6d5c] via-[#ff8473] to-[#4745a7] drop-shadow-[0_0_35px_rgba(252,109,92,0.15)] uppercase pl-[0.1em] sm:pl-[0.25em]">
          Rabbinur
        </h1>
        
        <div className="text-5xl sm:text-7xl md:text-9xl font-extralight text-white font-sans tracking-tighter mt-4 flex items-baseline">
          {progress}
          <span className="text-xl sm:text-2xl md:text-4xl text-[#fc6d5c] font-black ml-1 font-mono">%</span>
        </div>
      </div>

      {/* 🛠️ বটম সেকশন: কাস্টম সাব-টেক্সট ও প্রোগ্রেস ইন্ডিকেটর */}
      <div className="w-full flex flex-col items-center justify-center text-center z-10 space-y-5 self-end">
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={logIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              className="text-[10px] md:text-xs text-slate-500 font-bold tracking-[0.2em] uppercase"
            >
              {subTexts[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* স্লিম নিয়ন প্রোগ্রেস বার */}
        <div className="w-56 h-[2px] bg-slate-950 rounded-full overflow-hidden relative border border-slate-900/50">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#fc6d5c] to-[#4745a7] shadow-[0_0_8px_#fc6d5c]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </motion.section>
  );
}