"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, Search, Paintbrush, Layers, Code2, 
  Terminal, ShieldCheck, HeartHandshake, ArrowRight 
} from "lucide-react";

interface ProcessStep {
  number: string;
  name: string;
  shortDesc: string;
  detailDesc: string;
  icon: React.ReactNode;
  color: string;
}

export default function DevProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      number: "01",
      name: "Discover",
      shortDesc: "Goal Alignment",
      detailDesc: "Align on client objectives, analyze core project requirements, sketch high-level scopes, and define target deliverables to establish a clear development roadmap.",
      icon: <Compass className="w-5 h-5" />,
      color: "#6C63FF" // Purple
    },
    {
      number: "02",
      name: "Research",
      shortDesc: "Data & Feasibility",
      detailDesc: "Study competitor landscapes, audit API structures, analyze technical feasibility of libraries, and formulate the overall technical system architecture.",
      icon: <Search className="w-5 h-5" />,
      color: "#00E5FF" // Cyan
    },
    {
      number: "03",
      name: "Design",
      shortDesc: "UI/UX Modeling",
      detailDesc: "Draft layouts, build Figma frame definitions, and configure color tokens and micro-interactions. Designing for premium look and smooth user flows.",
      icon: <Paintbrush className="w-5 h-5" />,
      color: "#00FFA3" // Accent Green
    },
    {
      number: "04",
      name: "Prototype",
      shortDesc: "Interactive Demos",
      detailDesc: "Construct high-fidelity code mockups in isolation. Verify responsiveness, transitions, and key interactions before writing core logic integrations.",
      icon: <Layers className="w-5 h-5" />,
      color: "#FF9E00" // Orange
    },
    {
      number: "05",
      name: "Develop",
      shortDesc: "Production Code",
      detailDesc: "Write clean, type-safe Next.js/TypeScript code. Structure modular component folders, build state structures, and integrate clean REST or GraphQL endpoints.",
      icon: <Code2 className="w-5 h-5" />,
      color: "#A78BFA" // Violet
    },
    {
      number: "06",
      name: "Test",
      shortDesc: "Quality Audits",
      detailDesc: "Conduct rigorous client-side performance reviews. Run ESLint checks, audit accessibility labels, verify page speeds, and trace mobile response profiles.",
      icon: <Terminal className="w-5 h-5" />,
      color: "#F43F5E" // Rose
    },
    {
      number: "07",
      name: "Deploy",
      shortDesc: "CI/CD & Live launch",
      detailDesc: "Deploy final bundles onto premium clouds like Vercel or Netlify. Configure automated Git-linked continuous integration pipelines, SSL rules, and DNS values.",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "#3B82F6" // Blue
    },
    {
      number: "08",
      name: "Maintain",
      shortDesc: "Logs & Scaling",
      detailDesc: "Track error logs, apply platform package upgrades, patch potential security holes, and optimize queries to ensure continuous scaling and client delight.",
      icon: <HeartHandshake className="w-5 h-5" />,
      color: "#10B981" // Emerald
    }
  ];

  return (
    <section id="process" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-hidden z-10">
      
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase block mb-3">
            07 / METHODOLOGY
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            DEVELOPMENT <span className="text-gradient">PROCESS FLOW</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Process Steps Map Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                data-cursor-text={step.name.toLowerCase()}
                className={`glass-card p-5 rounded-2xl border text-left flex flex-col justify-between aspect-square transition-all duration-300 relative group cursor-pointer ${
                  isActive 
                    ? "border-[rgba(255,255,255,0.2)] bg-white/5" 
                    : "border-white/5 hover:border-white/10"
                }`}
                style={{
                  boxShadow: isActive 
                    ? `0 0 20px ${step.color}25, inset 0 0 10px ${step.color}15` 
                    : "none"
                }}
              >
                {/* Step badge */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {step.number}
                  </span>
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${step.color}20` : "rgba(255, 255, 255, 0.03)",
                      color: isActive ? step.color : "#9CA3AF"
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step Title info */}
                <div>
                  <h3 className="font-black text-sm text-white uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                    {step.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-wider">
                    {step.shortDesc}
                  </p>
                </div>

                {/* active status dot */}
                {isActive && (
                  <span 
                    className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full" 
                    style={{ 
                      backgroundColor: step.color,
                      boxShadow: `0 0 6px ${step.color}` 
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Step Inspector HUD details panel */}
        <div className="glass-card p-8 rounded-3xl border border-white/5 relative min-h-[160px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full"
            >
              {/* Big step index */}
              <div className="md:col-span-2 flex items-center gap-4">
                <span 
                  className="text-5xl md:text-7xl font-black font-mono select-none"
                  style={{
                    color: `${steps[activeStep].color}`,
                    textShadow: `0 0 20px ${steps[activeStep].color}30`
                  }}
                >
                  {steps[activeStep].number}
                </span>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
              </div>

              {/* Title & description */}
              <div className="md:col-span-10">
                <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
                  {steps[activeStep].name} Stage : <span className="font-mono text-sm font-normal text-zinc-400">{steps[activeStep].shortDesc}</span>
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-4xl">
                  {steps[activeStep].detailDesc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
