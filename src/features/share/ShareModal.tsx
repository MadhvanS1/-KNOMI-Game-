import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, Share2, Copy, X, Check, MessageCircle, Instagram } from 'lucide-react';
import { PersonalityProfile } from '../../types/personality';
import { Button } from '../../components/common/Button';

interface ShareModalProps {
  personality: PersonalityProfile;
  traits: string[];
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ personality, traits, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const generateCardImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#150C0C'
      });

      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          setIsExporting(false);
          resolve(blob);
        }, 'image/png');
      });
    } catch (err) {
      console.error('Failed to generate image', err);
      setIsExporting(false);
      return null;
    }
  };

  const handleDownload = async () => {
    const blob = await generateCardImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KNOMI_Food_Personality_${personality.id}.png`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNativeShare = async () => {
    const blob = await generateCardImage();
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `KNOMI_${personality.id}.png`, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `I am ${personality.name}!`,
            text: `KNOMI Knows You decoded my food personality. What is yours?`
          });
          return;
        } catch (e) {
          console.log('Share canceled', e);
        }
      }
    }

    // Fallback to URL copy
    handleCopyLink();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`I am ${personality.name} on KNOMI Knows You! Decode your food soul: ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--knomi-bg-elevated)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          borderTop: '1px solid var(--knomi-border-strong)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--knomi-text-primary)' }}>Share Your Result Card</h3>
          <button onClick={onClose} style={{ color: 'var(--knomi-text-muted)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Hidden Card Render Canvas Target */}
        <div
          ref={cardRef}
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            background: `radial-gradient(ellipse at 50% 20%, ${personality.colors.secondary} 0%, #150C0C 85%)`,
            border: `2px solid ${personality.colors.primary}`,
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          <div style={{ fontSize: '42px', marginBottom: '8px' }}>{personality.emoji}</div>
          <span style={{ fontSize: '10px', fontWeight: 700, color: personality.colors.primary, letterSpacing: '0.1em' }}>
            KNOMI KNOWS YOU
          </span>
          <h2 style={{ fontSize: '22px', color: personality.colors.text, textTransform: 'uppercase', margin: '4px 0 8px 0' }}>
            {personality.name}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--knomi-text-secondary)', fontStyle: 'italic', marginBottom: '16px' }}>
            "{personality.tagline}"
          </p>

          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {traits.slice(0, 2).map((t, i) => (
              <div key={i} style={{ fontSize: '11px', color: 'var(--knomi-text-primary)', padding: '6px 10px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                • {t}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', fontSize: '10px', color: 'var(--knomi-text-muted)' }}>
            play.knomi.in • @knomi.in
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button fullWidth onClick={handleDownload} disabled={isExporting}>
            <Download size={18} /> {isExporting ? 'Generating Image...' : 'Save Card to Photos'}
          </Button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" style={{ flex: 1 }} onClick={handleNativeShare}>
              <Share2 size={16} /> Share...
            </Button>
            <Button variant="secondary" style={{ flex: 1 }} onClick={handleCopyLink}>
              {copied ? <Check size={16} color="#22C55E" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
