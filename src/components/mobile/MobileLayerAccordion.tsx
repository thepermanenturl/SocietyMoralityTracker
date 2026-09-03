import React, { useState, useMemo } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { ENRICHED_MORALITY_NODES, EnrichedMoralityNode } from '../../data/moralityData';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Bot,
  Scale,
  ShieldCheck,
  Brain,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface LayerMeta {
  layer: number;
  title: string;
  subtitle: string;
  badgeColor: string;
  borderColor: string;
  icon: string;
}

const LAYER_DEFINITIONS: LayerMeta[] = [
  {
    layer: -1,
    title: "Layer -1: Minimal Primitive Roots",
    subtitle: "Biological & self-evident axioms of sentient experience",
    badgeColor: "bg-rose-950/60 text-rose-300 border-rose-800/60",
    borderColor: "border-rose-900/40",
    icon: "🌱"
  },
  {
    layer: 0,
    title: "Layer 0: Foundational Moral Axioms",
    subtitle: "Core pillars of non-harm, reciprocity, and empirical truth",
    badgeColor: "bg-amber-950/60 text-amber-300 border-amber-800/60",
    borderColor: "border-amber-900/40",
    icon: "⚖️"
  },
  {
    layer: 1,
    title: "Layer 1: Primary Ethical Deductions",
    subtitle: "Inviolable individual rights derived from Layer 0",
    badgeColor: "bg-sky-950/60 text-sky-300 border-sky-800/60",
    borderColor: "border-sky-900/40",
    icon: "🕊️"
  },
  {
    layer: 2,
    title: "Layer 2: Societal & Institutional Rights",
    subtitle: "Constitutional protections and public resource covenants",
    badgeColor: "bg-purple-950/60 text-purple-300 border-purple-800/60",
    borderColor: "border-purple-900/40",
    icon: "🏛️"
  },
  {
    layer: 3,
    title: "Layer 3: Practical Governance Frameworks",
    subtitle: "Actionable regulatory tests, transparency, and anti-corruption",
    badgeColor: "bg-emerald-950/60 text-emerald-300 border-emerald-800/60",
    borderColor: "border-emerald-900/40",
    icon: "📜"
  },
  {
    layer: 4,
    title: "Layer 4: Hard Ethical Dilemmas & Case Studies",
    subtitle: "Real-world triage, state security vs privacy, and ecological tensions",
    badgeColor: "bg-orange-950/60 text-orange-300 border-orange-800/60",
    borderColor: "border-orange-900/40",
    icon: "⚡"
  }
];

interface MobileLayerAccordionProps {
  searchFilter: string;
}

