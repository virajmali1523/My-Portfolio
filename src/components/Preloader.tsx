"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const words = ["CREATIVE", "MINIMAL", "EXPERIENCE", "ARCHITECTURE", "VIRAJ PRAVIN MALI"];

  useEffect(() => {
    // Disable scrolling when preloader is mounting
    document.body.classList.add("no-scroll");

    // Fast loading simulation with variable speed for natural feeling
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2;
      current = Math.min(current + increment, 100);
      setProgress(current);

      // Transition loading words
      const wordProgressIndex = Math.min(
        Math.floor((current / 100) * words.length),
        words.length - 1
      );
      setActiveWordIndex(wordProgressIndex);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            document.body.classList.remove("no-scroll");
            onComplete();
          }, 800); // Wait for slide-up animation
        }, 600); // Read time at 100%
      }
    }, 80);

    return () => {
      clearInterval(interval);
      document.body.classList.remove("no-scroll");
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-[#030014] text-white select-none noise-overlay"
        >
          {/* Header info */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-zinc-500">
            <div>SYSTEM: ONLINE</div>
            <div>VER: 2026.07</div>
          </div>

          {/* Core branding word */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeWordIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black tracking-widest text-center"
                  style={{
                    textShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
                  }}
                >
                  {words[activeWordIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            {/* Subtle glow orb */}
            <div className="w-64 h-64 absolute bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
          </div>

          {/* Bottom stats and progress */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">PORTFOLIO LOADING</span>
                <span className="text-sm font-mono text-secondary tracking-widest">
                  INITIALIZING MODULES...
                </span>
              </div>
              <div className="text-4xl md:text-6xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                {progress}%
              </div>
            </div>

            {/* Progress line */}
            <div className="w-full h-[2px] bg-zinc-900 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
