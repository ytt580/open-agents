'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  Zap, Globe, Bot, ArrowRight, Sparkles,
  Search, Mail, Code, MessageSquare, Shield,
  Clock, TrendingUp, Users, BarChart3, Brain,
  Cpu, Network, Rocket, Star, ChevronRight,
  Check, X, Infinity, Crown, Bolt, Eye
} from 'lucide-react'

/* ============================================
   ANIMATED BACKGROUND COMPONENT
   ============================================ */
function NeuralBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07]"
        style={{ 
          top: '-200px', 
          left: '-200px', 
          background: 'radial-gradient(circle, var(--neural-600) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ 
          bottom: '-150px', 
          right: '-150px', 
          background: 'radial-gradient(circle, var(--electric-500) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite reverse'
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ 
          top: '40%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, var(--plasma-500) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}

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
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

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
      className={`transition-all duration-500 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
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
  { icon: Brain, title: 'IA Autonoma', desc: 'Agentes que pensam, decidem e executam sozinhos. Voce so define o objetivo.', color: 'var(--neural-500)' },
  { icon: Globe, title: 'Scraping Neural', desc: 'Extraia dados de qualquer site com inteligencia artificial.', color: 'var(--electric-500)' },
  { icon: Code, title: 'Gerador de Sites', desc: 'Agentes criam sites profissionais em minutos. Design moderno e responsivo.', color: 'var(--plasma-500)' },
  { icon: Mail, title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas automaticamente.', color: 'var(--hot-500)' },
  { icon: Search, title: 'Caca Leads', desc: 'Encontre empresas por nicho, localizacao e avaliacao.', color: 'var(--neural-400)' },
  { icon: Clock, title: '24/7 Online', desc: 'Agentes rodam 24 horas, 7 dias por semana.', color: 'var(--electric-400)' },
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
    color: 'var(--electric-500)',
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
    color: 'var(--neural-500)',
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
      <NeuralBackground />
      
      {/* Skip to content - Accessibility */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
        style={{ 
          background: 'var(--neural-600)', 
          color: 'white',
          outline: '2px solid var(--neural-400)',
          outlineOffset: '2px'
        }}
      >
        Pular para o conteudo
      </a>
      
      {/* Nav */}
      <nav 
        className="fixed top-0 w-full z-50 transition-all duration-200"
        style={{ 
          background: 'rgba(6, 6, 11, 0.85)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)'
        }}
        role="navigation"
        aria-label="Navegacao principal"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/logo.svg" alt="" className="w-full h-full" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#agents" className="hover:text-white transition-colors duration-200">Agentes</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Planos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hidden md:block hover:text-white transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
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
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${60 + Math.random() * 100}px`,
                  height: `${60 + Math.random() * 100}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  background: `radial-gradient(circle, ${
                    ['var(--neural-600)', 'var(--electric-600)', 'var(--plasma-600)'][i % 3]
                  } 0%, transparent 70%)`,
                  opacity: 0.06 + Math.random() * 0.04,
                  animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                background: 'var(--accent-glow)', 
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--neural-400)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--neural-300)' }}>Agentes de IA Autonomos</span>
            </div>
            
            {/* Title - Gradient text only here */}
            <h1 
              className={`text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.92] mb-8 tracking-tight transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="text-gradient">Automatize</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>qualquer fluxo</span>
              <br />
              <span className="font-medium" style={{ color: 'var(--text-muted)' }}>com IA autonoma</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ color: 'var(--text-secondary)' }}
            >
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <br />
              <span className="font-semibold" style={{ color: 'var(--plasma-400)' }}>Voce so define o objetivo.</span>
            </p>
            
            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Link href="/dashboard" className="btn-primary text-base py-4 px-8 group">
                <span>Criar Primeiro Agente</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a href="#pricing" className="btn-secondary text-base py-4 px-8">
                Ver Planos
              </a>
            </div>
            
            {/* Stats */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-500 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl" style={{ background: 'var(--surface)' }}>
                  <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--plasma-400)' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Banner */}
        <section 
          className="py-6 px-6"
          style={{ 
            background: 'var(--bg-secondary)', 
            borderTop: '1px solid var(--border)', 
            borderBottom: '1px solid var(--border)' 
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <Eye className="w-4 h-4" style={{ color: 'var(--plasma-400)' }} />
              <span>Agentes executando agora</span>
            </div>
            {agents.slice(0, 3).map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse" 
                  style={{ background: 'var(--plasma-400)' }} 
                  aria-hidden="true"
                />
                <span style={{ color: 'var(--text-secondary)' }}>{a.name}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--plasma-400)' }}>{a.tasks}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Agents Preview */}
        <section id="agents" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--plasma-400)' }}>Seus Agentes</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Trabalhando para voce</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent, i) => (
                <AnimatedSection key={agent.name} delay={i * 100}>
                  <div 
                    className="card p-6 group transition-all duration-200 hover:border-[var(--neural-500)] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--neural-600), var(--electric-600))'
                        }}
                      >
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ background: 'var(--plasma-400)' }} 
                            aria-label="Online"
                          />
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{agent.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tarefas</p>
                        <p className="font-semibold font-mono" style={{ color: 'var(--plasma-400)' }}>{agent.tasks}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--plasma-400)' }}>Como funciona</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Simples como conversar</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 100}>
                  <div className="text-center relative">
                    {i < steps.length - 1 && (
                      <div 
                        className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px"
                        style={{ background: 'linear-gradient(90deg, var(--neural-500), transparent)' }}
                        aria-hidden="true"
                      />
                    )}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 transition-transform duration-200 hover:scale-110"
                      style={{ 
                        background: 'var(--surface)', 
                        border: '1px solid var(--neural-500)'
                      }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: 'var(--neural-400)' }} />
                    </div>
                    <p className="text-xs font-mono mb-2" style={{ color: 'var(--plasma-400)' }}>{step.num}</p>
                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--plasma-400)' }}>Poderes</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>O que seus agentes podem fazer</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feat, i) => (
                <AnimatedSection key={feat.title} delay={i * 80}>
                  <div 
                    className="card p-6 transition-all duration-200 group relative overflow-hidden hover:border-[var(--neural-500)] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div 
                      className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                      style={{ background: `radial-gradient(circle, ${feat.color} 0%, transparent 70%)` }}
                      aria-hidden="true"
                    />
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110 relative z-10"
                      style={{ background: `${feat.color}15` }}
                    >
                      <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 relative z-10" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                    <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--plasma-400)' }}>Planos</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Escolha seu motor de IA</h2>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Comece gratis. Evolua quando quiser.</p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {plans.map((plan, i) => (
                <AnimatedSection key={plan.name} delay={i * 150}>
                  <div 
                    className="relative rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
                    style={{ 
                      background: 'var(--surface)',
                      border: `2px solid ${plan.popular ? 'var(--neural-500)' : 'var(--border)'}`,
                      boxShadow: plan.popular ? '0 0 40px var(--accent-glow)' : 'none'
                    }}
                  >
                    {plan.popular && (
                      <div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                        style={{ 
                          background: 'var(--neural-600)', 
                          color: 'white'
                        }}
                        aria-label="Plano mais popular"
                      >
                        MAIS POPULAR
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: `${plan.color}15`, 
                          border: `1px solid ${plan.color}40` 
                        }}
                      >
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
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                          style={{ background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}40` }}
                        >
                          {plan.model}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{plan.modelDesc}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-3">
                          {f.included ? (
                            <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--plasma-400)' }} aria-hidden="true" />
                          ) : (
                            <X className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-tertiary)', opacity: 0.4 }} aria-hidden="true" />
                          )}
                          <span 
                            className="text-sm" 
                            style={{ color: f.included ? 'var(--text-secondary)' : 'var(--text-tertiary)', opacity: f.included ? 1 : 0.4 }}
                          >
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href="/dashboard" className={`${plan.ctaStyle} w-full text-center`}>
                      {plan.cta}
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={300}>
              <div className="text-center mt-12">
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Todos os planos incluem SSL, hospedagem e atualizacoes. Cancele quando quiser.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Models */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--plasma-400)' }}>Modelos de IA</p>
                <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Potenciado pelos melhores</h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'GPT-5', provider: 'OpenAI', tier: 'Free', color: 'var(--plasma-500)' },
                { name: 'Kimi K3', provider: 'Bluesminds', tier: 'Premium', color: 'var(--neural-500)' },
                { name: 'Claude', provider: 'Anthropic', tier: 'Em breve', color: 'var(--electric-500)' },
                { name: 'Gemini', provider: 'Google', tier: 'Em breve', color: 'var(--hot-500)' },
              ].map((m, i) => (
                <AnimatedSection key={m.name} delay={i * 100}>
                  <div 
                    className="card p-6 text-center transition-all duration-200 hover:border-[var(--neural-500)] hover:shadow-lg hover:-translate-y-1"
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-200 hover:scale-110"
                      style={{ background: `${m.color}15` }}
                    >
                      <Cpu className="w-7 h-7" style={{ color: m.color }} />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{m.name}</h4>
                    <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{m.provider}</p>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${m.color}15`, color: m.color }}
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
        <section className="py-24 px-6 relative overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--neural-800), var(--electric-800))' }}
          />
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              background: 'radial-gradient(circle at 30% 50%, var(--neural-500) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--electric-500) 0%, transparent 50%)' 
            }}
          />
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center text-white relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Seus agentes estao prontos</h2>
              <p className="text-xl mb-10 opacity-90">Comece gratis. Sem cartao de credito. Ativacao instantanea.</p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: 'white', color: 'var(--neural-800)' }}
              >
                Ativar Meus Agentes
                <Rocket className="w-6 h-6" />
              </Link>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <img src="/logo.svg" alt="" className="w-full h-full" aria-hidden="true" />
            </div>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
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
