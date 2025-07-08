"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/layout/DashboardNav/TopNav";
import { useAuth } from "@/context/AuthContext"; // If you require auth for HIPAA

const TAB_LABELS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "archived", label: "Archived" },
];

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  lastSession?: string;
  status: "active" | "archived";
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [tab, setTab] = useState<"all" | "active" | "archived">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optional: require auth for HIPAA security
  const { user } = useAuth();

  // Fetch clients from API
  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      setError(null);
      try {
        let headers: HeadersInit = { "Content-Type": "application/json" };
        // If you require auth, send Firebase ID token as Bearer token
        if (user) {
          const token = await user.getIdToken();
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch("/api/clients", { headers });
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Could not load clients.");
        setClients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, [user]);

  // Filter by tab
  const filteredClients = clients.filter(
    (c) => tab === "all" || c.status === tab
  );

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh" }}>
      <TopNav />
      <div style={{ padding: "2.5rem 2rem 1rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontWeight: 700, fontSize: "2rem", margin: 0 }}>Clients</h1>
          <Link
            href="/clients/new"
            style={{
              background: "#00838f",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 9999,
              padding: "0.5rem 1.3rem",
              fontSize: "1rem",
              boxShadow: "0 1px 5px 0 rgba(0,0,0,0.08)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            + Add Client
          </Link>
        </div>
        <div style={{ margin: "2rem 0 1rem 0", display: "flex", gap: "0.7rem" }}>
          {TAB_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              style={{
                padding: "0.35rem 1.2rem",
                borderRadius: 8,
                fontWeight: 500,
                background: tab === key ? "#e9f7fa" : "#f5f8fa",
                color: tab === key ? "#00838f" : "#213650",
                border: tab === key ? "1.5px solid #00838f" : "1.5px solid #e0e0e0",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all .18s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px 0 rgba(40,40,80,0.06)",
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={thStyle}>FIRST NAME</th>
                <th style={thStyle}>LAST NAME</th>
                <th style={thStyle}>EMAIL</th>
                <th style={thStyle}>PHONE</th>
                <th style={thStyle}>LAST SESSION DATE</th>
                <th style={{ ...thStyle, width: 42 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2.5rem 0", color: "#aaa" }}>
                    Loading clients...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2.5rem 0", color: "#f04545" }}>
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2.5rem 0", color: "#aaa" }}>
                    No clients to display.
                  </td>
                </tr>
              )}
              {!loading && !error && filteredClients.map((c) => (
                <tr
                  key={c.id}
                  style={{
                    borderTop: "1px solid #f0f1f4",
                    background: "#fff",
                    transition: "background 0.12s",
                    cursor: "pointer",
                  }}
                  onClick={() => window.location.assign(`/clients/${c.id}`)}
                >
                  <td style={tdStyle}>{c.firstName}</td>
                  <td style={tdStyle}>{c.lastName}</td>
                  <td style={tdStyle}>{c.email || <span style={{ color: "#b0b8c1" }}>—</span>}</td>
                  <td style={tdStyle}>{c.phone || <span style={{ color: "#b0b8c1" }}>—</span>}</td>
                  <td style={tdStyle}>{c.lastSession ? formatDate(c.lastSession) : <span style={{ color: "#b0b8c1" }}>—</span>}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <span style={{ color: "#b0b8c1", fontSize: "1.3rem" }}>›</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "1rem 1.2rem 1rem 1.2rem",
  textAlign: "left",
  fontWeight: 700,
  color: "#6b7280",
  fontSize: "0.95rem",
  letterSpacing: ".03em",
  borderBottom: "1px solid #f0f1f4",
  background: "#f8fafc",
};

const tdStyle: React.CSSProperties = {
  padding: "1rem 1.2rem",
  fontSize: "1.03rem",
  color: "#213650",
  background: "#fff",
  borderBottom: "1px solid #f4f4f7",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
