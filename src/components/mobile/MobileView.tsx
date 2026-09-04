import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CONFIG } from '../../config';
import { useMoralityStore } from '../../store/useMoralityStore';
import { MobileGraphCanvas } from './MobileGraphCanvas';
import { SocraticMessageRenderer } from '../chat/SocraticMessageRenderer';
import {
  PARLIAMENTARY_BILLS,
  PARLIAMENTARY_SESSIONS,
  BILL_CATEGORIES,
  ParliamentaryBill
} from '../../data/parliamentaryBillsData';
import { SCHEME_DATASET, GovernmentScheme } from '../../data/schemesData';
import { ENRICHED_MORALITY_NODES, EnrichedMoralityNode } from '../../data/moralityNodesData';
import { NEWS_FEED_DATA } from '../../data/newsFeedData';
import { NewsTaskCard, TreeLens, MoralityNode } from '../../types/morality';
import {
  Bot,
  Compass,
  Newspaper,
  Sparkles,
  Send,
  Search,
  Layers,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Trash2,
  Copy,
  Check,
  Loader2,
  Building2,
  Scale,
  BookOpen,
  Users,
  ArrowRight,
  RotateCcw,
  Info,
  Radio,
  FileText,
  Activity,
  CheckCircle2,
  HelpCircle,
  Flame,
  ShieldAlert
} from 'lucide-react';
import axios from 'axios';

interface MobileViewProps {
  onExit?: () => void;
}

type FeedFilterType = 'all' | 'bills' | 'schemes' | 'news';

