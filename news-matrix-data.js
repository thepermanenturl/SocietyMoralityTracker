/**
 * Multi-Source News Matrix Data
 * Unvarnished media tracking with Trust Scores (0-100%), Spectrum Bias, Retractions, and Narrative Blindspots.
 */
const NEWS_MATRIX_DATA = [
  {
    id: "news_101",
    title: "Electoral Bonds Scheme Declared Unconstitutional by Supreme Court 5-Judge Bench",
    date: "2024-02-15",
    category: "Democratic Governance & Transparency",
    linkedNodes: ["A4", "D8", "E3"],
    sources: [
      { name: "Supreme Court Judgment", url: "https://sci.gov.in", bias: "Judicial Record", trustScore: 100 },
      { name: "The Hindu", url: "https://thehindu.com", bias: "Independent Center", trustScore: 92 },
      { name: "Indian Express", url: "https://indianexpress.com", bias: "Center", trustScore: 90 },
      { name: "The Wire", url: "https://thewire.in", bias: "Anti-Establishment", trustScore: 84 },
      { name: "Doordarshan News", url: "https://ddnews.gov.in", bias: "State-Aligned", trustScore: 70 }
    ],
    summary: "The Supreme Court struck down anonymous electoral bonds, declaring that corporate donor anonymity violates citizens' Right to Information under Article 19(1)(a).",
    trustScore: 94,
    retractions: ["Early state media reports claimed bonds were non-traceable cash replacements; SBI data revealed full serial number tracking."],
    blindspots: ["Initial government defense omitted quid-pro-quo corporate donor contracts following tax raids."]
  },
  {
    id: "news_102",
    title: "Sonam Wangchuk & Ladakhi Environmental Fasts for 6th Schedule Safeguards",
    date: "2024-10-02",
    category: "Ecological Stewardship & Tribal Rights",
    linkedNodes: ["D6", "E7", "E12"],
    sources: [
      { name: "BBC News", url: "https://bbc.com", bias: "Independent", trustScore: 91 },
      { name: "Reuters", url: "https://reuters.com", bias: "Center", trustScore: 93 },
      { name: "The Hindu", url: "https://thehindu.com", bias: "Independent Center", trustScore: 92 },
      { name: "State Press Briefings", url: "https://pib.gov.in", bias: "State-Aligned", trustScore: 68 }
    ],
    summary: "Sonam Wangchuk completed 21-day sub-zero climate fasts demanding constitutional 6th Schedule protections against industrial land acquisition in fragile Himalayan glaciers.",
    trustScore: 92,
    retractions: ["Initial police claims of public order threats were withdrawn following peaceful Delhi Chalo march arrival."],
    blindspots: ["Mainstream prime-time channels largely ignored 21-day hunger strikes until border detentions occurred."]
  },
  {
    id: "news_103",
    title: "Global Hunger Index Ranks India 111th Out of 125 Nations",
    date: "2023-10-12",
    category: "Basic Needs & Child Stunting",
    linkedNodes: ["A1", "A5", "E6"],
    sources: [
      { name: "Welthungerhilfe & Concern Worldwide", url: "https://globalhungerindex.org", bias: "Independent Non-Profit", trustScore: 95 },
      { name: "Ministry of Women & Child Dev (PIB)", url: "https://pib.gov.in", bias: "State-Aligned", trustScore: 65 },
      { name: "Reuters", url: "https://reuters.com", bias: "Center", trustScore: 93 }
    ],
    summary: "India ranked 111th with a child wasting rate of 18.7% (highest in report). Ministry disputed methodology, while independent researchers urged structural PDS grain access expansion.",
    trustScore: 88,
    retractions: ["Government statement claimed index used small opinion polls; IFPRI clarified data relies on UN FAO & NFHS empirical household measurements."],
    blindspots: ["Focus on emergency grain distribution obscures long-term micronutrient and protein poverty."]
  }
];

if (typeof module !== "undefined") {
  module.exports = NEWS_MATRIX_DATA;
} else if (typeof window !== "undefined") {
  window.NEWS_MATRIX_DATA = NEWS_MATRIX_DATA;
}
