"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TopNav from "@/components/layout/DashboardNav/TopNav";
import ClientSessionList from "@/components/clients/ClientSessionList";
import { useAuth } from "@/context/AuthContext"; // <-- IMPORTANT!
import styles from "./ClientDetailPage.module.css";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ClientSession {
  id: string;
  date: string; // ISO format
  summary: string;
  durationMinutes?: number;
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth(); // <-- Get the user!
  const clientId = Array.isArray(params.clientId)
    ? params.clientId[0]
    : params.clientId;

  const [client, setClient] = useState<Client | null>(null);
  const [sessions, setSessions] = useState<ClientSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId || !user) return;

    setLoading(true);

    async function fetchData() {
      try {
        const token = await user.getIdToken();

        // Fetch client details
        const clientRes = await fetch(`/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!clientRes.ok) throw new Error("Failed to load client");
        const clientData = await clientRes.json();
        setClient(clientData);

        // Fetch sessions for this client
        const sessionRes = await fetch(`/api/clients/${clientId}/sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!sessionRes.ok) throw new Error("Failed to load sessions");
        const sessionData = await sessionRes.json();
        setSessions(sessionData);
      } catch (e) {
        setClient(null);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [clientId, user]);

  const handleSessionClick = (sessionId: string) => {
    router.push(`/session/${sessionId}`);
  };

  return (
    <>
      <TopNav />
      <div className={styles.wrapper}>
        {loading ? (
          <div className={styles.loading}>Loading client info…</div>
        ) : !client ? (
          <div className={styles.loading}>Client not found.</div>
        ) : (
          <>
            <div className={styles.clientHeader}>
              <div className={styles.avatar}>
                {client.firstName?.[0]}
                {client.lastName?.[0]}
              </div>
              <div>
                <h1 className={styles.name}>
                  {client.firstName} {client.lastName}
                </h1>
                <div className={styles.email}>
                  <b>Email:</b> {client.email || <span style={{color: "#aaa"}}>—</span>}
                </div>
              </div>
            </div>
            <div className={styles.recordBtnRow}>
              <Link
                href={`/session/record?clientId=${clientId}`}
                className={styles.recordBtn}
              >
                + Record New Session
              </Link>
            </div>
            <h2 className={styles.sessionTitle}>
              Sessions <span className={styles.sessionCount}>({sessions.length})</span>
            </h2>
            <div className={styles.sessionList}>
              <ClientSessionList
                sessions={sessions}
                onSessionClick={handleSessionClick}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
