'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ConsentPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setErrorMessage(null);
  };

  const handleContinueClick = async () => {
    if (!isChecked) {
      setErrorMessage('Please confirm consent by checking the box.');
      return;
    }
    if (!user) {
      setErrorMessage('Authentication required to log consent.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentVersion: 'v1.0', userId: user.uid }),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/session/record');
      } else {
        throw new Error(json.message || 'Failed to log consent.');
      }
    } catch (err: any) {
      console.error('Error logging consent:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while logging consent.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading authentication status…</div>;
  }

  if (!user) {
    return <div>Authentication required. Redirecting...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Client Consent Confirmation
        </h1>

        {/* --- Consent Text Block --- */}
        <div className="border border-gray-300 p-4 rounded-md mb-6 max-h-60 overflow-y-auto text-sm text-gray-700 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            TheraNote Client Consent Agreement (Version 1.0)
          </h2>
          <p>
            Please read this consent agreement carefully. By proceeding, you confirm that you have discussed the use
            of TheraNote's recording and note generation features with your client and have obtained their explicit
            consent.
          </p>
          <p className="font-semibold text-red-600">
            [Insert full, legally reviewed consent text here. This should cover data recording, transcription,
            summarization, storage, privacy, and HIPAA compliance details relevant to the client.]
          </p>
          <p>Key points generally covered:</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>Purpose of recording (e.g., for generating therapy notes).</li>
            <li>How recordings are processed (e.g., transcription, AI summarization).</li>
            <li>How recordings are stored (e.g., encrypted in secure cloud storage).</li>
            <li>How therapy notes are stored (e.g., encrypted in a HIPAA-compliant database).</li>
            <li>Confidentiality and privacy measures.</li>
            <li>Client's right to withdraw consent and how to do so.</li>
            <li>Data retention policies.</li>
          </ul>
          <p className="font-semibold">By checking the box below, you attest that you have:</p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>Reviewed this consent agreement with your client.</li>
            <li>Answered all their questions to their satisfaction.</li>
            <li>Confirmed their understanding and agreement to proceed using TheraNote.</li>
          </ol>
        </div>

        {/* --- Checkbox --- */}
        <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-md mb-6 bg-gray-50">
          <input
            type="checkbox"
            id="consentCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            aria-describedby="consent-description"
          />
          <label htmlFor="consentCheckbox" id="consent-description" className="text-sm text-gray-700 select-none">
            I confirm I have obtained and documented explicit consent from my client to use TheraNote for
            AI-assisted note generation for this session.
          </label>
        </div>

        {/* --- Error Message --- */}
        {errorMessage && (
          <p className="text-sm text-red-600 mb-4 text-center animate-pulse">{errorMessage}</p>
        )}

        {/* --- Continue Button --- */}
        <button
          onClick={handleContinueClick}
          disabled={!isChecked || isLoading}
          className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-colors duration-150
            ${isChecked && !isLoading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isLoading ? 'Processing…' : 'Confirm Consent & Proceed'}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Your confirmation will be logged securely.
        </p>
      </div>
    </div>
  );
}
