"use client";
import { useState } from "react";
import styles from "./SessionDetail.module.css";
import SessionTabs from "@/components/session/detail/SessionTabs";
import SoapNotesTab from "@/components/session/detail/SoapNotesTab";
import TranscriptTab from "@/components/session/detail/TranscriptTab";
import TopNav from "@/components/layout/DashboardNav/TopNav";

interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface Session {
  id: string;
  clientInitials?: string;
  sessionDate?: string;
  transcript?: string;
  soapNote: SoapNote;
  duration?: string;
}

interface Props {
  session: Session | null | undefined;
  initialTab?: string;
}

export default function SessionDetail({ session, initialTab = "Notes" }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!session) {
    // This should never trigger if you handle errors in the page, but it's safe to keep.
    return (
      <div>
        <TopNav />
        <div className={styles.pageContainer}>
          <main className={styles.mainContent}>
            <div style={{ margin: "3rem auto", textAlign: "center", color: "#b00" }}>
              <b>Session not found.</b>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const {
    clientInitials,
    sessionDate,
    transcript,
    soapNote,
    duration = "N/A",
  } = session;

  return (
    <div>
      <TopNav />
      <div className={styles.pageContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Client:</div>
            <div className={styles.sidebarValue}>{clientInitials}</div>
          </div>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Date:</div>
            <div className={styles.sidebarValue}>
              {sessionDate ? new Date(sessionDate).toLocaleString() : "—"}
            </div>
          </div>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle}>Duration:</div>
            <div className={styles.sidebarValue}>{duration}</div>
          </div>
        </aside>
        <main className={styles.mainContent}>
          <SessionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "Notes" && soapNote && (
            <SoapNotesTab
              sessionId={session.id}
              initialSoap={soapNote}
              showCopyButtons={true}
            />
          )}
          {activeTab === "Transcript" && (
            <TranscriptTab transcript={transcript || ""} />
          )}
        </main>
      </div>
    </div>
  );
}
