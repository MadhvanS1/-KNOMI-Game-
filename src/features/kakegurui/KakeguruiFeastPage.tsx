import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Coins } from 'lucide-react';

export const KakeguruiFeastPage: React.FC = () => {
  const [frpChips, setFrpChips] = useState(500);
  const [wager, setWager] = useState(100);
  const [predictedDimension, setPredictedDimension] = useState<'spice' | 'comfort' | 'adventure'>('spice');

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handlePlaceBet = () => {
    const isWin = Math.random() > 0.4;
    const newTotal = isWin ? frpChips + wager : frpChips - wager;
    setFrpChips(newTotal);

    setTimeout(() => {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

      const traits = [
        `🎰 KAKEGURUI FEAST BETTING DUEL (${isWin ? 'WON + ' + wager + ' FRP CHIPS! 💰' : 'LOST - ' + wager + ' FRP CHIPS 💀'})`,
        `🎲 Wager Dimension: Predicted Opponent ${predictedDimension.toUpperCase()} score`,
        `💰 Total FRP Balance: ${newTotal} Food Reputation Points`
      ];

      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }, 800);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🎰 Kakegurui Feast" />

      {/* FRP Chips HUD */}
      <div style={{
        marginTop: '16px',
        padding: '20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: '#1E1210',
        border: '1px solid #FF3366',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-text-muted)', letterSpacing: '0.08em' }}>
          FOOD REPUTATION POINTS (FRP BALANCE)
        </span>
        <h2 style={{ fontSize: '36px', color: '#FF3366', margin: '4px 0 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Coins size={28} color="#FF3366" />
          <span>{frpChips} FRP</span>
        </h2>
      </div>

      {/* Wager Selection */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px' }}>
          1. Select Chip Wager:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[50, 100, 250].map((amount) => (
            <button
              key={amount}
              onClick={() => setWager(amount)}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: wager === amount ? '#FF3366' : 'var(--knomi-surface-card)',
                color: wager === amount ? '#FFFFFF' : 'var(--knomi-text-primary)',
                fontWeight: 700,
                fontSize: '14px',
                border: '1px solid var(--knomi-border-strong)',
                cursor: 'pointer'
              }}
            >
              {amount} FRP
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Bet */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px' }}>
          2. Bet on Opponent Flavor Profile:
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'spice', label: '🌶️ High Spice Sovereign (> 80%)' },
            { id: 'comfort', label: '🧸 Comfort Loyalist (> 85%)' },
            { id: 'adventure', label: '🚀 Chaos Adventurer (> 75%)' }
          ].map((dim) => (
            <button
              key={dim.id}
              onClick={() => setPredictedDimension(dim.id as any)}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: predictedDimension === dim.id ? 'rgba(255, 51, 102, 0.2)' : 'var(--knomi-surface-card)',
                border: predictedDimension === dim.id ? '2px solid #FF3366' : '1px solid var(--knomi-border-strong)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#FF3366',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(255, 51, 102, 0.4)'
        }}
      >
        WAGER {wager} FRP CHIPS NOW 🎰
      </button>
    </div>
  );
};
