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
      title: "Real-time Dashboard",
      description: "Monitor your project's health, velocity, and accuracy at a glance. All metrics are updated dynamically as you manage your project."
    },
    {
      icon: BrainCircuit,
      title: "AI Project Advisor",
      description: "Use the floating AI panel to ask for strategic advice or project insights. Our 2026 AI engine is trained on advanced PM methodologies."
    },
    {
      icon: Sparkles,
      title: "Analytical Optimization",
      description: "Click 'Optimize Project Status' in the AI panel to let the agent refine your project state, suggesting realistic task owners, priorities, and risk mitigations."
    },
    {
      icon: GanttChartSquare,
      title: "Execution Roadmap",
      description: "Track your project timeline and task status in the Planning module. View owners and priorities to ensure accountability."
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Identify and monitor potential project blockers. Stay ahead of issues with probability and impact assessments."
    },
    {
      icon: Wallet,
      title: "Budget Tracking",
      description: "Keep your finances in check with categorized budget breakdowns and real-time spending analysis."
    }
  ];

  return (
    <div className="flex flex-col h-full glass-panel overflow-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#FF6D29] rounded-2xl flex items-center justify-center accent-glow">
              <Zap className="text-white" size={28} />
            </div>
            <h2 className="text-4xl font-black tracking-tight">How to Use PM-OS</h2>
          </div>
          <p className="text-[#BABABA] text-lg max-w-2xl">
            Welcome to the future of project management. PM-OS Edition 2026 leverages high-frequency AI to ensure your projects never miss a beat.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex gap-5 hover:bg-white/5 transition-all group border border-white/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-[#FF6D29]" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-white/90">{feature.title}</h4>
                <p className="text-sm text-[#BABABA] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="glass-card p-8 bg-gradient-to-br from-[#FF6D29]/5 to-transparent border-[#FF6D29]/10">
          <div className="flex items-center gap-3 mb-6">
            <MousePointer2 className="text-[#FF6D29]" size={20} />
            <h3 className="text-xl font-bold italic tracking-wider uppercase">Quick Start Guide</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[#FF6D29]/20 text-[#FF6D29] text-xs flex items-center justify-center font-bold shrink-0">1</span>
              <p className="text-sm text-[#BABABA]">Navigate through the sidebar to explore different project facets like <strong>Planning</strong> and <strong>Risk Management</strong>.</p>
            </div>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[#FF6D29]/20 text-[#FF6D29] text-xs flex items-center justify-center font-bold shrink-0">2</span>
              <p className="text-sm text-[#BABABA]">Interact with the <strong>AI Project Advisor</strong> at the bottom right. Ask it anything about your current project status.</p>
            </div>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[#FF6D29]/20 text-[#FF6D29] text-xs flex items-center justify-center font-bold shrink-0">3</span>
              <p className="text-sm text-[#BABABA]">Use the <strong>Optimize Project Status</strong> button to let the AI initialize or refine your project metrics and tasks based on 2026 standards.</p>
            </div>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[#FF6D29]/20 text-[#FF6D29] text-xs flex items-center justify-center font-bold shrink-0">4</span>
              <p className="text-sm text-[#BABABA]">Watch as the <strong>Dashboard</strong> visualizes your data with high-contrast, premium interface elements designed for maximum clarity.</p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center pb-8 border-t border-white/5 pt-8">
          <p className="text-[#636363] text-[10px] uppercase tracking-[0.3em] mb-4">PM-OS Core Infrastructure v4.2.0-free</p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-[#BABABA]">FREE TIER ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6D29]" />
              <span className="text-[10px] font-bold text-[#BABABA]">ENHANCED AI ACCURACY</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
