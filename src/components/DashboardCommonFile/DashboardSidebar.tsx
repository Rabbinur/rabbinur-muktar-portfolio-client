

//@ts-nocheck
"use client";

import { sidebarMenu } from "@/constants/sidebarData";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { logoutUser } from "../Authentication/logoutUser";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { logOut, useCurrentUserInfo } from "../Redux/Slice/authSlice";
import { SidebarDropdown, SidebarDropdownItem, SidebarMenuItem } from "./sidebar-menu-item";

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
  isMobile?: boolean;
}

export function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={
      <div className={cn("bg-white border-r border-slate-100 flex flex-col shadow-[10px_0_30px_-15px_rgba(0,0,0,0.04)]", props.collapsed ? "w-20" : "w-[280px]")}>
        <div className="h-15 flex items-center justify-start border-b border-slate-300 bg-white px-6">
          {!props.collapsed ? (
            <div className="flex items-center gap-3">
              <Image src="/rabbinur-logo.png" alt="logo" width={40} height={40} className="object-contain" />
              <div className="flex flex-col">
                <span className="text-[#001f3f] font-black text-xl tracking-tight leading-none uppercase">Kamrul&apos;s</span>
                <span className="text-[#001f3f]/60 font-bold text-[12px] tracking-[0.2em] leading-none mt-1 uppercase">Dealer</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#001f3f]/5 p-2 rounded-xl border border-[#001f3f]/10 shadow-sm">
              <Image src="/fav.png" alt="fav" width={32} height={32} className="rounded-lg" />
            </div>
          )}
        </div>
      </div>
    }>
      <SidebarContent {...props} />
    </Suspense>
  );
}

function SidebarContent({ open, collapsed, onToggle, isMobile }: SidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const user = useAppSelector(useCurrentUserInfo);

  const handleLogOutUser = () => {
    logoutUser(router);
    dispatch(logOut());
    toast.success("Logged Out Successfully");
  };

  const toggleMenu = (menuKey: string) => {
    setExpandedMenu(expandedMenu === menuKey ? null : menuKey);
  };

  const isActive = (href: string) => {
    if (href.includes("role=") && role) return href.includes(`role=${role}`);
    if (href === "/dashboard") return pathname === "/dashboard";
    if (pathname === href || pathname.startsWith(href + "/")) return true;

    // Handle specific plural/singular mappings for subpages
    if (href === "/dashboard/delivery/loading-sheets" && pathname.startsWith("/dashboard/delivery/loading-sheet")) return true;
    if (href === "/dashboard/delivery/settlements" && pathname.startsWith("/dashboard/delivery/settlement")) return true;

    return false;
  };

  // Update expandedMenu when pathname changes to auto-expand the active section
  useEffect(() => {
    const activeDropdown = sidebarMenu.find(
      (menu) =>
          menu.type === "dropdown" &&
          menu.items?.some((item) => isActive(item.href))
    );
    if (activeDropdown && activeDropdown.key) {
      setExpandedMenu(activeDropdown.key);
    }
  }, [pathname, role]);

  return (
    <div className={cn("flex flex-col print:hidden", !isMobile && "shadow")}>
      {/* Mobile Toggle */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 md:hidden bg-white p-2.5 rounded-xl shadow-xl border border-slate-100 text-[#001f3f]"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <aside
        className={cn(
          isMobile
            ? "w-full h-full bg-white flex flex-col"
            : cn(
                "fixed md:relative h-screen bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 border-r border-slate-100 flex flex-col shadow-[10px_0_30px_-15px_rgba(0,0,0,0.04)]",
                open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                collapsed ? "w-20" : "w-[280px]"
              )
        )}
      >
        {/* Brand Header */}
        <div className="h-15 flex items-center justify-start border-b border-slate-300  shadow
        bg-white px-6">
          {!collapsed ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
            >
              {/* লোগো ইমেজ */}
              <Image
                src="/rabbinur-logo.png"
                alt="logo"
                width={250} 
                height={250}
                priority
                className="object-contain"
              />


            </Link>
          ) : (
            <div className="bg-[#001f3f]/5 p-2 rounded-xl border border-[#001f3f]/10 shadow-sm transition-all hover:bg-[#001f3f]/10">
              <Image src="/fav.png" alt="fav" width={32} height={32} className="rounded-lg" />
            </div>
          )}
        </div>


        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar scroll-smooth">
          {sidebarMenu
            .filter((menu) => !(menu.key === "user-management" && user?.role === "moderator"))
            .map((menu) =>
              menu.type === "dropdown" ? (
                <SidebarDropdown
                  key={menu.id}
                  icon={menu.icon}
                  label={menu.label}
                  collapsed={collapsed}
                  expanded={expandedMenu === menu.key}
                  isActive={menu.items?.some((item) => isActive(item.href))}
                  onToggle={() => toggleMenu(menu.key)}
                >
                  {menu.items?.map((item) => (
                    <SidebarDropdownItem
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      isActive={isActive(item.href)}
                    />
                  ))}
                </SidebarDropdown>
              ) : (
                <SidebarMenuItem
                  key={menu.id}
                  icon={menu.icon}
                  label={menu.label}
                  href={menu.href}
                  collapsed={collapsed}
                  isActive={isActive(menu.href ?? "")}
                />
              )
            )}
        </nav>


        {/* --- Sidebar Footer Section --- */}
        <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-4">

          {/* Logout Button */}
          <button
            onClick={handleLogOutUser}
            className={cn(
              "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 transition-all duration-300",
              "bg-transparent text-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut size={20} className="z-10 transition-transform group-hover:scale-110" />
            {!collapsed && (
              <span className="z-10 whitespace-nowrap text-[13px] font-bold tracking-wide">
                Logout Account
              </span>
            )}
          </button>

          {/* Brand Signature */}
          {!collapsed && (
            <div className="mt-4 text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-300">
                Powered by <span className="text-[#001f3f]/50 text-xs italic">Muktar&apos;s IT</span>
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}