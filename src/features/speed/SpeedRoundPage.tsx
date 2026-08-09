import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import type { Dish } from '../../types/dish';
import { HeartPulse } from 'lucide-react';

export const SpeedRoundPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [speedPicks, setSpeedPicks] = useState<Dish[]>([]);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();
  const { getSelectedDishes } = useSelectionStore();

  const dish = DISHES[currentIdx];

  // 30-Second Blitz Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleComplete(speedPicks);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, speedPicks]);

  const handlePick = (dishToPick: Dish, accept: boolean) => {
    let updated = speedPicks;
    if (accept) {
      updated = [...speedPicks, dishToPick];
      setSpeedPicks(updated);
    }

    if (currentIdx + 1 < DISHES.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleComplete(updated);
    }
  };

  const handleComplete = (finalPicks: Dish[]) => {
    const soloDishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(finalPicks.length > 0 ? finalPicks : soloDishes);

    const traits = [
      `Curated Person: Picked ${soloDishes.length > 0 ? soloDishes[0].name : 'Butter Chicken'} when relaxed.`,
      `Actual Gut Instinct: Grabbed ${finalPicks.length > 0 ? finalPicks[0].name : 'Loaded Nachos'} under 30s pressure.`,
      `Subconscious Reality: You pretend to be refined, but your gut wants pure comfort.`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '32px' }}>
      <Header showBack title="⚡ Speed Round: Gut Check" />

      {/* Timer Bar */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: timeLeft < 10 ? 'rgba(220, 38, 38, 0.2)' : 'var(--knomi-surface-card)',
        borderBottom: '1px solid var(--knomi-border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartPulse size={22} color={timeLeft < 10 ? '#DC2626' : 'var(--knomi-whiskey-sour)'} />
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--knomi-text-primary)' }}>
            INSTINCT TIMER
          </span>
        </div>

        <div style={{
          fontSize: '22px',
          fontFamily: 'var(--font-family-display)',
          fontWeight: 700,
          color: timeLeft < 10 ? '#DC2626' : 'var(--knomi-whiskey-sour)'
        }}>
          {timeLeft}s
        </div>
      </div>

      {/* Subheader */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          Who you pretend to be vs. Who you ACTUALLY are
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)' }}>
          30 seconds on the clock. Accept or pass instantly.
        </p>
      </div>

      {/* Speed Card */}
      <div style={{ padding: '0 20px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '100%',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--knomi-surface-card)',
              border: '1px solid var(--knomi-border-strong)',
              boxShadow: 'var(--shadow-card)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <img
              src={dish.imageUrl}
              alt={dish.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '16px'
              }}
            />

            <h3 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '6px' }}>
              {dish.name}
            </h3>
            <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)', marginBottom: '20px' }}>
              ₹{dish.price}
            </span>

            {/* Accept / Pass Buttons */}
            <div style={{ width: '100%', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handlePick(dish, false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'var(--knomi-text-secondary)',
                  fontWeight: 700,
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                PASS ❌
              </button>

              <button
                onClick={() => handlePick(dish, true)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--knomi-whiskey-sour)',
                  color: '#150C0C',
                  fontWeight: 700,
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                CRAVE IT! ⚡
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
