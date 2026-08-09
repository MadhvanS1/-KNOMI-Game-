import { create } from 'zustand';
import type { PersonalityProfile } from '../types/personality';
import type { DimensionScores } from '../types/dish';
import type { RoastPayload } from '../types/roast';

interface ResultState {
  personality: PersonalityProfile | null;
  dimensionScores: DimensionScores | null;
  traits: string[];
  roastPayload: RoastPayload | null;
  totalPlayCount: number;

  setResult: (
    personality: PersonalityProfile,
    dimensionScores: DimensionScores,
    traits: string[],
    roastPayload?: RoastPayload | null
  ) => void;
  incrementPlayCount: () => void;
  resetResult: () => void;
}

export const useResultStore = create<ResultState>((set) => ({
  personality: null,
  dimensionScores: null,
  traits: [],
  roastPayload: null,
  totalPlayCount: 2847,

  setResult: (personality, dimensionScores, traits, roastPayload = null) =>
    set((state) => ({
      personality,
      dimensionScores,
      traits,
      roastPayload,
      totalPlayCount: state.totalPlayCount + 1
    })),

  incrementPlayCount: () => set((state) => ({ totalPlayCount: state.totalPlayCount + 1 })),

  resetResult: () => set({
    personality: null,
    dimensionScores: null,
    traits: [],
    roastPayload: null
  })
}));
