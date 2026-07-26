/**
 * LAYPERSON_NODES_DATA — Plain-English Summaries, Everyday Analogies,
 * Literature Citations, and 3-Primitive Mappings for all 34 Morality Tree Nodes.
 * 
 * 3 PRIMITIVE ROOTS:
 * - P1_HARM: Non-Harm / Suffering Avoidance
 * - P2_AGENCY: Agency / Consent & Personal Autonomy
 * - P3_EQUITY: Equal Weight / Impartial Fairness
 */
const LAYPERSON_NODES_DATA = {
  primitives: {
    P1_HARM: {
      id: "P1_HARM",
      name: "Non-Harm & Suffering Avoidance",
      tagline: "Pain hurts, and avoiding unnecessary suffering is a universally shared starting point.",
      icon: "🛡️",
      color: "#10b981",
      citation: "Peter Singer (The Expanding Circle) & Buddhist Ahimsa",
      waysToLive: [
        { area: "🏠 At Home", action: "Actively listen when someone expresses distress; never dismiss felt physical or emotional pain." },
        { area: "💼 At Work", action: "Refuse toxic overwork practices that burn out colleagues or compromise health and safety." },
        { area: "🌐 Online", action: "Refrain from targeted harassment or outrage-baiting designed to inflict psychological harm." }
      ]
    },
    P2_AGENCY: {
      id: "P2_AGENCY",
      name: "Agency & Consent",
      tagline: "You own your mind and body; forcing choices on others causes friction and conflict.",
      icon: "🗽",
      color: "#3b82f6",
      citation: "Amartya Sen (Capability Approach) & John Locke",
      waysToLive: [
        { area: "🏠 At Home", action: "Respect family members' personal boundaries, body autonomy, and private choices without coercion." },
        { area: "💼 At Work", action: "Empower team members with autonomy over their execution rather than micromanaging." },
        { area: "🌐 Online", action: "Use digital privacy tools and always ask explicit consent before sharing others' data or photos." }
      ]
    },
    P3_EQUITY: {
      id: "P3_EQUITY",
      name: "Equal Weight & Impartiality",
      tagline: "No person's pain or joy matters more than another's simply because of who they are.",
      icon: "⚖️",
      color: "#f59e0b",
      citation: "John Rawls (Veil of Ignorance) & Derek Parfit (On What Matters)",
      waysToLive: [
        { area: "🏠 At Home", action: "Divide domestic care and shared responsibilities fairly without gender or age bias." },
        { area: "💼 At Work", action: "Advocate for equal pay, transparent hiring, and fair credit sharing for junior staff." },
        { area: "🌐 Online", action: "Apply the exact same ethical standards to your political opponents as you do to your allies." }
      ]
    }
  },

  nodes: {
    // --- META-RULES ---
    R1: {
      plainSummary: "What is good for one person must help sustain the whole community and environment.",
      analogy: "Like taking care of a house shared with roommates—you can't burn down the kitchen to warm your room.",
      primitiveRoots: ["P1_HARM", "P2_AGENCY"],
      books: ["First Nations 7th Generation Ethics", "Fritjof Capra (The Web of Life)"]
    },
    R2: {
      plainSummary: "Tell the truth and seek facts, because lying erodes trust and causes hidden harm.",
      analogy: "Using a broken map guarantees getting lost; honest information keeps everyone safe.",
      primitiveRoots: ["P1_HARM", "P3_EQUITY"],
      books: ["Socratic Dialogues", "Claude Shannon (Information Theory)"]
    },
    R3: {
      plainSummary: "Treat others the way you want to be treated so society doesn't collapse into chaos.",
      analogy: "If everyone cuts in line, lines stop working for everybody.",
      primitiveRoots: ["P2_AGENCY", "P3_EQUITY"],
      books: ["Kant (Groundwork of Metaphysics)", "Robert Axelrod (Evolution of Cooperation)"]
    },

    // --- LAYER 0: AXIOMS ---
    A1: {
      plainSummary: "Suffering is real and undesirable for anyone experiencing it.",
      analogy: "Touching a hot stove hurts everyone regardless of language or culture.",
      primitiveRoots: ["P1_HARM"],
      books: ["Peter Singer (Practical Ethics)", "Sam Harris (The Moral Landscape)"]
    },
    A2: {
      plainSummary: "Animals and humans experience feelings and deserve consideration.",
      analogy: "A dog whimpers when hurt just like a child; feelings matter everywhere.",
      primitiveRoots: ["P1_HARM", "P2_AGENCY"],
      books: ["Jeremy Bentham (Principles of Morals)", "Frans de Waal (Primates and Philosophers)"]
    },
    A3: {
      plainSummary: "Golden Rule: Treat others fairly because their experience matters just as much as yours.",
      analogy: "Sharing a pie evenly so everyone gets a fair slice.",
      primitiveRoots: ["P3_EQUITY"],
      books: ["Confucius (Analects)", "Universal Golden Rule across Traditions"]
    },
    A4: {
      plainSummary: "Everyone should have freedom over their own mind and choices.",
      analogy: "Nobody should force you to wear clothes or eat food you strongly object to.",
      primitiveRoots: ["P2_AGENCY"],
      books: ["John Stuart Mill (On Liberty)", "Isaiah Berlin (Two Concepts of Liberty)"]
    },
    A5: {
      plainSummary: "Everyone needs food, water, shelter, and safety before they can thrive.",
      analogy: "You can't learn math or write art if you're starving or freezing.",
      primitiveRoots: ["P1_HARM", "P3_EQUITY"],
      books: ["Abraham Maslow (Hierarchy of Needs)", "Henry Shue (Basic Rights)"]
    },
    A6: {
      plainSummary: "Fairness means equal rules for everybody, with no special shortcuts for the powerful.",
      analogy: "A referee calling fouls equally on both teams in a championship game.",
      primitiveRoots: ["P3_EQUITY"],
      books: ["John Rawls (A Theory of Justice)", "T.M. Scanlon (What We Owe to Each Other)"]
    },

    // --- LAYER 1: DERIVED PRINCIPLES ---
    D1: {
      plainSummary: "Universal Healthcare: Taking care of sick people is a basic moral duty.",
      analogy: "A firefighter putting out a house fire regardless of who owns the house.",
      primitiveRoots: ["P1_HARM", "P5_NEEDS"],
      books: ["Amartya Sen (Development as Freedom)", "WHO Health & Human Rights Charter"]
    },
    D2: {
      plainSummary: "Bodily Integrity: Your body belongs to you alone; no one can touch or harm it without consent.",
      analogy: "A locked front door to your personal house.",
      primitiveRoots: ["P1_HARM", "P2_AGENCY"],
      books: ["Judith Jarvis Thomson (Rights & Decency)", "Article 21 Indian Constitution"]
    },
    D3: {
      plainSummary: "Accessible Education: Knowledge should be available to everyone to unlock their potential.",
      analogy: "Giving every child a pair of shoes so everyone can run in the race.",
      primitiveRoots: ["P2_AGENCY", "P3_EQUITY"],
      books: ["Paulo Freire (Pedagogy of the Oppressed)", "Martha Nussbaum (Creating Capabilities)"]
    },
    D4: {
      plainSummary: "Freedom of Expression: People should be free to speak and share ideas without fear.",
      analogy: "Opening windows in a room so fresh air can circulate.",
      primitiveRoots: ["P2_AGENCY"],
      books: ["John Milton (Areopagitica)", "Justice Holmes (Marketplace of Ideas)"]
    },
    D5: {
      plainSummary: "Environmental Stewardship: Protecting nature for current and future generations.",
      analogy: "Not polluting the well your children will drink from tomorrow.",
      primitiveRoots: ["P1_HARM", "P2_AGENCY"],
      books: ["Aldo Leopold (A Sand County Almanac)", "Rachel Carson (Silent Spring)"]
    },
    D6: {
      plainSummary: "Harm Reduction: Stopping actions that cause direct damage to innocent people.",
      analogy: "Putting up guardrails on dangerous mountain roads.",
      primitiveRoots: ["P1_HARM"],
      books: ["Joel Feinberg (The Harm Principle)", "Derek Parfit (Reasons and Persons)"]
    },
    D7: {
      plainSummary: "Mutual Aid: Helping neighbors in crisis strengthens the safety of the entire community.",
      analogy: "Neighbors helping rebuild a barn destroyed by a storm.",
      primitiveRoots: ["P1_HARM", "P3_EQUITY"],
      books: ["Peter Kropotkin (Mutual Aid)", "Elinor Ostrom (Governing the Commons)"]
    },
    D8: {
      plainSummary: "Democratic Consent: Power comes from the consent of the governed, not divine right.",
      analogy: "A group of friends voting on which movie to watch together.",
      primitiveRoots: ["P2_AGENCY", "P3_EQUITY"],
      books: ["Jean-Jacques Rousseau (The Social Contract)", "Danielle Allen (Talking to Strangers)"]
    },

    // --- LAYER 2: APPLIED ETHICS ---
    E1: { plainSummary: "Clean Energy Transition: Moving away from dirty fuels to prevent toxic air and climate collapse.", analogy: "Replacing smoky coal stoves with clean electric heaters.", primitiveRoots: ["P1_HARM", "P5_NEEDS"], books: ["IPCC Reports", "Vaclav Smil (Energy and Civilization)"] },
    E2: { plainSummary: "Universal Basic Income & Welfare: Ensuring no citizen falls below baseline survival.", analogy: "A safety net under a tightrope walker.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Philippe Van Parijs (Real Freedom for All)", "Guy Standing"] },
    E3: { plainSummary: "Universal Suffrage: Every adult gets one vote, no matter their wealth or status.", analogy: "One ticket per person at the community fair.", primitiveRoots: ["P3_EQUITY"], books: ["Amartya Sen", "Universal Declaration of Human Rights Art 21"] },
    E4: { plainSummary: "Press Protection: Defending journalists who report uncomfortable truths.", analogy: "Protecting the lighthouse operator in a storm.", primitiveRoots: ["P2_AGENCY", "P3_EQUITY"], books: ["Amartya Sen (Hunger & Press Freedom)", "Reporters Without Borders"] },
    E5: { plainSummary: "Digital Privacy: Protecting personal data from unauthorized corporate/state spying.", analogy: "Curtains on your bedroom window.", primitiveRoots: ["P2_AGENCY"], books: ["Shoshana Zuboff (Surveillance Capitalism)", "Puttaswamy SC Judgment 2017"] },
    E6: { plainSummary: "Whistleblower Protection: Defending insiders who expose corruption and corporate crime.", analogy: "Protecting a worker who calls out toxic chemical dumping.", primitiveRoots: ["P1_HARM", "P2_AGENCY"], books: ["Edward Snowden (Permanent Record)", "Nader (Whistle Blowing)"] },
    E7: { plainSummary: "Animal Welfare: Preventing cruel treatment of livestock and wildlife.", analogy: "Treating farm animals humanely rather than as inanimate objects.", primitiveRoots: ["P1_HARM"], books: ["Tom Regan (The Case for Animal Rights)", "Peter Singer"] },
    E8: { plainSummary: "Restorative Justice: Healing harm and rehabilitation over pure vindictive punishment.", analogy: "Fixing a broken window and repairing the relationship instead of just locking up the vandal.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Howard Zehr (The Little Book of Restorative Justice)", "Angela Davis"] },
    E9: { plainSummary: "Progressive Taxation: Those who earn more contribute a higher proportion to public goods.", analogy: "Stronger oxen pulling a heavier load so the calf isn't crushed.", primitiveRoots: ["P3_EQUITY"], books: ["Thomas Piketty (Capital in the Twenty-First Century)", "Joseph Stiglitz"] },
    E10: { plainSummary: "Public Science & Open Data: Making scientific research publicly available to all.", analogy: "Sharing the recipe for life-saving medicine for free.", primitiveRoots: ["P2_AGENCY", "P3_EQUITY"], books: ["Michael Gibbons", "UNESCO Open Science Recommendation"] },
    E11: { plainSummary: "Disability Inclusion: Building accessible infrastructure so everyone can participate.", analogy: "Building ramps alongside stairs so wheelchair users enter the same building.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Rosemarie Garland-Thomson", "UN Convention on Rights of Persons with Disabilities"] },
    E12: { plainSummary: "Refugee Protection: Offering safe haven to families fleeing war and violence.", analogy: "Opening your porch umbrella to shelter someone caught in a flash downpour.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Hannah Arendt (The Right to Have Rights)", "1951 Refugee Convention"] },

    // --- LAYER 3: COMPLEX DILEMMAS ---
    X1: { plainSummary: "Resource Triage: Allocating scarce medical equipment during an emergency.", analogy: "Choosing who gets the last lifeboat on a sinking ship.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Triage Ethics Protocols", "Peter Singer"] },
    X2: { plainSummary: "Privacy vs Public Health Surveillance: Balancing data tracking against epidemic control.", analogy: "Thermal cameras at airports during a pandemic.", primitiveRoots: ["P1_HARM", "P2_AGENCY"], books: ["Gostin (Public Health Law)", "Zuboff"] },
    X3: { plainSummary: "Free Speech vs Hate Speech Censorship: Balancing open discussion against targeted harassment.", analogy: "Allowing loud arguments in a park vs stopping someone shouting fire in a crowded theater.", primitiveRoots: ["P2_AGENCY", "P1_HARM"], books: ["Jeremy Waldron (The Harm in Hate Speech)", "Mill"] },
    X4: { plainSummary: "Economic Growth vs Climate Protection: Short-term jobs vs long-term planetary health.", analogy: "Harvesting a forest today vs keeping trees to prevent tomorrow's mudslide.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["Nicholas Stern (Economics of Climate Change)", "Dasgupta Review"] },
    X5: { plainSummary: "Autonomous AI Weapons: Machine decision-making in warfare.", analogy: "Programming a drone to fire without human authorization.", primitiveRoots: ["P1_HARM", "P2_AGENCY"], books: ["Paul Scharre (Army of None)", "UN CCW Debates"] },
    X6: { plainSummary: "Gene Editing & Human Augmentation: Genetic modifications for health vs inequality.", analogy: "Designing offspring traits in a lab.", primitiveRoots: ["P2_AGENCY", "P3_EQUITY"], books: ["Michael Sandel (The Case Against Perfection)", "Jennifer Doudna"] },
    X7: { plainSummary: "Patents vs Medicine Access: Intellectual property profits vs global vaccine distribution.", analogy: "Charging high royalties on a polio vaccine during an outbreak.", primitiveRoots: ["P1_HARM", "P3_EQUITY"], books: ["TRIPS Agreement Debates", "Joseph Stiglitz"] },
    X8: { plainSummary: "Algorithmic Judicial Risk Scoring: Using AI predictions in criminal sentencing.", analogy: "A computer algorithm deciding parole eligibility.", primitiveRoots: ["P3_EQUITY", "P2_AGENCY"], books: ["Cathy O'Neil (Weapons of Math Destruction)", "ProPublica Machine Bias"] }
  }
};

if (typeof window !== "undefined") {
  window.LAYPERSON_NODES_DATA = LAYPERSON_NODES_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = LAYPERSON_NODES_DATA;
}
