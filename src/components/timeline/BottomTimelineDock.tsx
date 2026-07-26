import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { HISTORICAL_EPOCHS } from '../../data/historicalEpochsData';

export const BottomTimelineDock: React.FC = () => {
  const { setActiveDrawer, setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [activeIdx, setActiveIdx] = useState(3); // Default to UDHR 1948

  const activeEpoch = HISTORICAL_EPOCHS[activeIdx];

  const handleEpochSelect = (idx: number) => {
    setActiveIdx(idx);
    setActiveDrawer(null); // Auto-collapse right sidebars

    const epoch = HISTORICAL_EPOCHS[idx];
    setAiMatchedNodeIds(epoch.keyNodes);

    const blindspotsSummary = epoch.societalBlindspots
      ? epoch.societalBlindspots.map(b => `${b.society}: ${b.missingRights || b.upholdingAchievement}`).join(" | ")
      : "";

    setHighlightRationale({
      title: `⏳ ${epoch.name}`,
      icon: '🏛️',
      body: `Years: ${epoch.years} | Unrest Index: ${epoch.unrestScore}%\n\nPRIMARY CAUSE OF UNREST: ${epoch.unrestCause}\n\nSOCIETAL BLINDSPOTS & HISTORICAL REALITY: ${blindspotsSummary}`,
      nodeIds: epoch.keyNodes
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2.5">
      {/* Epoch Info Header */}
      <div className="flex items-center justify-between px-2 text-xs font-extrabold border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-sky-400">
          <span className="text-sm">⏳</span>
          <span className="text-white">{activeEpoch.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-400">Unrest Index:</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
            activeEpoch.unrestScore >= 75
              ? 'bg-rose-950 text-rose-400 border border-rose-800'
              : activeEpoch.unrestScore >= 60
              ? 'bg-amber-950 text-amber-400 border border-amber-800'
              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
          }`}>
            {activeEpoch.unrestScore}%
          </span>
        </div>
      </div>

      {/* Epoch Summary Line */}
      <p className="text-xs text-slate-300 px-2 line-clamp-2 leading-relaxed">
        {activeEpoch.summary}
      </p>

      {/* Timeline Quick Select Buttons */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {HISTORICAL_EPOCHS.map((epoch, idx) => (
          <button
            key={epoch.id}
            onClick={() => handleEpochSelect(idx)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer border ${
              activeIdx === idx
                ? 'bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-600/40 scale-105'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {epoch.years.split('–')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  );
};
