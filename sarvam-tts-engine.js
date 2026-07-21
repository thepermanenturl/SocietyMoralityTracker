/**
 * SarvamTTSEngine — Multilingual Text-to-Speech Engine for Indian Languages
 * Supports Sarvam AI REST API with quota-preserving Web Speech API fallback.
 */
class SarvamTTSEngine {
  constructor() {
    // Read API key dynamically from localStorage or settings — NEVER hardcoded in source
    this.apiKey = typeof localStorage !== "undefined" && localStorage.getItem("sarvam_api_key")
      ? localStorage.getItem("sarvam_api_key")
      : "";
    this.apiEndpoint = "https://api.sarvam.ai/text-to-speech";
    this.isSpeaking = false;
    this.audioElement = null;
    
    // Language Code Mapping
    this.langMap = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      bn: "bn-IN"
    };

    this.voiceTargets = {
      "en-IN": "meera",
      "hi-IN": "meera",
      "ta-IN": "meera",
      "bn-IN": "meera"
    };
  }

  /**
   * Speaks text using Sarvam AI API if forceSarvam=true or testing, else uses browser Web Speech API
   * @param {string} text 
   * @param {string} lang ('en'|'hi'|'ta'|'bn')
   * @param {boolean} forceSarvam 
   */
  async speak(text, lang = "en", forceSarvam = false) {
    this.stop();
    const cleanText = (text || "").replace(/<[^>]*>/g, "").slice(0, 500); // Protect quota limit
    if (!cleanText) return false;

    const targetLang = this.langMap[lang] || "en-IN";

    if (forceSarvam && this.apiKey) {
      try {
        console.log(`[Sarvam AI TTS] Requesting speech synthesis for language '${targetLang}'...`);
        const res = await fetch(this.apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-subscription-key": this.apiKey
          },
          body: JSON.stringify({
            inputs: [cleanText],
            target_language_code: targetLang,
            speaker: this.voiceTargets[targetLang] || "meera",
            pitch: 0,
            pace: 1.0,
            loudness: 1.5,
            speech_sample_rate: 16000,
            enable_preprocessing: true,
            model: "bulbul:v1"
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audios && data.audios[0]) {
            const audioSrc = `data:audio/wav;base64,${data.audios[0]}`;
            this.audioElement = new Audio(audioSrc);
            this.isSpeaking = true;
            this.audioElement.onended = () => { this.isSpeaking = false; };
            await this.audioElement.play();
            return true;
          }
        } else {
          console.warn("[Sarvam AI TTS] Quota limit or response error, falling back to Web Speech API.");
        }
      } catch (e) {
        console.error("[Sarvam AI TTS] Error:", e);
      }
    }

    // Default Quota-Preserving Fallback: Browser Web Speech API
    return this.speakWebSpeech(cleanText, targetLang);
  }

  speakWebSpeech(text, targetLang) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Web Speech API not supported.");
      return false;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang;
      utterance.rate = 0.95;
      this.isSpeaking = true;

      utterance.onend = () => { this.isSpeaking = false; };
      utterance.onerror = () => { this.isSpeaking = false; };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.error("Web Speech API playback error:", e);
      return false;
    }
  }

  stop() {
    this.isSpeaking = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

if (typeof module !== "undefined") {
  module.exports = SarvamTTSEngine;
} else if (typeof window !== "undefined") {
  window.SarvamTTSEngine = SarvamTTSEngine;
  window.sarvamTTS = new SarvamTTSEngine();
}
