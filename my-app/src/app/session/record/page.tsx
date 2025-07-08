// src/app/session/record/RecordSessionPageContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import StatusBanner from "@/components/session/recording/StatusBanner";
import ProgressBar from "@/components/session/recording/ProgressBar";
import Button from "@/components/Button";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useAudioProcessor } from "@/hooks/useAudioProcessor";
import { makeRandomId } from "@/utils/makeRandomId";
import styles from "./RecordSessionPage.module.css";

async function fetchClient(clientId: string, token: string) {
  if (!clientId || !token) return null;
  try {
    const res = await fetch(`/api/clients/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function RecordSessionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId] = useState(() => {
    const param = searchParams.get("sessionId");
    return param && param.length > 0 ? param : makeRandomId(24);
  });

  // Guarantee string value for clientId, or empty string
  const clientId = searchParams.get("clientId") || "";

  const { user, loading: authLoading } = useAuth();

  // --- Fetch client info from API ---
  const [client, setClient] = useState<{ firstName: string; lastName: string } | null>(null);
  const [clientName, setClientName] = useState("");
  useEffect(() => {
    if (clientId && user) {
      user.getIdToken().then((token: string) => {
        fetchClient(clientId, token).then((c) => {
          if (c) setClient(c);
        });
      });
    }
  }, [clientId, user]);

  // Update clientName automatically if we get client from API
  useEffect(() => {
    if (client) setClientName(`${client.firstName} ${client.lastName}`);
  }, [client]);

  const [hasStarted, setHasStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [didAutoProcess, setDidAutoProcess] = useState(false);

  const {
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    statusMessage: recorderStatus,
    setStatusMessage: setRecorderStatus,
  } = useAudioRecorder();

  const {
    isProcessing,
    uploadProgress,
    processAudio,
    statusMessage: processorStatus,
  } = useAudioProcessor();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleStart = () => {
    if (!clientName.trim()) {
      setRecorderStatus("Client name is required.");
      return;
    }
    setHasStarted(true);
    setStartTime(new Date());
    setDidAutoProcess(false);
    startRecording();
  };

  const handleStop = () => {
    stopRecording();
    setEndTime(new Date());
  };

  // ---- Ensure only strings passed to processAudio ----
  useEffect(() => {
    if (!isRecording && audioBlob && user && !didAutoProcess) {
      setDidAutoProcess(true);
      user.getIdToken().then((token: string) => {
        processAudio(
          audioBlob,
          user.uid,
          sessionId || "",
          clientId || "",             // Always string
          clientName || "",           // Always string
          async (success, result, noteId, errorMsg) => {
            if (success && result && noteId) {
              router.push(clientId ? `/clients/${clientId}` : "/dashboard");
            } else {
              setRecorderStatus("Audio processing failed. Please try again.");
            }
          }
        );
      });
    }
  }, [
    isRecording,
    audioBlob,
    user,
    didAutoProcess,
    processAudio,
    router,
    sessionId,
    setRecorderStatus,
    clientName,
    clientId,
  ]);

  if (authLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <p>Loading authentication…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <p>Verifying session or redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <Link href={clientId ? `/clients/${clientId}` : "/dashboard"} className={styles.backLink}>
            ← {clientId ? "Client" : "Dashboard"}
          </Link>
          <h1 className={styles.pageTitle}>Record New Session</h1>
        </div>

        {/* --- CLIENT NAME / AVATAR SECTION --- */}
        {!hasStarted && (
          <>
            {clientId ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.2rem",
                margin: "1.2rem 0 0.8rem 0"
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#eaf8fb",
                  color: "#00838f",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.07)",
                  border: "2px solid #e0eef1"
                }}>
                  {client
                    ? `${client.firstName?.[0] || ""}${client.lastName?.[0] || ""}`
                    : ""}
                </div>
                <span style={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "#00838f",
                  letterSpacing: 0.5,
                  lineHeight: 1.3
                }}>
                  {client ? `${client.firstName} ${client.lastName}` : "Loading client..."}
                </span>
              </div>
            ) : (
              <label className={styles.label} htmlFor="clientName">
                Client Name
                <input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value.replace(/<[^>]*>?/gm, "").trimStart())}
                  required
                  className={styles.input}
                  maxLength={100}
                  placeholder="Enter client name"
                  autoComplete="off"
                />
              </label>
            )}
            <p className={styles.disclaimer}>
              By proceeding to record, you confirm you&apos;ve obtained patient consent.
            </p>
          </>
        )}

        <StatusBanner
          message={
            isRecording
              ? `Recording… (${formatDuration(recordingDuration)})`
              : processorStatus || recorderStatus
          }
          baseClass={styles.statusMessage}
          successClass={styles.statusSuccess}
          errorClass={styles.statusError}
        />

        <div className={styles.controlsWrapper}>
          {!isRecording && !hasStarted && (
            <Button variant="primary" onClick={handleStart}>
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button variant="secondary" onClick={handleStop}>
              Stop Recording
            </Button>
          )}
        </div>

        {hasStarted && endTime && (
          <div className={styles.timeline}>
            {startTime?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            &nbsp;–&nbsp;
            {endTime?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            &nbsp;(Duration {formatDuration(recordingDuration)})
          </div>
        )}

        {isProcessing && <ProgressBar progress={uploadProgress} />}
      </div>
    </div>
  );
}
