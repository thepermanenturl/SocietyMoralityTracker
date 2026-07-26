import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { NEWS_FEED_DATA } from '../../data/newsFeedData';
import { X, RefreshCw, ExternalLink } from 'lucide-react';
import axios from 'axios';

export const NewsFeedDrawer: React.FC = () => {
  const { activeDrawer, setActiveDrawer, selectedNode, setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsList, setNewsList] = useState(NEWS_FEED_DATA);

  if (activeDrawer !== 'news') return null;

  const handleRefreshNews = async () => {
    setIsRefreshing(true);
    try {
      const res = await axios.post('/api/news/refresh');
      if (res.data && res.data.news) {
        // Updated news feed
      }
    } catch (e) {
      console.warn("Offline mode — using persistent news task cards.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectNewsCard = (item: typeof NEWS_FEED_DATA[0]) => {
    setAiMatchedNodeIds(item.violatedNodes);
    setHighlightRationale({
      title: `Governance News: ${item.title}`,
      icon: '📰',
      body: `Category: ${item.category} | Source: ${item.newsPublisher}. ${item.summary}\n\n${item.upholderStance.headline}: ${item.upholderStance.analysis}`,
      nodeIds: item.violatedNodes
    });
  };

  return (
    <aside className="fixed top-16 right-0 w-[440px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 text-white z-50 flex flex-col shadow-2xl overflow-y-auto">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 z-10">
        <div className="flex items-center gap-2">
          <span className="text-base">📰</span>
          <div>
            <h2 className="text-sm font-extrabold text-white">Governance News & Policy Feed</h2>
            {selectedNode && (
              <p className="text-[10px] text-cyan-400 font-medium">
                Filtering context for selected node: <span className="font-bold">[{selectedNode.id}] {selectedNode.title}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshNews}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600/80 hover:bg-sky-600 text-white text-xs font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh RAG</span>
          </button>
          <button
            onClick={() => setActiveDrawer(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
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
                <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
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
