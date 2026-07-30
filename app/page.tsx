'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Sparkles, Globe, Bot, Mail, Search, Code, Clock,
  Zap, Rocket, Shield, Users, BarChart3, Brain, Cpu, Network,
  Star, ChevronRight, Check, X, Infinity, Crown, Eye, Terminal,
  Layers, Workflow, Target, ArrowUpRight
} from 'lucide-react'

/* ============================================
   SCROLL ANIMATION HOOK
   ============================================ */
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

/* ============================================
   ANIMATED SECTION COMPONENT
   ============================================ */
function AnimatedSection({ children, className = '', delay = 0 }: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation(0.1)
  
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'animate-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ============================================
   DATA
   ============================================ */
const stats = [
  { value: '10K+', label: 'Agentes ativos' },
  { value: '2.5M+', label: 'Tarefas executadas' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Satisfacao' },
]

const features = [
  { icon: Brain, title: 'IA Autonoma', desc: 'Agentes que pensam, decidem e executam sozinhos. Voce so define o objetivo.', color: 'var(--violet-500)' },
  { icon: Globe, title: 'Scraping Neural', desc: 'Extraia dados de qualquer site com inteligencia artificial.', color: 'var(--cyan-500)' },
  { icon: Code, title: 'Gerador de Sites', desc: 'Agentes criam sites profissionais em minutos. Design moderno e responsivo.', color: 'var(--emerald-500)' },
  { icon: Mail, title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas automaticamente.', color: 'var(--rose-500)' },
  { icon: Search, title: 'Caca Leads', desc: 'Encontre empresas por nicho, localizacao e avaliacao.', color: 'var(--violet-400)' },
  { icon: Clock, title: '24/7 Online', desc: 'Agentes rodam 24 horas, 7 dias por semana.', color: 'var(--cyan-400)' },
]

const steps = [
  { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', icon: Target },
  { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', icon: Zap },
  { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada pelo agente', icon: BarChart3 },
  { num: '04', title: 'Resultado', desc: 'Leads, sites, propostas — tudo pronto', icon: Rocket },
]

const plans = [
  {
    name: 'Free',
    tagline: 'Comece sem pagar',
    price: 'R$ 0',
    period: 'para sempre',
    icon: Zap,
    color: 'var(--cyan-500)',
    model: 'GPT-4o',
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
  },
  {
    name: 'Premium',
    tagline: 'IA mais inteligente',
    price: 'R$ 10',
    period: '/mes',
    icon: Crown,
    color: 'var(--violet-500)',
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
  },
]

const agents = [
  { name: 'Prospeccao Agent', desc: 'Busca leads no Google Maps, extrai dados, qualifica', status: 'online', tasks: '1.2K' },
  { name: 'Scraping Agent', desc: 'Navega sites, coleta informacoes, estrutura dados', status: 'online', tasks: '890' },
  { name: 'Design Agent', desc: 'Cria sites profissionais com design moderno', status: 'online', tasks: '650' },
  { name: 'Outreach Agent', desc: 'Envia emails, WhatsApp, gerencia respostas', status: 'online', tasks: '2.1K' },
]

/* ============================================
   MAIN PAGE
   ============================================ */
export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-void)' }}>
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ 
            top: '-200px', 
            left: '-200px', 
            background: 'radial-gradient(circle, var(--violet-600) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ 
            bottom: '-150px', 
            right: '-150px', 
            background: 'radial-gradient(circle, var(--cyan-500) 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{ 
            top: '40%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, var(--emerald-500) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
      
      {/* Skip to content */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:outline-none"
        style={{ 
          background: 'var(--violet-600)', 
          color: 'white',
          outline: '2px solid var(--violet-400)',
          outlineOffset: '2px'
        }}
      >
        Pular para o conteudo
      </a>
      
      {/* Nav */}
      <nav 
        className="fixed top-0 w-full z-50"
        style={{ 
          background: 'rgba(8, 8, 13, 0.8)', 
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7">
              <img src="/logo.svg" alt="" className="w-full h-full" />
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <a href="#features" className="hover:text-white transition-colors duration-150">Features</a>
            <a href="#agents" className="hover:text-white transition-colors duration-150">Agentes</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-150">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium hidden md:block hover:text-white transition-colors duration-150" style={{ color: 'var(--text-tertiary)' }}>
              Entrar
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-5">
              Comecar
            </Link>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero */}
        <section className="pt-28 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${50 + Math.random() * 80}px`,
                  height: `${50 + Math.random() * 80}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  background: `radial-gradient(circle, ${
                    ['var(--violet-600)', 'var(--cyan-600)', 'var(--emerald-600)'][i % 3]
                  } 0%, transparent 70%)`,
                  opacity: 0.04 + Math.random() * 0.03,
                  animation: `float ${12 + Math.random() * 10}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div 
              className={`hero-element inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 ${isVisible ? 'hero-visible' : ''}`}
              style={{ 
                background: 'var(--accent-glow)', 
                border: '1px solid rgba(139, 92, 246, 0.2)',
                transitionDelay: '0ms'
              }}
            >
              <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--violet-400)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--violet-300)' }}>Agentes de IA Autonomos</span>
            </div>
            
            {/* Title */}
            <h1 
              className={`hero-element text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] mb-8 tracking-[-0.03em] ${isVisible ? 'hero-visible' : ''}`}
              style={{ transitionDelay: '80ms' }}
            >
              <span className="text-gradient">Automatize</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>qualquer fluxo</span>
              <br />
              <span className="font-medium" style={{ color: 'var(--text-muted)' }}>com IA autonoma</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className={`hero-element text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed ${isVisible ? 'hero-visible' : ''}`}
              style={{ color: 'var(--text-secondary)', transitionDelay: '160ms' }}
            >
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span className="font-semibold" style={{ color: 'var(--emerald-400)' }}> Voce so define o objetivo.</span>
            </p>
            
            {/* CTAs */}
            <div 
              className={`hero-element flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 ${isVisible ? 'hero-visible' : ''}`}
              style={{ transitionDelay: '240ms' }}
            >
              <Link href="/dashboard" className="btn-primary text-sm py-3 px-7 group">
                <span>Criar Primeiro Agente</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <a href="#pricing" className="btn-secondary text-sm py-3 px-7">
                Ver Planos
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div 
                  key={stat.label} 
                  className={`hero-element text-center p-4 rounded-xl ${isVisible ? 'hero-visible' : ''}`}
                  style={{ 
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    transitionDelay: `${320 + i * 80}ms`
                  }}
                >
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--emerald-400)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Banner */}
        <section 
          className="py-4 px-6"
          style={{ 
            background: 'var(--bg-primary)', 
            borderTop: '1px solid var(--border)', 
            borderBottom: '1px solid var(--border)' 
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-5 md:gap-10">
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Eye className="w-3.5 h-3.5" style={{ color: 'var(--emerald-400)' }} />
              <span>Agentes executando agora</span>
            </div>
            {agents.slice(0, 3).map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-xs">
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ background: 'var(--emerald-400)' }} 
                />
                <span style={{ color: 'var(--text-tertiary)' }}>{a.name}</span>
                <span className="font-mono text-[10px]" style={{ color: 'var(--emerald-400)' }}>{a.tasks}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Agents Preview */}
        <section id="agents" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--emerald-400)' }}>Seus Agentes</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Trabalhando para voce</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agents.map((agent, i) => (
                <AnimatedSection key={agent.name} delay={i * 80}>
                  <div 
                    className="card p-5 group transition-all duration-200 hover:border-[var(--violet-500)]"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--violet-600), var(--cyan-600))'
                        }}
                      >
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                          <span 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ background: 'var(--emerald-400)' }} 
                          />
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{agent.desc}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Tarefas</p>
                        <p className="font-semibold font-mono text-sm" style={{ color: 'var(--emerald-400)' }}>{agent.tasks}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--emerald-400)' }}>Como funciona</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Simples como conversar</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 100}>
                  <div className="text-center relative">
                    {i < steps.length - 1 && (
                      <div 
                        className="hidden md:block absolute top-7 left-[55%] w-[90%] h-px"
                        style={{ background: 'linear-gradient(90deg, var(--violet-500), transparent)' }}
                      />
                    )}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10 transition-transform duration-200 hover:scale-105"
                      style={{ 
                        background: 'var(--surface)', 
                        border: '1px solid var(--violet-500)'
                      }}
                    >
                      <step.icon className="w-6 h-6" style={{ color: 'var(--violet-400)' }} />
                    </div>
                    <p className="text-[10px] font-mono mb-1" style={{ color: 'var(--emerald-400)' }}>{step.num}</p>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--emerald-400)' }}>Poderes</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>O que seus agentes podem fazer</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {features.map((feat, i) => (
                <AnimatedSection key={feat.title} delay={i * 80}>
                  <div 
                    className="card p-5 transition-all duration-200 group relative overflow-hidden hover:border-[var(--violet-500)]"
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200"
                      style={{ background: `radial-gradient(circle, ${feat.color} 0%, transparent 70%)` }}
                    />
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 relative z-10"
                      style={{ background: `${feat.color}12` }}
                    >
                      <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                    </div>
                    <h3 className="font-semibold text-base mb-2 relative z-10" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                    <p className="text-xs leading-relaxed relative z-10" style={{ color: 'var(--text-tertiary)' }}>{feat.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 px-6" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--emerald-400)' }}>Planos</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>Escolha seu motor de IA</h2>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Comece gratis. Evolua quando quiser.</p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {plans.map((plan, i) => (
                <AnimatedSection key={plan.name} delay={i * 120}>
                  <div 
                    className="relative rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ 
                      background: 'var(--surface)',
                      border: `1.5px solid ${plan.popular ? 'var(--violet-500)' : 'var(--border)'}`,
                      boxShadow: plan.popular ? '0 0 30px var(--accent-glow)' : 'none'
                    }}
                  >
                    {plan.popular && (
                      <div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: 'var(--violet-600)', color: 'white' }}
                      >
                        Mais Popular
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-5">
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: `${plan.color}12`, 
                          border: `1px solid ${plan.color}30` 
                        }}
                      >
                        <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{plan.tagline}</p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span 
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold"
                          style={{ background: `${plan.color}12`, color: plan.color, border: `1px solid ${plan.color}30` }}
                        >
                          {plan.model}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{plan.modelDesc}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          {f.included ? (
                            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--emerald-400)' }} />
                          ) : (
                            <X className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                          )}
                          <span 
                            className="text-xs" 
                            style={{ color: f.included ? 'var(--text-secondary)' : 'var(--text-muted)', opacity: f.included ? 1 : 0.4 }}
                          >
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href="/dashboard" className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full text-center text-sm`}>
                      {plan.cta}
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={240}>
              <div className="text-center mt-10">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Todos os planos incluem SSL, hospedagem e atualizacoes. Cancele quando quiser.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Models */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--emerald-400)' }}>Modelos de IA</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Potenciado pelos melhores</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'GPT-4o', provider: 'OpenAI', tier: 'Free', color: 'var(--emerald-500)' },
                { name: 'Kimi K3', provider: 'Bluesminds', tier: 'Premium', color: 'var(--violet-500)' },
                { name: 'Claude', provider: 'Anthropic', tier: 'Em breve', color: 'var(--cyan-500)' },
                { name: 'Gemini', provider: 'Google', tier: 'Em breve', color: 'var(--rose-500)' },
              ].map((m, i) => (
                <AnimatedSection key={m.name} delay={i * 80}>
                  <div 
                    className="card p-5 text-center transition-all duration-200 hover:border-[var(--violet-500)]"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-200 hover:scale-105"
                      style={{ background: `${m.color}12` }}
                    >
                      <Cpu className="w-6 h-6" style={{ color: m.color }} />
                    </div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{m.name}</h4>
                    <p className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{m.provider}</p>
                    <span 
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${m.color}12`, color: m.color }}
                    >
                      {m.tier}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--violet-900), var(--cyan-900))' }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              background: 'radial-gradient(circle at 30% 50%, var(--violet-500) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--cyan-500) 0%, transparent 50%)' 
            }}
          />
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center text-white relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Seus agentes estao prontos</h2>
              <p className="text-sm mb-8 opacity-80">Comece gratis. Sem cartao de credito. Ativacao instantanea.</p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                style={{ background: 'white', color: 'var(--violet-800)' }}
              >
                Ativar Meus Agentes
                <Rocket className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5">
              <img src="/logo.svg" alt="" className="w-full h-full" />
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="hover:text-white transition-colors cursor-pointer">Termos</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacidade</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
