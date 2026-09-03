import React, { useState, useMemo, useCallback } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { ENRICHED_MORALITY_NODES, EnrichedMoralityNode } from '../../data/moralityNodesData';
import { PARLIAMENTARY_BILLS, ParliamentaryBill } from '../../data/parliamentaryBillsData';
import {
  Sparkles,
  TreePine,
  Layers,
  ExternalLink,
  Scale,
  Copy,
  Check,
  ChevronRight,
  Sliders,
  Feather,
  ArrowUpRight
} from 'lucide-react';

export interface SocraticMessageRendererProps {
  content: string;
  sender?: 'user' | 'bot';
  timestamp?: string;
  messageId?: string;
  className?: string;
  onCopy?: (text: string) => void;
  showTreeButton?: boolean;
  showTensionMeter?: boolean;
}

export interface NodeLayerColorConfig {
  bg: string;
  text: string;
  border: string;
  glow: string;
  badgeBg: string;
  dot: string;
  icon: string;
  layerLabel: string;
  accent: string;
}

export const getNodeLayerConfig = (layer: number | 'bill', id?: string): NodeLayerColorConfig => {
  const normId = (id || '').toUpperCase();

  if (layer === 'bill' || normId.startsWith('BILL_')) {
    return {
      bg: 'bg-sky-950/80 hover:bg-sky-900/90 text-sky-200',
      text: 'text-sky-300',
      border: 'border-sky-500/60 hover:border-sky-400',
      glow: 'shadow-[0_0_10px_rgba(14,165,233,0.3)]',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      dot: 'bg-sky-400',
      icon: '📜',
      layerLabel: 'Parliamentary Bill / Act',
      accent: '#0ea5e9'
    };
  }

  if (layer === -1 || normId.startsWith('P1') || normId.startsWith('P2') || normId.startsWith('P3')) {
    if (normId.includes('HARM') || normId === 'P1') {
      return {
        bg: 'bg-emerald-950/85 hover:bg-emerald-900 text-emerald-100',
        text: 'text-emerald-300',
        border: 'border-emerald-500/70 hover:border-emerald-400',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
        dot: 'bg-emerald-400',
        icon: '🛡️',
        layerLabel: 'Root Primitive (P1: Non-Harm)',
        accent: '#10b981'
      };
    }
    if (normId.includes('AGENCY') || normId === 'P2') {
      return {
        bg: 'bg-teal-950/85 hover:bg-teal-900 text-teal-100',
        text: 'text-teal-300',
        border: 'border-teal-500/70 hover:border-teal-400',
        glow: 'shadow-[0_0_12px_rgba(20,184,166,0.35)]',
        badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
        dot: 'bg-teal-400',
        icon: '🗽',
        layerLabel: 'Root Primitive (P2: Agency)',
        accent: '#14b8a6'
      };
    }
    return {
      bg: 'bg-amber-950/85 hover:bg-amber-900 text-amber-100',
      text: 'text-amber-300',
      border: 'border-amber-500/70 hover:border-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      dot: 'bg-amber-400',
      icon: '⚖️',
      layerLabel: 'Root Primitive (P3: Equal Weight)',
      accent: '#f59e0b'
    };
  }

  if (layer === 0 || normId.startsWith('A')) {
    return {
      bg: 'bg-amber-950/80 hover:bg-amber-900/90 text-amber-100',
      text: 'text-amber-300',
      border: 'border-amber-500/70 hover:border-amber-400',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      dot: 'bg-amber-400',
      icon: '🏛️',
      layerLabel: 'Foundational Axiom (Layer 0)',
      accent: '#f59e0b'
    };
  }

  if (layer === 1 || normId.startsWith('B') || normId.startsWith('R')) {
    return {
      bg: 'bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-100',
      text: 'text-indigo-300',
      border: 'border-indigo-500/70 hover:border-indigo-400',
      glow: 'shadow-[0_0_12px_rgba(99,102,241,0.35)]',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
      dot: 'bg-indigo-400',
      icon: '⚖️',
      layerLabel: 'Fundamental Right (Layer 1)',
      accent: '#6366f1'
    };
  }

  if (layer === 2 || normId.startsWith('C')) {
    return {
      bg: 'bg-purple-950/80 hover:bg-purple-900/90 text-purple-100',
      text: 'text-purple-300',
      border: 'border-purple-500/70 hover:border-purple-400',
      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.35)]',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      dot: 'bg-purple-400',
      icon: '🌐',
      layerLabel: 'Systemic Institution (Layer 2)',
      accent: '#a855f7'
    };
  }

  if (layer === 3 || normId.startsWith('D')) {
    return {
      bg: 'bg-amber-950/80 hover:bg-amber-900/90 text-amber-100',
      text: 'text-amber-300',
      border: 'border-amber-600/70 hover:border-amber-400',
      glow: 'shadow-[0_0_12px_rgba(217,119,6,0.35)]',
      badgeBg: 'bg-amber-600/20 text-amber-300 border-amber-500/40',
      dot: 'bg-amber-500',
      icon: '🌿',
      layerLabel: 'Modern Framework (Layer 3)',
      accent: '#d97706'
    };
  }

  return {
    bg: 'bg-rose-950/80 hover:bg-rose-900/90 text-rose-100',
    text: 'text-rose-300',
    border: 'border-rose-500/70 hover:border-rose-400',
    glow: 'shadow-[0_0_12px_rgba(244,63,94,0.35)]',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    dot: 'bg-rose-400',
    icon: '🚀',
    layerLabel: 'Frontier / Speculative (Layer 4)',
    accent: '#f43f5e'
  };
};

export interface ResolvedNodeInfo {
  isFound: boolean;
  type: 'node' | 'bill';
  id: string;
  title: string;
  statement: string;
  layer: number | 'bill';
  node?: EnrichedMoralityNode;
  bill?: ParliamentaryBill;
  colorConfig: NodeLayerColorConfig;
}

