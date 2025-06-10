// src/app/pricing/page.tsx
"use client";
import Link from 'next/link';
import styles from './PricingPage.module.css';

// Import your reusable Header and Footer components
import { Header } from '@/components/layout/Header/Header'; // Adjust path if necessary
import { Footer } from '@/components/layout/Footer'; // Adjust path if necessary

// Example SVG Icons (replace with your actual icons or a library)
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.featureIcon}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.headerIcon}>
    <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM8.855 4.03a.75.75 0 0 0-1.06 1.06l.955.955a.75.75 0 0 0 1.06-1.06l-.955-.955ZM12.215 5.09a.75.75 0 0 0-1.06-1.06l-.955.955a.75.75 0 1 0 1.06 1.06l.955-.955ZM10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM13.5 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
  </svg>
);


export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Starter',
      priceMonthly: '0',
      priceYearly: '0',
      description: 'Perfect for trying out TheraScript and handling a few sessions.',
      ctaText: 'Start for Free',
      ctaLink: '/register',
      features: [
        'Up to 5 sessions transcribed per month',
        'AI-generated SOAP notes',
        'Secure session recording',
        'HIPAA-compliant platform',
        'Basic email support',
      ],
      isPopular: false,
    },
    {
      name: 'Professional',
      priceMonthly: '49',
      priceYearly: '490', // Example: 2 months free
      description: 'For individual therapists managing a regular client load.',
      ctaText: 'Choose Professional',
      ctaLink: '/register?plan=professional',
      features: [
        'Up to 50 sessions transcribed per month',
        'AI-generated SOAP notes',
        'AI Clinical Advisor (Beta)',
        'Secure session recording & storage',
        'HIPAA-compliant platform',
        'Priority email support',
        'Download notes (PDF, DOCX)',
      ],
      isPopular: true,
    },
    {
      name: 'Clinic',
      priceMonthly: 'Contact Us',
      priceYearly: 'Custom',
      description: 'Tailored solutions for clinics and group practices.',
      ctaText: 'Contact Sales',
      ctaLink: '/contact-sales',
      features: [
        'Unlimited sessions transcribed',
        'All Professional features',
        'Multi-user accounts & management',
        'Team collaboration features',
        'Dedicated account manager',
        'Custom EHR integrations (coming soon)',
        'Advanced audit logs',
      ],
      isPopular: false,
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header (You might want to make this a reusable component) */}
      <Header />

      {/* Pricing Section */}
      <main className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that best fits your practice. All plans are HIPAA-compliant.</p>
        </div>

        {/* Toggle for Monthly/Yearly - Placeholder for now */}
        {/* <div className={styles.billingToggle}>
          <span>Monthly</span>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <span>Yearly (Save 20%)</span>
        </div> */}

        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`${styles.planCard} ${plan.isPopular ? styles.popularCard : ''}`}>
              {plan.isPopular && <div className={styles.popularBadge}>Most Popular</div>}
              <h2>{plan.name}</h2>
              <p className={styles.planDescription}>{plan.description}</p>
              <div className={styles.priceContainer}>
                {plan.priceMonthly === 'Contact Us' ? (
                  <span className={styles.price}>Contact Us</span>
                ) : (
                  <>
                    <span className={styles.price}>${plan.priceMonthly}</span>
                    <span className={styles.priceFrequency}>/ month</span>
                  </>
                )}
              </div>
              {plan.priceMonthly !== 'Contact Us' && plan.priceMonthly !== '0' && (
                <p className={styles.yearlyOption}>
                  Or ${plan.priceYearly}/year (Save ~16%)
                </p>
              )}

              <Link href={plan.ctaLink} className={plan.isPopular ? styles.ctaButtonPrimary : styles.ctaButtonSecondary}>
                {plan.ctaText}
              </Link>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <CheckCircleIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* FAQ Section - Placeholder */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>Is TheraScript HIPAA compliant?</h4>
            <p>Yes, TheraScript is designed with HIPAA compliance at its core. We employ end-to-end encryption, secure data storage, and follow all necessary administrative and technical safeguards. We will sign a Business Associate Agreement (BAA) with you.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Can I cancel my subscription anytime?</h4>
            <p>Yes, you can cancel your monthly or yearly subscription at any time. If you cancel, your subscription will remain active until the end of the current billing period.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>What happens if I exceed my session limit on the Starter or Professional plan?</h4>
            <p>We will notify you as you approach your limit. You can choose to upgrade your plan at any time to accommodate more sessions. For occasional overages, we may offer small top-up packages.</p>
          </div>
           <div className={styles.faqItem}>
            <h4>How does the AI Clinical Advisor work?</h4>
            <p>The AI Clinical Advisor (currently in Beta for Professional users) analyzes anonymized patterns and keywords from session transcripts to offer potential insights, suggest evidence-based interventions, or highlight areas for further exploration. It's designed as a supportive tool, not a replacement for your clinical judgment.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    
  );
}