"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { User, Heart, Compass, Cpu, Award, Zap, Code, Shield } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const stepTime = Math.abs(Math.floor(totalMiliseconds / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-black text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <section id="about" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-hidden z-10">
      {/* Glow Atmosphere */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase block mb-3">
            01 / STORYTELLING
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            WHO IS <span className="text-gradient">VIRAJ MALI</span>?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Interactive Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[400px] aspect-square rounded-3xl p-1.5 bg-gradient-to-br from-primary/30 via-secondary/10 to-accent/20 border border-white/10 group cursor-pointer"
            >
              {/* Inner Glowing Aura on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-accent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700 pointer-events-none" />
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary rounded-tl-3xl -translate-x-1 -translate-y-1 group-hover:scale-105 transition-transform" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-3xl translate-x-1 -translate-y-1 group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl-3xl -translate-x-1 translate-y-1 group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary rounded-br-3xl translate-x-1 translate-y-1 group-hover:scale-105 transition-transform" />

              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0a0f24] border border-white/5">
                <Image
                  src="/linkedin_profile.jpg"
                  alt="Viraj Pravin Mali profile picture"
                  fill
                  sizes="(max-width: 400px) 100vw, 400px"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  priority
                />
                
                {/* Tech scanline overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent h-[200%] -translate-y-full group-hover:translate-y-full transition-transform duration-[2.5s] ease-linear pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Storytelling Cards */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Card 1: Who I Am */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:glass-card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Who I Am</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                A relentless Frontend & Mobile App Developer focused on bridges. I build interfaces that feel smooth, look gorgeous, and translate technical complexity into intuitive experiences.
              </p>
            </motion.div>

            {/* Card 2: What I Love */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:glass-card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">What I Love</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Micro-interactions that surprise users, Web3 applications built on Solana, hybrid app codebases with Angular/Ionic, and slick, performant React web interfaces.
              </p>
            </motion.div>

            {/* Card 3: Philosophy */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:glass-card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">My Philosophy</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Digital products must be more than static layouts. They should breathe, respond, and adapt to the human touch. Performance, accessibility, and clean architecture are non-negotiable.
              </p>
            </motion.div>

            {/* Card 4: How I Solve Problems */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:glass-card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">My Approach</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Deconstruct complicated specifications down to their mathematical fundamentals. Research existing paradigms, sketch interactions, prototype rapidly, and iterate based on real feedback.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Counters Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/5 text-center"
        >
          {/* Internships counter */}
          <div className="flex flex-col items-center">
            <Counter value={2} />
            <span className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-primary" /> Internships Completed
            </span>
          </div>

          {/* Projects counter */}
          <div className="flex flex-col items-center">
            <Counter value={10} suffix="+" />
            <span className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-secondary" /> Projects Built
            </span>
          </div>

          {/* Technologies counter */}
          <div className="flex flex-col items-center">
            <Counter value={15} suffix="+" />
            <span className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-accent" /> Tech Competencies
            </span>
          </div>

          {/* Research Publication counter */}
          <div className="flex flex-col items-center">
            <Counter value={1} />
            <span className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-violet-400" /> Research Papers
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
