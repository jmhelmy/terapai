// src/components/layout/Header/MobileNavigation.tsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from './NavLink';
import { solutionsDropdownItems, navItems, companyDropdownItems } from './navigationData';
import styles from './Header.module.css';

interface MobileNavigationProps {
  isOpen: boolean;
  toggleMenu: () => void;       // For overlay click & close button
  onLinkClick: () => void;      // For navigation links, ensures all menus close
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export function MobileNavigation({
  isOpen,
  toggleMenu,
  onLinkClick,
  menuRef,
}: MobileNavigationProps) {
  // 1) Debug: show when this component mounts or updates.
  useEffect(() => {
    console.log('[MobileNavigation] render → isOpen=', isOpen);
  }, [isOpen]);

  // 2) If closed, short-circuit out (no DOM at all).
  if (!isOpen) {
    console.log('[MobileNavigation] returning null (closed)');
    return null;
  }

  // 3) If open, render an overlay + sliding menu panel.
  return (
    <>
      {/* Overlay (covers entire viewport) */}
      <div
        data-testid="mobile-nav-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,               // Temporarily bump it very high
          border: '3px solid red',    // Bright red border for debugging
        }}
        onClick={() => {
          console.log('[Overlay] clicked → toggleMenu()');
          toggleMenu();
        }}
        onTouchStart={() => {
          console.log('[Overlay] touch → toggleMenu()');
          toggleMenu();
        }}
      />

      {/* Sliding Menu Panel */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        data-testid="mobile-nav-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '80vw',
          maxWidth: '320px',
          height: '100vh',
          backgroundColor: '#ffffff',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
          zIndex: 10000,              // Panel must be above the overlay
          border: '3px solid blue',   // Bright blue border for debugging
          transform: 'translateX(0)',  // Ensure it’s “in view” (no hidden transform)
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          paddingTop: 'calc(var(--header-height, 70px) + 1rem)',
          overflowY: 'auto',
        }}
        aria-hidden={!isOpen}
        onClick={(e) => {
          e.stopPropagation();
          console.log('[Panel] inner click → e.stopPropagation()');
        }}
      >
        {/* Close button (unmodified except for debug log) */}
        <button
          type="button"
          className={styles.mobileCloseButton}
          style={{
            alignSelf: 'flex-end',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
          onClick={() => {
            console.log('[CloseButton] clicked → toggleMenu()');
            toggleMenu();
          }}
          aria-label="Close menu"
        >
          &times;
        </button>


        {/* Your nav items */}
        <div className={styles.mobileDropdownTrigger}>Solutions</div>
        {solutionsDropdownItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => {
              console.log(`[NavLink] ${item.label} clicked → onLinkClick()`);
              onLinkClick();
            }}
          >
            {item.label}
            {item.comingSoon && (
              <span className={styles.comingSoonTag}> (coming soon)</span>
            )}
          </NavLink>
        ))}

        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => {
              console.log(`[NavLink] ${item.label} clicked → onLinkClick()`);
              onLinkClick();
            }}
          >
            {item.label}
          </NavLink>
        ))}

        <div className={styles.mobileDropdownTrigger}>Company</div>
        {companyDropdownItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={() => {
              console.log(`[NavLink] ${item.label} clicked → onLinkClick()`);
              onLinkClick();
            }}
          >
            {item.label}
          </NavLink>
        ))}

        <div className={styles.mobileAuthButtons}>
          <NavLink
            href="/login"
            onClick={() => {
              console.log('[Auth] Log In clicked → onLinkClick()');
              onLinkClick();
            }}
          >
            Log In
          </NavLink>
          <NavLink
            href="/register"
            className={styles.signUpButton}
            onClick={() => {
              console.log('[Auth] Sign Up clicked → onLinkClick()');
              onLinkClick();
            }}
          >
            Sign Up Free
          </NavLink>
        </div>
      </nav>
    </>
  );
}
