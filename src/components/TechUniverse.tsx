"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Orbit, ShieldCheck, Zap, Sparkles, 
  Atom, Cpu, Layers, FileCode2
} from "lucide-react";

interface SkillPlanet {
  name: string;
  level: "Master" | "Expert" | "Intermediate";
  description: string;
}

interface TechCategory {
  title: string;
  themeColor: string; // Hex for glow
  badgeBg: string;
  planets: SkillPlanet[];
}

const techUniverseData: TechCategory[] = [
  {
    title: "Frontend",
    themeColor: "#00F0FF", // Cyan
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    planets: [
      { name: "React", level: "Expert", description: "Modern React 19, hooks, context, custom routers, performance optimizations." },
      { name: "Angular", level: "Expert", description: "Reactive extensions (RxJS), modules, lifecycle architecture, components." },
      { name: "TypeScript", level: "Expert", description: "Strict typing, generics, utility types, and interfaces." },
      { name: "JavaScript", level: "Master", description: "Core ES6+, closures, prototype, asynchronous events, DOM API." },
      { name: "HTML", level: "Master", description: "Semantic markup, SEO optimization, and accessibility (ARIA)." },
      { name: "CSS", level: "Master", description: "Tailwind CSS, custom themes, responsive grids, flexbox, and transitions." },
      { name: "SCSS", level: "Expert", description: "Variables, mixins, nesting architectures, modular scaling." },
    ],
  },
  {
    title: "Mobile",
    themeColor: "#FF007A", // Pink
    badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    planets: [
      { name: "React Native", level: "Expert", description: "Native components, bridges, hooks, performance profiling, responsive app design." },
      { name: "Ionic", level: "Expert", description: "Cross-platform mobile apps with Angular, web views, Capacitor plugins, Android/iOS." },
      { name: "Android", level: "Intermediate", description: "Android Studio workspace, basic Java/Kotlin UI modules, and Gradle builds." },
    ],
  },
  {
    title: "Blockchain",
    themeColor: "#8F43FF", // Purple
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    planets: [
      { name: "Solana", level: "Expert", description: "SPL token integrations, decentralized merchant flows, transaction configurations." },
      { name: "Web3.js", level: "Expert", description: "Connecting frontends to Solana cluster, wallet providers, transaction signing." },
    ],
  },
  {
    title: "Backend & DB",
    themeColor: "#3B82F6", // Blue
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    planets: [
      { name: "Node.js", level: "Expert", description: "Asynchronous backend runtimes, Express server routing, microservices." },
      { name: "REST API", level: "Expert", description: "Secure, scalable endpoints, payload optimization, status conventions." },
      { name: "Firebase", level: "Expert", description: "Firestore real-time listeners, client-side OAuth, secure storage rules." },
      { name: "MongoDB", level: "Intermediate", description: "NoSQL collection schemas, aggregations, database queries." },
      { name: "MySQL / PHP", level: "Intermediate", description: "Relational data structures, basic PHP backend scripts, SQL queries." },
    ],
  },
  {
    title: "Tools & OS",
    themeColor: "#F59E0B", // Amber
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    planets: [
      { name: "Git & GitHub", level: "Expert", description: "Branching protocols, pull request code audits, commit conventions, version histories." },
      { name: "VS Code", level: "Master", description: "Core IDE customization, debugger configs, keymaps, terminal workflows." },
      { name: "Android Studio", level: "Expert", description: "AVD management, Logcat debugging, build compilation, asset imports." },
      { name: "Xcode", level: "Intermediate", description: "CocoaPods building, provisioning profiles, simulator deployments." },
      { name: "Postman", level: "Expert", description: "API request chaining, header configurations, and environments testing." },
      { name: "Linux", level: "Intermediate", description: "Bash command structures, package installations, server scripting environments." },
    ],
  },
];

