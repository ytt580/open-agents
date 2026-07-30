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
    <div className="p-8 md:p-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>Visao Geral</h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--fg-muted)' }}>Acompanhe suas automacoes</p>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ 
              background: currentPlan === 'premium' ? 'var(--orange-bg)' : 'var(--bg-muted)', 
              border: `1px solid ${currentPlan === 'premium' ? '#fed7aa' : 'var(--border)'}`
            }}
          >
            {currentPlan === 'premium' ? (
              <Crown className="w-4 h-4" style={{ color: 'var(--orange)' }} />
            ) : (
              <Zap className="w-4 h-4" style={{ color: 'var(--fg-muted)' }} />
            )}
            <span style={{ color: currentPlan === 'premium' ? 'var(--orange)' : 'var(--fg-muted)' }}>
              {currentPlan === 'premium' ? 'Premium (Kimi K3)' : 'Free (GPT-4o)'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--orange-bg)' }}>
              <BarChart3 className="w-7 h-7" style={{ color: 'var(--orange)' }} />
            </div>
            <div>
              <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Fluxos</p>
              <p className="text-3xl font-extrabold" style={{ color: 'var(--fg)' }}>{flows.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green-bg)' }}>
              <CheckCircle className="w-7 h-7" style={{ color: 'var(--green)' }} />
            </div>
            <div>
              <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Tarefas Hoje</p>
              <p className="text-3xl font-extrabold" style={{ color: 'var(--fg)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--blue-bg)' }}>
              <Users className="w-7 h-7" style={{ color: 'var(--blue)' }} />
            </div>
            <div>
              <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Leads</p>
              <p className="text-3xl font-extrabold" style={{ color: 'var(--fg)' }}>0</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--purple-bg)' }}>
              <Terminal className="w-7 h-7" style={{ color: 'var(--purple)' }} />
            </div>
            <div>
              <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Uso IA</p>
              <p className="text-3xl font-extrabold" style={{ color: 'var(--fg)' }}>
                0<span className="text-base font-normal" style={{ color: 'var(--fg-faint)' }}>/100</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flows list or empty state */}
      {flows.length > 0 ? (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>Seus Fluxos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flows.map((flow) => (
              <div 
                key={flow.id}
                className="card p-6 cursor-pointer group"
                onClick={() => onSelectFlow(flow.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectFlow(flow.id)}
                aria-label={`Abrir fluxo ${flow.nome}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-muted)' }}>
                    <Bot className="w-6 h-6" style={{ color: 'var(--fg)' }} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--fg-muted)' }} />
                </div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--fg)' }}>{flow.nome}</h3>
                <p className="text-base mb-3" style={{ color: 'var(--fg-muted)' }}>{flow.steps.length} etapas</p>
                <p className="text-base" style={{ color: 'var(--fg-faint)' }}>
                  Criado em {new Date(flow.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
            
            {/* New flow card */}
            <div 
              className="card p-6 cursor-pointer group border-dashed"
              onClick={onNewFlow}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onNewFlow()}
              aria-label="Criar novo fluxo"
            >
              <div className="flex items-center justify-center h-full min-h-[160px]">
                <div className="text-center">
                  <Plus className="w-10 h-10 mx-auto mb-3 transition-transform group-hover:scale-110" style={{ color: 'var(--fg-faint)' }} />
                  <p className="text-lg font-semibold" style={{ color: 'var(--fg-muted)' }}>Novo Fluxo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-8 md:p-12 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--bg-muted)' }}>
            <Bot className="w-10 h-10" style={{ color: 'var(--fg)' }} />
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: 'var(--fg)' }}>Como posso ajudar?</h3>
          <p className="mb-8 text-base md:text-lg max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Descreva o que voce quer automatizar e eu crio o fluxo completo pra voce
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
            {[
              '20 empresas com site feio em SP pra enviar proposta',
              'Scraping de leads no Google Maps de restaurantes',
              'Criar site profissional pra clinica odontologica',
              'Enviar emails personalizados pra 50 prospects',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={onNewFlow}
                className="text-left p-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'var(--bg-muted)', color: 'var(--fg-secondary)', border: '1px solid var(--border)' }}
              >
                {prompt}
              </button>
            ))}
          </div>
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
          className="card p-6 text-left group"
          aria-label="Abrir navegador"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ background: 'var(--blue-bg)' }}>
            <Globe className="w-7 h-7" style={{ color: 'var(--blue)' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Navegador</h3>
          <p className="text-base mt-1" style={{ color: 'var(--fg-muted)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left group"
          aria-label="Gerenciar skills"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ background: 'var(--bg-muted)' }}>
            <Puzzle className="w-7 h-7" style={{ color: 'var(--fg)' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Skills</h3>
          <p className="text-base mt-1" style={{ color: 'var(--fg-muted)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('scheduler')}
          className="card p-6 text-left group"
          aria-label="Agendador"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105" style={{ background: 'var(--green-bg)' }}>
            <Clock className="w-7 h-7" style={{ color: 'var(--green)' }} />
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Agendador</h3>
          <p className="text-base mt-1" style={{ color: 'var(--fg-muted)' }}>Configure tarefas automaticas</p>
        </button>
      </div>

      {/* Plan upgrade banner */}
      {currentPlan === 'free' && (
        <div className="card p-6 relative overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
                <Crown className="w-7 h-7" style={{ color: 'var(--fg)' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Upgrade para Premium</h3>
                <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Puter.js, 500+ modelos IA, R$49/mes</p>
              </div>
            </div>
            <button className="btn-primary flex-shrink-0" aria-label="Ver planos premium">
              <span>Ver Planos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
