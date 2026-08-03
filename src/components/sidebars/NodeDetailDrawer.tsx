import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { PerspectiveLens } from '../../types/morality';
import { ENRICHED_MORALITY_NODES, EnrichedMoralityNode } from '../../data/moralityNodesData';
import { X, ExternalLink, ThumbsUp, ThumbsDown, GitCommit, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const NodeDetailDrawer: React.FC = () => {
  const { selectedNode, activeDrawer, setActiveDrawer, toggleChat, setSelectedNode, isDarkMode } = useMoralityStore();
  const [activeLens, setActiveLens] = useState<PerspectiveLens>('none');
  const [upvotes, setUpvotes] = useState(12);

  if (activeDrawer !== 'inspector' || !selectedNode) return null;

  // Resolve full enriched node
  const fullNode: EnrichedMoralityNode = (ENRICHED_MORALITY_NODES.find(n => n.id === selectedNode.id) as EnrichedMoralityNode) || selectedNode;
  const lenses = fullNode.lenses || {
    dilemmaTitle: "💡 Everyday Practical Decision Making",
    dilemmaBody: `Grounding your decision in [${fullNode.id}] provides immediate ethical clarity in daily life.`,
    psychologyTitle: "🧠 Cognitive Biases & Moral Blind Spots",
    psychologyBody: `Adhering to [${fullNode.id}] counteracts tribal out-group bias and rationalization.`,
    psychologyBlindspots: ["Tribal Bias", "Rationalization"],
    constitutionTitle: "🏛️ Indian Constitution Principles",
    constitutionQuote: "All citizens are guaranteed dignity and equal protection of law.",
    constitutionReachPct: 75,
    modernBuddhaExemplar: "Baba Amte & Human Rights Champions",
    modernBuddhaStory: "Dedicated decades to lived virtue and humanitarian service under hostile conditions.",
    modernBuddhaLink: "https://en.wikipedia.org/wiki/Baba_Amte",
    criticTitle: "📢 Ground Reality — Systemic Critique",
    criticBody: "Structural obstacles and bureaucratic friction frequently impede real-world enforcement."
  };

  // Find parents and children for derivation links
  const parentNodes = ENRICHED_MORALITY_NODES.filter(n => fullNode.parentIds?.includes(n.id));
  const childNodes = ENRICHED_MORALITY_NODES.filter(n => n.parentIds?.includes(fullNode.id));

  const handleSelectRelatedNode = (nodeId: string) => {
    const target = ENRICHED_MORALITY_NODES.find(n => n.id === nodeId);
    if (target) {
      setSelectedNode(target);
    }
  };

  return (
    <aside className={`fixed top-16 right-0 w-[460px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] ${isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-[#e6e4dd]/95 border-amber-900/30 text-slate-900'} backdrop-blur-xl border-l z-50 flex flex-col shadow-2xl overflow-y-auto transition-all`}>
      {/* Drawer Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/95' : 'border-amber-900/20 bg-[#d8d5ca]/95'} flex items-center justify-between sticky top-0 z-10`}>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-500/20 border border-sky-400/40 text-sky-400">
            {fullNode.layer === -1 ? 'Origin Primitive' : `Layer ${fullNode.layer}`}
          </span>
          <span className="text-xs font-bold text-slate-400">[{fullNode.id}]</span>
        </div>
        <button
          onClick={() => setActiveDrawer(null)}
          className={`p-1 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300'} transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Node Info Content */}
      <div className="p-5 space-y-5">
        <div>
          <h2 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{fullNode.title}</h2>
          <p className={`text-xs ${isDarkMode ? 'text-slate-300 bg-slate-800/60 border-slate-700/60' : 'text-slate-800 bg-white border-amber-300/60'} mt-2 leading-relaxed p-3 rounded-xl border`}>
            "{fullNode.statement}"
          </p>

          {/* 2-Liner Card Summary */}
          {fullNode.summary2Liner && (
            <p className="text-[11px] text-emerald-400 font-semibold mt-2 px-1">
              📌 {fullNode.summary2Liner}
            </p>
          )}

          <button
            onClick={() => toggleChat(true)}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs font-extrabold transition-all shadow-md cursor-pointer border border-sky-400/40"
          >
            <span>🤖 Ask AI Agent to Vet this Claim</span>
          </button>
        </div>

        {/* 🔗 Related Parent & Child Derivation Links */}
        <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-300/80'} space-y-2.5`}>
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
            <GitCommit className="w-4 h-4" />
            <span>Derivation Links & Network</span>
          </div>

          {/* Parent Roots */}
          {parentNodes.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-amber-400" /> Parent Roots:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {parentNodes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectRelatedNode(p.id)}
                    className="text-[11px] font-bold bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>[{p.id}] {p.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Downstream Child Nodes */}
          {childNodes.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3 text-emerald-400" /> Derived Principles & Policies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {childNodes.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectRelatedNode(c.id)}
                    className="text-[11px] font-bold bg-sky-950/80 hover:bg-sky-900 border border-sky-700/80 text-sky-300 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>[{c.id}] {c.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ground Reality Lens Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-400">🌍 Select Ground Reality Lens:</label>
          <select
            value={activeLens}
            onChange={(e) => setActiveLens(e.target.value as PerspectiveLens)}
            className={`w-full ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-amber-300 text-slate-900'} border text-xs font-semibold rounded-xl p-2.5 focus:outline-none cursor-pointer`}
          >
            <option value="none">💡 Daily Dilemma & Practical Decision Making</option>
            <option value="psychology">🧠 Behavioral Psychology & Cognitive Biases</option>
            <option value="constitution">🏛️ Constitution of India (Article & Legal Code)</option>
            <option value="modernBuddha">🧘 Modern Buddha (Lived Virtue Exemplar)</option>
            <option value="critic">📢 Ground Reality — Systemic Critique</option>
          </select>
        </div>

        {/* Lens Content Display */}
        <div className={`border rounded-xl p-4 space-y-3 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-amber-300'}`}>
          {activeLens === 'none' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <span>{lenses.dilemmaTitle}</span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                {lenses.dilemmaBody}
              </p>
            </div>
          )}

          {activeLens === 'psychology' && (
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-purple-400">
                <span>{lenses.psychologyTitle}</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-purple-950/40 border-purple-800/60' : 'bg-purple-50 border-purple-300'} space-y-2`}>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-800'} text-[11px] leading-relaxed`}>
                  {lenses.psychologyBody}
                </p>
                {lenses.psychologyBlindspots && lenses.psychologyBlindspots.length > 0 && (
                  <div className="pt-1">
                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Targeted Cognitive Blind Spots:</div>
                    <ul className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} space-y-1 mt-1`}>
                      {lenses.psychologyBlindspots.map((b, i) => (
                        <li key={i}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLens === 'constitution' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-sky-400">{lenses.constitutionTitle}</div>
              <p className={`italic font-mono p-2.5 rounded-lg border ${isDarkMode ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-300'}`}>
                "{lenses.constitutionQuote}"
              </p>
              <div className="pt-2 flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Ground Implementation Meter:</span>
                <span className="font-bold text-emerald-400">{lenses.constitutionReachPct}% Substantial Reach</span>
              </div>
            </div>
          )}

          {activeLens === 'modernBuddha' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-amber-400">🧘 {lenses.modernBuddhaExemplar}</div>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                {lenses.modernBuddhaStory}
              </p>
              {lenses.modernBuddhaLink && (
                <a
                  href={lenses.modernBuddhaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:underline pt-1"
                >
                  <span>Read Full Biography</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {activeLens === 'critic' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-rose-400">{lenses.criticTitle}</div>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                {lenses.criticBody}
              </p>
            </div>
          )}
        </div>

        {/* Community Ratification */}
        <div className={`border rounded-xl p-4 space-y-3 ${isDarkMode ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-white border-amber-300 text-slate-900'}`}>
          <h3 className="text-xs font-bold">Community Governance & Ratification</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setUpvotes(upvotes + 1)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold transition-all"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Ratify ({upvotes})</span>
            </button>

            <button
              onClick={() => setUpvotes(Math.max(0, upvotes - 1))}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-all"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
