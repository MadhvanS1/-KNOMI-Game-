import { create } from 'zustand';
import type { SeverityLevel } from '../types/roast';
import { DISHES } from '../data/dishes';
import type { Dish } from '../types/dish';

interface SelectionState {
  selectedDishIds: string[];
  thisOrThatChoices: Record<number, 'optionA' | 'optionB'>;
  roastSeverity: SeverityLevel;
  
  toggleDish: (id: string) => void;
  clearDishes: () => void;
  setThisOrThatChoice: (pairId: number, choice: 'optionA' | 'optionB') => void;
  setRoastSeverity: (severity: SeverityLevel) => void;
  getSelectedDishes: () => Dish[];
  resetSelections: () => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedDishIds: [],
  thisOrThatChoices: {},
  roastSeverity: 'savage',

  toggleDish: (id: string) => set((state) => {
    const exists = state.selectedDishIds.includes(id);
    if (exists) {
      return { selectedDishIds: state.selectedDishIds.filter(dId => dId !== id) };
    } else {
      if (state.selectedDishIds.length >= 7) return state; // Limit max 7
      return { selectedDishIds: [...state.selectedDishIds, id] };
    }
  }),

  clearDishes: () => set({ selectedDishIds: [] }),

  setThisOrThatChoice: (pairId, choice) => set((state) => ({
    thisOrThatChoices: { ...state.thisOrThatChoices, [pairId]: choice }
  })),

  setRoastSeverity: (severity) => set({ roastSeverity: severity }),

  getSelectedDishes: () => {
    const ids = get().selectedDishIds;
    return DISHES.filter(d => ids.includes(d.id));
  },

  resetSelections: () => set({
    selectedDishIds: [],
    thisOrThatChoices: {},
    roastSeverity: 'savage'
  })
}));
