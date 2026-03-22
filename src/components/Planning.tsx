import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Milestone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Planning() {
  const tasks = [
    { name: 'Research & Discovery', start: 0, duration: 2, status: 'Completed' },
    { name: 'Architecture Design', start: 2, duration: 3, status: 'Completed' },
    { name: 'Core Development', start: 5, duration: 5, status: 'In Progress' },
    { name: 'Beta Testing', start: 10, duration: 3, status: 'Pending' },
    { name: 'Deployment', start: 13, duration: 2, status: 'Pending' },
  ];

  return (
    <div className="space-y-8 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Timeline</h2>
          <p className="text-[#BABABA] mt-1">Strategic roadmap and Work Breakdown Structure (WBS).</p>
        </div>
        <div className="flex gap-2">
          <button className="glass-card !p-2 hover:bg-white/10 transition-all"><ChevronLeft size={18} /></button>
          <button className="glass-card !p-2 hover:bg-white/10 transition-all"><ChevronRight size={18} /></button>
        </div>
      </header>

      <div className="glass-panel p-8">
        <div className="flex items-center gap-4 mb-8 text-sm font-semibold text-[#BABABA]">
          <div className="flex items-center gap-2"><Calendar size={16} /> March 2026</div>
          <div className="flex items-center gap-2 ml-auto"><Milestone size={16} className="text-[#FF6D29]" /> 3 Milestones Reached</div>
        </div>

        <div className="space-y-6 relative">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-white/5" />
            ))}
          </div>

          {tasks.map((task, i) => (
            <div key={task.name} className="relative z-10">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#BABABA]">{task.name}</span>
                <span className={`text-[10px] font-bold ${task.status === 'Completed' ? 'text-green-400' : 'text-[#FF6D29]'}`}>{task.status}</span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0, x: `${(task.start / 15) * 100}%` }}
                  animate={{ width: `${(task.duration / 15) * 100}%`, x: `${(task.start / 15) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`h-full rounded-full ${
                    task.status === 'Completed' ? 'bg-white/20' : 'bg-[#FF6D29] accent-glow'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Critical Path', value: 'On Track', desc: 'No blockers identified' },
          { label: 'Resource Load', value: '82%', desc: 'Optimized allocation' },
          { label: 'Next Milestone', value: 'April 05', desc: 'Stakeholder Review' },
        ].map((item, i) => (
          <div key={i} className="glass-card">
            <p className="text-xs text-[#BABABA] mb-1 font-bold uppercase tracking-widest">{item.label}</p>
            <h4 className="text-xl font-bold">{item.value}</h4>
            <p className="text-xs text-[#BABABA] mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
