import type { PersonalityProfile, PersonalityId } from '../types/personality';

export const PERSONALITIES: Record<PersonalityId, PersonalityProfile> = {
  'comfort-loyalist': {
    id: 'comfort-loyalist',
    name: 'The Comfort Loyalist',
    emoji: '🍛',
    tagline: 'You’ve been ordering the exact same 3 dishes since 2019 and you know it.',
    colors: {
      primary: '#E8A849',
      secondary: '#5C3D1A',
      glow: 'rgba(232,168,73,0.3)',
      text: '#FFF5E6'
    },
    baseTraits: [
      'You glance at the menu for 15 minutes only to pick Butter Chicken anyway.',
      'You’ve never sent food back, even when it was wrong. That’s pure loyalty.',
      'Your friends rely on you to order the safe dishes everyone actually wants to eat.'
    ],
    predictionText: 'Butter Chicken, Garlic Naan, and Gulab Jamun',
    populationPercentile: 52
  },

  'menu-anarchist': {
    id: 'menu-anarchist',
    name: 'The Menu Anarchist',
    emoji: '🌀',
    tagline: 'Your food order makes zero sense to anyone else, and that’s the point.',
    colors: {
      primary: '#8B5CF6',
      secondary: '#3B1D8E',
      glow: 'rgba(139,92,246,0.3)',
      text: '#F3ECFF'
    },
    baseTraits: [
      'You combine cuisines that have no business being on the same table.',
      'You order dessert before the starter arrives because life is short.',
      'Waiters double-check your order to make sure you didn’t make a mistake.'
    ],
    predictionText: 'Tom Yum Soup paired with Loaded Cheese Fries',
    populationPercentile: 8
  },

  'spice-sovereign': {
    id: 'spice-sovereign',
    name: 'The Spice Sovereign',
    emoji: '🔥',
    tagline: 'You don’t ask for spice level. Spice level asks for permission from you.',
    colors: {
      primary: '#DC2626',
      secondary: '#7F1D1D',
      glow: 'rgba(220,38,38,0.3)',
      text: '#FEF2F2'
    },
    baseTraits: [
      'If your forehead isn’t sweating, the chef didn’t even try.',
      'You look at "extra spicy" warnings on menus and take it as a personal challenge.',
      'You judge restaurants by the quality and kick of their chili oil.'
    ],
    predictionText: 'Atomic Peri Peri Wings with extra green chilies',
    populationPercentile: 14
  },

  'social-feeder': {
    id: 'social-feeder',
    name: 'The Social Feeder',
    emoji: '🍽️',
    tagline: 'You order for the entire table, not yourself. Everyone eats, you orchestrate.',
    colors: {
      primary: '#F59E0B',
      secondary: '#78350F',
      glow: 'rgba(245,158,11,0.3)',
      text: '#FFFBEB'
    },
    baseTraits: [
      'You calculate dish portions so everyone gets an equal share.',
      'You get genuinely offended when someone insists on ordering their own solo meal.',
      'Your favorite sentence at dinner is: "We’re all sharing, right?"'
    ],
    predictionText: 'Hyderabadi Biryani with Margherita Pizza for the middle',
    populationPercentile: 18
  },

  'silent-connoisseur': {
    id: 'silent-connoisseur',
    name: 'The Silent Connoisseur',
    emoji: '🥂',
    tagline: 'You eat to experience, not to fill up. There is a refined difference.',
    colors: {
      primary: '#38BDF8',
      secondary: '#0F1D30',
      glow: 'rgba(56,189,248,0.3)',
      text: '#E8F0FE'
    },
    baseTraits: [
      'You actually notice truffle oil, micro-greens, and plating symmetry.',
      'You silently evaluate the espresso crema and wine pairing.',
      'You’d rather eat one exquisite dish than a buffet of mediocrity.'
    ],
    predictionText: 'Pan-Seared Salmon with Espresso Tiramisu',
    populationPercentile: 11
  },

  'guilty-hedonist': {
    id: 'guilty-hedonist',
    name: 'The Guilty Hedonist',
    emoji: '🧈',
    tagline: 'Calories are a myth invented by people who’ve never had molten cake at 2 AM.',
    colors: {
      primary: '#A855F7',
      secondary: '#581C87',
      glow: 'rgba(168,85,247,0.3)',
      text: '#FAF0FF'
    },
    baseTraits: [
      'Extra cheese, extra butter, extra dip — zero regrets.',
      'You look straight at the dessert menu before even checking the starters.',
      'Your fitness tracker uninstalls itself whenever you walk into a restaurant.'
    ],
    predictionText: 'Double Smash Cheeseburger & Molten Chocolate Lava Cake',
    populationPercentile: 24
  },

  'balanced-diplomat': {
    id: 'balanced-diplomat',
    name: 'The Balanced Diplomat',
    emoji: '⚖️',
    tagline: 'You’re the composed person everyone trusts to pick the restaurant.',
    colors: {
      primary: '#22C55E',
      secondary: '#14532D',
      glow: 'rgba(34,197,94,0.3)',
      text: '#F0FDF4'
    },
    baseTraits: [
      'Your order has the exact right ratio of protein, carbs, and fresh greens.',
      'You balance a heavy main dish with a refreshing citrus drink.',
      'You settle restaurant arguments without breaking a sweat.'
    ],
    predictionText: 'Authentic Pad Thai with Fresh Lime Soda',
    populationPercentile: 16
  },

  'chaos-agent': {
    id: 'chaos-agent',
    name: 'The Chaos Agent',
    emoji: '💀',
    tagline: 'You ordered an Avocado Salad AND a Double Cheeseburger. We can’t read you.',
    colors: {
      primary: '#00FF88',
      secondary: '#0A1A0F',
      glow: 'rgba(0,255,136,0.3)',
      text: '#ECFDF5'
    },
    baseTraits: [
      'You order a diet soda with a 1,500-calorie burger to "balance it out".',
      'Your food preferences change every 45 minutes based on your unhinged mood.',
      'Algorithms fail to profile you because your taste vectors are pure randomness.'
    ],
    predictionText: 'Caesar Salad with Oreo Milkshake and Loaded Fries',
    populationPercentile: 4
  }
};
