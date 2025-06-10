// src/app/session/[sessionId]/error.tsx
"use client";

import React from "react";

export default function SessionError({ error }: { error: Error }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#c0392b" }}>
        Oops, something went wrong.
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        We couldn’t load that session. Try refreshing the page or come back later.
      </p>
      <pre
        style={{
          background: "#f8f8f8",
          padding: "1rem",
          borderRadius: "4px",
          fontSize: "0.85rem",
          color: "#333",
          overflowX: "auto",
        }}
      >
        {error.message}
      </pre>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "1rem",
          background: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reload
      </button>
    </div>
  );
}
