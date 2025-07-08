// src/components/session/detail/SessionTabs.tsx
"use client";

import styles from "./SessionTabs.module.css";

const TABS = ["Notes", "Transcript"];

export default function SessionTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <nav className={styles.tabContainer} aria-label="Session navigation tabs">
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
          onClick={() => setActiveTab(tab)}
          aria-selected={activeTab === tab}
          tabIndex={0}
          type="button"
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
