/**
 * Glassmorphic UI Toast Manager for makeMoralityTrackable
 * Provides real-time visual feedback for backend connections, Socratic Vetoes, and offline warnings.
 */
class UIToastManager {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    if (typeof document === 'undefined') return;
    let existing = document.getElementById('ui-toast-container');
    if (existing) {
      this.container = existing;
      return;
    }

    this.container = document.createElement('div');
    this.container.id = 'ui-toast-container';
    this.container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 380px;
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', durationMs = 4000) {
    if (!this.container) this.initContainer();
    if (!this.container) return;

    const toast = document.createElement('div');
    toast.className = `glass-toast glass-toast-${type}`;

    const colors = {
      info: 'rgba(59, 130, 246, 0.85)',
      success: 'rgba(16, 185, 129, 0.85)',
      warning: 'rgba(245, 158, 11, 0.85)',
      error: 'rgba(239, 68, 68, 0.85)',
      veto: 'rgba(168, 85, 247, 0.85)'
    };

    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      veto: '🏛️'
    };

    toast.style.cssText = `
      background: rgba(18, 24, 38, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid ${colors[type] || colors.info};
      border-left: 4px solid ${colors[type] || colors.info};
      border-radius: 8px;
      padding: 12px 16px;
      color: #f3f4f6;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      line-height: 1.4;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      pointer-events: auto;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: translateY(10px);
    `;

    toast.innerHTML = `<span style="margin-right: 8px;">${icons[type] || 'ℹ️'}</span> ${message}`;
    this.container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, durationMs);
  }
}

if (typeof window !== 'undefined') {
  window.uiToastManager = new UIToastManager();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UIToastManager };
}
