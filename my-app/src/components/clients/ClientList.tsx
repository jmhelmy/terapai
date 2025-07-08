"use client";

import React from "react";
import ClientCard from "./ClientCard"; // or use a table row component if you want tabular layout

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  lastSession?: string;
  status?: "active" | "archived";
}

type Props = {
  clients: Client[];
  loading: boolean;
  error: string | null;
  onClientClick: (id: string) => void;
};

export default function ClientList({ clients, loading, error, onClientClick }: Props) {
  if (loading) {
    return <div style={{ textAlign: "center", padding: "2.5rem" }}>Loading clients...</div>;
  }

  if (error) {
    return <div style={{ color: "#f04545", textAlign: "center", padding: "2.5rem" }}>{error}</div>;
  }

  if (!clients.length) {
    return (
      <div style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem" }}>
        No clients to display.<br />
        <a href="/clients/new" style={{
          marginTop: "1.3rem",
          display: "inline-block",
          background: "#00838f",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 9999,
          padding: "0.5rem 1.3rem",
          fontSize: "1rem",
          boxShadow: "0 1px 5px 0 rgba(0,0,0,0.08)",
          textDecoration: "none"
        }}>
          + Add Client
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1.3rem" }}>
      {clients.map(client => (
        <ClientCard key={client.id} client={client} onClick={() => onClientClick(client.id)} />
      ))}
    </div>
  );
}
