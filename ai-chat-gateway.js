/**
 * AIChatGateway — Multi-Mode AI Gateway Client
 * Supports 3 Connection Modes:
 * 1. Cloud API Key (Google Gemini API / OpenAI REST API)
 * 2. Local Server / Port (http://127.0.0.1:8000, Ollama, LM Studio)
 * 3. Remote Internet Server (Custom HTTPS / WSS URL)
 */
class AIChatGateway {
  constructor() {
    this.STORAGE_KEY = "morality_agent_connection_settings_v1";
    this.sessionId = typeof localStorage !== "undefined" && localStorage.getItem("society_morality_persistent_session_id")
      ? localStorage.getItem("society_morality_persistent_session_id")
      : "society-morality-persistent-line";
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("society_morality_persistent_session_id", this.sessionId);
    }
    this.ws = null;
    this.isConnected = false;
    this.queue = [];

    // Load connection settings or initialize defaults
    this.loadSettings();

    // Start polling loop to recheck connection state
    this.startRecheckLoop();
  }

  async createSession(sessionType, userId) {
    if (!this.sessionId) {
      this.sessionId = "society-morality-persistent-line";
    }
    return { success: true, sessionId: this.sessionId };
  }

  connectWebSocket(onToken, onComplete, onError) {
    return true;
  }

  async sendMessage(text, onToken, onComplete) {
    try {
      const responseText = await this.queryLiveModel(text);
      if (responseText && typeof onToken === "function") {
        onToken(responseText);
      } else if (!responseText && typeof onToken === "function") {
        onToken("Currently offline agent");
      }
    } catch (e) {
      if (typeof onToken === "function") {
        onToken("Currently offline agent");
      }
    }
    if (typeof onComplete === "function") {
      onComplete();
    }
  }

  /**
   * System Prompt Context — Packaged ONCE to give the Live AI Agent full context & skills
   */
  getMoralPhilosophyContext() {
    if (typeof window !== "undefined" && window.MORALITY_AGENT_SKILLS_PACKAGE && typeof window.MORALITY_AGENT_SKILLS_PACKAGE.getCompiledSystemPrompt === "function") {
      return window.MORALITY_AGENT_SKILLS_PACKAGE.getCompiledSystemPrompt();
    }
    return `YOU ARE THE LIVE MORALITY TREE AI VETTING & DEBATE AGENT.
You evaluate moral claims and engage in 1-vs-1 public debates based on Foundational Axioms (Layer 0) and Derived Principles (Layer 1).

REQUIRED ARGUMENT WORKFLOW:
1. 📜 Historical Precedent: Provide a short 1-sentence real historical example illustrating this moral conflict.
2. 🎯 Highlighted Nodes: Explicitly list key node IDs (e.g., [A4, D2, D6]) highlighted on global screen.
3. ⚔️ Clause Negation: Specify exactly WHICH clause of user input is negated by WHICH node listed.`;
  }

  loadSettings() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.settings = JSON.parse(saved);
      } catch (e) {
        this.settings = this.getDefaultSettings();
      }
    } else {
      this.settings = this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      mode: "local_port", // 'api_key' | 'local_port' | 'remote_server'
      apiKeyConfig: {
        provider: "gemini", // 'gemini' | 'openai'
        key: "",
        model: "gemini-1.5-flash"
      },
      localPortConfig: {
        url: "http://127.0.0.1:8000"
      },
      remoteServerConfig: {
        url: ""
      }
    };
  }

  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
    this.checkConnection();
  }

  startRecheckLoop() {
    this.checkConnection();
    setInterval(() => {
      this.checkConnection();
    }, 15000); // 15s recheck
  }

  getBaseUrl() {
    const mode = this.settings.mode;
    if (mode === "remote_server" && this.settings.remoteServerConfig?.url) {
      return this.settings.remoteServerConfig.url.replace(/\/$/, "");
    }

    if (typeof window !== "undefined" && window.location) {
      if (window.location.origin.includes("trycloudflare.com")) {
        return window.location.origin;
      }
    }
    
    // Default to configured local port or custom remote URL if available
    const configuredUrl = this.settings.remoteServerConfig?.url || this.settings.localPortConfig?.url;
    return (configuredUrl || "http://127.0.0.1:8000").replace(/\/$/, "");
  }

  /**
   * Tests connection to configured mode safely without throwing CORS 530 console errors
   */
  async checkConnection() {
    const mode = this.settings.mode;

    if (mode === "api_key") {
      const key = this.settings.apiKeyConfig?.key;
      this.isConnected = Boolean(key && key.trim().length > 5);
      if (this.isConnected) this.processQueue();
      return this.isConnected;
    }

    const baseUrl = this.getBaseUrl();
    if (!baseUrl || baseUrl.includes("houses-performance-deer-winners")) {
      this.isConnected = false;
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${baseUrl}/api/health`, {
        method: "GET",
        headers: { "bypass-tunnel-reminder": "true" },
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      // Check if response is valid JSON 200 OK (not 530 Cloudflare error page)
      if (res && res.ok && res.status === 200) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    } catch (e) {
      this.isConnected = false;
    }

    if (this.isConnected) this.processQueue();
    return this.isConnected;
  }

  /**
   * Queries the live AI model endpoint based on active connection mode
   * @param {string} fullPrompt 
   * @returns {Promise<string|null>} Live AI generated response or null if unavailable
   */
  async queryLiveModel(fullPrompt) {
    const mode = this.settings.mode;
    const sysPrompt = this.getMoralPhilosophyContext();

    // MODE 1: CLOUD API KEY (Gemini API or OpenAI API)
    if (mode === "api_key") {
      const config = this.settings.apiKeyConfig;
      if (!config.key) return null;

      if (config.provider === "gemini") {
        try {
          const modelName = config.model || "gemini-1.5-flash";
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(config.key.trim())}`;

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${sysPrompt}\n\n${fullPrompt}` }]
                }
              ]
            })
          });

          if (res.ok) {
            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text.trim();
          } else {
            const errData = await res.json().catch(() => ({}));
            console.error("Gemini API Error:", errData);
          }
        } catch (e) {
          console.error("Failed to query Gemini API:", e);
        }
      }

      if (config.provider === "openai") {
        try {
          const modelName = config.model || "gpt-4o";
          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${config.key.trim()}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: "system", content: sysPrompt },
                { role: "user", content: fullPrompt }
              ]
            })
          });

          if (res.ok) {
            const data = await res.json();
            const text = data.choices?.[0]?.message?.content;
            if (text) return text.trim();
          }
        } catch (e) {
          console.error("Failed to query OpenAI API:", e);
        }
      }

      return null;
    }

    // MODE 2 & 3: LOCAL PORT / REMOTE SERVER (FastAPI, Ollama, Cloudflare Tunnel)
    const baseUrl = this.getBaseUrl();
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true"
        },
        body: JSON.stringify({
          session_id: `session-${Date.now()}`,
          prompt: fullPrompt,
          system_prompt: sysPrompt,
          use_expert: true
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.reply || data.response || data.text || null;
      }
    } catch (e) {
      // Offline fallback
    }

    return null;
  }

  async processQueue() {
    if (this.queue.length === 0) return;

    const pending = [...this.queue];
    this.queue = [];

    for (const item of pending) {
      if (item.handler) {
        await item.handler();
      }
    }
  }

  enqueue(item) {
    this.queue.push(item);
  }
}

// Global instance
window.aiGateway = new AIChatGateway();
