// src/app/session/record/RecordSessionPageWrapper.tsx
"use client";

import React, { Suspense } from "react";
import RecordSessionPageContent from "./RecordSessionPageContent";

export default function RecordSessionPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecordSessionPageContent />
    </Suspense>
  );
}
