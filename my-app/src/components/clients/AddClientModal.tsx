// src/components/client/AddClientModal.tsx
"use client";

import { useState } from "react";

export interface Client {
  id: string;
  name: string;
  // add other fields if needed (e.g., notes, tags)
}

interface AddClientModalProps {
  onAdd: (client: Omit<Client, "id">) => Promise<void> | void;
  onClose: () => void;
}

export default function AddClientModal({ onAdd, onClose }: AddClientModalProps) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Client name is required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onAdd({ name: name.trim() });
      setName("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add client.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Client</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              maxLength={100}
              disabled={saving}
            />
          </label>
          {error && <div className="error">{error}</div>}
          <div className="actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .modal {
          background: #fff; padding: 2rem; border-radius: 1rem; min-width: 320px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .actions { margin-top: 1rem; display: flex; gap: 1rem; }
        .error { color: #b71c1c; margin-top: 0.5rem; }
      `}</style>
    </div>
  );
}
