export default function ClientSessionList({ clientId }: { clientId: string }) {
  // Placeholder session data
  const sessions = [
    { id: "s1", date: "2024-06-01", summary: "SOAP note 1" },
    { id: "s2", date: "2024-06-10", summary: "SOAP note 2" },
  ];
  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>
          <strong>{session.date}</strong>: {session.summary}
        </li>
      ))}
    </ul>
  );
} 