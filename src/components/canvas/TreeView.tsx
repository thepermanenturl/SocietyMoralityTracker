import React, { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Node,
  Edge,
  Position,
  MarkerType,
  BackgroundVariant,
  Handle
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMoralityStore } from '../../store/useMoralityStore';
import { MoralityNode } from '../../types/morality';

import { ACTION_MAPPINGS } from '../../data/moralityData';
import { PSYCHOLOGY_NODES } from '../../data/psychologyData';

const getNodeColorStyle = (node: MoralityNode, isPsychologyTree: boolean = false): string => {
  if (isPsychologyTree) {
    if (node.layer === -1) return 'from-purple-900/95 via-purple-950 to-slate-950 border-purple-400/90 text-purple-200 shadow-purple-900/50';
    if (node.layer === 0) return 'from-indigo-900/95 via-indigo-950 to-slate-950 border-indigo-400/90 text-indigo-200 shadow-indigo-900/50';
    if (node.layer === 1) return 'from-violet-900/95 via-violet-950 to-slate-950 border-violet-400/90 text-violet-200 shadow-violet-900/50';
    if (node.layer === 2) return 'from-fuchsia-900/95 via-fuchsia-950 to-slate-950 border-fuchsia-400/90 text-fuchsia-200 shadow-fuchsia-900/50';
    return 'from-cyan-900/95 via-cyan-950 to-slate-950 border-cyan-400/90 text-cyan-200 shadow-cyan-900/50';
  }

  // Layer -1 Primitives & Layer 0 Axioms: Primary RGB Colors
  if (node.id === 'P1_HARM' || node.id === 'A1' || node.id === 'A2') {
    return 'from-red-900/95 via-red-950 to-slate-950 border-red-500/90 text-red-300 shadow-red-900/50';
  }
  if (node.id === 'P2_AGENCY' || node.id === 'A3' || node.id === 'A4') {
    return 'from-emerald-900/95 via-emerald-950 to-slate-950 border-emerald-500/90 text-emerald-300 shadow-emerald-900/50';
  }
  if (node.id === 'P3_EQUITY' || node.id === 'A5' || node.id === 'A6') {
    return 'from-blue-900/95 via-blue-950 to-slate-950 border-blue-500/90 text-blue-300 shadow-blue-900/50';
  }

  // Derived Layers: Natural Color Combinations
  const layerStyles: Record<number, string> = {
    '1': 'from-indigo-900/95 to-indigo-950 border-indigo-400/80 text-indigo-300 shadow-indigo-900/40',
    '2': 'from-violet-900/95 to-purple-950 border-purple-400/80 text-purple-300 shadow-purple-900/40',
    '3': 'from-amber-900/95 to-amber-950 border-amber-400/80 text-amber-300 shadow-amber-900/40'
  };

  return layerStyles[node.layer] || 'from-slate-900 to-slate-950 border-slate-700 text-slate-300';
};

