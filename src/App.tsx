import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './stores/useGameStore';
import { LandingPage } from './features/landing/LandingPage';
import { SoloPage } from './features/solo/SoloPage';
import { ChallengePage } from './features/challenge/ChallengePage';
import { CouplePage } from './features/couple/CouplePage';
import { SpeedRoundPage } from './features/speed/SpeedRoundPage';
import { RedFlagsPage } from './features/red-flags/RedFlagsPage';
import { SquadPage } from './features/squad/SquadPage';
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

        {step === 'browsing' && activeMode === 'challenge' && (
          <motion.div key="challenge" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ChallengePage />
          </motion.div>
        )}

        {step === 'browsing' && activeMode === 'couple' && (
          <motion.div key="couple" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <CouplePage />
          </motion.div>
        )}

        {step === 'browsing' && activeMode === 'red-flags' && (
          <motion.div key="red-flags" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <RedFlagsPage />
          </motion.div>
        )}

        {step === 'browsing' && activeMode === 'squad' && (
          <motion.div key="squad" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SquadPage />
          </motion.div>
        )}

        {step === 'browsing' && (activeMode === 'solo' || activeMode === 'roast') && (
          <motion.div key="browsing" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SoloPage />
          </motion.div>
        )}

        {step === 'playing' && activeMode === 'this-or-that' && (
          <motion.div key="this-or-that" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ThisOrThatPage />
          </motion.div>
        )}

        {step === 'playing' && activeMode === 'speed' && (
          <motion.div key="speed" style={{ width: '100%' }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <SpeedRoundPage />
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
