import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { NEWS_FEED_DATA } from '../../data/newsFeedData';
import { X, RefreshCw, ExternalLink, Filter, History, Zap, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export const NewsFeedDrawer: React.FC = () => {
  const {
    activeDrawer,
    setActiveDrawer,
    selectedNode,
    setAiMatchedNodeIds,
    setHighlightRationale,
    setChatInputPrompt,
    toggleChat,
    isPulseNotificationDismissed,
    dismissPulseNotification,
    isDarkMode
  } = useMoralityStore();

  const [activeTab, setActiveTab] = useState<'historical' | 'live'>('historical');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isBackendOffline, setIsBackendOffline] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [historicalNews] = useState(NEWS_FEED_DATA.filter(item => item.title && !item.title.trim().startsWith('Untitled')));
  const [liveNews, setLiveNews] = useState<typeof NEWS_FEED_DATA>([]);

  // Background Heartbeat for connection auto-recovery
  React.useEffect(() => {
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
        const res = await axios.get(`${baseUrl.replace(/\/$/, '')}/api/health`, { timeout: 2000 });
        if (res.status === 200) {
          setIsBackendOffline(false);
        }
      } catch (e) {
        setIsBackendOffline(true);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  if (activeDrawer !== 'news') return null;

  const handleSelectNewsCard = (item: any) => {
    if (!item) return;
    const violated = item.violatedNodes || item.violated_nodes || [];
    setAiMatchedNodeIds(violated);

    const upholderHeadline = item.upholderStance?.headline || item.upholder_stance?.headline || '🛡️ Rights Upholder';
    const upholderAnalysis = item.upholderStance?.analysis || item.upholder_stance?.analysis || '';
    const stanceText = upholderAnalysis ? `\n\n${upholderHeadline}: ${upholderAnalysis}` : '';

    setHighlightRationale({
      title: `Governance News: ${item.title || 'Untitled Story'}`,
      icon: '📰',
      body: `Category: ${item.category || 'General'} | Source: ${item.newsPublisher || item.source || 'News Wire'}. ${item.summary || ''}${stanceText}`,
      nodeIds: violated
    });
    setChatInputPrompt(`Discuss news: ${item.title || ''} - ${item.summary || ''}`);
    toggleChat(true);
  };

  const handleRefreshLiveNews = async () => {
    setIsRefreshing(true);
    setIsBackendOffline(false);
    try {
      const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
      let baseUrl = 'http://127.0.0.1:8000';
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          baseUrl = parsed.localPortConfig?.url || parsed.remoteServerConfig?.url || baseUrl;
        } catch (e) {}
      }

      const res = await axios.post(`${baseUrl.replace(/\/$/, '')}/api/news/refresh`, {
        genre: selectedGenre
      });

      if (res.data && res.data.news && res.data.news.length > 0) {
        const formattedLive = res.data.news.map((item: any) => ({
          ...item,
          date: item.date && !item.date.includes("Just now") ? item.date : new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
        }));
        setLiveNews(formattedLive);
        handleSelectNewsCard(formattedLive[0]);
      }
    } catch (e) {
      console.warn("Global Conscience Pulse Backend offline — loading historical archive:", e);
      setIsBackendOffline(true);
      // Fallback to historical events when offline
      setActiveTab('historical');
    } finally {
      setIsRefreshing(false);
    }
  };

  const currentDisplayedNews = activeTab === 'historical'
    ? (selectedGenre === 'all' ? historicalNews : historicalNews.filter(n => n.category === selectedGenre))
    : (selectedGenre === 'all' ? liveNews : liveNews.filter(n => n.category === selectedGenre));

  return (
    <aside className="fixed top-16 right-0 w-full max-w-full sm:w-[440px] h-[calc(100vh-64px)] bg-stone-900/95 backdrop-blur-xl border-l border-amber-900/40 text-stone-100 z-50 flex flex-col shadow-2xl overflow-y-auto">
      {/* Drawer Header */}
      <div className="p-4 border-b border-amber-900/30 space-y-3 sticky top-0 bg-stone-900/95 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📰</span>
            <div>
              <h2 className="text-sm font-extrabold text-white font-serif-axiom">Governance & Policy Feed</h2>
              {selectedNode && (
                <p className="text-[10px] text-amber-400 font-medium">
                  Context lock: <span className="font-bold">[{selectedNode.id}] {selectedNode.title}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setActiveDrawer(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Conscience Pulse Offline Banner (Closeable) */}
        {isBackendOffline && !isPulseNotificationDismissed && (
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Global Conscience Pulse unavailable. Loaded 30-Yr Historical Archive.</span>
            </div>
            <button
              onClick={dismissPulseNotification}
              className="p-0.5 rounded text-amber-400 hover:text-white hover:bg-amber-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2 Main Navigation Tabs */}
        <div className="grid grid-cols-2 p-1 bg-stone-950 rounded-xl border border-amber-900/40 text-xs font-bold">
          <button
            onClick={() => setActiveTab('historical')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'historical'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-950/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5 text-amber-200" />
            <span>30-Yr Major Events</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('live');
              if (liveNews.length === 0 && !isBackendOffline) handleRefreshLiveNews();
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'live'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-950/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Live Breaking News</span>
          </button>
        </div>

        {/* Multi-Tier Ingestion Activation Controls */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex justify-between items-center">
            <span>Ingestion Activation Levels</span>
            <span className="text-[9px] text-emerald-400 font-mono">Rate-Limited</span>
          </div>
          <div className="grid grid-cols-5 gap-1 text-[10px]">
            <button
              onClick={() => handleRefreshLiveNews()}
              className="p-1 bg-stone-950 hover:bg-stone-800 border border-amber-800/80 rounded text-amber-300 font-bold transition text-center"
              title="Tier 1: News RSS & GDELT (<15m)"
            >
              L1 News
            </button>
            <button
              onClick={async () => {
                try {
                  const saved = localStorage.getItem('morality_agent_connection_settings_v1');
                  let u = 'http://127.0.0.1:8000';
                  if (saved) { try { u = JSON.parse(saved).localPortConfig?.url || u; } catch (e) {} }
                  await axios.post(`${u.replace(/\/$/, '')}/api/news/refresh`, { genre: 'economics' });
                  handleRefreshLiveNews();
                } catch (e) {}
              }}
              className="p-1 bg-stone-950 hover:bg-stone-800 border border-amber-800/80 rounded text-amber-300 font-bold transition text-center"
              title="Tier 2: Economic Data & Markets"
            >
              L2 Econ
            </button>
            <button
              onClick={async () => {
                try {
                  const saved = localStorage.getItem('morality_agent_connection_settings_v1');
                  let u = 'http://127.0.0.1:8000';
                  if (saved) { try { u = JSON.parse(saved).localPortConfig?.url || u; } catch (e) {} }
                  await axios.post(`${u.replace(/\/$/, '')}/api/news/refresh`, { genre: 'governance' });
                  handleRefreshLiveNews();
                } catch (e) {}
              }}
              className="p-1 bg-stone-950 hover:bg-stone-800 border border-amber-800/80 rounded text-amber-300 font-bold transition text-center"
              title="Tier 3: Parliamentary & Electoral"
            >
              L3 Elect
            </button>
            <button
              onClick={async () => {
                try {
                  const saved = localStorage.getItem('morality_agent_connection_settings_v1');
                  let u = 'http://127.0.0.1:8000';
                  if (saved) { try { u = JSON.parse(saved).localPortConfig?.url || u; } catch (e) {} }
                  await axios.post(`${u.replace(/\/$/, '')}/api/news/refresh`, { genre: 'health' });
                  handleRefreshLiveNews();
                } catch (e) {}
              }}
              className="p-1 bg-stone-950 hover:bg-stone-800 border border-amber-800/80 rounded text-amber-300 font-bold transition text-center"
              title="Tier 4: Public Health & WHO"
            >
              L4 Health
            </button>
            <button
              onClick={async () => {
                try {
                  const saved = localStorage.getItem('morality_agent_connection_settings_v1');
                  let u = 'http://127.0.0.1:8000';
                  if (saved) { try { u = JSON.parse(saved).localPortConfig?.url || u; } catch (e) {} }
                  await axios.post(`${u.replace(/\/$/, '')}/api/news/refresh`, { genre: 'crime' });
                  handleRefreshLiveNews();
                } catch (e) {}
              }}
              className="p-1 bg-stone-950 hover:bg-stone-800 border border-amber-800/80 rounded text-amber-300 font-bold transition text-center"
              title="Tier 5: Legal & Crime Blotters"
            >
              L5 Legal
            </button>
          </div>
        </div>

        {/* Genre Selector & Refresh Button (ONLY Active on Live News Tab) */}
        <div className="flex items-center gap-2 pt-1 border-t border-amber-900/30">
          <div className="flex items-center gap-1.5 flex-1 bg-stone-950 border border-amber-900/40 rounded-lg px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent text-xs font-bold text-stone-200 focus:outline-none cursor-pointer w-full"
            >
              <option value="all">🌐 All News Genres</option>
              <option value="governance">🏛️ Governance & Bills</option>
              <option value="ai">🤖 AI Ethics & Safety</option>
              <option value="privacy">🔐 Digital Privacy & Rights</option>
              <option value="health">🏥 Universal Healthcare</option>
              <option value="environment">🌿 Environment & Climate</option>
            </select>
          </div>

          {/* Refresh Button ONLY Enabled on Live Breaking News Tab (Shaded out when offline) */}
          {activeTab === 'live' && (
            <button
              onClick={handleRefreshLiveNews}
              disabled={isRefreshing || isBackendOffline}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${
                isBackendOffline
                  ? 'bg-stone-800 text-stone-500 opacity-40 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer shadow-amber-950/50'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Parsing...' : 'Refresh Live News'}</span>
            </button>
          )}
        </div>
      </div>

      {/* News Cards List */}
      <div className="p-4 space-y-4">
        {currentDisplayedNews.length === 0 ? (
          <div className="text-center py-10 space-y-2 text-stone-400">
            <p className="text-xs">No news cards currently loaded for this tab.</p>
            {activeTab === 'live' && !isBackendOffline && (
              <button
                onClick={handleRefreshLiveNews}
                className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold"
              >
                Fetch Live News
              </button>
            )}
          </div>
        ) : (
          currentDisplayedNews.map((item) => {
            const violatedNodes = item.violatedNodes || (item as any).violated_nodes || [];
            const violatedNodeTitles = item.violatedNodeTitles || (item as any).violated_node_titles || [];
            const isRelatedToSelectedNode = !selectedNode || violatedNodes.includes(selectedNode.id);
            const isShadedOut = selectedNode !== null && !isRelatedToSelectedNode;

            return (
              <div
                key={item.id || item.newsUrl || (item as any).url}
                onClick={() => handleSelectNewsCard(item)}
                className={`rounded-xl p-4 space-y-3 cursor-pointer transition-all duration-300 border ${
                  isShadedOut
                    ? 'opacity-25 grayscale border-stone-900 bg-stone-950/60 shadow-none scale-98 hover:opacity-100 hover:scale-100 hover:grayscale-0'
                    : selectedNode && isRelatedToSelectedNode
                    ? 'bg-stone-900 border-amber-400/90 ring-2 ring-amber-400/80 shadow-lg shadow-amber-950/60 scale-[1.01]'
                    : 'bg-stone-950/80 border-amber-900/40 hover:border-amber-500/60 hover:scale-[1.01]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 uppercase">
                      {item.category || 'General'}
                    </span>
                    {(item as any).trust_meter?.trust_percent && (
                      <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                        🛡️ {(item as any).trust_meter.trust_percent}% Trust
                      </span>
                    )}
                    {(item as any).graph_rag?.emotional_valence?.dominant && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                        🎭 {(item as any).graph_rag.emotional_valence.dominant}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold">{item.date || ''}</span>
                </div>

                <h3 className="text-xs font-extrabold text-white leading-snug font-serif-axiom">{item.title || 'Untitled'}</h3>
                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">{item.summary || ''}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {violatedNodeTitles.map((tag: string, idx: number) => (
                    <span key={`tag-${idx}`} className="text-[10px] font-semibold bg-red-950/80 border border-red-800 text-red-300 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-amber-900/30 flex justify-between items-center text-[10px] text-stone-400">
                  <span>Source: {item.newsPublisher || (item as any).source || 'Wire'}</span>
                  <a
                    href={item.newsUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-amber-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Read Original</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
