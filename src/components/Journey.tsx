"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, BookOpen, Briefcase, FileText, ChevronRight } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "school" | "diploma" | "engineering" | "internship" | "research" | "projects";
}

const timelineData: TimelineItem[] = [
  {
    year: "2020",
    title: "Secondary Schooling",
    subtitle: "Foundation Stage",
    description: "Gained core fundamentals in math, logic, and early computer literacy, initiating my passion for technology.",
    type: "school",
  },
  {
    year: "2020 - 2024",
    title: "Diploma in Computer Technology",
    subtitle: "K. K. Wagh Polytechnic, Nashik",
    description: "Successfully completed with hands-on labs in object-oriented programming, data structures, database management systems, and initial web development technologies.",
    type: "diploma",
  },
  {
    year: "Jun 2023 - Jul 2023",
    title: "Software Engineering Intern",
    subtitle: "Cyber Sanskar, Nashik",
    description: "Collaborated on web interface modules using HTML, CSS, and vanilla JavaScript. Got introduced to Android Studio and mobile interface designs.",
    type: "internship",
  },
  {
    year: "2023 - 2024",
    title: "Peer-Reviewed Research Paper",
    subtitle: "Solana Smart Gateway Research",
    description: "Co-authored and published research on SoulPay merchant gateway inside the International Journal of Scientific Research in Engineering & Management (IJSREM).",
    type: "research",
  },
  {
    year: "2024 - 2027",
    title: "BE in Computer Engineering",
    subtitle: "Smt. Indira Gandhi College of Engineering, Navi Mumbai",
    description: "Undergoing advanced engineering degree (Expected 2027) covering advanced software engineering, networking, mobile computing, and blockchain applications.",
    type: "engineering",
  },
  {
    year: "Aug 2025 - Present",
    title: "App Developer Intern",
    subtitle: "Prudent Tech IT Solutions",
    description: "Developing cross-platform mobile apps with Ionic Framework and Angular. Building, testing, and integrating enterprise-grade REST APIs, state handlers, and custom plugins.",
    type: "internship",
  },
  {
    year: "Present",
    title: "Advanced Mobile App Architectures",
    subtitle: "Building Cross-Platform Systems",
    description: "Creating optimized React Native and Ionic ecosystems. Integrating native iOS/Android device APIs, push notification gateways, local offline-first storage, and high-fps layouts.",
    type: "projects",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "school":
      return <BookOpen className="w-5 h-5" />;
    case "diploma":
      return <GraduationCap className="w-5 h-5" />;
    case "engineering":
      return <GraduationCap className="w-5 h-5 text-accent" />;
    case "internship":
      return <Briefcase className="w-5 h-5 text-secondary" />;
    case "research":
      return <FileText className="w-5 h-5 text-purple-400" />;
    default:
      return <Award className="w-5 h-5 text-accent animate-pulse" />;
  }
};

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate line scale
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full py-24 px-4 md:px-12 bg-transparent overflow-hidden z-10"
    >
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase block mb-3">
            02 / THE PATH
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            JOURNEY <span className="text-gradient">TIMELINE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Timeline wrapper */}
        <div className="relative mt-12">
          {/* Vertical central tracking line (Desktops only, left-aligned on mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-900 -translate-x-[1px]" />
          
          {/* Active scroll-linked glowing line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent -translate-x-[1px] shadow-[0_0_10px_#00F0FF]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* central icon node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 z-20">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-12 h-12 rounded-full bg-[#030014] border-2 border-zinc-800 flex items-center justify-center text-white shadow-lg hover:border-secondary transition-colors timeline-node"
                      data-cursor-text={item.type}
                    >
                      {getIcon(item.type)}
                    </motion.div>
                  </div>

                  {/* Content card container */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ x: isEven ? 50 : -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4 }}
                      className="glass-card p-6 rounded-2xl border border-white/5 hover:glass-card-hover group relative"
                    >
                      {/* Year label overlay */}
                      <span className="font-mono text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
                        {item.year}
                      </span>
                      
                      {/* Title & subtitle */}
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
                        {item.title}
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                      </h3>
                      <h4 className="text-sm font-medium text-zinc-400 mt-1 mb-3">
                        {item.subtitle}
                      </h4>

                      {/* Description */}
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Accent corner light */}
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-accent transition-colors" />
                    </motion.div>
                  </div>

                  {/* Empty spacer block for desktops to align layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
