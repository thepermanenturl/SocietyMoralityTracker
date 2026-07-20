/**
 * NodeDetailInspector — Side Drawer Controller for Node Details, Discussions & Governance
 */
class NodeDetailInspector {
  constructor(panelId, store, aiEngine) {
    this.panel = document.getElementById(panelId);
    this.store = store;
    this.aiEngine = aiEngine;
    this.currentNode = null;
    this.onNavigateCallback = null;
    this.onStoreUpdateCallback = null;
    this.activePerspective = "none";
    this.openDebateCommentId = null; // Track expanded debate drawer

    // Elements
    this.closeBtn = document.getElementById("close-panel");
    this.layerBadge = document.getElementById("panel-layer-badge");
    this.nodeIdTag = document.getElementById("panel-node-id");
    this.statusBadge = document.getElementById("panel-status-badge");
    this.titleEl = document.getElementById("panel-title");
    this.summaryEl = document.getElementById("panel-summary");
    this.statementEl = document.getElementById("panel-statement");
    this.derivationChainEl = document.getElementById("panel-derivation-chain");
    this.derivationTextEl = document.getElementById("panel-derivation-text");

    this.evidenceHistory = document.getElementById("panel-evidence-history");
    this.evidenceScience = document.getElementById("panel-evidence-science");
    this.evidencePsychology = document.getElementById("panel-evidence-psychology");

    this.counterListEl = document.getElementById("panel-counterarguments");
    this.frameworksEl = document.getElementById("panel-frameworks");

    // Governance Elements
    this.governanceBox = document.getElementById("governance-box");
    this.aiReportSummary = document.getElementById("ai-report-summary");
    this.voteRatifyBtn = document.getElementById("vote-ratify-btn");
    this.voteRejectBtn = document.getElementById("vote-reject-btn");
    this.voteCountUp = document.getElementById("vote-count-up");

    // Discussion Elements
    this.discussionCountTag = document.getElementById("discussion-count-tag");
    this.commentInput = document.getElementById("comment-input");
    this.postCommentBtn = document.getElementById("post-comment-btn");
    this.discussionListEl = document.getElementById("discussion-list");

    // Perspective Elements
    this.perspectiveConstitution = document.getElementById("perspective-constitution");
    this.perspectiveModernBuddha = document.getElementById("perspective-modernBuddha");
    this.perspectiveWangchuk = document.getElementById("perspective-wangchuk");
    this.perspectiveCritic = document.getElementById("perspective-critic");

    this.setupListeners();
    this.setupPerspectiveListeners();
  }

  onNavigate(fn) { this.onNavigateCallback = fn; }
  onStoreUpdate(fn) { this.onStoreUpdateCallback = fn; }

