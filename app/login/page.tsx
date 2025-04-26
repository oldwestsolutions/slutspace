'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../providers/AuthProvider'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn(email, password)
      
      if (result?.error) {
        setError(result.error.message || 'Invalid email or password')
      } else {
        router.push('/')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCoinbaseLogin = () => {
    setIsLoading(true)
    // This will be replaced with actual Coinbase OAuth flow later
    setTimeout(() => {
      // Mock successful login
      router.push('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            slutspace
          </h1>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Coinbase Login Button */}
          <div>
            <button
              onClick={handleCoinbaseLogin}
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center">
                {/* Coinbase Logo */}
                <svg className="h-5 w-5 mr-2" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="512" cy="512" r="512" fill="white"/>
                  <path d="M516.3 188C334.6 188 188 334.6 188 516.3C188 698 334.6 844.6 516.3 844.6C698 844.6 844.6 698 844.6 516.3C844.6 334.6 698 188 516.3 188ZM516.3 735.5C394.9 735.5 297.1 637.7 297.1 516.3C297.1 394.9 394.9 297.1 516.3 297.1C637.7 297.1 735.5 394.9 735.5 516.3C735.5 637.7 637.7 735.5 516.3 735.5Z" fill="#0052FF"/>
                  <path d="M448.4 448.4H584.1C590.5 448.4 596.3 454.2 596.3 460.6V572C596.3 578.4 590.5 584.1 584.1 584.1H448.4C442 584.1 436.3 578.4 436.3 572V460.6C436.3 454.2 442 448.4 448.4 448.4Z" fill="#0052FF"/>
                </svg>
                <span>
                  {isLoading ? 'Connecting to Coinbase...' : 'Continue with Coinbase'}
                </span>
              </div>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Required for access</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 italic">
              slutspace requires Coinbase authentication for secure wallet integration.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have a Coinbase account?{' '}
            <a 
              href="https://www.coinbase.com/signup" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:text-blue-400"
            >
              Sign up with Coinbase
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 