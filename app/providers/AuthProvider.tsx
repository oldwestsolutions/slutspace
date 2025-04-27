'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../../utils/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any } | undefined>
  signUp: (email: string, password: string, username: string) => Promise<{ error: any, user: any } | undefined>
  signOut: () => Promise<void>
  coinbaseUser: any | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Check if we're using placeholder credentials
const isUsingPlaceholderCredentials = 
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://example.supabase.co' ||
  !process.env.NEXT_PUBLIC_SUPABASE_URL

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [coinbaseUser, setCoinbaseUser] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      // Skip actual auth checks when using placeholder credentials
      if (isUsingPlaceholderCredentials) {
        console.warn('Using placeholder credentials. Authentication is in demo mode.')
        setLoading(false)
        return () => {}
      }

      try {
        // Only access document.cookie in browser environment
        if (isBrowser) {
          // Check for Coinbase auth cookie
          const coinbaseAuthCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('coinbase_auth='))
            ?.split('=')[1];
            
          if (coinbaseAuthCookie) {
            try {
              const coinbaseData = JSON.parse(decodeURIComponent(coinbaseAuthCookie));
              setCoinbaseUser(coinbaseData.user);
            } catch (e) {
              console.error('Failed to parse Coinbase auth cookie', e);
            }
          }
        }
      } catch (e) {
        console.error('Error checking Coinbase auth', e);
      }

      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null)
          setLoading(false)
        }
      )

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    fetchUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // In demo mode with placeholder credentials, simulate successful login
      if (isUsingPlaceholderCredentials) {
        console.warn('Auth in demo mode: Simulating successful login')
        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Return mock success result
        return { error: null }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, username: string) => {
    try {
      // In demo mode with placeholder credentials, simulate successful signup
      if (isUsingPlaceholderCredentials) {
        console.warn('Auth in demo mode: Simulating successful signup')
        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Return mock success result
        const mockUser = {
          id: 'demo-user-id',
          email,
          user_metadata: { username }
        }
        return { user: mockUser, error: null }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      })

      if (!error && data?.user) {
        // Create user profile in the database
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              username,
              email,
              avatar_url: `https://ui-avatars.com/api/?name=${username}&background=random`,
            }
          ])

        // Create wallet for the user
        if (!profileError) {
          await supabase
            .from('wallets')
            .insert([
              {
                user_id: data.user.id,
                balance: 0,
              }
            ])
        }

        return { user: data.user, error: profileError }
      }

      return { user: null, error }
    } catch (error) {
      return { user: null, error }
    }
  }

  const signOut = async () => {
    if (isUsingPlaceholderCredentials) {
      console.warn('Auth in demo mode: Simulating sign out')
      return
    }

    // Only access document.cookie in browser environment
    if (isBrowser) {
      // Clear Coinbase auth cookie
      document.cookie = 'coinbase_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
    setCoinbaseUser(null);
    
    await supabase.auth.signOut()
    
    // Redirect to login
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        coinbaseUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 