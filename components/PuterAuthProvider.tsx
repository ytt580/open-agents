'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import * as puterAI from '@/lib/puter-ai'

interface PuterAuthContextType {
  user: any | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  isSignedIn: boolean
}

const PuterAuthContext = createContext<PuterAuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  isSignedIn: false,
})

export function usePuterAuth() {
  return useContext(PuterAuthContext)
}

export function PuterAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const signedIn = await puterAI.isSignedIn()
      if (signedIn) {
        const userData = await puterAI.getUser()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(checkAuth, 500)
    return () => clearTimeout(timer)
  }, [checkAuth])

  const handleSignIn = useCallback(async () => {
    try {
      await puterAI.signIn()
      await checkAuth()
    } catch (error) {
      console.error('Puter sign in error:', error)
      throw error
    }
  }, [checkAuth])

  const handleSignOut = useCallback(async () => {
    try {
      await puterAI.signOut()
      setUser(null)
    } catch (error) {
      console.error('Puter sign out error:', error)
    }
  }, [])

  return (
    <PuterAuthContext.Provider value={{
      user,
      loading,
      signIn: handleSignIn,
      signOut: handleSignOut,
      isSignedIn: !!user,
    }}>
      {children}
    </PuterAuthContext.Provider>
  )
}
