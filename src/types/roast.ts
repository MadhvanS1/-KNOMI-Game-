import { PersonalityId } from './personality';

export type SeverityLevel = 'mild' | 'savage';

export interface RoastPayload {
  personalityId: PersonalityId;
  severity: SeverityLevel;
  headline: string;
  punchlines: string[];
  dishCallouts: string[];
}
