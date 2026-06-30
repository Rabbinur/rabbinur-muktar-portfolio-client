"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { Sidebar } from "./DashboardSidebar";



const DashboardSide = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="h-full bg-white dark:bg-slate-900 flex flex-col w-full">
      <Link href={`/dashboard/`}>
        <div className="p-4 border-b flex justify-center">
          <Image
            src={"/rabbinur-logo.png"}
            alt="logo"
            width={160}
            height={60}
            className="h-auto w-auto object-contain"
          />
        </div>
      </Link>

      <div className="flex-grow overflow-y-auto px-4 py-2">
        <Sidebar
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default DashboardSide;
