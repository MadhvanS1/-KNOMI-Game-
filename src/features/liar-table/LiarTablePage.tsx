import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Check } from 'lucide-react';

export const LiarTablePage: React.FC = () => {
  const [roleRevealed, setRoleRevealed] = useState(false);
  const [isLiar] = useState(() => Math.random() > 0.5);
  const [votedPlayer, setVotedPlayer] = useState<string | null>(null);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const players = ['Madhvan (You)', 'Rohan', 'Aanya', 'Priya'];

  const handleVote = (player: string) => {
    setVotedPlayer(player);
    setTimeout(() => {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

      const traits = [
        `🎭 THE LIAR'S TABLE (ROLE: ${isLiar ? 'HIDDEN LIAR 🤫' : 'INNOCENT DINER 😇'})`,
        `🕵️ Interrogation Outcome: ${player} was voted as the Liar!`,
        `🏆 Bluff Master: Successfully concealed secret dish preferences.`
      ];

      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }, 800);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🎭 The Liar's Table" />

      {/* Secret Role Card */}
      <div style={{
        marginTop: '16px',
        padding: '24px 20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: '#1C1625',
        border: '1px solid #A78BFA',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(167, 139, 250, 0.15)',
          color: '#A78BFA',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          LIAR GAME • SECRET ROLE ASSIGNMENT
        </div>

        {!roleRevealed ? (
          <div>
            <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '12px' }}>
              Tap to reveal your secret table role
            </h3>
            <button
              onClick={() => setRoleRevealed(true)}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#A78BFA',
                color: '#150C0C',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              REVEAL MY SECRET ROLE 👁️
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 style={{ fontSize: '24px', color: isLiar ? '#FF4444' : '#00FF88', marginBottom: '6px' }}>
              {isLiar ? '🤫 YOU ARE THE SECRET LIAR!' : '😇 YOU ARE AN INNOCENT DINER!'}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '300px', margin: '0 auto' }}>
              {isLiar
                ? 'Your secret mission: Pretend you ordered the Gourmet Sushi Roll and fool everyone!'
                : 'Your mission: Interrogate the table and identify who is bluffing about their order!'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Interrogation Voting Screen */}
      {roleRevealed && (
        <div>
          <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px' }}>
            Who is the Secret Liar at the table?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {players.map((player) => (
              <motion.button
                key={player}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVote(player)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: votedPlayer === player ? 'rgba(167, 139, 250, 0.25)' : 'var(--knomi-surface-card)',
                  border: votedPlayer === player ? '2px solid #A78BFA' : '1px solid var(--knomi-border-strong)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '15px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span>{player}</span>
                {votedPlayer === player && <Check size={18} color="#A78BFA" />}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