const CustomNodeComponent = ({ data }: { data: { node: MoralityNode; isSelected: boolean; isHighlighted: boolean; isDimmed: boolean; isActionTree: boolean; isPsychologyTree: boolean } }) => {
  const { setSelectedNode, setChatInputPrompt } = useMoralityStore();
  const { node, isSelected, isHighlighted, isDimmed, isActionTree, isPsychologyTree } = data;

  const colorStyle = getNodeColorStyle(node, isPsychologyTree);
  const actionInfo = ACTION_MAPPINGS[node.id];
  const displayTitle = isActionTree ? (actionInfo?.actionTitle || node.title) : node.title;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
        setChatInputPrompt(`Discuss node [${node.id}] ${displayTitle}: ${actionInfo?.actionStatement || node.statement}`);
      }}
      className={`px-5 py-3.5 rounded-2xl border bg-gradient-to-br ${colorStyle} transition-all duration-300 w-[260px] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[62px] ${
        isSelected
          ? 'ring-4 ring-cyan-300 shadow-2xl shadow-cyan-500/90 scale-110 z-30 opacity-100 animate-pulse'
          : isDimmed
          ? 'opacity-20 grayscale scale-95 border-slate-800 bg-slate-950 shadow-none z-0 blur-[0.4px]'
          : isHighlighted
          ? 'ring-2 ring-cyan-400 border-cyan-400/90 z-20 opacity-100 shadow-xl shadow-cyan-900/40'
          : 'shadow-lg hover:scale-105 opacity-100'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-top-2" />
      
      {/* Semi-transparent Node ID Watermark in Card Background */}
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black opacity-10 text-slate-300 pointer-events-none select-none tracking-widest uppercase z-0 truncate px-2">
        {node.id}
      </div>

      {/* Mode Badge Indicator */}
      {isActionTree && (
        <span className="relative z-10 text-[9px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 mb-0.5">
          ⚡ Action Imperative
        </span>
      )}

      {isPsychologyTree && (
        <span className="relative z-10 text-[9px] font-extrabold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800 mb-0.5">
          🧠 Behavioral Psychology Node
        </span>
      )}

      {/* ENLARGED HIGH CONTRAST Node Title */}
      <div className="relative z-10 text-sm font-extrabold text-white truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full tracking-wide drop-shadow-md">
        {displayTitle}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-bottom-2" />
    </div>
  );
};

const nodeTypes = { customNode: CustomNodeComponent };

export const TreeView: React.FC = () => {
  const { nodes, selectedNode, setSelectedNode, aiMatchedNodeIds, isDarkMode, activeParadigm } = useMoralityStore();
  const isActionTree = activeParadigm === 'action_tree';
  const isPsychologyTree = activeParadigm === 'psychology_tree';

  const activeNodes = isPsychologyTree ? PSYCHOLOGY_NODES : nodes;

  // Compute set of connected node IDs for active selectedNode
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();

    const connected = new Set<string>([selectedNode.id]);

    // Add direct parents
    if (selectedNode.parentIds) {
      selectedNode.parentIds.forEach(pId => connected.add(pId));
    }

    // Add direct children
    activeNodes.forEach(n => {
      if (n.parentIds && n.parentIds.includes(selectedNode.id)) {
        connected.add(n.id);
      }
    });

    return connected;
  }, [selectedNode, activeNodes]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    // Group nodes by layer: -1, 0, 1, 2, 3
    const layers: Record<number, MoralityNode[]> = { '-1': [], 0: [], 1: [], 2: [], 3: [] };
    activeNodes.forEach(n => {
      const l = Math.min(3, Math.max(-1, n.layer));
      if (!layers[l]) layers[l] = [];
      layers[l].push(n);
    });

    const layerYOffset: Record<number, number> = {
      '-1': 30,
      0: 220,
      1: 440,
      2: 660,
      3: 880
    };

    Object.entries(layers).forEach(([layerKeyStr, layerNodes]) => {
      const layerKey = parseInt(layerKeyStr, 10);
      const count = layerNodes.length;
      const spacingX = layerKey === -1 ? 540 : 340;
      const startX = -((count - 1) * spacingX) / 2;
      const y = layerYOffset[layerKey] || 0;

      layerNodes.forEach((node, idx) => {
        const x = startX + idx * spacingX;

        const safeAiMatched = (aiMatchedNodeIds || []).map(id => (id || '').toUpperCase());
        const hasNewsHighlight = safeAiMatched.length > 0;
        const isNewsMatch = hasNewsHighlight && safeAiMatched.includes(node.id.toUpperCase());

        let isConnected = true;
        let isDimmed = false;

        if (selectedNode) {
          isConnected = connectedNodeIds.has(node.id);
          isDimmed = !isConnected;
        } else if (hasNewsHighlight) {
          isConnected = isNewsMatch;
          isDimmed = !isNewsMatch;
        }

        flowNodes.push({
          id: node.id,
          type: 'customNode',
          position: { x, y },
          data: {
            node,
            isSelected: selectedNode?.id === node.id,
            isHighlighted: isConnected && selectedNode?.id !== node.id,
            isDimmed,
            isActionTree,
            isPsychologyTree
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top
        });

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
                  ? '#38bdf8'
                  : isEdgeDimmed
                  ? (isDarkMode ? '#334155' : '#cbd5e1')
                  : (isDarkMode ? '#64748b' : '#94a3b8'),
                strokeWidth: isEdgeConnected ? 3 : 1.5,
                opacity: isEdgeDimmed ? 0.25 : 0.8
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: isEdgeConnected
                  ? '#38bdf8'
                  : isEdgeDimmed
                  ? (isDarkMode ? '#334155' : '#cbd5e1')
                  : (isDarkMode ? '#64748b' : '#94a3b8')
              }
            });
          });
        }
      });
    });

    return { initialNodes: flowNodes, initialEdges: flowEdges };
  }, [activeNodes, selectedNode, connectedNodeIds, aiMatchedNodeIds, isDarkMode, isActionTree, isPsychologyTree]);

  return (
    <div id="tour-main-canvas" className="w-full h-full pt-16 bg-slate-950">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onPaneClick={() => setSelectedNode(null)}
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
          color={isDarkMode ? '#334155' : '#cbd5e1'}
        />
        <Controls
          className="!bg-slate-900/90 !border-slate-800 !text-white !rounded-xl !shadow-xl"
        />
      </ReactFlow>
    </div>
  );
};
