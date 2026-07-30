'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Globe, Mail, Search, Code, Clock,
  Zap, Crown, Terminal, Brain, Sparkles, Menu, X,
  ChevronRight, ArrowUpRight, Bot
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
      style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(20px)', transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  )
}

const capabilities = [
  { icon: Search, label: 'Caca Leads', desc: 'Google Maps, LinkedIn, qualquer site', color: '#22c55e' },
  { icon: Globe, label: 'Scraping Neural', desc: 'Extrai dados com IA de qualquer pagina', color: '#3b82f6' },
  { icon: Code, label: 'Cria Sites', desc: 'Sites Next.js profissionais em minutos', color: '#f97316' },
  { icon: Mail, label: 'Email Autonomo', desc: 'Propostas personalizadas enviadas', color: '#a855f7' },
  { icon: Clock, label: '24/7 Ativo', desc: 'Agentes rodam sem parar', color: '#fafafa' },
  { icon: Brain, label: '39+ Modelos', desc: 'GPT-5, Claude, Gemini, Llama, DeepSeek', color: '#ef4444' },
]

const codeSnippet = `// Seu agente em acao
const agente = await openagents.create({
  nome: "Caca Leads Tech",
  objetivo: "Encontrar startups de SaaS no Brasil",
  motor: "github-free", // 24 modelos gratis
  etapas: [
    "Buscar no Google Maps",
    "Extrair dados do site",
    "Classificar por porte",
    "Enviar proposta personalizada"
  ]
})

// Resultado em 5 minutos:
// 47 leads qualificados
// 12 propostas enviadas
// 3 respostas positivas`

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#fafafa' }}>
      
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #222' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#fafafa' }}>
              <Zap className="w-3.5 h-3.5" style={{ color: '#0a0a0a' }} strokeWidth={3} />
            </div>
            <span className="font-bold text-sm tracking-tight">open-agents</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium" style={{ color: '#666' }}>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#models" className="hover:text-white transition-colors">Modelos</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="https://github.com/ytt580/open-agents" target="_blank" rel="noopener" className="hover:text-white transition-colors flex items-center gap-1">GitHub <ArrowUpRight className="w-3 h-3" /></a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-xs font-medium hidden md:block" style={{ color: '#666' }}>Entrar</Link>
            <Link href="/dashboard" className="text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90" style={{ background: '#fafafa', color: '#0a0a0a' }}>
              Comecar Gratis
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden btn-icon" style={{ color: '#fafafa', width: '36px', height: '36px' }}>
              {mobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden px-4 pb-4 space-y-2" style={{ borderTop: '1px solid #222' }}>
            <a href="#features" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-medium" style={{ color: '#666' }}>Features</a>
            <a href="#models" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-medium" style={{ color: '#666' }}>Modelos</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-medium" style={{ color: '#666' }}>Pricing</a>
            <Link href="/dashboard" onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-semibold" style={{ color: '#fafafa' }}>Entrar</Link>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fafafa 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium" style={{ background: '#1a1a1a', color: '#666', border: '1px solid #222' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
              24 modelos gratis + 15 premium
            </div>
          </Reveal>
          
          <Reveal delay={60}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] max-w-3xl">
              Automatize
              <br />
              <span style={{ color: '#666' }}>qualquer fluxo</span>
              <br />
              do seu negocio.
            </h1>
          </Reveal>
          
          <Reveal delay={120}>
            <p className="text-base md:text-lg mt-5 max-w-xl leading-relaxed" style={{ color: '#666' }}>
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span style={{ color: '#fafafa' }}> Voce so define o objetivo.</span>
            </p>
          </Reveal>
          
          <Reveal delay={180}>
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-7">
              <Link href="/dashboard" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: '#fafafa', color: '#0a0a0a' }}>
                Criar Primeiro Agente
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:border-[#444]"
                style={{ background: 'transparent', color: '#fafafa', border: '1px solid #333' }}>
                Ver como funciona
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CODE DEMO ============ */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="code-block relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid #222' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#fbbf24' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                </div>
                <span className="text-xs font-medium ml-2" style={{ color: '#666', fontFamily: 'var(--font-mono)' }}>agente.ts</span>
              </div>
              <pre className="text-sm leading-relaxed overflow-x-auto" style={{ color: '#a1a1a1', fontFamily: 'var(--font-mono)' }}>
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Capabilities</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Tudo que voce precisa.<br/>
                <span style={{ color: '#666' }}>Nada que voce nao precisa.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#222' }}>
            {capabilities.map((cap, i) => (
              <Reveal key={cap.label} delay={i * 50}>
                <div className="group p-6 transition-all duration-300 cursor-default" style={{ background: '#0a0a0a' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110" style={{ background: '#1a1a1a' }}>
                    <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{cap.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{cap.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24 px-4 md:px-6" style={{ borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Workflow</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Simples como conversar.
              </h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#222' }}>
            {[
              { num: '01', title: 'Defina o objetivo', desc: 'Converse com o agente e descreva o que quer fazer', color: '#f97316' },
              { num: '02', title: 'Ative o agente', desc: 'O agente cria o plano e comeca a executar', color: '#fafafa' },
              { num: '03', title: 'Acompanhe', desc: 'Veja cada acao sendo tomada em tempo real', color: '#22c55e' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="p-6 md:p-8 transition-all duration-300" style={{ background: '#0a0a0a' }}>
                  <span className="text-4xl md:text-5xl font-bold" style={{ color: step.color, opacity: 0.15 }}>{step.num}</span>
                  <h3 className="text-lg md:text-xl font-bold mt-3 mb-1.5">{step.title}</h3>
                  <p className="text-sm" style={{ color: '#666' }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODELS ============ */}
      <section id="models" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Modelos</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Potenciado pelos melhores.
              </h2>
              <p className="text-sm mt-2" style={{ color: '#666' }}>24 gratuitos + 15 premium</p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#222' }}>
            {[
              { name: 'GPT-5', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Claude Sonnet', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Gemini 2.5', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'DeepSeek R1', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Llama 4 Scout', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Mistral Large', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Codestral', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'Phi-4', provider: 'GitHub AI', tier: 'Free', color: '#22c55e' },
              { name: 'GPT-4o', provider: 'Puter.js', tier: 'Premium', color: '#f97316' },
              { name: 'DeepSeek R1', provider: 'Puter.js', tier: 'Premium', color: '#f97316' },
              { name: 'GPT-OSS 120B', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
              { name: 'Gemma 4 26B', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
              { name: 'Nemotron 3', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
              { name: 'FLUX.2 Dev', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
              { name: 'Kimi K2.7', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
              { name: 'QwQ 32B', provider: 'Cloudflare', tier: 'Premium', color: '#06b6d4' },
            ].map((m, i) => (
              <Reveal key={m.name + m.provider} delay={i * 30}>
                <div className="p-4 md:p-5 transition-all duration-300 cursor-default" style={{ background: '#0a0a0a' }}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{m.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ 
                      background: m.tier === 'Free' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)', 
                      color: m.tier === 'Free' ? '#22c55e' : '#f97316' 
                    }}>
                      {m.tier}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#666' }}>{m.provider}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="py-16 md:py-24 px-4 md:px-6" style={{ borderTop: '1px solid #222' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#22c55e' }}>Pricing</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                Escolha seu motor de IA
              </h2>
              <p className="text-sm" style={{ color: '#666' }}>Comece gratis. Evolua quando quiser.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#222' }}>
            {/* Free */}
            <Reveal delay={80}>
              <div className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4" style={{ color: '#666' }} />
                  <h3 className="text-lg font-bold">Free</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-sm ml-1" style={{ color: '#666' }}>para sempre</span>
                </div>
                <p className="text-xs font-medium mb-4" style={{ color: '#666' }}>
                  Motor: <span style={{ color: '#fafafa' }}>GitHub AI</span> — 24 modelos
                </p>
                <div className="space-y-2.5 mb-6">
                  {['GPT-4o, GPT-5 Nano, Claude Sonnet', 'DeepSeek R1, Llama 4, Mistral Large', 'Agentes ilimitados', 'Scraping + Email + WhatsApp'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs" style={{ color: '#a1a1a1' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: '#1a1a1a', color: '#fafafa', border: '1px solid #333' }}>
                  Comecar Gratis
                </Link>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={160}>
              <div className="p-6 md:p-8 relative" style={{ background: '#111' }}>
                <div className="absolute top-6 right-6 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316' }}>
                  Popular
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-4 h-4" style={{ color: '#f97316' }} />
                  <h3 className="text-lg font-bold">Premium</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R$ 49</span>
                  <span className="text-sm ml-1" style={{ color: '#666' }}>/mes</span>
                </div>
                <p className="text-xs font-medium mb-4" style={{ color: '#666' }}>
                  Motor: <span style={{ color: '#fafafa' }}>Puter.js + Cloudflare</span> — 15 modelos
                </p>
                <div className="space-y-2.5 mb-6">
                  {['GPT-4o, Claude Sonnet, DeepSeek R1', 'GPT-OSS 120B, Gemma 4, Nemotron 3', 'Agentes ilimitados', 'Scraping + Email + WhatsApp'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f97316' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-xs" style={{ color: '#a1a1a1' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: '#fafafa', color: '#0a0a0a' }}>
                  Ativar Premium
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Seus agentes estao prontos.
            </h2>
            <p className="text-sm mb-8" style={{ color: '#666' }}>
              Comece gratis. Sem cartao de credito. Ativacao instantanea.
            </p>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: '#fafafa', color: '#0a0a0a' }}>
              Ativar Meus Agentes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-6 px-4 md:px-6" style={{ borderTop: '1px solid #222' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#fafafa' }}>
              <Zap className="w-2.5 h-2.5" style={{ color: '#0a0a0a' }} strokeWidth={3} />
            </div>
            <span className="font-bold text-xs">open-agents</span>
          </div>
          <p className="text-xs" style={{ color: '#666' }}>2026 Open-Agents. Agentes trabalhando 24/7.</p>
          <div className="flex items-center gap-4 text-xs font-medium" style={{ color: '#666' }}>
            <a href="https://github.com/ytt580/open-agents" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:contato@open-agents.com" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
