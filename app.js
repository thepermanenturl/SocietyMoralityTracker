/**
 * App — Main Coordinator for Morality Tree Explorer with AI Gateway Integration
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Store, AI Vetting Engine, and Interactive AI Chat Window
  const store = new MoralityStore(MORALITY_DATA);
  const aiEngine = new AIVettingEngine(store);
  const aiChat = new AIChatWindow("ai-chat-window", store);

  // Global state reference for quick access
  window.appState = {
    selectedNode: null
  };

  // Initialize Renderer & Inspector with Store & AI Engine
  const renderer = new TreeRenderer("tree-svg", "tree-container", store);
  window.treeRenderer = renderer;
  const inspector = new NodeDetailInspector("detail-panel", store, aiEngine);

  // --- DYNAMIC MULTI-DRAWER LAYOUT MANAGER ---
  const newsDrawerEl = document.getElementById("news-feed-drawer");
  const detailPanelEl = document.getElementById("detail-panel");

  function updateDrawerLayout(lastOpened) {
    const isInspectorOpen = detailPanelEl && detailPanelEl.classList.contains("open");
    const isNewsOpen = newsDrawerEl && !newsDrawerEl.classList.contains("hidden");

    if (isInspectorOpen && isNewsOpen) {
      if (lastOpened === "inspector") {
        detailPanelEl.style.zIndex = "1250";
        detailPanelEl.classList.remove("shifted");
        newsDrawerEl.style.zIndex = "1240";
        newsDrawerEl.classList.add("shifted");
      } else {
        newsDrawerEl.style.zIndex = "1250";
        newsDrawerEl.classList.remove("shifted");
        detailPanelEl.style.zIndex = "1240";
        detailPanelEl.classList.add("shifted");
      }
    } else {
      if (detailPanelEl) {
        detailPanelEl.classList.remove("shifted");
        detailPanelEl.style.zIndex = "1210";
      }
      if (newsDrawerEl) {
        newsDrawerEl.classList.remove("shifted");
        newsDrawerEl.style.zIndex = "1200";
      }
    }
  }

  window.updateDrawerLayout = updateDrawerLayout;

  if (detailPanelEl) detailPanelEl.addEventListener("click", () => updateDrawerLayout("inspector"));
  if (newsDrawerEl) newsDrawerEl.addEventListener("click", () => updateDrawerLayout("news"));

  // Wire Tree selection -> Inspector panel & Global state
  renderer.onNodeSelect((node) => {
    window.appState.selectedNode = node;
    if (node) {
      inspector.show(node);
      updateDrawerLayout("inspector");
    } else {
      inspector.close();
      updateDrawerLayout();
    }
  });

  // Wire Inspector breadcrumbs -> Tree selection
  inspector.onNavigate((targetNodeId) => {
    renderer.selectNode(targetNodeId);
  });

  // Wire Governance updates -> Tree refresh
  inspector.onStoreUpdate(() => {
    renderer.refresh();
  });

  // Wire Side Panel "Ask AI Agent to Vet this Claim" button
  const vetSelectedNodeBtn = document.getElementById("vet-selected-node-btn");
  if (vetSelectedNodeBtn) {
    vetSelectedNodeBtn.addEventListener("click", () => {
      if (window.appState.selectedNode) {
        aiChat.vetNode(window.appState.selectedNode);
      }
    });
  }

  // User Persona Badge & Modal
  const userProfileBtn = document.getElementById("user-profile-btn");
  const personaModal = document.getElementById("persona-modal");
  const closePersonaBtn = document.getElementById("close-persona-btn");
  const avatarEl = document.getElementById("user-avatar");
  const nameEl = document.getElementById("user-name");

  function updateUserDisplay() {
    const user = store.getUser();
    avatarEl.textContent = user.avatar || "👩‍🏫";
    nameEl.textContent = user.name || "Dr. Sofia Chen";
  }
  updateUserDisplay();

  userProfileBtn.addEventListener("click", () => personaModal.classList.remove("hidden"));
  closePersonaBtn.addEventListener("click", () => personaModal.classList.add("hidden"));

  document.querySelectorAll(".persona-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const role = btn.getAttribute("data-role");
      const avatar = btn.getAttribute("data-avatar");
      store.setUser({ name, role, avatar });
      updateUserDisplay();
      personaModal.classList.add("hidden");
    });
  });

  // Layer Filter Pills
  const filterPills = document.querySelectorAll(".legend-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const layer = pill.getAttribute("data-layer");
      renderer.setLayerFilter(layer);
    });
  });

  // --- AI SEARCH PERSPECTIVE AGENT ---
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const aiSearchBanner = document.getElementById("ai-search-banner");
  const aiBannerQuery = document.getElementById("ai-banner-query");
  const aiBannerGuidance = document.getElementById("ai-banner-guidance");
  const closeAiBannerBtn = document.getElementById("close-ai-banner-btn");

  let searchDebounceTimeout = null;

  function clearAllSearchAndHighlights() {
    lastExecutedSearchQuery = "";
    if (searchInput) searchInput.value = "";
    if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
    if (aiSearchBanner) aiSearchBanner.classList.add("hidden");
    renderer.setAISearchHighlights([]);
    renderer.setSearchQuery("");
    renderer.deselectNode();
    inspector.close();
  }

  // Double Click outside on empty canvas space -> Revert to clean default view
  renderer.onCanvasDblClick(() => {
    clearAllSearchAndHighlights();
  });

  async function executeAISearch(queryText) {
    if (!queryText || queryText.trim().length === 0) {
      clearAllSearchAndHighlights();
      return;
    }

    if (clearSearchBtn) clearSearchBtn.classList.remove("hidden");
    if (aiSearchBanner) {
      aiSearchBanner.classList.remove("hidden");
      if (aiBannerQuery) aiBannerQuery.textContent = `Query: "${queryText}"`;
      if (aiBannerGuidance) aiBannerGuidance.textContent = "🤖 Manager Agent evaluating relevant nodes...";
    }

    // Delegate node selection to Manager Agent — UI automatically highlights nodes from the Agent's reply!
    if (aiChat) {
      const displayText = `🔍 Search Query: "${queryText}"`;
      const internalPrompt = `Search Query: "${queryText}"\n\nTask: As Socrates Manager Agent, evaluate this search query, identify the relevant moral nodes (e.g. [A1], [D5], [A4]), and present your analysis. The UI will automatically highlight whichever nodes you mention in your reply.`;

      aiChat.openWindow();
      aiChat.sendUserMessageWithDisplay(displayText, internalPrompt);
    }
  }

  let lastExecutedSearchQuery = "";

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (val !== lastExecutedSearchQuery) {
        lastExecutedSearchQuery = val;
        executeAISearch(val);
      }
    }
  });

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (clearSearchBtn) {
      if (val.length > 0) clearSearchBtn.classList.remove("hidden");
      else clearSearchBtn.classList.add("hidden");
    }

    clearTimeout(searchDebounceTimeout);
    searchDebounceTimeout = setTimeout(() => {
      if (val !== lastExecutedSearchQuery && val.length >= 3) {
        lastExecutedSearchQuery = val;
        executeAISearch(val);
      } else if (val.length === 0) {
        lastExecutedSearchQuery = "";
        clearAllSearchAndHighlights();
      }
    }, 700); // 700ms debounce for single execution
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      clearAllSearchAndHighlights();
    });
  }

  if (closeAiBannerBtn) {
    closeAiBannerBtn.addEventListener("click", () => {
      clearAllSearchAndHighlights();
    });
  }

  // Canvas Control Buttons
  document.getElementById("zoom-in").addEventListener("click", () => renderer.zoomIn());
  document.getElementById("zoom-out").addEventListener("click", () => renderer.zoomOut());
  document.getElementById("reset-view").addEventListener("click", () => renderer.resetCamera());

  // --- PROPOSAL MODAL LOGIC ---
  const openProposeBtn = document.getElementById("open-propose-btn");
  const proposalModal = document.getElementById("proposal-modal");
  const closeProposalBtn = document.getElementById("close-modal-btn");
  const proposalForm = document.getElementById("proposal-form");
  const propParentsSelect = document.getElementById("prop-parents");

  const runAiVettingBtn = document.getElementById("run-ai-vetting-btn");
  const submitProposalBtn = document.getElementById("submit-proposal-btn");
  const aiVettingOutput = document.getElementById("ai-vetting-output");
  const vettingScorePill = document.getElementById("vetting-score-pill");
  const vettingDetails = document.getElementById("vetting-details");

  let currentVettingReport = null;

  function populateParentSelect() {
    propParentsSelect.innerHTML = "";
    const nodes = store.getNodes();
    nodes.forEach(n => {
      const opt = document.createElement("option");
      opt.value = n.id;
      opt.textContent = `[Layer ${n.layer}] ${n.id}: ${n.title}`;
      propParentsSelect.appendChild(opt);
    });
  }

  openProposeBtn.addEventListener("click", () => {
    populateParentSelect();
    proposalModal.classList.remove("hidden");
    aiVettingOutput.classList.add("hidden");
    submitProposalBtn.disabled = true;
  });

  closeProposalBtn.addEventListener("click", () => {
    proposalModal.classList.add("hidden");
  });

  // AI Vetting Button in Modal
  runAiVettingBtn.addEventListener("click", () => {
    const selectedParents = Array.from(propParentsSelect.selectedOptions).map(o => o.value);
    const proposalData = {
      layer: parseInt(document.getElementById("prop-layer").value, 10),
      title: document.getElementById("prop-title").value,
      statement: document.getElementById("prop-statement").value,
      derivation: document.getElementById("prop-derivation").value,
      parentIds: selectedParents,
      evidence: {
        history: document.getElementById("prop-history").value,
        science: document.getElementById("prop-science").value
      }
    };

    currentVettingReport = aiEngine.vetProposal(proposalData);

    // Render Report Output
    vettingScorePill.textContent = `${currentVettingReport.compositeScore}% Score`;
    vettingScorePill.style.color = currentVettingReport.statusColor;

    let html = `<div style="font-weight:700; color:${currentVettingReport.statusColor}; margin-bottom:6px;">${currentVettingReport.statusText}</div>`;
    if (currentVettingReport.strengths.length > 0) {
      html += `<div><strong>Strengths:</strong><ul>${currentVettingReport.strengths.map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
    }
    if (currentVettingReport.warnings.length > 0) {
      html += `<div style="margin-top:6px;"><strong>Warnings / Gaps:</strong><ul>${currentVettingReport.warnings.map(w=>`<li>${w}</li>`).join('')}</ul></div>`;
    }

    vettingDetails.innerHTML = html;
    aiVettingOutput.classList.remove("hidden");

    submitProposalBtn.disabled = currentVettingReport.status === "REJECTED";
  });

  // Form Submit
  proposalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentVettingReport) return;

    const selectedParents = Array.from(propParentsSelect.selectedOptions).map(o => o.value);
    const nodeData = {
      title: document.getElementById("prop-title").value,
      layer: parseInt(document.getElementById("prop-layer").value, 10),
      statement: document.getElementById("prop-statement").value,
      summary: document.getElementById("prop-title").value,
      parentIds: selectedParents,
      derivation: document.getElementById("prop-derivation").value,
      evidence: {
        history: document.getElementById("prop-history").value,
        science: document.getElementById("prop-science").value,
        psychology: "Submitted via Community Proposal."
      },
      counterarguments: [],
      frameworks: ["Community Proposed"]
    };

    const newProposedNode = store.addProposedNode(nodeData, currentVettingReport);
    proposalModal.classList.add("hidden");
    proposalForm.reset();

    // Refresh tree & select new node
    renderer.refresh();
    renderer.selectNode(newProposedNode.id);
  });

  // --- AGENT CONNECTION SETTINGS MODAL LOGIC ---
  const openAgentSettingsBtn = document.getElementById("open-agent-settings-btn");
  const agentSettingsModal = document.getElementById("agent-settings-modal");
  const closeAgentSettingsBtn = document.getElementById("close-agent-settings-btn");

  const modeTabs = document.querySelectorAll(".mode-tab");
  const modePanels = document.querySelectorAll(".mode-panel");

  const apiProviderSelect = document.getElementById("setting-api-provider");
  const apiKeyInput = document.getElementById("setting-api-key");
  const apiModelInput = document.getElementById("setting-api-model");

  const localUrlInput = document.getElementById("setting-local-url");
  const remoteUrlInput = document.getElementById("setting-remote-url");

  const testConnBtn = document.getElementById("test-connection-btn");
  const saveConnBtn = document.getElementById("save-agent-settings-btn");
  const connMsg = document.getElementById("connection-status-message");

  let activeMode = (window.aiGateway && window.aiGateway.settings) ? window.aiGateway.settings.mode : "api_key";

  function populateSettingsModal() {
    const s = window.aiGateway.settings;
    activeMode = s.mode || "api_key";

    modeTabs.forEach(t => {
      const isAct = t.getAttribute("data-mode") === activeMode;
      t.classList.toggle("active", isAct);
    });

    modePanels.forEach(p => {
      const isAct = p.id === `mode-panel-${activeMode}`;
      p.classList.toggle("active", isAct);
      p.classList.toggle("hidden", !isAct);
    });

    if (s.apiKeyConfig) {
      apiProviderSelect.value = s.apiKeyConfig.provider || "gemini";
      apiKeyInput.value = s.apiKeyConfig.key || "";
      apiModelInput.value = s.apiKeyConfig.model || "gemini-1.5-flash";
    }

    if (s.localPortConfig) {
      localUrlInput.value = s.localPortConfig.url || "http://127.0.0.1:8000";
    }

    if (s.remoteServerConfig) {
      remoteUrlInput.value = s.remoteServerConfig.url || "";
    }

    connMsg.classList.add("hidden");
  }

  if (openAgentSettingsBtn) {
    openAgentSettingsBtn.addEventListener("click", () => {
      populateSettingsModal();
      agentSettingsModal.classList.remove("hidden");
    });
  }

  if (closeAgentSettingsBtn) {
    closeAgentSettingsBtn.addEventListener("click", () => {
      agentSettingsModal.classList.add("hidden");
    });
  }

  modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activeMode = tab.getAttribute("data-mode");
      modeTabs.forEach(t => t.classList.toggle("active", t === tab));
      modePanels.forEach(p => {
        const isAct = p.id === `mode-panel-${activeMode}`;
        p.classList.toggle("active", isAct);
        p.classList.toggle("hidden", !isAct);
      });
    });
  });

  // Test Connection
  if (testConnBtn) {
    testConnBtn.addEventListener("click", async () => {
      testConnBtn.disabled = true;
      connMsg.classList.remove("hidden");
      connMsg.className = "connection-status-msg pending";
      connMsg.textContent = "⏳ Testing AI Agent Connection...";

      const tempSettings = {
        mode: activeMode,
        apiKeyConfig: {
          provider: apiProviderSelect.value,
          key: apiKeyInput.value.trim(),
          model: apiModelInput.value.trim()
        },
        localPortConfig: {
          url: localUrlInput.value.trim()
        },
        remoteServerConfig: {
          url: remoteUrlInput.value.trim()
        }
      };

      window.aiGateway.saveSettings(tempSettings);

      const testResult = await window.aiGateway.queryLiveModel("Test connection request. Reply briefly with 'Agent Connection Verified'.");
      testConnBtn.disabled = false;

      if (testResult) {
        connMsg.className = "connection-status-msg success";
        connMsg.textContent = `🟢 Connected Successfully! Agent output: "${testResult.substring(0, 80)}"`;
      } else {
        connMsg.className = "connection-status-msg error";
        if (activeMode === "api_key" && !apiKeyInput.value.trim()) {
          connMsg.textContent = "🔴 Failed: Please enter a valid Gemini/API Key.";
        } else {
          connMsg.textContent = `🔴 Connection Failed to ${activeMode}. Verify endpoint URL or API Key.`;
        }
      }
    });
  }

  // Save Settings
  if (saveConnBtn) {
    saveConnBtn.addEventListener("click", () => {
      const newSettings = {
        mode: activeMode,
        apiKeyConfig: {
          provider: apiProviderSelect.value,
          key: apiKeyInput.value.trim(),
          model: apiModelInput.value.trim()
        },
        localPortConfig: {
          url: localUrlInput.value.trim()
        },
        remoteServerConfig: {
          url: remoteUrlInput.value.trim()
        }
      };

      window.aiGateway.saveSettings(newSettings);
      agentSettingsModal.classList.add("hidden");
    });
  }

  // --- GOVERNANCE NEWS FEED & DEVIL'S ADVOCATE SLIDER ---
  const newsDrawer = document.getElementById("news-feed-drawer");
  const openNewsBtn = document.getElementById("open-news-feed-btn");
  const closeNewsBtn = document.getElementById("close-news-feed-btn");
  const newsList = document.getElementById("news-task-cards-list");
  const newsDetailCard = document.getElementById("news-task-detail-card");
  const backToNewsBtn = document.getElementById("back-to-news-list-btn");

  const devilsSlider = document.getElementById("devils-advocate-slider");
  const devilsPctLabel = document.getElementById("devils-advocate-pct");

  let activeNewsItem = null;
  let activeStance = "upholder";

  if (devilsSlider && devilsPctLabel) {
    devilsSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 50) {
        devilsSlider.value = 100;
        devilsPctLabel.textContent = "100% (Devil's Advocate)";
        window.appState.devilsAdvocateStancePct = 100;
        if (inspector) inspector.setPerspective("critic");
      } else {
        devilsSlider.value = 0;
        devilsPctLabel.textContent = "0% (Upholder)";
        window.appState.devilsAdvocateStancePct = 0;
        if (inspector) inspector.setPerspective("none");
      }
    });
  }

  function renderNewsTaskCards() {
    if (!newsList || typeof window.NEWS_FEED_DATA === "undefined") return;
    newsList.innerHTML = "";

    window.NEWS_FEED_DATA.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-task-card";
      card.dataset.id = item.id;
      card.innerHTML = `
        <div class="card-meta">
          <span class="cat-tag">${item.category}</span>
          <span class="date-tag">${item.date}</span>
        </div>
        <h4>${item.title}</h4>
        <p class="summary">${item.summary}</p>
        <div class="card-nodes-preview">
          <span class="violation-label">Violated Nodes:</span>
          ${item.violatedNodes.map(n => `<span class="node-chip">${n}</span>`).join("")}
        </div>
      `;

      card.addEventListener("click", () => selectNewsTask(item));
      newsList.appendChild(card);
    });
  }

  function selectNewsTask(item) {
    activeNewsItem = item;

    if (renderer && item.violatedNodes) {
      renderer.setAISearchHighlights(item.violatedNodes);
    }

    document.getElementById("news-detail-category").textContent = item.category;
    document.getElementById("news-detail-date").textContent = item.date;
    document.getElementById("news-detail-title").textContent = item.title;
    document.getElementById("news-detail-summary").textContent = item.summary;

    const sourceLink = document.getElementById("news-detail-source-link");
    const pubSpan = document.getElementById("news-detail-publisher");
    if (pubSpan) pubSpan.textContent = item.newsPublisher || "The Hindu";
    if (sourceLink) sourceLink.href = item.newsUrl || "#";

    const nodesContainer = document.getElementById("news-detail-nodes-list");
    if (nodesContainer) {
      nodesContainer.innerHTML = item.violatedNodeTitles.map(t => `<span class="node-chip alert">${t}</span>`).join("");
    }

    document.getElementById("upholder-headline").textContent = item.upholderStance.headline;
    document.getElementById("upholder-analysis").textContent = item.upholderStance.analysis;

    document.getElementById("devils-headline").textContent = item.devilsAdvocateStance.headline;
    document.getElementById("devils-analysis").textContent = item.devilsAdvocateStance.analysis;

    newsList.classList.add("hidden");
    newsDetailCard.classList.remove("hidden");
  }

  const tabUpholder = document.getElementById("stance-tab-upholder");
  const tabDevils = document.getElementById("stance-tab-devils");
  const contentUpholder = document.getElementById("stance-content-upholder");
  const contentDevils = document.getElementById("stance-content-devils");

  if (tabUpholder && tabDevils) {
    tabUpholder.addEventListener("click", () => {
      activeStance = "upholder";
      tabUpholder.classList.add("active");
      tabDevils.classList.remove("active");
      contentUpholder.classList.remove("hidden");
      contentDevils.classList.add("hidden");
    });

    tabDevils.addEventListener("click", () => {
      activeStance = "devils";
      tabDevils.classList.add("active");
      tabUpholder.classList.remove("active");
      contentDevils.classList.remove("hidden");
      contentUpholder.classList.add("hidden");
    });
  }

  if (backToNewsBtn) {
    backToNewsBtn.addEventListener("click", () => {
      newsDetailCard.classList.add("hidden");
      newsList.classList.remove("hidden");
    });
  }

  if (openNewsBtn) {
    openNewsBtn.addEventListener("click", () => {
      renderNewsTaskCards();
      newsDrawer.classList.remove("hidden");
      newsList.classList.remove("hidden");
      newsDetailCard.classList.add("hidden");
      updateDrawerLayout("news");
    });
  }

  if (closeNewsBtn) {
    closeNewsBtn.addEventListener("click", () => {
      newsDrawer.classList.add("hidden");
      updateDrawerLayout();
    });
  }

  const queryNewsAiBtn = document.getElementById("query-news-ai-btn");
  if (queryNewsAiBtn) {
    queryNewsAiBtn.addEventListener("click", () => {
      if (!activeNewsItem) return;
      const stanceText = activeStance === "devils" 
        ? `DEVIL'S ADVOCATE PERSPECTIVE (Extenuating Circumstances & Rationale):\n${activeNewsItem.devilsAdvocateStance.analysis}`
        : `UPHOLDER MORAL CRITIQUE:\n${activeNewsItem.upholderStance.analysis}`;

      const prompt = `Analyze governance policy "${activeNewsItem.title}" (${activeNewsItem.category}):\n\n${activeNewsItem.summary}\n\nViolated Nodes: ${activeNewsItem.violatedNodes.join(", ")}\n\n${stanceText}\n\nEvaluate whether this policy can be ethically justified or if the moral violation is absolute.`;
      
      aiChat.openWindow();
      aiChat.sendUserPrompt(prompt);
      newsDrawer.classList.add("hidden");
    });
  }

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      inspector.close();
      renderer.deselectNode();
      proposalModal.classList.add("hidden");
      personaModal.classList.add("hidden");
      if (newsDrawer) newsDrawer.classList.add("hidden");
    }
  });
});
