/**
 * TreeRenderer — Interactive SVG Tree Engine for Morality Axioms & Proposals
 */
class TreeRenderer {
  constructor(svgId, containerId, store) {
    this.svg = document.getElementById(svgId);
    this.container = document.getElementById(containerId);
    this.viewport = document.getElementById("viewport");
    this.edgesLayer = document.getElementById("edges-layer");
    this.nodesLayer = document.getElementById("nodes-layer");

    this.store = store;
    this.selectedNodeId = null;
    this.activeLayerFilter = "all";
    this.searchQuery = "";

    // Camera & Transform state
    this.transform = { x: 0, y: 0, scale: 1 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };

    // Layout configuration
    this.nodeWidth = 180;
    this.nodeHeight = 56;
    this.layerHeight = 160;
    this.nodePositions = new Map();

    this.onNodeSelectCallback = null;
    this.onCanvasDblClickCallback = null;

    this.init();
  }

  init() {
    this.calculateLayout();
    this.render();
    this.setupPanZoom();
    this.resetCamera();

    window.addEventListener("resize", () => {
      this.calculateLayout();
      this.render();
    });
  }

  onNodeSelect(fn) {
    this.onNodeSelectCallback = fn;
  }

  onCanvasDblClick(fn) {
    this.onCanvasDblClickCallback = fn;
  }

  refresh() {
    this.calculateLayout();
    this.render();
  }

  calculateLayout() {
    this.nodePositions.clear();
    const containerWidth = Math.max(this.container.clientWidth, 1200);
    const nodes = this.store.getNodes();

    // Group nodes by layer
    const layers = [[], [], [], []];
    nodes.forEach(node => {
      const targetLayer = Math.min(3, Math.max(0, node.layer));
      layers[targetLayer].push(node);
    });

    const startY = 80;

    layers.forEach((layerNodes, layerIndex) => {
      const count = layerNodes.length;
      const totalWidth = count * (this.nodeWidth + 24);
      const startX = (containerWidth - totalWidth) / 2 + (this.nodeWidth / 2);
      const y = startY + (layerIndex * this.layerHeight);

      layerNodes.forEach((node, i) => {
        const x = startX + (i * (this.nodeWidth + 24));
        this.nodePositions.set(node.id, { x, y, node });
      });
    });
  }

  render() {
    this.edgesLayer.innerHTML = "";
    this.nodesLayer.innerHTML = "";

    const edgesToDraw = [];
    const nodes = this.store.getNodes();

    // Build connections
    nodes.forEach(childNode => {
      if (!childNode.parentIds || childNode.parentIds.length === 0) return;

      const childPos = this.nodePositions.get(childNode.id);
      if (!childPos) return;

      childNode.parentIds.forEach(parentId => {
        const parentPos = this.nodePositions.get(parentId);
        if (parentPos) {
          edgesToDraw.push({
            id: `edge-${parentId}-${childNode.id}`,
            parentId,
            childId: childNode.id,
            parentPos,
            childPos,
            parentLayer: parentPos.node.layer,
            childLayer: childPos.node.layer
          });
        }
      });
    });

    // Draw Edges
    edgesToDraw.forEach(edge => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      const x1 = edge.parentPos.x;
      const y1 = edge.parentPos.y + (this.nodeHeight / 2);
      const x2 = edge.childPos.x;
      const y2 = edge.childPos.y - (this.nodeHeight / 2);

      const midY = (y1 + y2) / 2;
      const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

      path.setAttribute("d", d);
      path.setAttribute("class", "tree-edge");
      path.setAttribute("id", edge.id);

      const gradId = `grad-${Math.min(3, edge.parentLayer)}-${Math.min(3, edge.childLayer)}`;
      path.setAttribute("stroke", `url(#${gradId})`);

      this.edgesLayer.appendChild(path);
    });

