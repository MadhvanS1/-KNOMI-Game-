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

export const SquadPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DishCategory>('starters');
  const [squadCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  
  const { selectedDishIds, toggleDish, getSelectedDishes } = useSelectionStore();
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const categoryDishes = DISHES.filter(d => d.category === activeCategory);

  const handleRankSquad = () => {
    const dishes = getSelectedDishes();
    const scoreResult = calculateSoloScore(dishes);

    const traits = [
      `👑 Squad Rank #1: Most Adventurous Eater in Room ${squadCode}`,
      `💀 Squad Callout: Your friends ranked you "Least Predictable"`,
      `🔥 Collective Squad Archetype: The Chaotically Hungry Squad`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '100px' }}>
      <Header showBack title="👥 Roast Squad: Group Ranking" />

      <div style={{ padding: '16px 20px 8px 20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          color: '#8B5CF6',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          SQUAD ROOM: #{squadCode}
        </div>

        <h2 style={{ fontSize: '20px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          Who in your squad has the most basic taste?
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)' }}>
          Pick 5-7 dishes to rank your food personality against your friends.
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
        onDecode={handleRankSquad}
        ctaText="Rank Squad 👥"
      />
    </div>
  );
};
