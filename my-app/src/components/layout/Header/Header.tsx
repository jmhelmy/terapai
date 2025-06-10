// src/components/layout/Header/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';
import { HamburgerButton } from './HamburgerButton';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);

  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // For the mobile navigation panel

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  const toggleCompanyDropdown = () => {
    setIsCompanyDropdownOpen((open) => {
      const newState = !open;
      if (newState) setIsSolutionsDropdownOpen(false); // Close other desktop dropdown
      return newState;
    });
  };

  const toggleSolutionsDropdown = () => {
    setIsSolutionsDropdownOpen((open) => {
      const newState = !open;
      if (newState) setIsCompanyDropdownOpen(false); // Close other desktop dropdown
      return newState;
    });
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsCompanyDropdownOpen(false);
    setIsSolutionsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) {
        setIsCompanyDropdownOpen(false);
      }
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(e.target as Node)) {
        setIsSolutionsDropdownOpen(false);
      }
      // Mobile menu click outside is handled by its overlay click
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} onClick={closeAllMenus}>
        <Image src="/couchicon2.png" alt="Terapai Logo" width={36} height={36} />
        <span>Terapai</span>
      </Link>

      <DesktopNavigation
        isCompanyDropdownOpen={isCompanyDropdownOpen}
        toggleCompanyDropdown={toggleCompanyDropdown}
        companyDropdownRef={companyDropdownRef}
        isSolutionsDropdownOpen={isSolutionsDropdownOpen}
        toggleSolutionsDropdown={toggleSolutionsDropdown}
        solutionsDropdownRef={solutionsDropdownRef}
        onLinkClick={closeAllMenus}
      />

      <HamburgerButton isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        toggleMenu={toggleMobileMenu}
        onLinkClick={closeAllMenus}
        menuRef={mobileMenuRef}
      />
    </header>
  );
}