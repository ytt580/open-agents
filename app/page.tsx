'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Sparkles, Globe, Bot, Mail, Search, Code, Clock,
  Zap, Rocket, Shield, Users, BarChart3, Brain, Cpu, Network,
  Star, ChevronRight, Check, X, Infinity, Crown, Eye, Terminal,
  Layers, Workflow, Target, ArrowUpRight
} from 'lucide-react'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target) } },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

function AnimatedSection({ children, className = '', delay = 0 }: { 
  children: React.ReactNode; className?: string; delay?: number 
}) {
  const { ref, isVisible } = useScrollAnimation(0.1)
  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'animate-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const stats = [
  { value: '10K+', label: 'Agentes ativos' },
  { value: '2.5M+', label: 'Tarefas executadas' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Satisfacao' },
]

const features = [
  { icon: Brain, title: 'IA Autonoma', desc: 'Agentes que pensam, decidem e executam sozinhos. Voce so define o objetivo.', color: '#c084fc' },
  { icon: Globe, title: 'Scraping Neural', desc: 'Extraia dados de qualquer site com inteligencia artificial.', color: '#22d3ee' },
  { icon: Code, title: 'Gerador de Sites', desc: 'Agentes criam sites profissionais em minutos. Design moderno e responsivo.', color: '#34d399' },
  { icon: Mail, title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas automaticamente.', color: '#fb7185' },
  { icon: Search, title: 'Caca Leads', desc: 'Encontre empresas por nicho, localizacao e avaliacao.', color: '#e879f9' },
  { icon: Clock, title: '24/7 Online', desc: 'Agentes rodam 24 horas, 7 dias por semana.', color: '#22d3ee' },
]

const steps = [
  { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', icon: Target },
  { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', icon: Zap },
  { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada pelo agente', icon: BarChart3 },
  { num: '04', title: 'Resultado', desc: 'Leads, sites, propostas — tudo pronto', icon: Rocket },
]

const plans = [
  {
    name: 'Free', tagline: 'Comece sem pagar', price: 'R$ 0', period: 'para sempre',
    icon: Zap, color: '#22d3ee', model: 'GPT-4o', modelDesc: 'OpenAI', popular: false,
    features: [
      { text: 'Agentes ilimitados', included: true },
      { text: 'Tarefas ilimitadas', included: true },
      { text: 'Scraping avancado', included: true },
      { text: 'Gerador de sites', included: true },
      { text: 'Email + WhatsApp', included: true },
      { text: 'Agendador 24/7', included: true },
    ],
    cta: 'Comecar Gratis',
  },
  {
    name: 'Premium', tagline: 'IA mais inteligente', price: 'R$ 10', period: '/mes',
    icon: Crown, color: '#c084fc', model: 'Kimi K3', modelDesc: 'Bluesminds', popular: true,
    features: [
      { text: 'Agentes ilimitados', included: true },
      { text: 'Tarefas ilimitadas', included: true },
      { text: 'Scraping avancado', included: true },
      { text: 'Gerador de sites', included: true },
      { text: 'Email + WhatsApp', included: true },
      { text: 'Agendador 24/7', included: true },
    ],
    cta: 'Ativar Premium',
  },
]

const agents = [
  { name: 'Prospeccao Agent', desc: 'Busca leads no Google Maps, extrai dados, qualifica', status: 'online', tasks: '1.2K' },
  { name: 'Scraping Agent', desc: 'Navega sites, coleta informacoes, estrutura dados', status: 'online', tasks: '890' },
  { name: 'Design Agent', desc: 'Cria sites profissionais com design moderno', status: 'online', tasks: '650' },
  { name: 'Outreach Agent', desc: 'Envia emails, WhatsApp, gerencia respostas', status: 'online', tasks: '2.1K' },
]

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => { setIsVisible(true) }, [])

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Background Orbs - WishLabs pink/purple style */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[900px] h-[900px] rounded-full opacity-[0.12]"
          style={{ top: '-300px', left: '-200px', background: 'radial-gradient(circle, #c026d3 0%, transparent 70%)', animation: 'float 20s ease-in-out infinite' }} />
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-[0.10]"
          style={{ top: '-100px', right: '-200px', background: 'radial-gradient(circle, #c026d3 0%, transparent 70%)', animation: 'float 18s ease-in-out infinite reverse' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ bottom: '-100px', left: '30%', background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', animation: 'float 22s ease-in-out infinite' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
        style={{ background: '#c026d3', color: 'white', outline: '2px solid #e879f9', outlineOffset: '2px' }}>
        Pular para o conteudo
      </a>
      
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8"><img src="/logo.svg" alt="" className="w-full h-full" /></div>
            <span className="font-bold text-lg tracking-tight text-white">Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#94a3b8' }}>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#agents" className="hover:text-white transition-colors">Agentes</a>
            <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-semibold hidden md:block hover:text-white transition-colors" style={{ color: '#94a3b8' }}>Entrar</Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2.5 px-6">Comecar</Link>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero - WishLabs bold style */}
        <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className={`hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${isVisible ? 'hero-visible' : ''}`}
              style={{ background: 'rgba(192, 132, 252, 0.1)', border: '1px solid rgba(192, 132, 252, 0.25)', transitionDelay: '0ms' }}>
              <Terminal className="w-4 h-4" style={{ color: '#c084fc' }} />
              <span className="text-sm font-semibold" style={{ color: '#c084fc' }}>Agentes de IA Autonomos</span>
            </div>
            
            <h1 className={`hero-element text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.88] mb-8 tracking-[-0.04em] ${isVisible ? 'hero-visible' : ''}`}
              style={{ transitionDelay: '80ms' }}>
              <span style={{ background: 'linear-gradient(135deg, #c084fc, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Automatize</span>
              <br />
              <span className="text-white">qualquer fluxo</span>
              <br />
              <span style={{ color: '#475569' }}>com IA autonoma</span>
            </h1>
            
            <p className={`hero-element text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium ${isVisible ? 'hero-visible' : ''}`}
              style={{ color: '#94a3b8', transitionDelay: '160ms' }}>
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span className="font-bold" style={{ color: '#34d399' }}> Voce so define o objetivo.</span>
            </p>
            
            <div className={`hero-element flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 ${isVisible ? 'hero-visible' : ''}`}
              style={{ transitionDelay: '240ms' }}>
              <Link href="/dashboard" className="btn-primary text-base py-4 px-8 group">
                <span>Criar Primeiro Agente</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#pricing" className="btn-secondary text-base py-4 px-8">Ver Planos</a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`hero-element text-center p-6 rounded-2xl ${isVisible ? 'hero-visible' : ''}`}
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${320 + i * 80}ms` }}>
                  <p className="text-3xl md:text-4xl font-black" style={{ color: '#34d399' }}>{stat.value}</p>
                  <p className="text-sm mt-1 font-medium" style={{ color: '#64748b' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Banner */}
        <section className="py-5 px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#64748b' }}>
              <Eye className="w-4 h-4" style={{ color: '#34d399' }} />
              <span>Agentes executando agora</span>
            </div>
            {agents.slice(0, 3).map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399' }} />
                <span style={{ color: '#94a3b8' }}>{a.name}</span>
                <span className="font-mono text-xs font-bold" style={{ color: '#34d399' }}>{a.tasks}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Agents Preview */}
        <section id="agents" className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#c084fc' }}>Seus Agentes</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Trabalhando para voce</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent, i) => (
                <AnimatedSection key={agent.name} delay={i * 80}>
                  <div className="card p-6 group transition-all duration-300 hover:border-[#c084fc]">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: 'linear-gradient(135deg, #c026d3, #c026d3)' }}>
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-white">{agent.name}</h3>
                          <span className="w-2 h-2 rounded-full" style={{ background: '#34d399' }} />
                        </div>
                        <p className="text-sm" style={{ color: '#64748b' }}>{agent.desc}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-medium" style={{ color: '#475569' }}>Tarefas</p>
                        <p className="font-bold font-mono text-lg" style={{ color: '#34d399' }}>{agent.tasks}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 md:py-32 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>Como funciona</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Simples como conversar</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 100}>
                  <div className="text-center relative">
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[55%] w-[90%] h-px"
                        style={{ background: 'linear-gradient(90deg, #c026d3, transparent)' }} />
                    )}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 transition-transform duration-300 hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid #c026d3' }}>
                      <step.icon className="w-7 h-7" style={{ color: '#c084fc' }} />
                    </div>
                    <p className="text-xs font-mono font-bold mb-2" style={{ color: '#34d399' }}>{step.num}</p>
                    <h3 className="font-bold text-base mb-1 text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#c084fc' }}>Poderes</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">O que seus agentes podem fazer</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feat, i) => (
                <AnimatedSection key={feat.title} delay={i * 80}>
                  <div className="card p-7 transition-all duration-300 group relative overflow-hidden hover:border-[#c084fc]">
                    <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle, ${feat.color} 0%, transparent 70%)` }} />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 relative z-10"
                      style={{ background: `${feat.color}15` }}>
                      <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                    </div>
                    <h3 className="font-bold text-xl mb-2 relative z-10 text-white">{feat.title}</h3>
                    <p className="text-sm leading-relaxed relative z-10" style={{ color: '#64748b' }}>{feat.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 md:py-32 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#34d399' }}>Planos</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Escolha seu motor de IA</h2>
                <p className="text-base" style={{ color: '#64748b' }}>Comece gratis. Evolua quando quiser.</p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan, i) => (
                <AnimatedSection key={plan.name} delay={i * 120}>
                  <div className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.025)', border: `2px solid ${plan.popular ? '#c026d3' : 'rgba(255,255,255,0.06)'}`, boxShadow: plan.popular ? '0 0 50px rgba(192, 38, 211, 0.15)' : 'none' }}>
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ background: 'linear-gradient(135deg, #c026d3, #c026d3)', color: 'white' }}>
                        Mais Popular
                      </div>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${plan.color}12`, border: `1px solid ${plan.color}30` }}>
                        <plan.icon className="w-7 h-7" style={{ color: plan.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                        <p className="text-sm" style={{ color: '#475569' }}>{plan.tagline}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-white">{plan.price}</span>
                        <span className="text-sm" style={{ color: '#475569' }}>{plan.period}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-2 py-1 rounded-lg text-xs font-mono font-bold"
                          style={{ background: `${plan.color}12`, color: plan.color, border: `1px solid ${plan.color}30` }}>
                          {plan.model}
                        </span>
                        <span className="text-xs" style={{ color: '#475569' }}>{plan.modelDesc}</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-3">
                          {f.included ? (
                            <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#34d399' }} />
                          ) : (
                            <X className="w-4 h-4 flex-shrink-0" style={{ color: '#475569', opacity: 0.4 }} />
                          )}
                          <span className="text-sm" style={{ color: f.included ? '#94a3b8' : '#475569', opacity: f.included ? 1 : 0.4 }}>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/dashboard" className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full text-center text-base`}>
                      {plan.cta}
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={240}>
              <div className="text-center mt-12">
                <p className="text-sm" style={{ color: '#475569' }}>Todos os planos incluem SSL, hospedagem e atualizacoes. Cancele quando quiser.</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Models */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#22d3ee' }}>Modelos de IA</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Potenciado pelos melhores</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'GPT-4o', provider: 'OpenAI', tier: 'Free', color: '#34d399' },
                { name: 'Kimi K3', provider: 'Bluesminds', tier: 'Premium', color: '#c084fc' },
                { name: 'Claude', provider: 'Anthropic', tier: 'Em breve', color: '#22d3ee' },
                { name: 'Gemini', provider: 'Google', tier: 'Em breve', color: '#fb7185' },
              ].map((m, i) => (
                <AnimatedSection key={m.name} delay={i * 80}>
                  <div className="card p-6 text-center transition-all duration-300 hover:border-[#c084fc]">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110"
                      style={{ background: `${m.color}12` }}>
                      <Cpu className="w-7 h-7" style={{ color: m.color }} />
                    </div>
                    <h4 className="font-bold text-lg text-white">{m.name}</h4>
                    <p className="text-sm mb-3" style={{ color: '#475569' }}>{m.provider}</p>
                    <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: `${m.color}12`, color: m.color }}>
                      {m.tier}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c2d12)' }} />
          <div className="absolute inset-0 opacity-30"
            style={{ background: 'radial-gradient(circle at 30% 50%, #c026d3 0%, transparent 50%), radial-gradient(circle at 70% 50%, #c026d3 0%, transparent 50%)' }} />
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center text-white relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Seus agentes estao prontos</h2>
              <p className="text-lg mb-10 opacity-80 font-medium">Comece gratis. Sem cartao de credito. Ativacao instantanea.</p>
              <Link href="/dashboard"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{ background: 'white', color: '#1e1b4b' }}>
                Ativar Meus Agentes
                <Rocket className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6"><img src="/logo.svg" alt="" className="w-full h-full" /></div>
            <span className="font-bold text-base text-white">Open-Agents</span>
          </div>
          <p className="text-sm" style={{ color: '#475569' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-6 text-sm" style={{ color: '#475569' }}>
            <span className="hover:text-white transition-colors cursor-pointer">Termos</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacidade</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
