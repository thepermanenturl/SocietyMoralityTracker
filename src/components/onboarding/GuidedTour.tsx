import React, { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const GuidedTour: React.FC = () => {
  const driverRef = useRef<Driver | null>(null);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: '🚀 Start Exploring',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      onDestroyed: () => {
        localStorage.setItem('morality_tour_completed_v1', 'true');
      },
      steps: [
        {
          popover: {
            title: '🌿 Welcome to Society Morality Tracker',
            description: 'This interactive platform maps humanity\'s moral foundations as a dynamic tree. Every law, human right, and ethical dilemma traces back to foundational root principles. Let\'s take a 60-second guided tour!',
            align: 'center'
          }
        },
        {
          element: '#tour-primitives-bar',
          popover: {
            title: '🌱 3 Minimal Moral Primitives',
            description: 'All human rights and laws stem from 3 core roots: <b>Non-Harm</b> (minimizing suffering), <b>Agency</b> (respecting free consent), and <b>Equity</b> (fairness). Click any root to see what principles descend from it.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-main-canvas',
          popover: {
            title: '🗺️ Interactive Morality Canvas',
            description: 'This graph lays out moral axioms in connected layers: <b>Primitives (-1)</b> → <b>Foundational Axioms (0)</b> → <b>Derived Principles (1)</b> → <b>Action Policies (2)</b> → <b>Dilemmas (3)</b>. Click any node to inspect real-world laws and stories.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-paradigm-selector',
          popover: {
            title: '⚡ Multi-Lens Paradigms Selector',
            description: 'Switch perspectives anytime: <b>Morality Tree</b> (abstract ethics), <b>Action Tree</b> (direct imperatives like "Don\'t Hurt Needlessly"), <b>Psychology Tree</b> (cognitive biases), or <b>Refractive Prism</b> (opposing viewpoints).',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tour-search',
          popover: {
            title: '🔍 Global AI Natural Language Search',
            description: 'Type any question or real-world topic (e.g. <i>"Is surveillance ever justified?"</i> or <i>"free speech"</i>). The AI automatically highlights matching moral nodes and provides rationale.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-ai-agent',
          popover: {
            title: '🤖 Socrates AI Debate Partner',
            description: 'Open the Socrates AI Assistant to test claims, run Socratic debates, and analyze ethical trade-offs backed by 2,500 years of global philosophy.',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-news-feed',
          popover: {
            title: '📰 Real-World News & Trust Engine',
            description: 'Monitors breaking news feeds from 8 global outlets, computes Jaccard claim clustering, calculates Trust Meter ratings, and maps news stories to violated moral nodes.',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-electorate',
          popover: {
            title: '🏛️ Indian Electorate & Parliament Bills',
            description: 'Inspect 7 demographic cohorts (Farmers, Urban Tech, Laborers, MSME, Youth, Women, Adivasi) and evaluate how Parliamentary bills (DPDP Act, Telecom Act, FRA) affect demographic conscience.',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-condorcet',
          popover: {
            title: '⚖️ Condorcet Paradox Voting Detector',
            description: 'Detects democratic voting cycles where collective preferences form an intransitive loop ($A \\succ B \\succ C \\succ A$) with no single majority winner (Arrow\'s Impossibility Theorem).',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-theme-toggle',
          popover: {
            title: '🌙 Dark Mode & Parchment View',
            description: 'Toggle between sleek glassmorphism Dark Mode and high-contrast Parchment Light Mode according to your reading preference.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-chat-bubble',
          popover: {
            title: '💬 Floating AI Assistant Shortcut',
            description: 'This floating bubble is always available at the bottom-left corner so you can summon the AI Agent from anywhere on the canvas.',
            side: 'right',
            align: 'end'
          }
        },
        {
          element: '#tour-timeline',
          popover: {
            title: '⏳ 2,500-Year Historical Epoch Dock',
            description: 'Scrub through historical eras from Ashoka\'s Edicts (268 BCE) and the US Bill of Rights to the 2026 AI Ethics era. Inspect societal unrest indices and historical precedents.',
            side: 'top',
            align: 'center'
          }
        },
        {
          popover: {
            title: '🎉 You\'re All Set!',
            description: 'Start exploring by clicking any node on the tree, or click the ❓ button in the top navigation bar anytime to replay this tour.',
            align: 'center'
          }
        }
      ]
    });

    driverRef.current = driverObj;
    driverObj.drive();
  };

  useEffect(() => {
    // Listen for manual tour replay requests from Navbar
    const handleReplayEvent = () => {
      startTour();
    };

    window.addEventListener('start-morality-tour', handleReplayEvent);

    // Auto-start tour on first visit after a brief 800ms UI mount delay
    const isCompleted = localStorage.getItem('morality_tour_completed_v1');
    if (!isCompleted) {
      const timer = setTimeout(() => {
        startTour();
      }, 800);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('start-morality-tour', handleReplayEvent);
    };
  }, []);

  return null;
};
