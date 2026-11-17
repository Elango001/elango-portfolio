"use client";

import React, { useState } from "react";
import { Download, Copy, Check, Server, Cpu, Database, Activity, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { resumeData } from "@/data/resume";
import { HeroTesseract } from "./HeroTesseract";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#00FFC2", "#141414", "#ffffff"],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const architectureHighlights = [
    {
      num: "01",
      icon: Server,
      title: "Backend Engineering",
      desc: "FastAPI & Flask REST APIs with JWT authentication, CRUD workflows, and sub-100ms latency.",
      tags: ["FastAPI", "Flask", "Auth"],
    },
    {
      num: "02",
      icon: Cpu,
      title: "Multi-Agent Systems",
      desc: "LangGraph stateful execution graphs with sandboxed code execution and multi-LLM routing.",
      tags: ["LangGraph", "Agents", "Tools"],
    },
    {
      num: "03",
      icon: Database,
      title: "Data Layer Design",
      desc: "Dual-database tier pairing MySQL ACID guarantees with flexible MongoDB document schemas.",
      tags: ["MySQL", "MongoDB", "ACID"],
    },
    {
      num: "04",
      icon: Activity,
      title: "Deep Learning & XAI",
      desc: "Custom PyTorch architectures with 2D polar space projections and serialized ML pipelines.",
      tags: ["PyTorch", "XAI", "Models"],
    },
  ];

  return (
    <section id="overview" className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
      {/* Background Subtle Dev Grid */}
      <div className="absolute inset-0 bg-dev-grid pointer-events-none opacity-40 dark:opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Hero Header - 2-Column Split placing the character in the gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Title & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Tag with Live Pulse Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-300/80 dark:border-neutral-800 text-xs uppercase tracking-widest font-mono text-neutral-800 dark:text-[#00FFC2]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00634B] dark:bg-[#00FFC2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00634B] dark:bg-[#00FFC2]"></span>
              </span>
              <span className="font-semibold">AI & Backend Systems Engineer</span>
            </div>

            {/* Name Display */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.92] text-neutral-900 dark:text-white">
              {resumeData.name}
            </h1>

            {/* Impact Statement */}
            <p className="text-xl sm:text-2xl font-medium text-neutral-800 dark:text-neutral-200 tracking-tight leading-snug">
              {resumeData.title}
            </p>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              {resumeData.summary}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-[#00FFC2] dark:hover:bg-[#20E7B7] dark:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <a
                href={resumeData.resumePdfUrl}
                download="Elangovan-S-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-900 dark:text-white font-semibold text-xs tracking-wider uppercase border border-neutral-300 dark:border-neutral-800 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300 text-xs font-mono border border-neutral-300/80 dark:border-neutral-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00634B] dark:text-[#00FFC2]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 4D Tesseract Animation in the gap near the name! */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroTesseract />
          </div>
        </div>

        {/* 4 Architecture Pillars in Perfectly Aligned Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 sm:mt-12 items-stretch">
          {architectureHighlights.map((arch) => {
            const Icon = arch.icon;
            return (
              <div
                key={arch.num}
                className="macos-window p-6 rounded-3xl flex flex-col justify-between group h-full hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-[#00FFC2]">
                      / {arch.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-[#00FFC2]" />
                  </div>

                  <div className="mt-5 flex items-center gap-2.5 min-h-[40px]">
                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#00FFC2]/15 border border-neutral-300/60 dark:border-[#00FFC2]/30 flex items-center justify-center text-neutral-900 dark:text-[#00FFC2] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white tracking-tight">
                      {arch.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed font-normal min-h-[54px] flex items-center">
                    {arch.desc}
                  </p>
                </div>

                {/* Bottom Tags Section - Uniform baseline across all 4 cards */}
                <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center gap-1.5 min-h-[32px] overflow-hidden">
                  {arch.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
