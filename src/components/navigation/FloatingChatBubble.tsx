import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { Bot, Sparkles } from 'lucide-react';

export const FloatingChatBubble: React.FC = () => {
  const { isChatOpen, toggleChat } = useMoralityStore();

  return (
    <button
      onClick={() => toggleChat(!isChatOpen)}
      className={`fixed left-5 bottom-6 z-50 p-3.5 rounded-full shadow-2xl border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group hover:scale-110 active:scale-95 ${
        isChatOpen
          ? 'bg-slate-900 border-emerald-500 text-emerald-400 ring-2 ring-emerald-500/50'
          : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white ring-4 ring-emerald-950/60'
      }`}
      title={isChatOpen ? 'Close Socrates AI Agent' : 'Open Socrates AI Agent'}
    >
      <div className="relative flex items-center justify-center">
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
        </span>
      </div>
      <span className="text-xs font-extrabold hidden group-hover:inline-block pr-1 transition-all">
        {isChatOpen ? 'Close Agent' : 'AI Socrates Agent'}
      </span>
    </button>
  );
};