// Helper function to return beautiful custom SVGs for major technologies
function getTechIcon(name: string, color: string, className: string = "w-10 h-10") {
  const normName = name.toLowerCase();
  
  if (normName.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <circle cx="0" cy="0" r="2.05" fill={color}/>
        <g stroke={color} strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (normName.includes("angular")) {
    return (
      <svg className={className} viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M125 30L219.8 63.8L205.4 179.2L125 220L44.6 179.2L30.2 63.8L125 30Z" fill="none" stroke={color} strokeWidth="16" strokeLinejoin="round"/>
        <path d="M125 55L190 165H160L125 105L90 165H60L125 55Z" fill={color}/>
        <path d="M107 135H143V148H107V135Z" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("typescript")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <rect x="10" y="10" width="80" height="80" rx="8" stroke={color} strokeWidth="8"/>
        <text x="50" y="68" fill={color} fontSize="34" fontWeight="900" fontFamily="monospace" textAnchor="middle">TS</text>
      </svg>
    );
  }
  if (normName.includes("javascript")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <rect x="10" y="10" width="80" height="80" rx="8" stroke={color} strokeWidth="8"/>
        <text x="50" y="68" fill={color} fontSize="34" fontWeight="900" fontFamily="monospace" textAnchor="middle">JS</text>
      </svg>
    );
  }
  if (normName.includes("html")) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M108.4 0h295.2L367 386.4 256 416l-111-29.6L108.4 0z" stroke={color} strokeWidth="32" strokeLinejoin="round"/>
        <path d="M256 90v236l68-18.4 9.4-106.6H256V152h142.4l-14.8 166.4L256 352l-127.6-33.6-8.8-98.4h51l4.4 49.4L256 295V190H170l-3.4-38H256V90z" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("css")) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M108.4 0h295.2L367 386.4 256 416l-111-29.6L108.4 0z" stroke={color} strokeWidth="32" strokeLinejoin="round"/>
        <path d="M141 120h230l-8.2 92H192.4l5.2 58h158.8l-14 156.4L256 456l-86.4-30-5.8-66h51l3 34.6 32.4 11.4 32.4-11.4 6-68.6H192.4L181.2 212H341l3.6-40H145l-4-52z" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("scss") || normName.includes("sass")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M50 15 C 30 15, 15 30, 15 50 C 15 70, 30 85, 50 85 C 70 85, 85 70, 85 50 C 85 30, 70 15, 50 15 Z" stroke={color} strokeWidth="8"/>
        <text x="50" y="60" fill={color} fontSize="20" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SASS</text>
      </svg>
    );
  }
  if (normName.includes("ionic")) {
    return (
      <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: "none", stroke: color, strokeWidth: "32" }}>
        <circle cx="256" cy="256" r="192"/>
        <circle cx="256" cy="256" r="96"/>
        <circle cx="256" cy="256" r="32" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("android")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M20 52 A 30 30 0 0 1 80 52 Z" fill="none" stroke={color} strokeWidth="8"/>
        <circle cx="38" cy="38" r="3.5" fill={color}/>
        <circle cx="62" cy="38" r="3.5" fill={color}/>
        <line x1="30" y1="22" x2="20" y2="12" stroke={color} strokeWidth="6" strokeLinecap="round"/>
        <line x1="70" y1="22" x2="80" y2="12" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      </svg>
    );
  }
  if (normName.includes("solana")) {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M4 8.5h24l-4.5 4.5H4L8.5 8.5z" fill={color}/>
        <path d="M28 14.5H4l4.5 4.5h24l-4.5-4.5z" fill={color}/>
        <path d="M4 20.5h24l-4.5 4.5H4L8.5 20.5z" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("firebase")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M15 80 L50 15 L85 80 Z" stroke={color} strokeWidth="8" strokeLinejoin="round"/>
        <path d="M30 80 L50 35 L70 80 Z" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("mongodb")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M50 10 C50 10 30 35 30 55 C30 75 45 90 50 90 C55 90 70 75 70 55 C70 35 50 10 50 10 Z" stroke={color} strokeWidth="8" strokeLinejoin="round"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="6"/>
      </svg>
    );
  }
  if (normName.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke={color} strokeWidth="8" strokeLinejoin="round"/>
        <circle cx="50" cy="50" r="12" fill={color}/>
      </svg>
    );
  }
  if (normName.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <rect x="15" y="15" width="70" height="70" rx="12" transform="rotate(45 50 50)" stroke={color} strokeWidth="8"/>
        <circle cx="50" cy="35" r="6" fill={color}/>
        <circle cx="50" cy="65" r="6" fill={color}/>
        <circle cx="35" cy="50" r="6" fill={color}/>
        <line x1="50" y1="35" x2="50" y2="65" stroke={color} strokeWidth="6"/>
        <line x1="50" y1="50" x2="35" y2="50" stroke={color} strokeWidth="6"/>
      </svg>
    );
  }
  if (normName.includes("code")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M35 25 L10 50 L35 75" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M65 25 L90 50 L65 75" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="55" y1="20" x2="45" y2="80" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (normName.includes("linux")) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <circle cx="50" cy="45" r="25" stroke={color} strokeWidth="8"/>
        <path d="M30 80 Q50 65 70 80" stroke={color} strokeWidth="8" fill="none"/>
      </svg>
    );
  }
  
  // Fallbacks:
  if (normName.includes("api") || normName.includes("rest")) {
    return <Cpu className={className} style={{ color }} />;
  }
  if (normName.includes("web3")) {
    return <Layers className={className} style={{ color }} />;
  }
  if (normName.includes("mysql") || normName.includes("sql") || normName.includes("db") || normName.includes("php")) {
    return <FileCode2 className={className} style={{ color }} />;
  }
  
  return <Atom className={className} style={{ color }} />;
}

