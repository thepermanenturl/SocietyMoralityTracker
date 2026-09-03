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
  },
  {
    id: "news-4",
    title: "The Three Farm Laws & Year-Long Agrarian Protests (2020–2021)",
    date: "September 2020 – November 2021",
    category: "Agrarian Economy & Democratic Consultation",
    summary: "Three farm deregulation laws passed via parliamentary voice vote led to a massive 1-year farmers protest on Delhi borders, culminating in formal legislative repeal.",
    newsPublisher: "The Hindu & BBC News",
    newsUrl: "https://www.bbc.com/news/world-asia-india-59343719",
    violatedNodes: ["A4", "A5", "D8", "E7"],
    violatedNodeTitles: ["A4: Autonomy", "A5: Basic Needs", "D8: Democratic Consent", "E7: Livelihood Security"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Passing major agrarian reforms without stakeholder pre-consultation breached Democratic Consent (D8) and threatened smallholder Livelihood Security (E7)."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The reforms were designed to liberate farmers from APMC cartel middlemen and attract private cold-chain infrastructure capital."
    }
  },
  {
    id: "news-5",
    title: "Abrogation of Article 370 & State Reorganization (2019)",
    date: "August 2019 – December 2023",
    category: "Constitutional Federalism & Civil Liberties",
    summary: "Revocation of Jammu & Kashmir's special status, bifurcation into two Union Territories, and protracted internet/communication restrictions upheld by Supreme Court.",
    newsPublisher: "Supreme Court Constitution Bench & Reuters",
    newsUrl: "https://www.thehindu.com/news/national/supreme-court-verdict-on-article-370-abrogation-live-updates/article67625126.ece",
    violatedNodes: ["A3", "A4", "D4", "E1"],
    violatedNodeTitles: ["A3: Dignity", "A4: Autonomy", "D4: Non-Discrimination", "E1: Freedom of Expression & Assembly"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "The protracted communication blackouts and preventive detentions compromised Axiom A4 (Autonomy) and Freedom of Expression (E1)."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Abrogation established complete constitutional symmetry across all Indian territories, extending affirmative action and property rights to marginalized groups."
    }
  },
  {
    id: "news-6",
    title: "Muslim Women (Protection of Rights on Marriage) Act — Triple Talaq (2019)",
    date: "July 2019",
    category: "Gender Equity & Marital Justice",
    summary: "Criminalization of instantaneous triple talaq (Talaq-e-Biddat) with up to 3 years imprisonment following Supreme Court's Shayara Bano verdict.",
    newsPublisher: "Ministry of Law and Justice & Indian Express",
    newsUrl: "https://indianexpress.com/article/india/triple-talaq-bill-passed-in-rajya-sabha-5863261/",
    violatedNodes: ["A1", "A6", "D2", "E6"],
    violatedNodeTitles: ["A1: Suffering", "A6: Equity", "D2: Bodily Integrity", "E6: Gender Parity"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Upholds Axiom A6 (Equity) and Gender Parity (E6) by outlawing arbitrary, unilateral desertion of women without judicial process."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Critics argued that criminalizing a civil marital contract breach disproportionately penalized men compared to other religious communities."
    }
  },
  {
    id: "news-7",
    title: "Right to Information (RTI) Amendment Act (2019)",
    date: "July 2019",
    category: "Transparency & Institutional Autonomy",
    summary: "Amendments empowered central executive to determine tenure, salaries, and service conditions of Information Commissioners, previously fixed by statute.",
    newsPublisher: "Central Information Commission & The Hindu",
    newsUrl: "https://www.thehindu.com/news/national/parliament-passes-rti-amendment-bill/article28711467.ece",
    violatedNodes: ["A4", "D4", "E5"],
    violatedNodeTitles: ["A4: Autonomy", "D4: Institutional Independence", "E5: Epistemic Transparency"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "Weakening the statutory independence of the CIC diminishes institutional accountability (E5) and public oversight."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "The government sought administrative rationalization, harmonizing Information Commissioners with non-constitutional statutory bodies."
    }
  },
  {
    id: "news-8",
    title: "Women's Reservation Bill — Nari Shakti Vandan Adhiniyam (2023)",
    date: "September 2023",
    category: "Gender Representation & Electoral Reform",
    summary: "Constitutional amendment guaranteeing 33% reservation for women in Lok Sabha and State Legislative Assemblies, contingent on post-census delimitation.",
    newsPublisher: "Parliament of India & NDTV",
    newsUrl: "https://www.ndtv.com/india-news/womens-reservation-bill-passed-in-lok-sabha-with-near-unanimous-vote-4407519",
    violatedNodes: ["A6", "D8", "E6"],
    violatedNodeTitles: ["A6: Equity", "D8: Democratic Representation", "E6: Gender Parity"],
    upholderStance: {
      headline: "🛡️ Upholder Moral Critique",
      analysis: "A historic affirmative action step advancing Gender Parity (E6) and Democratic Representation (D8) for half the population."
    },
    devilsAdvocateStance: {
      headline: "😈 Devil's Advocate / Extenuating Circumstances",
      analysis: "Implementation was deferred until after census and delimitation exercises, postponing immediate representation."
    }
  }
];
