"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle } from "lucide-react";

interface EducationCardProps {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  status: string;
  courses: string[];
  color: string; // theme color
  accentGlow: string;
}

const educationData: EducationCardProps[] = [
  {
    degree: "Diploma in Computer Technology",
    institution: "K. K. Wagh Polytechnic",
    location: "Nashik, India",
    duration: "2020 - 2024",
    status: "Completed (First Class)",
    courses: [
      "Object Oriented Programming (Java/C++)",
      "Data Structures & Algorithms",
      "Database Management Systems (SQL)",
      "Basic Web Development (HTML/CSS/JS)",
      "Software Engineering Methodologies"
    ],
    color: "text-secondary",
    accentGlow: "shadow-[0_0_20px_rgba(0,229,255,0.15)] border-secondary/20"
  },
  {
    degree: "Bachelor of Engineering (BE)",
    institution: "Smt. Indira Gandhi College of Engineering",
    location: "Navi Mumbai, India",
    duration: "2024 - 2027",
    status: "Currently Pursuing (Expected 2027)",
    courses: [
      "Advanced System Architectures",
      "Mobile Application Computing",
      "Blockchain & Smart Contract Security",
      "Object Oriented Analysis & Design",
      "Operating Systems & Linux Networking"
    ],
    color: "text-accent",
    accentGlow: "shadow-[0_0_20px_rgba(0,255,163,0.15)] border-accent/20"
  }
];

export default function Education() {
  return (
    <section id="education" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950 overflow-hidden z-10">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase block mb-3">
            06 / ACADEMICS
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white flex justify-center items-center gap-3">
            EDUCATION & <span className="text-gradient">ACADEMICS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full mx-auto" />
        </div>

        {/* Education Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {educationData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`glass-card p-8 rounded-3xl border border-white/5 hover:glass-card-hover flex flex-col justify-between relative overflow-hidden group ${item.accentGlow}`}
            >
              {/* Dynamic glowing radial behind graduation cap */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header: Title and Cap Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      ACADEMIC MODULE // 0{idx + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-snug group-hover:text-accent transition-colors duration-300">
                      {item.degree}
                    </h3>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white cursor-pointer group-hover:border-secondary transition-colors"
                  >
                    <GraduationCap className="w-6 h-6 text-zinc-300 group-hover:text-secondary transition-colors" />
                  </motion.div>
                </div>

                {/* Institution Metadata */}
                <div className="space-y-2 mb-8 font-sans text-xs md:text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-zinc-500" />
                    <span className="font-semibold text-white">{item.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Core Focus Areas */}
                <div className="border-t border-white/5 pt-6">
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4">
                    CORE SYLLABUS FOCUS
                  </h4>
                  <ul className="space-y-2.5">
                    {item.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status and Floating Certificate Tag */}
              <div className="flex justify-between items-center mt-10 pt-4 border-t border-white/5">
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                  STATUS: {item.status.toUpperCase()}
                </span>
                
                {/* Floating Certificate Badge */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white hover:bg-white/10 transition-colors"
                >
                  <Award className="w-3 h-3 text-accent" />
                  VERIFIED_CREDENTIALS
                </motion.div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
