"use client";

import { formatDistanceToNow } from "date-fns";
import {
  CheckCheck,
  Reply,
  Trash2,
  Mail,
  MailOpen,
} from "lucide-react";
import { IMessage } from "./types";

interface Props {
  message: IMessage;
  active: boolean;
  onSelect: () => void;
  onReply: () => void;
  onDelete: () => void;
  onMarkRead: () => void;
}

export default function MessageItem({
  message,
  active,
  onSelect,
  onReply,
  onDelete,
  onMarkRead,
}: Props) {
  const isNew = message.status === "new";
  const isReplied = message.status === "replied";

  return (
    <div
      onClick={onSelect}
      className={`
        group
        relative
        flex
        items-center
        grid
        grid-cols-[auto_1fr_auto]
        gap-4
        px-4
        py-3
        cursor-pointer
        border-b
        border-slate-100
        transition-all
        duration-150
        select-none
        ${isNew ? "bg-white font-semibold text-slate-900" : "bg-slate-50/40 text-slate-600"}
        ${active ? "bg-blue-50/70 border-l-4 border-l-blue-600 pl-3" : "hover:bg-slate-100/80 hover:shadow-[inset_1px_0_0_#dadce0]"}
      `}
    >
      {/* Left Icon Panel: Gmail Standard Status Indicator */}
      <div className="flex items-center justify-center w-5 text-slate-400 group-hover:text-slate-600">
        {isNew ? (
          <Mail size={15} className="text-blue-600 animate-pulse" />
        ) : (
          <MailOpen size={15} className="text-slate-400" />
        )}
      </div>

      {/* Center Main Meta Data Wrapper */}
      <div className="min-w-0 flex items-center gap-4">
        {/* Sender Name Section */}
        <div className={`w-32 sm:w-40 shrink-0 truncate text-sm ${isNew ? "font-bold text-slate-900" : "text-slate-700"}`}>
          {message.name}
        </div>

        {/* Mail Subject & Email Context */}
        <div className="flex items-center gap-2 min-w-0 flex-1 text-sm">
          <span className={`${isNew ? "font-bold text-slate-900" : "text-slate-600"} truncate`}>
            {message.subject || "(No Subject)"}
          </span>
          <span className="text-slate-400 font-normal hidden sm:inline shrink-0">—</span>
          <span className="text-slate-400 font-normal truncate hidden sm:inline">
            {message.email}
          </span>
        </div>

        {/* Custom Status Badges if needed */}
        <div className="flex items-center gap-1 shrink-0">
          {isReplied && (
            <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-emerald-600 uppercase">
              Replied
            </span>
          )}
        </div>
      </div>

      {/* Right Corner Control Deck / Interactive Context */}
      <div className="w-20 flex justify-end text-right relative min-h-[20px]">
        {/* Dynamic Timestamp Displays by Default */}
        <span className="text-xs text-slate-400 whitespace-nowrap group-hover:opacity-0 transition-opacity duration-75 tabular-nums">
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: false })}
        </span>

        {/* Hover Context Trigger Buttons Panels */}
        <div className="absolute inset-0 hidden group-hover:flex items-center justify-end gap-1 bg-transparent pl-2">
          {isNew && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
              className="p-1 rounded-full text-slate-500 hover:bg-slate-200 hover:text-blue-600 transition"
              title="Mark as read"
            >
              <CheckCheck size={14} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onReply();
            }}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-200 hover:text-emerald-600 transition"
            title="Reply"
          >
            <Reply size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-200 hover:text-rose-600 transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}