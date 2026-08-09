import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, ArrowRight } from 'lucide-react';
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

    if (mode === 'solo' || mode === 'roast') {
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
        style={{ textAlign: 'center', marginTop: '20px', marginBottom: '32px' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(211, 152, 88, 0.15)',
          border: '1px solid rgba(211, 152, 88, 0.3)',
          marginBottom: '16px'
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
          marginBottom: '12px',
          color: 'var(--knomi-text-primary)'
        }}>
          KNOMI <span style={{ color: 'var(--knomi-whiskey-sour)' }}>KNOWS YOU</span>
        </h1>

        <p style={{
          fontSize: '15px',
          color: 'var(--knomi-text-secondary)',
          maxWidth: '320px',
          margin: '0 auto',
          lineHeight: 1.5
        }}>
          "We don’t predict your food. We predict <strong style={{ color: 'var(--knomi-text-primary)' }}>YOU</strong>."
        </p>
      </motion.div>

      {/* Game Mode Entry Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {/* Mode 1: Solo */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('solo')}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--knomi-surface-card)',
            border: '1px solid var(--knomi-border-strong)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(211, 152, 88, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}>
                🧠
              </div>
              <div>
                <h3 style={{ fontSize: '17px', color: 'var(--knomi-text-primary)' }}>Read My Food Soul</h3>
                <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)' }}>Pick 5-7 dishes. Get decoded.</p>
              </div>
            </div>
            <ArrowRight size={20} color="var(--knomi-whiskey-sour)" />
          </div>
        </motion.div>

        {/* Mode 2: This or That */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('this-or-that')}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--knomi-surface-card)',
            border: '1px solid var(--knomi-border-strong)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}>
                ⚡
              </div>
              <div>
                <h3 style={{ fontSize: '17px', color: 'var(--knomi-text-primary)' }}>This or That</h3>
                <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)' }}>15 rapid rounds. No time to lie.</p>
              </div>
            </div>
            <ArrowRight size={20} color="#8B5CF6" />
          </div>
        </motion.div>

        {/* Mode 3: Roast */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStartMode('roast', 'savage')}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}>
                💀
              </div>
              <div>
                <h3 style={{ fontSize: '17px', color: '#FEF2F2' }}>Get Roasted 🔥</h3>
                <p style={{ fontSize: '13px', color: 'rgba(254, 242, 242, 0.7)' }}>Your food order is a red flag.</p>
              </div>
            </div>
            <ArrowRight size={20} color="#DC2626" />
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
          marginBottom: '8px'
        }}>
          <Users size={15} color="var(--knomi-whiskey-sour)" />
          <span><strong style={{ color: 'var(--knomi-text-primary)' }}>{totalPlayCount.toLocaleString()}</strong> food souls analyzed</span>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--knomi-text-muted)' }}>
          By KNOMI • <a href="https://instagram.com/knomi.in" target="_blank" rel="noreferrer" style={{ color: 'var(--knomi-whiskey-sour)', textDecoration: 'none' }}>@knomi.in</a>
        </p>
      </div>
    </div>
  );
};
