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
  Bot,
  Crown,
  Bolt,
  BarChart3,
  Users,
  CheckCircle
} from 'lucide-react'

interface DashboardProps {
  onNavigate: (page: string) => void
  onSelectFlow: (id: string) => void
}

export function Dashboard({ onNavigate, onSelectFlow }: DashboardProps) {
  const currentPlan = 'free'
  
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Visao Geral</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Acompanhe suas automacoes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ 
            background: currentPlan === 'premium' ? 'var(--accent-glow)' : 'rgba(34, 211, 238, 0.1)', 
            border: `1px solid ${currentPlan === 'premium' ? 'var(--accent)' : 'rgba(34, 211, 238, 0.3)'}`,
            boxShadow: currentPlan === 'premium' ? '0 0 15px var(--accent-glow)' : 'none'
          }}>
            {currentPlan === 'premium' ? (
              <Crown className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            ) : (
              <Bolt className="w-4 h-4" style={{ color: 'var(--cyan)' }} />
            )}
            <span className="text-sm font-medium" style={{ color: currentPlan === 'premium' ? 'var(--accent)' : 'var(--cyan)' }}>
              {currentPlan === 'premium' ? 'Premium (Kimi K3)' : 'Free (GPT-5)'}
            </span>
          </div>
          <button 
            onClick={() => onNavigate('flows')}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            Criar Fluxo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
              <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Fluxos</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6, 214, 160, 0.15)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--neon)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tarefas Hoje</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34, 211, 238, 0.15)' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--cyan)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Leads</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244, 114, 182, 0.15)' }}>
              <Zap className="w-5 h-5" style={{ color: 'var(--pink)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Uso IA</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0<span className="text-sm font-normal" style={{ color: 'var(--text-tertiary)' }}>/100</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
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

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-6 text-left transition-all duration-200 group hover:border-[var(--cyan)]"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'rgba(34, 211, 238, 0.15)' }}>
            <Globe className="w-6 h-6" style={{ color: 'var(--cyan)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left transition-all duration-200 group hover:border-[var(--accent)]"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'var(--accent-glow)' }}>
            <Puzzle className="w-6 h-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('api')}
          className="card p-6 text-left transition-all duration-200 group hover:border-[var(--pink)]"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: 'rgba(244, 114, 182, 0.15)' }}>
            <Zap className="w-6 h-6" style={{ color: 'var(--pink)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Configurar APIs</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Adicione suas chaves de API</p>
        </button>
      </div>

      {/* Plan upgrade banner */}
      {currentPlan === 'free' && (
        <div className="card p-6 relative overflow-hidden" style={{ border: '1px solid var(--accent)', boxShadow: '0 0 30px var(--accent-glow)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
                <Crown className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Upgrade para Premium</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Desbloqueie Kimi K3, agentes ilimitados, WhatsApp, API e mais</p>
              </div>
            </div>
            <button className="btn-primary">
              Ver Planos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
