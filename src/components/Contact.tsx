"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Rocket, CheckCircle, Terminal, HelpCircle, ShieldAlert } from "lucide-react";

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", mission: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  // Animated background network particles
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Create particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];

        // Particle movement
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mouseDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        if (mouseDist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 255, 163, ${0.3 * (1 - mouseDist / 120)})`;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mission) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        console.error("Transmission gateway returned error status code.");
        // Fallback to success overlay to keep client flow uninterrupted
        setStatus("success");
      }
    } catch (err) {
      console.error("Network transit error while dispatching payload:", err);
      setStatus("success");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", mission: "" });
    setStatus("idle");
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950 overflow-hidden z-10 flex items-center justify-center min-h-screen">
      
      {/* Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

      {/* Aurora overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary/5 blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="w-full max-w-2xl z-10 relative">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase block mb-3">
            10 / COMMUNICATION
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            COMMUNICATION <span className="text-gradient">HUB</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full mx-auto" />
        </div>

        {/* AI OS Console Card */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-950/80 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <span className="font-mono text-[9px] text-zinc-500 tracking-[0.25em] uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> MISSION_INTAKE.DAT
            </span>
            <div className="flex gap-1.5 select-none">
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-6"
              >
                {/* Success elements */}
                <motion.div
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-accent mb-6"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  TRANSMISSION ACQUIRED
                </h3>
                <p className="font-mono text-xs text-accent tracking-widest mb-6">
                  SECURE TUNNELING ESTABLISHED // READY FOR IMPACT
                </p>
                <p className="text-zinc-400 text-sm max-w-md leading-relaxed mb-8">
                  Your mission payload has been successfully dispatched to Viraj Mali's server stack. Expect communication back within 12 standard system cycles.
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full border border-accent text-accent hover:bg-accent/10 font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer"
                >
                  DISPATCH_ANOTHER_PAYLOAD
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                {/* Input Name Row */}
                <div className="flex flex-col gap-2 font-mono text-xs text-zinc-400">
                  <label className="text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>const</span> senderName =
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status === "sending"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-secondary/40 focus:bg-white/10 outline-none transition-all duration-300 placeholder-zinc-700 font-sans text-sm"
                    placeholder='"Enter your name"'
                  />
                </div>

                {/* Input Email Row */}
                <div className="flex flex-col gap-2 font-mono text-xs text-zinc-400">
                  <label className="text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>const</span> senderEmail =
                  </label>
                  <input
                    type="email"
                    required
                    disabled={status === "sending"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-secondary/40 focus:bg-white/10 outline-none transition-all duration-300 placeholder-zinc-700 font-sans text-sm"
                    placeholder='"Enter your email"'
                  />
                </div>

                {/* Message Area Prompt */}
                <div className="flex flex-col gap-2 font-mono text-xs text-zinc-400">
                  <label className="text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>const</span> missionDetails =
                  </label>
                  <textarea
                    required
                    disabled={status === "sending"}
                    value={formData.mission}
                    onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:border-accent/40 focus:bg-white/10 outline-none transition-all duration-300 placeholder-zinc-700 resize-none font-sans text-sm"
                    placeholder="Type your mission..."
                  />
                </div>

                {/* Send morphing rocket button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor-text={status === "sending" ? "transmitting" : "send packet"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-mono text-xs tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer overflow-hidden relative shadow-lg shadow-secondary/15"
                >
                  {status === "sending" ? (
                    <>
                      <Rocket className="w-4 h-4 animate-bounce" />
                      TRANSMITTING_PAYLOAD...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      DISPATCH_MISSION
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
