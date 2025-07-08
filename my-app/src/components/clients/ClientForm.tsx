import { useState } from "react";

export default function ClientForm({ initialName = "", onSubmit, submitLabel = "Save" }: {
  initialName?: string;
  onSubmit: (name: string) => void;
  submitLabel?: string;
}) {
  const [clientName, setClientName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;
    onSubmit(clientName.trim());
  };

  return (
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
        />
      </label>
      <button type="submit" style={{ marginLeft: "1rem" }}>{submitLabel}</button>
    </form>
  );
} 