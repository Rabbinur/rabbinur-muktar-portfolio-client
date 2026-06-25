"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import {
  useGetMessageByIdQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
} from "@/components/Redux/RTK/portfolioApi";
import { useMessageActions } from "../hooks/useMessageActions";
import MessagePreview from "../_components/MessagePreview";
import ReplyModal from "../_components/ReplyModal";

export default function MessageDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const messageId = params.id as string;

  const [activeMessage, setActiveMessage] = useState<any>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replySubject, setReplySubject] = useState("");

  // সরাসরি ID দিয়ে single message fetch করা
  const { data: messageData, isLoading, isError } = useGetMessageByIdQuery(messageId, {
    skip: !messageId,
  });

  const [updateStatus] = useUpdateMessageStatusMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const { sendReply } = useMessageActions(updateStatus);

  useEffect(() => {
    const msg = messageData?.data;
    if (msg) {
      setActiveMessage(msg);
      // নতুন মেসেজ হলে স্বয়ংক্রিয়ভাবে 'read' mark করা
      if (msg.status === "new") {
        updateStatus({ id: messageId, status: "read" }).unwrap().catch(console.error);
      }
    }
  }, [messageData, messageId, updateStatus]);

  const handleReplyTrigger = () => {
    if (!activeMessage) return;
    setReplySubject(`Re: ${activeMessage.subject}`);
    setReplyBody("");
    setIsReplyOpen(true);
  };

  const handleDelete = async () => {
    if (!activeMessage || !confirm("Delete this message?")) return;
    try {
      await deleteMessage(messageId).unwrap();
      toast.success("Message Deleted");
      router.push("/dashboard/messages");
    } catch {
      toast.error("Delete Failed");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-slate-50 p-4 lg:p-6 h-[calc(100vh-64px)] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 size={28} className="animate-spin" />
          <p className="text-sm">Loading message...</p>
        </div>
      </div>
    );
  }

  // Error / not found state
  if (isError || !activeMessage) {
    return (
      <div className="bg-slate-50 p-4 lg:p-6 h-[calc(100vh-64px)] flex items-center justify-center font-sans">
        <div className="text-center space-y-3 text-slate-500">
          <p className="text-base font-semibold">Message not found</p>
          <button
            onClick={() => router.push("/dashboard/messages")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm transition"
          >
            <ArrowLeft size={15} />
            Back to Inbox
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-4 lg:p-6 h-[calc(100vh-64px)] flex flex-col font-sans">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => router.push("/dashboard/messages")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm transition"
        >
          <ArrowLeft size={16} />
          Back to Inbox
        </button>
      </div>

      {/* Main Mail Preview */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <MessagePreview
          activeMessage={activeMessage}
          onReply={handleReplyTrigger}
          onDelete={handleDelete}
        />
      </div>

      {/* Reply Modal */}
      <ReplyModal
        open={isReplyOpen}
        activeMessage={activeMessage}
        replySubject={replySubject}
        setReplySubject={setReplySubject}
        replyBody={replyBody}
        setReplyBody={setReplyBody}
        onClose={() => setIsReplyOpen(false)}
        onSend={() =>
          sendReply(
            activeMessage,
            replySubject,
            replyBody,
            setActiveMessage,
            setIsReplyOpen
          )
        }
      />
    </div>
  );
}