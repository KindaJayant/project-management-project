import React from 'react';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  GanttChartSquare, 
  AlertTriangle, 
  Wallet,
  Zap,
  MousePointer2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToUse() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Core Dashboard",
      description: "Real-time metrics for budget, risk, and velocity. Automatic updates as you work."
    },
    {
      icon: BrainCircuit,
      title: "AI Advisor",
      description: "Strategic advice and project optimization at your fingertips. Ask anything, anytime."
    },
    {
      icon: GanttChartSquare,
      title: "Planning & Risks",
      description: "Manage timelines and identify blockers with our predictive risk assessment engine."
    },
    {
      icon: Wallet,
      title: "Budget Control",
      description: "Detailed financial tracking with categorized spending and budget health indices."
    }
  ];

  return (
    <div className="flex flex-col h-full glass-panel overflow-auto custom-scrollbar p-12">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-[#FF6D29]">PM-OS HANDBOOK</h2>
          <p className="text-[#BABABA] text-sm uppercase tracking-[0.4em]">Protocol Version 4.2.0 • Edition 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card !p-6 flex flex-col items-center text-center border border-white/5 hover:border-[#FF6D29]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#FF6D29]/10 flex items-center justify-center mb-4">
                <feature.icon className="text-[#FF6D29]" size={18} />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-white/90">{feature.title}</h4>
              <p className="text-[10px] text-[#BABABA] leading-normal">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="glass-card !p-8 border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[#FF6D29]">Operational Quick Start</h3>
            <ul className="space-y-4">
              {[
                "Initiate AI Advisor for contextual project audits.",
                "Trigger 'Optimization' to align metrics with 2026 standards.",
                "Map execution roadmaps in the Planning module.",
                "Monitor high-fidelity health indices on the Dashboard."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 text-[11px] text-[#BABABA] items-start">
                  <div className="w-1 h-1 rounded-full bg-[#FF6D29] mt-1.5 shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card !p-8 border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#FF6D29]">System Status</h3>
              <p className="text-[10px] text-[#BABABA]">All neural cores synchronized and operational.</p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-[#636363] uppercase font-bold">Latency</span>
                <span className="text-xs font-mono text-green-400">12ms</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-[#636363] uppercase font-bold">AI Compute</span>
                <span className="text-xs font-mono text-[#FF6D29]">Optimal</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-[#636363] uppercase font-bold">Auth Level</span>
                <span className="text-xs font-mono text-white/60">Admin</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


