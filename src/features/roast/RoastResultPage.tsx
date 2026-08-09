import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Home, Flame, AlertCircle } from 'lucide-react';
import { useResultStore } from '../../stores/useResultStore';
import { useGameStore } from '../../stores/useGameStore';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { ShareModal } from '../share/ShareModal';
import { Button } from '../../components/common/Button';

export const RoastResultPage: React.FC = () => {
  const { personality, roastPayload } = useResultStore();
  const { resetGame, setStep } = useGameStore();
  const { resetSelections } = useSelectionStore();
  const [showShareModal, setShowShareModal] = useState(false);

  if (!personality || !roastPayload) return null;

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
      background: 'radial-gradient(ellipse at 50% 20%, #7F1D1D 0%, #150C0C 80%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Flame Icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(220, 38, 38, 0.2)',
          border: '2px solid #DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.5)'
        }}
      >
        <Flame size={40} color="#DC2626" />
      </motion.div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#DC2626',
          color: '#FFFFFF',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          marginBottom: '8px'
        }}>
          {roastPayload.headline}
        </div>

        <h1 style={{
          fontSize: '28px',
          color: '#FEF2F2',
          margin: '4px 0 4px 0',
          textTransform: 'uppercase'
        }}>
          {personality.name}
        </h1>

        <p style={{ fontSize: '13px', color: 'rgba(254, 242, 242, 0.7)', fontStyle: 'italic' }}>
          "{personality.tagline}"
        </p>
      </div>

      {/* Punchline Cards */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {roastPayload.punchlines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.15 }}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '14px', color: '#FEF2F2', lineHeight: 1.4 }}>
              "{line}"
            </p>
          </motion.div>
        ))}

        {/* Dish Callout */}
        {roastPayload.dishCallouts.map((callout, idx) => (
          <motion.div
            key={`callout-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid #DC2626',
              textAlign: 'center'
            }}
          >
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#FEF2F2' }}>
              💀 {callout}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button variant="danger" fullWidth onClick={() => setShowShareModal(true)}>
          <Share2 size={18} /> Share Roast Card
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
          traits={roastPayload.punchlines}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};
