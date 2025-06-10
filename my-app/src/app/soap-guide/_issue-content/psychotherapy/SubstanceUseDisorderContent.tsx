import React from 'react';
import styles from '../../SoapPage.module.css'; // <-- CORRECTED PATH

export default function SubstanceUseDisorderContent() {
  return (
    <>
      {/* Paste the full JSX for the SUD example here (Scenario, S, O, A, P, Key Considerations) */}
      {/* For brevity, I'm not repeating the full SUD content from the previous step, but you would paste it here. */}
      <section>
        <h2 className={styles.subheading}>Patient Scenario: Substance Use Disorder (SUD) - Alcohol</h2>
        <p className={styles.paragraph}>
          <strong>Client Initials:</strong> E.F.<br />
          {/* ... rest of scenario ... */}
        </p>
      </section>
      <article>
        <h2 className={styles.subheading}>SOAP Note Example: Session 8 (SUD - Alcohol)</h2>
        {/* ... S, O, A, P sections ... */}
      </article>
      <section>
        <h2 className={styles.subheading}>Key Considerations for Documenting SUD</h2>
        {/* ... Key considerations list ... */}
      </section>
    </>
  );
}