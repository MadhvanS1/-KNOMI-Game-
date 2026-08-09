import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import type { Dish } from '../../types/dish';

interface DishCardProps {
  dish: Dish;
  isSelected: boolean;
  onToggle: () => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, isSelected, onToggle }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: isSelected ? 'var(--knomi-surface-selected)' : 'var(--knomi-surface-card)',
        border: isSelected
          ? '2px solid var(--knomi-whiskey-sour)'
          : '1px solid var(--knomi-border-default)',
        boxShadow: isSelected ? 'var(--shadow-selected)' : 'var(--shadow-card)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      <img
        src={dish.imageUrl}
        alt={dish.name}
        loading="lazy"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-md)',
          objectFit: 'cover',
          flexShrink: 0
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--knomi-text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {dish.name}
          </h3>
          <span style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--knomi-whiskey-sour)',
            marginLeft: '8px'
          }}>
            ₹{dish.price}
          </span>
        </div>

        <p style={{
          fontSize: '12px',
          color: 'var(--knomi-text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4
        }}>
          {dish.description}
        </p>
      </div>

      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: isSelected ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-hover)',
        color: isSelected ? '#150C0C' : 'var(--knomi-text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s ease'
      }}>
        {isSelected ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
      </div>
    </motion.div>
  );
};
