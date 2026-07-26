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

const getNodeColorStyle = (node: MoralityNode): string => {
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

const CustomNodeComponent = ({ data }: { data: { node: MoralityNode; isSelected: boolean; isHighlighted: boolean; isDimmed: boolean } }) => {
  const { setSelectedNode } = useMoralityStore();
  const { node, isSelected, isHighlighted, isDimmed } = data;

  const colorStyle = getNodeColorStyle(node);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(node);
      }}
      className={`px-5 py-3.5 rounded-2xl border bg-gradient-to-br ${colorStyle} transition-all duration-300 w-[250px] text-center relative overflow-hidden flex items-center justify-center min-h-[58px] ${
        isSelected
          ? 'ring-4 ring-cyan-300 shadow-2xl shadow-cyan-500/80 scale-110 z-30 opacity-100'
          : isDimmed
          ? 'opacity-20 grayscale scale-95 border-slate-800 bg-slate-950 shadow-none z-0 blur-[0.4px]'
          : isHighlighted
          ? 'ring-4 ring-amber-400 animate-pulse z-20 opacity-100 shadow-xl'
          : 'shadow-lg hover:scale-105 opacity-100'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-top-2" />
      
      {/* Semi-transparent Node ID Watermark in Card Background */}
      <div className="absolute inset-0 flex items-center justify-center text-5xl font-black opacity-20 text-slate-300 pointer-events-none select-none tracking-tighter uppercase z-0">
        {node.id}
      </div>

      {/* ENLARGED SINGLE LINE Node Title */}
      <div className="relative z-10 text-sm font-black text-white truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full tracking-wide">
        {node.title}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-900 !-bottom-2" />
    </div>
  );
};

const nodeTypes = { customNode: CustomNodeComponent };

export const TreeView: React.FC = () => {
  const { nodes, selectedNode, setSelectedNode, aiMatchedNodeIds, isDarkMode } = useMoralityStore();

  // Compute set of connected node IDs for active selectedNode
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();

    const connected = new Set<string>([selectedNode.id]);

    // Add direct parents
    if (selectedNode.parentIds) {
      selectedNode.parentIds.forEach(pId => connected.add(pId));
    }

    // Add direct children
    nodes.forEach(n => {
      if (n.parentIds && n.parentIds.includes(selectedNode.id)) {
        connected.add(n.id);
      }
    });

    return connected;
  }, [selectedNode, nodes]);

  const { initialNodes, initialEdges } = useMemo(() => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    // Group nodes by layer: -1, 0, 1, 2, 3
    const layers: Record<number, MoralityNode[]> = { '-1': [], 0: [], 1: [], 2: [], 3: [] };
    nodes.forEach(n => {
      const l = Math.min(3, Math.max(-1, n.layer));
      if (!layers[l]) layers[l] = [];
      layers[l].push(n);
    });

    const layerYOffset: Record<number, number> = {
      '-1': 30,
      0: 180,
      1: 360,
      2: 540,
      3: 720
    };

    Object.entries(layers).forEach(([layerKeyStr, layerNodes]) => {
      const layerKey = parseInt(layerKeyStr, 10);
      const count = layerNodes.length;
      const spacingX = layerKey === -1 ? 460 : 230;
      const startX = -((count - 1) * spacingX) / 2;
      const y = layerYOffset[layerKey] || 0;

      layerNodes.forEach((node, idx) => {
        const x = startX + idx * spacingX;

        const hasNewsHighlight = aiMatchedNodeIds.length > 0;
        const isNewsMatch = hasNewsHighlight && aiMatchedNodeIds.includes(node.id.toUpperCase());

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
            isHighlighted: isNewsMatch,
            isDimmed
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top
        });

        if (node.parentIds) {
          node.parentIds.forEach((parentId) => {
            const isEdgeConnected = (selectedNode && (selectedNode.id === parentId || selectedNode.id === node.id)) ||
                                    (hasNewsHighlight && aiMatchedNodeIds.includes(parentId.toUpperCase()) && aiMatchedNodeIds.includes(node.id.toUpperCase()));
            const isEdgeDimmed = (selectedNode !== null || hasNewsHighlight) && !isEdgeConnected;

            flowEdges.push({
              id: `edge-${parentId}-${node.id}`,
              source: parentId,
              target: node.id,
              type: 'smoothstep',
              animated: isEdgeConnected || (!selectedNode && !hasNewsHighlight),
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: isEdgeConnected ? 22 : 16,
                height: isEdgeConnected ? 22 : 16,
                color: isEdgeConnected ? '#06b6d4' : (isEdgeDimmed ? '#1e293b' : '#38bdf8')
              },
              style: {
                stroke: isEdgeConnected ? '#06b6d4' : (isEdgeDimmed ? '#1e293b' : '#38bdf8'),
                strokeWidth: isEdgeConnected ? 4.5 : (isEdgeDimmed ? 1.0 : 2.5),
                opacity: isEdgeDimmed ? 0.15 : 1
              }
            });
          });
        }
      });
    });

    return { initialNodes: flowNodes, initialEdges: flowEdges };
  }, [nodes, selectedNode, connectedNodeIds, aiMatchedNodeIds]);

  return (
    <div className={`w-full h-screen pt-16 pb-20 relative ${isDarkMode ? 'bg-slate-950' : 'bg-[#e6e4dd]'}`}>
      {/* ReactFlow Controls High Contrast Override */}
      <style>{`
        .react-flow__controls {
          background-color: #0f172a !important;
          border: 1px solid #334155 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
          overflow: hidden !important;
        }
        .react-flow__controls-button {
          background-color: #0f172a !important;
          border-bottom: 1px solid #1e293b !important;
          width: 32px !important;
          height: 32px !important;
        }
        .react-flow__controls-button:hover {
          background-color: #1e293b !important;
        }
        .react-flow__controls-button svg {
          fill: #38bdf8 !important;
          stroke: #38bdf8 !important;
        }
      `}</style>

      {/* Background Layer Demarcation Watermarks */}
      <div className="absolute left-6 top-24 bottom-24 pointer-events-none flex flex-col justify-between z-0 opacity-30 select-none font-mono">
        <div className="text-sm font-black uppercase text-amber-500 tracking-widest">🌱 Layer -1: Origin Primitives</div>
        <div className="text-sm font-black uppercase text-red-500 tracking-widest">🔴 Layer 0: Foundational Axioms</div>
        <div className="text-sm font-black uppercase text-indigo-500 tracking-widest">🟢 Layer 1: Derived Principles</div>
        <div className="text-sm font-black uppercase text-purple-500 tracking-widest">🔵 Layer 2: Applied Policies</div>
        <div className="text-sm font-black uppercase text-amber-500 tracking-widest">⚡ Layer 3: High-Stakes Dilemmas</div>
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onPaneClick={() => setSelectedNode(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className={isDarkMode ? 'bg-slate-950' : 'bg-[#e6e4dd]'}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color={isDarkMode ? '#334155' : '#94a3b8'} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
