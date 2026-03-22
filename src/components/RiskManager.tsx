import React from 'react';
import { AlertCircle, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RiskManager() {
  const risks = [
    { id: 1, name: 'Budget Overrun', probability: 'Medium', impact: 'High', status: 'Mitigated' },
    { id: 2, name: 'Vendor Delay', probability: 'High', impact: 'Medium', status: 'Active' },
    { id: 3, name: 'Scope Creep', probability: 'Low', impact: 'Critical', status: 'Warning' },
    { id: 4, name: 'Talent Attrition', probability: 'Low', impact: 'Medium', status: 'Monitored' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Mitigated': return 'text-green-400';
      case 'Active': return 'text-red-400';
      case 'Warning': return 'text-yellow-400';
      default: return 'text-[#BABABA]';
    }
  };

  return (
    <div className="space-y-8 p-2">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Risk Register</h2>
        <p className="text-[#BABABA] mt-1">Predictive risk assessment and mitigation strategy center.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap size={20} className="text-[#FF6D29]" />
            AI Risk Heatmap
          </h3>
          <div className="grid grid-cols-5 grid-rows-5 gap-2 h-80">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`rounded-lg border border-white/5 ${
                  i === 2 || i === 7 ? 'bg-red-500/30' : 
                  i === 12 || i === 13 ? 'bg-orange-500/30' : 
                  'bg-white/5'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-[#BABABA] font-bold uppercase tracking-widest">
            <span>Low Impact</span>
            <span>Critical Impact</span>
          </div>
        </div>

        <div className="glass-panel p-8 flex flex-col">
          <h3 className="text-xl font-bold mb-6">Mitigation Queue</h3>
          <div className="space-y-4 flex-1">
            {risks.map((risk, i) => (
              <div key={risk.id} className="glass-card flex items-center justify-between !py-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-white/5 ${getStatusColor(risk.status)}`}>
                    {risk.status === 'Mitigated' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{risk.name}</h4>
                    <p className="text-xs text-[#BABABA]">Impact: {risk.impact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </div>
                  <p className="text-[10px] text-[#BABABA]">Prob: {risk.probability}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="primary-btn w-full mt-6">Generate New Mitigation</button>
        </div>
      </div>
    </div>
  );
}
