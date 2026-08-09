import type { Dish, DimensionScores, DimensionKey } from '../types/dish';
import type { PersonalityProfile, PersonalityId } from '../types/personality';
import { PERSONALITIES } from '../data/personalities';

export interface ScoringResult {
  personality: PersonalityProfile;
  averagedDimensions: DimensionScores;
  traits: string[];
  predictionText: string;
}

export function calculateSoloScore(selectedDishes: Dish[]): ScoringResult {
  if (!selectedDishes || selectedDishes.length === 0) {
    return {
      personality: PERSONALITIES['comfort-loyalist'],
      averagedDimensions: { adventure: 5, comfort: 5, spice: 5, social: 5, indulgence: 5, sophistication: 5 },
      traits: PERSONALITIES['comfort-loyalist'].baseTraits,
      predictionText: PERSONALITIES['comfort-loyalist'].predictionText
    };
  }

  // 1. Calculate average scores across 6 dimensions
  const dims: DimensionKey[] = ['adventure', 'comfort', 'spice', 'social', 'indulgence', 'sophistication'];
  const totals: Record<DimensionKey, number> = {
    adventure: 0,
    comfort: 0,
    spice: 0,
    social: 0,
    indulgence: 0,
    sophistication: 0
  };

  selectedDishes.forEach(dish => {
    dims.forEach(dim => {
      totals[dim] += dish.dimensions[dim];
    });
  });

  const count = selectedDishes.length;
  const averages: DimensionScores = {
    adventure: Math.round((totals.adventure / count) * 10) / 10,
    comfort: Math.round((totals.comfort / count) * 10) / 10,
    spice: Math.round((totals.spice / count) * 10) / 10,
    social: Math.round((totals.social / count) * 10) / 10,
    indulgence: Math.round((totals.indulgence / count) * 10) / 10,
    sophistication: Math.round((totals.sophistication / count) * 10) / 10
  };

  // 2. Check Contradictions (Chaos Agent)
  const hasHealthItem = selectedDishes.some(d => d.id === 'main-9' || d.id === 'starter-7' || d.id === 'dessert-6');
  const isHighIndulgence = averages.indulgence >= 7.5;
  const isHighAdventure = averages.adventure >= 7;
  const isHighComfort = averages.comfort >= 7;

  let personalityId: PersonalityId = 'comfort-loyalist';

  if ((hasHealthItem && isHighIndulgence) || (isHighAdventure && isHighComfort)) {
    personalityId = 'chaos-agent';
  }
  // Check Balanced Diplomat (all dimensions between 3.8 and 6.8)
  else if (dims.every(dim => averages[dim] >= 3.8 && averages[dim] <= 6.8)) {
    personalityId = 'balanced-diplomat';
  }
  // Check Spice Sovereign (spice >= 6.8)
  else if (averages.spice >= 6.8) {
    personalityId = 'spice-sovereign';
  }
  // Check Guilty Hedonist (indulgence >= 7.2)
  else if (averages.indulgence >= 7.2) {
    personalityId = 'guilty-hedonist';
  }
  // Check Silent Connoisseur (sophistication >= 6.8)
  else if (averages.sophistication >= 6.8 && averages.indulgence < 7.5) {
    personalityId = 'silent-connoisseur';
  }
  // Check Social Feeder (social >= 7.0)
  else if (averages.social >= 7.0) {
    personalityId = 'social-feeder';
  }
  // Check Menu Anarchist (adventure >= 6.5)
  else if (averages.adventure >= 6.5) {
    personalityId = 'menu-anarchist';
  }
  // Default to Comfort Loyalist
  else {
    personalityId = 'comfort-loyalist';
  }

  const profile = PERSONALITIES[personalityId];

  // 3. Assemble dynamic traits based on selected dishes
  const traits = [...profile.baseTraits];
  
  // Custom dish callout traits
  const names = selectedDishes.map(d => d.name);
  if (names.includes('Classic Butter Chicken')) {
    traits[0] = 'You ordered Butter Chicken — the ultimate safety net of Indian food culture.';
  }
  if (names.includes('Hyderabadi Dum Biryani')) {
    traits[1] = 'Biryani was non-negotiable for you. Respect.';
  }
  if (names.includes('Molten Chocolate Lava Cake')) {
    traits[2] = 'Lava Cake was selected within 2 seconds of opening the dessert section.';
  }

  return {
    personality: profile,
    averagedDimensions: averages,
    traits,
    predictionText: profile.predictionText
  };
}
