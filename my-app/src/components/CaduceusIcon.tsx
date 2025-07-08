//src/components/CaduceusIcon.tsx
"use client";

import React from "react";

interface CaduceusIconProps {
  className?: string;
}

export default function CaduceusIcon({ className = "" }: CaduceusIconProps) {
  return (
    <img
      src="/hipaa.png"
      alt="HIPAA Compliant"
      className={className}
    />
  );
}
