/**
 * AIChatWindow — Dockable Interactive Chat UI connected to AI Agent Gateway
 */
class AIChatWindow {
  constructor(containerId, store) {
    this.container = document.getElementById(containerId);
    this.store = store;
    this.gateway = new AIChatGateway();

    this.isOpen = false;
    this.isMinimized = false;
    this.currentResponseEl = null;

    this.initElements();
    this.setupListeners();
    this.initGatewaySession();
  }

  initElements() {
    this.windowEl = document.getElementById("ai-chat-window");
    this.toggleBtn = document.getElementById("toggle-ai-chat-btn");
    this.closeBtn = document.getElementById("close-ai-chat-btn");
    this.minimizeBtn = document.getElementById("minimize-ai-chat-btn");
    this.statusDot = document.getElementById("ai-status-dot");
    this.statusText = document.getElementById("ai-status-text");

    this.messagesContainer = document.getElementById("ai-chat-messages");
    this.inputField = document.getElementById("ai-chat-input");
    this.sendBtn = document.getElementById("ai-chat-send-btn");

    this.quickVetBtn = document.getElementById("quick-vet-btn");
    this.quickAxiomsBtn = document.getElementById("quick-axioms-btn");
    this.devilsBtn = document.getElementById("devils-advocate-toggle-btn");
    this.devilsStatusText = document.getElementById("devils-status-text");

    this.isDevilsAdvocate = false;
    this.setupListeners();
    this.initGatewaySession();
  }

  async initGatewaySession() {
    const res = await this.gateway.createSession("morality_vetting", "user_philosopher");
    if (res.success) {
      if (this.statusDot) this.statusDot.className = "status-dot online";
      if (this.statusText) this.statusText.textContent = "AI Gateway Connected";
      this.gateway.connectWebSocket(
        (token) => this.handleStreamToken(token),
        () => this.handleStreamComplete(),
        (err) => console.warn("WS error:", err)
      );
    } else {
      if (this.statusDot) this.statusDot.className = "status-dot fallback";
      if (this.statusText) this.statusText.textContent = "AI Agent (Client Streamer)";
    }
  }

  toggleDevilsAdvocate(forceState) {
    this.isDevilsAdvocate = typeof forceState === "boolean" ? forceState : !this.isDevilsAdvocate;
    if (this.devilsBtn) {
      this.devilsBtn.classList.toggle("active", this.isDevilsAdvocate);
    }
    if (this.devilsStatusText) {
      this.devilsStatusText.textContent = this.isDevilsAdvocate ? "ON 😈" : "OFF";
    }
  }

