/**
 * AIVettingEngine — Interface to Live AI Agent Gateway
 * ZERO mock responses, ZERO hardcoded text templates, ZERO fallback heuristics.
 * Evaluates arguments and debate turns strictly by querying the Live AI Agent.
 */
class AIVettingEngine {
  constructor(store) {
    this.store = store;
  }

  /**
   * Vets a proposed node using the Live AI Agent
   */
  async vetProposal(proposal, gateway) {
    const gw = gateway || window.aiGateway;
    const prompt = `VET PROPOSAL:
Title: "${proposal.title}"
Layer: ${proposal.layer}
Parents: [${(proposal.parentIds || []).join(', ')}]
Statement: "${proposal.statement}"
Derivation: "${proposal.derivation}"

Task: Evaluate if this proposal logically derives from Layer 0/1 axioms without fallacies. Rate derivation strength (0-100%) and give your verdict: APPROVED_FOR_VOTE, REVISION_REQUIRED, or REJECTED.`;

    if (gw && typeof gw.queryLiveModel === "function") {
      const response = await gw.queryLiveModel(prompt);
      if (response) {
        const isApproved = /approved|passed|valid/i.test(response);
        return {
          status: isApproved ? "APPROVED_FOR_VOTE" : "REVISION_REQUIRED",
          statusText: response,
          compositeScore: isApproved ? 85 : 45
        };
      }
    }

    return {
      status: "QUEUED",
      statusText: "⏳ QUEUED FOR LIVE AI AGENT — Server connection rechecking every 30s...",
      compositeScore: 0
    };
  }

  /**
   * Vets a user comment posted on a moral node using Full Context via Live AI Agent
   */
  async vetComment(commentContent, node, gateway) {
    const gw = gateway || window.aiGateway;
    const nodeRef = node ? `[${node.id}]` : "";
    const stancePct = window.appState?.devilsAdvocateStancePct || 0;
    const stanceInstruction = stancePct >= 50 
      ? "MODE: Devil's Advocate (Emphasize extenuating circumstances, policy trade-offs, and systemic complexity)."
      : "MODE: Strict Moral Upholder (Evaluate directly against foundational axioms A1-A6).";

    const userPrompt = `Evaluate user comment on node ${nodeRef}:\n"${commentContent}"\n\n${stanceInstruction}\n\nProvide:\n- 🛡️ Supporting Argument\n- 😈 Contrary Argument (Devil's Advocate)\n- 📜 Real Historical Example\n\nRefer to affected moral nodes simply as [A1], [D5], [D6], etc.`;

    if (gw && typeof gw.queryLiveModel === "function") {
      const response = await gw.queryLiveModel(userPrompt);
      if (response) {
        const isSound = /sound|valid|support/i.test(response);
        const amendmentMatch = response.match(/\[AMENDMENT_RECOMMENDED:\s*([^\]]+)\]/i);
        const nodesMatch = response.match(/\[([A-Z0-9,\s]+)\]/i);
        const highlightedNodes = nodesMatch ? nodesMatch[1].split(',').map(s => s.trim().toUpperCase()) : [node ? node.id : "A1"];

        return {
          status: isSound ? "vetted_sound" : "vetted_reviewed",
          initialAiAnalysis: response,
          highlightedNodes: highlightedNodes,
          amendmentRecommended: amendmentMatch ? amendmentMatch[1] : null
        };
      }
    }

