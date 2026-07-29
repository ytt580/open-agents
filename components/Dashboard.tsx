'use client'

import { 
  Play, 
  Pause, 
  Clock, 
  ArrowRight,
  Zap,
  Globe,
  Puzzle,
  TrendingUp,
  Plus,
  CheckCircle
} from 'lucide-react'

interface DashboardProps {
  onNavigate: (page: string) => void
  onSelectFlow: (id: string) => void
}

const flows = [
  {
    id: '1',
    nome: 'Prospeccao Google Maps',
    descricao: 'Buscar leads no Google Maps, Scraping, Criar site, Enviar proposta',
    status: 'ativo',
    executando: false,
    ultimoExecucao: 'Ha 2 horas',
    conversao: '34%',
    etapas: 6
  },
  {
    id: '2',
    nome: 'Automacao WhatsApp',
    descricao: 'Enviar mensagens, Aguardar resposta, Negociar, Fechar negocio',
    status: 'ativo',
    executando: true,
    ultimoExecucao: 'Agora',
    conversao: '28%',
    etapas: 4
  },
  {
    id: '3',
    nome: 'Criacao de Sites',
    descricao: 'Analisar site atual, Criar versao melhorada, Publicar, Enviar URL',
    status: 'pausado',
    executando: false,
    ultimoExecucao: 'Ha 1 dia',
    conversao: '45%',
    etapas: 5
  },
]

const stats = [
  { label: 'Fluxos Ativos', value: '12', icon: Zap, color: 'var(--accent)', change: '+3' },
  { label: 'Execucoes Hoje', value: '47', icon: Play, color: 'var(--sage)', change: '+12' },
  { label: 'Leads Processados', value: '234', icon: Globe, color: 'var(--clay)', change: '+56' },
  { label: 'Taxa de Conversao', value: '32%', icon: TrendingUp, color: 'var(--accent-dark)', change: '+5%' },
]

export function Dashboard({ onNavigate, onSelectFlow }: DashboardProps) {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--sage)' }}>{stat.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flows */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Fluxos Recentes</h2>
          <button 
            onClick={() => onNavigate('flows')}
            className="flex items-center gap-1 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {flows.map((flow) => (
            <div 
              key={flow.id}
              onClick={() => onSelectFlow(flow.id)}
              className="card p-6 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{flow.nome}</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{flow.descricao}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {flow.ultimoExecucao}
                      </span>
                      <span>{flow.etapas} etapas</span>
                      <span className="font-semibold" style={{ color: 'var(--sage)' }}>{flow.conversao} conversao</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {flow.executando && (
                    <div className="status-pill active">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sage)' }} />
                      Executando
                    </div>
                  )}
                  <span className={`status-pill ${flow.status === 'ativo' ? 'active' : 'inactive'}`}>
                    {flow.status === 'ativo' ? 'Ativo' : 'Pausado'}
                  </span>
                  <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                    {flow.executando ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('browser')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--sage-15)' }}>
            <Globe className="w-6 h-6" style={{ color: 'var(--sage)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Abrir Navegador</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Acesse sites e navegue com IA</p>
        </button>

        <button 
          onClick={() => onNavigate('skills')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-15)' }}>
            <Puzzle className="w-6 h-6" style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Gerenciar Skills</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Crie e use skills de automacao</p>
        </button>

        <button 
          onClick={() => onNavigate('api')}
          className="card p-6 text-left hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--clay-15)' }}>
            <Zap className="w-6 h-6" style={{ color: 'var(--clay)' }} />
          </div>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Configurar APIs</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Adicione suas chaves de API</p>
        </button>
      </div>
    </div>
  )
}