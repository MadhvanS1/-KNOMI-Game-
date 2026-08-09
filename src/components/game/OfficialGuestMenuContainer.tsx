import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { DISHES } from '../../data/dishes';
import type { DishCategory } from '../../types/dish';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { generateRoastPayload } from '../../engine/roastGenerator';
import { PlateBar } from './PlateBar';
import { Plus, Check, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

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
  const [navMode, setNavMode] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const { selectedDishIds, toggleDish, getSelectedDishes, roastSeverity } = useSelectionStore();
  const { setStep, activeMode } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = useMemo(() => DISHES.filter(d => d.category === activeCategory), [activeCategory]);
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

  const bind = useDrag(({ active, movement: [mx, my], swipe: [, swipeY] }) => {
    setIsDragging(active);
    setDragOffset({ x: mx, y: my });

    if (!active) {
      if (swipeY === -1 || my < -80) {
        handleNextDish();
      } else if (swipeY === 1 || my > 80) {
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
      y: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: (): TargetAndTransition => ({
      y: isDragging ? dragOffset.y : 0,
      x: isDragging ? dragOffset.x : 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }),
    exit: (dir: number): TargetAndTransition => ({
      y: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    })
  };

  return (
    <div
      {...bind()}
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: '440px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '0 auto',
        touchAction: 'none'
      }}
    >
      {/* BAR-HEADER (Guest Menu Top Bar) */}
      <div style={{
        position: 'relative',
        zIndex: 80,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="#d4a017" />
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '0.05em', color: '#ffffff' }}>
            KNOMI <span style={{ color: '#d4a017' }}>GUEST MENU</span>
          </span>
        </div>

        <button
          onClick={() => setNavMode(!navMode)}
          style={{
            padding: '6px 12px',
            borderRadius: '16px',
            backgroundColor: navMode ? '#d4a017' : 'rgba(255, 255, 255, 0.1)',
            color: navMode ? '#1a1a1a' : '#ffffff',
            fontWeight: 600,
            fontSize: '12px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {navMode ? 'Exit Nav' : 'Nav Mode'}
        </button>
      </div>

      {/* CATEGORY NAV OVERLAY (Category Switcher Bar) */}
      <div style={{
        position: 'relative',
        zIndex: 80,
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '10px 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                backgroundColor: isActive ? '#d4a017' : 'rgba(255, 255, 255, 0.08)',
                color: isActive ? '#1a1a1a' : '#ffffff',
                fontWeight: 600,
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

      {/* DISH CARD CONTAINER (Full-bleed Reels Stack) */}
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="wait" custom={direction}>
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
              padding: '0 0 100px 0'
            }}
          >
            {/* imageSection (55% height) */}
            <div style={{
              width: '100%',
              height: '55%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginTop: '1rem'
            }}>
              <motion.img
                src={currentDish.imageUrl}
                alt={currentDish.name}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                style={{
                  width: '80%',
                  maxHeight: '220px',
                  objectFit: 'contain',
                  filter: isSelected ? 'drop-shadow(0 0 24px #d4a017)' : 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* detailsSection (32% height grid: Col-Left & Col-Right) */}
            <div style={{
              height: '35%',
              padding: '1.5rem 2rem',
              display: 'grid',
              gridTemplateColumns: '1fr 80px',
              gap: '1.5rem',
              alignItems: 'end',
              backgroundColor: 'transparent'
            }}>
              {/* Col-Left (dishName & dishDescription) */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, lineHeight: 1.1, color: '#ffffff' }}>
                  {currentDish.name}
                </h1>
                <p style={{ fontSize: '0.95rem', opacity: 0.75, margin: 0, lineHeight: 1.4, color: 'rgba(255, 255, 255, 0.8)' }}>
                  {currentDish.description}
                </p>
              </div>

              {/* Col-Right (addButton & dishPrice) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#d4a017' }}>
                  ₹{currentDish.price}
                </span>

                <button
                  onClick={() => toggleDish(currentDish.id)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '24px',
                    backgroundColor: isSelected ? '#d4a017' : 'transparent',
                    color: isSelected ? '#1a1a1a' : '#d4a017',
                    border: isSelected ? 'none' : '2px solid #d4a017',
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label={`Add ${currentDish.name} to selection`}
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
          zIndex: 90
        }}>
          <button
            onClick={handlePrevDish}
            disabled={currentIndex === 0}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: currentIndex === 0 ? 'rgba(255,255,255,0.2)' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer'
            }}
          >
            <ChevronUp size={22} />
          </button>

          <button
            onClick={handleNextDish}
            disabled={currentIndex === categoryDishes.length - 1}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: currentIndex === categoryDishes.length - 1 ? 'rgba(255,255,255,0.2)' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer'
            }}
          >
            <ChevronDown size={22} />
          </button>
        </div>
      </div>

      {/* BAR-HUD & PLATE BAR SELECTION TRAY */}
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
