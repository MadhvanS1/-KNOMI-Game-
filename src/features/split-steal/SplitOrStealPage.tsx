import React from 'react';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { Handshake, Zap } from 'lucide-react';

export const SplitOrStealPage: React.FC = () => {
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handleVote = (choice: 'share' | 'steal') => {
    const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

    const traits = choice === 'share'
      ? [
          '🤝 SOULMATES: Both players voted [SHARE]!',
          '🍕 Outcome: Free Gourmet Dessert unlocked for both accounts',
          '💚 Friendship Rating: 100% Loyal Foodie Partner'
        ]
      : [
          '🐍 THE SNAKE: You voted [STEAL] while your friend voted [SHARE]!',
          '🍕 Outcome: You stole all Food Reputation Points for yourself.',
          '🔥 Friendship Rating: Zero remorse.'
        ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🐍 Split or Steal (Tomodachi Game)" />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(234, 179, 8, 0.15)',
          color: '#EAB308',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          HIGH-STAKES FRIENDSHIP GAMBLE
        </div>

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '8px' }}>
          Will you SHARE the meal or STEAL the rewards?
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '32px' }}>
          Both players cast secret votes simultaneously. If both SHARE, both win. If one STEALS, they take all. If both STEAL, mutual destruction.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={() => handleVote('share')}
            style={{
              width: '100%',
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
              border: '2px solid #00FF88',
              color: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>🤝 VOTE SHARE</h3>
              <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.8 }}>Split rewards & build food trust.</p>
            </div>
            <Handshake size={28} color="#00FF88" />
          </button>

          <button
            onClick={() => handleVote('steal')}
            style={{
              width: '100%',
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: '2px solid #DC2626',
              color: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>🐍 VOTE STEAL</h3>
              <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.8 }}>Take 100% of rewards for yourself.</p>
            </div>
            <Zap size={28} color="#DC2626" />
          </button>
        </div>
      </div>
    </div>
  );
};
