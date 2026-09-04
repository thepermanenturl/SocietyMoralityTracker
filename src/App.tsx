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

const detectMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  const isSmallScreen = window.innerWidth < 800;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return isSmallScreen || (isTouch && window.innerWidth < 1024) || isMobileUA;
};

export const App: React.FC = () => {
  const { activeParadigm, isDarkMode, isPhoneSimulatorOpen, togglePhoneSimulator } = useMoralityStore();
  const [isMobile, setIsMobile] = useState<boolean>(detectMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(detectMobile());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-[#e6e4dd] text-slate-900'} font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300`}>
      {/* Top Navbar & Search (Desktop Only - Mobile has its own dedicated header) */}
      {!isMobile && <Navbar />}

      {/* Render Mobile View or Desktop Canvas */}
      {isMobile ? (
        <MobileView />
      ) : (
        <>
          {/* Floating Left AI Agent Chat Bubble Icon */}
          <FloatingChatBubble />

          {/* Main Multi-Paradigm Canvas */}
          <main className="relative w-full h-[calc(100vh-64px)] mt-16 overflow-hidden">
            <ReactFlowProvider>
              {activeParadigm === 'tree' && <TreeView />}
              {activeParadigm === 'prism' && <PrismView />}
              {activeParadigm === 'schemes' && <SchemeTrackerPage />}
            </ReactFlowProvider>
          </main>

          {/* Desktop-Only Sidebars & Overlays */}
          <NodeDetailDrawer />
          <NewsFeedDrawer />
          <ElectorateLegislatureDrawer />
          <HighlightRationaleCard />
          <BottomTimelineDock />
          <GuidedTour />

          {/* Mobile Dimension Phone Simulator & Debugger Workbench */}
          <PhoneSimulatorWorkbench
            isOpen={isPhoneSimulatorOpen}
            onClose={() => togglePhoneSimulator(false)}
          />
        </>
      )}

      {/* Socrates AI Chatbot Modal */}
      <AIChatbotModal />

      {/* Settings & Portable Context Modal */}
      <SettingsModal />
    </div>
  );
};

export default App;
