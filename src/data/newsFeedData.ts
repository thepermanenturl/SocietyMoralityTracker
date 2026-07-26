import { NewsTaskCard } from '../types/morality';

export const NEWS_FEED_DATA: NewsTaskCard[] = [
  {
    id: "news-1",
    title: "Demonetisation (2016 Currency Invalidation)",
    date: "November 2016 – 2023",
    category: "Economic Policy & Executive Action",
    summary: "Sudden invalidation of 86% of circulating cash currency (₹500 & ₹1000 notes) with 4 hours notice, creating cash shortages and informal economy disruption.",
    newsPublisher: "Reserve Bank of India & Supreme Court Review (2023)",
    newsUrl: "https://www.thehindu.com/news/national/supreme-court-upholds-demonetisation-decision/article66329712.ece",
    violatedNodes: ["A1", "A5", "D6", "E4"],
    violatedNodeTitles: ["A1: Suffering", "A5: Basic Needs", "D6: Harm Principle", "E4: Economic Safety Nets"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Violated Axiom A1 (Suffering) and A5 (Basic Needs) by denying daily-wage workers and small traders access to food and healthcare due to acute cash starvation. Over 100 queue deaths occurred, breaching the Harm Principle (D6)."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Demonetisation was designed as a macro-financial shock to sever black money channels, terror financing, and counterfeit currency. Systemic economic surgery requires temporary friction to safeguard long-term national integrity."
    }
  },
  {
    id: "news-2",
    title: "Citizenship Amendment Act (CAA 2019 / Rules 2024)",
    date: "December 2019 – March 2024",
    category: "Constitutional Law & Immigration",
    summary: "Fast-tracked Indian citizenship for persecuted religious minorities from Pakistan, Bangladesh, and Afghanistan while excluding non-minority groups.",
    newsPublisher: "Amnesty International & UN Human Rights Office",
    newsUrl: "https://www.bbc.com/news/world-asia-india-68537237",
    violatedNodes: ["A6", "D4", "D8"],
    violatedNodeTitles: ["A6: Equity", "D4: Universal Non-Discrimination", "D8: Democratic Consent"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Directly violates Axiom A6 (Equity/Fairness) and Derived Principle D4 (Universal Non-Discrimination) by codifying religious identity into citizenship criteria."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The CAA addresses specific historically persecuted minority groups in neighboring Islamic Republics where state religions disenfranchise non-Muslim minorities."
    }
  },
  {
    id: "news-3",
    title: "Electoral Bonds Scheme (Struck Down by Supreme Court)",
    date: "2018 – February 2024",
    category: "Electoral Integrity & Governance",
    summary: "Anonymous corporate political donations scheme struck down as unconstitutional by a unanimous 5-judge Supreme Court bench for violating voters' Right to Information.",
    newsPublisher: "Supreme Court 5-Judge Bench & The Indian Express",
    newsUrl: "https://indianexpress.com/article/india/electoral-bonds-scheme-unconstitutional-supreme-court-verdict-9162125/",
    violatedNodes: ["A4", "D8", "E3"],
    violatedNodeTitles: ["A4: Autonomy", "D8: Democratic Consent", "E3: Epistemic Duty & Truthfulness"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Violated Democratic Governance by Consent (D8) and Epistemic Choice (E3) by hiding corporate influence from voters."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Electoral Bonds aimed to curb cash-driven black money in elections by forcing all political contributions into white banking channels."
    }
  }
];
