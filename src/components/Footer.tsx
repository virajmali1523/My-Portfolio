"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";

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


import Logo from "./Logo";


export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-12 px-4 md:px-12 bg-zinc-950 border-t border-white/5 overflow-hidden z-10">
      
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top half */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-white/5">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={scrollToTop}
            data-cursor-text="top"
            className="cursor-pointer"
          >
            <Logo showText={true} />
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-widest text-zinc-500">
            <button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">ABOUT</button>
            <button onClick={() => scrollToSection("tech")} className="hover:text-white transition-colors">TECH</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">WORK</button>
            <button onClick={() => scrollToSection("process")} className="hover:text-white transition-colors">PROCESS</button>
            <button onClick={() => scrollToSection("playground")} className="hover:text-white transition-colors">LAB</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white text-secondary transition-colors">HIRE</button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            data-cursor-text="go up"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-secondary transition-all cursor-pointer group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom half */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-zinc-500">
          <div>
            © 2026 VIRAJ PRAVIN MALI. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
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
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>

          <div>
            CRAFTED_WITH: NEXT.JS + THREE.JS
          </div>
        </div>

      </div>
    </footer>
  );
}