  setupListeners() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleWindow();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeWindow();
      });
    }

    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMinimize();
      });
    }

    if (this.devilsBtn) {
      this.devilsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDevilsAdvocate();
      });
    }

    // Global Delegated Close Button Event Listener Fallback
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#close-ai-chat-btn");
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeWindow();
      }
    });

    if (this.sendBtn?.addEventListener) this.sendBtn.addEventListener("click", () => this.handleSend());
    if (this.inputField?.addEventListener) {
      this.inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    if (this.quickVetBtn) {
      this.quickVetBtn.addEventListener("click", () => {
        const activeNode = window.appState?.selectedNode;
        if (activeNode) {
          this.vetNode(activeNode);
        } else {
          this.sendUserMessage("Please vet the moral claim: 'Healthcare is a right derived from suffering avoidance (A1) and basic needs (A5).'");
        }
      });
    }

    if (this.quickAxiomsBtn) {
      this.quickAxiomsBtn.addEventListener("click", () => {
        this.sendUserMessage("Explain the 6 Foundational Moral Axioms (Layer 0) and how they prevent moral relativism.");
      });
    }

    if (this.messagesContainer) {
      this.messagesContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".clickable-node-chip");
        if (chip) {
          const nodeId = chip.getAttribute("data-node-id");
          if (window.treeRenderer && nodeId) {
            window.treeRenderer.selectNode(nodeId);
          }
        }
      });
    }
  }

  toggleWindow() {
    if (this.isOpen) {
      this.closeWindow();
    } else {
      this.openWindow();
    }
  }

  openWindow() {
    this.windowEl.style.display = "flex";
    this.windowEl.classList.remove("hidden", "minimized");
    this.isOpen = true;
    this.isMinimized = false;
    if (this.inputField) this.inputField.focus();
  }

  closeWindow() {
    this.windowEl.classList.add("hidden");
    this.windowEl.style.display = "none";
    this.isOpen = false;
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    this.windowEl.classList.toggle("minimized", this.isMinimized);
  }

  vetNode(node) {
    this.openWindow();
    const displayText = `🤖 Vetting Node [${node.id}: ${node.title}]`;
    const internalPrompt = `VET MORAL CLAIM:
Node: [${node.id}: ${node.title}]
Layer: ${node.layer}
Statement: "${node.statement}"

Task: As Socrates, evaluate this claim against Layer 0/1 axioms. Provide:
- 🛡️ Supporting Stance
- 😈 Devil's Advocate Stance
- 📜 Real Historical Precedent
- 🏛️ Socratic Probing Question
Refer to affected nodes cleanly as [A1], [D5], [D6], etc.`;

    this.sendUserMessageWithDisplay(displayText, internalPrompt);
  }

  async handleSend() {
    const text = this.inputField.value.trim();
    if (!text) return;
    this.inputField.value = "";
    await this.sendUserMessage(text);
  }

  async sendUserMessage(text) {
    await this.sendUserMessageWithDisplay(text, text);
  }

  async sendUserMessageWithDisplay(displayText, internalPrompt) {
    this.openWindow();
    this.appendMessage("user", displayText);

    this.currentResponseEl = this.appendMessage("agent", "");
    this.sendBtn.disabled = true;

    let finalPrompt = internalPrompt || displayText;
    if (this.isDevilsAdvocate) {
      finalPrompt = `[DEVIL'S ADVOCATE MODE ACTIVE: Adopt an aggressive Socratic Devil's Advocate persona. Challenge the claim using extenuating circumstances, systemic policy trade-offs, historical precedents, and tough counterarguments.]\n\n${finalPrompt}`;
    }

    await this.gateway.sendMessage(
      finalPrompt,
      (token) => this.handleStreamToken(token),
      () => this.handleStreamComplete()
    );
  }

  handleStreamToken(token) {
    if (!this.currentResponseEl) return;
    this.currentResponseEl.innerHTML += this.formatMarkdown(token);
    this.scrollToBottom();
  }

  handleStreamComplete() {
    if (this.currentResponseEl) {
      const fullText = this.currentResponseEl.textContent || "";
      const validNodes = [
        "A1","A2","A3","A4","A5","A6",
        "D1","D2","D3","D4","D5","D6","D7","D8",
        "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12",
        "X1","X2","X3","X4","X5","X6","X7","X8"
      ];

      const matches = fullText.match(/\[?([A-Z][0-9]{1,2})\]?/gi) || [];
      const nodeIds = [];
      matches.forEach(m => {
        const clean = m.replace(/[^A-Z0-9]/gi, "").toUpperCase();
        if (validNodes.includes(clean) && !nodeIds.includes(clean)) {
          nodeIds.push(clean);
        }
      });

      if (nodeIds.length > 0 && window.treeRenderer) {
        window.treeRenderer.setAISearchHighlights(nodeIds);
      }
    }
    this.currentResponseEl = null;
    this.sendBtn.disabled = false;
  }

  appendMessage(role, content) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${role}`;

    const avatar = role === "user" ? "👤" : "🤖";
    const authorName = role === "user" ? (this.store.getUser().name || "You") : "AI Vetting Agent";

    msgDiv.innerHTML = `
      <div class="msg-header">
        <span class="msg-avatar">${avatar}</span>
        <span class="msg-author">${authorName}</span>
      </div>
      <div class="msg-content">${this.formatMarkdown(content)}</div>
    `;

    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv.querySelector(".msg-content");
  }

  formatMarkdown(text) {
    if (!text) return "";
    let html = text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert node patterns like [A1], [D3], [E5], [X2] or A1, D3 into highlighted clickable badges
    const validNodes = [
      "A1","A2","A3","A4","A5","A6",
      "D1","D2","D3","D4","D5","D6","D7","D8",
      "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12",
      "X1","X2","X3","X4","X5","X6","X7","X8"
    ];

    html = html.replace(/\[?([A-Z][0-9]{1,2})\]?/gi, (match, code) => {
      const upper = code.toUpperCase();
      if (validNodes.includes(upper)) {
        return `<span class="clickable-node-chip" data-node-id="${upper}">[${upper}]</span>`;
      }
      return match;
    });

    return html;
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}
