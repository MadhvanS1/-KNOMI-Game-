export type PersonalityId =
  | 'comfort-loyalist'
  | 'menu-anarchist'
  | 'spice-sovereign'
  | 'social-feeder'
  | 'silent-connoisseur'
  | 'guilty-hedonist'
  | 'balanced-diplomat'
  | 'chaos-agent';

export interface PersonalityColorPalette {
  primary: string;
  secondary: string;
  glow: string;
  text: string;
}

export interface PersonalityProfile {
  id: PersonalityId;
  name: string;
  tagline: string;
  emoji: string;
  colors: PersonalityColorPalette;
  baseTraits: string[];
  predictionText: string;
  populationPercentile: number;
}
