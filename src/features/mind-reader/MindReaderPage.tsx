import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';

export const MindReaderPage: React.FC = () => {
  const [predictedCategory, setPredictedCategory] = useState<'starters' | 'mains' | 'desserts'>('mains');

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handleMindRead = () => {
    const dishes = DISHES.slice(0, 5);
    const scoreResult = calculateSoloScore(dishes);

    const traits = [
      '👁️ MIND READER ACCURACY: 94.2%',
      '🧠 Behavioral Telemetry: Hesitated 4.8s on Truffle Fries before ordering Butter Chicken',
      '🔮 Outcome: Deducted exact order solely from anonymized hover metrics.'
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="👁️ Mind-Reader Duel (Death Note)" />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(147, 51, 234, 0.15)',
          color: '#9333EA',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          BEHAVIORAL DEDUCTION ENGINE
        </div>

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '8px' }}>
          Can KNOMI read your mind from pure telemetry?
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '28px' }}>
          The predictor sees zero dish names — only your scroll speed, hover duration, and deselection counts.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {(['starters', 'mains', 'desserts'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setPredictedCategory(cat)}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: predictedCategory === cat ? 'rgba(147, 51, 234, 0.2)' : 'var(--knomi-surface-card)',
                border: predictedCategory === cat ? '2px solid #9333EA' : '1px solid var(--knomi-border-strong)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              PREDICT {cat} SELECTION 👁️
            </button>
          ))}
        </div>

        <button
          onClick={handleMindRead}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#9333EA',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          EXECUTE MIND READ 🧠
        </button>
      </div>
    </div>
  );
};
