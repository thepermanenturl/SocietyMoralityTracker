import React from 'react';
import { MobileView } from './MobileView';
import { X, Smartphone } from 'lucide-react';

interface PhoneSimulatorWorkbenchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneSimulatorWorkbench: React.FC<PhoneSimulatorWorkbenchProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col overflow-y-auto">
      {/* Floating Exit Mobile View Pill */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-900/50 shadow-2xl backdrop-blur-md cursor-pointer transition-all active:scale-95"
          title="Exit Mobile View and return to Desktop Canvas"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Exit Mobile View</span>
          <X className="w-3.5 h-3.5 ml-1 text-stone-400 hover:text-white" />
        </button>
      </div>

      {/* Direct Full-Screen Mobile App Experience */}
      <div className="flex-1 w-full max-w-md mx-auto min-h-screen bg-stone-950 relative shadow-2xl">
        <MobileView onExit={onClose} />
      </div>
    </div>
  );
};

export default PhoneSimulatorWorkbench;
