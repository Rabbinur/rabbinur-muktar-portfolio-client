"use client";

import { format } from "date-fns";
import {
  Calendar,
  Mail,
  Reply,
  Trash2,
  User,
} from "lucide-react";

export default function MessagePreview({
  activeMessage,
  onReply,
  onDelete,
}: any) {
  if (!activeMessage) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm h-full flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <Mail className="text-slate-400" size={26} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-700">
              No conversation selected
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Select a thread from the list to read, reply, or manage client interactions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = {
    new: "bg-amber-50 text-amber-700 border-amber-200",
    read: "bg-slate-100 text-slate-600 border-slate-200",
    replied: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm h-full flex flex-col overflow-hidden">
      {/* Top Action Controls / Toolbar */}
      <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onReply}
            className="p-2 text-slate-600 hover:bg-slate-200/70 rounded-full transition-colors duration-150"
            title="Reply"
          >
            <Reply size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors duration-150"
            title="Delete Message"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <span
          className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
            statusColor[activeMessage.status as keyof typeof statusColor]
          }`}
        >
          {activeMessage.status}
        </span>
      </div>

      {/* Message Subject Header */}
      <div className="px-6 pt-5 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 leading-snug">
          {activeMessage.subject}
        </h2>
      </div>

      {/* Sender Information Details */}
      <div className="px-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-sm text-slate-800">{activeMessage.name}</span>
              <span className="text-xs text-slate-400">&lt;{activeMessage.email}&gt;</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">to me</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar size={13} />
          <span>{format(new Date(activeMessage.createdAt), "MMM d, yyyy, h:mm a")}</span>
        </div>
      </div>

      {/* Main Mail Message Text Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap font-sans selection:bg-sky-100">
          {activeMessage.message}
        </div>
      </div>

      {/* Quick Reply Trigger Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
        <button
          onClick={onReply}
          className="inline-flex items-center gap-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-full shadow-sm transition"
        >
          <Reply size={14} className="text-slate-500" />
          Reply
        </button>
      </div>
    </div>
  );
}