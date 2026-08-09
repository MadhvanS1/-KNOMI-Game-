import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useResultStore } from '../../stores/useResultStore';
import { Flame, Share2, RefreshCw, Check } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { generateRoastPayload } from '../../engine/roastGenerator';

export const RoastResultPage: React.FC = () => {
  const { roastPayload, personality, resetResult } = useResultStore();
  const { resetGame } = useGameStore();

  const [severity, setSeverity] = useState<'mild' | 'savage'>('savage');
  const [copied, setCopied] = useState(false);

  const currentRoast = roastPayload || generateRoastPayload(
    personality || {
      id: 'comfort-loyalist',
      name: 'Comfort Loyalist',
      tagline: 'Safe orders only',
      emoji: '🧸',
      colors: { primary: '#D39858', secondary: '#F6EFE8', glow: 'rgba(211,152,88,0.3)', text: '#FFFFFF' },
      baseTraits: ['Fears spice', 'Same order every time'],
      predictionText: 'Will order Butter Chicken until 2040.',
      populationPercentile: 42
    },
    [],
    severity
  );

  const handleShare = () => {
    const text = `🔥 KNOMI ROASTED MY FOOD TASTE:\n"${currentRoast.headline}"\n\nFind out how basic your taste is at https://knomi.in/roast`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRetry = () => {
    resetResult();
    resetGame();
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header title="🔥 The Savage Roast" />

      {/* Hero Roast Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{
          marginTop: '16px',
          padding: '24px 20px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#1C1010',
          border: '2px solid #FF4444',
          boxShadow: '0 0 40px rgba(255, 68, 68, 0.25)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: '#FF4444'
        }} />

        {/* Severity Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setSeverity('mild')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: severity === 'mild' ? '#FF4444' : 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            MILD 🔥
          </button>

          <button
            onClick={() => setSeverity('savage')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: severity === 'savage' ? '#FF4444' : 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            SAVAGE 🔥🔥🔥
          </button>
        </div>

        <div style={{ fontSize: '44px', marginBottom: '12px' }}>
          💀
        </div>

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
          ROAST LEVEL: CRITICAL 💀
        </div>

        <h2 style={{ fontSize: '24px', color: '#FFFFFF', marginBottom: '8px' }}>
          {currentRoast.headline}
        </h2>

        <p style={{
          fontSize: '16px',
          color: '#FF8888',
          fontWeight: 600,
          lineHeight: 1.4,
          margin: '16px 0 24px 0',
          padding: '16px',
          backgroundColor: 'rgba(255, 68, 68, 0.08)',
          borderRadius: 'var(--radius-md)',
          borderLeft: '4px solid #FF4444'
        }}>
          "{currentRoast.punchlines[0] || 'Your order history reads like a cry for help.'}"
        </p>

        {/* Burn Callouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', textAlign: 'left' }}>
          {currentRoast.dishCallouts.map((burn: string, idx: number) => (
            <div key={idx} style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.85)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Flame size={14} color="#FF4444" style={{ flexShrink: 0 }} />
              <span>{burn}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleShare}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: copied ? '#00FF88' : '#FF4444',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            <span>{copied ? 'ROAST COPIED!' : 'SHARE THIS ROAST 🔥'}</span>
          </button>

          <button
            onClick={handleRetry}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              fontSize: '13px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={16} />
            <span>TRY ANOTHER MODE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
