"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause } from "lucide-react";

export function ProjectVRMDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 250;

    const isDark = document.documentElement.classList.contains("dark");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Floor Grids for Dark and Light mode
    const darkGrid = new THREE.GridHelper(6, 12, 0x00ffc2, 0x1f1f1f);
    darkGrid.position.y = -1.8;
    darkGrid.visible = isDark;
    scene.add(darkGrid);

    const lightGrid = new THREE.GridHelper(6, 12, 0x00634b, 0xd4ccc0);
    lightGrid.position.y = -1.8;
    lightGrid.visible = !isDark;
    scene.add(lightGrid);

    // Avatar Rig Group
    const rigGroup = new THREE.Group();
    scene.add(rigGroup);

    // Materials
    const jointMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x00ffc2 : 0x00634b });
    const headMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x20e7b7 : 0x141414,
      roughness: 0.3,
      metalness: 0.2,
    });
    const boneMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x32b293 : 0x545454,
      linewidth: 2,
    });

    const jointGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const headGeo = new THREE.SphereGeometry(0.24, 24, 24);

    // Head
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(0, 1.2, 0);
    rigGroup.add(headMesh);

    // Keypoints Definition
    const joints: Record<string, THREE.Mesh> = {};
    const jointKeys = [
      "neck",
      "leftShoulder",
      "rightShoulder",
      "leftElbow",
      "rightElbow",
      "leftWrist",
      "rightWrist",
      "spine",
      "leftHip",
      "rightHip",
      "leftKnee",
      "rightKnee",
      "leftAnkle",
      "rightAnkle",
    ];

    jointKeys.forEach((key) => {
      const mesh = new THREE.Mesh(jointGeo, jointMat);
      rigGroup.add(mesh);
      joints[key] = mesh;
    });

    // Bone connections
    const bonePairs = [
      ["neck", "leftShoulder"],
      ["neck", "rightShoulder"],
      ["leftShoulder", "leftElbow"],
      ["leftElbow", "leftWrist"],
      ["rightShoulder", "rightElbow"],
      ["rightElbow", "rightWrist"],
      ["neck", "spine"],
      ["spine", "leftHip"],
      ["spine", "rightHip"],
      ["leftHip", "leftKnee"],
      ["leftKnee", "leftAnkle"],
      ["rightHip", "rightKnee"],
      ["rightKnee", "rightAnkle"],
    ];

    const boneLines: THREE.Line[] = [];
    bonePairs.forEach(() => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const line = new THREE.Line(geo, boneMat);
      rigGroup.add(line);
      boneLines.push(line);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(isDark ? 0xa9cdbe : 0x0b1325, 1.8);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (isPlayingRef.current) {
        time += 0.04;
      }

      const neckY = 0.9;
      const spineY = 0.2;
      const hipY = -0.1;

      joints.neck.position.set(0, neckY, 0);
      joints.spine.position.set(0, spineY, 0);
      headMesh.position.set(0, neckY + 0.35 + Math.sin(time * 1.5) * 0.02, 0);

      // Shoulders
      joints.leftShoulder.position.set(-0.55, neckY - 0.05, 0);
      joints.rightShoulder.position.set(0.55, neckY - 0.05, 0);

      // Left Arm
      const leftElbowX = -0.9 + Math.sin(time * 2) * 0.15;
      const leftElbowY = neckY - 0.35 + Math.cos(time * 2) * 0.2;
      joints.leftElbow.position.set(leftElbowX, leftElbowY, 0.1);
      joints.leftWrist.position.set(
        leftElbowX - 0.3 + Math.sin(time * 2.5) * 0.2,
        leftElbowY + 0.35 + Math.cos(time * 2.5) * 0.25,
        0.2
      );

      // Right Arm
      joints.rightElbow.position.set(0.85, neckY - 0.45, -0.05);
      joints.rightWrist.position.set(0.95, neckY - 0.85 + Math.sin(time) * 0.08, 0);

      // Hips
      joints.leftHip.position.set(-0.35, hipY, 0);
      joints.rightHip.position.set(0.35, hipY, 0);

      // Legs
      joints.leftKnee.position.set(-0.38, -0.9 + Math.sin(time * 1.2) * 0.04, 0);
      joints.rightKnee.position.set(0.38, -0.9 - Math.sin(time * 1.2) * 0.04, 0);
      joints.leftAnkle.position.set(-0.4, -1.6, 0);
      joints.rightAnkle.position.set(0.4, -1.6, 0);

      // Update bones
      bonePairs.forEach((pair, idx) => {
        const j1 = joints[pair[0]].position;
        const j2 = joints[pair[1]].position;
        const positions = new Float32Array([j1.x, j1.y, j1.z, j2.x, j2.y, j2.z]);
        boneLines[idx].geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
      });

      // Dynamically verify materials and floor grids match active theme every frame
      const currentDark = document.documentElement.classList.contains("dark");
      darkGrid.visible = currentDark;
      lightGrid.visible = !currentDark;

      const targetJointColor = currentDark ? 0x00ffc2 : 0x00634b;
      if (jointMat.color.getHex() !== targetJointColor) {
        jointMat.color.setHex(targetJointColor);
        headMat.color.setHex(currentDark ? 0x20e7b7 : 0x141414);
        boneMat.color.setHex(currentDark ? 0x32b293 : 0x545454);
      }

      rigGroup.rotation.y = Math.sin(time * 0.5) * 0.35;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 250;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    // Initial frame resize
    requestAnimationFrame(handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      jointGeo.dispose();
      headGeo.dispose();
      jointMat.dispose();
      headMat.dispose();
      boneMat.dispose();
      darkGrid.geometry.dispose();
      lightGrid.geometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="rounded-3xl bg-[#EAE3D5] dark:bg-[#141414] border border-neutral-300/80 dark:border-neutral-800 p-5 font-mono text-xs shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-300 dark:border-neutral-800">
        <span className="text-[11px] text-neutral-800 dark:text-[#00FFC2] font-bold">
          / vrm-kinematics — Three.js Pose Solver
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-[#00FFC2]/15 hover:bg-black/10 dark:hover:bg-[#00FFC2]/25 text-neutral-800 dark:text-[#00FFC2] text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <span className="text-[10px] text-neutral-900 dark:text-[#00FFC2] font-bold bg-black/5 dark:bg-[#00FFC2]/15 px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-[#00FFC2]/30">
            25 FPS
          </span>
        </div>
      </div>

      {/* 3D Canvas - Full Width Stage */}
      <div className="my-3.5">
        <div
          ref={containerRef}
          style={{ width: "100%", height: "240px" }}
          className="w-full h-[240px] rounded-2xl bg-[#F6F1EA] dark:bg-[#0A0A0A] border border-neutral-300/80 dark:border-neutral-800/80 overflow-hidden relative shadow-inner"
        />
      </div>

      {/* Pipeline Specs - Clean Full-Width Row Alignment (No '/' prefix) */}
      <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-neutral-300/70 dark:border-neutral-800 divide-y divide-neutral-200/80 dark:divide-neutral-800/80 px-4 sm:px-5 shadow-xs">
        {/* Row 1: Landmarks */}
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            LANDMARKS
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-[#00FFC2]">
            33 MediaPipe Points
          </span>
        </div>

        {/* Row 2: IK Solver */}
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            IK SOLVER
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-[#00FFC2]">
            Kalidokit Rotations
          </span>
        </div>

        {/* Row 3: Output */}
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
            OUTPUT
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-[#00FFC2]">
            Video-to-JSON (25 FPS)
          </span>
        </div>
      </div>

      {/* Pipeline Description */}
      <div className="mt-3 p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-neutral-200/80 dark:border-neutral-800/60 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
        Real-time skeletal coordinate capture with temporal smoothing to eliminate high-frequency jitter, driving rigged 3D VRM skeletal bones via Three.js.
      </div>
    </div>
  );
}
