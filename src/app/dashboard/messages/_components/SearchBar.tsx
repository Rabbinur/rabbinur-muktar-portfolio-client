"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search messages..."
        className="
        w-full
        rounded-xl
        border
        border-slate-200
        pl-10
        pr-4
        py-2.5
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[#001f3f]
      "
      />
    </div>
  );
}