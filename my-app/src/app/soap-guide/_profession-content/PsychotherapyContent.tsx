// src/app/soap-guide/_profession-content/PsychotherapyContent.tsx
import React from 'react';
import styles from '../SoapPage.module.css'; // Assuming you want to reuse styles

export default function PsychotherapyContent() {
  return (
    <>
      <p className={styles.paragraph}>
        In psychotherapy and counseling, SOAP notes are an essential tool for documenting client sessions, tracking progress, formulating treatment plans, and ensuring continuity of care. They provide a structured way to record subjective experiences, objective observations, clinical assessments, and plans for future interventions, all while maintaining client confidentiality and adhering to professional ethical standards.
      </p>
      <p className={styles.paragraph}>
        Effective SOAP notes in a therapeutic context help therapists organize their thoughts, reflect on session dynamics, and make informed clinical decisions. They are also vital for insurance billing, supervision, and legal documentation.
      </p>

      <section>
        <h2 className={styles.subheading}>Key Components in Psychotherapy & Counseling SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Subjective (S):</strong> This section captures the client's perspective on their experiences, feelings, and progress since the last session. It includes their stated reason for the visit, reported symptoms (e.g., mood, anxiety levels, sleep patterns, stressors), life events, coping mechanisms, and their perception of the therapeutic process. Direct client quotes can be very powerful here.
          </li>
          <li className={styles.listItem}>
            <strong>Objective (O):</strong> This section includes the therapist's objective observations of the client during the session. This can encompass:
            <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '0.5rem' }}>
              <li>Appearance and behavior (e.g., grooming, eye contact, motor activity).</li>
              <li>Affect and mood (e.g., congruent, labile, restricted).</li>
              <li>Speech (e.g., rate, volume, coherence).</li>
              <li>Thought process and content (e.g., logical, tangential, presence of delusions or suicidal/homicidal ideation – assess risk immediately if present).</li>
              <li>Interpersonal interactions and rapport with the therapist.</li>
              <li>Results of any standardized measures or screening tools administered (e.g., PHQ-9, GAD-7 scores).</li>
              <li>Client's engagement in therapeutic activities or techniques.</li>
            </ul>
          </li>
          <li className={styles.listItem}>
            <strong>Assessment (A):</strong> The therapist's clinical analysis and interpretation of the subjective and objective information. This includes:
            <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '0.5rem' }}>
              <li>A summary of the client's current clinical status and functioning.</li>
              <li>Progress (or lack thereof) towards established treatment goals.</li>
              <li>Response to interventions and therapeutic techniques used.</li>
              <li>Changes in diagnosis or diagnostic impressions (with justification).</li>
              <li>Identification of client strengths and challenges.</li>
              <li>Risk assessment (if applicable).</li>
            </ul>
            The assessment should clearly link the observed behaviors and reported symptoms to the treatment plan and diagnosis.
          </li>
          <li className={styles.listItem}>
            <strong>Plan (P):</strong> Outline for future actions and interventions. This includes:
            <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '0.5rem' }}>
              <li>Date, time, and type of next scheduled appointment.</li>
              <li>Specific interventions or topics planned for the next session(s).</li>
              <li>Any homework or tasks assigned to the client.</li>
              <li>Referrals to other professionals or resources (if any).</li>
              <li>Modifications to the treatment plan.</li>
              <li>Any coordination of care with other providers.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 className={styles.subheading}>General Tips for Effective Psychotherapy SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Maintain Confidentiality:</strong> Adhere strictly to HIPAA and ethical guidelines regarding client privacy. Use minimal necessary information.</li>
          <li className={styles.listItem}><strong>Be Objective and Non-Judgmental:</strong> Record observations and client statements factually. Avoid personal opinions or biases.</li>
          <li className={styles.listItem}><strong>Focus on Relevance:</strong> Include information that is directly relevant to the client's diagnosis, treatment goals, and progress.</li>
          <li className={styles.listItem}><strong>Timeliness:</strong> Complete notes as soon as possible after the session while details are fresh, adhering to agency or regulatory timelines.</li>
          <li className={styles.listItem}><strong>Clarity and Conciseness:</strong> Use clear, professional language. Be thorough but avoid unnecessary verbosity.</li>
          <li className={styles.listItem}><strong>Goal-Oriented:</strong> Consistently link your notes back to the client's treatment plan and goals.</li>
          <li className={styles.listItem}><strong>Risk Assessment:</strong> Always document any assessment of risk (to self or others) and the actions taken.</li>
          <li className={styles.listItem}><strong>Use Terapai Securely:</strong> Utilize Terapai to help capture session details for drafting notes, always ensuring you review and finalize them to accurately reflect your professional assessment and plan, maintaining HIPAA compliance throughout.</li>
        </ul>
      </section>
    </>
  );
}