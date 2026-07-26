import React from 'react';
import { useMoralityStore } from './store/useMoralityStore';
import { Navbar } from './components/navigation/Navbar';
import { PrimitivesBar } from './components/navigation/PrimitivesBar';
import { TreeView } from './components/canvas/TreeView';
import { RadarView } from './components/canvas/RadarView';
import { PrismView } from './components/canvas/PrismView';
import { NodeDetailDrawer } from './components/sidebars/NodeDetailDrawer';
import { NewsFeedDrawer } from './components/sidebars/NewsFeedDrawer';
import { HighlightRationaleCard } from './components/sidebars/HighlightRationaleCard';
import { BottomTimelineDock } from './components/timeline/BottomTimelineDock';
import { AIChatbotModal } from './components/modals/AIChatbotModal';
import { SettingsModal } from './components/modals/SettingsModal';

export const App: React.FC = () => {
  const { activeParadigm, isDarkMode } = useMoralityStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#e6e4dd] text-slate-900'} font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300`}>
      {/* Top Navbar & Search */}
      <Navbar />

      {/* 3 Minimal Primitives Bar */}
      <PrimitivesBar />

      {/* Main Multi-Paradigm Canvas */}
      <main className="relative w-full h-screen">
        {activeParadigm === 'tree' && <TreeView />}
        {activeParadigm === 'prism' && <PrismView />}
      </main>

      {/* Sidebars */}
      <NodeDetailDrawer />
      <NewsFeedDrawer />

      {/* Socrates AI Chatbot Modal */}
      <AIChatbotModal />

      {/* Settings & Portable Context Modal */}
      <SettingsModal />

      {/* Floating Highlight Rationale Card */}
      <HighlightRationaleCard />

      {/* Bottom Horizontal Timeline Dock */}
      <BottomTimelineDock />
    </div>
  );
};

export default App;
