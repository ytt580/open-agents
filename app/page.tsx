'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Zap, Globe, Bot, ArrowRight, Sparkles,
  Search, Mail, Code, MessageSquare, Shield,
  Clock, TrendingUp, Users, BarChart3, Brain,
  Cpu, Network, Rocket, Star, ChevronRight,
  Check, X, Infinity, Crown, Bolt, Eye
} from 'lucide-react'

const stats = [
  { value: '10K+', label: 'Agentes ativos' },
  { value: '2.5M+', label: 'Tarefas executadas' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Satisfacao' },
]

const features = [
  { icon: Brain, title: 'IA Autonoma', desc: 'Agentes que pensam, decidem e executam sozinhos. Voce so define o objetivo.', color: 'var(--accent)' },
  { icon: Globe, title: 'Scraping Neural', desc: 'Extraia dados de qualquer site com inteligencia artificial.', color: 'var(--cyan)' },
  { icon: Code, title: 'Gerador de Sites', desc: 'Agentes criam sites profissionais em minutos. Design moderno e responsivo.', color: 'var(--neon)' },
  { icon: Mail, title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas automaticamente.', color: 'var(--pink)' },
  { icon: Search, title: 'Caca Leads', desc: 'Encontre empresas por nicho, localizacao e avaliacao.', color: 'var(--accent-light)' },
  { icon: Clock, title: '24/7 Online', desc: 'Agentes rodam 24 horas, 7 dias por semana.', color: 'var(--cyan-light)' },
]

const steps = [
  { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', icon: MessageSquare },
  { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', icon: Zap },
  { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada pelo agente', icon: BarChart3 },
  { num: '04', title: 'Resultado', desc: 'Leads, sites, propostas - tudo pronto', icon: Rocket },
]

const plans = [
  {
    name: 'Free',
    tagline: 'Comece sem pagar',
    price: 'R$ 0',
    period: 'para sempre',
    icon: Bolt,
    color: 'var(--cyan)',
    colorBg: 'rgba(34, 211, 238, 0.1)',
    colorBorder: 'rgba(34, 211, 238, 0.3)',
    model: 'GPT-5',
    modelDesc: 'OpenAI',
    popular: false,
    features: [
      { text: 'Agentes ilimitados', included: true },
      { text: 'Tarefas ilimitadas', included: true },
      { text: 'Scraping avancado', included: true },
      { text: 'Gerador de sites', included: true },
      { text: 'Email + WhatsApp', included: true },
      { text: 'Agendador 24/7', included: true },
    ],
    cta: 'Comecar Gratis',
    ctaStyle: 'btn-secondary',
  },
  {
    name: 'Premium',
    tagline: 'IA mais inteligente',
    price: 'R$ 10',
    period: '/mes',
    icon: Crown,
    color: 'var(--accent)',
    colorBg: 'var(--accent-glow)',
    colorBorder: 'var(--accent)',
    model: 'Kimi K3',
    modelDesc: 'Bluesminds',
    popular: true,
    features: [
      { text: 'Agentes ilimitados', included: true },
      { text: 'Tarefas ilimitadas', included: true },
      { text: 'Scraping avancado', included: true },
      { text: 'Gerador de sites', included: true },
      { text: 'Email + WhatsApp', included: true },
      { text: 'Agendador 24/7', included: true },
    ],
    cta: 'Ativar Premium',
    ctaStyle: 'btn-primary',
  },
]

const agents = [
  { name: 'Prospeccao Agent', desc: 'Busca leads no Google Maps, extrai dados, qualifica', status: 'online', tasks: '1.2K' },
  { name: 'Scraping Agent', desc: 'Navega sites, coleta informacoes, estrutura dados', status: 'online', tasks: '890' },
  { name: 'Design Agent', desc: 'Cria sites profissionais com design moderno', status: 'online', tasks: '650' },
  { name: 'Outreach Agent', desc: 'Envia emails, WhatsApp, gerencia respostas', status: 'online', tasks: '2.1K' },
]

export default function LandingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))', boxShadow: '0 0 20px var(--accent-glow)' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gradient">Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#agents" className="hover:text-white transition-colors">Agentes</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium hidden md:block" style={{ color: 'var(--text-secondary)' }}>
              Entrar
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-5">
              Comecar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, var(--cyan) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--accent-light)' }}>Agentes de IA Autonomos</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 tracking-tight">
            <span className="text-gradient">Automatize</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>qualquer fluxo</span>
            <br />
            <span style={{ color: 'var(--text-tertiary)' }}>com IA autonoma</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
            <br />
            <span className="neon-text font-semibold">Voce so define o objetivo.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="btn-primary text-base py-4 px-8 group">
              Criar Primeiro Agente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#pricing" className="btn-secondary text-base py-4 px-8">
              Ver Planos
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold neon-text">{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Banner */}
      <section className="py-6 px-6" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <Eye className="w-4 h-4" style={{ color: 'var(--neon)' }} />
            <span>Agentes executando agora</span>
          </div>
          {agents.slice(0, 3).map((a) => (
            <div key={a.name} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>{a.name}</span>
              <span className="font-mono text-xs neon-text">{a.tasks}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Preview */}
      <section id="agents" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 neon-text">Seus Agentes</p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Trabalhando para voce</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.name} className="card p-6 hover:border-[var(--accent)] transition-all duration-300 group" style={{ boxShadow: '0 0 30px transparent' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))', boxShadow: '0 0 20px var(--accent-glow)' }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--neon)', boxShadow: '0 0 8px var(--neon)' }} />
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{agent.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tarefas</p>
                    <p className="font-semibold neon-text font-mono">{agent.tasks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 neon-text">Como funciona</p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Simples como conversar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                )}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10" style={{ background: 'var(--surface)', border: '1px solid var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}>
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
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 neon-text">Poderes</p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>O que seus agentes podem fazer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="card p-8 transition-all duration-300 group relative overflow-hidden hover:border-[var(--accent)]">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity" style={{ background: `radial-gradient(circle, ${feat.color} 0%, transparent 70%)` }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 relative z-10" style={{ background: `${feat.color}15` }}>
                  <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                </div>
                <h3 className="font-semibold text-xl mb-3 relative z-10" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 neon-text">Planos</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Escolha seu motor de IA</h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Comece gratis. Evolua quando quiser.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className="relative rounded-2xl p-8 transition-all duration-300"
                style={{ 
                  background: 'var(--surface)',
                  border: `2px solid ${plan.popular ? 'var(--accent)' : 'var(--border)'}`,
                  boxShadow: plan.popular ? '0 0 40px var(--accent-glow)' : 'none'
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 0 20px var(--accent-glow)' }}>
                    MAIS POPULAR
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: plan.colorBg, border: `1px solid ${plan.colorBorder}` }}>
                    <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{plan.period}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold" style={{ background: plan.colorBg, color: plan.color, border: `1px solid ${plan.colorBorder}` }}>
                      {plan.model}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{plan.modelDesc}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--neon)' }} />
                      ) : (
                        <X className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)', opacity: 0.4 }} />
                      )}
                      <span className="text-sm" style={{ color: f.included ? 'var(--text-secondary)' : 'var(--text-tertiary)', opacity: f.included ? 1 : 0.4 }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className={`${plan.ctaStyle} w-full text-center`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Todos os planos incluem SSL, hospedagem e atualizacoes. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 neon-text">Modelos de IA</p>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Potenciado pelos melhores</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'GPT-5', provider: 'OpenAI', tier: 'Free', color: 'var(--neon)' },
              { name: 'Kimi K3', provider: 'Bluesminds', tier: 'Premium', color: 'var(--accent)' },
              { name: 'Claude', provider: 'Anthropic', tier: 'Em breve', color: 'var(--cyan)' },
              { name: 'Gemini', provider: 'Google', tier: 'Em breve', color: 'var(--pink)' },
            ].map((m) => (
              <div key={m.name} className="card p-6 text-center transition-all hover:border-[var(--accent)]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${m.color}15` }}>
                  <Cpu className="w-7 h-7" style={{ color: m.color }} />
                </div>
                <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{m.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{m.provider}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${m.color}15`, color: m.color }}>
                  {m.tier}
                </span>
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
          <p className="text-xl mb-10 opacity-90">Comece gratis. Sem cartao de credito. Ativacao instantanea.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105" style={{ background: 'white', color: 'var(--accent-dark)', boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}>
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
