import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { PerspectiveLens } from '../../types/morality';
import { X, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';

export const NodeDetailDrawer: React.FC = () => {
  const { selectedNode, activeDrawer, setActiveDrawer, toggleChat } = useMoralityStore();
  const [activeLens, setActiveLens] = useState<PerspectiveLens>('none');
  const [upvotes, setUpvotes] = useState(12);

  if (activeDrawer !== 'inspector' || !selectedNode) return null;

  return (
    <aside className="fixed top-16 right-0 w-[440px] max-w-[calc(100vw-32px)] h-[calc(100vh-64px)] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 text-white z-50 flex flex-col shadow-2xl overflow-y-auto">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 z-10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-500/20 border border-sky-400/40 text-sky-400">
            Layer {selectedNode.layer}
          </span>
          <span className="text-xs font-bold text-slate-400">[{selectedNode.id}]</span>
        </div>
        <button
          onClick={() => setActiveDrawer(null)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Node Info Content */}
      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-lg font-extrabold text-white">{selectedNode.title}</h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            "{selectedNode.statement}"
          </p>

          <button
            onClick={() => toggleChat(true)}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs font-extrabold transition-all shadow-md cursor-pointer border border-sky-400/40"
          >
            <span>🤖 Ask AI Agent to Vet this Claim</span>
          </button>
        </div>

        {/* Perspective Ground Reality Lens Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-400">🌍 Select Ground Reality Lens:</label>
          <select
            value={activeLens}
            onChange={(e) => setActiveLens(e.target.value as PerspectiveLens)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl p-2.5 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="none">💡 Daily Dilemma & Real-Life Decision Making</option>
            <option value="constitution">🏛️ Constitution of India (Article & Legal Code)</option>
            <option value="modernBuddha">🧘 Modern Buddha (Lived Virtue Story)</option>
            <option value="wangchuk">🏔️ Sonam Wangchuk (Homage & Climate Fast)</option>
            <option value="critic">📢 Ground Reality — Systemic Critique</option>
          </select>
        </div>

        {/* Lens Details Display Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          {activeLens === 'none' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <span>💡 Practical Daily Concern</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When facing everyday conflicts at work or home, grounding your decision in [{selectedNode.id}] provides immediate ethical clarity even if executing it requires personal sacrifice.
              </p>
            </div>
          )}

          {activeLens === 'constitution' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-sky-400">🏛️ Indian Constitution Article 21 & 14</div>
              <p className="text-slate-300 italic font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                "No person shall be deprived of his life or personal liberty except according to procedure established by law."
              </p>
              <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400">
                <span>Ground Implementation Meter:</span>
                <span className="font-bold text-emerald-400">70% Substantial Reach</span>
              </div>
            </div>
          )}

          {activeLens === 'modernBuddha' && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-amber-400">🧘 Baba Amte & Bezwada Wilson</div>
              <p className="text-slate-300 leading-relaxed">
                Dedicated decades of lived virtue to uphold non-violence and human dignity under hostile socio-economic conditions.
              </p>
              <a
                href="https://en.wikipedia.org/wiki/Baba_Amte"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sky-400 hover:underline pt-1"
              >
                <span>Read Full Biography</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Governance Community Voting */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-300">Community Governance & Ratification</h3>
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
