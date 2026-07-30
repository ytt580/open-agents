'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Globe, Bot, Mail, Search, Code, Clock,
  Zap, Rocket, Crown, Eye, Terminal, Target, ArrowUpRight,
  Brain, Cpu, Fingerprint, Orbit, Sparkles, ChevronRight, Menu, X
} from 'lucide-react'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(e.target) } }, { threshold: 0.1 })
    obs.observe(el)
    const t = setTimeout(() => setShow(true), 300)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [])
  return { ref, show }
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, show } = useScrollReveal()
  return (
    <div ref={ref} className={className}
      style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(24px)', transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  )
}

const capabilities = [
  { icon: Search, label: 'Caca Leads', desc: 'Google Maps, LinkedIn, qualquer site', color: 'var(--green)' },
  { icon: Globe, label: 'Scraping Neural', desc: 'Extrai dados com IA de qualquer pagina', color: 'var(--blue)' },
  { icon: Code, label: 'Cria Sites', desc: 'Sites Next.js profissionais em minutos', color: 'var(--orange)' },
  { icon: Mail, label: 'Email Autonomo', desc: 'Propostas personalizadas enviadas', color: 'var(--purple)' },
  { icon: Clock, label: '24/7 Ativo', desc: 'Agentes rodam sem parar', color: 'var(--fg)' },
  { icon: Brain, label: '34+ Modelos', desc: 'GPT-5, Claude, Gemini, Llama, DeepSeek', color: 'var(--red)' },
]

