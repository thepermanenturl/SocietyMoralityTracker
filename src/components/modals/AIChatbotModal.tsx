import React, { useState, useEffect, useRef } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Send, Bot, User, Sparkles, Loader2, Layers, Trash2, BrainCircuit, Copy, Check } from 'lucide-react';
import axios from 'axios';
import { CONFIG } from '../../config';
import { SocraticMessageRenderer } from '../chat/SocraticMessageRenderer';

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
    addChatMessage,
    isDarkMode
  } = useMoralityStore();

  const messages = chatMessages;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Connection health check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
        let parsedSettings: any = null;
        if (savedSettings) {
          try {
            parsedSettings = JSON.parse(savedSettings);
          } catch (e) {}
        }
        const baseUrl = parsedSettings?.localPortConfig?.url && parsedSettings.mode === 'local_port' ? parsedSettings.localPortConfig.url : '';
        const endpoint = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/health` : '/api/health';
        const res = await axios.get(endpoint, { timeout: 2500 });
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
      let parsedSettings: any = null;
      if (savedSettings) {
        try {
          parsedSettings = JSON.parse(savedSettings);
        } catch (e) {}
      }
      const baseUrl = (parsedSettings?.localPortConfig?.url && parsedSettings.mode === 'local_port') 
        ? parsedSettings.localPortConfig.url 
        : CONFIG.BRAIN_API_URL;

      const payload = {
        prompt: userMsgText,
        session_id: 'socrates-session',
        context_node: selectedNode ? selectedNode.id : undefined,
        use_expert: true
      };

      const endpoint = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/chat` : '/api/chat';
      const res = await axios.post(endpoint, payload, { timeout: 45000 });
      const botResponseText = res.data?.reply || res.data?.response || res.data?.text || res.data?.error;

      if (!botResponseText) {
        throw new Error("No response generated from AI reflection service.");
      }

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
      setIsConnected(true);
    } catch (e: any) {
      console.error("AI call failed:", e);
      setIsConnected(false);
      const errDetails = e.response?.data?.error || e.message || 'Connection timeout or offline';
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: `⚠️ [Socrates Offline / Error]: ${errDetails}\n\nPlease verify network connection or Gemini API key settings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addChatMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={`fixed top-16 left-0 w-full max-w-full sm:w-[440px] h-[calc(100vh-64px)] ${isDarkMode ? 'bg-stone-900/95 border-amber-900/40 text-stone-100' : 'bg-[#f0ece4]/95 border-orange-900/25 text-stone-900'} backdrop-blur-xl border-r z-50 flex flex-col shadow-2xl transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-amber-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-950/80 border border-amber-800 rounded-lg text-amber-400 relative">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5 font-serif-axiom">
                <span>Socrates AI Agent</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              </h2>
              {/* Agent Connection Status Light */}
              <span className="flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded-full border border-amber-900/40 text-[10px] font-bold">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse shadow-md shadow-emerald-500' : 'bg-rose-500'}`}></span>
                <span className={isConnected ? 'text-emerald-400' : 'text-rose-400'}>
                  {isConnected ? 'Online' : 'Offline'}
                </span>
              </span>
            </div>
            <p className="text-[10px] text-amber-400 font-semibold">Gemini 1.5 Flash • Socratic Reasoning Engine</p>
          </div>
        </div>

        <button
          onClick={() => toggleChat(false)}
          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Close AI Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Node Context Chip */}
      {selectedNode && (
        <div className="px-4 py-2 bg-stone-950 border-b border-amber-900/30 text-xs flex items-center justify-between">
          <span className="text-stone-400 text-[10px]">Context Lock:</span>
          <span className="font-extrabold text-amber-400 text-[11px] truncate max-w-[280px]">
            [{selectedNode.id}] {selectedNode.title}
          </span>
        </div>
      )}

      {/* Multi-Card Comparison Queue Chips */}
      {cardQueue.length > 0 && (
        <div className="p-3 bg-stone-950 border-b border-amber-900/30 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-amber-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Multi-Card Comparison Queue ({cardQueue.length}/3):</span>
            </span>
            <button
              onClick={clearCardQueue}
              className="text-stone-400 hover:text-rose-400 flex items-center gap-0.5"
            >
              <span>Clear Queue</span>
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cardQueue.map((item) => (
              <span
                key={item.id}
                className="text-[10px] font-extrabold bg-stone-900 border border-amber-900/40 text-stone-200 px-2 py-1 rounded-lg flex items-center gap-1 max-w-[200px] truncate"
              >
                <span className="text-amber-400 uppercase text-[9px]">[{item.type}]</span>
                <span className="truncate">{item.title}</span>
                <button
                  onClick={() => removeCardFromQueue(item.id)}
                  className="text-stone-400 hover:text-rose-400 ml-1"
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
                <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="max-w-[88%]">
                <SocraticMessageRenderer
                  content={cleanMessage}
                  sender={m.sender}
                  timestamp={m.timestamp}
                  messageId={m.id}
                  showTreeButton={true}
                  showTensionMeter={true}
                  onCopy={(text) => handleCopy(m.id, text)}
                />
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-800 border border-amber-900/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-stone-950 border border-amber-900/40 rounded-xl p-3 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Socrates CoT reasoning in progress...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Form with Multiline Textarea + Shift+Enter Support */}
      <form onSubmit={handleSend} className="p-3 border-t border-amber-900/30 bg-stone-950/90 space-y-2">
        {!isConnected && (
          <div className="text-[11px] text-amber-400 bg-amber-950/70 px-3 py-1.5 rounded-lg border border-amber-800/80 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Socrates AI Engine is ready for ethical dialogue.</span>
          </div>
        )}
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
            disabled={loading}
            placeholder="Ask Socrates... (Enter to send, Shift+Enter for new line)"
            className="flex-1 rounded-xl px-3 py-2 text-xs font-medium resize-none transition-all bg-stone-900 border border-amber-900/40 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`p-2.5 rounded-xl transition-all shadow-md mb-0.5 ${
              input.trim() && !loading
                ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer shadow-amber-950/50'
                : 'bg-stone-800 text-stone-500 opacity-50 cursor-not-allowed'
            }`}
            title="Send Message (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </aside>
  );
};
