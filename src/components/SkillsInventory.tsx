"use client";

import React, { useState } from "react";
import { Terminal, Database, Brain, Globe, Code, Wrench } from "lucide-react";
import { resumeData } from "@/data/resume";

export function SkillsInventory() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const skillCategories = [
    {
      id: "backend",
      title: "Backend & Systems",
      icon: Terminal,
      skills: resumeData.technicalSkills.backend,
      desc: "High-throughput asynchronous REST APIs, authentication & routing",
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: Brain,
      skills: resumeData.technicalSkills.mlAndAi,
      desc: "Stateful agent graphs, PyTorch classifiers & pipeline serialization",
    },
    {
      id: "languages",
      title: "Languages",
      icon: Code,
      skills: resumeData.technicalSkills.languages,
      desc: "Primary languages for systems engineering and algorithmic workflows",
    },
    {
      id: "databases",
      title: "Databases & Storage",
      icon: Database,
      skills: resumeData.technicalSkills.databases,
      desc: "Relational integrity with MySQL and document schemas in MongoDB",
    },
    {
      id: "frontend-3d",
      title: "Frontend & Graphics",
      icon: Globe,
      skills: resumeData.technicalSkills.frontend,
      desc: "Interactive dashboards and real-time WebGL skeletal rendering",
    },
    {
      id: "tools",
      title: "DevOps & Engineering Tools",
      icon: Wrench,
      skills: resumeData.technicalSkills.devopsAndTools,
      desc: "Version control, Linux environments and deployment serialization",
    },
  ];

  const filtered =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="stack" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-600 dark:text-[#00FFC2] mb-3">
              <span>/</span>
              <span className="font-semibold">Core Technical Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
              TECHNICAL STACK
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mt-3 max-w-xl leading-relaxed font-normal">
              Production frameworks, machine learning tooling, and distributed backend primitives.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-semibold ${
                activeCategory === "all"
                  ? "bg-neutral-900 text-white dark:bg-[#00FFC2] dark:text-neutral-950 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              All Stack
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-semibold ${
                  activeCategory === c.id
                    ? "bg-neutral-900 text-white dark:bg-[#00FFC2] dark:text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {c.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="macos-window rounded-3xl p-7 flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#00FFC2]/15 border border-neutral-300 dark:border-[#00FFC2]/30 flex items-center justify-center text-neutral-900 dark:text-[#00FFC2]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 font-bold">
                      / 0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed font-normal">
                    {cat.desc}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium transition-all hover:scale-105 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-[#00FFC2]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
