// src/app/soap-guide/page.tsx
"use client";

import React, { useState } from 'react'; // Removed unused useEffect
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './SoapPage.module.css';

// Assuming './data' exports the GuideCategory and Subtopic types.
// We are removing 'guideCategories' from this import because we define it below.
import { type GuideCategory, type Subtopic } from './data'; // Use 'type' for type-only imports if your TS version supports it well

// This is now the sole definition of guideCategories for this file.
// Optionally, you can add the type for better safety if GuideCategory from './data' matches this structure:
// const guideCategories: GuideCategory[] = [
const guideCategories = [
  // General Guides
  { name: "Introduction to SOAP Notes", slug: "introduction", isGroup: false, path: "/soap-guide" },
  { name: "How to Write SOAP Notes", slug: "how-to-write", isGroup: false, path: "/soap-guide/how-to-write" },
  { name: "AI for SOAP Note Charting", slug: "ai-soap-notes", isGroup: false, path: "/soap-guide/ai-soap-notes" },

  // Professions with specific issue examples
  {
    name: "Physical Therapy", slug: "physical-therapy", isGroup: true, path: "/soap-guide/physical-therapy",
    subtopics: [
      { name: "Low Back Pain Example", slug: "low-back-pain" },
      { name: "Knee Sprain (ACL) Example", slug: "knee-sprain-acl" },
      { name: "Rotator Cuff Tendinopathy Example", slug: "rotator-cuff-tendinopathy" },
      { name: "Post-Total Knee Replacement Example", slug: "post-tkr-rehab" },
      { name: "Neck Injury / Cervical Radiculopathy Example", slug: "neck-injury-cervical-radiculopathy" },
    ]
  },
  {
    name: "Occupational Therapy", slug: "occupational-therapy", isGroup: true, path: "/soap-guide/occupational-therapy",
    subtopics: [
      { name: "Stroke Rehab (ADL Focus) Example", slug: "stroke-rehab-adl" },
      { name: "Carpal Tunnel Syndrome Example", slug: "carpal-tunnel-syndrome" },
      { name: "Autism (Sensory & ADL) Example", slug: "autism-sensory-adl" },
      { name: "Pediatric Fine Motor Delay Example", slug: "pediatric-fine-motor-delay" },
    ]
  },
  {
    name: "Speech Language Pathology", slug: "speech-language-pathology", isGroup: true, path: "/soap-guide/speech-language-pathology",
    subtopics: [
      { name: "Dysphagia Example", slug: "dysphagia" },
      { name: "Aphasia (Post-Stroke) Example", slug: "aphasia-post-stroke" },
      { name: "Articulation Disorder Example", slug: "articulation-disorder" },
      { name: "Childhood Apraxia of Speech Example", slug: "childhood-apraxia-of-speech" },
    ]
  },
  {
    name: "Psychotherapy & Counseling", slug: "psychotherapy", isGroup: true, path: "/soap-guide/psychotherapy",
    subtopics: [
      { name: "Depression (MDD) Example", slug: "depression-mdd" },
      { name: "Anxiety (GAD) Example", slug: "anxiety-gad" },
      { name: "Substance Abuse Counseling Example", slug: "substance-abuse" },
      { name: "PTSD Example", slug: "ptsd" },
      { name: "Couples Therapy Example", slug: "couples-therapy" },
    ]
  },
  {
    name: "Veterinary Medicine", slug: "veterinary", isGroup: true, path: "/soap-guide/veterinary",
    subtopics: [
      { name: "Canine Wellness Exam Example", slug: "canine-wellness-exam" },
      { name: "Feline GI Upset Example", slug: "feline-gi-upset" },
      { name: "Canine Lameness Exam Example", slug: "canine-lameness-exam" },
      { name: "Dermatitis in Dogs Example", slug: "canine-dermatitis" },
    ]
  },
  {
    name: "Psychiatry", slug: "psychiatry", isGroup: true, path: "/soap-guide/psychiatry",
    subtopics: [
      { name: "Schizophrenia Follow-up Example", slug: "schizophrenia-follow-up" },
      { name: "Bipolar Disorder (Manic Phase) Example", slug: "bipolar-disorder-manic" },
      { name: "ADHD Assessment Example", slug: "adhd-assessment" },
      { name: "Medication Management Example", slug: "medication-management" },
    ]
  },
  {
    name: "Clinical Social Work", slug: "clinical-social-work", isGroup: true, path: "/soap-guide/clinical-social-work",
    subtopics: [
      { name: "Case Management Example", slug: "case-management" },
      { name: "Crisis Intervention Example", slug: "crisis-intervention" },
      { name: "Grief Counseling Example", slug: "grief-counseling" },
      { name: "Child Welfare Assessment Example", slug: "child-welfare-assessment" },
    ]
  },
  {
    name: "Nurse Practitioner", slug: "nurse-practitioner", isGroup: true, path: "/soap-guide/nurse-practitioner",
    subtopics: [
      { name: "Acute URI Example", slug: "acute-uri" },
      { name: "Hypertension Management Example", slug: "hypertension-management" },
      { name: "Type 2 Diabetes Follow-up Example", slug: "diabetes-type2-followup" },
      { name: "Well-Child Visit (Pediatrics) Example", slug: "well-child-visit" },
    ]
  },
  {
    name: "Physician Assistant", slug: "physician-assistant", isGroup: true, path: "/soap-guide/physician-assistant",
    subtopics: [
      { name: "Minor Laceration Repair Example", slug: "minor-laceration-repair" },
      { name: "Pre-operative H&P Example", slug: "pre-operative-hp" },
      { name: "Abdominal Pain Workup Example", slug: "abdominal-pain-workup" },
      { name: "Sports Physical Example", slug: "sports-physical" },
    ]
  },
];

