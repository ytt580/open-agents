'use client'

import { useAuth } from '@/lib/AuthProvider'
import { LogOut, User, Loader2 } from 'lucide-react'

export function UserMenu() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
        <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--text-tertiary)' }} />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--terracotta)20' }}>
          <User className="w-4 h-4" style={{ color: 'var(--terracotta)' }} />
        </div>
        <span className="text-sm font-medium truncate max-w-[120px]" style={{ color: 'var(--text-primary)' }}>
          {user.email?.split('@')[0]}
        </span>
      </div>
      <button
        onClick={signOut}
        className="p-2 rounded-xl transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
        title="Sair"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  )
}