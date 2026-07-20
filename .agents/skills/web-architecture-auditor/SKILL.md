---
name: web-architecture-auditor
description: Audit web app architecture, modularity, state flow, SVG canvas rendering, and CORS gateway resilience.
---

# Web Architecture Auditor Skill

This skill defines the guidelines for auditing and improving the web app's architecture:

1. **State Isolation & Storage**:
   - Ensure `appState` in `app.js` and `MoralityStore` in `morality-store.js` remain cleanly separated from DOM manipulation.
   - Verify local storage serialization/deserialization has fallback safety for corrupted states.

2. **SVG Render Performance**:
   - Check `TreeRenderer` in `tree-renderer.js` for unneeded DOM re-renders or layout thrashing.
   - Optimize highlight updates (`setAISearchHighlights`) so node stroke glowing and badge transitions run at 60 FPS.

3. **CORS & Multi-Mode Gateway Resilience**:
   - Verify `AIChatGateway` handles remote HTTPS, local port 8000, and Gemini Cloud API fallback seamlessly.
   - Ensure preflight headers (`bypass-tunnel-reminder`) and fallback client streamer (`ai-vetting-engine.js`) activate if offline.
