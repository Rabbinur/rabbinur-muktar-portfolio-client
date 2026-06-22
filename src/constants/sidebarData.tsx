// sidebarData.ts - Updated & Serialized for Portfolio Management

import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Mail,
  Settings,
  User
} from "lucide-react";

export const sidebarMenu = [
  // 1. Overview Dashboard
  {
    type: "link",
    id: 1,
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },

  // 2. Project Management
  {
    type: "link",
    id: 2,
    label: "Projects",
    icon: <FolderGit2 size={20} />,
    href: "/dashboard/projects",
  },

  // 3. Experience Management
  {
    type: "link",
    id: 3,
    label: "Experience",
    icon: <Briefcase size={20} />,
    href: "/dashboard/experience",
  },

  // 4. Contact Messages Inbox
  {
    type: "link",
    id: 4,
    label: "Messages",
    icon: <Mail size={20} />,
    href: "/dashboard/messages",
  },

  // 5. Global Portfolio Settings
  {
    type: "link",
    id: 5,
    label: "Settings",
    icon: <Settings size={20} />,
    href: "/dashboard/settings",
  },
];