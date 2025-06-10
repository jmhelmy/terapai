// src/app/dashboard/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function DashboardHeader() {
  return (
    <header className={styles.dashboardHeader}>
      <div>
        <Link href="/dashboard" className={styles.logo}>
          {/* You could use your Terapai logo or text */}
          Terapai Dashboard
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/dashboard" className={styles.navLink}>
          Sessions
        </Link>
        <Link href="/clients" className={styles.navLink}>
          Clients
        </Link>
        <Link href="/reports" className={styles.navLink}>
          Reports
        </Link>
      </nav>
      <div className={styles.userMenu}>
        {/* Example user icon or avatar */}
        <span>JH</span>
      </div>
    </header>
  );
}
