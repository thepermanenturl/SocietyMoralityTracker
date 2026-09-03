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
  /** Panchatantra-inspired narrative anchor — a 2-4 sentence parable that makes the axiom emotionally unforgettable.
   *  The narrative layer is the primary persistence medium; the formal axiom is metadata. */
  parableAnchor?: {
    title: string;
    story: string;
    source: string;       // e.g. "Panchatantra, Mitra-bheda" or "Jataka Tales" or "Hitopadesha"
    moralOneLiner: string; // The explicit takeaway, e.g. "Therefore, never trust a flatterer"
  };
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
  // =========================================================================
  // --- LAYER -1: 3 MINIMAL PRIMITIVE ORIGIN ROOTS ---
  // =========================================================================
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
      criticBody: "State and market systems frequently tolerate preventable workplace deaths and pollution harm under the guise of economic necessity.",
      parableAnchor: {
        title: "The Monkey and the Wedge",
        story: "A curious monkey wandered onto a temple construction site where carpenters had left a half-split timber held open with an oak wedge. Meddling with forces beyond his business, the monkey straddled the gap and pulled the wedge out. The heavy beam snapped shut instantly, crushing his limbs. His agonizing fate came not from external enmity, but from reckless meddling that unleashed needless violence upon himself.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Avoid uninvited meddling and heedless actions that unleash destruction — the first rule of living is to cause no needless harm."
      }
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
      criticBody: "Modern biometric database mandates and opaque algorithms erode individual consent and undermine bodily autonomy.",
      parableAnchor: {
        title: "The Turtle and the Geese (Kambugriva's Choice)",
        story: "Facing a severe drought, two wild geese offered to fly their friend, the turtle Kambugriva, to a deep lake by carrying a stick in their beaks while the turtle clamped his jaws onto the center. The geese gave one binding condition: 'You must maintain unbroken silence, for your consent to this pact governs your survival.' When villagers below jeered at the flying spectacle, Kambugriva lost his self-command, opened his mouth to insult them, and plunged to his doom on the rocks.",
        source: "Panchatantra, Mitra-bheda / Hitopadesha",
        moralOneLiner: "Agency is hollow without self-discipline — genuine freedom lies in honoring voluntary pacts and mastering one's own impulses."
      }
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
      criticBody: "Legal loopholes, money power in elections, and caste hierarchies perpetuate entrenched inequality despite constitutional guarantees.",
      parableAnchor: {
        title: "The Blue Jackal (Chandravarna)",
        story: "Chased by village dogs into a dyer's indigo vat, a hungry jackal emerged dyed deep royal blue. Returning to the forest, he proclaimed himself King Chandravarna, appointed by Brahma to rule all beasts equally. Lions and tigers served him while he exiled his humble jackal brethren. But on a full moon night, when a distant pack began to howl, Chandravarna's true nature compelled him to howl in unison, instantly exposing his fraudulent hierarchy to the predators who tore him apart.",
        source: "Panchatantra, Kakolukiyam (Of Crows and Owls)",
        moralOneLiner: "Artificial privilege based on false veneers collapses under scrutiny; true justice weighs every creature with impartial equality."
      }
    }
  },

  // =========================================================================
  // --- LAYER 0: FOUNDATIONAL AXIOMS (6 nodes: A1 - A6) ---
  // =========================================================================
  {
    id: "A1",
    layer: 0,
    title: "Existence of Suffering",
    statement: "Suffering is real, experienced by conscious beings, and intrinsically undesirable.",
    summary: "Axiom 1: Pain hurts, and avoiding unnecessary suffering is universally shared.",
    summary2Liner: "Axiom 1: Physical and mental distress is an undeniable reality that forms the baseline for all ethical duties.",
    parentIds: ["P1_HARM"],
    status: "ratified",
    actionTitle: "Alleviate Direct Suffering",
    actionStatement: "Take immediate concrete action to relieve pain and distress whenever you encounter it.",
    psychologyTitle: "Neglect Bias & Empathy Fatigue",
    psychologyStatement: "Prolonged exposure to crises causes psychological desensitization to baseline suffering.",
    lenses: {
      dilemmaTitle: "💡 Recognizing Unseen Distress",
      dilemmaBody: "Acknowledging that colleagues or family members are suffering in silence rather than minimizing their pain.",
      psychologyTitle: "🧠 Neglect Bias & Empathy Fatigue",
      psychologyBody: "Over-exposure to distant crisis news causes emotional numbing and desensitization.",
      psychologyBlindspots: ["Empathy Numbing", "Bystander Apathy", "Comfort-Zone Denial"],
      constitutionTitle: "🏛️ Constitution Directive Principles (Article 38)",
      constitutionQuote: "State to secure a social order for the promotion of welfare of the people.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Dr. Prakash Amte (Hemalkasa Tribal Health)",
      modernBuddhaStory: "Provided free medical relief to remote indigenous communities for over four decades.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Prakash_Amte",
      criticTitle: "📢 Commercialization of Healthcare",
      criticBody: "Private medical profiteering treats suffering as a revenue opportunity rather than a public crisis to solve.",
      parableAnchor: {
        title: "The Lion and the Clever Hare (Bhasuraka at the Well)",
        story: "The tyrant lion Bhasuraka slaughtered forest animals indiscriminately, plunging the entire ecosystem into perpetual terror and suffering. To halt the carnage, the animals agreed to send one voluntary offering daily. When it was the wise little hare's turn, he arrived late and led the famished lion to a deep well, claiming a rival beast hid within. Enraged by his own reflection and roar echoing from the dark water, Bhasuraka leaped in and drowned, ending an epoch of unmitigated torment through intelligence applied against cruelty.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Suffering is an unbearable reality that demands resolute intervention; cunning and wisdom can overturn the cruellest oppressors."
      }
    }
  },
  {
    id: "A2",
    layer: 0,
    title: "Reciprocal Fairness",
    statement: "Conscious beings depend on fair reciprocity; exploiting mutual trust destroys cooperative survival.",
    summary: "Axiom 2: Reciprocal fairness and mutual respect prevent deceptive predation.",
    summary2Liner: "Axiom 2: Moral reciprocity requires fair exchange and penalizes one-sided predatory deception.",
    parentIds: ["P1_HARM", "P3_EQUITY"],
    status: "ratified",
    actionTitle: "Practice Fair Reciprocity",
    actionStatement: "Honor commitments and treat mutual trust as an unbreakable ethical covenant.",
    psychologyTitle: "Cheater Detection & Retributive Fairness",
    psychologyStatement: "Evolutionary psychology reveals deep neurological outrage against bad-faith exploiters of trust.",
    lenses: {
      dilemmaTitle: "💡 Trust in Professional Partnerships",
      dilemmaBody: "Resisting the temptation to exploit a vulnerable partner when short-term gain tempts unilateral betrayal.",
      psychologyTitle: "🧠 Exploitative Opportunism & Cheater Rationalization",
      psychologyBody: "Predators rationalize deception by viewing counterparts as naive or inferior marks.",
      psychologyBlindspots: ["Cheater Rationalization", "Exploitative Opportunism", "Short-Horizon Greed"],
      constitutionTitle: "🏛️ Article 51A(g) — Fundamental Duty of Compassion & Good Faith",
      constitutionQuote: "It shall be the duty of every citizen to have compassion for living creatures and cultivate humanism.",
      constitutionReachPct: 65,
      modernBuddhaExemplar: "Maneka Gandhi & Animal Welfare Advocates",
      modernBuddhaStory: "Pioneered legal protection for stray animals and non-human sentience across South Asia.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Maneka_Gandhi",
      criticTitle: "📢 Predatory Consumer Exploitation",
      criticBody: "Monopolistic corporations exploit consumer dependency through predatory pricing and deceptive contracts.",
      parableAnchor: {
        title: "The Deceitful Crane and the Quick-Witted Crab",
        story: "An aging crane tricked fish in an evaporating pond, promising to fly them safely to a deep lotus lake, but flew them to a stone slab and devoured them. When he finally carried a shrewd crab, the crab looked down and saw a mound of fish bones whitening in the sun. Realizing the crane's treacherous violation of reciprocal trust, the crab clamped his sharp pincers around the crane's slender neck and squeezed until the predator fell dead, demonstrating that deceptive betrayal meets poetic justice.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Betraying mutual trust brings ultimate ruin when the exploited recognize the trap and enforce retribution."
      }
    }
  },
  {
    id: "A3",
    layer: 0,
    title: "Empirical Truth & Reason",
    statement: "Objective reality and empirical observation must guide action; theoretical dogma detached from common sense invites destruction.",
    summary: "Axiom 3: Practical reason, empirical testing, and sound judgment take precedence over blind dogma.",
    summary2Liner: "Axiom 3: Knowledge without practical reasoning and empirical awareness of consequences leads directly to catastrophe.",
    parentIds: ["P3_EQUITY"],
    status: "ratified",
    actionTitle: "Verify Against Reality",
    actionStatement: "Test claims against empirical evidence and common sense before executing high-risk actions.",
    psychologyTitle: "Epistemic Rationality & Confirmation Bias",
    psychologyStatement: "Rigid ideological dogma blinds intellectuals to glaring physical dangers in real-world environments.",
    lenses: {
      dilemmaTitle: "💡 Academic Dogma vs Practical Common Sense",
      dilemmaBody: "Prioritizing ground reality and empirical safety over theoretical models that ignore fatal risks.",
      psychologyTitle: "🧠 Intellectual Hubris & Pedantic Blindness",
      psychologyBody: "Experts frequently fall victim to overconfidence bias, assuming theoretical mastery equates to practical wisdom.",
      psychologyBlindspots: ["Pedantic Overconfidence", "Ivory Tower Syndrome", "Confirmation Bias Sorting"],
      constitutionTitle: "🏛️ Article 51A(h) — Scientific Temper and Inquiry",
      constitutionQuote: "It shall be the duty of every citizen of India to develop the scientific temper, humanism and the spirit of inquiry and reform.",
      constitutionReachPct: 74,
      modernBuddhaExemplar: "Narendra Dabholkar (Andhashraddha Nirmoolan)",
      modernBuddhaStory: "Dedicated his life to promoting scientific temper and eradicating harmful superstitious exploitation.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Narendra_Dabholkar",
      criticTitle: "📢 Misinformation & Anti-Science Dogma",
      criticBody: "State and cultural promotion of untested pseudoscience diverts public resources away from empirical healthcare.",
      parableAnchor: {
        title: "The Four Brahmins and the Resurrected Lion",
        story: "Four scholars journeyed through the jungle. Three were masters of esoteric theoretical sciences, while the fourth, Subuddhi, possessed only humble common sense. Finding a pile of bones, the first scholar assembled the skeleton, the second covered it with flesh and blood, and the third chanted a spell to breathe life into it. Subuddhi warned, 'That is a lion! It will slaughter us all!' When they mocked his lack of scholarship, Subuddhi quickly climbed a tall banyan tree. The revived beast roared, tore the three pedantic scholars to pieces, and spared only the sensible observer.",
        source: "Panchatantra, Aparikshitakaraka (Imprudent Action)",
        moralOneLiner: "Theoretical brilliance without empirical reason and basic common sense is an instrument of self-annihilation."
      }
    }
  },
  {
    id: "A4",
    layer: 0,
    title: "Epistemic Humility",
    statement: "Recognizing the limits of one's knowledge and skill prevents reckless arrogance and fatal blunders.",
    summary: "Axiom 4: Humility before unknown realities and acknowledging fallibility is essential for sound ethics.",
    summary2Liner: "Axiom 4: Overconfidence in unverified theories blinds decision-makers to catastrophic real-world hazards.",
    parentIds: ["P2_AGENCY"],
    status: "ratified",
    actionTitle: "Acknowledge Knowledge Limits",
    actionStatement: "Remain open to correction and never mistake theoretical certitude for infallible expertise.",
    psychologyTitle: "Dunning-Kruger Effect & Overconfidence",
    psychologyStatement: "Cognitive limitations prevent overconfident individuals from recognizing their own severe incompetence.",
    lenses: {
      dilemmaTitle: "💡 Admitting Ignorance in High-Stakes Situations",
      dilemmaBody: "Stepping back from decisions when you lack domain knowledge rather than pretending expertise to save face.",
      psychologyTitle: "🧠 Dunning-Kruger Effect & Intellectual Vanity",
      psychologyBody: "High status in one discipline leads professionals to falsely assume universal competence across all fields.",
      psychologyBlindspots: ["Dunning-Kruger Effect", "Intellectual Vanity", "Ego-Defensive Rationalization"],
      constitutionTitle: "🏛️ Supreme Court Puttaswamy Judgment (Epistemic Dignity)",
      constitutionQuote: "Human dignity begins with acknowledging individual fallibility and protecting self-chosen conscience.",
      constitutionReachPct: 80,
      modernBuddhaExemplar: "Dr. B.R. Ambedkar",
      modernBuddhaStory: "Championed lifelong rigorous scholarship, constitutional pragmatism, and dismantling dogmatic social arrogance.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/B._R._Ambedkar",
      criticTitle: "📢 Technocratic Arrogance in Governance",
      criticBody: "Bureaucratic planners impose top-down mega-projects on rural ecosystems without consulting indigenous knowledge.",
      parableAnchor: {
        title: "The Pedantic Scholar and the Boatman",
        story: "A proud pundit crossing a turbulent river interrogated the boatman: 'Have you studied the Vedas? Have you mastered astronomy and logic?' To each, the illiterate boatman confessed complete ignorance. 'Then you have wasted three-quarters of your life,' sneered the scholar. Suddenly, a violent whirlpool struck and the boat began to capsize. The boatman asked calmly, 'Punditji, have you learned how to swim?' When the terrified scholar cried no, the boatman dove in, saying: 'Then your whole life is lost in an instant.'",
        source: "Classical Indian Folk Tradition / Hitopadesha Anthology",
        moralOneLiner: "Abstract intellectual vanity is useless in the storm; true wisdom begins with humility and practical competence."
      }
    }
  },
  {
    id: "A5",
    layer: 0,
    title: "Finite Resources & Stewardship",
    statement: "Material resources are finite; insatiable greed exhausts the commons and destroys future sustenance.",
    summary: "Axiom 5: Living within ecological limits and stewarding shared capital preserves baseline survival.",
    summary2Liner: "Axiom 5: Exhausting regenerative wealth for immediate greed guarantees catastrophic long-term deprivation.",
    parentIds: ["P1_HARM"],
    status: "ratified",
    actionTitle: "Preserve Regenerative Capital",
    actionStatement: "Harvest only sustainable yields and protect the underlying productive capital from exhaustion.",
    psychologyTitle: "Hyperbolic Discounting & Scarcity Traps",
    psychologyStatement: "Short-term cognitive biases drive individuals to liquidate sustainable assets for fleeting windfalls.",
    lenses: {
      dilemmaTitle: "💡 Sustainable Harvesting vs Instant Windfall",
      dilemmaBody: "Choosing patient, recurring yields over liquidating natural forests or family savings for quick cash.",
      psychologyTitle: "🧠 Greed-Driven Myopia & Hyperbolic Discounting",
      psychologyBody: "The impulse for instant gratification blinds people to the irreversible destruction of recurring value streams.",
      psychologyBlindspots: ["Hyperbolic Discounting", "Tragedy of the Commons Instinct", "Greed-Driven Myopia"],
      constitutionTitle: "🏛️ Article 48A — Environmental Protection & Resource Stewardship",
      constitutionQuote: "The State shall endeavor to protect and improve the environment and to safeguard forests and wildlife.",
      constitutionReachPct: 68,
      modernBuddhaExemplar: "Sonam Wangchuk (Ice Stupas & SECMOL)",
      modernBuddhaStory: "Engineered artificial ice stupas in Ladakh to conserve winter runoff and provide spring irrigation water.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Sonam_Wangchuk",
      criticTitle: "📢 Resource Extraction & Desertification",
      criticBody: "Unregulated groundwater extraction and deforestation deplete aquifers, triggering agricultural bankruptcy.",
      parableAnchor: {
        title: "The Swan with Golden Feathers",
        story: "A golden swan, reincarnated to support his destitute family, flew to his former home and gifted them a single golden plume every week so they could buy food and live in comfort. Blinded by sudden wealth, the mother grew impatient and plotted: 'What if he stops coming? Let us seize all his feathers at once!' When the swan next landed, they trapped him and plucked every feather from his body. Instantly, the severed feathers turned into ordinary coarse white quills, and the crippled bird flew away forever once his wings healed.",
        source: "Panchatantra, Mitra-bheda / Jataka Tales (Suvannahamsa Jataka)",
        moralOneLiner: "Attempting to extract all value at once kills the source of regenerative wealth — stewardship requires patient restraint."
      }
    }
  },
  {
    id: "A6",
    layer: 0,
    title: "Intergenerational Care",
    statement: "Vulnerability requires solidarity across generations and scales; mutual aid secures long-term survival.",
    summary: "Axiom 6: Collective protection and cross-generational responsibility create resilient communities.",
    summary2Liner: "Axiom 6: Respecting intergenerational obligations and forming pacts of mutual aid safeguards weak and strong alike.",
    parentIds: ["P3_EQUITY", "P1_HARM"],
    status: "ratified",
    actionTitle: "Build Cross-Scale Alliances",
    actionStatement: "Protect vulnerable groups and invest in multi-generational welfare systems.",
    psychologyTitle: "Altruistic Reciprocity & Kin Altruism",
    psychologyStatement: "Social species thrive through multi-tiered cooperative networks that span generations and social roles.",
    lenses: {
      dilemmaTitle: "💡 Supporting Weak Neighbors in Crisis",
      dilemmaBody: "Extending emergency aid to vulnerable groups even when they appear to offer no immediate economic return.",
      psychologyTitle: "🧠 Hierarchical Hubris & Status Dismissal",
      psychologyBody: "Powerful actors underestimate small, marginalized communities, failing to realize future mutual dependency.",
      psychologyBlindspots: ["Hierarchical Hubris", "Short-Horizon Ingratitude", "Scale-Insensitivity Bias"],
      constitutionTitle: "🏛️ Article 39(f) — Child Development and Intergenerational Welfare",
      constitutionQuote: "Children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity.",
      constitutionReachPct: 76,
      modernBuddhaExemplar: "Savitribai Phule & Jyotirao Phule",
      modernBuddhaStory: "Pioneered girls' education and intergenerational care homes for marginalized widows in 19th-century India.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Savitribai_Phule",
      criticTitle: "📢 Intergenerational Climate Debt",
      criticBody: "Current industrial economic policies consume non-renewable reserves while passing ecological debt to future generations.",
      parableAnchor: {
        title: "The Elephants and the King of Mice (Gajaraja and Hiranyaka)",
        story: "A mighty herd of elephants marching to a forest lake inadvertently trampled thousands of underground mouse burrows, crushing countless newborn litters. Hiranyaka, the king of mice, approached the Elephant King and pleaded for a change of route, promising: 'Though we are tiny, we may one day repay your kindness.' The Elephant King compassionately diverted his herd. Months later, when royal hunters trapped the elephant herd in heavy hemp ropes, the mice swarmed by the thousands and gnawed through every cord, setting the giant beasts free.",
        source: "Panchatantra, Mitra-labha (Winning of Friends)",
        moralOneLiner: "No ally is too small to save you in adversity — generational compassion woven today becomes tomorrow's salvation."
      }
    }
  },

  // =========================================================================
  // --- LAYER 1: DERIVED PRINCIPLES (6 nodes: B1 - B6) ---
  // =========================================================================
  {
    id: "B1",
    layer: 1,
    title: "Bodily Inviolability",
    statement: "Every individual possesses an inviolable right to physical security and freedom from bodily assault.",
    summary: "Principle 1: Collective unity and bodily protection prevent predatory capture and physical violence.",
    summary2Liner: "Principle 1: Physical safety and bodily sanctity are non-negotiable baselines requiring collective defense.",
    parentIds: ["A1", "A4"],
    status: "ratified",
    actionTitle: "Defend Bodily Sanctity",
    actionStatement: "Protect individuals from physical violence, unconsented medical procedures, and bodily exploitation.",
    psychologyTitle: "Self-Preservation & Solidarity Response",
    psychologyStatement: "Threats to physical integrity trigger collective defense synchronization across bonded groups.",
    lenses: {
      dilemmaTitle: "💡 Standing Up Against Workplace Bullying or Abuse",
      dilemmaBody: "Intervening when a colleague is subjected to harassment or physical intimidation rather than looking away.",
      psychologyTitle: "🧠 Bystander Paralysis & Pluralistic Ignorance",
      psychologyBody: "Individuals fail to intervene in assaults when they falsely assume others in the crowd will take responsibility.",
      psychologyBlindspots: ["Bystander Paralysis", "Pluralistic Ignorance", "Deference to Physical Intimidation"],
      constitutionTitle: "🏛️ Article 21 — Right to Bodily Integrity and Personal Liberty",
      constitutionQuote: "No person shall be subjected to torture, arbitrary assault, or non-consensual bodily deprivation.",
      constitutionReachPct: 82,
      modernBuddhaExemplar: "Bhanwari Devi (Vishakha Guidelines Pioneer)",
      modernBuddhaStory: "Grassroots social worker whose fight against violent retaliation established workplace safety standards in India.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Bhanwari_Devi",
      criticTitle: "📢 Police Brutality & Custodial Violence",
      criticBody: "Lack of police accountability and custodial torture violate fundamental bodily inviolability.",
      parableAnchor: {
        title: "Chitragriva the Dove King and the Hunter's Net",
        story: "Enticed by scattered grains of rice, a flock of doves landed in a forest clearing and found themselves trapped beneath a hunter's heavy net. Rather than fluttering in panicked individual frenzy, King Chitragriva commanded: 'Unite your strength! Flap your wings in unison at this exact heartbeat!' Rising as one organism, the entire flock lifted the net into the sky, flew straight to the burrow of their loyal friend Hiranyaka the mouse, who gnawed their bonds, restoring their inviolable physical freedom.",
        source: "Panchatantra, Mitra-labha (Winning of Friends)",
        moralOneLiner: "Bodily safety is preserved through coordinated solidarity; when the entrapped act as one, no net can hold them."
      }
    }
  },
  {
    id: "B2",
    layer: 1,
    title: "Procedural Justice",
    statement: "Disputes must be settled through impartial, transparent adjudication rather than self-interested arbitration.",
    summary: "Principle 2: Due process, neutral arbiters, and verifiable evidence guard against predatory bad-faith judges.",
    summary2Liner: "Principle 2: Surrendering dispute resolution to corrupt arbiters disguised in piety leads directly to predatory slaughter.",
    parentIds: ["A2", "A3"],
    status: "ratified",
    actionTitle: "Enforce Due Process",
    actionStatement: "Insist on neutral, conflict-free arbiters and evidentiary standards in resolving all conflicts.",
    psychologyTitle: "Halo Effect & Authority Deference",
    psychologyStatement: "People naively trust corrupt authorities who adopt religious, moralistic, or legalistic appearances.",
    lenses: {
      dilemmaTitle: "💡 Selecting Independent Mediators in Business Disputes",
      dilemmaBody: "Refusing to accept a mediator who has hidden financial or personal ties to one of the disputing parties.",
      psychologyTitle: "🧠 Halo Effect & False Sanctity Bias",
      psychologyBody: "Superficial displays of piety and moral rectitude disarm critical evaluation of an arbiter's true motives.",
      psychologyBlindspots: ["Halo Effect", "False Sanctity Bias", "Naive Trust in Ritual Authority"],
      constitutionTitle: "🏛️ Indian Evidence Act & Natural Justice Principles",
      constitutionQuote: "Nemo judex in causa sua — No one shall be a judge in their own cause; audi alteram partem — hear the other side.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Justice H.R. Khanna (ADM Jabalpur Dissent)",
      modernBuddhaStory: "Upheld constitutional due process during the 1975 Emergency, refusing to suspend habeas corpus despite losing the Chief Justiceship.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Hans_Raj_Khanna",
      criticTitle: "📢 Judicial Delays & Kangaroo Courts",
      criticBody: "Over 40 million pending court cases and extra-judicial summary demolitions undermine the rule of procedural law.",
      parableAnchor: {
        title: "Dadhikarna the Hypocritical Cat as Judge",
        story: "A partridge and a hare disputed the lawful ownership of a burrow and sought a pious arbiter. On the banks of the Ganga, they encountered Dadhikarna, a sleek tomcat standing motionless on one leg, reciting holy mantras with closed eyes. Swayed by his ascetic display, they approached him to arbitrate their dispute. The cat whispered, 'I am old and hard of hearing; step closer to my ears so I can hear your arguments.' As soon as both creatures came within reach, the false judge struck with both paws and devoured them both.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Never submit your grievances to an arbiter who feigns moral piety while harboring a predatory interest in the outcome."
      }
    }
  },
  {
    id: "B3",
    layer: 1,
    title: "Expressive & Thought Liberty",
    statement: "Plurality of thought and internal critique must be protected; suppressing internal voices destroys the whole body.",
    summary: "Principle 3: Diverse perspectives, free thought, and open debate sustain organizational vitality.",
    summary2Liner: "Principle 3: Internal divergence is natural; attempting to silence a dissenting counterpart poisons the entire collective.",
    parentIds: ["A3", "A4"],
    status: "ratified",
    actionTitle: "Encourage Constructive Dissent",
    actionStatement: "Protect dissenting viewpoints and debate ideas openly without toxic factionalism.",
    psychologyTitle: "Groupthink & Ideological Echo Chambers",
    psychologyStatement: "Suppressing diverse internal feedback causes organizational cognitive decay and self-sabotage.",
    lenses: {
      dilemmaTitle: "💡 Welcoming Critique in Family or Team Strategy",
      dilemmaBody: "Allowing colleagues to challenge leadership assumptions rather than demanding sycophantic uniformity.",
      psychologyTitle: "🧠 Spiteful Retaliation & Groupthink Polarization",
      psychologyBody: "Internal rivalry causes factions to harm shared organizational goals purely to spite ideological opponents.",
      psychologyBlindspots: ["Spiteful Retaliation", "Groupthink Polarization", "Zero-Sum Factionalism"],
      constitutionTitle: "🏛️ Article 19(1)(a) — Freedom of Thought, Speech and Association",
      constitutionQuote: "All citizens have the right to freedom of speech, expression, and peaceful assembly without arms.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Mahasweta Devi",
      modernBuddhaStory: "Used literature and grassroots journalism to amplify the suppressed voices of tribal and Dalit communities.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Mahasweta_Devi",
      criticTitle: "📢 Censorship & Digital Blackouts",
      criticBody: "State internet blackouts and SLAPP lawsuits against journalists silence critical reporting and intellectual debate.",
      parableAnchor: {
        title: "The Bharunda Bird with Two Heads",
        story: "On a lonely peak lived the Bharunda bird, endowed with two independent heads sharing a single belly. One day, the first head discovered a delicious nectar fruit and ate it without sharing. Spiteful and jealous, the second head soon found a cluster of deadly poisonous berries. When the first head screamed, 'Do not eat that! If you swallow poison, our common belly will digest it and we both shall perish!', the second head snapped, 'I have the right to eat whatever I please!' and gulped the toxin down, killing both heads instantly.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Shared bodies cannot survive internal spite; expressive liberty must be exercised with awareness of shared fate."
      }
    }
  },
  {
    id: "B4",
    layer: 1,
    title: "Transparent Reasoning",
    statement: "Claims and policies must be supported by transparent evidence rather than mystique or hidden leverage.",
    summary: "Principle 4: Uncovering root causes and making mechanisms visible dispels false assumptions.",
    summary2Liner: "Principle 4: Open investigation into underlying causes eliminates mystique and prevents exploitative authority.",
    parentIds: ["A3", "A4"],
    status: "ratified",
    actionTitle: "Demystify Hidden Mechanisms",
    actionStatement: "Demand transparent data, open methodologies, and clear audits behind institutional policies.",
    psychologyTitle: "Attribution Error & Mystification",
    psychologyStatement: "Humans naturally attribute supernatural or elite powers to individuals who possess unexamined hidden resources.",
    lenses: {
      dilemmaTitle: "💡 Auditing High-Performing Team Outliers",
      dilemmaBody: "Investigating the systemic resources behind high performance rather than worshiping individual charismatic heroes.",
      psychologyTitle: "🧠 Fundamental Attribution Error & Hero Worship",
      psychologyBody: "People mistake structural financial leverage for inherent genius, missing the material foundation of power.",
      psychologyBlindspots: ["Fundamental Attribution Error", "Charismatic Mystique Bias", "Structural Opacity Denial"],
      constitutionTitle: "🏛️ Right to Information Act (RTI 2005)",
      constitutionQuote: "Democracy requires an informed citizenry and transparency of information which are vital to its functioning.",
      constitutionReachPct: 80,
      modernBuddhaExemplar: "Shailesh Gandhi (Pioneering RTI Activist)",
      modernBuddhaStory: "Disposed of thousands of public transparency appeals and championed citizen access to administrative files.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Shailesh_Gandhi",
      criticTitle: "📢 Secrecy Laws & Opaque Tenders",
      criticBody: "State classification of public procurement contracts under national security shields corrupt defense kickbacks.",
      parableAnchor: {
        title: "The Hermit, the Mouse, and the Hidden Treasure",
        story: "A wandering ascetic in a forest hermitage hung his alms bowl high on a peg, yet every night a tiny mouse leaped impossible heights to steal his food. Puzzled by this superhuman agility, a visiting sage investigated the room and unearthed a hoard of gold coins buried directly beneath the mouse's launch pad. 'The mouse's extraordinary leaps came not from innate magic, but from the invisible energy of buried capital,' explained the sage. Once the cache was removed, the mouse could jump no higher than any ordinary rodent.",
        source: "Panchatantra, Mitra-labha (Winning of Friends)",
        moralOneLiner: "Extraordinary power always rests on hidden foundations; expose the structural source to understand the behavior."
      }
    }
  },
  {
    id: "B5",
    layer: 1,
    title: "Fair Distribution",
    statement: "Goods and rewards must be distributed based on transparent, equitable principles without rash discrimination.",
    summary: "Principle 5: Deliberate investigation and fair attribution protect innocent contributors from rash destruction.",
    summary2Liner: "Principle 5: Rash judgment without verifying facts destroys loyal partners and undermines distributive justice.",
    parentIds: ["A2", "A5"],
    status: "ratified",
    actionTitle: "Verify Contributions Carefully",
    actionStatement: "Conduct thorough investigations before attributing blame or distributing institutional rewards.",
    psychologyTitle: "Impulsive Retribution & Affect Heuristic",
    psychologyStatement: "Intense emotional reactions hijack cognitive reasoning, causing disastrous misattribution of blame.",
    lenses: {
      dilemmaTitle: "💡 Resisting Rash Accusations at Work",
      dilemmaBody: "Checking logs and facts before reprimanding a junior colleague when an unexpected project error occurs.",
      psychologyTitle: "🧠 Affect Heuristic & Rash Attribution",
      psychologyBody: "Emotional shock triggers immediate punitive reflexes against the nearest visible actor, ignoring evidence.",
      psychologyBlindspots: ["Affect Heuristic", "Impulsive Retribution", "Scapegoat Projection"],
      constitutionTitle: "🏛️ Article 39(b) & (c) — Equitable Material Distribution",
      constitutionQuote: "The ownership and control of material resources must be distributed to subserve the common good.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Ela Bhatt (Self-Employed Women's Association)",
      modernBuddhaStory: "Organized over 2 million informal women workers into cooperative banks, ensuring fair pay and credit.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Ela_Bhatt",
      criticTitle: "📢 Extreme Wealth Concentration",
      criticBody: "Top 1% owning over 40% of national wealth reflects failure of progressive tax and equitable distribution policies.",
      parableAnchor: {
        title: "The Brahmani and the Loyal Mongoose",
        story: "A mother left her infant asleep in a cradle under the watch of their pet mongoose. While she fetched water, a black cobra slithered toward the child. The loyal mongoose fought fiercely, tore the snake to shreds, and ran outside to greet the mother with bloodied jaws. Seeing blood and jumping to a rash conclusion without investigating, the mother threw her heavy water jar upon the mongoose, crushing it dead. Stepping inside, she found her baby peacefully sleeping beside the dead serpent, weeping bitter tears of incurable regret.",
        source: "Panchatantra, Aparikshitakaraka (Imprudent Action)",
        moralOneLiner: "Action taken in blind haste without examining evidence destroys the very guardians of your welfare."
      }
    }
  },
  {
    id: "B6",
    layer: 1,
    title: "Ecological Stewardship",
    statement: "Interdependent ecosystems require coordinated balance; unchecked rogue exploitation collapses life systems.",
    summary: "Principle 6: Small, cooperative ecological allies working in harmony can restrain destructive mega-forces.",
    summary2Liner: "Principle 6: Distributed ecological alliances defeat monolithic destructive forces through modular cooperation.",
    parentIds: ["A5", "A6"],
    status: "ratified",
    actionTitle: "Mobilize Ecosystem Alliances",
    actionStatement: "Organize grassroots environmental coalitions to protect wetlands, forests, and communal waterways.",
    psychologyTitle: "Collective Action Efficacy & Network Resilience",
    psychologyStatement: "Decentralized networks leveraging specialized functional niches overcome concentrated brute power.",
    lenses: {
      dilemmaTitle: "💡 Local Neighborhood Tree & Water Defense",
      dilemmaBody: "Uniting with neighbors to challenge illegal encroachment on local public parks or municipal lakes.",
      psychologyTitle: "🧠 Monolithic Intimidation & Learned Helplessness",
      psychologyBody: "Citizens feel powerless against industrial giants until they organize decentralized modular coalitions.",
      psychologyBlindspots: ["Learned Helplessness", "Monolithic Intimidation", "Niche Underutilization"],
      constitutionTitle: "🏛️ Article 48A & 51A(g) — Protection of Ecology and Wildlife",
      constitutionQuote: "Every citizen has a fundamental duty to protect and improve the natural environment including forests, lakes, rivers and wildlife.",
      constitutionReachPct: 69,
      modernBuddhaExemplar: "Sundarlal Bahuguna & Gaura Devi (Chipko Movement)",
      modernBuddhaStory: "Pioneered non-violent tree-hugging campaigns in the Himalayas to protect fragile river valleys from commercial logging.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Sundarlal_Bahuguna",
      criticTitle: "📢 Dilution of Environmental Clearances",
      criticBody: "Weakening Environmental Impact Assessment (EIA) norms accelerates forest clearing for commercial open-cast mining.",
      parableAnchor: {
        title: "The Alliance of the Sparrow, Woodpecker, Fly, and Frog",
        story: "A rogue elephant in rut violently snapped the branch holding a mother sparrow's nest, crushing her unhatched eggs. Weeping, the sparrow enlisted her forest friends. The fly buzzed a hypnotic melody into the elephant's ear; while he closed his eyes in trance, the woodpecker pecked out his eyes. Blind and burning with feverish thirst, the elephant followed the croaking of the frog to what he thought was a cool lake, only to step off a steep precipice and crash into a deep ravine, neutralizing the tyrant forever.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Monolithic brute force is no match for a coordinated network of humble allies defending their habitat."
      }
    }
  },

  // =========================================================================
  // --- LAYER 2: APPLIED ETHICS (6 nodes: C1 - C6) ---
  // =========================================================================
  {
    id: "C1",
    layer: 2,
    title: "Universal Healthcare & Basic Needs",
    statement: "Society must guarantee basic survival essentials (food, water, medicine) without exploitative preconditions.",
    summary: "Policy 1: Guaranteeing unconditional basic needs protects citizens from predatory traps.",
    summary2Liner: "Policy 1: Desperation for basic sustenance makes individuals vulnerable to predatory exploitation and false promises.",
    parentIds: ["B1", "B5"],
    status: "ratified",
    actionTitle: "Guarantee Universal Basic Welfare",
    actionStatement: "Provide free emergency medicine, clean water, and nutritional security to eliminate poverty extortion.",
    psychologyTitle: "Scarcity Cognitive Load & Risk Desperation",
    psychologyStatement: "Acute resource deprivation severely compromises risk assessment, driving people into lethal traps.",
    lenses: {
      dilemmaTitle: "💡 Providing Emergency Aid Without Documentation Delays",
      dilemmaBody: "Treating critical patients immediately rather than demanding advance financial deposits or insurance papers.",
      psychologyTitle: "🧠 Scarcity-Induced Risk Myopia",
      psychologyBody: "Severe poverty forces desperate individuals to ignore glaring warning signs and trust predatory lenders.",
      psychologyBlindspots: ["Scarcity-Induced Risk Myopia", "Gilded Promise Credulity", "Desperation Tunnel Vision"],
      constitutionTitle: "🏛️ National Food Security Act & Ayushman Bharat Mandate",
      constitutionQuote: "Right to health and nutrition is an integral facet of the Right to Life under Article 21.",
      constitutionReachPct: 74,
      modernBuddhaExemplar: "Dr. V. Shanta (Adyar Cancer Institute)",
      modernBuddhaStory: "Pioneered free and subsidized oncology treatment for destitute patients in South India for over 60 years.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/V._Shanta",
      criticTitle: "📢 Catastrophic Medical Debt",
      criticBody: "Out-of-pocket medical expenditures push over 55 million Indians below the poverty line every year.",
      parableAnchor: {
        title: "The Greedy Traveller and the Tiger with the Gold Bangle",
        story: "An old man-eating tiger, too infirm to hunt, sat in a muddy swamp holding a sparkling gold bangle, chanting: 'I am reformed and now practice charity; take this gold bangle to relieve your poverty.' A famished traveller, overcome by material need and ignoring the obvious danger of trusting a predator, stepped into the mire to claim the prize. When his feet sank deep into the quicksand, the tiger purred, 'Let me assist you,' advanced leisurely, and devoured him.",
        source: "Hitopadesha, Mitra-labha (Winning of Friends)",
        moralOneLiner: "Unmet desperate needs make individuals easy prey for predatory systems offering gilded illusions."
      }
    }
  },
  {
    id: "C2",
    layer: 2,
    title: "Rule of Law & Non-Arbitrariness",
    statement: "Laws and executive power must be applied equally and bound by constitutional rules rather than whim.",
    summary: "Policy 2: Transparent, binding legal constraints prevent cabals from sacrificing vulnerable innocents.",
    summary2Liner: "Policy 2: Arbitrary rule allows opportunistic courtiers to manufacture scapegoats and violate sovereign pacts.",
    parentIds: ["B2", "B1"],
    status: "ratified",
    actionTitle: "Constrain Arbitrary Power",
    actionStatement: "Insist on strict constitutional checks and transparent legal limits on all executive decrees.",
    psychologyTitle: "Social Proof in Coercion & Mob Compliance",
    psychologyStatement: "Corrupt insiders manufacture consensus by performing fake sacrifices to pressure the vulnerable into compliance.",
    lenses: {
      dilemmaTitle: "💡 Standing Firm Against Office Scapegoating",
      dilemmaBody: "Refusing to allow senior managers to blame an innocent junior employee for a corporate executive blunder.",
      psychologyTitle: "🧠 Manufactured Consensus & Scapegoat Rituals",
      psychologyBody: "Group pressure and ritualistic displays of loyalty coerce innocent members into voluntary self-sacrifice.",
      psychologyBlindspots: ["Manufactured Consensus", "Scapegoat Ritual Compliance", "Sovereign Caprice Deference"],
      constitutionTitle: "🏛️ Article 14 & Maneka Gandhi Landmark Benchmark",
      constitutionQuote: "The principle of reasonableness pervades Article 14; procedure must be just, fair and not arbitrary.",
      constitutionReachPct: 76,
      modernBuddhaExemplar: "Fali S. Nariman (Constitutional Jurist)",
      modernBuddhaStory: "Defended constitutional secularism and independent judiciary against executive overreach across five decades.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Fali_Sam_Nariman",
      criticTitle: "📢 Bulldozer Justice & Executive Impunity",
      criticBody: "Extra-judicial punitive home demolitions without prior court trials violate basic non-arbitrariness standards.",
      parableAnchor: {
        title: "The Camel, the Lion, and the Three Traitorous Courtiers",
        story: "A merchant's camel, strayed into the forest, was granted a solemn royal pledge of sanctuary (Abhaya-dana) by King Pingalaka the lion. But when the lion was wounded and unable to hunt, his starving ministers—a jackal, a crow, and a leopard—schemed to violate the sovereign promise. Each offered himself to be eaten, knowing the king would refuse, until the naive camel, swept by the moral ritual, offered his own flesh. The conspirators instantly leaped upon the camel and slaughtered him under the cloak of voluntary sacrifice.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Solemn legal protections are meaningless if corrupt insiders can manipulate procedural loopholes to butcher the vulnerable."
      }
    }
  },
  {
    id: "C3",
    layer: 2,
    title: "Privacy & Informational Autonomy",
    statement: "Individuals must control their personal information and physical boundaries against intrusive monitoring.",
    summary: "Policy 3: Defending privacy and using strategic countermeasures prevents covert surveillance intrusion.",
    summary2Liner: "Policy 3: Asymmetric surveillance can be neutralized by clever countermeasures that enlist external power.",
    parentIds: ["B1", "B3"],
    status: "ratified",
    actionTitle: "Secure Digital & Physical Privacy",
    actionStatement: "Adopt end-to-end encryption, challenge unconsented data tracking, and protect personal boundaries.",
    psychologyTitle: "Panopticon Chilling Effect & Surveillance Anxiety",
    psychologyStatement: "Constant unconsented observation degrades psychological autonomy, free expression, and self-efficacy.",
    lenses: {
      dilemmaTitle: "💡 Refusing Invasive App Permissions & Location Tracking",
      dilemmaBody: "Declining consumer apps that demand unnecessary contacts, microphone, and gallery access to operate.",
      psychologyTitle: "🧠 Privacy Paradox & Resignation to Surveillance",
      psychologyBody: "Users surrender private biometric and behavioral data out of short-term platform convenience.",
      psychologyBlindspots: ["Privacy Paradox", "Convenience Surrender", "Surveillance Normalization"],
      constitutionTitle: "🏛️ Supreme Court Justice K.S. Puttaswamy v. Union of India (2017)",
      constitutionQuote: "The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Apar Gupta & Internet Freedom Foundation (IFF)",
      modernBuddhaStory: "Litigated landmark digital privacy, anti-surveillance, and net neutrality cases before Indian courts.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Internet_Freedom_Foundation",
      criticTitle: "📢 Spyware & Warrantless Interception",
      criticBody: "State deployment of military-grade spyware against investigative journalists and political dissidents.",
      parableAnchor: {
        title: "The Crows and the Black Snake (The Princess's Necklace)",
        story: "A venomous black cobra inhabited the hollow of an ancient banyan tree, slithering into a crow couple's nest to devour their fledglings undetected while they were away foraging. Unable to match the snake's lethal venom directly, the crows sought advice from a clever jackal. Following the plan, the crow snatched a pearl necklace from the royal bathhouse and dropped it straight into the snake's hollow tree in full view of the king's guards. The guards tore open the tree to retrieve the jewels, found the serpent, and killed it.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Intrusive covert threats that hide in your private sanctuary can be dismantled by redirecting institutional forces."
      }
    }
  },
  {
    id: "C4",
    layer: 2,
    title: "Freedom of Press & Public Scrutiny",
    statement: "Unconstrained investigative reporting and public scrutiny expose fraudulent authority.",
    summary: "Policy 4: Public scrutiny and transparent reporting unmask false credentials and impostor power.",
    summary2Liner: "Policy 4: Disguised power commands unearned deference only until honest public scrutiny pierces the facade.",
    parentIds: ["B3", "B4"],
    status: "ratified",
    actionTitle: "Investigate and Publish Truth",
    actionStatement: "Support independent investigative reporting and challenge official propaganda with verified facts.",
    psychologyTitle: "Deference to Prestige Symbols & False Authority",
    psychologyStatement: "Humans instinctively submit to prestige symbols until an authentic signal breaks the illusion.",
    lenses: {
      dilemmaTitle: "💡 Whistleblowing on False Corporate Marketing Claims",
      dilemmaBody: "Publishing accurate product defect data despite pressure from public relations executives.",
      psychologyTitle: "🧠 Credulity to Status Costumes & Deference Bias",
      psychologyBody: "Societies defer to institutional costumes and branding until investigative scrutiny exposes underlying incompetence.",
      psychologyBlindspots: ["Status Costume Credulity", "Prestige Deference", "Silence in the Face of Obvious Fraud"],
      constitutionTitle: "🏛️ Article 19(1)(a) & Romesh Thappar Benchmark",
      constitutionQuote: "Freedom of speech and press is the foundation of all democratic organizations.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "P. Sainath (People's Archive of Rural India - PARI)",
      modernBuddhaStory: "Pioneered grassroots rural journalism, documenting agrarian distress and farmer livelihoods across India.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/P._Sainath",
      criticTitle: "📢 Media Monopoly & Godi Media Consolidation",
      criticBody: "Corporate oligarchic control of mainstream news channels turns public broadcasting into uncritical state public relations.",
      parableAnchor: {
        title: "The Donkey in the Tiger's Skin",
        story: "A washerman draped his exhausted donkey in a dead tiger's skin and let him graze freely in neighboring barley fields. Terrified by the fearsome stripe pattern, farmers fled their fields, allowing the donkey to gorge undisturbed. Emboldened by months of unchallenged plunder, the donkey heard a female donkey bray in the distance on a cool night. He lifted his head and brayed lustily back. Realizing they were fleeing a common beast in costume, the farmers returned with heavy clubs and beat him soundly.",
        source: "Hitopadesha / Panchatantra, Aparikshitakaraka",
        moralOneLiner: "Borrowed authority and false posturing endure only until the impostor speaks; relentless scrutiny unmasks the fraud."
      }
    }
  },
  {
    id: "C5",
    layer: 2,
    title: "Public Trust & Anti-Monopoly",
    statement: "Institutions and public utilities must not be monopolized or wielded to corner vital assets.",
    summary: "Policy 5: Recognizing predatory monopolistic overtures preserves sovereign autonomy.",
    summary2Liner: "Policy 5: Monopolists feign intimacy to capture essential resources; presence of mind is required to escape the trap.",
    parentIds: ["B4", "B5"],
    status: "ratified",
    actionTitle: "Dismantle Predatory Monopolies",
    actionStatement: "Enforce antitrust regulations and prevent platform monopolies from cornering public markets.",
    psychologyTitle: "Predatory Sunk-Cost & Entrapment Traps",
    psychologyStatement: "Monopolists use relationship cultivation and lock-in architectures to make departure seem impossible.",
    lenses: {
      dilemmaTitle: "💡 Escaping Vendor Lock-In in Enterprise Software",
      dilemmaBody: "Migrating to open-source protocols before a proprietary tech giant captures all company database sovereignty.",
      psychologyTitle: "🧠 Sunk-Cost Rationalization & Trust Lock-In",
      psychologyBody: "Victims of predatory agreements stay trapped because admitting betrayal threatens their own self-image.",
      psychologyBlindspots: ["Sunk-Cost Rationalization", "Predatory Intimacy Blindness", "Monopolistic Lock-In Denial"],
      constitutionTitle: "🏛️ Competition Act 2002 & Public Trust Doctrine",
      constitutionQuote: "The State must prevent abuse of dominant position and practices having an appreciable adverse effect on competition.",
      constitutionReachPct: 71,
      modernBuddhaExemplar: "Dr. M.S. Swaminathan",
      modernBuddhaStory: "Advocated for public agricultural seed banks and fair market price floors to protect small farmers from corporate seed monopolies.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/M._S._Swaminathan",
      criticTitle: "📢 Big Tech Platform Enclosure",
      criticBody: "Global digital conglomerates use predatory zero-pricing to kill local competition, then extract monopoly rents.",
      parableAnchor: {
        title: "The Crocodile and the Monkey (The Heart in the Jambu Tree)",
        story: "A monkey lived in a sweet jambu tree on the riverbank, sharing luscious berries with a crocodile who became his friend. Coveting the monkey's sweet heart, the crocodile's wife demanded he bring the monkey home for dinner. In mid-river, the crocodile confessed his betrayal: 'My wife wants your heart.' Thinking on his feet, the monkey laughed: 'Why didn't you tell me? I keep my heart safely stored in the hollow of the jambu tree!' The gullible crocodile swam back, and the monkey leaped to safety, forever severing ties with the predatory monopoly.",
        source: "Panchatantra, Labdhapranasam (Loss of Gains)",
        moralOneLiner: "When a trusted partner attempts to monopolize your very core, quick wit and immediate detachment preserve your survival."
      }
    }
  },
  {
    id: "C6",
    layer: 2,
    title: "Regenerative Economy & Circular Commons",
    statement: "Economic systems must circulate capital regeneratively, creating compounding value from minimal waste.",
    summary: "Policy 6: Resourcefulness, recycling, and enterprise create boundless wealth from discarded inputs.",
    summary2Liner: "Policy 6: A resilient economy converts discarded waste into regenerative wealth through initiative and fair trading.",
    parentIds: ["B5", "B6"],
    status: "ratified",
    actionTitle: "Build Circular Enterprises",
    actionStatement: "Design production systems that eliminate waste, reuse materials, and share capital equitably.",
    psychologyTitle: "Abundance Mindset & Entrepreneurial Agency",
    psychologyStatement: "Recognizing latent utility in discarded materials unlocks non-zero-sum value creation.",
    lenses: {
      dilemmaTitle: "💡 Starting a Zero-Waste Community Initiative",
      dilemmaBody: "Transforming urban organic kitchen waste into decentralized biogas and community compost.",
      psychologyTitle: "🧠 Linear Disposability Bias & Material Blindness",
      psychologyBody: "Consumerist conditioning leads people to view discarded materials as valueless garbage rather than feedstocks.",
      psychologyBlindspots: ["Linear Disposability Bias", "Latent Value Blindness", "Cynical Inaction"],
      constitutionTitle: "🏛️ Article 39(a) — Right to Adequate Means of Livelihood",
      constitutionQuote: "Citizens, men and women equally, have the right to an adequate means of livelihood through economic democracy.",
      constitutionReachPct: 73,
      modernBuddhaExemplar: "Jadav Payeng (Forest Man of India)",
      modernBuddhaStory: "Single-handedly planted and nurtured a 1,360-acre biodiverse forest on a barren sandbar over four decades.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Jadav_Payeng",
      criticTitle: "📢 Planned Obsolescence & Landfill Dumping",
      criticBody: "Industrial linear production models mandate short product lifespans, filling oceans and landfills with toxic e-waste.",
      parableAnchor: {
        title: "Somadatta and the Merchant of the Dead Mouse",
        story: "A penniless youth named Somadatta heard a wealthy guildmaster remark: 'A truly resourceful merchant could build a fortune starting even with this dead mouse lying in the street.' Somadatta took the dead mouse and sold it to a tavern keeper for a cat's dinner in exchange for two handfuls of grain. He cooked the grain, provided refreshing water to tired woodcutters, traded firewood for cloth, and step-by-step parlayed negligible capital into a thriving maritime trading fleet through honest enterprise and zero waste.",
        source: "Hitopadesha / Jataka Tales (Cullaka-Setthi Jataka)",
        moralOneLiner: "Economic vitality comes from resourcefulness and circular value creation, turning the discarded into enduring prosperity."
      }
    }
  },

  // =========================================================================
  // --- LAYER 3: INSTITUTIONAL GOVERNANCE & POLICY (6 nodes: D1 - D6) ---
  // =========================================================================
  {
    id: "D1",
    layer: 3,
    title: "Proportionality in Governance",
    statement: "State sanctions and executive punishments must strictly match the gravity of the infraction.",
    summary: "Governance 1: Punitive measures must be proportionate and precisely targeted, avoiding collective punishment.",
    summary2Liner: "Governance 1: Disproportionate collective punishment invariably harms the innocent while the real culprit escapes.",
    parentIds: ["C1", "C2"],
    status: "ratified",
    actionTitle: "Apply Proportionate Measures",
    actionStatement: "Enforce precise, targeted legal remedies and reject collective punitive sweeps.",
    psychologyTitle: "Dragnet Retributive Bias & Punitive Overreach",
    psychologyStatement: "State agencies overreact with massive collective punishment to project synthetic strength.",
    lenses: {
      dilemmaTitle: "💡 Resisting Group Punishments in Schools or Companies",
      dilemmaBody: "Refusing to cancel team bonuses for all employees due to the policy infraction of a single rogue actor.",
      psychologyTitle: "🧠 Dragnet Retributive Bias & Sledgehammer Thinking",
      psychologyBody: "Frustrated authorities default to sweeping collective crackdowns, capturing innocent bystanders while instigators hide.",
      psychologyBlindspots: ["Dragnet Retributive Bias", "Sledgehammer Thinking", "Collateral Damage Indifference"],
      constitutionTitle: "🏛️ Supreme Court Proportionality Standard (Modern Dental College Benchmark)",
      constitutionQuote: "Any state limitation on fundamental rights must be proportionate, minimal, and rational to the legitimate aim.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Justice V.R. Krishna Iyer",
      modernBuddhaStory: "Revolutionized Indian prison jurisprudence, introducing bail as rule, jail as exception, and humanizing correctional law.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/V._R._Krishna_Iyer",
      criticTitle: "📢 Draconian Preventative Detention Laws",
      criticBody: "Abuse of UAPA and NSA to detain activists for years without formal charges violates proportionality.",
      parableAnchor: {
        title: "The Flea, the Bug, and the King's Bed (Mandavisarpini and Agnimukha)",
        story: "A modest flea lived discreetly in a king's royal bed, biting gently only when the monarch was deep in slumber, causing no disturbance. One night, an aggressive, reckless bedbug named Agnimukha arrived. Ignoring the flea's plea for moderation, the impatient bug bit the king sharply while he was still awake. Stung with pain, the king leaped up and ordered guards to search the linens. The agile bedbug immediately slipped into a floor crevice, while the slow, harmless flea was caught on the mattress and executed.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Disproportionate dragnet enforcement catches innocent bystanders while the reckless instigators slip into the shadows."
      }
    }
  },
  {
    id: "D2",
    layer: 3,
    title: "Consent & Data Autonomy",
    statement: "Data capture and administrative oversight must be built upon continuous, informed consent.",
    summary: "Governance 2: Inviting unchecked surveillance authorities into private domains invites eventual total capture.",
    summary2Liner: "Governance 2: Ceding unchecked control to predatory entities for short-term dominance results in total consumption.",
    parentIds: ["C2", "C3"],
    status: "ratified",
    actionTitle: "Mandate Opt-In Consent",
    actionStatement: "Refuse involuntary biometric harvesting and demand revocable user consent in all data platforms.",
    psychologyTitle: "Faustian Bargain Bias & Short-Term Vindictiveness",
    psychologyStatement: "Factions invite predatory external regulators into private spaces to settle petty domestic rivalries.",
    lenses: {
      dilemmaTitle: "💡 Opting Out of Invasive Biometric Databases",
      dilemmaBody: "Demanding alternative manual verification methods when public services mandate facial recognition.",
      psychologyTitle: "🧠 Faustian Alliance Rationalization",
      psychologyBody: "Parties blind themselves to long-term existential threats when an alliance promises immediate destruction of rivals.",
      psychologyBlindspots: ["Faustian Alliance Rationalization", "Spite-Driven Blindness", "Boundary Erosion Denial"],
      constitutionTitle: "🏛️ Digital Personal Data Protection Act 2023",
      constitutionQuote: "Personal data shall only be processed for lawful purpose for which the Data Principal has given clear consent.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Usha Ramanathan (Human Rights & Data Privacy Jurist)",
      modernBuddhaStory: "Pioneered legal opposition against mandatory biometric Aadhaar linkage, defending citizen autonomy against state surveillance.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Usha_Ramanathan",
      criticTitle: "📢 Blanket Exemptions for Security Agencies",
      criticBody: "State data protection bills grant sweeping surveillance exemptions to intelligence and police agencies.",
      parableAnchor: {
        title: "Manduka the Frog King and the Hungry Serpent (Gangadatta's Folly)",
        story: "Tormented by his own spiteful relatives, the frog king Gangadatta climbed out of his well and invited an old black cobra to live in the well, contracting the snake to eat his political rivals one by one. The snake obliged until all enemies were consumed. But when Gangadatta asked the serpent to leave, the snake hissed: 'I have no other home now; you must feed me your own family.' One by one, the snake devoured the frog's children, his queen, and finally Gangadatta himself.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Inviting an unchecked authoritarian force to crush your adversaries guarantees you will be their final meal."
      }
    }
  },
  {
    id: "D3",
    layer: 3,
    title: "Judicial Independence",
    statement: "Judicial proceedings and state justice must be insulated from factional intrigue and court sycophancy.",
    summary: "Governance 3: Independent judicial verification prevents scheming courtiers from poisoning the sovereign mind.",
    summary2Liner: "Governance 3: An uninspected court where courtiers whisper poison destroys genuine alliances and state justice.",
    parentIds: ["C2", "C4"],
    status: "ratified",
    actionTitle: "Insulate Judicial Systems",
    actionStatement: "Protect judge appointments from political tampering and uphold strict separation of judicial powers.",
    psychologyTitle: "Court Sycophancy & In-Group Information Cascades",
    psychologyStatement: "Isolated leaders surrounded by flattering courtiers become susceptible to manufactured paranoia.",
    lenses: {
      dilemmaTitle: "💡 Insisting on Open Inquiry in Toxic Workplace Rumors",
      dilemmaBody: "Demanding a formal, documented peer review instead of acting on backchannel executive whispers.",
      psychologyTitle: "🧠 Whisper Campaign Vulnerability & Paranoia Cascades",
      psychologyBody: "Rulers and executives isolated from direct ground facts easily fall prey to manipulative divide-and-conquer courtiers.",
      psychologyBlindspots: ["Whisper Campaign Vulnerability", "Paranoia Cascades", "Sycophantic Feedback Loops"],
      constitutionTitle: "🏛️ Article 50 — Separation of Judiciary from Executive",
      constitutionQuote: "The State shall take steps to separate the judiciary from the executive in the public services of the State.",
      constitutionReachPct: 78,
      modernBuddhaExemplar: "Prashant Bhushan (Public Interest Litigator)",
      modernBuddhaStory: "Filed landmark PILs against high-level coal allocation, 2G spectrum corruption, and electoral bond opacity.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Prashant_Bhushan",
      criticTitle: "📢 Post-Retirement Appointments for Judges",
      criticBody: "Executive offering lucrative tribunal chairmanships and governorships to retiring judges compromises judicial independence.",
      parableAnchor: {
        title: "The Jackal Damanaka's Intrigues in the Court of King Pingalaka",
        story: "King Pingalaka the lion and Sanjivaka the bull forged a noble friendship of mutual respect. But the scheming jackal minister Damanaka, jealous of the outsider's influence and loss of court privileges, waged a whisper campaign. He told the lion the bull planned a coup, and told the bull the lion hungered for his flesh. Blinded by paranoia and lacking an independent judicial hearing, the two faithful companions fought to the death, leaving the court corrupted and the cunning jackal in sole control.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Without transparent, independent judicial hearings, toxic whisper networks destroy the finest partnerships."
      }
    }
  },
  {
    id: "D4",
    layer: 3,
    title: "Institutional Transparency",
    statement: "Custodians of public institutions must practice radical transparency and verify all incoming claims.",
    summary: "Governance 4: Public watchdogs must scrutinize smooth pretenders before entrusting public wards.",
    summary2Liner: "Governance 4: Institutional guardians who fail to audit sweet-talking interlopers become scapegoats for the damage.",
    parentIds: ["C4", "C5"],
    status: "ratified",
    actionTitle: "Audit Institutional Custodians",
    actionStatement: "Conduct regular open audits of public institutions and verify all credentials independently.",
    psychologyTitle: "Superficial Compliance Bias & Custodial Neglect",
    psychologyStatement: "Guardians lower security standards when newcomers display religious or ethical symbolism.",
    lenses: {
      dilemmaTitle: "💡 Auditing NGO and Charitable Foundation Spending",
      dilemmaBody: "Verifying whether donated funds actually reach intended beneficiaries rather than funding lavish executive perks.",
      psychologyTitle: "🧠 Pious Rhetoric Disarmament & Neglectful Custodianship",
      psychologyBody: "Superficial displays of righteousness cause institutional watchdogs to abandon necessary audit rigor.",
      psychologyBlindspots: ["Pious Rhetoric Disarmament", "Custodial Neglect", "Blind Faith in Moral Posturing"],
      constitutionTitle: "🏛️ CAG Constitutional Mandate (Article 148-151)",
      constitutionQuote: "The Comptroller and Auditor General of India shall audit all expenditure from the Consolidated Fund of India.",
      constitutionReachPct: 82,
      modernBuddhaExemplar: "Vinod Rai (Former CAG of India)",
      modernBuddhaStory: "Exposed systemic revenue leakages in 2G spectrum and coal block allocations through rigorous public audits.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Vinod_Rai",
      criticTitle: "📢 Delayed CAG Tabling in Parliament",
      criticBody: "Executive withholding and delaying critical audit reports undermines parliamentary and public financial scrutiny.",
      parableAnchor: {
        title: "The Blind Vulture Jaradgava and Dirghakarna the Cat",
        story: "An elderly blind vulture, Jaradgava, guarded the hollow trunk of an ancient fig tree where various birds nested. Dirghakarna the cat arrived, purring religious verses and claiming he had renounced meat to study non-violence on the holy riverbanks. Softened by the cat's pious speeches, the blind custodian allowed him shelter. Over weeks, the cat secretly ate bird hatchlings, scattering bones in the vulture's nest. When the frantic parent birds found the bones, they assumed the blind vulture was the killer and pecked him to death.",
        source: "Hitopadesha / Panchatantra, Mitra-bheda",
        moralOneLiner: "Institutional guardians must verify deeds rather than words; blind trust in pious rhetoric destroys both warden and flock."
      }
    }
  },
  {
    id: "D5",
    layer: 3,
    title: "Progressive Distribution & Anti-Corruption",
    statement: "State wealth and audit systems must penetrate hollow spectacles and redistribute real resources equitably.",
    summary: "Governance 5: Piercing hollow intimidation and exposing grand rhetoric yields grounded distribution.",
    summary2Liner: "Governance 5: Do not let booming propaganda intimidate you; investigate the interior to find real resources.",
    parentIds: ["C5", "C6"],
    status: "ratified",
    actionTitle: "Audit Grand Claims & Close Loopholes",
    actionStatement: "Look beyond public relations spectacles, tax mega-fortunes, and redirect wealth to public goods.",
    psychologyTitle: "Sensory Overload Intimidation & Bluster Deference",
    psychologyStatement: "Loud propaganda and theatrical displays intimidate investigators from inspecting underlying financial voids.",
    lenses: {
      dilemmaTitle: "💡 Auditing Corporate CSR PR Stunts",
      dilemmaBody: "Evaluating whether multi-million dollar corporate charity ad campaigns match actual ground village spending.",
      psychologyTitle: "🧠 Spectacle Intimidation & Hollow Authority Illusion",
      psychologyBody: "Booming rhetoric and massive public monuments deter citizens from asking where taxpayer funds actually went.",
      psychologyBlindspots: ["Spectacle Intimidation", "Bluster Deference", "Auditory Overwhelm Paralysis"],
      constitutionTitle: "🏛️ Prevention of Money Laundering Act & Lokpal Mandate",
      constitutionQuote: "Preventing accumulation of illicit wealth and ensuring public accountability of high public officials.",
      constitutionReachPct: 66,
      modernBuddhaExemplar: "T.N. Seshan (Electoral Integrity Reformer)",
      modernBuddhaStory: "Cleaned up Indian election campaigns, ending black money voter bribing and enforcing strict spending caps.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/T._N._Seshan",
      criticTitle: "📢 Selective Enforcement by Investigative Agencies",
      criticBody: "Enforcement agencies selectively raiding opposition political leaders while dropping cases against ruling party defectors.",
      parableAnchor: {
        title: "Gomaya the Jackal and the Booming War Drum",
        story: "A famished jackal wandered onto an abandoned battlefield and was terrified by a thunderous, booming roar whenever the wind blew tree branches against a discarded war drum. He prepared to flee in panic, thinking a colossal monster lurked nearby. But recovering his courage, he crept closer, inspected the object, and tore open the leather skin. Inside, he found nothing but empty air and scraps of fat and meat left by soldiers, feasting peacefully once he saw through the hollow noise.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Intimidating institutional noise often conceals an empty interior; investigate bravely rather than bowing to hollow bluster."
      }
    }
  },
  {
    id: "D6",
    layer: 3,
    title: "Climate Resilient Infrastructure",
    statement: "Physical infrastructure and communal shelter must be engineered to withstand climate extremes.",
    summary: "Governance 6: Building resilient, sustainable structures withstands torrential disruptions.",
    summary2Liner: "Governance 6: Constructing robust shelter requires forethought; mocking good advice leads to exposure and ruin.",
    parentIds: ["C6", "C1"],
    status: "ratified",
    actionTitle: "Build Climate-Resilient Commons",
    actionStatement: "Construct flood-resistant housing, storm drainage, and heat-resilient urban infrastructure.",
    psychologyTitle: "Procrastination under Normalcy Bias",
    psychologyStatement: "Cognitive complacency causes communities to delay disaster preparation until catastrophic floods strike.",
    lenses: {
      dilemmaTitle: "💡 Investing in Flood-Proof Rainwater Harvesting",
      dilemmaBody: "Allocating apartment society funds to water recharge pits before the monsoon arrives rather than cosmetic repainting.",
      psychologyTitle: "🧠 Normalcy Bias & Spiteful Rejection of Preparation",
      psychologyBody: "Unprepared actors mock early climate warnings out of defensive denial, then vent frustration on prepared neighbors.",
      psychologyBlindspots: ["Normalcy Bias", "Spiteful Denial", "Infrastructure Procrastination"],
      constitutionTitle: "🏛️ National Disaster Management Act 2005",
      constitutionQuote: "Mandatory holistic, coordinated and prompt response for disaster mitigation, preparedness and capacity building.",
      constitutionReachPct: 73,
      modernBuddhaExemplar: "Rajendra Singh (Waterman of India)",
      modernBuddhaStory: "Revived indigenous Johad check-dams in Rajasthan, replenishing dead rivers and transforming arid regions.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Rajendra_Singh",
      criticTitle: "📢 Encroachment of Urban Floodplains",
      criticBody: "Reckless real estate construction on lake beds causes catastrophic annual monsoon flooding in Bengaluru and Chennai.",
      parableAnchor: {
        title: "The Tailor Bird and the Cold, Destructive Monkey in the Storm",
        story: "During a torrential monsoon downpour, a tiny tailor bird sat warm and dry inside her intricately stitched nest woven from sturdy leaves. Looking out, she saw a shivering monkey huddled beneath a bare branch with chattering teeth. The bird kindly advised: 'You have two hands and two feet like humans; why did you not build a weather-proof house before the rains arrived?' Enraged by the unsolicited truth, the shivering monkey climbed the branch and ripped the bird's beautiful nest to shreds out of spite.",
        source: "Hitopadesha, Mitra-bheda",
        moralOneLiner: "Resilience requires advance planning; heed constructive advice on infrastructure before the storm destroys your shelter."
      }
    }
  },

  // =========================================================================
  // --- LAYER 4: COMPLEX FRONTIER DILEMMAS (7 nodes: E1 - E7) ---
  // =========================================================================
  {
    id: "E1",
    layer: 4,
    title: "State Security vs Privacy",
    statement: "Balancing the sovereign duty of national defense against individual privacy and civil liberties.",
    summary: "Dilemma 1: Over-engineering state defense architectures often creates a cycle returning to base vulnerabilities.",
    summary2Liner: "Dilemma 1: Searching for an absolute, all-powerful state protector often leads back to the fundamental local scale.",
    parentIds: ["D1", "D2"],
    status: "ratified",
    actionTitle: "Demand Security Proportionality",
    actionStatement: "Limit surveillance intelligence powers with strict judicial warrants and civil liberty protections.",
    psychologyTitle: "Existential Fear & Authoritarian Surrender",
    psychologyStatement: "National security panic leads citizens to accept absolute surveillance, creating uncontrollable state leviathans.",
    lenses: {
      dilemmaTitle: "💡 Facial Recognition Cameras in Public Spaces",
      dilemmaBody: "Weighing street crime deterrence against creating an inescapable state panopticon tracking innocent pedestrians.",
      psychologyTitle: "🧠 Escalation Bias & The Supreme Protector Fallacy",
      psychologyBody: "Societies search for ever-greater external defense powers, ignoring that ultimate safety rests on ground-level civic trust.",
      psychologyBlindspots: ["Supreme Protector Fallacy", "Fear-Driven Liberty Surrender", "Escalation Bias"],
      constitutionTitle: "🏛️ Supreme Court Proportionality Test in Surveillance",
      constitutionQuote: "State surveillance must satisfy threefold test: legality, legitimate state aim, and strict proportionality.",
      constitutionReachPct: 70,
      modernBuddhaExemplar: "Justice H.R. Khanna & Constitutional Litigators",
      modernBuddhaStory: "Defended civil liberties against unchecked state emergency powers, affirming inalienable rights.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Hans_Raj_Khanna",
      criticTitle: "📢 Pegasus Spyware & Mass Interception",
      criticBody: "State procurement of military malware to track political opposition under the vague banner of national security.",
      parableAnchor: {
        title: "The Wedding of the Mouse / Search for the Supreme Mate",
        story: "A hermit raised a female mouse transformed into a maiden and sought the most powerful protector in the universe as her husband. He approached the Sun, but the Sun said the Cloud was greater for blocking his rays. The Cloud confessed the Wind was stronger for blowing him away. The Wind admitted the Mountain was mightier for standing firm against his blasts. Finally, the Mountain confessed: 'The little mouse is more powerful than me, for he burrows through my solid granite base!' The sage turned her back into a mouse to marry her true match.",
        source: "Panchatantra, Mitra-bheda / Kakolukiyam",
        moralOneLiner: "Ultimate security is an illusion of escalating hierarchies; true resilience lies in understanding foundational nature."
      }
    }
  },
  {
    id: "E2",
    layer: 4,
    title: "Triage in Resource Allocation",
    statement: "How to allocate scarce medical equipment and emergency aid during catastrophic supply shocks.",
    summary: "Dilemma 2: Balancing proactive prevention, real-time agility, and fatalistic resignation in crisis triage.",
    summary2Liner: "Dilemma 2: Foresight and quick-witted improvisation survive crises; fatalistic complacency guarantees destruction.",
    parentIds: ["D1", "D5"],
    status: "ratified",
    actionTitle: "Implement Transparent Triage",
    actionStatement: "Deploy objective, medically vetted triage protocols during shortages rather than wealth-based rationing.",
    psychologyTitle: "Fatalism vs Anticipatory Agency",
    psychologyStatement: "Crisis situations separate proactive planners, agile improvisers, and paralyzed fatalists.",
    lenses: {
      dilemmaTitle: "💡 ICU Ventilator Rationing in Epidemic Peaks",
      dilemmaBody: "Deciding triage priority between a young patient with 80% recovery odds and an elderly patient first in queue.",
      psychologyTitle: "🧠 Fatalistic Passivity & Crisis Paralysis",
      psychologyBody: "Facing complex existential bottlenecks, people default to fatalistic resignation ('what happens will happen') and perish.",
      psychologyBlindspots: ["Fatalistic Passivity", "Crisis Paralysis", "Ostrich Effect"],
      constitutionTitle: "🏛️ NDMA Crisis Medical Allocation Protocols",
      constitutionQuote: "Emergency triage must follow objective clinical utility and non-discriminatory transparency.",
      constitutionReachPct: 75,
      modernBuddhaExemplar: "Frontline Medical Responders (COVID-19 Oxygen Taskforce)",
      modernBuddhaStory: "Medical teams and civic volunteer networks who coordinated emergency oxygen distribution under peak crisis.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/COVID-19_pandemic_in_India",
      criticTitle: "📢 Black Market Profiteering in Healthcare Crises",
      criticBody: "Lack of public hospital ventilators forces families into extortionate black markets for oxygen cylinders.",
      parableAnchor: {
        title: "The Three Fish: Foresight, Quick-Wit, and Fatalist",
        story: "In a forest pond lived three fish: Anagatavidhata (Foresight), Pratyutpannamati (Quick-Witted), and Yadbhavishya (Fatalist). Overhearing fishermen planning to cast nets the next morning, Foresight immediately swam through a canal to a connected river. Quick-Witted stayed behind, but when captured in the net, feigned death and floated belly-up until the fishermen tossed him aside, allowing him to dart to safety. Fatalist said, 'What is fated to happen will happen,' struggled aimlessly in the net, and was clubbed to death.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Proactive prevention and nimble adaptation save lives in resource crises; fatalistic inaction is lethal."
      }
    }
  },
  {
    id: "E3",
    layer: 4,
    title: "Whistleblowing vs Organizational Loyalty",
    statement: "When does an ethical duty to expose corruption override institutional confidentiality agreements?",
    summary: "Dilemma 3: Navigating insider loyalty to leadership vs public disclosure of dangerous systemic abuse.",
    summary2Liner: "Dilemma 3: Blind institutional loyalty that suppresses truth breeds mutual destruction when toxic courtiers manipulate power.",
    parentIds: ["D3", "D4"],
    status: "ratified",
    actionTitle: "Expose Malfeasance Responsibly",
    actionStatement: "Blow the whistle on systemic public harm while following rigorous evidence verification protocols.",
    psychologyTitle: "In-Group Loyalty & Ostracism Fear",
    psychologyStatement: "Deep primal fears of tribal betrayal and career ostracism pressure insiders into silence over corporate crimes.",
    lenses: {
      dilemmaTitle: "💡 Leaking Internal Audit on Hazardous Structural Faults",
      dilemmaBody: "Exposing substandard concrete in bridge construction despite corporate non-disclosure agreements and firing threats.",
      psychologyTitle: "🧠 Tribal Loyalty Traps & Moral Disengagement",
      psychologyBody: "Employees rationalize complicity in corporate malfeasance under the guise of loyalty to the company team.",
      psychologyBlindspots: ["Tribal Loyalty Trap", "Moral Disengagement", "Retaliation Fear Paralysis"],
      constitutionTitle: "🏛️ Whistleblowers Protection Act 2014",
      constitutionQuote: "Mechanism to receive complaints relating to disclosure on any allegation of corruption or wilful misuse of power.",
      constitutionReachPct: 62,
      modernBuddhaExemplar: "Satyendra Dubey & Manjunath Shanmugam",
      modernBuddhaStory: "Engineers who sacrificed their lives exposing national highway construction corruption and oil adulteration cartels.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Satyendra_Dubey",
      criticTitle: "📢 Dilution of Whistleblower Safety Protections",
      criticBody: "Lack of physical witness protection programs leaves corporate and state whistleblowers vulnerable to retaliation.",
      parableAnchor: {
        title: "Sanjivaka the Bull and Pingalaka the Lion (The Betrayal of Trust)",
        story: "Sanjivaka the bull served King Pingalaka with unblemished loyalty, enriching the kingdom through wise counsel. However, the prime minister Damanaka fabricated treasonous charges against him. Sanjivaka struggled with the dilemma: should he flee and break his bond, expose the corrupted cabinet openly, or trust the king's honor? Trusting naive loyalty over open whistleblowing, the bull attended court unarmed, where the misinformed king leaped upon him, slaying his most faithful advisor to his eternal remorse.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Unquestioned loyalty within a compromised hierarchy is suicidal; whistleblowing and open truth must pierce organizational deceit."
      }
    }
  },
  {
    id: "E4",
    layer: 4,
    title: "Algorithmic Bias & Automated Justice",
    statement: "Can automated risk-scoring models deliver impartial justice without encoding historical social bias?",
    summary: "Dilemma 4: Machine learning models trained on biased datasets simply automate and codify ancient prejudices.",
    summary2Liner: "Dilemma 4: Superficially recasting an entity into a high-status form cannot erase the hardcoded training data underneath.",
    parentIds: ["D2", "D3"],
    status: "ratified",
    actionTitle: "Audit Algorithmic Systems",
    actionStatement: "Mandate independent algorithmic bias audits and human-in-the-loop review for all automated state decisions.",
    psychologyTitle: "Automation Bias & Infallibility Projection",
    psychologyStatement: "Humans uncritically trust mathematical algorithmic outputs, assuming software is free of human prejudice.",
    lenses: {
      dilemmaTitle: "💡 Deploying AI in Bail Decisions & Credit Scoring",
      dilemmaBody: "Rejecting black-box algorithmic credit filters that systematically penalize applicants from low-income postal codes.",
      psychologyTitle: "🧠 Automation Bias & Mathwashing Prejudice",
      psychologyBody: "Engineers project objectivity onto predictive models, failing to see that training data reflects historic caste and class bias.",
      psychologyBlindspots: ["Automation Bias", "Mathwashing Prejudice", "Black-Box Credulity"],
      constitutionTitle: "🏛️ NITI Aayog National Strategy for Responsible AI",
      constitutionQuote: "AI systems must respect constitutional non-discrimination under Article 15 and ensure explainability.",
      constitutionReachPct: 64,
      modernBuddhaExemplar: "Joy Buolamwini & Algorithmic Justice Advocates",
      modernBuddhaStory: "Exposed severe demographic bias in computer vision, forcing global tech companies to halt flawed facial surveillance.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Joy_Buolamwini",
      criticTitle: "📢 Predictive Policing & Biometric Welfare Denial",
      criticBody: "Automated fingerprint matching failures in rural ration shops lead to starvation deaths of elderly citizens.",
      parableAnchor: {
        title: "The Mouse Maiden Turned Mouse (Punar Mushiko Bhava)",
        story: "A compassionate rishi caught a tiny mouse dropped by a hawk and transformed her into a beautiful human maiden with Vedic mantras. He educated her in royalty and high culture. Yet, when offered princes and demigods in marriage, her underlying neurological instinct responded only to a burrowing field rodent gnawing grain in the cellar. Realizing that external transformation cannot overwrite hardcoded base reality without profound inner evolution, the sage commanded: 'Punar Mushiko Bhava — Become a mouse again.'",
        source: "Panchatantra, Aparikshitakaraka / Mitra-bheda",
        moralOneLiner: "Cosmetic algorithmic rebranding cannot conceal underlying training biases; systems inevitably revert to their hardcoded priors."
      }
    }
  },
  {
    id: "E5",
    layer: 4,
    title: "Degrowth vs Boundless Expansion",
    statement: "Should developing societies throttle consumption growth to prevent planetary biosphere collapse?",
    summary: "Dilemma 5: Unchecked growth engineered through escalating power leads to predatory ambition that turns on its creator.",
    summary2Liner: "Dilemma 5: Continuously escalating predatory power without ethical restraint eventually threatens the very system that fostered it.",
    parentIds: ["D5", "D6"],
    status: "ratified",
    actionTitle: "Cap Extractive Consumption",
    actionStatement: "Shift economic metrics from gross throughput (GDP) to ecological well-being and genuine progress indicators.",
    psychologyTitle: "Hedonic Treadmill & The Growth Fetish",
    psychologyStatement: "Unconstrained material expansion triggers endless escalating desire without delivering increased well-being.",
    lenses: {
      dilemmaTitle: "💡 Transitioning to Circular Steady-State Local Production",
      dilemmaBody: "Prioritizing durable, repairable community goods over fast-fashion consumer products engineered for quick disposal.",
      psychologyTitle: "🧠 Megalomania & Hubristic Expansion Syndrome",
      psychologyBody: "Economic entities grow addicted to exponential expansion, eventually turning predatory against the host biosphere that nurtured them.",
      psychologyBlindspots: ["Megalomania", "Hedonic Treadmill", "Unbounded Expansion Fallacy"],
      constitutionTitle: "🏛️ Supreme Court Vellore Citizens Welfare Forum Landmark",
      constitutionQuote: "Sustainable development and precautionary principles are inalienable features of municipal environmental law.",
      constitutionReachPct: 68,
      modernBuddhaExemplar: "J.C. Kumarappa (Economy of Permanence)",
      modernBuddhaStory: "Pioneered Gandhian ecological economics, advocating decentralized village economy over centralized industrial extraction.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/J._C._Kumarappa",
      criticTitle: "📢 Carbon Emissions of Super-Rich Jet Setters",
      criticBody: "Top 0.1% generate more annual aviation emissions than entire populations of low-income developing nations.",
      parableAnchor: {
        title: "The Sage, the Mouse, the Dog, and the Ungrateful Tiger",
        story: "A forest hermit saved a mouse from a crow, turning it into a cat to escape dogs, a dog to escape leopards, and finally a mighty royal tiger to rule the jungle. But inflated with insatiable power and boundless pride, the tiger reasoned: 'As long as this hermit lives, people will remember I was once a miserable little mouse; I must kill him.' Reading the beast's predatory ambition, the sage sprinkled holy water and whispered: 'Punar Mushiko Bhava,' returning the rampaging monster to a humble mouse in the grass.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Unbounded growth detached from gratitude and ecological balance breeds an apex monster that must be restrained."
      }
    }
  },
  {
    id: "E6",
    layer: 4,
    title: "Intergenerational Climate Debt",
    statement: "How should the financial and ecological debt of historical fossil emissions be divided between generations?",
    summary: "Dilemma 6: Exhausting shared ancestral commons while promising false futures leaves future generations stranded.",
    summary2Liner: "Dilemma 6: Predatory generations promise sustainable salvation while secretly consuming the remaining reserves of the commons.",
    parentIds: ["D6", "D5"],
    status: "ratified",
    actionTitle: "Fund Intergenerational Climate Reparations",
    actionStatement: "Levy fossil wealth surcharges to establish sovereign green transition funds for younger generations.",
    psychologyTitle: "Intergenerational Egoism & Future Discounting",
    psychologyStatement: "Present generations heavily discount the welfare of unborn descendants due to lack of immediate reciprocity.",
    lenses: {
      dilemmaTitle: "💡 Phasing Out Coal Subsidies vs Preserving Mining Towns",
      dilemmaBody: "Funding just transitions for thermal energy workers while aggressively closing dirty coal thermal power plants.",
      psychologyTitle: "🧠 Temporal Parasitism & Distant Consequence Denial",
      psychologyBody: "Leaders maintain deceptive narratives of future technological fixes while privately extracting the last remaining natural capital.",
      psychologyBlindspots: ["Temporal Parasitism", "Future Generation Discounting", "False Stewardship Rhetoric"],
      constitutionTitle: "🏛️ Supreme Court M.K. Ranjitsinh Judgment (Right against Climate Change 2024)",
      constitutionQuote: "Citizens have a fundamental right to be free from the adverse impacts of climate change under Articles 14 and 21.",
      constitutionReachPct: 77,
      modernBuddhaExemplar: "Licypriya Kangujam & Youth Climate Activists",
      modernBuddhaStory: "Mobilized young voices across Global South to demand immediate international carbon accountability and clean air.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Licypriya_Kangujam",
      criticTitle: "📢 Fossil Fuel Subsidies vs Green Funding Deficits",
      criticBody: "Global governments still spend over $1 trillion annually on fossil fuel subsidies, starving renewable transitions.",
      parableAnchor: {
        title: "The Old Crane and the Crab at the Drying Lake",
        story: "An old crane deceived the aquatic creatures of a drought-stricken lake, claiming: 'I will transport all your offspring safely to a perennial mountain reservoir.' Instead, day after day, he carried generations of fish to a jagged cliff and consumed them all, leaving behind mountains of dry bones while the home lake withered away. When the last creature, a crab, discovered the pile of consumed youth, he grasped the true intergenerational theft and severed the crane's neck with his claws.",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Pretending to steward the future while devouring its life-support systems invites righteous intergenerational reckoning."
      }
    }
  },
  {
    id: "E7",
    layer: 4,
    title: "Cognitive Liberty vs Algorithmic Manipulation",
    statement: "Protecting human consciousness and neuro-autonomy from addictive algorithmic dopamine manipulation.",
    summary: "Dilemma 7: Retaining cognitive sovereignty against deceptive platforms that strip critical reasoning.",
    summary2Liner: "Dilemma 7: Surrendering your cognitive faculties to flattering manipulators leads to walking blindly into the trap twice.",
    parentIds: ["D2", "D4"],
    status: "ratified",
    actionTitle: "Defend Cognitive Sovereignty",
    actionStatement: "Ban infinite-scroll dark patterns, protect attention spans, and mandate user-controlled recommendation feeds.",
    psychologyTitle: "Dopamine Hijacking & Algorithmic Conditioning",
    psychologyStatement: "Variable reward schedules and rage-bait algorithms bypass the prefrontal cortex, inducing digital addiction.",
    lenses: {
      dilemmaTitle: "💡 Enforcing Screen-Time Limits for Minors",
      dilemmaBody: "Restricting algorithmic infinite-scroll video feeds for teenagers despite tech platform lobby pushback.",
      psychologyTitle: "🧠 Ego-Flattery Gullibility & Critical Thinking Shutdown",
      psychologyBody: "When algorithms flatter users' vanity and confirm their biases, critical cognitive defenses shut down completely.",
      psychologyBlindspots: ["Ego-Flattery Gullibility", "Variable Reward Addiction", "Algorithmic Gaslighting"],
      constitutionTitle: "🏛️ Supreme Court Cognitive Liberty Jurisprudence (Selvi Benchmark)",
      constitutionQuote: "Involuntary intrusion into the human mental space violates the core dignity protected by Article 21.",
      constitutionReachPct: 72,
      modernBuddhaExemplar: "Tristan Harris & Center for Humane Technology",
      modernBuddhaStory: "Exposed social media algorithmic manipulation and championed human-centered cognitive technology reform.",
      modernBuddhaLink: "https://en.wikipedia.org/wiki/Tristan_Harris",
      criticTitle: "📢 Generative Deepfakes & Dopamine Slot Machines",
      criticBody: "Social media monopolies weaponize emotional outrage algorithms to maximize advertising engagement at the cost of mental health.",
      parableAnchor: {
        title: "The Lion, the Fox, and the Gullible Donkey without Ears or Heart",
        story: "A sickly lion ordered his minister, the fox, to lure a gullible donkey to his cave with promises of becoming king of beasts. The lion struck the donkey but missed, and the donkey fled in terror. The silver-tongued fox pursued the donkey, rationalizing: 'The king was only embracing you in royal welcome!' Swayed by flattering propaganda, the donkey returned to the cave and was slain. While the lion bathed, the fox ate the donkey's brain. When questioned, the fox quipped: 'If he had a brain or ears, would he have walked into this cave twice?'",
        source: "Panchatantra, Mitra-bheda (The Loss of Friends)",
        moralOneLiner: "Those who surrender critical reasoning to seductive manipulation will walk repeatedly into their own slaughter."
      }
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
