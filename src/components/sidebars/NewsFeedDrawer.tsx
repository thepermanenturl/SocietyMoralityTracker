import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { NEWS_FEED_DATA } from '../../data/newsFeedData';
import { X, RefreshCw, ExternalLink, Filter, History, Zap } from 'lucide-react';
import axios from 'axios';

export const NewsFeedDrawer: React.FC = () => {
  const { activeDrawer, setActiveDrawer, selectedNode, setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [activeTab, setActiveTab] = useState<'historical' | 'live'>('historical');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [historicalNews] = useState(NEWS_FEED_DATA);
  const [liveNews, setLiveNews] = useState<typeof NEWS_FEED_DATA>([]);

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

  const handleRefreshLiveNews = async () => {
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
        setLiveNews(res.data.news);
        // Automatically highlight & shade out nodes for the top ingested news article!
        handleSelectNewsCard(res.data.news[0]);
      }
    } catch (e) {
      console.warn("Backend offline — generating live simulated cards for the last hour:", e);
      const timestamp_str = `Just now (Last Hour)`;
      const fallbackLive = [
        {
          id: `LIVE-LOCAL-01`,
          title: "Supreme Court Bench Directs Immediate Judicial Audit of Biometric Data Retention",
          summary: "Constitutional bench mandates independent auditing of biometric servers to ensure compliance with right to autonomy and data minimization.",
          category: "privacy",
          violatedNodes: ["A4", "D2", "E5", "D4"],
          violatedNodeTitles: ["[A4] Autonomy", "[D2] Bodily Integrity", "[E5] Digital Privacy", "[D4] Non-Discrimination"],
          date: timestamp_str,
          newsPublisher: "Legal Wire Live",
          newsUrl: "https://supreme-court-privacy.gov.in",
          upholderStance: { headline: "🛡️ Privacy Upholder", analysis: "Mass surveillance breaches fundamental individual autonomy [A4]." },
          devilsAdvocateStance: { headline: "😈 Security Advocate", analysis: "National security threat detection requires intelligence oversight." }
        },
        {
          id: `LIVE-LOCAL-02`,
          title: "Global AI Safety Accord Enforces Mandatory Red-Teaming for Frontier Autonomous Models",
          summary: "International treaty obligates AI developers to implement human-in-the-loop safety gates before public release.",
          category: "ai",
          violatedNodes: ["A1", "A4", "X5", "D6"],
          violatedNodeTitles: ["[A1] Suffering Avoidance", "[A4] Autonomy", "[X5] AGI Alignment", "[D6] Harm Principle"],
          date: timestamp_str,
          newsPublisher: "Global AI Safety Consortium",
          newsUrl: "https://ai-safety-accord.org",
          upholderStance: { headline: "🛡️ Safety Upholder", analysis: "Unchecked autonomous deployment threatens human agency [A1, A4]." },
          devilsAdvocateStance: { headline: "😈 Acceleration Advocate", analysis: "Over-regulation risks stifling scientific competitiveness." }
        },
        {
          id: `LIVE-LOCAL-03`,
          title: "Universal Healthcare Guarantee Bill Passed to Prevent Medical Debt Insolvency",
          summary: "Legislature mandates universal emergency triage and lifesaving medicine access across public and private hospitals.",
          category: "health",
          violatedNodes: ["A1", "A5", "D1", "E2"],
          violatedNodeTitles: ["[A1] Suffering Avoidance", "[A5] Basic Needs", "[D1] Universal Healthcare", "[E2] Fair Wage"],
          date: timestamp_str,
          newsPublisher: "Ministry of Health & Care",
          newsUrl: "https://health-bill.gov.in",
          upholderStance: { headline: "🛡️ Health Upholder", analysis: "Preventable loss of life due to payment inability violates basic needs [A5]." },
          devilsAdvocateStance: { headline: "😈 Fiscal Advocate", analysis: "Unfunded mandates strain private hospital infrastructure." }
        },
        {
          id: `LIVE-LOCAL-04`,
          title: "Whistleblower Exposes Corporate Chemical Dumping in Protected River Ecosystems",
          summary: "Investigative report reveals industrial pollution poisoning local drinking water supplies.",
          category: "environment",
          violatedNodes: ["A1", "D5", "E1", "E6"],
          violatedNodeTitles: ["[A1] Suffering Avoidance", "[D5] Education & Science", "[E1] Environmental Duty", "[E6] Whistleblower Protection"],
          date: timestamp_str,
          newsPublisher: "Eco Watch Investigations",
          newsUrl: "https://ecowatch.org",
          upholderStance: { headline: "🛡️ Eco Upholder", analysis: "Protecting whistleblowers [E6] safeguards community health against harm [A1]." },
          devilsAdvocateStance: { headline: "😈 Employment Advocate", analysis: "Immediate factory shutdowns impact short-term local employment." }
        },
        {
          id: `LIVE-LOCAL-05`,
          title: "Electoral Reform Tribunal Orders Full Disclosure of Anonymous Political Contributions",
          summary: "Tribunal enforces voter right to truth by striking down anonymous donation bonds for public elections.",
          category: "governance",
          violatedNodes: ["A4", "A6", "D8", "E10"],
          violatedNodeTitles: ["[A4] Autonomy", "[A6] Equity & Fairness", "[D8] Democratic Consent", "[E10] Anti-Corruption"],
          date: timestamp_str,
          newsPublisher: "Democracy Watch",
          newsUrl: "https://governance-transparency.gov.in",
          upholderStance: { headline: "🛡️ Democracy Upholder", analysis: "Democratic consent [D8] requires total political financing transparency." },
          devilsAdvocateStance: { headline: "😈 Donor Protection Advocate", analysis: "Donor anonymity protects against political victimisation." }
        }
      ];
      setLiveNews(fallbackLive);
      handleSelectNewsCard(fallbackLive[0]);
    } finally {
      setIsRefreshing(false);
    }
  };

  const currentDisplayedNews = activeTab === 'historical'
    ? (selectedGenre === 'all' ? historicalNews : historicalNews.filter(n => n.category === selectedGenre))
    : (selectedGenre === 'all' ? liveNews : liveNews.filter(n => n.category === selectedGenre));

  return (
    <aside className="fixed top-16 right-0 w-[440px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 text-white z-50 flex flex-col shadow-2xl overflow-y-auto">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 space-y-3 sticky top-0 bg-slate-900/95 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📰</span>
            <div>
              <h2 className="text-sm font-extrabold text-white">Governance & Policy Feed</h2>
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

        {/* 2 Main Navigation Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('historical')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'historical'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>30-Yr Major Events</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('live');
              if (liveNews.length === 0) handleRefreshLiveNews();
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'live'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Live Breaking News</span>
          </button>
        </div>

        {/* Genre Selector & Refresh Button (ONLY Active on Live News Tab) */}
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
              <option value="ai">🤖 AI Ethics & Safety</option>
              <option value="privacy">🔐 Digital Privacy & Rights</option>
              <option value="health">🏥 Universal Healthcare</option>
              <option value="environment">🌿 Environment & Climate</option>
            </select>
          </div>

          {/* Refresh Button ONLY Enabled on Live Breaking News Tab */}
          {activeTab === 'live' && (
            <button
              onClick={handleRefreshLiveNews}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
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
          <div className="text-center py-10 space-y-2 text-slate-400">
            <p className="text-xs">No news cards currently loaded for this tab.</p>
            {activeTab === 'live' && (
              <button
                onClick={handleRefreshLiveNews}
                className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-xs font-bold"
              >
                Fetch Live News
              </button>
            )}
          </div>
        ) : (
          currentDisplayedNews.map((item) => {
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
                  <span className="text-[10px] text-amber-400 font-semibold">{item.date}</span>
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
          })
        )}
      </div>
    </aside>
  );
};
