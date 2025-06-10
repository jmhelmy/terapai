// src/app/soap-guide/_profession-content/SpeechLanguagePathologyContent.tsx
import React from 'react';
import styles from '../SoapPage.module.css';

export default function SpeechLanguagePathologyContent() {
  return (
    <>
      <p className={styles.paragraph}>
        For Speech Language Pathologists (SLPs), SOAP notes are crucial for meticulously documenting client evaluations, treatment sessions, progress, and plans. They provide a clear, standardized format essential for tracking changes in communication, swallowing, or cognitive-linguistic skills.
      </p>
      <section>
        <h2 className={styles.subheading}>Key Components in SLP SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Subjective (S):</strong> Client's (or caregiver's) report of concerns, observations about communication/swallowing, relevant medical/social history, and progress since last session.</li>
          <li className={styles.listItem}><strong>Objective (O):</strong> Measurable and observable data from standardized tests, informal assessments, clinical observations of speech/language/swallowing tasks, accuracy percentages, cueing levels required, and specific techniques utilized during therapy.</li>
          <li className={styles.listItem}><strong>Assessment (A):</strong> SLP's analysis of subjective and objective information, interpretation of performance, progress towards goals, factors influencing progress, and updated clinical impressions or diagnoses. Justify continued skilled intervention.</li>
          <li className={styles.listItem}><strong>Plan (P):</strong> Outline for future sessions, including target goals, specific therapy activities/strategies, frequency/duration of therapy, home practice recommendations, and any planned consultations or referrals.</li>
        </ul>
      </section>
      <section>
        <h2 className={styles.subheading}>General Tips for Effective SLP SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Use specific, measurable, achievable, relevant, and time-bound (SMART) goals.</li>
          <li className={styles.listItem}>Clearly document data to support progress or lack thereof.</li>
          <li className={styles.listItem}>Use professional terminology accurately.</li>
          {/* Add more SLP specific tips */}
        </ul>
      </section>
    </>
  );
}