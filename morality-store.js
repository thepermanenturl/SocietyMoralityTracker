/**
 * MoralityStore — State Manager with LocalStorage Persistence
 * Manages Nodes, Proposals, Discussion Threads, and Governance Voting
 */
class MoralityStore {
  constructor(initialData) {
    this.STORAGE_KEY_NODES = "morality_tree_nodes_v1";
    this.STORAGE_KEY_DISCUSSIONS = "morality_tree_discussions_v4";
    this.STORAGE_KEY_PROPOSALS = "morality_tree_proposals_v1";
    this.STORAGE_KEY_USER = "morality_tree_active_user_v1";

    this.initialData = initialData;
    this.init();
  }

  init() {
    // Load or initialize Nodes
    const savedNodes = localStorage.getItem(this.STORAGE_KEY_NODES);
    if (savedNodes) {
      try {
        this.nodes = JSON.parse(savedNodes);
      } catch (e) {
        this.nodes = [...this.initialData.nodes];
      }
    } else {
      this.nodes = [...this.initialData.nodes];
      this.saveNodes();
    }

    // Load or initialize Discussions
    const savedDiscussions = localStorage.getItem(this.STORAGE_KEY_DISCUSSIONS);
    if (savedDiscussions) {
      try {
        this.discussions = JSON.parse(savedDiscussions);
      } catch (e) {
        this.discussions = this.createDefaultDiscussions();
      }
    } else {
      this.discussions = this.createDefaultDiscussions();
      this.saveDiscussions();
    }

    // Load active user persona
    const savedUser = localStorage.getItem(this.STORAGE_KEY_USER);
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = { name: "Dr. Sofia Chen", role: "Moral Philosopher", avatar: "👩‍🏫" };
      }
    } else {
      this.currentUser = { name: "Dr. Sofia Chen", role: "Moral Philosopher", avatar: "👩‍🏫" };
      this.saveUser();
    }
  }

  createDefaultDiscussions() {
    return {
      "A1": [
        {
          id: "disc-1",
          author: "Dr. Sofia Chen",
          role: "Moral Philosopher",
          avatar: "👩‍🏫",
          type: "supporting",
          content: "Suffering is the irreducible baseline. Without subjective negative experience, no action can be considered harmful.",
          votes: 0,
          userVoted: null,
          timestamp: "2 hours ago",
          status: "vetted_sound",
          debateThread: []
        }
      ],
      "D6": [
        {
          id: "disc-3",
          author: "Elena Rostova",
          role: "Legal Ethicist",
          avatar: "⚖️",
          type: "objection",
          content: "How do we handle psychological harm vs physical harm? Unclear boundaries can lead to over-regulation.",
          votes: 0,
          userVoted: null,
          timestamp: "1 day ago",
          status: "under_review",
          debateThread: []
        }
      ]
    };
  }

  saveNodes() {
    localStorage.setItem(this.STORAGE_KEY_NODES, JSON.stringify(this.nodes));
  }

  saveDiscussions() {
    localStorage.setItem(this.STORAGE_KEY_DISCUSSIONS, JSON.stringify(this.discussions));
  }

  saveUser() {
    localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(this.currentUser));
  }

  getNodes() {
    return this.nodes;
  }

  getNodeById(id) {
    return this.nodes.find(n => n.id === id);
  }

  setUser(user) {
    this.currentUser = user;
    this.saveUser();
  }

  getUser() {
    return this.currentUser;
  }

  // --- DISCUSSION THREADS ---
  getDiscussions(nodeId) {
    return this.discussions[nodeId] || [];
  }

  async addDiscussion(nodeId, type, content, aiEngine, gateway) {
    if (!this.discussions[nodeId]) {
      this.discussions[nodeId] = [];
    }

    const targetNode = this.getNodeById(nodeId);
    let vettingReport = { status: "queued", initialAiAnalysis: "⏳ QUEUED FOR LIVE AI AGENT — Server connection rechecking every 30s..." };
    
    if (aiEngine && typeof aiEngine.vetComment === "function") {
      vettingReport = await aiEngine.vetComment(content, targetNode, gateway || window.aiGateway);
    }

    const newComment = {
      id: `disc-${Date.now()}`,
      author: this.currentUser.name,
      role: this.currentUser.role,
      avatar: this.currentUser.avatar || "👤",
      type: type,
      content: content,
      votes: 0,
      userVoted: null,
      timestamp: "Just now",
      status: vettingReport.status || "queued",
      vettingReport: vettingReport,
      debateThread: [
        {
          id: `msg-ai-init`,
          sender: "AI Vetting Agent",
          role: "Logic Evaluator & Debater",
          avatar: "🤖",
          text: vettingReport.initialAiAnalysis,
          timestamp: "Just now"
        }
      ]
    };

    // If AI recommended a node amendment, create a community ratification proposal vote!
    if (vettingReport.amendmentRecommended) {
      this.addProposedNode({
        title: `Amendment: ${vettingReport.amendmentRecommended}`,
        statement: `Proposed clause amendment arising from public debate on ${targetNode.id}: "${content}"`,
        summary: `Live AI Agent recommended a community vote for amending ${targetNode.title}.`,
        layer: targetNode.layer,
        parentIds: [targetNode.id],
        derivation: `Derived from public discussion on ${targetNode.id}.`
      }, vettingReport);
    }

    this.discussions[nodeId].unshift(newComment);
    this.saveDiscussions();
    return newComment;
  }

  async addDebateMessage(nodeId, commentId, text, aiEngine, gateway) {
    const thread = this.discussions[nodeId];
    if (!thread) return null;

    const comment = thread.find(c => c.id === commentId);
    if (!comment) return null;

    if (!comment.debateThread) comment.debateThread = [];

    // 1. User turn message
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: this.currentUser.name,
      role: this.currentUser.role,
      avatar: this.currentUser.avatar || "👤",
      text: text,
      timestamp: "Just now"
    };
    comment.debateThread.push(userMsg);

    // 2. AI counter-turn response from live server
    let aiTurnResult = {
      aiResponseText: "⏳ QUEUED FOR LIVE AI AGENT — Server connection rechecking every 30s...",
      newStatus: "queued"
    };

    if (aiEngine && typeof aiEngine.generateDebateResponse === "function") {
      const targetNode = this.getNodeById(nodeId);
      aiTurnResult = await aiEngine.generateDebateResponse(comment, targetNode, comment.debateThread, text, gateway || window.aiGateway);
    }

    const aiMsg = {
      id: `msg-${Date.now() + 1}`,
      sender: "AI Vetting Agent",
      role: "Logic Evaluator & Debater",
      avatar: "🤖",
      text: aiTurnResult.aiResponseText,
      timestamp: "Just now"
    };
    comment.debateThread.push(aiMsg);

    if (aiTurnResult.newStatus) {
      comment.status = aiTurnResult.newStatus;
    }

    // Trigger community proposal vote if Live AI Agent flagged a node amendment
    if (aiTurnResult.amendmentRecommended) {
      const targetNode = this.getNodeById(nodeId);
      this.addProposedNode({
        title: `Amendment: ${aiTurnResult.amendmentRecommended}`,
        statement: `Proposed clause amendment arising from public debate: "${text}"`,
        summary: `Live AI Agent recommended a community vote for amending ${targetNode?.title || nodeId}.`,
        layer: targetNode ? targetNode.layer : 1,
        parentIds: [nodeId],
        derivation: `Derived from 1-vs-1 debate.`
      }, { compositeScore: 85, status: "APPROVED_FOR_VOTE" });
    }

    this.saveDiscussions();
    return { comment, userMsg, aiMsg };
  }

  voteDiscussion(nodeId, commentId, direction) {
    const thread = this.discussions[nodeId];
    if (!thread) return;

    const comment = thread.find(c => c.id === commentId);
    if (!comment) return;

    if (comment.userVoted === direction) {
      // Toggle off
      comment.votes += (direction === "up" ? -1 : 1);
      comment.userVoted = null;
    } else {
      if (comment.userVoted === "up") comment.votes -= 1;
      if (comment.userVoted === "down") comment.votes += 1;

      comment.votes += (direction === "up" ? 1 : -1);
      comment.userVoted = direction;
    }

    this.saveDiscussions();
    return comment;
  }

  // --- PROPOSALS & GOVERNANCE ---
  addProposedNode(nodeData, vettingReport) {
    const newNode = {
      ...nodeData,
      id: nodeData.id || `P${this.nodes.length + 1}`,
      status: "proposed", // 'canonical' | 'proposed' | 'disputed'
      proposer: this.currentUser.name,
      vettingReport: vettingReport,
      governanceVotes: { up: 1, down: 0, requiredToRatify: 5 },
      createdAt: new Date().toLocaleDateString()
    };

    this.nodes.push(newNode);
    this.saveNodes();
    return newNode;
  }

  voteProposal(nodeId, direction) {
    const node = this.getNodeById(nodeId);
    if (!node || node.status !== "proposed") return null;

    if (!node.userVote) {
      if (direction === "up") node.governanceVotes.up += 1;
      if (direction === "down") node.governanceVotes.down += 1;
      node.userVote = direction;
    }

    // Check Ratification Threshold
    if (node.governanceVotes.up >= node.governanceVotes.requiredToRatify) {
      node.status = "canonical";
      delete node.userVote;
    }

    this.saveNodes();
    return node;
  }

  resetToDefaults() {
    localStorage.removeItem(this.STORAGE_KEY_NODES);
    localStorage.removeItem(this.STORAGE_KEY_DISCUSSIONS);
    this.init();
  }
}
