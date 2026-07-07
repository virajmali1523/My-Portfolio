"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 38, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Logo Icon Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing neon radial glow behind the logo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-xl blur-md opacity-20 group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 scale-90" />
        
        {/* Outer glowing glass hexagon frame */}
        <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-zinc-950/80 border border-white/10 group-hover:border-secondary/40 backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          {/* Neon active corner lights */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-primary rounded-tl-sm opacity-60 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-accent rounded-br-sm opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* VM Monogram SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="p-1.5 transition-transform duration-500 group-hover:scale-105"
          >
            <defs>
              {/* Main glowing gradient */}
              <linearGradient id="vm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="50%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>

            {/* Letter 'V' */}
            <motion.path
              d="M20 32 L40 68 L48 52"
              stroke="url(#vm-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Letter 'M' */}
            <motion.path
              d="M48 68 L48 35 L62 58 L76 35 L76 68"
              stroke="url(#vm-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
        </div>
      </div>

      {/* Optional Logo Text */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className="font-mono text-xs md:text-sm font-black tracking-[0.25em] text-white group-hover:text-gradient transition-all duration-300">
            VIRAJ MALI
          </span>
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-zinc-500 group-hover:text-secondary transition-colors duration-300 mt-1">
            CREATIVE ENGINEER
          </span>
        </div>
      )}
    </div>
  );
}
