import React, { useState, useEffect } from 'react';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { Skull } from 'lucide-react';

export const RussianRoulettePage: React.FC = () => {
  const [round, setRound] = useState(1);
  const [timer, setTimer] = useState(5);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const currentDish = DISHES[round - 1] || DISHES[0];

  useEffect(() => {
    if (timer <= 0) {
      handleChoice(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChoice = (safe: boolean) => {
    if (!safe) {
      finishRoulette(false);
      return;
    }

    if (round >= 5) {
      finishRoulette(true);
    } else {
      setRound(prev => prev + 1);
      setTimer(5);
    }
  };

  const finishRoulette = (didSurvive: boolean) => {
    const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

    const traits = didSurvive
      ? [
          '🏆 SURVIVOR GOLD CARD: You survived 5 rounds of Food Russian Roulette!',
          '💀 Poison Trap Avoided: Extra Spicy Ghost Chili Dip',
          '🔥 Instinct Rating: Top 1% Survivor Intuition'
        ]
      : [
          '☠️ ELIMINATED: You hit the Poison Trap in Round ' + round,
          '🌶️ Trap Dish: Ghost Pepper Wings with 2M Scoville Sauce',
          '💀 Game Over: Your tastebuds did not survive the gamble.'
        ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="☠️ Food Russian Roulette" />

      <div style={{
        marginTop: '16px',
        padding: '16px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'rgba(220, 38, 38, 0.15)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Skull size={24} color="#DC2626" />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#FEF2F2' }}>
            ROUND {round} / 5
          </span>
        </div>

        <div style={{ fontSize: '24px', fontWeight: 700, color: '#DC2626' }}>
          {timer}s
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <img
          src={currentDish.imageUrl}
          alt={currentDish.name}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-card)'
          }}
        />

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '8px' }}>
          {currentDish.name}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '24px' }}>
          1 of these 5 dishes contains a hidden Poison Trap. Will you bite?
        </p>

        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={() => handleChoice(true)}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#00FF88',
              color: '#150C0C',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            SAFE EAT 🟢
          </button>

          <button
            onClick={() => handleChoice(false)}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            POISON TRAP ☠️
          </button>
        </div>
      </div>
    </div>
  );
};
