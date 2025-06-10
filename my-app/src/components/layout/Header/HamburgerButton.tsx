// src/components/layout/Header/HamburgerButton.tsx
'use client';
import styles from './Header.module.css';

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export function HamburgerButton({ isOpen, toggle }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className={styles.hamburgerButton}
      onClick={toggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className={styles.hamburgerBox}>
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.line1Open : ''}`} />
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.line2Open : ''}`} />
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.line3Open : ''}`} />
      </div>
    </button>
  );
}
