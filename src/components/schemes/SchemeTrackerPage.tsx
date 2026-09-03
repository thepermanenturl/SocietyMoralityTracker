import React, { useState } from 'react';
import { SCHEME_DATASET, GovernmentScheme } from '../../data/schemeTrackerData';
import { useMoralityStore } from '../../store/useMoralityStore';
import {
  Building2,
  AlertTriangle,
  FileCheck,
  Share2,
  Bot,
  ExternalLink,
  Search,
  ShieldAlert,
  History,
  TrendingDown,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const SchemeTrackerPage: React.FC = () => {
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme>(SCHEME_DATASET[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const {
    setSelectedNode,
    nodes,
    toggleChat,
    setChatInputPrompt,
    addCardToQueue
  } = useMoralityStore();

  const filteredSchemes = SCHEME_DATASET.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectNode = (nodeId: string) => {
    const targetNode = nodes.find(n => n.id === nodeId);
    if (targetNode) {
      setSelectedNode(targetNode);
    }
  };

  const handleAskAIAboutScheme = (scheme: GovernmentScheme) => {
    const promptText = `Analyze scheme '${scheme.name}' against morality nodes [${scheme.moralityViolations.join(', ')}]. CAG audit found: ${scheme.cagAuditFindings[0]?.finding || ''}`;
    setChatInputPrompt(promptText);
    toggleChat(true);
  };

  const handleShareReportCard = (scheme: GovernmentScheme) => {
    const text = `🏛️ Scheme Moral Audit: ${scheme.name}\nMinistry: ${scheme.ministry}\nCAG Gap Severity: ${scheme.cagAuditFindings[0]?.gapSeverity || 0}\nViolations: ${scheme.moralityViolations.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getSeverityBadgeClass = (severity: number) => {
    if (severity >= 0.85) return 'bg-rose-950/80 border-rose-700 text-rose-300';
    if (severity >= 0.70) return 'bg-amber-950/80 border-amber-700 text-amber-300';
    return 'bg-emerald-950/80 border-emerald-700 text-emerald-300';
  };

  const getSpectrumBadge = (spectrum: string) => {
    switch (spectrum) {
      case 'government-official': return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'center-left': return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      case 'left': return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'right': return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'independent-audit': return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6 pt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-7 h-7 text-cyan-400" />
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Government Scheme Accountability Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ground-truth institutional audit analysis cross-referencing PIB claims, CAG report metrics, Morality Tree axioms, and political media coverage.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name, ministry..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheme List Cards */}
        <div className="lg:col-span-5 space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Tracked Schemes ({filteredSchemes.length})</span>
            <span>Sorted by Audit Gap Severity</span>
          </div>

          {filteredSchemes.map((scheme) => {
            const isSelected = selectedScheme.id === scheme.id;
            const topAudit = scheme.cagAuditFindings[0];
            const severity = topAudit?.gapSeverity || 0;

            return (
              <div
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 flex items-center gap-1.5">
                      <span>{scheme.name}</span>
                    </h3>
                    {scheme.hindiName && (
                      <p className="text-[11px] text-slate-400 font-medium">{scheme.hindiName}</p>
                    )}
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{scheme.ministry}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-extrabold shrink-0 ${getSeverityBadgeClass(severity)}`}>
                    Gap: {(severity * 10).toFixed(1)}/10
                  </span>
                </div>

                {/* Audit Quick Metric */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-amber-400" />
                      <span>{topAudit?.reportYear}</span>
                    </span>
                    <span className="font-mono text-slate-400">{topAudit?.financialDisparity}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                    {topAudit?.finding}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-bold">Violations:</span>
                    {scheme.moralityViolations.map((v) => (
                      <span
                        key={v}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectNode(v);
                        }}
                        className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-extrabold hover:bg-cyan-900 transition-colors"
                      >
                        [{v}]
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-500 flex items-center gap-0.5 hover:text-cyan-400">
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Scheme Deep-Dive Panel */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto">
          {/* Scheme Title & Metadata Header */}
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {selectedScheme.id}
                </span>
                <h2 className="text-xl font-black text-white">{selectedScheme.name}</h2>
                {selectedScheme.hindiName && (
                  <p className="text-xs text-slate-400 font-medium">{selectedScheme.hindiName}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAskAIAboutScheme(selectedScheme)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>Ask AI Agent</span>
                </button>

                <button
                  onClick={() => handleShareReportCard(selectedScheme)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>{copiedLink ? 'Copied!' : 'Share Audit'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Ministry:</span>
                <span className="font-semibold text-slate-200 truncate block">{selectedScheme.ministry}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Annual Budget:</span>
                <span className="font-bold text-amber-400 block">{selectedScheme.annualBudget}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Target Beneficiaries:</span>
                <span className="font-semibold text-slate-200 block">{selectedScheme.targetBeneficiaries}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Official Claim vs CAG Audit Reality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Official Claim */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>📢 Official Government Claim (PIB)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedScheme.officialClaim}
              </p>
            </div>

            {/* CAG Audit Reality */}
            {selectedScheme.cagAuditFindings.map((audit, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>🔍 CAG Audit Ground Truth</span>
                  </span>
                  <span className="text-[10px] font-mono text-rose-400">{audit.reportYear}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {audit.finding}
                </p>
                {audit.financialDisparity && (
                  <div className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-800/60 inline-block">
                    Disparity: {audit.financialDisparity}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section 2: Morality Tree Axiom Violations */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>⚖️ Morality Tree Axiom Breaches</span>
              </span>
              <span className="text-[10px] text-slate-400">Click node to inspect in Morality Tree</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedScheme.moralityViolations.map((nodeId) => (
                <button
                  key={nodeId}
                  onClick={() => handleSelectNode(nodeId)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition-colors flex items-center gap-1.5"
                >
                  <span>[{nodeId}] Node</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              "{selectedScheme.violationExplanation}"
            </p>
          </div>

          {/* Section 3: Political Spectrum Media Coverage Analysis */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-amber-400" />
              <span>📊 Cross-Spectrum Media Framing Analysis</span>
            </h3>

            <div className="space-y-2">
              {selectedScheme.mediaCoverage.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getSpectrumBadge(item.spectrum)}`}>
                        {item.spectrum}
                      </span>
                      <span className="font-bold text-slate-200">{item.outlet}</span>
                    </div>
                    <p className="text-slate-300 text-xs font-medium">{item.headline}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-[10px] text-slate-500 block">Trust Score</span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">{item.trustScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: 2500-Year Historical Precedent Anchor */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <History className="w-4 h-4 text-amber-400" />
              <span>⏳ 2,500-Year Historical Precedent Anchor</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedScheme.historicalPrecedent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
