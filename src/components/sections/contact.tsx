"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Must be a valid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact({ settings, apiUrl }: { settings: any; apiUrl: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        subject: `Inquiry from ${values.name} via Portfolio`,
      };

      const res = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Message submitted successfully!");
        reset();
      } else {
        toast.error(data.message || "Failed to submit message");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24  relative bg-background overflow-hidden border-t border-border/40">
      {/* Soft orange/purple glows matching design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6366f1]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Wrapping the layout in a single form so the submit button can reside on the bottom */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 ">

          {/* 🔝 ওপরে থাকবে কন্টেন্ট/হেডার পার্ট (আপনার অরিজিনাল কালার ও স্টাইল) */}
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF7849]">
              <span className="h-1.5 w-1.5 bg-[#FF7849] rounded-full animate-pulse" />
              <span>Contacts</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-heading font-black text-foreground leading-none tracking-tight">
              Have a project?<br />
              <span className="block mt-2">Let's <span className="text-secondary">talk!</span></span>
            </h2>
          </motion.div>

          {/* 🔽 ঠিক নিচে থাকবে আপনার মিনিমালিস্ট ইনপুট ফর্ম পার্ট */}
          <motion.div
            className="space-y-6 pt-4 w-full shadow-md p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Name */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full input-minimal text-sm py-2.5 font-semibold text-foreground bg-transparent border-b border-slate-300 focus:outline-none"
              />
              {errors.name && <p className="text-xs text-rose-500 font-bold text-left">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full input-minimal text-sm py-2.5 font-semibold text-foreground bg-transparent border-b border-slate-300 focus:outline-none"
              />
              {errors.email && <p className="text-xs text-rose-500 font-bold text-left">{errors.email.message}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message details here..."
                {...register("message")}
                className="w-full input-minimal text-sm py-2.5 font-semibold resize-none text-foreground bg-transparent border-b border-slate-300 focus:outline-none"
              />
              {errors.message && <p className="text-xs text-rose-500 font-bold text-left">{errors.message.message}</p>}
            </div>

            {/* Submit Trigger button */}
            <div className="pt-4 text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF7849] hover:bg-[#FF7849]/90 text-white font-bold text-xs px-10 py-3.5 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(255,120,73,0.15)] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Message</span>
                )}
              </button>
            </div>
          </motion.div>

        </form>

        {/* সোশ্যাল মিডিয়া লিংক পার্ট */}
        <div className="text-center relative pt-8">
          <p className="text-slate-500 font-medium tracking-wide text-sm md:text-base">
            Prefer social media? Check out my{" "}
            <Link
              href="/contact"
              className="text-[#fc6d5c] font-bold hover:underline hover:underline-offset-8 group transition-colors duration-300"
            >
              contact page
            </Link>{" "}
            for more options.
          </p>
        </div>
      </div>
    </section>
  );
}
