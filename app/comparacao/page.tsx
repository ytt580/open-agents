'use client'

import { useState, useEffect, use } from 'react'
import { ArrowLeft, Check, X, Mail, Send, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react'

// === Tipos ===
interface ScrapedSite {
  url: string
  title: string
  description: string
  screenshots: string[]
  content: string
}

interface GeneratedSite {
  files: Record<string, string>
  previewUrl?: string
  instructions: string
  deployNotes: string
}

interface FormData {
  nome: string
  email: string
  whatsapp: string
  mensagem: string
}

// === Componente principal ===
export default function ComparacaoPage() {
  const [mounted, setMounted] = useState(false)
  const [dados, setDados] = useState<{ original: ScrapedSite; gerado: GeneratedSite } | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [aba, setAba] = useState<'lado' | 'original' | 'gerado'>('lado')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', whatsapp: '', mensagem: '' })
  const [envioStatus, setEnvioStatus] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle')

  useEffect(() => {
    setMounted(true)
    try {
      const params = new URLSearchParams(window.location.search)
      const o = params.get('original')
      const g = params.get('gerado')
      if (o && g) {
        setDados({
          original: JSON.parse(decodeURIComponent(o)),
          gerado: JSON.parse(decodeURIComponent(g)),
        })
      }
    } catch {
      setErro('Link inválido ou dados corrompidos')
    }
  }, [])

  const handleAprovar = () => setShowForm(true)

  const handleRecusar = () => {
    localStorage.setItem('site_rejeitado', Date.now().toString())
    window.history.back()
  }

  const handleEnviar = async () => {
    if (!formData.email && !formData.whatsapp) return
    setEnvioStatus('enviando')

    try {
      const body = {
        action: 'send_email',
        target: 'https://mail.google.com',
        data: {
          para: formData.email || formData.whatsapp,
          nome: formData.nome || 'Cliente',
          assunto: `Proposta - Novo Site: ${dados?.original?.title || 'Site Profissional'}`,
          mensagem: `Olá ${formData.nome || 'cliente'},

Segue proposta para criação do seu novo site profissional.

📍 Site Original: ${dados?.original?.url || 'N/A'}
📍 Tecnologia: Next.js 14 + Tailwind CSS
📍 Prazo: 48h após aprovação
📍 Valor: R$ 99 (plano Premium - Fable 5)

${formData.mensagem || ''}

🔗 Acesse: ${window.location.href}

Aguardamos sua aprovação!
Equipe Open-Agents`,
          anexos: {
            'site-original.txt': dados?.original?.content || '',
            'projeto-nextjs.txt': dados?.gerado?.files ? JSON.stringify(Object.keys(dados.gerado.files), null, 2) : '',
          },
        },
      }

      const res = await fetch('/api/browserclaw/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Falha no envio')
      setEnvioStatus('ok')
    } catch {
      setEnvioStatus('erro')
    }
  }

  if (!mounted) return null

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md p-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Link Inválido</h1>
          <p className="text-gray-500 mb-6">{erro}</p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </a>
        </div>
      </div>
    )
  }

  if (!dados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Carregando proposta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HEADER ===== */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <h1 className="text-sm font-semibold text-gray-900">Proposta de Site</h1>
          </div>
          <div className="flex items-center gap-2">
            {(['lado', 'original', 'gerado'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAba(a)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  aba === a ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {a === 'lado' ? 'Lado a Lado' : a === 'original' ? 'Original' : 'Gerado'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Cards resumo */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Site Original</p>
            <p className="font-semibold text-sm truncate mt-0.5">{dados.original.title || 'N/A'}</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Modelo</p>
            <p className="font-semibold text-sm mt-0.5">Fable 5 Premium</p>
            <p className="text-[10px] text-gray-400">R$ 99</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Arquivos</p>
            <p className="font-semibold text-sm mt-0.5">{Object.keys(dados.gerado.files).length} arquivos</p>
            <p className="text-[10px] text-gray-400">Next.js + Tailwind</p>
          </div>
        </div>

        {/* ===== COMPARAÇÃO ===== */}
        <div className={`grid gap-4 ${aba === 'lado' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Original */}
          {(aba === 'lado' || aba === 'original') && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Original</span>
                <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{dados.original.url}</span>
              </div>
              <div className="aspect-[4/3] bg-gray-50 overflow-auto p-4">
                {dados.original.screenshots?.[0] ? (
                  <img
                    src={dados.original.screenshots[0]}
                    alt="Original"
                    className="w-full h-full object-contain rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    <div className="text-center">
                      <p className="font-medium">Preview indisponível</p>
                      <p className="mt-1">Conteúdo extraído via scraping</p>
                    </div>
                  </div>
                )}
              </div>
              {dados.original.content && (
                <div className="px-3 py-2 border-t border-gray-200 max-h-24 overflow-y-auto">
                  <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                    {dados.original.content.substring(0, 400)}...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Gerado */}
          {(aba === 'lado' || aba === 'gerado') && (
            <div className="border border-green-200 rounded-xl overflow-hidden ring-1 ring-green-400/20">
              <div className="px-3 py-2 bg-green-50 border-b border-green-200 flex items-center justify-between">
                <span className="text-xs font-medium text-green-700">Gerado (Fable 5)</span>
                <span className="text-[10px] text-green-500">Next.js 14</span>
              </div>
              <div className="aspect-[4/3] bg-gray-950 overflow-auto p-3">
                {Object.entries(dados.gerado.files).slice(0, 8).map(([path, content]) => (
                  <details key={path} className="mb-2">
                    <summary className="text-[10px] font-mono text-green-400 cursor-pointer hover:text-green-300">
                      {path}
                    </summary>
                    <pre className="mt-1 p-2 bg-gray-900 rounded text-[9px] text-gray-300 font-mono overflow-x-auto max-h-24">
                      {content.substring(0, 200)}...
                    </pre>
                  </details>
                ))}
                {Object.keys(dados.gerado.files).length > 8 && (
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    +{Object.keys(dados.gerado.files).length - 8} arquivos
                  </p>
                )}
              </div>
              <div className="px-3 py-2 border-t border-green-200 text-[10px] text-gray-500">
                {dados.gerado.instructions}
              </div>
            </div>
          )}
        </div>

        {/* ===== DIFERENCIAIS ===== */}
        {aba === 'lado' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {[
              { t: 'Melhorias', itens: ['Design responsivo', 'Performance otimizada', 'SEO completo', 'Dark mode'] },
              { t: 'Tecnologia', itens: ['Next.js 14 App Router', 'Tailwind CSS', 'Componentes', 'TypeScript strict'] },
              { t: 'Entrega', itens: ['Código fonte completo', 'Deploy Vercel/Netlify', 'Domínio próprio', 'Suporte 30 dias'] },
            ].map((g) => (
              <div key={g.t} className="p-4 rounded-xl border border-gray-200 bg-white">
                <h4 className="text-sm font-semibold mb-3 text-gray-900">{g.t}</h4>
                <ul className="space-y-1.5">
                  {g.itens.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ===== AÇÕES ===== */}
        <div className="flex items-center justify-center gap-3 mt-8 pb-8">
          <button
            onClick={handleRecusar}
            className="flex items-center gap-2 px-6 py-3 border-2 border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition"
          >
            <X className="w-4 h-4" />
            Recusar / Alterar
          </button>
          <button
            onClick={handleAprovar}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-lg"
          >
            <Check className="w-4 h-4" />
            Aprovar e Enviar Proposta
          </button>
        </div>
      </div>

      {/* ===== MODAL ENVIO ===== */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <h2 className="text-sm font-bold text-gray-900">Enviar Proposta</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {envioStatus === 'ok' ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
                <h3 className="font-bold text-gray-900">Proposta Enviada!</h3>
                <p className="text-xs text-gray-500">O BrowserClaw enviou o email com todos os detalhes.</p>
                <button
                  onClick={() => { setShowForm(false); setEnvioStatus('idle') }}
                  className="px-5 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Fechar
                </button>
              </div>
            ) : envioStatus === 'erro' ? (
              <div className="p-6 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="font-bold text-gray-900">Erro ao Enviar</h3>
                <p className="text-xs text-gray-500">Copie o link manualmente ou tente novamente.</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); setEnvioStatus('idle') }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                  >
                    Copiar Link
                  </button>
                  <button
                    onClick={handleEnviar}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Tentar Novamente
                  </button>
                </div>
              </div>
            ) : envioStatus === 'enviando' ? (
              <div className="p-6 text-center space-y-3">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto" />
                <h3 className="font-bold text-gray-900">Enviando via BrowserClaw...</h3>
                <p className="text-xs text-gray-500">Automatizando o envio do email. Leva alguns segundos.</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {/* Resumo */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-gray-500">Site:</span> <span className="font-medium">{dados.original.title}</span></div>
                    <div><span className="text-gray-500">Valor:</span> <span className="font-medium text-green-700">R$ 99</span></div>
                    <div><span className="text-gray-500">Prazo:</span> <span className="font-medium">48h</span></div>
                    <div><span className="text-gray-500">Arquivos:</span> <span className="font-medium">{Object.keys(dados.gerado.files).length}</span></div>
                  </div>
                </div>

                {/* Form */}
                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={formData.nome}
                  onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <input
                  type="email"
                  placeholder="Email do cliente"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (opcional)"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(p => ({ ...p, whatsapp: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black"
                />
                <textarea
                  placeholder="Mensagem extra (opcional)"
                  value={formData.mensagem}
                  onChange={(e) => setFormData(p => ({ ...p, mensagem: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-black resize-none"
                  rows={2}
                />

                <button
                  onClick={handleEnviar}
                  disabled={!formData.email && !formData.whatsapp}
                  className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar Proposta via Email
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
