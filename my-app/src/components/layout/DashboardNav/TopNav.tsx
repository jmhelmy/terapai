// DashboardNav/TopNav.tsx
"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./TopNav.module.css";
import ComplianceBanner from "./ComplianceBanner"; // Import it from the same folder

export default function TopNav() {
  const pathname = usePathname();

  const navActive = (path: string) =>
    pathname?.startsWith(path) ? styles.activeLink : "";

  return (
    <>
      <nav className={styles.nav}>
        {/* Left: Logo */}
        <div className={styles.brandContainer}>
          <Link href="/clients" className={styles.brand}>
            <Image
              src="/terapai-logo.png"
              alt="terapai Logo"
              width={32}
              height={32}
              priority
            />
            <span>terapai</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className={styles.menu}>
          <Link
            href="/SessionList"
            className={`${styles.link} ${navActive("/SessionList")}`}
            aria-current={pathname === "/SessionList" ? "page" : undefined}
          >
            Sessions
          </Link>
          <Link
            href="/clients"
            className={`${styles.link} ${navActive("/clients")}`}
            aria-current={pathname?.startsWith("/clients") ? "page" : undefined}
          >
            Clients
          </Link>
          <Link
            href="/reports"
            className={`${styles.link} ${navActive("/reports")}`}
            aria-current={pathname === "/reports" ? "page" : undefined}
          >
            Reports
          </Link>
        </div>

        {/* Right: My Account */}
        <div className={styles.rightControls}>
          <Link
            href="/account"
            className={`${styles.link} ${navActive("/account")}`}
            aria-current={pathname === "/account" ? "page" : undefined}
          >
            My Account
          </Link>
        </div>
      </nav>
      {/* Compliance banner always directly below */}
      <ComplianceBanner />
    </>
  );
}
