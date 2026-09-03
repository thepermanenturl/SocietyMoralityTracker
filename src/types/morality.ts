export interface MoralityNode {
  id: string;
  layer: number;
  title: string;
  statement: string;
  summary?: string;
  parentIds: string[];
  status: 'ratified' | 'proposed';
  upvotes?: number;
  maslow_tier?: string;
  color?: string;
}

export interface PerspectiveConstitution {
  article: string;
  excerpt: string;
  promise: string;
  enforcementInstance?: string;
  implementationMeter?: {
    percentage: number;
    label: string;
  };
  color: string;
}

export interface PerspectiveModernBuddha {
  value: string;
  humanStory: string;
  name: string;
  year: number;
  wikiUrl?: string;
  color: string;
}

export interface PerspectiveWangchuk {
  title: string;
  climateAction: string;
  fastDetails: string;
  quote: string;
  location: string;
  color: string;
}

export interface PerspectiveCritic {
  failure: string;
  failureYear: number;
  newsPublisher?: string;
  newsUrl?: string;
  positiveExample: string;
  positiveCountry: string;
  mechanism: string;
  color: string;
}

export interface DailyDilemma {
  scenario: string;
  clarity: string;
}

export interface NodePerspectives {
  constitution?: PerspectiveConstitution;
  modernBuddha?: PerspectiveModernBuddha;
  wangchuk?: PerspectiveWangchuk;
  critic?: PerspectiveCritic;
  dailyDilemma?: DailyDilemma;
}

export interface PrimitiveRoot {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  citation: string;
  waysToLive: Array<{
    area: string;
    action: string;
  }>;
}

export interface EpochBlindspot {
  society: string;
  missingRights?: string;
  upholdingAchievement?: string;
}

export interface HistoricalEpoch {
  id: string;
  name: string;
  years: string;
  startYear: number;
  endYear: number;
  summary: string;
  unrestScore: number;
  unrestCause: string;
  keyNodes: string[];
  violatedNodes: string[];
  societalBlindspots: EpochBlindspot[];
}

export interface NewsTaskCard {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  newsPublisher: string;
  newsUrl: string;
  violatedNodes: string[];
  violatedNodeTitles: string[];
  upholderStance: {
    headline: string;
    analysis: string;
  };
  devilsAdvocateStance: {
    headline: string;
    analysis: string;
  };
}

export type VizParadigm = 'tree' | 'prism' | 'schemes' | 'action_tree' | 'psychology_tree';
export type TreeLens = 'moral' | 'action' | 'psychology';
export type PerspectiveLens = 'none' | 'constitution' | 'modernBuddha' | 'wangchuk' | 'critic' | 'psychology';
