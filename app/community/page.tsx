'use client'

import AppLayout from '../components/AppLayout'

export default function CommunityPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Community</h1>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-300 mb-4">
            Welcome to our community! This is where you can connect with other users, share experiences, and participate in discussions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">Forums</h2>
              <p className="text-gray-300">Join discussions and share your thoughts with the community.</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">Events</h2>
              <p className="text-gray-300">Stay updated with upcoming community events and meetups.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 