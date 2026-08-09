import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Check } from 'lucide-react';

export const TraitorPage: React.FC = () => {
  const [roleRevealed, setRoleRevealed] = useState(false);
  const [isSaboteur] = useState(() => Math.random() > 0.5);
  const [votedPlayer, setVotedPlayer] = useState<string | null>(null);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const players = ['Madhvan (You)', 'Rohan', 'Aanya', 'Priya'];

  const handleVoteSaboteur = (player: string) => {
    setVotedPlayer(player);

    setTimeout(() => {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

      const traits = [
        `🕵️ THE TRAITOR (AMONG US FOOD DUEL)`,
        `🎭 Secret Role: ${isSaboteur ? 'SECRET FLAVOR SABOTEUR 🤫' : 'INNOCENT DINER 😇'}`,
        `🚨 Voting Outcome: ${player} was voted out as the Saboteur!`,
        `⚡ Group Flavor Impact: Saboteur altered squad spice average by +34%`
      ];

      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }, 900);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🕵️ The Traitor" />

      {/* Role Card */}
      <div style={{
        marginTop: '16px',
        padding: '24px 20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: '#1E1010',
        border: '1px solid #FF4444',
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(255, 68, 68, 0.15)',
          color: '#FF4444',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          AMONG US FOOD EDITION • SECRET SABOTEUR ROLE
        </div>

        {!roleRevealed ? (
          <div>
            <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '12px' }}>
              Tap to reveal your squad role
            </h3>
            <button
              onClick={() => setRoleRevealed(true)}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#FF4444',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              REVEAL MY SQUAD ROLE 🕵️
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 style={{ fontSize: '24px', color: isSaboteur ? '#FF4444' : '#00FF88', marginBottom: '6px' }}>
              {isSaboteur ? '🤫 YOU ARE THE SECRET SABOTEUR!' : '😇 YOU ARE AN INNOCENT DINER!'}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '300px', margin: '0 auto' }}>
              {isSaboteur
                ? 'Your secret mission: Subtly alter the group order by choosing super spicy dishes without getting caught!'
                : 'Your mission: Interrogate the table and identify who is sabotaging the group flavor average!'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Voting Section */}
      {roleRevealed && (
        <div>
          <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px' }}>
            Vote for who you believe is the Flavor Saboteur:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {players.map((player) => (
              <motion.button
                key={player}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVoteSaboteur(player)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: votedPlayer === player ? 'rgba(255, 68, 68, 0.25)' : 'var(--knomi-surface-card)',
                  border: votedPlayer === player ? '2px solid #FF4444' : '1px solid var(--knomi-border-strong)',
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
                {votedPlayer === player && <Check size={18} color="#FF4444" />}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
