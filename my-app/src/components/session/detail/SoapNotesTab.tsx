"use client";

import { useState } from "react";
import styles from "./soapNotesTab.module.css";

// Utilities
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

// Field label and copy button component
function SoapField({
  label,
  value,
  onChange,
  onCopy,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onCopy: () => void;
  placeholder?: string;
}) {
  return (
    <div className={styles.soapField}>
      <div className={styles.fieldHeader}>
        <label className={styles.label}>{label}</label>
        <button type="button" className={styles.copyBtn} onClick={onCopy}>
          Copy
        </button>
      </div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
    </div>
  );
}

interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface SoapNotesTabProps {
  sessionId: string;
  initialSoap: SoapNote;
}

export default function SoapNotesTab({ sessionId, initialSoap }: SoapNotesTabProps) {
  const [soap, setSoap] = useState<SoapNote>(initialSoap);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleChange = (field: keyof SoapNote, value: string) => {
    setSoap(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soapNote: soap }),
      });
      if (!res.ok) throw new Error(`Failed to save: ${res.status}`);
      setSaveSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Copy all fields together
  const handleCopyAll = () => {
    const all = [
      `Subjective:\n${soap.subjective}`,
      `Objective:\n${soap.objective}`,
      `Assessment:\n${soap.assessment}`,
      `Plan:\n${soap.plan}`,
    ].join("\n\n");
    copyToClipboard(all);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1400);
  };

  return (
    <form
      className={styles.soapForm}
      onSubmit={e => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div className={styles.soapHeaderRow}>
        <h2 className={styles.soapHeader}>SOAP</h2>
        <button
          type="button"
          className={styles.copyAllBtn}
          onClick={handleCopyAll}
        >
          Copy note
        </button>
        {copySuccess && <span className={styles.copyNoteSuccess}>Copied!</span>}
      </div>

      <SoapField
        label="Subjective"
        value={soap.subjective}
        onChange={v => handleChange("subjective", v)}
        onCopy={() => copyToClipboard(soap.subjective)}
        placeholder="Add Subjective note here…"
      />
      <SoapField
        label="Objective"
        value={soap.objective}
        onChange={v => handleChange("objective", v)}
        onCopy={() => copyToClipboard(soap.objective)}
        placeholder="Add Objective note here…"
      />
      <SoapField
        label="Assessment"
        value={soap.assessment}
        onChange={v => handleChange("assessment", v)}
        onCopy={() => copyToClipboard(soap.assessment)}
        placeholder="Add Assessment note here…"
      />
      <SoapField
        label="Plan"
        value={soap.plan}
        onChange={v => handleChange("plan", v)}
        onCopy={() => copyToClipboard(soap.plan)}
        placeholder="Add Plan note here…"
      />

      <div className={styles.footer}>
        <button type="submit" className={styles.saveBtn} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        {saveSuccess && <span className={styles.saved}>Saved!</span>}
      </div>
    </form>
  );
}
