"use client";

import React from "react";
import { Calendar, Building2 } from "lucide-react";
import { resumeData } from "@/data/resume";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-600 dark:text-[#00FFC2] mb-3">
            <span>/</span>
            <span className="font-semibold">Industry Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            WORK EXPERIENCE
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mt-3 max-w-xl leading-relaxed font-normal">
            Hands-on machine learning engineering and production backend API development.
          </p>
        </div>

        {/* Experience Cards Grid - Perfectly Aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {resumeData.internships.map((internship) => (
            <div
              key={internship.company}
              className="macos-window rounded-3xl p-7 sm:p-9 flex flex-col justify-between group h-full hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Header with Company & Period */}
                <div className="flex items-center justify-between pb-5 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-[#00FFC2]/15 border border-neutral-300 dark:border-[#00FFC2]/30 flex items-center justify-center text-neutral-900 dark:text-[#00FFC2]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-neutral-900 dark:text-[#00FFC2] font-bold uppercase tracking-wider">
                      {internship.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{internship.period}</span>
                  </div>
                </div>

                {/* Role Title & Summary - Equal Height */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight min-h-[32px] flex items-center">
                    {internship.role}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed font-normal min-h-[64px] flex items-center">
                    {internship.summary}
                  </p>
                </div>

                {/* Metrics Badges - Single-Line Fixed Height */}
                {internship.metrics && (
                  <div className="mt-6 grid grid-cols-3 gap-2.5 font-mono text-center items-stretch">
                    {internship.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-center min-h-[72px]"
                      >
                        <div className="text-lg sm:text-xl font-black text-neutral-900 dark:text-[#00FFC2] truncate">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullets - Uniform baseline */}
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-mono min-h-[175px]">
                  {internship.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-neutral-900 dark:text-[#00FFC2] font-bold mt-0.5">/</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Footer */}
              <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2.5 font-bold">
                  / TECHNOLOGIES & TOOLS:
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