    // Draw Nodes
    nodes.forEach(node => {
      const pos = this.nodePositions.get(node.id);
      if (!pos) return;

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const isProposed = node.status === "proposed";
      g.setAttribute("class", `tree-node-group node-l${node.layer} ${isProposed ? 'proposed' : ''}`);
      g.setAttribute("id", `node-${node.id}`);
      g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);

      // Background pill
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", -this.nodeWidth / 2);
      rect.setAttribute("y", -this.nodeHeight / 2);
      rect.setAttribute("width", this.nodeWidth);
      rect.setAttribute("height", this.nodeHeight);
      rect.setAttribute("rx", 16);
      rect.setAttribute("class", "tree-node-bg");
      g.appendChild(rect);

      // Node ID badge
      const idText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      idText.setAttribute("x", -this.nodeWidth / 2 + 14);
      idText.setAttribute("y", -this.nodeHeight / 2 + 18);
      idText.setAttribute("class", "node-id-text");
      idText.textContent = isProposed ? `[P] ${node.id}` : node.id;
      g.appendChild(idText);

      // Node Title
      const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      titleText.setAttribute("x", -this.nodeWidth / 2 + 14);
      titleText.setAttribute("y", -this.nodeHeight / 2 + 38);
      titleText.setAttribute("class", "node-title-text");

      const displayTitle = node.title.length > 20 ? node.title.substring(0, 18) + "…" : node.title;
      titleText.textContent = displayTitle;
      g.appendChild(titleText);

      // Click listener
      g.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectNode(node.id);
      });

      this.nodesLayer.appendChild(g);
    });

    this.applyHighlightsAndFilters();
  }

  selectNode(nodeId) {
    if (this.selectedNodeId === nodeId) return;

    this.selectedNodeId = nodeId;
    this.applyHighlightsAndFilters();

    if (this.onNodeSelectCallback && nodeId) {
      const selectedNode = this.store.getNodeById(nodeId);
      const ancestry = this.getAncestryPath(nodeId);
      this.onNodeSelectCallback(selectedNode, ancestry);
    }
  }

  deselectNode() {
    this.selectedNodeId = null;
    this.applyHighlightsAndFilters();
    if (this.onNodeSelectCallback) {
      this.onNodeSelectCallback(null, []);
    }
  }

  getAncestryPath(nodeId) {
    const ancestors = new Set();
    const ancestorEdges = new Set();
    const nodes = this.store.getNodes();

    const trace = (currId) => {
      ancestors.add(currId);
      const currNode = nodes.find(n => n.id === currId);
      if (currNode && currNode.parentIds) {
        currNode.parentIds.forEach(parentId => {
          ancestorEdges.add(`edge-${parentId}-${currId}`);
          trace(parentId);
        });
      }
    };

    if (nodeId) trace(nodeId);
    return { nodeIds: Array.from(ancestors), edgeIds: Array.from(ancestorEdges) };
  }

  applyHighlightsAndFilters() {
    const { nodeIds: activeNodeIds, edgeIds: activeEdgeIds } = this.getAncestryPath(this.selectedNodeId);
    const nodes = this.store.getNodes();
    const hasAiSearch = this.aiMatchedNodeIds && this.aiMatchedNodeIds.length > 0;

    // Apply Node classes
    nodes.forEach(node => {
      const g = document.getElementById(`node-${node.id}`);
      if (!g) return;

      const isSelected = this.selectedNodeId === node.id;
      const isAncestor = activeNodeIds.includes(node.id) && !isSelected;
      const isAiMatch = hasAiSearch && this.aiMatchedNodeIds.includes(node.id.toUpperCase());

      const matchesLayer = this.activeLayerFilter === "all" || node.layer === parseInt(this.activeLayerFilter, 10);
      const matchesTextSearch = !this.searchQuery || 
        node.title.toLowerCase().includes(this.searchQuery) ||
        node.statement.toLowerCase().includes(this.searchQuery) ||
        node.id.toLowerCase().includes(this.searchQuery);

      const isVisible = matchesLayer && (hasAiSearch ? isAiMatch : matchesTextSearch);

      g.classList.toggle("selected", isSelected);
      g.classList.toggle("ancestor", isAncestor);
      g.classList.toggle("ai-search-highlight", isAiMatch);
      
      if (this.selectedNodeId) {
        g.classList.toggle("dimmed", !activeNodeIds.includes(node.id) || !isVisible);
      } else {
        g.classList.toggle("dimmed", !isVisible);
      }
    });

    // Apply Edge classes
    const allEdges = this.edgesLayer.querySelectorAll(".tree-edge");
    allEdges.forEach(edge => {
      const edgeId = edge.getAttribute("id");
      const isHighlighted = activeEdgeIds.includes(edgeId);

      edge.classList.toggle("highlighted", isHighlighted);
      if (this.selectedNodeId) {
        edge.classList.toggle("dimmed", !isHighlighted);
      } else {
        edge.classList.toggle("dimmed", false);
      }
    });
  }

  setLayerFilter(layer) {
    this.activeLayerFilter = layer;
    this.applyHighlightsAndFilters();
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.applyHighlightsAndFilters();
  }

  setAISearchHighlights(matchedNodeIds = []) {
    this.aiMatchedNodeIds = matchedNodeIds.map(id => id.toUpperCase());
    this.applyHighlightsAndFilters();
  }

  setupPanZoom() {
    this.container.addEventListener("mousedown", (e) => {
      if (e.target.closest(".tree-node-group")) return;
      this.isDragging = true;
      this.dragStart = { x: e.clientX - this.transform.x, y: e.clientY - this.transform.y };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.transform.x = e.clientX - this.dragStart.x;
      this.transform.y = e.clientY - this.dragStart.y;
      this.updateViewport();
    });

    window.addEventListener("mouseup", () => { this.isDragging = false; });

    this.container.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.zoomAt(zoomFactor, e.clientX, e.clientY);
    });

    this.svg.addEventListener("click", (e) => {
      if (e.target === this.svg || e.target === this.viewport) {
        this.deselectNode();
      }
    });

    this.container.addEventListener("dblclick", (e) => {
      if (!e.target.closest(".tree-node-group")) {
        this.deselectNode();
        this.setAISearchHighlights([]);
        if (typeof this.onCanvasDblClickCallback === "function") {
          this.onCanvasDblClickCallback();
        }
      }
    });
  }

  zoomAt(factor, clientX, clientY) {
    const newScale = Math.min(Math.max(this.transform.scale * factor, 0.4), 2.5);
    const rect = this.container.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    this.transform.x = mouseX - (mouseX - this.transform.x) * (newScale / this.transform.scale);
    this.transform.y = mouseY - (mouseY - this.transform.y) * (newScale / this.transform.scale);
    this.transform.scale = newScale;

    this.updateViewport();
  }

  updateViewport() {
    this.viewport.setAttribute(
      "transform",
      `translate(${this.transform.x}, ${this.transform.y}) scale(${this.transform.scale})`
    );
  }

  resetCamera() {
    const containerWidth = this.container.clientWidth;
    this.transform.scale = 0.85;
    this.transform.x = (containerWidth - 1200 * 0.85) / 2;
    this.transform.y = 40;
    this.updateViewport();
  }

  zoomIn() { this.zoomAt(1.2, this.container.clientWidth / 2, this.container.clientHeight / 2); }
  zoomOut() { this.zoomAt(0.8, this.container.clientWidth / 2, this.container.clientHeight / 2); }
}
