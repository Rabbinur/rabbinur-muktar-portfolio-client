"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => setMounted(true), []);

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Contacts", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2 group">
            <img
              src="/rabbinur-logo.png"
              alt="Rabbinur Muktar"
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-black uppercase tracking-wider text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl hover:bg-input border border-border/40 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <a
              href="/#contact"
              className="border border-secondary text-foreground text-xs font-black px-6 py-2.5 rounded-xl hover:bg-secondary hover:text-white transition-all shadow-[0_0_15px_rgba(255,107,74,0.1)]"
            >
              Got a project?
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2.5 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl hover:bg-input border border-border/40 transition-colors"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-input border border-border/40 transition-colors text-foreground"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background border-l border-border/40 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-lg tracking-tight text-foreground">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-input border border-border/40 text-foreground">
                    <X size={18} />
                  </button>
                </div>
                <nav className="flex flex-col gap-3 font-black uppercase tracking-wider text-xs">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-3 px-4 rounded-xl hover:bg-input text-muted-foreground hover:text-foreground transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-1 border border-secondary text-foreground py-3.5 rounded-xl font-black text-xs hover:bg-secondary hover:text-white transition-all shadow-[0_0_15px_rgba(255,107,74,0.1)]"
              >
                Got a project?
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
