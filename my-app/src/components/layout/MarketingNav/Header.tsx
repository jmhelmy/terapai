"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { DesktopNavigation } from "./DesktopNavigation"; // Assuming this path is correct
import { MobileNavigation } from "./MobileNavigation"; // Assuming this path is correct
import { HamburgerButton } from "./HamburgerButton"; // Assuming this path is correct
import styles from "./Header.module.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const companyRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAllMenus = () => {
    setMobileOpen(false);
    setCompanyOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Logo on the far left */}
      <Link href="/" className={styles.logo} onClick={closeAllMenus}>
        <Image
          src="/terapai-logo.png"
          alt="Terapai Logo"
          width={36}
          height={36}
        />
        <span>Terapai</span>
      </Link>

      {/* NEW: Container for Desktop Navigation and Auth Buttons */}
      {/* This div will be a flex item of the header, and itself a flex container for its children */}
      <div className={styles.desktopNavAndAuthContainer}>
        {/* Desktop Nav links (e.g., Solutions, Pricing, Blog) */}
        <DesktopNavigation
          isCompanyDropdownOpen={companyOpen}
          toggleCompanyDropdown={() => {
            setCompanyOpen((o) => !o);
            setSolutionsOpen(false); // Close other dropdown
          }}
          companyDropdownRef={companyRef}
          isSolutionsDropdownOpen={solutionsOpen}
          toggleSolutionsDropdown={() => {
            setSolutionsOpen((o) => !o);
            setCompanyOpen(false); // Close other dropdown
          }}
          solutionsDropdownRef={solutionsRef}
          onLinkClick={closeAllMenus}
        />

        {/* Desktop Auth Buttons (Log In, Sign Up Free) */}
        <div className={styles.desktopAuthButtons}>
          <Link href="/login" className={styles.navLink} onClick={closeAllMenus}>
            Log In
          </Link>
          <Link href="/register" className={styles.signUpButton} onClick={closeAllMenus}>
            Sign Up Free
          </Link>
        </div>
      </div> {/* End of desktopNavAndAuthContainer */}

      {/* Hamburger menu button, visible only on mobile */}
      <HamburgerButton
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((o) => !o)}
      />

      {/* Mobile navigation overlay/drawer, active when mobileOpen is true */}
      <MobileNavigation
        isOpen={mobileOpen}
        toggleMenu={() => setMobileOpen((o) => !o)}
        onLinkClick={closeAllMenus}
      />
    </header>
  );
}