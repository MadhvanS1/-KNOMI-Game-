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

export const RedFlagsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

  const handleGenerateReportCard = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);

    const hasSalad = dishes.some(d => d.id === 'main-9');
    const hasHeavyIndulgence = dishes.some(d => d.id === 'main-10' || d.id === 'starter-3');

    const redFlags = [
      hasSalad ? '🚩 Orders a salad at a biryani house.' : '🚩 Orders extra garlic naan for the table, then eats 3 pieces.',
      hasHeavyIndulgence ? '🚩 Orders loaded cheese fries before even checking if others are hungry.' : '🚩 Takes 20 minutes to pick a main course, then orders Butter Chicken.'
    ];

    const greenFlags = [
      '🟢 Confidently orders dessert without asking "are we splitting?"',
      '🟢 Knows their exact spice tolerance and doesn’t pretend.'
    ];

    const traits = [...greenFlags, ...redFlags];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack title="🚩 Red Flags / Green Flags" />

      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          color: '#DC2626',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          YOUR FOOD DATING PROFILE
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          What do your food orders say about your relationship red flags?
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>
          Pick 5-7 dishes to generate your Red Flag & Green Flag report card.
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
        onDecode={handleGenerateReportCard}
        ctaText="Generate Report Card 🚩"
      />
    </div>
  );
};
