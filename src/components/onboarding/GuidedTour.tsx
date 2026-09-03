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
          element: '#tour-main-canvas',
          popover: {
            title: '🗺️ 1. Explore 34 Moral Axioms & 3 Roots',
            description: 'All human rights and laws stem from 3 core primitives: <b>Non-Harm</b> (Ahimsa), <b>Agency</b> (Swatantrata), and <b>Equity</b> (Nyaya). Switch between <b>Morality</b>, <b>Action</b>, and <b>Psychology</b> lenses anytime.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-ai-agent',
          popover: {
            title: '🤖 2. Socrates AI Reasoner',
            description: 'Ask Socrates to evaluate any moral claim, governance policy, or personal dilemma. Responses are grounded in foundational axioms and Panchatantra parables.',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-electorate',
          popover: {
            title: '📜 3. Civic Feed & Legislative Vetting',
            description: 'Interrogate 26 Parliamentary Bills (2023–2026), civic welfare schemes, and live news stories with 1-click Socratic debate triggers.',
            side: 'bottom',
            align: 'end'
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
