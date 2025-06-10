"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.logo}>Terapai</p>
        <div className={styles.footerLinks}>
          <Link href="/features" className={styles.footerLink}>Features</Link>
          <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
          <Link href="/legal/terms" className={styles.footerLink}>Terms of Service</Link>
          <Link href="/legal/privacy" className={styles.footerLink}>Privacy Policy</Link>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Terapai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
