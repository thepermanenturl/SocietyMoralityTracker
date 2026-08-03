import React, { useState, useRef, useEffect } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { PRIMITIVE_ROOTS, PARADIGM_PRIMITIVES } from '../../data/laypersonData';
import { Move } from 'lucide-react';

export const PrimitivesBar: React.FC = () => {
  const { setAiMatchedNodeIds, setHighlightRationale, setActiveDrawer, activeParadigm, setSelectedNode } = useMoralityStore();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; elemX: number; elemY: number }>({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });

  const currentTitles = PARADIGM_PRIMITIVES[activeParadigm] || PARADIGM_PRIMITIVES.tree;

  const handlePrimitiveClick = (primKey: string) => {
    if (isDraggingRef.current) return;
    const primData = PRIMITIVE_ROOTS[primKey];
    if (!primData) return;

    setActiveDrawer(null);
    setSelectedNode(primKey as any);

    const PRIMITIVE_NODE_MAP: Record<string, string[]> = {
      P1_HARM: ['P1_HARM', 'A1', 'A2', 'D1', 'D2', 'E1', 'E2', 'E3', 'E4', 'X1', 'X4', 'X7'],
      P2_AGENCY: ['P2_AGENCY', 'A3', 'A4', 'D3', 'D4', 'D7', 'E5', 'E6', 'E7', 'X2', 'X5', 'X8'],
      P3_EQUITY: ['P3_EQUITY', 'A5', 'A6', 'D5', 'D6', 'D8', 'E8', 'E9', 'E10', 'E11', 'E12', 'X3', 'X6']
    };

    const matchedNodeIds = PRIMITIVE_NODE_MAP[primKey] || ['P1_HARM', 'A1', 'A4'];
    setAiMatchedNodeIds(matchedNodeIds);

    const waysStr = primData.waysToLive.map(w => `${w.area}: ${w.action}`).join(" | ");
    setHighlightRationale({
      title: `🌱 Primitive Root: ${primData.name}`,
      icon: primData.icon,
      body: `Citation: ${primData.citation}. ${primData.tagline} | WAYS TO LIVE: ${waysStr}`,
      nodeIds: matchedNodeIds
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = false;
    const initialX = position?.x ?? (window.innerWidth / 2 - 250);
    const initialY = position?.y ?? 80;
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY, elemX: initialX, elemY: initialY };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.mouseX;
      const dy = moveEvent.clientY - dragStartRef.current.mouseY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        isDraggingRef.current = true;
      }
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 300, dragStartRef.current.elemX + dx)),
        y: Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.elemY + dy))
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const stylePosition = position
    ? { left: `${position.x}px`, top: `${position.y}px`, transform: 'none' }
    : {};

  return (
    <div
      id="tour-primitives-bar"
      onMouseDown={handleMouseDown}
      style={stylePosition}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-full shadow-2xl max-w-[calc(100vw-32px)] cursor-grab active:cursor-grabbing select-none transition-shadow hover:border-sky-500/60"
    >
      <span title="Click & Drag to reposition">
        <Move className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
      </span>
      <span className="text-[11px] font-extrabold text-amber-400">{currentTitles.label}:</span>

      <button
        onClick={() => handlePrimitiveClick('P1_HARM')}
        className="text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/80 text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 transition-all cursor-pointer shadow-sm"
      >
        {currentTitles.p1}
      </button>

      <button
        onClick={() => handlePrimitiveClick('P2_AGENCY')}
        className="text-[11px] font-bold px-3 py-1 rounded-full border border-sky-500/80 text-sky-300 bg-sky-950/60 hover:bg-sky-900 transition-all cursor-pointer shadow-sm"
      >
        {currentTitles.p2}
      </button>

      <button
        onClick={() => handlePrimitiveClick('P3_EQUITY')}
        className="text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/80 text-amber-300 bg-amber-950/60 hover:bg-amber-900 transition-all cursor-pointer shadow-sm"
      >
        {currentTitles.p3}
      </button>
    </div>
  );
};
