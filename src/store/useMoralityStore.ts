import { create } from 'zustand';
import { MoralityNode, VizParadigm } from '../types/morality';
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
  isDarkMode: boolean;
  activeDrawer: 'inspector' | 'news' | 'electorate' | 'condorcet' | null;
  searchQuery: string;
  aiMatchedNodeIds: string[];
  highlightRationale: HighlightRationale | null;
  isChatOpen: boolean;
  isSettingsOpen: boolean;
  chatInputPrompt: string;
  isEpochTimelineMinimized: boolean;
  isPulseNotificationDismissed: boolean;
  cardQueue: CardQueueItem[];
  chatMessages: ChatMessage[];

  // Actions
  setSelectedNode: (node: MoralityNode | null) => void;
  setActiveParadigm: (paradigm: VizParadigm) => void;
  toggleDarkMode: () => void;
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
  isDarkMode: true,
  activeDrawer: null,
  searchQuery: '',
  aiMatchedNodeIds: [],
  highlightRationale: null,
  isChatOpen: false,
  isSettingsOpen: false,
  chatInputPrompt: '',
  isEpochTimelineMinimized: false,
  isPulseNotificationDismissed: false,
  cardQueue: [],
  chatMessages: [
    {
      id: 'welcome',
      sender: 'bot',
      text: "Greetings. I am the Socrates Ethics Vetting Agent. Ask me to analyze any moral claim, governance policy, or derivation path against foundational axioms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],

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
