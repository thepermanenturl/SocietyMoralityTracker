# 🏛️ Society Morality Tracker (`SocietyMoralityTracker`)

> An extensible, 4-layer interactive Morality Tree graph and Socratic AI Vetting Engine that grounds real-world governance bills, news events, and AI alignment constraints in foundational human axioms.

---

## 🌟 Key Features

* **Hierarchical 4-Layer Morality Tree**:
  * **Layer 0 (Foundational Axioms)**: *Existence of Suffering [A1]*, *Sentient Worth [A2]*, *Golden Rule [A3]*, *Value of Autonomy [A4]*, *Basic Needs [A5]*, *Equity & Fairness [A6]*.
  * **Layer 1 (Derived Principles)**: Healthcare [D1], Bodily Integrity [D2], Expression [D3], Non-Discrimination [D4], Education [D5], Harm Principle [D6], Mutual Aid [D7], Democratic Consent [D8].
  * **Layer 2 (Applied Ethics)**: 12 real-world areas (Digital Privacy, Fair Wage, Environmental Duty, Restorative Justice).
  * **Layer 3 (Complex Dilemmas)**: 8 high-stakes conflicts (Resource Triage, Security vs. Privacy, AGI Alignment, Intergenerational Duty).

* **🏛️ Socratic AI Vetting Agent**:
  * Powered by Qwen 7B Instruct / Gemini API via multi-mode `AIChatGateway`.
  * Generates short, incisive Socratic analyses with dual perspectives: 🛡️ **Supporting Upholder** vs. 😈 **Devil's Advocate**.
  * Automatically parses node chips (`[A1]`, `[D5]`) from responses and **illuminates them dynamically on the SVG canvas**.

* **📰 Real-World Governance News Feed**:
  * Factual task cards mapping national acts, bills, and enforcement events (Demonetisation, CAA, Electoral Bonds, Ram Mandir land, Farm Laws) directly to broken moral nodes.

* **🧘 Multi-Perspective Overlays**:
  * **Constitutional Law**: Article excerpts & enforcement history.
  * **Modern Buddha**: Lived human virtue stories.
  * **Critic & Foreign Success**: Domestic failures vs. successful international models.
  * **Sonam Wangchuk Homage**: Climate fasts & civic resistance dossier.

* **🤖 AI Morality & Alignment Guidance**:
  * Structurally extensible to serve as an explicit machine-readable **Moral Constitution / Guardrail Engine** for autonomous AI agents.

---

## 🚀 Quick Start (Local & Web)

### 1. View Static Web App (Zero Setup)
Simply open [`index.html`](index.html) in any web browser!

### 2. Run with Local AI Backend (`make_a_brain`)
```bash
# Start FastAPI Orchestrator on Port 8000
python -m uvicorn orchestrator:app --host 127.0.0.1 --port 8000
```
Then open `index.html` or view the Supervisor Console at `http://127.0.0.1:8000/admin/ui`.

---

## 📂 Project Structure

```
makeMoralityTrackable/
├── index.html                # Main Application Shell
├── style.css                 # Dark Mode Glassmorphism Design System
├── app.js                    # Main Application Coordinator & Layout Manager
├── tree-renderer.js          # Interactive SVG Canvas & Node Highlighting
├── node-detail.js            # Node Detail Inspector & Perspective Switcher
├── ai-chat-window.js         # Socratic AI Agent Chat Drawer & Node Parser
├── ai-chat-gateway.js        # Multi-Mode Connection Gateway (API Key / Local / Cloud)
├── ai-vetting-engine.js      # Semantic Token & Domain Synonym Node Search
├── morality-agent-context.js # Socrates System Prompt & Skill Package
├── morality-data.js          # 34-Node Morality Hierarchy Dataset
├── morality-store.js         # Community Voting & Proposal Storage Store
├── news-feed-data.js         # Verified Governance Events Dataset
└── perspectives-data.js      # 4-Perspective Overlays Dataset
```

---

## 🛡️ License

MIT License. Open for public contribution and AI Alignment research.
