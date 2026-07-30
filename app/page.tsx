'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); obs.unobserve(e.target) } }, { threshold: 0.15 })
    obs.observe(el)
    const t = setTimeout(() => setShow(true), 400)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <div ref={ref} className={className}
      style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#fafafa', color: '#0a0a0a' }}>
      
      {/* ============ NAV ============ */}
      <nav 
        className="fixed top-0 w-full z-50 transition-all duration-700"
        style={{ 
          background: scrolled ? 'rgba(250, 250, 250, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-[15px] tracking-[-0.03em]">open-agents</Link>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ color: '#999' }}>
            <a href="#features" className="hover:text-[#0a0a0a] transition-colors duration-300">Features</a>
            <a href="#workflow" className="hover:text-[#0a0a0a] transition-colors duration-300">Workflow</a>
            <a href="#models" className="hover:text-[#0a0a0a] transition-colors duration-300">Modelos</a>
            <a href="#pricing" className="hover:text-[#0a0a0a] transition-colors duration-300">Pricing</a>
            <a href="https://github.com/ytt580/open-agents" target="_blank" rel="noopener" className="hover:text-[#0a0a0a] transition-colors duration-300 flex items-center gap-1">GitHub <ArrowUpRight className="w-3 h-3" /></a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-[13px] font-medium hidden md:block" style={{ color: '#999' }}>Entrar</Link>
            <Link href="/dashboard" className="text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:opacity-80" style={{ background: '#0a0a0a', color: '#fafafa' }}>
              Comecar Gratis
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden" style={{ color: '#0a0a0a' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={mobileMenu ? "M5 5L15 15M15 5L5 15" : "M3 6H17M3 10H17M3 14H17"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden px-6 pb-6 space-y-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <a href="#features" onClick={() => setMobileMenu(false)} className="block py-1 text-[13px] font-medium" style={{ color: '#999' }}>Features</a>
            <a href="#workflow" onClick={() => setMobileMenu(false)} className="block py-1 text-[13px] font-medium" style={{ color: '#999' }}>Workflow</a>
            <a href="#pricing" onClick={() => setMobileMenu(false)} className="block py-1 text-[13px] font-medium" style={{ color: '#999' }}>Pricing</a>
            <Link href="/dashboard" onClick={() => setMobileMenu(false)} className="block py-1 text-[13px] font-semibold" style={{ color: '#0a0a0a' }}>Entrar</Link>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
      <section className="pt-36 pb-16 md:pt-52 md:pb-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ background: '#f0f0f0', color: '#888' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#111]" />
              39+ modelos de IA
            </div>
          </Reveal>
          
          <Reveal delay={80}>
            <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.05em] max-w-[1000px]">
              Automatize
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.05em] max-w-[1000px]" style={{ color: '#ccc' }}>
              qualquer fluxo.
            </h1>
          </Reveal>
          
          <Reveal delay={220}>
            <p className="text-[15px] md:text-[17px] mt-8 md:mt-10 max-w-lg leading-relaxed" style={{ color: '#999' }}>
              Seus agentes buscam leads, criam sites, enviam propostas e fecham negocios.
              <span className="font-semibold" style={{ color: '#0a0a0a' }}> Voce so define o objetivo.</span>
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <Link href="/dashboard" 
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
                style={{ background: '#0a0a0a', color: '#fafafa' }}>
                Criar Primeiro Agente
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href="#features" 
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-60"
                style={{ color: '#0a0a0a' }}>
                Ver como funciona
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="py-6 overflow-hidden" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {['GitHub AI', 'Cloudflare Workers', 'Puter.js', 'GPT-5', 'Claude Sonnet', 'Gemini', 'DeepSeek', 'Llama 4', 'Mistral', 'FLUX.2', 'Codestral'].map(name => (
                <span key={name} className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#ccc' }}>{name}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-20 md:mb-28">
              <p className="section-num mb-4">01 / Capabilities</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05]">
                Tudo que voce precisa.
              </h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#eee' }}>
            {[
              { title: 'Caca Leads', desc: 'Google Maps, LinkedIn, qualquer site. Seu agente encontra e qualifica leads automaticamente.', num: '01' },
              { title: 'Scraping Neural', desc: 'Extrai dados de qualquer pagina com IA. Estruturado, limpo e pronto para uso.', num: '02' },
              { title: 'Cria Sites', desc: 'Sites Next.js profissionais em minutos. Deploy automatico no Render.', num: '03' },
              { title: 'Email Autonomo', desc: 'Propostas personalizadas enviadas com follow-up automatico.', num: '04' },
            ].map((feat, i) => (
              <Reveal key={feat.num} delay={i * 80}>
                <div className="p-8 md:p-12 lg:p-16 transition-all duration-500 group cursor-default" style={{ background: '#fafafa' }}>
                  <p className="section-num mb-6">{feat.num}</p>
                  <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.03em] mb-4 leading-[1.1]">{feat.title}</h3>
                  <p className="text-[14px] leading-[1.7] max-w-sm" style={{ color: '#999' }}>{feat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW ============ */}
      <section id="workflow" className="py-24 md:py-40 px-6 md:px-10" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-20 md:mb-28">
              <p className="section-num mb-4" style={{ color: '#444' }}>02 / Workflow</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-white">
                Simples como conversar.
              </h2>
            </div>
          </Reveal>
          
          <div className="space-y-0">
            {[
              { num: '01', title: 'Defina', desc: 'Converse com o agente. Descreva o objetivo em linguagem natural.' },
              { num: '02', title: 'Ative', desc: 'O agente cria o plano e comeca a executar cada etapa.' },
              { num: '03', title: 'Acompanhe', desc: 'Veja cada acao em tempo real. Ajuste quando quiser.' },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="flex items-start gap-8 md:gap-16 py-10 md:py-14" style={{ borderBottom: '1px solid #222' }}>
                  <span className="text-[clamp(2rem,5vw,4rem)] font-bold leading-none" style={{ color: '#333' }}>{step.num}</span>
                  <div>
                    <h3 className="text-[clamp(1.3rem,2.5vw,2rem)] font-bold text-white mb-3 tracking-[-0.03em]">{step.title}</h3>
                    <p className="text-[14px] leading-[1.7] max-w-md" style={{ color: '#666' }}>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODELS ============ */}
      <section id="models" className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-20 md:mb-28">
              <p className="section-num mb-4">03 / Modelos</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05]">
                Potenciado pelos melhores.
              </h2>
              <p className="text-[13px] mt-4" style={{ color: '#aaa' }}>24 gratuitos + 15 premium</p>
            </div>
          </Reveal>
          
          <div className="space-y-0">
            {[
              { name: 'GPT-5', provider: 'GitHub AI', tier: 'Free' },
              { name: 'Claude Sonnet', provider: 'GitHub AI', tier: 'Free' },
              { name: 'Gemini 2.5 Flash', provider: 'GitHub AI', tier: 'Free' },
              { name: 'DeepSeek R1', provider: 'GitHub AI', tier: 'Free' },
              { name: 'Llama 4 Scout', provider: 'GitHub AI', tier: 'Free' },
              { name: 'Mistral Large', provider: 'GitHub AI', tier: 'Free' },
              { name: 'Codestral', provider: 'GitHub AI', tier: 'Free' },
              { name: 'GPT-4o', provider: 'Puter.js', tier: 'Premium' },
              { name: 'DeepSeek R1', provider: 'Puter.js', tier: 'Premium' },
              { name: 'GPT-OSS 120B', provider: 'Cloudflare', tier: 'Premium' },
              { name: 'Gemma 4 26B', provider: 'Cloudflare', tier: 'Premium' },
              { name: 'Nemotron 3 120B', provider: 'Cloudflare', tier: 'Premium' },
              { name: 'FLUX.2 Dev', provider: 'Cloudflare', tier: 'Premium' },
            ].map((m, i) => (
              <Reveal key={m.name + m.provider} delay={i * 35}>
                <div className="flex items-center justify-between py-5 md:py-6 transition-all duration-300 group cursor-default" style={{ borderBottom: '1px solid #eee' }}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[clamp(1rem,2vw,1.4rem)] font-bold tracking-[-0.02em] group-hover:tracking-[0em] transition-all duration-500">{m.name}</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em]" style={{ color: '#bbb' }}>{m.provider}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full" style={{ 
                    background: m.tier === 'Free' ? '#f0f0f0' : '#0a0a0a', 
                    color: m.tier === 'Free' ? '#888' : '#fafafa' 
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
      <section id="pricing" className="py-24 md:py-40 px-6 md:px-10" style={{ borderTop: '1px solid #eee' }}>
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="mb-20 md:mb-28">
              <p className="section-num mb-4">04 / Pricing</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05]">
                Escolha seu motor.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <Reveal delay={80}>
              <div className="p-8 md:p-10 rounded-[24px] transition-all duration-500" style={{ background: '#f5f5f5', border: '1px solid #eee' }}>
                <h3 className="text-lg font-bold mb-1">Free</h3>
                <p className="text-[12px] mb-8" style={{ color: '#aaa' }}>Comece sem pagar</p>
                <div className="mb-8">
                  <span className="text-[clamp(3rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-none">R$ 0</span>
                  <span className="text-[13px] ml-1" style={{ color: '#aaa' }}>para sempre</span>
                </div>
                <p className="text-[12px] font-medium mb-6" style={{ color: '#aaa' }}>
                  Motor: <span style={{ color: '#0a0a0a' }}>GitHub AI</span> — 24 modelos
                </p>
                <div className="space-y-3 mb-8">
                  {['GPT-4o, GPT-5 Nano, Claude Sonnet', 'DeepSeek R1, Llama 4, Mistral Large', 'Agentes ilimitados', 'Scraping + Email'].map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span className="text-[11px]" style={{ color: '#ccc' }}>—</span>
                      <span className="text-[13px]" style={{ color: '#888' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-3.5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
                  style={{ background: '#e8e8e8', color: '#0a0a0a' }}>
                  Comecar Gratis
                </Link>
              </div>
            </Reveal>

            {/* Premium */}
            <Reveal delay={160}>
              <div className="p-8 md:p-10 rounded-[24px] relative transition-all duration-500" style={{ background: '#0a0a0a', border: '1px solid #222' }}>
                <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ background: '#222', color: '#888' }}>
                  Popular
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Premium</h3>
                <p className="text-[12px] mb-8" style={{ color: '#555' }}>Puter.js + Cloudflare</p>
                <div className="mb-8">
                  <span className="text-[clamp(3rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-none text-white">R$ 49</span>
                  <span className="text-[13px] ml-1" style={{ color: '#555' }}>/mes</span>
                </div>
                <p className="text-[12px] font-medium mb-6" style={{ color: '#555' }}>
                  Motor: <span className="text-white">Puter.js + Cloudflare</span> — 15 modelos
                </p>
                <div className="space-y-3 mb-8">
                  {['GPT-4o, Claude Sonnet, DeepSeek R1', 'GPT-OSS 120B, Gemma 4, Nemotron 3', 'Agentes ilimitados', 'Scraping + Email'].map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span className="text-[11px]" style={{ color: '#444' }}>—</span>
                      <span className="text-[13px]" style={{ color: '#888' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard" className="block w-full text-center py-3.5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-90"
                  style={{ background: '#fafafa', color: '#0a0a0a' }}>
                  Ativar Premium
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <Reveal>
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6">
              Seus agentes<br/>estao prontos.
            </h2>
            <p className="text-[14px] mb-10" style={{ color: '#999' }}>
              Comece gratis. Sem cartao. Ativacao instantanea.
            </p>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
              style={{ background: '#0a0a0a', color: '#fafafa' }}>
              Ativar Meus Agentes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 px-6 md:px-10" style={{ borderTop: '1px solid #eee' }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-[13px] tracking-[-0.02em]">open-agents</span>
          <p className="text-[12px]" style={{ color: '#bbb' }}>2026 Open-Agents.</p>
          <div className="flex items-center gap-6 text-[12px] font-medium" style={{ color: '#bbb' }}>
            <a href="https://github.com/ytt580/open-agents" target="_blank" rel="noopener" className="hover:text-[#0a0a0a] transition-colors duration-300">GitHub</a>
            <a href="mailto:contato@open-agents.com" className="hover:text-[#0a0a0a] transition-colors duration-300">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
