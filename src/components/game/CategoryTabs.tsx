import React from 'react';
import type { DishCategory } from '../../types/dish';

interface CategoryTabsProps {
  activeCategory: DishCategory;
  onSelectCategory: (cat: DishCategory) => void;
}

const CATEGORIES: { id: DishCategory; label: string; icon: string }[] = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍲' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Drinks', icon: '🍹' }
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      padding: '12px 20px',
      backgroundColor: 'var(--knomi-bg-base)',
      borderBottom: '1px solid var(--knomi-border-default)',
      position: 'sticky',
      top: '57px',
      zIndex: 40
    }}>
      {CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isActive ? 'var(--knomi-whiskey-sour)' : 'var(--knomi-surface-card)',
              color: isActive ? '#150C0C' : 'var(--knomi-text-secondary)',
              fontWeight: 600,
              fontSize: '13px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: isActive ? 'none' : '1px solid var(--knomi-border-default)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
