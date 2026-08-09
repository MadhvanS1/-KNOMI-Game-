import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { DISHES } from '../../data/dishes';
import type { DishCategory, Dish } from '../../types/dish';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { generateRoastPayload } from '../../engine/roastGenerator';
import { PlateBar } from './PlateBar';
import { Plus, Check, Sparkles } from 'lucide-react';
import themeStyles from '../../styles/guest-theme.module.css';
import layerStyles from '../../styles/guest-layers.module.css';

const CATEGORIES: { id: DishCategory; label: string; icon: string }[] = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍲' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Drinks', icon: '🍹' }
];

export const OfficialGuestMenuContainer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const wheelLock = useRef(false);

  const { selectedDishIds, toggleDish, getSelectedDishes, roastSeverity } = useSelectionStore();
  const { setStep, activeMode } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = useMemo(() => DISHES.filter(d => d.category === activeCategory), [activeCategory]);
  const currentDish: Dish = categoryDishes[currentIndex] || categoryDishes[0];

  const handleCategorySwitch = (cat: DishCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  const handleNextDish = () => {
    if (currentIndex < categoryDishes.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevDish = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    if (deltaY < -25) {
      handleNextDish();
    } else if (deltaY > 25) {
      handlePrevDish();
    }

    touchStartY.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLock.current) return;
    wheelLock.current = true;

    if (e.deltaY > 15) {
      handleNextDish();
    } else if (e.deltaY < -15) {
      handlePrevDish();
    }

    setTimeout(() => {
      wheelLock.current = false;
    }, 280);
  };

  const bind = useDrag(({ active, movement: [mx, my], swipe: [, swipeY] }) => {
    setIsDragging(active);
    setDragOffset({ x: mx, y: my });

    if (!active) {
      if (swipeY === -1 || my < -30) {
        handleNextDish();
      } else if (swipeY === 1 || my > 30) {
        handlePrevDish();
      }
      setDragOffset({ x: 0, y: 0 });
    }
  });

  const handleDecode = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);

    let roastPayload = null;
    if (activeMode === 'roast') {
      roastPayload = generateRoastPayload(scoreResult.personality, dishes, roastSeverity);
    }

    setResult(scoreResult.personality, scoreResult.averagedDimensions, scoreResult.traits, roastPayload);
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
      y: isDragging ? dragOffset.y : 0,
      x: isDragging ? dragOffset.x : 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
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
    <div
      {...bind()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className={themeStyles.appContainer}
      style={{
        touchAction: 'none',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* LAYER 1: Canvas Base */}
      <div
        className={layerStyles.layerCanvas}
        style={{
          backgroundColor: '#150C0C',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #241613 0%, #150C0C 80%)'
        }}
      />

      {/* LAYER 2: Atmosphere */}
      <div className={layerStyles.layerAtmosphere}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(to bottom, rgba(211, 152, 88, 0.15) 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* LAYER 3: Content */}
      <div className={layerStyles.layerContent} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        {/* Header HUD */}
        <div style={{
          position: 'relative',
          zIndex: 80,
          padding: '14px 20px 8px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(21, 12, 12, 0.85)',
          backdropFilter: 'blur(10px)',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--knomi-whiskey-sour)" />
            <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em', color: '#ffffff' }}>
              KNOMI <span style={{ color: 'var(--knomi-whiskey-sour)' }}>MENU</span>
            </span>
          </div>

          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)', letterSpacing: '0.05em' }}>
            SWIPE UP / DOWN
          </span>
        </div>

        {/* Category Switcher Tabs */}
        <div style={{
          position: 'relative',
          zIndex: 80,
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '10px 20px',
          backgroundColor: 'rgba(21, 12, 12, 0.6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          width: '100%'
        }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySwitch(cat.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  backgroundColor: isActive ? 'var(--knomi-whiskey-sour)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#150C0C' : '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Full-bleed Reels Dish Card Container */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', width: '100%' }}>
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
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBottom: '90px',
                width: '100%'
              }}
            >
              {/* Floating Food Image (55% Height) */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                width: '100%'
              }}>
                <motion.img
                  src={currentDish.imageUrl}
                  alt={currentDish.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    maxHeight: '230px',
                    maxWidth: '85%',
                    objectFit: 'contain',
                    filter: isSelected ? 'drop-shadow(0 0 28px var(--knomi-whiskey-sour))' : 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Details & Select Section Grid (35% Height) */}
              <div style={{
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 80px',
                gap: '16px',
                alignItems: 'end',
                backgroundColor: 'rgba(36, 22, 19, 0.7)',
                backdropFilter: 'blur(12px)',
                margin: '0 16px',
                borderRadius: 'var(--radius-xl)',
                border: isSelected ? '2px solid var(--knomi-whiskey-sour)' : '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {activeCategory} • {currentIndex + 1} OF {categoryDishes.length}
                  </span>
                  <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '4px 0 6px 0', lineHeight: 1.2 }}>
                    {currentDish.name}
                  </h1>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.4 }}>
                    {currentDish.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)' }}>
                    ₹{currentDish.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDish(currentDish.id);
                    }}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--knomi-whiskey-sour)' : 'transparent',
                      color: isSelected ? '#150C0C' : 'var(--knomi-whiskey-sour)',
                      border: '2px solid var(--knomi-whiskey-sour)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? <Check size={24} strokeWidth={3} /> : <Plus size={24} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* LAYER 4: HUD PlateBar */}
      <PlateBar
        selectedCount={selectedDishIds.length}
        minCount={5}
        maxCount={7}
        onDecode={handleDecode}
        ctaText={activeMode === 'roast' ? 'Roast Me 🔥' : 'Decode My Soul ✨'}
      />
    </div>
  );
};
