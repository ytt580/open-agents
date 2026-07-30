'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Globe, Bot, Mail, Search, Code, Clock,
  Zap, Rocket, Crown, Eye, Terminal, Target, ArrowUpRight,
  Brain, Cpu, Fingerprint, Orbit, Sparkles, ChevronRight
} from 'lucide-react'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(e.target) } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, show }
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, show } = useScrollReveal()
  return (
    <div ref={ref} className={className}
      style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(32px)', transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  )
}

const capabilities = [
  { icon: Search, label: 'Caca Leads', desc: 'Google Maps, LinkedIn, qualquer site', gradient: 'linear-gradient(135deg, #f97316, #ef4444)' },
  { icon: Globe, label: 'Scraping Neural', desc: 'Extrai dados com IA de qualquer pagina', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  { icon: Code, label: 'Cria Sites', desc: 'Sites profissionais em minutos', gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)' },
  { icon: Mail, label: 'Email Autonomo', desc: 'Propostas personalizadas enviadas', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
  { icon: Clock, label: '24/7 Ativo', desc: 'Agentes rodam sem parar', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
  { icon: Brain, label: 'IA Avancada', desc: 'GPT-4o, Kimi K3, Claude, Gemini', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
]

const agents = [
  { name: 'Prospeccao', tasks: '1.2K', color: '#f97316', ring: 'rgba(249, 115, 22, 0.2)' },
  { name: 'Scraping', tasks: '890', color: '#06b6d4', ring: 'rgba(6, 182, 212, 0.2)' },
  { name: 'Design', tasks: '650', color: '#8b5cf6', ring: 'rgba(139, 92, 246, 0.2)' },
  { name: 'Outreach', tasks: '2.1K', color: '#10b981', ring: 'rgba(16, 185, 129, 0.2)' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen" style={{ background: '#fafaf9', color: '#1c1917' }}>
      
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(250, 250, 249, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #e7e5e4' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
              <Zap className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: '#1c1917' }}>Open-Agents</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: '#78716c' }}>
            <a href="#features" className="hover:text-[#1c1917] transition-colors">Features</a>
            <a href="#agents" className="hover:text-[#1c1917] transition-colors">Agentes</a>
            <a href="#pricing" className="hover:text-[#1c1917] transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-bold hidden md:block" style={{ color: '#78716c' }}>Entrar</Link>
            <Link href="/dashboard" className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.03]" style={{ background: '#1c1917' }}>
              Comecar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO — Clean, not generic ============ */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1c1917 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-bold" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>
              <Sparkles className="w-4 h-4" />
              Agentes de IA que trabalham por voce
            </div>
          </Reveal>
          
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-[-0.04em] max-w-4xl">
              Automatize
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>qualquer fluxo</span>
              <br />
              do seu negocio.
            </h1>
          </Reveal>
          
          <Reveal delay={160}>
            <p className="text-lg md:text-xl mt-8 max-w-2xl leading-relaxed font-medium" style={{ color: '#78716c' }}>
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span className="font-bold" style={{ color: '#1c1917' }}> Voce so define o objetivo.</span>
            </p>
          </Reveal>
          
          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
              <Link href="/dashboard" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.03] hover:shadow-xl"
                style={{ background: '#1c1917' }}>
                Criar Primeiro Agente
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.03]"
                style={{ background: 'white', color: '#1c1917', border: '1.5px solid #d6d3d1' }}>
                Ver como funciona
              </a>
            </div>
          </Reveal>

          {/* Live ticker */}
          <Reveal delay={400}>
            <div className="mt-16 flex flex-wrap items-center gap-6 text-sm font-semibold" style={{ color: '#a8a29e' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                10.847 agentes ativos agora
              </div>
              <span style={{ color: '#d6d3d1' }}>|</span>
              <div>2.5M tarefas executadas</div>
              <span style={{ color: '#d6d3d1' }}>|</span>
              <div>99.9% uptime</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT IT DOES — Horizontal scroll cards ============ */}
      <section id="features" className="py-20 md:py-28 px-6" style={{ background: '#1c1917' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#f97316' }}>Seus agentes fazem</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-16">
              Tudo que voce precisa.
              <br />
              <span style={{ color: '#78716c' }}>Nada que voce nao precisa.</span>
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 60}>
                <div className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: cap.gradient }}>
                    <cap.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-1">{cap.label}</h3>
                  <p className="text-sm" style={{ color: '#78716c' }}>{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE DEMO — Show agents running ============ */}
      <section id="agents" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#06b6d4' }}>Ao vivo</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16" style={{ color: '#1c1917' }}>
              Seus agentes trabalhando agora.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 80}>
                <div className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'white', border: '1px solid #e7e5e4', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: agent.ring }}>
                      <Bot className="w-7 h-7" style={{ color: agent.color }} />
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: agent.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: '#1c1917' }}>Agente de {agent.name}</h3>
                    <p className="text-sm" style={{ color: '#78716c' }}>Executando tarefas automaticamente</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase" style={{ color: '#a8a29e' }}>Tarefas</p>
                    <p className="text-2xl font-black" style={{ color: agent.color }}>{agent.tasks}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — Bold numbered steps ============ */}
      <section className="py-20 md:py-28 px-6" style={{ background: '#f5f5f4' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#8b5cf6' }}>Como funciona</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16" style={{ color: '#1c1917' }}>
              Simples como conversar.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', color: '#f97316' },
              { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', color: '#8b5cf6' },
              { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada em tempo real', color: '#10b981' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'white', border: '1px solid #e7e5e4', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <span className="text-6xl font-black" style={{ color: step.color, opacity: 0.15 }}>{step.num}</span>
                  <h3 className="text-2xl font-black mt-4 mb-2" style={{ color: '#1c1917' }}>{step.title}</h3>
                  <p className="text-base" style={{ color: '#78716c' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING — Clean, bold ============ */}
      <section id="pricing" className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#10b981' }}>Planos</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#1c1917' }}>
                Escolha seu motor de IA
              </h2>
              <p className="text-base" style={{ color: '#78716c' }}>Comece gratis. Evolua quando quiser.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <Reveal delay={80}>
              <div className="p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'white', border: '1.5px solid #e7e5e4' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#f5f5f4' }}>
                    <Zap className="w-6 h-6" style={{ color: '#78716c' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black" style={{ color: '#1c1917' }}>Free</h3>
                    <p className="text-sm" style={{ color: '#a8a29e' }}>Comece sem pagar</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: '#1c1917' }}>R$ 0</span>
                  <span className="text-sm ml-1" style={{ color: '#a8a29e' }}>para sempre</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl mb-6 text-sm font-bold" style={{ background: '#f5f5f4', color: '#78716c' }}>
                  Motor: <span style={{ color: '#1c1917' }}>GPT-4o</span> — OpenAI
                </div>
                <div className="space-y-3 mb-8">
                  {['Agentes ilimitados', 'Tarefas ilimitadas', 'Scraping avancado', 'Gerador de sites', 'Email + WhatsApp', 'Agendador 24/7'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#dcfce7' }}>
                        <svg className="w-3 h-3" style={{ color: '#16a34a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#57534e' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02]"
                  style={{ background: '#f5f5f4', color: '#1c1917', border: '1.5px solid #d6d3d1' }}>
                  Comecar Gratis
                </Link>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={160}>
              <div className="p-8 rounded-3xl relative transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#1c1917', border: '1.5px solid #292524', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
                <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
                  Mais Popular
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249, 115, 22, 0.15)' }}>
                    <Crown className="w-6 h-6" style={{ color: '#f97316' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Premium</h3>
                    <p className="text-sm" style={{ color: '#78716c' }}>IA mais inteligente</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">R$ 10</span>
                  <span className="text-sm ml-1" style={{ color: '#78716c' }}>/mes</span>
                </div>
                <div className="px-4 py-2.5 rounded-xl mb-6 text-sm font-bold" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                  Motor: <span className="text-white">Kimi K3</span> — Bluesminds
                </div>
                <div className="space-y-3 mb-8">
                  {['Agentes ilimitados', 'Tarefas ilimitadas', 'Scraping avancado', 'Gerador de sites', 'Email + WhatsApp', 'Agendador 24/7'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(249, 115, 22, 0.15)' }}>
                        <svg className="w-3 h-3" style={{ color: '#f97316' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#d6d3d1' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
                  Ativar Premium
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MODELS ============ */}
      <section className="py-20 md:py-28 px-6" style={{ background: '#f5f5f4' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#ec4899' }}>Modelos</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#1c1917' }}>
                Potenciado pelos melhores.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'GPT-4o', provider: 'OpenAI', tier: 'Free', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
              { name: 'Kimi K3', provider: 'Bluesminds', tier: 'Premium', gradient: 'linear-gradient(135deg, #f97316, #ef4444)' },
              { name: 'Claude', provider: 'Anthropic', tier: 'Em breve', gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)' },
              { name: 'Gemini', provider: 'Google', tier: 'Em breve', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
            ].map((m, i) => (
              <Reveal key={m.name} delay={i * 60}>
                <div className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'white', border: '1px solid #e7e5e4' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: m.gradient }}>
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-lg" style={{ color: '#1c1917' }}>{m.name}</h4>
                  <p className="text-sm mb-3" style={{ color: '#a8a29e' }}>{m.provider}</p>
                  <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ 
                    background: m.tier === 'Free' ? '#dcfce7' : m.tier === 'Premium' ? '#fef3c7' : '#f5f5f4', 
                    color: m.tier === 'Free' ? '#16a34a' : m.tier === 'Premium' ? '#92400e' : '#78716c' 
                  }}>
                    {m.tier}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 md:py-28 px-6" style={{ background: '#1c1917' }}>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              Seus agentes estao prontos.
            </h2>
            <p className="text-lg mb-10" style={{ color: '#78716c' }}>
              Comece gratis. Sem cartao de credito. Ativacao instantanea.
            </p>
            <Link href="/dashboard"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', color: 'white' }}>
              Ativar Meus Agentes
              <Rocket className="w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid #e7e5e4', background: '#fafaf9' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
              <Zap className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="font-black text-sm" style={{ color: '#1c1917' }}>Open-Agents</span>
          </div>
          <p className="text-sm" style={{ color: '#a8a29e' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-6 text-sm font-medium" style={{ color: '#a8a29e' }}>
            <span className="hover:text-[#1c1917] transition-colors cursor-pointer">Termos</span>
            <span className="hover:text-[#1c1917] transition-colors cursor-pointer">Privacidade</span>
            <span className="hover:text-[#1c1917] transition-colors cursor-pointer">Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
