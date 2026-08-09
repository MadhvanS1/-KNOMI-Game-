import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useGameStore } from '../../stores/useGameStore';
import { useSelectionStore } from '../../stores/useSelectionStore';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, title }) => {
  const { resetGame } = useGameStore();
  const { resetSelections } = useSelectionStore();

  const handleBack = () => {
    resetSelections();
    resetGame();
  };

  return (
    <header style={{
      width: '100%',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--knomi-bg-base)',
      borderBottom: '1px solid var(--knomi-border-default)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {showBack ? (
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--knomi-text-secondary)',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={18} /> Back
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--knomi-whiskey-sour)" />
          <span style={{
            fontFamily: 'var(--font-family-display)',
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: 'var(--knomi-text-primary)'
          }}>
            KNOMI <span style={{ color: 'var(--knomi-whiskey-sour)' }}>KNOWS YOU</span>
          </span>
        </div>
      )}

      {title && (
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--knomi-text-secondary)'
        }}>
          {title}
        </span>
      )}
    </header>
  );
};
