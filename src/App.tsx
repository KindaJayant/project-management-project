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
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import RiskManager from './components/RiskManager';
import Budget from './components/Budget';
import HowToUse from './components/HowToUse';
import { initialProjectState, ProjectState } from './services/projectService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectState, setProjectState] = useState<ProjectState>(initialProjectState);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planning', label: 'Planning', icon: GanttChartSquare },
    { id: 'risk', label: 'Risk Management', icon: AlertTriangle },
    { id: 'budget', label: 'Budget & Cost', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Resource Mgmt', icon: Users },
    { id: 'how-to-use', label: 'How to Use?', icon: BrainCircuit },
  ];

  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', content: aiMessage }];
    setChatHistory(newHistory);
    setAiMessage('');
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "arcee-ai/trinity-large-preview:free",
          "messages": [
            { role: "system", content: "You are a professional Project Management Advisor for the year 2026. Give concise, strategic advice based on the provided query." },
            ...newHistory
          ]
        })
      });
      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid AI response");
      }
      const reply = data.choices[0].message.content;
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Neural link interrupted. Please verify your 2026 uplink status." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const refineStateWithAi = async () => {
    setIsTyping(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-exp:free",
          "messages": [
            { 
              role: "system", 
              content: "You are a JSON generator. Return ONLY a valid JSON object matching the ProjectState interface for a futuristic project manager app. Change the metrics, tasks, and risks to be slightly different but realistic for the year 2026." 
            },
            { role: "user", content: `Current State: ${JSON.stringify(projectState)}. Generate a new optimized state.` }
          ]
        })
      });
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Attempt to parse JSON, sometimes AI wraps it in markdown blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : content;
      
      try {
        const newState = JSON.parse(cleanJson);
        setProjectState(newState);
        setChatHistory(prev => [...prev, { role: 'assistant', content: "Project state has been analytically optimized for 2026 performance standards." }]);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Clean JSON:", cleanJson);
        setChatHistory(prev => [...prev, { role: 'assistant', content: "I encountered an error while optimizing the project state. Please try again." }]);
      }
    } catch (error) {
      console.error("AI Refine Error:", error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the 2026 optimization core. Please verify your connection and try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full text-white bg-[#050505] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 glass-panel m-4 flex flex-col p-6 shrink-0 z-10 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-10 px-2 relative z-10">
          <div className="w-10 h-10 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-xl flex items-center justify-center accent-glow">
            <BrainCircuit size={24} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PM-OS</h1>
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-[0.2em]">Edition 2026</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 relative z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]' 
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2 relative z-10">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-xl hover:bg-white/5">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          
          <div className="glass-card p-4 mt-4 !bg-[#3B82F6]/5 !border-[#3B82F6]/20">
            <p className="text-xs text-[#94A3B8] mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-sm font-semibold text-[#F8FAFC]">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden py-4 relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="h-full pr-4"
          >
            {activeTab === 'dashboard' && <Dashboard state={projectState} />}
            {activeTab === 'planning' && <Planning state={projectState} />}
            {activeTab === 'risk' && <RiskManager state={projectState} />}
            {activeTab === 'budget' && <Budget state={projectState} />}
            {activeTab === 'how-to-use' && <HowToUse />}
            {(activeTab === 'analytics' || activeTab === 'team') && (
              <div className="flex flex-col items-center justify-center h-full glass-panel mr-4">
                <h2 className="text-2xl font-bold mb-2 capitalize text-[#F8FAFC]">{activeTab.replace('-', ' ')}</h2>
                <p className="text-[#94A3B8]">This module is being fine-tuned by the AI... Consult the <strong>How to Use?</strong> section for more details.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Insight Docked Right Sidebar */}
      <aside className="w-96 glass-panel m-4 ml-0 flex flex-col p-6 shrink-0 relative overflow-hidden z-10">
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center">
              <BrainCircuit size={16} className="text-[#3B82F6]" />
            </div>
            <h4 className="font-bold text-sm text-[#F8FAFC]">AI Project Advisor</h4>
          </div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        </div>
        
        <div className="flex-1 overflow-auto space-y-4 mb-4 pr-2 custom-scrollbar relative z-10">
          {chatHistory.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                <BrainCircuit size={32} className="text-[#3B82F6]/50" />
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                "Hello. I am your 2026 Project Advisor. How can I help you optimize your roadmap today?"
              </p>
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 text-[12px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#3B82F6] to-blue-600 text-white rounded-2xl rounded-tr-sm shadow-[0_8px_16px_rgba(59,130,246,0.2)]' 
                  : 'bg-[#0F172A] border border-white/5 text-[#E2E8F0] rounded-2xl rounded-tl-sm shadow-lg'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#0F172A] border border-white/5 p-3 rounded-2xl rounded-tl-sm shadow-lg flex gap-1.5 items-center h-10">
                <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 space-y-3 mt-auto pt-4 border-t border-white/5">
          <button 
            onClick={refineStateWithAi}
            className="w-full py-2.5 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] flex justify-center items-center gap-2"
          >
            <Sparkles size={14} /> Optimize Project Status
          </button>

          <form onSubmit={handleAiChat} className="flex gap-2">
            <input 
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask for project insight..."
              className="flex-1 bg-[#0F172A] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-[#64748B] shadow-inner"
            />
            <button type="submit" className="p-2.5 bg-[#3B82F6] text-white rounded-xl hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}

