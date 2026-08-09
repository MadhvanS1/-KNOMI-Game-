import type { PersonalityId } from '../types/personality';

export interface RoastLines {
  mild: string[];
  savage: string[];
}

export const ROASTS: Record<PersonalityId, RoastLines> = {
  'comfort-loyalist': {
    mild: [
      'You’ve been ordering Butter Chicken since 2019. The restaurant staff have a nickname for you.',
      '15 minutes of staring at the menu just to pick the exact same dish as last Friday.',
      'Your tastebuds have a comfort zone wider than a football field.'
    ],
    savage: [
      'Your food order has less risk than a fixed deposit account.',
      'You look at a diverse 50-item menu and treat it like a 1-item test.',
      'If predictable was a person, they’d order what you just picked.'
    ]
  },

  'menu-anarchist': {
    mild: [
      'You combined Thai soup with Loaded Fries. The chef just shook his head in the kitchen.',
      'Your plate looks like a collision between three completely different food festivals.',
      'Waiters double-check your order because nobody believes someone would pick this combo on purpose.'
    ],
    savage: [
      'Your taste vectors look like a cat walked across the keyboard.',
      'You order food like you’re trying to confuse an AI algorithm.',
      'Your stomach has to file three different visas for the meal you just ordered.'
    ]
  },

  'spice-sovereign': {
    mild: [
      'Your stomach lining is currently writing a formal complaint to human rights organizations.',
      'You order extra green chilies not for flavor, but to feel something inside.',
      'Your tastebuds have been incinerated since 2021.'
    ],
    savage: [
      'You don’t like flavor, you just like surviving physical pain at the dinner table.',
      'Your fire-extinguisher order is why waiters give you that worried look.',
      'Even ghost peppers ask you to chill out.'
    ]
  },

  'social-feeder': {
    mild: [
      'You order for the whole table because you secretly don’t trust anyone else’s taste.',
      'You get offended when someone orders their own personal meal without consulting you first.',
      'You treat dinner planning like you’re managing a multi-million dollar logistics firm.'
    ],
    savage: [
      'You’re the food dictator of the friend group. Nobody asked for garlic naan, but you ordered four.',
      'You calculate split bills with the precision of an auditor.',
      'You order "for the table" so you can eat off everyone’s plate guilt-free.'
    ]
  },

  'silent-connoisseur': {
    mild: [
      'You evaluate plating symmetry like you’re judging an art gallery exhibit.',
      'You take 3 minutes to photograph the dish before taking a single bite.',
      'You silently judge anyone who uses extra tomato ketchup.'
    ],
    savage: [
      'You spend 45 minutes analyzing truffle notes while paying ₹800 for three pieces of leaves.',
      'Your Instagram story takes longer to edit than the chef took to cook the salmon.',
      'Pretentious called — they want their food order back.'
    ]
  },

  'guilty-hedonist': {
    mild: [
      'Your calories counter just threw an error code 404.',
      'You ordered a burger, fries, and lava cake. Your gym trainer just felt a disturbance in the force.',
      'You look at cheese pull videos for relaxation.'
    ],
    savage: [
      'Your cholesterol level just requested a 1-on-1 meeting with your doctor.',
      'You treat calories like optional recommendations.',
      'Your arteries just uninstalled themselves.'
    ]
  },

  'balanced-diplomat': {
    mild: [
      'Your order is so balanced and sensible it’s almost boring.',
      'You’re the friend who orders salad to balance out everyone else’s junk food.',
      'You calculated your protein-to-carb ratio before the waiter even took your drink order.'
    ],
    savage: [
      'You’re so neutral you make water look opinionated.',
      'You pick foods that offend nobody and excite nobody.',
      'You’re the human equivalent of a plain boiled potato.'
    ]
  },

  'chaos-agent': {
    mild: [
      'You ordered a Caesar Salad AND an Oreo Milkshake. Your food choices are a cry for help.',
      'You drink diet soda with a double cheeseburger as if that fixes everything.',
      'Even KNOMI’s AI couldn’t figure out what you actually want to eat.'
    ],
    savage: [
      'Your food order is a walking contradiction.',
      'You eat like a toddler with a credit card at a food court.',
      'Your stomach has zero idea what emotion you’re experiencing right now.'
    ]
  }
};
