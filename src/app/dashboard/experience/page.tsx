"use client";

import { useGetExperiencesQuery, useCreateExperienceMutation, useUpdateExperienceMutation, useDeleteExperienceMutation } from "@/components/Redux/RTK/portfolioApi";
import { Plus, Edit2, Trash2, Loader2, X, MapPin, Calendar, Clock, Briefcase } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  duration: z.string().min(1, "Duration is required (e.g. Jan 2023 - Present)"),
  location: z.string().min(1, "Location is required"),
  isCurrent: z.boolean(),
  order: z.number(),
  bulletInput: z.string().optional(),
  description: z.array(z.string()),
});


type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function ExperiencePage() {
  const { data: experiencesData, isLoading } = useGetExperiencesQuery({});
  const [createExperience, { isLoading: isCreating }] = useCreateExperienceMutation();
  const [updateExperience, { isLoading: isUpdating }] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bullets, setBullets] = useState<string[]>([]);

  const experiences = experiencesData?.data?.data || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      role: "",
      duration: "",
      location: "",
      isCurrent: false,
      order: 0,
      bulletInput: "",
      description: [],
    },
  });

  const openAddModal = () => {
    setEditingId(null);
    setBullets([]);
    reset({
      company: "",
      role: "",
      duration: "",
      location: "",
      isCurrent: false,
      order: 0,
      bulletInput: "",
      description: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: any) => {
    setEditingId(exp.id || exp._id);
    setBullets(exp.description || []);
    reset({
      company: exp.company || "",
      role: exp.role || "",
      duration: exp.duration || "",
      location: exp.location || "",
      isCurrent: exp.isCurrent || false,
      order: exp.order || 0,
      bulletInput: "",
      description: exp.description || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job experience?")) {
      try {
        await deleteExperience(id).unwrap();
        toast.success("Experience deleted successfully");
      } catch (err: any) {
        toast.error("Failed to delete experience");
      }
    }
  };

  const addBulletPoint = () => {
    const val = watch("bulletInput")?.trim();
    if (!val) return;
    const updated = [...bullets, val];
    setBullets(updated);
    setValue("description", updated);
    setValue("bulletInput", "");
  };

  const removeBulletPoint = (index: number) => {
    const updated = bullets.filter((_, i) => i !== index);
    setBullets(updated);
    setValue("description", updated);
  };

  const onSubmit = async (values: ExperienceFormValues) => {
    try {
      const payload = {
        company: values.company,
        role: values.role,
        duration: values.duration,
        location: values.location,
        isCurrent: values.isCurrent,
        order: values.order,
        description: bullets,
      };

      if (editingId) {
        const res = await updateExperience({ id: editingId, data: payload }).unwrap();
        toast.success(res.message || "Experience updated successfully");
      } else {
        const res = await createExperience(payload).unwrap();
        toast.success(res.message || "Experience created successfully");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save experience");
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#001f3f]">Work Experience</h1>
          <p className="text-sm text-slate-400">Manage your employment timeline.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-[#001f3f] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#003366] transition-colors self-start md:self-center"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience Timeline Grid */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 bg-white border border-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="bg-white text-center py-20 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-slate-400 space-y-4">
          <Briefcase className="mx-auto w-16 h-16 text-slate-200" />
          <h3 className="text-lg font-bold text-slate-700">No Job History Found</h3>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">Click "Add Experience" to start seeding your developer path.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp: any) => (
            <div
              key={exp.id || exp._id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-start md:justify-between gap-4 group"
            >
              <div className="space-y-3 min-w-0">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex flex-wrap items-center gap-2">
                    <span>{exp.role}</span>
                    <span className="text-slate-300 font-normal">at</span>
                    <span className="text-[#001f3f]">{exp.company}</span>
                    {exp.isCurrent && (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Present
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      Order: {exp.order}
                    </span>
                  </div>
                </div>

                {/* Description bullet points */}
                {exp.description && exp.description.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-slate-500 text-xs font-semibold">
                    {exp.description.map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-start">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id || exp._id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800">
                {editingId ? "Edit Work Experience" : "Add Work Experience"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Developer"
                    {...register("role")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f]"
                  />
                  {errors.role && <p className="text-xs text-rose-500">{errors.role.message}</p>}
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    {...register("company")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f]"
                  />
                  {errors.company && <p className="text-xs text-rose-500">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2023 - Present"
                    {...register("duration")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f]"
                  />
                  {errors.duration && <p className="text-xs text-rose-500">{errors.duration.message}</p>}
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, Bangladesh"
                    {...register("location")}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f]"
                  />
                  {errors.location && <p className="text-xs text-rose-500">{errors.location.message}</p>}
                </div>
              </div>

              {/* Order & Current Checkbox */}
              <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-50 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    {...register("isCurrent")}
                    className="w-4 h-4 text-[#001f3f] border-slate-300 rounded focus:ring-[#001f3f]"
                  />
                  <label htmlFor="isCurrent" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                    Current Job (Show 'Present')
                  </label>
                </div>
              </div>

              {/* Bullet points description builder */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description / Responsibilities</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Developed scalable REST APIs utilizing Express.js"
                    {...register("bulletInput")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBulletPoint();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBulletPoint}
                    className="bg-[#001f3f] text-white hover:bg-[#003366] px-4 rounded-lg font-bold text-xs transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* List of bullets */}
                <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                  {bullets.map((bullet, index) => (
                    <div key={index} className="text-xs bg-slate-50 text-slate-600 font-semibold p-2 rounded-lg border border-slate-100 flex items-start justify-between gap-3">
                      <span className="break-words flex-1">{bullet}</span>
                      <button
                        type="button"
                        onClick={() => removeBulletPoint(index)}
                        className="text-slate-400 hover:text-rose-600 shrink-0 mt-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-[#001f3f] text-white hover:bg-[#003366] px-5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow"
                >
                  {(isCreating || isUpdating) ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Entry</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
