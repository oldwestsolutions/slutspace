'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserCircleIcon,
  BellIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  MoonIcon,
  LanguageIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

type SettingItem = 
  | { name: string; href: string; type: 'link' }
  | { name: string; toggle: boolean; setToggle: (value: boolean) => void; type: 'toggle' }
  | { name: string; value: string; setValue: (value: string) => void; options: string[]; type: 'select' }

type SettingSection = {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  items: SettingItem[]
}

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('en')

  const settings: SettingSection[] = [
    {
      title: 'Account',
      icon: UserCircleIcon,
      items: [
        { name: 'Edit Profile', href: '/profile/edit', type: 'link' },
        { name: 'Change Password', href: '/settings/password', type: 'link' },
        { name: 'Privacy Settings', href: '/settings/privacy', type: 'link' }
      ]
    },
    {
      title: 'Notifications',
      icon: BellIcon,
      items: [
        { name: 'Push Notifications', toggle: notifications, setToggle: setNotifications, type: 'toggle' },
        { name: 'Email Notifications', toggle: notifications, setToggle: setNotifications, type: 'toggle' },
        { name: 'Live Stream Alerts', toggle: notifications, setToggle: setNotifications, type: 'toggle' }
      ]
    },
    {
      title: 'Security',
      icon: ShieldCheckIcon,
      items: [
        { name: 'Two-Factor Authentication', href: '/settings/2fa', type: 'link' },
        { name: 'Login Activity', href: '/settings/activity', type: 'link' },
        { name: 'Blocked Users', href: '/settings/blocked', type: 'link' }
      ]
    },
    {
      title: 'Appearance',
      icon: MoonIcon,
      items: [
        { name: 'Dark Mode', toggle: darkMode, setToggle: setDarkMode, type: 'toggle' },
        { name: 'Language', value: language, setValue: setLanguage, options: ['en', 'es', 'fr'], type: 'select' }
      ]
    },
    {
      title: 'Support',
      icon: QuestionMarkCircleIcon,
      items: [
        { name: 'Help Center', href: '/help', type: 'link' },
        { name: 'Report a Problem', href: '/report', type: 'link' },
        { name: 'Terms of Service', href: '/terms', type: 'link' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {settings.map((section) => (
            <div key={section.title} className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <section.icon className="h-6 w-6 text-purple-500" />
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                      <span className="text-gray-300">{item.name}</span>
                      
                      {item.type === 'link' ? (
                        <a
                          href={item.href}
                          className="text-purple-500 hover:text-purple-400 transition-colors"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : item.type === 'toggle' ? (
                        <button
                          onClick={() => item.setToggle(!item.toggle)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.toggle ? 'bg-purple-500' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.toggle ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      ) : item.type === 'select' ? (
                        <select
                          value={item.value}
                          onChange={(e) => item.setValue(e.target.value)}
                          className="bg-gray-700 text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {item.options.map((option) => (
                            <option key={option} value={option}>
                              {option.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Sign Out Button */}
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
} 