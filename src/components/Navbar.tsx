"use client";

import React, { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { resumeData } from "@/data/resume";
import { GithubIcon } from "./icons/GithubIcon";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Architecture", href: "#architecture" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div
          className={`relative flex items-center justify-between px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#F6F1EA]/95 dark:bg-[#0A0A0A]/90 border border-neutral-300/60 dark:border-neutral-800 shadow-xl backdrop-blur-2xl shadow-black/5 dark:shadow-black/50"
              : "bg-[#F6F1EA]/80 dark:bg-[#0A0A0A]/75 border border-neutral-300/40 dark:border-neutral-800/80 backdrop-blur-xl"
          }`}
        >
          {/* Center: Segmented Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs tracking-wider uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-[#00FFC2] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Theme Toggle, GitHub, Resume PDF */}
          <div className="hidden sm:flex items-center gap-2.5 ml-auto">
            <ThemeToggle />

            <a
              href={resumeData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-[#00FFC2]/20 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-[#00FFC2] border border-neutral-300/50 dark:border-neutral-800 transition-all hover:scale-105"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeData.resumePdfUrl}
              download="Elangovan-S-Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-[#00FFC2] dark:hover:bg-[#20E7B7] dark:text-neutral-950 text-xs font-semibold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>RESUME</span>
            </a>
          </div>

          {/* Mobile hamburger & Theme Toggle */}
          <div className="flex sm:hidden items-center justify-between w-full">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-900 dark:text-[#00FFC2]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-5 rounded-3xl bg-[#F6F1EA] dark:bg-[#141414] border border-neutral-300 dark:border-neutral-800 shadow-2xl backdrop-blur-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-[#00FFC2] hover:bg-black/5 dark:hover:bg-white/5 rounded-xl"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-300/50 dark:border-neutral-800 flex items-center justify-between">
              <a
                href={resumeData.resumePdfUrl}
                download="Elangovan-S-Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 text-white dark:bg-[#00FFC2] dark:text-neutral-950 text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                RESUME PDF
              </a>
              <a
                href={resumeData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-[#00FFC2]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
