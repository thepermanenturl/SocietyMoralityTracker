import React, { useState, useEffect } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { TreeLens } from '../../types/morality';
import { ENRICHED_MORALITY_NODES, ACTION_MAPPINGS, EnrichedMoralityNode } from '../../data/moralityNodesData';
import { PARLIAMENTARY_BILLS } from '../../data/parliamentaryBillsData';
import {
  X,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  GitCommit,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Zap,
  Brain,
  Compass,
  AlertCircle,
  FileText
} from 'lucide-react';

interface DharmicRoot {
  id: string;
  name: string;
  sanskrit: string;
  icon: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  description: string;
}

const DHARMIC_ROOT_DEFS: Record<string, DharmicRoot> = {
  P1_HARM: {
    id: 'P1_HARM',
    name: 'Non-Harm & Compassion',
    sanskrit: 'Ahimsa (अहिंसा)',
    icon: '🛡️',
    badgeBg: 'bg-emerald-950/80',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-500/70',
    description: 'Biological vulnerability avoidance and alleviation of unnecessary pain & distress.'
  },
  P2_AGENCY: {
    id: 'P2_AGENCY',
    name: 'Agency & Consent',
    sanskrit: 'Swatantrata (स्वातन्त्र्य)',
    icon: '🗽',
    badgeBg: 'bg-teal-950/80',
    textColor: 'text-teal-300',
    borderColor: 'border-teal-500/70',
    description: 'Bodily self-determination, cognitive sovereignty, and voluntary contractual consent.'
  },
  P3_EQUITY: {
    id: 'P3_EQUITY',
    name: 'Equal Weight & Impartiality',
    sanskrit: 'Nyaya (न्याय)',
    icon: '⚖️',
    badgeBg: 'bg-amber-950/80',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-500/70',
    description: 'Impartial fairness under the veil of ignorance; no person carries arbitrary privilege or penalty.'
  }
};

const getDharmicRootsForNode = (node: EnrichedMoralityNode): DharmicRoot[] => {
  if (node.id === 'P1_HARM') return [DHARMIC_ROOT_DEFS.P1_HARM];
  if (node.id === 'P2_AGENCY') return [DHARMIC_ROOT_DEFS.P2_AGENCY];
  if (node.id === 'P3_EQUITY') return [DHARMIC_ROOT_DEFS.P3_EQUITY];

  const matched = new Set<string>();
  const queue = [...(node.parentIds || [])];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const pId = queue.shift()!;
    if (visited.has(pId)) continue;
    visited.add(pId);

    if (DHARMIC_ROOT_DEFS[pId]) {
      matched.add(pId);
    } else {
      const parentNode = ENRICHED_MORALITY_NODES.find((n) => n.id === pId);
      if (parentNode && parentNode.parentIds) {
        queue.push(...parentNode.parentIds);
      }
    }
  }

  // Fallback heuristics based on ID prefix if not directly linked via parents
  const id = node.id.toUpperCase();
  if (matched.size === 0) {
    if (
      id.startsWith('A1') ||
      id.startsWith('A2') ||
      id.startsWith('B1') ||
      id.startsWith('C1') ||
      id.startsWith('C2') ||
      id.startsWith('D8')
    ) {
      matched.add('P1_HARM');
    }
    if (
      id.startsWith('A3') ||
      id.startsWith('A4') ||
      id.startsWith('B2') ||
      id.startsWith('D4') ||
      id.startsWith('E1') ||
      id.startsWith('E5') ||
      id.startsWith('E6') ||
      id.startsWith('E7')
    ) {
      matched.add('P2_AGENCY');
    }
    if (
      id.startsWith('A5') ||
      id.startsWith('A6') ||
      id.startsWith('B3') ||
      id.startsWith('C3') ||
      id.startsWith('E10') ||
      id.startsWith('D1') ||
      id.startsWith('D2') ||
      id.startsWith('D3')
    ) {
      matched.add('P3_EQUITY');
    }
  }

  if (matched.size === 0) {
    return [DHARMIC_ROOT_DEFS.P1_HARM, DHARMIC_ROOT_DEFS.P3_EQUITY];
  }

  return Array.from(matched)
    .map((id) => DHARMIC_ROOT_DEFS[id])
    .filter(Boolean);
};

