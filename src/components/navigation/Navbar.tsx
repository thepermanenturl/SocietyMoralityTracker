import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { VizParadigm } from '../../types/morality';
import { Sparkles, Moon, Sun, Newspaper, Bot, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeParadigm,
    setActiveParadigm,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    activeDrawer,
    setActiveDrawer,
    toggleChat,
    toggleSettings,
    resetAll
  } = useMoralityStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    toggleChat(true);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${isDarkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-[#d8d5ca]/95 border-amber-900/20 text-slate-900'} backdrop-blur-md border-b z-50 px-4 flex items-center justify-between shadow-lg`}>
      {/* Brand Logo & Reset */}
      <div 
        onClick={resetAll}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-2xl">🌿</span>
        <div>
          <h1 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            Society Morality Tracker
          </h1>
          <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-700'} font-semibold`}>6 Moral Foundations & Ground Reality Engine</p>
        </div>
      </div>

      {/* Global AI Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-6 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask AI or search moral axioms (e.g. healthcare, consent)..."
          className={`w-full ${isDarkMode ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-[#e6e4dd] border-slate-400 text-slate-900 font-semibold'} border rounded-full py-1.5 pl-4 pr-10 text-xs placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all`}
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-600">
          <Sparkles className="w-4 h-4" />
        </button>
      </form>

      {/* Navigation & Controls */}
      <div className="flex items-center gap-3">
        {/* Paradigm Selector */}
        <select
          value={activeParadigm}
          onChange={(e) => setActiveParadigm(e.target.value as VizParadigm)}
          className={`$${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-amber-300 text-slate-800'} border text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer`}
        >
          <option value="tree">🌿 Hierarchical Tree</option>
          <option value="prism">🌈 Refractive Prism Spectrum</option>
        </select>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-amber-300 text-amber-900'} border hover:border-slate-500 transition-colors`}
          title={isDarkMode ? 'Switch to Parchment Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => toggleSettings(true)}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-amber-300 text-slate-800'} border hover:text-sky-400 transition-colors`}
          title="Agent Connection Details & Portable Morality Context"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* AI Agent Chat Button */}
        <button
          onClick={() => toggleChat(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500/80 text-white shadow-md transition-all cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span>AI Agent</span>
        </button>

        {/* News Feed Button */}
        <button
          onClick={() => setActiveDrawer('news')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
            activeDrawer === 'news'
              ? 'bg-sky-600 border-sky-400 text-white shadow-md shadow-sky-600/30'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>News Feed</span>
        </button>
      </div>
    </header>
  );
};
