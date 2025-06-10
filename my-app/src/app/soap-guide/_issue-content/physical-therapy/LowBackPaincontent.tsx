// src/app/soap-guide/_issue-content/physical-therapy/LowBackPainContent.tsx
import React from 'react';
import styles from '../../SoapPage.module.css'; // <-- CORRECTED PATH

export default function LowBackPainContent() {
  return (
    <>
      <section>
        <h2 className={styles.subheading}>Patient Scenario: Low Back Pain</h2>
        <p className={styles.paragraph}>
          <strong>Patient:</strong> Sarah Miller<br />
          <strong>Age:</strong> 38-year-old female<br />
          <strong>Occupation:</strong> Office Manager<br />
          <strong>Referral:</strong> Physician referral for evaluation and treatment of low back pain.<br />
          <strong>Date of Initial Evaluation:</strong> [Insert Date]
        </p>
        <p className={styles.paragraph}>
          Sarah reports a 6-week history of intermittent, dull aching pain in her lower back (L4-L5 region), rated 4/10 on NPRS at rest, increasing to 7/10 with prolonged sitting, bending, and lifting. Pain occasionally radiates to the R buttock but not down the leg. Symptoms began after a weekend of heavy gardening...
        </p>
      </section>
      <article>
        <h2 className={styles.subheading}>SOAP Note Example: Initial Evaluation (Low Back Pain)</h2>
        <section>
          <h3 className={styles.sectionSubSubHeading}>Subjective (S)</h3>
          <div className={styles.soapSectionContent}>
            <p>Pt. is a 38 y.o. female office manager presenting with c/o LBP x 6 weeks, described as dull ache, rated 4/10 at rest, 7/10 with prolonged sitting, bending, lifting. Occasional radiation to R buttock, no LE radiculopathy. Onset after heavy gardening. Relief with supine rest, heat. Partial relief with OTC NSAIDs. Prior LBP episode 2 yrs ago resolved with PT. Goals: ↓ pain, tolerate sitting for 8-hr workday, return to gardening.</p>
          </div>
        </section>
        {/* ... Rest of S, O, A, P sections for Low Back Pain ... */}
        <section>
          <h3 className={styles.sectionSubSubHeading}>Objective (O)</h3>
          <div className={styles.soapSectionContent}>
            <p><strong>Observation:</strong> Alert, cooperative. Antalgic gait noted with slight R trunk lean during stance phase. Posture: Mild anterior pelvic tilt, increased lumbar lordosis.</p>
            <p><strong>Lumbar ROM:</strong> Flexion limited to 50% norm with pain at end range. Extension limited to 25% norm with central LBP. L SB 20°, R SB 15°, both with ipsilateral LBP. Rotation WNL but c/o stiffness.</p>
            <p><strong>Strength (MMT):</strong> Core strength (transverse abdominis, multifidus) assessed as weak/poor activation. Gluteus medius 4/5 bilaterally. Hamstrings 4+/5 bilaterally. LE strength otherwise WFL.</p>
            <p><strong>Special Tests:</strong> (+) Prone Instability Test. (-) SLR bilaterally. (+) FABER test R for posterior hip/SIJ pain. Palpation: Tenderness and increased tone L lumbar paraspinals, L QL.</p>
            <p><strong>Functional:</strong> Sit-to-stand x5 reps c/o LBP. Difficulty maintaining neutral spine during forward bend simulation.</p>
          </div>
        </section>
        <section>
          <h3 className={styles.sectionSubSubHeading}>Assessment (A)</h3>
          <div className={styles.soapSectionContent}>
            <p>Patient presents with symptoms and findings consistent with mechanical low back pain, likely with associated lumbar segmental instability and muscular imbalances. Impairments in lumbar ROM, core/gluteal strength, and postural deviations contribute to functional limitations in sitting, bending, and lifting. Good candidate for skilled PT to address pain, restore function, and improve body mechanics. Positive prognostic indicators include motivation and prior success with PT.</p>
          </div>
        </section>
        <section>
          <h3 className={styles.sectionSubSubHeading}>Plan (P)</h3>
          <div className={styles.soapSectionContent}>
            <p>1. Continue skilled PT 2x/week for 6 weeks.</p>
            <p>2. Interventions: Manual therapy (soft tissue mob, joint mob as indicated), therapeutic exercise (core stabilization, gluteal strengthening, flexibility for hip flexors/hamstrings), neuromuscular re-education for proper body mechanics and lifting techniques, modalities for pain (e.g., heat/ice as appropriate).</p>
            <p>3. Patient Education: Pain science, activity modification, postural correction, body mechanics for ADLs and work tasks.</p>
            <p>4. HEP: Instruction in core activation, pelvic tilts, glute sets, gentle stretches. To be performed 1-2x/daily.</p>
            <p>5. Goals (STG - 2 weeks): ↓ pain to ≤3/10. Tolerate sitting for 1 hr cued. Demonstrate proper squat technique. (LTG - 6 weeks): Pain 0-1/10. Return to full work duties and gardening without pain. Independent with HEP.</p>
            <p>6. Re-assess functional outcome measures (e.g., Oswestry Disability Index) in 2 weeks.</p>
          </div>
        </section>
      </article>
      <section>
        <h2 className={styles.subheading}>Key Considerations for Low Back Pain SOAP Notes</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Document specific aggravating and easing factors.</li>
          {/* ... Rest of Key Considerations ... */}
          <li className={styles.listItem}>Quantify pain using a standardized scale (NPRS, VAS).</li>
          <li className={styles.listItem}>Include results of specific lumbar special tests and their interpretation.</li>
          <li className={styles.listItem}>Clearly link objective impairments to functional limitations.</li>
          <li className={styles.listItem}>Detail patient education provided, especially on body mechanics and self-management.</li>
        </ul>
      </section>
    </>
  );
}