'use client'

import { 
  Play, 
  Clock, 
  ArrowRight,
  Zap,
  Globe,
  Puzzle,
  TrendingUp,
  Plus,
  ClipboardList,
  Sparkles,
  Bot
} from 'lucide-react'

interface DashboardProps {
  onNavigate: (page: string) => void
  onSelectFlow: (id: string) => void
}

export function Dashboard({ onNavigate, onSelectFlow }: DashboardProps) {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Visao Geral</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Acompanhe suas automacoes</p>
        </div>
        <button 
          onClick={() => onNavigate('flows')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          Criar Fluxo
        </button>
      </div>

      <div className="card p-12 text-center" style={{ boxShadow: '0 0 40px var(--accent-glow)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-glow)' }}>
          <Bot className="w-8 h-8" style={{ color: 'var(--accent)' }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Nenhum fluxo ainda</h3>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Crie seu primeiro fluxo de automacao para comecar</p>
        <button 
          onClick={() => onNavigate('flows')}
          className="btn-primary"
        >
          <Sparkles className="w-5 h-5" />
          Criar Primeiro Fluxo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200 group"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'rgba(34, 211, 238, 0.15)' }}>
            <Globe className="w-6 h-6" style={{ color: 'var(--cyan)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200 group"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'var(--accent-glow)' }}>
            <Puzzle className="w-6 h-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('api')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200 group"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'rgba(244, 114, 182, 0.15)' }}>
            <Zap className="w-6 h-6" style={{ color: 'var(--pink)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Configurar APIs</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Adicione suas chaves de API</p>
        </button>
      </div>
    </div>
  )
}
