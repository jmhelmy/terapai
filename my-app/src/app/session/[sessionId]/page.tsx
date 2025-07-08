"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SessionDetail from "@/components/session/detail/SessionDetail";

export default function SessionDetailPage() {
  const { sessionId } = useParams() as { sessionId: string };
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    fetch(`/api/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setSession(null);
          setError("Session not found");
        } else {
          setSession(data);
          setError(null);
        }
      })
      .catch((err) => {
        setSession(null);
        setError("Failed to load session");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error}</div>;

  // This is how you connect everything:
  return <SessionDetail session={session} />;
}
