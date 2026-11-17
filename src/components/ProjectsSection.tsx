"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { resumeData } from "@/data/resume";
import { GithubIcon } from "./icons/GithubIcon";
import { ProjectLangGraphDemo } from "./ProjectLangGraphDemo";
import { ProjectPolarDemo } from "./ProjectPolarDemo";
import { ProjectVRMDemo } from "./ProjectVRMDemo";

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "AI & Multi-Agent", "Machine Learning", "Real-Time Systems"];

  const filteredProjects =
    selectedFilter === "All"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-600 dark:text-[#00FFC2] mb-3">
              <span>/</span>
              <span className="font-semibold">Production Systems & Open Source</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
              FEATURED PROJECTS
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mt-3 max-w-xl leading-relaxed font-normal">
              Autonomous multi-agent pipelines, custom deep learning classifiers, and real-time graphics pipelines.
            </p>
          </div>

          {/* Segmented Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-semibold ${
                  selectedFilter === cat
                    ? "bg-neutral-900 text-white dark:bg-[#00FFC2] dark:text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-8 sm:space-y-10">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="macos-window rounded-3xl p-7 sm:p-10 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Project Metadata */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[11px] font-mono font-semibold text-neutral-800 dark:text-[#00FFC2] border border-neutral-200 dark:border-neutral-800">
                        {project.category}
                      </span>
                      {project.metric && (
                        <span className="px-3 py-1 rounded-full bg-black/10 dark:bg-[#00FFC2]/15 text-neutral-900 dark:text-white text-[11px] font-mono font-bold border border-neutral-300 dark:border-[#00FFC2]/30">
                          {project.metric}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mt-3">
                      {project.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="mt-5 space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-mono">
                      {project.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-neutral-900 dark:text-[#00FFC2] font-bold mt-0.5">/</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack & Repo Link */}
                  <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link Button */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-[#00FFC2] dark:hover:bg-[#20E7B7] dark:text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>View Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        {project.repoName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Interactive Demo */}
                <div className="lg:col-span-6">
                  {project.title.includes("Multi-Agent") && <ProjectLangGraphDemo />}
                  {project.title.includes("Polar") && <ProjectPolarDemo />}
                  {project.title.includes("Avatar") && <ProjectVRMDemo />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
