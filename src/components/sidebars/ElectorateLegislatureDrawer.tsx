import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../../config';
import { useMoralityStore } from '../../store/useMoralityStore';
import {
  PARLIAMENTARY_BILLS,
  PARLIAMENTARY_SESSIONS,
  BILL_CATEGORIES,
  ParliamentaryBill
} from '../../data/parliamentaryBillsData';
import {
  X,
  Vote,
  Building2,
  AlertTriangle,
  Users,
  Scale,
  Bot,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Landmark,
  Sparkles
} from 'lucide-react';

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
  const [bills, setBills] = useState<ParliamentaryBill[]>(PARLIAMENTARY_BILLS);
  const [condorcetData, setCondorcetData] = useState<any | null>(STATIC_CONDORCET_DATA);
  const [loading, setLoading] = useState<boolean>(false);

  // Filters for Parliament Bills Tab
  const [billSearch, setBillSearch] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedDemographics, setExpandedDemographics] = useState<Record<string, boolean>>({});
  const [expandedProvisions, setExpandedProvisions] = useState<Record<string, boolean>>({});

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

    if (!CONFIG.SENSE_API_URL) {
      setDemographics(STATIC_DEMOGRAPHICS);
      setBills(PARLIAMENTARY_BILLS);
      setCondorcetData(STATIC_CONDORCET_DATA);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${CONFIG.SENSE_API_URL}/api/electorate/demographics`)
      .then(res => res.json())
      .then(data => {
        if (data.demographics && data.demographics.length > 0) setDemographics(data.demographics);
      })
      .catch(() => setDemographics(STATIC_DEMOGRAPHICS));

    fetch(`${CONFIG.SENSE_API_URL}/api/legislature/bills`)
      .then(res => res.json())
      .then(data => {
        if (data.bills && data.bills.length > 0) {
          setBills(data.bills);
        } else {
          setBills(PARLIAMENTARY_BILLS);
        }
      })
      .catch(() => setBills(PARLIAMENTARY_BILLS));

    fetch(`${CONFIG.SENSE_API_URL}/api/voting/condorcet/demo`)
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

  const toggleDemographicsExpand = (billId: string) => {
    setExpandedDemographics(prev => ({
      ...prev,
      [billId]: !prev[billId]
    }));
  };

  const toggleProvisionsExpand = (billId: string) => {
    setExpandedProvisions(prev => ({
      ...prev,
      [billId]: !prev[billId]
    }));
  };

  // Filtered Bills
  const filteredBills = useMemo(() => {
    return bills.filter(bill => {
      // Session filter
      if (selectedSession !== 'All' && bill.session !== selectedSession) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && bill.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (billSearch.trim()) {
        const q = billSearch.toLowerCase().trim();
        const matchesTitle = bill.title.toLowerCase().includes(q) || (bill.short_name && bill.short_name.toLowerCase().includes(q));
        const matchesSummary = bill.summary.toLowerCase().includes(q);
        const matchesMinistry = bill.ministry.toLowerCase().includes(q);
        const matchesCategory = bill.category.toLowerCase().includes(q);
        const matchesNodes = bill.linked_morality_nodes.some(n => n.toLowerCase().includes(q));
        const matchesProvisions = bill.key_provisions?.some(p => p.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesMinistry && !matchesCategory && !matchesNodes && !matchesProvisions) {
          return false;
        }
      }
      return true;
    });
  }, [bills, selectedSession, selectedCategory, billSearch]);

  if (!isOpen) return null;

  const handleAskAIDebate = (title: string, summary: string, nodes: string[]) => {
    setChatInputPrompt(`Socrates, analyze and debate this policy context:\nTITLE: ${title}\nSUMMARY: ${summary}\nLINKED MORAL NODES: ${nodes.join(', ')}`);
    toggleChat(true);
  };

  const handleDebateBillSocrates = (bill: ParliamentaryBill) => {
    const prompt = bill.socratic_debate_prompt ||
      `Socrates, conduct a foundational ethical audit and debate on the parliamentary bill "${bill.title}" (${bill.session}, ${bill.ministry}).\n` +
      `PROVISIONS: ${bill.key_provisions.slice(0, 3).join('; ')}\n` +
      `PROPONENTS ARGUMENT: ${bill.proponents_argument}\n` +
      `OPPONENTS FRICTION: ${bill.opponents_argument}\n` +
      `LINKED MORALITY NODES: ${bill.linked_morality_nodes.join(', ')}\n` +
      `MORAL TENSIONS: ${bill.moral_tensions}`;

    setChatInputPrompt(prompt);
    toggleChat(true);
  };

  const getStatusBadge = (status: string) => {
    if (status.includes('Enacted') || status.includes('Presidential')) {
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
    }
    if (status.includes('Passed')) {
      return 'bg-sky-950/80 text-sky-300 border-sky-800';
    }
    if (status.includes('Committee') || status.includes('Review')) {
      return 'bg-amber-950/80 text-amber-300 border-amber-800';
    }
    if (status.includes('Introduced') || status.includes('Pending')) {
      return 'bg-purple-950/80 text-purple-300 border-purple-800';
    }
    return 'bg-stone-900 text-stone-300 border-stone-700';
  };

  const getStanceMeta = (stance: string) => {
    switch (stance) {
      case 'Strong Support':
        return { text: 'text-emerald-400', bar: 'bg-emerald-500', pill: 'bg-emerald-950 text-emerald-300 border-emerald-800' };
      case 'Moderate Support':
        return { text: 'text-teal-400', bar: 'bg-teal-500', pill: 'bg-teal-950 text-teal-300 border-teal-800' };
      case 'Divided / Neutral':
        return { text: 'text-amber-400', bar: 'bg-amber-500', pill: 'bg-amber-950 text-amber-300 border-amber-800' };
      case 'Moderate Opposition':
        return { text: 'text-orange-400', bar: 'bg-orange-500', pill: 'bg-orange-950 text-orange-300 border-orange-800' };
      case 'Strong Opposition':
        return { text: 'text-rose-400', bar: 'bg-rose-500', pill: 'bg-rose-950 text-rose-300 border-rose-800' };
      default:
        return { text: 'text-slate-300', bar: 'bg-slate-500', pill: 'bg-slate-900 text-slate-300 border-slate-700' };
    }
  };

  return (
    <aside className={`fixed top-16 right-0 w-full max-w-full sm:w-[580px] bottom-0 ${isDarkMode ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-[#e6e4dd]/95 border-amber-900/30 text-slate-900'} backdrop-blur-xl border-l z-40 flex flex-col shadow-2xl transition-all duration-300`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-amber-900/20 bg-[#d8d5ca]/95'} flex justify-between items-center shrink-0`}>
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
      <div className={`flex border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-amber-900/20 bg-[#d8d5ca]'} p-1.5 gap-1.5 text-xs font-bold shrink-0`}>
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
          <span>Bills (2023–2026)</span>
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
            <p className="text-[10px] text-slate-400 font-medium px-1">
              7 Indian demographic cohorts mapped by population share, core priorities, and moral weights.
            </p>

            {demographics.map((cohort: any) => (
              <div key={cohort.id} className={`p-3.5 rounded-r-xl border-y border-r border-l-4 ${isDarkMode ? 'border-l-emerald-500 border-slate-800/60 bg-slate-900/60' : 'border-l-emerald-600 border-amber-300 bg-white shadow-sm'} space-y-2 hover:border-emerald-500 transition`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cohort.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{cohort.region}</p>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                    {cohort.population_share_pct}% Electorate
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Core Priorities:</span>
                  <div className="flex flex-wrap gap-1">
                    {cohort.core_priorities.map((p: string, idx: number) => (
                      <span key={idx} className={`text-[10px] ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'} border px-2 py-0.5 rounded`}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Moral Nodes:</span>
                  {cohort.primary_moral_nodes.map((nId: string) => (
                    <button
                      key={nId}
                      onClick={() => setSelectedNode(nId as any)}
                      className="text-[9px] font-bold bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                      title="Click to highlight node & view details"
                    >
                      [{nId}]
                    </button>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 leading-relaxed pt-1">
                  <strong className="text-amber-400">Historical Memory:</strong> {cohort.historical_memory}
                </div>

                <button
                  onClick={() => handleAskAIDebate(cohort.name, `Demographic cohort representing ${cohort.population_share_pct}% electorate with priorities: ${cohort.core_priorities.join(', ')}`, cohort.primary_moral_nodes)}
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 hover:text-emerald-300 pt-1 transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Debate with AI Agent &rarr;</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Parliament Bills (2023 - 2026) */}
        {activeTab === 'bills' && !loading && (
          <div className="space-y-3.5">
            {/* Filter & Search Header */}
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-300'} space-y-2.5 shadow-sm`}>
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={billSearch}
                  onChange={(e) => setBillSearch(e.target.value)}
                  placeholder="Search bills by title, ministry, summary, or node..."
                  className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500'} border focus:outline-none focus:border-sky-500`}
                />
              </div>

              {/* Session Filter Dropdown / Pills */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Filter className="w-3 h-3 text-sky-400" />
                    <span>Session:</span>
                  </span>
                  <span>{selectedSession}</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  <button
                    onClick={() => setSelectedSession('All')}
                    className={`px-2 py-1 rounded-md text-[10px] font-extrabold whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedSession === 'All'
                        ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                        : isDarkMode ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    All Sessions
                  </button>
                  {PARLIAMENTARY_SESSIONS.map((sess) => (
                    <button
                      key={sess}
                      onClick={() => setSelectedSession(sess)}
                      className={`px-2 py-1 rounded-md text-[10px] font-extrabold whitespace-nowrap transition-colors cursor-pointer border ${
                        selectedSession === sess
                          ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                          : isDarkMode ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {sess}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter Dropdown */}
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Category:
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border focus:outline-none focus:border-sky-500 cursor-pointer`}
                >
                  <option value="All">All Categories ({BILL_CATEGORIES.length})</option>
                  {BILL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Result Count and Reset */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                <span>Showing <strong className="text-sky-400 font-bold">{filteredBills.length}</strong> of {bills.length} Parliamentary Acts</span>
                {(selectedSession !== 'All' || selectedCategory !== 'All' || billSearch) && (
                  <button
                    onClick={() => {
                      setSelectedSession('All');
                      setSelectedCategory('All');
                      setBillSearch('');
                    }}
                    className="text-amber-400 hover:underline cursor-pointer font-bold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Bills List */}
            {filteredBills.map((bill: ParliamentaryBill) => {
              const isDemoExpanded = expandedDemographics[bill.id];
              const isProvExpanded = expandedProvisions[bill.id];
              const statusStyle = getStatusBadge(bill.status);

              return (
                <div
                  key={bill.id}
                  className={`p-4 rounded-xl border-y border-r border-l-4 ${isDarkMode ? 'border-l-sky-500 border-slate-800 bg-slate-900/70 shadow-md' : 'border-l-sky-600 border-amber-300 bg-white shadow-sm'} space-y-3 hover:border-sky-500/80 transition`}
                >
                  {/* Card Header: Session, Status, Title, Ministry */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-[10px] font-extrabold bg-sky-950/90 text-sky-300 border border-sky-800/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Landmark className="w-3 h-3" />
                        <span>{bill.session} ({bill.year})</span>
                      </span>
                      <span className={`text-[10px] font-extrabold border px-2 py-0.5 rounded-full ${statusStyle}`}>
                        {bill.status}
                      </span>
                    </div>

                    <h3 className={`text-xs font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {bill.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span className="text-sky-400 font-semibold">{bill.ministry}</span>
                      <span>•</span>
                      <span className="italic">{bill.category}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} leading-relaxed`}>
                    {bill.summary}
                  </p>

                  {/* Key Provisions (Expandable / Highlights) */}
                  {bill.key_provisions && bill.key_provisions.length > 0 && (
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'} space-y-1.5`}>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1 text-sky-400">
                          <BookOpen className="w-3 h-3" />
                          <span>Key Provisions ({bill.key_provisions.length})</span>
                        </span>
                        {bill.key_provisions.length > 2 && (
                          <button
                            onClick={() => toggleProvisionsExpand(bill.id)}
                            className="text-sky-400 hover:text-sky-300 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>{isProvExpanded ? 'Show Less' : `+${bill.key_provisions.length - 2} More`}</span>
                            {isProvExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        )}
                      </div>
                      <ul className="space-y-1 text-[10px] text-slate-300">
                        {(isProvExpanded ? bill.key_provisions : bill.key_provisions.slice(0, 2)).map((prov, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-sky-400 font-bold shrink-0 mt-0.5">•</span>
                            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{prov}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Proponents Rationale vs Opponents Friction Points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'} space-y-1`}>
                      <div className="flex items-center gap-1 font-extrabold text-emerald-400 uppercase tracking-wider text-[9px]">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>Proponents Rationale</span>
                      </div>
                      <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                        {bill.proponents_argument}
                      </p>
                    </div>

                    <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-rose-950/30 border-rose-900/50' : 'bg-rose-50 border-rose-200'} space-y-1`}>
                      <div className="flex items-center gap-1 font-extrabold text-rose-400 uppercase tracking-wider text-[9px]">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>Opponents Friction</span>
                      </div>
                      <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                        {bill.opponents_argument}
                      </p>
                    </div>
                  </div>

                  {/* Moral Tensions note if present */}
                  {bill.moral_tensions && (
                    <div className={`p-2 rounded-lg border text-[10px] ${isDarkMode ? 'bg-amber-950/20 border-amber-900/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                      <strong className="text-amber-400 uppercase text-[9px] block">⚖️ Core Moral Tension:</strong>
                      <span>{bill.moral_tensions}</span>
                    </div>
                  )}

                  {/* Expandable 7-Cohort Demographic Support Meter */}
                  {bill.demographic_breakdown && bill.demographic_breakdown.length > 0 && (
                    <div className={`rounded-lg border ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'} overflow-hidden`}>
                      <button
                        onClick={() => toggleDemographicsExpand(bill.id)}
                        className={`w-full p-2.5 flex items-center justify-between text-left text-[10px] font-extrabold ${isDarkMode ? 'hover:bg-slate-900 text-slate-200' : 'hover:bg-slate-100 text-slate-800'} transition cursor-pointer`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Demographic Conscience Support ({bill.demographic_breakdown.length} Cohorts)</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <span>{isDemoExpanded ? 'Collapse' : 'View Meter'}</span>
                          {isDemoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {isDemoExpanded && (
                        <div className="p-3 space-y-2.5 border-t border-slate-800/80 text-[10px]">
                          {bill.demographic_breakdown.map((demo) => {
                            const meta = getStanceMeta(demo.stance);
                            return (
                              <div key={demo.cohort_id} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{demo.cohort_name}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-black border ${meta.pill}`}>
                                      {demo.stance}
                                    </span>
                                    <span className="font-mono font-extrabold text-slate-300">{demo.support_percent}%</span>
                                  </div>
                                </div>

                                {/* Support Bar */}
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${meta.bar}`}
                                    style={{ width: `${demo.support_percent}%` }}
                                  />
                                </div>

                                {demo.key_concern_or_benefit && (
                                  <p className="text-[9px] text-slate-400 leading-tight">
                                    {demo.key_concern_or_benefit}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Linked Morality Tree Node Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Linked Axioms:</span>
                    {bill.linked_morality_nodes.map((nId: string) => (
                      <button
                        key={nId}
                        onClick={() => setSelectedNode(nId as any)}
                        className="text-[9px] font-bold bg-cyan-950/90 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded cursor-pointer transition-colors shadow-sm"
                        title={`Click to inspect Node [${nId}]`}
                      >
                        [{nId}]
                      </button>
                    ))}
                  </div>

                  {/* Audit / CAG note */}
                  {bill.cag_or_audit_note && (
                    <div className="text-[9px] text-slate-400 italic">
                      <strong>Audit Context:</strong> {bill.cag_or_audit_note}
                    </div>
                  )}

                  {/* Socratic Debate Button */}
                  <button
                    onClick={() => handleDebateBillSocrates(bill)}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-sky-950/50 transition-all cursor-pointer border border-sky-400/40"
                  >
                    <Bot className="w-4 h-4 text-sky-200" />
                    <span>🤖 Debate Bill with Socrates</span>
                  </button>
                </div>
              );
            })}

            {filteredBills.length === 0 && (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-500" />
                <p className="font-bold">No parliamentary bills match your current filters.</p>
                <button
                  onClick={() => {
                    setSelectedSession('All');
                    setSelectedCategory('All');
                    setBillSearch('');
                  }}
                  className="text-xs text-sky-400 underline font-bold"
                >
                  Clear all search &amp; session filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Condorcet Paradox Analysis */}
        {activeTab === 'condorcet' && !loading && condorcetData && (
          <div className="space-y-3">
            {/* Single Streamlined Warning Card */}
            {condorcetData.paradox_detected && (
              <div className="p-3.5 rounded-xl border border-rose-800/80 bg-rose-950/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-extrabold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Condorcet Paradox Detected (Arrow's Impossibility Theorem)</span>
                </div>
                <div className="p-2 bg-slate-950/90 rounded-lg border border-slate-800 text-[11px] font-mono text-center text-amber-300 font-bold tracking-wide">
                  {condorcetData.paradox_cycle.map((id: string) => {
                    const titles: Record<string, string> = {
                      'policy_A_rural_subsidy': 'Policy A (Rural Subsidy)',
                      'policy_B_market_dereg': 'Policy B (MSME Dereg)',
                      'policy_C_green_health': 'Policy C (Green Energy)'
                    };
                    return titles[id] || id;
                  }).join('  ≻  ')}
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Collective voting forms an intransitive cycle where no single policy wins a majority against all others.
                </p>
              </div>
            )}

            {/* Evaluated Options */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 px-1">Evaluated Legislative Options:</span>
              {condorcetData.options_evaluated.map((opt: any) => (
                <div key={opt.id} className={`p-3 border rounded-xl space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-amber-300'}`}>
                  <h4 className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{opt.title}</h4>
                  <p className={`text-[10px] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{opt.summary}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {opt.linked_nodes.map((nId: string) => (
                      <button
                        key={nId}
                        onClick={() => setSelectedNode(nId as any)}
                        className="text-[9px] font-bold bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 px-1.5 py-0.5 rounded cursor-pointer"
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
              <span className="text-[10px] font-extrabold uppercase text-slate-400 px-1">Head-to-Head Pairwise Vote Matches:</span>
              <div className="space-y-1 text-[10px]">
                {condorcetData.pairwise_matches.map((match: any, idx: number) => {
                  const titles: Record<string, string> = {
                    'policy_A_rural_subsidy': 'Policy A',
                    'policy_B_market_dereg': 'Policy B',
                    'policy_C_green_health': 'Policy C'
                  };
                  const name1 = titles[match.option_1] || match.option_1;
                  const name2 = titles[match.option_2] || match.option_2;
                  const winName = titles[match.winner] || match.winner;
                  return (
                    <div key={idx} className={`p-2 rounded-lg border flex justify-between items-center ${isDarkMode ? 'bg-slate-950 border-slate-800/80 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
                      <span className="font-semibold">{name1} vs {name2}</span>
                      <span className="text-emerald-400 font-extrabold">
                        {match.votes_1}% vs {match.votes_2}% &rarr; {winName} (+{match.margin_pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleAskAIDebate("Condorcet Voting Paradox", condorcetData.analysis_summary, ["P3_EQUITY", "A6", "D8"])}
              className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 text-amber-300 text-xs font-extrabold transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>🤖 Debate Voting Paradox with AI Agent</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
