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
      const reply = data.choices[0].message.content;
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
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
      <main className="flex-1 overflow-auto p-4 pl-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === 'dashboard' && <Dashboard state={projectState} />}
            {activeTab === 'planning' && <Planning state={projectState} />}
            {activeTab === 'risk' && <RiskManager state={projectState} />}
            {activeTab === 'budget' && <Budget state={projectState} />}
            {activeTab === 'how-to-use' && <HowToUse />}
            {(activeTab === 'analytics' || activeTab === 'team') && (
              <div className="flex flex-col items-center justify-center h-full glass-panel">
                <h2 className="text-2xl font-bold mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                <p className="text-[#BABABA]">This module is being fine-tuned by the AI... Consult the <strong>How to Use?</strong> section for more details.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* AI Insight Floating Panel */}
        <motion.div 
          drag
          dragConstraints={{ left: -1000, right: 0, top: -800, bottom: 0 }}
          className="absolute bottom-8 right-8 w-96 glass-panel p-6 accent-glow cursor-default z-50 flex flex-col max-h-[500px]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-4 dragging-handle cursor-move">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF6D29] rounded-lg flex items-center justify-center">
                <BrainCircuit size={18} />
              </div>
              <h4 className="font-bold text-sm">AI Project Advisor</h4>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          <div className="flex-1 overflow-auto space-y-4 mb-4 pr-2 custom-scrollbar min-h-[150px]">
            {chatHistory.length === 0 && (
              <p className="text-xs text-[#BABABA] italic text-center py-8">
                "Hello. I am your 2026 Project Advisor. How can I help you optimize your roadmap today?"
              </p>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] ${
                  msg.role === 'user' ? 'bg-[#FF6D29] text-white' : 'bg-white/5 text-[#BABABA] border border-white/10'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-2 rounded-lg animate-pulse text-[10px] text-[#BABABA]">AI is thinking...</div>
              </div>
            )}
          </div>

          <button 
            onClick={refineStateWithAi}
            className="w-full py-2 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all mb-2"
          >
            Optimize Project Status
          </button>

          <form onSubmit={handleAiChat} className="flex gap-2">
            <input 
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask for project insight..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#FF6D29]/50 transition-all"
            />
            <button type="submit" className="p-2 bg-[#FF6D29] rounded-xl hover:brightness-110 transition-all">
              <ArrowUpRight size={18} />
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