const ALIAS_MAP: Record<string, string> = {
  P1: 'P1_HARM',
  P2: 'P2_AGENCY',
  P3: 'P3_EQUITY',
  HARM: 'P1_HARM',
  AGENCY: 'P2_AGENCY',
  EQUITY: 'P3_EQUITY',
  FAIRNESS: 'P3_EQUITY',
  AUTONOMY: 'P2_AGENCY'
};

export const resolveNodeOrBill = (rawToken: string): ResolvedNodeInfo => {
  const clean = rawToken.trim().replace(/^[\[\(]+|[\]\)]+$/g, '').trim();
  const upper = clean.toUpperCase();
  const normalizedId = ALIAS_MAP[upper] || upper;

  const matchedNode = ENRICHED_MORALITY_NODES.find(
    (n) => n.id.toUpperCase() === normalizedId || n.id.toUpperCase() === upper
  );

  if (matchedNode) {
    return {
      isFound: true,
      type: 'node',
      id: matchedNode.id,
      title: matchedNode.title,
      statement: matchedNode.statement || matchedNode.summary || '',
      layer: matchedNode.layer,
      node: matchedNode,
      colorConfig: getNodeLayerConfig(matchedNode.layer, matchedNode.id)
    };
  }

  const matchedBill = PARLIAMENTARY_BILLS.find(
    (b) =>
      b.id.toLowerCase() === clean.toLowerCase() ||
      b.short_name.toLowerCase() === clean.toLowerCase() ||
      (b.bill_number && b.bill_number.toLowerCase().includes(clean.toLowerCase()))
  );

  if (matchedBill) {
    return {
      isFound: true,
      type: 'bill',
      id: matchedBill.id,
      title: matchedBill.short_name || matchedBill.title,
      statement: matchedBill.summary,
      layer: 'bill',
      bill: matchedBill,
      colorConfig: getNodeLayerConfig('bill', matchedBill.id)
    };
  }

  const layerNum = upper.startsWith('P')
    ? -1
    : upper.startsWith('A')
    ? 0
    : upper.startsWith('B') || upper.startsWith('R')
    ? 1
    : upper.startsWith('C')
    ? 2
    : upper.startsWith('D')
    ? 3
    : upper.startsWith('E') || upper.startsWith('X')
    ? 4
    : 0;

  return {
    isFound: false,
    type: 'node',
    id: clean,
    title: clean,
    statement: `Ethical concept [${clean}]`,
    layer: layerNum,
    colorConfig: getNodeLayerConfig(layerNum, clean)
  };
};

export const extractReferencedNodeIds = (text: string): string[] => {
  if (!text) return [];
  const found = new Set<string>();

  const bracketRegex = /\[([^\]]+)\]/g;
  let match;
  while ((match = bracketRegex.exec(text)) !== null) {
    const rawContent = match[1];
    const tokens = rawContent.split(/[\s,]+/);
    for (const tok of tokens) {
      const trimmed = tok.trim().replace(/^[,,\.;]+|[,,\.;]+$/g, '');
      if (!trimmed) continue;
      const res = resolveNodeOrBill(trimmed);
      if (res.isFound) {
        found.add(res.id);
      }
    }
  }

  for (const node of ENRICHED_MORALITY_NODES) {
    const pattern = new RegExp('\\b' + node.id + '\\b', 'i');
    if (pattern.test(text)) {
      found.add(node.id);
    }
  }

  for (const bill of PARLIAMENTARY_BILLS) {
    if (text.toLowerCase().includes(bill.id.toLowerCase())) {
      found.add(bill.id);
    }
  }

  return Array.from(found);
};

export interface MoralTensionPole {
  name: string;
  subtitle?: string;
  nodeId?: string;
  node?: EnrichedMoralityNode;
  icon: string;
  color: string;
  accentBg: string;
}

export interface MoralTensionData {
  title: string;
  poleA: MoralTensionPole;
  poleB: MoralTensionPole;
  description: string;
  initialBalance: number;
}

