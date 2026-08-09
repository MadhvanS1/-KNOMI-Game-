import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import type { Dish } from '../../types/dish';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { Timer, Heart, X } from 'lucide-react';

export const SpeedRoundPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cravedDishes, setCravedDishes] = useState<Dish[]>([]);
  const [passedDishes, setPassedDishes] = useState<Dish[]>([]);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const currentDish = DISHES[currentIdx] || DISHES[0];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCrave = () => {
    const updated = [...cravedDishes, currentDish];
    setCravedDishes(updated);
    nextDish(updated);
  };

  const handlePass = () => {
    const updated = [...passedDishes, currentDish];
    setPassedDishes(updated);
    nextDish(cravedDishes);
  };

  const nextDish = (picks: Dish[]) => {
    if (currentIdx + 1 < DISHES.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinish(picks);
    }
  };

  const handleFinish = (finalPicks = cravedDishes) => {
    const picks = finalPicks.length > 0 ? finalPicks : DISHES.slice(0, 5);
    const scoreResult = calculateSoloScore(picks);

    const traits = [
      `⚡ SPEED ROUND BLITZ COMPLETED (${30 - timeLeft}s)`,
      `🧠 Gut Instinct vs Curated Persona: 94% Raw Gut Instinct`,
      `🔥 Decision Rate: ${(finalPicks.length / (30 - timeLeft || 1)).toFixed(1)} decisions per second`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  const isLowTime = timeLeft <= 5;

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header showBack title="⚡ Speed Round" />

      {/* Timer HUD */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <motion.div
          animate={{ scale: isLowTime ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: isLowTime ? Infinity : 0, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isLowTime ? 'rgba(255, 68, 68, 0.2)' : 'rgba(211, 152, 88, 0.15)',
            border: isLowTime ? '1px solid #FF4444' : '1px solid var(--knomi-border-strong)',
            color: isLowTime ? '#FF4444' : 'var(--knomi-whiskey-sour)',
            fontSize: '16px',
            fontWeight: 800
          }}
        >
          <Timer size={18} />
          <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </motion.div>
      </div>

      {/* Dish Flash Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDish.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{
            marginTop: '20px',
            padding: '24px 20px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--knomi-surface-card)',
            border: '1px solid var(--knomi-border-strong)',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center'
          }}
        >
          <img
            src={currentDish.imageUrl}
            alt={currentDish.name}
            style={{
              maxHeight: '200px',
              maxWidth: '85%',
              objectFit: 'contain',
              marginBottom: '16px',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))'
            }}
          />

          <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
            {currentDish.name}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '12px' }}>
            {currentDish.description}
          </p>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)' }}>
            ₹{currentDish.price}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons: PASS vs CRAVE */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePass}
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 68, 68, 0.15)',
            border: '2px solid #FF4444',
            color: '#FF4444',
            fontWeight: 800,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <X size={20} strokeWidth={3} />
          <span>PASS</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCrave}
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--knomi-whiskey-sour)',
            border: 'none',
            color: '#150C0C',
            fontWeight: 800,
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <Heart size={20} fill="#150C0C" />
          <span>CRAVE</span>
        </motion.button>
      </div>
    </div>
  );
};
