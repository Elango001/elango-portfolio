"use client";

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Copy, Check, Download, ExternalLink, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { resumeData } from "@/data/resume";
import { GithubIcon } from "./icons/GithubIcon";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#00FFC2", "#141414", "#ffffff"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Contact Window */}
        <div className="macos-window rounded-3xl p-7 sm:p-12 mb-10 sm:mb-12 overflow-hidden">
          {/* Window Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#00FFC2]/15 border border-neutral-300 dark:border-[#00FFC2]/30 flex items-center justify-center text-neutral-900 dark:text-[#00FFC2]">
                <Send className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs text-neutral-900 dark:text-[#00FFC2] font-bold uppercase tracking-wider">
                / DIRECT CHANNELS
              </span>
            </div>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Salem, Tamil Nadu
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Heading & Call to Action */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
                GET IN TOUCH
              </h2>

              <p className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-200 tracking-tight leading-snug">
                Let&apos;s build high-impact backend & AI systems together.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Ready to contribute in AI and Backend Engineering roles. Whether architecting high-throughput REST APIs, designing multi-agent LLM graphs, or deploying PyTorch pipelines, let&apos;s connect.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-[#00FFC2] dark:hover:bg-[#20E7B7] dark:text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                  <span>{copied ? "Email Copied!" : "Copy Email: " + resumeData.email}</span>
                </button>

                <a
                  href={resumeData.resumePdfUrl}
                  download="Elangovan-S-Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-900 dark:text-white font-semibold text-xs tracking-wider uppercase border border-neutral-300 dark:border-neutral-800 transition-all transform hover:-translate-y-0.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Docket */}
            <div className="lg:col-span-5 space-y-3 font-mono text-xs">
              <div className="p-6 rounded-3xl bg-black/5 dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block font-bold">
                  / CONNECT
                </span>

                <div className="flex items-center justify-between py-2.5 border-b border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-900 dark:text-[#00FFC2]" />
                    <span className="truncate max-w-[170px] sm:max-w-none">{resumeData.email}</span>
                  </div>
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="text-neutral-950 dark:text-[#00FFC2] font-bold hover:underline"
                  >
                    Send Email
                  </a>
                </div>

                <div className="flex items-center justify-between py-2.5 border-b border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-neutral-900 dark:text-[#00FFC2]" />
                    <span>{resumeData.github}</span>
                  </div>
                  <a
                    href={resumeData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-950 dark:text-[#00FFC2] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2.5 pt-1 text-neutral-500 dark:text-neutral-400">
                  <MapPin className="w-4 h-4 text-neutral-900 dark:text-[#00FFC2]" />
                  <span>{resumeData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credit & Copyright Bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-[#00FFC2]" />
            <span className="font-bold text-neutral-900 dark:text-white">Elangovan S</span>
            <span className="hidden sm:inline text-neutral-500 dark:text-neutral-400">— AI & Backend Engineer</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={resumeData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-[#00FFC2] transition-colors font-medium"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={`mailto:${resumeData.email}`}
              className="hover:text-neutral-950 dark:hover:text-[#00FFC2] transition-colors font-medium"
            >
              Email
            </a>
            <span>•</span>
            <a
              href={resumeData.resumePdfUrl}
              download="Elangovan-S-Resume.pdf"
              className="hover:text-neutral-950 dark:hover:text-[#00FFC2] transition-colors font-medium"
            >
              Resume
            </a>
          </div>

          <div className="text-neutral-500 dark:text-neutral-500 text-[11px]">
            © {year} Elangovan S. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
