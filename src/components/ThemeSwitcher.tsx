"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";

interface ThemePreset {
  name: string;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
}

const themes: ThemePreset[] = [
  {
    name: "cobalt",
    label: "Cobalt Tech",
    primary: "#3B82F6",
    secondary: "#06B6D4",
    accent: "#10B981",
  },
  {
    name: "cyberpunk",
    label: "Cyber Neon",
    primary: "#D946EF",
    secondary: "#8B5CF6",
    accent: "#F43F5E",
  },
  {
    name: "sunset",
    label: "Sunset Gold",
    primary: "#F97316",
    secondary: "#EAB308",
    accent: "#EF4444",
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("cobalt");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      const match = themes.find((t) => t.name === saved);
      if (match) {
        applyTheme(match);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const applyTheme = (theme: ThemePreset, shouldClose = false) => {
    setActiveTheme(theme.name);
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--accent", theme.accent);
    localStorage.setItem("portfolio-theme", theme.name);
    if (shouldClose) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="p-3 rounded-2xl glass-card border border-white/10 bg-zinc-950/90 shadow-2xl flex flex-col gap-2.5 min-w-[140px]"
          >
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest px-1">
              Select Theme
            </span>
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => applyTheme(t, true)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTheme === t.name
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Small color dots preview */}
                  <div className="flex gap-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: t.secondary }}
                    />
                  </div>
                  <span>{t.label}</span>
                </div>
                {activeTheme === t.name && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg shadow-primary/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10 relative group"
        data-cursor-text="theme palette"
      >
        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
}
