/**
 * Conscience Dashboard Component for makeMoralityTrackable
 * Modularly connects ConsciencePulseAdapter sensing feed to the interactive SVG tree canvas.
 */
class ConscienceDashboardUI {
  constructor() {
    this.adapter = new ConsciencePulseAdapter();
    this.container = null;
    this.initUI();
  }

  initUI() {
    if (typeof document === 'undefined') return;
    
    // Check if drawer or container exists
    let drawer = document.getElementById('conscience-dashboard-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'conscience-dashboard-drawer';
      drawer.style.cssText = `
        position: fixed;
        top: 80px;
        left: 24px;
        z-index: 900;
        width: 320px;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(51, 65, 85, 0.5);
        border-radius: 12px;
        padding: 16px;
        color: #e2e8f0;
        font-family: 'Inter', system-ui, sans-serif;
        box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      `;
      drawer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 700; color: #38bdf8; margin: 0;">🌐 Global Conscience Pulse</h3>
          <button id="refresh-pulse-btn" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 12px;">🔄 Sync</button>
        </div>
        <div id="pulse-content" style="font-size: 12px; color: #94a3b8;">
          <p>Connecting to real-time sensing engine (Port 8001)...</p>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    this.container = document.getElementById('pulse-content');
    
    const refreshBtn = document.getElementById('refresh-pulse-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.syncPulse());
    }

    // Initial sync
    this.syncPulse();
  }

  async syncPulse() {
    if (!this.container) return;
    this.container.innerHTML = `<p style="color: #38bdf8;">Syncing latest news claims & 2500-yr precedents...</p>`;

    const pulse = await this.adapter.fetchConsciencePulse();
    if (!pulse || !pulse.clusters || pulse.clusters.length === 0) {
      this.container.innerHTML = `<p style="color: #f59e0b;">⚠️ Sensing Server offline (Port 8001). Using offline cache.</p>`;
      if (window.uiToastManager) {
        window.uiToastManager.show('Make a Sense server offline on Port 8001', 'warning');
      }
      return;
    }

    let html = `<div style="display: flex; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto;">`;
    pulse.clusters.slice(0, 3).forEach(c => {
      html += `
        <div style="background: rgba(30, 41, 59, 0.6); padding: 8px; border-radius: 6px; border-left: 3px solid #38bdf8;">
          <div style="font-weight: 600; color: #f1f5f9; font-size: 11px;">${c.topic_headline}</div>
          <div style="display: flex; justify-content: space-between; margin-top: 4px; font-size: 10px; color: #64748b;">
            <span>Trust: ${c.aggregate_trust_percent}%</span>
            <span>Sources: ${c.participating_sources.length}</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    this.container.innerHTML = html;

    if (window.uiToastManager) {
      window.uiToastManager.show(`Synced ${pulse.clusterCount} active claim clusters`, 'success');
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.conscienceDashboardUI = new ConscienceDashboardUI();
  });
}
