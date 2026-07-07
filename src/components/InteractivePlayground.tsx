"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Sparkles, AlertCircle } from "lucide-react";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "system" | "secret";
}

export default function InteractivePlayground() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([
    { text: "VIRAJ MALI OS [VERSION 10.0.2026]", type: "system" },
    { text: "CORE SYSTEMS ONLINE. DECODER INJECTED.", type: "system" },
    { text: "TYPE 'help' TO DISCOVER AVAILABLE COMMANDS.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const [konamiCodeState, setKonamiCodeState] = useState<string[]>([]);
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const jokes = [
    "Why do programmers wear glasses? Because they can't C#.",
    "There are 10 types of people in the world: Those who understand binary, and those who don't.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'",
    "['hip', 'hip'] // (hip hip array!)"
  ];

  // Auto-scroll logs container to bottom with smooth scrolling
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTo({
        top: consoleContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [logs]);

  // Konami Code Tracker: Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp", "ArrowUp", 
      "ArrowDown", "ArrowDown", 
      "ArrowLeft", "ArrowRight", 
      "ArrowLeft", "ArrowRight", 
      "b", "a"
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const nextSequence = [...konamiCodeState, e.key];
      
      // Match sequence
      const currentMatchLength = nextSequence.length;
      const expectedSubSequence = konamiSequence.slice(0, currentMatchLength);

      const isMatching = nextSequence.every((val, index) => val === expectedSubSequence[index]);

      if (isMatching) {
        if (nextSequence.length === konamiSequence.length) {
          // Success! Trigger Easter Egg
          setMatrixActive(true);
          setLogs((prev) => [
            ...prev,
            { text: "> CONFIRMING SIGNALS...", type: "input" },
            { text: "⚡ [ACCESS GRANTED] KONAMI PROTOCOL INITIATED.", type: "secret" },
            { text: "MATRIX MODE ENGAGED. ENJOY THE QUANTUM DECK.", type: "secret" },
          ]);
          setKonamiCodeState([]);
        } else {
          setKonamiCodeState(nextSequence);
        }
      } else {
        // Reset if mismatched
        setKonamiCodeState(e.key === "ArrowUp" ? ["ArrowUp"] : []);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiCodeState]);

  const focusTerminal = () => {
    terminalInputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Add input command to log
    const newLogs: LogLine[] = [...logs, { text: `$ ${input}`, type: "input" }];
    
    // Save to history
    setHistory((prev) => [input, ...prev]);
    setHistoryIdx(-1);

    // Parse commands
    switch (cmd) {
      case "help":
        newLogs.push(
          { text: "AVAILABLE COMMANDS:", type: "system" },
          { text: "  about    - Print professional bio", type: "output" },
          { text: "  skills   - List technical competencies", type: "output" },
          { text: "  projects - Show breakdown of featured applications", type: "output" },
          { text: "  experience- Display internship history details", type: "output" },
          { text: "  resume   - Get download link for resume file", type: "output" },
          { text: "  github   - Reveal official GitHub endpoint", type: "output" },
          { text: "  contact  - Print active email and phone links", type: "output" },
          { text: "  joke     - Dispense developer entertainment", type: "output" },
          { text: "  matrix   - Engage digital stream directly", type: "output" },
          { text: "  clear    - Flush terminal console lines", type: "output" }
        );
        break;
      
      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "about":
        newLogs.push(
          { text: "VIRAJ PRAVIN MALI // FRONTEND & MOBILE APP ENGINEER", type: "system" },
          { text: "BE in Computer Engineering student and active application intern specializing in Angular, React.js, and Ionic Framework cross-platform development.", type: "output" },
          { text: "Passionate about Web3 (Solana ecosystem) and premium interactive interfaces.", type: "output" }
        );
        break;

      case "skills":
        newLogs.push(
          { text: "ACTIVE TECHNICAL MODULES:", type: "system" },
          { text: "  Frontend : React.js, Angular, TypeScript, SCSS, Tailwind CSS", type: "output" },
          { text: "  Mobile   : React Native, Ionic Framework, Android Studio, Capacitor", type: "output" },
          { text: "  Web3     : Solana Web3.js, Transaction Ledgers", type: "output" },
          { text: "  Backend  : Node.js, REST API Services, Firebase, MongoDB, SQL", type: "output" }
        );
        break;

      case "projects":
        newLogs.push(
          { text: "FEATURED RELEASES:", type: "system" },
          { text: "  1. SoulPay     - Solana payment gateway. Live confirmation, QR Api, published paper.", type: "output" },
          { text: "  2. ChatCom     - Reactive collaboration chat. Angular + Firebase Firestore sync.", type: "output" },
          { text: "  3. Vortex AI   - Incremental token stream chatbot. Next.js + Gemini integration.", type: "output" },
          { text: "  4. NearBasket  - Grocery app with geolocation tracker. React Native, 60fps view.", type: "output" },
          { text: "Type 'github' to inspect code repositories.", type: "system" }
        );
        break;

      case "experience":
        newLogs.push(
          { text: "PROFESSIONAL INTERNSHIPS:", type: "system" },
          { text: "  - App Developer Intern @ Prudent Tech IT Solutions (August 2025 - Present)", type: "output" },
          { text: "    Tasks: Cross platform iOS/Android, REST APIs, Git Agile flow.", type: "output" },
          { text: "  - Software Intern @ Cyber Sanskar (June 2023 - July 2023)", type: "output" },
          { text: "    Tasks: HTML/CSS/JS frontend components, basic Android UI.", type: "output" }
        );
        break;

      case "resume":
        newLogs.push(
          { text: "RESUME FILE RETRIEVED SUCCESSFULLY:", type: "system" },
          { text: "  Download path: /Viraj_Mali_Resume.docx", type: "secret" },
          { text: "  [DOWNLOAD NOTIFICATION FIRED]", type: "system" }
        );
        // Programmatically trigger download
        if (typeof window !== "undefined") {
          const a = document.createElement("a");
          a.href = "/Viraj_Mali_Resume.docx";
          a.download = "Viraj_Mali_Resume.docx";
          a.click();
        }
        break;

      case "github":
        newLogs.push(
          { text: "GITHUB ENDPOINT:", type: "system" },
          { text: "  URL: https://github.com/virajmali1523", type: "secret" },
          { text: "  Redirecting in browser...", type: "system" }
        );
        if (typeof window !== "undefined") {
          window.open("https://github.com/virajmali1523", "_blank");
        }
        break;

      case "contact":
        newLogs.push(
          { text: "CONTACT DIRECT CHANNELS:", type: "system" },
          { text: "  Email : virajmali2006@gmail.com", type: "output" },
          { text: "  Phone : +91 8888197377", type: "output" }
        );
        break;

      case "joke":
        const randJoke = jokes[Math.floor(Math.random() * jokes.length)];
        newLogs.push({ text: `🤖 CODE_HUMOR: "${randJoke}"`, type: "output" });
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        newLogs.push({ 
          text: matrixActive ? "MATRIX_MODE OFF." : "MATRIX STREAM ACTIVATED. INJECTING GLITCH GRID.", 
          type: "system" 
        });
        break;

      default:
        newLogs.push({ 
          text: `COMMAND NOT FOUND: '${cmd}'. Type 'help' for instructions.`, 
          type: "error" 
        });
        break;
    }

    newLogs.push({ text: "", type: "system" });
    setLogs(newLogs);
    setInput("");
  };

  return (
    <section id="playground" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-hidden z-10">
      
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase block mb-3">
            09 / DEVELOPER LAB
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
            INTERACTIVE <span className="text-gradient">PLAYGROUND</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full mx-auto" />
          <p className="text-zinc-500 font-mono text-xs mt-6 uppercase tracking-wider">
            [PRO-TIP: Enter the Konami Code on your keyboard for a hidden terminal module]
          </p>
        </div>

        {/* Terminal Container */}
        <div 
          onClick={focusTerminal}
          className={`w-full rounded-2xl border transition-all duration-500 overflow-hidden relative shadow-2xl ${
            matrixActive 
              ? "border-accent bg-black shadow-[0_0_30px_rgba(0,255,163,0.15)]" 
              : "border-white/10 bg-zinc-950/90"
          } terminal-container`}
          style={{ height: "450px" }}
        >
          {/* Matrix Glitch Overlay */}
          {matrixActive && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent h-[200%] animate-pulse pointer-events-none" />
          )}

          {/* Terminal Window Header */}
          <div className="w-full bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> 
              VIRAJ_MALI_TERMINAL.SH
            </span>
            <div className="w-8" /> {/* spacer */}
          </div>

          {/* Terminal Log Console */}
          <div 
            ref={consoleContainerRef}
            className="w-full h-[350px] p-6 overflow-y-auto font-mono text-xs md:text-sm flex flex-col gap-2 terminal-scrollbar"
          >
            
            {logs.map((log, idx) => {
              let color = "text-zinc-300";
              if (log.type === "input") color = "text-white font-bold";
              else if (log.type === "system") color = "text-zinc-500";
              else if (log.type === "error") color = "text-red-400";
              else if (log.type === "output") color = "text-cyan-400";
              else if (log.type === "secret") color = "text-accent";

              return (
                <div key={idx} className={`${color} leading-relaxed break-all whitespace-pre-wrap`}>
                  {log.text}
                </div>
              );
            })}
          </div>

          {/* Terminal Command Input Form */}
          <form 
            onSubmit={handleCommandSubmit}
            className="absolute bottom-0 left-0 right-0 bg-zinc-900/80 border-t border-white/5 p-4 flex items-center gap-2 select-none"
          >
            <span className="font-mono text-xs md:text-sm text-accent font-bold select-none">$</span>
            <input
              ref={terminalInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs md:text-sm text-white caret-accent"
              placeholder="type help..."
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest select-none">
              PRESS_ENTER
            </span>
          </form>
        </div>

      </div>
    </section>
  );
}
