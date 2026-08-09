import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { CategoryTabs } from '../../components/game/CategoryTabs';
import { DishCard } from '../../components/game/DishCard';
import { PlateBar } from '../../components/game/PlateBar';
import { DISHES } from '../../data/dishes';
import type { DishCategory } from '../../types/dish';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';

export const CouplePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

  const handleTestCompatibility = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);
    setResult(scoreResult.personality, scoreResult.averagedDimensions, scoreResult.traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack title="💕 Couple Mode" />

      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(236, 72, 153, 0.15)',
          color: '#EC4899',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          FOOD COMPATIBILITY TEST
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          Is your relationship strong enough to survive a menu?
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>
          Pick 5 dishes you want to share with your partner.
        </p>
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoryDishes.map(dish => (
          <DishCard
            key={dish.id}
            dish={dish}
            isSelected={selectedDishIds.includes(dish.id)}
            onToggle={() => toggleDish(dish.id)}
          />
        ))}
      </div>

      <PlateBar
        selectedCount={selectedDishIds.length}
        minCount={5}
        maxCount={7}
        onDecode={handleTestCompatibility}
        ctaText="Test Compatibility 💕"
      />
    </div>
  );
};
