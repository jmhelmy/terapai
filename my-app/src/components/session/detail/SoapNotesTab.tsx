'use client';

import { useState } from 'react';
import styles from './soapNotesTab.module.css';

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
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof SoapNote, value: string) => {
    setSoap((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soapNote: soap }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to save: ${res.status} – ${text}`);
      }

      setSaveSuccess(true);
    } catch (err: any) {
      console.error(err);
      setSaveError(err.message || 'Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {saveError && <p className={styles.error}>Error saving: {saveError}</p>}
      {saveSuccess && <p className={styles.success}>Saved!</p>}

      <section className={styles.section}>
        <h4>
          Subjective
        </h4>
        <textarea
          className={styles.textarea}
          value={soap.subjective}
          onChange={(e) => handleChange('subjective', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h4>Objective</h4>
        <textarea
          className={styles.textarea}
          value={soap.objective}
          onChange={(e) => handleChange('objective', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h4>Assessment</h4>
        <textarea
          className={styles.textarea}
          value={soap.assessment}
          onChange={(e) => handleChange('assessment', e.target.value)}
        />
      </section>

      <section className={styles.section}>
        <h4>Plan</h4>
        <textarea
          className={styles.textarea}
          value={soap.plan}
          onChange={(e) => handleChange('plan', e.target.value)}
        />
      </section>

      <div className={styles.footer}>
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
