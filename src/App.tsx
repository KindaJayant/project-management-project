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
  Plus,
  ArrowUp,
  X
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
    { id: 'team', label: 'Resource Management', icon: Users },
    { id: 'how-to-use', label: 'How to Use?', icon: Sparkles },
  ];

  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(true);

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
          "HTTP-Referer": window.location.origin,
          "X-Title": "Project Management OS",
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
      
      if (data.error) {
        throw new Error(data.error.message || "OpenRouter API rejected the request.");
      }
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid AI response structure.");
      }
      const reply = data.choices[0].message.content;
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      const isUserNotFound = error.message?.toLowerCase().includes("user not found");
      const errorMessage = isUserNotFound ? "API Error: Account not found. Please verify your OpenRouter account exists and the API key is active." : `API Error: ${error.message}`;
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
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
          "HTTP-Referer": window.location.origin,
          "X-Title": "Project Management OS",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "arcee-ai/trinity-large-preview:free",
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
      
      if (data.error) {
        throw new Error(data.error.message || "OpenRouter API rejected the state refinement request.");
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid AI response structure.");
      }

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
    } catch (error: any) {
      console.error("AI Refine Error:", error);
      const isUserNotFound = error.message?.toLowerCase().includes("user not found");
      const errorMessage = isUserNotFound ? "API Error: Account not found. Please verify your OpenRouter account exists and the API key is active." : `API Error: ${error.message}`;
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
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
            <h1 className="text-xl font-black tracking-widest leading-tight">NEXUS</h1>
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-[0.2em] mt-0.5">Project OS 2026</p>
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
          
          <div className="mt-4 flex flex-col gap-3 p-3.5 bg-[#0F172A]/80 rounded-xl border border-white/5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">System Status</span>
              <span className="text-[10px] text-cyan-400 font-bold">12ms Ping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="status-dot" />
              <span className="text-xs font-semibold text-white/90">AI Core Online</span>
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

      {/* AI Assistant Toggle Button (Visible when closed) */}
      <AnimatePresence>
        {!isAiOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            onClick={() => setIsAiOpen(true)}
            className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
            style={{ 
              background: 'rgba(59, 130, 246, 0.15)', 
              border: '1px solid rgba(59, 130, 246, 0.4)',
              backdropFilter: 'blur(12px)',
              color: '#3B82F6'
            }}
          >
            <BrainCircuit size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Insight Docked Right Sidebar */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: 320, opacity: 1, marginRight: '1rem' }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel my-4 ml-0 flex flex-col p-6 shrink-0 relative overflow-hidden z-10"
            style={{ width: '20rem' }}
          >
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center">
                  <BrainCircuit size={16} className="text-[#3B82F6]" />
                </div>
                <h4 className="font-bold text-sm text-[#F8FAFC]">AI Project Advisor</h4>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)} 
                className="text-[#94A3B8] hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
              >
                <X size={16} />
              </button>
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
                  className={`chat-msg-container ${msg.role === 'user' ? 'user' : 'ai'}`}
                >
                  <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="chat-msg-container ai">
                  <div className="chat-bubble ai typing-dots">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
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

              <form onSubmit={handleAiChat} className="chat-form">
                <input 
                  type="text"
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  placeholder="Ask anything"
                  className="chat-input"
                />
                <button 
                  type="submit" 
                  className="chat-submit"
                  disabled={!aiMessage.trim() || isTyping}
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

