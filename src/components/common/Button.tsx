import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  disabled,
  style,
  onClick,
  ...props
}) => {
  let bg = 'var(--knomi-whiskey-sour)';
  let color = '#150C0C';
  let border = 'none';

  if (variant === 'secondary') {
    bg = 'var(--knomi-surface-card)';
    color = 'var(--knomi-text-primary)';
    border = '1px solid var(--knomi-border-strong)';
  } else if (variant === 'danger') {
    bg = '#DC2626';
    color = '#FFFFFF';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = 'var(--knomi-text-secondary)';
  }

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 24px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: disabled ? 'rgba(211, 152, 88, 0.3)' : bg,
        color: disabled ? 'rgba(246, 239, 232, 0.4)' : color,
        border,
        fontWeight: 700,
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : 'var(--shadow-card)',
        transition: 'all 0.2s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
