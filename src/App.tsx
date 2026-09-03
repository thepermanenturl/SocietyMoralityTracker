import React, { useState, useEffect } from 'react';
import { useMoralityStore } from './store/useMoralityStore';
import { Navbar } from './components/navigation/Navbar';
import { FloatingChatBubble } from './components/navigation/FloatingChatBubble';
import { TreeView } from './components/canvas/TreeView';
import { PrismView } from './components/canvas/PrismView';
import { SchemeTrackerPage } from './components/schemes/SchemeTrackerPage';
import { MobileView } from './components/mobile/MobileView';
import { PhoneSimulatorWorkbench } from './components/mobile/PhoneSimulatorWorkbench';
import { NodeDetailDrawer } from './components/sidebars/NodeDetailDrawer';
import { NewsFeedDrawer } from './components/sidebars/NewsFeedDrawer';
import { ElectorateLegislatureDrawer } from './components/sidebars/ElectorateLegislatureDrawer';
import { HighlightRationaleCard } from './components/sidebars/HighlightRationaleCard';
import { BottomTimelineDock } from './components/timeline/BottomTimelineDock';
import { AIChatbotModal } from './components/modals/AIChatbotModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { GuidedTour } from './components/onboarding/GuidedTour';

import { ReactFlowProvider } from '@xyflow/react';

export const App: React.FC = () => {
  const { activeParadigm, isDarkMode, isPhoneSimulatorOpen, togglePhoneSimulator } = useMoralityStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#e6e4dd] text-slate-900'} font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300`}>
      {/* Top Navbar & Search */}
      <Navbar />

      {/* Render Mobile View or Desktop Canvas */}
      {isMobile ? (
        <MobileView />
      ) : (
        <>
          {/* Floating Left AI Agent Chat Bubble Icon */}
          <FloatingChatBubble />

          {/* Main Multi-Paradigm Canvas */}
          <main className="relative w-full h-screen">
            <ReactFlowProvider>
              {activeParadigm === 'tree' && <TreeView />}
              {activeParadigm === 'prism' && <PrismView />}
              {activeParadigm === 'schemes' && <SchemeTrackerPage />}
            </ReactFlowProvider>
          </main>
        </>
      )}

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

      {/* Bottom Horizontal Timeline Dock (Desktop only to prevent mobile navigation overlap) */}
      {!isMobile && <BottomTimelineDock />}

      {/* First-Time Guided Onboarding Tour */}
      <GuidedTour />

      {/* Mobile Dimension Phone Simulator & Debugger Workbench */}
      <PhoneSimulatorWorkbench
        isOpen={isPhoneSimulatorOpen}
        onClose={() => togglePhoneSimulator(false)}
      />
    </div>
  );
};

export default App;
