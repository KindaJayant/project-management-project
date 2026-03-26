import { Calendar, ChevronLeft, ChevronRight, Milestone, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectState } from '../services/projectService';

export default function Planning({ state, setState }: { state: ProjectState, setState: (state: ProjectState) => void }) {
  const tasks = state.timeline;

  const addTimelineItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      name: 'New Phase',
      start: 8,
      duration: 3,
      status: 'Planned'
    };
    setState({
      ...state,
      timeline: [...state.timeline, newItem]
    });
  };

  return (
    <div className="space-y-8 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Timeline</h2>
          <p className="text-[#94A3B8] mt-1">Strategic roadmap and Work Breakdown Structure (WBS).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={addTimelineItem}
            className="glass-card !p-2 hover:bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30 transition-all flex items-center gap-2 px-4!"
          >
            <Plus size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Add Phase</span>
          </button>
          <button className="glass-card !p-2 hover:bg-white/10 transition-all ml-2"><ChevronLeft size={18} /></button>
          <button className="glass-card !p-2 hover:bg-white/10 transition-all"><ChevronRight size={18} /></button>
        </div>
      </header>

      <div className="glass-panel p-8">
        <div className="flex items-center gap-4 mb-8 text-sm font-semibold text-[#94A3B8]">
          <div className="flex items-center gap-2"><Calendar size={16} /> March 2026</div>
          <div className="flex items-center gap-2 ml-auto"><Milestone size={16} className="text-[#3B82F6]" /> {tasks.filter(t => t.status === 'Completed').length} Milestones Reached</div>
        </div>

        <div className="space-y-6 relative min-h-[200px]">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-white/5" />
            ))}
          </div>

          {tasks.length === 0 ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-10 text-[#94A3B8]">
              <p className="text-sm italic">No timeline items yet.</p>
            </div>
          ) : (
            tasks.map((task, i) => (
              <div key={task.id} className="relative z-10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">{task.name}</span>
                  <span className={`text-[10px] font-bold ${task.status === 'Completed' ? 'text-green-400' : 'text-[#3B82F6]'}`}>{task.status}</span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0, x: `${(task.start / 15) * 100}%` }}
                    animate={{ width: `${(task.duration / 15) * 100}%`, x: `${(task.start / 15) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      task.status === 'Completed' ? 'bg-white/20' : 'bg-[#3B82F6] accent-glow'
                    }`}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Critical Path', value: 'On Track', desc: 'No blockers identified' },
          { label: 'Resource Load', value: '82%', desc: 'Optimized allocation' },
          { label: 'Next Milestone', value: 'April 05', desc: 'Stakeholder Review' },
        ].map((item, i) => (
          <div key={i} className="glass-card">
            <p className="text-xs text-[#94A3B8] mb-1 font-bold uppercase tracking-widest">{item.label}</p>
            <h4 className="text-xl font-bold">{item.value}</h4>
            <p className="text-xs text-[#94A3B8] mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
