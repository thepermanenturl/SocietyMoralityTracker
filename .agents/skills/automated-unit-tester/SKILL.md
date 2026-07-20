---
name: automated-unit-tester
description: Unit testing runner and test suite generator for frontend JavaScript data models, search engines, and state stores.
---

# Automated Unit Tester Skill

This skill defines the guidelines for creating and running lightweight browser/Node.js unit tests:

1. **Dataset Integrity**:
   - Verify `MORALITY_DATA` (34 nodes) contains valid `id`, `title`, `statement`, `layer`, `parentIds`, and non-empty `evidence`.
   - Verify `PERSPECTIVES_DATA` has valid `constitution`, `modernBuddha`, `critic`, `wangchuk`, and `dailyDilemma` objects for all 34 nodes.

2. **Semantic Search & Highlight Engine**:
   - Verify `AIVettingEngine.querySearchPerspective` correctly maps search tokens (e.g., "suffering", "privacy", "education", "pain", "climate") to expected node IDs.

3. **Store & Voting Logic**:
   - Verify `MoralityStore.voteProposal` updates vote counts and persists to `localStorage`.
