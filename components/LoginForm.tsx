'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/AuthProvider'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  User
} from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot'

export function LoginForm() {
  const { signIn, signUp, resetPassword } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
    } else if (mode === 'register') {
      const { error } = await signUp(email, password)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Conta criada! Verifique seu email para confirmar.')
      }
    } else if (mode === 'forgot') {
      const { error } = await resetPassword(email)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Email de recuperação enviado!')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--terracotta)15' }}>
            <User className="w-8 h-8" style={{ color: 'var(--terracotta)' }} />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Open-Agents</h1>
          <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>Automação com IA</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {mode === 'login' && 'Entrar'}
            {mode === 'register' && 'Criar Conta'}
            {mode === 'forgot' && 'Recuperar Senha'}
          </h2>

          {error && (
            <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: 'var(--terracotta)10', border: '1px solid var(--terracotta)30' }}>
              <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--terracotta)' }} />
              <p className="text-sm" style={{ color: 'var(--terracotta-dark)' }}>{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: 'var(--sage)10', border: '1px solid var(--sage)30' }}>
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--sage)' }} />
              <p className="text-sm" style={{ color: 'var(--sage-dark)' }}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2"
              style={{ background: 'var(--terracotta)' }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'Entrar'}
                  {mode === 'register' && 'Criar Conta'}
                  {mode === 'forgot' && 'Enviar Email'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => setMode('forgot')}
                  className="text-sm block w-full"
                  style={{ color: 'var(--terracotta)' }}
                >
                  Esqueceu a senha?
                </button>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Não tem conta?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="font-medium"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    Criar agora
                  </button>
                </p>
              </>
            )}

            {mode === 'register' && (
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Já tem conta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-medium"
                  style={{ color: 'var(--terracotta)' }}
                >
                  Entrar
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-sm"
                style={{ color: 'var(--terracotta)' }}
              >
                Voltar ao login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}