const models = [
  { name: 'GPT-4o', provider: 'OpenAI', tier: 'Free', color: 'var(--green)' },
  { name: 'GPT-5 Nano', provider: 'OpenAI', tier: 'Free', color: 'var(--green)' },
  { name: 'Claude Sonnet', provider: 'Anthropic', tier: 'Free', color: 'var(--green)' },
  { name: 'Llama 4', provider: 'Meta', tier: 'Free', color: 'var(--green)' },
  { name: 'DeepSeek R1', provider: 'DeepSeek', tier: 'Free', color: 'var(--green)' },
  { name: 'Gemini Flash', provider: 'Google', tier: 'Free', color: 'var(--green)' },
  { name: 'Claude Opus', provider: 'Anthropic', tier: 'Premium', color: 'var(--orange)' },
  { name: 'GPT-5.3 Codex', provider: 'OpenAI', tier: 'Premium', color: 'var(--orange)' },
]

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(250, 250, 249, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--orange), var(--red))' }}>
              <Zap className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: 'var(--fg)' }}>Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: 'var(--fg-muted)' }}>
            <a href="#features" className="hover:text-[var(--fg)] transition-colors">Features</a>
            <a href="#models" className="hover:text-[var(--fg)] transition-colors">Modelos</a>
            <a href="#pricing" className="hover:text-[var(--fg)] transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-bold hidden md:block" style={{ color: 'var(--fg-muted)' }}>Entrar</Link>
            <Link href="/dashboard" className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.03] hover:shadow-lg" style={{ background: 'var(--fg)' }}>
              Comecar Gratis
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden btn-icon" style={{ color: 'var(--fg)' }}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-2" style={{ borderTop: '1px solid var(--border)' }}>
            <a href="#features" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-semibold" style={{ color: 'var(--fg-muted)' }}>Features</a>
            <a href="#models" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-semibold" style={{ color: 'var(--fg-muted)' }}>Modelos</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-semibold" style={{ color: 'var(--fg-muted)' }}>Planos</a>
            <Link href="/dashboard" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-bold" style={{ color: 'var(--fg)' }}>Entrar</Link>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-28 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, var(--fg) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 md:mb-8 text-xs md:text-sm font-bold" style={{ background: 'var(--orange-bg)', color: 'var(--orange)', border: '1px solid var(--orange-bg)' }}>
              <Sparkles className="w-4 h-4" />
              Agentes de IA que trabalham por voce
            </div>
          </Reveal>
          
          <Reveal delay={80}>
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-[-0.04em] max-w-4xl">
              Automatize
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, var(--orange), var(--red), var(--purple))', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>qualquer fluxo</span>
              <br />
              do seu negocio.
            </h1>
          </Reveal>
          
          <Reveal delay={160}>
            <p className="text-base md:text-xl mt-6 md:mt-8 max-w-2xl leading-relaxed font-medium" style={{ color: 'var(--fg-muted)' }}>
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span className="font-bold" style={{ color: 'var(--fg)' }}> Voce so define o objetivo.</span>
            </p>
          </Reveal>
          
          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8 md:mt-10">
              <Link href="/dashboard" 
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base text-white transition-all hover:scale-[1.03] hover:shadow-xl"
                style={{ background: 'var(--fg)' }}>
                Criar Primeiro Agente
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" 
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base transition-all hover:scale-[1.03]"
                style={{ background: 'var(--bg)', color: 'var(--fg)', border: '1.5px solid var(--border)' }}>
                Ver como funciona
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="py-16 md:py-28 px-4 md:px-6" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-muted)' }}>Seus agentes fazem</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16" style={{ color: 'var(--fg)' }}>
              Tudo que voce precisa.<br/>
              <span style={{ color: 'var(--fg-muted)' }}>Nada que voce nao precisa.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 60}>
                <div className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'var(--bg-muted)' }}>
                    <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--fg)' }}>{cap.label}</h3>
                  <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-28 px-4 md:px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-muted)' }}>Como funciona</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 md:mb-16" style={{ color: 'var(--fg)' }}>
              Simples como conversar.
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', color: 'var(--orange)' },
              { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', color: 'var(--accent)' },
              { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada em tempo real', color: 'var(--green)' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="p-6 md:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <span className="text-5xl md:text-6xl font-black" style={{ color: step.color, opacity: 0.15 }}>{step.num}</span>
                  <h3 className="text-xl md:text-2xl font-black mt-4 mb-2" style={{ color: 'var(--fg)' }}>{step.title}</h3>
                  <p className="text-sm md:text-base" style={{ color: 'var(--fg-muted)' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODELS ============ */}
      <section id="models" className="py-16 md:py-28 px-4 md:px-6" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-muted)' }}>Modelos</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--fg)' }}>
                Potenciado pelos melhores.
              </h2>
              <p className="text-base mt-4" style={{ color: 'var(--fg-muted)' }}>14 gratuitos via GitHub AI + 20 premium</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {models.map((m, i) => (
              <Reveal key={m.name} delay={i * 40}>
                <div className="p-4 md:p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--bg-muted)' }}>
                    <Cpu className="w-6 h-6" style={{ color: m.color }} />
                  </div>
                  <h4 className="font-bold text-sm md:text-base" style={{ color: 'var(--fg)' }}>{m.name}</h4>
                  <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>{m.provider}</p>
                  <span className="text-[10px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold" style={{ 
                    background: m.tier === 'Free' ? 'var(--green-bg)' : 'var(--orange-bg)', 
                    color: m.tier === 'Free' ? 'var(--green)' : 'var(--orange)' 
                  }}>
                    {m.tier}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="py-16 md:py-28 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--green)' }}>Planos</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
                Escolha seu motor de IA
              </h2>
              <p className="text-base" style={{ color: 'var(--fg-muted)' }}>Comece gratis. Evolua quando quiser.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <Reveal delay={80}>
              <div className="p-6 md:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-muted)' }}>
                    <Zap className="w-6 h-6" style={{ color: 'var(--fg-muted)' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black" style={{ color: 'var(--fg)' }}>Free</h3>
                    <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Comece sem pagar</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: 'var(--fg)' }}>R$ 0</span>
                  <span className="text-sm ml-1" style={{ color: 'var(--fg-muted)' }}>para sempre</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl mb-6 text-sm font-bold" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                  Motor: <span style={{ color: 'var(--fg)' }}>GitHub AI</span> — 14 modelos
                </div>
                <div className="space-y-3 mb-8">
                  {['GPT-4o, GPT-5 Nano, Claude Sonnet', 'Llama 4, DeepSeek R1, Gemini Flash', 'Agentes ilimitados', 'Scraping + Email + WhatsApp'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green-bg)' }}>
                        <svg className="w-3 h-3" style={{ color: 'var(--green)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02]"
                  style={{ background: 'var(--bg-muted)', color: 'var(--fg)', border: '1.5px solid var(--border)' }}>
                  Comecar Gratis
                </Link>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={160}>
              <div className="p-6 md:p-8 rounded-3xl relative transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--fg)', border: '1.5px solid var(--fg)', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
                <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: 'linear-gradient(135deg, var(--orange), var(--red))' }}>
                  Gerador de Sites
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249, 115, 22, 0.15)' }}>
                    <Crown className="w-6 h-6" style={{ color: 'var(--orange)' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Premium</h3>
                    <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Fable 5 — Site Builder</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">R$ 99</span>
                  <span className="text-sm ml-1" style={{ color: 'var(--fg-muted)' }}>por site</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl mb-6 text-sm font-bold" style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--orange)' }}>
                  Motor: <span className="text-white">Fable 5</span> — Next.js 14
                </div>
                <div className="space-y-3 mb-8">
                  {['Projeto Next.js completo', 'App Router + Tailwind', 'Componentes profissionais', 'Deploy instantaneo', 'Proposta automatica', 'Comparacao visual'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249, 115, 22, 0.15)' }}>
                        <svg className="w-3 h-3" style={{ color: 'var(--orange)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#d6d3d1' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, var(--orange), var(--red))' }}>
                  Criar Meu Site
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 md:py-28 px-4 md:px-6" style={{ background: 'var(--fg)' }}>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
              Seus agentes estao prontos.
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: 'var(--fg-muted)' }}>
              Comece gratis. Sem cartao de credito. Ativacao instantanea.
            </p>
            <Link href="/dashboard"
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all hover:scale-[1.03] hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, var(--orange), var(--red))', color: 'white' }}>
              Ativar Meus Agentes
              <Rocket className="w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 px-4 md:px-6" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--orange), var(--red))' }}>
              <Zap className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="font-black text-sm" style={{ color: 'var(--fg)' }}>Open-Agents</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>
            <a href="https://github.com/ytt580/open-agents" target="_blank" rel="noopener" className="hover:text-[var(--fg)] transition-colors">GitHub</a>
            <a href="mailto:contato@open-agents.com" className="hover:text-[var(--fg)] transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
