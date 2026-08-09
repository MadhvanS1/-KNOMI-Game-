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

export const LiarTablePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

  const handleExposeLiar = () => {
    const dishes = getSelectedDishes();
    scoreAndReveal(dishes);
  };

  const scoreAndReveal = (dishes: typeof DISHES) => {
    const scoreResult = calculateSoloScore(dishes);

    const traits = [
      '🎭 Secret Role: The Food Impostor',
      '🕵️ Bluff Dish Identified: Ghost Pepper Wings (Ordered to look brave)',
      '🏆 Interrogation Outcome: 75% of table suspected you were lying about liking extreme spice.'
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack title="🎭 The Liar's Table" />

      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#EF4444',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          LIAR GAME MODE
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          One person at this table is lying about what they love.
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>
          Pick 5 dishes including 1 bluff dish. Can your friends spot your fake order?
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
        onDecode={handleExposeLiar}
        ctaText="Expose Liar 🎭"
      />
    </div>
  );
};
