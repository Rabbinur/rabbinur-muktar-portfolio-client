"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  limit?: number;                             // প্রতি পেজে কয়টি ডেটা দেখাবে
  totalItems?: number;                        // মোট ডেটার সংখ্যা (ঐচ্ছিক, জিমেইল লুকের জন্য)
  onChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;    // লিমিট চেঞ্জ করার ফাংশন
}

export default function Pagination({
  page,
  totalPages,
  limit = 10,
  totalItems = 0,
  onChange,
  onLimitChange,
}: Props) {
  
  // জিমেইল স্টাইল রেঞ্জ হিসাব (যেমন: 1-10)
  const fromItem = (page - 1) * limit + 1;
  const toItem = Math.min(page * limit, totalItems || page * limit);

  return (
    <div className="flex items-center justify-between sm:justify-end gap-6 text-xs text-slate-600 font-medium select-none w-full">
      
      {/* Items Per Page Dropdown (জিমেইল সেটিংস স্টাইল) */}
      {onLimitChange && (
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden sm:inline">Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-transparent border border-slate-200 rounded px-1.5 py-1 text-slate-700 outline-none focus:border-slate-400 cursor-pointer transition-colors"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}

      {/* Pagination Info & Buttons Container */}
      <div className="flex items-center gap-4 ml-auto sm:ml-0">
        {/* Gmail Text Look: 1-10 of 100 or Page 1 of 10 */}
        <span className="tabular-nums text-slate-500">
          {totalItems > 0 ? (
            `${fromItem}–${toItem} of ${totalItems}`
          ) : (
            `Page ${page} of ${totalPages}`
          )}
        </span>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-0.5">
          <button
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
            className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors duration-150"
            title="Older"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
            className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors duration-150"
            title="Newer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}