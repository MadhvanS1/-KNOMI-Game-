import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import type { Dish } from '../../types/dish';

interface PremiumV3MenuCardProps {
  dish: Dish;
  isSelected: boolean;
  onToggle: () => void;
}

export const PremiumV3MenuCard: React.FC<PremiumV3MenuCardProps> = ({
  dish,
  isSelected,
  onToggle
}) => {
  return (
    <div
      className="view-canvas-card"
      style={{
        width: '100%',
        minHeight: '440px',
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: '#150C0C',
        overflow: 'hidden',
        border: isSelected ? '2px solid var(--knomi-whiskey-sour)' : '1px solid var(--knomi-border-strong)',
        boxShadow: isSelected ? 'var(--shadow-selected)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* LAYER 1: Canvas Base */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: '#150C0C',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #241613 0%, #150C0C 70%)'
        }}
      />

      {/* LAYER 2: Atmosphere (Container-Sky & Container-Ground) */}
      <div
        className="container-sky"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '45%',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(212, 152, 88, 0.08) 0%, transparent 100%)'
        }}
      />
      <div
        className="container-ground"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%)'
        }}
      />

      {/* LAYER 3: Zone-Top (Container-Food) */}
      <div
        className="zone-top"
        style={{
          position: 'relative',
          zIndex: 3,
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0'
        }}
      >
        <div
          className="container-food"
          style={{
            width: '80%',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.img
            src={dish.imageUrl}
            alt={dish.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
              filter: isSelected ? 'drop-shadow(0 0 16px var(--knomi-whiskey-sour))' : 'none'
            }}
          />
        </div>
      </div>

      {/* LAYER 3: Zone-Bottom (Container-Details Grid: Col-Left & Col-Right) */}
      <div
        className="container-details"
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 80px',
          gap: '16px',
          alignItems: 'end',
          background: 'transparent'
        }}
      >
        {/* Col-Left: Title + Description */}
        <div className="col-left">
          <div style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--knomi-whiskey-sour)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            {dish.category}
          </div>
          <h3 className="dish-name" style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--knomi-text-primary)',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            {dish.name}
          </h3>
          <p className="dish-description" style={{
            fontSize: '13px',
            color: 'var(--knomi-text-secondary)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {dish.description}
          </p>
        </div>

        {/* Col-Right: Price + Add Button */}
        <div className="col-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <span className="dish-price" style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--knomi-whiskey-sour)'
          }}>
            ₹{dish.price}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isSelected ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-card)',
              color: isSelected ? '#150C0C' : 'var(--knomi-text-primary)',
              border: isSelected ? 'none' : '1px solid var(--knomi-border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer'
            }}
          >
            {isSelected ? <Check size={24} strokeWidth={3} /> : <Plus size={24} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
