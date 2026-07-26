import { create } from 'zustand';
import { MoralityNode, VizParadigm } from '../types/morality';
import { MORALITY_NODES } from '../data/moralityData';

interface HighlightRationale {
  title: string;
  icon: string;
  body: string;
  nodeIds: string[];
}

interface MoralityState {
  nodes: MoralityNode[];
  selectedNode: MoralityNode | null;
  activeParadigm: VizParadigm;
  isDarkMode: boolean;
  activeDrawer: 'inspector' | 'news' | null;
  searchQuery: string;
  aiMatchedNodeIds: string[];
  highlightRationale: HighlightRationale | null;
  isChatOpen: boolean;
  isSettingsOpen: boolean;

  // Actions
  setSelectedNode: (node: MoralityNode | null) => void;
  setActiveParadigm: (paradigm: VizParadigm) => void;
  toggleDarkMode: () => void;
  setActiveDrawer: (drawer: 'inspector' | 'news' | null) => void;
  setSearchQuery: (query: string) => void;
  setAiMatchedNodeIds: (nodeIds: string[]) => void;
  setHighlightRationale: (rationale: HighlightRationale | null) => void;
  toggleChat: (open?: boolean) => void;
  toggleSettings: (open?: boolean) => void;
  resetAll: () => void;
}

export const useMoralityStore = create<MoralityState>((set) => ({
  nodes: MORALITY_NODES,
  selectedNode: null,
  activeParadigm: 'tree',
  isDarkMode: true,
  activeDrawer: null,
  searchQuery: '',
  aiMatchedNodeIds: [],
  highlightRationale: null,
  isChatOpen: false,
  isSettingsOpen: false,

  setSelectedNode: (node) => set((state) => ({
    selectedNode: node,
    activeDrawer: node ? 'inspector' : state.activeDrawer === 'inspector' ? null : state.activeDrawer,
    highlightRationale: node ? {
      title: `Selected Node: [${node.id}]`,
      icon: '📌',
      body: `${node.title}: ${node.statement}`,
      nodeIds: [node.id]
    } : state.highlightRationale
  })),

  setActiveParadigm: (paradigm) => set({ activeParadigm: paradigm }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setActiveDrawer: (drawer) => set((state) => ({
    activeDrawer: state.activeDrawer === drawer ? null : drawer,
    selectedNode: drawer === null ? null : state.selectedNode
  })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setAiMatchedNodeIds: (nodeIds) => set({ aiMatchedNodeIds: nodeIds }),
  setHighlightRationale: (rationale) => set({ highlightRationale: rationale }),
  toggleChat: (open) => set((state) => ({ isChatOpen: open !== undefined ? open : !state.isChatOpen })),
  toggleSettings: (open) => set((state) => ({ isSettingsOpen: open !== undefined ? open : !state.isSettingsOpen })),

  resetAll: () => set({
    selectedNode: null,
    activeDrawer: null,
    searchQuery: '',
    aiMatchedNodeIds: [],
    highlightRationale: null,
    isChatOpen: false,
    isSettingsOpen: false
  })
}));
