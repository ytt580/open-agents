'use client'

import { useState } from 'react'
import { X, Mail, Send, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react'

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

interface ProposalModalProps {
  open: boolean
  onClose: () => void
  scrapedSite: ScrapedSite | null
  generatedSite: GeneratedSite | null
}

type EnvioStatus = 'idle' | 'enviando' | 'completo' | 'erro'

export function ProposalModal({ open, onClose, scrapedSite, generatedSite }: ProposalModalProps) {
  const [clienteNome, setClienteNome] = useState('')
  const [clienteEmail, setClienteEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagemExtra, setMensagemExtra] = useState('')
  const [status, setStatus] = useState<EnvioStatus>('idle')
  const [propostaUrl, setPropostaUrl] = useState('')
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(propostaUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendViaBrowserClaw = async () => {
    if (!clienteEmail && !telefone) return

    setStatus('enviando')

    const proposalData = {
      para: clienteEmail,
      nome: clienteNome,
      telefone,
      assunto: `Proposta - Novo Site: ${scrapedSite?.title || 'Site Profissional'}`,
      mensagem: `
Olá ${clienteNome || 'cliente'},

Segue proposta para criação do seu novo site.

📌 SITE ORIGINAL: ${scrapedSite?.url || 'N/A'}
📌 TECNOLOGIA: Next.js 14 + Tailwind CSS
📌 PRAZO: 48h após aprovação
📌 VALOR: R$ 99 (plano Premium - Fable 5)

${mensagemExtra}

🔗 LINK DA PROPOSTA: ${window.location.origin}/comparacao?proposta=${Date.now()}

Aguardamos sua aprovação para iniciar o deploy!

Atenciosamente,
Equipe Open-Agents
      `.trim(),
      anexos: {
        'site-original.txt': scrapedSite?.content || '',
        'projeto-nextjs': generatedSite?.files ? JSON.stringify(generatedSite.files, null, 2) : '',
      },
    }

    try {
      const response = await fetch('/api/browserclaw/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_email',
          target: 'https://mail.google.com',
          data: proposalData,
        }),
      })

      if (!response.ok) throw new Error('Falha ao enviar')

      const result = await response.json()
      setPropostaUrl(result.propostaUrl || `${window.location.origin}/comparacao?proposta=${Date.now()}`)
      setStatus('completo')
    } catch (error) {
      console.error('Erro envio BrowserClaw:', error)
      setStatus('erro')
    }
  }

  const renderProposalSummary = () => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
      <h4 className="font-semibold text-sm text-gray-900">Resumo da Proposta</h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Site Original</p>
          <p className="font-medium truncate">{scrapedSite?.title || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tecnologia</p>
          <p className="font-medium">Next.js 14 + Tailwind</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Valor</p>
          <p className="font-medium text-green-700">R$ 99 (Fable 5 Premium)</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Prazo</p>
          <p className="font-medium">48h após aprovação</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 p-2 bg-white rounded border border-gray-200 max-h-20 overflow-y-auto">
        <strong>Arquivos do projeto:</strong> {generatedSite?.files ? Object.keys(generatedSite.files).length : 0} arquivos
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <h2 className="font-bold text-gray-900">Enviar Proposta</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {status === 'completo' ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Proposta Enviada!</h3>
            <p className="text-sm text-gray-500">
              O BrowserClaw enviou o email para <strong>{clienteEmail}</strong> com todos os detalhes.
            </p>
            {propostaUrl && (
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copiado!' : 'Copiar Link'}
                </button>
                <a
                  href={propostaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Proposta
                </a>
              </div>
            )}
          </div>
        ) : status === 'erro' ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Erro ao Enviar</h3>
            <p className="text-sm text-gray-500">
              Não foi possível enviar o email. Tente novamente ou copie o link manualmente.
            </p>
            <button
              onClick={handleSendViaBrowserClaw}
              className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Tentar Novamente
            </button>
          </div>
        ) : status === 'enviando' ? (
          <div className="p-6 text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">Enviando Proposta...</h3>
            <p className="text-sm text-gray-500">
              O BrowserClaw está automatizando o envio do email. Isso leva alguns segundos.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {renderProposalSummary()}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email do Cliente</label>
                <input
                  type="email"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none"
                  placeholder="email@cliente.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp (opcional)</label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none"
                  placeholder="(11) 99999-8888"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mensagem Extra (opcional)</label>
                <textarea
                  value={mensagemExtra}
                  onChange={(e) => setMensagemExtra(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-black focus:border-black outline-none resize-none"
                  rows={3}
                  placeholder="Qualquer informação adicional..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendViaBrowserClaw}
                disabled={!clienteEmail && !telefone}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Proposta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
