"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, Moon, Sun, X, Home, User, Code, Briefcase, Layers, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home", href: "#home", icon: Home },
    { id: "about", label: "About", href: "#about", icon: User },
    { id: "services", label: "Services", href: "#services", icon: Layers },
    { id: "skills", label: "Skills", href: "#skills", icon: Code },
    { id: "experience", label: "Experience", href: "#experience", icon: Briefcase },
    { id: "projects", label: "Projects", href: "#projects", icon: Code },
    { id: "contact", label: "Contacts", href: "#contact", icon: Mail },
  ];

  const mobileDockLinks = [
    { id: "home", label: "Home", href: "#home", icon: Home },
    { id: "about", label: "About", href: "#about", icon: User },
    { id: "contact", label: "Hire", href: "#contact", icon: Mail, isCenter: true }, // Magnetic Center CTA
    { id: "projects", label: "Work", href: "#projects", icon: Briefcase },
    { id: "menu", label: "Menu", href: null, icon: Menu, isMenuTrigger: true },
  ];

  // 1. 🎯 Scroll Spy & Active Section Detection Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // 2. 🌊 Smooth Anchor Scrolling Handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update hash in URL smoothly
      window.history.pushState(null, "", href);
    }
  };

  // 3. 🧲 Magnetic Effect Setup for Center CTA
  const centerButtonRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!centerButtonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = centerButtonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Limit the pull distance to max 15px
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      {/* --- DESKTOP HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/40 shadow-sm"
            : "bg-background/40 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href={isHomePage ? "#home" : "/"}
              onClick={(e) => {
                if (isHomePage) {
                  handleSmoothScroll(e, "#home");
                }
              }}
              className="flex items-center gap-2 group relative z-[60]"
            >
              <Image
                src="/rabbinur-logo.png"
                alt="Rabbinur Muktar"
                width={100}
                height={100}
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav with Scroll Spy Highlighting */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-black uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={(e) => {
                    if (isHomePage) {
                      handleSmoothScroll(e, link.href);
                    }
                  }}
                  className={`transition-colors relative py-2 ${
                    activeSection === link.id
                      ? "text-foreground font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="p-2 hidden rounded-xl hover:bg-input border border-border/40 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Toggle Theme"
                >
                  {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}
              <Link
                href={isHomePage ? "#contact" : "/#contact"}
                onClick={(e) => {
                  if (isHomePage) {
                    handleSmoothScroll(e, "#contact");
                  }
                }}
                className="border border-secondary text-foreground text-xs font-black px-6 py-2.5 rounded-xl hover:bg-secondary hover:text-white transition-all shadow-[0_0_15px_rgba(255,107,74,0.1)]"
              >
                Got a project?
              </Link>
            </div>

            {/* Mobile Top Theme Switcher Only */}
            <div className="flex  items-center gap-2.5 lg: hidden relative z-[60]">
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-xl hover:bg-input border border-border/40 transition-colors text-foreground"
                  aria-label="Toggle Theme"
                >
                  {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE FLOATING DOCK BAR (With Scroll Spy & Magnetic CTA) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm lg:hidden">
        <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-neutral-800/80 px-3 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {mobileDockLinks.map((tab) => {
            const Icon = tab.icon;

            // Magnetic Center CTA Mode
            if (tab.isCenter) {
              return (
                <motion.a
                  ref={centerButtonRef}
                  key={tab.id}
                  href={isHomePage ? tab.href! : `/${tab.href!}`}
                  onClick={(e) => {
                    if (isHomePage) {
                      handleSmoothScroll(e, tab.href!);
                    }
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ x: magneticX, y: magneticY }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center w-11 h-11 bg-white text-black rounded-full shadow-lg"
                  aria-label={tab.label}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </motion.a>
              );
            }

            const isActive = activeSection === tab.id;

            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  if (tab.isMenuTrigger) {
                    setIsOpen(!isOpen);
                  } else if (tab.href) {
                    if (isHomePage) {
                      handleSmoothScroll(e, tab.href);
                    } else {
                      router.push(`/${tab.href}`);
                    }
                  }
                }}
                className="flex flex-col items-center justify-center flex-1 group"
              >
                <div
                  className={`transition-all duration-200 ${
                    isActive || (tab.isMenuTrigger && isOpen)
                      ? "text-white scale-110"
                      : "text-neutral-500 group-hover:text-neutral-300"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-widest mt-0.5 transition-all duration-200 ${
                    isActive || (tab.isMenuTrigger && isOpen)
                      ? "text-white opacity-100"
                      : "text-neutral-500 opacity-60"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- OPTIMIZED MOBILE DRAWER WIDTH & SMOOTH ANCHORS --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Better Drawer Width Applied (max-w-[300px] w-[80vw]) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="absolute top-0 right-0 bottom-0 max-w-[300px] w-[80vw] bg-background border-l border-border/40 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto pb-28"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between h-14 border-b border-border/10 pb-2">
                  <Link
                    href={isHomePage ? "#home" : "/"}
                    onClick={(e) => {
                      if (isHomePage) {
                        handleSmoothScroll(e, "#home");
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="flex items-center"
                  >
                    <Image
                      src="/rabbinur-logo.png"
                      alt="Rabbinur Muktar"
                      width={90}
                      height={90}
                      className="h-7 w-auto object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-input border border-border/40 text-foreground"
                    aria-label="Close Menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 font-black uppercase tracking-wider text-xs">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={isHomePage ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        if (isHomePage) {
                          handleSmoothScroll(e, link.href);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                      className={`py-3 px-4 rounded-xl transition-all flex items-center gap-3 ${
                        activeSection === link.id
                          ? "bg-secondary text-white shadow-sm"
                          : "hover:bg-input text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <Link
                href={isHomePage ? "#contact" : "/#contact"}
                onClick={(e) => {
                  if (isHomePage) {
                    handleSmoothScroll(e, "#contact");
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="w-full flex items-center justify-center gap-1 border border-secondary text-foreground py-3.5 rounded-xl font-black text-xs hover:bg-secondary hover:text-white transition-all shadow-[0_0_15px_rgba(255,107,74,0.1)]"
              >
                Got a project?
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}