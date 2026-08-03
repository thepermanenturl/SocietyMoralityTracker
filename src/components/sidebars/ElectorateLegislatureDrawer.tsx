import React, { useState, useEffect } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Vote, Building2, AlertTriangle, Users, Scale, Bot } from 'lucide-react';

const STATIC_DEMOGRAPHICS = [
  {
    id: "demo_agrarian_farmers",
    name: "Agrarian & Small Farmers",
    population_share_pct: 42.0,
    region: "Rural North, West & South India",
    core_priorities: ["Minimum Support Price (MSP)", "Agricultural Credit Relief", "Irrigation & Fertilizer Subsidy", "Crop Insurance"],
    primary_moral_nodes: ["D7", "P1_HARM", "E8", "A1"],
    historical_memory: "1960s Green Revolution, 2020-2021 Farm Law Protests, Land Ceiling Acts, Monsoonal Drought Crises"
  },
  {
    id: "demo_urban_tech_middle_class",
    name: "Urban Tech & Salaried Middle Class",
    population_share_pct: 18.0,
    region: "Tier-1 & Tier-2 Metros (Bengaluru, NCR, Mumbai, Hyderabad, Pune, Chennai)",
    core_priorities: ["Income Tax Slab Relief", "Urban Transit & Air Quality", "Digital Privacy & Tech Infrastructure", "Ease of Living"],
    primary_moral_nodes: ["E3", "E11", "E6", "D2"],
    historical_memory: "1991 Economic Liberalization, IT Revolution, 2016 Demonetization, GST Implementation"
  },
  {
    id: "demo_unorganized_laborers",
    name: "Unorganized Laborers & Daily Wage Earners",
    population_share_pct: 22.0,
    region: "Peri-Urban & Rural Migrant Belts",
    core_priorities: ["Food Security (PDS Ration)", "Minimum Wage Security", "MGNREGA Rural Employment Guarantee", "Affordable Housing"],
    primary_moral_nodes: ["D7", "E4", "D5", "P1_HARM"],
    historical_memory: "2020 Lockdown Migrant Crisis, MGNREGA Enactment 2005, Food Security Act 2013"
  },
  {
    id: "demo_msme_small_business",
    name: "Small Business & MSME Merchants",
    population_share_pct: 10.0,
    region: "Urban & Semi-Urban Commercial Hubs",
    core_priorities: ["GST Compliance Simplification", "Formal Credit Access", "Protection from Monopoly Overreach", "Deregulated Licensing"],
    primary_moral_nodes: ["P2_AGENCY", "A4", "E10", "D8"],
    historical_memory: "2016 Demonetization, 2017 GST Rollout, Post-COVID Credit Guarantees"
  },
  {
    id: "demo_youth_students",
    name: "Youth & University Students",
    population_share_pct: 25.0,
    region: "Pan-India University & Job-Seeking Belts",
    core_priorities: ["Job Creation & Apprenticeships", "Public University Funding", "Recruitment Exam Transparency", "Digital Freedom"],
    primary_moral_nodes: ["D4", "D8", "D3", "E7"],
    historical_memory: "Paper Leak Crises (NEET/SSC), Anti-Unemployment Protests, Digital India Movement"
  },
  {
    id: "demo_rural_women",
    name: "Rural Women & Self-Help Groups (SHGs)",
    population_share_pct: 20.0,
    region: "Rural Pan-India",
    core_priorities: ["Clean Cooking Fuel (Ujjwala)", "Sanitation & Tap Water (Jal Jeevan)", "Safety & Alcohol Regulation", "Micro-Credit Access"],
    primary_moral_nodes: ["A2", "D7", "P1_HARM", "D5"],
    historical_memory: "Jal Jeevan Mission, Ujjwala Yojna, Prohibition Movements, SHG Bank Linkage"
  },
  {
    id: "demo_tribal_forest",
    name: "Tribal & Forest Dwellers (Adivasi)",
    population_share_pct: 8.6,
    region: "Central, Eastern & North-Eastern Forest Belts (Jharkhand, Odisha, Chhattisgarh, MP, NE)",
    core_priorities: ["Forest Rights Act (FRA) Recognition", "Protection of Ancestral Land", "Minor Forest Produce Support", "Environmental Stewardship"],
    primary_moral_nodes: ["E12", "A5", "A4", "P3_EQUITY"],
    historical_memory: "Forest Rights Act 2006, PESA Act 1996, Mining Displacement Debates, Chipko Precedent"
  }
];

