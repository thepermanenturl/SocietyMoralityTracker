/**
 * PrismSpectrumRenderer — Refractive Prism Spectrum Renderer (Paradigm 3)
 * Renders policy queries as a single light beam passing through a central Triangular Prism
 * (The 3 Primitives) and splitting into 3 color-coded ethical spectrum bands:
 * - 🟢 Non-Harm / Well-Being Band
 * - 🔵 Rights & Agency Band
 * - 🟡 Equal Weight / Impartiality Band
 */
class PrismSpectrumRenderer {
  constructor(svgId, containerId, store) {
    this.svg = document.getElementById(svgId);
    this.container = document.getElementById(containerId);
    this.store = store;
    this.selectedNodeId = null;
    this.onNodeSelectCallback = null;
  }

  onNodeSelect(fn) {
    this.onNodeSelectCallback = fn;
  }

  render() {
    if (!this.svg || !this.container) return;

    const edgesLayer = document.getElementById("edges-layer");
    const nodesLayer = document.getElementById("nodes-layer");

    if (!edgesLayer || !nodesLayer) return;

    edgesLayer.innerHTML = "";
    nodesLayer.innerHTML = "";

    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width || 1200, 1000);
    const height = Math.max(rect.height || 800, 700);
    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Incident White Light Beam (Policy Input Query)
    const incidentBeam = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    incidentBeam.setAttribute("points", `40,${centerY - 8} ${centerX - 100},${centerY - 2} ${centerX - 100},${centerY + 2} 40,${centerY + 8}`);
    incidentBeam.setAttribute("fill", "url(#beam-gradient)");
    incidentBeam.setAttribute("opacity", "0.85");
    edgesLayer.appendChild(incidentBeam);

    // Incident Label
    const incLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    incLabel.setAttribute("x", "60");
    incLabel.setAttribute("y", centerY - 20);
    incLabel.setAttribute("fill", "#e2e8f0");
    incLabel.setAttribute("font-size", "12px");
    incLabel.setAttribute("font-weight", "800");
    incLabel.textContent = "🔦 INCIDENT POLICY / CLAIM BEAM";
    edgesLayer.appendChild(incLabel);

    // 2. Central Refractive Glass Prism (3 Primitives)
    const prism = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const p1 = `${centerX},${centerY - 140}`;
    const p2 = `${centerX - 120},${centerY + 100}`;
    const p3 = `${centerX + 120},${centerY + 100}`;
    prism.setAttribute("points", `${p1} ${p2} ${p3}`);
    prism.setAttribute("fill", "rgba(56, 189, 248, 0.08)");
    prism.setAttribute("stroke", "#38bdf8");
    prism.setAttribute("stroke-width", "3");
    prism.setAttribute("filter", "drop-shadow(0 0 16px rgba(56, 189, 248, 0.4))");
    edgesLayer.appendChild(prism);

    // Prism Label
    const prismText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    prismText.setAttribute("x", centerX);
    prismText.setAttribute("y", centerY + 30);
    prismText.setAttribute("text-anchor", "middle");
    prismText.setAttribute("fill", "#fbbf24");
    prismText.setAttribute("font-size", "13px");
    prismText.setAttribute("font-weight", "800");
    prismText.textContent = "3-PRIMITIVE PRISM";
    edgesLayer.appendChild(prismText);

    // 3. Spectral Refraction Beams (3 Color Bands)
    const bands = [
      { name: "🟢 Non-Harm / Well-Being Band", color: "#10b981", yOffset: -180, nodes: ["A1", "A2", "D1", "D6", "E1", "E7"] },
      { name: "🔵 Agency & Rights Band", color: "#3b82f6", yOffset: 0, nodes: ["A4", "D2", "D4", "E5", "E6"] },
      { name: "🟡 Equal Weight & Justice Band", color: "#f59e0b", yOffset: 180, nodes: ["A3", "A5", "A6", "D3", "D8", "E3", "E9"] }
    ];

    bands.forEach(band => {
      // Fan out beam
      const beam = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      const targetY = centerY + band.yOffset;
      beam.setAttribute("points", `${centerX + 40},${centerY} ${width - 320},${targetY - 30} ${width - 320},${targetY + 30}`);
      beam.setAttribute("fill", band.color);
      beam.setAttribute("opacity", "0.15");
      edgesLayer.appendChild(beam);

      // Band Header Badge
      const headerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      headerG.setAttribute("transform", `translate(${width - 300}, ${targetY - 35})`);

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "260");
      rect.setAttribute("height", "30");
      rect.setAttribute("rx", "8");
      rect.setAttribute("fill", "rgba(15, 23, 42, 0.85)");
      rect.setAttribute("stroke", band.color);
      rect.setAttribute("stroke-width", "1.5");

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", "12");
      label.setAttribute("y", "20");
      label.setAttribute("fill", band.color);
      label.setAttribute("font-size", "11px");
      label.setAttribute("font-weight", "800");
      label.textContent = band.name;

      headerG.appendChild(rect);
      headerG.appendChild(label);
      nodesLayer.appendChild(headerG);

      // Render Nodes along Spectral Band
      band.nodes.forEach((nodeId, idx) => {
        const node = this.store.getNodeById(nodeId);
        if (!node) return;

        const nx = width - 300 + (idx % 2) * 135;
        const ny = targetY + 10 + Math.floor(idx / 2) * 45;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", `node-${node.id}`);
        g.setAttribute("class", `tree-node-group node-l${node.layer}`);
        g.setAttribute("transform", `translate(${nx}, ${ny})`);

        const nRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        nRect.setAttribute("width", "125");
        nRect.setAttribute("height", "36");
        nRect.setAttribute("rx", "8");
        nRect.setAttribute("class", "tree-node-bg");
        nRect.setAttribute("style", `stroke: ${band.color};`);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "62");
        text.setAttribute("y", "22");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#e2e8f0");
        text.setAttribute("font-size", "10px");
        text.setAttribute("font-weight", "700");
        text.textContent = `[${node.id}] ${node.title.substring(0, 14)}`;

        g.appendChild(nRect);
        g.appendChild(text);

        g.addEventListener("click", (e) => {
          e.stopPropagation();
          this.selectNode(node.id);
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
    const ids = matchedNodeIds.map(id => id.toUpperCase());
    const nodes = this.store.getNodes();
    nodes.forEach(node => {
      const g = document.getElementById(`node-${node.id}`);
      if (g) {
        const isMatch = ids.includes(node.id.toUpperCase());
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
  window.PrismSpectrumRenderer = PrismSpectrumRenderer;
}