const PREDEFINED_TENSIONS: { keywords: RegExp; data: MoralTensionData }[] = [
  {
    keywords: /(?:agency\s+vs\.?\s+harm|agency\s+versus\s+harm|non-harm\s+vs\.?\s+agency|autonomy\s+vs\.?\s+harm|harm\s+vs\.?\s+liberty)/i,
    data: {
      title: 'Agency & Autonomy vs. Non-Harm & Suffering Prevention',
      poleA: {
        name: 'Personal Agency & Consent',
        subtitle: 'Freedom of choice, voluntary contracts & self-determination',
        nodeId: 'P2_AGENCY',
        icon: '🗽',
        color: 'text-teal-400',
        accentBg: 'bg-teal-500/20 border-teal-500/40'
      },
      poleB: {
        name: 'Non-Harm & Vulnerability Shield',
        subtitle: 'Protecting life, biological distress prevention & safety baselines',
        nodeId: 'P1_HARM',
        icon: '🛡️',
        color: 'text-emerald-400',
        accentBg: 'bg-emerald-500/20 border-emerald-500/40'
      },
      description: 'Balancing individual freedom of action against the imperative to prevent physical, mental, or systemic distress.',
      initialBalance: 50
    }
  },
  {
    keywords: /(?:security\s+vs\.?\s+privacy|privacy\s+vs\.?\s+security|surveillance\s+vs\.?\s+civil\s+liberties|informational\s+privacy\s+vs\.?\s+state\s+security)/i,
    data: {
      title: 'Individual Privacy & Consent vs. State Security & Public Order',
      poleA: {
        name: 'Digital Privacy & Autonomy',
        subtitle: 'Informational self-determination & cryptographic protection',
        nodeId: 'D2',
        icon: '🔒',
        color: 'text-indigo-400',
        accentBg: 'bg-indigo-500/20 border-indigo-500/40'
      },
      poleB: {
        name: 'Public Security & Governance',
        subtitle: 'Crime deterrence, state order & public defense infrastructure',
        nodeId: 'A6',
        icon: '🏛️',
        color: 'text-amber-400',
        accentBg: 'bg-amber-500/20 border-amber-500/40'
      },
      description: 'Reconciling citizen data sovereignty with legitimate state necessity for law enforcement and national safety.',
      initialBalance: 50
    }
  },
  {
    keywords: /(?:statutory\s+autonomy\s+vs\.?\s+executive\s+discretion|rule\s+of\s+law\s+vs\.?\s+executive\s+power|due\s+process\s+vs\.?\s+administrative\s+efficiency)/i,
    data: {
      title: 'Statutory Due Process vs. Executive Discretion',
      poleA: {
        name: 'Statutory Autonomy & Due Process',
        subtitle: 'Independent judicial oversight, strict legal checks & balances',
        nodeId: 'B5',
        icon: '⚖️',
        color: 'text-indigo-400',
        accentBg: 'bg-indigo-500/20 border-indigo-500/40'
      },
      poleB: {
        name: 'Executive Discretion & Speed',
        subtitle: 'Agile administrative enforcement & emergency response prerogative',
        nodeId: 'A6',
        icon: '🏛️',
        color: 'text-amber-400',
        accentBg: 'bg-amber-500/20 border-amber-500/40'
      },
      description: 'Preserving institutional independence and rule of law while enabling practical government responsiveness.',
      initialBalance: 50
    }
  },
  {
    keywords: /(?:epistemic\s+transparency\s+vs\.?\s+secrecy|transparency\s+vs\.?\s+confidentiality|truth\s+vs\.?\s+harmony|scientific\s+truth\s+vs\.?\s+social\s+stability)/i,
    data: {
      title: 'Epistemic Truth & Scientific Openness vs. Social Stability',
      poleA: {
        name: 'Empirical Truth & Open Commons',
        subtitle: 'Scientific inquiry, freedom of expression & public verification',
        nodeId: 'A3',
        icon: '🔬',
        color: 'text-amber-400',
        accentBg: 'bg-amber-500/20 border-amber-500/40'
      },
      poleB: {
        name: 'Social Harmony & Precaution',
        subtitle: 'Communal stability, mitigating inflammatory harm & order',
        nodeId: 'A2',
        icon: '🕊️',
        color: 'text-sky-400',
        accentBg: 'bg-sky-500/20 border-sky-500/40'
      },
      description: 'Navigating the duty of empirical candor against systemic social fragility and out-group hostility.',
      initialBalance: 50
    }
  },
  {
    keywords: /(?:equity\s+vs\.?\s+efficiency|fairness\s+vs\.?\s+growth|distributive\s+justice\s+vs\.?\s+free\s+enterprise)/i,
    data: {
      title: 'Distributive Equity vs. Economic Dynamic Efficiency',
      poleA: {
        name: 'Equal Weight & Social Equity',
        subtitle: 'Veil of ignorance fairness, social safety floor & progressive justice',
        nodeId: 'P3_EQUITY',
        icon: '⚖️',
        color: 'text-amber-400',
        accentBg: 'bg-amber-500/20 border-amber-500/40'
      },
      poleB: {
        name: 'Productive Agency & Enterprise',
        subtitle: 'Incentives for capital innovation, merit-based reward & efficiency',
        nodeId: 'P2_AGENCY',
        icon: '⚡',
        color: 'text-teal-400',
        accentBg: 'bg-teal-500/20 border-teal-500/40'
      },
      description: 'Balancing egalitarian wealth redistribution with productive incentives for entrepreneurship and value creation.',
      initialBalance: 50
    }
  }
];

