import type { Dish } from '../types/dish';
import type { PersonalityProfile } from '../types/personality';
import type { RoastPayload, SeverityLevel } from '../types/roast';
import { ROASTS } from '../data/roasts';

export function generateRoastPayload(
  personality: PersonalityProfile,
  selectedDishes: Dish[],
  severity: SeverityLevel
): RoastPayload {
  const roastLines = ROASTS[personality.id] || ROASTS['comfort-loyalist'];
  const punchlines = severity === 'savage' ? roastLines.savage : roastLines.mild;

  const dishNames = selectedDishes.map(d => d.name).slice(0, 3);
  const dishCalloutText = dishNames.length > 0 
    ? `You ordered ${dishNames.join(', ')} — your stomach is currently filing a formal appeal.`
    : `Your order pattern left the entire kitchen team speechless.`;

  return {
    personalityId: personality.id,
    severity,
    headline: severity === 'savage' ? '🔥 SAVAGE ROAST 🔥' : '🌶️ MILD TEASE',
    punchlines,
    dishCallouts: [dishCalloutText]
  };
}
