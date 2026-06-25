"use client";

import { useGetSettingsQuery, useUpdateSettingsMutation, useUploadSingleImageMutation } from "@/components/Redux/RTK/portfolioApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Github, Globe, Link2, Linkedin, Loader2, Twitter, Upload, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const settingsFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().min(1, "Location is required"),
    bio: z.string().min(1, "Bio is required"),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
  }),
  socialLinks: z.object({
    github: z.string().url("Must be a valid URL").or(z.literal("")),
    linkedin: z.string().url("Must be a valid URL").or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").or(z.literal("")),
    facebook: z.string().url("Must be a valid URL").or(z.literal("")),
  }),
  seoSettings: z.object({
    title: z.string().min(1, "SEO Title is required"),
    description: z.string().min(1, "SEO Description is required"),
    keywordsInput: z.string().optional(),
    keywords: z.array(z.string()),
  }),
  websiteSettings: z.object({
    availabilityStatus: z.string(),
    theme: z.enum(["light", "dark", "system"]),
  }),
  heroTitle: z.string().min(1, "Hero Title is required"),
  heroSubtitle: z.string().min(1, "Hero Subtitle is required"),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
  const { data: settingsResponse, isLoading: isLoadingSettings } = useGetSettingsQuery(undefined);
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();
  const [uploadSingle, { isLoading: isUploading }] = useUploadSingleImageMutation();

  const [activeTab, setActiveTab] = useState<"personal" | "social" | "seo">("personal");
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      personalInfo: { name: "", role: "", location: "", bio: "", profileImage: "", resumeUrl: "" },
      socialLinks: { github: "", linkedin: "", twitter: "", facebook: "" },
      seoSettings: { title: "", description: "", keywords: [] },
      websiteSettings: { availabilityStatus: "Available for projects", theme: "dark" },
      heroTitle: "",
      heroSubtitle: "",
    },
  });

  useEffect(() => {
    if (settingsResponse?.data) {
      const data = settingsResponse.data;
      reset({
        personalInfo: {
          name: data.personalInfo?.name || "",
          role: data.personalInfo?.role || "",
          location: data.personalInfo?.location || "",
          bio: data.personalInfo?.bio || "",
          profileImage: data.personalInfo?.profileImage || "",
          resumeUrl: data.personalInfo?.resumeUrl || "",
        },
        socialLinks: {
          github: data.socialLinks?.github || "",
          linkedin: data.socialLinks?.linkedin || "",
          twitter: data.socialLinks?.twitter || "",
          facebook: data.socialLinks?.facebook || "",
        },
        seoSettings: {
          title: data.seoSettings?.title || "",
          description: data.seoSettings?.description || "",
          keywords: data.seoSettings?.keywords || [],
        },
        websiteSettings: {
          availabilityStatus: data.websiteSettings?.availabilityStatus || "Available for projects",
          theme: data.websiteSettings?.theme || "dark",
        },
        heroTitle: data.heroTitle || "",
        heroSubtitle: data.heroSubtitle || "",
      });
      setKeywordList(data.seoSettings?.keywords || []);
    }
  }, [settingsResponse, reset]);

  const profileImageVal = watch("personalInfo.profileImage");
  const resumeUrlVal = watch("personalInfo.resumeUrl");

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

  const addKeyword = () => {
    const val = watch("seoSettings.keywordsInput")?.trim();
    if (!val) return;
    if (keywordList.includes(val)) {
      toast.error("Keyword already added");
      return;
    }
    const updated = [...keywordList, val];
    setKeywordList(updated);
    setValue("seoSettings.keywords", updated);
    setValue("seoSettings.keywordsInput", "");
  };

  const removeKeyword = (index: number) => {
    const updated = keywordList.filter((_, i) => i !== index);
    setKeywordList(updated);
    setValue("seoSettings.keywords", updated);
  };

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      const payload = {
        ...values,
        seoSettings: {
          ...values.seoSettings,
          keywords: keywordList,
        },
      };
      await updateSettings(payload).unwrap();
      toast.success("Settings updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#001f3f]" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-black text-[#001f3f]">Portfolio Settings</h1>
        <p className="text-sm text-slate-400">Configure personal information, resume links, and SEO tags.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Settings Navigation Tabs */}
        <div className="w-full lg:w-64 bg-white p-3 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex lg:flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("personal")}
            className={`w-full flex items-center justify-center lg:justify-start gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "personal"
                ? "bg-[#001f3f] text-white shadow-md shadow-[#001f3f]/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
          >
            <User size={16} />
            <span className="hidden sm:inline">Profile & Hero</span>
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`w-full flex items-center justify-center lg:justify-start gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "social"
                ? "bg-[#001f3f] text-white shadow-md shadow-[#001f3f]/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
          >
            <Link2 size={16} />
            <span className="hidden sm:inline">Resume & Socials</span>
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center justify-center lg:justify-start gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "seo"
                ? "bg-[#001f3f] text-white shadow-md shadow-[#001f3f]/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
          >
            <Globe size={16} />
            <span className="hidden sm:inline">SEO Config</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full space-y-6">
          {/* TAB 1: Personal & Hero */}
          {activeTab === "personal" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
              <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Profile & Hero Content</h2>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Profile Image Uploader */}
                <div className="relative h-24 w-24 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0 group">
                  {profileImageVal ? (
                    <>
                      <Image
                        width={500}
                        height={500} src={profileImageVal} alt="Profile" className="w-full h-full object-cover" />
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
            </div>
          )}

          {/* TAB 2: Resume & Socials */}
          {activeTab === "social" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
              <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Resume PDF & Social Media Profiles</h2>

              {/* Resume upload */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Resume PDF Document</label>
                {resumeUrlVal ? (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl">
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Resume document is uploaded successfully.</p>
                      <a href={resumeUrlVal} target="_blank" rel="noopener noreferrer" className="text-[10px] underline text-emerald-600 font-bold block mt-0.5 truncate max-w-md">
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
                    />
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500 font-bold">Upload Resume PDF File</span>
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
          )}

          {/* TAB 3: SEO Configuration */}
          {activeTab === "seo" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
              <h2 className="text-base font-black text-slate-800 pb-2 border-b border-slate-50">Search Engine Optimization (SEO) Settings</h2>

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
                {errors.seoSettings?.description && <p className="text-xs text-rose-500">{errors.seoSettings.description.message}</p>}
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
                  {keywordList.map((tag, idx) => (
                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-200">
                      {tag}
                      <button type="button" onClick={() => removeKeyword(idx)} className="hover:text-rose-600 text-slate-400">
                        <X size={8} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#001f3f] text-white hover:bg-[#003366] px-8 py-3 rounded-xl font-extrabold text-xs transition-all shadow flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
