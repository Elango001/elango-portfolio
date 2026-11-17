"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nk_portfolio_theme_v1");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const nextDark = !isDark;
    const doc = document as any;
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = e.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const y = e.clientY || (rect ? rect.top + rect.height / 2 : 40);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // If browser supports View Transitions API
    if ("startViewTransition" in doc) {
      const transition = doc.startViewTransition(() => {
        setIsDark(nextDark);
        if (nextDark) {
          doc.documentElement.classList.add("dark");
          localStorage.setItem("nk_portfolio_theme_v1", "dark");
        } else {
          doc.documentElement.classList.remove("dark");
          localStorage.setItem("nk_portfolio_theme_v1", "light");
        }
      });

      transition.ready.then(() => {
        doc.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setIsDark(nextDark);
      if (nextDark) {
        doc.documentElement.classList.add("dark");
        localStorage.setItem("nk_portfolio_theme_v1", "dark");
      } else {
        doc.documentElement.classList.remove("dark");
        localStorage.setItem("nk_portfolio_theme_v1", "light");
      }
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-xs font-mono font-medium border group hover:scale-105 active:scale-95"
      style={{
        backgroundColor: isDark ? "rgba(0, 255, 194, 0.10)" : "rgba(10, 10, 10, 0.05)",
        color: isDark ? "#00FFC2" : "#0A0A0A",
        borderColor: isDark ? "rgba(0, 255, 194, 0.30)" : "rgba(10, 10, 10, 0.15)",
      }}
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Warm Studio Light Theme" : "Switch to Carbon Dark Theme"}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#00FFC2] group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-[11px] font-mono">LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#0A0A0A] group-hover:-rotate-12 transition-transform duration-300" />
          <span className="text-[11px] font-mono">DARK</span>
        </>
      )}
    </button>
  );
}
