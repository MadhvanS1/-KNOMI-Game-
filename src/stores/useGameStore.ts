import { create } from 'zustand';
import type { GameMode, GameStep } from '../types/game';

interface GameState {
  activeMode: GameMode | null;
  step: GameStep;
  setMode: (mode: GameMode | null) => void;
  setStep: (step: GameStep) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeMode: null,
  step: 'landing',

  setMode: (mode) => set({ activeMode: mode }),
  setStep: (step) => set({ step }),

  resetGame: () => set({ activeMode: null, step: 'landing' })
}));
