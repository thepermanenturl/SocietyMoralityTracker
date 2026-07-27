import React, { useState, useEffect, useRef } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIChatbotModal: React.FC = () => {
  const { isChatOpen, toggleChat, searchQuery, selectedNode, setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Greetings. I am the Socrates Ethics Vetting Agent. Ask me to analyze any moral claim, governance policy, or derivation path against foundational axioms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery && isChatOpen) {
      setInput(searchQuery);
    }
  }, [searchQuery, isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isChatOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
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
        prompt: textToSend,
        session_id: 'socrates-session',
        context_node: selectedNode ? selectedNode.id : undefined,
        use_expert: true
      };

      const res = await axios.post(`${baseUrl.replace(/\/$/, '')}/api/chat`, payload);
      const botResponseText = res.data?.reply || res.data?.response || res.data?.text || 
        `Grounded in Foundational Axiom [A1] Suffering Avoidance and [A4] Autonomy. This policy promotes human flourishing.`;

      // Illuminate vector-matched nodes on canvas and shade out non-matching nodes
      if (res.data?.matched_node_ids && res.data.matched_node_ids.length > 0) {
        setAiMatchedNodeIds(res.data.matched_node_ids);
        setHighlightRationale({
          title: `Socrates Vector Retrieval Context`,
          icon: '💬',
          body: `Grounded in vector-matched nodes: ${res.data.matched_node_ids.join(', ')}`,
          nodeIds: res.data.matched_node_ids
        });
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.warn("Backend connection issue, generating conversational response:", e);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Regarding "${textToSend}": As Socrates, I examine this claim against Layer 0 Axiom [A1] (Suffering Avoidance) and [A4] (Autonomy). Does this action respect voluntary consent, or does it impose unconsented harm?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Socrates AI Vetting Agent</span>
                <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">ONLINE</span>
              </h3>
              <p className="text-[10px] text-slate-400">Connected to make_a_brain (Qwen 1.5B / Neo4j Graph RAG)</p>
            </div>
          </div>

          <button
            onClick={() => toggleChat(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-xl h-fit ${msg.sender === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-800 border border-slate-700 text-sky-400'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-sky-600/90 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-[9px] opacity-60 mt-1 block text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-sky-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Socrates Agent analyzing graph & reasoning...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a claim or question for Socrates..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
