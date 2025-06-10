// src/app/page.tsx

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.css";
import {
  ShieldCheckIcon,
  SparklesIcon,
  DocumentTextIcon,
} from "@/components/icons/Icons";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <Header />

      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Clinical Notes & Clinical Feedback using HIPAA Compliant AI
          </h1>
          <p className={styles.heroSubtitle}>
            Terapai goes beyond automated notes. We provide secure, AI-powered tools to streamline your documentation and offer clinical insights, giving you more time and confidence to focus on what matters most—your clients.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.ctaButtonPrimary}>
              Start Your Free Trial
            </Link>
            <Link href="#features" className={styles.ctaButtonSecondary}>
              Explore Features
            </Link>
          </div>
          <p className={styles.hipaaText}>
            <ShieldCheckIcon /> End-to-End HIPAA-Compliant
          </p>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="A calm and professional therapy office environment"
            width={600}
            height={750}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.pill}>Core Features</span>
          <h2>A Smarter, More Supportive Practice</h2>
          <p>Terapai is built on two pillars: unparalleled efficiency and dedicated clinical support.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <DocumentTextIcon />
            </div>
            <h3>Effortless Documentation</h3>
            <p>Transform your sessions into perfectly structured SOAP notes in minutes.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <SparklesIcon />
            </div>
            <h3>Your AI Clinical Advisor</h3>
            <p>Our AI analyzes session context to suggest interventions and improve judgment.</p>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.pill}>How It Works</span>
          <h2>Get Started in 3 Simple Steps</h2>
        </div>
        <div className={styles.howItWorksGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h4>Record Securely</h4>
            <p>Conduct your session while our encrypted tool captures the conversation.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h4>Generate & Review</h4>
            <p>One click gives you a draft SOAP note and clinical summary.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h4>Finalize & File</h4>
            <p>Edit, approve, and integrate notes into your records seamlessly.</p>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL SECTION --- */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialContent}>
          <Image
            src="https://images.pexels.com/photos/3760855/pexels-photo-3760855.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Headshot of a smiling therapist"
            width={80}
            height={80}
            className={styles.testimonialAvatar}
          />
          <blockquote>
            “Terapai has been a game-changer. The AI advisor feels like a seasoned supervisor on call.”
          </blockquote>
          <cite>Dr. Alisha Chen, PhD, LMFT</cite>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className={styles.finalCtaSection}>
        <h2>Ready to Transform Your Practice?</h2>
        <p>Join hundreds of therapists saving time, reducing burnout, and improving care.</p>
        <Link href="/register" className={styles.ctaButtonPrimary}>
          Sign Up and Start Your Free Trial Today
        </Link>
      </section>

      <Footer />
    </div>
  );
}
