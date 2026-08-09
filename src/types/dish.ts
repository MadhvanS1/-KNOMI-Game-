export type DimensionKey = 
  | 'adventure' 
  | 'comfort' 
  | 'spice' 
  | 'social' 
  | 'indulgence' 
  | 'sophistication';

export type DishCategory = 'starters' | 'mains' | 'desserts' | 'drinks';

export interface DimensionScores {
  adventure: number;     // 1 to 10
  comfort: number;       // 1 to 10
  spice: number;         // 1 to 10
  social: number;        // 1 to 10
  indulgence: number;    // 1 to 10
  sophistication: number;// 1 to 10
}

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  imageUrl: string;
  dimensions: DimensionScores;
  tags?: string[];
}

export interface ThisOrThatPair {
  id: number;
  category: string;
  optionA: Dish;
  optionB: Dish;
}
