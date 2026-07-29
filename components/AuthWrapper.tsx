'use client'

import { useAuth } from '@/lib/AuthProvider'
import { LoginForm } from './LoginForm'
import { Loader2 } from 'lucide-react'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: 'var(--terracotta)' }} />
          <p style={{ color: 'var(--text-tertiary)' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <>{children}</>
}