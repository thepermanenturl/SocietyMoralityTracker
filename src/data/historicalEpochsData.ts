import { HistoricalEpoch } from '../types/morality';

export const HISTORICAL_EPOCHS: HistoricalEpoch[] = [
  {
    id: "epoch-1",
    name: "500 BCE — Axial Age & Classical Republics",
    years: "500 BCE – 300 BCE",
    startYear: -500,
    endYear: -300,
    summary: "Emergence of classical moral philosophy in Ancient Greece, India, and China (Socrates, Mahavira, Confucius). Early democratic assemblies emerged in Athens and Mahajanapadas.",
    unrestScore: 82,
    unrestCause: "Institutionalized chattel slavery, disenfranchisement of women, and systemic inter-city-state warfare.",
    keyNodes: ["P1_HARM", "A1", "A3", "A6", "D8"],
    violatedNodes: ["A4", "D4"],
    societalBlindspots: [
      { society: "Athenian Democracy", missingRights: "Excluded women, metics, and slaves (80%+ of population) from political suffrage." },
      { society: "Vedic & Mahajanapada India", missingRights: "Early caste stratification restricted occupational autonomy." },
      { society: "Warring States China", missingRights: "Totalitarian legalist conscription and summary executions." }
    ]
  },
  {
    id: "epoch-2",
    name: "250 BCE — Ashoka Rock Edicts & Universal Ahimsa",
    years: "250 BCE – 100 BCE",
    startYear: -250,
    endYear: -100,
    summary: "Following the Kalinga War devastation, Emperor Ashoka codified the Rock & Pillar Edicts establishing state-sponsored ahimsa (non-harm), animal welfare, and inter-faith tolerance.",
    unrestScore: 45,
    unrestCause: "Post-war imperial consolidation and provincial administrative corruption.",
    keyNodes: ["P1_HARM", "A1", "A2", "D4", "D5", "E6"],
    violatedNodes: ["D8"],
    societalBlindspots: [
      { society: "Maurya Empire", upholdingAchievement: "First global bill of rights protecting non-human animals and religious dissenters." },
      { society: "Hellenistic Kingdoms", missingRights: "Imperial succession wars and debt bondage." }
    ]
  },
  {
    id: "epoch-3",
    name: "1215 CE — Magna Carta & Feudal Rule of Law",
    years: "1215 CE – 1648 CE",
    startYear: 1215,
    endYear: 1648,
    summary: "English barons forced King John to sign Magna Carta, establishing that the sovereign is subject to law, laying early roots for habeas corpus and due process.",
    unrestScore: 78,
    unrestCause: "Feudal serfdom, religious inquisitions, and royal arbitrary taxation.",
    keyNodes: ["P2_AGENCY", "A4", "D6", "D8", "E2"],
    violatedNodes: ["A6", "D4", "E8"],
    societalBlindspots: [
      { society: "Feudal England", missingRights: "Magna Carta primarily protected wealthy barons, leaving serfs tied to land." },
      { society: "Medieval Europe", missingRights: "Inquisitorial trials without right to legal counsel or evidence transparency." }
    ]
  },
  {
    id: "epoch-4",
    name: "1948 CE — Post-WWII & Universal Declaration of Human Rights",
    years: "1948 CE – 1990 CE",
    startYear: 1948,
    endYear: 1990,
    summary: "In the wake of WWII and the Holocaust, the UN adopted the Universal Declaration of Human Rights (UDHR) under Eleanor Roosevelt and Hansa Mehta, asserting universal rights.",
    unrestScore: 62,
    unrestCause: "Cold War proxy conflicts, colonial independence struggles, and nuclear brinkmanship.",
    keyNodes: ["P1_HARM", "P3_EQUITY", "A1", "A2", "A3", "A4", "A5", "A6", "D1", "D2", "D4"],
    violatedNodes: ["E5", "X6"],
    societalBlindspots: [
      { society: "Decolonizing Nations", missingRights: "Economic poverty and partition violence hindered immediate ground enforcement." },
      { society: "Cold War Superpowers", missingRights: "Covert overseas interventions and domestic surveillance." }
    ]
  },
  {
    id: "epoch-5",
    name: "2026 CE — AI Governance & Biosphere Safeguards Era",
    years: "2026 CE – Present",
    startYear: 2026,
    endYear: 2035,
    summary: "Current epoch marked by artificial general intelligence deployment, climate tipping points, and digital privacy struggles requiring novel global governance frameworks.",
    unrestScore: 71,
    unrestCause: "AI displacement, algorithmic bias, mass surveillance, and accelerating climate destabilization.",
    keyNodes: ["P1_HARM", "P2_AGENCY", "P3_EQUITY", "E5", "E6", "E12", "X4", "X8"],
    violatedNodes: ["E5", "X4"],
    societalBlindspots: [
      { society: "Global Digital Economy", missingRights: "Corporate AI data harvesting without explicit individual consent." },
      { society: "Climate Vulnerable Zones", missingRights: "Rising sea levels threatening island states & agricultural livelihoods." }
    ]
  }
];
