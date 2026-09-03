import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { HISTORICAL_EPOCHS } from '../../data/historicalEpochsData';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const BottomTimelineDock: React.FC = () => {
  const {
    setActiveDrawer,
    setAiMatchedNodeIds,
    setHighlightRationale,
    setChatInputPrompt,
    toggleChat,
    isEpochTimelineMinimized,
    toggleEpochTimelineMinimized
  } = useMoralityStore();

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

    // Send text to chat text box for Socratic discussion & open left chat drawer!
    setChatInputPrompt(`Discuss historical epoch: ${epoch.name} (${epoch.years}) - ${epoch.summary}`);
    toggleChat(true);
  };

  if (isEpochTimelineMinimized) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-xl border border-amber-900/40 rounded-full px-4 py-1.5 shadow-2xl flex items-center gap-3">
        <span className="text-xs font-extrabold text-amber-400 font-serif-axiom">⏳ Epoch Timeline: {activeEpoch.name}</span>
        <button
          onClick={toggleEpochTimelineMinimized}
          className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Expand Epoch History Bar"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div id="tour-timeline" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-4xl bg-stone-900/95 backdrop-blur-xl border border-amber-900/40 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2.5 transition-all">
      {/* Epoch Info Header */}
      <div className="flex items-center justify-between px-2 text-xs font-extrabold border-b border-amber-900/30 pb-2">
        <div className="flex items-center gap-2 text-amber-400 font-serif-axiom">
          <span className="text-sm">⏳</span>
          <span className="text-white font-serif-axiom">{activeEpoch.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-stone-400">Unrest Index:</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
            activeEpoch.unrestScore >= 75
              ? 'bg-rose-950 text-rose-300 border border-rose-800'
              : activeEpoch.unrestScore >= 60
              ? 'bg-amber-950 text-amber-300 border border-amber-800'
              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
          }`}>
            {activeEpoch.unrestScore}%
          </span>
          <button
            onClick={toggleEpochTimelineMinimized}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-2"
            title="Minimize Epoch Bar"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Epoch Summary Line */}
      <p className="text-xs text-stone-300 px-2 line-clamp-2 leading-relaxed">
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
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-950/60 scale-105'
                : 'bg-stone-950/80 border-amber-900/40 text-stone-400 hover:text-stone-200 hover:border-amber-700'
            }`}
          >
            {epoch.years.split('–')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  );
};
