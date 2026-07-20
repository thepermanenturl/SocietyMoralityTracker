---
name: mobile-ui-accessibility-checker
description: Audit mobile phone accessibility, touch target sizing, mobile bottom dock navigation, and drawer layout scaling.
---

# Mobile UI Accessibility Checker Skill

This skill defines the guidelines for auditing mobile responsiveness and accessibility:

1. **Touch Target Sizing**:
   - Every interactive element (buttons, chips, dropdowns, links, tab items) must have a minimum touch target size of 44px x 44px on screens <= 768px.

2. **Mobile Bottom Navigation Bar (`#mobile-bottom-nav`)**:
   - Ensure the mobile bottom dock stays fixed at `bottom: 0`, `z-index: 3000`, with high contrast active states (`#38bdf8`).
   - Toggling tabs between Tree, AI Agent, News Feed, and Propose must cleanly manage open drawers without overlap.

3. **Fullscreen Phone Drawers**:
   - Ensure `#ai-chat-window`, `#detail-panel`, and `#news-feed-drawer` take full screen width (`width: 100vw`) and height (`calc(100vh - 114px)`) on mobile devices with smooth scrolling.
