"use client";

import { useGetProjectsQuery, useGetMessagesQuery, useGetSettingsQuery } from "@/components/Redux/RTK/portfolioApi";
import { FolderGit2, Mail, Download, MessageSquare, ArrowRight, Clock, Smartphone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardContent() {
  const { data: projectsData, isLoading: loadingProjects } = useGetProjectsQuery("");
  const { data: messagesData, isLoading: loadingMessages } = useGetMessagesQuery(undefined);
  const { data: settingsData, isLoading: loadingSettings } = useGetSettingsQuery(undefined);

  const totalProjects = projectsData?.data?.data?.length || 0;
  const totalMessages = messagesData?.data?.data?.length || 0;
  const unreadMessagesCount = messagesData?.data?.data?.filter((m: any) => m.status === "new").length || 0;
  const resumeDownloads = settingsData?.data?.resumeDownloadCount || 0;
  const recentMessages = messagesData?.data?.data?.slice(0, 5) || [];

  const isLoading = loadingProjects || loadingMessages || loadingSettings;

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#001f3f] to-[#003366] text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, Rabbinur Muktar!
          </h1>
          <p className="text-slate-200 text-sm max-w-xl">
            Here is the current status of your professional portfolio. Manage your projects, respond to inquiries, and optimize your global settings.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0,transparent_100%)] pointer-events-none" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Projects Count Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Projects</p>
            <h3 className="text-3xl font-black text-slate-800">
              {isLoading ? <span className="animate-pulse">...</span> : totalProjects}
            </h3>
            <Link href="/dashboard/projects" className="text-xs text-[#001f3f] font-semibold flex items-center gap-1 hover:underline">
              Manage Projects <ArrowRight size={12} />
            </Link>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-[#001f3f] group-hover:scale-110 transition-transform">
            <FolderGit2 size={24} />
          </div>
        </div>

        {/* Messages Count Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Messages</p>
            <h3 className="text-3xl font-black text-slate-800">
              {isLoading ? <span className="animate-pulse">...</span> : totalMessages}
            </h3>
            {unreadMessagesCount > 0 ? (
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                {unreadMessagesCount} new messages
              </span>
            ) : (
              <Link href="/dashboard/messages" className="text-xs text-[#001f3f] font-semibold flex items-center gap-1 hover:underline">
                View Inbox <ArrowRight size={12} />
              </Link>
            )}
          </div>
          <div className="bg-rose-50 p-4 rounded-xl text-rose-500 group-hover:scale-110 transition-transform">
            <Mail size={24} />
          </div>
        </div>

        {/* Resume Downloads Count Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Resume Downloads</p>
            <h3 className="text-3xl font-black text-slate-800">
              {isLoading ? <span className="animate-pulse">...</span> : resumeDownloads}
            </h3>
            <p className="text-xs text-slate-400">Total PDF acquisitions</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
            <Download size={24} />
          </div>
        </div>

        {/* App Installations Count Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">App Installs</p>
            <h3 className="text-3xl font-black text-slate-800">
              {isLoading ? <span className="animate-pulse">...</span> : (settingsData?.data?.appInstallCount || 0)}
            </h3>
            <p className="text-xs text-slate-400">Total PWA installations</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
            <Smartphone size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid: Inbox + Tech Stack status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-[#001f3f]" />
              Recent Inquiries
            </h2>
            <Link href="/dashboard/messages" className="text-xs text-[#001f3f] font-bold hover:underline">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-slate-50 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Mail size={32} className="mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">Your inbox is empty.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentMessages.map((msg: any) => (
                <div key={msg.id || msg._id} className="py-3 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      From: {msg.name} ({msg.email})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {msg.status === "new" && (
                      <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                        New
                      </span>
                    )}
                    {msg.status === "read" && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                        Read
                      </span>
                    )}
                    {msg.status === "replied" && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                        Replied
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock size={10} />
                      {msg.createdAt ? format(new Date(msg.createdAt), "MMM d") : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions & Settings Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
          <h2 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-100">
            Developer Status
          </h2>
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Availability Badge</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <p className="text-sm font-semibold text-slate-700">
                    {settingsData?.data?.websiteSettings?.availabilityStatus || "Available for projects"}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Role</span>
                <p className="text-sm font-bold text-slate-800">
                  {settingsData?.data?.personalInfo?.role || "Full Stack Developer"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Location</span>
                <p className="text-sm font-medium text-slate-600">
                  {settingsData?.data?.personalInfo?.location || "Bangladesh"}
                </p>
              </div>

              <div className="pt-2">
                <Link href="/dashboard/settings" className="block text-center w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-xs">
                  Edit Portfolio Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