export const MobileView: React.FC<MobileViewProps> = ({ onExit }) => {
  // 3 Dedicated Screens: 'chat' | 'graph' | 'feed'
  const [activeTab, setActiveTab] = useState<'chat' | 'graph' | 'feed'>('graph');

  // Feed State
  const [feedFilter, setFeedFilter] = useState<FeedFilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedBillId, setExpandedBillId] = useState<string | null>(null);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  // Live News State
  const [liveNews, setLiveNews] = useState<NewsTaskCard[]>(NEWS_FEED_DATA);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatSubmitting, setIsChatSubmitting] = useState<boolean>(false);
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(true);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isInspectorDismissed, setIsInspectorDismissed] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const {
    selectedNode,
    setSelectedNode,
    treeLens,
    setTreeLens,
    chatMessages,
    addChatMessage,
    clearChatMessages,
    chatInputPrompt,
    setChatInputPrompt,
    setAiMatchedNodeIds,
    setHighlightRationale,
    connectionMode,
    isDarkMode
  } = useMoralityStore();

  // Enriched active selected node lookup
  const enrichedSelectedNode = useMemo<EnrichedMoralityNode | null>(() => {
    if (!selectedNode) return null;
    const found = ENRICHED_MORALITY_NODES.find(
      (n) => n.id.toLowerCase() === selectedNode.id.toLowerCase()
    );
    if (found) return found;

    // Fallback if node not in enriched array
    return {
      ...selectedNode,
      summary2Liner: selectedNode.summary || selectedNode.statement,
      lenses: {
        dilemmaTitle: 'Moral Derivation Context',
        dilemmaBody: selectedNode.statement,
        psychologyTitle: 'Psychological Stance',
        psychologyBody: 'Cognitive and behavioral implications of this principle.',
        psychologyBlindspots: ['Confirmation Bias', 'Outgroup Homogeneity'],
        constitutionTitle: 'Indian Constitutional Alignment',
        constitutionQuote: 'Fundamental democratic and moral liberties.',
        constitutionReachPct: 80,
        modernBuddhaExemplar: 'Civic Reformers',
        modernBuddhaStory: 'Applied ethical stewardship in public governance.',
        modernBuddhaLink: 'https://legislative.gov.in',
        criticTitle: 'Counter-Perspective',
        criticBody: 'Potential trade-offs and structural constraints.'
      }
    };
  }, [selectedNode]);

  // Fetch live news on mount
  useEffect(() => {
    const fetchLiveFeed = async () => {
      setIsLoadingNews(true);
      try {
        const primaryUrl = (CONFIG.BRAIN_API_URL || CONFIG.SENSE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        let res: any = null;
        try {
          res = await axios.get(`${primaryUrl}/api/feed?limit=10`, { timeout: 4500 });
        } catch {
          res = await axios.post(`${primaryUrl}/api/news/refresh`, { genre: 'all' }, { timeout: 4500 });
        }

        const rawStories = res?.data?.stories || res?.data?.news || [];
        if (rawStories.length > 0) {
          const formatted: NewsTaskCard[] = rawStories.map((s: any) => ({
            id: s.id || `news-${Math.random()}`,
            title: s.title || 'Untitled Breaking Story',
            date: s.date && !s.date.includes('Just now') ? s.date : new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            category: s.category || 'Live News',
            summary: s.summary || '',
            newsPublisher: s.newsPublisher || s.source || 'News Wire',
            newsUrl: s.newsUrl || s.link || '#',
            violatedNodes: s.violatedNodes || s.violated_nodes || s.linked_morality_nodes || [],
            violatedNodeTitles: s.violatedNodeTitles || s.violated_node_titles || [],
            upholderStance: s.upholderStance || s.upholder_stance || {
              headline: '🛡️ Rights Upholder',
              analysis: 'Safeguards fundamental human welfare and voluntary consent against unconsented policy harm.'
            },
            devilsAdvocateStance: s.devilsAdvocateStance || s.devilsStance || s.devils_stance || {
              headline: '😈 Policy Pragmatist',
              analysis: 'Considers short-term administrative feasibility and trade-offs in public execution.'
            }
          }));
          setLiveNews(formatted);
        } else {
          setLiveNews(NEWS_FEED_DATA);
        }
      } catch {
        setLiveNews(NEWS_FEED_DATA);
      } finally {
        setIsLoadingNews(false);
      }
    };
    fetchLiveFeed();
  }, []);

  // Health check for Socratic Agent Connection
  useEffect(() => {
    const checkConnection = async () => {
      if (connectionMode === 'offline') {
        setIsBackendHealthy(false);
        return;
      }
      try {
        const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
        let parsedSettings: any = null;
        if (savedSettings) {
          try {
            parsedSettings = JSON.parse(savedSettings);
          } catch (e) {}
        }
        const baseUrl =
          parsedSettings?.localPortConfig?.url && parsedSettings.mode === 'local_port'
            ? parsedSettings.localPortConfig.url
            : '';
        const endpoint = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/health` : '/api/health';
        const res = await axios.get(endpoint, { timeout: 2500 });
        setIsBackendHealthy(res.status === 200);
      } catch {
        setIsBackendHealthy(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 15000);
    return () => clearInterval(interval);
  }, [connectionMode]);

  // Sync external prompt triggers with chat input
  useEffect(() => {
    if (chatInputPrompt) {
      setChatInput(chatInputPrompt);
    }
  }, [chatInputPrompt]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      const timer = setTimeout(() => {
        chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [chatMessages, isChatSubmitting, activeTab]);

  // Copy message text helper
  const handleCopyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Switch to graph tab and select node
  const handleSelectNodeAndNavigate = (nodeId: string) => {
    const match = ENRICHED_MORALITY_NODES.find(
      (n) => n.id.toLowerCase() === nodeId.toLowerCase()
    );
    if (match) {
      setSelectedNode(match);
    } else {
      setSelectedNode({
        id: nodeId,
        title: nodeId,
        statement: `Principle [${nodeId}]`,
        layer: 0,
        parentIds: [],
        status: 'ratified'
      });
    }
    setActiveTab('graph');
  };

  // Quick Chat Send or Prompt execution
  const executeChatInquiry = async (promptText: string) => {
    if (!promptText.trim() || isChatSubmitting) return;

    setActiveTab('chat');
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addChatMessage(userMsg);
    setChatInput('');
    setChatInputPrompt('');
    setIsChatSubmitting(true);

    try {
      const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
      let parsedSettings: any = null;
      if (savedSettings) {
        try {
          parsedSettings = JSON.parse(savedSettings);
        } catch (err) {}
      }
      const baseUrl =
        parsedSettings?.localPortConfig?.url && parsedSettings.mode === 'local_port'
          ? parsedSettings.localPortConfig.url
          : CONFIG.BRAIN_API_URL;

      const payload = {
        prompt: promptText.trim(),
        session_id: 'socrates-mobile-session',
        context_node: selectedNode ? selectedNode.id : undefined,
        use_expert: true
      };

      const endpoint = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/chat` : '/api/chat';
      const res = await axios.post(endpoint, payload, { timeout: 45000 });
      const botResponseText =
        res.data?.reply || res.data?.response || res.data?.text || res.data?.error;

      if (!botResponseText) {
        throw new Error('No response received from Socratic Agent.');
      }

      if (res.data?.matched_node_ids && res.data.matched_node_ids.length > 0) {
        setAiMatchedNodeIds(res.data.matched_node_ids);
        setHighlightRationale({
          title: `Socrates Grounded Retrieval`,
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
      setIsBackendHealthy(true);
    } catch (err: any) {
      console.error('AI Chat Error:', err);
      setIsBackendHealthy(false);
      const errDetails =
        err.response?.data?.error || err.message || 'Connection timeout or agent offline';
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: `⚠️ [Socrates Offline / Error]: ${errDetails}\n\nPlease check your internet connection or Gemini API settings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addChatMessage(errorMsg);
    } finally {
      setIsChatSubmitting(false);
    }
  };

  const handleSendChatForm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (chatInput.trim()) {
      executeChatInquiry(chatInput);
    }
  };

  // Filtered Unified Feed Data
  const filteredFeedData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // 1. Parliamentary Bills
    const bills = PARLIAMENTARY_BILLS.filter((b) => {
      if (feedFilter !== 'all' && feedFilter !== 'bills') return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        (b.short_name && b.short_name.toLowerCase().includes(q)) ||
        b.ministry.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.linked_morality_nodes.some((n) => n.toLowerCase().includes(q))
      );
    });

    // 2. Civic Schemes
    const schemes = SCHEME_DATASET.filter((s) => {
      if (feedFilter !== 'all' && feedFilter !== 'schemes') return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.hindiName && s.hindiName.toLowerCase().includes(q)) ||
        s.ministry.toLowerCase().includes(q) ||
        s.officialClaim.toLowerCase().includes(q) ||
        s.cagAuditFindings.some((c) => c.finding.toLowerCase().includes(q)) ||
        s.moralityViolations.some((v) => v.toLowerCase().includes(q))
      );
    });

    // 3. News Feed
    const newsPool = liveNews.length > 0 ? liveNews : NEWS_FEED_DATA;
    const news = newsPool.filter((n) => {
      if (feedFilter !== 'all' && feedFilter !== 'news') return false;
      if (!q) return true;
      return (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        (n.newsPublisher && n.newsPublisher.toLowerCase().includes(q)) ||
        n.violatedNodes?.some((v) => v.toLowerCase().includes(q))
      );
    });

    return { bills, schemes, news, totalCount: bills.length + schemes.length + news.length };
  }, [feedFilter, searchQuery, liveNews]);

  // Status Badge Helper for Bills
  const getBillStatusBadge = (status: string) => {
    if (status.includes('Enacted') || status.includes('Presidential')) {
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
    }
    if (status.includes('Passed')) {
      return 'bg-sky-950/80 text-sky-300 border-sky-800';
    }
    if (status.includes('Committee') || status.includes('Review')) {
      return 'bg-amber-950/80 text-amber-300 border-amber-800';
    }
    return 'bg-purple-950/80 text-purple-300 border-purple-800';
  };

  // Node Layer Color Helper for Inspector
  const getNodeColorClass = (layer?: number) => {
    switch (layer) {
      case -1:
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 0:
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 1:
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      case 2:
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 3:
        return 'bg-teal-950 text-teal-300 border-teal-800';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-700';
    }
  };

  // Quick Chat Prompts presets
  const quickChatPrompts = [
    {
      title: '🏛️ Digital Privacy & Puttaswamy',
      prompt: 'Is AI mass facial surveillance constitutional under Article 21 and the Puttaswamy privacy doctrine?'
    },
    {
      title: '🌾 Agrarian Equity & PM-KISAN',
      prompt: 'Analyze PM-KISAN direct benefit transfers vs the exclusion of landless tenant sharecroppers.'
    },
    {
      title: '🌿 3 Minimal Origin Primitives',
      prompt: 'Explain how Non-Harm (P1), Agency (P2), and Equity (P3) generate the entire morality graph.'
    },
    {
      title: '⚖️ Waqf Amendment Bill Debate',
      prompt: 'Evaluate the Waqf Amendment Bill 2024 through the lenses of property rights, state regulation, and religious freedom.'
    }
  ];

  return (
    <div className="w-full h-full min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between font-sans select-none overflow-x-hidden">
      {/* ========================================================================= */}
      {/* TOP STATUS BAR & HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-stone-950/95 border-b border-amber-900/30 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            <Bot className="w-4 h-4 text-stone-950 font-black" />
          </div>
          <div>
            <h1 className="text-xs font-black tracking-wide text-amber-100 uppercase flex items-center gap-1.5">
              <span>Morality Tracker</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800">
                v2.6
              </span>
            </h1>
            <p className="text-[10px] text-stone-400 font-medium">
              {activeTab === 'chat' && '🤖 Socrates Philosophical Dialogue'}
              {activeTab === 'graph' && '🗺️ 34-Node Multilayer Axiomatic Graph'}
              {activeTab === 'feed' && '📰 26 Bills, Civic Schemes & Live Feed'}
            </p>
          </div>
        </div>

        {/* Status Indicators & Reset / Exit */}
        <div className="flex items-center gap-1.5">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              isBackendHealthy
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                : 'bg-rose-950/80 text-rose-300 border-rose-800'
            }`}
            title={isBackendHealthy ? 'Socrates Engine Connected' : 'Socrates Engine Offline'}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isBackendHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span className="hidden sm:inline">{isBackendHealthy ? 'Active' : 'Offline'}</span>
          </div>

          {onExit && (
            <button
              onClick={onExit}
              className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white text-[11px] font-bold border border-stone-800"
              title="Exit Mobile View"
            >
              Exit
            </button>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN SCREEN ROUTER */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col pb-20">
        {/* --------------------------------------------------------------------- */}
        {/* SCREEN 1: 'chat' (Socrates AI Dialogue) */}
        {/* --------------------------------------------------------------------- */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between px-3 pt-3">
            {/* Active Context Banner if Node Selected */}
            {selectedNode && (
              <div className="mb-2.5 p-2 rounded-xl bg-amber-950/50 border border-amber-800/60 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-stone-950 px-1.5 py-0.5 rounded border border-amber-900/60">
                    [{selectedNode.id}]
                  </span>
                  <span className="text-xs font-bold text-amber-200 truncate">
                    {selectedNode.title}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('graph')}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-800/60 text-amber-200 hover:bg-amber-700 flex items-center gap-0.5"
                  >
                    <span>View Node</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1 rounded text-stone-400 hover:text-stone-200 hover:bg-stone-900"
                    title="Clear node context"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-[380px] max-h-[calc(100vh-250px)]">
              {chatMessages.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                    <Bot className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-sm font-black text-amber-200">Socrates Vetting Dialogue</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                    Test any public policy, constitutional right, or ethical claim against foundational
                    axioms.
                  </p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-bold text-stone-400">
                        {msg.sender === 'user' ? '👤 You' : '🤖 Socrates'}
                      </span>
                      <span className="text-[9px] text-stone-500 font-mono">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`relative max-w-[92%] rounded-2xl p-3 shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-amber-950/80 border border-amber-700/60 text-amber-100 rounded-tr-sm'
                          : 'bg-stone-900/90 border border-amber-900/40 text-stone-200 rounded-tl-sm'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      ) : (
                        <div className="text-xs leading-relaxed">
                          <SocraticMessageRenderer
                            content={msg.text}
                            sender="bot"
                            messageId={msg.id}
                            showTreeButton={true}
                            showTensionMeter={true}
                          />
                        </div>
                      )}

                      {/* Copy Message Action */}
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="absolute top-2 right-2 p-1 rounded bg-stone-950/60 hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors opacity-60 hover:opacity-100"
                        title="Copy text"
                      >
                        {copiedMsgId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Submitting Loading Spinner */}
              {isChatSubmitting && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-900/80 border border-amber-900/40 max-w-[85%]">
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                  <span className="text-xs text-amber-300 font-semibold animate-pulse">
                    Socrates is deducing axiomatic derivations...
                  </span>
                </div>
              )}

              <div ref={chatScrollRef} />
            </div>

            {/* Quick Prompt Carousel */}
            <div className="mt-3 pt-2 border-t border-stone-800/80">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Quick Inquiries</span>
                </span>
                {chatMessages.length > 0 && (
                  <button
                    onClick={clearChatMessages}
                    className="text-[10px] text-stone-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {quickChatPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeChatInquiry(p.prompt)}
                    className="shrink-0 px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-amber-900/30 text-[11px] font-semibold transition-all shadow-sm active:scale-95 text-left"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendChatForm} className="mt-1 flex items-center gap-1.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  selectedNode
                    ? `Ask Socrates about [${selectedNode.id}]...`
                    : 'Type a moral or policy question...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-900 border border-amber-900/50 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatSubmitting}
                className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 font-black flex items-center justify-center transition-all active:scale-95 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* SCREEN 2: 'graph' (Interactive Graph & Compact Inspector) */}
        {/* --------------------------------------------------------------------- */}
        {activeTab === 'graph' && (
          <div className="flex-1 flex flex-col px-3 pt-2.5 space-y-3">
            {/* Interactive Graph Canvas */}
            <div className="w-full">
              <MobileGraphCanvas
                isInspectorDismissed={isInspectorDismissed}
                onNodeSelect={(node) => {
                  setSelectedNode(node);
                  setIsInspectorDismissed(false);
                }}
              />
            </div>

            {/* Compact Selected Node Inspector Card */}
            {enrichedSelectedNode ? (
              !isInspectorDismissed ? (
                <div className="rounded-2xl bg-stone-900/90 border border-amber-900/50 p-3.5 shadow-xl space-y-3">
                  {/* Node Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded border ${getNodeColorClass(
                            enrichedSelectedNode.layer
                          )}`}
                        >
                          [{enrichedSelectedNode.id}]
                        </span>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {enrichedSelectedNode.layer === -1
                            ? '🌟 Minimal Origin Primitive'
                            : `Layer ${enrichedSelectedNode.layer} Axiom`}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-stone-100 leading-snug">
                        {enrichedSelectedNode.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setIsInspectorDismissed(true)}
                      className="px-2 py-1 rounded-lg text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 text-xs flex items-center gap-1 font-bold border border-stone-700 shadow transition active:scale-95"
                      title="Dismiss description to view centered node and highlighted cluster on graph"
                    >
                      <span className="text-[10px]">Close</span>
                      <span className="text-sm leading-none">×</span>
                    </button>
                  </div>

                {/* Active Lens Statement */}
                <div className="p-2.5 rounded-xl bg-stone-950/70 border border-amber-900/30">
                  <div className="flex items-center justify-between text-[10px] font-bold text-amber-400 uppercase mb-1">
                    <span>
                      {treeLens === 'moral' && '🌿 Axiomatic Moral Statement'}
                      {treeLens === 'action' && '⚡ Practical Action Directive'}
                      {treeLens === 'psychology' && '🧠 Psychological Foundation'}
                    </span>
                    <span className="text-stone-400 font-mono text-[9px]">
                      {treeLens.toUpperCase()} LENS
                    </span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {treeLens === 'moral' && enrichedSelectedNode.statement}
                    {treeLens === 'action' &&
                      (enrichedSelectedNode.actionStatement ||
                        enrichedSelectedNode.actionTitle ||
                        enrichedSelectedNode.statement)}
                    {treeLens === 'psychology' &&
                      (enrichedSelectedNode.psychologyStatement ||
                        enrichedSelectedNode.psychologyTitle ||
                        enrichedSelectedNode.statement)}
                  </p>
                </div>

                {/* Panchatantra Narrative Anchor Parable */}
                {enrichedSelectedNode.lenses?.parableAnchor ? (
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-950/40 to-stone-950 border border-amber-800/50 shadow-inner space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-400" />
                        <span>📖 {enrichedSelectedNode.lenses.parableAnchor.title}</span>
                      </span>
                      <span className="text-[9px] font-mono text-stone-400">
                        {enrichedSelectedNode.lenses.parableAnchor.source}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 italic leading-relaxed">
                      "{enrichedSelectedNode.lenses.parableAnchor.story}"
                    </p>
                    <div className="pt-1 border-t border-amber-900/30">
                      <span className="text-[10px] font-extrabold text-amber-400">
                        💡 Moral Principle:{' '}
                      </span>
                      <span className="text-[11px] text-amber-200 font-medium">
                        {enrichedSelectedNode.lenses.parableAnchor.moralOneLiner}
                      </span>
                    </div>
                  </div>
                ) : (
                  enrichedSelectedNode.lenses?.dilemmaBody && (
                    <div className="p-2.5 rounded-xl bg-stone-950/50 border border-stone-800">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">
                        💡 Real-World Dilemma:
                      </span>
                      <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                        {enrichedSelectedNode.lenses.dilemmaBody}
                      </p>
                    </div>
                  )
                )}

                {/* Constitutional Article Link */}
                {enrichedSelectedNode.lenses?.constitutionTitle && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950/60 border border-stone-800 text-xs">
                    <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-stone-300 truncate">
                        {enrichedSelectedNode.lenses.constitutionTitle}
                      </p>
                      {enrichedSelectedNode.lenses.constitutionQuote && (
                        <p className="text-[10px] text-stone-400 truncate italic">
                          "{enrichedSelectedNode.lenses.constitutionQuote}"
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons: Ask Socrates & Related */}
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const inquiryPrompt = `Conduct a comprehensive Socratic examination of node [${enrichedSelectedNode.id}] ${enrichedSelectedNode.title}. What are its primary derivation paths, constitutional protections, and real-world policy dilemmas?`;
                      executeChatInquiry(inquiryPrompt);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask Socrates about [{enrichedSelectedNode.id}]</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedNode(null);
                      setIsInspectorDismissed(false);
                    }}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all"
                  >
                    Reset Focus
                  </button>
                </div>
              </div>
            ) : (
              /* Compact Floating Bar when Description is Dismissed: Graph Stays Centered, Zoomed Out, and Highlighted! */
              <div className="rounded-2xl bg-stone-900/95 border border-amber-900/50 p-2.5 px-3.5 shadow-xl flex items-center justify-between gap-2 backdrop-blur-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded border shrink-0 ${getNodeColorClass(
                      enrichedSelectedNode.layer
                    )}`}
                  >
                    [{enrichedSelectedNode.id}]
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-stone-100 truncate">
                      {enrichedSelectedNode.title}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-semibold truncate">
                      ✦ Centered &amp; all related derivation nodes highlighted
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsInspectorDismissed(false)}
                    className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow transition active:scale-95 flex items-center gap-1 cursor-pointer"
                    title="View full description and Panchatantra parable"
                  >
                    <span>📖</span>
                    <span>Details</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNode(null);
                      setIsInspectorDismissed(false);
                    }}
                    className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white text-xs transition cursor-pointer"
                    title="Reset focus to overview"
                  >
                    ×
                  </button>
                </div>
              </div>
            )
          ) : (
              /* Starter Prompt & 3-Primitives Selector */
              <div className="rounded-2xl bg-stone-900/70 border border-stone-800 p-3.5 text-center space-y-2.5">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Interactive Node Explorer</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Tap any node in the graph above to inspect its 3 lenses, Panchatantra parable, and
                  constitutional derivations.
                </p>

                {/* 3 Primitives Quick Access */}
                <div className="pt-1 grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleSelectNodeAndNavigate('P1_HARM')}
                    className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/70 hover:bg-emerald-900/60 text-left transition-all active:scale-95"
                  >
                    <span className="text-[9px] font-mono font-bold text-emerald-400">[P1]</span>
                    <h5 className="text-[11px] font-extrabold text-emerald-200 truncate">Non-Harm</h5>
                    <p className="text-[9px] text-emerald-400/80 truncate">Suffering avoidance</p>
                  </button>

                  <button
                    onClick={() => handleSelectNodeAndNavigate('P2_AGENCY')}
                    className="p-2 rounded-xl bg-sky-950/60 border border-sky-800/70 hover:bg-sky-900/60 text-left transition-all active:scale-95"
                  >
                    <span className="text-[9px] font-mono font-bold text-sky-400">[P2]</span>
                    <h5 className="text-[11px] font-extrabold text-sky-200 truncate">Agency</h5>
                    <p className="text-[9px] text-sky-400/80 truncate">Consent & liberty</p>
                  </button>

                  <button
                    onClick={() => handleSelectNodeAndNavigate('P3_EQUITY')}
                    className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/70 hover:bg-amber-900/60 text-left transition-all active:scale-95"
                  >
                    <span className="text-[9px] font-mono font-bold text-amber-400">[P3]</span>
                    <h5 className="text-[11px] font-extrabold text-amber-200 truncate">Equity</h5>
                    <p className="text-[9px] text-amber-400/80 truncate">Impartial justice</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* SCREEN 3: 'feed' (Unified Latest Feed: Bills, Schemes, News) */}
        {/* --------------------------------------------------------------------- */}
        {activeTab === 'feed' && (
          <div className="flex-1 flex flex-col px-3 pt-2.5 space-y-3">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 26 Bills, Civic Schemes & News..."
                className="w-full pl-8 pr-8 py-2 rounded-xl bg-stone-900 border border-amber-900/40 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setFeedFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  feedFilter === 'all'
                    ? 'bg-amber-600 text-stone-950 shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                All ({filteredFeedData.totalCount})
              </button>
              <button
                onClick={() => setFeedFilter('bills')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  feedFilter === 'bills'
                    ? 'bg-amber-600 text-stone-950 shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <span>📜</span>
                <span>Bills ({filteredFeedData.bills.length})</span>
              </button>
              <button
                onClick={() => setFeedFilter('schemes')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  feedFilter === 'schemes'
                    ? 'bg-amber-600 text-stone-950 shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <span>🌾</span>
                <span>Schemes ({filteredFeedData.schemes.length})</span>
              </button>
              <button
                onClick={() => setFeedFilter('news')}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  feedFilter === 'news'
                    ? 'bg-amber-600 text-stone-950 shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <span>⚡</span>
                <span>News ({filteredFeedData.news.length})</span>
              </button>
            </div>

            {/* Unified Feed Stream */}
            <div className="space-y-3">
              {/* 1. Parliamentary Bills */}
              {filteredFeedData.bills.map((bill) => {
                const isExpanded = expandedBillId === bill.id;
                return (
                  <div
                    key={bill.id}
                    className="p-3 rounded-2xl bg-stone-900/90 border border-sky-900/40 hover:border-sky-700/60 shadow-md space-y-2 transition-all"
                  >
                    {/* Bill Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1 mb-1">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                            {bill.session}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getBillStatusBadge(
                              bill.status
                            )}`}
                          >
                            {bill.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-stone-100 leading-snug">
                          {bill.title}
                        </h4>
                        <p className="text-[10px] text-stone-400">{bill.ministry}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                      {bill.summary}
                    </p>

                    {/* Expandable Provisions & Arguments */}
                    {isExpanded && (
                      <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
                        {bill.key_provisions && bill.key_provisions.length > 0 && (
                          <div className="p-2 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1">
                            <span className="text-[10px] font-bold text-amber-400 uppercase">
                              Key Statutory Provisions:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-stone-300 text-[11px]">
                              {bill.key_provisions.slice(0, 3).map((p, idx) => (
                                <li key={idx} className="truncate">
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                            <span className="text-[9px] font-bold text-emerald-400 uppercase">
                              Proponents:
                            </span>
                            <p className="text-stone-300 line-clamp-3 mt-0.5">
                              {bill.proponents_argument}
                            </p>
                          </div>
                          <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-900/40">
                            <span className="text-[9px] font-bold text-rose-400 uppercase">
                              Opponents:
                            </span>
                            <p className="text-stone-300 line-clamp-3 mt-0.5">
                              {bill.opponents_argument}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Linked Morality Nodes Chips */}
                    {bill.linked_morality_nodes && bill.linked_morality_nodes.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        <span className="text-[9px] text-stone-500 font-bold uppercase">Nodes:</span>
                        {bill.linked_morality_nodes.slice(0, 4).map((nodeId) => (
                          <button
                            key={nodeId}
                            onClick={() => handleSelectNodeAndNavigate(nodeId)}
                            className="px-1.5 py-0.5 rounded bg-stone-950 hover:bg-amber-950 text-[9px] font-mono font-bold text-amber-400 border border-amber-900/40 transition-colors"
                          >
                            [{nodeId}]
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Actions: Toggle Details & 1-Click Socrates Debate */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setExpandedBillId(isExpanded ? null : bill.id)}
                        className="text-[11px] font-bold text-stone-400 hover:text-stone-200 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Less' : 'Provisions & Stances'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          const debatePrompt =
                            bill.socratic_debate_prompt ||
                            `Debate the ethical and constitutional trade-offs of the '${bill.title}' in the Indian Parliament.`;
                          executeChatInquiry(debatePrompt);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-black text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                      >
                        <Bot className="w-3 h-3" />
                        <span>Debate with Socrates</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* 2. Civic Schemes & CAG Audits */}
              {filteredFeedData.schemes.map((scheme) => {
                const isExpanded = expandedSchemeId === scheme.id;
                const topAudit = scheme.cagAuditFindings?.[0];
                return (
                  <div
                    key={scheme.id}
                    className="p-3 rounded-2xl bg-stone-900/90 border border-amber-900/40 hover:border-amber-700/60 shadow-md space-y-2 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Civic Scheme
                          </span>
                          <span className="text-[9px] text-stone-400 font-mono">
                            {scheme.annualBudget}
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-stone-100 leading-snug">
                          {scheme.name}
                        </h4>
                        {scheme.hindiName && (
                          <p className="text-[10px] text-amber-400/80 font-medium">
                            {scheme.hindiName}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">{scheme.officialClaim}</p>

                    {/* CAG Audit Finding Callout */}
                    {topAudit && (
                      <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-rose-300 uppercase flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            <span>CAG Audit Finding ({topAudit.reportYear})</span>
                          </span>
                          <span className="text-[9px] font-mono text-rose-400 font-bold">
                            Severity: {(topAudit.gapSeverity * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-xs text-rose-200 leading-relaxed font-medium">
                          {topAudit.finding}
                        </p>
                        {topAudit.financialDisparity && (
                          <p className="text-[10px] text-rose-300/80 font-mono">
                            Disparity: {topAudit.financialDisparity}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Morality Violations */}
                    {scheme.moralityViolations && scheme.moralityViolations.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        <span className="text-[9px] text-stone-500 font-bold uppercase">
                          Axiom Risks:
                        </span>
                        {scheme.moralityViolations.map((v) => (
                          <button
                            key={v}
                            onClick={() => handleSelectNodeAndNavigate(v)}
                            className="px-1.5 py-0.5 rounded bg-stone-950 hover:bg-rose-950 text-[9px] font-mono font-bold text-rose-300 border border-rose-900/40"
                          >
                            [{v}]
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Actions: Audit with Socrates */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-stone-400">{scheme.ministry}</span>
                      <button
                        onClick={() => {
                          const auditPrompt = `Conduct an in-depth Socratic CAG audit of '${scheme.name}'. Examine its official claims against the audit finding: "${topAudit?.finding || ''}".`;
                          executeChatInquiry(auditPrompt);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-black text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                      >
                        <Bot className="w-3 h-3" />
                        <span>Audit with Socrates</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* 3. Live News Feed */}
              {filteredFeedData.news.map((newsItem) => {
                const isExpanded = expandedNewsId === newsItem.id;
                return (
                  <div
                    key={newsItem.id}
                    className="p-3 rounded-2xl bg-stone-900/90 border border-purple-900/40 hover:border-purple-700/60 shadow-md space-y-2 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                            {newsItem.category || 'Live News'}
                          </span>
                          <span className="text-[9px] text-stone-400 font-mono">{newsItem.date}</span>
                        </div>
                        <h4 className="text-xs font-extrabold text-stone-100 leading-snug">
                          {newsItem.title}
                        </h4>
                        <p className="text-[10px] text-stone-400">{newsItem.newsPublisher}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">{newsItem.summary}</p>

                    {/* Stances */}
                    {isExpanded && (
                      <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
                        {newsItem.upholderStance && (
                          <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                            <span className="text-[10px] font-bold text-emerald-400">
                              {newsItem.upholderStance.headline}
                            </span>
                            <p className="text-stone-300 text-[11px] mt-0.5">
                              {newsItem.upholderStance.analysis}
                            </p>
                          </div>
                        )}
                        {newsItem.devilsAdvocateStance && (
                          <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-900/40">
                            <span className="text-[10px] font-bold text-amber-400">
                              {newsItem.devilsAdvocateStance.headline}
                            </span>
                            <p className="text-stone-300 text-[11px] mt-0.5">
                              {newsItem.devilsAdvocateStance.analysis}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Violated Nodes */}
                    {newsItem.violatedNodes && newsItem.violatedNodes.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap pt-1">
                        <span className="text-[9px] text-stone-500 font-bold uppercase">Nodes:</span>
                        {newsItem.violatedNodes.map((v) => (
                          <button
                            key={v}
                            onClick={() => handleSelectNodeAndNavigate(v)}
                            className="px-1.5 py-0.5 rounded bg-stone-950 hover:bg-purple-950 text-[9px] font-mono font-bold text-purple-300 border border-purple-900/40"
                          >
                            [{v}]
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Actions: Analyze with Socrates */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setExpandedNewsId(isExpanded ? null : newsItem.id)}
                        className="text-[11px] font-bold text-stone-400 hover:text-stone-200 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Less' : 'View Stances'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          const newsPrompt = `Socrates, let's debate the ethical implications of this breaking news: '${newsItem.title}'. Summary: ${newsItem.summary}. Which fundamental moral axioms and constitutional rights are in conflict?`;
                          if (newsItem.violatedNodes && newsItem.violatedNodes.length > 0) {
                            setAiMatchedNodeIds(newsItem.violatedNodes);
                          }
                          executeChatInquiry(newsPrompt);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                      >
                        <Bot className="w-3 h-3" />
                        <span>⚔️ Debate with Socrates</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredFeedData.totalCount === 0 && (
                <div className="py-12 text-center">
                  <p className="text-xs text-stone-400">No matching bills, schemes, or news found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* FIXED BOTTOM NAVIGATION DOCK (48px+ Touch Targets) */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 border-t border-amber-900/40 backdrop-blur-lg pb-safe">
        <div className="w-full max-w-lg mx-auto h-14 grid grid-cols-3 items-stretch px-2">
          {/* Tab 1: Socrates Chat */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-all select-none cursor-pointer ${
              activeTab === 'chat'
                ? 'text-amber-400 font-extrabold'
                : 'text-stone-400 hover:text-stone-200 font-semibold'
            }`}
          >
            <div className="relative">
              <Bot className={`w-5 h-5 ${activeTab === 'chat' ? 'text-amber-400 scale-110' : ''}`} />
              {chatMessages.length > 1 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>
            <span className="text-[11px] tracking-tight">Socrates</span>
          </button>

          {/* Tab 2: Graph & Inspect */}
          <button
            onClick={() => setActiveTab('graph')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-all select-none cursor-pointer ${
              activeTab === 'graph'
                ? 'text-amber-400 font-extrabold'
                : 'text-stone-400 hover:text-stone-200 font-semibold'
            }`}
          >
            <div className="relative">
              <Compass
                className={`w-5 h-5 ${activeTab === 'graph' ? 'text-amber-400 scale-110' : ''}`}
              />
              {selectedNode && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-[11px] tracking-tight">Graph & Inspect</span>
          </button>

          {/* Tab 3: Civic Feed */}
          <button
            onClick={() => setActiveTab('feed')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-all select-none cursor-pointer ${
              activeTab === 'feed'
                ? 'text-amber-400 font-extrabold'
                : 'text-stone-400 hover:text-stone-200 font-semibold'
            }`}
          >
            <Newspaper
              className={`w-5 h-5 ${activeTab === 'feed' ? 'text-amber-400 scale-110' : ''}`}
            />
            <span className="text-[11px] tracking-tight">Civic Feed</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileView;
