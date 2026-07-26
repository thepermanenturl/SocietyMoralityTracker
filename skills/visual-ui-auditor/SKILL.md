---
name: visual-ui-auditor
description: Audit visual UI polish, glassmorphic styling, WCAG contrast ratios, and toast notifications in makeMoralityTrackable.
---

# Visual UI Auditor & Polish Skill

Use this skill when refining frontend components (`index.html`, `style.css`, `tree-renderer.js`, `ui-toast-manager.js`).

## Audit Guidelines

1. **Glassmorphism Aesthetic**: Ensure `backdrop-filter: blur(...)` and semi-transparent HSL colors are applied cleanly.
2. **Toast Feedback**: Verify `uiToastManager.show(message, type)` triggers on server events and Socratic Vetoes.
3. **Accessibility**: Maintain dark mode readability and touch target bounds (>44px).
