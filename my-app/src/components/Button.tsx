'use client';

import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary' ? styles.primary : styles.secondary;
  return (
    <button
      className={`${styles.base} ${variantClass} ${className}`}
      {...props}
    />
  );
}
