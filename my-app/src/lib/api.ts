export async function getClient(clientId: string) {
  // TODO: Replace with Firestore or API call
  return { id: clientId, name: "Jane Doe" };
}

export async function getSessionsForClient(clientId: string) {
  // TODO: Replace with Firestore or API call
  return [
    {
      id: "s1",
      sessionDate: "2024-06-01T10:00:00Z",
      transcript: "Session 1 transcript...",
      soapNote: {
        subjective: "Subjective 1",
        objective: "Objective 1",
        assessment: "Assessment 1",
        plan: "Plan 1"
      },
      otherNotes: "Other notes 1"
    },
    {
      id: "s2",
      sessionDate: "2024-06-10T14:30:00Z",
      transcript: "Session 2 transcript...",
      soapNote: {
        subjective: "Subjective 2",
        objective: "Objective 2",
        assessment: "Assessment 2",
        plan: "Plan 2"
      },
      otherNotes: "Other notes 2"
    }
  ];
} 