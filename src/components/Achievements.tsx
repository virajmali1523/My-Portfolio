"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Globe, CheckCircle2, ShieldAlert } from "lucide-react";

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  metric: string;
  icon: React.ReactNode;
}

const achievementsData: AchievementItem[] = [
  {
    id: "researcher",
    title: "Published Web3 Researcher",
    subtitle: "International Journal (IJSREM)",
    details: "Co-authored peer-reviewed research analyzing blockchain transactional speed and security, validating merchant gateway architectures in Solana.",
    metric: "ISSN Approved",
    icon: <BookOpen className="w-6 h-6 text-purple-400" />
  },
  {
    id: "live-deploy",
    title: "Mainnet DApp Architect",
    subtitle: "SoulPay Solana Integration",
    details: "Built and launched an active merchant blockchain payment node, processing decentralized direct wallet transfers under sub-second ledger updates.",
    metric: "0% Intermediary Fee",
    icon: <Globe className="w-6 h-6 text-secondary" />
  },
  {
    id: "mobile-engineer",
    title: "Production App Deployments",
    subtitle: "Cross-Platform App Intern",
    details: "Engineered and shipped native iOS/Android features with Ionic/Angular and REST endpoints, debugging CocoaPods architectures and AVD builds.",
    metric: "iOS & Android Shipped",
    icon: <Award className="w-6 h-6 text-accent" />
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative w-full py-24 px-4 md:px-12 bg-zinc-950/20 overflow-hidden z-10">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase block mb-3">
            08 / MILESTONES
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            HONORS & <span className="text-gradient">ACHIEVEMENTS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary mt-4 rounded-full" />
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 rounded-3xl border border-white/5 hover:glass-card-hover flex flex-col justify-between relative group"
            >
              {/* Top Row: Icon & Metric */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[9px] px-2.5 py-1 rounded bg-white/5 border border-white/5 text-zinc-400 uppercase tracking-widest">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider font-mono">
                  {item.subtitle}
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {item.details}
                </p>
              </div>

              {/* Verified sign */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600 border-t border-white/5 pt-4 mt-8">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                VERIFIED_RECORD_LOG
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
