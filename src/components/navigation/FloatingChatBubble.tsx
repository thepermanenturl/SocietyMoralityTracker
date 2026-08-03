import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { Bot } from 'lucide-react';

export const FloatingChatBubble: React.FC = () => {
  const { isChatOpen, toggleChat } = useMoralityStore();

  // Hide the floating bubble completely when the AI sidebar drawer is open
  if (isChatOpen) return null;

  return (
    <button
      id="tour-chat-bubble"
      onClick={() => toggleChat(true)}
      className="fixed left-5 bottom-6 z-50 p-3.5 rounded-full shadow-2xl border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group hover:scale-110 active:scale-95 bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white ring-4 ring-emerald-950/60"
      title="Open Socrates AI Agent"
    >
      <div className="relative flex items-center justify-center">
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
        </span>
      </div>
      <span className="text-xs font-extrabold hidden group-hover:inline-block pr-1 transition-all">
        AI Socrates Agent
      </span>
    </button>
  );
};
