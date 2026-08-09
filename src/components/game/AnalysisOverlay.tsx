import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnalysisOverlayProps {
  onComplete: () => void;
}

const MESSAGES = [
  'Analyzing your food selections...',
  'Cross-referencing with 47,382 food personalities...',
  'Evaluating spice vectors and comfort thresholds...',
  'Detecting flavor contradictions...',
  'Your food DNA has been decoded.'
];

export const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    // 10 second animation timer
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 20) setMsgIndex(0);
    else if (progress < 45) setMsgIndex(1);
    else if (progress < 70) setMsgIndex(2);
    else if (progress < 90) setMsgIndex(3);
    else setMsgIndex(4);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#150C0C',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        textAlign: 'center'
      }}
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: 'rgba(211, 152, 88, 0.1)',
          border: '2px solid var(--knomi-whiskey-sour)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 0 40px rgba(211, 152, 88, 0.25)'
        }}
      >
        <Sparkles size={40} color="var(--knomi-whiskey-sour)" />
      </motion.div>

      <h2 style={{
        fontFamily: 'var(--font-family-display)',
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--knomi-text-primary)',
        marginBottom: '24px'
      }}>
        Decoding Your Soul...
      </h2>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        maxWidth: '280px',
        height: '8px',
        backgroundColor: 'var(--knomi-surface-card)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '24px',
        border: '1px solid var(--knomi-border-default)'
      }}>
        <motion.div
          style={{
            height: '100%',
            backgroundColor: 'var(--knomi-whiskey-sour)',
            width: `${progress}%`,
            borderRadius: '4px',
            boxShadow: '0 0 12px var(--knomi-whiskey-sour)'
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '14px',
            color: 'var(--knomi-text-secondary)',
            minHeight: '44px',
            maxWidth: '300px'
          }}
        >
          "{MESSAGES[msgIndex]}"
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};
