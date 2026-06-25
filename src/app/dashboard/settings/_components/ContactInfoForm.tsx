import React from "react";
import { useFormContext } from "react-hook-form";
import { Mail, Phone, Instagram } from "lucide-react";
import { SettingsFormValues } from "../_types/schema";

export default function ContactInfoForm() {
  const { register, formState: { errors } } = useFormContext<SettingsFormValues>();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
      <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Contact Information</h2>
      <p className="text-xs text-slate-400">These values power the &quot;Get in Touch&quot; section and footer on the public site.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={14} />
            Email Address
          </label>
          <input
            type="email"
            placeholder="rabbinur345@gmail.com"
            {...register("contactInfo.email")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.contactInfo?.email && <p className="text-xs text-rose-500">{errors.contactInfo.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Phone size={14} />
            Phone Number
          </label>
          <input
            type="text"
            placeholder="+8801685111860"
            {...register("contactInfo.phone")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Phone size={14} className="text-green-500" />
            WhatsApp Number
          </label>
          <input
            type="text"
            placeholder="+8801685111860"
            {...register("contactInfo.whatsapp")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>

        {/* Instagram */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Instagram size={14} />
            Instagram URL
          </label>
          <input
            type="text"
            placeholder="https://instagram.com/rabbinur_muktar"
            {...register("contactInfo.instagram")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.contactInfo?.instagram && <p className="text-xs text-rose-500">{errors.contactInfo.instagram.message}</p>}
        </div>
      </div>
    </div>
  );
}
