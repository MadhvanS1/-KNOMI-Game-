import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Share2, RotateCcw, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import { useResultStore } from '../../stores/useResultStore';
import { useGameStore } from '../../stores/useGameStore';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { ShareModal } from '../share/ShareModal';
import { Button } from '../../components/common/Button';

export const SoloResultPage: React.FC = () => {
  const { personality, traits, predictionText } = useResultStore();
  const { resetGame, setStep } = useGameStore();
  const { resetSelections } = useSelectionStore();
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti on reveal
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!personality) return null;

  const handlePlayAgain = () => {
    resetSelections();
    setStep('browsing');
  };

  const handleHome = () => {
    resetSelections();
    resetGame();
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      padding: '24px 20px 40px 20px',
      background: `radial-gradient(ellipse at 50% 20%, ${personality.colors.secondary} 0%, #150C0C 75%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Header Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          border: `2px solid ${personality.colors.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          marginBottom: '16px',
          boxShadow: `0 0 30px ${personality.colors.glow}`
        }}
      >
        {personality.emoji}
      </motion.div>

      {/* Title & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: 'center', marginBottom: '24px' }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: personality.colors.primary }}>
          YOUR FOOD PERSONALITY
        </span>
        <h1 style={{
          fontSize: '28px',
          color: personality.colors.text,
          margin: '4px 0 8px 0',
          textTransform: 'uppercase'
        }}>
          {personality.name}
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--knomi-text-secondary)',
          maxWidth: '320px',
          margin: '0 auto',
          lineHeight: 1.4,
          fontStyle: 'italic'
        }}>
          "{personality.tagline}"
        </p>
      </motion.div>

      {/* Trait Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {traits.map((trait, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.15 }}
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--knomi-border-default)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <CheckCircle2 size={18} color={personality.colors.primary} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '13px', color: 'var(--knomi-text-primary)', lineHeight: 1.4 }}>
              {trait}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Prediction & Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(211, 152, 88, 0.1)',
          border: '1px border-strong',
          textAlign: 'center',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} color="var(--knomi-whiskey-sour)" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)', letterSpacing: '0.05em' }}>
            KNOMI PREDICTS YOUR NEXT ORDER
          </span>
        </div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--knomi-text-primary)' }}>
          {predictionText}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button fullWidth onClick={() => setShowShareModal(true)}>
          <Share2 size={18} /> Share My Result Card
        </Button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" style={{ flex: 1 }} onClick={handlePlayAgain}>
            <RotateCcw size={16} /> Play Again
          </Button>
          <Button variant="secondary" style={{ flex: 1 }} onClick={handleHome}>
            <Home size={16} /> Home
          </Button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          personality={personality}
          traits={traits}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
