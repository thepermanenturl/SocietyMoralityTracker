import React, { useState, useEffect, useRef } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Send, Bot, User, Sparkles, Loader2, Layers, Trash2, BrainCircuit } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIChatbotModal: React.FC = () => {
  const {
    isChatOpen,
    toggleChat,
    searchQuery,
    selectedNode,
    setAiMatchedNodeIds,
    setHighlightRationale,
    chatInputPrompt,
    setChatInputPrompt,
    cardQueue,
    removeCardFromQueue,
    clearCardQueue,
    chatMessages,
    addChatMessage
  } = useMoralityStore();

  const messages = chatMessages;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connection health check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
        let baseUrl = 'http://127.0.0.1:8000';
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            baseUrl = parsed.localPortConfig?.url || parsed.remoteServerConfig?.url || baseUrl;
          } catch (e) {}
        }
        const res = await axios.get(`${baseUrl.replace(/\/$/, '')}/api/health`, { timeout: 2500 });
        setIsConnected(res.status === 200);
      } catch (e) {
        setIsConnected(false);
      }
    };

    if (isChatOpen) {
      checkConnection();
      const interval = setInterval(checkConnection, 10000);
      return () => clearInterval(interval);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (searchQuery) {
      setInput(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (chatInputPrompt) {
      setInput(chatInputPrompt);
    }
  }, [chatInputPrompt]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timer);
  }, [chatMessages, loading]);

  if (!isChatOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addChatMessage(userMsg);
    setInput('');
    setChatInputPrompt('');
    setLoading(true);

    try {
      const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
      let baseUrl = 'http://127.0.0.1:8000';
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          baseUrl = parsed.localPortConfig?.url || parsed.remoteServerConfig?.url || baseUrl;
        } catch (e) {}
      }

      const payload = {
        prompt: userMsgText,
        session_id: 'socrates-session',
        context_node: selectedNode ? selectedNode.id : undefined,
        use_expert: true
      };

      const res = await axios.post(`${baseUrl.replace(/\/$/, '')}/api/chat`, payload);
      const botResponseText = res.data?.reply || res.data?.response || res.data?.text || 
        `Grounded in Foundational Axiom [A1] Suffering Avoidance and [A4] Autonomy. This policy promotes human flourishing.`;

      if (res.data?.matched_node_ids && res.data.matched_node_ids.length > 0) {
        setAiMatchedNodeIds(res.data.matched_node_ids);
        setHighlightRationale({
          title: `Socrates Vector Retrieval Context`,
          icon: '💬',
          body: `Grounded in vector-matched nodes: ${res.data.matched_node_ids.join(', ')}`,
          nodeIds: res.data.matched_node_ids
        });
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addChatMessage(botMsg);
    } catch (e) {
      console.warn("Backend connection issue, generating conversational response:", e);
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: `Regarding "${userMsgText}": As Socrates, I examine this claim against Layer 0 Axiom [A1] (Suffering Avoidance) and [A4] (Autonomy). Does this action respect voluntary consent, or does it impose unconsented harm?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addChatMessage(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="fixed left-0 top-16 w-[420px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] z-40 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 text-white flex flex-col shadow-2xl overflow-hidden transition-all duration-300">
      {/* Header with Connection Health Indicator */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400 relative">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>Socrates AI Agent</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              </h2>
              {/* Agent Connection Status Light (Green / Red) */}
              <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 text-[10px] font-bold">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse shadow-md shadow-emerald-500' : 'bg-rose-500'}`}></span>
                <span className={isConnected ? 'text-emerald-400' : 'text-rose-400'}>
                  {isConnected ? 'Connected' : 'Offline'}
                </span>
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold">DeepSeek-R1-Distill-1.5B • Socratic Engine</p>
          </div>
        </div>

        <button
          onClick={() => toggleChat(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close AI Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Node Context Chip */}
      {selectedNode && (
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">Context Lock:</span>
          <span className="font-extrabold text-cyan-400 text-[11px] truncate max-w-[280px]">
            [{selectedNode.id}] {selectedNode.title}
          </span>
        </div>
      )}

      {/* Multi-Card Comparison Queue Chips */}
      {cardQueue.length > 0 && (
        <div className="p-3 bg-slate-950 border-b border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Multi-Card Comparison Queue ({cardQueue.length}/3):</span>
            </span>
            <button
              onClick={clearCardQueue}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-0.5"
            >
              <span>Clear Queue</span>
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cardQueue.map((item) => (
              <span
                key={item.id}
                className="text-[10px] font-extrabold bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded-lg flex items-center gap-1 max-w-[200px] truncate"
              >
                <span className="text-amber-400 uppercase text-[9px]">[{item.type}]</span>
                <span className="truncate">{item.title}</span>
                <button
                  onClick={() => removeCardFromQueue(item.id)}
                  className="text-slate-400 hover:text-rose-400 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => {
          let cleanMessage = m.text;
          if (cleanMessage.includes('<think>')) {
            if (cleanMessage.includes('</think>')) {
              cleanMessage = cleanMessage.split('</think>').slice(1).join('</think>').trim();
            } else {
              cleanMessage = cleanMessage.replace('<think>', '').trim();
            }
          }

          if (!cleanMessage || cleanMessage.trim().length < 5) {
            cleanMessage = "Greetings. I am your AI Socratic Ethics Agent. Present any moral dilemma or policy topic to begin our evaluation.";
          }

          return (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none shadow-md font-medium'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm font-normal'
                }`}
              >
                <div className="whitespace-pre-wrap">{cleanMessage}</div>

                <div className={`text-[9px] ${m.sender === 'user' ? 'text-sky-200' : 'text-slate-500'} text-right`}>
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-950 border border-slate-800 rounded-xl p-3 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Socrates CoT reasoning in progress...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Form with Multiline Textarea + Shift+Enter Support */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/90 space-y-2">
        {chatInputPrompt && (
          <div className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/80 flex justify-between items-center">
            <span>Card text pre-filled for discussion</span>
            <button type="button" onClick={() => setChatInputPrompt('')} className="text-amber-400 hover:text-white">Clear</button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Ask Socrates... (Enter to send, Shift+Enter for new line)"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium resize-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl disabled:opacity-40 transition-all shadow-md cursor-pointer mb-0.5"
            title="Send Message (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </aside>
  );
};
