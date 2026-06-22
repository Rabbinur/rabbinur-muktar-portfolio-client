"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contacts", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border/10 dark:bg-[#080d1a]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group">
            <span className="font-heading font-black text-xl tracking-tight text-foreground transition-colors group-hover:text-secondary">
              Rabbinur Muktar
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-muted-foreground">
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
              href="#contact"
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
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-4 py-4 space-y-3 font-bold text-sm shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-4 rounded-xl hover:bg-input text-foreground/80 hover:text-foreground transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-1 border border-secondary text-foreground py-3 rounded-xl font-black text-xs hover:bg-secondary hover:text-white transition-all"
          >
            Got a project?
          </a>
        </div>
      )}
    </header>
  );
}
