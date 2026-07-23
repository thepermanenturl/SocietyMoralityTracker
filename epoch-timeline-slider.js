/**
 * EpochTimelineSlider — Interactive 2500-Year Historical Epoch Slider & Societal Unrest Engine
 * Integrates 2500 years of global historical precedents, societal blindspots, and moral node highlights.
 */
class EpochTimelineSlider {
  constructor(containerId, store, renderer) {
    this.container = document.getElementById(containerId);
    this.store = store;
    this.renderer = renderer;
    
    this.epochs = Object.values(window.HISTORICAL_EPOCHS_DATA || {});
    this.currentEpochIndex = 4; // Default to Epoch 5 (Contemporary)
    
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderWidget();
    this.bindEvents();
    this.selectEpoch(this.currentEpochIndex);
  }

  renderWidget() {
    this.container.innerHTML = `
      <div class="epoch-widget-inner glass">
        <!-- Epoch Header & Minimizer -->
        <div class="epoch-widget-header">
          <div class="header-left">
            <span class="widget-icon">⏳</span>
            <span class="widget-title">2500-Year Epoch Timeline</span>
            <span id="current-epoch-years-badge" class="years-badge">1945 CE – 2026 CE</span>
          </div>
          <button id="toggle-epoch-drawer-btn" class="toggle-drawer-btn" title="Toggle Epoch Details Panel">
            <span id="epoch-toggle-icon">▼</span>
          </button>
        </div>

        <!-- Interactive Range Slider -->
        <div class="epoch-slider-row">
          <span class="slider-boundary-label">500 BCE</span>
          <input type="range" id="epoch-slider-input" min="0" max="4" step="1" value="4" class="epoch-range-input" title="Slide across 2500 years of human history">
          <span class="slider-boundary-label">2026 CE</span>
        </div>

        <!-- Milestone Markers -->
        <div class="epoch-milestones">
          <span class="milestone-dot" data-index="0" title="Epoch 1: Classical Antiquity (500 BCE - 500 CE)">500 BCE</span>
          <span class="milestone-dot" data-index="1" title="Epoch 2: Post-Classical (500 CE - 1400 CE)">500 CE</span>
          <span class="milestone-dot" data-index="2" title="Epoch 3: Enlightenment (1400 CE - 1800 CE)">1400 CE</span>
          <span class="milestone-dot" data-index="3" title="Epoch 4: Industrialization (1800 CE - 1945 CE)">1800 CE</span>
          <span class="milestone-dot active" data-index="4" title="Epoch 5: Contemporary AI Age (1945 CE - 2026 CE)">1945 CE</span>
        </div>

        <!-- Detailed Epoch Inspector Card -->
        <div id="epoch-details-panel" class="epoch-details-panel">
          <div class="epoch-main-info">
            <h3 id="epoch-title-text" class="epoch-name"></h3>
            <p id="epoch-summary-text" class="epoch-summary"></p>
          </div>

          <!-- Societal Unrest Index Meter -->
          <div class="unrest-meter-box">
            <div class="meter-header">
              <span class="meter-label">⚡ Societal Unrest Index:</span>
              <span id="unrest-score-value" class="unrest-score-badge">78%</span>
            </div>
            <div class="meter-bar-track">
              <div id="unrest-bar-fill" class="meter-bar-fill" style="width: 78%;"></div>
            </div>
            <p id="unrest-cause-text" class="unrest-cause-desc"></p>
          </div>

          <!-- Societies & Legal Blindspots -->
          <div class="societies-box">
            <div class="box-title">⚖️ Major Societies & Legal Blindspots:</div>
            <div id="societies-list-container" class="societies-cards-list"></div>
          </div>

          <!-- Morality Node Highlights -->
          <div class="epoch-nodes-box">
            <div class="box-title">🚨 Broken & Upheld Moral Axioms:</div>
            <div id="epoch-nodes-list-container" class="epoch-nodes-chips"></div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const sliderInput = document.getElementById("epoch-slider-input");
    const toggleBtn = document.getElementById("toggle-epoch-drawer-btn");
    const detailsPanel = document.getElementById("epoch-details-panel");
    const toggleIcon = document.getElementById("epoch-toggle-icon");

    if (sliderInput) {
      sliderInput.addEventListener("input", (e) => {
        const index = parseInt(e.target.value, 10);
        this.selectEpoch(index);
      });
    }

    if (toggleBtn && detailsPanel) {
      toggleBtn.addEventListener("click", () => {
        detailsPanel.classList.toggle("collapsed");
        toggleIcon.textContent = detailsPanel.classList.contains("collapsed") ? "▲" : "▼";
      });
    }

    const milestoneDots = this.container.querySelectorAll(".milestone-dot");
    milestoneDots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"), 10);
        if (sliderInput) sliderInput.value = index;
        this.selectEpoch(index);
      });
    });
  }

  selectEpoch(index) {
    if (index < 0 || index >= this.epochs.length) return;
    this.currentEpochIndex = index;
    const epoch = this.epochs[index];

    // Update Milestone Dots
    const milestoneDots = this.container.querySelectorAll(".milestone-dot");
    milestoneDots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update Text Elements
    const yearsBadge = document.getElementById("current-epoch-years-badge");
    const titleText = document.getElementById("epoch-title-text");
    const summaryText = document.getElementById("epoch-summary-text");
    const scoreVal = document.getElementById("unrest-score-value");
    const barFill = document.getElementById("unrest-bar-fill");
    const causeText = document.getElementById("unrest-cause-text");

    if (yearsBadge) yearsBadge.textContent = epoch.years;
    if (titleText) titleText.textContent = epoch.name;
    if (summaryText) summaryText.textContent = epoch.summary;
    if (scoreVal) scoreVal.textContent = `${epoch.unrestScore}% Unrest`;
    if (causeText) causeText.textContent = `Cause: ${epoch.unrestCause}`;

    if (barFill) {
      barFill.style.width = `${epoch.unrestScore}%`;
      if (epoch.unrestScore >= 80) {
        barFill.style.background = "linear-gradient(90deg, #ef4444, #dc2626)";
      } else if (epoch.unrestScore >= 70) {
        barFill.style.background = "linear-gradient(90deg, #f59e0b, #d97706)";
      } else {
        barFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
      }
    }

    // Render Societies & Blindspots Cards
    const socContainer = document.getElementById("societies-list-container");
    if (socContainer) {
      socContainer.innerHTML = epoch.societalBlindspots.map(item => `
        <div class="society-item-card">
          <div class="society-name">🏛️ ${item.society}</div>
          <div class="society-desc">${item.missingRights || item.upholdingAchievement}</div>
        </div>
      `).join("");
    }

    // Render Morality Node Chips & Highlight SVG Canvas
    const nodesContainer = document.getElementById("epoch-nodes-list-container");
    if (nodesContainer && epoch.keyNodes) {
      nodesContainer.innerHTML = epoch.keyNodes.map(nodeId => {
        const isViolated = epoch.violatedNodes && epoch.violatedNodes.includes(nodeId);
        const chipClass = isViolated ? "alert" : "success";
        const icon = isViolated ? "🚨" : "🛡️";
        return `<button class="clickable-epoch-node-chip ${chipClass}" data-node-id="${nodeId}" title="Click to examine node ${nodeId} in main tree graph">${icon} [${nodeId}]</button>`;
      }).join("");

      nodesContainer.querySelectorAll(".clickable-epoch-node-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const targetId = chip.getAttribute("data-node-id");
          if (this.renderer && targetId) {
            this.renderer.selectNode(targetId);
          }
        });
      });
    }

    // Build Contextual Hover Tooltip Map for Highlighted Nodes
    const contextMap = {};
    if (epoch.keyNodes) {
      epoch.keyNodes.forEach(nodeId => {
        const isViolated = epoch.violatedNodes && epoch.violatedNodes.includes(nodeId);
        const statusText = isViolated ? "🚨 Broken Axiom in this Epoch" : "🛡️ Upheld Principle in this Epoch";
        contextMap[nodeId] = `⏳ ${epoch.name} (${epoch.years})\n${statusText}: [${nodeId}]\nCause: ${epoch.unrestCause}`;
      });
    }

    // Trigger SVG Node Canvas Highlights with Contextual Tooltips
    if (this.renderer && epoch.keyNodes) {
      this.renderer.setAISearchHighlights(epoch.keyNodes, contextMap);
    }
  }
}

if (typeof window !== "undefined") {
  window.EpochTimelineSlider = EpochTimelineSlider;
}
