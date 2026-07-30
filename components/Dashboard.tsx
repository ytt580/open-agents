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
  onNewFlow: () => void
  flows: Flow[]
}

export function Dashboard({ onNavigate, onSelectFlow, onNewFlow, flows }: DashboardProps) {
  const currentPlan = 'free' as string
  
  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Visao Geral</h1>
          <p className="mt-1 text-base" style={{ color: 'var(--text-tertiary)' }}>Acompanhe suas automacoes</p>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ 
              background: currentPlan === 'premium' ? '#fff7ed' : '#f5f5f4', 
              border: `1px solid ${currentPlan === 'premium' ? '#fed7aa' : '#e7e5e4'}`
            }}
          >
            {currentPlan === 'premium' ? (
              <Crown className="w-4 h-4" style={{ color: '#f97316' }} />
            ) : (
              <Zap className="w-4 h-4" style={{ color: '#78716c' }} />
            )}
            <span style={{ color: currentPlan === 'premium' ? '#ea580c' : '#78716c' }}>
              {currentPlan === 'premium' ? 'Premium (Kimi K3)' : 'Free (GPT-4o)'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff7ed' }}>
              <BarChart3 className="w-6 h-6" style={{ color: '#f97316' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Fluxos</p>
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{flows.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-5 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dcfce7' }}>
              <CheckCircle className="w-6 h-6" style={{ color: '#16a34a' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tarefas Hoje</p>
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#e0f2fe' }}>
              <Users className="w-6 h-6" style={{ color: '#0284c7' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Leads</p>
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-5 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fce7f3' }}>
              <Terminal className="w-6 h-6" style={{ color: '#db2777' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Uso IA</p>
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                0<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flows list or empty state */}
      {flows.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Seus Fluxos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flows.map((flow) => (
              <div 
                key={flow.id}
                className="card p-5 cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
                onClick={() => onSelectFlow(flow.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectFlow(flow.id)}
                aria-label={`Abrir fluxo ${flow.nome}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#fff7ed' }}>
                    <Bot className="w-6 h-6" style={{ color: '#f97316' }} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ color: '#f97316' }} />
                </div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{flow.nome}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{flow.steps.length} etapas</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Criado em {new Date(flow.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
            
            {/* New flow card */}
            <div 
              className="card p-5 cursor-pointer group transition-all duration-200 border-dashed hover:-translate-y-0.5"
              onClick={onNewFlow}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNewFlow()}
              aria-label="Criar novo fluxo"
            >
              <div className="flex items-center justify-center h-full min-h-[140px]">
                <div className="text-center">
                  <Plus className="w-10 h-10 mx-auto mb-3 transition-transform duration-200 group-hover:scale-110" style={{ color: '#f97316' }} />
                  <p className="text-base font-bold" style={{ color: 'var(--text-tertiary)' }}>Novo Fluxo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-10 md:p-12 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#fff7ed' }}>
            <Bot className="w-10 h-10" style={{ color: '#f97316' }} />
          </div>
          <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>Nenhum fluxo ainda</h3>
          <p className="mb-8 text-base max-w-md mx-auto" style={{ color: 'var(--text-tertiary)' }}>
            Crie seu primeiro fluxo de automacao para comecar a automatizar tarefas repetitivas
          </p>
          <button onClick={onNewFlow} className="btn-primary text-base" aria-label="Criar primeiro fluxo">
            <Terminal className="w-5 h-5" />
            <span>Criar Primeiro Fluxo</span>
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-6 text-left transition-all duration-200 group hover:-translate-y-0.5"
          aria-label="Abrir navegador"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105" style={{ background: '#e0f2fe' }}>
            <Globe className="w-7 h-7" style={{ color: '#0284c7' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left transition-all duration-200 group hover:-translate-y-0.5"
          aria-label="Gerenciar skills"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105" style={{ background: '#fff7ed' }}>
            <Puzzle className="w-7 h-7" style={{ color: '#f97316' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('scheduler')}
          className="card p-6 text-left transition-all duration-200 group hover:-translate-y-0.5"
          aria-label="Agendador"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105" style={{ background: '#dcfce7' }}>
            <Clock className="w-7 h-7" style={{ color: '#16a34a' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Agendador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Configure tarefas automaticas</p>
        </button>
      </div>

      {/* Plan upgrade banner */}
      {currentPlan === 'free' && (
        <div className="card p-6 relative overflow-hidden transition-all duration-200 hover:shadow-md" style={{ border: '1.5px solid #fed7aa' }}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06]" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff7ed' }}>
                <Crown className="w-7 h-7" style={{ color: '#f97316' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Upgrade para Premium</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Desbloqueie Kimi K3, agentes ilimitados, WhatsApp, API e mais</p>
              </div>
            </div>
            <button className="btn-primary text-sm py-3 px-6 flex-shrink-0" aria-label="Ver planos premium">
              <span>Ver Planos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
