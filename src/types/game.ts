export type GameMode = 'solo' | 'this-or-that' | 'roast' | 'challenge' | 'couple';
export type GameStep = 'landing' | 'browsing' | 'playing' | 'analyzing' | 'revealed';

export interface GameHistoryItem {
  id: string;
  mode: GameMode;
  personalityId: string;
  timestamp: string;
  shared: boolean;
}
