'use client'

import { 
  Clock, ArrowRight, Zap, Globe, Puzzle,
  Plus, Bot, Crown, BarChart3, Users,
  CheckCircle, ArrowUpRight, Terminal
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
    <div className="p-5 md:p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Visao Geral</h1>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>Acompanhe suas automacoes</p>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ 
              background: currentPlan === 'premium' ? 'var(--accent-glow)' : 'rgba(34, 211, 238, 0.06)', 
              border: `1px solid ${currentPlan === 'premium' ? 'var(--violet-500)' : 'rgba(34, 211, 238, 0.15)'}`
            }}
          >
            {currentPlan === 'premium' ? (
              <Crown className="w-3.5 h-3.5" style={{ color: 'var(--violet-400)' }} />
            ) : (
              <Zap className="w-3.5 h-3.5" style={{ color: 'var(--cyan-400)' }} />
            )}
            <span style={{ color: currentPlan === 'premium' ? 'var(--violet-400)' : 'var(--cyan-400)' }}>
              {currentPlan === 'premium' ? 'Premium (Kimi K3)' : 'Free (GPT-4o)'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="card p-4 transition-all duration-200 hover:border-[var(--violet-500)]">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(139, 92, 246, 0.08)' }}
            >
              <BarChart3 className="w-4 h-4" style={{ color: 'var(--violet-400)' }} />
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Fluxos</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{flows.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4 transition-all duration-200 hover:border-[var(--emerald-500)]">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(52, 211, 153, 0.08)' }}
            >
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--emerald-400)' }} />
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Tarefas Hoje</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-4 transition-all duration-200 hover:border-[var(--cyan-500)]">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(34, 211, 238, 0.08)' }}
            >
              <Users className="w-4 h-4" style={{ color: 'var(--cyan-400)' }} />
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Leads</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-4 transition-all duration-200 hover:border-[var(--rose-500)]">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(244, 63, 94, 0.08)' }}
            >
              <Terminal className="w-4 h-4" style={{ color: 'var(--rose-400)' }} />
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Uso IA</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                0<span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flows list or empty state */}
      {flows.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Seus Fluxos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {flows.map((flow) => (
              <div 
                key={flow.id}
                className="card p-4 cursor-pointer group transition-all duration-200 hover:border-[var(--violet-500)]"
                onClick={() => onSelectFlow(flow.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectFlow(flow.id)}
                aria-label={`Abrir fluxo ${flow.nome}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--accent-glow)' }}
                  >
                    <Bot className="w-4 h-4" style={{ color: 'var(--violet-400)' }} />
                  </div>
                  <ArrowUpRight 
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-150"
                    style={{ color: 'var(--violet-400)' }}
                  />
                </div>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{flow.nome}</h3>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                  {flow.steps.length} etapas
                </p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  Criado em {new Date(flow.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
            
            {/* New flow card */}
            <div 
              className="card p-4 cursor-pointer group transition-all duration-200 border-dashed hover:border-[var(--violet-500)]"
              onClick={() => onNavigate('flows')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('flows')}
              aria-label="Criar novo fluxo"
            >
              <div className="flex items-center justify-center h-full min-h-[100px]">
                <div className="text-center">
                  <Plus 
                    className="w-7 h-7 mx-auto mb-2 transition-transform duration-200 group-hover:scale-105"
                    style={{ color: 'var(--violet-400)' }}
                  />
                  <p className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>Novo Fluxo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="card p-8 md:p-10 text-center"
          style={{ boxShadow: '0 0 30px var(--accent-glow)' }}
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--accent-glow)' }}
          >
            <Bot className="w-7 h-7" style={{ color: 'var(--violet-400)' }} />
          </div>
          <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Nenhum fluxo ainda</h3>
          <p className="mb-5 text-xs" style={{ color: 'var(--text-tertiary)' }}>Crie seu primeiro fluxo de automacao para comecar</p>
          <button 
            onClick={() => onNavigate('flows')}
            className="btn-primary text-sm"
            aria-label="Criar primeiro fluxo"
          >
            <Terminal className="w-4 h-4" />
            <span>Criar Primeiro Fluxo</span>
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-4 text-left transition-all duration-200 group hover:border-[var(--cyan-500)]"
          aria-label="Abrir navegador"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'rgba(34, 211, 238, 0.08)' }}
          >
            <Globe className="w-5 h-5" style={{ color: 'var(--cyan-400)' }} />
          </div>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-4 text-left transition-all duration-200 group hover:border-[var(--violet-500)]"
          aria-label="Gerenciar skills"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'rgba(139, 92, 246, 0.08)' }}
          >
            <Puzzle className="w-5 h-5" style={{ color: 'var(--violet-400)' }} />
          </div>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('api')}
          className="card p-4 text-left transition-all duration-200 group hover:border-[var(--rose-500)]"
          aria-label="Configurar APIs"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'rgba(244, 63, 94, 0.08)' }}
          >
            <Zap className="w-5 h-5" style={{ color: 'var(--rose-400)' }} />
          </div>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Configurar APIs</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Adicione suas chaves de API</p>
        </button>
      </div>

      {/* Plan upgrade banner */}
      {currentPlan === 'free' && (
        <div 
          className="card p-4 relative overflow-hidden transition-all duration-200 hover:shadow-lg"
          style={{ border: '1px solid var(--violet-500)', boxShadow: '0 0 25px var(--accent-glow)' }}
        >
          <div 
            className="absolute top-0 right-0 w-56 h-56 opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, var(--violet-500) 0%, transparent 70%)' }}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-glow)' }}
              >
                <Crown className="w-5 h-5" style={{ color: 'var(--violet-400)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Upgrade para Premium</h3>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Desbloqueie Kimi K3, agentes ilimitados, WhatsApp, API e mais</p>
              </div>
            </div>
            <button className="btn-primary text-xs py-2 px-4 flex-shrink-0" aria-label="Ver planos premium">
              <span>Ver Planos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
