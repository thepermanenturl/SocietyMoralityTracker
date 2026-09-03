import { create } from 'zustand';
import { MoralityNode, VizParadigm, TreeLens } from '../types/morality';
import { MORALITY_NODES } from '../data/moralityData';

export interface CardQueueItem {
  id: string;
  title: string;
  summary: string;
  type: 'node' | 'news' | 'epoch' | 'prism';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

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
  treeLens: TreeLens;
  isDarkMode: boolean;
  activeDrawer: 'inspector' | 'news' | 'electorate' | 'condorcet' | null;
  searchQuery: string;
  aiMatchedNodeIds: string[];
  highlightRationale: HighlightRationale | null;
  isChatOpen: boolean;
  isSettingsOpen: boolean;
  chatInputPrompt: string;
  isPhoneSimulatorOpen: boolean;
  isEpochTimelineMinimized: boolean;
  isPulseNotificationDismissed: boolean;
  cardQueue: CardQueueItem[];
  chatMessages: ChatMessage[];

  connectionMode: 'local' | 'cloud' | 'offline';
  cloudApiKey: string;

  // Actions
  setConnectionMode: (mode: 'local' | 'cloud' | 'offline') => void;
  setCloudApiKey: (key: string) => void;
  setSelectedNode: (node: MoralityNode | null) => void;
  setActiveParadigm: (paradigm: VizParadigm) => void;
  setTreeLens: (lens: TreeLens) => void;
  toggleDarkMode: () => void;
  togglePhoneSimulator: (open?: boolean) => void;
  setActiveDrawer: (drawer: 'inspector' | 'news' | 'electorate' | 'condorcet' | null) => void;
  setSearchQuery: (query: string) => void;
  setAiMatchedNodeIds: (nodeIds: string[]) => void;
  setHighlightRationale: (rationale: HighlightRationale | null) => void;
  toggleChat: (open?: boolean) => void;
  toggleSettings: (open?: boolean) => void;
  setChatInputPrompt: (prompt: string) => void;
  toggleEpochTimelineMinimized: () => void;
  dismissPulseNotification: () => void;
  addCardToQueue: (card: CardQueueItem) => void;
  removeCardFromQueue: (id: string) => void;
  clearCardQueue: () => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChatMessages: () => void;
  resetAll: () => void;
}

export const useMoralityStore = create<MoralityState>((set) => ({
  nodes: MORALITY_NODES,
  selectedNode: null,
  activeParadigm: 'tree',
  treeLens: 'moral',
  isDarkMode: true,
  isPhoneSimulatorOpen: false,
  activeDrawer: null,
  searchQuery: '',
  aiMatchedNodeIds: [],
  highlightRationale: null,
  isChatOpen: false,
  isSettingsOpen: false,
  chatInputPrompt: '',
  isEpochTimelineMinimized: true,
  isPulseNotificationDismissed: false,
  chatMessages: [
    {
      id: 'welcome',
      sender: 'bot',
      text: "Greetings. I am the Socrates Ethics Vetting Agent. Ask me to analyze any moral claim, governance policy, or derivation path against foundational axioms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  cardQueue: [],
  connectionMode: 'local',
  cloudApiKey: '',
  setConnectionMode: (mode) => set({ connectionMode: mode }),
  setCloudApiKey: (key) => set({ cloudApiKey: key }),

  setSelectedNode: (nodeOrPartial) => set((state) => {
    let resolvedNode: MoralityNode | null = null;
    if (nodeOrPartial) {
      const targetId = typeof nodeOrPartial === 'string' ? nodeOrPartial : nodeOrPartial.id;
      resolvedNode = MORALITY_NODES.find(n => n.id === targetId) || (typeof nodeOrPartial === 'object' ? nodeOrPartial : null);
    }

    return {
      selectedNode: resolvedNode,
      activeDrawer: resolvedNode ? 'inspector' : state.activeDrawer === 'inspector' ? null : state.activeDrawer,
      highlightRationale: resolvedNode ? {
        title: `Selected Node: [${resolvedNode.id}]`,
        icon: '📌',
        body: `${resolvedNode.title}: ${resolvedNode.statement}`,
        nodeIds: [resolvedNode.id]
      } : state.highlightRationale
    };
  }),

  setActiveParadigm: (paradigm) => set((state) => {
    if (paradigm === 'action_tree') {
      return { activeParadigm: 'tree', treeLens: 'action' };
    }
    if (paradigm === 'psychology_tree') {
      return { activeParadigm: 'tree', treeLens: 'psychology' };
    }
    return { activeParadigm: paradigm };
  }),
  setTreeLens: (lens) => set({ treeLens: lens, activeParadigm: 'tree' }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  togglePhoneSimulator: (open) => set((state) => ({ isPhoneSimulatorOpen: open !== undefined ? open : !state.isPhoneSimulatorOpen })),
  setActiveDrawer: (drawer) => set((state) => ({
    activeDrawer: state.activeDrawer === drawer ? null : drawer,
    selectedNode: drawer === null ? null : state.selectedNode
  })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setAiMatchedNodeIds: (nodeIds) => set({ aiMatchedNodeIds: nodeIds || [] }),
  setHighlightRationale: (rationale) => set({ highlightRationale: rationale }),
  toggleChat: (open) => set((state) => ({ isChatOpen: open !== undefined ? open : !state.isChatOpen })),
  toggleSettings: (open) => set((state) => ({ isSettingsOpen: open !== undefined ? open : !state.isSettingsOpen })),
  setChatInputPrompt: (prompt) => set({ chatInputPrompt: prompt }),
  toggleEpochTimelineMinimized: () => set((state) => ({ isEpochTimelineMinimized: !state.isEpochTimelineMinimized })),
  dismissPulseNotification: () => set({ isPulseNotificationDismissed: true }),

  addCardToQueue: (card) => set((state) => {
    const exists = state.cardQueue.some(c => c.id === card.id);
    if (exists) return state;
    const newQueue = [...state.cardQueue, card].slice(-3); // Keep up to 3 cards for comparison
    const combinedPrompt = `Socrates, compare these items against foundational moral axioms:\n` +
      newQueue.map((c, i) => `${i + 1}. [${c.type.toUpperCase()}] ${c.title}: ${c.summary}`).join('\n');
    return { cardQueue: newQueue, chatInputPrompt: combinedPrompt, isChatOpen: true };
  }),

  removeCardFromQueue: (id) => set((state) => {
    const newQueue = state.cardQueue.filter(c => c.id !== id);
    const combinedPrompt = newQueue.length > 0
      ? `Socrates, compare these items against foundational moral axioms:\n` +
        newQueue.map((c, i) => `${i + 1}. [${c.type.toUpperCase()}] ${c.title}: ${c.summary}`).join('\n')
      : '';
    return { cardQueue: newQueue, chatInputPrompt: combinedPrompt };
  }),

  clearCardQueue: () => set({ cardQueue: [], chatInputPrompt: '' }),

  addChatMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
  clearChatMessages: () => set({ chatMessages: [] }),

  resetAll: () => set({
    selectedNode: null,
    activeDrawer: null,
    searchQuery: '',
    aiMatchedNodeIds: [],
    highlightRationale: null,
    isChatOpen: false,
    isSettingsOpen: false,
    chatInputPrompt: '',
    isEpochTimelineMinimized: false,
    cardQueue: []
  })
}));
