// src/components/clients/ClientEmptyState.tsx
import Link from "next/link";

export default function ClientEmptyState({ message, showAddButton = false }: { message: string, showAddButton?: boolean }) {
  return (
    <tr>
      <td colSpan={6} style={{ textAlign: "center", padding: "2.5rem 0", color: showAddButton ? "#213650" : "#aaa" }}>
        <div>{message}</div>
        {showAddButton && (
          <div style={{ marginTop: 18 }}>
            <Link href="/clients/new">
              <button style={{
                background: "#00838f",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 9999,
                padding: "0.48rem 1.28rem",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
              }}>
                + Add Client
              </button>
            </Link>
          </div>
        )}
      </td>
    </tr>
  );
}
