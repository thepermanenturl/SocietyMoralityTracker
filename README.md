# 🏛️ Society Morality Tracker (`SocietyMoralityTracker`)

> An extensible, 4-layer interactive Morality Tree graph and Socratic AI Vetting Engine that grounds real-world governance bills, news events, and AI alignment constraints in foundational human axioms.

---

## 📦 Standalone Package Overview

`makeMoralityTrackable` is a **100% self-contained React + Vite + TypeScript web application** and **machine-readable AI Morality Context Package**.

It can be run as a standalone web application or integrated into any AI agent framework (Ollama, LM Studio, Qwen, OpenAI, Anthropic, Gemini) via its portable skill package `morality_tree_skills_package.json`.

---

## 🌟 Key Features

* **Hierarchical 4-Layer Morality Tree**:
  * **Layer -1 & Layer 0 (Foundational Axioms)**: Primary RGB Nodes (*Existence of Suffering [A1]*, *Sentient Worth [A2]*, *Golden Rule [A3]*, *Value of Autonomy [A4]*, *Basic Needs [A5]*, *Equity & Fairness [A6]*).
  * **Layer 1 (Derived Principles)**: Healthcare [D1], Bodily Integrity [D2], Expression [D3], Non-Discrimination [D4], Education [D5], Harm Principle [D6], Mutual Aid [D7], Democratic Consent [D8].
  * **Layer 2 (Applied Ethics)**: 12 real-world areas (Digital Privacy, Fair Wage, Environmental Duty, Restorative Justice).
  * **Layer 3 (Complex Dilemmas)**: 8 high-stakes conflicts (Resource Triage, Security vs. Privacy, AGI Alignment, Intergenerational Duty).

* **⚙️ Agent Connection Settings & Portable Morality Skill Package (`morality_tree_skills_package.json`)**:
  * Includes a top navbar Settings Modal (`⚙️`) allowing direct connection to local LLM servers (`http://127.0.0.1:8000`) or Cloudflare tunnels.
  * Contains a one-click **`[Copy Morality Context]`** button that exports the 34-node schema and 4 Socratic skills (`/navigate`, `/tutor`, `/dilemma`, `/audit`) to equip any model in any chatbox.

* **🌈 Refractive Prism Spectrum View**:
  * Multi-perspective spectrum view that refracts moral dilemmas into 4 ethical dimensions: Utilitarian, Deontological, Rights & Autonomy, and Justice & Equity.

* **📌 High-Contrast Selection Shading**:
  * Selecting any node or governance news card automatically shades out non-relevant nodes (`opacity-20 grayscale`), illuminating only matched axioms and direct connection paths in glowing cyan.

---

## 🚀 Quick Start (Local Development)

### 1. Install & Run Dev Server
```bash
cd makeMoralityTrackable
npm install
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 2. Build Production Bundle
```bash
npm run build
```

### 3. Connect to Local AI Brain (`make_a_brain`)
```bash
# Start FastAPI Orchestrator on Port 8000
python orchestrator.py
```

---

## 📂 Project Structure

```
makeMoralityTrackable/
├── morality_tree_skills_package.json # Portable, Model-Agnostic Skill Package
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── TreeView.tsx          # Interactive SVG ReactFlow Tree & Watermarks
│   │   │   └── PrismView.tsx         # Refractive Prism Multi-Perspective Spectrum
│   │   ├── modals/
│   │   │   ├── SettingsModal.tsx     # Agent Connection Details & Portable Context Modal
│   │   │   └── AIChatbotModal.tsx    # Socratic AI Agent Chatbot
│   │   └── sidebars/
│   │       ├── NewsFeedDrawer.tsx    # Governance News Feed with Selection Shading
│   │       └── NodeDetailDrawer.tsx  # Node Lineage & Perspective Inspector
│   ├── store/
│   │   └── useMoralityStore.ts       # Global Morality State & Selection Store
│   ├── App.tsx                       # Main Application Shell
│   └── main.tsx                      # Vite React Entry Point
├── package.json
└── vite.config.ts
```

---

## 🛡️ License

MIT License. Open for public contribution and AI Alignment research.
