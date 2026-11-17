"use client";

import React, { useState, useEffect, useRef } from "react";

export function ProjectPolarDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [oodThreshold, setOodThreshold] = useState(0.85);
  const [highlightClass, setHighlightClass] = useState<number | null>(null);

  const classes = [
    { name: "Airplane", color: "#0A0A0A", darkColor: "#00FFC2", angle: 0 },
    { name: "Automobile", color: "#141414", darkColor: "#20E7B7", angle: 36 },
    { name: "Bird", color: "#00634B", darkColor: "#32B293", angle: 72 },
    { name: "Cat", color: "#b45309", darkColor: "#fbbf24", angle: 108 },
    { name: "Deer", color: "#15803d", darkColor: "#4ade80", angle: 144 },
    { name: "Dog", color: "#70aa97", darkColor: "#70aa97", angle: 180 },
    { name: "Frog", color: "#0e7490", darkColor: "#38bdf8", angle: 216 },
    { name: "Horse", color: "#e61e66", darkColor: "#f472b6", angle: 252 },
    { name: "Ship", color: "#1d4ed8", darkColor: "#818cf8", angle: 288 },
    { name: "Truck", color: "#c2410c", darkColor: "#fb923c", angle: 324 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxRadius = Math.min(cx, cy) - 20;

      // Draw background polar rings
      ctx.strokeStyle = isDark ? "rgba(0, 255, 194, 0.12)" : "rgba(10, 10, 10, 0.12)";
      ctx.lineWidth = 1;
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw OOD Boundary Circle
      ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * oodThreshold, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw radial axis rays
      classes.forEach((cls) => {
        const rad = (cls.angle * Math.PI) / 180;
        ctx.strokeStyle = isDark ? "rgba(0, 255, 194, 0.08)" : "rgba(10, 10, 10, 0.08)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * maxRadius, cy + Math.sin(rad) * maxRadius);
        ctx.stroke();
      });

      // Draw simulated latent clusters
      classes.forEach((cls, idx) => {
        const baseAngle = (cls.angle * Math.PI) / 180;
        const isHighlighted = highlightClass === null || highlightClass === idx;
        const clusterRadius = maxRadius * 0.58;

        for (let p = 0; p < 8; p++) {
          const pseudoRandom = Math.sin(idx * 99 + p * 13) * 0.5 + 0.5;
          const pseudoAngleOffset = (Math.cos(p * 27 + idx) * 0.18) + (Math.sin(time + p) * 0.03);
          const pseudoRadialOffset = (Math.sin(p * 41 + idx) * 0.15) + (Math.cos(time + idx) * 0.02);

          const curAngle = baseAngle + pseudoAngleOffset;
          const curRadius = Math.min(maxRadius * 0.95, Math.max(20, clusterRadius * (0.8 + pseudoRadialOffset)));

          const px = cx + Math.cos(curAngle) * curRadius;
          const py = cy + Math.sin(curAngle) * curRadius;

          const isOOD = curRadius / maxRadius > oodThreshold;

          ctx.fillStyle = isOOD
            ? "rgba(239, 68, 68, 0.9)"
            : isHighlighted
            ? (isDark ? cls.darkColor : cls.color)
            : (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(10, 10, 10, 0.15)");

          ctx.beginPath();
          ctx.arc(px, py, isHighlighted ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Class Centroid Marker
        const centroidX = cx + Math.cos(baseAngle) * clusterRadius;
        const centroidY = cy + Math.sin(baseAngle) * clusterRadius;

        ctx.strokeStyle = isDark ? cls.darkColor : cls.color;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(centroidX, centroidY, 5, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [oodThreshold, highlightClass]);

  return (
    <div className="rounded-3xl bg-[#EAE3D5] dark:bg-[#141414] border border-neutral-300/80 dark:border-neutral-800 p-5 font-mono text-xs shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300 dark:border-neutral-800">
        <span className="text-[11px] text-neutral-800 dark:text-[#00FFC2] font-bold">
          / polar-projection — 2D XAI Latent Space
        </span>
        <span className="text-[10px] text-neutral-900 dark:text-[#00FFC2] font-bold bg-black/5 dark:bg-[#00FFC2]/15 px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-[#00FFC2]/30">
          91% CIFAR-10
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-3.5">
        {/* Canvas */}
        <div className="md:col-span-7 flex justify-center">
          <canvas
            ref={canvasRef}
            width={260}
            height={260}
            className="w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] rounded-full bg-[#F6F1EA] dark:bg-[#0A0A0A] border border-neutral-300 dark:border-neutral-800 shadow-inner"
          />
        </div>

        {/* Legend & Controls */}
        <div className="md:col-span-5 space-y-3">
          <div>
            <div className="flex items-center justify-between text-[10px] text-neutral-600 dark:text-neutral-400 mb-1.5 font-bold">
              <span>OOD THRESHOLD:</span>
              <span className="text-red-500 font-bold">{Math.round(oodThreshold * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.01"
              value={oodThreshold}
              onChange={(e) => setOodThreshold(parseFloat(e.target.value))}
              className="w-full accent-neutral-900 dark:accent-[#00FFC2] bg-neutral-300 dark:bg-neutral-800 h-1.5 rounded-full cursor-pointer"
            />
          </div>

          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 space-y-1">
            <span className="font-bold text-neutral-900 dark:text-white block uppercase tracking-wider">CENTROIDS:</span>
            <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto pr-1">
              {classes.slice(0, 8).map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() =>
                    setHighlightClass(highlightClass === idx ? null : idx)
                  }
                  className={`px-2 py-0.5 rounded-lg text-left truncate transition-colors cursor-pointer font-medium ${
                    highlightClass === idx
                      ? "bg-black/10 dark:bg-[#00FFC2]/20 text-neutral-950 dark:text-[#00FFC2] font-bold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: c.darkColor }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.03] border border-neutral-300/80 dark:border-neutral-800 text-[11px] text-neutral-800 dark:text-neutral-300 leading-relaxed shadow-2xs">
            <span className="font-bold text-neutral-900 dark:text-[#00FFC2]">XAI FORMULATION: </span>
            Angular separation enforces distinct semantic clusters. Outliers exceeding radial threshold are flagged as OOD anomalies.
          </div>
        </div>
      </div>
    </div>
  );
}
