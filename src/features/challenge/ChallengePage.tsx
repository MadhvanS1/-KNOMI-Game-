import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { DISHES } from '../../data/dishes';
import type { DishCategory } from '../../types/dish';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { PlateBar } from '../../components/game/PlateBar';
import { Skull, Eye, Check, Plus } from 'lucide-react';
import themeStyles from '../../styles/guest-theme.module.css';
import layerStyles from '../../styles/guest-layers.module.css';

const CATEGORIES: { id: DishCategory; label: string; icon: string }[] = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍲' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Drinks', icon: '🍹' }
];

export const ChallengePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction] = useState(1);
  const [suspicionScore] = useState(35);

  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);
  const currentDish = categoryDishes[currentIndex] || categoryDishes[0];

  const handleAttemptBreak = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);

    const brokeAlgorithm = suspicionScore < 60;

    const traits = brokeAlgorithm
      ? [
          '💀 HOLOGRAPHIC KNOMI BREAKER BADGE (Top 3%)',
          '🎭 Outsmarted Algorithm: You successfully fooled behavioral tracking!',
          '⚡ Telemetry Report: Hesitation patterns confused algorithm scoring.'
        ]
      : [
          '🫣 KNOMI CAUGHT YOU!',
          '👁️ Telemetry Callout: Hovered 4.2s on Butter Chicken before ordering Salad.',
          '😭 Honest Reality: You couldn’t even lie about food.'
        ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  const isSelected = selectedDishIds.includes(currentDish.id);

  const cardVariants = {
    enter: (dir: number): TargetAndTransition => ({
      y: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: (): TargetAndTransition => ({
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 350, damping: 30 }
    }),
    exit: (dir: number): TargetAndTransition => ({
      y: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    })
  };

  return (
    <div className={themeStyles.appContainer} style={{ touchAction: 'none', position: 'relative', overflow: 'hidden', height: '100vh', width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <div className={layerStyles.layerCanvas} style={{ backgroundColor: '#150C0C' }} />

      <div style={{
        position: 'relative',
        zIndex: 80,
        padding: '12px 16px',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        borderBottom: '1px solid rgba(0, 255, 136, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Skull size={18} color="#00FF88" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#ECFDF5' }}>
            BREAK KNOMI (3% WIN RATE)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Eye size={14} color="#00FF88" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#00FF88' }}>
            SUSPICION: {suspicionScore}%
          </span>
        </div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 80,
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '8px 16px',
        backgroundColor: 'rgba(21, 12, 12, 0.6)'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIndex(0);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: activeCategory === cat.id ? '#00FF88' : 'rgba(255,255,255,0.08)',
              color: activeCategory === cat.id ? '#150C0C' : '#FFFFFF',
              fontWeight: 700,
              fontSize: '12px',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentDish.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: '90px'
            }}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={currentDish.imageUrl}
                alt={currentDish.name}
                style={{
                  maxHeight: '220px',
                  maxWidth: '85%',
                  objectFit: 'contain',
                  filter: isSelected ? 'drop-shadow(0 0 24px #00FF88)' : 'drop-shadow(0 12px 24px rgba(0,0,0,0.7))'
                }}
              />
            </div>

            <div style={{
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 80px',
              gap: '12px',
              alignItems: 'end',
              backgroundColor: 'rgba(36, 22, 19, 0.7)',
              backdropFilter: 'blur(12px)',
              margin: '0 16px',
              borderRadius: 'var(--radius-xl)',
              border: isSelected ? '2px solid #00FF88' : '1px solid rgba(255, 255, 255, 0.12)'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#00FF88', textTransform: 'uppercase' }}>
                  ORDER OPPOSITE OF YOUR TASTE
                </span>
                <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '4px 0 4px 0' }}>
                  {currentDish.name}
                </h1>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  {currentDish.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#00FF88' }}>
                  ₹{currentDish.price}
                </span>
                <button
                  onClick={() => toggleDish(currentDish.id)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#00FF88' : 'transparent',
                    color: isSelected ? '#150C0C' : '#00FF88',
                    border: '2px solid #00FF88',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isSelected ? <Check size={22} strokeWidth={3} /> : <Plus size={22} />}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <PlateBar
        selectedCount={selectedDishIds.length}
        minCount={5}
        maxCount={7}
        onDecode={handleAttemptBreak}
        ctaText="Break KNOMI 💀"
      />
    </div>
  );
};
