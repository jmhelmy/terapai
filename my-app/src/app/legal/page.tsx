// src/app/legal/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './LegalAgreementPage.module.css';

export default function LegalAgreementPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    localStorage.setItem('agreedToTerms', 'true');
    router.push('/dashboard');
  };

  return (
    <>
      <Header />

      <main className={styles.legalContainer}>
        <div className={styles.card}>
          <h1 className={styles.title}>Legal Agreements</h1>
          <p className={styles.description}>
            By continuing, you agree to the following:
          </p>

          <ul className={styles.list}>
            <li>I consent to the terms of service and privacy policy.</li>
            <li>I understand and accept HIPAA compliance responsibilities.</li>
            <li>
              I acknowledge that my data will be handled in accordance with
              security best practices.
            </li>
          </ul>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <span>I have read and agree to the terms above.</span>
          </label>

          <button
            className={styles.button}
            disabled={!agreed}
            onClick={handleAgree}
          >
            Continue to Dashboard
          </button>

          {/* Simple back‐link with CSS hover instead of event props */}
          <div className={styles.backLinkContainer}>
            <Link href="/" className={styles.backLink}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
