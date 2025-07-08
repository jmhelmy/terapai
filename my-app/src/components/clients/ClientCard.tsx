// src/components/client/ClientCard.tsx
import React from "react";
import { Client } from "../clients/AddClientModal";

interface ClientCardProps {
  client: Client;
  onClick: (clientId: string) => void;
}

export default function ClientCard({ client, onClick }: ClientCardProps) {
  return (
    <div
      onClick={() => onClick(client.id)}
      style={{
        background: "#f6f8fa",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        margin: "0.5rem 0",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open client ${client.name}`}
    >
      <strong>{client.name}</strong>
    </div>
  );
}
