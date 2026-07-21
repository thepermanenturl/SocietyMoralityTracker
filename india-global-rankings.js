/**
 * India & Global Non-Profit Independent Agency Rankings Data
 * Maps Morality Tree nodes (Layer 0-3) to independent, uncompromised global indices.
 */
const INDIA_GLOBAL_RANKINGS = {
  A1: { indexName: "Global Hunger Index", rank: "111 / 125", agency: "IFPRI / Welthungerhilfe", category: "Basic Needs & Suffering", score: "28.7 (Serious)" },
  A2: { indexName: "Human Rights Protection Index", rank: "108 / 170", agency: "CIRI Human Rights Data", category: "Sentient Worth", score: "Moderate" },
  A3: { indexName: "Global Peace Index", rank: "126 / 163", agency: "Institute for Economics & Peace (IEP)", category: "Golden Rule / Non-Harm", score: "2.31" },
  A4: { indexName: "V-Dem Autonomy & Choice Index", rank: "104 / 179", agency: "V-Dem Institute (Sweden)", category: "Autonomy & Consent", score: "Electoral Autocracy Status" },
  A5: { indexName: "Human Development Index (HDI)", rank: "134 / 193", agency: "UNDP (United Nations)", category: "Basic Needs & Living Standard", score: "0.644" },
  A6: { indexName: "World Inequality Report", rank: "Top 1% holds 40.1% wealth", agency: "World Inequality Lab", category: "Equity & Wealth Gap", score: "Severe Disparity" },
  
  D1: { indexName: "Universal Health Coverage Index", rank: "115 / 190", agency: "World Health Organization (WHO)", category: "Bodily Integrity & Health", score: "61 / 100" },
  D2: { indexName: "Rule of Law Index", rank: "77 / 142", agency: "World Justice Project (WJP)", category: "Justice & Legal Due Process", score: "0.49" },
  D3: { indexName: "Academic Freedom Index", rank: "Bottom 30%", agency: "V-Dem & Friedrich-Alexander Univ", category: "Intellectual & Educational Freedom", score: "0.38" },
  D4: { indexName: "World Press Freedom Index", rank: "159 / 180", agency: "Reporters Without Borders (RSF)", category: "Freedom of Expression", score: "31.28 (Very Serious)" },
  D5: { indexName: "Global Privacy & Surveillance Index", rank: "102 / 120", agency: "Comparitech Privacy Index", category: "Privacy & Data Protection", score: "High State Surveillance" },
  D6: { indexName: "Environmental Performance Index", rank: "176 / 180", agency: "Yale / Columbia University", category: "Harm Principle & Ecology", score: "27.6 / 100" },
  D7: { indexName: "World Giving & Mutual Aid Index", rank: "43 / 142", agency: "Charities Aid Foundation (CAF)", category: "Mutual Aid & Solidarity", score: "48%" },
  D8: { indexName: "V-Dem Electoral Democracy Index", rank: "104 / 179", agency: "V-Dem Institute", category: "Democratic Governance by Consent", score: "0.36" },

  E1: { indexName: "Global Gender Gap Index", rank: "129 / 146", agency: "World Economic Forum (WEF)", category: "Gender Equity", score: "64.1%" },
  E2: { indexName: "Global Labor Rights Index", rank: "Category 5 (No Guarantee)", agency: "ITUC Global Rights Index", category: "Worker Protection", score: "High Violation Rate" },
  E3: { indexName: "Global Corruption Perception Index", rank: "93 / 180", agency: "Transparency International", category: "Anti-Corruption & Transparency", score: "39 / 100" },
  E4: { indexName: "Global Education Quality Index", rank: "102 / 140", agency: "UNESCO Global Education Monitoring", category: "Universal Accessible Education", score: "Moderate Access Gap" },
  E5: { indexName: "Global Housing Affordability Index", rank: "112 / 150", agency: "UN-Habitat", category: "Shelter & Living Rights", score: "High Urban Deficit" },
  E6: { indexName: "Water Security & Sanitation Index", rank: "122 / 180", agency: "WaterAid / UN-Water", category: "Clean Water Access", score: "54% Rural Reach" },
  E7: { indexName: "Global Climate Risk Index", rank: "7th Most Vulnerable", agency: "Germanwatch Climate Index", category: "Climate Resilience", score: "Severe Vulnerability" },
  E8: { indexName: "Global Biodiversity Protection Index", rank: "168 / 180", agency: "WWF & Yale EPI", category: "Ecological Conservation", score: "Critical Habitat Deficit" },
  E9: { indexName: "Digital Rights & Open Internet Index", rank: "1st in Global Internet Shutdowns", agency: "Access Now / Freedom House", category: "Digital Freedom", score: "84 Shutdowns / Year" },
  E10: { indexName: "Judicial Backlog & Capacity Index", rank: "50M+ Pending Cases", agency: "National Judicial Data Grid", category: "Judicial Speed & Fairness", score: "30+ Year Backlog" },
  E11: { indexName: "Whistleblower Protection Index", rank: "Weak Statutory Shield", agency: "Government Accountability Project", category: "Whistleblower Safety", score: "High Retaliation Risk" },
  E12: { indexName: "Indigenous & Tribal Rights Index", rank: "Substantial 6th Schedule Deficit", agency: "Survival International", category: "Tribal & Indigenous Safeguards", score: "Low Forest Rights Reach" },

  X1: { indexName: "Global Security vs Liberty Index", rank: "High Surveillance Expansion", agency: "Amnesty International", category: "Security vs Freedom Dilemma", score: "High Friction" },
  X2: { indexName: "Global Patent & Health Rights Index", rank: "Compulsory License Holder", agency: "MSF Access Campaign", category: "Intellectual Property Dilemma", score: "Moderate Generic Production" },
  X3: { indexName: "Global Energy Transition Vulnerability", rank: "High Coal Dependency", agency: "International Energy Agency (IEA)", category: "Energy Transition Dilemma", score: "72% Fossil Grid" },
  X4: { indexName: "Global Speech vs Harmony Index", rank: "High Hate Speech Censorship Tension", agency: "Article 19 Free Expression Index", category: "Free Speech vs Public Order", score: "High State Regulation" },
  X5: { indexName: "Global Welfare Target Precision Index", rank: "Exclusion Error ~24%", agency: "World Bank Social Protection", category: "Universal Basic vs Targeted Welfare", score: "Moderate Target Error" },
  X6: { indexName: "Global Gene Editing & Bioethics Index", rank: "Strict Stem Cell Regulation", agency: "ICMR & WHO Bioethics Board", category: "Bioethics & Enhancement", score: "Precautionary Framework" },
  X7: { indexName: "Global Autonomous Weapons Governance", rank: "Non-Signatory to Lethal AI Ban", agency: "UNODA Autonomous Weapons", category: "AI Defense & Autonomous Drones", score: "High Defense R&D" },
  X8: { indexName: "Global Intergenerational Debt Burden Index", rank: "82% Debt to GDP", agency: "IMF Fiscal Monitor", category: "Fiscal Policy vs Future Generations", score: "Moderate Debt Stress" }
};

if (typeof module !== "undefined") {
  module.exports = INDIA_GLOBAL_RANKINGS;
} else if (typeof window !== "undefined") {
  window.INDIA_GLOBAL_RANKINGS = INDIA_GLOBAL_RANKINGS;
}
