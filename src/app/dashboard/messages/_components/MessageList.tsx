"use client";

import MessageItem from "./MessageItem";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function MessageList({
    messages,
    search,
    setSearch,
    activeMessage,
    onSelect,
    onReply,
    onDelete,
    onMarkRead,
    page,
    totalPages,
    totalItems,
    limit,
    onPageChange,
    onLimitChange,
}: any) {
    return (
        <div
            className="
        bg-white 
        rounded-2xl 
        border 
        border-slate-200/80 
        shadow-sm 
        h-full 
        flex 
        flex-col 
        overflow-hidden
      "
        >
            {/* Gmail Style Header/Toolbar */}
            <div className="border-b border-slate-100 bg-slate-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-slate-800">
                            Inbox
                        </h2>
                        <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">
                            {messages.length}
                        </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                        Page {page} of {totalPages}
                    </span>
                </div>

                {/* Search Bar */}
                <div className="w-full">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                    />
                </div>
            </div>

            {/* Message List Area */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 bg-slate-50/20">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
                        <p className="text-sm">No messages found</p>
                    </div>
                ) : (
                    messages.map((message: any) => (
                        <div
                            key={message._id}
                            className="transition-colors duration-150 hover:bg-slate-50"
                        >
                            <MessageItem
                                message={message}
                                active={activeMessage?._id === message._id}
                                onSelect={() => onSelect(message)}
                                onReply={() => onReply(message)}
                                onDelete={() => onDelete(message)}
                                onMarkRead={() => onMarkRead(message)}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Footer Pagination Controls */}
            <div className="border-t border-slate-100 p-3 bg-white flex justify-end items-center">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    limit={limit}
                    totalItems={totalItems}
                    onChange={onPageChange}
                    onLimitChange={onLimitChange}
                />
            </div>
        </div>
    );
}