import React from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X, Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { useUploadSingleImageMutation } from "@/components/Redux/RTK/portfolioApi";
import { toast } from "sonner";
import { SettingsFormValues } from "../_types/schema";

export default function SocialsResumeForm() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<SettingsFormValues>();
  const [uploadSingle, { isLoading: isUploading }] = useUploadSingleImageMutation();

  const resumeUrlVal = watch("personalInfo.resumeUrl");

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadSingle(formData).unwrap();
      if (res?.success && res?.data?.url) {
        setValue("personalInfo.resumeUrl", res.data.url);
        toast.success("Resume PDF uploaded successfully");
      }
    } catch (err) {
      toast.error("Resume upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
      <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Resume PDF & Social Media Profiles</h2>

      {/* Resume upload */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Resume PDF Document</label>
        {resumeUrlVal ? (
          <div className="flex items-center justify-between p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl">
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">Resume document is uploaded successfully.</p>
              <a
                href={resumeUrlVal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] underline text-emerald-600 font-bold block mt-0.5 truncate max-w-md"
              >
                {resumeUrlVal}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setValue("personalInfo.resumeUrl", "")}
              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-colors relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Upload className="w-6 h-6 text-slate-400 mb-2" />
            <span className="text-xs text-slate-500 font-bold">
              {isUploading ? "Uploading Resume..." : "Upload Resume PDF File"}
            </span>
            <span className="text-[9px] text-slate-400 mt-1">Saves to S3 storage bucket</span>
          </div>
        )}
      </div>

      {/* Socials */}
      <div className="space-y-4 pt-2 border-t border-slate-50">
        {/* GitHub */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Github size={14} />
            GitHub Link
          </label>
          <input
            type="text"
            placeholder="https://github.com/..."
            {...register("socialLinks.github")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.socialLinks?.github && <p className="text-xs text-rose-500">{errors.socialLinks.github.message}</p>}
        </div>

        {/* LinkedIn */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Linkedin size={14} />
            LinkedIn Link
          </label>
          <input
            type="text"
            placeholder="https://linkedin.com/in/..."
            {...register("socialLinks.linkedin")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.socialLinks?.linkedin && <p className="text-xs text-rose-500">{errors.socialLinks.linkedin.message}</p>}
        </div>

        {/* Twitter */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Twitter size={14} />
            Twitter / X Link
          </label>
          <input
            type="text"
            placeholder="https://twitter.com/..."
            {...register("socialLinks.twitter")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.socialLinks?.twitter && <p className="text-xs text-rose-500">{errors.socialLinks.twitter.message}</p>}
        </div>

        {/* Facebook */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Facebook size={14} />
            Facebook Link
          </label>
          <input
            type="text"
            placeholder="https://facebook.com/..."
            {...register("socialLinks.facebook")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
          {errors.socialLinks?.facebook && <p className="text-xs text-rose-500">{errors.socialLinks.facebook.message}</p>}
        </div>
      </div>
    </div>
  );
}
