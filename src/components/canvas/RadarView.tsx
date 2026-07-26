import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';

export const RadarView: React.FC = () => {
  const { nodes, selectedNode, setSelectedNode, aiMatchedNodeIds } = useMoralityStore();

  const radii = [0, 160, 310, 460];
  const ringColors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const layers: Record<number, typeof nodes> = { 0: [], 1: [], 2: [], 3: [] };
  nodes.forEach(node => {
    const l = Math.min(3, Math.max(0, node.layer));
    layers[l].push(node);
  });

  return (
    <div className="w-full h-screen pt-16 pb-20 bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <svg className="w-full h-full max-w-4xl max-h-[800px]" viewBox="-550 -550 1100 1100">
        {/* Concentric Radar Rings */}
        {radii.slice(1).map((r, idx) => (
          <circle
            key={`ring-${idx}`}
            cx={0}
            cy={0}
            r={r}
            fill="none"
            stroke={ringColors[idx + 1]}
            strokeWidth={1.5}
            strokeDasharray="6 6"
            className="opacity-40"
          />
        ))}

        {/* Nodes Placed Radially */}
        {Object.entries(layers).map(([layerIdxStr, layerNodes]) => {
          const layerIdx = parseInt(layerIdxStr, 10);
          const r = radii[layerIdx];
          const count = layerNodes.length;

          return layerNodes.map((node, i) => {
            const angle = count > 1 ? (i / count) * 2 * Math.PI - Math.PI / 2 : 0;
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const isSelected = selectedNode?.id === node.id;
            const isHighlighted = aiMatchedNodeIds.includes(node.id.toUpperCase());

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                <rect
                  x={-60}
                  y={-18}
                  width={120}
                  height={36}
                  rx={18}
                  fill="#0f172a"
                  stroke={ringColors[layerIdx]}
                  strokeWidth={isSelected ? 3 : isHighlighted ? 2.5 : 1.5}
                  className={`${isSelected ? 'stroke-white' : ''} ${isHighlighted ? 'stroke-amber-400' : ''}`}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="11"
                  fontWeight="700"
                >
                  [{node.id}] {node.title.substring(0, 10)}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};