export const extractMoralTension = (text: string): MoralTensionData | null => {
  if (!text) return null;

  for (const tension of PREDEFINED_TENSIONS) {
    if (tension.keywords.test(text)) {
      return tension.data;
    }
  }

  const STOP_WORDS = new Set(['the', 'a', 'an', 'its', 'their', 'our', 'your', 'his', 'her', 'this', 'that', 'these', 'those', 'some', 'any', 'all', 'such', 'with', 'from', 'for']);

  const cleanPoleName = (raw: string): string => {
    let s = raw.trim().replace(/^["'‘’“]+|["'’”]+$/g, '').trim();
    // Strip leading stop words
    s = s.replace(/^(the|a|an|its|their|our|your|his|her|this|that)\s+/i, '').trim();
    return s;
  };

  const tensionRegex =
    /(?:tension|dialectic|trade-off|balance|conflict|dilemma|reconciliation)\s+(?:between|of)?\s*[:\s]*["'‘’“]?([A-Za-z0-9_\- &]{3,50}?)["'’”]?\s+(?:and|versus|vs\.?|against)\s+["'‘’“]?([A-Za-z0-9_\- &]{3,50}?)["'’”]?/i;
  const match = text.match(tensionRegex);

  if (match) {
    const rawA = cleanPoleName(match[1]);
    const rawB = cleanPoleName(match[2]);

    if (
      rawA.length >= 4 &&
      rawB.length >= 4 &&
      !STOP_WORDS.has(rawA.toLowerCase()) &&
      !STOP_WORDS.has(rawB.toLowerCase()) &&
      rawA.toLowerCase() !== rawB.toLowerCase()
    ) {
      const resA = resolveNodeOrBill(rawA);
      const resB = resolveNodeOrBill(rawB);

      return {
        title: `${rawA} vs. ${rawB}`,
        poleA: {
          name: resA.isFound ? resA.title : rawA,
          subtitle: resA.isFound ? resA.statement.slice(0, 75) + '...' : 'First Ethical Principle',
          nodeId: resA.isFound ? resA.id : undefined,
          icon: resA.colorConfig.icon,
          color: resA.colorConfig.text,
          accentBg: resA.colorConfig.badgeBg
        },
        poleB: {
          name: resB.isFound ? resB.title : rawB,
          subtitle: resB.isFound ? resB.statement.slice(0, 75) + '...' : 'Countervailing Moral Principle',
          nodeId: resB.isFound ? resB.id : undefined,
          icon: resB.colorConfig.icon,
          color: resB.colorConfig.text,
          accentBg: resB.colorConfig.badgeBg
        },
        description: `Socratic Dialectic: Balancing ${rawA} with ${rawB} under proportional equilibrium.`,
        initialBalance: 50
      };
    }
  }

  return null;
};

interface NodeBadgeChipProps {
  token: string;
}

export const NodeBadgeChip: React.FC<NodeBadgeChipProps> = ({ token }) => {
  const {
    setSelectedNode,
    setActiveDrawer,
    setAiMatchedNodeIds,
    setHighlightRationale,
    treeLens,
    setTreeLens,
    setActiveParadigm
  } = useMoralityStore();
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const hoverTimeoutRef = React.useRef<any>(null);

  const info = useMemo(() => resolveNodeOrBill(token), [token]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 280);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);

    if (info.isFound && info.type === 'node' && info.node) {
      setSelectedNode(info.node);
      setActiveDrawer('inspector');
      setAiMatchedNodeIds([info.id]);
      setHighlightRationale({
        title: `Axiomatic Focus: [${info.id}]`,
        icon: info.colorConfig.icon,
        body: `${info.title}: ${info.statement}`,
        nodeIds: [info.id]
      });
    } else if (info.isFound && info.type === 'bill' && info.bill) {
      const linkedNodes = info.bill.linked_morality_nodes || [];
      if (linkedNodes.length > 0) {
        setAiMatchedNodeIds(linkedNodes);
        const firstNode = ENRICHED_MORALITY_NODES.find((n) => n.id === linkedNodes[0]);
        if (firstNode) {
          setSelectedNode(firstNode);
        }
      }
      setActiveDrawer('inspector');
      setHighlightRationale({
        title: `Parliamentary Bill: ${info.title}`,
        icon: '📜',
        body: `${info.statement} (Grounded in nodes: ${linkedNodes.join(', ')})`,
        nodeIds: linkedNodes
      });
    } else {
      setSelectedNode(info.id as any);
      setActiveDrawer('inspector');
      setAiMatchedNodeIds([info.id]);
    }
  };

  const handleQuickSwitch = (lens: 'moral' | 'action' | 'psychology', e: React.MouseEvent) => {
    e.stopPropagation();
    setTreeLens(lens);
    setActiveParadigm('tree');
    if (info.isFound && info.type === 'node' && info.node) {
      setSelectedNode(info.node);
      setActiveDrawer('inspector');
      setAiMatchedNodeIds([info.id]);
      setHighlightRationale({
        title: `${lens === 'moral' ? '🌿 Moral' : lens === 'action' ? '⚡ Action' : '🧠 Psychology'} Focus: [${info.id}]`,
        icon: info.colorConfig.icon,
        body: `${info.title}: ${info.statement}`,
        nodeIds: [info.id]
      });
    } else if (info.isFound && info.type === 'bill' && info.bill) {
      const linkedNodes = info.bill.linked_morality_nodes || [];
      if (linkedNodes.length > 0) {
        setAiMatchedNodeIds(linkedNodes);
        const firstNode = ENRICHED_MORALITY_NODES.find((n) => n.id === linkedNodes[0]);
        if (firstNode) {
          setSelectedNode(firstNode);
        }
      }
      setActiveDrawer('inspector');
    } else {
      setSelectedNode(info.node || (info.id as any));
      setActiveDrawer('inspector');
      setAiMatchedNodeIds([info.id]);
    }
  };

  const handleCopyNodeInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clipText = `[${info.id}] ${info.title}: ${info.statement || ''}`;
    navigator.clipboard.writeText(clipText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <span
      className="relative inline-flex items-center mx-1 my-0.5 align-middle group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight border transition-all duration-200 cursor-pointer select-none active:scale-95 ${info.colorConfig.bg} ${info.colorConfig.border} ${info.colorConfig.glow} ${
          clicked ? 'ring-2 ring-white ring-offset-1 ring-offset-stone-900 scale-105' : ''
        }`}
        title={`Click to inspect & illuminate [${info.id}]`}
      >
        <span className="text-[12px] leading-none">{info.colorConfig.icon}</span>
        <span className={`font-mono text-[10.5px] font-extrabold ${info.colorConfig.text}`}>
          [{info.id}]
        </span>
        {info.isFound && (
          <span className="text-stone-300 max-w-[130px] truncate text-[10.5px] font-medium hidden sm:inline">
            {info.title}
          </span>
        )}
        <Sparkles className="w-2.5 h-2.5 text-amber-400/70 group-hover:text-amber-300 opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Interactive, Persistent Hover Popover Tooltip */}
      {isHovered && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3.5 bg-stone-950/98 border border-amber-500/70 rounded-xl shadow-2xl backdrop-blur-xl z-50 text-left pointer-events-auto select-text animate-in fade-in zoom-in-95 duration-150 ring-1 ring-amber-500/30"
        >
          <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-amber-900/40">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
              <span>{info.colorConfig.icon}</span>
              <span className="truncate">{info.title}</span>
            </span>
            <span
              className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold shrink-0 ${info.colorConfig.badgeBg}`}
            >
              {info.id}
            </span>
          </div>

          <div className="mt-2 space-y-2 text-[11px] text-stone-200 leading-snug select-text">
            <p className="italic text-stone-300">
              {info.statement || 'Moral axiom node grounded in foundational ethics.'}
            </p>

            {/* Quick-Switch Tree Lens Pills */}
            <div className="pt-1.5 pb-1 border-t border-amber-900/30 flex items-center justify-between gap-1">
              <span className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider">Sync Lens:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => handleQuickSwitch('moral', e)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                    treeLens === 'moral'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400/50'
                      : 'bg-stone-900 hover:bg-stone-800 border-stone-700/80 text-stone-300 hover:text-emerald-300'
                  }`}
                  title="Switch Tree Lens to Moral & Dharma"
                >
                  🌿 Moral
                </button>
                <button
                  type="button"
                  onClick={(e) => handleQuickSwitch('action', e)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                    treeLens === 'action'
                      ? 'bg-amber-950 border-amber-500 text-amber-300 ring-1 ring-amber-400/50'
                      : 'bg-stone-900 hover:bg-stone-800 border-stone-700/80 text-stone-300 hover:text-amber-300'
                  }`}
                  title="Switch Tree Lens to Action Imperative"
                >
                  ⚡ Action
                </button>
                <button
                  type="button"
                  onClick={(e) => handleQuickSwitch('psychology', e)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                    treeLens === 'psychology'
                      ? 'bg-purple-950 border-purple-500 text-purple-300 ring-1 ring-purple-400/50'
                      : 'bg-stone-900 hover:bg-stone-800 border-stone-700/80 text-stone-300 hover:text-purple-300'
                  }`}
                  title="Switch Tree Lens to Psychology & Biases"
                >
                  🧠 Psych
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 text-[9.5px] border-t border-amber-950 font-semibold">
              <span className="text-stone-400">{info.colorConfig.layerLabel}</span>
              
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyNodeInfo}
                  className="px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 border border-amber-900/50 text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy node ID and definition"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClick}
                  className="px-2 py-0.5 rounded bg-amber-950 hover:bg-amber-900 border border-amber-600/60 text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer font-bold"
                  title="Open node detail drawer"
                >
                  <span>Inspect</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};

interface VisualTensionMeterProps {
  tension: MoralTensionData;
}

export const VisualTensionMeter: React.FC<VisualTensionMeterProps> = ({ tension }) => {
  const { setAiMatchedNodeIds, setHighlightRationale, setSelectedNode, setActiveDrawer } =
    useMoralityStore();
  const [balance, setBalance] = useState<number>(tension.initialBalance ?? 50);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>('50/50');

  const poleAWeight = 100 - balance;
  const poleBWeight = balance;

  const handleIlluminateBoth = () => {
    const nodeIds: string[] = [];
    if (tension.poleA.nodeId) nodeIds.push(tension.poleA.nodeId);
    if (tension.poleB.nodeId) nodeIds.push(tension.poleB.nodeId);

    if (nodeIds.length > 0) {
      setAiMatchedNodeIds(nodeIds);
      setHighlightRationale({
        title: `Dialectical Tension: ${tension.title}`,
        icon: '⚖️',
        body: `${tension.description} (Poles: ${tension.poleA.name} ⟷ ${tension.poleB.name})`,
        nodeIds: nodeIds
      });
    }
  };

  const handleSelectPole = (nodeId?: string) => {
    if (!nodeId) return;
    const resolved = resolveNodeOrBill(nodeId);
    if (resolved.isFound && resolved.node) {
      setSelectedNode(resolved.node);
      setActiveDrawer('inspector');
    }
  };

  const getVerdictSummary = () => {
    if (balance === 50) {
      return {
        tag: '⚖️ Socratic Golden Mean',
        text: 'Optimal Dialectical Equilibrium — Both principles held in harmonious, proportional synthesis.',
        color: 'text-amber-300'
      };
    }
    if (balance < 40) {
      return {
        tag: `🛡️ Prioritizing ${tension.poleA.name}`,
        text: `Strong Deontological Baseline — Upholds ${tension.poleA.name} as a non-negotiable safeguard.`,
        color: 'text-teal-300'
      };
    }
    if (balance > 60) {
      return {
        tag: `⚡ Prioritizing ${tension.poleB.name}`,
        text: `Pragmatic Utilitarian Weight — Gives precedence to ${tension.poleB.name} for systemic governance.`,
        color: 'text-emerald-300'
      };
    }
    if (balance < 50) {
      return {
        tag: `⚖️ Leaning Left (${poleAWeight}%)`,
        text: `Slight priority toward ${tension.poleA.name} while respecting secondary duties.`,
        color: 'text-amber-200'
      };
    }
    return {
      tag: `⚖️ Leaning Right (${poleBWeight}%)`,
      text: `Slight priority toward ${tension.poleB.name} with proportional safeguards.`,
      color: 'text-amber-200'
    };
  };

  const verdict = getVerdictSummary();

  return (
    <div className="my-3 rounded-2xl bg-stone-950/90 border border-amber-800/40 p-3.5 shadow-xl backdrop-blur-md space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-serif-axiom flex items-center gap-1.5">
              <span>Moral Tension & Dialectic Meter</span>
              <span className="text-[10px] text-amber-400 font-mono font-normal">
                ({poleAWeight}% / {poleBWeight}%)
              </span>
            </h4>
            <p className="text-[10px] text-stone-400 truncate max-w-[280px]">
              {tension.title}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-stone-400 hover:text-amber-300 p-1 rounded transition-colors"
          title={isExpanded ? 'Collapse Tension Meter' : 'Expand Tension Meter'}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Dual Pole Cards */}
          <div className="grid grid-cols-2 gap-2 text-left">
            {/* Pole A */}
            <div
              onClick={() => handleSelectPole(tension.poleA.nodeId)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer hover:border-amber-400/60 bg-stone-900/80 ${
                balance <= 50 ? 'border-teal-500/50 shadow-md shadow-teal-950/30' : 'border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-sm">{tension.poleA.icon}</span>
                {tension.poleA.nodeId && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-teal-950 border border-teal-800 text-teal-300">
                    [{tension.poleA.nodeId}]
                  </span>
                )}
              </div>
              <div className="text-[11px] font-bold text-stone-100 truncate">
                {tension.poleA.name}
              </div>
              <div className="text-[9.5px] text-stone-400 line-clamp-2 leading-tight mt-0.5">
                {tension.poleA.subtitle || 'Primary foundational thesis'}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono font-bold text-teal-300">
                <span>Weight:</span>
                <span>{poleAWeight}%</span>
              </div>
            </div>

            {/* Pole B */}
            <div
              onClick={() => handleSelectPole(tension.poleB.nodeId)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer hover:border-amber-400/60 bg-stone-900/80 ${
                balance >= 50 ? 'border-emerald-500/50 shadow-md shadow-emerald-950/30' : 'border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-sm">{tension.poleB.icon}</span>
                {tension.poleB.nodeId && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                    [{tension.poleB.nodeId}]
                  </span>
                )}
              </div>
              <div className="text-[11px] font-bold text-stone-100 truncate">
                {tension.poleB.name}
              </div>
              <div className="text-[9.5px] text-stone-400 line-clamp-2 leading-tight mt-0.5">
                {tension.poleB.subtitle || 'Countervailing antithesis'}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono font-bold text-emerald-300">
                <span>Weight:</span>
                <span>{poleBWeight}%</span>
              </div>
            </div>
          </div>

          {/* Interactive Balance Slider Track */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 px-1">
              <span className="text-teal-400 flex items-center gap-1">
                <span>{tension.poleA.icon}</span>
                <span className="truncate max-w-[110px]">{tension.poleA.name}</span>
              </span>
              <span className="text-amber-300 font-mono text-[9px] uppercase tracking-wider bg-stone-900 px-2 py-0.5 rounded border border-amber-900/40">
                Fulcrum: {balance === 50 ? 'Equilibrium' : balance < 50 ? 'Left Skew' : 'Right Skew'}
              </span>
              <span className="text-emerald-400 flex items-center gap-1 justify-end">
                <span className="truncate max-w-[110px]">{tension.poleB.name}</span>
                <span>{tension.poleB.icon}</span>
              </span>
            </div>

            <div className="relative py-1">
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={balance}
                onChange={(e) => {
                  setBalance(Number(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-teal-500 via-amber-400 to-emerald-500 accent-amber-300 shadow-inner"
              />
            </div>

            {/* Dialectical Verdict Callout */}
            <div className="rounded-xl bg-stone-900/90 border border-amber-900/30 p-2.5 text-[10.5px] space-y-1">
              <div className="flex items-center justify-between">
                <span className={`font-bold flex items-center gap-1 ${verdict.color}`}>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{verdict.tag}</span>
                </span>
                <span className="font-mono text-[9px] text-stone-400">
                  {poleAWeight}:{poleBWeight} Dialectic
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed text-[10px]">{verdict.text}</p>
            </div>

            {/* Quick Action Presets & Tree Illumination */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setBalance(50);
                    setActivePreset('50/50');
                  }}
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${
                    activePreset === '50/50' && balance === 50
                      ? 'bg-amber-600 text-white border-amber-400'
                      : 'bg-stone-900 text-stone-300 border-amber-900/40 hover:text-white'
                  }`}
                >
                  ⚖️ 50/50 Mean
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBalance(30);
                    setActivePreset('70/30');
                  }}
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${
                    balance === 30
                      ? 'bg-teal-700 text-white border-teal-400'
                      : 'bg-stone-900 text-stone-300 border-amber-900/40 hover:text-white'
                  }`}
                >
                  70/30 Left
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBalance(70);
                    setActivePreset('30/70');
                  }}
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${
                    balance === 70
                      ? 'bg-emerald-700 text-white border-emerald-400'
                      : 'bg-stone-900 text-stone-300 border-amber-900/40 hover:text-white'
                  }`}
                >
                  30/70 Right
                </button>
              </div>

              <button
                type="button"
                onClick={handleIlluminateBoth}
                className="text-[9.5px] font-bold px-2.5 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-300 flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                title="Illuminate both conflicting poles on Tree canvas"
              >
                <TreePine className="w-3 h-3 text-emerald-400" />
                <span>Illuminate Poles on Tree</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface MarkdownBlock {
  type:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'blockquote'
    | 'bulletList'
    | 'orderedList'
    | 'codeBlock'
    | 'divider'
    | 'paragraph';
  content: string;
  items?: string[];
  lang?: string;
}

