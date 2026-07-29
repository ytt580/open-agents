'use client'

import Link from 'next/link'
import { 
  Zap, 
  Globe, 
  Bot, 
  ArrowRight,
  CheckCircle,
  Play,
  Search,
  Mail,
  Code,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'Agentes com IA',
    desc: 'Crie automacoes completas conversando com IA. A entende o que voce precisa e monta o fluxo.'
  },
  {
    icon: Globe,
    title: 'Scraping Inteligente',
    desc: 'Extraia dados de qualquer site automaticamente. Google Maps, sites institucionais, redes sociais.'
  },
  {
    icon: Code,
    title: 'Criação de Sites',
    desc: 'Gere sites profissionais para seus leads em minutos. Design moderno e responsivo.'
  },
  {
    icon: Mail,
    title: 'Propostas Automaticas',
    desc: 'Envie propostas personalizadas por email ou WhatsApp para cada lead.'
  },
  {
    icon: Search,
    title: 'Prospeccao Ativa',
    desc: 'Encontre empresas automaticamente por nicho, localizacao e avaliacao.'
  },
  {
    icon: Clock,
    title: 'Execucao 24/7',
    desc: 'Agende seus agentes para rodar automaticamente. Nao perca nenhuma oportunidade.'
  }
]

const steps = [
  { num: '1', title: 'Descreva o fluxo', desc: 'Converse com a IA e descreva o que quer automatizar' },
  { num: '2', title: 'Execute com 1 prompt', desc: 'Mande um prompt como "20 empresas com site feio em SP"' },
  { num: '3', title: 'IA roda tudo', desc: 'Busca, scraping, criacao, envio - tudo automatico' },
  { num: '4', title: 'Nunca repete', desc: 'Cada lead e processado apenas uma vez' }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50" style={{ background: 'rgba(250,248,245,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Open-Agents</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Dashboard
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Comecar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--accent-15)', color: 'var(--accent)' }}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Autome qualquer fluxo com IA</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Crie agentes de automacao
            <span className="block" style={{ color: 'var(--accent)' }}>conversando com IA</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Descreva o fluxo que voce quer automatizar. A IA monta as etapas, 
            voce executa com 1 prompt e ela roda tudo automaticamente.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg py-4 px-8">
              Comecar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary text-lg py-4 px-8">
              <Play className="w-5 h-5" />
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Como funciona</h2>
            <p style={{ color: 'var(--text-secondary)' }}>4 passos simples para automatizar qualquer fluxo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold" style={{ background: 'var(--accent)', color: 'white' }}>
                  {step.num}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Tudo que voce precisa</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Ferramentas poderosas para sua prospeccao</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="card p-6 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-15)' }}>
                  <feat.icon className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para automatizar?</h2>
          <p className="text-lg mb-8 opacity-90">Comece agora gratuitamente. Sem cartao de credito.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg" style={{ background: 'white', color: 'var(--accent)' }}>
            Criar Primeiro Fluxo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Open-Agents 2026</span>
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span>Termos</span>
            <span>Privacidade</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
