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

export const ChallengePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const [, setHoverCount] = useState(0);

  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

  const handleDishHover = () => {
    setHoverCount(prev => prev + 1);
  };

  const handleAttemptBreak = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);

    setResult(scoreResult.personality, scoreResult.averagedDimensions, scoreResult.traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack title="💀 Challenge: Break KNOMI" />

      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(0, 255, 136, 0.15)',
          color: '#00FF88',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          ONLY 3% OF PLAYERS FOOL KNOMI
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          Try to order the OPPOSITE of your true taste
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>
          KNOMI tracks hover duration and hesitation. Can you fool the algorithm?
        </p>
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoryDishes.map(dish => (
          <div key={dish.id} onMouseEnter={handleDishHover}>
            <DishCard
              dish={dish}
              isSelected={selectedDishIds.includes(dish.id)}
              onToggle={() => toggleDish(dish.id)}
            />
          </div>
        ))}
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
