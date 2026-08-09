import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, ArrowRight, Heart, Skull } from 'lucide-react';
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

    if (mode === 'solo' || mode === 'roast' || mode === 'challenge' || mode === 'couple') {
      setStep('browsing');
    } else if (mode === 'this-or-that') {
      setStep('playing');
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      padding: '32px 20px',
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

      {/* All 5 Phase 1 Game Mode Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {/* Mode 1: Solo */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('solo')}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--knomi-surface-card)',
            border: '1px solid var(--knomi-border-strong)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
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

        {/* Mode 2: Challenge (Break KNOMI) */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('challenge')}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.25)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
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

        {/* Mode 3: Couple Mode */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('couple')}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(236, 72, 153, 0.08)',
            border: '1px solid rgba(236, 72, 153, 0.25)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
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

        {/* Mode 4: This or That */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('this-or-that')}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--knomi-surface-card)',
            border: '1px solid var(--knomi-border-strong)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>⚡</span>
              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)' }}>This or That</h3>
                <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>15 rapid rounds. No time to lie.</p>
              </div>
            </div>
            <ArrowRight size={18} color="#8B5CF6" />
          </div>
        </motion.div>

        {/* Mode 5: Roast */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('roast', 'savage')}
          style={{
            width: '100%',
            padding: '16px 18px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>💀</span>
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'var(--knomi-text-muted)',
          marginBottom: '6px'
        }}>
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
