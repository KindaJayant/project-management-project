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
    <div className="flex flex-col h-full overflow-auto custom-scrollbar p-12">
      <div className="max-w-5xl mx-auto w-full relative">
        <div className="absolute top-0 inset-x-0 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-4 bg-gradient-to-br from-white to-[#94A3B8] text-transparent bg-clip-text">PROJECT MANAGEMENT HANDBOOK</h2>
          <p className="text-[#3B82F6] text-sm uppercase tracking-[0.4em] font-bold">Protocol Version 4.2.0 • Edition 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
              className="glass-card !p-8 flex flex-col items-start border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-300 group hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-2xl group-hover:bg-[#3B82F6]/20 transition-all duration-500" />
              
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <feature.icon className="text-[#3B82F6]" size={20} />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-3 text-white/90">{feature.title}</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <section className="glass-card !p-10 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#3B82F6] flex items-center gap-3">
              <Sparkles size={16} /> Operational Quick Start
            </h3>
            <ul className="space-y-5">
              {[
                "Initiate AI Advisor for contextual project audits.",
                "Trigger 'Optimization' to align metrics with 2026 standards.",
                "Map execution roadmaps in the Planning module.",
                "Monitor high-fidelity health indices on the Dashboard."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 text-xs text-[#94A3B8] items-start hover:text-white transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card !p-10 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="mb-10 relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-[#3B82F6]">System Status</h3>
              <p className="text-xs text-[#94A3B8]">All neural cores synchronized and operational.</p>
            </div>
            <div className="flex gap-10 relative z-10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">Latency</span>
                <span className="text-sm font-mono text-cyan-400 font-bold">12ms</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">AI Compute</span>
                <span className="text-sm font-mono text-[#3B82F6] font-bold">Optimal</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">Auth Level</span>
                <span className="text-sm font-mono text-white/80 font-bold">Admin</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


