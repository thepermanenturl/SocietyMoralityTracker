import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { NEWS_FEED_DATA } from '../../data/newsFeedData';
import { X, RefreshCw, ExternalLink, Filter } from 'lucide-react';
import axios from 'axios';

export const NewsFeedDrawer: React.FC = () => {
  const { activeDrawer, setActiveDrawer, selectedNode, setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [newsList, setNewsList] = useState(NEWS_FEED_DATA);

  if (activeDrawer !== 'news') return null;

  const handleSelectNewsCard = (item: typeof NEWS_FEED_DATA[0]) => {
    setAiMatchedNodeIds(item.violatedNodes);
    setHighlightRationale({
      title: `Governance News: ${item.title}`,
      icon: '📰',
      body: `Category: ${item.category} | Source: ${item.newsPublisher}. ${item.summary}\n\n${item.upholderStance.headline}: ${item.upholderStance.analysis}`,
      nodeIds: item.violatedNodes
    });
  };

  const handleRefreshNews = async () => {
    setIsRefreshing(true);
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
        setNewsList(res.data.news);
        // Automatically highlight & shade out nodes for the top ingested news article!
        handleSelectNewsCard(res.data.news[0]);
      }
    } catch (e) {
      console.warn("Backend offline — filtering client persistent news cards by genre:", e);
      const filtered = selectedGenre === 'all' 
        ? NEWS_FEED_DATA 
        : NEWS_FEED_DATA.filter(n => n.category === selectedGenre);
      setNewsList(filtered.length > 0 ? filtered : NEWS_FEED_DATA);
      if (filtered.length > 0) {
        handleSelectNewsCard(filtered[0]);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <aside className="fixed top-16 right-0 w-[440px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 text-white z-50 flex flex-col shadow-2xl overflow-y-auto">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 space-y-3 sticky top-0 bg-slate-900/95 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📰</span>
            <div>
              <h2 className="text-sm font-extrabold text-white">Governance News & RAG Ingestion</h2>
              {selectedNode && (
                <p className="text-[10px] text-cyan-400 font-medium">
                  Context lock: <span className="font-bold">[{selectedNode.id}] {selectedNode.title}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setActiveDrawer(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Genre Selector & RAG Refresh Trigger */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer w-full"
            >
              <option value="all">🌐 All News Genres</option>
              <option value="governance">🏛️ Governance & Bills</option>
              <option value="ai">🤖 AI Ethics & Safety Accord</option>
              <option value="privacy">🔐 Digital Privacy & Rights</option>
              <option value="health">🏥 Universal Healthcare</option>
              <option value="environment">🌿 Environment & Climate</option>
            </select>
          </div>

          <button
            onClick={handleRefreshNews}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Ingesting...' : 'Refresh RAG'}</span>
          </button>
        </div>
      </div>

      {/* News Cards List with Universal Shading */}
      <div className="p-4 space-y-4">
        {newsList.map((item) => {
          const isRelatedToSelectedNode = !selectedNode || item.violatedNodes.includes(selectedNode.id);
          const isShadedOut = selectedNode !== null && !isRelatedToSelectedNode;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectNewsCard(item)}
              className={`rounded-xl p-4 space-y-3 cursor-pointer transition-all duration-300 border ${
                isShadedOut
                  ? 'opacity-25 grayscale border-slate-900 bg-slate-950/60 shadow-none scale-98 hover:opacity-100 hover:scale-100 hover:grayscale-0'
                  : selectedNode && isRelatedToSelectedNode
                  ? 'bg-slate-900 border-cyan-400/90 ring-2 ring-cyan-400/80 shadow-lg shadow-cyan-500/30 scale-[1.01]'
                  : 'bg-slate-950/80 border-slate-800 hover:border-sky-500/60 hover:scale-[1.01]'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800 uppercase">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500">{item.date}</span>
              </div>

              <h3 className="text-xs font-extrabold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{item.summary}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {item.violatedNodeTitles.map((tag, idx) => (
                  <span key={`tag-${idx}`} className="text-[10px] font-semibold bg-rose-950/80 border border-rose-800 text-rose-300 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400">
                <span>Source: {item.newsPublisher}</span>
                <a
                  href={item.newsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-sky-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Read Original</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
