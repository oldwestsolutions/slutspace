'use client'

import AppLayout from '../components/AppLayout'

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile information (username, profile picture)</li>
              <li>Content you create or share on the platform</li>
              <li>Payment information for premium services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Send important updates and notifications</li>
              <li>Prevent fraud and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-300">
              We use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p className="text-gray-300">
              We may use third-party services that collect, monitor, and analyze information to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Children's Privacy</h2>
            <p className="text-gray-300">
              Our services are not intended for users under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-gray-300">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@slutspace.com
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  )
} 