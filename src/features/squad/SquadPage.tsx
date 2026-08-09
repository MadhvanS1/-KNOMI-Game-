import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Trophy, Share2, Check } from 'lucide-react';

interface SquadMember {
  name: string;
  basicRank: number;
  badge: string;
  favoriteDish: string;
}

export const SquadPage: React.FC = () => {
  const [roomCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [copied, setCopied] = useState(false);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const squadMembers: SquadMember[] = [
    { name: 'Madhvan', basicRank: 1, badge: '👑 Least Basic (Food Connoisseur)', favoriteDish: 'Truffle Mushroom Risotto' },
    { name: 'Rohan', basicRank: 2, badge: '⚡ High Spice Warrior', favoriteDish: 'Spicy Dragon Roll' },
    { name: 'Aanya', basicRank: 3, badge: '🧸 Comfort Seeker', favoriteDish: 'Butter Chicken & Naan' },
    { name: 'Priya', basicRank: 4, badge: '💀 Most Basic (Plain Fries Orderer)', favoriteDish: 'Classic Salted Fries' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`https://knomi.in/squad/${roomCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGenerateSquadReport = () => {
    const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

    const traits = [
      `👥 SQUAD ROOM #${roomCode} COMPLETED`,
      `👑 Least Basic Member: Madhvan (Truffle Connoisseur)`,
      `💀 Most Basic Member: Priya (Plain Fries Enthusiast)`,
      `🔥 Collective Squad Archetype: "The High-Spite Foodie Circle"`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="👥 Roast Squad" />

      {/* Room Code Card */}
      <div style={{
        marginTop: '16px',
        padding: '20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--knomi-surface-card)',
        border: '1px solid var(--knomi-border-strong)',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-text-muted)', letterSpacing: '0.08em' }}>
          SQUAD LOBBY CODE
        </span>
        <h2 style={{ fontSize: '32px', color: 'var(--knomi-whiskey-sour)', margin: '4px 0 12px 0', letterSpacing: '0.1em' }}>
          #{roomCode}
        </h2>

        <button
          onClick={handleCopyCode}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: copied ? '#00FF88' : 'rgba(211, 152, 88, 0.15)',
            color: copied ? '#150C0C' : 'var(--knomi-whiskey-sour)',
            fontWeight: 700,
            fontSize: '13px',
            border: '1px solid var(--knomi-border-strong)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          <span>{copied ? 'INVITE LINK COPIED!' : 'SHARE SQUAD LOBBY LINK'}</span>
        </button>
      </div>

      {/* Squad Leaderboard */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={18} color="var(--knomi-whiskey-sour)" />
          <span>Squad Taste Rankings (Least to Most Basic)</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {squadMembers.map((member) => (
            <motion.div
              key={member.name}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--knomi-surface-card)',
                border: '1px solid var(--knomi-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <strong style={{ fontSize: '15px', color: '#FFFFFF' }}>#{member.basicRank} {member.name}</strong>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--knomi-whiskey-sour)', fontWeight: 600 }}>
                  {member.badge}
                </span>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--knomi-text-muted)', fontStyle: 'italic' }}>
                {member.favoriteDish}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateSquadReport}
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
        GENERATE SQUAD ROAST REPORT 👥
      </button>
    </div>
  );
};
