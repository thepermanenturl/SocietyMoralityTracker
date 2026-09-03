import React, { useMemo, useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  type Node as FlowNode,
  type Edge as FlowEdge,
  type ReactFlowInstance
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMoralityStore } from '../../store/useMoralityStore';
import { ENRICHED_MORALITY_NODES, EnrichedMoralityNode } from '../../data/moralityNodesData';
import { TreeLens } from '../../types/morality';
import { Compass } from 'lucide-react';

const ROOT_PRIMITIVE_IDS = new Set(['P1_HARM', 'P2_AGENCY', 'P3_EQUITY']);

const getMobileLayerColor = (layer: number, isSelected: boolean, isRelated: boolean, isDimmed: boolean) => {
  if (isDimmed) {
    return {
      bg: 'bg-stone-900/40',
      border: 'border-stone-800/40',
      text: 'text-stone-600',
      opacity: 'opacity-30'
    };
  }

  if (isSelected) {
    return {
      bg: 'bg-amber-950/95',
      border: 'border-amber-400 ring-2 ring-amber-400/60',
      text: 'text-amber-200 font-black',
      opacity: 'opacity-100 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
    };
  }

  if (isRelated) {
    return {
      bg: 'bg-emerald-950/90',
      border: 'border-emerald-400/80',
      text: 'text-emerald-200 font-bold',
      opacity: 'opacity-100 shadow-[0_0_12px_rgba(16,185,129,0.35)]'
    };
  }

  switch (layer) {
    case -1:
      return { bg: 'bg-emerald-950/80', border: 'border-emerald-500/70', text: 'text-emerald-300', opacity: 'opacity-95' };
    case 0:
      return { bg: 'bg-amber-950/80', border: 'border-amber-500/70', text: 'text-amber-300', opacity: 'opacity-95' };
    case 1:
      return { bg: 'bg-indigo-950/80', border: 'border-indigo-500/70', text: 'text-indigo-300', opacity: 'opacity-95' };
    case 2:
      return { bg: 'bg-purple-950/80', border: 'border-purple-500/70', text: 'text-purple-300', opacity: 'opacity-95' };
    case 3:
      return { bg: 'bg-teal-950/80', border: 'border-teal-500/70', text: 'text-teal-300', opacity: 'opacity-95' };
    default:
      return { bg: 'bg-stone-900/80', border: 'border-stone-600/70', text: 'text-stone-300', opacity: 'opacity-95' };
  }
};

const MobileGraphNodeComponent: React.FC<{ data: any }> = ({ data }) => {
  const { node, lens, isSelected, isRelated, isDimmed, onSelect } = data;
  const colors = getMobileLayerColor(node.layer, isSelected, isRelated, isDimmed);

  let lensSnippet = node.statement;
  if (lens === 'psychology' && node.lenses?.psychology?.cognitiveBias) {
    lensSnippet = `🧠 ${node.lenses.psychology.cognitiveBias}`;
  } else if (lens === 'action' && node.lenses?.action?.actionDirective) {
    lensSnippet = `⚡ ${node.lenses.action.actionDirective}`;
  } else if (node.lenses?.dharmicRoot?.sanskritTerm) {
    lensSnippet = `🕉️ ${node.lenses.dharmicRoot.sanskritTerm}`;
  }

  return (
    <div
      onClick={() => onSelect(node)}
      className={`w-[170px] min-h-[64px] p-2 rounded-xl border transition-all duration-200 cursor-pointer select-none ${colors.bg} ${colors.border} ${colors.opacity} shadow-lg flex flex-col justify-between`}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-amber-400 !border-stone-950" />

      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-mono font-bold text-amber-400 bg-stone-950/70 px-1 py-0.5 rounded border border-amber-900/40">
            [{node.id}]
          </span>
          <span className="text-[9px] text-stone-400 font-semibold uppercase truncate">
            {node.layer === -1 ? 'Root' : `L${node.layer}`}
          </span>
        </div>
        <h4 className={`text-[11px] leading-tight font-extrabold truncate ${colors.text}`}>
          {node.title}
        </h4>
      </div>

      <p className="text-[9px] text-stone-300/80 truncate mt-1">
        {lensSnippet}
      </p>

      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-amber-400 !border-stone-950" />
    </div>
  );
};

const nodeTypes = {
  mobileNode: MobileGraphNodeComponent
};

export interface MobileGraphCanvasProps {
  onNodeSelect?: (node: EnrichedMoralityNode) => void;
}

