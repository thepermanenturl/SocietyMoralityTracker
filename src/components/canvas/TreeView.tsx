import React, { useState, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  BackgroundVariant,
  type Node as FlowNode,
  type Edge as FlowEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMoralityStore } from '../../store/useMoralityStore';
import { MoralityNode, TreeLens } from '../../types/morality';
import { ENRICHED_MORALITY_NODES, ACTION_MAPPINGS, EnrichedMoralityNode } from '../../data/moralityNodesData';

const UPPER_TRACK_IDS = new Set(['P1_HARM', 'A1', 'A2', 'B1', 'C1', 'C2', 'D8']);
const MIDDLE_TRACK_IDS = new Set(['P3_EQUITY', 'A3', 'A5', 'A6', 'B3', 'C3', 'E10']);
const LOWER_TRACK_IDS = new Set(['P2_AGENCY', 'A4', 'B2', 'E1', 'E5', 'E6', 'E7', 'D4']);

interface FoundationPrimitiveItem {
  id: string;
  icon: string;
  title: string;
}

const FOUNDATION_PRIMITIVES: Record<TreeLens, FoundationPrimitiveItem[]> = {
  moral: [
    { id: 'P1_HARM', icon: '🛡️', title: 'Ahimsa (Non-Harm)' },
    { id: 'P2_AGENCY', icon: '🗽', title: 'Swatantrata (Agency)' },
    { id: 'P3_EQUITY', icon: '⚖️', title: 'Nyaya (Equal Weight)' }
  ],
  action: [
    { id: 'P1_HARM', icon: '🛡️', title: 'Minimize Trauma' },
    { id: 'P2_AGENCY', icon: '🗽', title: 'Protect Free Consent' },
    { id: 'P3_EQUITY', icon: '⚖️', title: 'Enforce Equal Justice' }
  ],
  psychology: [
    { id: 'P1_HARM', icon: '🛡️', title: 'Mitigate Out-Group Bias' },
    { id: 'P2_AGENCY', icon: '👁️', title: 'Expose Autonomy Threats' },
    { id: 'P3_EQUITY', icon: '⚖️', title: 'Override Dissonance' }
  ]
};

const getNodeColorStyle = (node: MoralityNode, isPsychologyTree: boolean) => {
  if (isPsychologyTree) {
    return 'from-purple-900/95 via-purple-950 to-stone-950 border-purple-500/90 text-purple-200 shadow-purple-950/50';
  }

  // Minimal Origin Primitives (-1) & Foundational Axioms (0) - Vedic Ahimsa, Swatantrata, Nyaya
  if (node.id === 'P1_HARM' || node.id === 'A1' || node.id === 'A2') {
    return 'from-red-900/95 via-red-950 to-stone-950 border-red-600/90 text-red-200 shadow-red-950/60';
  }
  if (node.id === 'P2_AGENCY' || node.id === 'A3' || node.id === 'A4') {
    return 'from-emerald-900/95 via-teal-950 to-stone-950 border-emerald-500/90 text-emerald-200 shadow-emerald-950/60';
  }
  if (node.id === 'P3_EQUITY' || node.id === 'A5' || node.id === 'A6') {
    return 'from-cyan-900/90 via-blue-950 to-stone-950 border-cyan-500/80 text-cyan-200 shadow-cyan-950/60';
  }

  // Derived Layers: Natural Vedic Color Combinations
  const layerStyles: Record<number, string> = {
    '1': 'from-indigo-900/90 to-indigo-950 border-indigo-400/70 text-indigo-200 shadow-indigo-950/40',
    '2': 'from-violet-900/90 to-purple-950 border-violet-400/70 text-purple-200 shadow-purple-950/40',
    '3': 'from-amber-800/95 to-yellow-950 border-amber-400/80 text-amber-200 shadow-amber-950/50'
  };

  return layerStyles[node.layer] || 'from-stone-900 to-stone-950 border-amber-900/40 text-stone-300';
};

interface CustomNodeData {
  node: EnrichedMoralityNode;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  treeLens: TreeLens;
  isActionTree: boolean;
  isPsychologyTree: boolean;
  isHoriz?: boolean;
  setSelectedNode: (node: MoralityNode | null) => void;
}

