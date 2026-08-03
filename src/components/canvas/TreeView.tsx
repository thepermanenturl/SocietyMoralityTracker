import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMoralityStore } from '../../store/useMoralityStore';
import { MoralityNode } from '../../types/morality';
import { ENRICHED_MORALITY_NODES, ACTION_MAPPINGS } from '../../data/moralityNodesData';

const getNodeColorStyle = (node: MoralityNode, isPsychologyTree: boolean) => {
  if (isPsychologyTree) {
    return 'from-purple-900/95 via-purple-950 to-slate-950 border-purple-500/90 text-purple-200 shadow-purple-900/50';
  }

  // Minimal Origin Primitives (-1) & Foundational Axioms (0)
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

  const isPrimitive = node.layer === -1;
  const isAxiom = node.layer === 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
        setChatInputPrompt(`Discuss node [${node.id}] ${displayTitle}: ${actionInfo?.actionStatement || node.statement}`);
      }}
      className={`rounded-2xl border bg-gradient-to-br ${colorStyle} transition-all duration-300 text-center relative overflow-hidden flex flex-col items-center justify-center ${
        isPrimitive ? 'w-[300px] px-6 py-4.5 min-h-[76px]' : isAxiom ? 'w-[270px] px-5 py-4 min-h-[68px]' : 'w-[260px] px-4 py-3.5 min-h-[62px]'
      } ${
        isSelected
          ? 'ring-4 ring-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.95)] scale-110 z-30 opacity-100'
          : isDimmed
          ? 'opacity-20 grayscale scale-95 border-slate-800 bg-slate-950 shadow-none z-0 blur-[0.4px]'
          : isHighlighted
          ? 'ring-2 ring-cyan-400 border-cyan-400/90 z-20 opacity-100 shadow-xl shadow-cyan-900/40'
          : 'shadow-lg hover:scale-105 opacity-100'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-top-2" />
      
      {/* Semi-transparent Node ID Watermark */}
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

      {/* Node Title with Custom Sizing per Layer */}
      <div className={`relative z-10 font-extrabold text-white truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full tracking-wide drop-shadow-md ${
        isPrimitive ? 'text-base font-black tracking-wider' : isAxiom ? 'text-sm font-extrabold' : 'text-xs font-bold'
      }`}>
        {displayTitle}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-bottom-2" />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNodeComponent
};

export const TreeView: React.FC = () => {
  const {
    selectedNode,
    setSelectedNode,
    activeParadigm,
    aiMatchedNodeIds,
    isDarkMode,
    setActiveDrawer
  } = useMoralityStore();

  const activeNodes = ENRICHED_MORALITY_NODES;
  const isActionTree = activeParadigm === 'action_tree';
  const isPsychologyTree = activeParadigm === 'psychology_tree';

  // Connected nodes map
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const set = new Set<string>([selectedNode.id]);

    if (selectedNode.parentIds) {
      selectedNode.parentIds.forEach((pid) => set.add(pid));
    }

    activeNodes.forEach((node) => {
      if (node.parentIds?.includes(selectedNode.id)) {
        set.add(node.id);
      }
    });

    return set;
  }, [selectedNode, activeNodes]);

  // Compute Layout Nodes & Edges
  const { initialNodes, initialEdges } = useMemo(() => {
    const layers: Record<number, MoralityNode[]> = {};
    activeNodes.forEach((n) => {
      if (!layers[n.layer]) layers[n.layer] = [];
      layers[n.layer].push(n);
    });

    const flowNodes: any[] = [];
    const flowEdges: any[] = [];

    const layerKeys = Object.keys(layers)
      .map(Number)
      .sort((a, b) => a - b);

    const safeAiMatched = (aiMatchedNodeIds || []).map(id => id.toUpperCase());
    const hasNewsHighlight = safeAiMatched.length > 0;

    layerKeys.forEach((layerNum) => {
      const nodeList = layers[layerNum];
      const count = nodeList.length;
      const spacingX = 320;
      const yPos = (layerNum + 1) * 190;

      nodeList.forEach((node, idx) => {
        const x = (idx - (count - 1) / 2) * spacingX;
        const y = yPos;

        const isConnected = connectedNodeIds.has(node.id) || safeAiMatched.includes(node.id.toUpperCase());
        const isDimmed = (selectedNode !== null || hasNewsHighlight) && !isConnected;

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
                  : (isDarkMode ? '#64748b' : '#94a3b8')
              }
            });
          });
        }
      });
    });

    return { initialNodes: flowNodes, initialEdges: flowEdges };
  }, [activeNodes, selectedNode, connectedNodeIds, aiMatchedNodeIds, isDarkMode, isActionTree, isPsychologyTree]);

  const handlePaneClick = () => {
    setSelectedNode(null);
    setActiveDrawer(null);
  };

  return (
    <div id="tour-main-canvas" className={`w-full h-full pt-16 ${isDarkMode ? 'bg-slate-950' : 'bg-[#e6e4dd]'}`}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onPaneClick={handlePaneClick}
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
          color={isDarkMode ? '#334155' : '#a8a29e'}
        />
        <Controls
          className="!bg-slate-900/95 !border-slate-800 !text-white !rounded-xl !shadow-xl"
        />
      </ReactFlow>
    </div>
  );
};
