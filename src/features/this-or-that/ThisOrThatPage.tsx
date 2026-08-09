import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { THIS_OR_THAT_PAIRS } from '../../data/thisOrThatPairs';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import type { Dish } from '../../types/dish';

export const ThisOrThatPage: React.FC = () => {
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [userSelections, setUserSelections] = useState<Dish[]>([]);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const pair = THIS_OR_THAT_PAIRS[currentPairIdx];

  const handleSelect = (dish: Dish, side: 'left' | 'right') => {
    if (selectedSide) return;

    setSelectedSide(side);
    const updated = [...userSelections, dish];
    setUserSelections(updated);

    setTimeout(() => {
      setSelectedSide(null);
      if (currentPairIdx + 1 < THIS_OR_THAT_PAIRS.length) {
        setCurrentPairIdx(prev => prev + 1);
      } else {
        handleFinish(updated);
      }
    }, 900);
  };

  const handleFinish = (finalPicks: Dish[]) => {
    const scoreResult = calculateSoloScore(finalPicks);

    const traits = [
      '⚔️ 15 RAPID DILEMMAS COMPLETED',
      '🔥 Community Alignment: 84.6% Choice Match with Urban Gen-Z Foodies',
      '⚡ Instinct Rating: Zero hesitation under pressure'
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header showBack title="⚔️ This or That" />

      {/* Progress Header */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          color: '#8B5CF6',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          ROUND {currentPairIdx + 1} OF {THIS_OR_THAT_PAIRS.length}
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)' }}>
          Which one do you crave more?
        </h2>
      </div>

      {/* Dilemma Split Screen */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pair.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}
        >
          {/* Dish A (Left) */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(pair.optionA, 'left')}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: selectedSide === 'left' ? 'rgba(139, 92, 246, 0.25)' : 'var(--knomi-surface-card)',
              border: selectedSide === 'left' ? '2px solid #8B5CF6' : '1px solid var(--knomi-border-strong)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={pair.optionA.imageUrl}
              alt={pair.optionA.name}
              style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
                {pair.optionA.name}
              </h3>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)' }}>
                ₹{pair.optionA.price}
              </span>

              {/* Animated Benchmark Stats Bar */}
              {selectedSide && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  style={{
                    height: '6px',
                    backgroundColor: '#8B5CF6',
                    borderRadius: '3px',
                    marginTop: '8px'
                  }}
                />
              )}
            </div>

            {selectedSide && (
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#8B5CF6' }}>
                68%
              </span>
            )}
          </motion.div>

          {/* VS Divider Badge */}
          <div style={{ textAlign: 'center' }}>
            <span style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#150C0C',
              border: '1px solid var(--knomi-border-strong)',
              fontSize: '12px',
              fontWeight: 800,
              color: 'var(--knomi-whiskey-sour)'
            }}>
              VS
            </span>
          </div>

          {/* Dish B (Right) */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(pair.optionB, 'right')}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: selectedSide === 'right' ? 'rgba(139, 92, 246, 0.25)' : 'var(--knomi-surface-card)',
              border: selectedSide === 'right' ? '2px solid #8B5CF6' : '1px solid var(--knomi-border-strong)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={pair.optionB.imageUrl}
              alt={pair.optionB.name}
              style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
                {pair.optionB.name}
              </h3>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)' }}>
                ₹{pair.optionB.price}
              </span>

              {/* Animated Benchmark Stats Bar */}
              {selectedSide && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '32%' }}
                  style={{
                    height: '6px',
                    backgroundColor: '#8B5CF6',
                    borderRadius: '3px',
                    marginTop: '8px'
                  }}
                />
              )}
            </div>

            {selectedSide && (
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#8B5CF6' }}>
                32%
              </span>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--knomi-text-muted)' }}>
        KNOMI Dilemma Engine • Pick instantly to decode your food instinct
      </div>
    </div>
  );
};
