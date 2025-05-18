'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setShowModal(true);
    } else {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
    setIsVerified(true);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <>
      {!isVerified && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Age Verification Required</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You must be 18 years or older to access this website. By clicking "I am 18 or older", you confirm that you meet this requirement.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleVerify}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                I am 18 or older
              </button>
              <button
                onClick={handleDecline}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
              >
                I am under 18
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 