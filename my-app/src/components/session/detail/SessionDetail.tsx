// src/components/session/detail/SessionDetail.tsx
"use client";

import { useState } from "react";
import SessionTabs from "./SessionTabs";
import TranscriptTab from "./TranscriptTab";
import SoapNotesTab from "./SoapNotesTab";

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface Session {
  id: string;
  clientName: string;
  transcript: string;    // ← was TranscriptEntry[], now a single string
  soapNote: SOAPNote;    // ← was `notes`
}

export default function SessionDetail({
  session,
  initialTab,
}: {
  session: Session;
  initialTab: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Session with {session.clientName}
      </h2>

      <SessionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ marginTop: "1rem" }}>
        {activeTab === "Notes" ? (
          <SoapNotesTab
            sessionId={session.id}
            initialSoap={session.soapNote}
          />
        ) : (
          <TranscriptTab transcript={session.transcript} />
        )}
      </div>
    </div>
  );
}
