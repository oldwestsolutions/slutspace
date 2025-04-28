'use client'

import AppLayout from '../components/AppLayout'

export default function TermsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Terms and Conditions</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Users must be at least 18 years of age</li>
              <li>Users are responsible for maintaining the confidentiality of their account</li>
              <li>Users must not engage in any illegal activities on the platform</li>
              <li>Users must respect the rights and privacy of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Content Guidelines</h2>
            <p className="text-gray-300 mb-4">
              All content posted on the platform must comply with our community guidelines and applicable laws.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>No hate speech or discriminatory content</li>
              <li>No illegal or harmful content</li>
              <li>No spam or misleading content</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Account Termination</h2>
            <p className="text-gray-300">
              We reserve the right to terminate or suspend accounts that violate our terms of service or engage in prohibited activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Changes to Terms</h2>
            <p className="text-gray-300">
              We may modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-300">
              The platform is provided "as is" without any warranties. We are not liable for any damages arising from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
            <p className="text-gray-300">
              For questions about these terms, please contact us at legal@slutspace.com
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  )
} 