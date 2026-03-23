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
    <div className="flex flex-col h-full glass-panel overflow-auto custom-scrollbar p-10">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-10">
          <h2 className="text-3xl font-black mb-3">System Navigation</h2>
          <p className="text-[#BABABA] text-sm">Everything you need to master your 2026 project roadmap.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 border border-white/5"
            >
              <feature.icon className="text-[#FF6D29] mb-3" size={20} />
              <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-[#BABABA] leading-tight">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <section className="glass-card p-6 bg-[#FF6D29]/5 border-[#FF6D29]/10">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Quick Start</h3>
          <ul className="space-y-3">
            {[
              "Ask the AI Advisor for project insights",
              "Use 'Optimize' for automated state refinement",
              "Track timelines in the Planning module",
              "Monitor real-time health on the Dashboard"
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-xs text-[#BABABA]">
                <span className="text-[#FF6D29]">•</span> {text}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] text-[#636363] uppercase tracking-widest">PM-OS v4.2.0</span>
          <div className="flex gap-4">
            <span className="text-[10px] font-bold text-[#BABABA] flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500" /> ONLINE
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