const CustomNodeComponent = ({
  data
}: {
  data: CustomNodeData;
}) => {
  const { setSelectedNode, setChatInputPrompt } = useMoralityStore();
  const { node, isSelected, isHighlighted, isDimmed, isActionTree, isPsychologyTree, treeLens, isHoriz } = data;

  const colorStyle = getNodeColorStyle(node, isPsychologyTree);
  const actionInfo = ACTION_MAPPINGS[node.id];

  let displayTitle = node.title;
  let displayStatement = node.statement;
  let displaySubtitle = node.summary2Liner || node.statement;

  if (treeLens === 'action') {
    displayTitle = actionInfo?.actionTitle || node.actionTitle || node.title;
    displayStatement = actionInfo?.actionStatement || node.actionStatement || node.statement;
    displaySubtitle = actionInfo?.actionStatement || node.actionStatement || node.summary2Liner || node.statement;
  } else if (treeLens === 'psychology') {
    displayTitle = node.psychologyTitle || node.title;
    displayStatement = node.psychologyStatement || node.statement;
    displaySubtitle = node.psychologyStatement || node.summary2Liner || node.statement;
  }

  const isPrimitive = node.layer === -1;
  const isAxiom = node.layer === 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
        setChatInputPrompt(`Discuss node [${node.id}] ${displayTitle}: ${displayStatement}`);
      }}
      className={`rounded-2xl border bg-gradient-to-br ${colorStyle} transition-all duration-300 text-center relative overflow-hidden flex flex-col items-center justify-center ${
        isPrimitive ? 'w-[320px] px-6 py-4 min-h-[82px]' : isAxiom ? 'w-[280px] px-5 py-3.5 min-h-[76px]' : 'w-[270px] px-4 py-3 min-h-[70px]'
      } ${
        isSelected
          ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.85)] scale-105 z-30 opacity-100'
          : isDimmed
          ? 'opacity-20 grayscale scale-95 border-stone-800 bg-stone-950 shadow-none z-0 blur-[0.4px]'
          : isHighlighted
          ? 'ring-2 ring-amber-400 border-amber-400/90 z-20 opacity-100 shadow-xl shadow-amber-950/60'
          : 'shadow-lg hover:scale-102 opacity-100'
      }`}
    >
      <Handle
        type="target"
        position={isHoriz ? Position.Left : Position.Top}
        className={`w-3.5 h-3.5 bg-amber-400 border-2 border-stone-950 ${isHoriz ? '!-left-2' : '!-top-2'}`}
      />
      
      {/* Semi-transparent Node ID Watermark */}
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black opacity-15 text-stone-300 pointer-events-none select-none tracking-widest uppercase z-0 truncate px-2">
        {node.id}
      </div>

      {/* Mode Badge Indicator */}
      {isActionTree && (
        <span className="relative z-10 text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 mb-0.5">
          ⚡ Action Imperative
        </span>
      )}

      {isPsychologyTree && (
        <span className="relative z-10 text-[9px] font-extrabold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800 mb-0.5">
          🧠 Behavioral Psychology
        </span>
      )}

      {/* Multi-line Node Title with Serif Font for Axioms */}
      <div className={`relative z-10 font-extrabold text-white text-wrap break-words leading-tight max-w-full tracking-wide drop-shadow-md py-0.5 ${
        isPrimitive ? 'text-base font-black tracking-wider font-serif-axiom' : isAxiom ? 'text-sm font-extrabold font-serif-axiom' : 'text-xs font-bold'
      }`}>
        {displayTitle}
      </div>

      {/* 2-Liner Subtitle Preview */}
      {displaySubtitle && !isPrimitive && (
        <p className="relative z-10 text-[10px] text-stone-300/80 line-clamp-2 mt-0.5 leading-snug font-medium max-w-full px-1 pointer-events-none">
          {displaySubtitle}
        </p>
      )}

      <Handle
        type="source"
        position={isHoriz ? Position.Right : Position.Bottom}
        className={`w-3.5 h-3.5 bg-amber-400 border-2 border-stone-950 ${isHoriz ? '!-right-2' : '!-bottom-2'}`}
      />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNodeComponent
};

