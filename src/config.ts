/**
 * Centralized API & Environment Configuration
 * Auto-detects cloud deployment (Cloudflare Workers / Pages) vs local environment.
 */

const env = (import.meta as any).env || {};

const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
export const IS_CLOUD = isBrowser && !isLocalhost;

const DEFAULT_CLOUD_CORTEX = 'https://cortex-organ-516655590388.us-central1.run.app';

export const CONFIG = {
  BRAIN_API_URL: env.VITE_API_BASE_URL || (IS_CLOUD ? DEFAULT_CLOUD_CORTEX : 'http://127.0.0.1:8000'),
  SENSE_API_URL: env.VITE_SENSE_API_URL || (IS_CLOUD ? DEFAULT_CLOUD_CORTEX : 'http://127.0.0.1:8001'),
  IS_DEV: env.DEV ?? !IS_CLOUD,
  IS_CLOUD,
  APP_VERSION: '2.1.0-cloud',
};

export default CONFIG;