const STATIC_BILLS = [
  {
    id: "bill_dpdp_2023",
    title: "Digital Personal Data Protection Act (DPDP 2023)",
    house: "Parliament of India (Enacted)",
    status: "Presidential Assent (Enacted)",
    category: "Tech Policy & Privacy",
    summary: "Establishes data protection board, user consent mandates, cross-border data flows, and penalties for corporate data breaches.",
    linked_morality_nodes: ["E3", "A4", "D8", "E1"],
    electorate_analysis: {
      demographic_breakdown: [
        { cohort_id: "demo_urban_tech_middle_class", cohort_name: "Urban Tech & Salaried Middle Class", support_percent: 88.0, stance: "Strong Support" },
        { cohort_id: "demo_msme_small_business", cohort_name: "Small Business & MSME Merchants", support_percent: 74.0, stance: "Strong Support" },
        { cohort_id: "demo_youth_students", cohort_name: "Youth & University Students", support_percent: 82.0, stance: "Strong Support" },
        { cohort_id: "demo_agrarian_farmers", cohort_name: "Agrarian & Small Farmers", support_percent: 55.0, stance: "Moderate Support" }
      ]
    }
  },
  {
    id: "bill_telecom_2023",
    title: "Telecommunications Act 2023",
    house: "Parliament of India (Enacted)",
    status: "Presidential Assent (Enacted)",
    category: "Infrastructure & Security",
    summary: "Overhauls 138-year-old Telegraph Act, spectrum allocation rules, emergency network interception powers, and infrastructure sharing.",
    linked_morality_nodes: ["E11", "E1", "E3", "X2"],
    electorate_analysis: {
      demographic_breakdown: [
        { cohort_id: "demo_urban_tech_middle_class", cohort_name: "Urban Tech & Salaried Middle Class", support_percent: 76.0, stance: "Strong Support" },
        { cohort_id: "demo_youth_students", cohort_name: "Youth & University Students", support_percent: 68.0, stance: "Moderate Support" }
      ]
    }
  },
  {
    id: "bill_nari_shakti_2023",
    title: "Nari Shakti Vandan Adhiniyam (106th Constitutional Amendment)",
    house: "Parliament of India (Enacted)",
    status: "Presidential Assent (Enacted)",
    category: "Electoral & Women Rights",
    summary: "Reserves 33% of seats in Lok Sabha and State Legislative Assemblies for women candidates.",
    linked_morality_nodes: ["P3_EQUITY", "A2", "D8", "A4"],
    electorate_analysis: {
      demographic_breakdown: [
        { cohort_id: "demo_rural_women", cohort_name: "Rural Women & Self-Help Groups (SHGs)", support_percent: 94.0, stance: "Strong Support" },
        { cohort_id: "demo_youth_students", cohort_name: "Youth & University Students", support_percent: 89.0, stance: "Strong Support" }
      ]
    }
  }
];

const STATIC_CONDORCET_DATA = {
  status: "success",
  condorcet_winner: null,
  paradox_detected: true,
  paradox_cycle: [
    "policy_A_rural_subsidy",
    "policy_C_green_health",
    "policy_B_market_dereg",
    "policy_A_rural_subsidy"
  ],
  analysis_summary: "⚠️ CONDORCET PARADOX DETECTED! Collective voting forms an intransitive preference cycle: policy_A_rural_subsidy ≻ policy_C_green_health ≻ policy_B_market_dereg ≻ policy_A_rural_subsidy. No majority-preferred outcome exists because democratic sub-group preferences conflict cyclically (Arrow's Impossibility Theorem in effect).",
  options_evaluated: [
    {
      id: "policy_A_rural_subsidy",
      title: "Policy A: High Agricultural MSP & Rural Welfare Subsidy",
      summary: "Mandatory MSP guarantee for 23 crops, funded via wealth tax & higher corporate GST.",
      linked_nodes: ["D7", "P1_HARM", "E10"]
    },
    {
      id: "policy_B_market_dereg",
      title: "Policy B: Low Tax & MSME Market Deregulation",
      summary: "Slash income tax, streamline licensing, and deregulate private agricultural markets.",
      linked_nodes: ["P2_AGENCY", "A4", "E10"]
    },
    {
      id: "policy_C_green_health",
      title: "Policy C: Universal Green Energy & Digital Health Infrastructure",
      summary: "Redirect funds to solar transition, clean water pipelines, and digital health records.",
      linked_nodes: ["E6", "D5", "E3", "E11"]
    }
  ],
  pairwise_matches: [
    { option_1: "policy_A_rural_subsidy", option_2: "policy_B_market_dereg", votes_1: 70.0, votes_2: 28.0, winner: "policy_A_rural_subsidy", margin_pct: 42.0 },
    { option_1: "policy_B_market_dereg", option_2: "policy_C_green_health", votes_1: 58.0, votes_2: 42.0, winner: "policy_B_market_dereg", margin_pct: 16.0 },
    { option_1: "policy_C_green_health", option_2: "policy_A_rural_subsidy", votes_1: 55.0, votes_2: 42.0, winner: "policy_C_green_health", margin_pct: 13.0 }
  ]
};

