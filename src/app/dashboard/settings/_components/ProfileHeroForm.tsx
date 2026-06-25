import React from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X, User } from "lucide-react";
import Image from "next/image";
import { useUploadSingleImageMutation } from "@/components/Redux/RTK/portfolioApi";
import { toast } from "sonner";
import { SettingsFormValues } from "../_types/schema";

export default function ProfileHeroForm() {
  const { register, setValue, watch } = useFormContext<SettingsFormValues>();
  const [uploadSingle, { isLoading: isUploading }] = useUploadSingleImageMutation();

  const profileImageVal = watch("personalInfo.profileImage");

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadSingle(formData).unwrap();
      if (res?.success && res?.data?.url) {
        setValue("personalInfo.profileImage", res.data.url);
        toast.success("Profile picture uploaded");
      }
    } catch (err) {
      toast.error("Profile picture upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
      <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Profile & Hero Content</h2>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Profile Image Uploader */}
        <div className="relative h-24 w-24 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0 group">
          {profileImageVal ? (
            <>
              <Image
                width={500}
                height={500}
                src={profileImageVal}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setValue("personalInfo.profileImage", "")}
                className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="relative h-full w-full flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <Upload className="w-5 h-5 text-slate-400" />
              <span className="text-[9px] text-slate-400 font-bold mt-1">Photo</span>
            </div>
          )}
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-slate-700 text-sm">Avatar Profile Image</h3>
          <p className="text-xs text-slate-400 max-w-xs">Upload your profile square image. Host on AWS S3.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            {...register("personalInfo.name")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professional Role</label>
          <input
            type="text"
            {...register("personalInfo.role")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
          <input
            type="text"
            {...register("personalInfo.location")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>

        {/* Availability status badge */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Availability Status</label>
          <input
            type="text"
            {...register("websiteSettings.availabilityStatus")}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">About Story Bio</label>
        <textarea
          rows={4}
          {...register("personalInfo.bio")}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none"
        />
      </div>

      {/* Hero Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hero Headline</label>
        <input
          type="text"
          {...register("heroTitle")}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
        />
      </div>

      {/* Hero Subtitle */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hero Description Subtitle</label>
        <textarea
          rows={2}
          {...register("heroSubtitle")}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none"
        />
      </div>

      {/* Statistics Bento Grid row configuration */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-700">Hero Section Statistics</h3>
        <p className="text-xs text-slate-400">Configure labels and values for the statistics cards in the hero section.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stat 1 */}
          <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Statistic 1</span>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
              <input
                type="text"
                {...register("stat1Label")}
                placeholder="Completed Projects"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Value</label>
              <input
                type="text"
                {...register("stat1Value")}
                placeholder="Leave blank for project count"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Statistic 2</span>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
              <input
                type="text"
                {...register("stat2Label")}
                placeholder="Client satisfaction"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Value</label>
              <input
                type="text"
                {...register("stat2Value")}
                placeholder="e.g. 99%"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Statistic 3</span>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
              <input
                type="text"
                {...register("stat3Label")}
                placeholder="Years experience"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Value</label>
              <input
                type="text"
                {...register("stat3Value")}
                placeholder="e.g. 3+"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
