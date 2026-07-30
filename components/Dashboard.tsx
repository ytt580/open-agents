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
  CheckCircle,
  ArrowUpRight
} from 'lucide-react'
import { Flow } from '@/app/dashboard/page'

interface DashboardProps {
  onNavigate: (page: string) => void
  onSelectFlow: (id: string) => void
  flows: Flow[]
}

export function Dashboard({ onNavigate, onSelectFlow, flows }: DashboardProps) {
  const currentPlan = 'free' as string
  
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Visao Geral</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Acompanhe suas automacoes</p>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ 
              background: currentPlan === 'premium' ? 'var(--accent-glow)' : 'rgba(34, 211, 238, 0.08)', 
              border: `1px solid ${currentPlan === 'premium' ? 'var(--neural-500)' : 'rgba(34, 211, 238, 0.2)'}`,
              boxShadow: currentPlan === 'premium' ? '0 0 15px var(--accent-glow)' : 'none'
            }}
          >
            {currentPlan === 'premium' ? (
              <Crown className="w-4 h-4" style={{ color: 'var(--neural-400)' }} />
            ) : (
              <Bolt className="w-4 h-4" style={{ color: 'var(--electric-400)' }} />
            )}
            <span 
              className="text-sm font-medium"
              style={{ color: currentPlan === 'premium' ? 'var(--neural-400)' : 'var(--electric-400)' }}
            >
              {currentPlan === 'premium' ? 'Premium (Kimi K3)' : 'Free (GPT-5)'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139, 92, 246, 0.12)' }}
            >
              <ClipboardList className="w-5 h-5" style={{ color: 'var(--neural-400)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Fluxos</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{flows.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(52, 211, 153, 0.12)' }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--plasma-400)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tarefas Hoje</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(34, 211, 238, 0.12)' }}
            >
              <Users className="w-5 h-5" style={{ color: 'var(--electric-400)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Leads</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(244, 114, 182, 0.12)' }}
            >
              <Zap className="w-5 h-5" style={{ color: 'var(--hot-400)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Uso IA</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                0<span className="text-sm font-normal" style={{ color: 'var(--text-tertiary)' }}>/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flows list or empty state */}
      {flows.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Seus Fluxos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flows.map((flow) => (
              <div 
                key={flow.id}
                className="card p-5 cursor-pointer group transition-all duration-300"
                onClick={() => onSelectFlow(flow.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--neural-500)'
                  e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--accent-glow)' }}
                  >
                    <Bot className="w-5 h-5" style={{ color: 'var(--neural-400)' }} />
                  </div>
                  <ArrowUpRight 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ color: 'var(--neural-400)' }}
                  />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{flow.nome}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {flow.steps.length} etapas
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Criado em {new Date(flow.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
            
            {/* New flow card */}
            <div 
              className="card p-5 cursor-pointer group transition-all duration-300 border-dashed"
              onClick={() => onNavigate('flows')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--neural-500)'
                e.currentTarget.style.background = 'var(--surface-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.background = ''
              }}
            >
              <div className="flex items-center justify-center h-full min-h-[120px]">
                <div className="text-center">
                  <Plus 
                    className="w-8 h-8 mx-auto mb-2 transition-transform group-hover:scale-110"
                    style={{ color: 'var(--neural-400)' }}
                  />
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Novo Fluxo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="card p-12 text-center"
          style={{ boxShadow: '0 0 40px var(--accent-glow)' }}
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--accent-glow)' }}
          >
            <Bot className="w-8 h-8" style={{ color: 'var(--neural-400)' }} />
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
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-6 text-left transition-all duration-300 group"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--electric-500)'
            e.currentTarget.style.boxShadow = '0 0 25px var(--cyan-glow)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ background: 'rgba(34, 211, 238, 0.12)' }}
          >
            <Globe className="w-6 h-6" style={{ color: 'var(--electric-400)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left transition-all duration-300 group"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--neural-500)'
            e.currentTarget.style.boxShadow = '0 0 25px var(--accent-glow)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ background: 'rgba(139, 92, 246, 0.12)' }}
          >
            <Puzzle className="w-6 h-6" style={{ color: 'var(--neural-400)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('api')}
          className="card p-6 text-left transition-all duration-300 group"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--hot-500)'
            e.currentTarget.style.boxShadow = '0 0 25px rgba(244, 114, 182, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ background: 'rgba(244, 114, 182, 0.12)' }}
          >
            <Zap className="w-6 h-6" style={{ color: 'var(--hot-400)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Configurar APIs</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Adicione suas chaves de API</p>
        </button>
      </div>

      {/* Plan upgrade banner */}
      {currentPlan === 'free' && (
        <div 
          className="card p-6 relative overflow-hidden"
          style={{ border: '1px solid var(--neural-500)', boxShadow: '0 0 30px var(--accent-glow)' }}
        >
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{ background: 'radial-gradient(circle, var(--neural-500) 0%, transparent 70%)' }}
          />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent-glow)' }}
              >
                <Crown className="w-6 h-6" style={{ color: 'var(--neural-400)' }} />
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
