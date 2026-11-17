import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StudioMarquee } from "@/components/StudioMarquee";
import { AboutSpec } from "@/components/AboutSpec";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsInventory } from "@/components/SkillsInventory";
import { ContactFooter } from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden transition-colors duration-300">
      {/* Floating Glass Island Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Studio Infinite Marquee Ticker (sweet-tape.com / nk.studio inspired) */}
      <StudioMarquee />

      {/* System Architecture & Engineering Benchmarks */}
      <AboutSpec />

      {/* Featured Production Projects with Interactive Sandboxes */}
      <ProjectsSection />

      {/* Industry Engineering Track Record */}
      <ExperienceSection />

      {/* Core Technical Stack & Ecosystem Matrix */}
      <SkillsInventory />

      {/* Contact & Dispatch Channel */}
      <ContactFooter />
    </main>
  );
}
