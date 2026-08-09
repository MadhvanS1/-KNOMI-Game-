import type { ThisOrThatPair } from '../types/dish';
import { DISHES } from './dishes';

export const THIS_OR_THAT_PAIRS: ThisOrThatPair[] = [
  {
    id: 1,
    category: 'The Classic Confrontation',
    optionA: DISHES.find(d => d.id === 'main-1')!,
    optionB: DISHES.find(d => d.id === 'main-4')!
  },
  {
    id: 2,
    category: 'Asian Fast Food vs Refined Sushi',
    optionA: DISHES.find(d => d.id === 'starter-2')!,
    optionB: DISHES.find(d => d.id === 'main-2')!
  },
  {
    id: 3,
    category: 'Midnight Craving',
    optionA: DISHES.find(d => d.id === 'starter-3')!,
    optionB: DISHES.find(d => d.id === 'starter-8')!
  },
  {
    id: 4,
    category: 'Soup Battle: Spicy vs Refined',
    optionA: DISHES.find(d => d.id === 'starter-4')!,
    optionB: DISHES.find(d => d.id === 'main-8')!
  },
  {
    id: 5,
    category: 'Indulgent Burger vs Fresh Salad',
    optionA: DISHES.find(d => d.id === 'main-10')!,
    optionB: DISHES.find(d => d.id === 'main-9')!
  },
  {
    id: 6,
    category: 'Street Comfort vs Gourmet Slice',
    optionA: DISHES.find(d => d.id === 'main-7')!,
    optionB: DISHES.find(d => d.id === 'main-3')!
  },
  {
    id: 7,
    category: 'Heat Level Test',
    optionA: DISHES.find(d => d.id === 'starter-1')!,
    optionB: DISHES.find(d => d.id === 'starter-6')!
  },
  {
    id: 8,
    category: 'Refined Main vs Fancy Starter',
    optionA: DISHES.find(d => d.id === 'main-6')!,
    optionB: DISHES.find(d => d.id === 'starter-5')!
  },
  {
    id: 9,
    category: 'Desi Sweets vs Western Lava',
    optionA: DISHES.find(d => d.id === 'dessert-1')!,
    optionB: DISHES.find(d => d.id === 'dessert-2')!
  },
  {
    id: 10,
    category: 'Italian Elegance vs American Cheesecake',
    optionA: DISHES.find(d => d.id === 'dessert-3')!,
    optionB: DISHES.find(d => d.id === 'dessert-5')!
  },
  {
    id: 11,
    category: 'Kulfi vs Fresh Fruit',
    optionA: DISHES.find(d => d.id === 'dessert-4')!,
    optionB: DISHES.find(d => d.id === 'dessert-6')!
  },
  {
    id: 12,
    category: 'Beverage War: Chai vs Matcha',
    optionA: DISHES.find(d => d.id === 'drink-1')!,
    optionB: DISHES.find(d => d.id === 'drink-2')!
  },
  {
    id: 13,
    category: 'Mango Lassi vs Cold Brew Coffee',
    optionA: DISHES.find(d => d.id === 'drink-3')!,
    optionB: DISHES.find(d => d.id === 'drink-4')!
  },
  {
    id: 14,
    category: 'Refreshing Fizz vs Rich Shake',
    optionA: DISHES.find(d => d.id === 'drink-5')!,
    optionB: DISHES.find(d => d.id === 'drink-6')!
  },
  {
    id: 15,
    category: 'Healthy Edamame vs Pad Thai',
    optionA: DISHES.find(d => d.id === 'starter-7')!,
    optionB: DISHES.find(d => d.id === 'main-5')!
  }
];
