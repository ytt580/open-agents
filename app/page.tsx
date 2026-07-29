'use client'

import Link from 'next/link'
import { 
  Zap, Globe, Bot, ArrowRight, Sparkles,
  Search, Mail, Code, MessageSquare, Shield,
  Clock, TrendingUp, Users, BarChart3, Brain,
  Cpu, Network, Rocket, Star, ChevronRight
} from 'lucide-react'

const stats = [
  { value: '10,000+', label: 'Agentes ativos' },
  { value: '2.5M+', label: 'Tarefas executadas' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Satisfacao' },
]

const features = [
  { icon: Brain, title: 'IA Autonoma', desc: 'Agentes que pensam, decidem e executam sozinhos. Voce so define o objetivo.', color: 'var(--accent)' },
  { icon: Globe, title: 'Scraping Neural', desc: 'Extraia dados de qualquer site com inteligencia artificial. Google Maps, redes sociais, portfolios.', color: 'var(--cyan)' },
  { icon: Code, title: 'Gerador de Sites', desc: 'Agentes criam sites profissionais em minutos. Design moderno, responsivo, otimizado.', color: 'var(--neon)' },
  { icon: Mail, title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas automaticamente. Cada email e unico.', color: 'var(--pink)' },
  { icon: Search, title: 'Caça Leads', desc: 'Encontre empresas por nicho, localizacao, avaliacao. Filtros inteligentes.', color: 'var(--accent-light)' },
  { icon: Clock, title: '24/7 Online', desc: 'Agentes dormem quando voce dorme. Rodam 24 horas, 7 dias por semana.', color: 'var(--cyan-light)' },
]

const steps = [
  { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', icon: MessageSquare },
  { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', icon: Zap },
  { num: '03', title: 'Acompanhe em tempo real', desc: 'Veja cada acao sendo tomada pelo agente', icon: BarChart3 },
  { num: '04', title: 'Resultado automatico', desc: 'Leads, sites, propostas - tudo pronto', icon: Rocket },
]

const agents = [
  { name: 'Prospeccao Agent', desc: 'Busca leads no Google Maps, extrai dados, qualifica automaticamente', status: 'online', tasks: '1.2K' },
  { name: 'Scraping Agent', desc: 'Navega sites, coleta informacoes, estrutura dados', status: 'online', tasks: '890' },
  { name: 'Design Agent', desc: 'Cria sites profissionais, logos, identidade visual', status: 'online', tasks: '650' },
  { name: 'Outreach Agent', desc: 'Envia emails, WhatsApp, gerencia respostas', status: 'online', tasks: '2.1K' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gradient">Open-Agents</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Dashboard
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Ativar Agentes
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glow-border">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--accent-light)' }}>Agentes de IA Autonomos</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-gradient">Automatize</span>
            <span className="block mt-2" style={{ color: 'var(--text-primary)' }}>qualquer fluxo</span>
            <span className="block mt-2" style={{ color: 'var(--text-secondary)' }}>com agentes de IA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios. 
            <span className="neon-text font-semibold"> Voce so define o objetivo.</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link href="/dashboard" className="btn-primary text-lg py-4 px-8">
              Criar Primeiro Agente
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold neon-text">{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Preview */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 neon-text">Seus Agentes</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Agentes trabalhando para voce</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className="card p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))' }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                      <span className="w-2 h-2 rounded-full neon-text" style={{ background: 'var(--neon)' }} />
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{agent.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tarefas</p>
                    <p className="font-semibold neon-text">{agent.tasks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 neon-text">Como funciona</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>4 passos para automatizar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                )}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 glow-border" style={{ background: 'var(--surface)' }}>
                  <step.icon className="w-7 h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <p className="text-xs font-mono mb-2 neon-text">{step.num}</p>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2 neon-text">Poderes</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>O que seus agentes podem fazer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="card p-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `radial-gradient(circle, ${feat.color} 0%, transparent 70%)` }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 relative z-10" style={{ background: `${feat.color}20` }}>
                  <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                </div>
                <h3 className="font-semibold text-xl mb-3 relative z-10" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--accent-dark), var(--cyan-dark))' }} />
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 50%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--cyan) 0%, transparent 50%)' }} />
        <div className="max-w-3xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Seus agentes estao prontos</h2>
          <p className="text-xl mb-10 opacity-90">Comece agora. Sem cartao de credito. Ativacao instantanea.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105" style={{ background: 'white', color: 'var(--accent-dark)' }}>
            Ativar Meus Agentes
            <Rocket className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <span className="font-semibold text-gradient">Open-Agents</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span>Termos</span>
            <span>Privacidade</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