export const NodeDetailDrawer: React.FC = () => {
  const {
    selectedNode,
    activeDrawer,
    setActiveDrawer,
    toggleChat,
    setSelectedNode,
    isDarkMode,
    setChatInputPrompt,
    treeLens,
    setTreeLens
  } = useMoralityStore();

  const [localTab, setLocalTab] = useState<TreeLens>(treeLens || 'moral');
  const [activeSubPerspective, setActiveSubPerspective] = useState<'constitution' | 'modernBuddha' | 'critic'>('constitution');
  const [upvotes, setUpvotes] = useState(12);

  // Synchronize local tab when store treeLens changes externally
  useEffect(() => {
    if (treeLens) {
      setLocalTab(treeLens);
    }
  }, [treeLens]);

  if (activeDrawer !== 'inspector' || !selectedNode) return null;

  // Resolve full enriched node
  const fullNode: EnrichedMoralityNode =
    (ENRICHED_MORALITY_NODES.find((n) => n.id === selectedNode.id) as EnrichedMoralityNode) || selectedNode;

  const lenses = fullNode.lenses || {
    dilemmaTitle: '💡 Everyday Practical Decision Making',
    dilemmaBody: `Grounding your decision in [${fullNode.id}] provides immediate ethical clarity in daily life.`,
    psychologyTitle: '🧠 Cognitive Biases & Moral Blind Spots',
    psychologyBody: `Adhering to [${fullNode.id}] counteracts tribal out-group bias and rationalization.`,
    psychologyBlindspots: ['Tribal Bias', 'Rationalization'],
    constitutionTitle: '🏛️ Indian Constitution Principles',
    constitutionQuote: 'All citizens are guaranteed dignity and equal protection of law.',
    constitutionReachPct: 75,
    modernBuddhaExemplar: 'Baba Amte & Human Rights Champions',
    modernBuddhaStory: 'Dedicated decades to lived virtue and humanitarian service under hostile conditions.',
    modernBuddhaLink: 'https://en.wikipedia.org/wiki/Baba_Amte',
    criticTitle: '📢 Ground Reality — Systemic Critique',
    criticBody: 'Structural obstacles and bureaucratic friction frequently impede real-world enforcement.'
  };

  const actionInfo = ACTION_MAPPINGS[fullNode.id];
  const dharmicRoots = getDharmicRootsForNode(fullNode);
  const linkedBills = PARLIAMENTARY_BILLS.filter((b) => b.linked_morality_nodes?.includes(fullNode.id));

  // Find parents and children for derivation links
  const parentNodes = ENRICHED_MORALITY_NODES.filter((n) => fullNode.parentIds?.includes(n.id));
  const childNodes = ENRICHED_MORALITY_NODES.filter((n) => n.parentIds?.includes(fullNode.id));

  const handleTabChange = (lens: TreeLens) => {
    setLocalTab(lens);
    setTreeLens(lens);
  };

  const handleSelectRelatedNode = (nodeId: string) => {
    const target = ENRICHED_MORALITY_NODES.find((n) => n.id === nodeId);
    if (target) {
      setSelectedNode(target);
    }
  };

  const handleAskParableReflection = (anchor: {
    title: string;
    story: string;
    source: string;
    moralOneLiner: string;
  }) => {
    setChatInputPrompt(
      `Socrates, reflect on the ancient Panchatantra parable "${anchor.title}" (${anchor.source}).\n` +
        `PARABLE NARRATIVE: ${anchor.story}\n` +
        `MORAL TAKEAWAY: "${anchor.moralOneLiner}"\n` +
        `How does this allegorical lesson ground and illuminate the ethical axiom [${fullNode.id}] "${fullNode.title}"?`
    );
    toggleChat(true);
  };

  return (
    <aside
      className={`fixed top-16 right-0 w-full max-w-full sm:w-[480px] h-[calc(100vh-64px)] ${
        isDarkMode ? 'bg-stone-900/95 border-amber-900/40 text-stone-100' : 'bg-[#f0ece4]/95 border-orange-900/25 text-stone-900'
      } backdrop-blur-xl border-l z-50 flex flex-col shadow-2xl overflow-y-auto transition-all`}
    >
      {/* Drawer Header */}
      <div
        className={`p-4 border-b ${
          isDarkMode ? 'border-amber-900/30 bg-stone-900/95' : 'border-orange-900/20 bg-[#f0ece4]/95'
        } flex items-center justify-between sticky top-0 z-20 backdrop-blur-md`}
      >
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 border border-amber-400/40 text-amber-400">
            {fullNode.layer === -1 ? 'Origin Primitive' : `Layer ${fullNode.layer}`}
          </span>
          <span className="text-xs font-mono font-bold text-stone-400">[{fullNode.id}]</span>
        </div>
        <button
          onClick={() => setActiveDrawer(null)}
          className={`p-1 rounded-lg ${
            isDarkMode ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-300'
          } transition-colors cursor-pointer`}
          title="Close Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 🧭 Top 3-Lens Tab Switcher (Directly below Header) */}
      <div
        className={`p-2.5 border-b sticky top-[57px] z-10 ${
          isDarkMode ? 'bg-stone-950/95 border-amber-900/30' : 'bg-stone-100/95 border-amber-300/40'
        } backdrop-blur-md`}
      >
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-stone-900/90 border border-stone-800">
          {/* Moral & Dharma */}
          <button
            type="button"
            onClick={() => handleTabChange('moral')}
            className={`py-2 px-1 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer select-none ${
              localTab === 'moral'
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50 scale-[1.02]'
                : 'text-stone-400 hover:text-emerald-300 hover:bg-stone-800/60 border border-transparent'
            }`}
            title="View Moral & Dharma Philosophical Grounds"
          >
            <span>🌿</span>
            <span className="truncate">Moral & Dharma</span>
          </button>

          {/* Action Imperative */}
          <button
            type="button"
            onClick={() => handleTabChange('action')}
            className={`py-2 px-1 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer select-none ${
              localTab === 'action'
                ? 'bg-amber-950 border border-amber-500 text-amber-300 shadow-md shadow-amber-950/50 scale-[1.02]'
                : 'text-stone-400 hover:text-amber-300 hover:bg-stone-800/60 border border-transparent'
            }`}
            title="View Action Imperative & Policy Execution"
          >
            <span>⚡</span>
            <span className="truncate">Action</span>
          </button>

          {/* Psychology & Biases */}
          <button
            type="button"
            onClick={() => handleTabChange('psychology')}
            className={`py-2 px-1 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer select-none ${
              localTab === 'psychology'
                ? 'bg-purple-950 border border-purple-500 text-purple-300 shadow-md shadow-purple-950/50 scale-[1.02]'
                : 'text-stone-400 hover:text-purple-300 hover:bg-stone-800/60 border border-transparent'
            }`}
            title="View Behavioral Psychology & Bias Mitigation"
          >
            <span>🧠</span>
            <span className="truncate">Psychology</span>
          </button>
        </div>
      </div>

      {/* Main Drawer Body */}
      <div className="p-5 space-y-5">
        {/* Node Title */}
        <div>
          <h2 className={`text-lg font-extrabold font-serif-axiom ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            {fullNode.title}
          </h2>
        </div>

        {/* 🌿 LENS 1: Moral & Dharma */}
        {localTab === 'moral' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Philosophical Statement */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span>🌿 Philosophical Axiom Statement</span>
              </span>
              <p
                className={`text-xs ${
                  isDarkMode
                    ? 'text-emerald-100 bg-emerald-950/40 border-emerald-900/60 shadow-inner'
                    : 'text-emerald-950 bg-emerald-50 border-emerald-300'
                } leading-relaxed p-3.5 rounded-xl border italic font-serif-axiom`}
              >
                "{fullNode.statement}"
              </p>
            </div>

            {/* Dharmic Roots (Ahimsa / Swatantrata / Nyaya) */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Dharmic Roots & Vedic Axiomatic Anchors</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {dharmicRoots.map((root) => (
                  <div
                    key={root.id}
                    onClick={() => handleSelectRelatedNode(root.id)}
                    className={`p-3 rounded-xl border ${root.badgeBg} ${root.borderColor} flex items-start gap-2.5 cursor-pointer hover:scale-[1.01] transition-transform`}
                    title={`Click to inspect root primitive [${root.id}]`}
                  >
                    <span className="text-xl leading-none mt-0.5">{root.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-black ${root.textColor}`}>{root.sanskrit}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-stone-900 border border-stone-700 text-stone-300">
                          [{root.id}]
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300 mt-1 leading-snug">{root.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2-Liner Summary */}
            {fullNode.summary2Liner && (
              <div
                className={`p-3 rounded-xl border ${
                  isDarkMode ? 'bg-stone-950/80 border-amber-900/40' : 'bg-amber-50/80 border-amber-300'
                } space-y-1`}
              >
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                  📌 2-Liner Axiom Summary
                </span>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-stone-200' : 'text-stone-800'} leading-snug`}>
                  {fullNode.summary2Liner}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ⚡ LENS 2: Action Imperative */}
        {localTab === 'action' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Action Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>⚡ Action Imperative Title</span>
              </span>
              <h3 className="text-sm font-black text-amber-200">
                {actionInfo?.actionTitle || fullNode.actionTitle || fullNode.title}
              </h3>
            </div>

            {/* Action Statement from ACTION_MAPPINGS */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                Action Directive Statement
              </span>
              <p
                className={`text-xs ${
                  isDarkMode
                    ? 'text-amber-100 bg-amber-950/50 border-amber-700/70 shadow-inner'
                    : 'text-amber-950 bg-amber-50 border-amber-300'
                } leading-relaxed p-3.5 rounded-xl border font-bold`}
              >
                "{actionInfo?.actionStatement || fullNode.actionStatement || fullNode.statement}"
              </p>
            </div>

            {/* Policy Applications & Practical Decision Making */}
            <div className="space-y-3">
              {/* Linked Parliamentary Bills / Acts */}
              {linkedBills.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Linked Statutory Acts & Parliamentary Bills ({linkedBills.length})</span>
                  </span>
                  <div className="space-y-2">
                    {linkedBills.map((bill) => (
                      <div
                        key={bill.id}
                        className="p-3 rounded-xl border border-sky-900/60 bg-sky-950/40 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-sky-200 truncate">{bill.short_name || bill.title}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-900/80 text-sky-300 border border-sky-700/60 shrink-0 font-semibold">
                            {bill.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-snug">{bill.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Everyday Decision & Practical Policy Enforcement */}
              <div
                className={`p-3.5 rounded-xl border ${
                  isDarkMode ? 'bg-stone-950/80 border-amber-900/40' : 'bg-white border-amber-300'
                } space-y-1.5`}
              >
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <span>💡 {lenses.dilemmaTitle || 'Everyday Practical Decision Making'}</span>
                </span>
                <p className={`text-xs ${isDarkMode ? 'text-stone-300' : 'text-stone-800'} leading-relaxed`}>
                  {lenses.dilemmaBody ||
                    `Grounding your decision in [${fullNode.id}] provides immediate practical clarity in organizational and civic policy.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🧠 LENS 3: Psychology & Biases */}
        {localTab === 'psychology' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Psychology Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" />
                <span>🧠 Behavioral Psychology Lens</span>
              </span>
              <h3 className="text-sm font-black text-purple-200">
                {fullNode.psychologyTitle || lenses.psychologyTitle || 'Cognitive Biases & Moral Blind Spots'}
              </h3>
            </div>

            {/* Psychology Body */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block">
                Psychological Mechanism & Epistemic Traps
              </span>
              <p
                className={`text-xs ${
                  isDarkMode
                    ? 'text-purple-100 bg-purple-950/50 border-purple-800/70 shadow-inner'
                    : 'text-purple-950 bg-purple-50 border-purple-300'
                } leading-relaxed p-3.5 rounded-xl border`}
              >
                {lenses.psychologyBody ||
                  fullNode.psychologyStatement ||
                  'Adhering to this principle counteracts tribal out-group bias and self-serving rationalization.'}
              </p>
            </div>

            {/* Targeted Cognitive Blindspots */}
            {lenses.psychologyBlindspots && lenses.psychologyBlindspots.length > 0 && (
              <div
                className={`p-3.5 rounded-xl border ${
                  isDarkMode ? 'bg-purple-950/30 border-purple-800/50' : 'bg-purple-50 border-purple-300'
                } space-y-2.5`}
              >
                <div className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>Targeted Cognitive Blind Spots & Biases:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lenses.psychologyBlindspots.map((b, i) => (
                    <span
                      key={i}
                      className="text-[10.5px] font-bold px-2 py-0.5 rounded-lg bg-purple-900/60 border border-purple-600/60 text-purple-200 flex items-center gap-1"
                    >
                      <span>⚠️</span>
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Claim Vetting Prompt Button */}
        <button
          onClick={() => {
            setChatInputPrompt(
              `Socrates, analyze axiom [${fullNode.id}] "${fullNode.title}" under the ${localTab.toUpperCase()} lens: "${
                fullNode.statement
              }". What are its boundary conditions, derived policies, and tension trade-offs?`
            );
            toggleChat(true);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-extrabold transition-all shadow-md cursor-pointer border border-amber-400/40 shadow-amber-950/50"
        >
          <Bot className="w-4 h-4" />
          <span>🤖 Ask Socrates AI Agent to Vet this Claim</span>
        </button>

        {/* 📜 Panchatantra Parable Anchor Card */}
        {lenses.parableAnchor && (
          <div
            className={`p-4 rounded-xl border ${
              isDarkMode
                ? 'bg-gradient-to-b from-amber-950/40 to-stone-950/90 border-amber-700/60 shadow-lg shadow-amber-950/30'
                : 'bg-gradient-to-b from-amber-50 to-[#fdf9f0] border-amber-400 shadow-md'
            } space-y-3`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wide font-serif-axiom">
                <span>📜 Panchatantra Parable Anchor</span>
              </div>
              <span className="text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-700/80 px-2 py-0.5 rounded-full">
                {lenses.parableAnchor.source}
              </span>
            </div>

            <div>
              <h3 className={`text-xs font-black font-serif-axiom ${isDarkMode ? 'text-amber-200' : 'text-amber-950'}`}>
                {lenses.parableAnchor.title}
              </h3>
              <div
                className={`mt-2 p-3 rounded-lg border text-xs leading-relaxed italic ${
                  isDarkMode ? 'bg-stone-950/80 border-amber-900/40 text-stone-200' : 'bg-white/90 border-amber-300 text-stone-800'
                }`}
              >
                "{lenses.parableAnchor.story}"
              </div>
            </div>

            {/* Highlighted Moral One-Liner Box */}
            <div
              className={`p-2.5 rounded-lg border ${
                isDarkMode ? 'bg-amber-950/60 border-amber-600/70 text-amber-300' : 'bg-amber-100/80 border-amber-400 text-amber-950'
              } space-y-1`}
            >
              <span className="text-[9px] font-black uppercase tracking-wider block text-amber-400">
                💡 Moral One-Liner Takeaway:
              </span>
              <p className="text-[11px] font-bold leading-snug">{lenses.parableAnchor.moralOneLiner}</p>
            </div>

            <button
              onClick={() => handleAskParableReflection(lenses.parableAnchor!)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-amber-950/40 transition-all border border-amber-400/40 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-amber-200" />
              <span>Ask Socrates to Reflect on this Parable</span>
            </button>
          </div>
        )}

        {/* 🌍 Constitutional & Ground Reality Perspectives */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🌍 Ground Reality & Jurisprudence</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveSubPerspective('constitution')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeSubPerspective === 'constitution'
                    ? 'bg-amber-900/90 border border-amber-500 text-amber-200'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                🏛️ Constitution
              </button>
              <button
                type="button"
                onClick={() => setActiveSubPerspective('modernBuddha')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeSubPerspective === 'modernBuddha'
                    ? 'bg-amber-900/90 border border-amber-500 text-amber-200'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                🧘 Buddha
              </button>
              <button
                type="button"
                onClick={() => setActiveSubPerspective('critic')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  activeSubPerspective === 'critic'
                    ? 'bg-rose-950 border border-rose-500 text-rose-200'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                📢 Critique
              </button>
            </div>
          </div>

          {/* Perspective Content Box */}
          <div
            className={`border rounded-xl p-4 space-y-3 ${
              isDarkMode ? 'bg-stone-950/80 border-amber-900/40' : 'bg-white border-amber-300'
            }`}
          >
            {activeSubPerspective === 'constitution' && (
              <div className="space-y-2 text-xs">
                <div className="font-bold text-amber-400 font-serif-axiom flex items-center justify-between">
                  <span>{lenses.constitutionTitle}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 px-2 py-0.5 rounded-full">
                    {lenses.constitutionReachPct}% Reach
                  </span>
                </div>
                <p
                  className={`italic font-mono p-2.5 rounded-lg border ${
                    isDarkMode ? 'bg-stone-900 text-stone-300 border-amber-900/40' : 'bg-stone-100 text-stone-900 border-stone-300'
                  }`}
                >
                  "{lenses.constitutionQuote}"
                </p>
                <div className="pt-1 flex justify-between items-center text-[11px]">
                  <span className="text-stone-400">Ground Implementation Meter:</span>
                  <span className="font-bold text-emerald-400">{lenses.constitutionReachPct}% Substantial Reach</span>
                </div>
              </div>
            )}

            {activeSubPerspective === 'modernBuddha' && (
              <div className="space-y-2 text-xs">
                <div className="font-bold text-amber-400">🧘 {lenses.modernBuddhaExemplar}</div>
                <p className={`${isDarkMode ? 'text-stone-300' : 'text-stone-800'} leading-relaxed`}>
                  {lenses.modernBuddhaStory}
                </p>
                {lenses.modernBuddhaLink && (
                  <a
                    href={lenses.modernBuddhaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:underline pt-1"
                  >
                    <span>Read Full Biography</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {activeSubPerspective === 'critic' && (
              <div className="space-y-2 text-xs">
                <div className="font-bold text-red-400">{lenses.criticTitle}</div>
                <p className={`${isDarkMode ? 'text-stone-300' : 'text-stone-800'} leading-relaxed`}>
                  {lenses.criticBody}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 🔗 Related Parent & Child Derivation Links */}
        <div
          className={`p-3.5 rounded-xl border ${
            isDarkMode ? 'bg-stone-950/80 border-amber-900/40' : 'bg-white border-amber-300/80'
          } space-y-2.5`}
        >
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
            <GitCommit className="w-4 h-4" />
            <span>Derivation Links & Network</span>
          </div>

          {/* Parent Roots */}
          {parentNodes.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-amber-400" /> Parent Roots:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {parentNodes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectRelatedNode(p.id)}
                    className="text-[11px] font-bold bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>
                      [{p.id}] {p.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Downstream Child Nodes */}
          {childNodes.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3 text-emerald-400" /> Derived Principles & Policies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {childNodes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectRelatedNode(c.id)}
                    className="text-[11px] font-bold bg-stone-900 hover:bg-stone-800 border border-amber-900/50 text-amber-200 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>
                      [{c.id}] {c.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Community Ratification */}
        <div
          className={`border rounded-xl p-4 space-y-3 ${
            isDarkMode ? 'bg-stone-800/60 border-amber-900/30 text-stone-300' : 'bg-white border-amber-300 text-stone-900'
          }`}
        >
          <h3 className="text-xs font-bold">Community Governance & Ratification</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setUpvotes(upvotes + 1)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-emerald-950/40 cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Ratify ({upvotes})</span>
            </button>

            <button
              onClick={() => setUpvotes(Math.max(0, upvotes - 1))}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-rose-950/40 cursor-pointer"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
