import { MoralityNode } from '../types/morality';

export const MORALITY_NODES: MoralityNode[] = [
  // --- LAYER -1: 3 MINIMAL PRIMITIVE ORIGIN ROOTS ---
  {
    id: "P1_HARM",
    layer: -1,
    title: "Non-Harm & Suffering",
    statement: "Pain hurts, and avoiding unnecessary suffering is a universally shared starting point.",
    summary: "Root Primitive 1: Grounded in biological reality & Buddhist Ahimsa / Peter Singer.",
    parentIds: [],
    status: "ratified"
  },
  {
    id: "P2_AGENCY",
    layer: -1,
    title: "Agency & Consent",
    statement: "You own your mind and body; forcing choices on others causes friction and conflict.",
    summary: "Root Primitive 2: Grounded in Amartya Sen's Capability Approach & Locke.",
    parentIds: [],
    status: "ratified"
  },
  {
    id: "P3_EQUITY",
    layer: -1,
    title: "Equal Weight & Fairness",
    statement: "No person's pain or joy matters more than another's simply because of who they are.",
    summary: "Root Primitive 3: Grounded in John Rawls' Veil of Ignorance & Parfit.",
    parentIds: [],
    status: "ratified"
  },

  // --- LAYER 0: FOUNDATIONAL AXIOMS ---
  {
    id: "A1",
    layer: 0,
    title: "Existence of Suffering",
    statement: "Suffering is real, experienced by conscious beings, and intrinsically undesirable.",
    summary: "Foundational starting point: pain hurts, and avoiding unnecessary suffering is universally shared.",
    parentIds: ["P1_HARM"],
    status: "ratified"
  },
  {
    id: "A2",
    layer: 0,
    title: "Sentient Worth",
    statement: "Every sentient being possesses inherent moral worth.",
    summary: "Any creature capable of experiencing joy, pain, or consciousness matters morally.",
    parentIds: ["P1_HARM"],
    status: "ratified"
  },
  {
    id: "A3",
    layer: 0,
    title: "Golden Rule Baseline",
    statement: "Treat others as you would wish to be treated under equivalent circumstances.",
    summary: "Universal principle of reciprocity across major human ethical traditions.",
    parentIds: ["P3_EQUITY"],
    status: "ratified"
  },
  {
    id: "A4",
    layer: 0,
    title: "Value of Autonomy",
    statement: "Self-determination and personal consent are necessary for human flourishing.",
    summary: "Conscious agents must be free to make choices about their own lives and bodies.",
    parentIds: ["P2_AGENCY"],
    status: "ratified"
  },
  {
    id: "A5",
    layer: 0,
    title: "Necessity of Basic Needs",
    statement: "Physical survival requirements (food, water, shelter, safety) must be met before higher flourishing is possible.",
    summary: "Grounded in physiological reality: basic needs form the foundation of life.",
    parentIds: ["P1_HARM"],
    status: "ratified"
  },
  {
    id: "A6",
    layer: 0,
    title: "Equity & Fairness",
    statement: "Like cases must be treated alike; arbitrary discrimination based on non-relevant characteristics is unjust.",
    summary: "Impartiality baseline: rules must apply equally without nepotism or bias.",
    parentIds: ["P3_EQUITY"],
    status: "ratified"
  },

  // --- LAYER 1: DERIVED PRINCIPLES ---
  {
    id: "D1",
    layer: 1,
    title: "Access to Healthcare",
    statement: "Every person has a right to necessary medical treatment regardless of economic status.",
    summary: "Directly derived from A1 (Suffering) and A5 (Basic Needs).",
    parentIds: ["A1", "A5"],
    status: "ratified"
  },
  {
    id: "D2",
    layer: 1,
    title: "Universal Basic Education",
    statement: "Free, accessible education must be guaranteed to foster personal autonomy and social equity.",
    summary: "Derived from A4 (Autonomy) and A6 (Equity).",
    parentIds: ["A4", "A6"],
    status: "ratified"
  },
  {
    id: "D3",
    layer: 1,
    title: "Bodily Integrity & Consent",
    statement: "No person's physical body may be violated, forced, or medicalized without explicit consent.",
    summary: "Derived from A2 (Sentient Worth) and A4 (Autonomy).",
    parentIds: ["A2", "A4"],
    status: "ratified"
  },
  {
    id: "D4",
    layer: 1,
    title: "Universal Non-Discrimination",
    statement: "Identity characteristics (race, gender, caste, belief) shall not restrict fundamental human rights.",
    summary: "Derived from A3 (Golden Rule) and A6 (Equity).",
    parentIds: ["A3", "A6"],
    status: "ratified"
  },
  {
    id: "D5",
    layer: 1,
    title: "Environmental Stewardship",
    statement: "The biosphere must be protected to preserve life for present and future sentient generations.",
    summary: "Derived from A1 (Suffering) and A2 (Sentient Worth).",
    parentIds: ["A1", "A2"],
    status: "ratified"
  },
  {
    id: "D6",
    layer: 1,
    title: "Harm Principle",
    statement: "Individual liberty may only be restricted to prevent direct non-consensual harm to others.",
    summary: "Derived from A1 (Suffering) and A4 (Autonomy).",
    parentIds: ["A1", "A4"],
    status: "ratified"
  },
  {
    id: "D7",
    layer: 1,
    title: "Obligation of Mutual Aid",
    statement: "Society has a collective duty to assist those incapable of meeting basic survival needs independently.",
    summary: "Derived from A3 (Golden Rule) and A5 (Basic Needs).",
    parentIds: ["A3", "A5"],
    status: "ratified"
  },
  {
    id: "D8",
    layer: 1,
    title: "Democratic Governance by Consent",
    statement: "Political authority derives strictly from the transparent consent of the governed.",
    summary: "Derived from A4 (Autonomy) and A6 (Equity).",
    parentIds: ["A4", "A6"],
    status: "ratified"
  },

  // --- LAYER 2: APPLIED ETHICS ---
  {
    id: "E1",
    layer: 2,
    title: "Clean Water Infrastructure",
    statement: "Governments must guarantee uncontaminated drinking water pipelines to every habitation.",
    summary: "Applied implementation of D1 (Healthcare) and A5 (Basic Needs).",
    parentIds: ["D1", "A5"],
    status: "ratified"
  },
  {
    id: "E2",
    layer: 2,
    title: "Protection for Whistleblowers",
    statement: "Legal immunity and physical protection must be granted to those exposing corruption or public harm.",
    summary: "Applied implementation of D8 (Democratic Consent) and D6 (Harm Principle).",
    parentIds: ["D8", "D6"],
    status: "ratified"
  },
  {
    id: "E3",
    layer: 2,
    title: "Epistemic Duty & Truthfulness",
    statement: "Public institutions must not disseminate known falsehoods or suppress scientific evidence.",
    summary: "Applied implementation of D8 (Democratic Consent) and D2 (Education).",
    parentIds: ["D8", "D2"],
    status: "ratified"
  },
  {
    id: "E4",
    layer: 2,
    title: "Economic Safety Nets",
    statement: "Unemployment benefits and emergency food distribution must exist to prevent destitution.",
    summary: "Applied implementation of D7 (Mutual Aid) and A5 (Basic Needs).",
    parentIds: ["D7", "A5"],
    status: "ratified"
  },
  {
    id: "E5",
    layer: 2,
    title: "Right to Digital Privacy",
    statement: "Mass state or corporate surveillance without individual warrant breaches bodily & mental autonomy.",
    summary: "Applied implementation of D3 (Bodily Integrity) and A4 (Autonomy).",
    parentIds: ["D3", "A4"],
    status: "ratified"
  },
  {
    id: "E6",
    layer: 2,
    title: "Animal Welfare Rights",
    statement: "Non-human animals must be protected from industrial cruelty and avoidable slaughter.",
    summary: "Applied implementation of A2 (Sentient Worth) and D5 (Environmental Stewardship).",
    parentIds: ["A2", "D5"],
    status: "ratified"
  },
  {
    id: "E7",
    layer: 2,
    title: "Restorative Justice Systems",
    statement: "Penal institutions must focus on rehabilitation and restitution rather than punitive retribution.",
    summary: "Applied implementation of A1 (Suffering Avoidance) and D4 (Non-Discrimination).",
    parentIds: ["A1", "D4"],
    status: "ratified"
  },
  {
    id: "E8",
    layer: 2,
    title: "Fair Wage Mandates",
    statement: "Minimum wage regulations must prevent predatory labor exploitation and working poverty.",
    summary: "Applied implementation of A5 (Basic Needs) and A6 (Equity).",
    parentIds: ["A5", "A6"],
    status: "ratified"
  },
  {
    id: "E9",
    layer: 2,
    title: "Universal Housing Guarantee",
    statement: "No individual shall be left unhoused or forcibly evicted without alternative shelter.",
    summary: "Applied implementation of A5 (Basic Needs) and D7 (Mutual Aid).",
    parentIds: ["A5", "D7"],
    status: "ratified"
  },
  {
    id: "E10",
    layer: 2,
    title: "Disability Infrastructure Mandate",
    statement: "All public facilities, transport, and digital services must be wheelchair & neurodiverse accessible.",
    summary: "Applied implementation of D4 (Non-Discrimination) and A6 (Equity).",
    parentIds: ["D4", "A6"],
    status: "ratified"
  },
  {
    id: "E11",
    layer: 2,
    title: "Reproductive Choice Rights",
    statement: "Individuals maintain absolute authority over their reproductive health and family planning decisions.",
    summary: "Applied implementation of D3 (Bodily Integrity) and A4 (Autonomy).",
    parentIds: ["D3", "A4"],
    status: "ratified"
  },
  {
    id: "E12",
    layer: 2,
    title: "Indigenous Land Safeguards",
    statement: "Traditional tribal lands shall not be exploited or deforested without prior informed consent.",
    summary: "Applied implementation of D5 (Environment) and D8 (Democratic Consent).",
    parentIds: ["D5", "D8"],
    status: "ratified"
  },

  // --- LAYER 3: COMPLEX DILEMMAS ---
  {
    id: "X1",
    layer: 3,
    title: "Triage & Allocation Dilemma",
    statement: "Prioritizing emergency medical resources during acute scarcity requires transparent utilitarian criteria.",
    summary: "Conflict between A6 (Equity) and A1 (Minimizing Total Suffering).",
    parentIds: ["A6", "A1"],
    status: "ratified"
  },
  {
    id: "X2",
    layer: 3,
    title: "Freedom of Speech vs Hate Speech",
    statement: "Balancing free expression against incitement to violence against vulnerable minorities.",
    summary: "Conflict between A4 (Autonomy) and D6 (Harm Principle).",
    parentIds: ["A4", "D6"],
    status: "ratified"
  },
  {
    id: "X3",
    layer: 3,
    title: "Patents vs Global Medicine Access",
    statement: "Pharmaceutical intellectual property protection versus immediate compulsory licensing for pandemic vaccines.",
    summary: "Conflict between Incentive Innovation and D1 (Healthcare Access).",
    parentIds: ["D1", "E4"],
    status: "ratified"
  },
  {
    id: "X4",
    layer: 3,
    title: "AI Automation vs Job Security",
    statement: "Rapid AI deployment increasing economic productivity versus immediate worker displacement.",
    summary: "Conflict between Technological Progress and E8 (Fair Wage Safety).",
    parentIds: ["E8", "A5"],
    status: "ratified"
  },
  {
    id: "X5",
    layer: 3,
    title: "Generational Climate Sacrifice",
    statement: "Imposing carbon austerity on present low-income populations to safeguard future generations.",
    summary: "Conflict between Present Basic Needs (A5) and Future Stewardship (D5).",
    parentIds: ["A5", "D5"],
    status: "ratified"
  },
  {
    id: "X6",
    layer: 3,
    title: "Surveillance for National Security",
    statement: "Temporary invasive surveillance in high-risk zones to prevent terrorism versus privacy rights.",
    summary: "Conflict between Public Safety (A5) and Digital Privacy (E5).",
    parentIds: ["A5", "E5"],
    status: "ratified"
  },
  {
    id: "X7",
    layer: 3,
    title: "Affirmative Action vs Pure Meritocracy",
    statement: "Reserving university seats for historically oppressed castes versus uniform test score cutoffs.",
    summary: "Conflict between Compensatory Justice (D4) and Procedural Equity (A6).",
    parentIds: ["D4", "A6"],
    status: "ratified"
  },
  {
    id: "X8",
    layer: 3,
    title: "Autonomous Weapon Systems Mandate",
    statement: "Banning fully autonomous lethal targeting software in modern warfare.",
    summary: "Conflict between Military Defense Strategy and Sentient Worth (A2).",
    parentIds: ["A2", "D6"],
    status: "ratified"
  }
];

