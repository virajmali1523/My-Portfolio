"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, FileCode, CheckCircle2 } from "lucide-react";

interface JobDetails {
  filename: string;
  company: string;
  role: string;
  duration: string;
  lang: "typescript" | "java";
  tech: string[];
  lines: string[];
}

const experienceData: JobDetails[] = [
  {
    filename: "prudent_tech.ts",
    company: "Prudent Tech IT Solutions",
    role: "App Developer Intern",
    duration: "Aug 2025 - Present",
    lang: "typescript",
    tech: ["Ionic Framework", "Angular", "REST APIs", "TypeScript", "Agile", "Git"],
    lines: [
      "import { Intern, Project } from 'developer';",
      "",
      "// Active Work Experience Module",
      "export class PrudentTechIntern extends Intern {",
      "  readonly company = 'Prudent Tech IT Solutions';",
      "  readonly role = 'App Developer Intern';",
      "  readonly duration = 'August 2025 - Present';",
      "",
      "  getStack(): string[] {",
      "    return ['Ionic', 'Angular', 'REST APIs', 'TypeScript', 'Agile', 'Git'];",
      "  }",
      "",
      "  async getContributions(): Promise<string[]> {",
      "    return [",
      "      'Architecting cross-platform apps for iOS & Android with Ionic/Angular',",
      "      'Building and integration of secure, scalable production REST APIs',",
      "      'Managing client-side state models and debugging native device wrappers',",
      "      'Collaborating in an Agile sprint-based Git flow with regular reviews'",
      "    ];",
      "  }",
      "}"
    ]
  },
  {
    filename: "cyber_sanskar.java",
    company: "Cyber Sanskar, Nashik",
    role: "Software Engineering Intern",
    duration: "Jun 2023 - Jul 2023",
    lang: "java",
    tech: ["Android Studio", "HTML", "CSS", "JavaScript", "SDLC"],
    lines: [
      "package com.cybersanskar.internship;",
      "",
      "import com.android.studio.components.UI;",
      "import com.web.development.Frontend;",
      "",
      "public class CyberSanskarIntern {",
      "    private final String company = \"Cyber Sanskar\";",
      "    private final String role = \"Software Engineering Intern\";",
      "    private final String duration = \"June 2023 - July 2023\";",
      "",
      "    public void develop() {",
      "        // Built web client components",
      "        Frontend.buildUI(\"HTML\", \"CSS\", \"JavaScript\");",
      "",
      "        // Implemented Android View components",
      "        UI.createLayouts(\"Android Studio\", \"XML Mockups\");",
      "    }",
      "}"
    ]
  }
];

export default function Experience() {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const activeJob = experienceData[activeTabIdx];

  return (
    <section id="experience" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-hidden z-10">
      
      {/* Glow ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase block mb-3">
            05 / EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            WORK <span className="text-gradient">EXPERIENCE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary mt-4 rounded-full" />
        </div>

        {/* IDE Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sidebar / File Explorer */}
          <div className="lg:col-span-3 glass-card rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
            <div className="w-full">
              <div className="hidden lg:flex items-center gap-2 text-zinc-500 font-mono text-[10px] tracking-wider uppercase mb-6 pb-2 border-b border-white/5">
                <Folder className="w-3.5 h-3.5" />
                EXPLORER : WORKSPACE
              </div>

              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {experienceData.map((job, idx) => {
                  const isActive = activeTabIdx === idx;
                  const fileColor = job.lang === "typescript" ? "text-cyan-400" : "text-amber-500";

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTabIdx(idx)}
                      data-cursor-text="open file"
                      className={`flex-1 lg:w-full flex items-center justify-between gap-3 p-2.5 lg:p-3 rounded-lg font-mono text-xs text-left transition-all duration-300 min-w-[140px] lg:min-w-0 ${
                        isActive
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className={`w-4 h-4 shrink-0 ${fileColor}`} />
                        <span className="truncate">{job.filename}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar metadata footer */}
            <div className="hidden lg:block mt-8 pt-4 border-t border-white/5 font-mono text-[9px] text-zinc-600">
              <div>PROJECT: VIRAJ_MALI</div>
              <div>COMMIT: RECENT_WORK</div>
            </div>
          </div>

          {/* Code Viewer Panel (IDE Mockup) */}
          <div className="lg:col-span-9 glass-card rounded-2xl border border-white/5 flex flex-col overflow-hidden">
            {/* IDE tab header */}
            <div className="w-full bg-zinc-950/60 border-b border-white/5 flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="flex items-center gap-1.5 bg-[#030014] px-3.5 py-1.5 rounded-t-lg border-t border-x border-white/10 font-mono text-xs text-white">
                  <FileCode className={`w-3.5 h-3.5 ${
                    activeJob.lang === "typescript" ? "text-cyan-400" : "text-amber-500"
                  }`} />
                  {activeJob.filename}
                </div>
              </div>
              <Terminal className="w-4 h-4 text-zinc-500" />
            </div>

            {/* Editor body showing lines */}
            <div className="flex-1 p-4 sm:p-6 bg-zinc-950/40 font-mono text-[10px] sm:text-xs md:text-sm overflow-x-auto terminal-scrollbar relative min-h-[300px]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJob.company}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  {activeJob.lines.map((line, lineIdx) => {
                    // Primitive highlighting logic
                    let highlighted = line;
                    
                    // Comments
                    if (line.trim().startsWith("//")) {
                      highlighted = `<span class="text-zinc-600 font-sans italic">${line}</span>`;
                    }
                    // Keywords
                    else {
                      highlighted = line
                        .replace(/\b(import|from|export|class|readonly|async|await|return|public|class|private|final|void|new|package)\b/g, '<span class="text-pink-500 font-bold">$1</span>')
                        .replace(/\b(string|boolean|number|void|Promise)\b/g, '<span class="text-emerald-400">$1</span>')
                        .replace(/(['"].*?['"])/g, '<span class="text-yellow-400">$1</span>')
                        .replace(/\b(PrudentTechIntern|CyberSanskarIntern|Intern|Project|UI|Frontend)\b/g, '<span class="text-cyan-400">$1</span>');
                    }

                    return (
                      <div key={lineIdx} className="flex gap-3 items-start select-none">
                        <span className="w-4 text-zinc-700 text-right select-none text-[9px] sm:text-[11px]">
                          {lineIdx + 1}
                        </span>
                        <div 
                          className="text-zinc-300 leading-relaxed font-mono whitespace-pre"
                          dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }}
                        />
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Editor status bar */}
            <div className="w-full bg-[#030014] border-t border-white/5 px-4 py-2 flex justify-between items-center font-mono text-[10px] text-zinc-500">
              <div className="flex gap-4">
                <span>Ln {activeJob.lines.length}, Col 1</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{activeJob.company} // {activeJob.duration}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