export const ElectorateLegislatureDrawer: React.FC = () => {
  const { activeDrawer, setActiveDrawer, isDarkMode, setSelectedNode, setChatInputPrompt, toggleChat } = useMoralityStore();
  const [activeTab, setActiveTab] = useState<'demographics' | 'bills' | 'condorcet'>('demographics');
  const [demographics, setDemographics] = useState<any[]>(STATIC_DEMOGRAPHICS);
  const [bills, setBills] = useState<any[]>(STATIC_BILLS);
  const [condorcetData, setCondorcetData] = useState<any | null>(STATIC_CONDORCET_DATA);
  const [loading, setLoading] = useState<boolean>(false);

  const isOpen = activeDrawer === 'electorate' || activeDrawer === 'condorcet';

  useEffect(() => {
    if (activeDrawer === 'condorcet') {
      setActiveTab('condorcet');
    } else if (activeDrawer === 'electorate') {
      setActiveTab('demographics');
    }
  }, [activeDrawer]);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    fetch('http://127.0.0.1:8001/api/electorate/demographics')
      .then(res => res.json())
      .then(data => {
        if (data.demographics && data.demographics.length > 0) setDemographics(data.demographics);
      })
      .catch(() => setDemographics(STATIC_DEMOGRAPHICS));

    fetch('http://127.0.0.1:8001/api/legislature/bills')
      .then(res => res.json())
      .then(data => {
        if (data.bills && data.bills.length > 0) setBills(data.bills);
      })
      .catch(() => setBills(STATIC_BILLS));

    fetch('http://127.0.0.1:8001/api/voting/condorcet/demo')
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success') setCondorcetData(data);
        setLoading(false);
      })
      .catch(() => {
        setCondorcetData(STATIC_CONDORCET_DATA);
        setLoading(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAskAIDebate = (title: string, summary: string, nodes: string[]) => {
    setChatInputPrompt(`Socrates, analyze and debate this policy context:\nTITLE: ${title}\nSUMMARY: ${summary}\nLINKED MORAL NODES: ${nodes.join(', ')}`);
    toggleChat(true);
  };

  return (
    <aside className={`fixed top-16 right-0 w-[540px] bottom-0 ${isDarkMode ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-[#e6e4dd]/95 border-amber-900/30 text-slate-900'} backdrop-blur-xl border-l z-40 flex flex-col shadow-2xl transition-all duration-300`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-amber-900/20 bg-[#d8d5ca]/95'} flex justify-between items-center`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-950/80 border border-emerald-700 rounded-xl text-emerald-400">
            <Vote className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-sm font-extrabold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Indian Electorate & Legislature Tracker</h2>
            <p className="text-[10px] text-slate-400 font-medium">Demographic Conscience, Bills & Condorcet Paradox Analysis</p>
          </div>
        </div>
        <button
          onClick={() => setActiveDrawer(null)}
          className={`p-1.5 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300'} transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-amber-900/20 bg-[#d8d5ca]'} p-1.5 gap-1.5 text-xs font-bold`}>
        <button
          onClick={() => setActiveTab('demographics')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'demographics'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Demographics (7)</span>
        </button>

        <button
          onClick={() => setActiveTab('bills')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'bills'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Parliament Bills</span>
        </button>

        <button
          onClick={() => setActiveTab('condorcet')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'condorcet'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Condorcet Paradox</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {loading && (
          <div className="text-center py-12 text-slate-400 animate-pulse font-mono">
            Loading Electorate & Legislature Conscience Engine...
          </div>
        )}

        {/* TAB 1: Electorate Demographics */}
        {activeTab === 'demographics' && !loading && (
          <div className="space-y-3">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">Categorized Electorate Conscience</span>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                7 Indian demographic cohorts mapped by population share, core priorities, historical memory, and moral weights over the 34 Morality Tree nodes.
              </p>
            </div>

            {demographics.map((cohort: any) => (
              <div key={cohort.id} className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-amber-300 bg-white'} space-y-2.5 hover:border-emerald-500/50 transition`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cohort.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{cohort.region}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                    {cohort.population_share_pct}% Electorate
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Core Priorities:</span>
                  <div className="flex flex-wrap gap-1">
                    {cohort.core_priorities.map((p: string, idx: number) => (
                      <span key={idx} className={`text-[10px] ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'} border px-2 py-0.5 rounded`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Morality Tree Nodes:</span>
                  <div className="flex flex-wrap gap-1">
                    {cohort.primary_moral_nodes.map((nId: string) => (
                      <button
                        key={nId}
                        onClick={() => setSelectedNode(nId as any)}
                        className="text-[10px] font-bold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded cursor-pointer transition-colors"
                        title="Click to highlight node & view details"
                      >
                        [{nId}]
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
                  <strong className="text-amber-400">Historical Memory:</strong> {cohort.historical_memory}
                </div>

                <button
                  onClick={() => handleAskAIDebate(cohort.name, `Demographic cohort representing ${cohort.population_share_pct}% electorate with priorities: ${cohort.core_priorities.join(', ')}`, cohort.primary_moral_nodes)}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 text-[10px] font-extrabold transition-all cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>🤖 Ask AI Agent to Debate this Cohort</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Parliament Bills */}
        {activeTab === 'bills' && !loading && (
          <div className="space-y-3">
            <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider">Parliamentary Legislation & Policy Audits</span>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                Dynamic auditing of Indian Parliament enactments mapped against Morality Tree nodes and demographic electorate support.
              </p>
            </div>

            {bills.map((bill: any) => (
              <div key={bill.id} className={`p-4 rounded-xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-amber-300 bg-white'} space-y-3`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded">
                    {bill.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400">{bill.status}</span>
                </div>

                <h3 className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{bill.title}</h3>
                <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>{bill.summary}</p>

                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] font-bold text-slate-400 mr-1">Linked Axioms:</span>
                  {bill.linked_morality_nodes.map((nId: string) => (
                    <button
                      key={nId}
                      onClick={() => setSelectedNode(nId as any)}
                      className="text-[10px] font-bold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded cursor-pointer transition-colors"
                      title="Click to highlight node & view details"
                    >
                      [{nId}]
                    </button>
                  ))}
                </div>

                {/* Demographic Support Breakdown */}
                {bill.electorate_analysis?.demographic_breakdown && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Demographic Support Breakdown:</span>
                    <div className="space-y-1">
                      {bill.electorate_analysis.demographic_breakdown.map((demo: any) => (
                        <div key={demo.cohort_id} className={`flex justify-between items-center text-[10px] ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'} px-2.5 py-1 rounded border`}>
                          <span className="font-medium">{demo.cohort_name}</span>
                          <span className={`font-bold ${demo.support_percent >= 70 ? 'text-emerald-400' : (demo.support_percent >= 50 ? 'text-amber-400' : 'text-rose-400')}`}>
                            {demo.support_percent}% ({demo.stance})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleAskAIDebate(bill.title, bill.summary, bill.linked_morality_nodes)}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-700/80 text-sky-300 text-[10px] font-extrabold transition-all cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>🤖 Ask AI Agent to Debate this Bill</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Condorcet Paradox Analysis */}
        {activeTab === 'condorcet' && !loading && condorcetData && (
          <div className="space-y-3">
            <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Condorcet Paradox & Social Choice Analyzer</span>
              </div>
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                {condorcetData.analysis_summary}
              </p>
            </div>

            {/* Cycle Highlight Card */}
            {condorcetData.paradox_detected && (
              <div className="p-4 rounded-xl border border-rose-800/80 bg-rose-950/60 space-y-2">
                <span className="text-[10px] font-black uppercase text-rose-300 tracking-wider">⚠️ Intransitive Preferential Cycle (Arrow's Impossibility Theorem)</span>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-900 text-xs font-mono text-center text-amber-300 font-bold">
                  {condorcetData.paradox_cycle.join(' ≻ ')}
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  No single option wins a majority against all others in head-to-head votes because agrarian, urban tech, and student cohorts rank choices cyclically.
                </p>
              </div>
            )}

            {/* Evaluated Options */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Evaluated Legislative Options:</span>
              {condorcetData.options_evaluated.map((opt: any) => (
                <div key={opt.id} className={`p-3 border rounded-xl space-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-300'}`}>
                  <h4 className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{opt.title}</h4>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{opt.summary}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {opt.linked_nodes.map((nId: string) => (
                      <button
                        key={nId}
                        onClick={() => setSelectedNode(nId as any)}
                        className="text-[9px] font-bold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded cursor-pointer"
                      >
                        [{nId}]
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pairwise Matches Table */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400">Head-to-Head Pairwise Vote Matches:</span>
              <div className="space-y-1.5 font-mono text-[10px]">
                {condorcetData.pairwise_matches.map((match: any, idx: number) => (
                  <div key={idx} className={`p-2 rounded border flex justify-between items-center ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-300'}`}>
                    <span className="text-slate-400">{match.option_1} vs {match.option_2}</span>
                    <span className="text-emerald-400 font-bold">
                      {match.votes_1}% vs {match.votes_2}% &rarr; {match.winner} (+{match.margin_pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleAskAIDebate("Condorcet Voting Paradox", condorcetData.analysis_summary, ["P3_EQUITY", "A6", "D8"])}
              className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 text-xs font-extrabold transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>🤖 Ask AI Agent to Debate this Voting Paradox</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
