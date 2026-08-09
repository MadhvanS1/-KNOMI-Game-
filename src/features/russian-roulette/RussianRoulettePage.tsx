import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';

export const RussianRoulettePage: React.FC = () => {
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [eliminated, setEliminated] = useState(false);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const currentDish = DISHES[round - 1] || DISHES[0];

  useEffect(() => {
    if (eliminated) return;
    if (timeLeft <= 0) {
      handleSurviveRound();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, eliminated]);

  const handleEatDish = () => {
    const isPoison = Math.random() < 0.2;
    if (isPoison) {
      setEliminated(true);
      setTimeout(() => {
        const scoreResult = calculateSoloScore(DISHES.slice(0, 5));
        const traits = [
          `☠️ FOOD RUSSIAN ROULETTE (ELIMINATED IN ROUND ${round})`,
          `💥 Poison Trap: Hit by Ultra-Spicy Ghost Pepper Trap`,
          `💀 Survival Rate: Top 68% Survivor`
        ];
        setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
        setStep('analyzing');
      }, 1200);
    } else {
      handleSurviveRound();
    }
  };

  const handleSurviveRound = () => {
    if (round < 5) {
      setRound(prev => prev + 1);
      setTimeLeft(5);
    } else {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));
      const traits = [
        `🏆 1% GOLD SURVIVOR CARD (SURVIVED ALL 5 ROULETTE ROUNDS!)`,
        `👑 Ultimate Food Gambler: Zero fear under 5s countdowns`,
        `⚡ Poison Immunity: Avoided all 5 Ghost Pepper traps`
      ];
      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header showBack title="☠️ Russian Roulette" />

      {/* Header Info */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(255, 68, 68, 0.15)',
          color: '#FF4444',
          fontSize: '12px',
          fontWeight: 800,
          marginBottom: '8px'
        }}>
          ROUND {round} OF 5 • 1 POISON TRAP DISH
        </div>

        <div style={{ fontSize: '24px', fontWeight: 800, color: '#FF4444' }}>
          00:0{timeLeft}s
        </div>
      </div>

      {/* Dish Roulette Card */}
      <motion.div
        key={round}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          marginTop: '20px',
          padding: '24px 20px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: eliminated ? '#2A1010' : 'var(--knomi-surface-card)',
          border: eliminated ? '2px solid #FF4444' : '1px solid var(--knomi-border-strong)',
          textAlign: 'center'
        }}
      >
        <img
          src={currentDish.imageUrl}
          alt={currentDish.name}
          style={{ maxHeight: '180px', maxWidth: '85%', objectFit: 'contain', marginBottom: '16px' }}
        />

        <h2 style={{ fontSize: '22px', color: eliminated ? '#FF4444' : '#FFFFFF', marginBottom: '4px' }}>
          {eliminated ? '☠️ POISON TRAP HIT!' : currentDish.name}
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
          {eliminated ? 'You hit the Ghost Pepper Poison Trap and were eliminated!' : currentDish.description}
        </p>
      </motion.div>

      {/* Action Button */}
      {!eliminated && (
        <button
          onClick={handleEatDish}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#FF4444',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255, 68, 68, 0.4)'
          }}
        >
          EAT DISH (RISK POISON TRAP ☠️)
        </button>
      )}
    </div>
  );
};
