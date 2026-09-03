import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  BackgroundVariant,
  MarkerType,
  useNodesState,
  useEdgesState,
  type Node as FlowNode,
  type Edge as FlowEdge,
  type ReactFlowInstance
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMoralityStore } from '../../store/useMoralityStore';
import { MoralityNode } from '../../types/morality';
import {
  ShieldCheck,
  Compass,
  Scale,
  MessageSquare,
  Loader2,
  Search,
  ArrowUpRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';

// ==========================================
// 1. DATA TYPES FOR PRISM REFRACTION
// ==========================================

export interface PrismMoralityNode {
  id: string;
  title: string;
  layer: number;
  statement: string;
  dharmicPrinciple?: string;
}

export interface PrismPsychologyNode {
  id: string;
  title: string;
  mechanism: string;
  livedEmpathy: string;
  cognitiveBias?: string;
}

export interface PrismActionNode {
  id: string;
  title: string;
  actionDirective: string;
  protestsOrPolicy: string;
  linkedBillOrScheme?: string;
}

export interface PrismStanceData {
  title: string;
  spectrum: string;
  rationale: string;
  badgeColor?: string;
  moralityNodes: PrismMoralityNode[];
  psychologyNodes: PrismPsychologyNode[];
  actionNodes: PrismActionNode[];
  treeBranch?: Array<{ id: string; title: string; layer: number; statement: string; dharmicPrinciple?: string }>;
}

export interface DynamicSpectrumData {
  query?: string;
  traditional: PrismStanceData;
  progressive: PrismStanceData;
  syntheticResolution?: string;
  synthetic_resolution?: string;
  tensionLevel?: number;
  tension_level?: number;
}

// ==========================================
// 2. FALLBACK PRESET DATASETS
// ==========================================

const FALLBACK_PRESETS: Record<string, DynamicSpectrumData> = {
  'PM-KISAN DBT & Farmer Income': {
    query: 'PM-KISAN Direct Benefit Transfer & Farmer Income Support',
    traditional: {
      title: 'Universal Livelihood Security & Direct Fiscal Delivery',
      spectrum: 'State Stewardship / Rural Financial Inclusion / Direct Transfer',
      rationale:
        'Guarantees timely, unconditional minimum income support to smallholders, eliminating corrupt middlemen through biometric Aadhaar-linked direct bank transfers to preserve agricultural productivity.',
      moralityNodes: [
        {
          id: 'A6',
          title: 'Material Equity & Livelihood Floor',
          layer: 0,
          statement: 'Agrarian producers possess inherent right to baseline financial protection from catastrophic market shocks.',
          dharmicPrinciple: 'Krishi Dharma (Duty to Agrarian Stewards)'
        },
        {
          id: 'R3',
          title: 'Harmonic Reciprocity',
          layer: -1,
          statement: 'Societal food security demands collective reciprocal investment in agricultural stability.',
          dharmicPrinciple: 'Kartavya (Mutual Societal Obligation)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_KISAN_ORDER',
          title: 'Need for Subsistence Predictability',
          mechanism: 'Certainty of cash inflow before sowing season alleviates acute financial distress and suicide ideation',
          livedEmpathy: 'The quiet dignity of purchasing quality seeds without begging predatory local moneylenders for usurious credit.',
          cognitiveBias: 'Status Quo Bias / Risk Aversion in Rural Economics'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_KISAN_DBT',
          title: 'Statutory DBT Disbursal & Anti-Intermediary Audits',
          actionDirective: 'Execute algorithmic Aadhaar-seeded Direct Benefit Transfers and CAG fraud cross-checks across 11 crore accounts',
          protestsOrPolicy: 'PM-KISAN Operational Guidelines & CAG Audit Verifications',
          linkedBillOrScheme: 'PM-KISAN DBT Scheme / PM Gati Shakti Portal'
        }
      ]
    },
    progressive: {
      title: 'Tenant Farmer Autonomy & Landless Labor Inclusion',
      spectrum: 'Agrarian Equity / Tenant Rights / Decentralized Verification',
      rationale:
        'Critiques landholding title criteria that systematically exclude millions of landless tenant farmers, sharecroppers, and adivasi cultivators from income safety nets while exposing them to algorithmic exclusions.',
      moralityNodes: [
        {
          id: 'P2_AGENCY',
          title: 'Agency & Inviolable Livelihood',
          layer: -1,
          statement: 'True moral equity requires recognizing actual physical labor over rigid ancestral title deeds.',
          dharmicPrinciple: 'Swatantrata (Self-Determination of Workers)'
        },
        {
          id: 'E1',
          title: 'Digital Privacy & Exclusion Safeguards',
          layer: 2,
          statement: 'Biometric and land-record mismatches must never deprive vulnerable cultivators of life sustenance.',
          dharmicPrinciple: 'Nyaya (Distributive Justice for the Margin)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_KISAN_AUTONOMY',
          title: 'Psychological Indignity of Administrative Invisibility',
          mechanism: 'Being barred from state support despite doing the hardest tilling fuels institutional alienation and distrust',
          livedEmpathy: 'Lived trauma of crop failure with zero relief because land ownership belongs to an absentee urban landlord.',
          cognitiveBias: 'Psychological Reactance / Loss of Perceived Self-Agency'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_KISAN_PROTEST',
          title: 'Farm Union Mobilizations & Tenant Rights Litigation',
          actionDirective: 'Mobilize panchayat-level manual verification drives and file Supreme Court PILs for tenant cultivator inclusion',
          protestsOrPolicy: 'Samyukta Kisan Morcha charter, Gram Sabha public audits, and state tenant farmer registrations',
          linkedBillOrScheme: 'Model Agricultural Land Leasing Act / State Tenancy Amendments'
        }
      ]
    },
    syntheticResolution:
      'Harmonize automated biometric DBT efficiency with mandatory offline Gram Sabha social audits that extend crop income safety nets to registered tenant sharecroppers.',
    tensionLevel: 68
  },

  'Ayushman Bharat Universal Health': {
    query: 'Ayushman Bharat PM-JAY & Public vs Private Healthcare',
    traditional: {
      title: 'Universal Health Risk-Pooling & Catastrophic Shield',
      spectrum: 'Public Health Stewardship / Risk-Pooling / Tertiary Access',
      rationale:
        'Constructs an insurance shield insuring 50 crore vulnerable citizens up to ₹5 lakh annually, harnessing private hospital capacity to stop medical poverty.',
      moralityNodes: [
        {
          id: 'A6',
          title: 'Material Equity & Public Health',
          layer: 0,
          statement: 'Universal health coverage is a baseline prerequisite for human flourishing and systemic civilizational resilience.',
          dharmicPrinciple: 'Arogya Dharma (Sovereign Duty to Heal)'
        },
        {
          id: 'D8',
          title: 'Democratic Healthcare Mandate',
          layer: 1,
          statement: 'The state coordinates public-private tertiary networks to shield citizens from bankruptcy.',
          dharmicPrinciple: 'Lok Kalyan (Universal Wellbeing)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_HEALTH_SECURITY',
          title: 'Relief from Catastrophic Medical Anxiety',
          mechanism: 'Fear of generational asset liquidation during acute illness is mitigated by institutional cash-less coverage',
          livedEmpathy: 'A parent able to secure life-saving heart surgery for their child without selling their home or taking bonded debt.',
          cognitiveBias: 'Loss Aversion & Institutional Trust Need'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_HEALTH_COMPLIANCE',
          title: 'Hospital Empanelment Audits & Anti-Ghost Verifications',
          actionDirective: 'Deploy real-time biometric claim validation and strict CAG hospital billing audits to eliminate fraudulent claims',
          protestsOrPolicy: 'National Health Authority anti-fraud unit notifications and hospital de-empanelment protocols',
          linkedBillOrScheme: 'Ayushman Bharat PM-JAY / National Digital Health Mission'
        }
      ]
    },
    progressive: {
      title: 'Public Health Infrastructure & Patient Choice Ray',
      spectrum: 'Primary Healthcare / Anti-Commercialization / Data Autonomy',
      rationale:
        'Argues insurance-centric models divert critical budget from primary community health centers into private commercial pockets, creating perverse incentives for unnecessary procedures.',
      moralityNodes: [
        {
          id: 'A4',
          title: 'Bodily Autonomy & Informed Health Choice',
          layer: 0,
          statement: 'Patients must be protected from exploitative commercial triage and unconsented digital health data sharing.',
          dharmicPrinciple: 'Swatantrata (Bodily Self-Ownership)'
        },
        {
          id: 'E5',
          title: 'Digital Health Privacy & Consent',
          layer: 2,
          statement: 'Centralized health data repositories must enforce cryptographic consent against corporate exploitation.',
          dharmicPrinciple: 'Adhikar (Inviolable Personal Privacy)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_HEALTH_SKEPTICISM',
          title: 'Distrust of Commercialized Medicine',
          mechanism: 'Fear of being denied emergency admission due to server outages or quota caps generates acute helplessness',
          livedEmpathy: 'The humiliation of standing outside an empanelled private hospital being turned away due to claim pre-authorization delays.',
          cognitiveBias: 'Algorithmic Skepticism / Perceived Disempowerment'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_HEALTH_RIGHTS',
          title: 'Right to Health Enactments & Primary Clinic Campaigns',
          actionDirective: 'Legislate non-negotiable statutory Right to Health and reallocate tertiary insurance budgets to strengthen PHCs',
          protestsOrPolicy: 'Public health doctor rallies, Rajasthan Right to Health Act implementation, and free essential drug litigation',
          linkedBillOrScheme: 'Rajasthan Right to Health Act / Clinical Establishments Act'
        }
      ]
    },
    syntheticResolution:
      'Mandate robust primary public clinic infrastructure as the non-negotiable foundation while utilizing capped-rate private insurance solely for specialized tertiary surgical interventions under transparent CAG audit scrutiny.',
    tensionLevel: 72
  },

  'Forest Clearances vs Tribal Rights': {
    query: 'Forest Clearances, Mining Corridors & Indigenous Rights',
    traditional: {
      title: 'Strategic Industrialization & National Mineral Sovereignty',
      spectrum: 'Strategic Development / Energy Security / National Infrastructure',
      rationale:
        'Domestic mining of coal, lithium, and iron ore is critical to avoid foreign energy dependency, power urban industrial corridors, and lift millions into modernized living standards.',
      moralityNodes: [
        {
          id: 'A6',
          title: 'Economic Expansion & Livelihood Creation',
          layer: 0,
          statement: 'Industrial development yields necessary capital and infrastructure for national welfare and strategic defense.',
          dharmicPrinciple: 'Rashtra Nirman (National Capacity Building)'
        },
        {
          id: 'D8',
          title: 'Democratic Economic Mandate',
          layer: 1,
          statement: 'Sovereign governance must utilize natural reserves to sustain collective industrial growth.',
          dharmicPrinciple: 'Sangathan (Collective Economic Strength)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_DEV_PRIDE',
          title: 'Aspiration for Modern Technological Infrastructure',
          mechanism: 'Belief in national industrial self-reliance drives support for mega energy and manufacturing projects',
          livedEmpathy: 'Desire for reliable 24/7 grid electricity, paved roads, and factory employment for upcoming youth.',
          cognitiveBias: 'Techno-Optimism / System Justification'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_FOREST_CLEARANCE',
          title: 'Fast-Track Statutory Clearance & Compensatory Afforestation',
          actionDirective: 'Accelerate Project Clearances under Forest Conservation Rules with mandatory CAMPA afforestation funds',
          protestsOrPolicy: 'Ministry of Environment fast-track portal notifications and district mining fund allocations',
          linkedBillOrScheme: 'Forest Conservation Amendment Act 2023 / MMDR Amendment'
        }
      ]
    },
    progressive: {
      title: 'Biocentric Stewardship & Indigenous Gram Sabha Sovereignty',
      spectrum: 'Ecological Integrity / Adivasi Rights / Intergenerational Justice',
      rationale:
        'Unregulated clear-felling destroys pristine ancient biospheres (e.g. Hasdeo Arand), violates inviolable Gram Sabha consent under FRA 2006, and drives irreversible climate vulnerability.',
      moralityNodes: [
        {
          id: 'A2',
          title: 'Biocentric Worth & Planetary Limits',
          layer: 0,
          statement: 'Natural ecosystems possess intrinsic non-negotiable value beyond commercial exploitation.',
          dharmicPrinciple: 'Prakriti Dharma (Sacred Ecological Balance)'
        },
        {
          id: 'D4',
          title: 'Indigenous Sovereignty & Habitat Rights',
          layer: 1,
          statement: 'Adivasi communities hold sacred stewardship rights over ancestral lands and water bodies.',
          dharmicPrinciple: 'Jal-Jangal-Jameen (Inalienable Habitat Sovereignty)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_ECOLOGICAL_GRIEF',
          title: 'Solastalgia & Ancestral Trauma of Displacement',
          mechanism: 'Severing deep spiritual and generational ties to the forest induces existential despair and cultural erasure',
          livedEmpathy: 'Watching sacred sal trees and ancestral worship groves bulldozed for an open-cast coal pit.',
          cognitiveBias: 'Loss Aversion & Sacred Value Incommensurability'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_ECO_PROTEST',
          title: 'Gram Sabha Padayatras & Supreme Court Environmental PILs',
          actionDirective: 'Enforce non-derogable Free Prior Informed Consent and litigate against arbitrary forest rule dilutions',
          protestsOrPolicy: 'Hasdeo Bachao Padayatra, Chipko-style tree hugging mobilizations, and National Green Tribunal stay petitions',
          linkedBillOrScheme: 'Forest Rights Act (FRA 2006) / PESA Act 1996'
        }
      ]
    },
    syntheticResolution:
      'Demarcate ecologically inviolable "No-Go" virgin forest zones where Gram Sabha veto is absolute, while requiring strict circular recycling and high-grade remediation benchmarks for existing industrial concessions.',
    tensionLevel: 88
  },

  'DPDP Privacy & State Surveillance': {
    query: 'Digital Personal Data Protection Act & State Surveillance Exemptions',
    traditional: {
      title: 'National Cyber Sovereignty & Threat Interception',
      spectrum: 'National Security / Sovereign Cyber Defense / Counter-Terrorism',
      rationale:
        'State intelligence agencies require statutory data access exemptions to intercept hostile foreign interference, dismantle dark-web narcotics rings, and protect digital infrastructure.',
      moralityNodes: [
        {
          id: 'A2',
          title: 'Biocentric Worth & Systems Integrity',
          layer: 0,
          statement: 'Sovereign public ecosystems possess inherent right to security against catastrophic destabilization.',
          dharmicPrinciple: 'Rashtra Raksha (Sovereign Protection)'
        },
        {
          id: 'R1',
          title: 'Fractality of Stewardship',
          layer: -1,
          statement: 'Institutional longevity requires pre-empting hostile infiltration through proactive intelligence.',
          dharmicPrinciple: 'Danda Niti (Pragmatic Institutional Defense)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_SECURITY_TRUST',
          title: 'Need for Public Order & Collective Protection',
          mechanism: 'Vulnerability to international cyber terror creates acceptance of robust state defense telemetry',
          livedEmpathy: 'Trusting that state cybersecurity teams are silently intercepting terror coordinates to keep public transit safe.',
          cognitiveBias: 'In-Group Defense Bias / Zero-Risk Bias'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_DATA_COMPLIANCE',
          title: 'Data Protection Board Oversight & Security Notices',
          actionDirective: 'Implement standard data fiduciary compliance with statutory exemptions under Section 17 for sovereign safety',
          protestsOrPolicy: 'DPDP statutory rules and CERT-In cybersecurity directive enforcement',
          linkedBillOrScheme: 'Digital Personal Data Protection Act 2023 / CERT-In Directions'
        }
      ]
    },
    progressive: {
      title: 'Bodily Autonomy & Anti-Surveillance Privacy Rights',
      spectrum: 'Fundamental Privacy / Bodily Autonomy / Democratic Accountability',
      rationale:
        'Blanket executive exemptions in Section 17 of DPDP dismantle the Puttaswamy privacy judgment, authorizing warrantless surveillance, chilling investigative journalism, and undermining citizen autonomy.',
      moralityNodes: [
        {
          id: 'P2_AGENCY',
          title: 'Agency & Inviolable Personal Privacy',
          layer: -1,
          statement: 'Sentient beings own their choices and digital footprints; unconsented state tracking breeds chilling compliance.',
          dharmicPrinciple: 'Swatantrata (Inviolable Personal Boundary)'
        },
        {
          id: 'E1',
          title: 'Digital Privacy & Encryption',
          layer: 2,
          statement: 'Protection against warrantless dragnet telecommunications and internet data harvesting.',
          dharmicPrinciple: 'Adhikar (Inviolable Constitutional Dignity)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_SURVEILLANCE_CHILL',
          title: 'Panoptic Chilling Effect on Dissent',
          mechanism: 'Awareness of potential dragnet surveillance inhibits authentic speech, inquiry, and peaceful organization',
          livedEmpathy: 'A journalist hesitating to investigate official wrongdoing out of fear their private communications are tapped.',
          cognitiveBias: 'Psychological Reactance / Panoptic Self-Censorship'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_PRIVACY_PETITIONS',
          title: 'Supreme Court Privacy Petitions & Encrypted Tooling',
          actionDirective: 'Challenge broad exemption clauses in the Supreme Court and deploy decentralized end-to-end encrypted protocols',
          protestsOrPolicy: 'Internet Freedom Foundation constitutional challenges, RTI advocacy campaigns, and open privacy audits',
          linkedBillOrScheme: 'Puttaswamy Privacy Judgment / Right to Information Act 2005'
        }
      ]
    },
    syntheticResolution:
      'Subject all executive surveillance and data access exemptions to prior independent judicial warrants, strict proportionality tests, and mandatory bi-annual parliamentary reporting.',
    tensionLevel: 84
  },

  'Uniform Civil Code & Family Rights': {
    query: 'Uniform Civil Code & Pluralist Family Laws',
    traditional: {
      title: 'Civilizational Cohesion & Gender Equality Ray',
      spectrum: 'Civilizational Unity / Uniform Constitutional Rights / Dharma Cohesion',
      rationale:
        'Advocates universal legal equality, elimination of patriarchal personal customs, and equal inheritance and divorce rights for all women regardless of religious identity.',
      moralityNodes: [
        {
          id: 'A6',
          title: 'Equity & Equal Rights',
          layer: 0,
          statement: 'Universal legal fairness protects vulnerable individuals and ensures equal civic protection.',
          dharmicPrinciple: 'Samata (Constitutional Equality)'
        },
        {
          id: 'R3',
          title: 'Harmonic Reciprocity',
          layer: -1,
          statement: 'Equal legal standing strengthens civilizational cohesion and dismantles discriminatory legal silos.',
          dharmicPrinciple: 'Kartavya (Common Civic Responsibility)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_EQUALITY_NEED',
          title: 'Desire for Universal Fairness & Non-Discrimination',
          mechanism: 'Moral aversion to differential legal treatment based on birth religion or gender drives support for uniformity',
          livedEmpathy: 'Relief of a divorced woman securing equal inheritance and alimony without being hindered by outdated patriarchal customs.',
          cognitiveBias: 'Egalitarian Heuristic / Fairness Bias'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_UCC_ENACTMENT',
          title: 'Statutory Uniform Code & Registry Systems',
          actionDirective: 'Legislate uniform civil codes with mandatory marriage, divorce, and succession registration mechanisms',
          protestsOrPolicy: 'Uttarakhand UCC Act implementation, Law Commission submissions, and uniform civil registry portals',
          linkedBillOrScheme: 'Uttarakhand Uniform Civil Code 2024 / Article 44 DPSP'
        }
      ]
    },
    progressive: {
      title: 'Pluralist Autonomy & Cultural Freedom Ray',
      spectrum: 'Multicultural Pluralism / Bodily Autonomy / Minority Consent',
      rationale:
        'Emphasizes voluntary self-determination, protection of indigenous and minority customs, and freedom from majoritarian state-mandated social engineering.',
      moralityNodes: [
        {
          id: 'A4',
          title: 'Value of Autonomy & Choice',
          layer: 0,
          statement: 'Voluntary cultural expression, faith practice, and personal lifestyle choices are inviolable.',
          dharmicPrinciple: 'Swatantrata (Self-Governed Cultural Life)'
        },
        {
          id: 'D4',
          title: 'Protection of Pluralist Identities',
          layer: 1,
          statement: 'Constitutional systems must shield minority customs and diverse communities from forced conformity.',
          dharmicPrinciple: 'Anekantavada (Many-Sided Truth & Pluralism)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_MINORITY_FEAR',
          title: 'Threat to Cultural Identity & Majoritarian Anxiety',
          mechanism: 'Perception that state standardization will erase unique tribal customs and minority autonomy creates intense resistance',
          livedEmpathy: 'An adivasi elder fearing that statutory uniform marriage laws will outlaw their community customary succession rituals.',
          cognitiveBias: 'In-Group Threat Bias / Cultural Preservation Bias'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_PLURALIST_LITIGATION',
          title: 'Constitutional Challenges & Pluralist Law Reforms',
          actionDirective: 'Pursue internal reform within personal laws while litigating against intrusive live-in relationship registry clauses',
          protestsOrPolicy: 'Tribal customary assemblies, All India Muslim Personal Law Board resolutions, and feminist civil rights petitions',
          linkedBillOrScheme: 'Article 25 Freedom of Religion / Sixth Schedule Protections'
        }
      ]
    },
    syntheticResolution:
      'Establish a non-negotiable floor of fundamental human rights (gender equality in inheritance, child marriage ban, monogamy) while allowing voluntary pluralist arbitration for non-coercive cultural traditions.',
    tensionLevel: 79
  },

  'Gig Workers Social Security Act': {
    query: 'Gig Workers Social Security, Platform Levies & Algorithmic Transparency',
    traditional: {
      title: 'Dynamic Platform Economy & Flexible Entrepreneurship',
      spectrum: 'Market Innovation / Low Friction Employment / Economic Agility',
      rationale:
        'Shields gig and platform enterprises from rigid labor quotas to encourage startup investment, flexible entry for migrant workers, and rapid urban delivery logistics.',
      moralityNodes: [
        {
          id: 'A6',
          title: 'Material Efficiency & Livelihood Access',
          layer: 0,
          statement: 'Frictionless economic markets create rapid employment opportunities for youth and informal labor.',
          dharmicPrinciple: 'Udyam (Enterprise & Productive Work)'
        },
        {
          id: 'D8',
          title: 'Democratic Economic Mandate',
          layer: 1,
          statement: 'The state fosters innovative digital platform ecosystems to boost consumer convenience and trade.',
          dharmicPrinciple: 'Vyapar (Dynamic Commercial Order)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_FLEXIBILITY_PRIDE',
          title: 'Aspiration for Schedule Autonomy',
          mechanism: 'Attraction of being one’s own boss and logging in when desired without rigid managerial oversight',
          livedEmpathy: 'A student earning evening income as a delivery partner on their own schedule to fund college education.',
          cognitiveBias: 'Optimism Bias in Gig Independence'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_GIG_BOARDS',
          title: 'Voluntary Welfare Registrations & Grievance Portals',
          actionDirective: 'Establish tripartite welfare boards with streamlined digital registration and minimal compliance burden',
          protestsOrPolicy: 'Code on Social Security e-Shram portal integrations and corporate voluntary welfare schemes',
          linkedBillOrScheme: 'Code on Social Security 2020 / e-Shram Portal'
        }
      ]
    },
    progressive: {
      title: 'Labor Dignity & Anti-Algorithmic Exploitation Ray',
      spectrum: 'Labor Rights / Algorithmic Explainability / Living Wage',
      rationale:
        'Dismantles the myth of independent contractors; gig workers endure 14-hour shifts, arbitrary algorithmic shadow-banning, and zero medical safety without collective bargaining rights.',
      moralityNodes: [
        {
          id: 'P1_HARM',
          title: 'Ahimsa & Prevention of Physical Burnout',
          layer: -1,
          statement: 'Workers must not be pushed into hazardous exhaustion and untreated road accidents by punitive dispatch algorithms.',
          dharmicPrinciple: 'Ahimsa (Non-Exploitation of Body)'
        },
        {
          id: 'P3_EQUITY',
          title: 'Nyaya & Fair Value Distribution',
          layer: -1,
          statement: 'Platform owners must not extract disproportionate surplus while offloading all fuel and health risks onto delivery drivers.',
          dharmicPrinciple: 'Nyaya (Fair Exchange of Labor)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_ALGO_HELPLESSNESS',
          title: 'Alienation & Algorithmic Anxiety',
          mechanism: 'Being managed by black-box algorithms that deduct pay or deactivate accounts without human appeal causes chronic distress',
          livedEmpathy: 'A delivery driver having their account permanently deactivated during monsoon rush due to a single fraudulent customer complaint.',
          cognitiveBias: 'Learned Helplessness / Disillusionment with Digital Capital'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_GIG_STRIKES',
          title: 'Platform Strike Actions & Statutory Welfare Levies',
          actionDirective: 'Enact state-level welfare acts funded by dedicated platform transaction levies with algorithmic audit mandates',
          protestsOrPolicy: 'Gig and Platform Workers Union (TGPWU) strikes, flash boycotts, and Karnataka/Rajasthan Gig Worker bills',
          linkedBillOrScheme: 'Rajasthan Gig Workers Act 2023 / Karnataka Platform Workers Bill 2024'
        }
      ]
    },
    syntheticResolution:
      'Legislate dedicated transaction-based welfare levies to fund comprehensive accident and health insurance while mandating algorithmic transparency and human arbitration before any worker deactivation.',
    tensionLevel: 75
  }
};

const PRESET_QUERIES = [
  'PM-KISAN DBT & Farmer Income',
  'Ayushman Bharat Universal Health',
  'Forest Clearances vs Tribal Rights',
  'DPDP Privacy & State Surveillance',
  'Uniform Civil Code & Family Rights',
  'Gig Workers Social Security Act'
];

// Helper to look up or generate fallback data
const getFallbackData = (query: string): DynamicSpectrumData => {
  if (FALLBACK_PRESETS[query]) {
    return FALLBACK_PRESETS[query];
  }

  const qLower = query.toLowerCase();
  for (const key of Object.keys(FALLBACK_PRESETS)) {
    if (qLower.includes(key.toLowerCase()) || key.toLowerCase().includes(qLower)) {
      return FALLBACK_PRESETS[key];
    }
  }

  // Generative default
  return {
    query: query,
    traditional: {
      title: `Civilizational Order & Systemic Stability on '${query}'`,
      spectrum: 'Civilizational Order / Statutory Compliance / Collective Duty',
      rationale: `Prioritizes institutional continuity, sovereign stability, and structured regulatory compliance to prevent systemic breakdown regarding ${query}.`,
      moralityNodes: [
        {
          id: 'A2',
          title: 'Biocentric Worth & Systems Integrity',
          layer: 0,
          statement: 'Sovereign public order and civic systems possess inherent right to security against destabilization.',
          dharmicPrinciple: 'Dharma & Kartavya (Duty to Social Cohesion)'
        },
        {
          id: 'R3',
          title: 'Harmonic Reciprocity',
          layer: -1,
          statement: 'Universal conduct must preserve social stability and prevent catastrophic breakdown.',
          dharmicPrinciple: 'Samashti (Collective Wellbeing)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_ORDER',
          title: 'Need for Predictability & In-Group Safety',
          mechanism: 'Desire for strong institutional guardrails to protect family and social stability from disorder',
          livedEmpathy: 'The peace of mind that laws are enforced equally and public institutions are resilient against chaos.',
          cognitiveBias: 'Status Quo Bias / System Justification'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_ORDER',
          title: 'Statutory Compliance & Institutional Audits',
          actionDirective: 'Enforce strict statutory regulations, CAG audit benchmarks, and institutional oversight',
          protestsOrPolicy: 'Official statutory notices, administrative directives, and accountability audits',
          linkedBillOrScheme: 'Statutory Regulatory Framework'
        }
      ]
    },
    progressive: {
      title: `Liberty, Bodily Autonomy & Pluralist Rights on '${query}'`,
      spectrum: 'Civil Liberties / Bodily Autonomy / Pluralist Consent',
      rationale: `Championing personal self-determination, protection of pluralist community identities, and individual autonomy against coercive top-down homogenization regarding ${query}.`,
      moralityNodes: [
        {
          id: 'P2_AGENCY',
          title: 'Agency & Voluntary Consent',
          layer: -1,
          statement: 'Sentient individuals own their choices; unconsented state or social coercion breeds trauma.',
          dharmicPrinciple: 'Swatantrata (Inviolable Agency)'
        },
        {
          id: 'A4',
          title: 'Value of Autonomy & Choice',
          layer: 0,
          statement: 'Personal self-determination and uncoerced lifestyle choices are inviolable baseline rights.',
          dharmicPrinciple: 'Nyaya & Ahimsa (Fairness and Non-Violence)'
        }
      ],
      psychologyNodes: [
        {
          id: 'PSY_LIBERTY',
          title: 'Psychological Reactance & Personal Sovereignty',
          mechanism: 'Perceived institutional coercion triggers acute psychological resistance, alienation, and trauma',
          livedEmpathy: 'The lived indignity of having personal choices, livelihoods, or identities dictated without voice.',
          cognitiveBias: 'Psychological Reactance / Loss of Autonomy Salience'
        }
      ],
      actionNodes: [
        {
          id: 'ACT_PROTEST',
          title: 'Public Demonstrations & Constitutional Litigation',
          actionDirective: 'Organize grassroots public demonstrations, file High Court/Supreme Court PILs, and conduct RTI campaigns',
          protestsOrPolicy: 'Decentralized citizen rallies, open audit litigation, and public transparency advocacy',
          linkedBillOrScheme: 'Constitutional Rights Petitions / Article 21'
        }
      ]
    },
    syntheticResolution:
      'Establish a principled equilibrium that guarantees universal baseline protections while preserving pluralist voluntary opt-in mechanisms.',
    tensionLevel: 75
  };
};

// ==========================================
// 3. CUSTOM REACTFLOW NODE COMPONENTS
// ==========================================

// --- NODE 1: ORIGIN QUERY NODE ---
export interface PrismQueryNodeData extends Record<string, unknown> {
  query: string;
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  onSubmitQuery: (val: string) => void;
  isLoading: boolean;
  isLiveConnected: boolean;
  presets: string[];
  layoutMode?: 'horizontal' | 'vertical';
}

const PrismQueryNodeComponent = ({ data }: { data: PrismQueryNodeData }) => {
  const { query, searchInput, onSearchInputChange, onSubmitQuery, isLoading, isLiveConnected, presets, layoutMode = 'horizontal' } = data;

  return (
    <div className="w-[390px] bg-stone-900/95 border-2 border-amber-500/70 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-stone-100 flex flex-col gap-3.5 relative">
      <Handle
        type="source"
        position={layoutMode === 'vertical' ? Position.Bottom : Position.Right}
        id="query-out"
        className="!w-3.5 !h-3.5 !bg-amber-400 !border-2 !border-stone-950"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/40 pb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">💎</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-300 font-serif">
              Origin Query Beam
            </h2>
            <span className="text-[11px] font-medium text-stone-400">Step 1: Input Policy Dilemma</span>
          </div>
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border ${
            isLoading
              ? 'bg-amber-950 border-amber-500 text-amber-300'
              : isLiveConnected
              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
              : 'bg-stone-800 border-stone-600 text-stone-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLoading ? 'bg-amber-400 animate-ping' : isLiveConnected ? 'bg-emerald-400 animate-pulse' : 'bg-stone-400'
            }`}
          />
          {isLoading ? 'Refracting...' : isLiveConnected ? 'Gemini Edge' : 'Multi-View'}
        </span>
      </div>

      {/* Search Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchInput.trim()) {
            onSubmitQuery(searchInput.trim());
          }
        }}
        className="space-y-2"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder="e.g. PM-KISAN, Ayushman Bharat..."
            className="w-full bg-stone-950 border border-amber-900/60 focus:border-amber-400 rounded-xl pl-9 pr-20 py-2.5 text-xs font-semibold text-stone-100 placeholder:text-stone-600 focus:outline-none transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-stone-500 absolute left-3 pointer-events-none" />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 active:scale-95 disabled:opacity-50 text-stone-950 font-black text-[11px] rounded-lg transition-all flex items-center gap-1 shadow"
          >
            <span>Refract</span>
            <Zap className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Preset Topics */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
          Preset Scheme Beams:
        </span>
        <div className="grid grid-cols-2 gap-1.5 max-h-[120px] overflow-y-auto pr-1">
          {presets.map((preset) => {
            const isCurrent = query === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  onSearchInputChange(preset);
                  onSubmitQuery(preset);
                }}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all truncate flex items-center justify-between ${
                  isCurrent
                    ? 'bg-amber-950/90 border-amber-500 text-amber-200 font-bold shadow'
                    : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-amber-900'
                }`}
                title={preset}
              >
                <span className="truncate">{preset}</span>
                {isCurrent && <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- NODE 2: PRISM REFRACTOR NODE ---
export interface PrismSplitterNodeData extends Record<string, unknown> {
  isLoading: boolean;
  query: string;
  layoutMode?: 'horizontal' | 'vertical';
}

const PrismSplitterNodeComponent = ({ data }: { data: PrismSplitterNodeData }) => {
  const { isLoading, layoutMode = 'horizontal' } = data;

  return (
    <div className="w-[300px] bg-stone-950/95 border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-stone-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Target handle from Query Node */}
      <Handle
        type="target"
        position={layoutMode === 'vertical' ? Position.Top : Position.Left}
        id="splitter-in"
        className="!w-3.5 !h-3.5 !bg-amber-400 !border-2 !border-stone-950"
      />

      {/* Upward / Leftward Source handle for Pole A */}
      <Handle
        type="source"
        position={layoutMode === 'vertical' ? Position.Bottom : Position.Right}
        id="splitter-out-trad"
        style={layoutMode === 'vertical' ? { left: '25%' } : { top: '25%' }}
        className="!w-3.5 !h-3.5 !bg-amber-400 !border-2 !border-stone-950"
      />

      {/* Downward / Rightward Source handle for Pole B */}
      <Handle
        type="source"
        position={layoutMode === 'vertical' ? Position.Bottom : Position.Right}
        id="splitter-out-prog"
        style={layoutMode === 'vertical' ? { left: '75%' } : { top: '75%' }}
        className="!w-3.5 !h-3.5 !bg-cyan-400 !border-2 !border-stone-950"
      />

      <div className="w-full flex items-center justify-between text-xs font-bold text-stone-400 mb-1.5 font-serif">
        <span>Optical Prism Chamber</span>
        <span className="text-[10px] text-amber-400 font-mono">λ-DISPERSION</span>
      </div>

      <svg className="w-full h-32 select-none" viewBox="0 0 260 130" fill="none">
        <defs>
          <linearGradient id="prismGlassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.45" />
          </linearGradient>

          <filter id="prismGlowGold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="prismGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Incoming white ray */}
        <line
          x1="0"
          y1="65"
          x2="110"
          y2="65"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeDasharray="5 3"
          className={isLoading ? 'animate-pulse' : ''}
        />
        <circle cx="110" cy="65" r="3" fill="#ffffff" filter="url(#prismGlowGold)" />

        {/* Central Triangular Glass Prism */}
        <polygon
          points="130,15 175,115 85,115"
          fill="url(#prismGlassGrad)"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Internal refractive paths */}
        <line x1="110" y1="65" x2="140" y2="50" stroke="#fef08a" strokeWidth="2" strokeDasharray="2 2" />
        <line x1="110" y1="65" x2="140" y2="80" stroke="#a5f3fc" strokeWidth="2" strokeDasharray="2 2" />

        {/* Upward Amber Ray */}
        <line
          x1="140"
          y1="50"
          x2="260"
          y2="20"
          stroke="#f59e0b"
          strokeWidth="3"
          filter="url(#prismGlowGold)"
        />
        <circle cx="260" cy="20" r="3.5" fill="#fbbf24" />

        {/* Downward Cyan Ray */}
        <line
          x1="140"
          y1="80"
          x2="260"
          y2="110"
          stroke="#06b6d4"
          strokeWidth="3"
          filter="url(#prismGlowCyan)"
        />
        <circle cx="260" cy="110" r="3.5" fill="#38bdf8" />
      </svg>

      <div className="w-full flex items-center justify-between text-[11px] font-bold mt-1">
        <span className="text-amber-400">↗ Order Ray</span>
        <span className="text-cyan-400">↘ Autonomy Ray</span>
      </div>
    </div>
  );
};

// --- NODE 3: STANCE HEADER NODE ---
export interface PrismStanceHeaderNodeData extends Record<string, unknown> {
  pole: 'A' | 'B';
  title: string;
  spectrum: string;
  rationale: string;
  onAskSocrates: () => void;
  layoutMode?: 'horizontal' | 'vertical';
}

const PrismStanceHeaderNodeComponent = ({ data }: { data: PrismStanceHeaderNodeData }) => {
  const { pole, title, spectrum, rationale, onAskSocrates, layoutMode = 'horizontal' } = data;
  const isPoleA = pole === 'A';

  return (
    <div
      className={`w-[390px] rounded-2xl p-4 shadow-2xl backdrop-blur-md border-2 relative overflow-hidden flex flex-col gap-3 transition-all ${
        isPoleA
          ? 'bg-gradient-to-br from-amber-950/90 via-stone-900 to-stone-950 border-amber-500/80 shadow-amber-950/40 text-amber-100'
          : 'bg-gradient-to-br from-cyan-950/90 via-stone-900 to-stone-950 border-cyan-500/80 shadow-cyan-950/40 text-cyan-100'
      }`}
    >
      {/* Target Handle from Splitter */}
      <Handle
        type="target"
        position={layoutMode === 'vertical' ? Position.Top : Position.Left}
        id="header-in"
        className={`!w-3.5 !h-3.5 !border-2 !border-stone-950 ${
          isPoleA ? '!bg-amber-400' : '!bg-cyan-400'
        }`}
      />

      {/* Source Handle to Sub-Tree */}
      <Handle
        type="source"
        position={layoutMode === 'vertical' ? Position.Bottom : Position.Right}
        id="header-out"
        className={`!w-3.5 !h-3.5 !border-2 !border-stone-950 ${
          isPoleA ? '!bg-amber-400' : '!bg-cyan-400'
        }`}
      />

      {/* Structural Track Banner */}
      <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
        <div className="flex items-center gap-2">
          {isPoleA ? (
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
          )}
          <span className="text-xs font-black uppercase tracking-wider font-serif">
            {isPoleA ? '🇮🇳 Proponents & Order Track (Pole A)' : '🌐 Opponents & Pluralist Rights Track (Pole B)'}
          </span>
        </div>
      </div>

      {/* Spectrum Badge */}
      <div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider inline-block ${
            isPoleA
              ? 'bg-amber-950 text-amber-300 border-amber-700'
              : 'bg-cyan-950 text-cyan-300 border-cyan-700'
          }`}
        >
          {spectrum}
        </span>
      </div>

      {/* Stance Title */}
      <h3 className="text-sm font-extrabold font-serif leading-snug">
        <span>{title}</span>
      </h3>

      {/* 2-Liner Rationale */}
      <div className="bg-stone-950/85 p-3 rounded-xl border border-stone-800 text-xs font-medium leading-relaxed text-stone-200">
        <p className="line-clamp-3">{rationale}</p>
      </div>

      {/* Socrates Ask Button */}
      <div className="flex items-center justify-between pt-1 border-t border-stone-800/80 text-xs">
        <span className="text-stone-400 font-medium">Sub-branch Flow ➔</span>
        <button
          type="button"
          onClick={onAskSocrates}
          className={`font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all text-xs ${
            isPoleA
              ? 'bg-amber-950/90 text-amber-300 hover:bg-amber-900 border border-amber-700'
              : 'bg-cyan-950/90 text-cyan-300 hover:bg-cyan-900 border border-cyan-700'
          }`}
        >
          <span>Socrates</span>
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// --- NODE 4: PRISM CATEGORY SUB-TREE NODE ---
export interface PrismCategoryNodeData extends Record<string, unknown> {
  categoryType: 'morality' | 'psychology' | 'action';
  pole: 'A' | 'B';
  id: string;
  title: string;
  layer?: number;
  statement?: string;
  dharmicPrinciple?: string;
  mechanism?: string;
  livedEmpathy?: string;
  cognitiveBias?: string;
  actionDirective?: string;
  protestsOrPolicy?: string;
  linkedBillOrScheme?: string;
  onSelectNode: () => void;
  onAskSocrates: () => void;
  layoutMode?: 'horizontal' | 'vertical';
}

const PrismCategoryNodeComponent = ({ data }: { data: PrismCategoryNodeData }) => {
  const {
    categoryType,
    pole,
    id,
    title,
    layer,
    statement,
    dharmicPrinciple,
    mechanism,
    livedEmpathy,
    cognitiveBias,
    actionDirective,
    protestsOrPolicy,
    linkedBillOrScheme,
    onSelectNode,
    onAskSocrates,
    layoutMode = 'horizontal'
  } = data;

  const isPoleA = pole === 'A';
  // Check if it's a real axiom ID (e.g. A6, P2_AGENCY, E1) rather than a synthetic tag
  const isRealAxiom = Boolean(id && !id.startsWith('ACT_') && !id.startsWith('PSY_') && !id.startsWith('ACT') && !id.startsWith('PSY'));

  // Specific styling per category
  let categoryBadge = {
    icon: '🌿',
    label: 'Morality & Dharma',
    borderStyle: isPoleA ? 'border-amber-500/70 hover:border-amber-400' : 'border-cyan-500/70 hover:border-cyan-400',
    headerColor: isPoleA ? 'text-amber-300' : 'text-cyan-300',
    tagBg: isPoleA ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-cyan-950 text-cyan-300 border-cyan-800'
  };

  if (categoryType === 'psychology') {
    categoryBadge = {
      icon: '🧠',
      label: 'Psychology & Empathy',
      borderStyle: 'border-purple-500/70 hover:border-purple-400',
      headerColor: 'text-purple-300',
      tagBg: 'bg-purple-950 text-purple-300 border-purple-800'
    };
  } else if (categoryType === 'action') {
    categoryBadge = {
      icon: '⚡',
      label: 'Action & Policy Directive',
      borderStyle: isPoleA ? 'border-amber-600/70 hover:border-amber-400' : 'border-sky-500/70 hover:border-sky-400',
      headerColor: isPoleA ? 'text-amber-200' : 'text-sky-200',
      tagBg: isPoleA ? 'bg-amber-950/80 text-amber-300 border-amber-700' : 'bg-sky-950/80 text-sky-300 border-sky-700'
    };
  }

  return (
    <div
      onClick={onSelectNode}
      className={`w-[390px] bg-stone-900/95 border-2 ${categoryBadge.borderStyle} rounded-2xl p-4 shadow-xl backdrop-blur-md cursor-pointer transition-all hover:scale-[1.01] flex flex-col gap-3 relative group text-stone-100`}
    >
      <Handle
        type="target"
        position={layoutMode === 'vertical' ? Position.Top : Position.Left}
        id="cat-in"
        className={`!w-3.5 !h-3.5 !border-2 !border-stone-950 ${isPoleA ? '!bg-amber-400' : '!bg-cyan-400'}`}
      />
      <Handle
        type="source"
        position={layoutMode === 'vertical' ? Position.Bottom : Position.Right}
        id="cat-out"
        className={`!w-3.5 !h-3.5 !border-2 !border-stone-950 ${isPoleA ? '!bg-amber-400' : '!bg-cyan-400'}`}
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider flex items-center gap-1.5 ${categoryBadge.tagBg}`}>
          <span>{categoryBadge.icon}</span>
          <span>{categoryBadge.label}</span>
        </span>
        {typeof layer === 'number' && (
          <span className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 font-bold">
            Layer {layer}
          </span>
        )}
      </div>

      {/* Node Title (No synthetic internal IDs like [ACT_...] shown) */}
      <div className="space-y-0.5">
        <h4 className={`text-sm font-extrabold ${categoryBadge.headerColor} font-serif group-hover:underline flex items-center gap-1.5 leading-snug`}>
          {isRealAxiom && <span className="text-amber-400 font-mono">[{id}]</span>}
          <span>{title}</span>
        </h4>
      </div>

      {/* Category-Specific Body Details */}
      {categoryType === 'morality' && (
        <div className="bg-stone-950/85 p-3 rounded-xl border border-stone-800/80 space-y-2.5">
          {statement && <p className="text-xs font-medium text-stone-200 leading-relaxed">{statement}</p>}
          {dharmicPrinciple && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/50 border border-amber-800/60 text-xs font-semibold text-amber-300">
              <span>🕉️ Dharmic Root:</span>
              <span className="italic">{dharmicPrinciple}</span>
            </div>
          )}
        </div>
      )}

      {categoryType === 'psychology' && (
        <div className="bg-stone-950/85 p-3 rounded-xl border border-stone-800/80 space-y-2.5">
          {cognitiveBias && (
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-800 inline-flex items-center gap-1.5">
                <span>🧠 Cognitive Bias:</span>
                <span>{cognitiveBias}</span>
              </span>
            </div>
          )}
          {livedEmpathy && (
            <div className="bg-purple-950/30 p-2.5 rounded-xl border border-purple-900/50 text-xs text-purple-200/95 italic font-serif leading-relaxed">
              "{livedEmpathy}"
            </div>
          )}
          {mechanism && (
            <p className="text-xs font-medium text-stone-300 leading-relaxed">
              <span className="text-purple-400 font-bold">Epistemic Mechanism: </span>
              {mechanism}
            </p>
          )}
        </div>
      )}

      {categoryType === 'action' && (
        <div className="bg-stone-950/85 p-3 rounded-xl border border-stone-800/80 space-y-2.5">
          {linkedBillOrScheme && (
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900 text-amber-300 border border-amber-700/60 inline-flex items-center gap-1.5 max-w-full truncate">
                <span>📜</span>
                <span className="truncate">{linkedBillOrScheme}</span>
              </span>
            </div>
          )}
          {actionDirective && (
            <p className="text-xs font-medium text-stone-200 leading-relaxed">
              <span className="text-amber-400 font-bold">Concrete Directive: </span>
              {actionDirective}
            </p>
          )}
          {protestsOrPolicy && (
            <p className="text-xs text-stone-300 leading-relaxed">
              <span className="text-amber-300 font-bold">⚡ Real-World Impact / Protests: </span>
              {protestsOrPolicy}
            </p>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-stone-800/80 text-xs">
        <span className="text-amber-400 group-hover:underline flex items-center gap-1 font-bold">
          Inspect Node <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAskSocrates();
          }}
          className="text-stone-400 hover:text-amber-300 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950 hover:bg-stone-800 border border-stone-700 font-bold transition-all text-xs"
          title="Discuss in Socratic Chat"
        >
          <span>Socrates</span>
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// --- NODE 5: SOCRATIC SYNTHESIS NODE ---
export interface PrismSynthesisNodeData extends Record<string, unknown> {
  resolution: string;
  tensionLevel: number;
  tradTitle: string;
  progTitle: string;
  onAskSocrates: () => void;
  onViewOnTree: () => void;
  layoutMode?: 'horizontal' | 'vertical';
}

const PrismSynthesisNodeComponent = ({ data }: { data: PrismSynthesisNodeData }) => {
  const { resolution, tensionLevel, onAskSocrates, onViewOnTree, layoutMode = 'horizontal' } = data;

  return (
    <div className="w-[390px] bg-gradient-to-br from-stone-900 via-stone-900/95 to-purple-950/70 border-2 border-purple-500/80 rounded-2xl p-4 shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-md text-stone-100 flex flex-col gap-3.5 relative">
      {/* Target Handles from Sub-Trees */}
      <Handle
        type="target"
        position={layoutMode === 'vertical' ? Position.Top : Position.Left}
        id="synth-in-poleA"
        style={layoutMode === 'vertical' ? { left: '30%' } : { top: '30%' }}
        className="!w-3.5 !h-3.5 !bg-amber-400 !border-2 !border-stone-950"
      />
      <Handle
        type="target"
        position={layoutMode === 'vertical' ? Position.Top : Position.Left}
        id="synth-in-poleB"
        style={layoutMode === 'vertical' ? { left: '70%' } : { top: '70%' }}
        className="!w-3.5 !h-3.5 !bg-cyan-400 !border-2 !border-stone-950"
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-900/50 pb-2.5">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-300 font-serif">
              Socratic Golden Mean
            </h3>
            <span className="text-[11px] text-stone-400">Dialectical Synthesis & Proportionality</span>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
          Tension: {tensionLevel}%
        </span>
      </div>

      {/* Tension Meter Bar */}
      <div className="w-full bg-stone-950 h-2.5 rounded-full overflow-hidden border border-stone-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(10, tensionLevel))}%` }}
        />
      </div>

      {/* Synthetic Resolution Statement */}
      <div className="bg-stone-950/90 p-3.5 rounded-xl border border-purple-900/40 text-xs text-stone-200 italic font-serif leading-relaxed">
        "{resolution}"
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={onAskSocrates}
          className="px-3.5 py-2.5 bg-purple-950 hover:bg-purple-900 border border-purple-700 text-purple-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <span>💬 Ask Socrates</span>
        </button>
        <button
          type="button"
          onClick={onViewOnTree}
          className="px-3.5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <span>🌳 View on Tree</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Custom Node Types mapping for ReactFlow
const PRISM_NODE_TYPES = {
  prismQuery: PrismQueryNodeComponent,
  prismSplitter: PrismSplitterNodeComponent,
  prismStanceHeader: PrismStanceHeaderNodeComponent,
  prismCategory: PrismCategoryNodeComponent,
  prismSynthesis: PrismSynthesisNodeComponent
};

// ==========================================
// 4. MAIN PRISM VIEW COMPONENT
// ==========================================

const PrismViewContent: React.FC = () => {
  const {
    nodes: storeNodes,
    setSelectedNode,
    setActiveDrawer,
    setActiveParadigm,
    setAiMatchedNodeIds,
    setHighlightRationale,
    setChatInputPrompt,
    toggleChat,
    isDarkMode
  } = useMoralityStore();

  const [topicQuery, setTopicQuery] = useState<string>('PM-KISAN DBT & Farmer Income');
  const [searchInput, setSearchInput] = useState<string>('PM-KISAN DBT & Farmer Income');
  const [dynamicSpectrum, setDynamicSpectrum] = useState<DynamicSpectrumData | null>(null);
  const [isLoadingSpectrum, setIsLoadingSpectrum] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);

  // 1. Fetch Dynamic Gemini Edge Refraction
  useEffect(() => {
    if (!topicQuery.trim()) return;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchDynamicRefraction = async () => {
      setIsLoadingSpectrum(true);
      try {
        const savedSettings = localStorage.getItem('morality_agent_connection_settings_v1');
        let baseUrl = '';
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            if (parsed.mode === 'local_port' && parsed.localPortConfig?.url) {
              baseUrl = parsed.localPortConfig.url.replace(/\/$/, '');
            } else if (parsed.remoteServerConfig?.url) {
              baseUrl = parsed.remoteServerConfig.url.replace(/\/$/, '');
            }
          } catch (e) {}
        }

        const endpoint = baseUrl ? `${baseUrl}/api/prism/refract` : '/api/prism/refract';
        const res = await axios.post(
          endpoint,
          { query: topicQuery.trim() },
          {
            timeout: 12000,
            signal: abortController.signal,
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (isMounted && res.data && res.data.traditional && res.data.progressive) {
          const rawData = res.data;
          setDynamicSpectrum({
            query: rawData.query || topicQuery,
            traditional: {
              ...rawData.traditional,
              moralityNodes: rawData.traditional.moralityNodes || rawData.traditional.treeBranch || [],
              psychologyNodes: rawData.traditional.psychologyNodes || [],
              actionNodes: rawData.traditional.actionNodes || []
            },
            progressive: {
              ...rawData.progressive,
              moralityNodes: rawData.progressive.moralityNodes || rawData.progressive.treeBranch || [],
              psychologyNodes: rawData.progressive.psychologyNodes || [],
              actionNodes: rawData.progressive.actionNodes || []
            },
            syntheticResolution: rawData.syntheticResolution || rawData.synthetic_resolution,
            tensionLevel: rawData.tensionLevel || rawData.tension_level || 75
          });
          setIsLiveConnected(true);
        }
      } catch (err: any) {
        if (isMounted) {
          setDynamicSpectrum(null);
          setIsLiveConnected(false);
        }
      } finally {
        if (isMounted) {
          setIsLoadingSpectrum(false);
        }
      }
    };

    const timer = setTimeout(fetchDynamicRefraction, 300);

    return () => {
      isMounted = false;
      abortController.abort();
      clearTimeout(timer);
    };
  }, [topicQuery]);

  const activeSpectrumData: DynamicSpectrumData = useMemo(() => {
    return dynamicSpectrum || getFallbackData(topicQuery);
  }, [dynamicSpectrum, topicQuery]);

  // Handlers for store & node selection
  const handleSelectMoralityNode = useCallback(
    (node: PrismMoralityNode) => {
      const matched = storeNodes.find((n) => n.id === node.id);
      if (matched) {
        setSelectedNode(matched);
      } else {
        const synthetic: MoralityNode = {
          id: node.id,
          layer: node.layer ?? 0,
          title: node.title,
          statement: node.statement,
          parentIds: [],
          status: 'ratified'
        };
        setSelectedNode(synthetic);
      }

      setAiMatchedNodeIds([node.id]);
      setHighlightRationale({
        title: `Prism Grounding Axiom: [${node.id}] ${node.title}`,
        icon: '🌿',
        body: `${node.statement}${node.dharmicPrinciple ? ` — Dharmic Root: ${node.dharmicPrinciple}` : ''}`,
        nodeIds: [node.id]
      });
      setActiveDrawer('inspector');
    },
    [storeNodes, setSelectedNode, setAiMatchedNodeIds, setHighlightRationale, setActiveDrawer]
  );

  const handleSelectPsychologyNode = useCallback(
    (node: PrismPsychologyNode, pole: 'A' | 'B') => {
      const synthetic: MoralityNode = {
        id: node.id,
        layer: 1,
        title: node.title,
        statement: `Mechanism: ${node.mechanism} | Lived Empathy: ${node.livedEmpathy}`,
        parentIds: [],
        status: 'ratified',
        maslow_tier: 'Psychological Need'
      };
      setSelectedNode(synthetic);
      setAiMatchedNodeIds([node.id]);
      setHighlightRationale({
        title: `Psychology & Empathy [Pole ${pole}]: ${node.title}`,
        icon: '🧠',
        body: `${node.mechanism}${node.cognitiveBias ? ` (Cognitive Bias: ${node.cognitiveBias})` : ''} | "${node.livedEmpathy}"`,
        nodeIds: [node.id]
      });
      setActiveDrawer('inspector');
    },
    [setSelectedNode, setAiMatchedNodeIds, setHighlightRationale, setActiveDrawer]
  );

  const handleSelectActionNode = useCallback(
    (node: PrismActionNode, pole: 'A' | 'B') => {
      const synthetic: MoralityNode = {
        id: node.id,
        layer: 2,
        title: node.title,
        statement: `Directive: ${node.actionDirective} | Impact: ${node.protestsOrPolicy}`,
        parentIds: [],
        status: 'ratified',
        maslow_tier: 'Statutory/Action'
      };
      setSelectedNode(synthetic);
      setAiMatchedNodeIds([node.id]);
      setHighlightRationale({
        title: `Action Imperative / Protest [Pole ${pole}]: ${node.title}`,
        icon: '⚡',
        body: `${node.actionDirective}${node.linkedBillOrScheme ? ` (Ref: ${node.linkedBillOrScheme})` : ''} | Impact: ${node.protestsOrPolicy}`,
        nodeIds: [node.id]
      });
      setActiveDrawer('inspector');
    },
    [setSelectedNode, setAiMatchedNodeIds, setHighlightRationale, setActiveDrawer]
  );

  const handleAskSocratesStance = useCallback(
    (stanceTitle: string, rationale: string) => {
      setChatInputPrompt(
        `Socrates, examine the ${stanceTitle} on "${topicQuery}":\n"${rationale}"\n\nHow does this stance align with fundamental moral axioms and what are its hidden blindspots?`
      );
      toggleChat(true);
    },
    [topicQuery, setChatInputPrompt, toggleChat]
  );

  const handleAskSocratesCategory = useCallback(
    (category: string, title: string, content: string) => {
      setChatInputPrompt(
        `Socrates, analyze this ${category} element on "${topicQuery}":\n• Title: ${title}\n• Content: ${content}\n\nWhat is the dialectical implication of this for public policy and moral truth?`
      );
      toggleChat(true);
    },
    [topicQuery, setChatInputPrompt, toggleChat]
  );

  const handleAskSocratesGoldenMean = useCallback(() => {
    const trad = activeSpectrumData.traditional.title;
    const prog = activeSpectrumData.progressive.title;
    const res = activeSpectrumData.syntheticResolution || 'Harmonize civilizational order with individual liberty.';
    setChatInputPrompt(
      `Socrates, examine the dialectical synthesis on "${topicQuery}":\n` +
        `• Traditional Pole: ${trad}\n` +
        `• Liberty Pole: ${prog}\n` +
        `• Proposed Golden Mean: "${res}"\n\n` +
        `Evaluate how this proportionality balance reconciles root moral axioms without sacrificing basic human dignity.`
    );
    toggleChat(true);
  }, [activeSpectrumData, topicQuery, setChatInputPrompt, toggleChat]);

  const handleIlluminateOnTree = useCallback(() => {
    const tradIds = (activeSpectrumData.traditional?.moralityNodes || []).map((n) => n.id);
    const progIds = (activeSpectrumData.progressive?.moralityNodes || []).map((n) => n.id);
    const combinedIds = Array.from(new Set([...tradIds, ...progIds]));

    setAiMatchedNodeIds(combinedIds);
    setHighlightRationale({
      title: `Prism Refraction: ${topicQuery}`,
      icon: '💎',
      body: `Illuminating dual spectrum poles on the tree: Civilizational Order ([${tradIds.join(', ')}]) & Pluralist Autonomy ([${progIds.join(', ')}]).`,
      nodeIds: combinedIds
    });
    setActiveParadigm('tree');
  }, [activeSpectrumData, topicQuery, setAiMatchedNodeIds, setHighlightRationale, setActiveParadigm]);

  // Construct ReactFlow Nodes & Edges based on Layout Mode
  const { flowNodes, flowEdges } = useMemo(() => {
    const trad = activeSpectrumData.traditional;
    const prog = activeSpectrumData.progressive;

    const tradMoral = trad.moralityNodes?.[0] || {
      id: 'A2',
      title: 'Biocentric Worth & Systems Integrity',
      layer: 0,
      statement: 'Sovereign public order and civic systems possess inherent right to security against destabilization.',
      dharmicPrinciple: 'Dharma & Kartavya'
    };

    const tradPsych = trad.psychologyNodes?.[0] || {
      id: 'PSY_ORDER',
      title: 'Need for Predictability & In-Group Safety',
      mechanism: 'Desire for strong institutional guardrails to protect family and social stability',
      livedEmpathy: 'The peace of mind that laws are enforced equally.',
      cognitiveBias: 'Status Quo Bias'
    };

    const tradAction = trad.actionNodes?.[0] || {
      id: 'ACT_ORDER',
      title: 'Statutory Compliance & Institutional Audits',
      actionDirective: 'Enforce strict statutory regulations, CAG audit benchmarks, and institutional oversight',
      protestsOrPolicy: 'Official statutory notices and accountability audits',
      linkedBillOrScheme: 'Statutory Regulatory Framework'
    };

    const progMoral = prog.moralityNodes?.[0] || {
      id: 'P2_AGENCY',
      title: 'Agency & Voluntary Consent',
      layer: -1,
      statement: 'Sentient individuals own their choices; unconsented coercion breeds trauma.',
      dharmicPrinciple: 'Swatantrata (Inviolable Agency)'
    };

    const progPsych = prog.psychologyNodes?.[0] || {
      id: 'PSY_LIBERTY',
      title: 'Psychological Reactance & Personal Sovereignty',
      mechanism: 'Perceived institutional coercion triggers acute psychological resistance',
      livedEmpathy: 'The lived indignity of having personal choices dictated without voice.',
      cognitiveBias: 'Psychological Reactance'
    };

    const progAction = prog.actionNodes?.[0] || {
      id: 'ACT_PROTEST',
      title: 'Public Demonstrations & Constitutional Litigation',
      actionDirective: 'Organize grassroots demonstrations, file PILs, and conduct RTI campaigns',
      protestsOrPolicy: 'Decentralized citizen rallies and open litigation',
      linkedBillOrScheme: 'Article 21 / Constitutional Petitions'
    };

    // Calculate node positions based on layoutMode
    let posQuery = { x: 50, y: 380 };
    let posSplitter = { x: 500, y: 400 };
    let posPoleAHeader = { x: 920, y: 80 };
    let posPoleBHeader = { x: 920, y: 760 };

    let posPoleAMoral = { x: 1380, y: 20 };
    let posPoleAPsych = { x: 1820, y: 160 };
    let posPoleAAction = { x: 2260, y: 300 };

    let posPoleBMoral = { x: 1380, y: 720 };
    let posPoleBPsych = { x: 1820, y: 860 };
    let posPoleBAction = { x: 2260, y: 1000 };

    let posSynthesis = { x: 2720, y: 460 };

    if (layoutMode === 'vertical') {
      posQuery = { x: 480, y: 40 };
      posSplitter = { x: 540, y: 300 };
      posPoleAHeader = { x: 60, y: 560 };
      posPoleBHeader = { x: 900, y: 560 };

      posPoleAMoral = { x: 60, y: 780 };
      posPoleAPsych = { x: 60, y: 1020 };
      posPoleAAction = { x: 60, y: 1260 };

      posPoleBMoral = { x: 900, y: 780 };
      posPoleBPsych = { x: 900, y: 1020 };
      posPoleBAction = { x: 900, y: 1260 };

      posSynthesis = { x: 480, y: 1540 };
    }

    // --- NODES ARRAY ---
    const nodesList: FlowNode[] = [
      // 1. Origin Query Node
      {
        id: 'node-query',
        type: 'prismQuery',
        position: posQuery,
        data: {
          query: topicQuery,
          searchInput,
          onSearchInputChange: setSearchInput,
          onSubmitQuery: (q: string) => {
            setSearchInput(q);
            setTopicQuery(q);
          },
          isLoading: isLoadingSpectrum,
          isLiveConnected,
          presets: PRESET_QUERIES,
          layoutMode
        }
      },

      // 2. Prism Splitter Refractor Node
      {
        id: 'node-splitter',
        type: 'prismSplitter',
        position: posSplitter,
        data: {
          isLoading: isLoadingSpectrum,
          query: topicQuery,
          layoutMode
        }
      },

      // 3. Pole A Header Node (Amber)
      {
        id: 'node-header-poleA',
        type: 'prismStanceHeader',
        position: posPoleAHeader,
        data: {
          pole: 'A',
          title: trad.title,
          spectrum: trad.spectrum,
          rationale: trad.rationale,
          onAskSocrates: () => handleAskSocratesStance(trad.title, trad.rationale),
          layoutMode
        }
      },

      // 4. Pole B Header Node (Cyan)
      {
        id: 'node-header-poleB',
        type: 'prismStanceHeader',
        position: posPoleBHeader,
        data: {
          pole: 'B',
          title: prog.title,
          spectrum: prog.spectrum,
          rationale: prog.rationale,
          onAskSocrates: () => handleAskSocratesStance(prog.title, prog.rationale),
          layoutMode
        }
      },

      // 5. Pole A Sub-Tree Nodes
      {
        id: 'node-poleA-moral',
        type: 'prismCategory',
        position: posPoleAMoral,
        data: {
          categoryType: 'morality',
          pole: 'A',
          id: tradMoral.id,
          title: tradMoral.title,
          layer: tradMoral.layer,
          statement: tradMoral.statement,
          dharmicPrinciple: tradMoral.dharmicPrinciple,
          onSelectNode: () => handleSelectMoralityNode(tradMoral),
          onAskSocrates: () => handleAskSocratesCategory('Morality Axiom', tradMoral.title, tradMoral.statement),
          layoutMode
        }
      },
      {
        id: 'node-poleA-psych',
        type: 'prismCategory',
        position: posPoleAPsych,
        data: {
          categoryType: 'psychology',
          pole: 'A',
          id: tradPsych.id,
          title: tradPsych.title,
          mechanism: tradPsych.mechanism,
          livedEmpathy: tradPsych.livedEmpathy,
          cognitiveBias: tradPsych.cognitiveBias,
          onSelectNode: () => handleSelectPsychologyNode(tradPsych, 'A'),
          onAskSocrates: () => handleAskSocratesCategory('Psychological Need', tradPsych.title, tradPsych.mechanism),
          layoutMode
        }
      },
      {
        id: 'node-poleA-action',
        type: 'prismCategory',
        position: posPoleAAction,
        data: {
          categoryType: 'action',
          pole: 'A',
          id: tradAction.id,
          title: tradAction.title,
          actionDirective: tradAction.actionDirective,
          protestsOrPolicy: tradAction.protestsOrPolicy,
          linkedBillOrScheme: tradAction.linkedBillOrScheme,
          onSelectNode: () => handleSelectActionNode(tradAction, 'A'),
          onAskSocrates: () => handleAskSocratesCategory('Action Directive', tradAction.title, tradAction.actionDirective),
          layoutMode
        }
      },

      // 6. Pole B Sub-Tree Nodes
      {
        id: 'node-poleB-moral',
        type: 'prismCategory',
        position: posPoleBMoral,
        data: {
          categoryType: 'morality',
          pole: 'B',
          id: progMoral.id,
          title: progMoral.title,
          layer: progMoral.layer,
          statement: progMoral.statement,
          dharmicPrinciple: progMoral.dharmicPrinciple,
          onSelectNode: () => handleSelectMoralityNode(progMoral),
          onAskSocrates: () => handleAskSocratesCategory('Morality Axiom', progMoral.title, progMoral.statement),
          layoutMode
        }
      },
      {
        id: 'node-poleB-psych',
        type: 'prismCategory',
        position: posPoleBPsych,
        data: {
          categoryType: 'psychology',
          pole: 'B',
          id: progPsych.id,
          title: progPsych.title,
          mechanism: progPsych.mechanism,
          livedEmpathy: progPsych.livedEmpathy,
          cognitiveBias: progPsych.cognitiveBias,
          onSelectNode: () => handleSelectPsychologyNode(progPsych, 'B'),
          onAskSocrates: () => handleAskSocratesCategory('Psychological Need', progPsych.title, progPsych.mechanism),
          layoutMode
        }
      },
      {
        id: 'node-poleB-action',
        type: 'prismCategory',
        position: posPoleBAction,
        data: {
          categoryType: 'action',
          pole: 'B',
          id: progAction.id,
          title: progAction.title,
          actionDirective: progAction.actionDirective,
          protestsOrPolicy: progAction.protestsOrPolicy,
          linkedBillOrScheme: progAction.linkedBillOrScheme,
          onSelectNode: () => handleSelectActionNode(progAction, 'B'),
          onAskSocrates: () => handleAskSocratesCategory('Action / Protest', progAction.title, progAction.actionDirective),
          layoutMode
        }
      },

      // 7. Socratic Synthesis Node
      {
        id: 'node-synthesis',
        type: 'prismSynthesis',
        position: posSynthesis,
        data: {
          resolution: activeSpectrumData.syntheticResolution || 'Harmonize civilizational order with individual liberty.',
          tensionLevel: activeSpectrumData.tensionLevel || 75,
          tradTitle: trad.title,
          progTitle: prog.title,
          onAskSocrates: handleAskSocratesGoldenMean,
          onViewOnTree: handleIlluminateOnTree,
          layoutMode
        }
      }
    ];

    // --- EDGES ARRAY ---
    const edgesList: FlowEdge[] = [
      // Query -> Splitter
      {
        id: 'e-query-splitter',
        source: 'node-query',
        target: 'node-splitter',
        sourceHandle: 'query-out',
        targetHandle: 'splitter-in',
        animated: true,
        style: { stroke: '#f59e0b', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
      },

      // Splitter -> Pole A Header
      {
        id: 'e-splitter-poleA',
        source: 'node-splitter',
        target: 'node-header-poleA',
        sourceHandle: 'splitter-out-trad',
        targetHandle: 'header-in',
        animated: true,
        style: { stroke: '#fbbf24', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' }
      },

      // Splitter -> Pole B Header
      {
        id: 'e-splitter-poleB',
        source: 'node-splitter',
        target: 'node-header-poleB',
        sourceHandle: 'splitter-out-prog',
        targetHandle: 'header-in',
        animated: true,
        style: { stroke: '#38bdf8', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#38bdf8' }
      },

      // Pole A Cascading Sub-Tree: Header -> Morality -> Psychology -> Action
      {
        id: 'e-poleA-header-moral',
        source: 'node-header-poleA',
        target: 'node-poleA-moral',
        sourceHandle: 'header-out',
        targetHandle: 'cat-in',
        style: { stroke: '#f59e0b', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
      },
      {
        id: 'e-poleA-moral-psych',
        source: 'node-poleA-moral',
        target: 'node-poleA-psych',
        sourceHandle: 'cat-out',
        targetHandle: 'cat-in',
        style: { stroke: '#f59e0b', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
      },
      {
        id: 'e-poleA-psych-action',
        source: 'node-poleA-psych',
        target: 'node-poleA-action',
        sourceHandle: 'cat-out',
        targetHandle: 'cat-in',
        style: { stroke: '#f59e0b', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
      },

      // Pole B Cascading Sub-Tree: Header -> Morality -> Psychology -> Action
      {
        id: 'e-poleB-header-moral',
        source: 'node-header-poleB',
        target: 'node-poleB-moral',
        sourceHandle: 'header-out',
        targetHandle: 'cat-in',
        style: { stroke: '#06b6d4', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
      },
      {
        id: 'e-poleB-moral-psych',
        source: 'node-poleB-moral',
        target: 'node-poleB-psych',
        sourceHandle: 'cat-out',
        targetHandle: 'cat-in',
        style: { stroke: '#06b6d4', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
      },
      {
        id: 'e-poleB-psych-action',
        source: 'node-poleB-psych',
        target: 'node-poleB-action',
        sourceHandle: 'cat-out',
        targetHandle: 'cat-in',
        style: { stroke: '#06b6d4', strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
      },

      // Sub-Trees (Action Directives) -> Socratic Golden Mean Synthesis Node
      {
        id: 'e-poleA-action-synth',
        source: 'node-poleA-action',
        target: 'node-synthesis',
        sourceHandle: 'cat-out',
        targetHandle: 'synth-in-poleA',
        style: { stroke: '#f59e0b', strokeWidth: 2.5, strokeDasharray: '5 5' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' }
      },
      {
        id: 'e-poleB-action-synth',
        source: 'node-poleB-action',
        target: 'node-synthesis',
        sourceHandle: 'cat-out',
        targetHandle: 'synth-in-poleB',
        style: { stroke: '#06b6d4', strokeWidth: 2.5, strokeDasharray: '5 5' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' }
      }
    ];

    return { flowNodes: nodesList, flowEdges: edgesList };
  }, [
    topicQuery,
    searchInput,
    isLoadingSpectrum,
    isLiveConnected,
    activeSpectrumData,
    layoutMode,
    handleSelectMoralityNode,
    handleSelectPsychologyNode,
    handleSelectActionNode,
    handleAskSocratesStance,
    handleAskSocratesCategory,
    handleAskSocratesGoldenMean,
    handleIlluminateOnTree
  ]);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  // Sync state whenever underlying calculation changes
  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  // Automatically fit view when layout mode changes
  useEffect(() => {
    if (flowInstance) {
      const timer = setTimeout(() => {
        flowInstance.fitView({ padding: 0.18, duration: 400 });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [layoutMode, flowInstance]);

  return (
    <div className="w-full h-screen relative bg-stone-950 text-stone-100 overflow-hidden select-none pt-14">
      {/* Top Floating Control Bar Overlay */}
      <div className="absolute top-16 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 border border-amber-900/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-lg shadow-inner">
            💎
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white font-serif tracking-wide">
                Refractive Optical Prism Graph Canvas
              </h1>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                  isLoadingSpectrum
                    ? 'bg-amber-950 border-amber-500 text-amber-300'
                    : isLiveConnected
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-amber-950/80 border-amber-600/50 text-amber-300'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLoadingSpectrum
                      ? 'bg-amber-400 animate-ping'
                      : isLiveConnected
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-amber-400'
                  }`}
                />
                {isLoadingSpectrum
                  ? 'Splitting Ray...'
                  : isLiveConnected
                  ? 'Live Gemini Edge Refraction'
                  : 'Multi-View Refraction Engine'}
                {isLoadingSpectrum && <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-400" />}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Dialectical Stepped Cascade: 🇮🇳 Proponents & Order Track (Amber) ↗ vs 🌐 Opponents & Pluralist Rights Track (Cyan) ↘
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleIlluminateOnTree}
            className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/60 hover:border-amber-400 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow active:scale-95"
            title="Visualize both poles on full 34-node axiomatic tree"
          >
            <span>🌳 View in Tree Paradigm</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main ReactFlow Interactive Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={PRISM_NODE_TYPES}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={(instance) => setFlowInstance(instance)}
        nodesDraggable={true}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        minZoom={0.2}
        maxZoom={1.6}
        defaultEdgeOptions={{ type: 'smoothstep' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={26}
          size={1.6}
          color={isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(180, 83, 9, 0.15)'}
        />

        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'prismQuery') return '#f59e0b';
            if (node.type === 'prismSplitter') return '#ffffff';
            if (node.type === 'prismStanceHeader') {
              return (node.data as any).pole === 'A' ? '#f59e0b' : '#06b6d4';
            }
            if (node.type === 'prismCategory') {
              const cat = (node.data as any).categoryType;
              if (cat === 'morality') return '#10b981';
              if (cat === 'psychology') return '#a855f7';
              return '#f59e0b';
            }
            if (node.type === 'prismSynthesis') return '#c084fc';
            return '#78716c';
          }}
          className="!bg-stone-900/95 !border-amber-900/40 !rounded-xl !shadow-2xl !hidden md:!block !bottom-24 !right-6"
        />

        <Controls
          className="!bg-stone-900/95 !border-amber-900/40 !text-stone-100 !rounded-xl !shadow-xl !mb-12 !mr-0"
        />
      </ReactFlow>

      {/* Bottom-Right Unified Controls Dock */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-stone-900/95 border border-amber-500/40 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            const nextMode = layoutMode === 'horizontal' ? 'vertical' : 'horizontal';
            setLayoutMode(nextMode);
          }}
          className="px-3.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-100 hover:text-amber-300 text-xs font-extrabold flex items-center gap-2 transition-all shadow active:scale-95"
          title="Toggle between Horizontal Stepped Cascade and Vertical Tree Layout"
        >
          {layoutMode === 'horizontal' ? (
            <>
              <span>↔️</span>
              <span>Horizontal Step Tree</span>
            </>
          ) : (
            <>
              <span>↕️</span>
              <span>Vertical Tree</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            flowInstance?.fitView({ padding: 0.18, duration: 500 });
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-950/90 hover:bg-amber-900 border border-amber-600/80 hover:border-amber-400 text-amber-200 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow active:scale-95"
          title="Fit and Center Graph View"
        >
          <span>🔄 Fit View</span>
        </button>
      </div>
    </div>
  );
};

export const PrismView: React.FC = () => {
  return (
    <ReactFlowProvider>
      <PrismViewContent />
    </ReactFlowProvider>
  );
};

export default PrismView;
