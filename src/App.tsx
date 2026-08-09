import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './stores/useGameStore';
import { LandingPage } from './features/landing/LandingPage';
import { SoloPage } from './features/solo/SoloPage';
import { SoloResultPage } from './features/solo/SoloResultPage';
import { ThisOrThatPage } from './features/this-or-that/ThisOrThatPage';
import { RoastResultPage } from './features/roast/RoastResultPage';
import { AnalysisOverlay } from './components/game/AnalysisOverlay';
import './styles/globals.css';

export const App: React.FC = () => {
  const { step, activeMode, setStep } = useGameStore();

  const handleAnalysisComplete = () => {
    setStep('revealed');
  };

  return (
    <div className="app-container">
      {/* 10-Second Analysis Suspense Overlay */}
      <AnimatePresence>
        {step === 'analyzing' && (
          <AnalysisOverlay onComplete={handleAnalysisComplete} />
        )}
      </AnimatePresence>

      {/* Main View Router */}
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div key="landing" style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage />
          </motion.div>
        )}

        {step === 'browsing' && (
          <motion.div key="browsing" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SoloPage />
          </motion.div>
        )}

        {step === 'playing' && activeMode === 'this-or-that' && (
          <motion.div key="this-or-that" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ThisOrThatPage />
          </motion.div>
        )}

        {step === 'revealed' && activeMode === 'roast' && (
          <motion.div key="roast-result" style={{ width: '100%' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <RoastResultPage />
          </motion.div>
        )}

        {step === 'revealed' && activeMode !== 'roast' && (
          <motion.div key="solo-result" style={{ width: '100%' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <SoloResultPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