export default function SoapGuideLandingPage() {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (slug: string) => {
    setExpandedGroups(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  // Determine active group or sub-topic for styling
  let currentActiveGroupSlug = "";
  let currentActiveSubSlug = "";

  const pathSegments = pathname.split('/').filter(Boolean); // e.g., ['soap-guide', 'physical-therapy', 'low-back-pain']

  // Adjusted logic to better handle base /soap-guide page and specific slugs like "introduction"
  if (pathSegments[0] === 'soap-guide') {
    if (pathSegments.length === 1) {
        // This is the base /soap-guide page. You might want to highlight "Introduction to SOAP Notes" by default
        // or handle it based on whether "introduction" is a specific slug or just the content of this page.
        // For now, let's assume if no other segment, "introduction" is implied for this page.
        // You could also set a default active slug here if needed.
    } else if (pathSegments.length === 2) {
        currentActiveGroupSlug = pathSegments[1]; // e.g., "physical-therapy" or "introduction"
    } else if (pathSegments.length >= 3) {
        currentActiveGroupSlug = pathSegments[1]; // e.g., "physical-therapy"
        currentActiveSubSlug = pathSegments.slice(1).join('/'); // e.g., "physical-therapy/low-back-pain"
    }
  }


  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>SOAP Note Guides</h2>
          <nav>
            <ul className={styles.navList}>
              {guideCategories.map((category) => (
                <li key={category.slug} className={styles.navItem}>
                  <Link
                    href={category.path}
                    // Updated active class logic:
                    // Active if it's the current group and no sub-topic is active under a *different* group,
                    // OR if it's a non-group item and its slug matches.
                    className={`${styles.navLink} ${
                        (currentActiveGroupSlug === category.slug && !currentActiveSubSlug.startsWith(category.slug + '/')) ||
                        (currentActiveGroupSlug === category.slug && !category.isGroup)
                         ? styles.navLinkActive : ''}`}
                    onClick={(e) => {
                      if (category.isGroup && category.subtopics && category.subtopics.length > 0) {
                        // e.preventDefault(); // Optional: prevent navigation if you only want to expand/collapse
                        toggleGroup(category.slug);
                      }
                    }}
                  >
                    {category.name}
                    {category.isGroup && category.subtopics && category.subtopics.length > 0 && (
                      <span className={`${styles.arrow} ${expandedGroups[category.slug] ? styles.arrowUp : ''}`}>
                        &#9662; {/* Downwards arrow, CSS will rotate if arrowUp */}
                      </span>
                    )}
                  </Link>
                  {category.isGroup && category.subtopics && expandedGroups[category.slug] && (
                    <ul className={styles.subNavList}>
                      {category.subtopics.map(subtopic => (
                        <li key={subtopic.slug} className={styles.subNavItem}>
                           <Link
                             href={`${category.path}/${subtopic.slug}`}
                             className={`${styles.subNavLink} ${currentActiveSubSlug === `${category.slug}/${subtopic.slug}` ? styles.subNavLinkActive : ''}`}
                           >
                             {subtopic.name}
                           </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={styles.contentArea}>
          {/* This main content area is for /soap-guide (Introduction) */}
          {/* Specific content for other guides will be in their respective page.tsx files */}
          <h1 className={styles.title}>Introduction to SOAP Note Guides and Examples</h1>
          <p className={styles.paragraph}>
            Welcome to our comprehensive resource hub for SOAP Note Guides and Examples, proudly powered by Terapai. Whether you're a medical student,
            seasoned healthcare professional, or therapist, mastering the art of SOAP notes is essential for effective patient care and
            thorough documentation. SOAP notes—an acronym for <strong>S</strong>ubjective, <strong>O</strong>bjective, <strong>A</strong>ssessment, and <strong>P</strong>lan—are a standardized method for
            recording patient information, ensuring consistency and clarity across the healthcare continuum.
          </p>
          <p className={styles.paragraph}>
            At Terapai, we understand the importance of accurate and efficient note-taking. This guide will walk you through the fundamentals of SOAP notes,
            explore how AI can streamline this process (see our "AI for SOAP Note Charting" guide), and provide detailed examples
            for various specializations and specific conditions.
          </p>

          <section>
            <h2 className={styles.subheading}>What Are SOAP Notes?</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Subjective (S):</strong> This section captures the patient's personal experiences, symptoms, and history as reported by them or their caregiver. It includes the chief complaint, history of present illness, relevant past medical history, family history, social history, and review of systems.
              </li>
              <li className={styles.listItem}>
                <strong>Objective (O):</strong> Here, you'll document measurable, observable, and quantifiable data. This includes physical exam findings, vital signs, laboratory results, imaging studies, and other diagnostic test results.
              </li>
              <li className={styles.listItem}>
                <strong>Assessment (A):</strong> This is where you provide your professional analysis and interpretation of the subjective and objective information. It includes your diagnosis (or differential diagnoses if the diagnosis is not yet definitive), an assessment of the patient's progress, and justification for the diagnosis.
              </li>
              <li className={styles.listItem}>
                <strong>Plan (P):</strong> The final section outlines your proposed course of action. This includes further diagnostic tests, therapeutic interventions (medications, procedures, therapies), patient education, referrals to other specialists, and follow-up instructions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.subheading}>Why Are SOAP Notes Important?</h2>
            <ol className={styles.numberedList}>
              <li className={styles.numberedListItem}>
                <strong>Consistency & Standardization:</strong> They provide a uniform structure for recording patient information, making it easier for multiple healthcare providers to follow and understand the patient's history and care plan. This promotes interdisciplinary communication.
              </li>
              <li className={styles.numberedListItem}>
                <strong>Clarity & Accuracy:</strong> By separating subjective complaints from objective findings, SOAP notes help ensure that clinical decisions are based on accurate, comprehensive, and well-organized data.
              </li>
              <li className={styles.numberedListItem}>
                <strong>Continuity of Care:</strong> Well-documented SOAP notes facilitate seamless transitions between healthcare providers and settings, enhancing patient safety and the quality of care. They provide a chronological record of the patient's journey.
              </li>
              <li className={styles.numberedListItem}>
                <strong>Legal & Billing Documentation:</strong> SOAP notes serve as legal documents that record the care provided. They are also essential for billing and reimbursement purposes, justifying the services rendered.
              </li>
              <li className={styles.numberedListItem}>
                <strong>Quality Improvement & Research:</strong> Aggregated and anonymized SOAP note data can be used for quality improvement initiatives, clinical research, and public health surveillance.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={styles.subheading}>Navigating This Guide with Terapai</h2>
            <p className={styles.paragraph}>
              Use the sidebar navigation to explore specific SOAP note guides tailored to different medical and therapeutic professions. Each section will delve into the nuances of writing SOAP notes for that particular field. You'll find practical examples, including for specific conditions like those listed under each profession, and insights into specialized areas. Discover how Terapai's AI-powered platform can assist you in creating accurate, efficient, and compliant SOAP notes for all these scenarios.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}