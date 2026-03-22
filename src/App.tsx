import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GanttChartSquare, 
  AlertTriangle, 
  Wallet, 
  BarChart3, 
  Users, 
  Settings,
  BrainCircuit,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports (to be created)
// import Dashboard from './components/Dashboard';
// import Planning from './components/Planning';
// import RiskManager from './components/RiskManager';
// import Budget from './components/Budget';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planning', label: 'Planning', icon: GanttChartSquare },
    { id: 'risk', label: 'Risk Management', icon: AlertTriangle },
    { id: 'budget', label: 'Budget & Cost', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Resource Mgmt', icon: Users },
  ];

  return (
    <div className="flex h-screen w-full bg-[#161316] text-white">
      {/* Sidebar */}
      <aside className="w-72 glass-panel m-4 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-[#FF6D29] rounded-xl flex items-center justify-center accent-glow">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PM-OS</h1>
            <p className="text-[10px] text-[#BABABA] uppercase tracking-[0.2em]">Edition 2026</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-white/10 text-[#FF6D29] border border-white/10' 
                  : 'text-[#BABABA] hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6D29]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-[#BABABA] hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          
          <div className="glass-card p-4 mt-4 !bg-[#FF6D29]/10 !border-[#FF6D29]/20">
            <p className="text-xs text-[#BABABA] mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 pl-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === 'dashboard' && <DashboardSkeleton />}
            {activeTab !== 'dashboard' && (
              <div className="flex flex-col items-center justify-center h-full glass-panel">
                <h2 className="text-2xl font-bold mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                <p className="text-[#BABABA]">This module is being initialized by the AI...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Project Alpha</h2>
          <p className="text-[#BABABA]">Strategic Digital Overhaul • 2026 Q1</p>
        </div>
        <button className="primary-btn flex items-center gap-2">
          <span>Generate Report</span>
          <BarChart3 size={18} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Budget Health', value: '94%', sub: '+2.4% vs last week' },
          { label: 'Risk Indices', value: 'Low', sub: '3 active mitigations' },
          { label: 'Team Velocity', value: '42.8', sub: 'Tasks / Sprint' },
          { label: 'AI Confidence', value: 'High', sub: 'Predictive accuracy 98%' },
        ].map((stat, i) => (
          <div key={i} className="glass-card">
            <p className="text-sm text-[#BABABA] mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-xs text-green-500 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 min-h-[400px]">
          <h3 className="text-xl font-bold mb-6">Execution Roadmap</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 w-full bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-6">Risk Register</h3>
          <div className="space-y-4">
             {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 w-full bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
