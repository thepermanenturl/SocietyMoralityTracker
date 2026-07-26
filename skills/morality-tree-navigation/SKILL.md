---
name: morality-tree-navigation
description: Navigate, audit, and render the 34-node Morality Tree hierarchy (Layer 0 Axioms A1-A6 to Layer 3 Dilemmas X1-X8) on the makeMoralityTrackable SVG canvas.
---

# Morality Tree Navigation & Conscience Audit Skill

Use this skill when interacting with `makeMoralityTrackable` frontend components, SVG canvas visualizer (`tree-renderer.js`), or running Socratic morality audits.

## Core Directives

1. **Always Cite Node Chips**: Include formal node chips `[A1]` to `[A6]` (Layer 0 Axioms), `[D1]` to `[D8]` (Derived Principles), `[E1]` to `[E12]` (Applied Ethics), or `[X1]` to `[X8]` (Complex Dilemmas).
2. **Trace Derivation Lineage**: Show parent-to-child lineage (e.g., `[A1] Suffering -> [D2] Bodily Integrity -> [E5] Digital Privacy`).
3. **SVG Canvas Illumination**: Return target node array to highlight on `tree-renderer.js`.

## Example Usage & Triggers

- `/navigate [node_id]`: Renders node lineage and sibling relationships.
- `/audit [claim]`: Audits claim derivation strength and checks for fallacies.
- `/dilemma [topic]`: Constructs opposing axiom trade-off dilemmas.
