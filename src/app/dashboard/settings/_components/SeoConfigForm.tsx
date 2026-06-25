import React from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "sonner";
import { SettingsFormValues } from "../_types/schema";

export default function SeoConfigForm() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<SettingsFormValues>();

  const keywords = watch("seoSettings.keywords") || [];

  const addKeyword = () => {
    const val = watch("seoSettings.keywordsInput")?.trim();
    if (!val) return;
    if (keywords.includes(val)) {
      toast.error("Keyword already added");
      return;
    }
    const updated = [...keywords, val];
    setValue("seoSettings.keywords", updated);
    setValue("seoSettings.keywordsInput", "");
  };

  const removeKeyword = (index: number) => {
    const updated = keywords.filter((_, i) => i !== index);
    setValue("seoSettings.keywords", updated);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
      <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">
        Search Engine Optimization (SEO) Settings
      </h2>

      {/* SEO Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Page Title</label>
        <input
          type="text"
          placeholder="e.g. Rabbinur Muktar | Full Stack Developer"
          {...register("seoSettings.title")}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
        />
        {errors.seoSettings?.title && <p className="text-xs text-rose-500">{errors.seoSettings.title.message}</p>}
      </div>

      {/* SEO Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Meta Page Description</label>
        <textarea
          rows={3}
          placeholder="Compelling page description for search engine cards..."
          {...register("seoSettings.description")}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none"
        />
        {errors.seoSettings?.description && (
          <p className="text-xs text-rose-500">{errors.seoSettings.description.message}</p>
        )}
      </div>

      {/* Keywords Tag array */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Meta Keywords</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Next.js, Developer, portfolio"
            {...register("seoSettings.keywordsInput")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addKeyword();
              }
            }}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="bg-[#001f3f] text-white hover:bg-[#003366] px-4 rounded-xl font-bold text-xs transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {keywords.map((tag, idx) => (
            <span
              key={tag}
              className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-200"
            >
              {tag}
              <button type="button" onClick={() => removeKeyword(idx)} className="hover:text-rose-600 text-slate-400">
                <X size={8} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
