// src/app/soap-guide/_profession-content/PhysicalTherapyContent.tsx
import React from 'react';
import styles from '../SoapPage.module.css'; // Assuming you want to reuse styles

export default function PhysicalTherapyContent() {
  return (
    <>
      <p className={styles.paragraph}>
        In the dynamic field of physical therapy, precise and comprehensive documentation is not just a requirement but a cornerstone of quality patient care, continuity of treatment, and professional communication. SOAP notes provide a standardized framework to articulate your clinical reasoning and track patient progress effectively.
      </p>
      <p className={styles.paragraph}>
        Physical therapists utilize SOAP notes to document initial evaluations, daily treatment sessions, re-evaluations, and discharge summaries. These notes are crucial for justifying interventions, communicating with other healthcare providers, supporting billing claims, and protecting against legal liabilities.
      </p>

      <section>
        <h2 className={styles.subheading}>Key Components in Physical Therapy SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Subjective (S):</strong> Patient's self-reported symptoms, functional limitations, pain levels (using scales like NPRS or VAS), goals, concerns, and any relevant updates since the last visit. Include direct quotes when impactful.</li>
          <li className={styles.listItem}><strong>Objective (O):</strong> Measurable and observable findings. This includes goniometry, manual muscle testing (MMT) grades, range of motion (ROM), special tests performed (e.g., Lachman's, SLR), palpation findings, posture analysis, gait assessment, functional mobility tests (e.g., TUG, 6MWT), and interventions performed during the session (exercises with sets/reps, modalities with parameters, manual therapy techniques).</li>
          <li className={styles.listItem}><strong>Assessment (A):</strong> Your professional interpretation of the S & O findings. This includes summarizing the patient's progress (or lack thereof) towards goals, response to treatment, factors limiting progress, and how the impairments relate to functional deficits. Justify the continued need for skilled physical therapy services.</li>
          <li className={styles.listItem}><strong>Plan (P):</strong> Outline the plan for future sessions. This includes frequency and duration of visits, specific interventions to be continued or progressed, new interventions to be introduced, patient education provided, home exercise program (HEP) updates, and plans for re-assessment or consultation with other providers.</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.subheading}>General Tips for Effective PT SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Be Specific and Concise:</strong> Use clear, professional language and avoid jargon where possible. Quantify findings whenever you can.</li>
          <li className={styles.listItem}><strong>Document Function:</strong> Always relate impairments to functional limitations and goals. Payers and other providers want to see how your interventions are impacting the patient's ability to perform daily activities.</li>
          <li className={styles.listItem}><strong>Show Skilled Intervention:</strong> Clearly document why the skills of a therapist were required for the interventions provided.</li>
          <li className={styles.listItem}><strong>Legality and Timeliness:</strong> Ensure notes are legible, signed, dated, and completed in a timely manner.</li>
          <li className={styles.listItem}><strong>Use Terapai:</strong> Leverage Terapai to streamline the transcription and initial drafting of your SOAP notes, allowing you more time to focus on patient care.</li>
        </ul>
      </section>
    </>
  );
}