import React from 'react';
import { useMoralityStore } from '../../store/useMoralityStore';
import { VizParadigm } from '../../types/morality';
import { Sparkles, Moon, Sun, Newspaper, Bot, Settings, Vote, HelpCircle, Building2, Smartphone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeParadigm,
    setActiveParadigm,
    isDarkMode,
    toggleDarkMode,
    isPhoneSimulatorOpen,
    togglePhoneSimulator,
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
    if (searchQuery.trim()) {
      toggleChat(true);
    }
  };

  const triggerGuidedTour = () => {
    if ((window as any).startGuidedTour) {
      (window as any).startGuidedTour();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${isDarkMode ? 'bg-stone-900/95 text-stone-100 border-amber-900/40' : 'bg-[#f0ece4]/95 text-stone-900 border-orange-900/25'} backdrop-blur-md border-b z-40 px-3 sm:px-6 flex items-center justify-between shadow-sm`}>
      {/* Brand Logo & Reset Button */}
      <div 
        onClick={resetAll}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        title="Click to Reset All Views & Selections"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-800 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform border border-amber-500/50">
          ⚖️
        </div>
        <div>
          <h1 className="text-xs sm:text-base font-black tracking-tight bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 bg-clip-text text-transparent truncate max-w-[140px] sm:max-w-none font-serif-axiom">
            Society Morality Tracker
          </h1>
          <p className={`text-[9px] sm:text-[10px] ${isDarkMode ? 'text-stone-400' : 'text-stone-700'} font-semibold hidden sm:block`}>6 Moral Foundations & Ground Reality Engine</p>
        </div>
      </div>

      {/* Global AI Search Bar (Desktop) */}
      <form id="tour-search" onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask AI or search moral axioms (e.g. healthcare, consent)..."
          className={`w-full ${isDarkMode ? 'bg-stone-950/80 border-amber-900/40 text-stone-200' : 'bg-[#faf8f5] border-amber-900/30 text-stone-900 font-semibold'} border rounded-full py-1.5 pl-4 pr-10 text-xs placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-all`}
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-500">
          <Sparkles className="w-4 h-4 text-amber-400" />
        </button>
      </form>

      {/* Navigation & Controls (Desktop & Mobile Compact) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* View / Paradigm Selector (Desktop) */}
        <select
          id="tour-paradigm-selector"
          value={activeParadigm}
          onChange={(e) => setActiveParadigm(e.target.value as VizParadigm)}
          className={`hidden sm:block ${isDarkMode ? 'bg-stone-800 border-amber-900/40 text-stone-200' : 'bg-white border-amber-300 text-stone-800'} border text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer`}
        >
          <option value="tree">🌿 Axiomatic Morality Tree</option>
          <option value="prism">💎 Refractive Prism & Scheme Engine</option>
          <option value="schemes">🏛️ Scheme Audit Table</option>
        </select>

        {/* Theme Toggle */}
        <button
          id="tour-theme-toggle"
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-stone-800 border-amber-900/40 text-stone-300' : 'bg-white border-amber-300 text-amber-900'} border hover:border-amber-500 transition-colors`}
          title={isDarkMode ? 'Switch to Sandalwood Parchment Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
        </button>

        {/* Settings Button */}
        <button
          id="tour-settings"
          onClick={() => toggleSettings(true)}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-stone-800 border-amber-900/40 text-stone-300' : 'bg-white border-amber-300 text-stone-800'} border hover:text-amber-400 transition-colors`}
          title="Agent Connection Details & Portable Morality Context"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Guided Tour Replay Button (Desktop) */}
        <button
          id="tour-help"
          onClick={triggerGuidedTour}
          className={`hidden md:block p-2 rounded-lg ${isDarkMode ? 'bg-stone-800 border-amber-900/40 text-amber-300 hover:bg-stone-700' : 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'} border transition-all`}
          title="Start Guided Tour & Feature Overview"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
        </button>

        {/* Phone Preview / Mobile Dimension Debugger Button */}
        <button
          onClick={() => togglePhoneSimulator(!isPhoneSimulatorOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all border cursor-pointer ${
            isPhoneSimulatorOpen
              ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-950/50 animate-pulse'
              : isDarkMode
                ? 'bg-purple-950/60 border-purple-800/80 text-purple-300 hover:bg-purple-900/60'
                : 'bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200'
          }`}
          title="Open Mobile Dimension Debugger & Phone Simulator"
        >
          <Smartphone className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">📱 Phone Preview</span>
        </button>

        {/* Desktop-Only Feature Buttons */}
        <div className="hidden lg:flex items-center gap-1.5">
          {/* News Feed Button */}
          <button
            id="tour-news-feed"
            onClick={() => setActiveDrawer(activeDrawer === 'news' ? null : 'news')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              activeDrawer === 'news'
                ? 'bg-amber-700 border-amber-400 text-white shadow-md shadow-amber-900/40'
                : 'bg-stone-800 border-amber-900/40 text-stone-200 hover:border-amber-600'
            }`}
          >
            <Newspaper className="w-4 h-4 text-amber-300" />
            <span>News Feed</span>
          </button>

          {/* Unified Democracy & Voting Button (Electorate, Bills & Condorcet Engine) */}
          <button
            id="tour-electorate"
            onClick={() => setActiveDrawer(activeDrawer === 'electorate' || activeDrawer === 'condorcet' ? null : 'electorate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              activeDrawer === 'electorate' || activeDrawer === 'condorcet'
                ? 'bg-emerald-700 border-emerald-400 text-white shadow-md shadow-emerald-900/40'
                : 'bg-stone-800 border-amber-900/40 text-stone-200 hover:border-amber-600'
            }`}
            title="Electorate Demographics, Parliamentary Bills & Condorcet Voting Simulation"
          >
            <Vote className="w-4 h-4 text-emerald-400" />
            <span>Democracy &amp; Voting</span>
          </button>
        </div>
      </div>
    </header>
  );
};
