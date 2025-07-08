"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditClientPage() {
  const { clientId } = useParams();
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchClient() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/clients/${clientId}`);
        if (!res.ok) throw new Error("Failed to fetch client");
        const data = await res.json();
        setClientName(data.name);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (clientId) fetchClient();
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName }),
      });
      if (!res.ok) throw new Error("Failed to update client");
      router.push(`/clients/${clientId}`);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Edit Client</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Client Name
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value.replace(/<[^>]*>?/gm, "").trimStart())}
              required
              maxLength={100}
              placeholder="Enter client name"
              autoComplete="off"
              style={{ marginLeft: "1rem" }}
              disabled={saving}
            />
          </label>
          <button type="submit" style={{ marginLeft: "1rem" }} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
} 