export const MobileLayerAccordion: React.FC<MobileLayerAccordionProps> = ({ searchFilter }) => {
  const {
    setSelectedNode,
    setChatInputPrompt,
    toggleChat,
    isDarkMode
  } = useMoralityStore();

  const [expandedLayers, setExpandedLayers] = useState<Record<number, boolean>>({
    [-1]: true,
    0: true,
    1: false,
    2: false,
    3: false,
    4: false
  });

  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

  const toggleLayer = (layer: number) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const filteredNodes = useMemo(() => {
    if (!searchFilter.trim()) return ENRICHED_MORALITY_NODES;
    const q = searchFilter.toLowerCase().trim();
    return ENRICHED_MORALITY_NODES.filter(node =>
      node.id.toLowerCase().includes(q) ||
      node.title.toLowerCase().includes(q) ||
      node.summary2Liner.toLowerCase().includes(q) ||
      node.statement.toLowerCase().includes(q) ||
      (node.lenses?.constitutionTitle && node.lenses.constitutionTitle.toLowerCase().includes(q))
    );
  }, [searchFilter]);

  // Group nodes by layer
  const nodesByLayer = useMemo(() => {
    const map = new Map<number, EnrichedMoralityNode[]>();
    LAYER_DEFINITIONS.forEach(def => map.set(def.layer, []));
    filteredNodes.forEach(node => {
      const list = map.get(node.layer) || [];
      list.push(node);
      map.set(node.layer, list);
    });
    return map;
  }, [filteredNodes]);

  return (
    <div className="space-y-3 pb-6">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-serif-axiom">
          <Layers className="w-4 h-4" />
          <span>34-Node Axiomatic Tree ({filteredNodes.length} Nodes)</span>
        </span>
        <span className="text-[10px] text-stone-400 font-mono">Layered Hierarchy</span>
      </div>

      {LAYER_DEFINITIONS.map(def => {
        const layerNodes = nodesByLayer.get(def.layer) || [];
        if (layerNodes.length === 0 && searchFilter.trim()) return null;

        const isLayerExpanded = expandedLayers[def.layer] || Boolean(searchFilter.trim());

        return (
          <div
            key={def.layer}
            className={`rounded-2xl border ${def.borderColor} ${isDarkMode ? 'bg-stone-900/80' : 'bg-white/90'} overflow-hidden shadow-md transition-all`}
          >
            {/* Layer Header */}
            <button
              onClick={() => toggleLayer(def.layer)}
              className={`w-full p-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                isLayerExpanded
                  ? isDarkMode ? 'bg-stone-800/60' : 'bg-stone-100/80'
                  : isDarkMode ? 'hover:bg-stone-850' : 'hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                <span className="text-base">{def.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-white font-serif-axiom">
                      {def.title}
                    </h3>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${def.badgeColor}`}>
                      {layerNodes.length} {layerNodes.length === 1 ? 'node' : 'nodes'}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 leading-tight mt-0.5 line-clamp-1">
                    {def.subtitle}
                  </p>
                </div>
              </div>
              {isLayerExpanded ? (
                <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
              )}
            </button>

            {/* Layer Nodes List */}
            {isLayerExpanded && (
              <div className="p-2.5 space-y-2 border-t border-stone-800/60">
                {layerNodes.map(node => {
                  const isNodeExpanded = expandedNodeId === node.id;
                  const reach = node.lenses?.constitutionReachPct || 70;

                  return (
                    <div
                      key={node.id}
                      className={`rounded-xl border transition-all ${
                        isNodeExpanded
                          ? isDarkMode ? 'bg-stone-950 border-amber-600/70 shadow-lg' : 'bg-stone-50 border-amber-600'
                          : isDarkMode ? 'bg-stone-900/90 border-stone-800 hover:border-stone-700' : 'bg-stone-50/50 border-stone-200'
                      } p-3 space-y-2`}
                    >
                      {/* Node Header Row */}
                      <div
                        onClick={() => setExpandedNodeId(isNodeExpanded ? null : node.id)}
                        className="flex items-start justify-between gap-2 cursor-pointer"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/60 font-mono">
                              [{node.id}]
                            </span>
                            <h4 className="text-xs font-extrabold text-white">
                              {node.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-stone-300 leading-relaxed">
                            {node.summary2Liner || node.statement}
                          </p>
                        </div>
                        <button
                          className="p-1 text-stone-400 hover:text-white"
                          title={isNodeExpanded ? "Collapse node" : "Expand node"}
                        >
                          {isNodeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Constitutional Reach Mini Bar */}
                      <div className="space-y-1 pt-1 border-t border-stone-800/60">
                        <div className="flex items-center justify-between text-[9px] text-stone-400">
                          <span className="flex items-center gap-1">
                            <Scale className="w-3 h-3 text-sky-400" />
                            <span>Constitutional Reach</span>
                          </span>
                          <span className="font-mono font-bold text-sky-300">{reach}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-amber-500 rounded-full"
                            style={{ width: `${reach}%` }}
                          />
                        </div>
                      </div>

                      {/* Expanded Deep Details */}
                      {isNodeExpanded && (
                        <div className="pt-2 space-y-2.5 border-t border-stone-800 text-[11px]">
                          {/* Core Axiom Statement */}
                          <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 space-y-1">
                            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              <span>Formal Axiomatic Statement</span>
                            </span>
                            <p className="text-stone-200 leading-relaxed">
                              {node.statement}
                            </p>
                          </div>

                          {/* Action & Psychology */}
                          {node.actionStatement && (
                            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 space-y-1">
                              <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Action Imperative</span>
                              </span>
                              <p className="text-stone-200 leading-relaxed">
                                {node.actionStatement}
                              </p>
                            </div>
                          )}

                          {/* Constitutional Backing */}
                          {node.lenses?.constitutionQuote && (
                            <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-900/40 space-y-1">
                              <span className="text-[9px] font-black uppercase text-sky-400 tracking-wider flex items-center gap-1">
                                <Scale className="w-3 h-3" />
                                <span>{node.lenses.constitutionTitle || "Constitutional Backing"}</span>
                              </span>
                              <p className="text-stone-300 italic leading-relaxed text-[10px]">
                                "{node.lenses.constitutionQuote}"
                              </p>
                            </div>
                          )}

                          {/* 📜 Ancient Scroll Style Panchatantra Parable Anchor */}
                          {node.lenses?.parableAnchor && (
                            <div className="p-3 rounded-xl border border-amber-700/60 bg-gradient-to-b from-amber-950/40 via-stone-900/90 to-amber-950/30 space-y-2 relative overflow-hidden shadow-inner">
                              <div className="flex items-center justify-between gap-1.5 border-b border-amber-800/40 pb-1.5">
                                <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1 font-serif-axiom">
                                  <span>📜 Panchatantra Parable Anchor</span>
                                </span>
                                <span className="text-[8px] font-bold bg-amber-950 text-amber-300 border border-amber-700/80 px-1.5 py-0.5 rounded-full">
                                  {node.lenses.parableAnchor.source}
                                </span>
                              </div>

                              <div>
                                <div className="text-[11px] font-black text-amber-200 font-serif-axiom">
                                  {node.lenses.parableAnchor.title}
                                </div>
                                <p className="text-[10px] text-stone-300 italic leading-relaxed mt-1">
                                  "{node.lenses.parableAnchor.story}"
                                </p>
                              </div>

                              <div className="p-2 rounded-lg bg-amber-950/70 border border-amber-600/70 text-amber-300 text-[10px] space-y-0.5">
                                <span className="text-[8px] font-black uppercase tracking-wider text-amber-400 block">
                                  💡 Moral Takeaway:
                                </span>
                                <p className="font-bold leading-tight">
                                  {node.lenses.parableAnchor.moralOneLiner}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Quick Socratic Action Buttons */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => {
                                setSelectedNode(node);
                                setChatInputPrompt(`Socrates, analyze Node [${node.id}] "${node.title}" against foundational axioms and cite modern legal dilemmas.`);
                                toggleChat(true);
                              }}
                              className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-[10px] flex items-center justify-center gap-1.5 shadow cursor-pointer"
                            >
                              <Bot className="w-3.5 h-3.5" />
                              <span>Reflect with Socrates</span>
                            </button>

                            <button
                              onClick={() => setSelectedNode(node)}
                              className="py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-[10px] border border-stone-700 cursor-pointer"
                            >
                              Inspect Full Node
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
