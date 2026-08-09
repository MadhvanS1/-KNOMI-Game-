import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { PERSONALITIES } from '../../data/personalities';
import { useResultStore } from '../../stores/useResultStore';
import { Share2, Check } from 'lucide-react';

export const FoodResumePage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const username = 'madhvan';

  const { personality: activePersonality, dimensionScores: activeDimensions } = useResultStore();
  const personality = activePersonality || PERSONALITIES['comfort-loyalist'];

  const resumeUrl = `https://knomi.in/me/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0 20px 40px 20px' }}>
      <Header showBack title="🏆 The Food Resume" />

      {/* Hero Badge Card */}
      <div style={{
        marginTop: '16px',
        padding: '24px 20px',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--knomi-surface-card)',
        border: '1px solid var(--knomi-border-strong)',
        boxShadow: 'var(--shadow-card)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          backgroundColor: personality.colors.primary
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(211, 152, 88, 0.15)',
          color: 'var(--knomi-whiskey-sour)',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          PERMANENT VANITY LINK
        </div>

        <h2 style={{ fontSize: '26px', color: 'var(--knomi-text-primary)', marginBottom: '4px' }}>
          knomi.in/me/<span style={{ color: 'var(--knomi-whiskey-sour)' }}>{username}</span>
        </h2>

        <div style={{ fontSize: '48px', margin: '16px 0 8px 0' }}>
          {personality.emoji}
        </div>

        <h3 style={{ fontSize: '22px', color: personality.colors.primary, marginBottom: '6px' }}>
          {personality.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--knomi-text-secondary)', maxWidth: '300px', margin: '0 auto 20px auto', lineHeight: 1.4 }}>
          "{personality.tagline}"
        </p>

        {/* Dimension Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'var(--knomi-text-muted)', display: 'block' }}>SPICE TOLERANCE</span>
            <strong style={{ fontSize: '15px', color: 'var(--knomi-text-primary)' }}>{activeDimensions?.spice || 85}%</strong>
          </div>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'var(--knomi-text-muted)', display: 'block' }}>COMFORT RATING</span>
            <strong style={{ fontSize: '15px', color: 'var(--knomi-text-primary)' }}>{activeDimensions?.comfort || 92}%</strong>
          </div>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'var(--knomi-text-muted)', display: 'block' }}>ADVENTURE SCORE</span>
            <strong style={{ fontSize: '15px', color: 'var(--knomi-text-primary)' }}>{activeDimensions?.adventure || 78}%</strong>
          </div>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'var(--knomi-text-muted)', display: 'block' }}>SOCIAL FEEDER</span>
            <strong style={{ fontSize: '15px', color: 'var(--knomi-text-primary)' }}>{activeDimensions?.social || 88}%</strong>
          </div>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: copied ? '#00FF88' : 'var(--knomi-whiskey-sour)',
            color: '#150C0C',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          {copied ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span>COPIED TO CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Share2 size={18} />
              <span>COPY FOOD RESUME LINK</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
