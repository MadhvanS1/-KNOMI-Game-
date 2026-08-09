import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { CategoryTabs } from '../../components/game/CategoryTabs';
import { PremiumV3MenuCard } from '../../components/game/PremiumV3MenuCard';
import { PlateBar } from '../../components/game/PlateBar';
import { DISHES } from '../../data/dishes';
import type { DishCategory } from '../../types/dish';
import { useSelectionStore } from '../../stores/useSelectionStore';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { generateRoastPayload } from '../../engine/roastGenerator';

export const SoloPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const { selectedDishIds, toggleDish, getSelectedDishes, roastSeverity } = useSelectionStore();
  const { setStep, activeMode } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

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

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '110px' }}>
      <Header showBack title={activeMode === 'roast' ? '💀 Roast Mode' : '🧠 Solo Mode'} />

      {/* Subheader Title */}
      <div style={{ padding: '16px 20px 8px 20px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          {activeMode === 'roast' ? 'Pick the dishes you order most' : 'Pick 5-7 dishes that speak to you'}
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)' }}>
          KNOMI Premium Menu Engine • Select 5 to 7 dishes across categories
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Premium V3 Stacked Menu Cards */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {categoryDishes.map(dish => (
          <PremiumV3MenuCard
            key={dish.id}
            dish={dish}
            isSelected={selectedDishIds.includes(dish.id)}
            onToggle={() => toggleDish(dish.id)}
          />
        ))}
      </div>

      {/* Plate Bar CTA */}
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
