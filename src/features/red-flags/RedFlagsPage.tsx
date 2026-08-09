import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { ShieldAlert, Check } from 'lucide-react';

interface DatingHabit {
  id: string;
  type: 'red' | 'green';
  text: string;
  points: number;
}

const DATING_HABITS: DatingHabit[] = [
  { id: '1', type: 'green', text: '🟢 Shares their dessert without hesitation', points: -15 },
  { id: '2', type: 'red', text: '🚩 Orders "whatever you want" and then eats yours', points: 30 },
  { id: '3', type: 'green', text: '🟢 Takes high spice like an absolute champion', points: -20 },
  { id: '4', type: 'red', text: '🚩 Asks the waiter for less spice in Butter Chicken', points: 25 },
  { id: '5', type: 'green', text: '🟢 Knows the best street food momo stall in the city', points: -25 },
  { id: '6', type: 'red', text: '🚩 Eats pizza with a fork and knife', points: 35 }
];

export const RedFlagsPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const toggleHabit = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toxicScore = selectedIds.reduce((acc, id) => {
    const habit = DATING_HABITS.find(h => h.id === id);
    return acc + (habit ? habit.points : 0);
  }, 50);

  const handleGenerateCard = () => {
    const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

    const selectedHabits = DATING_HABITS.filter(h => selectedIds.includes(h.id));
    const greenCount = selectedHabits.filter(h => h.type === 'green').length;
    const redCount = selectedHabits.filter(h => h.type === 'red').length;

    const traits = [
      `🚩 DATING REPORT CARD (TOXIC SCORE: ${Math.max(0, Math.min(100, toxicScore))}%)`,
      `🟢 Green Flags: ${greenCount} Green Flags Approved`,
      `🚩 Red Flags: ${redCount} Red Flags Triggered`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🚩 Red Flags / Green Flags" />

      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: toxicScore > 60 ? 'rgba(255, 68, 68, 0.15)' : 'rgba(0, 255, 136, 0.15)',
          color: toxicScore > 60 ? '#FF4444' : '#00FF88',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          <ShieldAlert size={14} />
          <span>TOXIC RATING: {Math.max(0, Math.min(100, toxicScore))}%</span>
        </div>

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '6px' }}>
          Select your dining habits
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '20px' }}>
          Check all habits that apply to your food dating behavior.
        </p>
      </div>

      {/* Habits Selection Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {DATING_HABITS.map(habit => {
          const isSelected = selectedIds.includes(habit.id);
          const isRed = habit.type === 'red';

          return (
            <motion.div
              key={habit.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleHabit(habit.id)}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isSelected
                  ? (isRed ? 'rgba(255, 68, 68, 0.2)' : 'rgba(0, 255, 136, 0.2)')
                  : 'var(--knomi-surface-card)',
                border: isSelected
                  ? (isRed ? '1px solid #FF4444' : '1px solid #00FF88')
                  : '1px solid var(--knomi-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', color: 'var(--knomi-text-primary)', fontWeight: 600 }}>
                {habit.text}
              </span>

              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: isSelected ? (isRed ? '#FF4444' : '#00FF88') : 'transparent',
                border: '2px solid ' + (isRed ? '#FF4444' : '#00FF88'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isSelected && <Check size={14} color="#150C0C" strokeWidth={3} />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateCard}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--knomi-whiskey-sour)',
          color: '#150C0C',
          fontWeight: 700,
          fontSize: '15px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        GENERATE DATING REPORT CARD 🚩
      </button>
    </div>
  );
};
