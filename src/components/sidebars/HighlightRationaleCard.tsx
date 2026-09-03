import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Maximize2, Minimize2 } from 'lucide-react';

export const HighlightRationaleCard: React.FC = () => {
  const { highlightRationale, setHighlightRationale, activeDrawer } = useMoralityStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!highlightRationale) return null;

  return (
    <div
      className={`fixed z-40 bg-slate-900/95 backdrop-blur-xl border border-sky-500/50 rounded-2xl p-4 shadow-2xl transition-all duration-300 ${
        isExpanded
          ? 'bottom-8 right-1/2 translate-x-1/2 w-[90vw] max-w-xl max-h-[75vh] overflow-y-auto ring-2 ring-sky-400'
          : `bottom-6 left-4 right-4 sm:left-auto sm:right-6 w-auto sm:w-80 max-w-[calc(100vw-32px)] ${activeDrawer ? 'lg:right-[480px]' : 'lg:right-6'}`
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5 flex-1 mr-2">
          <span className="text-sm">{highlightRationale.icon}</span>
          <h4 className="text-xs font-extrabold text-white line-clamp-1">{highlightRationale.title}</h4>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-sky-400 p-1 rounded-lg transition-colors cursor-pointer"
            title={isExpanded ? "Collapse Card" : "Expand Card"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setHighlightRationale(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            title="Dismiss Card"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className={`text-xs text-slate-200 leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-4'}`}>
        {highlightRationale.body}
      </p>

      {highlightRationale.nodeIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mt-2">
          <span className="text-[10px] text-slate-400 font-bold self-center">Active Nodes:</span>
          {highlightRationale.nodeIds.map((id) => (
            <span key={id} className="text-[10px] font-extrabold bg-sky-950 border border-sky-600 text-sky-300 px-2 py-0.5 rounded-lg shadow-sm">
              [{id}]
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