export const ACTION_MAPPINGS: Record<string, { actionTitle: string; actionStatement: string }> = {
  "P1_HARM": { actionTitle: "Don't Hurt Needlessly", actionStatement: "Do not inflict physical, psychological, or unnecessary suffering on living beings." },
  "P2_AGENCY": { actionTitle: "Respect Choice & Agency", actionStatement: "Do not force or coerce others; honor personal choices and bodily autonomy." },
  "P3_EQUITY": { actionTitle: "Treat Everyone Fairly", actionStatement: "Apply rules equally and do not give unfair privilege based on status." },
  "A1": { actionTitle: "Relieve Active Pain", actionStatement: "Actively step in to prevent and mitigate suffering in conscious beings." },
  "A2": { actionTitle: "Protect Living Beings", actionStatement: "Safeguard lives and treat all sentient creatures with inherent value." },
  "A3": { actionTitle: "Practice Reciprocity", actionStatement: "Treat others standardly as you would demand to be treated yourself." },
  "A4": { actionTitle: "Uphold Freedom of Choice", actionStatement: "Ensure individuals retain control over their own decisions and destiny." },
  "A5": { actionTitle: "Preserve Living Systems", actionStatement: "Protect ecological habitats and environmental sustainability." },
  "D1": { actionTitle: "Assist People in Distress", actionStatement: "Provide emergency aid and relief to those facing immediate danger." },
  "D2": { actionTitle: "Tell Truth & Keep Commitments", actionStatement: "Be honest in public communications and uphold contractual promises." },
  "D3": { actionTitle: "Defend Free Expression", actionStatement: "Allow open debate and protect peaceful dissent from censorship." },
  "D4": { actionTitle: "Provide Public Education", actionStatement: "Guarantee access to scientific knowledge and critical thinking for all." },
  "D5": { actionTitle: "Ensure Healthcare Access", actionStatement: "Provide life-saving medical care regardless of income or background." },
  "D6": { actionTitle: "Enforce Fair & Open Trials", actionStatement: "Guarantee legal defense, due process, and unbiased judicial trials." },
  "D7": { actionTitle: "Provide Shelter & Clean Water", actionStatement: "Ensure basic human survival infrastructure for all community members." },
  "D8": { actionTitle: "Hold Power Accountable", actionStatement: "Subject leaders and institutions to public oversight and democratic voting." },
  "E1": { actionTitle: "Ban Mass Surveillance", actionStatement: "Prohibit indiscriminate tracking and monitoring of citizens' private lives." },
  "E2": { actionTitle: "Share Tech & Medicines Fairly", actionStatement: "Prevent patent monopolies from withholding essential life-saving tools." },
  "E3": { actionTitle: "Protect Personal Data", actionStatement: "Enforce digital privacy and prevent unauthorized data harvesting." },
  "E4": { actionTitle: "Abolish Exploitative Labor", actionStatement: "Pay living wages and eradicate human trafficking and slave conditions." },
  "E5": { actionTitle: "Stop Cruelty to Animals", actionStatement: "End factory farm abuse and ban testing on sentient animals." },
  "E6": { actionTitle: "Cut Carbon & Transition Energy", actionStatement: "Shift rapidly from fossil fuels to renewable energy to curb warming." },
  "E7": { actionTitle: "Enforce AI Safety Controls", actionStatement: "Prevent autonomous AI systems from making life-and-death decisions." },
  "E8": { actionTitle: "Safeguard Future Generations", actionStatement: "Do not deplete planetary resources or leave toxic nuclear/climate debts." },
  "E9": { actionTitle: "Dismantle WMD Arsenals", actionStatement: "Abolish nuclear, biological, and chemical weapons globally." },
  "E10": { actionTitle: "Tax Wealth Concentration", actionStatement: "Fund public goods by regulating oligarchic wealth hoarding." },
  "E11": { actionTitle: "Build Public Infrastructure", actionStatement: "Invest in affordable, accessible transit and public utilities." },
  "E12": { actionTitle: "Honor Indigenous Treaties", actionStatement: "Respect native land treaties and ancestral environmental stewardship." },
  "E13": { actionTitle: "Regulate Human Gene Editing", actionStatement: "Ban eugenic genetic modifications while permitting curative therapies." },
  "X1": { actionTitle: "Allocate Supplies Fairly in Crises", actionStatement: "Distribute ventilator/triage care based on medical need, not wealth." },
  "X2": { actionTitle: "Protect Civil Liberties in Crises", actionStatement: "Ensure emergency police powers expire automatically after threats pass." },
  "X3": { actionTitle: "Shield Whistleblowers", actionStatement: "Protect insiders who expose corporate corruption or government abuse." },
  "X4": { actionTitle: "Make Corporate Polluters Pay", actionStatement: "Force toxic waste dumping corporations to remediate damaged ecosystems." },
  "X5": { actionTitle: "Protect Reproductive Freedom", actionStatement: "Ensure individuals control their own bodily healthcare and family planning." }
};
