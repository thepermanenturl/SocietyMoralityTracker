import React, { useState, useEffect } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { Sparkles, Layers, ShieldCheck, Scale, Compass, ChevronRight, MessageSquare, Loader2 } from 'lucide-react';
import axios from 'axios';

export const PrismView: React.FC = () => {
  const { nodes, setSelectedNode, setChatInputPrompt, toggleChat, isChatOpen } = useMoralityStore();
  const [topicQuery, setTopicQuery] = useState<string>('Uniform Civil Code & Family Rights');
  const [dynamicSpectrum, setDynamicSpectrum] = useState<any>(null);
  const [isLoadingSpectrum, setIsLoadingSpectrum] = useState<boolean>(false);

  const presetTopics = [
    'Uniform Civil Code & Family Rights',
    'AI Biometric Surveillance & National Security',
    'Electoral Funding Transparency & Anonymous Donors',
    'Environmental Protection vs Industrial Growth'
  ];

  useEffect(() => {
    const fetchDynamicRefraction = async () => {
      if (!topicQuery.trim()) return;
      setIsLoadingSpectrum(true);
      try {
        const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
        let baseUrl = 'http://127.0.0.1:8000';
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            baseUrl = parsed.localPortConfig?.url || parsed.remoteServerConfig?.url || baseUrl;
          } catch (e) {}
        }
        const res = await axios.post(`${baseUrl.replace(/\/$/, '')}/api/prism/refract`, {
          query: topicQuery
        }, { timeout: 3000 });

        if (res.data && res.data.traditional && res.data.progressive) {
          setDynamicSpectrum({
            traditional: {
              ...res.data.traditional,
              badgeColor: "bg-amber-950 text-amber-400 border-amber-800"
            },
            progressive: {
              ...res.data.progressive,
              badgeColor: "bg-sky-950 text-sky-400 border-sky-800"
            }
          });
        }
      } catch (e) {
        // Fallback gracefully to built-in presets when offline
        setDynamicSpectrum(null);
      } finally {
        setIsLoadingSpectrum(false);
      }
    };

    const timer = setTimeout(fetchDynamicRefraction, 400);
    return () => clearTimeout(timer);
  }, [topicQuery]);

  // Fallback perspective spectrums when backend offline
  const getFallbackSpectrumData = (query: string) => {
    const qLower = query.toLowerCase();

    if (qLower.includes('biometric') || qLower.includes('surveillance') || qLower.includes('security')) {
      return {
        traditional: {
          title: "🇮🇳 Civilizational Order & Security Stance",
          spectrum: "Indian Right-Wing / National Security / Dharma Stewardship",
          badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
          rationale: "Prioritizes national integrity, public order, and collective threat detection. Asserts state stewardship duties to protect the sovereign population against external and internal systemic disruption.",
          treeBranch: [
            { id: "R3", title: "Harmonic Reciprocity", layer: -1, statement: "Universal conduct must strengthen social cohesion and prevent systemic collapse." },
            { id: "A2", title: "Biocentric Worth & Systems Integrity", layer: 0, statement: "Ecological and sovereign systems possess inherent stewardship value." },
            { id: "D8", title: "Democratic Order & Consent", layer: 1, statement: "State authority acts on democratic mandate to maintain civil security." }
          ]
        },
        progressive: {
          title: "🌐 Individual Autonomy & Liberty Stance",
          spectrum: "Left-Wing / Civil Liberties / Digital Rights",
          badgeColor: "bg-sky-950 text-sky-400 border-sky-800",
          rationale: "Rejects unconsented mass data harvesting and mass biometric surveillance. Reaffirms absolute right to digital privacy, bodily autonomy, and freedom from state overreach.",
          treeBranch: [
            { id: "A4", title: "Value of Autonomy", layer: 0, statement: "Self-determination and uncoerced voluntary consent are inviolable." },
            { id: "E5", title: "Digital Privacy & Encryption", layer: 2, statement: "Protection from unwarranted state and corporate mass surveillance." },
            { id: "E6", title: "Whistleblower & Press Rights", layer: 2, statement: "Safeguarding public oversight against authoritarian opacity." }
          ]
        }
      };
    }

    if (qLower.includes('electoral') || qLower.includes('donor') || qLower.includes('funding')) {
      return {
        traditional: {
          title: "🇮🇳 Donor Protection & Political Stability Stance",
          spectrum: "Indian Right-Wing / Administrative Feasibility",
          badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
          rationale: "Protects political donors from victimisation and retribution by ruling or opposition authorities. Focuses on banking channel compliance over public exposure.",
          treeBranch: [
            { id: "R1", title: "Fractality of Stewardship", layer: -1, statement: "Institutional stability requires protecting political participants from malice." },
            { id: "A6", title: "Equity & Institutional Order", layer: 0, statement: "Fair election financing channels prevent illegal cash corruption." }
          ]
        },
        progressive: {
          title: "🌐 Voter Transparency & Anti-Corruption Stance",
          spectrum: "Left-Wing / Participatory Democracy / Truth Rights",
          badgeColor: "bg-sky-950 text-sky-400 border-sky-800",
          rationale: "Demands total electoral funding transparency. Asserts citizens' right to know corporate donor identities to prevent oligarchy and regulatory capture.",
          treeBranch: [
            { id: "A6", title: "Equity & Impartial Fairness", layer: 0, statement: "Electoral rules must maintain an equal playing field for all citizens." },
            { id: "E10", title: "Anti-Corruption & Transparency", layer: 2, statement: "Public audit of political donations prevents quid pro quo governance." }
          ]
        }
      };
    }

    // Default: Uniform Civil Code / General Policy
    return {
      traditional: {
        title: `🇮🇳 Civilizational & Security Stance on '${query}'`,
        spectrum: "Indian Right-Wing / Uniform Rights / Dharma Cohesion",
        badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
        rationale: `Advocates civilizational unity, legal consistency, and public order when implementing policies regarding ${query}.`,
        treeBranch: [
          { id: "R3", title: "Harmonic Reciprocity", layer: -1, statement: "Equal legal standing strengthens civilizational unity." },
          { id: "A6", title: "Equity & Equal Rights", layer: 0, statement: "Universal legal fairness protects vulnerable family members." },
          { id: "D8", title: "Democratic Legal Integration", layer: 1, statement: "State enforces uniform constitutional equality for all citizens." }
        ]
      },
      progressive: {
        title: `🌐 Pluralist Autonomy Stance on '${query}'`,
        spectrum: "Left-Wing / Multiculturalism / Voluntary Consent",
        badgeColor: "bg-sky-950 text-sky-400 border-sky-800",
        rationale: `Emphasizes voluntary consent, minority protections, and bodily autonomy regarding ${query}.`,
        treeBranch: [
          { id: "A4", title: "Value of Autonomy & Choice", layer: 0, statement: "Voluntary cultural identity and religious expression must be respected." },
          { id: "D4", title: "Non-Discrimination & Protection", layer: 1, statement: "Safeguards minority communities against forced assimilation." }
        ]
      }
    };
  };

  const spectrumData = dynamicSpectrum || getFallbackSpectrumData(topicQuery);

  const handleSelectPrismNode = (nodeId: string, nodeTitle: string, stanceTitle: string) => {
    const matched = nodes.find(n => n.id === nodeId);
    if (matched) {
      setSelectedNode(matched);
    }
    setChatInputPrompt(`Discuss the ${stanceTitle} on topic "${topicQuery}" (Justified by node [${nodeId}] ${nodeTitle})`);
    toggleChat(true);
  };

  return (
    <div className={`w-full h-screen pt-16 pb-24 bg-slate-950 text-white overflow-y-auto flex flex-col gap-6 px-6 transition-all duration-300 ${isChatOpen ? 'pl-[420px]' : ''}`}>
      {/* Top Refractive Prism Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <h2 className="text-base font-extrabold text-white">Refractive Optical Prism Spectrum Engine</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400 font-bold flex items-center gap-1">
              <span>{dynamicSpectrum ? 'Live Local LLM Refraction' : 'Multi-View Refraction'}</span>
              {isLoadingSpectrum && <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Input any moral claim or governance topic on the left to refract it through an optical prism into 2 distinct political & civilizational spectrums.
          </p>
        </div>
      </div>

      {/* Main Refractive Layout: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* LEFT COLUMN (4 Cols): Query Input Beam & Visual Glass Prism */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sky-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-extrabold text-white">1. Input Topic Query Beam</h3>
            </div>
            {isLoadingSpectrum && (
              <span className="text-[10px] text-amber-400 flex items-center gap-1 font-bold">
                <Loader2 className="w-3 h-3 animate-spin" /> Refracting...
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-300">Enter Topic or Policy Bill:</label>
            <input
              type="text"
              value={topicQuery}
              onChange={(e) => setTopicQuery(e.target.value)}
              placeholder="e.g. Uniform Civil Code, Biometric Surveillance..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Preset Beams:</span>
            <div className="flex flex-col gap-1.5">
              {presetTopics.map((topic, idx) => (
                <button
                  key={`preset-${idx}`}
                  onClick={() => setTopicQuery(topic)}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    topicQuery === topic
                      ? 'bg-sky-950 border-sky-500 text-sky-300 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Optical Glass Prism SVG Graphic */}
          <div className="flex-1 min-h-[160px] bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-xs font-bold text-slate-400 mb-2">Optical Refraction Chamber</span>
            <svg className="w-full h-32" viewBox="0 0 300 120" fill="none">
              {/* White Incoming Light Beam */}
              <line x1="10" y1="60" x2="130" y2="60" stroke="#ffffff" strokeWidth="4" strokeDasharray="4 2" className="animate-pulse" />
              <text x="20" y="50" fill="#cbd5e1" fontSize="10" fontWeight="bold">Incoming Query Beam</text>

              {/* Glass Triangular Prism */}
              <polygon points="150,15 200,105 100,105" fill="url(#prismGrad)" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
              <defs>
                <linearGradient id="prismGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Spectrum Ray 1 (Gold / Amber - Traditional) */}
              <line x1="150" y1="60" x2="290" y2="25" stroke="#f59e0b" strokeWidth="3" />
              <text x="200" y="20" fill="#fbbf24" fontSize="9" fontWeight="bold">🇮🇳 Right / Traditional Ray</text>

              {/* Spectrum Ray 2 (Cyan / Sky - Progressive) */}
              <line x1="150" y1="60" x2="290" y2="95" stroke="#06b6d4" strokeWidth="3" />
              <text x="200" y="110" fill="#38bdf8" fontSize="9" fontWeight="bold">🌐 Left / Progressive Ray</text>
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN (8 Cols): 2 Perspective Refracted Spectrum Columns with Clickable Tree Branches */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SPECTRUM 1: Traditional / Right-Wing View */}
          <div className="bg-slate-900/90 border border-amber-900/60 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 backdrop-blur-md">
            <div className="border-b border-amber-900/40 pb-3">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${spectrumData.traditional.badgeColor}`}>
                {spectrumData.traditional.spectrum}
              </span>
              <h3 className="text-xs font-extrabold text-amber-300 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{spectrumData.traditional.title}</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              {spectrumData.traditional.rationale}
            </p>

            {/* Clickable Justifying Morality Sub-Tree Branch */}
            <div className="space-y-2 pt-1 flex-1">
              <h4 className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <span>🌿 Justifying Morality Sub-Tree Branch:</span>
              </h4>

              <div className="space-y-2">
                {spectrumData.traditional.treeBranch.map((node: any) => (
                  <div
                    key={`trad-${node.id}`}
                    onClick={() => handleSelectPrismNode(node.id, node.title, spectrumData.traditional.title)}
                    className="p-3 bg-slate-950/90 border border-amber-800/60 hover:border-amber-400 rounded-xl cursor-pointer transition-all hover:scale-[1.01] group space-y-1 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-300 group-hover:text-amber-200">
                        [{node.id}] {node.title}
                      </span>
                      <span className="text-[9px] text-amber-500 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-900">
                        Layer {node.layer}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                      {node.statement}
                    </p>
                    <div className="flex justify-end pt-1 text-[10px] text-sky-400 group-hover:underline items-center gap-0.5">
                      <span>Discuss with Agent</span>
                      <MessageSquare className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SPECTRUM 2: Progressive / Left-Wing View */}
          <div className="bg-slate-900/90 border border-sky-900/60 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 backdrop-blur-md">
            <div className="border-b border-sky-900/40 pb-3">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${spectrumData.progressive.badgeColor}`}>
                {spectrumData.progressive.spectrum}
              </span>
              <h3 className="text-xs font-extrabold text-sky-300 mt-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>{spectrumData.progressive.title}</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              {spectrumData.progressive.rationale}
            </p>

            {/* Clickable Justifying Morality Sub-Tree Branch */}
            <div className="space-y-2 pt-1 flex-1">
              <h4 className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
                <span>🌿 Justifying Morality Sub-Tree Branch:</span>
              </h4>

              <div className="space-y-2">
                {spectrumData.progressive.treeBranch.map((node: any) => (
                  <div
                    key={`prog-${node.id}`}
                    onClick={() => handleSelectPrismNode(node.id, node.title, spectrumData.progressive.title)}
                    className="p-3 bg-slate-950/90 border border-sky-800/60 hover:border-sky-400 rounded-xl cursor-pointer transition-all hover:scale-[1.01] group space-y-1 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-sky-300 group-hover:text-sky-200">
                        [{node.id}] {node.title}
                      </span>
                      <span className="text-[9px] text-sky-500 font-bold bg-sky-950 px-2 py-0.5 rounded border border-sky-900">
                        Layer {node.layer}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                      {node.statement}
                    </p>
                    <div className="flex justify-end pt-1 text-[10px] text-sky-400 group-hover:underline items-center gap-0.5">
                      <span>Discuss with Agent</span>
                      <MessageSquare className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
