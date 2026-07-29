'use client'

import Link from 'next/link'
import { 
  Zap, Globe, Bot, ArrowRight, CheckCircle, Play,
  Search, Mail, Code, MessageSquare, Sparkles,
  TrendingUp, Clock, Shield, Users, BarChart3
} from 'lucide-react'

const stats = [
  { value: '10,000+', label: 'Empresas ativas' },
  { value: '2.5M+', label: 'Leads processados' },
  { value: '98%', label: 'Taxa de entrega' },
  { value: '4.9/5', label: 'Avaliacao media' },
]

const features = [
  { icon: Bot, title: 'Agentes com IA', desc: 'Crie automacoes completas conversando com IA. A entende o que voce precisa e monta o fluxo.' },
  { icon: Globe, title: 'Scraping Inteligente', desc: 'Extraia dados de qualquer site automaticamente. Google Maps, sites institucionais, redes sociais.' },
  { icon: Code, title: 'Criacao de Sites', desc: 'Gere sites profissionais para seus leads em minutos. Design moderno e responsivo.' },
  { icon: Mail, title: 'Propostas Automaticas', desc: 'Envie propostas personalizadas por email ou WhatsApp para cada lead.' },
  { icon: Search, title: 'Prospeccao Ativa', desc: 'Encontre empresas automaticamente por nicho, localizacao e avaliacao.' },
  { icon: Clock, title: 'Execucao 24/7', desc: 'Agende seus agentes para rodar automaticamente. Nao perca nenhuma oportunidade.' },
]

const steps = [
  { num: '1', title: 'Descreva o fluxo', desc: 'Converse com a IA e descreva o que quer automatizar', icon: MessageSquare },
  { num: '2', title: 'Execute com 1 prompt', desc: 'Mande um prompt como "20 empresas com site feio em SP"', icon: Zap },
  { num: '3', title: 'IA roda tudo', desc: 'Busca, scraping, criacao, envio - tudo automatico', icon: Bot },
  { num: '4', title: 'Nunca repete', desc: 'Cada lead e processado apenas uma vez', icon: Shield },
]

const testimonials = [
  { name: 'Carlos Silva', role: 'CEO, Agencia Digital', text: 'Automatizei toda minha prospeccao. De 5 leads por semana para 50 por dia.' },
  { name: 'Maria Santos', role: 'Fundadora, Startup Tech', text: 'O agente cria sites melhores que meus designers. Conversao triplicou.' },
  { name: 'Joao Costa', role: 'Freelancer', text: 'Fechei 3 clientes novos na primeira semana usando o Open-Agents.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(250,248,245,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hidden md:block" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Comecar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--accent-15)', color: 'var(--accent)' }}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Autome qualquer fluxo com IA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Crie agentes de automacao
            <span className="block mt-2" style={{ color: 'var(--accent)' }}>conversando com IA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Descreva o fluxo que voce quer automatizar. A IA monta as etapas, 
            voce executa com 1 prompt e ela roda tudo automaticamente.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <Link href="/dashboard" className="btn-primary text-lg py-4 px-8">
              Comecar Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--accent)' }}>{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Como funciona</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>4 passos para automatizar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5" style={{ background: 'var(--border)' }} />
                )}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10" style={{ background: 'var(--accent)', color: 'white' }}>
                  <step.icon className="w-7 h-7" />
                </div>
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
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Features</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Tudo que voce precisa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="card p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: 'var(--accent-15)' }}>
                  <feat.icon className="w-7 h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>Depoimentos</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>Quem ja usa, recomenda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5" fill="var(--accent)" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para automatizar?</h2>
          <p className="text-xl mb-10 opacity-90">Comece agora gratuitamente. Sem cartao de credito. Configuracao em 2 minutos.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105" style={{ background: 'white', color: 'var(--accent)' }}>
            Criar Primeiro Fluxo
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>2026 Open-Agents. Todos os direitos reservados.</p>
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
