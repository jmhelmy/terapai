// src/components/session/recording/StatusBanner.tsx
'use client';

import React from 'react';
import defaultStyles from './StatusBanner.module.css'; // Styles local to StatusBanner

interface StatusBannerProps {
  message?: string;
  baseClass?: string;      // Optional override for main container class
  successClass?: string;   // Optional override for success styling
  errorClass?: string;     // Optional override for error styling
}

export default function StatusBanner({
  message,
  baseClass,
  successClass,
  errorClass
}: StatusBannerProps) {
  if (!message) return null;

  const isError =
    message.toLowerCase().includes('error') ||
    message.toLowerCase().includes('failed');

  const containerClass = baseClass || defaultStyles.container;
  const conditionalClass = isError
    ? (errorClass || defaultStyles.error)
    : (successClass || defaultStyles.success);

  return (
    <div className={`${containerClass} ${conditionalClass}`} role="status">
      {message}
    </div>
  );
}
