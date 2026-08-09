import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';

export const TraitorPage: React.FC = () => {
  const [suspect, setSuspect] = useState<string>('Player 3');

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handleExposeTraitor = () => {
    const dishes = DISHES.slice(0, 5);
    scoreAndExpose(dishes);
  };

  const scoreAndExpose = (dishes: typeof DISHES) => {
    const scoreResult = calculateSoloScore(dishes);

    const traits = [
      `🕵️ SABOTEUR EXPOSED: ${suspect} was secret Traitor!`,
      `🌶️ Sabotage Tactic: Subtly injected 3 High-Spice dishes into Group Order`,
      `🏆 Group Verdict: Traitor successfully identified before order submission.`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🕵️ The Traitor (Saboteur)" />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          AMONG US / TRAITORS MODE
        </div>

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '8px' }}>
          One person is secretly altering your squad's flavor profile.
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '28px' }}>
          4–8 players order together. The Saboteur gets secret points for shifting the group average towards extreme spice or extreme comfort.
        </p>

        <div style={{
          backgroundColor: 'var(--knomi-surface-card)',
          padding: '20px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--knomi-border-strong)',
          marginBottom: '28px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--knomi-text-muted)', display: 'block', marginBottom: '12px' }}>
            VOTE WHO YOU SUSPECT IS THE SABOTEUR
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Player 1 (Alex)', 'Player 2 (Rohan)', 'Player 3 (Neha)', 'Player 4 (Kabir)'].map(player => (
              <button
                key={player}
                onClick={() => setSuspect(player)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: suspect === player ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.05)',
                  border: suspect === player ? '2px solid #EF4444' : '1px solid var(--knomi-border-strong)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {player}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExposeTraitor}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          CAST SABOTEUR VOTE 🕵️
        </button>
      </div>
    </div>
  );
};
