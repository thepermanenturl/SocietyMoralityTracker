import { MoralityNode } from '../types/morality';

export const PSYCHOLOGY_NODES: MoralityNode[] = [
  // --- LAYER -1: PRIMITIVE EVOLUTIONARY ROOTS ---
  {
    id: "PSY_P1_SURVIVAL",
    layer: -1,
    title: "Biological Survival & Homeostatic Drive",
    statement: "The primary biological imperative to maintain physiological equilibrium, avoid physical damage, and secure sustenance.",
    summary: "Root Primitive 1: Evolutionary homeostasis and pain avoidance mechanics.",
    parentIds: [],
    status: "ratified"
  },
  {
    id: "PSY_P2_BELONGING",
    layer: -1,
    title: "Social Attachment & In-Group Bonding",
    statement: "The biological compulsion to connect with kin and social groups for mutual defense, offspring rearing, and shared labor.",
    summary: "Root Primitive 2: Evolutionary kinship and social cohesion mechanics.",
    parentIds: [],
    status: "ratified"
  },
  {
    id: "PSY_P3_COGNITION",
    layer: -1,
    title: "Pattern Recognition & Epistemic Drive",
    statement: "The cognitive capacity to build internal predictive world models, detect causal patterns, and minimize environmental uncertainty.",
    summary: "Root Primitive 3: Sensemaking, causality mapping, and control motivation.",
    parentIds: [],
    status: "ratified"
  },

  // --- LAYER 0: FOUNDATIONAL COGNITIVE DRIVES ---
  {
    id: "PSY_A1_NEEDS",
    layer: 0,
    title: "Maslow Safety & Physiological Drives",
    statement: "Physical safety and biological sustenance must be stabilized before higher-order cognitive exploration or empathy can occur.",
    summary: "Grounded in physiological necessity: hunger, physical threat, and panic collapse complex ethical reasoning.",
    parentIds: ["PSY_P1_SURVIVAL"],
    status: "ratified"
  },
  {
    id: "PSY_A2_AFFECT",
    layer: 0,
    title: "Empathic Concern & Affective Projection",
    statement: "The capacity to mirror another being's emotional distress and project cognitive perspective into their state.",
    summary: "Affective empathy forms the psychological bridge between raw perception and moral consideration.",
    parentIds: ["PSY_P2_BELONGING"],
    status: "ratified"
  },
  {
    id: "PSY_A3_PATTERN",
    layer: 0,
    title: "Heuristic Shortcutting & Mental Models",
    statement: "The brain relies on cognitive heuristics to make rapid decisions under incomplete information and finite compute constraints.",
    summary: "System 1 heuristic processing minimizes energy consumption while introducing systematic cognitive biases.",
    parentIds: ["PSY_P3_COGNITION"],
    status: "ratified"
  },

  // --- LAYER 1: COGNITIVE BIASES & DEFENSE MECHANISMS ---
  {
    id: "PSY_B1_TRIBALISM",
    layer: 1,
    title: "In-Group Favoritism & Tribal Out-Group Bias",
    statement: "Evaluating in-group members with disproportionate empathy while viewing out-group entities with skepticism or dehumanization.",
    summary: "Evolutionary tribalism leads to partisan echo chambers, moral double standards, and xenophobia.",
    parentIds: ["PSY_A2_AFFECT"],
    status: "ratified"
  },
  {
    id: "PSY_B2_DISSONANCE",
    layer: 1,
    title: "Cognitive Dissonance & Self-Justification",
    statement: "Experiencing acute psychological discomfort when holding contradictory beliefs, driving self-deception to preserve ego integrity.",
    summary: "Dissonance triggers cognitive rationalization of unethical behavior rather than belief updating.",
    parentIds: ["PSY_A3_PATTERN"],
    status: "ratified"
  },
  {
    id: "PSY_B3_LOSS_AVERSION",
    layer: 1,
    title: "Loss Aversion & Status Quo Paralysis",
    statement: "Experiencing the pain of a loss twice as intensely as an equivalent gain, creating fear-driven resistance to change.",
    summary: "Loss aversion locks individuals and institutions into harmful legacy patterns out of risk paralysis.",
    parentIds: ["PSY_A1_NEEDS"],
    status: "ratified"
  },
  {
    id: "PSY_B4_ATTRIBUTION",
    layer: 1,
    title: "Fundamental Attribution Error",
    statement: "Attributing others' negative actions to inherent character flaws while explaining one's own flaws by external situational pressures.",
    summary: "Undermines interpersonal empathy by creating moral hypocrisy in judgment.",
    parentIds: ["PSY_A3_PATTERN"],
    status: "ratified"
  },
  {
    id: "PSY_B5_CONFIRMATION",
    layer: 1,
    title: "Confirmation Bias & Selective Epistemic Recall",
    statement: "Actively seeking, remembering, and amplifying evidence that validates preexisting beliefs while discounting contradictory data.",
    summary: "Creates dogmatic blind spots and degrades objective truth-seeking.",
    parentIds: ["PSY_A3_PATTERN"],
    status: "ratified"
  },
  {
    id: "PSY_B6_DISCOUNTING",
    layer: 1,
    title: "Hyperbolic Discounting & Temporal Myopia",
    statement: "Overweighting immediate short-term gratification while heavily discounting long-term systemic consequences.",
    summary: "Drives environmental degradation, financial instability, and delayed maintenance of critical systems.",
    parentIds: ["PSY_A1_NEEDS"],
    status: "ratified"
  },

  // --- LAYER 2: SYSTEMIC SOCIAL DYNAMICS ---
  {
    id: "PSY_C1_BYSTANDER",
    layer: 2,
    title: "Bystander Apathy & Diffusion of Responsibility",
    statement: "Individual willingness to intervene in crises decreases as group size increases due to shared accountability assumption.",
    summary: "Produces institutional inaction and systemic bystander guilt in large organizations.",
    parentIds: ["PSY_B1_TRIBALISM"],
    status: "ratified"
  },
  {
    id: "PSY_C2_OBEDIENCE",
    layer: 2,
    title: "Authority Conformity & Milgram Mechanics",
    statement: "Submitting personal moral conscience to legitimate or perceived authority figures when commanded to inflict harm.",
    summary: "Explains how ordinary individuals execute systemic atrocities under hierarchical directives.",
    parentIds: ["PSY_B1_TRIBALISM"],
    status: "ratified"
  },
  {
    id: "PSY_C3_NEGATIVITY",
    layer: 2,
    title: "Negativity Bias & Doomerism Traps",
    statement: "Negative stimuli capture disproportionate cognitive focus, skewing world assessments toward doom and helplessness.",
    summary: "Fuelled by sensationalist media, leading to fatalism and political apathy.",
    parentIds: ["PSY_B3_LOSS_AVERSION"],
    status: "ratified"
  },

  // --- LAYER 3: META-COGNITIVE SELF-REFLECTION ---
  {
    id: "PSY_D1_META",
    layer: 3,
    title: "Meta-Cognitive Autonoesis & Self-Reflection",
    statement: "The executive capacity to inspect one's own mental states, detect active cognitive biases, and update internal world models.",
    summary: "The prerequisite for genuine personal growth, self-correction, and objective reasoning.",
    parentIds: ["PSY_B2_DISSONANCE", "PSY_B5_CONFIRMATION"],
    status: "ratified"
  },
  {
    id: "PSY_D2_ALIGNMENT",
    layer: 3,
    title: "Ethical-Cognitive Integration & Bias Mitigation",
    statement: "Synthesizing self-reflection with moral axioms to act with intentional virtue despite biological evolutionary biases.",
    summary: "Apex psychological maturity: bridging biological drives with universal ethical stewardship.",
    parentIds: ["PSY_D1_META"],
    status: "ratified"
  }
];
