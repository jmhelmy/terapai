// src/components/layout/Header/NavLink.tsx
import Link from 'next/link';
import styles from './Header.module.css'; // Make sure this path is correct relative to NavLink.tsx

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({ href, children, onClick, className }: NavLinkProps) => (
  <Link
    href={href}
    className={`${styles.navLink} ${className || ''}`.trim()}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Assuming DropdownLink is also in this file, ensure its syntax is also correct.
export interface DropdownLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const DropdownLink = ({ href, children, onClick }: DropdownLinkProps) => (
  <Link href={href} className={styles.dropdownLink} onClick={onClick}>
    {children}
  </Link>
);