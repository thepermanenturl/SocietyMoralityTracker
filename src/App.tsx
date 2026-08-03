import React from 'react';
import { useMoralityStore } from './store/useMoralityStore';
import { Navbar } from './components/navigation/Navbar';
import { PrimitivesBar } from './components/navigation/PrimitivesBar';
import { FloatingChatBubble } from './components/navigation/FloatingChatBubble';
import { TreeView } from './components/canvas/TreeView';
import { PrismView } from './components/canvas/PrismView';
import { NodeDetailDrawer } from './components/sidebars/NodeDetailDrawer';
import { NewsFeedDrawer } from './components/sidebars/NewsFeedDrawer';
import { ElectorateLegislatureDrawer } from './components/sidebars/ElectorateLegislatureDrawer';
import { HighlightRationaleCard } from './components/sidebars/HighlightRationaleCard';
import { BottomTimelineDock } from './components/timeline/BottomTimelineDock';
import { AIChatbotModal } from './components/modals/AIChatbotModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { GuidedTour } from './components/onboarding/GuidedTour';

export const App: React.FC = () => {
  const { activeParadigm, isDarkMode } = useMoralityStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#e6e4dd] text-slate-900'} font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300`}>
      {/* Top Navbar & Search */}
      <Navbar />

      {/* 3 Minimal Primitives Bar */}
      <PrimitivesBar />

      {/* Floating Left AI Agent Chat Bubble Icon */}
      <FloatingChatBubble />

      {/* Main Multi-Paradigm Canvas */}
      <main className="relative w-full h-screen">
        {(activeParadigm === 'tree' || activeParadigm === 'action_tree' || activeParadigm === 'psychology_tree') && <TreeView />}
        {activeParadigm === 'prism' && <PrismView />}
      </main>

      {/* Sidebars */}
      <NodeDetailDrawer />
      <NewsFeedDrawer />
      <ElectorateLegislatureDrawer />

      {/* Socrates AI Chatbot Modal */}
      <AIChatbotModal />

      {/* Settings & Portable Context Modal */}
      <SettingsModal />

      {/* Floating Highlight Rationale Card */}
      <HighlightRationaleCard />

      {/* Bottom Horizontal Timeline Dock */}
      <BottomTimelineDock />

      {/* First-Time Guided Onboarding Tour */}
      <GuidedTour />
    </div>
  );
};

export default App;
