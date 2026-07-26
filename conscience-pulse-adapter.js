/**
 * Conscience Pulse Adapter for makeMoralityTrackable
 * Bridges real-time global news sensing (Port 8001) and pre-execution vetting (Port 8000)
 * into the interactive Morality Hierarchy UI canvas.
 */
class ConsciencePulseAdapter {
  constructor(options = {}) {
    this.senseUrl = options.senseUrl || 'http://127.0.0.1:8001';
    this.brainUrl = options.brainUrl || 'http://127.0.0.1:8000';
    this.activePulse = null;
    this.listeners = [];
  }

  /**
   * Fetches real-time sensed claim clusters and trust metrics from make_a_sense (Port 8001)
   */
  async fetchConsciencePulse() {
    try {
      const response = await fetch(`${this.senseUrl}/api/feed/clusters?min_trust=50`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      this.activePulse = {
        timestamp: new Date().toISOString(),
        clusterCount: data.cluster_count || 0,
        clusters: data.clusters || []
      };

      this.notifyListeners('pulse_updated', this.activePulse);
      return this.activePulse;
    } catch (err) {
      console.warn('[ConsciencePulseAdapter] Could not fetch live pulse:', err.message);
      return null;
    }
  }

  /**
   * Fetches 2500-Year Historical Precedents matching a dilemma or query
   */
  async fetchHistoricalPrecedents(query = '') {
    try {
      const url = `${this.senseUrl}/api/history/precedents${query ? '?query=' + encodeURIComponent(query) : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('[ConsciencePulseAdapter] Could not fetch historical precedents:', err.message);
      return { status: 'error', events: [] };
    }
  }

  /**
   * Preceding check: verifies health of make_a_brain before making API calls
   */
  async checkBrainHealth() {
    try {
      const res = await fetch(`${this.brainUrl}/api/health`);
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  /**
   * Evaluates proposed action against PreExecutionGate on make_a_brain (Port 8000)
   */
  async vetAction(actionType, payload = {}) {
    const isHealthy = await this.checkBrainHealth();
    if (!isHealthy) {
      console.warn('[ConsciencePulseAdapter] Pre-call health check failed; make_a_brain offline.');
      if (typeof window !== 'undefined' && window.uiToastManager) {
        window.uiToastManager.show('Brain server offline (Port 8000). Action un-vetted.', 'warning');
      }
      return { approved: true, confidence_score: 0.5, violated_nodes: [], socratic_veto: null };
    }

    try {
      const response = await fetch(`${this.brainUrl}/api/vetting/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_type: actionType, payload: payload })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn('[ConsciencePulseAdapter] Vetting evaluation failed:', err.message);
      return { approved: true, confidence_score: 0.5, violated_nodes: [], socratic_veto: null };
    }
  }

  /**
   * Subscribes a callback to adapter events ('pulse_updated', etc.)
   */
  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  notifyListeners(event, data) {
    this.listeners.forEach(cb => {
      try {
        cb(event, data);
      } catch (e) {
        console.error('[ConsciencePulseAdapter Listener Error]', e);
      }
    });
  }
}

// Export for global browser window and module loading
if (typeof window !== 'undefined') {
  window.ConsciencePulseAdapter = ConsciencePulseAdapter;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ConsciencePulseAdapter };
}
