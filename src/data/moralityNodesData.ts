import { MoralityNode } from '../types/morality';

export interface NodeLensContent {
  dilemmaTitle: string;
  dilemmaBody: string;
  psychologyTitle: string;
  psychologyBody: string;
  psychologyBlindspots: string[];
  constitutionTitle: string;
  constitutionQuote: string;
  constitutionReachPct: number;
  modernBuddhaExemplar: string;
  modernBuddhaStory: string;
  modernBuddhaLink: string;
  criticTitle: string;
  criticBody: string;
}

export interface EnrichedMoralityNode extends MoralityNode {
  summary2Liner: string;
  actionTitle?: string;
  actionStatement?: string;
  psychologyTitle?: string;
  psychologyStatement?: string;
  lenses: NodeLensContent;
}

export const ENRICHED_MORALITY_NODES: EnrichedMoralityNode[] = [
  // --- LAYER -1: 3 MINIMAL PRIMITIVE ORIGIN ROOTS ---
  {
    id: "P1_HARM",
    layer: -1,
    title: "Non-Harm & Suffering",
    statement: "Pain hurts, and avoiding unnecessary suffering is a universally shared starting point.",
    summary: "Root Primitive 1: Grounded in biological distress avoidance, Ahimsa, and universal pain reduction.",
    summary2Liner: "Root Primitive 1: Avoiding unnecessary physical & mental suffering is the universal starting point of all human ethics.",
    parentIds: [],
    status: "ratified",
    actionTitle: "Don't Hurt Needlessly",
    actionStatement: "Actively refrain from inflicting physical, emotional, or economic pain on others.",
    psychologyTitle: "Empathy & Distress Response",
    psychologyStatement: "Mirror neuron activation triggers shared aversion to witnessing harm.",
    lenses: {
      dilemmaTitle: "💡 Everyday Bodily & Emotional Harm",
      dilemmaBody: "When faced with personal conflicts or work pressure, refusing to inflict distress or burnout on others is the fundamental baseline.",
      psychologyTitle: "🧠 Empathy Gaps & Tribal Out-Group Dehumanization",
      psychologyBody: "Humans naturally feel empathy for in-group members but experience empathy deficits when witnessing out-group distress.",
      psychologyBlindspots: ["Tribal Out-group Dehumanization", "Diffusion of Responsibility in Crowds", "Moral Disengagement under Authority"],
      constitutionTitle: "🏛️ Indian Constitution Article 21 — Protection of Life",
      constitutionQuote: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
      constitutionReachPct: 85,
      modernBuddhaExemplar: "Baba Amte (Anandwan Leprosy Care)",
      modernBuddhaStory: "Dedicated 60 years to treating and sheltering abandoned leprosy patients, embodying lived Ahimsa.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Baba_Amte",
      criticTitle: "📢 Structural Violence & Systemic Neglect",
      criticBody: "State and market systems frequently tolerate preventable workplace deaths and pollution harm under the guise of economic necessity."
    }
  },
  {
    id: "P2_AGENCY",
    layer: -1,
    title: "Agency & Consent",
    statement: "You own your mind and body; forcing choices on others causes friction, trauma, and conflict.",
    summary: "Root Primitive 2: Grounded in individual self-determination, bodily autonomy, and free consent.",
    summary2Liner: "Root Primitive 2: Individual self-determination and explicit consent are necessary for human dignity and peaceful coexistence.",
    parentIds: [],
    status: "ratified",
    actionTitle: "Protect Free Consent",
    actionStatement: "Respect personal boundaries and never compel individuals against their autonomous choice.",
    psychologyTitle: "Autonomy & Reactance",
    psychologyStatement: "Forced coercion triggers psychological reactance and severe emotional resistance.",
    lenses: {
      dilemmaTitle: "💡 Personal Freedom vs Coercive Control",
      dilemmaBody: "Overriding someone's choices for 'their own good' damages trust; genuine flourishing requires self-chosen action.",
      psychologyTitle: "🧠 Psychological Reactance & Paternalism Bias",
      psychologyBody: "Imposing arbitrary restrictions triggers intense defensive reactance and undermines intrinsic motivation.",
      psychologyBlindspots: ["Paternalism Bias", "Illusion of Control", "Authority Bias under Hierarchies"],
      constitutionTitle: "🏛️ Indian Constitution Article 19(1)(a) — Freedom of Expression & Choice",
      constitutionQuote: "All citizens shall have the right to freedom of speech and expression and to form associations.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Aruna Roy & MKSS Movement",
      modernBuddhaStory: "Pioneered the Right to Information movement, empowering rural citizens to audit government records and exercise agency.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Aruna_Roy",
      criticTitle: "📢 Digital Surveillance & Bureaucratic Coercion",
      criticBody: "Modern biometric database mandates and opaque algorithms erode individual consent and undermine bodily autonomy."
    }
  },
  {
    id: "P3_EQUITY",
    layer: -1,
    title: "Equal Weight & Fairness",
    statement: "No person's pain or joy matters more than another's simply because of who they are.",
    summary: "Root Primitive 3: Grounded in impartiality, Rawlsian fairness, and non-discriminatory justice.",
    summary2Liner: "Root Primitive 3: Impartial justice demands that every individual's rights and burdens be weighed without privilege or prejudice.",
    parentIds: [],
    status: "ratified",
    actionTitle: "Distribute Burdens Fairly",
    actionStatement: "Apply rules equally and ensure no group carries unfair burdens while others enjoy privilege.",
    psychologyTitle: "Impartiality & Fairness Sensitivity",
    psychologyStatement: "Innate fairness detectors trigger outrage when rules are applied unequally.",
    lenses: {
      dilemmaTitle: "💡 Nepotism & Equal Opportunity in Daily Life",
      dilemmaBody: "Choosing between favoring family/friends vs giving equal opportunity to qualified strangers tests moral impartiality.",
      psychologyTitle: "🧠 In-Group Favoritism & Status Quo Bias",
      psychologyBody: "Cognitive biases naturally lead individuals to favor their own caste, class, or political tribe over universal fairness.",
      psychologyBlindspots: ["In-Group Favoritism", "Just-World Hypothesis Fallacy", "Self-Serving Privilege Attribution"],
      constitutionTitle: "🏛️ Indian Constitution Article 14 — Equality Before Law",
      constitutionQuote: "The State shall not deny to any person equality before the law or the equal protection of the laws.",
      constitutionReachPct: 72,
      modernBuddhaExemplar: "Bezwada Wilson (Safai Karmachari Andolan)",
      modernBuddhaStory: "Fought for 30 years to eradicate manual scavenging and restore equal human dignity to marginalized sanitation workers.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Bezwada_Wilson",
      criticTitle: "📢 Institutional Favoritism & Elite Privilege",
      criticBody: "Legal loopholes, money power in elections, and caste hierarchies perpetuate entrenched inequality despite constitutional guarantees."
    }
  },

  // --- LAYER 0: FOUNDATIONAL AXIOMS ---
  {
    id: "A1",
    layer: 0,
    title: "Existence of Suffering",
    statement: "Suffering is real, experienced by conscious beings, and intrinsically undesirable.",
    summary: "Pain hurts, and avoiding unnecessary suffering is universally shared.",
    summary2Liner: "Axiom 1: Physical and mental distress is an undeniable reality that forms the baseline for all ethical duties.",
    parentIds: ["P1_HARM"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Recognizing Unseen Distress",
      dilemmaBody: "Acknowledging that colleagues or family members are suffering in silence rather than minimizing their pain.",
      psychologyTitle: "🧠 Neglect Bias & Empathy Fatigue",
      psychologyBody: "Over-exposure to distant crisis news causes emotional numbing and desensitization.",
      psychologyBlindspots: ["Empathy Numbing", "Bystander Apathy"],
      constitutionTitle: "🏛️ Constitution Directive Principles (Article 38)",
      constitutionQuote: "State to secure a social order for the promotion of welfare of the people.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Dr. Prakash Amte (Hemalkasa Tribal Health)",
      modernBuddhaStory: "Provided free medical relief to remote indigenous communities for over four decades.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Prakash_Amte",
      criticTitle: "📢 Commercialization of Healthcare",
      criticBody: "Private medical profiteering treats suffering as a revenue opportunity rather than a public crisis to solve."
    }
  },
  {
    id: "A2",
    layer: 0,
    title: "Sentient Worth",
    statement: "Every sentient being possesses inherent moral worth.",
    summary: "Any creature capable of experiencing joy, pain, or consciousness matters morally.",
    summary2Liner: "Axiom 2: Conscious capacity to feel joy or distress endows every living creature with intrinsic moral value.",
    parentIds: ["P1_HARM"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Animal Welfare & Compassionate Living",
      dilemmaBody: "Choosing dietary or consumer choices that minimize cruelty toward non-human animals.",
      psychologyTitle: "🧠 Speciesism & Anthropocentric Bias",
      psychologyBody: "Limiting moral concern strictly to human beings while disregarding animal suffering.",
      psychologyBlindspots: ["Anthropomorphism Disregard", "Speciesist Bias"],
      constitutionTitle: "🏛️ Article 51A(g) — Fundamental Duty of Compassion",
      constitutionQuote: "It shall be the duty of every citizen to have compassion for living creatures.",
      constitutionReachPct: 65,
      modernBuddhaExemplar: "Maneka Gandhi & Animal Rights Advocates",
      modernBuddhaStory: "Pioneered legal protection for stray animals and wildlife conservation in South Asia.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Maneka_Gandhi",
      criticTitle: "📢 Industrial Factory Farming",
      criticBody: "Mass slaughterhouses and habitat destruction treat sentient life as disposable commodities."
    }
  },
  {
    id: "A3",
    layer: 0,
    title: "Golden Rule Baseline",
    statement: "Treat others as you would wish to be treated under equivalent circumstances.",
    summary: "Universal principle of reciprocity across major human ethical traditions.",
    summary2Liner: "Axiom 3: Reciprocity requires extending the exact same fairness to strangers as you demand for yourself.",
    parentIds: ["P3_EQUITY"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Interpersonal Respect & Civility",
      dilemmaBody: "Refraining from dishonest gossip or cheating when you would feel betrayed if done to you.",
      psychologyTitle: "🧠 Double Standard Bias & Hypocrisy",
      psychologyBody: "Judging one's own mistakes by intention while judging others strictly by consequences.",
      psychologyBlindspots: ["Fundamental Attribution Error", "Self-Serving Bias"],
      constitutionTitle: "🏛️ Preamble — Fraternity & Human Dignity",
      constitutionQuote: "Promoting among all citizens Fraternity assuring the dignity of the individual.",
      constitutionReachPct: 80,
      modernBuddhaExemplar: "Kabir Das & Bhakti Saints",
      modernBuddhaStory: "Preached radical social equality and mutual respect across religious and caste boundaries.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Kabir",
      criticTitle: "📢 Polarization & Mob Outrage",
      criticBody: "Online cancel culture and political tribalism abandon reciprocity in favor of punitive public shaming."
    }
  },
  {
    id: "A4",
    layer: 0,
    title: "Value of Autonomy",
    statement: "Self-determination and personal consent are necessary for human flourishing.",
    summary: "Conscious agents must be free to make choices about their own lives and bodies.",
    summary2Liner: "Axiom 4: Freedom of choice, thought, and consent are essential prerequisites for human dignity.",
    parentIds: ["P2_AGENCY"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Reproductive & Career Autonomy",
      dilemmaBody: "Supporting individuals in choosing their own career, partner, or reproductive future without family coercion.",
      psychologyTitle: "🧠 Over-Regulation & Loss of Control Trauma",
      psychologyBody: "Depriving individuals of control over their schedule or body causes anxiety and depression.",
      psychologyBlindspots: ["Control Illusion", "Micromanagement Bias"],
      constitutionTitle: "🏛️ Supreme Court Puttaswamy Judgment (2017)",
      constitutionQuote: "Privacy is the ultimate expression of individual autonomy and dignity.",
      constitutionReachPct: 88,
      modernBuddhaExemplar: "Dr. B.R. Ambedkar",
      modernBuddhaStory: "Fought for individual liberty and civil rights against oppressive hereditary social codes.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/B._R._Ambedkar",
      criticTitle: "📢 Surveillance Capitalism",
      criticBody: "Tech platforms exploit behavioral data to manipulate user decisions and undermine free will."
    }
  },
  {
    id: "A5",
    layer: 0,
    title: "Necessity of Basic Needs",
    statement: "Physical survival requirements (food, water, shelter, safety) must be met before higher flourishing is possible.",
    summary: "Grounded in physiological reality: basic needs form the foundation of life.",
    summary2Liner: "Axiom 5: Physiological survival requirements like food, water, and shelter take precedence over secondary luxuries.",
    parentIds: ["P1_HARM"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Resource Allocation in Crisis",
      dilemmaBody: "Prioritizing emergency food and clean water distribution over non-essential municipal cosmetic upgrades.",
      psychologyTitle: "🧠 Maslow Hierarchy Deficiency Blindspot",
      psychologyBody: "Middle-class observers often mistake poverty-driven choices for poor moral character.",
      psychologyBlindspots: ["Scarcity Mindset Strain", "Out-Group Blame"],
      constitutionTitle: "🏛️ Right to Food & Water (Article 21 Rulings)",
      constitutionQuote: "Right to life includes the right to live with human dignity and minimum sustenance.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Medha Patkar (Narmada Bachao Andolan)",
      modernBuddhaStory: "Fought for displaced villagers to secure basic water, land, and rehabilitation rights.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Medha_Patkar",
      criticTitle: "📢 Malnutrition & Slum Evictions",
      criticBody: "Urban beautification drives frequently destroy informal shelters without providing alternative housing."
    }
  },
  {
    id: "A6",
    layer: 0,
    title: "Equity & Fairness",
    statement: "Like cases must be treated alike; arbitrary discrimination based on non-relevant characteristics is unjust.",
    summary: "Impartiality baseline: rules must apply equally without nepotism or bias.",
    summary2Liner: "Axiom 6: Justice requires consistent rules applied equally without favoritism, caste, gender, or wealth bias.",
    parentIds: ["P3_EQUITY"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Merit-Based Hiring & Fair Play",
      dilemmaBody: "Selecting candidates based on transparent evaluation rather than personal connections or bribes.",
      psychologyTitle: "🧠 Implicit Bias & Halo Effect",
      psychologyBody: "Unconscious stereotypes cause interviewers and judges to evaluate identical performance differently.",
      psychologyBlindspots: ["Implicit Stereotyping", "Halo/Horns Effect"],
      constitutionTitle: "🏛️ Article 15 — Prohibition of Discrimination",
      constitutionQuote: "The State shall not discriminate on grounds only of religion, race, caste, sex, place of birth.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Savitribai Phule",
      modernBuddhaStory: "Pioneered female education and anti-caste reform in 19th century India despite violent societal backlash.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Savitribai_Phule",
      criticTitle: "📢 Structural Discrimination in Housing",
      criticBody: "Systemic housing segregation in urban cities denies rentals to minority communities."
    }
  },

  // --- LAYER 1: DERIVED PRINCIPLES ---
  {
    id: "D1",
    layer: 1,
    title: "Access to Healthcare",
    statement: "Every person has a right to necessary medical treatment regardless of economic status.",
    summary: "Directly derived from A1 (Suffering) and A5 (Basic Needs).",
    summary2Liner: "Derived Principle 1: Universal healthcare access prevents unnecessary mortality and financial ruin for vulnerable families.",
    parentIds: ["A1", "A5"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Medical Emergency vs Ability to Pay",
      dilemmaBody: "Hospitals providing life-saving emergency care first before demanding advance payment deposits.",
      psychologyTitle: "🧠 Financial Stress & Medical Avoidance",
      psychologyBody: "Fear of catastrophic healthcare debt causes low-income patients to delay treatment until illness is terminal.",
      psychologyBlindspots: ["Present Bias in Healthcare", "Avoidance Coping"],
      constitutionTitle: "🏛️ Ayushman Bharat & Article 21 Health Mandate",
      constitutionQuote: "Public health is among the primary duties of the State.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Dr. Abhay and Dr. Rani Bang (SEARCH Gadchiroli)",
      modernBuddhaStory: "Reduced infant mortality by 75% in tribal belts through community health worker interventions.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Abhay_and_Rani_Bang",
      criticTitle: "📢 Out-of-Pocket Expenditure Crisis",
      criticBody: "Over 55 million Indians fall into poverty annually due to private medical bills and overpriced pharmaceuticals."
    }
  },
  {
    id: "D2",
    layer: 1,
    title: "Institutional Integrity",
    statement: "Public institutions must remain transparent, accountable, and corruption-free.",
    summary: "Directly derived from A3 (Reciprocity) and A6 (Equity).",
    summary2Liner: "Derived Principle 2: Public trust requires independent oversight, anti-corruption enforcement, and transparent governance.",
    parentIds: ["A3", "A6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Whistleblowing vs Career Survival",
      dilemmaBody: "Exposing bribery or tender fraud within a department despite threats of transfer or retaliation.",
      psychologyTitle: "🧠 Normalization of Corruption",
      psychologyBody: "When bribery is widespread, citizens rationalize corruption as a necessary transaction cost.",
      psychologyBlindspots: ["Social Conformity in Corruption", "Bribe Rationalization"],
      constitutionTitle: "🏛️ Prevention of Corruption Act & Lokpal Act",
      constitutionQuote: "Public servants holding public trust must account for unexplained assets.",
      constitutionReachPct: 62,
      modernBuddhaExemplar: "Satyendra Dubey & Manjunath Shanmugam",
      modernBuddhaStory: "Whistleblowers who sacrificed their lives to expose highway construction fraud and oil adulteration.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Satyendra_Dubey",
      criticTitle: "📢 Political Interference in Audit Bodies",
      criticBody: "Weakening enforcement agencies and delaying whistleblower protection laws compromises public integrity."
    }
  },
  {
    id: "D3",
    layer: 1,
    title: "Free Speech & Assembly",
    statement: "Open dialogue, peaceful dissent, and free press are vital safeguards against tyranny.",
    summary: "Directly derived from A4 (Autonomy) and A6 (Fairness).",
    summary2Liner: "Derived Principle 3: Peaceful dissent, investigative journalism, and free speech protect society against authoritarian overreach.",
    parentIds: ["A4", "A6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Tolerating Unpopular Opinions",
      dilemmaBody: "Defending the right of peaceful critics to express controversial views without mob intimidation.",
      psychologyTitle: "🧠 Echo Chambers & Mob Censorship",
      psychologyBody: "Groupthink leads dominant majorities to silence minority viewpoints to maintain cognitive comfort.",
      psychologyBlindspots: ["Groupthink Silencing", "Confirmation Bias Sorting"],
      constitutionTitle: "🏛️ Article 19(1)(a) & Romesh Thappar Benchmark",
      constitutionQuote: "Freedom of speech includes freedom of propagation of ideas through circulation.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Gauri Lankesh & Independent Journalists",
      modernBuddhaStory: "Journalists who risked their safety to report on secular democracy and counter disinformation.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Gauri_Lankesh",
      criticTitle: "📢 Internet Shutdowns & Defamation Suits",
      criticBody: "Frequent digital blackouts and SLAPP lawsuits silence public watchdogs and grassroots activists."
    }
  },
  {
    id: "D4",
    layer: 1,
    title: "Universal Education",
    statement: "Quality education empowers individual agency, critical thinking, and socio-economic mobility.",
    summary: "Directly derived from A4 (Autonomy) and A5 (Basic Needs).",
    summary2Liner: "Derived Principle 4: Universal schooling equips young minds with critical reasoning and pathways out of generational poverty.",
    parentIds: ["A4", "A5"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Public School Funding vs Commercialization",
      dilemmaBody: "Investing tax dollars into neighborhood public schools rather than privatizing education into elite fee-charging academies.",
      psychologyTitle: "🧠 Educational Inequality & Fixed Mindset",
      psychologyBody: "Poor school infrastructure leads under-resourced children to internalize low academic self-efficacy.",
      psychologyBlindspots: ["Stereotype Threat", "Educational Caste Bias"],
      constitutionTitle: "🏛️ Right to Education Act (Article 21A)",
      constitutionQuote: "The State shall provide free and compulsory education to all children of 6 to 14 years.",
      constitutionReachPct: 82,
      modernBuddhaExemplar: "Shaheen Mistri (Teach For India)",
      modernBuddhaStory: "Mobilized thousands of young graduates to teach in under-resourced low-income municipal schools.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Shaheen_Mistri",
      criticTitle: "📢 Exam Paper Leaks & Commercial Coaching Monopoly",
      criticBody: "Recruitment exam paper leaks and expensive coaching monopolies disenfranchise rural students."
    }
  },
  {
    id: "D5",
    layer: 1,
    title: "Maternal & Child Welfare",
    statement: "Protecting mothers and infants secures the fundamental health of future generations.",
    summary: "Directly derived from A1 (Suffering Avoidance) and A5 (Basic Needs).",
    summary2Liner: "Derived Principle 5: Essential nutrition, safe childbirth facilities, and child protection build a resilient societal foundation.",
    parentIds: ["A1", "A5"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Paid Maternity Leave & Workplace Support",
      dilemmaBody: "Providing full paid maternity leave and daycare options rather than penalizing female employees.",
      psychologyTitle: "🧠 Caregiver Burnout & Unpaid Labor Neglect",
      psychologyBody: "Society undervalues domestic maternal care, treating reproductive labor as invisible free effort.",
      psychologyBlindspots: ["Caregiver Invisibility", "Maternal Penalty Bias"],
      constitutionTitle: "🏛️ Article 42 — Maternity Relief Mandate",
      constitutionQuote: "The State shall make provision for securing just and humane conditions of work and for maternity relief.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Jitin Singla & Anganwadi Workers (ASHA)",
      modernBuddhaStory: "Millions of ASHA workers walk village to village delivering maternal vaccines and infant nutrition.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/ASHA_worker",
      criticTitle: "📢 Stunting Rates & Anganwadi Underfunding",
      criticBody: "High child stunting statistics reveal persistent gaps in rural supplementary nutrition schemes."
    }
  },
  {
    id: "D6",
    layer: 1,
    title: "Environmental Stewardship",
    statement: "Preserving ecological balance protects long-term planetary habitability.",
    summary: "Directly derived from A1 (Suffering) and A5 (Basic Needs).",
    summary2Liner: "Derived Principle 6: Sustainable resource management safeguards clean air, fertile soil, and climate resilience for the future.",
    parentIds: ["A1", "A5"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Renewable Energy Transition vs Short-Term Coal Usage",
      dilemmaBody: "Transitioning to solar and wind infrastructure even when coal offers cheaper immediate electricity.",
      psychologyTitle: "🧠 Hyperbolic Time Discounting",
      psychologyBody: "Human brains prioritize immediate industrial profits over catastrophic climate consequences 20 years away.",
      psychologyBlindspots: ["Short-Term Profit Discounting", "Tragedy of the Commons"],
      constitutionTitle: "🏛️ Article 48A — Protection of Forests & Wildlife",
      constitutionQuote: "The State shall endeavor to protect and improve the environment and to safeguard forests and wildlife.",
      constitutionReachPct: 68,
      modernBuddhaExemplar: "Sundarlal Bahuguna (Chipko Movement)",
      modernBuddhaStory: "Pioneered tree-hugging non-violent resistance to stop deforestation in the Himalayan ecologically sensitive zone.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Sundarlal_Bahuguna",
      criticTitle: "📢 Air Quality Index Crises in Metros",
      criticBody: "Severe winter smog in major cities demonstrates systemic failure to regulate industrial emissions and crop burning."
    }
  },
  {
    id: "D7",
    layer: 1,
    title: "Basic Needs Guarantee",
    statement: "Society must ensure minimum food, clean drinking water, and shelter for all citizens.",
    summary: "Directly derived from A5 (Basic Needs) and A6 (Equity).",
    summary2Liner: "Derived Principle 7: Universal access to food security, clean drinking tap water, and dignified housing is a public duty.",
    parentIds: ["A5", "A6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Universal Ration vs Strict Biometric Exclusions",
      dilemmaBody: "Providing ration grain to starving families even if their digital ID fingerprint scanner fails to authenticate.",
      psychologyTitle: "🧠 Poverty Blaming & Just-World Fallacy",
      psychologyBody: "Privileged observers falsely attribute poverty to laziness rather than systemic lack of opportunity.",
      psychologyBlindspots: ["Just-World Fallacy", "Out-Group Poverty Stigma"],
      constitutionTitle: "🏛️ National Food Security Act 2013",
      constitutionQuote: "Subsidized food grains to cover up to 75% of rural and 50% of urban population.",
      constitutionReachPct: 85,
      modernBuddhaExemplar: "Jean Drèze & Right to Food Campaign",
      modernBuddhaStory: "Architect of universal mid-day meal schemes in schools and employment guarantees for rural workers.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Jean_Dr%C3%A8ze",
      criticTitle: "📢 Exclusion Errors in PDS Distribution",
      criticBody: "Rigid bureaucratic documentation requirements disenfranchise elderly and homeless citizens from food grain."
    }
  },
  {
    id: "D8",
    layer: 1,
    title: "Accountable Governance",
    statement: "Leaders and government officials must answer to the citizens they serve.",
    summary: "Directly derived from A3 (Reciprocity) and A4 (Autonomy).",
    summary2Liner: "Derived Principle 8: Democratic legitimacy demands election transparency, public audits, and citizen redress mechanisms.",
    parentIds: ["A3", "A4"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Electoral Transparency vs Opaque Campaign Funding",
      dilemmaBody: "Mandating public disclosure of political party donations so voters know who finances political candidates.",
      psychologyTitle: "🧠 Blind Loyalty & Authoritarian Submission",
      psychologyBody: "Partisan polarization drives voters to forgive corruption in their favored party while attacking rivals.",
      psychologyBlindspots: ["Authoritarian Blind Submission", "Partisan Rationalization"],
      constitutionTitle: "🏛️ Supreme Court Electoral Bonds Ruling (2024)",
      constitutionQuote: "Voters have a fundamental right to know the financial backers of political parties under Article 19(1)(a).",
      constitutionReachPct: 88,
      modernBuddhaExemplar: "T.N. Seshan (Electoral Reforms)",
      modernBuddhaStory: "Cleaned up Indian elections by strictly enforcing the Model Code of Conduct and issuing voter ID cards.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/T._N._Seshan",
      criticTitle: "📢 Money Power & Criminality in Politics",
      criticBody: "Soaring election expenditure creates entry barriers for honest grassroots public servants."
    }
  },

  // --- LAYER 2: ACTION POLICIES (E1-E12) ---
  {
    id: "E1",
    layer: 2,
    title: "Universal Health Insurance & Free Drugs",
    statement: "State must provide free essential medicines and hospital coverage to prevent medical bankruptcy.",
    summary: "Policy derived from D1 (Healthcare Access).",
    summary2Liner: "Action Policy 1: Comprehensive state health insurance and generic drug distribution eliminate medical debt poverty.",
    parentIds: ["D1"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Generic vs Branded Pharma Procurement",
      dilemmaBody: "Mandating public hospitals to prescribe low-cost generic drugs rather than expensive branded alternatives.",
      psychologyTitle: "🧠 Brand Name Prestige Bias",
      psychologyBody: "Patients equate higher drug prices with superior quality due to marketing conditioning.",
      psychologyBlindspots: ["Price-Quality Heuristic Bias"],
      constitutionTitle: "🏛️ Rajasthan Right to Health Act 2023",
      constitutionQuote: "Mandatory free OPD and IPD services in public health institutions for all residents.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Dr. V. Shanta (Adyar Cancer Institute)",
      modernBuddhaStory: "Pioneered affordable cancer treatment for underprivileged patients in South India.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/V._Shanta",
      criticTitle: "📢 Shortage of Rural Primary Doctors",
      criticBody: "Primary Health Centres suffer from doctor absenteeism and lack of diagnostic equipment."
    }
  },
  {
    id: "E2",
    layer: 2,
    title: "RTI Transparency & Digital Audits",
    statement: "Citizens must have instantaneous access to public expenditure records and government files.",
    summary: "Policy derived from D2 (Institutional Integrity).",
    summary2Liner: "Action Policy 2: Public record disclosure and online file tracking deter corruption and empower citizen watchdogs.",
    parentIds: ["D2"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Public File Proactive Disclosure",
      dilemmaBody: "Publishing municipal road repair bills online so local residents can verify contractor work.",
      psychologyTitle: "🧠 Bureaucratic Secrecy Instinct",
      psychologyBody: "Officials default to secrecy to shield administrative mistakes from public scrutiny.",
      psychologyBlindspots: ["Information Hoarding Bias"],
      constitutionTitle: "🏛️ Right to Information Act 2005",
      constitutionQuote: "Timely response to citizen requests for government information is mandatory.",
      constitutionReachPct: 80,
      modernBuddhaExemplar: "Shailesh Gandhi (RTI Commissioner)",
      modernBuddhaStory: "Disposed of thousands of pending RTI appeals and advocated for paperless transparent governance.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Shailesh_Gandhi",
      criticTitle: "📢 Rejection of RTI Applications & Vacancies",
      criticBody: "Pending vacancies in Information Commissions delay transparency queries for years."
    }
  },
  {
    id: "E3",
    layer: 2,
    title: "Digital Privacy & Data Sovereignty",
    statement: "Corporations and states must obtain explicit opt-in consent before processing personal user data.",
    summary: "Policy derived from A4 (Autonomy) and D3 (Free Speech).",
    summary2Liner: "Action Policy 3: Strict data protection laws ban unauthorized tracking, surveillance leaks, and biometric misuse.",
    parentIds: ["A4", "D3"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 App Permissions vs Personal Data Harvesting",
      dilemmaBody: "Refusing to install apps that demand unnecessary access to contacts, location, and photo galleries.",
      psychologyTitle: "🧠 Privacy Paradox & Default Inertia",
      psychologyBody: "Users claim to value privacy but routinely click 'Agree' on unread terms of service out of convenience.",
      psychologyBlindspots: ["Default Option Inertia", "Privacy Paradox"],
      constitutionTitle: "🏛️ Digital Personal Data Protection Act 2023",
      constitutionQuote: "Data fiduciaries must specify purpose and secure explicit consent from data principals.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Internet Freedom Foundation (IFF)",
      modernBuddhaStory: "Legal advocates defending net neutrality, digital privacy, and anti-surveillance rights in courts.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Internet_Freedom_Foundation",
      criticTitle: "📢 Government Exemptions in Privacy Legislation",
      criticBody: "Broad state security exemptions in privacy laws allow unchecked law enforcement data access."
    }
  },
  {
    id: "E4",
    layer: 2,
    title: "Fair Labor Standards & Minimum Wage",
    statement: "Workers are entitled to safe working conditions, living wages, and union bargaining rights.",
    summary: "Policy derived from A5 (Basic Needs) and D7 (Basic Needs Guarantee).",
    summary2Liner: "Action Policy 4: Enforcing living minimum wages and workplace safety prevents gig worker and factory exploitation.",
    parentIds: ["A5", "D7"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Delivery Worker Tips vs Fair Base Pay",
      dilemmaBody: "Demanding gig platforms pay fair hourly base wages rather than shifting compensation onto customer tips.",
      psychologyTitle: "🧠 Gig Work Autonomy Illusion",
      psychologyBody: "Algorithms market flexible hours while using penalty metrics to force 14-hour workdays.",
      psychologyBlindspots: ["Flexibility Exploitation Illusion"],
      constitutionTitle: "🏛️ Minimum Wages Act & Occupational Safety Code",
      constitutionQuote: "Fixing minimum rates of wages in scheduled employments to prevent labor exploitation.",
      constitutionReachPct: 72,
      modernBuddhaExemplar: "Ela Bhatt (SEWA Association)",
      modernBuddhaStory: "Organized over 2 million self-employed informal women workers into micro-finance and trade unions.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Ela_Bhatt",
      criticTitle: "📢 Lack of Social Security for Informal Gig Workers",
      criticBody: "90% of India's labor force works in unorganized sectors without pension, health insurance, or severance."
    }
  },
  {
    id: "E5",
    layer: 2,
    title: "Academic Freedom & Critical Inquiry",
    statement: "Universities must foster open debate and independent research without political interference.",
    summary: "Policy derived from D3 (Free Speech) and D4 (Education).",
    summary2Liner: "Action Policy 5: Protecting scholars and students from political interference upholds scientific and historical truth.",
    parentIds: ["D3", "D4"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Historical Research vs Political Revisionism",
      dilemmaBody: "Publishing peer-reviewed historical evidence even when it contradicts popular nationalistic myths.",
      psychologyTitle: "🧠 Ideological Conformity in Academia",
      psychologyBody: "Scholars self-censor controversial findings to avoid losing research grants or faculty tenure.",
      psychologyBlindspots: ["Self-Censorship under Pressure"],
      constitutionTitle: "🏛️ University Grants Commission Autonomy Mandate",
      constitutionQuote: "Maintaining standards of university education and research free from political bias.",
      constitutionReachPct: 68,
      modernBuddhaExemplar: "Prof. Yash Pal (Science Educator)",
      modernBuddhaStory: "Promoted scientific temper and public university autonomy across South Asia.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Yash_Pal",
      criticTitle: "📢 Syllabus Reductions & Campus Friction",
      criticBody: "Removing key scientific evolution and historical chapters from school textbooks restricts critical learning."
    }
  },
  {
    id: "E6",
    layer: 2,
    title: "Climate Action & Renewable Energy",
    statement: "State must aggressively transition grid energy to solar, wind, and green hydrogen alternatives.",
    summary: "Policy derived from D6 (Environmental Stewardship).",
    summary2Liner: "Action Policy 6: Scaling solar energy grids and electric mobility mitigates severe heatwaves and air pollution.",
    parentIds: ["D6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Rooftop Solar Adoption",
      dilemmaBody: "Investing in residential rooftop solar installation to reduce personal carbon footprint.",
      psychologyTitle: "🧠 Climate Doomism & Bystander Inertia",
      psychologyBody: "Feeling overwhelmed by global warming leads individuals to abandon eco-friendly habit changes.",
      psychologyBlindspots: ["Learned Helplessness in Climate"],
      constitutionTitle: "🏛️ National Solar Mission & COP26 Net-Zero Goal",
      constitutionQuote: "Targeting 500 GW non-fossil energy capacity by 2030.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Chetna Gala Sinha & Rural Solar Micro-Grids",
      modernBuddhaStory: "Empowered rural women entrepreneurs to run solar lighting micro-enterprises in drought belts.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Chetna_Gala_Sinha",
      criticTitle: "📢 Coal Mining Expansion in Forest Belts",
      criticBody: "Continued forest clearing for coal mining contradicts national renewable energy pledges."
    }
  },
  {
    id: "E7",
    layer: 2,
    title: "Ethical AI Governance & Algorithmic Audits",
    statement: "Artificial intelligence systems deployed in public services must be audited for bias and safety.",
    summary: "Policy derived from A4 (Autonomy) and D2 (Integrity).",
    summary2Liner: "Action Policy 7: Independent algorithmic audits prevent automated discrimination in hiring, credit, and law enforcement.",
    parentIds: ["A4", "D2"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 AI Hiring Filters vs Diversity",
      dilemmaBody: "Auditing automated resume screening software to prevent historical gender and caste bias.",
      psychologyTitle: "🧠 Automation Bias & Black-Box Trust",
      psychologyBody: "Humans uncritically trust computer outputs even when algorithmic predictions reflect historic human prejudice.",
      psychologyBlindspots: ["Automation Bias", "Algorithmic Infallibility Fallacy"],
      constitutionTitle: "🏛️ NITI Aayog Responsible AI Framework",
      constitutionQuote: "AI deployment must adhere to principles of safety, non-discrimination, and accountability.",
      constitutionReachPct: 62,
      modernBuddhaExemplar: "Joy Buolamwini (Algorithmic Justice League)",
      modernBuddhaStory: "Exposed facial recognition racial and gender bias, forcing tech giants to pause biometric police sales.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Joy_Buolamwini",
      criticTitle: "📢 Opaque Credit Scoring & Facial Surveillance",
      criticBody: "Unchecked deployment of facial recognition software in public transit risks wrongful arrests."
    }
  },
  {
    id: "E8",
    layer: 2,
    title: "Soil & Forest Conservation",
    statement: "Protecting natural biodiversity hotspots and topsoil fertility ensures agricultural survival.",
    summary: "Policy derived from D6 (Environment) and D7 (Basic Needs).",
    summary2Liner: "Action Policy 8: Reforestation, organic topsoil replenishment, and wetland preservation prevent desertification.",
    parentIds: ["D6", "D7"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Organic Farming vs Chemical Overuse",
      dilemmaBody: "Transitioning to natural bio-fertilizers to preserve soil microbes despite short-term yield adjustments.",
      psychologyTitle: "🧠 Soil Invisibility & Short-Yield Greed",
      psychologyBody: "Chemical runoff depletes soil microbiome because underground ecological damage is invisible to sight.",
      psychologyBlindspots: ["Invisible Ecological Degradation"],
      constitutionTitle: "🏛️ National Forest Policy 1988",
      constitutionQuote: "Maintaining one-third of total land area under forest and tree cover.",
      constitutionReachPct: 65,
      modernBuddhaExemplar: "Jadav Payeng (Forest Man of India)",
      modernBuddhaStory: "Single-handedly planted and nurtured a 1,300-acre forest on a barren sandbar over 40 years.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Jadav_Payeng",
      criticTitle: "📢 Commercial Monoculture Deforestation",
      criticBody: "Replacing natural bio-diverse forests with commercial palm oil plantations destroys native wildlife."
    }
  },
  {
    id: "E9",
    layer: 2,
    title: "Gender Equal Pay & Workplace Safety",
    statement: "Equal pay for equal work and strict enforcement of anti-harassment laws in all workplaces.",
    summary: "Policy derived from A6 (Equity) and D5 (Maternal Welfare).",
    summary2Liner: "Action Policy 9: Closing gender pay gaps and enforcing POSH committees guarantee female workforce participation.",
    parentIds: ["A6", "D5"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Equal Pay Audit in Private Companies",
      dilemmaBody: "Auditing corporate pay scales to ensure female managers receive identical pay for equal responsibilities.",
      psychologyTitle: "🧠 Gender Salary Negotiation Bias",
      psychologyBody: "Evaluators punish female workers who negotiate salaries while rewarding identical behavior in male peers.",
      psychologyBlindspots: ["Gender Salary Negotiation Penalty"],
      constitutionTitle: "🏛️ Equal Remuneration Act & POSH Act 2013",
      constitutionQuote: "Prevention of sexual harassment and mandatory equal pay for men and women.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Bhanwari Devi & Vishakha Judgment Pioneers",
      modernBuddhaStory: "Grassroots worker whose courageous legal fight led to India's mandatory workplace safety guidelines.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Bhanwari_Devi",
      criticTitle: "📢 Low Female Labor Force Participation",
      criticBody: "Lack of safe public transport and creche facilities keeps female workforce participation below potential."
    }
  },
  {
    id: "E10",
    layer: 2,
    title: "Anti-Monopoly Fair Trade & Credit Access",
    statement: "Preventing corporate monopolies and extending low-interest credit to small merchants and MSMEs.",
    summary: "Policy derived from P2 (Agency) and P3 (Equity).",
    summary2Liner: "Action Policy 10: Anti-trust enforcement and formal credit access protect small business merchants from corporate monopolies.",
    parentIds: ["P2_AGENCY", "P3_EQUITY"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Supporting Local Small Merchants",
      dilemmaBody: "Purchasing goods from neighborhood kirana stores rather than predatory pricing e-commerce monopolies.",
      psychologyTitle: "🧠 Predatory Pricing Convenience Trap",
      psychologyBody: "Consumers ignore long-term retail monopolies because mega-platforms offer short-term discounts.",
      psychologyBlindspots: ["Monopoly Convenience Blindspot"],
      constitutionTitle: "🏛️ Competition Commission of India (CCI) Act",
      constitutionQuote: "Preventing practices having adverse effect on competition and protecting interests of consumers.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "M.S. Swaminathan (Farmers Commission)",
      modernBuddhaStory: "Advocated for fair price guarantees and credit access to protect small agrarian producers.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/M._S._Swaminathan",
      criticTitle: "📢 Predatory E-Commerce Deep Discounting",
      criticBody: "Capital-rich foreign platforms undercut local merchants by selling below cost to corner markets."
    }
  },
  {
    id: "E11",
    layer: 2,
    title: "Universal Public Infrastructure",
    statement: "State must construct safe public transit, clean tap water, and digital internet grids for all regions.",
    summary: "Policy derived from D7 (Basic Needs) and D1 (Healthcare).",
    summary2Liner: "Action Policy 11: High-quality public buses, metros, clean drinking tap water, and rural roads connect underserved communities.",
    parentIds: ["D7", "D1"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Investing in Public Bus Transit vs Toll Highways",
      dilemmaBody: "Allocating municipal budget to affordable electric buses rather than multi-lane highways for private cars.",
      psychologyTitle: "🧠 Car-Centric Urban Bias",
      psychologyBody: "City planners design roads for private car owners while ignoring pedestrians and bus commuters.",
      psychologyBlindspots: ["Car-Centric Urban Bias"],
      constitutionTitle: "🏛️ Jal Jeevan Mission & PM Gram Sadak Yojana",
      constitutionQuote: "Providing piped clean tap water supply to every rural household.",
      constitutionReachPct: 82,
      modernBuddhaExemplar: "E. Sreedharan (Metro Man of India)",
      modernBuddhaStory: "Built the Konkan Railway and Delhi Metro on time and corruption-free, transforming public transit.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/E._Sreedharan",
      criticTitle: "📢 Potholes & Contaminated Municipal Tap Water",
      criticBody: "Substandard urban road contractor work causes annual monsoon transit breakdowns."
    }
  },
  {
    id: "E12",
    layer: 2,
    title: "Indigenous Land & Forest Rights",
    statement: "Recognizing ancestral land rights of tribal communities and protecting forest ecosystems.",
    summary: "Policy derived from P2 (Agency) and D6 (Environment).",
    summary2Liner: "Action Policy 12: Legal recognition of Forest Rights Act (FRA) protects indigenous land autonomy from illegal mining.",
    parentIds: ["P2_AGENCY", "D6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Protecting Ancestral Forest Lands",
      dilemmaBody: "Respecting Gram Sabha consent before approving commercial mining leases in indigenous forest belts.",
      psychologyTitle: "🧠 Indigenous Erasure Bias",
      psychologyBody: "Urban populations view remote forests purely as mineral reserves, ignoring resident indigenous cultures.",
      psychologyBlindspots: ["Indigenous Cultural Erasure"],
      constitutionTitle: "🏛️ Forest Rights Act 2006 (FRA) & Fifth Schedule",
      constitutionQuote: "Restoring individual and community forest rights to traditional forest-dwelling tribes.",
      constitutionReachPct: 68,
      modernBuddhaExemplar: "Tulsi Gowda (Environmentalist)",
      modernBuddhaStory: "Indigenous woman who planted over 30,000 trees and holds vast traditional botanical knowledge.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Tulsi_Gowda",
      criticTitle: "📢 Rejection of Forest Rights Claims",
      criticBody: "Thousands of legitimate tribal land claims are rejected without transparent appeal hearings."
    }
  },

  // --- LAYER 3: ETHICAL DILEMMAS (X1-X8) ---
  {
    id: "X1",
    layer: 3,
    title: "Triage Healthcare Allocation Dilemma",
    statement: "How should scarce ICU beds or ventilators be prioritized during an epidemic crisis?",
    summary: "Dilemma balancing A1 (Suffering) vs P3 (Equity).",
    summary2Liner: "Dilemma 1: Weighing medical survival probability vs first-come allocation during peak hospital bed shortages.",
    parentIds: ["D1", "E1"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 ICU Bed Prioritization in Peak Crisis",
      dilemmaBody: "Deciding whether to allocate the last ICU ventilator to a younger patient with high survival chance or an elderly patient first in queue.",
      psychologyTitle: "🧠 Moral Trauma & Utilitarian Burden",
      psychologyBody: "Doctors experience severe moral injury when forced to make life-or-death resource decisions.",
      psychologyBlindspots: ["Utilitarian Guilt Burden"],
      constitutionTitle: "🏛️ National Disaster Management Authority Guidelines",
      constitutionQuote: "Transparent protocols for emergency medical rationing without discrimination.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Frontline ICU Doctors in COVID-19",
      modernBuddhaStory: "Medical teams who worked non-stop shifts to save lives during oxygen shortage crises.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/COVID-19_pandemic_in_India",
      criticTitle: "📢 Black Market Oxygen Profiteering",
      criticBody: "Crisis shortages expose black-market extortion where wealthy buyers hoard scarce medical cylinders."
    }
  },
  {
    id: "X2",
    layer: 3,
    title: "National Security vs Mass Surveillance",
    statement: "Does terrorism prevention justify biometric tracking and warrantless interception?",
    summary: "Dilemma balancing P1 (Harm) vs E3 (Privacy).",
    summary2Liner: "Dilemma 2: Balancing state security intelligence gathering against fundamental individual privacy rights.",
    parentIds: ["E3", "D8"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Facial Recognition in Public Transit",
      dilemmaBody: "Deploying camera surveillance to catch criminal suspects vs exposing innocent citizens to constant tracking.",
      psychologyTitle: "🧠 Security-Privacy Swap Bias",
      psychologyBody: "People willingly surrender privacy under fear of terror threats, underestimating surveillance overreach.",
      psychologyBlindspots: ["Fear-Driven Liberty Surrender"],
      constitutionTitle: "🏛️ Supreme Court Proportionality Test",
      constitutionQuote: "State surveillance must satisfy legality, legitimate state aim, and strict proportionality.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Privacy Rights Litigators",
      modernBuddhaStory: "Challenged unchecked wiretapping to defend civil liberties in constitutional courts.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/K._S._Puttaswamy_v._Union_of_India",
      criticTitle: "📢 Spyware Targeting Journalists & Opposition",
      criticBody: "Commercial spyware deployed against reporters undermines democratic accountability."
    }
  },
  {
    id: "X3",
    layer: 3,
    title: "Affirmative Action & Merit Trade-off",
    statement: "How to balance historical caste reparation with competitive individual merit testing?",
    summary: "Dilemma balancing P3 (Equity) vs A6 (Fairness).",
    summary2Liner: "Dilemma 3: Balancing compensatory reservations for historical oppression against individual open merit competition.",
    parentIds: ["A6", "E9"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 University Seat Reservations vs Cut-off Marks",
      dilemmaBody: "Designing affirmative action cut-offs that uplift historically excluded castes while expanding overall university capacity.",
      psychologyTitle: "🧠 Meritocracy Fallacy & Privilege Blindness",
      psychologyBody: "Upper-caste candidates attribute success solely to hard work, ignoring generational economic head starts.",
      psychologyBlindspots: ["Meritocracy Myth Bias"],
      constitutionTitle: "🏛️ Article 15(4) & Indra Sawhney Judgment",
      constitutionQuote: "Special provisions for advancement of socially and educationally backward classes.",
      constitutionReachPct: 82,
      modernBuddhaExemplar: "Dr. B.R. Ambedkar & Mandal Reformers",
      modernBuddhaStory: "Instituted constitutional quotas to dismantle 3,000 years of untouchability and educational exclusion.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/B._R._Ambedkar",
      criticTitle: "📢 Creamy Layer Exclusion & Seat Expansion Gaps",
      criticBody: "Failure to expand public university seats creates artificial scarcity and social resentment."
    }
  },
  {
    id: "X4",
    layer: 3,
    title: "Economic Growth vs Ecosystem Destruction",
    statement: "Should pristine forest lands be cleared for hydro-dams and lithium mining projects?",
    summary: "Dilemma balancing D7 (Basic Needs) vs E6 (Environment).",
    summary2Liner: "Dilemma 4: Navigating industrial infrastructure development vs irreversible ecological habitat destruction.",
    parentIds: ["D6", "E6"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Hydro-Dam Construction in Ecological Zones",
      dilemmaBody: "Building hydro dams to power green grids vs submerging native forests and displacing local river villages.",
      psychologyTitle: "🧠 Externalization of Ecological Costs",
      psychologyBody: "Corporations record mining profits on balance sheets while dumping toxic waste cleanup onto local taxpayers.",
      psychologyBlindspots: ["Cost Externalization Bias"],
      constitutionTitle: "🏛️ National Green Tribunal (NGT) Act 2010",
      constitutionQuote: "Expeditious disposal of cases relating to environmental protection and conservation.",
      constitutionReachPct: 72,
      modernBuddhaExemplar: "Save Western Ghats Advocates",
      modernBuddhaStory: "Campaigned to protect UNESCO heritage biodiversity forests from mining projects.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Western_Ghats",
      criticTitle: "📢 Dilution of Environmental Impact Assessment (EIA)",
      criticBody: "Fast-tracking industrial clearances without public environmental hearings accelerates ecological damage."
    }
  },
  {
    id: "X5",
    layer: 3,
    title: "Free Speech vs Harmful Disinformation",
    statement: "Should social media platforms censor viral hate speech that triggers communal riots?",
    summary: "Dilemma balancing D3 (Free Speech) vs P1 (Harm).",
    summary2Liner: "Dilemma 5: Balancing open speech protections against moderating viral disinformation that incites real-world violence.",
    parentIds: ["D3", "E3"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Moderating Viral Rumors on Messaging Apps",
      dilemmaBody: "Blocking viral fake news videos that trigger mob lynchings vs preserving end-to-end encryption privacy.",
      psychologyTitle: "🧠 Outrage Virality & Cognitive Contagion",
      psychologyBody: "Algorithms promote emotionally inflammatory content because anger generates 5x higher user engagement.",
      psychologyBlindspots: ["Outrage Engagement Contagion"],
      constitutionTitle: "🏛️ Shreya Singhal v. Union of India (Section 66A Striking)",
      constitutionQuote: "Speech can only be restricted under reasonable restrictions of Article 19(2) like incitement to offense.",
      constitutionReachPct: 80,
      modernBuddhaExemplar: "Fact-Checkers & Disinformation Researchers",
      modernBuddhaStory: "Independent researchers who verify viral claims and debunk doctored videos before they spark riots.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Fact-checking",
      criticTitle: "📢 State Censorship Orders on Political Critics",
      criticBody: "Governments frequently use anti-fake-news powers to take down legitimate investigative reporting."
    }
  },
  {
    id: "X6",
    layer: 3,
    title: "Corporate Wealth Tax vs Capital Flight",
    statement: "Should high wealth taxes fund public welfare if billionaires threaten to relocate overseas?",
    summary: "Dilemma balancing E10 (Equity) vs Economic Realism.",
    summary2Liner: "Dilemma 6: Taxing extreme billionaire wealth to fund public schools vs risking capital flight to offshore tax havens.",
    parentIds: ["P3_EQUITY", "E10"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Closing Tax Loopholes for Multinational Corporations",
      dilemmaBody: "Imposing global minimum corporate taxes vs competing in a race to the bottom to attract foreign investment.",
      psychologyTitle: "🧠 Loss Aversion among Ultra-Wealthy",
      psychologyBody: "Billionaires experience intense loss aversion over marginal tax increases despite possessing excess fortunes.",
      psychologyBlindspots: ["Billionaire Loss Aversion"],
      constitutionTitle: "🏛️ Article 39(b) & (c) — Directive Principles",
      constitutionQuote: "Material resources must be distributed to serve the common good and prevent concentration of wealth.",
      constitutionReachPct: 65,
      modernBuddhaExemplar: "Thomas Piketty & Wealth Tax Economists",
      modernBuddhaStory: "Researched global income inequality trends and advocated for progressive wealth taxes.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Thomas_Piketty",
      criticTitle: "📢 Tax Avoidance via Offshore Shell Companies",
      criticBody: "Global tax havens allow multinational monopolies to pay lower effective tax rates than average wage earners."
    }
  },
  {
    id: "X7",
    layer: 3,
    title: "Automation vs Labor Displacement",
    statement: "Should companies be taxed for replacing human workers with AI and robotics?",
    summary: "Dilemma balancing E7 (Ethical AI) vs E4 (Labor).",
    summary2Liner: "Dilemma 7: Managing rapid AI automation efficiency gains vs protecting displaced workers with universal basic income.",
    parentIds: ["E7", "E4"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Deploying AI Customer Support vs Retaining Staff",
      dilemmaBody: "Replacing call center workers with AI chatbots vs funding retraining programs for displaced employees.",
      psychologyTitle: "🧠 Tech Disruption Disregard",
      psychologyBody: "Silicon Valley leaders celebrate disruption efficiency while underestimating human displacement trauma.",
      psychologyBlindspots: ["Technological Solutionism Bias"],
      constitutionTitle: "🏛️ Right to Livelihood Rulings (Olga Tellis Benchmark)",
      constitutionQuote: "Right to life under Article 21 includes the right to livelihood.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Universal Basic Income Advocates",
      modernBuddhaStory: "Campaigned for dividend payouts funded by tech automation taxes to secure citizen income baselines.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Universal_basic_income",
      criticTitle: "📢 Sudden Layoffs without Transition Safety Nets",
      criticBody: "Rapid AI deployment leads to sudden corporate mass layoffs without state retraining programs."
    }
  },
  {
    id: "X8",
    layer: 3,
    title: "Patent Monopoly vs Lifesaving Medicine Access",
    statement: "Should pharmaceutical patents be waived during global pandemic health emergencies?",
    summary: "Dilemma balancing E1 (Healthcare) vs E10 (Fair Trade).",
    summary2Liner: "Dilemma 8: Enforcing international pharma patent monopolies vs issuing compulsory licenses for low-cost generic vaccines.",
    parentIds: ["D1", "E10"],
    status: "ratified",
    lenses: {
      dilemmaTitle: "💡 Compulsory Licensing for Cancer Drugs",
      dilemmaBody: "Issuing generic manufacturing licenses for $100,000 cancer drugs to make them available at $200 in developing nations.",
      psychologyTitle: "🧠 Intellectual Property Absolutism",
      psychologyBody: "Pharma executives prioritize corporate R&D profit returns over immediate human lives in crisis zones.",
      psychologyBlindspots: ["Corporate Patent Absolutism"],
      constitutionTitle: "🏛️ Indian Patents Act Section 84 (Compulsory Licensing)",
      constitutionQuote: "Compulsory license may be issued if patented invention is not available to public at reasonably affordable price.",
      constitutionReachPct: 88,
      modernBuddhaExemplar: "Dr. Yusuf Hamied (Cipla Generic HIV Medicines)",
      modernBuddhaStory: "Provided $1/day generic AIDS triple-therapy drugs to Africa, saving millions of lives despite Western litigation.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Yusuf_Hamied",
      criticTitle: "📢 TRIPS Waiver Delays in Global Pandemics",
      criticBody: "Wealthy nations blocking vaccine patent waivers leads to artificial global supply shortages."
    }
  }
];

// Re-export legacy name for full backwards compatibility across the project
export const MORALITY_NODES: MoralityNode[] = ENRICHED_MORALITY_NODES;

export const ACTION_MAPPINGS: Record<string, { actionTitle: string; actionStatement: string }> = {};
ENRICHED_MORALITY_NODES.forEach(n => {
  if (n.actionTitle && n.actionStatement) {
    ACTION_MAPPINGS[n.id] = { actionTitle: n.actionTitle, actionStatement: n.actionStatement };
  }
});
