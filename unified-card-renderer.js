/**
 * Unified Card Renderer for makeMoralityTrackable
 * Renders all Nodes, Governance News Items, and 2500-Year Historical Anecdotes
 * into clean, standardized (Headline + Content) cards with interactive relation links.
 */
class UnifiedCardRenderer {
  /**
   * Renders a standardized Headline + Content Glassmorphic Card
   * @param {Object} opts
   * @param {string} opts.id - Item ID
   * @param {string} opts.type - 'node' | 'news' | 'history'
   * @param {string} opts.headline - Card Headline
   * @param {string} opts.content - Card Body Content
   * @param {string} opts.badgeText - Badge / Tag label
   * @param {Array<string>} opts.relationChips - Node IDs or link tags e.g. ['A1', 'D4', 'E5']
   * @param {Object} opts.metadata - Optional metadata (trust percent, epoch, source)
   * @returns {string} HTML string
   */
  static renderCard({ id, type, headline, content, badgeText, relationChips = [], metadata = {} }) {
    const badgeColors = {
      node: 'background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);',
      news: 'background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);',
      history: 'background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4);'
    };

    const chipsHtml = (relationChips || []).filter(c => Boolean(c)).map(chip => `
      <span class="clickable-relation-chip" data-node-id="${chip}" style="
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(148, 163, 184, 0.3);
        border-radius: 4px;
        color: #38bdf8;
        font-family: monospace;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      " onclick="window.dispatchEvent(new CustomEvent('select-node', { detail: { nodeId: '${chip}' } })); if(window.uiToastManager) window.uiToastManager.show('Opening target node [${chip}]', 'info');">
        [${chip}]
      </span>
    `).join(' ');

    let metaHtml = '';
    if (metadata.trust) {
      metaHtml += `<span style="color: #10b981; font-weight: 600;">Trust: ${metadata.trust}%</span> · `;
    }
    if (metadata.epoch) {
      metaHtml += `<span style="color: #c084fc;">Epoch: ${metadata.epoch}</span> · `;
    }
    if (metadata.source) {
      metaHtml += `<span>Source: ${metadata.source}</span>`;
    }

    return `
      <div class="unified-story-card glass-card" id="card-${id}" style="
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(51, 65, 85, 0.6);
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        transition: transform 0.2s ease, border-color 0.2s ease;
      ">
        <!-- Card Header & Badge -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <span style="padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; ${badgeColors[type] || badgeColors.node}">
            ${badgeText || type.toUpperCase()}
          </span>
          <div style="font-size: 11px; color: #64748b;">
            ${metaHtml}
          </div>
        </div>

        <!-- Headline -->
        <h4 style="font-size: 16px; font-weight: 700; color: #f8fafc; margin: 0 0 8px 0; line-height: 1.3;">
          ${headline}
        </h4>

        <!-- Content -->
        <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin: 0 0 12px 0;">
          ${content}
        </p>

        <!-- Relations & Link Chips -->
        ${relationChips.length > 0 ? `
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding-top: 8px; border-top: 1px solid rgba(51, 65, 85, 0.4);">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 600;">Linked Axioms:</span>
            ${chipsHtml}
          </div>
        ` : ''}
      </div>
    `;
  }
}

if (typeof window !== 'undefined') {
  window.UnifiedCardRenderer = UnifiedCardRenderer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UnifiedCardRenderer };
}
