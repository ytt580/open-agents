'use client'

import { useState } from 'react'
import { Zap, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function TestEmailPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const sendTest = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/browserclaw/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'yttzinkkj@gmail.com',
          subject: 'Teste Open-Agents - BrowserClaw',
          body: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px;">
                <div style="width: 32px; height: 32px; background: #0a0a0a; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 14px;">Z</span>
                </div>
                <span style="font-weight: bold; font-size: 16px; color: #0a0a0a;">open-agents</span>
              </div>
              
              <h1 style="font-size: 24px; font-weight: bold; color: #0a0a0a; margin-bottom: 16px;">
                Email de Teste enviado com sucesso!
              </h1>
              
              <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 24px;">
                O BrowserClaw esta funcionando corretamente. Este email foi enviado automaticamente pelo sistema de automacao da Open-Agents.
              </p>
              
              <div style="background: #f5f5f5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="font-size: 12px; color: #999; margin: 0 0 8px 0;">Detalhes do envio:</p>
                <p style="font-size: 13px; color: #0a0a0a; margin: 0;"><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                <p style="font-size: 13px; color: #0a0a0a; margin: 4px 0 0 0;"><strong>Status:</strong> Entregue</p>
              </div>
              
              <p style="font-size: 12px; color: #bbb; border-top: 1px solid #eee; padding-top: 20px;">
                2026 Open-Agents. Agentes trabalhando 24/7.
              </p>
            </div>
          `
        })
      })

      const data = await res.json()
      
      if (res.ok) {
        setStatus('success')
        setMessage('Email enviado para yttzinkkj@gmail.com!')
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro ao enviar')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Falha na conexao com o servidor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#fafafa' }}>
      <div className="w-full max-w-md">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[13px] font-medium mb-8 transition-colors hover:opacity-70" style={{ color: '#999' }}>
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="p-8 rounded-[24px]" style={{ background: '#fff', border: '1px solid #eee' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#f5f5f5' }}>
            <Zap className="w-6 h-6" style={{ color: '#0a0a0a' }} />
          </div>

          <h1 className="text-2xl font-bold tracking-[-0.03em] mb-2">Teste de Email</h1>
          <p className="text-[13px] mb-8" style={{ color: '#999' }}>
            Envie um email de teste para <strong style={{ color: '#0a0a0a' }}>yttzinkkj@gmail.com</strong>
          </p>

          {status === 'idle' && (
            <button 
              onClick={sendTest}
              className="w-full py-3.5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
              style={{ background: '#0a0a0a', color: '#fafafa' }}
            >
              Enviar Email de Teste
            </button>
          )}

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-3 py-3.5 rounded-full" style={{ background: '#f5f5f5' }}>
              <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#666' }} />
              <span className="text-[13px] font-medium" style={{ color: '#666' }}>Enviando...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1px solid #dcfce7' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#16a34a' }} />
                <p className="text-[13px] font-medium" style={{ color: '#16a34a' }}>{message}</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="w-full py-3.5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
                style={{ background: '#f5f5f5', color: '#0a0a0a' }}
              >
                Enviar Novamente
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <XCircle className="w-5 h-5" style={{ color: '#dc2626' }} />
                <p className="text-[13px] font-medium" style={{ color: '#dc2626' }}>{message}</p>
              </div>
              <button 
                onClick={() => setStatus('idle')}
                className="w-full py-3.5 rounded-full font-semibold text-[13px] transition-all duration-300 hover:opacity-80"
                style={{ background: '#f5f5f5', color: '#0a0a0a' }}
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>

        <p className="text-[11px] text-center mt-6" style={{ color: '#ccc' }}>
          Configure EMAIL_USER e EMAIL_PASS no .env para envio real
        </p>
      </div>
    </div>
  )
}
