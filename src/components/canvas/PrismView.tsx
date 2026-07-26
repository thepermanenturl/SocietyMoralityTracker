import React, { useState } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { Sparkles, Layers, ShieldAlert, Scale, HeartHandshake, Compass } from 'lucide-react';

export const PrismView: React.FC = () => {
  const { nodes, selectedNode, setSelectedNode, aiMatchedNodeIds } = useMoralityStore();
  const [selectedIssue, setSelectedIssue] = useState<string>('Universal Healthcare & Emergency Triage');

  const perspectiveBands = [
    {
      id: 'utilitarian',
      name: '🔴 Utilitarian Spectrum',
      sub: 'Welfare & Harm Reduction',
      color: '#ef4444',
      borderColor: 'border-red-500/80',
      bgColor: 'bg-red-950/30',
      icon: ShieldAlert,
      nodes: nodes.filter(n => n.id === 'A1' || n.id === 'D1' || n.id === 'E1' || n.id === 'X1' || n.id === 'X4'),
      rationale: 'Maximizes net flourishing and minimizes felt bodily suffering [A1]. Focuses on collective outcomes.'
    },
    {
      id: 'deontological',
      name: '🟢 Deontological Spectrum',
      sub: 'Duties & Inviolable Rules',
      color: '#10b981',
      borderColor: 'border-emerald-500/80',
      bgColor: 'bg-emerald-950/30',
      icon: Compass,
      nodes: nodes.filter(n => n.id === 'A2' || n.id === 'D2' || n.id === 'E2' || n.id === 'E6' || n.id === 'X2'),
      rationale: 'Upholds absolute duty and intrinsic human dignity. Rejects sacrificing individuals for group gain.'
    },
    {
      id: 'autonomy',
      name: '🔵 Rights & Autonomy Spectrum',
      sub: 'Self-Determination & Consent',
      color: '#3b82f6',
      borderColor: 'border-blue-500/80',
      bgColor: 'bg-blue-950/30',
      icon: HeartHandshake,
      nodes: nodes.filter(n => n.id === 'A3' || n.id === 'A4' || n.id === 'D3' || n.id === 'E4' || n.id === 'E5'),
      rationale: 'Protects bodily autonomy [A4] and voluntary consent. Rejects paternalistic state coercion.'
    },
    {
      id: 'justice',
      name: '🟡 Justice & Equity Spectrum',
      sub: 'Impartiality & Rawlsian Fairness',
      color: '#f59e0b',
      borderColor: 'border-amber-500/80',
      bgColor: 'bg-amber-950/30',
      icon: Scale,
      nodes: nodes.filter(n => n.id === 'A5' || n.id === 'A6' || n.id === 'D5' || n.id === 'E8' || n.id === 'E10'),
      rationale: 'Applies impartial fairness [A6] behind a veil of ignorance. Protects vulnerable stakeholders.'
    }
  ];

  return (
    <div className="w-full h-screen pt-20 pb-24 bg-slate-950 px-6 overflow-y-auto flex flex-col gap-6">
      {/* Refractive Prism Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌈</span>
            <h2 className="text-base font-extrabold text-white">Refractive Prism Spectrum</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-500/60 text-sky-400 font-bold">
              Multi-Perspective Comparison Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Refracts moral issues into 4 distinct ethical spectra for direct side-by-side analysis and node derivation.
          </p>
        </div>

        {/* Selected Issue Selector */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Layers className="w-4 h-4 text-amber-400" />
          <select
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="Universal Healthcare & Emergency Triage">Universal Healthcare & Emergency Triage</option>
            <option value="AI Biometric Surveillance vs Privacy">AI Biometric Surveillance vs Privacy</option>
            <option value="Environmental Conservation vs Economic Growth">Environmental Conservation vs Economic Growth</option>
          </select>
        </div>
      </div>

      {/* 4 Spectrum Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {perspectiveBands.map((band) => {
          const IconComp = band.icon;
          return (
            <div
              key={band.id}
              className={`rounded-2xl border ${band.borderColor} ${band.bgColor} p-4 shadow-xl flex flex-col backdrop-blur-md transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 mb-3">
                <IconComp className="w-5 h-5" style={{ color: band.color }} />
                <div>
                  <h3 className="text-xs font-extrabold text-white">{band.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{band.sub}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed mb-4 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                "{band.rationale}"
              </p>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Associated Nodes</span>
                <span>({band.nodes.length})</span>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-72 pr-1">
                {band.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isHighlighted = aiMatchedNodeIds.includes(node.id.toUpperCase());

                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-800 border-cyan-400 text-white shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-400/80 scale-102'
                          : isHighlighted
                          ? 'bg-amber-950/80 border-amber-400 text-amber-300 animate-pulse'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sky-400">[{node.id}]</span>
                        <span className="text-[10px] opacity-75">Layer {node.layer}</span>
                      </div>
                      <div className="line-clamp-1 mt-0.5">{node.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
