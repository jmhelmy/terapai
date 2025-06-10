

import React from 'react';
// Import your reusable Header and Footer components
import { Header } from '@/components/layout/Header/Header'; // Adjust path if necessary
import { Footer } from '@/components/layout/Footer'; // Adjust path if necessary

<Header />
export default function TermsPage() {
  return (
    <>
    <Header />
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

      <p className="mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        By using TheraScript, you agree to the following terms:
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Intended Use</h2>
      <p className="mb-4">
        TheraScript is an AI-powered tool designed to help therapists document session summaries. It is not a medical device and is not intended for clinical decision-making.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Consent Requirement</h2>
      <p className="mb-4">
        By starting a recording, you confirm you have obtained informed consent from your patient.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Responsibility</h2>
      <p className="mb-4">
        You are responsible for ensuring that any content you record, upload, or generate complies with applicable privacy and confidentiality laws.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Availability and Downtime</h2>
      <p className="mb-4">
        We strive for high uptime, but the service may be unavailable during maintenance or due to unexpected outages.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Account Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate accounts for misuse, abuse, or violation of these terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. No Warranty</h2>
      <p className="mb-4">
        The service is provided \"as is\" without warranties of any kind, either express or implied. Use at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Liability</h2>
      <p className="mb-4">
        We are not liable for any damages resulting from your use or inability to use the service, including but not limited to data loss or breaches.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Changes to Terms</h2>
      <p className="mb-4">
        We may modify these terms at any time. Continued use of the service implies acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p className="mb-4">
        Questions? Email us at: [Insert Contact Email]
      </p>
    </main>
    <Footer />
    </>
  );
}
