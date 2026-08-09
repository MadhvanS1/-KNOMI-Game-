import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { THIS_OR_THAT_PAIRS } from '../../data/thisOrThatPairs';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { Dish } from '../../types/dish';

export const ThisOrThatPage: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [pickedDishes, setPickedDishes] = useState<Dish[]>([]);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();
  const { setThisOrThatChoice } = useSelectionStore();

  const pair = THIS_OR_THAT_PAIRS[currentRound];
  const progressPercent = Math.round(((currentRound + 1) / THIS_OR_THAT_PAIRS.length) * 100);

  const handlePick = (option: 'A' | 'B', dish: Dish) => {
    if (selectedChoice !== null) return; // Prevent double taps

    setSelectedChoice(option);
    setThisOrThatChoice(pair.id, option === 'A' ? 'optionA' : 'optionB');
    const updatedDishes = [...pickedDishes, dish];
    setPickedDishes(updatedDishes);

    setTimeout(() => {
      if (currentRound + 1 < THIS_OR_THAT_PAIRS.length) {
        setCurrentRound(prev => prev + 1);
        setSelectedChoice(null);
      } else {
        // Complete 15 rounds -> Calculate results
        const scoreResult = calculateSoloScore(updatedDishes);
        setResult(scoreResult.personality, scoreResult.averagedDimensions, scoreResult.traits, null);
        setStep('analyzing');
      }
    }, 350);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '32px' }}>
      <Header showBack title={`Round ${currentRound + 1}/15`} />

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--knomi-surface-card)' }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: '#8B5CF6',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Round Subheader */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B5CF6', letterSpacing: '0.05em' }}>
          {pair.category.toUpperCase()}
        </span>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginTop: '4px' }}>
          Which one speaks to your soul?
        </h2>
      </div>

      {/* Binary Cards Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRound}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          style={{
            padding: '0 20px',
            display: 'flex',
            gap: '12px',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          {/* Option A */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePick('A', pair.optionA)}
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: selectedChoice === 'A' ? 'var(--knomi-surface-selected)' : 'var(--knomi-surface-card)',
              border: selectedChoice === 'A' ? '2px solid #8B5CF6' : '1px solid var(--knomi-border-strong)',
              boxShadow: selectedChoice === 'A' ? '0 0 24px rgba(139, 92, 246, 0.4)' : 'var(--shadow-card)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: selectedChoice === 'B' ? 0.3 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <img
              src={pair.optionA.imageUrl}
              alt={pair.optionA.name}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '12px'
              }}
            />
            <h3 style={{ fontSize: '15px', textAlign: 'center', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
              {pair.optionA.name}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--knomi-whiskey-sour)', fontWeight: 600 }}>
              ₹{pair.optionA.price}
            </span>
          </motion.div>

          {/* Option B */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePick('B', pair.optionB)}
            style={{
              flex: 1,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: selectedChoice === 'B' ? 'var(--knomi-surface-selected)' : 'var(--knomi-surface-card)',
              border: selectedChoice === 'B' ? '2px solid #8B5CF6' : '1px solid var(--knomi-border-strong)',
              boxShadow: selectedChoice === 'B' ? '0 0 24px rgba(139, 92, 246, 0.4)' : 'var(--shadow-card)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: selectedChoice === 'A' ? 0.3 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <img
              src={pair.optionB.imageUrl}
              alt={pair.optionB.name}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '12px'
              }}
            />
            <h3 style={{ fontSize: '15px', textAlign: 'center', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
              {pair.optionB.name}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--knomi-whiskey-sour)', fontWeight: 600 }}>
              ₹{pair.optionB.price}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
