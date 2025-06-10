// src/app/faq/page.tsx
"use client"; // If you plan to add interactive elements like accordions later

import React from 'react';
import { Header } from '@/components/layout/Header/Header'; // Adjust path if necessary
import { Footer } from '@/components/layout/Footer'; // Adjust path if necessary
import styles from './FaqPage.module.css';

const faqs = [
  {
    question: "How does the billing cycle work?",
    answer: "Billing occurs on a 30-day recurring basis for subscribed plans."
  },
  {
    question: "Will Terapai handle everything for me?",
    answer: "Terapai automates the majority of note-taking tasks; however, it's not perfect. It's important to review your notes before adding them to your EMR or official records to ensure accuracy."
  },
  {
    question: "Who can benefit from using Terapai?",
    answer: "Terapai is primarily designed for Mental Health Professionals, including therapists, counselors, psychologists, and social workers."
  },
  {
    question: "Can Terapai be used effectively in telehealth sessions?",
    answer: "Yes, Terapai is compatible with telehealth sessions as long as it can clearly pick up audio from both the practitioner and the client (e.g., via computer speakers or microphone input)."
  },
  {
    question: "Is there EMR system integration available?",
    answer: "Integration with EMR systems is a priority and currently in progress. We actively encourage feedback on desired features to help us focus on integrating with your preferred EMR."
  },
  {
    question: "What are the compatible devices for using Terapai?",
    answer: "Terapai is accessible via our web application on all major platforms, including desktops, laptops, and tablets with a modern web browser."
  },
  {
    question: "How long does Terapai retain audio recordings?",
    answer: "We prioritize your privacy and data security. Terapai is designed to immediately delete all audio files after sessions have been successfully processed and notes are generated. Once your notes are generated, the original audio recordings are permanently removed from our systems."
  },
  {
    question: "Is my data HIPAA compliant?",
    answer: "Yes, Terapai is fully HIPAA compliant. All data, including any temporary audio recordings, notes, and other sensitive information, are encrypted both in transit and at rest. We employ state-of-the-art security measures to protect your data and maintain strict access controls. We are prepared to sign a Business Associate Agreement (BAA)."
  },
  {
    question: "Do I need to inform my clients that I'm using Terapai?",
    answer: "Yes, it's a best practice and often a requirement to inform your clients that you're using a secure, HIPAA-compliant note-taking assistant like Terapai. Transparency helps maintain trust and ensures clients are aware of how their session information is being processed. Ensure you obtain any necessary consent as per your professional guidelines and local regulations."
  },
  {
    question: "What happens if I lose internet connection during a session?",
    answer: "Terapai's recording feature is designed to be resilient. If a temporary internet disruption occurs, the system will attempt to save your recording locally (in your browser's memory) and resume uploading or processing when the connection is restored. However, for the best experience and to ensure no data is lost, a stable internet connection is recommended when starting and during a session."
  },
  {
    question: "Can I edit my notes after they're generated?",
    answer: "Yes, absolutely. You can review and edit all AI-generated notes before finalizing them. We strongly recommend reviewing all content for accuracy and completeness before adding it to your official client records or EMR system."
  }
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.intro}>
          Find answers to the most common questions about Terapai. If you don't find your answer here, feel free to contact us.
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h2 className={styles.faqQuestion}>{faq.question}</h2>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}