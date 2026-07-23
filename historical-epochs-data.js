/**
 * HISTORICAL_EPOCHS_DATA — 2500-Year Historical Precedent & Societal Unrest Database (500 BCE - Present)
 * Connects 2500 years of global human history, societal blindspots, and unrest levels directly to Morality Tree Nodes.
 */
const HISTORICAL_EPOCHS_DATA = {
  epoch1: {
    id: "epoch1",
    name: "Classical Antiquity & Early Legal Codes",
    years: "500 BCE – 500 CE",
    startYear: -500,
    endYear: 500,
    summary: "Emergence of written legal codes and early democracy, juxtaposed with systemic chattel slavery and disenfranchisement of women.",
    unrestScore: 72,
    unrestCause: "Institutional slavery, plebeian revolts, imperial conquests, and complete denial of bodily autonomy to marginalized classes.",
    societalBlindspots: [
      {
        society: "Athenian Direct Democracy (5th C. BCE)",
        missingRights: "Voting restricted to free adult males (~15% of population). Women, slaves, and resident foreigners (metics) completely excluded.",
        nodes: ["A4", "A6", "D4"]
      },
      {
        society: "Roman Republic & Empire (450 BCE - 476 CE)",
        missingRights: "Patrician monopoly over law, gladiatorial execution, legal ownership of humans, and crucifixion of dissidents.",
        nodes: ["A1", "D2", "D6"]
      },
      {
        society: "Mauryan Empire under Ashoka (268–232 BCE)",
        upholdingAchievement: "Edicts of Ashoka: State-sponsored Ahimsa (non-harm), free medical care for humans/animals, and religious tolerance.",
        nodes: ["A1", "A5", "D7"]
      }
    ],
    violatedNodes: ["A1", "A4", "A6", "D2", "D6"],
    upheldNodes: ["A5", "D7", "D8"],
    keyNodes: ["A1", "A4", "A6", "D2", "D6", "D7", "D8"]
  },
  epoch2: {
    id: "epoch2",
    name: "Post-Classical & Feudal Era",
    years: "500 CE – 1400 CE",
    startYear: 500,
    endYear: 1400,
    summary: "Feudal serfdom, religious dogmatism, and dynastic rule, countered by early constitutional charters and scientific golden ages.",
    unrestScore: 65,
    unrestCause: "Religious wars (Crusades), feudal serfdom, inquisitions, and royal monopolies on truth and expression.",
    societalBlindspots: [
      {
        society: "Feudal Europe & Manorialism (900 - 1300 CE)",
        missingRights: "Serfs bound to land without bodily autonomy, subject to lordly taxation, arbitrary justice, and trial by ordeal.",
        nodes: ["A4", "D2", "D8"]
      },
      {
        society: "Magna Carta (England, 1215 CE)",
        upholdingAchievement: "First formal limitation on royal tyranny; established due process and protection against unlawful imprisonment.",
        nodes: ["D8", "A4", "A6"]
      },
      {
        society: "Abbasid House of Wisdom (750 - 1258 CE)",
        upholdingAchievement: "Multicultural scholarship translating Greek, Persian, and Indian philosophical texts into Arabic.",
        nodes: ["D4", "D7"]
      }
    ],
    violatedNodes: ["A4", "D2", "D4", "D8"],
    upheldNodes: ["A6", "D7"],
    keyNodes: ["A4", "D2", "D4", "D7", "D8"]
  },
  epoch3: {
    id: "epoch3",
    name: "Enlightenment & Colonial Revolutions",
    years: "1400 CE – 1800 CE",
    startYear: 1400,
    endYear: 1800,
    summary: "Information explosion via the printing press and Enlightenment autonomy theories, marred by transatlantic slave trade and colonial looting.",
    unrestScore: 84,
    unrestCause: "Transatlantic slave trade, imperial colonial subjugation of indigenous peoples, and bloody anti-monarchical revolutions.",
    societalBlindspots: [
      {
        society: "Colonial Empires in Asia & Americas (1600 - 1800)",
        missingRights: "Forced extraction of wealth, destruction of indigenous self-governance, and systemic dehumanization.",
        nodes: ["A4", "A6", "D6", "D8"]
      },
      {
        society: "US Declaration of Independence (1776)",
        missingRights: "Proclaimed 'all men are created equal' while preserving chattel slavery and denying rights to women and Native Americans.",
        nodes: ["A6", "A4"]
      },
      {
        society: "French Declaration of the Rights of Man (1789)",
        upholdingAchievement: "Codified universal liberty, equality, resistance to oppression, and freedom of speech as natural rights.",
        nodes: ["A4", "A6", "D4"]
      }
    ],
    violatedNodes: ["A4", "A6", "D6", "D8"],
    upheldNodes: ["D4", "D8"],
    keyNodes: ["A4", "A6", "D4", "D6", "D8"]
  },
  epoch4: {
    id: "epoch4",
    name: "Industrialization & Universal Rights",
    years: "1800 CE – 1945 CE",
    startYear: 1800,
    endYear: 1945,
    summary: "Industrial revolution, labor movements, women's suffrage, and abolitionism, punctuated by World Wars and fascism.",
    unrestScore: 91,
    unrestCause: "Total war, industrial child labor, fascist totalitarianism, Holocaust, and nuclear devastation.",
    societalBlindspots: [
      {
        society: "Industrial Factories (19th C. Western Nations)",
        missingRights: "16-hour workdays for child laborers, unsafe mine conditions, zero injury compensation, and suppression of labor unions.",
        nodes: ["A1", "A5", "D2"]
      },
      {
        society: "Fascist Totalitarian Regimes (1930s - 1945)",
        missingRights: "State-orchestrated genocide, destruction of press freedom, total bodily subversion, and aggressive war.",
        nodes: ["A1", "A4", "D2", "D4", "D6"]
      },
      {
        society: "Universal Declaration of Human Rights (1948)",
        upholdingAchievement: "First global consensus establishing non-negotiable human rights to life, dignity, asylum, and judicial fairness.",
        nodes: ["A1", "A4", "A5", "A6", "D2", "D4", "D8"]
      }
    ],
    violatedNodes: ["A1", "A4", "D2", "D4", "D6"],
    upheldNodes: ["A5", "A6", "D8"],
    keyNodes: ["A1", "A4", "A5", "A6", "D2", "D4", "D6", "D8"]
  },
  epoch5: {
    id: "epoch5",
    name: "Contemporary & Digital AI Age",
    years: "1945 CE – 2026 CE",
    startYear: 1945,
    endYear: 2026,
    summary: "Decolonization, internet ubiquity, digital privacy dilemmas, climate crises, and algorithmic governance.",
    unrestScore: 78,
    unrestCause: "Surveillance capitalism, climate degradation, rising economic inequality, misinformation networks, and algorithmic bias.",
    societalBlindspots: [
      {
        society: "Digital Mass Surveillance & Data Monopolies",
        missingRights: "Unconsented harvesting of personal data, algorithmic profiling, and erosion of digital bodily/cognitive privacy.",
        nodes: ["A4", "D4", "E5"]
      },
      {
        society: "Global Climate Disruption & Resource Exhaustion",
        missingRights: "Unchecked industrial carbon emissions disproportionately harming vulnerable global populations and future generations.",
        nodes: ["A1", "A5", "D6"]
      },
      {
        society: "Modern Indian Constitutional Jurisprudence (Puttaswamy 2017)",
        upholdingAchievement: "Supreme Court declared Privacy a Fundamental Right under Article 21 (Right to Life & Liberty).",
        nodes: ["A4", "D2", "E5"]
      }
    ],
    violatedNodes: ["A1", "A4", "D6", "E5"],
    upheldNodes: ["A5", "A6", "D2", "D4", "D8"],
    keyNodes: ["A1", "A4", "A5", "A6", "D2", "D4", "D6", "D8", "E5"]
  }
};

if (typeof window !== "undefined") {
  window.HISTORICAL_EPOCHS_DATA = HISTORICAL_EPOCHS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = HISTORICAL_EPOCHS_DATA;
}
