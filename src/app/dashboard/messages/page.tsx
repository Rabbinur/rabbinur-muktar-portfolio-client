"use client";

import { useDeleteMessageMutation, useGetMessagesQuery, useUpdateMessageStatusMutation } from "@/components/Redux/RTK/portfolioApi";
import { format } from "date-fns";
import { Calendar, Info, Mail, Reply, Trash2, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMessageActions } from "./hooks/useMessageActions";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const { data: messagesData, isLoading } = useGetMessagesQuery(search);
  const [updateStatus] = useUpdateMessageStatusMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const { sendReply } = useMessageActions(updateStatus);
  const [activeMessage, setActiveMessage] = useState<any | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replySubject, setReplySubject] = useState("");


  const handleOpenReplyModal = () => {
    if (!activeMessage) return;
    setReplySubject(`Reply to Inquiry - ${activeMessage.subject || "Portfolio"}`);
    setReplyBody("");
    setIsReplyOpen(true);
  };

  const messages = messagesData?.data?.data || [];

  const handleOpenMessage = async (msg: any) => {
    setActiveMessage(msg);
    if (msg.status === "new") {
      try {
        await updateStatus({ id: msg.id || msg._id, status: "read" }).unwrap();
      } catch (err) {
        console.error("Failed to mark message as read:", err);
      }
    }
  };

  const handleMarkReplied = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateStatus({ id, status: "replied" }).unwrap();
      toast.success("Message marked as replied");
      if (activeMessage && (activeMessage.id === id || activeMessage._id === id)) {
        setActiveMessage({ ...activeMessage, status: "replied" });
      }
    } catch (err) {
      toast.error("Failed to mark message status");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id).unwrap();
        toast.success("Message deleted successfully");
        if (activeMessage && (activeMessage.id === id || activeMessage._id === id)) {
          setActiveMessage(null);
        }
      } catch (err) {
        toast.error("Failed to delete message");
      }
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#001f3f]">Contact Messages</h1>
          <p className="text-sm text-slate-400">View and respond to inquiries from your portfolio website.</p>
        </div>
      </div>

      {/* Main Inbox Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-600">Inbox ({messages.length})</h2>
            <input
              type="text"
              placeholder="Search sender, subject or text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-1 focus:ring-[#001f3f]"
            />
          </div>

          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-12 bg-slate-50 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <Mail size={40} className="mx-auto text-slate-200" />
              <p className="text-sm font-semibold">Your inbox is empty.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="p-4 pl-6">Sender</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {messages.map((msg: any) => {
                    const isNew = msg.status === "new";
                    const isReplied = msg.status === "replied";
                    return (
                      <tr
                        key={msg.id || msg._id}
                        onClick={() => handleOpenMessage(msg)}
                        className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${isNew ? "font-bold bg-[#001f3f]/5" : ""
                          }`}
                      >
                        <td className="p-4 pl-6">
                          <p className="text-slate-700 font-bold truncate max-w-[140px]">{msg.name}</p>
                          <p className="text-slate-400 font-medium text-[10px] truncate max-w-[140px]">{msg.email}</p>
                        </td>
                        <td className="p-4 max-w-[200px] truncate text-slate-700">
                          {msg.subject}
                        </td>
                        <td className="p-4">
                          {isNew && (
                            <span className="bg-rose-100 text-rose-600 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                              New
                            </span>
                          )}
                          {msg.status === "read" && (
                            <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                              Read
                            </span>
                          )}
                          {isReplied && (
                            <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                              Replied
                            </span>
                          )}
                        </td>
                        <td className="p-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            {!isReplied && (
                              <button
                                onClick={(e) => handleMarkReplied(msg.id || msg._id, e)}
                                title="Mark as Replied"
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              >
                                <Reply size={14} />
                              </button>
                            )}
                            <button
                              onClick={(e) => handleDelete(msg.id || msg._id, e)}
                              title="Delete Message"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message Details Preview Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 flex flex-col justify-between min-h-[400px]">
          {activeMessage ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Meta details */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-800 text-sm leading-tight flex items-center gap-1.5">
                      <User size={14} className="text-[#001f3f]" />
                      {activeMessage.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold">{activeMessage.email}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Calendar size={11} />
                    {activeMessage.createdAt ? format(new Date(activeMessage.createdAt), "MMM d, h:mm a") : ""}
                  </span>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Subject</span>
                  <p className="text-xs font-bold text-slate-700 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                    {activeMessage.subject}
                  </p>
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Message Text</span>
                  <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-line font-medium">
                    {activeMessage.message}
                  </div>
                </div>
              </div>

              {/* Sidebar actions */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={handleOpenReplyModal}
                  className="flex-1 flex items-center justify-center gap-1 bg-[#001f3f] hover:bg-[#003366] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow"
                >
                  <Reply size={13} />
                  <span>Send Reply</span>
                </button>
                <button
                  onClick={(e) => handleDelete(activeMessage.id || activeMessage._id, e)}
                  className="px-3.5 py-2.5 border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 py-10">
              <Info size={32} className="text-slate-200 mb-2" />
              <h3 className="text-sm font-bold text-slate-700">No Message Selected</h3>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto mt-1">Select any email in your inbox to read and reply.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {isReplyOpen && activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-6 shadow-2xl text-slate-800 space-y-4">
            <button
              onClick={() => setIsReplyOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="text-base font-bold text-slate-800">Send Reply</h3>
              <p className="text-xs text-slate-400 mt-0.5">To: <span className="font-semibold">{activeMessage.email}</span></p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1 text-left">
                <label className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Subject</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-[#001f3f]"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">Reply Message</label>
                <textarea
                  rows={6}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder="Write your email reply here..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium resize-none focus:outline-none focus:ring-1 focus:ring-[#001f3f]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 justify-end">
              <button
                onClick={() => setIsReplyOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  sendReply(
                    activeMessage,
                    replySubject,
                    replyBody,
                    setActiveMessage,
                    setIsReplyOpen
                  )
                }
                className="px-5 py-2 bg-[#001f3f] hover:bg-[#003366] text-white rounded-xl text-xs font-bold transition shadow"
              >
                Open Mail Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
