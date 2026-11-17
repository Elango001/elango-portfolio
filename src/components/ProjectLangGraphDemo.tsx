"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, RefreshCw } from "lucide-react";

export function ProjectLangGraphDemo() {
  const steps = [
    {
      id: "ingest",
      name: "Ingestion Agent",
      agent: "DatasetIngestionNode",
      output: "Streaming 12,450 records. Schema validated: 18 features (14 numerical, 4 categorical).",
    },
    {
      id: "clean",
      name: "Data Cleaning",
      agent: "PreprocessingNode",
      output: "Imputed 34 missing records using iterative MICE. Outlier truncation applied.",
    },
    {
      id: "analyze",
      name: "Statistical Graph",
      agent: "StatisticalProfiler",
      output: "Spearman rank matrix computed. Top 3 predictive feature interactions identified.",
    },
    {
      id: "sandbox",
      name: "Code Sandbox",
      agent: "PythonREPLNode",
      output: "Executed isolated Python runtime. Generated Seaborn distributions & regression curves.",
    },
    {
      id: "synthesize",
      name: "Synthesis",
      agent: "MultiLLM (Gemini/GPT-4)",
      output: "Synthesized executive briefing and exported dynamic markdown + chart payload.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 650);
  };

  return (
    <div className="rounded-3xl bg-[#EAE3D5] dark:bg-[#141414] border border-neutral-300/80 dark:border-neutral-800 p-5 font-mono text-xs shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300 dark:border-neutral-800">
        <span className="text-[11px] text-neutral-800 dark:text-[#00FFC2] font-bold">
          / langgraph-workflow — stateful graph loop
        </span>
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white dark:bg-[#00FFC2] dark:hover:bg-[#20E7B7] dark:text-neutral-950 font-bold text-[11px] uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-xs"
        >
          {isRunning ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 fill-current" />
          )}
          <span>{isRunning ? "Running..." : "Execute Graph"}</span>
        </button>
      </div>

      {/* Nodes Bar */}
      <div className="grid grid-cols-5 gap-1.5 my-3.5">
        {steps.map((st, i) => (
          <button
            key={st.id}
            onClick={() => setActiveStep(i)}
            className={`p-2 rounded-xl text-left transition-all border ${
              activeStep === i
                ? "bg-black/10 dark:bg-[#00FFC2]/15 border-neutral-900 dark:border-[#00FFC2] text-neutral-900 dark:text-[#00FFC2] shadow-xs font-bold"
                : i < activeStep
                ? "bg-emerald-500/10 border-emerald-600/30 text-emerald-800 dark:text-emerald-400"
                : "bg-black/5 dark:bg-white/5 border-neutral-300/60 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span>0{i + 1}</span>
              {i < activeStep ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
              ) : null}
            </div>
            <div className="truncate text-[10px] font-semibold mt-1">
              {st.name}
            </div>
          </button>
        ))}
      </div>

      {/* Active Output Console */}
      <div className="p-3.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.03] border border-neutral-300/80 dark:border-neutral-800 space-y-2">
        <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
          <span>ACTIVE NODE: <strong className="text-neutral-900 dark:text-[#00FFC2]">{steps[activeStep].agent}</strong></span>
          <span className="text-neutral-900 dark:text-[#00FFC2] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FFC2] animate-pulse" />
            STATE: EXECUTING
          </span>
        </div>
        <div className="text-neutral-800 dark:text-[#EDEDED] text-xs font-mono bg-black/5 dark:bg-white/[0.03] p-3 rounded-xl border border-neutral-300/60 dark:border-neutral-800/80 leading-relaxed">
          <span className="text-neutral-900 dark:text-[#00FFC2] font-bold mr-2">$</span>
          {steps[activeStep].output}
        </div>
      </div>
    </div>
  );
}