  setupListeners() {
    this.closeBtn.addEventListener("click", () => this.close());

    // Evidence Tabs
    const tabBtns = this.panel.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetTab = btn.getAttribute("data-tab");
        const panes = this.panel.querySelectorAll(".tab-pane");
        panes.forEach(pane => {
          pane.classList.toggle("active", pane.id === `tab-${targetTab}`);
        });
      });
    });

    // Discussion Post
    this.postCommentBtn.addEventListener("click", async () => {
      if (!this.currentNode) return;
      const content = this.commentInput.value.trim();
      if (!content) return;

      this.postCommentBtn.disabled = true;
      this.commentInput.disabled = true;

      const selectedType = this.panel.querySelector('input[name="comment-type"]:checked').value;
      const newComment = await this.store.addDiscussion(this.currentNode.id, selectedType, content, this.aiEngine, window.aiGateway);

      this.commentInput.value = "";
      this.commentInput.disabled = false;
      this.postCommentBtn.disabled = false;

      // Highlight nodes on global SVG screen returned by AI Agent workflow
      if (newComment.vettingReport && newComment.vettingReport.highlightedNodes && window.treeRenderer) {
        window.treeRenderer.setAISearchHighlights(newComment.vettingReport.highlightedNodes);
      }

      this.openDebateCommentId = newComment.id; // Automatically open debate drawer for newly posted comment
      this.renderDiscussions(this.currentNode.id);
    });

    // Governance Ratify Vote
    this.voteRatifyBtn.addEventListener("click", () => {
      if (!this.currentNode || this.currentNode.status !== "proposed") return;
      const updatedNode = this.store.voteProposal(this.currentNode.id, "up");
      if (updatedNode) {
        this.show(updatedNode);
        if (this.onStoreUpdateCallback) this.onStoreUpdateCallback();
      }
    });

    this.voteRejectBtn.addEventListener("click", () => {
      if (!this.currentNode || this.currentNode.status !== "proposed") return;
      const updatedNode = this.store.voteProposal(this.currentNode.id, "down");
      if (updatedNode) {
        this.show(updatedNode);
        if (this.onStoreUpdateCallback) this.onStoreUpdateCallback();
      }
    });
  }

  show(node) {
    if (!node) {
      this.close();
      return;
    }

    this.currentNode = node;

    // Layer badge styling
    const layerNames = ["Layer 0: Axiom", "Layer 1: Principle", "Layer 2: Applied", "Layer 3: Dilemma"];
    this.layerBadge.textContent = layerNames[node.layer] || `Layer ${node.layer}`;
    this.layerBadge.className = `badge l${node.layer}`;

    this.nodeIdTag.textContent = node.id;
    this.titleEl.textContent = node.title;
    this.summaryEl.textContent = node.summary || "";
    this.statementEl.textContent = node.statement;
    this.derivationTextEl.textContent = node.derivation || "";

    // Status Badge & Governance Box
    if (node.status === "proposed") {
      this.statusBadge.classList.remove("hidden");
      this.statusBadge.textContent = "PROPOSED";
      this.governanceBox.classList.remove("hidden");
      
      const vReport = node.vettingReport || {};
      this.aiReportSummary.innerHTML = `
        <div style="margin-bottom:6px;"><strong>AI Score: ${vReport.compositeScore || 85}%</strong> — <span style="color:${vReport.statusColor || '#10b981'}">${vReport.statusText || 'Passed Vetting'}</span></div>
        <div><strong>Proposer:</strong> ${node.proposer || 'Community'}</div>
        <div><strong>Strengths:</strong> ${(vReport.strengths || []).join(' ')}</div>
      `;
      this.voteCountUp.textContent = node.governanceVotes?.up || 0;
    } else {
      this.statusBadge.classList.add("hidden");
      this.governanceBox.classList.add("hidden");
    }

    // Build Ancestry Breadcrumbs
    this.renderAncestryBreadcrumbs(node);

    // Evidence
    this.evidenceHistory.textContent = node.evidence?.history || "No historical evidence logged yet.";
    this.evidenceScience.textContent = node.evidence?.science || "No scientific evidence logged yet.";
    this.evidencePsychology.textContent = node.evidence?.psychology || "No psychological evidence logged yet.";

    // Counterarguments
    this.counterListEl.innerHTML = "";
    if (node.counterarguments && node.counterarguments.length > 0) {
      node.counterarguments.forEach(item => {
        const div = document.createElement("div");
        div.className = "counter-item";
        div.innerHTML = `
          <div class="objection-title">&bull; ${item.objection}</div>
          <div class="response-text"><strong>Response:</strong> ${item.response}</div>
        `;
        this.counterListEl.appendChild(div);
      });
    } else {
      this.counterListEl.innerHTML = `<p class="response-text" style="padding-left:0;">No baseline objections logged.</p>`;
    }

    // Framework Tags
    this.frameworksEl.innerHTML = "";
    if (node.frameworks && node.frameworks.length > 0) {
      node.frameworks.forEach(fw => {
        const tag = document.createElement("span");
        tag.className = "framework-tag";
        tag.textContent = fw;
        this.frameworksEl.appendChild(tag);
      });
    }

    // Render discussions and open discussions tab by default if comments exist
    this.renderDiscussions(node.id);

    // Switch active tab to discussions
    const tabBtns = this.panel.querySelectorAll(".tab-btn");
    tabBtns.forEach(b => {
      const isDisc = b.getAttribute("data-tab") === "discussions";
      b.classList.toggle("active", isDisc);
    });

    const panes = this.panel.querySelectorAll(".tab-pane");
    panes.forEach(pane => {
      pane.classList.toggle("active", pane.id === "tab-discussions");
    });

    // Render perspective content overlays
    this.renderPerspectives(node.id);

    this.panel.classList.add("open");
  }

  close() {
    this.currentNode = null;
    this.panel.classList.remove("open");
    if (window.treeRenderer) {
      window.treeRenderer.deselectNode();
    }
    if (typeof window.updateDrawerLayout === "function") {
      window.updateDrawerLayout();
    }
  }

  renderAncestryBreadcrumbs(node) {
    this.derivationChainEl.innerHTML = "";

    if (!node.parentIds || node.parentIds.length === 0) {
      this.derivationChainEl.innerHTML = `<span class="breadcrumb-pill l0">Foundational Axiom (Root)</span>`;
      return;
    }

    node.parentIds.forEach((parentId, index) => {
      const parentNode = this.store.getNodeById(parentId);
      if (!parentNode) return;

      if (index > 0) {
        const arrow = document.createElement("span");
        arrow.className = "breadcrumb-arrow";
        arrow.textContent = "+";
        this.derivationChainEl.appendChild(arrow);
      }

      const pill = document.createElement("button");
      pill.className = `breadcrumb-pill l${parentNode.layer}`;
      pill.textContent = `${parentNode.id}: ${parentNode.title}`;

      pill.addEventListener("click", () => {
        if (this.onNavigateCallback) this.onNavigateCallback(parentNode.id);
      });

      this.derivationChainEl.appendChild(pill);
    });
  }

  renderDiscussions(nodeId) {
    const comments = this.store.getDiscussions(nodeId);
    this.discussionCountTag.textContent = `${comments.length} comments`;
    this.discussionListEl.innerHTML = "";

    if (comments.length === 0) {
      this.discussionListEl.innerHTML = `<p style="font-size:0.8rem; color:var(--text-dim);">No arguments posted yet. Be the first to start the debate!</p>`;
      return;
    }

    comments.forEach(c => {
      const isUnderReview = c.status === "under_review" || !c.status;
      const isVettedSound = c.status === "vetted_sound";
      const isDebateOpen = this.openDebateCommentId === c.id;

      const card = document.createElement("div");
      card.className = `comment-card ${isUnderReview ? 'under-review' : ''}`;
      
      // Build Status Badge
      let statusStampHtml = "";
      if (isUnderReview) {
        statusStampHtml = `<span class="review-stamp-badge under-review" title="AI Vetting Agent is assessing logical soundness">⏳ UNDER REVIEW</span>`;
      } else if (isVettedSound) {
        statusStampHtml = `<span class="review-stamp-badge vetted-sound" title="Passed AI Logical Vetting">✅ VETTED SOUND</span>`;
      } else {
        statusStampHtml = `<span class="review-stamp-badge disputed" title="Logical flaws identified under Layer 0">⚠️ DISPUTED</span>`;
      }

      card.innerHTML = `
        <div class="comment-meta">
          <div class="author-info">
            <span>${c.avatar || '👤'}</span>
            <strong>${c.author}</strong>
            <span style="color:var(--text-dim); font-size:0.7rem;">(${c.role})</span>
          </div>
          <div class="meta-right">
            ${statusStampHtml}
            <span class="comment-type-badge ${c.type}">${c.type}</span>
          </div>
        </div>
        <div class="comment-content">${c.content}</div>
        <div class="comment-actions">
          <button class="vote-btn ${c.userVoted === 'up' ? 'active' : ''}" data-id="${c.id}">
            ▲ ${c.votes}
          </button>
          <span>${c.timestamp}</span>
          <button class="toggle-debate-btn ${isDebateOpen ? 'active' : ''}">
            💬 AI Debate Forum (${(c.debateThread || []).length})
          </button>
        </div>

        <!-- 1-vs-1 Public vs AI Debate Drawer -->
        <div class="debate-drawer ${isDebateOpen ? 'open' : 'hidden'}">
          <div class="debate-header">
            <span>🤖 1-vs-1 AI Vetting Agent Debate</span>
            <span class="turn-indicator">Max 1 turn / 1 response</span>
          </div>
          <div class="debate-thread-messages"></div>
          <div class="debate-input-row">
            <input type="text" class="debate-reply-input" placeholder="Respond to AI in support or against (1-vs-1 turn)..." autocomplete="off">
            <button class="btn-primary send-debate-reply-btn">Reply</button>
          </div>
        </div>
      `;

      // Upvote listener
      card.querySelector(".vote-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.store.voteDiscussion(nodeId, c.id, "up");
        this.renderDiscussions(nodeId);
      });

      // Toggle Debate Drawer
      const toggleDebateBtn = card.querySelector(".toggle-debate-btn");
      const debateDrawer = card.querySelector(".debate-drawer");

      toggleDebateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openDebateCommentId = isDebateOpen ? null : c.id;
        this.renderDiscussions(nodeId);
      });

      // Render Debate Messages
      const debateMessagesContainer = card.querySelector(".debate-thread-messages");
      const debateThread = c.debateThread || [];

      if (debateThread.length === 0) {
        debateMessagesContainer.innerHTML = `<div class="debate-empty-hint">No debate messages yet. Ask the AI Vetting Agent to clarify!</div>`;
      } else {
        debateThread.forEach(msg => {
          const msgDiv = document.createElement("div");
          const isAi = msg.sender.includes("AI");
          msgDiv.className = `debate-msg-bubble ${isAi ? 'ai-agent' : 'public-user'}`;
          msgDiv.innerHTML = `
            <div class="msg-author-tag">
              <span>${msg.avatar || (isAi ? '🤖' : '👤')}</span>
              <strong>${msg.sender}</strong>
              <span class="time">${msg.timestamp}</span>
            </div>
            <div class="msg-body">${msg.text}</div>
          `;
          debateMessagesContainer.appendChild(msgDiv);
        });
      }

      // Debate Reply Submission
      const replyInput = card.querySelector(".debate-reply-input");
      const sendReplyBtn = card.querySelector(".send-debate-reply-btn");

      const handleReplySubmit = async () => {
        const replyText = replyInput.value.trim();
        if (!replyText) return;

        replyInput.value = "";
        replyInput.disabled = true;
        sendReplyBtn.disabled = true;

        const result = await this.store.addDebateMessage(nodeId, c.id, replyText, this.aiEngine, window.aiGateway);

        // Highlight nodes on global SVG screen returned by AI Agent workflow
        if (result && result.aiMsg && window.treeRenderer) {
          const nodesMatch = (result.aiMsg.text || "").match(/\[([A-Z0-9,\s]+)\]/i);
          if (nodesMatch) {
            const nodeIds = nodesMatch[1].split(',').map(s => s.trim().toUpperCase());
            window.treeRenderer.setAISearchHighlights(nodeIds);
          }
        }

        this.renderDiscussions(nodeId);
      };

      sendReplyBtn.addEventListener("click", handleReplySubmit);
      replyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleReplySubmit();
      });

      this.discussionListEl.appendChild(card);
    });
  }


  close() {
    this.panel.classList.remove("open");
    this.currentNode = null;
    this.hidePerspectives();
    this.activePerspective = "none";
    if (this.perspectiveDropdown) {
      this.perspectiveDropdown.value = "none";
    }
  }

  setPerspective(perspective) {
    this.activePerspective = perspective;

    if (this.perspectiveDropdown && this.perspectiveDropdown.value !== perspective) {
      this.perspectiveDropdown.value = perspective;
    }

    if (this.currentNode) {
      this.renderPerspectives(this.currentNode.id);
    }
  }

  setupPerspectiveListeners() {
    this.perspectiveDropdown = document.getElementById("perspective-dropdown");
    if (this.perspectiveDropdown) {
      this.perspectiveDropdown.addEventListener("change", (e) => {
        this.setPerspective(e.target.value);
      });
    }
  }

  hidePerspectives() {
    const pNone = document.getElementById("perspective-none");
    if (pNone) pNone.classList.add("hidden");
    if (this.perspectiveConstitution) this.perspectiveConstitution.classList.add("hidden");
    if (this.perspectiveModernBuddha) this.perspectiveModernBuddha.classList.add("hidden");
    if (this.perspectiveWangchuk) this.perspectiveWangchuk.classList.add("hidden");
    if (this.perspectiveCritic) this.perspectiveCritic.classList.add("hidden");
  }

  renderPerspectives(nodeId) {
    const nodePersp = (typeof window.PERSPECTIVES_DATA !== "undefined" && window.PERSPECTIVES_DATA) ? window.PERSPECTIVES_DATA[nodeId] : null;
    const perspective = this.activePerspective;

    // Hide all perspective cards first
    [this.perspectiveConstitution, this.perspectiveModernBuddha, this.perspectiveWangchuk, this.perspectiveCritic, document.getElementById("perspective-none")]
      .forEach(el => { if (el) el.classList.add("hidden"); });

    // Default / "None" perspective -> Show Daily Dilemma
    if (perspective === "none") {
      const pNone = document.getElementById("perspective-none");
      if (pNone && nodePersp?.dailyDilemma) {
        const d = nodePersp.dailyDilemma;
        document.getElementById("persp-dilemma-scenario").textContent = d.scenario || "Navigating complex ethical choices in daily personal or professional life.";
        document.getElementById("persp-dilemma-clarity").textContent = d.clarity || "Grounding decisions in this moral axiom removes ambiguity and guides principled action.";
        pNone.classList.remove("hidden");
      }
      return;
    }

    if (!nodePersp) return;

    if (perspective === "constitution" && nodePersp.constitution && this.perspectiveConstitution) {
      const d = nodePersp.constitution;
      document.getElementById("persp-const-article").textContent = d.article || "";
      document.getElementById("persp-const-excerpt").textContent = d.excerpt || "";
      document.getElementById("persp-const-promise").textContent = d.promise || "";

      // Implementation Meter & Enforcement Instance
      const meter = d.implementationMeter || { percentage: 65, label: "65% — Moderate Ground Reach" };
      const meterFill = document.getElementById("persp-const-meter-fill");
      const meterPct = document.getElementById("persp-const-meter-pct");
      const meterLabel = document.getElementById("persp-const-meter-label");

      if (meterFill) meterFill.style.width = `${meter.percentage}%`;
      if (meterPct) meterPct.textContent = `${meter.percentage}%`;
      if (meterLabel) meterLabel.textContent = meter.label || `${meter.percentage}% Implementation Level`;

      const enforcementEl = document.getElementById("persp-const-enforcement");
      if (enforcementEl) {
        enforcementEl.textContent = d.enforcementInstance || "Enforced across landmark high court rulings and central executive programs.";
      }

      this.perspectiveConstitution.classList.remove("hidden");
    }

    if (perspective === "modernBuddha" && nodePersp.modernBuddha && this.perspectiveModernBuddha) {
      const d = nodePersp.modernBuddha;
      document.getElementById("persp-buddha-value").textContent = d.value || "";
      document.getElementById("persp-buddha-name").textContent = d.name || "";
      document.getElementById("persp-buddha-year").textContent = d.year ? `c. ${d.year}` : "";
      document.getElementById("persp-buddha-story").textContent = d.humanStory || "";

      // Wikipedia Link
      const wikiBtn = document.getElementById("persp-buddha-wiki-link");
      if (wikiBtn) {
        wikiBtn.href = d.wikiUrl || `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(d.name)}`;
      }

      this.perspectiveModernBuddha.classList.remove("hidden");
    }

    if (perspective === "wangchuk" && this.perspectiveWangchuk) {
      const d = nodePersp.wangchuk || {
        value: "Environmental Stewardship & Selfless Resistance",
        innovations: "Invented Ice Stupa artificial glaciers to solve spring desert water scarcity and SECMOL zero-carbon solar mud architecture.",
        struggles: "Endured 21-day climate fasts at -15°C in Leh and Delhi border detention (Oct 2024) demanding 6th Schedule ecological safeguards for Himalayan ecosystems.",
        name: "Sonam Wangchuk",
        year: 2024,
        wikiUrl: "https://en.wikipedia.org/wiki/Sonam_Wangchuk",
        newsUrl: "https://www.thehindu.com/news/national/other-states/sonam-wangchuk-ends-21-day-climate-fast-in-ladakh/article67994326.ece"
      };

      const valEl = document.getElementById("persp-wangchuk-value");
      const nameEl = document.getElementById("persp-wangchuk-name");
      const yearEl = document.getElementById("persp-wangchuk-year");
      const innEl = document.getElementById("persp-wangchuk-innovations");
      const strEl = document.getElementById("persp-wangchuk-struggles");
      const wWiki = document.getElementById("persp-wangchuk-wiki-link");
      const wNews = document.getElementById("persp-wangchuk-news-link");
      const wPub = document.getElementById("persp-wangchuk-news-pub");

      if (valEl) valEl.textContent = d.value || "Environmental Stewardship & Selfless Resistance";
      if (nameEl) nameEl.textContent = d.name || "Sonam Wangchuk";
      if (yearEl) yearEl.textContent = d.year ? `c. ${d.year}` : "c. 2024";
      if (innEl) innEl.textContent = d.innovations || "Invented Ice Stupa artificial glaciers to solve spring desert water scarcity and SECMOL zero-carbon solar mud architecture.";
      if (strEl) strEl.textContent = d.struggles || "Endured 21-day climate fasts at -15°C in Leh and Delhi border detention (Oct 2024) demanding 6th Schedule ecological safeguards for Himalayan ecosystems.";
      if (wWiki) wWiki.href = d.wikiUrl || "https://en.wikipedia.org/wiki/Sonam_Wangchuk";
      if (wPub) wPub.textContent = d.newsPublisher || "The Hindu";
      if (wNews) wNews.href = d.newsUrl || "https://www.thehindu.com/news/national/other-states/sonam-wangchuk-ends-21-day-climate-fast-in-ladakh/article67994326.ece";

      this.perspectiveWangchuk.classList.remove("hidden");
    }

    if (perspective === "critic" && nodePersp.critic && this.perspectiveCritic) {
      const d = nodePersp.critic;
      document.getElementById("persp-critic-failure").textContent = d.failure || "";
      document.getElementById("persp-critic-failure-year").textContent = d.failureYear ? `India, ${d.failureYear}` : "";
      document.getElementById("persp-critic-positive").textContent = d.positiveExample || "";
      document.getElementById("persp-critic-country").textContent = d.positiveCountry || "";
      document.getElementById("persp-critic-mechanism").textContent = d.mechanism ? `— ${d.mechanism}` : "";

      // Newspaper Article Link
      const newsLink = document.getElementById("persp-critic-news-link");
      const newsPub = document.getElementById("persp-critic-news-pub");
      if (newsPub) newsPub.textContent = d.newsPublisher || "The Hindu";
      if (newsLink) {
        newsLink.href = d.newsUrl || `https://www.google.com/search?q=${encodeURIComponent((d.newsPublisher || 'The Hindu') + ' ' + d.failure)}`;
      }

      this.perspectiveCritic.classList.remove("hidden");
    }
  }
}
