
"use client";

import { useGetMessagesQuery } from "@/components/Redux/RTK/portfolioApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageList from "./_components/MessageList";

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const { data: messagesData, isLoading } = useGetMessagesQuery({
    search,
    page,
    limit,
  });

  const messages = messagesData?.data?.data || [];
  const meta = messagesData?.data?.meta || {};
  const totalPages = meta.totalPage || 1;
  const totalItems = meta.total ?? messages.length;

  const handleOpenMessage = (message: any) => {
    const messageId = message._id || message.id;
    router.push(`/dashboard/messages/${messageId}`);
  };

  return (
    <div className="bg-slate-50 p-4 lg:p-6 h-[calc(100vh-64px)] flex flex-col font-sans">
      {/* Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage portfolio inquiries and client conversations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total:</span>
          <span className="font-semibold text-sm text-slate-700">
            {totalItems}
          </span>
        </div>
      </div>

      {/* Full Width Message List */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <MessageList
          messages={messages}
          search={search}
          setSearch={(val: string) => { setSearch(val); setPage(1); }}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={(newLimit: number) => { setLimit(newLimit); setPage(1); }}
          isLoading={isLoading}
          onSelect={handleOpenMessage}
          activeMessage={null}
          onReply={() => {}}
          onDelete={() => {}}
          onMarkRead={() => {}}
        />
      </div>
    </div>
  );
}