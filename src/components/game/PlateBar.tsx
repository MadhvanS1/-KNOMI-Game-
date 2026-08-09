import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Sparkles, Utensils } from 'lucide-react';

interface PlateBarProps {
  selectedCount: number;
  minCount?: number;
  maxCount?: number;
  onDecode: () => void;
  ctaText?: string;
}

export const PlateBar: React.FC<PlateBarProps> = ({
  selectedCount,
  minCount = 5,
  maxCount = 7,
  onDecode,
  ctaText = 'Decode My Food Soul'
}) => {
  const isValid = selectedCount >= minCount;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        maxWidth: '440px',
        padding: '16px 20px',
        backgroundColor: 'rgba(21, 12, 12, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--knomi-border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Utensils size={20} color="var(--knomi-whiskey-sour)" />
        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--knomi-text-primary)' }}>
            {selectedCount}/{maxCount} Dishes
          </span>
          <p style={{ fontSize: '11px', color: 'var(--knomi-text-muted)' }}>
            {selectedCount < minCount ? `Select ${minCount - selectedCount} more` : 'Ready to decode!'}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        disabled={!isValid}
        onClick={onDecode}
        style={{ flex: 1, maxWidth: '220px' }}
      >
        <Sparkles size={16} />
        {ctaText}
      </Button>
    </motion.div>
  );
};
