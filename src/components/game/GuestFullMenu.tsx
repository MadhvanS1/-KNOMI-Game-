import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Check, Plus, Sparkles } from 'lucide-react';
import type { DishCategory } from '../../types/dish';
import { DISHES } from '../../data/dishes';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { generateRoastPayload } from '../../engine/roastGenerator';
import { PlateBar } from './PlateBar';

const CATEGORIES: { id: DishCategory; label: string; icon: string }[] = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍲' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Drinks', icon: '🍹' }
];

export const GuestFullMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { selectedDishIds, toggleDish, getSelectedDishes, roastSeverity } = useSelectionStore();
  const { setStep, activeMode } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);
  const currentDish = categoryDishes[currentIndex] || categoryDishes[0];

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

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 }
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25 }
    })
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      maxWidth: '440px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#150C0C',
      color: '#F6EFE8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: '0 auto'
    }}>
      {/* LAYER 1: Base Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: '#150C0C',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #241613 0%, #150C0C 75%)'
        }}
      />

      {/* LAYER 2: Atmosphere (Sky & Ground overlays) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(211, 152, 88, 0.12) 0%, transparent 100%)'
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(21, 12, 12, 0.9) 0%, transparent 100%)'
      }} />

      {/* LAYER 4: Header HUD Bar */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--knomi-border-default)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--knomi-whiskey-sour)" />
          <span style={{
            fontFamily: 'var(--font-family-display)',
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--knomi-text-primary)'
          }}>
            KNOMI <span style={{ color: 'var(--knomi-whiskey-sour)' }}>MENU</span>
          </span>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--knomi-whiskey-sour)' }}>
          {currentIndex + 1} / {categoryDishes.length}
        </div>
      </div>

      {/* Category Tabs Switcher */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '10px 20px',
        backgroundColor: 'rgba(21, 12, 12, 0.6)'
      }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-card)',
                color: isActive ? '#150C0C' : 'var(--knomi-text-secondary)',
                fontWeight: 600,
                fontSize: '12px',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: isActive ? 'none' : '1px solid var(--knomi-border-default)'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* LAYER 3: Main Full-Screen Reel Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 20px 90px 20px'
      }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDish.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Top Image Section (imageSection - 55% height) */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '10px 0'
            }}>
              <img
                src={currentDish.imageUrl}
                alt={currentDish.name}
                style={{
                  maxHeight: '220px',
                  maxWidth: '85%',
                  objectFit: 'contain',
                  filter: isSelected ? 'drop-shadow(0 0 20px var(--knomi-whiskey-sour))' : 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Bottom Details Section (detailsSection - 35% height) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 80px',
              gap: '16px',
              alignItems: 'end',
              backgroundColor: 'rgba(36, 22, 19, 0.6)',
              backdropFilter: 'blur(8px)',
              padding: '16px 20px',
              borderRadius: 'var(--radius-xl)',
              border: isSelected ? '2px solid var(--knomi-whiskey-sour)' : '1px solid var(--knomi-border-strong)'
            }}>
              {/* Left Column */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {currentDish.category}
                </span>
                <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', margin: '4px 0 6px 0', lineHeight: 1.2 }}>
                  {currentDish.name}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', lineHeight: 1.4 }}>
                  {currentDish.description}
                </p>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--knomi-whiskey-sour)' }}>
                  ₹{currentDish.price}
                </span>

                <button
                  onClick={() => toggleDish(currentDish.id)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-card)',
                    color: isSelected ? '#150C0C' : 'var(--knomi-text-primary)',
                    border: isSelected ? 'none' : '2px solid var(--knomi-whiskey-sour)',
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

        {/* Up/Down Swipe Nav Indicators */}
        <div style={{
          position: 'absolute',
          right: '16px',
          top: '40%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10
        }}>
          <button
            onClick={handlePrevDish}
            disabled={currentIndex === 0}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: currentIndex === 0 ? 'rgba(255,255,255,0.2)' : 'var(--knomi-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--knomi-border-default)'
            }}
          >
            <ChevronUp size={20} />
          </button>

          <button
            onClick={handleNextDish}
            disabled={currentIndex === categoryDishes.length - 1}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: currentIndex === categoryDishes.length - 1 ? 'rgba(255,255,255,0.2)' : 'var(--knomi-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--knomi-border-default)'
            }}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* LAYER 4: Bottom Selection Tray HUD */}
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
