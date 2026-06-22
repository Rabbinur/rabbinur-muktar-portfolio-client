"use client";

import { useGetProjectsQuery, useDeleteProjectMutation } from "@/components/Redux/RTK/portfolioApi";
import { Plus, Edit2, Trash2, ExternalLink, Search, FolderGit2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const { data: projectsData, isLoading } = useGetProjectsQuery(search);
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const projects = projectsData?.data?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id).unwrap();
        toast.success("Project deleted successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete project");
      }
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#001f3f]">Project Management</h1>
          <p className="text-sm text-slate-400">Add, edit, or delete portfolio projects.</p>
        </div>
        <Link
          href="/dashboard/projects/add"
          className="flex items-center justify-center gap-2 bg-[#001f3f] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#003366] transition-colors self-start md:self-center"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects by title or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#001f3f] focus:border-[#001f3f] text-slate-700 font-medium text-sm"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-white border border-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white text-center py-20 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-slate-400 space-y-4">
          <FolderGit2 className="mx-auto w-16 h-16 text-slate-200" />
          <h3 className="text-lg font-bold text-slate-700">No Projects Found</h3>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">Get started by creating your first showcase project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj: any) => (
            <div
              key={proj.id || proj._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 bg-slate-100">
                  {proj.thumbnail ? (
                    <Image
                      src={proj.thumbnail}
                      alt={proj.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      No Image
                    </div>
                  )}
                  {proj.featured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{proj.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{proj.description}</p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack?.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="text-[10px] bg-slate-50 text-slate-500 font-bold px-2.5 py-0.5 rounded-full border border-slate-100">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack?.length > 3 && (
                      <span className="text-[10px] bg-slate-50 text-slate-400 font-bold px-2 py-0.5 rounded-full border border-slate-100">
                        +{proj.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.liveLink && (
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#001f3f] transition-colors p-1"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/dashboard/projects/edit/${proj.id || proj._id}`}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit2 size={15} />
                  </Link>
                  <button
                    onClick={() => handleDelete(proj.id || proj._id)}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
