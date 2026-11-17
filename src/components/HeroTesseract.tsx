"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroTesseract() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. 4D Hypercube (Tesseract) Geometry Math ---
    // 16 4D Vertices: (±1, ±1, ±1, ±1)
    const baseVertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      baseVertices4D.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1,
      ]);
    }

    // 32 4D Edges: Connect vertices differing in exactly 1 sign (Hamming distance 1)
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if ((diff & (diff - 1)) === 0) {
          edges.push([i, j]);
        }
      }
    }

    // --- 3. Three.js Meshes & Materials ---
    const isDarkInitial = document.documentElement.classList.contains("dark");
    const mintColorHex = isDarkInitial ? 0x00ffc2 : 0x00634b;
    const glowColorHex = isDarkInitial ? 0x20e7b7 : 0x004735;

    // Materials
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: mintColorHex,
      transparent: true,
      opacity: isDarkInitial ? 0.8 : 0.65,
      linewidth: 1.5,
    });

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: glowColorHex,
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: mintColorHex,
      wireframe: true,
      transparent: true,
      opacity: isDarkInitial ? 0.18 : 0.12,
    });

    // 3D Objects Group
    const tesseractGroup = new THREE.Group();
    scene.add(tesseractGroup);

    // Central pulsing geometric core (octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.45, 1);
    const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
    tesseractGroup.add(coreMesh);

    // 16 Vertex Node Spheres
    const nodeGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const nodeMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 16; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMaterial);
      tesseractGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // 32 Line Edges Buffer Geometry (32 edges * 2 points * 3 coords = 192 floats)
    const edgePositions = new Float32Array(edges.length * 2 * 3);
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(edgePositions, 3)
    );
    const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    tesseractGroup.add(edgeLines);

    // --- 4. Interactive Mouse Tilt & Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = y * 0.8;
      targetTiltY = x * 0.8;
    };

    const handleMouseLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // --- 5. 4D Rotation & Projection Animation Loop ---
    let angleXW = 0;
    let angleYZ = 0;
    let angleXZ = 0;
    let animFrameId: number;

    const projected3D: THREE.Vector3[] = Array.from(
      { length: 16 },
      () => new THREE.Vector3()
    );

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Advance 4D rotation angles
      angleXW += 0.012;
      angleYZ += 0.009;
      angleXZ += 0.006;

      const cosXW = Math.cos(angleXW);
      const sinXW = Math.sin(angleXW);

      const cosYZ = Math.cos(angleYZ);
      const sinYZ = Math.sin(angleYZ);

      const cosXZ = Math.cos(angleXZ);
      const sinXZ = Math.sin(angleXZ);

      const d = 2.4; // 4D camera projection distance

      // Project all 16 4D vertices into 3D
      for (let i = 0; i < 16; i++) {
        const [x0, y0, z0, w0] = baseVertices4D[i];

        // 1. Rotate in X-W plane
        const x1 = x0 * cosXW - w0 * sinXW;
        const w1 = x0 * sinXW + w0 * cosXW;

        // 2. Rotate in Y-Z plane
        const y2 = y0 * cosYZ - z0 * sinYZ;
        const z2 = y0 * sinYZ + z0 * cosYZ;

        // 3. Rotate in X-Z plane
        const x3 = x1 * cosXZ - z2 * sinXZ;
        const z3 = x1 * sinXZ + z2 * cosXZ;
        const y3 = y2;
        const w3 = w1;

        // 4. Perspective Projection 4D -> 3D
        const scale = 1.35 / (d - w3);
        const pX = x3 * scale;
        const pY = y3 * scale;
        const pZ = z3 * scale;

        projected3D[i].set(pX, pY, pZ);

        // Update vertex sphere position
        nodeMeshes[i].position.set(pX, pY, pZ);
      }

      // Update 32 edge line positions
      const posArray = edgeGeometry.attributes.position.array as Float32Array;
      let ptr = 0;
      for (let e = 0; e < edges.length; e++) {
        const p1 = projected3D[edges[e][0]];
        const p2 = projected3D[edges[e][1]];

        posArray[ptr++] = p1.x;
        posArray[ptr++] = p1.y;
        posArray[ptr++] = p1.z;

        posArray[ptr++] = p2.x;
        posArray[ptr++] = p2.y;
        posArray[ptr++] = p2.z;
      }
      edgeGeometry.attributes.position.needsUpdate = true;

      // Pulse central core
      coreMesh.rotation.x += 0.01;
      coreMesh.rotation.y += 0.015;
      const corePulse = 0.95 + Math.sin(angleXW * 2) * 0.12;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      // Smooth mouse tilt parallax
      mouseX += (targetTiltX - mouseX) * 0.05;
      mouseY += (targetTiltY - mouseY) * 0.05;
      tesseractGroup.rotation.x = mouseX;
      tesseractGroup.rotation.y = mouseY;

      // Real-time theme sync check
      const currentDark = document.documentElement.classList.contains("dark");
      const currentMintHex = currentDark ? 0x00ffc2 : 0x00634b;
      const currentGlowHex = currentDark ? 0x20e7b7 : 0x004735;

      if (edgeMaterial.color.getHex() !== currentMintHex) {
        edgeMaterial.color.setHex(currentMintHex);
        edgeMaterial.opacity = currentDark ? 0.8 : 0.65;
        nodeMaterial.color.setHex(currentGlowHex);
        coreMaterial.color.setHex(currentMintHex);
        coreMaterial.opacity = currentDark ? 0.18 : 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 6. Resize Handling with ResizeObserver ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 380;
      const newHeight = container.clientHeight || 340;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(handleResize);

    // --- 7. Cleanup ---
    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      nodeGeo.dispose();
      nodeMaterial.dispose();
      coreGeo.dispose();
      coreMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "340px" }}
      className="w-full max-w-[420px] h-[320px] sm:h-[350px] flex items-center justify-center relative select-none bg-transparent cursor-grab active:cursor-grabbing"
      aria-label="Interactive 4D Tesseract Animation"
    />
  );
}
