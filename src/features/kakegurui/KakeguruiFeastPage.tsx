import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { DISHES } from '../../data/dishes';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { Coins } from 'lucide-react';

export const KakeguruiFeastPage: React.FC = () => {
  const [frpBet, setFrpBet] = useState(500);
  const [prediction, setPrediction] = useState<'comfort' | 'spice'>('spice');

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handlePlaceBet = () => {
    const dishes = DISHES.slice(0, 5);
    const scoreResult = calculateSoloScore(dishes);

    const traits = [
      `🎰 Kakegurui Duel Outcome: WON +${frpBet * 2} FRP (Food Reputation Points)`,
      `🔥 Predicted Dimension: ${prediction.toUpperCase()} overloaded`,
      `🏆 Gambling Rank: High-Roller Taste Master`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🎰 Kakegurui Feast" />

      <div style={{
        marginTop: '16px',
        padding: '16px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'rgba(212, 160, 23, 0.15)',
        border: '1px solid rgba(212, 160, 23, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Coins size={24} color="#D4A017" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#D4A017' }}>
            YOUR FRP CHIPS: 1,000
          </span>
        </div>

        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--knomi-text-secondary)' }}>
          1v1 BETTING DUEL
        </span>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '8px' }}>
          Wager your Food Reputation Points (FRP)
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '24px' }}>
          Predict your opponent's main ordering dimension.
        </p>

        <div style={{
          backgroundColor: 'var(--knomi-surface-card)',
          padding: '20px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--knomi-border-strong)',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--knomi-text-muted)', display: 'block', marginBottom: '8px' }}>
            SELECT WAGER AMOUNT
          </span>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {[100, 250, 500, 1000].map(amt => (
              <button
                key={amt}
                onClick={() => setFrpBet(amt)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: frpBet === amt ? '#D4A017' : 'rgba(255,255,255,0.08)',
                  color: frpBet === amt ? '#150C0C' : '#FFFFFF',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {amt} FRP
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setPrediction('comfort')}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: prediction === 'comfort' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255,255,255,0.05)',
              border: prediction === 'comfort' ? '2px solid #3B82F6' : '1px solid var(--knomi-border-strong)',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🍨 COMFORT LOYALIST
          </button>

          <button
            onClick={() => setPrediction('spice')}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: prediction === 'spice' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.05)',
              border: prediction === 'spice' ? '2px solid #EF4444' : '1px solid var(--knomi-border-strong)',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🔥 SPICE SOVEREIGN
          </button>
        </div>

        <button
          onClick={handlePlaceBet}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#D4A017',
            color: '#150C0C',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          WAGER {frpBet} FRP NOW 🎲
        </button>
      </div>
    </div>
  );
};
