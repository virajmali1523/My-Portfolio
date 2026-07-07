"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Mail, FileText, ArrowDown, Sparkles, Menu, X } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Hero({ isPreloaderDone }: { isPreloaderDone: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roles = [
    "Frontend Engineer",
    "React Native Developer",
    "Angular Developer",
    "Mobile App Engineer",
    "Blockchain Enthusiast",
    "UI/UX Focused Engineer",
  ];

  // Rotate roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Scroll animations for 3D layout explosion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to transform values
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Split name for animation
  const nameRows = [
    { text: "HELLO.", color: "text-white" },
    { text: "I'M", color: "text-zinc-400" },
    { text: "VIRAJ", color: "text-gradient" },
    //{ text: "PRAVIN", color: "text-gradient-purple-blue" },
    //{ text: "MALI", color: "text-gradient-cyan-green" },
  ];

  const letterVariants = {
    initial: { y: 100, opacity: 0, rotateX: -60 },
    animate: { y: 0, opacity: 1, rotateX: 0 },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-center py-16 px-4 md:px-12 overflow-hidden z-10"
    >
      {/* Cinematic Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />

      {/* Aurora gradients inside Hero */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[130px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "2s" }} />

      {/* Top Navbar items */}
      <div className="w-full max-w-7xl flex justify-between items-center z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isPreloaderDone ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#00FFA3]" />
          <span className="font-mono text-sm font-black tracking-widest text-white hover:text-accent transition-colors">
            VIRAJ MALI
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isPreloaderDone ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="hidden sm:flex items-center gap-6 font-mono text-[11px] tracking-widest text-zinc-400"
        >
          <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">ABOUT</button>
          <button onClick={() => scrollToSection("tech")} className="hover:text-white transition-colors">TECH</button>
          <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">WORK</button>
          <button onClick={() => scrollToSection("process")} className="hover:text-white transition-colors">PROCESS</button>
          <button onClick={() => scrollToSection("playground")} className="hover:text-white transition-colors">LAB</button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-3 py-1 rounded-full border border-secondary/30 text-secondary hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
          >
            HIRE ME
          </button>
        </motion.div>

        {/* Hamburger Menu Icon (visible on mobile only) */}
        <div className="sm:hidden flex items-center z-30">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-accent transition-colors p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-4 right-4 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5 z-40 sm:hidden shadow-2xl"
          >
            <button 
              onClick={() => {
                scrollToSection("about");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left font-mono text-xs tracking-widest text-zinc-300 hover:text-white transition-colors"
            >
              // ABOUT
            </button>
            <button 
              onClick={() => {
                scrollToSection("tech");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left font-mono text-xs tracking-widest text-zinc-300 hover:text-white transition-colors"
            >
              // TECH
            </button>
            <button 
              onClick={() => {
                scrollToSection("projects");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left font-mono text-xs tracking-widest text-zinc-300 hover:text-white transition-colors"
            >
              // WORK
            </button>
            <button 
              onClick={() => {
                scrollToSection("process");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left font-mono text-xs tracking-widest text-zinc-300 hover:text-white transition-colors"
            >
              // PROCESS
            </button>
            <button 
              onClick={() => {
                scrollToSection("playground");
                setIsMobileMenuOpen(false);
              }} 
              className="text-left font-mono text-xs tracking-widest text-zinc-300 hover:text-white transition-colors"
            >
              // LAB
            </button>
            <button 
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }} 
              className="w-full py-2.5 mt-2 rounded-xl border border-secondary/40 text-secondary font-mono text-[10px] text-center hover:bg-secondary/10 transition-colors uppercase tracking-widest"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main typography block */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={isPreloaderDone ? "animate" : "initial"}
        style={{ y: yText, opacity: opacityText, scale: scaleText, perspective: 1000 }}
        className="flex flex-col items-center justify-center flex-1 text-center select-none py-12"
      >
        <div className="flex flex-col gap-1 md:gap-3">
          {nameRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="overflow-hidden py-1"
              style={{ perspective: "1000px" }}
            >
              <div className="flex justify-center gap-x-[0.05em]">
                {row.text.split("").map((letter, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.15,
                      color: "#06B6D4",
                      transition: { type: "spring", stiffness: 450, damping: 8 }
                    }}
                    className={`inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight ${row.color}`}
                    style={{
                      transformOrigin: "bottom center",
                      display: "inline-block",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rotating subtitle */}
        <div className="h-10 mt-8 flex flex-col justify-center items-center font-mono text-zinc-400 text-sm md:text-lg overflow-hidden max-w-md w-full relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="uppercase tracking-[0.25em] text-zinc-500 text-xs">Architecting Experiences</span>
          </div>
          <div className="relative h-6 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute text-white font-semibold tracking-wider"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 z-20">
          <motion.button
            onClick={() => scrollToSection("projects")}
            data-cursor-text="view work"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-[0_4px_20px_rgba(59,130,246,0.3)] flex items-center gap-2 group cursor-pointer"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("contact")}
            data-cursor-text="say hello"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-300 text-white font-medium bg-white/5 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            Let's Build Together
          </motion.button>

          <motion.a
            href="/Viraj_Mali_Resume.docx"
            download="Viraj_Mali_Resume.docx"
            data-cursor-text="get pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 font-mono text-xs flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-secondary" />
            RESUME.DOCX
          </motion.a>
        </div>
      </motion.div>

      {/* Footer floating bar (socials and scroll indicator) */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 z-20 border-t border-zinc-900 pt-6 mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isPreloaderDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-6"
        >
          <a
            href="https://github.com/virajmali1523"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="github"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:virajmali2006@gmail.com"
            data-cursor-text="email"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isPreloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          onClick={() => scrollToSection("about")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-[10px] tracking-[0.2em] cursor-pointer group"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
