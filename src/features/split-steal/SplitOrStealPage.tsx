import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Handshake, ShieldAlert } from 'lucide-react';

export const SplitOrStealPage: React.FC = () => {
  const [myVote, setMyVote] = useState<'share' | 'steal' | null>(null);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handleVote = (vote: 'share' | 'steal') => {
    setMyVote(vote);
    const opponentVote: 'share' | 'steal' = Math.random() > 0.5 ? 'share' : 'steal';

    setTimeout(() => {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

      let outcome = '';
      if (vote === 'share' && opponentVote === 'share') {
        outcome = '💖 SOULMATES MATCH! Both players chose SHARE (+100% Dish Bonus!)';
      } else if (vote === 'steal' && opponentVote === 'share') {
        outcome = '🐍 THEFT SUCCESS! You chose STEAL while opponent chose SHARE (+200% Dish Theft!)';
      } else if (vote === 'share' && opponentVote === 'steal') {
        outcome = '😭 BETRAYED! Opponent chose STEAL while you chose SHARE (0% Food Left!)';
      } else {
        outcome = '💀 MUTUAL DESTRUCTION! Both players chose STEAL (0% Food Left!)';
      }

      const traits = [
        `🐍 SPLIT OR STEAL (TOMODACHI GAME)`,
        `📜 Payoff Outcome: ${outcome}`,
        `⚡ Loyalty Metric: ${vote === 'share' ? 'High Food Loyalty' : 'Ruthless Food Thief'}`
      ];

      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }, 900);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header showBack title="🐍 Split or Steal" />

      {/* Header Info */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(0, 255, 136, 0.15)',
          color: '#00FF88',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          TOMODACHI GAME • SECRET PAYOFF MATRIX
        </div>

        <h2 style={{ fontSize: '24px', color: '#FFFFFF', marginBottom: '6px' }}>
          Will you Share or Steal the Dish?
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '320px', margin: '0 auto' }}>
          Both players secretly pick SHARE or STEAL. If both share, you split the grand feast! If one steals, they take all!
        </p>
      </div>

      {/* Secret Choice Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote('share')}
          style={{
            padding: '24px 16px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: myVote === 'share' ? 'rgba(0, 255, 136, 0.25)' : 'var(--knomi-surface-card)',
            border: myVote === 'share' ? '2px solid #00FF88' : '1px solid var(--knomi-border-strong)',
            color: '#FFFFFF',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <Handshake size={36} color="#00FF88" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '20px', color: '#00FF88', marginBottom: '4px' }}>SHARE 🤝</h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Split Food Equally</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote('steal')}
          style={{
            padding: '24px 16px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: myVote === 'steal' ? 'rgba(255, 68, 68, 0.25)' : 'var(--knomi-surface-card)',
            border: myVote === 'steal' ? '2px solid #FF4444' : '1px solid var(--knomi-border-strong)',
            color: '#FFFFFF',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <ShieldAlert size={36} color="#FF4444" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '20px', color: '#FF4444', marginBottom: '4px' }}>STEAL 🐍</h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Take Everything</span>
        </motion.button>
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--knomi-text-muted)' }}>
        Secret Ballot • Payoff matrix revealed instantly upon submission
      </div>
    </div>
  );
};