const parseMarkdownBlocks = (text: string): MarkdownBlock[] => {
  const blocks: MarkdownBlock[] = [];
  const lines = text.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Fenced Code Block
    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({
        type: 'codeBlock',
        content: codeLines.join('\n'),
        lang: lang || 'text'
      });
      continue;
    }

    // 2. Headings
    if (trimmed.startsWith('#### ')) {
      blocks.push({ type: 'heading4', content: trimmed.replace(/^####\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'heading3', content: trimmed.replace(/^###\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'heading2', content: trimmed.replace(/^##\s+/, '') });
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'heading1', content: trimmed.replace(/^#\s+/, '') });
      i++;
      continue;
    }

    // 3. Blockquotes
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join('\n') });
      continue;
    }

    // 4. Horizontal Rule
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: 'divider', content: '' });
      i++;
      continue;
    }

    // 5. Bullet List
    if (/^[\*\-•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[\*\-•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[\*\-•]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'bulletList', content: '', items });
      continue;
    }

    // 6. Numbered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'orderedList', content: '', items });
      continue;
    }

    // 7. Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // 8. Standard paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^[\*\-•]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^(\*{3,}|-{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paragraphLines.join(' ')
      });
    }
  }

  return blocks;
};

export const renderInlineFormattedText = (rawText: string): React.ReactNode[] => {
  if (!rawText) return [];

  const tokenRegex =
    /(\[[A-Za-z0-9_\-, ]+\](?!\()|\[[^\]]+\]\(https?:\/\/[^\)]+\)|`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*]+\*(?!\*)|(?<!_)_[^_]+_(?!_))/g;

  const parts = rawText.split(tokenRegex);
  const elements: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    if (!part) return;

    // A. Markdown Links: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\)]+)\)$/);
    if (linkMatch) {
      elements.push(
        <a
          key={'link-' + index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 font-semibold underline decoration-amber-500/50 hover:text-amber-300 inline-flex items-center gap-0.5 mx-0.5"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-2.5 h-2.5 inline" />
        </a>
      );
      return;
    }

    // B. Bracketed Node Badges
    const bracketMatch = part.match(/^\[([A-Za-z0-9_\-, ]+)\]$/);
    if (bracketMatch) {
      const inner = bracketMatch[1];
      const tokens = inner.split(/[\s,]+/).filter((t) => t.trim().length > 0);

      const hasRecognizedNode = tokens.some((t) => {
        const res = resolveNodeOrBill(t);
        return (
          res.isFound ||
          /^(P[1-3]|A[1-6]|B[1-6]|C[1-6]|D[1-8]|E[1-9]|E1[0-2]|R[1-8]|X[1-8]|bill_)/i.test(t)
        );
      });

      if (hasRecognizedNode) {
        elements.push(
          <span key={'badge-group-' + index} className="inline-flex flex-wrap items-center">
            {tokens.map((tok, tokIdx) => (
              <NodeBadgeChip key={'tok-' + index + '-' + tokIdx} token={tok} />
            ))}
          </span>
        );
        return;
      }
    }

    // C. Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      elements.push(
        <code
          key={'code-' + index}
          className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-stone-900/90 border border-amber-900/40 text-amber-300 mx-0.5"
        >
          {part.slice(1, -1)}
        </code>
      );
      return;
    }

    // D. Bold-Italics: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      elements.push(
        <strong key={'bi-' + index} className="font-bold italic text-amber-100">
          {renderInlineFormattedText(part.slice(3, -3))}
        </strong>
      );
      return;
    }

    // E. Bold: **text** or __text__
    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      elements.push(
        <strong key={'b-' + index} className="font-extrabold text-amber-200 drop-shadow-xs">
          {renderInlineFormattedText(part.slice(2, -2))}
        </strong>
      );
      return;
    }

    // F. Italics: *text* or _text_
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      elements.push(
        <em key={'i-' + index} className="italic text-stone-200">
          {renderInlineFormattedText(part.slice(1, -1))}
        </em>
      );
      return;
    }

    // G. Regular Text
    elements.push(<React.Fragment key={'txt-' + index}>{part}</React.Fragment>);
  });

  return elements;
};

export const SocraticMessageRenderer: React.FC<SocraticMessageRendererProps> = ({
  content,
  sender = 'bot',
  timestamp,
  messageId,
  className = '',
  onCopy,
  showTreeButton = true,
  showTensionMeter = true
}) => {
  const { setAiMatchedNodeIds, setHighlightRationale } = useMoralityStore();
  const [copied, setCopied] = useState<boolean>(false);
  const [illuminated, setIlluminated] = useState<boolean>(false);

  // 1. Clean message content
  const cleanContent = useMemo(() => {
    if (!content) return '';
    let text = content;
    if (text.includes('<think>')) {
      if (text.includes('</think>')) {
        text = text.split('</think>').slice(1).join('</think>').trim();
      } else {
        text = text.replace('<think>', '').trim();
      }
    }
    return text.trim();
  }, [content]);

  // 2. Extract referenced node IDs
  const referencedNodeIds = useMemo(
    () => extractReferencedNodeIds(cleanContent),
    [cleanContent]
  );

  // 3. Extract moral tension dialectic
  const moralTension = useMemo(
    () => (showTensionMeter ? extractMoralTension(cleanContent) : null),
    [cleanContent, showTensionMeter]
  );

  // 4. Parse markdown blocks
  const blocks = useMemo(() => parseMarkdownBlocks(cleanContent), [cleanContent]);

  // Copy handler
  const handleCopyMessage = async () => {
    try {
      if (onCopy) {
        onCopy(cleanContent);
      } else {
        await navigator.clipboard.writeText(cleanContent);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  // Message-Level Tree Illumination Click Action
  const handleIlluminateTree = useCallback(() => {
    if (referencedNodeIds.length === 0) return;
    setIlluminated(true);
    setAiMatchedNodeIds(referencedNodeIds);
    setHighlightRationale({
      title: 'Socrates Grounding',
      icon: '🏛️',
      body: 'Illuminated ' + referencedNodeIds.length + ' foundational node(s) referenced in this ethical reflection: ' + referencedNodeIds.join(', '),
      nodeIds: referencedNodeIds
    });
    setTimeout(() => setIlluminated(false), 3000);
  }, [referencedNodeIds, setAiMatchedNodeIds, setHighlightRationale]);

  return (
    <div
      className={'w-full flex flex-col space-y-2 text-xs leading-relaxed transition-all ' + className}
    >
      {/* 1. Header Bar */}
      {showTreeButton && referencedNodeIds.length > 0 && sender === 'bot' && (
        <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-1 border-b border-amber-900/30">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Referenced Axioms ({referencedNodeIds.length}):
            </span>
          </div>

          <button
            type="button"
            onClick={handleIlluminateTree}
            className={'px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold flex items-center gap-1.5 border transition-all duration-200 cursor-pointer shadow-md active:scale-95 ' + (illuminated
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/50 animate-pulse'
                : 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-700/70 hover:border-amber-400 shadow-amber-950/40')}
            title="Illuminate all referenced moral nodes on the active Canvas Tree"
          >
            <TreePine
              className={'w-3.5 h-3.5 ' + (illuminated ? 'text-white animate-bounce' : 'text-emerald-400')}
            />
            <span>
              {illuminated
                ? '✓ ' + referencedNodeIds.length + ' Nodes Active on Tree!'
                : '🌳 Illuminate ' + referencedNodeIds.length + ' Nodes on Tree'}
            </span>
          </button>
        </div>
      )}

      {/* 2. Visual Moral Tension */}
      {showTensionMeter && moralTension && sender === 'bot' && (
        <VisualTensionMeter tension={moralTension} />
      )}

      {/* 3. Render Formatted Markdown Blocks */}
      <div className="space-y-2 text-left">
        {blocks.map((block, index) => {
          switch (block.type) {
            case 'heading1':
              return (
                <h1
                  key={'b-' + index}
                  className="text-base sm:text-lg font-extrabold font-serif-axiom text-amber-300 border-b border-amber-900/40 pb-1 mt-3 mb-1.5 flex items-center gap-2 tracking-tight"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                  <span>{renderInlineFormattedText(block.content)}</span>
                </h1>
              );

            case 'heading2':
              return (
                <h2
                  key={'b-' + index}
                  className="text-sm sm:text-base font-bold font-serif-axiom text-amber-400 mt-2.5 mb-1 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{renderInlineFormattedText(block.content)}</span>
                </h2>
              );

            case 'heading3':
              return (
                <h3
                  key={'b-' + index}
                  className="text-xs sm:text-sm font-bold font-serif-axiom text-amber-500 mt-2 mb-0.5 uppercase tracking-wide flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>{renderInlineFormattedText(block.content)}</span>
                </h3>
              );

            case 'heading4':
              return (
                <h4
                  key={'b-' + index}
                  className="text-xs font-semibold font-serif-axiom text-stone-200 mt-1.5 mb-0.5"
                >
                  {renderInlineFormattedText(block.content)}
                </h4>
              );

            case 'blockquote':
              return (
                <blockquote
                  key={'b-' + index}
                  className="border-l-3 border-amber-500 bg-amber-950/30 rounded-r-xl px-3.5 py-2.5 my-2 italic text-stone-200 font-serif text-[11.5px] leading-relaxed border-y border-r border-amber-900/30 shadow-inner flex items-start gap-2"
                >
                  <Feather className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 opacity-80" />
                  <div className="flex-1 whitespace-pre-line">
                    {renderInlineFormattedText(block.content)}
                  </div>
                </blockquote>
              );

            case 'codeBlock':
              return (
                <div
                  key={'b-' + index}
                  className="rounded-xl bg-stone-950 border border-amber-900/40 my-2 overflow-hidden shadow-md"
                >
                  {block.lang && (
                    <div className="px-3 py-1 bg-stone-900/80 border-b border-amber-900/30 flex items-center justify-between text-[9px] font-mono text-amber-400">
                      <span>{block.lang.toUpperCase()}</span>
                      <span className="text-stone-500">Socratic Logic</span>
                    </div>
                  )}
                  <pre className="p-3 font-mono text-[11px] text-amber-200 overflow-x-auto leading-relaxed">
                    <code>{block.content}</code>
                  </pre>
                </div>
              );

            case 'bulletList':
              return (
                <ul key={'b-' + index} className="space-y-1.5 my-1.5 pl-1">
                  {block.items?.map((item, itemIdx) => (
                    <li
                      key={'li-' + index + '-' + itemIdx}
                      className="flex items-start gap-2 text-stone-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5 shadow-[0_0_6px_rgba(251,191,36,0.7)]" />
                      <div className="flex-1 leading-relaxed">
                        {renderInlineFormattedText(item)}
                      </div>
                    </li>
                  ))}
                </ul>
              );

            case 'orderedList':
              return (
                <ol key={'b-' + index} className="space-y-1.5 my-1.5 pl-1">
                  {block.items?.map((item, itemIdx) => (
                    <li
                      key={'oli-' + index + '-' + itemIdx}
                      className="flex items-start gap-2 text-stone-200"
                    >
                      <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-amber-950/80 border border-amber-800/80 text-amber-300 shrink-0 mt-0.5 shadow-xs">
                        {itemIdx + 1}
                      </span>
                      <div className="flex-1 leading-relaxed">
                        {renderInlineFormattedText(item)}
                      </div>
                    </li>
                  ))}
                </ol>
              );

            case 'divider':
              return <hr key={'b-' + index} className="border-amber-900/40 my-2.5" />;

            case 'paragraph':
            default:
              return (
                <p key={'b-' + index} className="leading-relaxed text-stone-200">
                  {renderInlineFormattedText(block.content)}
                </p>
              );
          }
        })}
      </div>

      {/* 4. Footer Utilities */}
      <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-amber-900/30 text-[9.5px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyMessage}
            className="flex items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            title="Copy reflection to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-stone-400 hover:text-amber-400" />
                <span className="text-stone-400">Copy</span>
              </>
            )}
          </button>

          {referencedNodeIds.length > 0 && sender === 'bot' && (
            <button
              type="button"
              onClick={handleIlluminateTree}
              className="text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <TreePine className="w-3 h-3 text-emerald-400" />
              <span>{referencedNodeIds.length} Linked Nodes</span>
            </button>
          )}
        </div>

        {timestamp && (
          <span
            className={
              sender === 'user'
                ? 'text-amber-200/80 font-mono text-[9px]'
                : 'text-stone-500 font-mono text-[9px]'
            }
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default SocraticMessageRenderer;
