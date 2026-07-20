/**
 * News Feed Dataset — Factual Task Cards & Node Violation Mapping
 * Covers major Indian governance policies, bills, and enforcement events
 * mapped to Morality Tree nodes (A1-A6, D1-D8, E1-E12, X1-X8).
 */
const NEWS_FEED_DATA = [
  {
    id: "news-1",
    title: "Demonetisation (2016 Currency Invalidation)",
    date: "November 2016 – 2023",
    category: "Economic Policy & Executive Action",
    summary: "Sudden invalidation of 86% of circulating cash currency (₹500 & ₹1000 notes) with 4 hours notice, creating intense cash shortages and informal economy disruption.",
    newsPublisher: "Reserve Bank of India & Supreme Court Review (2023)",
    newsUrl: "https://www.thehindu.com/news/national/supreme-court-upholds-demonetisation-decision/article66329712.ece",
    violatedNodes: ["A1", "A5", "D6", "E4"],
    violatedNodeTitles: ["A1: Existence of Suffering", "A5: Necessity of Basic Needs", "D6: Harm Principle", "E4: Economic Safety Nets"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Violated Axiom A1 (Suffering) and A5 (Basic Needs) by denying millions of daily-wage workers, rural citizens, and small traders access to food and healthcare due to acute cash starvation. Over 100 queue-related deaths occurred, breaching the Harm Principle (D6) by inflicting non-consensual collateral harm without demonstrated proportionality."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Demonetisation was designed as a macro-financial shock to sever black money channels, terror financing, and counterfeit currency networks. Under extenuating circumstances, systemic economic surgery requires temporary friction to safeguard long-term national integrity and push a historic transition toward transparent digital banking (UPI revolution), where short-term individual hardship is an unpreventable trade-off of statecraft."
    }
  },
  {
    id: "news-2",
    title: "Citizenship Amendment Act (CAA 2019 / Rules 2024)",
    date: "December 2019 – March 2024",
    category: "Constitutional Law & Immigration",
    summary: "Fast-tracked Indian citizenship for persecuted religious minorities (Hindus, Sikhs, Buddhists, Jains, Parsis, Christians) from Pakistan, Bangladesh, and Afghanistan while explicitly excluding Muslims.",
    newsPublisher: "Amnesty International & UN Human Rights Office",
    newsUrl: "https://www.bbc.com/news/world-asia-india-68537237",
    violatedNodes: ["A6", "D4", "D8"],
    violatedNodeTitles: ["A6: Equity & Fairness", "D4: Universal Non-Discrimination", "D8: Democratic Consent"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Directly violates Axiom A6 (Equity/Fairness) and Derived Principle D4 (Universal Non-Discrimination) by codifying religious identity into citizenship criteria. Selective fast-tracking based on religion breaches the core secular premise that like cases of human persecution must be treated alike regardless of faith."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The CAA addresses specific historical persecuted minority groups in neighboring Islamic Republics (Pakistan, Bangladesh, Afghanistan) where state religions explicitly disenfranchise non-Muslim minorities. Providing sanctuary to specific historically victimized refugees is an act of targeted humanitarian relief, not hostility toward non-eligible groups who retain standard naturalization pathways."
    }
  },
  {
    id: "news-3",
    title: "Electoral Bonds Scheme (Struck Down by Supreme Court)",
    date: "2018 – February 2024",
    category: "Electoral Integrity & Governance",
    summary: "Anonymous corporate political donations scheme struck down as unconstitutional by a unanimous 5-judge Supreme Court bench for violating citizens' fundamental Right to Information.",
    newsPublisher: "Supreme Court 5-Judge Bench & The Indian Express",
    newsUrl: "https://indianexpress.com/article/india/electoral-bonds-scheme-unconstitutional-supreme-court-verdict-9162125/",
    violatedNodes: ["A4", "D8", "E3"],
    violatedNodeTitles: ["A4: Value of Autonomy", "D8: Democratic Consent", "E3: Free Expression & Informed Choice"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Violated Democratic Governance by Consent (D8) and Epistemic Choice (E3) by hiding quid-pro-quo corporate influence from voters. Denying voters knowledge of who funds political parties corrupts informed democratic consent, allowing wealthy donors to influence policy without public accountability."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Electoral Bonds aimed to curb cash-driven black money in elections by forcing all political contributions into white banking channels via the State Bank of India. Donor anonymity was introduced to protect business donors from political victimization and retaliation by opposing state governments when power shifts."
    }
  },
  {
    id: "news-4",
    title: "Ram Mandir Trust Land Purchase Price Markup Controversies",
    date: "June 2021 – 2024",
    category: "Financial Integrity & Religious Trust",
    summary: "Leaked land deeds revealed a 1.2-hectare plot in Ayodhya was bought by individuals for ₹2 Crore and resold 10 minutes later to the Ram Janmabhoomi Teerth Kshetra Trust for ₹18.5 Crore.",
    newsPublisher: "The Hindu & The Wire",
    newsUrl: "https://www.thehindu.com/news/national/other-states/ayodhya-ram-temple-land-deal-controversy/article34808620.ece",
    violatedNodes: ["A6", "D7", "E3"],
    violatedNodeTitles: ["A6: Equity & Fairness", "D7: Obligation of Mutual Aid", "E3: Epistemic Duty & Truthfulness"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Breaches Axiom A6 (Fairness) and Epistemic Truthfulness (E3) by exploiting sacred public donations for massive middleman financial markup. Using public trust funds for inflated private gains corrupts institutional integrity and exploits citizen devotion."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The land was acquired under an earlier agreement at historical prices, and the final transaction reflected market value appraisal necessary to secure adjacent land for massive pilgrim infrastructure and security corridors. Market price adjustments under tight development deadlines do not inherently prove malicious fraud."
    }
  },
  {
    id: "news-5",
    title: "Farm Laws Enactment & 13-Month Protests",
    date: "September 2020 – November 2021",
    category: "Agriculture & Civil Society Protests",
    summary: "Three agricultural deregulation laws passed without parliamentary division voting or consultation, triggering a 13-month farmer siege at Delhi borders leading to 700+ deaths before repeal.",
    newsPublisher: "BBC News & Reuters",
    newsUrl: "https://www.bbc.com/news/world-asia-india-59340889",
    violatedNodes: ["A1", "A4", "D8"],
    violatedNodeTitles: ["A1: Existence of Suffering", "A4: Value of Autonomy", "D8: Democratic Consent"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Violated Democratic Governance by Consent (D8) by bypassing stakeholder consultation with agrarian unions, forcing laws that farmers feared would dismantle MSP safety nets. The resulting 13-month cold exposure and police barricading caused over 700 avoidable deaths (A1 Suffering)."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The agricultural laws aimed to modernize India's legacy APMC market system, allow farmers to sell directly to private buyers across state borders, and attract capital investment into cold storage infrastructure to reduce 30%+ post-harvest food waste. Subsidies and cartelized mandis required structural reform for long-term national food security."
    }
  }
];

if (typeof window !== "undefined") {
  window.NEWS_FEED_DATA = NEWS_FEED_DATA;
}
