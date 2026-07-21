/**
 * CardGenerator — Visual Hierarchy Story Card Exporter & Web Share Engine
 * Draws visual axiomatic lineage tree (Layer 0 ➔ Layer 1 ➔ Target Node), 
 * India's Global Index Rank, and Constitutional Truth onto 1080x1350 Canvas image.
 */
class CardGenerator {
  constructor() {
    this.canvasWidth = 1080;
    this.canvasHeight = 1350;
  }

  /**
   * Generates a PNG Base64 Data URL story card for a target node
   * @param {Object} node 
   * @param {Object} perspective 
   * @param {Object} globalRank 
   * @returns {string} base64 Data URL
   */
  generateNodeCard(node, perspective, globalRank) {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
    grad.addColorStop(0, "#0b1329");
    grad.addColorStop(0.5, "#0f172a");
    grad.addColorStop(1, "#030712");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Border Frame
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, this.canvasWidth - 48, this.canvasHeight - 48);

    // 2. Header Title & Branding
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("SOCIETY MORALITY TRACKER", 60, 90);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "22px sans-serif";
    ctx.fillText("EMPIRICAL AXIOMATIC ETHICS & CONSTITUTIONAL TRUTH", 60, 125);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 150);
    ctx.lineTo(this.canvasWidth - 60, 150);
    ctx.stroke();

    // 3. Node Badge & Statement Box
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(60, 180, 960, 240, 16);
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.stroke();

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 26px monospace";
    ctx.fillText(`NODE [${node.id || 'A1'}] · LAYER ${node.layer !== undefined ? node.layer : 0}`, 90, 230);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(node.title || "Moral Statement", 90, 280);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "24px sans-serif";
    this.wrapText(ctx, node.statement || "", 90, 330, 900, 32);

    // 4. Visual Derivation Lineage Tree (Axiomatic Tree Diagram)
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.roundRect(60, 450, 960, 200, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
    ctx.stroke();

    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("🌳 AXIOMATIC LINEAGE HIERARCHY", 90, 490);

    // Draw Mini-Tree Diagram Nodes
    const parentId = (node.parentIds && node.parentIds[0]) || "A1";
    
    // Parent Node Box
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.roundRect(100, 520, 240, 60, 8);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`Axiom [${parentId}]`, 130, 558);

    // Arrow Connector
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(340, 550);
    ctx.lineTo(460, 550);
    ctx.stroke();

    // Target Node Box
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.roundRect(460, 520, 260, 60, 8);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`Target [${node.id || 'A1'}]`, 490, 558);

    // 5. India Global Ranking Badge
    if (globalRank) {
      ctx.fillStyle = "#022c22";
      ctx.beginPath();
      ctx.roundRect(60, 680, 960, 140, 16);
      ctx.fill();
      ctx.strokeStyle = "#10b981";
      ctx.stroke();

      ctx.fillStyle = "#34d399";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`🇮🇳 INDIA GLOBAL INDEX: ${globalRank.indexName || 'Index'}`, 90, 725);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px monospace";
      ctx.fillText(`RANK: ${globalRank.rank || 'N/A'}`, 90, 780);
      
      ctx.fillStyle = "#94a3b8";
      ctx.font = "20px sans-serif";
      ctx.fillText(`Agency: ${globalRank.agency || 'Independent Agency'}`, 540, 780);
    }

    // 6. Indian Constitutional Promise & Lived Story
    if (perspective && perspective.constitution) {
      ctx.fillStyle = "#1e1b4b";
      ctx.beginPath();
      ctx.roundRect(60, 840, 960, 260, 16);
      ctx.fill();
      ctx.strokeStyle = "#818cf8";
      ctx.stroke();

      ctx.fillStyle = "#a5b4fc";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(`📜 CONSTITUTIONAL GUARANTEE (${perspective.constitution.article || 'Preamble'})`, 90, 885);

      ctx.fillStyle = "#e0e7ff";
      ctx.font = "italic 24px sans-serif";
      this.wrapText(ctx, `"${perspective.constitution.excerpt || perspective.constitution.promise || ''}"`, 90, 930, 900, 32);
    }

    // 7. Footer & Link
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 22px monospace";
    ctx.fillText("https://thepermanenturl.github.io/SocietyMoralityTracker/", 60, 1280);

    ctx.fillStyle = "#64748b";
    ctx.font = "20px sans-serif";
    ctx.fillText("Unvarnished Truth · Web Share API Verified", 640, 1280);

    return canvas.toDataURL("image/png");
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  async shareCard(node, perspective, globalRank) {
    const dataUrl = this.generateNodeCard(node, perspective, globalRank);
    if (!dataUrl) return false;

    if (typeof navigator !== "undefined" && navigator.share && typeof fetch !== "undefined") {
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `morality_node_${node.id || 'card'}.png`, { type: "image/png" });
        await navigator.share({
          title: `Society Morality Tracker - Node [${node.id}]`,
          text: `Moral Statement [${node.id}]: ${node.title}. Derived from foundational axioms and Indian Constitutional guarantees.`,
          files: [file]
        });
        return true;
      } catch (e) {
        console.warn("Web Share API fallback:", e);
      }
    }

    // Fallback: Open image in new window or trigger download
    const link = document.createElement("a");
    link.download = `morality_node_${node.id || 'card'}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  }
}

if (typeof module !== "undefined") {
  module.exports = CardGenerator;
} else if (typeof window !== "undefined") {
  window.CardGenerator = CardGenerator;
  window.cardGenerator = new CardGenerator();
}
