import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { PRIMITIVE_ROOTS } from '../../data/laypersonData';

export const PrimitivesBar: React.FC = () => {
  const { setAiMatchedNodeIds, setHighlightRationale, setActiveDrawer } = useMoralityStore();

  const handlePrimitiveClick = (primKey: string) => {
    const primData = PRIMITIVE_ROOTS[primKey];
    if (!primData) return;

    setActiveDrawer(null);

    // Dynamic node mapping per primitive root
    const PRIMITIVE_NODE_MAP: Record<string, string[]> = {
      P1_HARM: ['A1', 'A2', 'D1', 'D2', 'E1', 'E2', 'E3', 'E4', 'X1', 'X4', 'X7'],
      P2_AGENCY: ['A3', 'A4', 'D3', 'D4', 'D7', 'E5', 'E6', 'E7', 'X2', 'X5', 'X8'],
      P3_EQUITY: ['A5', 'A6', 'D5', 'D6', 'D8', 'E8', 'E9', 'E10', 'E11', 'E12', 'X3', 'X6']
    };

    const matchedNodeIds = PRIMITIVE_NODE_MAP[primKey] || ['A1', 'A4', 'A6'];

    setAiMatchedNodeIds(matchedNodeIds);

    const waysStr = primData.waysToLive.map(w => `${w.area}: ${w.action}`).join(" | ");
    setHighlightRationale({
      title: `🌱 Ways to Live Axiom: ${primData.name}`,
      icon: primData.icon,
      body: `Citation: ${primData.citation}. ${primData.tagline} | WAYS TO LIVE IN DAILY LIFE: ${waysStr}`,
      nodeIds: matchedNodeIds
    });
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md border border-slate-800 px-4 py-1.5 rounded-full shadow-lg max-w-[calc(100vw-32px)]">
      <span className="text-xs font-bold text-amber-400">🌱 3 Minimal Primitives:</span>

      <button
        onClick={() => handlePrimitiveClick('P1_HARM')}
        className="text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/60 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 transition-all cursor-pointer"
      >
        🛡️ Non-Harm & Suffering
      </button>

      <button
        onClick={() => handlePrimitiveClick('P2_AGENCY')}
        className="text-xs font-bold px-3 py-1 rounded-full border border-sky-500/60 text-sky-400 bg-sky-950/40 hover:bg-sky-900/60 transition-all cursor-pointer"
      >
        🗽 Agency & Consent
      </button>

      <button
        onClick={() => handlePrimitiveClick('P3_EQUITY')}
        className="text-xs font-bold px-3 py-1 rounded-full border border-amber-500/60 text-amber-400 bg-amber-950/40 hover:bg-amber-900/60 transition-all cursor-pointer"
      >
        ⚖️ Equal Weight & Fairness
      </button>
    </div>
  );
};
