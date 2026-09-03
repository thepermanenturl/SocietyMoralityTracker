import React, { useState, useEffect } from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { X, Copy, Check, Server, Sparkles, HelpCircle } from 'lucide-react';
import skillsPackage from '../../../morality_tree_skills_package.json';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, toggleSettings } = useMoralityStore();
  const [serverUrl, setServerUrl] = useState('http://127.0.0.1:8000');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('morality_agent_connection_settings_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.localPortConfig?.url) setServerUrl(parsed.localPortConfig.url);
        else if (parsed.remoteServerConfig?.url) setServerUrl(parsed.remoteServerConfig.url);
      } catch (e) {
        // default fallback
      }
    }
  }, []);

  if (!isSettingsOpen) return null;

  const compiledContext = `YOU ARE THE LIVE MORALITY TREE AI VETTING & DEBATE AGENT.
${JSON.stringify(skillsPackage.tree_summary, null, 2)}

ACTIVE SKILLS:
${skillsPackage.skills.map(s => `- ${s.name} (${s.command}): ${s.description}\n  Prompt: ${s.prompt_instructions}`).join('\n\n')}

REQUIRED WORKFLOW:
1. Ground moral claims in Layer 0 Foundational Axioms (A1-A6).
2. Trace derivation strength down to Layer 1 Principles (D1-D8) and Layer 2 Policies (E1-E12).
3. Evaluate high-stakes trade-offs against Layer 3 Dilemmas (X1-X8).`;

  const handleCopyContext = () => {
    navigator.clipboard.writeText(compiledContext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveSettings = () => {
    const payload = {
      mode: serverUrl.startsWith('http://127.0.0.1') || serverUrl.startsWith('http://localhost') ? 'local_port' : 'remote_server',
      localPortConfig: { url: serverUrl },
      remoteServerConfig: { url: serverUrl }
    };
    localStorage.setItem('morality_agent_connection_settings_v1', JSON.stringify(payload));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">Agent Connection & Portable Context</h2>
          </div>
          <button
            onClick={() => toggleSettings(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-5 pr-1">
          {/* Connection Details Form */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                Developer / Local Testing Mode (Optional)
              </label>
              <p className="text-xs text-slate-300 leading-relaxed">
                The online cloud version automatically routes ethical reasoning and AI dialogues through Cloudflare Edge. You can optionally specify a custom local endpoint below for offline testing or private model experimentation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="http://127.0.0.1:8000 or https://your-tunnel.trycloudflare.com"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {savedSuccess ? 'Saved! ✓' : 'Save Connection'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Optional local port: <code className="text-sky-400">http://127.0.0.1:8000</code>. Production deployments automatically use the Cloudflare Edge API.
            </p>
          </div>

          {/* Helpful Tip Banner */}
          <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-3.5 flex items-start gap-3 text-amber-200 text-xs">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">💡 Helpful Tip for Any LLM Model:</span> You can click the copy button below and send this portable context as your first message in any local (Ollama, LM Studio, Qwen) or online (OpenAI, Gemini, Claude) chatbox to instantly equip any model with 34-node Morality Tree reasoning!
            </div>
          </div>

          {/* Portable Morality Context Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Portable Morality Skill Context
              </span>
              <button
                onClick={handleCopyContext}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Morality Context'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={compiledContext}
              className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-300/90 leading-relaxed focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