const MobileGraphCanvasInner: React.FC<MobileGraphCanvasProps> = ({ onNodeSelect }) => {
  const {
    treeLens,
    setTreeLens,
    selectedNode,
    setSelectedNode,
    aiMatchedNodeIds,
    setAiMatchedNodeIds,
    isDarkMode
  } = useMoralityStore();

  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);

  const activeRelations = useMemo(() => {
    const set = new Set<string>();
    if (!selectedNode) {
      ROOT_PRIMITIVE_IDS.forEach((id) => set.add(id));
      return set;
    }

    set.add(selectedNode.id);
    (selectedNode.parentIds || []).forEach((pid) => set.add(pid));

    ENRICHED_MORALITY_NODES.forEach((n) => {
      if ((n.parentIds || []).includes(selectedNode.id)) {
        set.add(n.id);
      }
    });

    return set;
  }, [selectedNode]);

  const handleSelectNode = useCallback(
    (node: EnrichedMoralityNode) => {
      setSelectedNode(node);
      setAiMatchedNodeIds([node.id]);
      if (onNodeSelect) onNodeSelect(node);
    },
    [setSelectedNode, setAiMatchedNodeIds, onNodeSelect]
  );

  const { nodes, edges } = useMemo(() => {
    const layerGroups: Record<number, EnrichedMoralityNode[]> = {};
    [-1, 0, 1, 2, 3, 4].forEach((l) => (layerGroups[l] = []));

    ENRICHED_MORALITY_NODES.forEach((node) => {
      const l = node.layer ?? 0;
      if (!layerGroups[l]) layerGroups[l] = [];
      layerGroups[l].push(node);
    });

    const flowNodes: FlowNode[] = [];
    const flowEdges: FlowEdge[] = [];

    const HORIZONTAL_GAP = 230;
    const VERTICAL_GAP = 90;

    Object.keys(layerGroups).forEach((layerKey) => {
      const layerNum = Number(layerKey);
      const group = layerGroups[layerNum];
      const colIndex = layerNum + 1;

      group.forEach((node, idx) => {
        const isSelected = selectedNode?.id === node.id;
        const isRelated = activeRelations.has(node.id) && !isSelected;
        const hasSelection = Boolean(selectedNode);
        const isDimmed = hasSelection && !isSelected && !isRelated;

        const xPos = colIndex * HORIZONTAL_GAP;
        const yPos = idx * VERTICAL_GAP + (layerNum % 2 === 0 ? 10 : 35);

        flowNodes.push({
          id: node.id,
          type: 'mobileNode',
          position: { x: xPos, y: yPos },
          data: {
            node,
            lens: treeLens,
            isSelected,
            isRelated,
            isDimmed,
            onSelect: handleSelectNode
          }
        });

        (node.parentIds || []).forEach((pid) => {
          const edgeActive = (isSelected && pid === selectedNode?.id) || (isSelected && (node.parentIds || []).includes(selectedNode?.id)) || (node.id === selectedNode?.id);
          flowEdges.push({
            id: `e-${pid}-${node.id}`,
            source: pid,
            target: node.id,
            type: 'smoothstep',
            animated: edgeActive,
            style: {
              stroke: edgeActive ? '#f59e0b' : isDimmed ? 'rgba(80,80,80,0.2)' : 'rgba(217, 119, 6, 0.4)',
              strokeWidth: edgeActive ? 2.5 : 1.2
            }
          });
        });
      });
    });

    return { nodes: flowNodes, edges: flowEdges };
  }, [treeLens, selectedNode, activeRelations, handleSelectNode]);

  useEffect(() => {
    if (!flowInstance) return;
    const timer = setTimeout(() => {
      if (selectedNode) {
        flowInstance.fitView({
          nodes: [{ id: selectedNode.id }],
          duration: 400,
          padding: 0.8
        });
      } else {
        flowInstance.fitView({
          nodes: Array.from(ROOT_PRIMITIVE_IDS).map((id) => ({ id })),
          duration: 400,
          padding: 0.3
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [flowInstance, selectedNode]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] bg-stone-950 rounded-2xl border border-amber-900/40 overflow-hidden shadow-inner flex flex-col">
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-1.5 pointer-events-auto">
        <div className="flex items-center gap-1 bg-stone-900/90 border border-amber-900/50 p-1 rounded-xl shadow-md backdrop-blur-md">
          <button
            onClick={() => setTreeLens('moral')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              treeLens === 'moral' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>🌿</span>
            <span>Moral</span>
          </button>
          <button
            onClick={() => setTreeLens('action')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              treeLens === 'action' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>⚡</span>
            <span>Action</span>
          </button>
          <button
            onClick={() => setTreeLens('psychology')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              treeLens === 'psychology' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>🧠</span>
            <span>Psych</span>
          </button>
        </div>

        <div className="flex items-center gap-1 bg-stone-900/90 border border-amber-900/50 p-1 rounded-xl shadow-md backdrop-blur-md">
          <button
            onClick={() => {
              setSelectedNode(null);
              setAiMatchedNodeIds([]);
              flowInstance?.fitView({ padding: 0.3, duration: 400 });
            }}
            className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            title="Reset focus to all 3 Root Primitives"
          >
            <Compass className="w-3 h-3 text-amber-400" />
            <span>3 Roots</span>
          </button>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={(inst) => setFlowInstance(inst)}
        nodesDraggable={false}
        elementsSelectable={true}
        panOnDrag={true}
        zoomOnPinch={true}
        panOnScroll={false}
        preventScrolling={true}
        minZoom={0.2}
        maxZoom={2.0}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.4}
          color={isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(180, 83, 9, 0.12)'}
        />
        <Controls
          showInteractive={false}
          className="!bg-stone-900/95 !border-amber-900/40 !text-stone-100 !rounded-xl !shadow-xl !mb-2 !mr-2"
        />
      </ReactFlow>

      <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
        <span className="text-[9px] text-stone-500 font-mono bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
          👉 Tap node to inspect • Pinch to zoom
        </span>
      </div>
    </div>
  );
};

export const MobileGraphCanvas: React.FC<MobileGraphCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MobileGraphCanvasInner {...props} />
    </ReactFlowProvider>
  );
};

export default MobileGraphCanvas;
