import React, { useState, useMemo } from 'react';
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
import { Plus, Check, ChevronUp, ChevronDown } from 'lucide-react';
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
  const [navMode, setNavMode] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
      className={themeStyles.appContainer}
      style={{ touchAction: 'none' }}
    >
      {/* LAYER 1: Canvas Base */}
      <div
        className={layerStyles.layerCanvas}
        style={{
          backgroundColor: '#150C0C',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #241613 0%, #150C0C 75%)'
        }}
      />

      {/* LAYER 2: Atmosphere */}
      <div className={layerStyles.layerAtmosphere}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, rgba(211, 152, 88, 0.12) 0%, transparent 100%)'
        }} />
      </div>

      {/* LAYER 3: Content */}
      <div className={layerStyles.layerContent}>
        {/* Header Overlay */}
        <div className={themeStyles.header}>
          <h2 className={themeStyles.restaurantName}>KNOMI</h2>
          <p className={themeStyles.restaurantTagline}>BUON APPETITO!</p>
        </div>

        {/* Category Switcher Bar */}
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: 0,
          right: 0,
          zIndex: 80,
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          padding: '8px 20px',
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
                  borderRadius: '20px',
                  backgroundColor: isActive ? 'var(--knomi-whiskey-sour)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#150C0C' : '#FFFFFF',
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

        {/* Main Dish Reel */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDish.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={themeStyles.dishCardContainer}
          >
            {/* imageSection (55% viewport height) */}
            <div className={themeStyles.imageSection}>
              <motion.img
                src={currentDish.imageUrl}
                alt={currentDish.name}
                className={themeStyles.dishImage}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                style={{
                  filter: isSelected ? 'drop-shadow(0 0 24px var(--knomi-whiskey-sour))' : 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))'
                }}
              />
            </div>

            {/* detailsSection (32% height grid: detailsLeftCol & detailsRightCol) */}
            <div className={themeStyles.detailsSection}>
              <div className={themeStyles.detailsContainerGrid}>
                <div className={themeStyles.detailsLeftCol}>
                  <h1 className={themeStyles.dishName}>{currentDish.name}</h1>
                  <p className={themeStyles.dishDescription}>{currentDish.description}</p>
                </div>

                <div className={themeStyles.detailsRightCol}>
                  <span className={themeStyles.dishPrice}>₹{currentDish.price}</span>
                  <button
                    className={themeStyles.addButton}
                    onClick={() => toggleDish(currentDish.id)}
                    style={{
                      backgroundColor: isSelected ? 'var(--knomi-whiskey-sour)' : 'transparent',
                      color: isSelected ? '#150C0C' : 'var(--knomi-whiskey-sour)',
                      borderColor: 'var(--knomi-whiskey-sour)'
                    }}
                  >
                    {isSelected ? <Check size={22} strokeWidth={3} /> : <Plus size={22} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category Bottom Badge */}
        <div className={themeStyles.categoryBottomBadgeContainer}>
          <div className={themeStyles.categoryBottomBadge} style={{ backgroundColor: 'var(--knomi-whiskey-sour)', color: '#150C0C' }}>
            {activeCategory} • {currentIndex + 1}/{categoryDishes.length}
          </div>
        </div>

        {/* Up/Down Swipe Indicators */}
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

        {/* Nav Mode Overlay Screen */}
        <AnimatePresence>
          {navMode && (
            <motion.div
              className={themeStyles.dishNavOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={layerStyles.layerCanvas} style={{ backgroundColor: 'rgba(21, 12, 12, 0.95)' }} />
              <div className={layerStyles.layerContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                <h2 className={themeStyles.navTitle}>Explore our menu</h2>
                <p className={themeStyles.navSubtitle}>SWIPE UP / DOWN TO SCRUB</p>

                <div className={themeStyles.navDishImageContainer}>
                  <img src={currentDish.imageUrl} alt={currentDish.name} className={themeStyles.navDishImage} />
                </div>

                <div className={themeStyles.positionDotsContainer}>
                  <div className={themeStyles.dotsTrack}>
                    {categoryDishes.map((_, i) => (
                      <div
                        key={i}
                        className={`${themeStyles.positionDot} ${i === currentIndex ? themeStyles.positionDotActive : ''}`}
                        style={{ backgroundColor: i === currentIndex ? 'var(--knomi-whiskey-sour)' : '#ffffff' }}
                      />
                    ))}
                  </div>
                </div>

                <h1 className={themeStyles.navDishName} style={{ color: 'var(--knomi-whiskey-sour)' }}>
                  {currentDish.name}
                </h1>

                <button
                  onClick={() => setNavMode(false)}
                  style={{
                    marginTop: '20px',
                    padding: '10px 24px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--knomi-whiskey-sour)',
                    color: '#150C0C',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Close Scrub Grid
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
