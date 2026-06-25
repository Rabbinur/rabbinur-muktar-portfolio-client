"use client";

import { X, Mail, Eye } from "lucide-react";
import { buildEmailBody } from "../utils/emailBuilder";

interface Props {
  open: boolean;
  activeMessage: any;
  replySubject: string;
  setReplySubject: (v: string) => void;
  replyBody: string;
  setReplyBody: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}

export default function ReplyModal({
  open,
  activeMessage,
  replySubject,
  setReplySubject,
  replyBody,
  setReplyBody,
  onClose,
  onSend,
}: Props) {
  if (!open || !activeMessage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] overflow-hidden flex border border-slate-200">
        
        {/* LEFT COMPONENT - Compose Mail Body */}
        <div className="w-1/2 border-r border-slate-200 flex flex-col bg-white">
          {/* Top Bar Header */}
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm text-slate-800">Reply Message</h2>
              <p className="text-xs text-slate-500 mt-0.5">To: {activeMessage.email}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Fields Inputs */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Subject
              </label>
              <input
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-shadow"
              />
            </div>

            <div className="flex flex-col h-[calc(100%-80px)]">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Body Message
              </label>
              <textarea
                rows={10}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Type your response here..."
                className="mt-1.5 w-full flex-1 rounded-lg border border-slate-200 p-3 text-sm resize-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-shadow"
              />
            </div>
          </div>

          {/* Action Trigger Buttons Footer */}
          <div className="border-t border-slate-100 px-5 py-3.5 bg-slate-50/50 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={onSend}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm shadow-blue-500/20 transition"
            >
              <Mail size={14} />
              Open Gmail
            </button>
          </div>
        </div>

        {/* RIGHT COMPONENT - Live Rendering Preview */}
        <div className="w-1/2 flex flex-col bg-slate-50/70">
          <div className="px-5 py-4 border-b border-slate-200/60 bg-slate-50 flex items-center gap-2 text-slate-700">
            <Eye size={15} className="text-slate-500" />
            <h3 className="font-semibold text-sm">Live Gmail Preview</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 min-h-full">
              <div className="space-y-3.5 text-xs text-slate-600">
                <div>
                  <span className="font-medium text-slate-400">To:</span>{" "}
                  <span className="text-slate-700 font-medium">{activeMessage.email}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400">Subject:</span>{" "}
                  <span className="text-slate-800 font-medium">{replySubject}</span>
                </div>
                <hr className="border-slate-100" />
                <pre className="whitespace-pre-wrap text-slate-700 font-sans leading-relaxed text-sm pt-2">
                  {buildEmailBody(activeMessage, replyBody)}
                </pre>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}