const TreeViewContent: React.FC = () => {
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical');

  const {
    treeLens,
    setTreeLens,
    selectedNode,
    setSelectedNode,
    aiMatchedNodeIds,
    setAiMatchedNodeIds,
    setHighlightRationale,
    setChatInputPrompt,
    isDarkMode,
    setActiveDrawer
  } = useMoralityStore();

  const activeNodes = ENRICHED_MORALITY_NODES;
  const isActionTree = treeLens === 'action';
  const isPsychologyTree = treeLens === 'psychology';

  // Connected nodes map
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const ids = new Set<string>();
    ids.add(selectedNode.id);

    if (selectedNode.parentIds) {
      selectedNode.parentIds.forEach((id) => ids.add(id));
    }

    activeNodes.forEach((n) => {
      if (n.parentIds && n.parentIds.includes(selectedNode.id)) {
        ids.add(n.id);
      }
    });

    return ids;
  }, [selectedNode, activeNodes]);

  const safeAiMatched = useMemo(() => {
    return Array.isArray(aiMatchedNodeIds) 
      ? aiMatchedNodeIds.map(id => typeof id === 'string' ? id.toUpperCase() : '') 
      : [];
  }, [aiMatchedNodeIds]);

  // Compute Layout Nodes & Edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const flowNodes: FlowNode[] = [];
    const flowEdges: FlowEdge[] = [];

    const layerGroups: Record<number, MoralityNode[]> = {};
    activeNodes.forEach((node) => {
      if (!layerGroups[node.layer]) {
        layerGroups[node.layer] = [];
      }
      layerGroups[node.layer].push(node);
    });

    const hasNewsHighlight = safeAiMatched.length > 0;

    if (layoutMode === 'horizontal') {
      // Horizontal Dialectic Step Tree Layout
      Object.keys(layerGroups).forEach((layerKey) => {
        const layer = parseInt(layerKey, 10);
        const nodesInLayer = layerGroups[layer];

        // 3 Dialectical Tracks: 0: Upper (Harm/Order), 1: Middle (Truth/Equity), 2: Lower (Agency/Liberty)
        const trackBuckets: [MoralityNode[], MoralityNode[], MoralityNode[]] = [[], [], []];
        const unassigned: MoralityNode[] = [];

        nodesInLayer.forEach((node) => {
          const id = node.id.toUpperCase();
          if (UPPER_TRACK_IDS.has(id)) {
            trackBuckets[0].push(node);
          } else if (MIDDLE_TRACK_IDS.has(id)) {
            trackBuckets[1].push(node);
          } else if (LOWER_TRACK_IDS.has(id)) {
            trackBuckets[2].push(node);
          } else {
            unassigned.push(node);
          }
        });

        // Distribute remaining nodes evenly across the tracks
        unassigned.forEach((node, idx) => {
          trackBuckets[idx % 3].push(node);
        });

        const trackCenterY = [0, 420, 840];
        const xPos = (layer + 1) * 440;

        trackBuckets.forEach((bucketNodes, trackIdx) => {
          const totalInTrack = bucketNodes.length;
          const baseY = trackCenterY[trackIdx];

          bucketNodes.forEach((node, indexInTrack) => {
            const isSelected = selectedNode?.id === node.id;
            const isConnected = connectedNodeIds.has(node.id);
            const isHighlighted = hasNewsHighlight && safeAiMatched.includes(node.id.toUpperCase());
            const isDimmed = (selectedNode !== null || hasNewsHighlight) && !isConnected && !isHighlighted;

            // Generous stepped spacing: 140px vertical step and slight horizontal stagger
            const yOffset = totalInTrack > 1 
              ? (indexInTrack - (totalInTrack - 1) / 2) * 140 
              : 0;
            const stepXStagger = (indexInTrack % 2 === 1) ? 20 : 0;

            flowNodes.push({
              id: node.id,
              type: 'customNode',
              data: {
                node,
                isSelected,
                isDimmed,
                isHighlighted,
                treeLens,
                isActionTree,
                isPsychologyTree,
                isHoriz: true,
                setSelectedNode
              },
              position: {
                x: xPos + stepXStagger,
                y: baseY + yOffset
              },
              sourcePosition: Position.Right,
              targetPosition: Position.Left
            });
          });
        });
      });
    } else {
      // Top-to-bottom Vertical Tree Layout
      Object.keys(layerGroups).forEach((layerKey) => {
        const layer = parseInt(layerKey, 10);
        const nodesInLayer = layerGroups[layer];
        const spacingX = 320;
        const totalWidth = (nodesInLayer.length - 1) * spacingX;
        const startX = -totalWidth / 2;

        nodesInLayer.forEach((node, index) => {
          const isSelected = selectedNode?.id === node.id;
          const isConnected = connectedNodeIds.has(node.id);
          const isHighlighted = hasNewsHighlight && safeAiMatched.includes(node.id.toUpperCase());
          const isDimmed = (selectedNode !== null || hasNewsHighlight) && !isConnected && !isHighlighted;

          flowNodes.push({
            id: node.id,
            type: 'customNode',
            data: {
              node,
              isSelected,
              isDimmed,
              isHighlighted,
              treeLens,
              isActionTree,
              isPsychologyTree,
              isHoriz: false,
              setSelectedNode
            },
            position: {
              x: startX + index * spacingX,
              y: layer * 220
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top
          });
        });
      });
    }

    // Connect edges
    activeNodes.forEach((node) => {
      if (node.parentIds) {
        node.parentIds.forEach((parentId) => {
          const isEdgeConnected = (selectedNode && (selectedNode.id === parentId || selectedNode.id === node.id)) ||
                                  (hasNewsHighlight && safeAiMatched.includes(parentId.toUpperCase()) && safeAiMatched.includes(node.id.toUpperCase()));
          const isEdgeDimmed = (selectedNode !== null || hasNewsHighlight) && !isEdgeConnected;

          flowEdges.push({
            id: `e-${parentId}-${node.id}`,
            source: parentId,
            target: node.id,
            type: 'smoothstep',
            animated: isEdgeConnected,
            style: {
              stroke: isEdgeConnected
                ? '#fbbf24'
                : isEdgeDimmed
                ? (isDarkMode ? '#292524' : '#e7e5e4')
                : (isDarkMode ? '#57534e' : '#a8a29e'),
              strokeWidth: isEdgeConnected ? 2.5 : 1.5
            }
          });
        });
      }
    });

    return { initialNodes: flowNodes, initialEdges: flowEdges };
  }, [activeNodes, selectedNode, connectedNodeIds, safeAiMatched, isDarkMode, treeLens, isActionTree, isPsychologyTree, layoutMode, setSelectedNode]);

  const handlePaneClick = () => {
    setSelectedNode(null);
    setActiveDrawer(null);
    setAiMatchedNodeIds([]);
    setHighlightRationale(null);
  };

  const handlePrimitiveClick = (p: FoundationPrimitiveItem) => {
    const targetNode = activeNodes.find((n) => n.id === p.id) || null;
    setSelectedNode(targetNode);
    setAiMatchedNodeIds([p.id]);

    let body = targetNode?.statement || '';
    if (treeLens === 'action') {
      body = targetNode?.actionStatement || ACTION_MAPPINGS[p.id]?.actionStatement || targetNode?.statement || '';
    } else if (treeLens === 'psychology') {
      body = targetNode?.psychologyStatement || targetNode?.statement || '';
    }

    setHighlightRationale({
      title: `${p.icon} ${p.title}`,
      icon: p.icon,
      body,
      nodeIds: [p.id]
    });

    if (targetNode) {
      setChatInputPrompt(`Analyze foundation primitive [${p.id}] ${p.title}: ${body}`);
    }
  };

  return (
    <div 
      id="tour-main-canvas" 
      onClick={(e) => {
        if (e.target === e.currentTarget) handlePaneClick();
      }}
      className={`relative w-full h-full pt-28 ${isDarkMode ? 'bg-stone-950' : 'bg-[#faf8f5]'}`}
    >
      {/* Top Unified Floating Control Dock (Lens Switcher + Primitives) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center justify-center gap-2 bg-stone-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-amber-900/40 shadow-2xl max-w-[95vw] pointer-events-auto">
        {/* 3-Lens Mode Segmented Switcher */}
        <div className="flex items-center gap-1 bg-stone-950/70 p-1 rounded-xl border border-stone-800/80 shrink-0">
          <button
            onClick={() => setTreeLens('moral')}
            className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              treeLens === 'moral'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60 font-medium'
            }`}
          >
            <span>🌿</span>
            <span>Moral Axioms</span>
          </button>
          <button
            onClick={() => setTreeLens('action')}
            className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              treeLens === 'action'
                ? 'bg-amber-600 text-white font-bold shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60 font-medium'
            }`}
          >
            <span>⚡</span>
            <span>Action Imperatives</span>
          </button>
          <button
            onClick={() => setTreeLens('psychology')}
            className={`px-3 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              treeLens === 'psychology'
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60 font-medium'
            }`}
          >
            <span>🧠</span>
            <span>Behavioral Psychology</span>
          </button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-amber-900/50 shrink-0" />

        {/* 3 Foundation Primitives for Active Lens */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {FOUNDATION_PRIMITIVES[treeLens].map((p) => {
            const isSelected = selectedNode?.id === p.id || (safeAiMatched.length === 1 && safeAiMatched.includes(p.id));
            return (
              <button
                key={p.id}
                onClick={() => handlePrimitiveClick(p)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-stone-800/70 hover:bg-stone-800 border-stone-700/60 text-stone-300 hover:text-white'
                }`}
                title={`Focus on ${p.title}`}
              >
                <span>{p.icon}</span>
                <span className="whitespace-nowrap">{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Dialectical Track Guidelines / Badges in Horizontal Mode */}
      {layoutMode === 'horizontal' && (
        <div className="absolute top-36 left-6 z-20 flex flex-col gap-2 p-3 rounded-2xl bg-stone-900/85 backdrop-blur-md border border-amber-900/40 shadow-2xl pointer-events-auto">
          <div className="text-[10px] font-mono tracking-wider uppercase text-stone-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Dialectical Tracks
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-300 bg-red-950/50 px-3 py-1.5 rounded-xl border border-red-800/40 shadow-sm">
            <span>🛡️</span>
            <div>
              <div className="font-bold leading-none">Harm & Order Track</div>
              <div className="text-[9px] text-red-400/80 mt-0.5">Harm Avoidance & Stability</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/50 px-3 py-1.5 rounded-xl border border-cyan-800/40 shadow-sm">
            <span>⚖️</span>
            <div>
              <div className="font-bold leading-none">Truth & Equity Track</div>
              <div className="text-[9px] text-cyan-400/80 mt-0.5">Epistemic Truth & Fairness</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-800/40 shadow-sm">
            <span>🗽</span>
            <div>
              <div className="font-bold leading-none">Agency & Liberty Track</div>
              <div className="text-[9px] text-emerald-400/80 mt-0.5">Liberty, Autonomy & Privacy</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom-Right Unified Layout & Zoom Dock */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-stone-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-amber-900/50 shadow-2xl pointer-events-auto">
        <button
          onClick={() => setLayoutMode(layoutMode === 'vertical' ? 'horizontal' : 'vertical')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-200 bg-stone-800/90 hover:bg-stone-750 border border-amber-600/40 hover:border-amber-400 transition-all shadow-md cursor-pointer"
          title="Toggle between Horizontal Step Tree and Vertical Tree Layouts"
        >
          <span>{layoutMode === 'vertical' ? '↔️ Horizontal Step Tree' : '↕️ Vertical Tree'}</span>
        </button>
      </div>

      <ReactFlow
        key={layoutMode}
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        elementsSelectable={true}
        onPaneClick={handlePaneClick}
        onEdgeClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.8}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color={isDarkMode ? 'rgba(180, 83, 9, 0.25)' : 'rgba(120, 53, 15, 0.2)'}
        />
        <Controls
          className="!bg-stone-900/95 !border-amber-900/40 !text-stone-100 !rounded-xl !shadow-xl !mb-12 !mr-0"
        />
      </ReactFlow>
    </div>
  );
};

export const TreeView: React.FC = () => {
  return (
    <ReactFlowProvider>
      <TreeViewContent />
    </ReactFlowProvider>
  );
};

export default TreeView;
