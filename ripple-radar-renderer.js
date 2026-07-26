/**
 * RippleRadarRenderer — Concentric "Expanding Ripple" Radar Map Renderer (Paradigm 2)
 * Renders Peter Singer's "Expanding Circle of Empathy" as 4 target rings:
 * - Center: Core 3 Primitives (Non-Harm, Agency, Equal Weight)
 * - Ring 1: Foundational Axioms (Layer 0)
 * - Ring 2: Derived Principles (Layer 1)
 * - Ring 3: Applied Ethics & Dilemmas (Layer 2 & 3)
 */
class RippleRadarRenderer {
  constructor(svgId, containerId, store) {
    this.svg = document.getElementById(svgId);
    this.container = document.getElementById(containerId);
    this.store = store;

    this.transform = { x: 0, y: 0, scale: 1 };
    this.selectedNodeId = null;
    this.aiMatchedNodeIds = [];

    this.onNodeSelectCallback = null;
  }

  onNodeSelect(fn) {
    this.onNodeSelectCallback = fn;
  }

  render() {
    if (!this.svg || !this.container) return;

    const viewport = document.getElementById("viewport");
    const edgesLayer = document.getElementById("edges-layer");
    const nodesLayer = document.getElementById("nodes-layer");

    if (!viewport || !edgesLayer || !nodesLayer) return;

    edgesLayer.innerHTML = "";
    nodesLayer.innerHTML = "";

    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width || 1200, 1000);
    const height = Math.max(rect.height || 800, 700);
    const centerX = width / 2;
    const centerY = height / 2;

    const radii = [0, 160, 310, 460]; // Expanded Concentric Ring Radii
    const ringLabels = [
      "Center: 3 Minimal Primitives",
      "Ring 1: Foundational Axioms",
      "Ring 2: Universal Principles",
      "Ring 3: Applied Ethics & Dilemmas"
    ];

    // 1. Draw Concentric Radar Rings
    radii.forEach((r, idx) => {
      if (r === 0) return;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", centerX);
      circle.setAttribute("cy", centerY);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "rgba(56, 189, 248, 0.2)");
      circle.setAttribute("stroke-width", "1.5");
      circle.setAttribute("stroke-dasharray", "4,4");
      edgesLayer.appendChild(circle);

      // Ring Label Text
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", centerX + 10);
      text.setAttribute("y", centerY - r + 15);
      text.setAttribute("fill", "rgba(148, 163, 184, 0.6)");
      text.setAttribute("font-size", "10px");
      text.setAttribute("font-weight", "700");
      text.textContent = ringLabels[idx];
      edgesLayer.appendChild(text);
    });

    // 2. Center Core Primitives Badge
    const centerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    centerG.setAttribute("transform", `translate(${centerX}, ${centerY})`);
    
    const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute("r", "50");
    centerCircle.setAttribute("fill", "rgba(16, 185, 129, 0.15)");
    centerCircle.setAttribute("stroke", "#10b981");
    centerCircle.setAttribute("stroke-width", "2.5");
    centerG.appendChild(centerCircle);

    const centerText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    centerText.setAttribute("text-anchor", "middle");
    centerText.setAttribute("dy", "4");
    centerText.setAttribute("fill", "#fbbf24");
    centerText.setAttribute("font-size", "11px");
    centerText.setAttribute("font-weight", "800");
    centerText.textContent = "3 PRIMITIVES";
    centerG.appendChild(centerText);

    nodesLayer.appendChild(centerG);

    // 3. Position 34 Nodes across Rings
    const nodes = this.store.getNodes();
    const ringGroups = { 0: [], 1: [], 2: [], 3: [] };

    nodes.forEach(n => {
      const ringIdx = Math.min(3, Math.max(1, n.layer === -1 ? 1 : n.layer));
      ringGroups[ringIdx].push(n);
    });

    Object.keys(ringGroups).forEach(ringKey => {
      const rIdx = parseInt(ringKey, 10);
      if (rIdx === 0) return;
      const groupNodes = ringGroups[rIdx];
      const count = groupNodes.length;
      const radius = radii[rIdx];
      const angleStep = (2 * Math.PI) / count;

      groupNodes.forEach((node, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const nx = centerX + radius * Math.cos(angle);
        const ny = centerY + radius * Math.sin(angle);

        // Draw node group
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", `node-${node.id}`);
        g.setAttribute("class", `tree-node-group node-l${node.layer}`);
        g.setAttribute("transform", `translate(${nx - 75}, ${ny - 20})`);

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "150");
        rect.setAttribute("height", "40");
        rect.setAttribute("rx", "20");
        rect.setAttribute("class", "tree-node-bg");

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "75");
        text.setAttribute("y", "24");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#e2e8f0");
        text.setAttribute("font-size", "11px");
        text.setAttribute("font-weight", "600");
        text.textContent = `[${node.id}] ${node.title.substring(0, 16)}`;

        g.appendChild(rect);
        g.appendChild(text);

        // Click handler
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectNode(node.id);
        });

        nodesLayer.appendChild(g);
      });
        nodesLayer.appendChild(g);
      });
    });

    // Background Canvas Click -> Deselect
    this.svg.onclick = (e) => {
      if (!e.target.closest(".tree-node-group")) {
        this.deselectNode();
      }
    };
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    if (typeof this.onNodeSelectCallback === "function") {
      const node = nodeId ? this.store.getNodeById(nodeId) : null;
      this.onNodeSelectCallback(node);
    }
  }

  setAISearchHighlights(matchedNodeIds = []) {
    this.aiMatchedNodeIds = matchedNodeIds.map(id => id.toUpperCase());
    const nodes = this.store.getNodes();
    nodes.forEach(node => {
      const g = document.getElementById(`node-${node.id}`);
      if (g) {
        const isMatch = this.aiMatchedNodeIds.includes(node.id.toUpperCase());
        g.classList.toggle("ai-search-highlight", isMatch);
      }
    });
  }

  deselectNode() {
    this.selectedNodeId = null;
    if (typeof this.onNodeSelectCallback === "function") {
      this.onNodeSelectCallback(null);
    }
  }

  resetCamera() {
    this.render();
  }

  zoomIn() {}
  zoomOut() {}
}

if (typeof window !== "undefined") {
  window.RippleRadarRenderer = RippleRadarRenderer;
}
