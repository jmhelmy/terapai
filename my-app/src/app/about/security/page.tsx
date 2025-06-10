// app/about/security/page.tsx
import React from 'react';
import { Header } from '@/components/layout/Header/Header'; // Assuming this is the correct path
import { Footer } from '@/components/layout/Footer'; // Assuming this is the correct path
import styles from './SecurityPage.module.css';

const SecurityPage = () => {
  return (
    <>
      <Header />
      <main className={styles.mainContent}> {/* Added a main wrapper for content between header/footer */}
        <div className={styles.container}>
          <header className={styles.pageHeader}> {/* Renamed from .header to avoid conflict if any global header style */}
            <h1>Our Commitment to Security</h1>
            <p className={styles.introText}>
              At Terapai, we take the security of your data very seriously.
              This page outlines the measures we implement to protect your information
              and ensure the integrity of our platform.
            </p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Encryption</h2>
            <p>
              <strong>Encryption in Transit:</strong> All data transmitted between your
              device and our servers is encrypted using HTTPS/TLS (Transport Layer
              Security). This ensures that your data is protected from eavesdropping
              or tampering during transmission.
            </p>
            <p>
              <strong>Encryption at Rest:</strong> We encrypt sensitive data stored on
              our servers using industry-standard encryption algorithms (e.g., AES-256).
              This protects your data even if physical access to the storage media
              were compromised.
            </p>
            {/* Add more specific details if applicable */}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Secure Infrastructure</h2>
            <p>
              Our infrastructure is hosted on [Your Cloud Provider, e.g., AWS, Google Cloud, Azure, or "our secure servers"].
              We leverage their robust security features, including network firewalls,
              intrusion detection/prevention systems, and regular security audits.
            </p>
            {/* Add details about specific security measures */}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Access Control</h2>
            <p>
              Access to user data within our organization is strictly limited to
              authorized personnel who require it for their job responsibilities
              (e.g., customer support, system maintenance). We employ the principle
              of least privilege.
            </p>
            <p>
              We utilize strong authentication mechanisms, including [mention MFA, SSO if applicable],
              for internal access to our systems.
            </p>
          </section>

          {/* Optional: Compliance Section */}
          {/*
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Compliance</h2>
            <p>
              We adhere to relevant data protection regulations such as [mention GDPR, CCPA, HIPAA if applicable].
              For example, if you are HIPAA compliant: "We are committed to protecting Protected Health Information (PHI)
              in accordance with HIPAA regulations. Our systems and processes are designed to ensure the confidentiality,
              integrity, and availability of PHI."
            </p>
          </section>
          */}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Ownership & Your Rights</h2>
            <p>
              You own your data. We will not sell your personal information to third parties.
              Our use of your data is limited to providing and improving our service as
              outlined in our Privacy Policy.
            </p>
            <p>
              You have the right to access, correct, or delete your personal information.
              Please refer to our Privacy Policy or contact us for more details on how to
              exercise these rights.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Vulnerability Management</h2>
            <p>
              We regularly conduct security assessments and vulnerability scans of our
              systems to identify and address potential threats. We encourage responsible
              disclosure of security vulnerabilities by security researchers.
            </p>
            {/* Mention bug bounty programs or specific contact for vulnerability disclosure if you have one */}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Incident Response</h2>
            <p>
              In the event of a security breach, we have an incident response plan in
              place designed to promptly investigate, contain, and mitigate the impact
              of the incident. We are committed to notifying affected users in
              accordance with applicable laws and regulations.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Updates to this Policy</h2>
            <p>
              We may update this security information page from time to time as our
              practices evolve or as required by law. We will post any changes on this
              page and encourage you to review it periodically.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Us</h2>
            <p>
              If you have any questions about our security practices or concerns about
              your data, please contact us at{' '}
              <a href="mailto:security@terapai.com">security@terapai.com</a>. {/* Updated email */}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SecurityPage;