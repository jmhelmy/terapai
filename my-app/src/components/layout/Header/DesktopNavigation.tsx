// src/components/layout/Header/DesktopNavigation.tsx
import React from 'react';
import { NavLink, DropdownLink } from './NavLink';
import { solutionsDropdownItems, navItems, companyDropdownItems } from './navigationData';
import styles from './Header.module.css';

interface DesktopNavigationProps {
  isCompanyDropdownOpen: boolean;
  toggleCompanyDropdown: () => void;
  companyDropdownRef: React.RefObject<HTMLDivElement | null>;
  isSolutionsDropdownOpen: boolean;
  toggleSolutionsDropdown: () => void;
  solutionsDropdownRef: React.RefObject<HTMLDivElement | null>;
  onLinkClick: () => void; // Handles closing all menus on navigation
}

export function DesktopNavigation({
  isCompanyDropdownOpen,
  toggleCompanyDropdown,
  companyDropdownRef,
  isSolutionsDropdownOpen,
  toggleSolutionsDropdown,
  solutionsDropdownRef,
  onLinkClick,
}: DesktopNavigationProps) {
  return (
    <>
      <nav className={styles.desktopNav}>
        {/* Solutions Dropdown */}
        <div className={styles.companyDropdownContainer} ref={solutionsDropdownRef}>
          <button
            type="button"
            className={styles.navLink}
            onClick={toggleSolutionsDropdown}
            aria-expanded={isSolutionsDropdownOpen}
            aria-controls="solutions-dropdown"
          >
            Solutions{' '}
            <span className={`${styles.arrow} ${isSolutionsDropdownOpen ? styles.arrowUp : ''}`}>
              &#9662;
            </span>
          </button>
          {isSolutionsDropdownOpen && (
            <div className={styles.companyDropdown} id="solutions-dropdown">
              {solutionsDropdownItems.map((item) => (
                <DropdownLink key={item.href} href={item.href} onClick={onLinkClick}>
                  {item.label}
                  {item.comingSoon && <span className={styles.comingSoonTag}> (coming soon)</span>}
                </DropdownLink>
              ))}
            </div>
          )}
        </div>

        {/* Regular Nav Items */}
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} onClick={onLinkClick}>
            {item.label}
          </NavLink>
        ))}

        {/* Company Dropdown */}
        <div className={styles.companyDropdownContainer} ref={companyDropdownRef}>
          <button
            type="button"
            className={styles.navLink}
            onClick={toggleCompanyDropdown}
            aria-expanded={isCompanyDropdownOpen}
            aria-controls="company-dropdown"
          >
            Company{' '}
            <span className={`${styles.arrow} ${isCompanyDropdownOpen ? styles.arrowUp : ''}`}>
              &#9662;
            </span>
          </button>
          {isCompanyDropdownOpen && (
            <div className={styles.companyDropdown} id="company-dropdown">
              {companyDropdownItems.map((item) => (
                <DropdownLink key={item.href} href={item.href} onClick={onLinkClick}>
                  {item.label}
                </DropdownLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className={styles.desktopAuthButtons}>
        <NavLink href="/login" onClick={onLinkClick}>
          Log In
        </NavLink>
        <NavLink href="/register" onClick={onLinkClick} className={styles.signUpButton}>
          Sign Up Free
        </NavLink>
      </div>
    </>
  );
}