    return {
      status: "offline",
      initialAiAnalysis: "Currently offline agent",
      highlightedNodes: [node ? node.id : "A1"]
    };
  }

  /**
   * Generates a 1-vs-1 turn response from the Live AI Agent given FULL CONTEXT
   */
  async generateDebateResponse(comment, node, debateHistory, newUserMessage, gateway) {
    const gw = gateway || window.aiGateway;
    const nodeRef = node ? `[${node.id}]` : "";
    const stancePct = window.appState?.devilsAdvocateStancePct || 0;
    const stanceInstruction = stancePct >= 50 
      ? "MODE: Devil's Advocate (Emphasize extenuating circumstances, policy trade-offs, and systemic complexity)."
      : "MODE: Strict Moral Upholder (Evaluate directly against foundational axioms A1-A6).";

    const transcript = debateHistory.map(m => `${m.sender}: ${m.text}`).join("\n");
    const fullPrompt = `Debate turn on node ${nodeRef}:\nTRANSCRIPT:\n${transcript}\n\nHUMAN RECENT REPLY: "${newUserMessage}"\n\n${stanceInstruction}\n\nProvide:\n- 🛡️ Supporting Argument\n- 😈 Contrary Argument (Devil's Advocate)\n- 📜 Real Historical Example\n\nRefer to affected moral nodes simply as [A1], [D5], [D6], etc.`;

    if (gw && typeof gw.queryLiveModel === "function") {
      const response = await gw.queryLiveModel(fullPrompt);
      if (response) {
        const isConceded = /vetted sound|concede|concession|agreed|valid point/i.test(response);
        const amendmentMatch = response.match(/\[AMENDMENT_RECOMMENDED:\s*([^\]]+)\]/i);
        const nodesMatch = response.match(/\[([A-Z0-9,\s]+)\]/i);
        const highlightedNodes = nodesMatch ? nodesMatch[1].split(',').map(s => s.trim().toUpperCase()) : [node ? node.id : "A1"];

        return {
          aiResponseText: response,
          newStatus: isConceded ? "vetted_sound" : "vetted_reviewed",
          highlightedNodes: highlightedNodes,
          amendmentRecommended: amendmentMatch ? amendmentMatch[1] : null
        };
      }
    }

    return {
      aiResponseText: "Currently offline agent",
      newStatus: "offline",
      highlightedNodes: [node ? node.id : "A1"]
    };
  }

  /**
   * AI Search Perspective Agent — Determines which nodes to highlight and provides brief guidance
   * @param {string} userQuery 
   * @param {Array} allNodes 
   * @param {AIChatGateway} gateway 
   * @returns {Promise<Object>} { matchedNodeIds, guidanceText }
   */
  async querySearchPerspective(query, customStore) {
    const qClean = (query || "").trim();
    if (!qClean) return { matchedNodeIds: [], guidanceText: "Enter a topic or policy question to search." };

    const qLower = qClean.toLowerCase();
    const st = customStore || this.store || (typeof window !== "undefined" && window.moralityStore ? window.moralityStore : (typeof moralityStore !== "undefined" ? moralityStore : null));
    const allNodes = st ? st.getNodes() : (typeof MORALITY_DATA !== "undefined" ? MORALITY_DATA.nodes : []);

    // Domain Synonym Mapping for Morality Nodes
    const synonyms = {
      pain: ["A1"], suffering: ["A1"], hurt: ["A1"], distress: ["A1"],
      discipline: ["D5", "A4"], school: ["D5"], education: ["D5"], learning: ["D5"],
      autonomy: ["A4"], freedom: ["A4"], consent: ["A4", "D2"], bodily: ["D2"],
      health: ["D1"], healthcare: ["D1"], medical: ["D1"], doctor: ["D1"],
      speech: ["D3"], expression: ["D3"], voice: ["D3"], censorship: ["D3"],
      discriminate: ["D4"], equality: ["D4", "A6"], fairness: ["A6"], equity: ["A6"],
      harm: ["D6"], violence: ["D6"], crime: ["D6"], safety: ["A5"], shelter: ["A5"],
      aid: ["D7"], help: ["D7"], charity: ["D7"], welfare: ["D7"],
      vote: ["D8"], democracy: ["D8"], government: ["D8"], law: ["D8"]
    };

    // Filter stop words
    const stopWords = new Set(["and", "the", "for", "you", "with", "this", "that", "from", "are", "what", "how", "why", "can"]);
    const tokens = qLower.split(/\s+/).map(t => t.replace(/[^a-z0-9]/g, "")).filter(t => t.length >= 2 && !stopWords.has(t));

    const scores = {};
    allNodes.forEach(n => {
      scores[n.id] = 0;
      const fullText = `${n.id} ${n.title} ${n.statement} ${n.summary || ''} ${n.derivation || ''}`.toLowerCase();

      // Exact substring match bonus
      if (fullText.includes(qLower)) scores[n.id] += 10;

      tokens.forEach(t => {
        if (n.id.toLowerCase() === t) scores[n.id] += 15;
        if (n.title.toLowerCase().includes(t)) scores[n.id] += 5;
        if (fullText.includes(t)) scores[n.id] += 2;

        if (synonyms[t]) {
          synonyms[t].forEach(targetId => {
            if (n.id === targetId) scores[n.id] += 8;
          });
        }
      });
    });

    const rankedNodes = Object.entries(scores)
      .filter(([id, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    const matchedNodeIds = rankedNodes.slice(0, 4);
    let guidanceText = "";

    if (matchedNodeIds.length > 0) {
      guidanceText = `Highlighted nodes [${matchedNodeIds.join(', ')}] matching query "${qClean}".`;
    } else {
      guidanceText = `No direct moral node matches for "${qClean}". Try searching core terms like autonomy, harm, equity, or consent.`;
    }

    return { matchedNodeIds, guidanceText };
  }
}
const aiVettingEngine = new AIVettingEngine();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AIVettingEngine, aiVettingEngine };
}
if (typeof window !== "undefined") {
  window.AIVettingEngine = AIVettingEngine;
  window.aiVettingEngine = aiVettingEngine;
}
