"use client";
import Image from "next/image";
import { useGetProjectBySlugQuery, useUpdateProjectMutation, useUploadMultipleImagesMutation, useUploadSingleImageMutation } from "@/components/Redux/RTK/portfolioApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
  const [uploadSingle] = useUploadSingleImageMutation();
  const [uploadMultiple] = useUploadMultipleImagesMutation();

  const [techList, setTechList] = useState<string[]>([]);
  const [featureList, setFeatureList] = useState<string[]>([]);

  // Existing URLs (from DB)
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const [existingScreenshots, setExistingScreenshots] = useState<string[]>([]);

  // Pending new files (local only until Save)
  const [pendingThumbnail, setPendingThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [pendingScreenshots, setPendingScreenshots] = useState<File[]>([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);

  const thumbnailObjUrl = useRef<string>("");
  const screenshotObjUrls = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      if (thumbnailObjUrl.current) URL.revokeObjectURL(thumbnailObjUrl.current);
      screenshotObjUrls.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
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
      setExistingThumbnail(proj.thumbnail || "");
      setExistingScreenshots(proj.screenshots || []);
      setTechList(proj.techStack || []);
      setFeatureList(proj.features || []);
    }
  }, [projectResponse, reset]);

  // ── Thumbnail ─────────────────────────────────────────────────────────────
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (thumbnailObjUrl.current) URL.revokeObjectURL(thumbnailObjUrl.current);
    const url = URL.createObjectURL(file);
    thumbnailObjUrl.current = url;
    setPendingThumbnail(file);
    setThumbnailPreview(url);
    setExistingThumbnail(""); // hide old preview
    setValue("thumbnail", "__pending__");
  };

  const removeThumbnail = () => {
    if (thumbnailObjUrl.current) { URL.revokeObjectURL(thumbnailObjUrl.current); thumbnailObjUrl.current = ""; }
    setPendingThumbnail(null);
    setThumbnailPreview("");
    setExistingThumbnail("");
    setValue("thumbnail", "");
  };

  // ── Screenshots ───────────────────────────────────────────────────────────
  const handleScreenshotsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newUrls = newFiles.map((f) => URL.createObjectURL(f));
    screenshotObjUrls.current = [...screenshotObjUrls.current, ...newUrls];
    setPendingScreenshots((prev) => [...prev, ...newFiles]);
    setScreenshotPreviews((prev) => [...prev, ...newUrls]);
  };

  const removeExistingScreenshot = (index: number) => {
    setExistingScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const removePendingScreenshot = (index: number) => {
    URL.revokeObjectURL(screenshotPreviews[index]);
    screenshotObjUrls.current = screenshotObjUrls.current.filter((_, i) => i !== index);
    setPendingScreenshots((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Tech stack ────────────────────────────────────────────────────────────
  const addTechTag = () => {
    const val = watch("techStackInput")?.trim();
    if (!val) return;
    if (techList.includes(val)) { toast.error("Tag already exists"); return; }
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

  // ── Features ──────────────────────────────────────────────────────────────
  const addFeature = () => {
    const val = watch("featuresInput")?.trim();
    if (!val) return;
    if (featureList.includes(val)) { toast.error("Feature already exists"); return; }
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

  // ── Form submit — upload then save ────────────────────────────────────────
  const onSubmit = async (values: ProjectFormValues) => {
    if (techList.length === 0) {
      toast.error("Please add at least one tech stack tag");
      return;
    }

    try {
      let finalThumbnail = existingThumbnail;
      let finalScreenshots = [...existingScreenshots];

      // 1. Upload new thumbnail if selected
      if (pendingThumbnail) {
        const fd = new FormData();
        fd.append("file", pendingThumbnail);
        const thumbRes = await uploadSingle(fd).unwrap();
        if (!thumbRes?.success || !thumbRes?.data?.url) {
          toast.error(thumbRes?.message || "Thumbnail upload failed");
          return;
        }
        finalThumbnail = thumbRes.data.url;
      }

      // 2. Upload new screenshots if selected
      if (pendingScreenshots.length > 0) {
        const fd = new FormData();
        pendingScreenshots.forEach((f) => fd.append("files", f));
        const ssRes = await uploadMultiple(fd).unwrap();
        if (!ssRes?.success || !Array.isArray(ssRes?.data)) {
          toast.error(ssRes?.message || "Screenshots upload failed");
          return;
        }
        const newUrls = ssRes.data.map((item: { url: string }) => item.url);
        finalScreenshots = [...finalScreenshots, ...newUrls];
      }

      // 3. Update project
      const payload = {
        ...values,
        thumbnail: finalThumbnail,
        screenshots: finalScreenshots,
        techStack: techList,
        features: featureList,
      };
      const res = await updateProject({ id, data: payload }).unwrap();
      toast.success(res?.message || "Project updated successfully");
      router.push("/dashboard/projects");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update project");
    }
  };

  // Combined display values
  const displayThumbnail = thumbnailPreview || existingThumbnail;
  const allScreenshots = [
    ...existingScreenshots.map((url) => ({ url, isPending: false, index: existingScreenshots.indexOf(url) })),
    ...screenshotPreviews.map((url, i) => ({ url, isPending: true, index: i })),
  ];

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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Challenges Faced</label>
              <textarea
                rows={3}
                placeholder="What architectural or business problems did you encounter?"
                {...register("challenges")}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm resize-none"
              />
            </div>

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

            <div className="space-y-3">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-colors relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleScreenshotsSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs text-slate-500 font-bold">
                  {pendingScreenshots.length > 0
                    ? `${pendingScreenshots.length} new file(s) selected — will upload on save`
                    : "Add More Screenshots"}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Accepts multiple images</span>
              </div>

              {allScreenshots.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {allScreenshots.map(({ url, isPending, index }) => (
                    <div key={url} className="relative h-20 rounded-lg border border-slate-100 overflow-hidden group">
                      <Image
                        width={500}
                        height={500} src={url} alt="Screenshot" className="w-full h-full object-cover" />
                      {isPending && (
                        <span className="absolute bottom-1 left-1 text-[8px] bg-amber-500 text-white px-1 rounded font-bold">NEW</span>
                      )}
                      <button
                        type="button"
                        onClick={() => isPending ? removePendingScreenshot(index) : removeExistingScreenshot(index)}
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Thumbnail Image</h2>

            {displayThumbnail ? (
              <div className="relative h-40 rounded-xl border border-slate-200 overflow-hidden group bg-slate-50">
                <Image
                  width={500}
                  height={500} src={displayThumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                {pendingThumbnail && (
                  <span className="absolute bottom-2 left-2 text-[8px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold">NEW</span>
                )}
                <button
                  type="button"
                  onClick={removeThumbnail}
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
                  onChange={handleThumbnailSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs text-slate-500 font-bold">Select New Thumbnail</span>
                <span className="text-[10px] text-slate-400 mt-1">Recommended 800x600px</span>
              </div>
            )}
            {errors.thumbnail && !pendingThumbnail && !existingThumbnail && (
              <p className="text-xs text-rose-500">{errors.thumbnail.message}</p>
            )}
          </div>

          {/* Links & Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-base font-bold text-slate-700">Project Parameters</h2>

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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                {...register("order", { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
              />
            </div>

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
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tech Stack Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js"
                  {...register("techStackInput")}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTechTag(); } }}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                />
                <button type="button" onClick={addTechTag} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-lg font-bold text-xs">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {techList.map((tech, idx) => (
                  <span key={tech} className="text-[10px] bg-[#001f3f]/5 text-[#001f3f] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    {tech}
                    <button type="button" onClick={() => removeTechTag(idx)} className="hover:text-rose-600"><X size={8} /></button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-50">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Key Features</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. JWT authentication"
                  {...register("featuresInput")}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                />
                <button type="button" onClick={addFeature} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 rounded-lg font-bold text-xs">
                  Add
                </button>
              </div>
              <div className="space-y-1 pt-1">
                {featureList.map((feat, idx) => (
                  <div key={feat} className="text-[11px] bg-slate-50 text-slate-600 font-semibold p-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span className="truncate">{feat}</span>
                    <button type="button" onClick={() => removeFeature(idx)} className="text-slate-400 hover:text-rose-600"><X size={10} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#001f3f] text-white py-3 rounded-xl font-bold hover:bg-[#003366] transition-colors shadow"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading & Saving...</span>
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
