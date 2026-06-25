import React from "react";
import { User, Link2, Phone, Globe } from "lucide-react";

export type TabId = "personal" | "social" | "contact" | "seo";

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TABS: TabItem[] = [
  { id: "personal", label: "Profile & Hero", icon: User },
  { id: "social", label: "Resume & Socials", icon: Link2 },
  { id: "contact", label: "Contact Info", icon: Phone },
  { id: "seo", label: "SEO Config", icon: Globe },
];

interface SettingsTabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function SettingsTabNav({ activeTab, onTabChange }: SettingsTabNavProps) {
  return (
    <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? "bg-[#001f3f] text-white shadow-md shadow-[#001f3f]/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <IconComponent size={15} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
