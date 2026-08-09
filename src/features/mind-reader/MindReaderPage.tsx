import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/common/Header';
import { useGameStore } from '../../stores/useGameStore';
import { useResultStore } from '../../stores/useResultStore';
import { calculateSoloScore } from '../../engine/scoringEngine';
import { DISHES } from '../../data/dishes';
import { Check } from 'lucide-react';

interface TelemetryLog {
  time: string;
  action: string;
  significance: string;
}

export const MindReaderPage: React.FC = () => {
  const [deduction, setDeduction] = useState<string | null>(null);

  const { setStep } = useGameStore();
  const { setResult } = useResultStore();

  const logs: TelemetryLog[] = [
    { time: '0.2s', action: 'Scrolled past Green Salad', significance: 'Low Comfort interest' },
    { time: '1.4s', action: 'Hovered 3.8s on Truffle Fries', significance: 'High Indulgence craving' },
    { time: '4.1s', action: 'Zoomed into Spicy Biryani', significance: 'High Spice Tolerance' }
  ];

  const handlePredictOrder = (dishName: string) => {
    setDeduction(dishName);

    setTimeout(() => {
      const scoreResult = calculateSoloScore(DISHES.slice(0, 5));

      const traits = [
        `👁️ MIND-READER DUEL (DEATH NOTE TELEMETRY)`,
        `🧠 Deduction Prediction: Target predicted to order ${dishName}`,
        `🎯 Deduction Accuracy: 96.8% Accuracy based strictly on hover telemetry!`
      ];

      setResult(scoreResult.personality, scoreResult.averagedDimensions, traits, null);
      setStep('analyzing');
    }, 900);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="👁️ Mind-Reader Duel" />

      {/* Telemetry Log Screen */}
      <div style={{
        marginTop: '16px',
        padding: '20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: '#10141C',
        border: '1px solid #60A5FA',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(96, 165, 250, 0.15)',
          color: '#60A5FA',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          ANONYMIZED HOVER & SCROLL TELEMETRY LOGS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          {logs.map((log, idx) => (
            <div key={idx} style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: '#60A5FA', fontWeight: 700 }}>[{log.time}] {log.action}</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>{log.significance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Deduction Choices */}
      <div>
        <h3 style={{ fontSize: '16px', color: 'var(--knomi-text-primary)', marginBottom: '12px' }}>
          Deduce target's exact order based on telemetry:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['Truffle Mushroom Risotto', 'Spicy Biryani Platter', 'Triple Chocolate Lava Cake'].map((dish) => (
            <motion.button
              key={dish}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePredictOrder(dish)}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: deduction === dish ? 'rgba(96, 165, 250, 0.25)' : 'var(--knomi-surface-card)',
                border: deduction === dish ? '2px solid #60A5FA' : '1px solid var(--knomi-border-strong)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '15px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>{dish}</span>
              {deduction === dish && <Check size={18} color="#60A5FA" />}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
