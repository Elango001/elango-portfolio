"use client";

import React from "react";
import { Server, Cpu, CheckCircle2 } from "lucide-react";

export function AboutSpec() {
  const coreMetrics = [
    {
      value: "0.98",
      label: "R² ML ACCURACY",
      sub: "Infosys Springboard FWI Pipeline",
      metricDetail: "MAE: 0.63 • RMSE: 0.99",
      accent: "text-neutral-900 dark:text-[#00FFC2]",
    },
    {
      value: "91%",
      label: "CIFAR-10 ACCURACY",
      sub: "Explainable PyTorch Polar Classifier",
      metricDetail: "Angular Loss • OOD Detection",
      accent: "text-neutral-900 dark:text-[#00FFC2]",
    },
    {
      value: "25 FPS",
      label: "REAL-TIME KINEMATICS",
      sub: "Three.js MediaPipe VRM Pipeline",
      metricDetail: "33 Joint Keypoints • IK Solver",
      accent: "text-neutral-900 dark:text-[#00FFC2]",
    },
  ];

  return (
    <section id="architecture" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-600 dark:text-[#00FFC2] mb-3">
            <span>/</span>
            <span className="font-semibold">The difference engineering makes where it matters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            SYSTEM BENCHMARKS
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed font-normal">
            Proven backend service engineering, production model serialization, and stateful agent loop orchestration.
          </p>
        </div>

        {/* 3 Perfectly Aligned Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-10 items-stretch">
          {coreMetrics.map((item, idx) => (
            <div
              key={idx}
              className="macos-window p-7 rounded-3xl flex flex-col justify-between group h-full hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-3">
                  <span>/ 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-[#00FFC2]" />
                </div>
                <div className={`text-4xl sm:text-5xl font-black tracking-tight mb-2 ${item.accent}`}>
                  {item.value}
                </div>
                <div className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider mb-1 min-h-[18px]">
                  {item.label}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed min-h-[36px] flex items-center">
                  {item.sub}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-800 dark:text-[#00FFC2] font-semibold min-h-[24px] flex items-center">
                {item.metricDetail}
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Pillars Breakdown - Balanced Equal Height Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Backend & Services */}
          <div className="lg:col-span-7 macos-window rounded-3xl p-7 sm:p-9 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-[#00FFC2] mb-3 uppercase tracking-wider font-semibold">
                <Server className="w-4 h-4" />
                <span>/ DISTRIBUTED BACKEND ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3">
                High-Reliability REST Services & Data Modeling
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed min-h-[72px]">
                High-performance backend services built with FastAPI and Flask. Designed schemas pairing MySQL for relational ACID guarantees with MongoDB for flexible document collections. Hardened with JWT auth and sub-100ms latency.
              </p>

              {/* Two Balanced Internal Sub-Boxes */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono items-stretch">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-neutral-900 dark:text-[#00FFC2] font-bold block mb-1">
                      FastAPI & Flask APIs
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 leading-relaxed block">
                      Asynchronous request loops, dependency injection, and sub-100ms response targets.
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-neutral-900 dark:text-[#00FFC2] font-bold block mb-1">
                      MySQL & MongoDB Tier
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 leading-relaxed block">
                      Relational transactional ACID indexing paired with flexible document aggregation.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>LOCATION: Salem, Tamil Nadu</span>
              <span className="font-bold text-neutral-900 dark:text-[#00FFC2]">SPECIALIZATION: AI & BACKEND</span>
            </div>
          </div>

          {/* Right Column: AI & Multi-Agent */}
          <div className="lg:col-span-5 macos-window rounded-3xl p-7 sm:p-9 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-[#00FFC2] mb-3 uppercase tracking-wider font-semibold">
                <Cpu className="w-4 h-4" />
                <span>/ AI & MULTI-AGENT SYSTEMS</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-3">
                Stateful Orchestration & Deep Learning
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed min-h-[72px]">
                Autonomous multi-agent execution graphs engineered with LangGraph and PyTorch. Implementing stateful reasoning loops, sandboxed code execution, explainable AI polar projections, and real-time WebGL kinematics.
              </p>

              {/* Three Balanced Specs */}
              <div className="mt-7 space-y-2.5 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">LangGraph Agent Graphs</span>
                  <span className="text-neutral-900 dark:text-[#00FFC2] font-bold">Multi-Provider</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">Custom PyTorch Architecture</span>
                  <span className="text-neutral-900 dark:text-[#00FFC2] font-bold">XAI Polar (r, θ)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">Kinematics & WebGL</span>
                  <span className="text-neutral-900 dark:text-[#00FFC2] font-bold">Three.js 25 FPS</span>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-[#00FFC2] font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full-Stack & Backend Systems Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