export default function TechUniverse() {
  const [activePlanet, setActivePlanet] = useState<SkillPlanet | null>(null);
  const [activeCategoryColor, setActiveCategoryColor] = useState<string>("#00F0FF");

  return (
    <section id="tech" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-x-clip z-10">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-primary/5 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-secondary/5 blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase block mb-3">
              03 / TECHNOLOGIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              MY TECH <span className="text-gradient">UNIVERSE</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary mt-4 rounded-full" />
          </div>
          <div className="max-w-md">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Hover over the technology planets drifting in space to unlock details about my proficiency, frameworks, and system building capacities.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Galaxies Panel */}
          <div className="lg:col-span-8 space-y-8">
            {techUniverseData.map((category, catIdx) => (
              <div 
                key={catIdx}
                className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden"
              >
                {/* Background ambient glow matching category theme */}
                <div 
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] opacity-15 transition-all"
                  style={{ backgroundColor: category.themeColor }}
                />

                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ 
                      backgroundColor: category.themeColor,
                      boxShadow: `0 0 10px ${category.themeColor}` 
                    }}
                  />
                  <h3 className="font-mono text-sm tracking-[0.15em] text-white uppercase">
                    {category.title} SYSTEM
                  </h3>
                </div>

                {/* Planets Orbit Cluster */}
                <div className="flex flex-wrap gap-3.5 items-center">
                  {category.planets.map((planet, pIdx) => {
                    const floatDuration = 4 + (pIdx % 3) * 1.5;
                    const floatDelay = (pIdx % 4) * 0.4;
                    const planetSize = planet.name.length > 8 ? "px-4.5 py-2" : "px-5 py-3";
                    const isSelected = activePlanet?.name === planet.name;

                    return (
                      <motion.button
                        key={pIdx}
                        animate={{
                          y: [0, -10 - (pIdx % 4), 0],
                        }}
                        transition={{
                          duration: floatDuration,
                          delay: floatDelay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ 
                          scale: 1.12,
                          y: -6,
                          transition: { duration: 0.2 } 
                        }}
                        onMouseEnter={() => {
                          setActivePlanet(planet);
                          setActiveCategoryColor(category.themeColor);
                        }}
                        onClick={() => {
                          setActivePlanet(planet);
                          setActiveCategoryColor(category.themeColor);
                        }}
                        data-cursor-text="scan"
                        className={`relative rounded-full font-mono text-[11px] font-bold tracking-wider glass-card ${planetSize} border border-white/10 hover:border-[rgba(255,255,255,0.35)] text-white shadow-sm flex items-center gap-2.5 group transition-all duration-300 interactive-planet`}
                        style={{
                          boxShadow: isSelected 
                            ? `0 0 18px ${category.themeColor}30, inset 0 0 8px ${category.themeColor}20` 
                            : "0 4px 15px rgba(0,0,0,0.2)"
                        }}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full transition-all group-hover:scale-125"
                          style={{ 
                            backgroundColor: category.themeColor,
                            boxShadow: `0 0 6px ${category.themeColor}` 
                          }}
                        />
                        {planet.name}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile-only inline details card (Expands instantly under planets group) */}
                <AnimatePresence>
                  {activePlanet && category.planets.some(p => p.name === activePlanet.name) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:hidden mt-6 glass-card p-5 rounded-xl border border-white/10 flex flex-col justify-between overflow-hidden relative"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                        <span className="font-mono text-[8px] text-zinc-500 tracking-[0.2em] uppercase">
                          PLANET DECODER //
                        </span>
                        <div 
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider uppercase border"
                          style={{
                            borderColor: `${category.themeColor}30`,
                            color: category.themeColor,
                            backgroundColor: `${category.themeColor}08`
                          }}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          {activePlanet.level}
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 mb-4">
                        <div 
                          className="w-10 h-10 rounded-full border flex items-center justify-center"
                          style={{ 
                            borderColor: category.themeColor,
                            boxShadow: `0 0 12px ${category.themeColor}30`
                          }}
                        >
                          {getTechIcon(activePlanet.name, category.themeColor, "w-5 h-5")}
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white tracking-tight">
                            {activePlanet.name}
                          </h4>
                          <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                            CORE MODULE ACTIVE
                          </span>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-xs leading-relaxed font-sans mb-4">
                        {activePlanet.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-500 tracking-wider pt-3 border-t border-white/5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        SYSTEM INTEGRATION CERTIFIED
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Planet Details Inspector HUD (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="glass-card p-6 rounded-3xl border border-white/5 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                
                {/* Floating lines decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {activePlanet ? (
                    <motion.div
                      key={activePlanet.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full justify-between"
                    >
                      <div>
                        {/* HUD Header */}
                        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                          <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase">
                            PLANET DECODER //
                          </span>
                          <div 
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border"
                            style={{
                              borderColor: `${activeCategoryColor}30`,
                              color: activeCategoryColor,
                              backgroundColor: `${activeCategoryColor}08`
                            }}
                          >
                            <Zap className="w-2.5 h-2.5" />
                            {activePlanet.level}
                          </div>
                        </div>

                        {/* Planet Identity - Tech Icon & Title */}
                        <div className="flex items-center gap-4 mb-6">
                          <div 
                            className="w-12 h-12 rounded-full border-2 flex items-center justify-center animate-pulse"
                            style={{ 
                              borderColor: activeCategoryColor,
                              boxShadow: `0 0 15px ${activeCategoryColor}40`
                            }}
                          >
                            {getTechIcon(activePlanet.name, activeCategoryColor, "w-6 h-6")}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-white tracking-tight">
                              {activePlanet.name}
                            </h4>
                            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                              CORE MODULE ACTIVE
                            </span>
                          </div>
                        </div>

                        {/* Planet details info */}
                        <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-8">
                          {activePlanet.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-wider pt-4 border-t border-white/5 mt-auto">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        SYSTEM INTEGRATION CERTIFIED
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12 h-full my-auto"
                    >
                      <Globe className="w-12 h-12 text-zinc-600 mb-4 animate-bounce" />
                      <h4 className="text-sm font-mono text-zinc-400 tracking-widest uppercase mb-2">
                        INSPECTOR OFFLINE
                      </h4>
                      <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed">
                        Select any orbiting tech planet to view integration specifications.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
