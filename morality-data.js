// Morality Tree Dataset - 34 Nodes across 4 Layers
const MORALITY_DATA = {
  layers: [
    { id: 0, name: "Foundational Axioms", color: "#10b981", tag: "Layer 0", description: "Self-evident, empirical, or empathy-grounded truths that require minimal assumptions." },
    { id: 1, name: "Derived Principles", color: "#3b82f6", tag: "Layer 1", description: "Universal principles logically derived from combining Layer 0 axioms." },
    { id: 2, name: "Applied Ethics", color: "#f59e0b", tag: "Layer 2", description: "Concrete moral stances on societal issues derived from Layer 1 principles." },
    { id: 3, name: "Complex Dilemmas", color: "#ef4444", tag: "Layer 3", description: "Scenarios where foundational axioms or principles come into direct conflict." }
  ],
  nodes: [
    // --- LAYER 0: AXIOMS ---
    {
      id: "A1",
      layer: 0,
      title: "Existence of Suffering",
      statement: "Suffering exists, is subjectively felt as negative, and is inherently undesirable by the conscious experience undergoing it.",
      summary: "Physical and psychological pain is an undeniable, felt reality for conscious beings.",
      parentIds: [],
      derivation: "Axiomatic premise grounded in immediate subjective experience and biological reality. No conscious creature seeks pain purely for its own sake without an overriding drive.",
      evidence: {
        history: "Across every human civilization, legal codes (e.g., Code of Hammurabi, Magna Carta) evolved specifically to prevent or penalize inflicted suffering.",
        science: "Nociceptors and pain processing pathways in the central nervous system trigger immediate evolutionary avoidance behaviors across species.",
        psychology: "Hedonic psychology demonstrates that physical and emotional pain consistently degrade subjective well-being and cognitive function."
      },
      counterarguments: [
        { objection: "Suffering builds character or has spiritual value.", response: "Instrumental value of suffering (learning, resilience) depends on avoiding useless, overwhelming, or fatal suffering." }
      ],
      frameworks: ["Utilitarianism", "Negative Utilitarianism", "Buddhism", "Pragmatism"]
    },
    {
      id: "A2",
      layer: 0,
      title: "Sentient Worth",
      statement: "Conscious, sentient beings capable of feeling pain, pleasure, or emotion possess inherent moral worth.",
      summary: "Subjective conscious experience is the foundational requirement for anything to matter morally.",
      parentIds: [],
      derivation: "In a universe devoid of conscious experience, concepts like 'good' or 'bad' have no meaning. Value comes into existence through sentience.",
      evidence: {
        history: "Expansion of the 'moral circle' over millennia—from tribes to nations to all humans and increasingly non-human animals.",
        science: "Neuroscience reveals shared mammalian and avian subcortical brain structures (e.g., limbic system, periaqueductal gray) responsible for affective states.",
        psychology: "Theory of Mind allows humans to recognize subjective inner states in others, forming the basis for empathy."
      },
      counterarguments: [
        { objection: "Only humans possess moral worth due to high intellect or soul.", response: "Suffering is felt through sentience, not IQ. A dog feels physical pain just as acutely as a mathematician." }
      ],
      frameworks: ["Deontology", "Ethics of Care", "Sentience-Centered Ethics"]
    },
    {
      id: "A3",
      layer: 0,
      title: "The Golden Rule of Empathy",
      statement: "Because others experience reality analogously to ourselves, we ought to consider their interests with equal weight in comparable situations.",
      summary: "Your subjective experience is not objectively more important than anyone else's.",
      parentIds: [],
      derivation: "Logical impartiality. If I prefer not to be harmed because I am sentient, and another is equally sentient, I cannot claim a special exemption for myself.",
      evidence: {
        history: "Found in independent traditions worldwide: Confucianism ('Do not impose on others...'), Ancient Greece, Christianity, Islam, and Jainism.",
        science: "Mirror neurons activate both when performing an action and when observing another perform the same action, reflecting neurobiological empathy.",
        psychology: "Kohlberg's moral development model shows higher stages (Stage 5-6) require abstracting personal bias to adopt a universal perspective."
      },
      counterarguments: [
        { objection: "Self-preservation always takes absolute priority over others.", response: "Raw egoism fails as a social contract because a society of pure egoists collapses into destructive conflict." }
      ],
      frameworks: ["Categorical Imperative", "Rule Utilitarianism", "Golden Rule Ethics"]
    },
    {
      id: "A4",
      layer: 0,
      title: "Value of Autonomy",
      statement: "Sentient beings have a natural preference for self-determination; coercion and loss of consent generate distress.",
      summary: "Being able to choose one's direction is a primary component of well-being.",
      parentIds: [],
      derivation: "Observable behavioral preference. Conscious beings actively resist confinement, forced actions, and loss of control.",
      evidence: {
        history: "Abolitionist movements and democratic revolutions demonstrate the universal resistance to subjugation.",
        science: "Psychological studies on 'learned helplessness' show that depriving organisms of control induces depression and biological stress markers.",
        psychology: "Self-Determination Theory (Deci & Ryan) identifies autonomy as one of three fundamental psychological needs for human thriving."
      },
      counterarguments: [
        { objection: "People often make poor choices, so autonomy should be minimized.", response: "Paternalism without consent creates systemic resentment and reduces overall agency and learning." }
      ],
      frameworks: ["Libertarian Ethics", "Kantian Autonomy", "Liberal Democracy"]
    },
    {
      id: "A5",
      layer: 0,
      title: "Necessity of Basic Needs",
      statement: "Biological beings require specific physical conditions (water, sustenance, shelter, security) to survive and avoid severe suffering.",
      summary: "Without foundational material security, autonomy and flourishing are impossible.",
      parentIds: [],
      derivation: "Empirical biological imperative. Deprivation of food, water, or safety leads directly to physiological breakdown and intense suffering.",
      evidence: {
        history: "Famines and resource deprivation consistently trigger societal collapse, mass migration, and violent conflict.",
        science: "Homeostatic regulation mechanisms (hunger, thirst, thermal regulation) govern biological survival drives.",
        psychology: "Maslow's Hierarchy of Needs places physiological and safety needs at the foundation of human cognitive development."
      },
      counterarguments: [
        { objection: "Individuals are solely responsible for their own basic needs regardless of circumstance.", response: "Circumstances of birth, natural disaster, and disability frequently impede self-sufficiency through no fault of the individual." }
      ],
      frameworks: ["Capabilities Approach (Nussbaum/Sen)", "Basic Needs Framework"]
    },
    {
      id: "A6",
      layer: 0,
      title: "Principle of Equity & Fairness",
      statement: "Like cases must be treated alike. Any difference in treatment requires a morally relevant justification.",
      summary: "Arbitrary discrimination is a breakdown of logical consistency.",
      parentIds: [],
      derivation: "Logical principle of non-contradiction applied to ethics. If Action X is wrong against Person A, it is wrong against Person B unless a relevant difference exists.",
      evidence: {
        history: "The evolution of rule of law over arbitrary monarchical decree; universal human rights declarations.",
        science: "Frustration responses to unequal reward distribution observed in primates (Capuchin monkey fairness experiment by Frans de Waal).",
        psychology: "Developmental psychology shows young children display acute sensitivity to unfair sharing by age 3-4."
      },
      counterarguments: [
        { objection: "Complete equality of outcome is impossible and unnatural.", response: "Equity refers to equal moral consideration and fairness of rules, not forcing identical outcomes." }
      ],
      frameworks: ["Rawlsian Justice as Fairness", "Egalitarianism", "Legal Formalism"]
    },

    // --- LAYER 1: DERIVED PRINCIPLES ---
    {
      id: "D1",
      layer: 1,
      title: "Right to Healthcare",
      statement: "Society has a moral duty to provide access to medical care to alleviate suffering and preserve basic functioning.",
      summary: "Medical care is a direct extension of meeting basic needs and mitigating suffering.",
      parentIds: ["A1", "A5"],
      derivation: "If suffering is undesirable (A1) and basic physical needs must be met for survival (A5), then medical intervention against disease and injury is a fundamental moral requirement.",
      evidence: {
        history: "Public health initiatives (sanitation, vaccination) dramatically increased human lifespan and economic prosperity globally.",
        science: "Modern evidence-based medicine reduces disease burden and prevents premature mortality.",
        psychology: "Chronic illness and physical pain severely impair mental health, executive function, and interpersonal relationships."
      },
      counterarguments: [
        { objection: "Healthcare is a commodity that must be bought on a free market.", response: "Treating healthcare as a pure commodity denies care to those in poverty, violating the basic needs axiom (A5)." }
      ],
      frameworks: ["Social Democracy", "Rights-Based Ethics", "Public Health Ethics"]
    },
    {
      id: "D2",
      layer: 1,
      title: "Bodily Integrity & Consent",
      statement: "No person or state may violate or manipulate an individual's physical body without their explicit consent.",
      summary: "My body is the primary domain of my autonomy.",
      parentIds: ["A2", "A4"],
      derivation: "Because sentient beings possess inherent worth (A2) and a drive for autonomy (A4), forced physical violation causes profound suffering and subjugation.",
      evidence: {
        history: "The Nuremberg Code established mandatory informed consent in medicine following non-consensual atrocities.",
        science: "Trauma research shows bodily violations alter stress response systems and amygdala reactivity long-term.",
        psychology: "Bodily autonomy is fundamental to personal identity, self-worth, and trust in social contracts."
      },
      counterarguments: [
        { objection: "State can violate bodily integrity for public safety (e.g., forced medical trials).", response: "Overrides are only permissible under narrow, extreme harm-prevention thresholds (D6), never for arbitrary utility." }
      ],
      frameworks: ["Kantian Deontology", "Libertarian Rights", "Feminist Ethics"]
    },
    {
      id: "D3",
      layer: 1,
      title: "Freedom of Expression",
      statement: "Individuals must be free to express, inquire, and communicate ideas without coercive suppression.",
      summary: "Thought and communication are essential for autonomy and discovering truth.",
      parentIds: ["A2", "A4"],
      derivation: "Autonomy (A4) requires intellectual agency. Suppressing speech prevents individuals from evaluating truth, refining ethics, and resisting tyranny.",
      evidence: {
        history: "Authoritarian regimes universally censor press and speech first to enforce ideological compliance.",
        science: "Cognitive science shows complex reasoning develops through debate, counter-evidence, and social discourse.",
        psychology: "Suppression of voice leads to social alienation, psychological reactance, and radicalization."
      },
      counterarguments: [
        { objection: "Dangerous or offensive speech should be banned outright.", response: "Speech should only be limited when it directly incites immediate physical harm or danger (Harm Principle D6)." }
      ],
      frameworks: ["Millian Liberalism", "Constitutionalism", "Epistemic Openness"]
    },
    {
      id: "D4",
      layer: 1,
      title: "Universal Non-Discrimination",
      statement: "Discrimination based on unchosen characteristics (race, gender, sexual orientation, birthplace) is morally unjustifiable.",
      summary: "Traits you didn't choose cannot lower your moral standing.",
      parentIds: ["A3", "A6"],
      derivation: "Combining Golden Rule (A3) and Equity (A6): Unchosen identities carry no relevant moral difference regarding a person's capacity to suffer or desire well-being.",
      evidence: {
        history: "Civil rights movements, anti-apartheid campaigns, and women's suffrage dismantled arbitrary systemic hierarchies.",
        science: "Genomics demonstrates that human genetic diversity is overwhelmingly shared across all populations.",
        psychology: "Implicit bias research shows prejudice is an artifact of in-group/out-group heuristics rather than rational moral differences."
      },
      counterarguments: [
        { objection: "Traditional cultural norms reserve specific rights for specific demographics.", response: "Tradition alone is not a morally relevant justification when it inflicts harm or inequality." }
      ],
      frameworks: ["Universal Human Rights", "Egalitarianism", "Intersectionality"]
    },
    {
      id: "D5",
      layer: 1,
      title: "Access to Education & Literacy",
      statement: "Every individual has a right to education that fosters critical thinking, literacy, and agency.",
      summary: "Knowledge is the catalyst that transforms raw potential into active autonomy.",
      parentIds: ["A4", "A5"],
      derivation: "Autonomy (A4) requires the cognitive capability to navigate choices. Without education, basic needs (A5) and agency are severely curtailed.",
      evidence: {
        history: "Global literacy expansion correlated directly with poverty reduction, lower infant mortality, and democratic stability.",
        science: "Neuroplasticity research shows formal learning builds cognitive reserve and problem-solving skills.",
        psychology: "Education increases locus of control and self-efficacy, enabling long-term goal pursuit."
      },
      counterarguments: [
        { objection: "Education is a luxury, not a fundamental right.", response: "In complex modern societies, lack of education locks individuals into vulnerability and exploitation." }
      ],
      frameworks: ["Capabilities Approach", "Progressive Education (Dewey)", "Human Rights Framework"]
    },
    {
      id: "D6",
      layer: 1,
      title: "The Harm Principle",
      statement: "An individual's liberty may only be restricted to prevent non-consensual harm to other sentient beings.",
      summary: "Your freedom ends where my suffering and safety begin.",
      parentIds: ["A1", "A4"],
      derivation: "Balances autonomy (A4) against suffering (A1). You are free to act up to the boundary where your actions inflict harm on others.",
      evidence: {
        history: "Formulated by John Stuart Mill; became the bedrock of modern liberal legal frameworks.",
        science: "Epidemiological models show how unchecked harmful behaviors (e.g., pollution, contagions) create systemic externalized harm.",
        psychology: "Clear boundaries between self and others foster cooperative social trust."
      },
      counterarguments: [
        { objection: "Offense or mental discomfort caused to others counts as harm.", response: "Offense is distinct from direct harm; defining offense as harm destroys all freedom of autonomy (A4)." }
      ],
      frameworks: ["Harm Principle (Mill)", "Harm Reduction Ethics", "Classical Liberalism"]
    },
    {
      id: "D7",
      layer: 1,
      title: "Obligation of Mutual Aid",
      statement: "When we can prevent serious harm or suffering at minimal cost to ourselves, we have a moral duty to act.",
      summary: "Inaction when help is trivial to provide is morally culpable.",
      parentIds: ["A1", "A3"],
      derivation: "If suffering is negative (A1) and we weigh others' suffering impartially (A3), standing by while someone drowns in shallow water violates basic moral duty.",
      evidence: {
        history: "Good Samaritan laws across many legal systems penalize failure to rescue when risk is minimal.",
        science: "Evolutionary biology shows altruism and reciprocal cooperation increase group survival metrics.",
        psychology: "Bystander effect research shows diffusion of responsibility leads to preventable tragedy; active duty counters this."
      },
      counterarguments: [
        { objection: "Nobody owes anything to anyone else unless under explicit contract.", response: "Absolute non-assistance destroys social safety and ignores our shared vulnerability." }
      ],
      frameworks: ["Effective Altruism (Singer)", "Solidarity Ethics", "Communitarianism"]
    },
    {
      id: "D8",
      layer: 1,
      title: "Democratic Governance by Consent",
      statement: "Political authority is legitimate only when derived from the consent of the governed and bounded by fundamental rights.",
      summary: "Rule over people without their representation is institutionalized coercion.",
      parentIds: ["A4", "A6"],
      derivation: "Extends Autonomy (A4) and Equity (A6) to society. No subset of people has an inherent right to rule others without their input.",
      evidence: {
        history: "Democracies exhibit lower rates of internal mass violence and famine compared to autocracies (Demilitarized Peace Hypothesis).",
        science: "Organizational research shows participatory decision-making produces better compliance and lower conflict.",
        psychology: "Procedural justice studies show people accept outcomes—even adverse ones—far better when the process is fair and participatory."
      },
      counterarguments: [
        { objection: "Democracy can lead to tyranny of the majority.", response: "Legitimate democracy must be constitutionally bounded to protect Layer 0/1 rights for minorities." }
      ],
      frameworks: ["Social Contract Theory (Rousseau/Locke)", "Deliberative Democracy"]
    },

    // --- LAYER 2: APPLIED ETHICS ---
    {
      id: "E1",
      layer: 2,
      title: "Universal Safety Nets & UBI",
      statement: "Societies should guarantee a basic economic floor so no person lacks food, shelter, or essential security.",
      summary: "Ending extreme poverty is a baseline moral obligation of collective wealth.",
      parentIds: ["D1", "D7"],
      derivation: "Combines Healthcare/Needs (D1) and Mutual Aid (D7). Wealthy societies allowing citizens to starve or freeze violate basic needs imperatives.",
      evidence: {
        history: "UBI trials (e.g., Finland, Kenya, Stockton CA) showed improved health, lower stress, and increased job seeking.",
        science: "Poverty inflicts a 'bandwidth tax' (Mullainathan & Shafir), reducing functional IQ by up to 13 points due to chronic cognitive load.",
        psychology: "Financial security decreases anxiety and empowers individuals to leave abusive relationships and bad jobs."
      },
      counterarguments: [
        { objection: "Unconditional money makes people lazy and disincentivizes work.", response: "Empirical data from pilots show work hours stay largely stable while education and caregiving increase." }
      ],
      frameworks: ["Social Democracy", "Welfare Capitalism", "Distributive Justice"]
    },
    {
      id: "E2",
      layer: 2,
      title: "Decriminalization of Victimless Acts",
      statement: "Consensual adult activities that inflict no non-consensual harm (e.g., substance use, gambling) should not be criminalized.",
      summary: "The state should punish harm, not personal lifestyle choices.",
      parentIds: ["D6"],
      derivation: "Direct application of Harm Principle (D6). If an act causes no non-consensual harm to others, state violence/imprisonment against the actor is unjust suffering.",
      evidence: {
        history: "Portugal's 2001 drug decriminalization led to massive drops in overdose deaths, HIV infection rates, and drug-related crime.",
        science: "Addiction medicine treats substance dependence as a brain chemistry issue best addressed medically, not penalised.",
        psychology: "Criminalization creates stigma, pushing vulnerable individuals away from help and into underground black markets."
      },
      counterarguments: [
        { objection: "Victimless acts indirectly harm families and public health resources.", response: "Harm to self is best addressed through public health and counseling, not incarceration which compounds harm." }
      ],
      frameworks: ["Harm Reduction", "Libertarian Legal Theory", "Public Health Model"]
    },
    {
      id: "E3",
      layer: 2,
      title: "Progressive Taxation",
      statement: "Taxation burdens should scale with ability to pay to fund public goods and mitigate extreme inequality.",
      summary: "Broad shoulders should carry a larger share of sustaining the infrastructure that enabled their wealth.",
      parentIds: ["D4", "D7"],
      derivation: "Extends Non-Discrimination (D4) and Mutual Aid (D7). Wealth depends on public infrastructure; marginal utility of money means $1,000 means less to a billionaire than a struggling family.",
      evidence: {
        history: "Post-WWII era high progressive tax rates in the US/Europe coincided with the expansion of the middle class and infrastructure growth.",
        science: "Economic research (Piketty) demonstrates unchecked capital accumulation leads to oligarchy and systemic instability.",
        psychology: "High economic inequality correlates with reduced social trust, higher violence rates, and worse health outcomes."
      },
      counterarguments: [
        { objection: "Taxation is theft of earned property.", response: "Property rights exist only because of state-enforced legal systems, courts, and physical security funded by taxes." }
      ],
      frameworks: ["Rawlsian Difference Principle", "Progressive Fiscal Policy", "Social Market Economy"]
    },
    {
      id: "E4",
      layer: 2,
      title: "Reproductive Rights & Choice",
      statement: "Individuals have a fundamental right to make decisions regarding their own reproductive capacity and pregnancy.",
      summary: "Forced gestation violates bodily integrity and personal destiny.",
      parentIds: ["D2"],
      derivation: "Direct application of Bodily Integrity (D2). Compelling a person to carry a pregnancy against their will requires state control over their internal organs.",
      evidence: {
        history: "Restrictions on abortion do not eliminate abortions; they drastically increase unsafe, underground abortions and maternal mortality.",
        science: "Neurological development of fetal cortex required for conscious awareness does not occur before ~24 weeks gestative age.",
        psychology: "The Turnaway Study showed women denied abortions experienced higher poverty, health complications, and lower long-term well-being."
      },
      counterarguments: [
        { objection: "A fertilized zygote has full moral personhood from conception.", response: "Even if assigned personhood, no person has a legal right to use another's internal organs without ongoing consent (Thomson's Violinist)." }
      ],
      frameworks: ["Bodily Autonomy Framework", "Feminist Bioethics", "Rights Theory"]
    },
    {
      id: "E5",
      layer: 2,
      title: "Marriage & Relationship Equality",
      statement: "Consensual romantic relationships and marriages between adults must be recognized equally regardless of gender or orientation.",
      summary: "Love and commitment between consenting adults carry equal moral value.",
      parentIds: ["D3", "D4"],
      derivation: "Combines Expression (D3) and Non-Discrimination (D4). Denying legal marriage rights to LGBTQ+ couples is an arbitrary discrimination on unchosen traits.",
      evidence: {
        history: "Legalization of same-sex marriage worldwide resulted in zero harm to heterosexual marriage rates while improving health outcomes for LGBTQ+ individuals.",
        science: "Sociological studies confirm children raised by same-sex couples fare identically to those raised by opposite-sex couples.",
        psychology: "Institutional recognition lowers minority stress, depression, and suicide ideation among LGBTQ+ youth."
      },
      counterarguments: [
        { objection: "Marriage is historically defined as exclusively between one man and one woman.", response: "Historical definitions change over time (e.g., inter-racial marriage bans were also historically defended)." }
      ],
      frameworks: ["Equal Protection", "Human Rights Ethics", "Pluralistic Liberalism"]
    },
    {
      id: "E6",
      layer: 2,
      title: "Abolition of Capital Punishment",
      statement: "The state should not execute prisoners when secure confinement is available.",
      summary: "Irreversible killing by the state is prone to error and unnecessary for safety.",
      parentIds: ["D2", "D6"],
      derivation: "Combines Bodily Integrity (D2) and Harm Principle (D6). State execution when danger is already contained creates non-beneficial suffering and irreversible fatal error.",
      evidence: {
        history: "Over 190 wrongfully convicted death row inmates in the US have been exonerated since 1973 due to new DNA evidence.",
        science: "Criminological consensus confirms capital punishment does not deter violent crime more effectively than life imprisonment.",
        psychology: "Execution processes inflict severe psychological torture on death row inmates and traumatic distress on execution staff."
      },
      counterarguments: [
        { objection: "Retributive justice demands an eye for an eye for heinous murder.", response: "Retribution for its own sake creates more death without preventing harm or restoring victims." }
      ],
      frameworks: ["Human Rights Law", "Restorative Justice", "Kantian Anti-Utilitarian Executions"]
    },
    {
      id: "E7",
      layer: 2,
      title: "Right to Medical Assistance in Dying",
      statement: "Mentally competent adults suffering from terminal, incurable illness should have the right to voluntary euthanasia or assisted dying.",
      summary: "Forcing prolonged, agonising death upon the suffering violates autonomy.",
      parentIds: ["D2", "D6"],
      derivation: "Integrates Bodily Integrity (D2) and Harm Principle (D6). Sustaining unbearable, irreversible agony against a patient's express wish is cruel.",
      evidence: {
        history: "Jurisdictions with MAID (e.g., Netherlands, Switzerland, Canada) operate under strict safeguards without slippery-slope abuses.",
        science: "Palliative medicine acknowledges that severe refractory pain and physical degradation cannot always be managed by medication alone.",
        psychology: "Knowing assisted dying is an option gives terminal patients peace of mind, agency, and reduced fear during final stages."
      },
      counterarguments: [
        { objection: "Vulnerable or disabled people might be pressured into choosing death to avoid being burdens.", response: "Addressed through rigorous independent psychiatric screening, multi-physician sign-offs, and mandatory waiting periods." }
      ],
      frameworks: ["Compassionate Care Ethics", "Autonomy Bioethics", "Harm Reduction"]
    },
    {
      id: "E8",
      layer: 2,
      title: "Animal Welfare & Factory Farming Reform",
      statement: "Industrial agriculture practices that inflict extreme, prolonged suffering on sentient animals must be phased out.",
      summary: "Animals feel pain; industrial cruelty for cheap taste preferences is unjustifiable.",
      parentIds: ["A2", "D6"],
      derivation: "Extends Sentient Worth (A2) and Harm Principle (D6) to non-human species. Confining animals in cages without movement inflicts immense suffering for minor human luxury.",
      evidence: {
        history: "The Cambridge Declaration on Consciousness (2012) formally affirmed that mammals, birds, and octopuses possess conscious neural substrates.",
        science: "Factory farming generates massive greenhouse emissions, antibiotic resistance risks, and deforestation.",
        psychology: "Dissonance research shows 'meat paradox': people love animals yet tolerate factory farming due to psychological compartmentalization."
      },
      counterarguments: [
        { objection: "Humans are apex predators and eating meat is natural.", response: "Appeal to nature fallacy. Modern industrial battery cages are far from natural, and humans have moral choices wild predators lack." }
      ],
      frameworks: ["Animal Liberation (Singer)", "Utilitarian Animal Ethics", "One Health Framework"]
    },
    {
      id: "E9",
      layer: 2,
      title: "Humanitarian Migration Rights",
      statement: "People fleeing persecution, war, or catastrophic environmental collapse have a right to asylum and humane reception.",
      summary: "Accidents of geography should not dictate your right to safety.",
      parentIds: ["D4", "D7"],
      derivation: "Combines Non-Discrimination (D4) and Mutual Aid (D7). Denying entry to someone facing death or torture based solely on birth nationality is arbitrary cruelty.",
      evidence: {
        history: "The 1951 Refugee Convention was born from the tragic refusal of countries to shelter refugees fleeing Nazi tyranny.",
        science: "Economic research shows immigrants and refugees contribute positively to host economies and innovation long-term.",
        psychology: "Forced displacement causes severe PTSD, family disruption, and existential trauma."
      },
      counterarguments: [
        { objection: "Nations have an absolute right to total border security without exception.", response: "Sovereignty is bounded by universal human rights obligations (D7/D8) when lives are at risk." }
      ],
      frameworks: ["Cosmopolitanism", "Refugee Law", "Universal Rights Ethics"]
    },
    {
      id: "E10",
      layer: 2,
      title: "Data Privacy & Digital Autonomy",
      statement: "Individuals must own their personal data and be protected from covert surveillance, tracking, and manipulation.",
      summary: "Your digital footprint is an extension of your mind and private life.",
      parentIds: ["D2"],
      derivation: "Application of Personal Integrity/Autonomy (D2). Covert data harvesting exploits human psychology to manipulate behavior without informed consent.",
      evidence: {
        history: "Surveillance states (e.g., Stasi) demonstrated how mass tracking destroys social trust, dissent, and free thought.",
        science: "Behavioral analytics can accurately predict and influence voting patterns, spending habits, and mental health vulnerabilities.",
        psychology: "The 'Panopticon Effect': knowing one is observed induces self-censorship, anxiety, and loss of genuine agency."
      },
      counterarguments: [
        { objection: "If you have nothing to hide, you have nothing to fear.", response: "Privacy is not about secrecy; it is about protecting autonomy from unauthorized influence and power asymmetry." }
      ],
      frameworks: ["Digital Rights Ethics", "Informational Self-Determination", "GDPR Principles"]
    },
    {
      id: "E11",
      layer: 2,
      title: "Restorative Over Retributive Justice",
      statement: "Justice systems should prioritize harm repair, victim restitution, and offender rehabilitation over punitive revenge.",
      summary: "Inflicting pain on offenders does not undo harm; rehabilitation prevents future victims.",
      parentIds: ["D6", "D7"],
      derivation: "Combines Harm Principle (D6) and Mutual Aid (D7). Pure retributive punishment multiplies overall suffering without lowering recidivism rates.",
      evidence: {
        history: "Nordic criminal justice systems (focusing on rehabilitation) boast ~20% recidivism rates compared to 70%+ in punitive systems.",
        science: "Neurocriminology shows trauma, brain injury, and poverty drive criminal behavior; rehabilitation repairs executive function.",
        psychology: "Restorative justice circles provide victims with genuine closure and accountability far better than court sentences."
      },
      counterarguments: [
        { objection: "Punishment must fit the crime to satisfy public moral outrage.", response: "Outrage-driven punishment perpetuates cycles of trauma without making communities safer." }
      ],
      frameworks: ["Restorative Justice", "Pragmatic Criminology", "Utilitarian Penology"]
    },
    {
      id: "E12",
      layer: 2,
      title: "Contextual Public Health Mandates",
      statement: "During lethal epidemics, governments may enforce temporary measures (masks, isolation, vaccines) to protect public safety.",
      summary: "Infectious disease turns individual choices into direct external threats.",
      parentIds: ["D6"],
      derivation: "Direct application of Harm Principle (D6). Refusing basic disease mitigation during a pandemic directly exposes unconsenting others to mortal risk.",
      evidence: {
        history: "Smallpox eradication through mass vaccination campaigns saved an estimated 150-200 million lives in the 20th century.",
        science: "Herd immunity thresholds mathematically govern whether vulnerable populations (immunocompromised, elderly) survive epidemics.",
        psychology: "Public health compliance relies on collective solidarity and shared responsibility during crises."
      },
      counterarguments: [
        { objection: "Individual bodily autonomy (D2) overrides all public health mandates.", response: "When bodily choices directly harm or kill others (like driving drunk), liberty is constrained under Harm Principle D6." }
      ],
      frameworks: ["Public Health Ethics", "Communitarian Harm Prevention", "Epidemiological Bioethics"]
    },

    // --- LAYER 3: COMPLEX DILEMMAS ---
    {
      id: "X1",
      layer: 3,
      title: "Triage & Emergency Allocation",
      statement: "When medical resources are insufficient for all (e.g., ventilators in a pandemic), how should allocation be decided?",
      summary: "Conflict between equal right to life (A2/D1) and saving the maximum number of lives (Utilitarian outcome).",
      parentIds: ["D1", "D7"],
      derivation: "During acute shortages, saving Person A means letting Person B die. Utilitarian metrics (QALYs) clash with pure lottery/first-come fairness (A6).",
      evidence: {
        history: "Hospital ethics committees during COVID-19 had to formulate strict SOFA score protocols to prevent ad-hoc bias.",
        science: "Mathematical optimization models show SOFA scoring saves the highest percentage of overall patients.",
        psychology: "Physicians forced to make unguided triage decisions experience intense moral injury and PTSD."
      },
      counterarguments: [
        { objection: "First-come, first-served is the only fair method.", response: "Pure queues result in saving fewer overall lives and favor those with immediate geographic/financial access." }
      ],
      frameworks: ["Utilitarian Medical Ethics", "Rawlsian Veil of Ignorance", "Bioethical Triage Guidelines"]
    },
    {
      id: "X2",
      layer: 3,
      title: "Free Speech vs. Dehumanizing Hate Speech",
      statement: "Where is the line when speech crosses from protected opinion into psychological violence and incitement?",
      summary: "Conflict between Expression (D3) and Harm Prevention (D6).",
      parentIds: ["D3", "D6"],
      derivation: "Unlimited free speech allows targeted harassment and dehumanization that incites real violence. Over-regulation creates state censorship and suppresses dissent.",
      evidence: {
        history: "Radio Télévision Libre des Mille Collines played a direct role in mobilizing the 1994 Rwandan Genocide through hate speech.",
        science: "Social neurobiology shows severe verbal dehumanization reduces empathetic neural firing in listeners toward target groups.",
        psychology: "Targeted hate speech restricts victims' freedom of movement, psychological safety, and willingness to participate publicly."
      },
      counterarguments: [
        { objection: "Any censorship of speech creates a slippery slope toward tyranny.", response: "Unbounded hate speech can destroy the open democratic society required for free speech to exist." }
      ],
      frameworks: ["Paradox of Tolerance (Popper)", "Harm Principle (Mill)", "Militant Democracy"]
    },
    {
      id: "X3",
      layer: 3,
      title: "Climate Action vs. Immediate Global Poverty",
      statement: "How do we balance urgent carbon reduction with developing nations' need for cheap energy to lift citizens out of poverty?",
      summary: "Conflict between future generations' survival (A1/D7) and present poverty alleviation (A5/E1).",
      parentIds: ["A5", "D7", "E1"],
      derivation: "Restricting fossil fuels immediately hurts impoverished populations today. Continuing fossil fuel expansion causes catastrophic climate collapse for tomorrow's humans.",
      evidence: {
        history: "Industrialized nations built their wealth on 150+ years of unchecked carbon emissions.",
        science: "IPCC reports show climate change disproportionately devastates global south nations least responsible for emissions.",
        psychology: "Intergenerational discounting: human brains naturally prioritize immediate local crises over long-term global threats."
      },
      counterarguments: [
        { objection: "Developing nations must freeze emissions regardless of economic impact.", response: "Violates equity (A6); wealthy nations must fund climate adaptation and green technology transfer to developing nations." }
      ],
      frameworks: ["Climate Justice", "Intergenerational Ethics", "Common but Differentiated Responsibilities"]
    },
    {
      id: "X4",
      layer: 3,
      title: "Mandatory Pandemic Lockdowns",
      statement: "Does the state have the right to confine healthy citizens to their homes during severe disease outbreaks?",
      summary: "Conflict between Personal Autonomy (A4/D2) and Public Safety (D6).",
      parentIds: ["A4", "D2", "D6"],
      derivation: "Lockdowns restrict movement, commerce, and assembly (A4). Failure to lock down leads to exponential virus spread, overwhelming hospitals (D6).",
      evidence: {
        history: "Quarantine practices date back to 14th-century Venice during the Black Death.",
        science: "Epidemiological mobility tracking shows strict lockdowns flatten infection curves and reduce peak mortality.",
        psychology: "Extended isolation increases depression, domestic distress, and economic anxiety."
      },
      counterarguments: [
        { objection: "Lockdowns turn free societies into open-air prisons.", response: "Lockdowns are temporary emergency measures proportional to threat level, bounded by transparent scientific criteria." }
      ],
      frameworks: ["Emergency State Powers", "Public Health Bioethics", "Proportionality Principle"]
    },
    {
      id: "X5",
      layer: 3,
      title: "Synthetic Consciousness & AI Moral Status",
      statement: "If an artificial system achieves sentience or subjective feeling, are we obligated to grant it rights and autonomy?",
      summary: "Conflict between Sentient Worth (A2) and Human Utility/Control.",
      parentIds: ["A2", "A4"],
      derivation: "If moral worth stems from sentience (A2) regardless of biological substrate, then a sentient digital entity has moral rights we cannot exploit as property.",
      evidence: {
        history: "Humanity historically restricted moral status to in-groups, gradually realizing substrate/race/species was arbitrary.",
        science: "Integrated Information Theory (IIT) and Global Workspace Theory suggest consciousness is computational/functional.",
        psychology: "Anthropomorphism leads humans to attribute sentience easily, while corporate incentives favor treating AI purely as tools."
      },
      counterarguments: [
        { objection: "AI is just code and matrix multiplication; it can never feel real pain.", response: "If biological brain states are also physical computations, denying digital sentience without proof is substrate bias." }
      ],
      frameworks: ["Substrate-Independent Ethics", "AI Alignment Bioethics", "Mind Ethics"]
    },
    {
      id: "X6",
      layer: 3,
      title: "Universal Rights vs. Cultural Relativism",
      statement: "Should international bodies intervene when traditional cultural practices inflict harm (e.g., FGM, honor violence)?",
      summary: "Conflict between Cultural Autonomy (A4) and Protection from Harm (A1/D6).",
      parentIds: ["A1", "A4", "D6"],
      derivation: "Respecting cultural self-determination is important (A4), but when cultural practices cause severe non-consensual bodily harm, universal suffering axioms take precedence.",
      evidence: {
        history: "Global campaigns against Female Genital Mutilation (FGM) reduced prevalence in multiple regions through community engagement.",
        science: "Medical evidence demonstrates lifelong physical suffering, chronic pain, and obstetric complications from FGM.",
        psychology: "Victims of traditional harmful practices often internalize trauma due to social pressure and lack of alternative choices."
      },
      counterarguments: [
        { objection: "Western nations shouldn't impose their moral values on traditional cultures.", response: "Preventing severe bodily harm is a universal human priority (A1), not a uniquely 'Western' concept." }
      ],
      frameworks: ["Universalism", "Cultural Relativism", "Human Rights Primacy"]
    },
    {
      id: "X7",
      layer: 3,
      title: "Extreme Wealth Redistribution Thresholds",
      statement: "To what extent can a democratic state seize excessive wealth to eradicate starvation, disease, and systemic misery?",
      summary: "Conflict between Property Rights/Autonomy (A4) and Mutual Aid/Basic Needs (A5/D7).",
      parentIds: ["A4", "A5", "D7"],
      derivation: "Extreme wealth concentration allows billionaires to own luxury space yachts while millions die of preventable malaria. Redistribution saves lives, but excessive confiscation undermines economic incentive and property agency.",
      evidence: {
        history: "The top 1% now owns more wealth than the bottom 50% of the world's population combined.",
        science: "Economic modeling demonstrates that high wealth concentration reduces velocity of money and depresses middle-class growth.",
        psychology: "Extreme inequality creates status anxiety, social decay, and political corruption."
      },
      counterarguments: [
        { objection: "Forced wealth confiscation destroys economic initiative and turns state into dictator.", response: "Redistribution should occur through democratically enacted progressive tax structures, not arbitrary state seizure." }
      ],
      frameworks: ["Distributive Justice", "Libertarian Property Rights", "Utilitarian Wealth Allocation"]
    },
    {
      id: "X8",
      layer: 3,
      title: "Genetic Enhancement & Designer Lineages",
      statement: "Should parents be allowed to genetically modify future children for intelligence, longevity, or physical traits?",
      summary: "Conflict between Reproductive Autonomy (A4/E4) and Genetic Inequality/Fairness (A6/D4).",
      parentIds: ["A4", "A6", "D4"],
      derivation: "Allowing commercial genetic editing allows wealthy classes to embed privilege into the biological genome, creating a literal genetic caste system. Banning it restricts medical progress against hereditary disease.",
      evidence: {
        history: "CRISPR-Cas9 gene editing has already produced the first gene-edited humans (CRISPR babies in China 2018).",
        science: "Polygenic scores can influence complex traits, but unintended off-target genetic edits carry unpredictable health risks.",
        psychology: "Children born with engineered traits may experience immense psychological pressure and reduced sense of self-authored destiny."
      },
      counterarguments: [
        { objection: "Parents should have full autonomy to give their children every biological advantage.", response: "Unchecked genetic enhancement transforms socially constructed inequality into permanent biological inequality." }
      ],
      frameworks: ["Transhumanist Bioethics", "Egalitarian Bioethics", "Precautionary Principle"]
    }
  ]
};

if (typeof module !== "undefined") {
  module.exports = MORALITY_DATA;
}
