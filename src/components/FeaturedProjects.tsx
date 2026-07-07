"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  ExternalLink, Code, Server, Shield, Cpu, 
  Layers, Target, Award, CheckCircle2, AlertTriangle, Play 
} from "lucide-react";

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

function TiltWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { damping: 25, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { damping: 25, stiffness: 300 });

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.08), transparent)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - box.left;
    const mouseY = e.clientY - box.top;
    
    x.set(mouseX / box.width);
    y.set(mouseY / box.height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.025 : 1,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className || ""}`}
    >
      {children}
      {/* Dynamic light flare / glare overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 rounded-xl"
          style={{
            background: glareBg,
          }}
        />
      )}
    </motion.div>
  );
}

interface ProjectMetric {
  label: string;
  value: string;
}

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  role: string;
  tech: string[];
  metrics: ProjectMetric[];
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string;
  results: string;
  liveUrl?: string;
  githubUrl?: string;
  mockupType: "browser" | "phone";
  mockupTitle: string;
}

const projectsList: ProjectData[] = [
  {
    id: "soulpay",
    title: "SoulPay",
    tagline: "Merchant-Side Solana Blockchain Payment Gateway",
    role: "Lead Creator & Blockchain Researcher",
    tech: ["React.js", "Node.js", "Solana Web3.js", "QR Code API", "Vercel"],
    metrics: [
      { label: "Tx Confirmation", value: "Sub-Second" },
      { label: "Intermediary Fees", value: "0%" },
      { label: "Throughput Limit", value: "50k+ TPS" }
    ],
    problem: "Traditional merchant gateways suffer from high credit card fees (2-4%), delayed settlement windows, and lack of transparency, making web3 checkout adoption difficult.",
    solution: "Built a fully trustless, decentralized payment interface generating real-time merchant QR codes. Consumers scan and sign transactions directly via Solana wallet adapters for peer-to-peer settlement.",
    architecture: "Client (React.js, Solana Web3.js) connects directly to Solana RPC cluster. Node.js backend handles dynamic pricing conversion, API signature tracking, and generates verifiable checkout tokens.",
    features: [
      "Dynamic Solana QR code generation",
      "Solana wallet provider integration",
      "Real-time transaction listener (WebSockets)",
      "Published peer-reviewed research (IJSREM)"
    ],
    challenges: "Handling RPC congestion and validating transactions instantly on the Solana ledger. Resolved by setting up optimized WebSocket subscription nodes and fallback RPC pools.",
    results: "Deployed live production client with instant SOL checkouts, and co-authored a published research paper validating decentralized merchant gateways.",
    liveUrl: "https://soul-pay-main2.vercel.app/",
    githubUrl: "https://github.com/virajmali1523/SoulPay",
    mockupType: "browser",
    mockupTitle: "SoulPay Portal"
  },
  {
    id: "chatcom",
    title: "ChatCom",
    tagline: "Real-Time Collaboration & Messaging Hub",
    role: "Full Stack Engineer",
    tech: ["Angular", "TypeScript", "Firebase Auth", "Firestore", "Firebase Storage", "SCSS"],
    metrics: [
      { label: "Message Latency", value: "< 50ms" },
      { label: "Sync Engine", value: "RxJS Listeners" },
      { label: "Security Level", value: "RBAC Active" }
    ],
    problem: "Organizations lack fast, reactive team portals that support fine-grained document sharing and roles without heavy monthly subscriptions.",
    solution: "Engineered a production-deployed real-time chat application with Angular reactive patterns and Firestore NoSQL database syncing, enabling instant channels and files exchange.",
    architecture: "Angular frontend using RxJS state trees connected directly to Firebase Firestore listeners. Secure file buckets host binary media using Firebase Storage rules.",
    features: [
      "Role-Based Access Control (RBAC)",
      "Live status indicator & typing trackers",
      "Direct & channel-based messaging",
      "Drag-and-drop secure media sharing"
    ],
    challenges: "Preventing excessive Firestore read charges and maintaining state consistency during active socket syncing. Solved by writing client-side caches and query-throttling operators in RxJS.",
    results: "Decommissioned legacy communication tools and deployed a lightweight alternative achieving minimal synchronization latency.",
    liveUrl: "https://chatcomm.netlify.app/login",
    githubUrl: "https://github.com/virajmali1523/Chat-Com",
    mockupType: "browser",
    mockupTitle: "ChatCom App"
  },
  {
    id: "vortex",
    title: "Vortex AI",
    tagline: "Gemini Powered AI Intelligent Assistant",
    role: "Frontend UI/UX Developer",
    tech: ["Next.js 15", "React 19", "Gemini API", "Markdown Parser", "Framer Motion"],
    metrics: [
      { label: "Stream Delivery", value: "100% Fluid" },
      { label: "Prompt History", value: "LocalCache" },
      { label: "Render Time", value: "< 5ms" }
    ],
    problem: "Standard AI chatbot interfaces exhibit choppy, flashing layout shifts during streaming text responses, impairing readable scanning.",
    solution: "Designed a glassy chat terminal which parses token streams incrementally, rendering clean Markdown grids, syntax-highlighted code components, and typewriter indicators in real-time.",
    architecture: "Next.js server action proxies secure requests to Google Gemini model endpoint. Stream reader on the client processes stream chunk buffers into a React state array.",
    features: [
      "Real-time token streaming",
      "Persistent conversation session history",
      "Markdown formatting & code block copy buttons",
      "Typing state micro-animations"
    ],
    challenges: "Managing state re-renders for multi-paragraph streams without triggering typing lags. Fixed by decoupling the active stream buffer from main layout nodes.",
    results: "A premium AI assistant interface with near-zero latency feel and beautiful code layout rendering.",
    githubUrl: "https://github.com/virajmali1523/VortexAI",
    mockupType: "browser",
    mockupTitle: "Vortex AI Console"
  },
  {
    id: "nearbasket",
    title: "NearBasket",
    tagline: "Hyperlocal E-Commerce & Grocery Delivery App",
    role: "Mobile App Architect",
    tech: ["React Native", "JavaScript", "Context API", "Geolocation API", "Google Maps"],
    metrics: [
      { label: "Checkout Time", value: "< 2s" },
      { label: "Location Accuracy", value: "99.9%" },
      { label: "Frame Rate", value: "60 FPS" }
    ],
    problem: "Hyperlocal delivery apps frequently lag on entry-level Android devices due to heavy background map polling and large asset loading cycles.",
    solution: "Built a optimized cross-platform React Native app with native bridge hooks for location tracking, lightweight item caching, and immediate cart updates.",
    architecture: "React Native client with Context state API. Integrates Google Maps SDK for customer tracking and communicates via REST API with a Node/Express backend.",
    features: [
      "Persistent item cart & quantity management",
      "Background geolocation updates for drivers",
      "Search filtering and category indexes",
      "Address geocoding integration"
    ],
    challenges: "Battery depletion during background location polls. Mitigated by using adaptive frequency distance thresholds in GPS settings.",
    results: "Delivered a responsive grocery app running cleanly at 60 FPS on both iOS simulators and budget Android devices.",
    githubUrl: "https://github.com/virajmali1523/nearbasket-frontend",
    mockupType: "phone",
    mockupTitle: "NearBasket Mobile"
  }
];

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects = activeTab === "all" 
    ? projectsList 
    : projectsList.filter(p => {
        if (activeTab === "blockchain") return p.id === "soulpay";
        if (activeTab === "mobile") return p.id === "nearbasket";
        if (activeTab === "web") return p.id === "chatcom" || p.id === "vortex";
        return true;
      });

  return (
    <section id="projects" className="relative w-full py-24 px-4 md:px-12 bg-transparent overflow-hidden z-10">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title & Filter */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase block mb-3">
              04 / PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              FEATURED <span className="text-gradient">PROJECTS</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl md:rounded-full justify-center md:justify-start">
            {["all", "web", "mobile", "blockchain"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                data-cursor-text={tab}
                className={`px-4 md:px-5 py-2 rounded-xl md:rounded-full font-mono text-[9px] md:text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-12 lg:items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                {/* Left Side: Mockup Graphics */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 55 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative w-full flex items-center justify-center ${
                      project.mockupType === "browser" ? "aspect-[16/10] max-w-[550px]" : "min-h-[480px] sm:min-h-[540px] py-4"
                    }`}
                  >
                    {project.mockupType === "browser" ? (
                      // Browser Mockup
                      <TiltWrapper className="w-full h-full">
                        <div className="w-full h-full rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl overflow-hidden flex flex-col relative group">
                          {/* Chrome window header */}
                          <div className="w-full h-8 bg-zinc-900 border-b border-white/5 px-4 flex items-center justify-between">
                            <div className="flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                              {project.mockupTitle}.html
                            </span>
                            <div className="w-6" /> {/* spacer */}
                          </div>

                          {/* Browser Inner Contents */}
                          <div className="flex-1 p-6 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-zinc-950 to-zinc-900">
                            {/* Grid line effect */}
                            <div className="absolute inset-0 grid-overlay opacity-10" />
                            
                            {/* Inner details mockup design */}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[8px] px-2 py-0.5 rounded border border-secondary/20 text-secondary bg-secondary/5 uppercase">
                                  STATUS: ONLINE
                                </span>
                                <Code className="w-4 h-4 text-zinc-600" />
                              </div>

                              <div className="my-auto py-4">
                                <h4 className="text-2xl font-black text-white tracking-tight uppercase mb-1">
                                  {project.title}
                                </h4>
                                <p className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">
                                  {project.tagline}
                                </p>
                              </div>

                              {/* Futuristic Tech indicators */}
                              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                                <div className="flex gap-2">
                                  {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="text-[9px] font-mono text-zinc-400">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-[9px] font-mono text-accent">VM_SECURE_AUTH</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltWrapper>
                    ) : (
                      // Phone Mockup
                      <TiltWrapper className="w-[280px] h-[520px]">
                        <div className="w-[280px] h-[520px] rounded-[40px] border-4 border-zinc-800 bg-zinc-950 shadow-2xl relative overflow-hidden flex flex-col group">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
                          </div>
                          {/* Phone Screen Contents */}
                          <div className="flex-1 p-6 pt-10 relative overflow-hidden flex flex-col justify-between bg-gradient-to-tr from-zinc-950 to-[#0e1630]">
                            <div className="absolute inset-0 grid-overlay opacity-10" />
                            
                            <div className="relative z-10 flex flex-col h-full justify-between">
                              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                                <span>9:41 AM</span>
                                <span>LTE 100%</span>
                              </div>

                              <div className="my-auto text-center py-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                                  <Play className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-white tracking-tight uppercase">
                                  {project.title}
                                </h4>
                                <span className="text-[8px] font-mono text-secondary uppercase tracking-widest block mt-1">
                                  Mobile Application
                                </span>
                              </div>

                              <div className="border-t border-white/5 pt-4">
                                <div className="w-full h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between px-3 text-[9px] text-zinc-400">
                                  <span>Add to Cart</span>
                                  <span className="font-bold text-accent">+</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltWrapper>
                    )}
                  </motion.div>
                </div>

                {/* Right Side: Specifications Details */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-xs text-secondary tracking-widest block mb-2 uppercase">
                        {project.role}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
                        {project.title}
                      </h3>
                      <p className="text-sm font-mono text-zinc-500 mt-1 uppercase tracking-wider">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Performance Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-white/5 py-4">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-xs sm:text-base md:text-lg font-black text-white mt-1 break-words">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tabs / Accordions for details */}
                    <div className="space-y-4">
                      {/* Problem & Solution */}
                      <div>
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                          <Target className="w-3.5 h-3.5 text-red-400" /> PROBLEM & SOLUTION
                        </h4>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                          <strong className="text-zinc-400">Problem:</strong> {project.problem}
                          <br />
                          <strong className="text-zinc-400 mt-1 block">Solution:</strong> {project.solution}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                          <Layers className="w-3.5 h-3.5 text-secondary" /> TECHNICAL DEPLOYMENT
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded bg-white/5 border border-white/5 font-mono text-[9px] text-zinc-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Architecture & Challenges */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                            <Cpu className="w-3.5 h-3.5 text-accent" /> ARCHITECTURE
                          </h4>
                          <p className="text-zinc-500 text-[11px] leading-normal">
                            {project.architecture}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> CHALLENGES
                          </h4>
                          <p className="text-zinc-500 text-[11px] leading-normal">
                            {project.challenges}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-text="visit"
                          className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-md"
                        >
                          Live Production
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-text="code"
                          className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[10px] flex items-center gap-2 hover:scale-105 transition-all"
                        >
                          <GithubIcon className="w-4 h-4" />
                          SOURCE_CODE
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
