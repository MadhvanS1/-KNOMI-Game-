import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Moon, CloudRain, Wallet, HeartHandshake } from 'lucide-react';

interface MoodTheme {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  dishes: string[];
  color: string;
}

const MOOD_THEMES: MoodTheme[] = [
  {
    id: 'monsoon',
    title: '☔ Monsoon Comfort',
    subtitle: 'Rainy day craving: Hot Pakodas, Cutting Chai & Steamed Momos',
    icon: <CloudRain size={24} color="#60A5FA" />,
    dishes: ['Hot Pakoda Platter', 'Cutting Masala Chai', 'Steamed Chicken Momos'],
    color: 'rgba(96, 165, 250, 0.15)'
  },
  {
    id: 'midnight',
    title: '🌙 2 AM Craving',
    subtitle: 'Late night study session: Butter Maggi, Cheese Toast & Ice Cream',
    icon: <Moon size={24} color="#A78BFA" />,
    dishes: ['Butter Cheese Maggi', 'Crispy Garlic Toast', 'Midnight Lava Cake'],
    color: 'rgba(167, 139, 250, 0.15)'
  },
  {
    id: 'broke',
    title: '💸 Broke Student ₹200 Limit',
    subtitle: 'End of month survival: Vada Pav, Samosa & Egg Roll',
    icon: <Wallet size={24} color="#34D399" />,
    dishes: ['Mumbai Vada Pav', 'Samosa Chat', 'Kolkata Egg Roll'],
    color: 'rgba(52, 211, 153, 0.15)'
  },
  {
    id: 'breakup',
    title: '💔 Breakup Healing Menu',
    subtitle: 'Emotional comfort food: Loaded Mac & Cheese & Triple Chocolate Sundae',
    icon: <HeartHandshake size={24} color="#F472B6" />,
    dishes: ['Four Cheese Mac', 'Triple Choco Sundae', 'Loaded Fries'],
    color: 'rgba(244, 114, 182, 0.15)'
  }
];

export const MoodMenusPage: React.FC = () => {
  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const handleSelectMood = (theme: MoodTheme) => {
    const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

    const traits = [
      `🌙 Active Mood Drop: ${theme.title}`,
      `☕ Craving Signature: ${theme.dishes.join(' • ')}`,
      `✨ Emotional State: 98% Dopamine seeking via Comfort Food`
    ];

    setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
    setStep('analyzing');
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🌙 Themed Mood Menus" />

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(167, 139, 250, 0.15)',
          color: '#A78BFA',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          CONTEXTUAL CURATED MENU DROPS
        </div>

        <h2 style={{ fontSize: '22px', color: 'var(--knomi-text-primary)', marginBottom: '6px' }}>
          What's your current vibe right now?
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', marginBottom: '24px' }}>
          Select a time-of-day or situation drop to analyze your emotional craving state.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {MOOD_THEMES.map(theme => (
            <motion.button
              key={theme.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectMood(theme)}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: theme.color,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ marginTop: '2px' }}>{theme.icon}</div>
              <div>
                <h3 style={{ fontSize: '17px', margin: '0 0 4px 0', color: 'var(--knomi-text-primary)' }}>
                  {theme.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {theme.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
