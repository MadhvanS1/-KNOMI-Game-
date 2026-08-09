import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, ArrowRight, Heart, Skull, Zap, Flag, UserCheck, Theater, Coins, Handshake, Eye, UserX } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useResultStore } from '../../stores/useResultStore';
import type { GameMode } from '../../types/game';

export const LandingPage: React.FC = () => {
  const { setMode, setStep } = useGameStore();
  const { setRoastSeverity } = useSelectionStore();
  const { totalPlayCount } = useResultStore();

  const handleStartMode = (mode: GameMode, severity?: 'mild' | 'savage') => {
    setMode(mode);
    if (severity) setRoastSeverity(severity);

    if (
      mode === 'this-or-that' ||
      mode === 'speed' ||
      mode === 'russian-roulette' ||
      mode === 'kakegurui' ||
      mode === 'split-steal' ||
      mode === 'mind-reader' ||
      mode === 'traitor'
    ) {
      setStep('playing');
    } else {
      setStep('browsing');
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      padding: '32px 20px 60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginTop: '10px', marginBottom: '24px' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(211, 152, 88, 0.15)',
          border: '1px solid rgba(211, 152, 88, 0.3)',
          marginBottom: '14px'
        }}>
          <Sparkles size={14} color="var(--knomi-whiskey-sour)" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--knomi-whiskey-sour)', letterSpacing: '0.05em' }}>
            THE FOOD PERSONALITY ENGINE
          </span>
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '10px',
          color: 'var(--knomi-text-primary)'
        }}>
          KNOMI <span style={{ color: 'var(--knomi-whiskey-sour)' }}>KNOWS YOU</span>
        </h1>

        <p style={{
          fontSize: '14px',
          color: 'var(--knomi-text-secondary)',
          maxWidth: '320px',
          margin: '0 auto',
          lineHeight: 1.4
        }}>
          "We don’t predict your food. We predict <strong style={{ color: 'var(--knomi-text-primary)' }}>YOU</strong>."
        </p>
      </motion.div>

      {/* Game Mode Entry Cards (Phase 1, Phase 2, and Phase 3) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        
        {/* Mode 1: Solo */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('solo')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--knomi-surface-card)', border: '1px solid var(--knomi-border-strong)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🧠</span>
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)' }}>Read My Food Soul</h3>
                <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>Pick 5-7 dishes. Get decoded.</p>
              </div>
            </div>
            <ArrowRight size={18} color="var(--knomi-whiskey-sour)" />
          </div>
        </motion.div>

        {/* Phase 3 Modes */}
        {/* Mode 9: The Liar's Table */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('liar-table')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Theater size={22} color="#EF4444" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEF2F2' }}>🎭 The Liar's Table (Liar Game)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 242, 242, 0.7)' }}>One person is lying about their order.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#EF4444" />
          </div>
        </motion.div>

        {/* Mode 10: Food Russian Roulette */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('russian-roulette')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(220, 38, 38, 0.12)', border: '1px solid rgba(220, 38, 38, 0.3)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skull size={22} color="#DC2626" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEF2F2' }}>☠️ Russian Roulette (Squid Game)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 242, 242, 0.7)' }}>5 rounds, 5s timers, 1 poison trap.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#DC2626" />
          </div>
        </motion.div>

        {/* Mode 11: Kakegurui Feast */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('kakegurui')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(212, 160, 23, 0.12)', border: '1px solid rgba(212, 160, 23, 0.3)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Coins size={22} color="#D4A017" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEFCE8' }}>🎰 Kakegurui Feast (Betting Duel)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 252, 232, 0.7)' }}>Wager FRP chips on food predictions.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#D4A017" />
          </div>
        </motion.div>

        {/* Mode 12: Split or Steal */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('split-steal')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Handshake size={22} color="#EAB308" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEFCE8' }}>🐍 Split or Steal (Tomodachi)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 252, 232, 0.7)' }}>Share the meal or steal all rewards.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#EAB308" />
          </div>
        </motion.div>

        {/* Mode 13: Mind-Reader Duel */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('mind-reader')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(147, 51, 234, 0.08)', border: '1px solid rgba(147, 51, 234, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Eye size={22} color="#9333EA" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FAF5FF' }}>👁️ Mind Reader (Death Note)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(250, 245, 255, 0.7)' }}>Deduce orders strictly from telemetry.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#9333EA" />
          </div>
        </motion.div>

        {/* Mode 14: The Traitor */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('traitor')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserX size={22} color="#EF4444" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEF2F2' }}>🕵️ The Traitor (Saboteur)</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 242, 242, 0.7)' }}>1 player is sabotaging the group order.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#EF4444" />
          </div>
        </motion.div>

        {/* Phase 2 Modes */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('speed')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(211, 152, 88, 0.12)', border: '1px solid rgba(211, 152, 88, 0.3)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={22} color="var(--knomi-whiskey-sour)" />
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)' }}>⚡ Speed Round (Gut Check)</h3>
                <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>30s blitz. Who you pretend vs who you are.</p>
              </div>
            </div>
            <ArrowRight size={18} color="var(--knomi-whiskey-sour)" />
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('red-flags')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Flag size={22} color="#DC2626" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEF2F2' }}>🚩 Red Flags / Green Flags</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 242, 242, 0.7)' }}>Your food ordering dating report card.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#DC2626" />
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('squad')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserCheck size={22} color="#8B5CF6" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#F3ECFF' }}>👥 Roast Squad</h3>
                <p style={{ fontSize: '12px', color: 'rgba(243, 236, 255, 0.7)' }}>Rank who in your group has basic taste.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#8B5CF6" />
          </div>
        </motion.div>

        {/* Phase 1 Modes */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('challenge')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(0, 255, 136, 0.08)', border: '1px solid rgba(0, 255, 136, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Skull size={22} color="#00FF88" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#ECFDF5' }}>Break KNOMI</h3>
                <p style={{ fontSize: '12px', color: 'rgba(236, 253, 245, 0.7)' }}>Try to fool the algorithm. (3% win rate)</p>
              </div>
            </div>
            <ArrowRight size={18} color="#00FF88" />
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('couple')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Heart size={22} color="#EC4899" />
              <div>
                <h3 style={{ fontSize: '16px', color: '#FDF2F8' }}>Couple Compatibility</h3>
                <p style={{ fontSize: '12px', color: 'rgba(253, 242, 248, 0.7)' }}>Can your relationship survive a menu?</p>
              </div>
            </div>
            <ArrowRight size={18} color="#EC4899" />
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('this-or-that')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--knomi-surface-card)', border: '1px solid var(--knomi-border-strong)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⚔️</span>
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)' }}>This or That</h3>
                <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>15 rapid rounds. No time to lie.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#8B5CF6" />
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleStartMode('roast', 'savage')} style={{ width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-xl)', backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🔥</span>
              <div>
                <h3 style={{ fontSize: '16px', color: '#FEF2F2' }}>Get Roasted 🔥</h3>
                <p style={{ fontSize: '12px', color: 'rgba(254, 242, 242, 0.7)' }}>Your food order is a red flag.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#DC2626" />
          </div>
        </motion.div>

      </div>

      {/* Social Proof Counter & Footer */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: 'var(--knomi-text-muted)', marginBottom: '6px' }}>
          <Users size={14} color="var(--knomi-whiskey-sour)" />
          <span><strong style={{ color: 'var(--knomi-text-primary)' }}>{totalPlayCount.toLocaleString()}</strong> food souls analyzed</span>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--knomi-text-muted)' }}>
          By KNOMI • <a href="https://instagram.com/knomi.in" target="_blank" rel="noreferrer" style={{ color: 'var(--knomi-whiskey-sour)', textDecoration: 'none' }}>@knomi.in</a>
        </p>
      </div>
    </div>
  );
};
