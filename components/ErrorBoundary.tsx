'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
          style={{ background: 'var(--bg)' }}
          role="alert"
        >
          <AlertTriangle 
            className="w-12 h-12 mb-4" 
            style={{ color: 'var(--red)' }}
            aria-hidden="true"
          />
          <h2 
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            Algo deu errado
          </h2>
          <p 
            className="text-sm mb-6 max-w-md"
            style={{ color: 'var(--fg-muted)' }}
          >
            {this.state.error?.message || 'Ocorreu um erro inesperado. Tente novamente.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              background: 'var(--fg)', 
              color: 'white',
              border: '1px solid var(--border)'
            }}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
