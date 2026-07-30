'use client'

import { usePuterAuth } from './PuterAuthProvider'
import { LogIn, LogOut, User, Loader2 } from 'lucide-react'

export function LoginButton() {
  const { user, loading, signIn, signOut, isSignedIn } = usePuterAuth()

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ color: '#a8a29e' }}>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Carregando...</span>
      </div>
    )
  }

  if (isSignedIn && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
          <User className="w-4 h-4" />
          <span className="font-semibold max-w-[120px] truncate">{user.username || user.name || 'Usuario'}</span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-[#f5f5f4]"
          style={{ color: '#78716c', border: '1px solid #e7e5e4' }}
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.03] hover:shadow-md"
      style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}
    >
      <LogIn className="w-4 h-4" />
      Entrar com Puter
    </button>
  )
}
