import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Utensils } from 'lucide-react';
import { useSelectionStore } from '../../stores/useSelectionStore';

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
  ctaText = 'Decode My Soul ✨'
}) => {
  const isValid = selectedCount >= minCount && selectedCount <= maxCount;
  const { getSelectedDishes } = useSelectionStore();
  const selectedDishes = getSelectedDishes();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '440px',
      padding: '12px 16px 20px 16px',
      backgroundColor: 'rgba(21, 12, 12, 0.92)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--knomi-border-strong)',
      zIndex: 100,
      boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.7)'
    }}>
      {/* Selected Dish Thumbnails Bar */}
      <AnimatePresence>
        {selectedDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              marginBottom: '10px',
              paddingBottom: '4px'
            }}
          >
            <Utensils size={14} color="var(--knomi-whiskey-sour)" style={{ flexShrink: 0 }} />
            {selectedDishes.map((dish) => (
              <motion.div
                key={dish.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(211, 152, 88, 0.2)',
                  border: '1px solid rgba(211, 152, 88, 0.4)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#F6EFE8',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span>{dish.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        {/* Count Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--knomi-text-muted)', fontWeight: 600 }}>
            YOUR PLATE
          </span>
          <span style={{
            fontSize: '14px',
            fontWeight: 700,
            color: isValid ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-text-secondary)'
          }}>
            {selectedCount} / {minCount}-{maxCount} dishes
          </span>
        </div>

        {/* CTA Decode Button */}
        <motion.button
          whileTap={{ scale: isValid ? 0.95 : 1 }}
          onClick={isValid ? onDecode : undefined}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isValid ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-card)',
            color: isValid ? '#150C0C' : 'var(--knomi-text-muted)',
            fontWeight: 700,
            fontSize: '14px',
            border: isValid ? 'none' : '1px solid var(--knomi-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isValid ? 'pointer' : 'not-allowed',
            boxShadow: isValid ? 'var(--shadow-glow)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {isValid && <Sparkles size={16} />}
          <span>{ctaText}</span>
        </motion.button>
      </div>
    </div>
  );
};
