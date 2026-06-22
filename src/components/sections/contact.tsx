"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
      // Automate subject matching the backend schema expectation
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
    <section id="contact" className="py-28 relative bg-[#05070a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Wrapping the layout in a single form so the submit button can reside on the left side */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headers & Action */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-secondary" />
                <span className="font-heading font-black text-xs uppercase text-secondary tracking-widest">
                  Contacts
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-heading font-black text-white leading-none tracking-tight">
                Have a project?<br />
                <span className="text-slate-400 block mt-2">Let's talk!</span>
              </h2>
            </div>

            {/* Submit Trigger button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary text-white font-black text-xs px-10 py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,107,74,0.2)] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>

          {/* Right Column: Minimalist Inputs */}
          <div className="lg:col-span-3 space-y-6 pt-4 lg:pt-8 w-full">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full input-minimal text-sm py-2.5 font-semibold"
              />
              {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full input-minimal text-sm py-2.5 font-semibold"
              />
              {errors.email && <p className="text-xs text-rose-500 font-bold">{errors.email.message}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message details here..."
                {...register("message")}
                className="w-full input-minimal text-sm py-2.5 font-semibold resize-none"
              />
              {errors.message && <p className="text-xs text-rose-500 font-bold">{errors.message.message}</p>}
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}
