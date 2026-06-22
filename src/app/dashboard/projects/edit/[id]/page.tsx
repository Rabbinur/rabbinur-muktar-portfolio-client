"use client";

import { useGetProjectBySlugQuery, useUpdateProjectMutation, useUploadSingleImageMutation, useUploadMultipleImagesMutation } from "@/components/Redux/RTK/portfolioApi";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Upload, Loader2, X, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  thumbnail: z.string().min(1, "Thumbnail image is required"),
  screenshots: z.array(z.string()),
  description: z.string().min(1, "Description is required"),
  techStackInput: z.string().optional(),
  techStack: z.array(z.string()).min(1, "At least one tech stack tag is required"),
  featuresInput: z.string().optional(),
  features: z.array(z.string()),
  challenges: z.string().optional(),
  results: z.string().optional(),
  liveLink: z.string().url("Must be a valid URL").or(z.literal("")),
  githubLink: z.string().url("Must be a valid URL").or(z.literal("")),
  featured: z.boolean(),
  order: z.number(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { data: projectResponse, isLoading: isLoadingProject } = useGetProjectBySlugQuery(id);
  const [updateProject, { isLoading: isSubmitting }] = useUpdateProjectMutation();
  const [uploadSingle, { isLoading: isUploadingThumbnail }] = useUploadSingleImageMutation();
  const [uploadMultiple, { isLoading: isUploadingScreenshots }] = useUploadMultipleImagesMutation();

  const [techList, setTechList] = useState<string[]>([]);
  const [featureList, setFeatureList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      thumbnail: "",
      screenshots: [],
      description: "",
      techStackInput: "",
      techStack: [],
      featuresInput: "",
      features: [],
      challenges: "",
      results: "",
      liveLink: "",
      githubLink: "",
      featured: false,
      order: 0,
    },
  });

  // Prepopulate form when data arrives
  useEffect(() => {
    if (projectResponse?.data) {
      const proj = projectResponse.data;
      reset({
        title: proj.title || "",
        slug: proj.slug || "",
        thumbnail: proj.thumbnail || "",
        screenshots: proj.screenshots || [],
        description: proj.description || "",
        challenges: proj.challenges || "",
        results: proj.results || "",
        liveLink: proj.liveLink || "",
        githubLink: proj.githubLink || "",
        featured: proj.featured || false,
        order: proj.order || 0,
        techStack: proj.techStack || [],
        features: proj.features || [],
      });
      setTechList(proj.techStack || []);
      setFeatureList(proj.features || []);
    }
  }, [projectResponse, reset]);

  const thumbnailVal = watch("thumbnail");
  const screenshotsVal = watch("screenshots") || [];

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadSingle(formData).unwrap();
      if (res?.success && res?.data?.url) {
        setValue("thumbnail", res.data.url);
        toast.success("Thumbnail uploaded successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload thumbnail");
    }
  };

  const handleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await uploadMultiple(formData).unwrap();
      if (res?.success && res?.data?.urls) {
        setValue("screenshots", [...screenshotsVal, ...res.data.urls]);
        toast.success("Screenshots uploaded successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upload screenshots");
    }
  };

  const addTechTag = () => {
    const val = watch("techStackInput")?.trim();
    if (!val) return;
    if (techList.includes(val)) {
      toast.error("Tag already exists");
      return;
    }
    const updated = [...techList, val];
    setTechList(updated);
    setValue("techStack", updated);
    setValue("techStackInput", "");
  };

  const removeTechTag = (index: number) => {
    const updated = techList.filter((_, i) => i !== index);
    setTechList(updated);
    setValue("techStack", updated);
  };

  const addFeature = () => {
    const val = watch("featuresInput")?.trim();
    if (!val) return;
    if (featureList.includes(val)) {
      toast.error("Feature already exists");
      return;
    }
    const updated = [...featureList, val];
    setFeatureList(updated);
    setValue("features", updated);
    setValue("featuresInput", "");
  };

  const removeFeature = (index: number) => {
    const updated = featureList.filter((_, i) => i !== index);
    setFeatureList(updated);
    setValue("features", updated);
  };

  const removeScreenshot = (index: number) => {
    const updated = screenshotsVal.filter((_, i) => i !== index);
    setValue("screenshots", updated);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    if (techList.length === 0) {
      toast.error("Please add at least one tech stack tag");
      return;
    }
    try {
      const payload = {
        ...values,
        techStack: techList,
        features: featureList,
      };
      await updateProject({ id, data: payload }).unwrap();
      toast.success("Project updated successfully");
      router.push("/dashboard/projects");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update project");
    }
  };

  if (isLoadingProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#001f3f]" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <Link
          href="/dashboard/projects"
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-[#001f3f]">Edit Project</h1>
          <p className="text-sm text-slate-400">Modify portfolio showcase details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Body */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Title</label>
              <input
                type="text"
                placeholder="e.g. ShoppingCart.bd"
                {...register("title")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
              {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Slug</label>
              <input
                type="text"
                placeholder="e.g. shoppingcart-bd"
                {...register("slug")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
              {errors.slug && <p className="text-xs text-rose-500">{errors.slug.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Description</label>
              <textarea
                rows={4}
                placeholder="Write a compelling overview of the project..."
                {...register("description")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm resize-none"
              />
              {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-base font-bold text-slate-700">Project Case Study details</h2>

            {/* Challenges */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Challenges Faced</label>
              <textarea
                rows={3}
                placeholder="What architectural or business problems did you encounter?"
                {...register("challenges")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm resize-none"
              />
            </div>

            {/* Results */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Results Delivered</label>
              <textarea
                rows={3}
                placeholder="What were the outcomes? Metrics, speed boosts, successful integrations..."
                {...register("results")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-base font-bold text-slate-700">Screenshots Carousel</h2>
            
            {/* Multiple Screenshots Upload */}
            <div className="space-y-3">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-colors relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleScreenshotsUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploadingScreenshots}
                />
                {isUploadingScreenshots ? (
                  <Loader2 className="w-8 h-8 text-[#001f3f] animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                )}
                <span className="text-xs text-slate-500 font-bold">Upload Showcase Screenshots</span>
                <span className="text-[10px] text-slate-400 mt-1">Accepts multiple images</span>
              </div>

              {/* Screenshots list */}
              {screenshotsVal.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {screenshotsVal.map((url: string, index: number) => (
                    <div key={url} className="relative h-20 rounded-lg border border-slate-100 overflow-hidden group">
                      <img src={url} alt={`Screenshot ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-rose-600 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info & Uploads */}
        <div className="space-y-6">
          {/* S3 Image Thumbnail */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Thumbnail Image</h2>
            
            {thumbnailVal ? (
              <div className="relative h-40 rounded-xl border border-slate-200 overflow-hidden group bg-slate-50">
                <img src={thumbnailVal} alt="Thumbnail" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setValue("thumbnail", "")}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-rose-600 transition-colors shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl h-40 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploadingThumbnail}
                />
                {isUploadingThumbnail ? (
                  <Loader2 className="w-8 h-8 text-[#001f3f] animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                )}
                <span className="text-xs text-slate-500 font-bold">Upload Main Thumbnail</span>
                <span className="text-[10px] text-slate-400 mt-1">Recommended 800x600px</span>
              </div>
            )}
            {errors.thumbnail && <p className="text-xs text-rose-500">{errors.thumbnail.message}</p>}
          </div>

          {/* Links & Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-base font-bold text-slate-700">Project Parameters</h2>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 py-2 border-y border-slate-50">
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="w-4.5 h-4.5 border border-slate-300 rounded text-[#001f3f] focus:ring-[#001f3f]"
              />
              <label htmlFor="featured" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                Feature on Portfolio Home page
              </label>
            </div>

            {/* Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                {...register("order", { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
            </div>

            {/* Live Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                {...register("liveLink")}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
              {errors.liveLink && <p className="text-xs text-rose-500">{errors.liveLink.message}</p>}
            </div>

            {/* Github Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GitHub URL</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                {...register("githubLink")}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
              {errors.githubLink && <p className="text-xs text-rose-500">{errors.githubLink.message}</p>}
            </div>
          </div>

          {/* Tech Stack & Features Tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            {/* Tech tag list */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tech Stack Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js"
                  {...register("techStackInput")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechTag();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={addTechTag}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-lg font-bold text-xs"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {techList.map((tech, idx) => (
                  <span key={tech} className="text-[10px] bg-[#001f3f]/5 text-[#001f3f] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    {tech}
                    <button type="button" onClick={() => removeTechTag(idx)} className="hover:text-rose-600">
                      <X size={8} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 pt-2 border-t border-slate-50">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Key Features</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. JWT authentication"
                  {...register("featuresInput")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-lg font-bold text-xs"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1 pt-1">
                {featureList.map((feat, idx) => (
                  <div key={feat} className="text-[11px] bg-slate-50 text-slate-600 font-semibold p-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span className="truncate">{feat}</span>
                    <button type="button" onClick={() => removeFeature(idx)} className="text-slate-400 hover:text-rose-600">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#001f3f] text-white py-3 rounded-xl font-bold hover:bg-[#003366] transition-colors shadow"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Project...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
