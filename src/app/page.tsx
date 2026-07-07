"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Dynamically import ThreeBg to prevent SSR compilation errors with window/canvas
const ThreeBg = dynamic(() => import("@/components/ThreeBg"), { ssr: false });

import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import TechUniverse from "@/components/TechUniverse";
import FeaturedProjects from "@/components/FeaturedProjects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import DevProcess from "@/components/DevProcess";
import Achievements from "@/components/Achievements";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import InteractivePlayground from "@/components/InteractivePlayground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll-synced background vector transformations
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const backgroundRotationOpposite = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.15, 0.95]);
  const backgroundTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-x-clip">
      
      {/* 0. Glowing Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Scroll-Synced Vector Background Orbits */}
      <div className="fixed inset-0 pointer-events-none z-[1] select-none flex items-center justify-center overflow-hidden opacity-[0.03] md:opacity-[0.05]">
        {/* Outer Ring */}
        <motion.div 
          style={{ rotate: backgroundRotation, scale: backgroundScale }}
          className="absolute w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] rounded-full border border-dashed border-primary"
        />
        {/* Middle Ring */}
        <motion.div 
          style={{ rotate: backgroundRotationOpposite, scale: backgroundScale }}
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full border border-dotted border-secondary"
        />
        {/* Core Ring */}
        <motion.div 
          style={{ rotate: backgroundRotation, y: backgroundTranslateY }}
          className="absolute w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full border border-white/5"
        />
      </div>
      
      {/* 1. Preloader Overlay */}
      <Preloader onComplete={() => setIsPreloaderDone(true)} />

      {/* Dynamic hardware-accelerated 3D Background */}
      <ThreeBg />

      {/* Dynamic Animated Ambient Nebula Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] select-none min-h-full">
        <div className="absolute top-[10%] left-[-15%] w-[45vw] h-[45vw] min-w-[300px] rounded-full bg-blue-600/8 blur-[130px] animate-blob-1" />
        <div className="absolute top-[40%] right-[-15%] w-[50vw] h-[50vw] min-w-[350px] rounded-full bg-cyan-500/8 blur-[140px] animate-blob-2" />
        <div className="absolute bottom-[30%] left-[10%] w-[48vw] h-[48vw] min-w-[320px] rounded-full bg-emerald-600/5 blur-[130px] animate-blob-3" />
        <div className="absolute bottom-[5%] right-[10%] w-[45vw] h-[45vw] min-w-[300px] rounded-full bg-blue-500/5 blur-[120px] animate-blob-1" />
      </div>

      {/* 2. Custom Spring Cursor (active on desktops) */}
      <CustomCursor />

      {/* Smooth scroll wrapper utilizing Lenis physics */}
      <SmoothScroll>
        <div className={`relative transition-opacity duration-1000 ${
          isPreloaderDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          {/* 3. Hero cinematic experience */}
          <Hero isPreloaderDone={isPreloaderDone} />

          {/* 4. Storytelling About grid */}
          <About />

          {/* 5. Scroll-linked Journey timeline */}
          <Journey />

          {/* 6. Tech Universe system planets */}
          <TechUniverse />

          {/* 7. Mini landing page Featured Projects */}
          <FeaturedProjects />

          {/* 8. IDE-Console Work Experience */}
          <Experience />

          {/* 9. Academics and certificates */}
          <Education />

          {/* 10. Development Flow Stages */}
          <DevProcess />

          {/* 11. Honors & credentials */}
          <Achievements />

          {/* 12. Strategic Comparison Dashboard */}
          <WhyWorkWithMe />

          {/* 13. Terminal Developer Lab */}
          <InteractivePlayground />

          {/* 14. OS Contact Center & success celebration */}
          <Contact />

          {/* 15. Minimal Footer */}
          <Footer />
        </div>
      </SmoothScroll>

      {/* Floating Theme Customization Panel */}
      <ThemeSwitcher />
    </main>
  );
}
