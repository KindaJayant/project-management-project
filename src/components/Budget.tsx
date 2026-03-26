import { Wallet, TrendingDown, DollarSign, PieChart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectState } from '../services/projectService';

export default function Budget({ state, setState }: { state: ProjectState, setState: (state: ProjectState) => void }) {
  const expenses = state.budget;

  const addBudgetItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      category: 'New Expense',
      spent: 0,
      budget: 5000,
      color: '#3B82F6'
    };
    setState({
      ...state,
      budget: [...state.budget, newItem]
    });
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.spent, 0);
  const totalBudget = expenses.reduce((acc, curr) => acc + curr.budget, 0);

  return (
    <div className="space-y-8 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Management</h2>
          <p className="text-[#94A3B8] mt-1">Cost tracking, estimation, and resource allocation controls.</p>
        </div>
        <button 
          onClick={addBudgetItem}
          className="glass-card !py-2 !px-4 flex items-center gap-2 hover:bg-white/5 transition-all text-[#3B82F6]"
        >
          <Plus size={18} />
          <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">Add Budget Item</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]">
               <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-bold text-green-400 opacity-80">+14% Efficiency</span>
          </div>
          <p className="text-sm text-[#94A3B8] mb-1">Total Allocated</p>
          <h3 className="text-2xl font-bold">${totalBudget.toLocaleString()}</h3>
        </div>

        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/5 rounded-lg text-[#94A3B8]">
               <Wallet size={20} />
            </div>
            <span className="text-[10px] font-bold text-orange-400 opacity-80">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% Utilized</span>
          </div>
          <p className="text-sm text-[#94A3B8] mb-1">Actual Spend</p>
          <h3 className="text-2xl font-bold">${totalSpent.toLocaleString()}</h3>
        </div>

        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/5 rounded-lg text-[#94A3B8]">
               <PieChart size={20} />
            </div>
            <span className="text-[10px] font-bold text-[#94A3B8] opacity-80">Variance: -8.4%</span>
          </div>
          <p className="text-sm text-[#94A3B8] mb-1">Remaining</p>
          <h3 className="text-2xl font-bold">${(totalBudget - totalSpent).toLocaleString()}</h3>
        </div>
      </div>

      <div className="glass-panel p-8">
        <h3 className="text-xl font-bold mb-8">Category Breakdown</h3>
        <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {expenses.length === 0 ? (
            <p className="text-center text-[#94A3B8] text-sm py-10 italic">No budget items allocated yet.</p>
          ) : (
            expenses.map((item, i) => (
              <div key={item.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold">{item.category}</span>
                  <span className="text-xs text-[#94A3B8]">
                    ${item.spent.toLocaleString()} / <span className="text-white">${item.budget.toLocaleString()}</span>
                  </span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.budget > 0 ? (item.spent / item.budget) * 100 : 0}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
