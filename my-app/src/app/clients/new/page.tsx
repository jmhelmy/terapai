"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Use this for auth!

export default function NewClientPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useAuth(); // 🔐

  function sanitize(value: string) {
    return value.replace(/<[^>]*>?/gm, "").trimStart();
  }

  function isEmailValid(email: string) {
    // Standard-ish email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both first and last name.");
      return;
    }
    if (email.trim() && !isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (phone.trim() && !/^\d{3}[- ]?\d{3}[- ]?\d{4}$/.test(phone.trim())) {
      setError("Phone number must be 10 digits (e.g. 555-123-4567).");
      return;
    }

    setLoading(true);
    try {
      // HIPAA: Auth required!
      const token = await user?.getIdToken();
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          firstName: sanitize(firstName),
          lastName: sanitize(lastName),
          email: sanitize(email),
          phone: sanitize(phone),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to create client");
      }
      router.push("/clients?refresh=1");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      padding: "2.5rem 0",
      minHeight: "100vh",
      background: "#f8fafc",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    }}>
      <div style={{
        width: 400,
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px 0 rgba(34,54,120,0.09)",
        padding: "2.5rem 2.2rem",
        marginTop: "3rem"
      }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.7rem", marginBottom: "1.5rem" }}>
          Add New Client
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500 }}>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(sanitize(e.target.value))}
                maxLength={40}
                required
                autoFocus
                style={inputStyle}
                placeholder="e.g. Jane"
                disabled={loading}
              />
            </label>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500 }}>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(sanitize(e.target.value))}
                maxLength={40}
                required
                style={inputStyle}
                placeholder="e.g. Smith"
                disabled={loading}
              />
            </label>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500 }}>
              Email (optional)
              <input
                type="email"
                value={email}
                onChange={e => setEmail(sanitize(e.target.value))}
                maxLength={64}
                style={inputStyle}
                placeholder="jane@email.com"
                disabled={loading}
              />
            </label>
          </div>
          <div style={{ marginBottom: 26 }}>
            <label style={{ fontWeight: 500 }}>
              Phone (optional)
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(sanitize(e.target.value))}
                maxLength={20}
                style={inputStyle}
                placeholder="555-123-4567"
                disabled={loading}
              />
            </label>
          </div>
          {error && (
            <div style={{ color: "#f04545", marginBottom: 12, fontWeight: 500 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem 0",
              background: "#00838f",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: 9999,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "background .17s"
            }}
            disabled={loading}
          >
            {loading ? "Adding…" : "Add Client"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  marginTop: 6,
  width: "100%",
  padding: "0.7rem 0.9rem",
  fontSize: "1rem",
  border: "1.5px solid #c3d0e3",
  borderRadius: 8,
  background: "#f9fbfd",
  fontWeight: 500,
  outline: "none",
  marginBottom: 3,
  transition: "border .14s, background .14s"
};
