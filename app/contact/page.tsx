'use client'

import { useState } from 'react'
import AppLayout from '../components/AppLayout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
        
        {/* Company Information */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">About Our Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">Our Mission</h3>
              <p className="text-gray-300 mb-4">
                We are dedicated to providing a premium platform for content creators and viewers alike, 
                fostering a safe and engaging environment for all users.
              </p>
              <h3 className="text-xl font-medium text-white mb-3">Our Values</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>User Privacy and Security</li>
                <li>Content Quality and Integrity</li>
                <li>Community Engagement</li>
                <li>Innovation and Growth</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-3">Contact Information</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="font-medium">Email:</span> support@slutspace.com
                </p>
                <p>
                  <span className="font-medium">Business Hours:</span> 9:00 AM - 6:00 PM EST
                </p>
                <p>
                  <span className="font-medium">Location:</span> New York, NY
                </p>
                <p>
                  <span className="font-medium">Support Response Time:</span> Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
} 