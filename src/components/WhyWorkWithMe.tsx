"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldCheck, Zap, Sliders, LayoutGrid, Database, Link } from "lucide-react";

interface ComparisonCard {
  title: string;
  traditional: {
    title: string;
    points: string[];
  };
  viraj: {
    title: string;
    points: string[];
  };
}

const comparisonData: Record<string, ComparisonCard> = {
  architecture: {
    title: "CODE ARCHITECTURE",
    traditional: {
      title: "Traditional Approach",
      points: [
        "Spaghetti structures, difficult to trace",
        "Weak typescript typing / heavy 'any' defaults",
        "Hard-coded API values, brittle logic",
        "Difficult to scale for enterprise needs"
      ]
    },
    viraj: {
      title: "My Standard",
      points: [
        "Strict modular architectures, clean patterns",
        "100% type safety with strict generics",
        "Decoupled state services, testable adapters",
        "Built-in DRY standards, ready for growth"
      ]
    }
  },
  fidelity: {
    title: "DESIGN & INTERACTION",
    traditional: {
      title: "Traditional Approach",
      points: [
        "Static template layouts, rigid elements",
        "Choppy default browser scroll behavior",
        "Lack of micro-interactions / hover alerts",
        "Simplistic UI feel with basic placeholders"
      ]
    },
    viraj: {
      title: "My Standard",
      points: [
        "Cinematic, immersive product storytelling",
        "Butter-smooth scroll (Lenis physics)",
        "Stunning hover spring-backed mouse indicators",
        "Custom high-tech 3D elements and canvas grids"
      ]
    }
  },
  performance: {
    title: "PERFORMANCE & UX",
    traditional: {
      title: "Traditional Approach",
      points: [
        "Unoptimized image loading, layout shifts",
        "Hydration bugs, slow server responses",
        "Choppy animation frame rates (under 30fps)",
        "Weak SEO/A11y ratings on Lighthouse audits"
      ]
    },
    viraj: {
      title: "My Standard",
      points: [
        "Next.js server-side optims, lazy bundle splits",
        "Fluid client components, zero hydration errors",
        "High-perf hardware-backed animations (60fps+)",
        "Lighthouse target metrics: 95+ performance"
      ]
    }
  },
  blockchain: {
    title: "BLOCKCHAIN & INNOVATION",
    traditional: {
      title: "Traditional Approach",
      points: [
        "Theoretical blockchain comprehension only",
        "No live smart contract network integrations",
        "Vague descriptions, lack of technical depth",
        "Unvalidated claims without peer reviews"
      ]
    },
    viraj: {
      title: "My Standard",
      points: [
        "Solana Web3 wallet ledger integrations",
        "Live QR merchant payment gateway deployments",
        "Deep technical grasp of transaction protocols",
        "Published co-authored research paper in IJSREM"
      ]
    }
  }
};

export default function WhyWorkWithMe() {
  const [activeCategory, setActiveCategory] = useState<string>("architecture");
  const data = comparisonData[activeCategory];

  const categories = [
    { id: "architecture", label: "Architecture", icon: <Sliders className="w-4 h-4" /> },
    { id: "fidelity", label: "Fidelity", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "performance", label: "Performance", icon: <Zap className="w-4 h-4" /> },
    { id: "blockchain", label: "Blockchain", icon: <Link className="w-4 h-4" /> }
  ];

  return (
    <section id="why-me" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950 overflow-hidden z-10">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase block mb-3">
              08 / COMPARISON
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              WHY WORK <span className="text-gradient">WITH ME?</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          </div>

          {/* Toggle buttons */}
          <div className="flex flex-wrap gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-cursor-text={cat.label.toLowerCase()}
                className={`px-4 py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Comparison Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          <AnimatePresence mode="wait">
            {/* Left Card: Traditional developers */}
            <motion.div
              key={`${activeCategory}-trad`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-3xl border border-red-500/10 hover:border-red-500/20 bg-red-500/0 hover:bg-red-500/[0.01] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-red-500/80 tracking-widest block mb-4 uppercase">
                  TRADITIONAL DEVELOPMENT //
                </span>
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">
                  {data.traditional.title}
                </h3>
                
                <ul className="space-y-4">
                  {data.traditional.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/5 pt-4 mt-8 font-mono text-[10px] text-zinc-600">
                STATUS: COMPROMISED
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Right Card: Viraj */}
            <motion.div
              key={`${activeCategory}-viraj`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 rounded-3xl border border-secondary/20 hover:border-secondary/40 bg-secondary/0 hover:bg-secondary/[0.02] flex flex-col justify-between shadow-[0_0_30px_rgba(0,229,255,0.05)]"
            >
              <div>
                <span className="font-mono text-[10px] text-secondary tracking-widest block mb-4 uppercase">
                  VIRAJ MALI'S STANDARD //
                </span>
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                  {data.viraj.title}
                  <ShieldCheck className="w-5 h-5 text-accent animate-pulse" />
                </h3>
                
                <ul className="space-y-4">
                  {data.viraj.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/5 pt-4 mt-8 flex justify-between items-center font-mono text-[10px] text-zinc-500">
                <span>STATUS: CERTIFIED OPTIMAL</span>
                <span className="text-accent">VM_ENGINE_ACTIVE</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
