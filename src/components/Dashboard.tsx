import { 
  TrendingUp, 
  AlertCircle, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectState } from '../services/projectService';

export default function Dashboard({ state }: { state: ProjectState }) {
  const stats = [
    { label: 'Budget Health', value: state.metrics.budgetHealth, change: state.metrics.budgetChange, trend: 'up', icon: TrendingUp },
    { label: 'Risk Indices', value: state.metrics.riskIndices, change: state.metrics.riskChange, trend: 'down', icon: AlertCircle },
    { label: 'Team Velocity', value: state.metrics.teamVelocity, change: state.metrics.velocityChange, trend: 'up', icon: Users },
    { label: 'Predictive Accuracy', value: state.metrics.predictiveAccuracy, change: state.metrics.accuracyChange, trend: 'up', icon: Activity },
  ];

  const recentTasks = state.tasks;

  return (
    <div className="space-y-8 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Health Overview</h2>
          <p className="text-[#8DA0B8] mt-1">Real-time analytical metrics for Strategic Digital Overhaul.</p>
        </div>
        <div className="flex gap-3">
           <div className="glass-card !py-2 !px-4 flex items-center gap-2">
            <Clock size={16} className="text-[#D7263D]" />
            <span className="text-xs font-medium">Last Sync: Just now</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#D7263D]/10 rounded-lg text-[#D7263D]">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-orange-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-sm text-[#8DA0B8] mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            
            {/* Subtle background glow */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#D7263D]/5 rounded-full blur-2xl group-hover:bg-[#D7263D]/10 transition-all" />
          </motion.div>
        ))}
      </div>

      {/* Charts & Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold">Execution roadmap</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-[#8DA0B8] uppercase font-bold tracking-widest">Q1 2026</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[65, 45, 78, 52, 85, 42, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${i === 4 ? 'bg-[#D7263D] accent-glow' : 'bg-white/10'}`}
                />
                <span className="text-[10px] text-[#8DA0B8] font-bold">W-0{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-8">Active Workflows</h3>
          <div className="space-y-6">
            {recentTasks.map((task, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  task.priority === 'High' ? 'bg-[#D7263D]' : 
                  task.priority === 'Medium' ? 'bg-[#8DA0B8]' : 'bg-white/10'
                }`} />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{task.name}</h4>
                  <p className="text-xs text-[#8DA0B8]">{task.owner} • {task.status}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/5 transition-all">
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
