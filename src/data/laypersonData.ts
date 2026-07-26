import { PrimitiveRoot } from '../types/morality';

export const PRIMITIVE_ROOTS: Record<string, PrimitiveRoot> = {
  P1_HARM: {
    id: "P1_HARM",
    name: "Non-Harm & Suffering Avoidance",
    tagline: "Pain hurts, and avoiding unnecessary suffering is a universally shared starting point.",
    icon: "🛡️",
    color: "#10b981",
    citation: "Peter Singer (The Expanding Circle) & Buddhist Ahimsa",
    waysToLive: [
      { area: "🏠 At Home", action: "Actively listen when someone expresses distress; never dismiss physical or emotional pain." },
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
};
