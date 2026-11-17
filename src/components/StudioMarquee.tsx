"use client";

import React from "react";

export function StudioMarquee() {
  const skills = [
    "PYTHON",
    "FASTAPI",
    "PYTORCH",
    "LANGGRAPH",
    "FLASK",
    "REACT",
    "THREE.JS",
    "MYSQL",
    "MONGODB",
    "SCIKIT-LEARN",
    "LANGCHAIN",
    "TENSORFLOW",
    "HUGGINGFACE",
    "SQL",
    "JAVASCRIPT",
    "TAILWIND CSS",
    "GIT",
    "LINUX",
    "EXPLAINABLE AI",
    "RESTFUL APIS",
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-neutral-300/70 dark:border-neutral-800 bg-[#EAE2D4]/60 dark:bg-[#0E0E0E] backdrop-blur-md select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-300">
        {[...skills, ...skills].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-semibold hover:text-[#00634B] dark:hover:text-[#00FFC2] transition-colors cursor-default">
              {text}
            </span>
            <span className="text-[#00634B] dark:text-[#00FFC2] font-black text-sm">
              ✻
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
