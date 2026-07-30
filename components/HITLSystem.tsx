'use client'

import { useState, useEffect } from 'react'
import { 
  AlertTriangle, Shield, CheckCircle, XCircle,
  Eye, Lock, Clock, FileText, Send, CreditCard,
  Trash2, MessageSquare
} from 'lucide-react'

export type HITLActionType = 
  | 'payment' 
  | 'deletion' 
  | 'financial_data' 
  | 'mass_send' 
  | 'sensitive_data'
  | 'custom'

interface HITLPendingAction {
  id: string
  tipo: HITLActionType
  titulo: string
  descricao: string
  dados: any
  timestamp: Date
  status: 'pending' | 'approved' | 'rejected'
}

const actionConfig: Record<HITLActionType, { label: string; icon: any; cor: string; bg: string; alerta: string }> = {
  payment: { label: 'Pagamento', icon: CreditCard, cor: 'var(--red)', bg: 'rgba(244, 63, 94, 0.08)', alerta: 'Transacao financeira detectada' },
  deletion: { label: 'Exclusao', icon: Trash2, cor: 'var(--red)', bg: 'rgba(244, 63, 94, 0.08)', alerta: 'Exclusao permanente de dados' },
  financial_data: { label: 'Dados Financeiros', icon: FileText, cor: 'var(--amber-400)', bg: 'rgba(251, 191, 36, 0.08)', alerta: 'Informacoes financeiras expostas' },
  mass_send: { label: 'Envio em Massa', icon: Send, cor: 'var(--amber-400)', bg: 'rgba(251, 191, 36, 0.08)', alerta: 'Envio para multiplos destinatarios' },
  sensitive_data: { label: 'Dados Sensiveis', icon: Lock, cor: 'var(--accent)', bg: 'rgba(249, 115, 22, 0.08)', alerta: 'Dados pessoais ou confidenciais' },
  custom: { label: 'Acao Personalizada', icon: AlertTriangle, cor: 'var(--cyan)', bg: 'rgba(34, 211, 238, 0.08)', alerta: 'Acao que requer aprovacao' },
}

const HITL_STORAGE_KEY = 'open-agents-hitl-log'

function loadHITLLog(): HITLPendingAction[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(HITL_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((a: any) => ({ ...a, timestamp: new Date(a.timestamp) }))
    }
  } catch {}
  return []
}

function saveHITLLog(actions: HITLPendingAction[]) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(HITL_STORAGE_KEY, JSON.stringify(actions)) } catch {}
}

interface HITLSystemProps {
  onApprove: (actionId: string) => void
  onReject: (actionId: string) => void
}

export function HITLSystem({ onApprove, onReject }: HITLSystemProps) {
  const [pendingActions, setPendingActions] = useState<HITLPendingAction[]>([])
  const [selectedAction, setSelectedAction] = useState<HITLPendingAction | null>(null)
  const [showLog, setShowLog] = useState(false)
  const [hitlLog, setHitlLog] = useState<HITLPendingAction[]>([])

  useEffect(() => {
    setHitlLog(loadHITLLog())
  }, [])

  useEffect(() => {
    if (hitlLog.length > 0) saveHITLLog(hitlLog)
  }, [hitlLog])

  const addPendingAction = (action: Omit<HITLPendingAction, 'id' | 'timestamp' | 'status'>) => {
    const newAction: HITLPendingAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending'
    }
    setPendingActions(prev => [...prev, newAction])
    setSelectedAction(newAction)
  }

  const handleApprove = (actionId: string) => {
    setPendingActions(prev => prev.map(a => 
      a.id === actionId ? { ...a, status: 'approved' } : a
    ))
    const action = pendingActions.find(a => a.id === actionId)
    if (action) {
      setHitlLog(prev => [...prev, { ...action, status: 'approved' }])
    }
    onApprove(actionId)
    setSelectedAction(null)
  }

  const handleReject = (actionId: string) => {
    setPendingActions(prev => prev.map(a => 
      a.id === actionId ? { ...a, status: 'rejected' } : a
    ))
    const action = pendingActions.find(a => a.id === actionId)
    if (action) {
      setHitlLog(prev => [...prev, { ...action, status: 'rejected' }])
    }
    onReject(actionId)
    setSelectedAction(null)
  }

  const pendingCount = pendingActions.filter(a => a.status === 'pending').length

  return (
    <>
      {/* HITL Indicator */}
      {pendingCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setSelectedAction(pendingActions.find(a => a.status === 'pending') || null)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
            style={{ 
              background: 'var(--rose-500)', 
              color: 'white',
              boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)'
            }}
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-medium">{pendingCount} acao(oes) pendente(s)</span>
          </button>
        </div>
      )}

      {/* Approval Modal */}
      {selectedAction && selectedAction.status === 'pending' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="card w-full max-w-md" style={{ 
            boxShadow: `0 0 40px ${actionConfig[selectedAction.tipo].bg}`,
            border: `1.5px solid ${actionConfig[selectedAction.tipo].cor}`
          }}>
            <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: actionConfig[selectedAction.tipo].bg }}>
                  {(() => {
                    const Icon = actionConfig[selectedAction.tipo].icon
                    return <Icon className="w-5 h-5" style={{ color: actionConfig[selectedAction.tipo].cor }} />
                  })()}
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
                    Aprovacao Necessaria
                  </h3>
                  <p className="text-[10px]" style={{ color: actionConfig[selectedAction.tipo].cor }}>
                    {actionConfig[selectedAction.tipo].alerta}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--fg-subtle)' }}>Acao</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>{selectedAction.titulo}</p>
              </div>

              <div className="p-3 rounded-lg" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--fg-subtle)' }}>Descricao</p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{selectedAction.descricao}</p>
              </div>

              {selectedAction.dados && (
                <div className="p-3 rounded-lg max-h-32 overflow-y-auto" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                  <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--fg-subtle)' }}>Dados</p>
                  <pre className="text-[10px] font-mono" style={{ color: 'var(--fg-faint)' }}>
                    {JSON.stringify(selectedAction.dados, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                <Clock className="w-3 h-3" />
                <span>{selectedAction.timestamp.toLocaleTimeString('pt-BR')}</span>
              </div>
            </div>

            <div className="p-4 flex gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <button 
                onClick={() => handleReject(selectedAction.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--red)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
              >
                <XCircle className="w-3.5 h-3.5" />
                Rejeitar
              </button>
              <button 
                onClick={() => handleApprove(selectedAction.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: 'var(--emerald-500)', color: 'white' }}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Aprovar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HITL Log Modal */}
      {showLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <h3 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>Historico de Aprovacoes</h3>
              </div>
              <button onClick={() => setShowLog(false)} className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Fechar</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {hitlLog.length === 0 ? (
                <p className="text-center text-xs py-8" style={{ color: 'var(--fg-subtle)' }}>Nenhum registro</p>
              ) : (
                hitlLog.map((action) => {
                  const config = actionConfig[action.tipo]
                  const Icon = config.icon
                  return (
                    <div key={action.id} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: 'var(--surface)' }}>
                      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: config.bg }}>
                        <Icon className="w-4 h-4" style={{ color: config.cor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--fg)' }}>{action.titulo}</p>
                        <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{action.timestamp.toLocaleString('pt-BR')}</p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                        background: action.status === 'approved' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                        color: action.status === 'approved' ? 'var(--green)' : 'var(--red)'
                      }}>
                        {action.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Utility function to detect dangerous actions
export function detectDangerousAction(stepName: string, stepDescription: string): HITLActionType | null {
  const lower = (stepName + ' ' + stepDescription).toLowerCase()
  
  if (lower.includes('pagamento') || lower.includes('pagar') || lower.includes('cobrar') || lower.includes('fatura') || lower.includes('cartao') || lower.includes('credito'))
    return 'payment'
  if (lower.includes('excluir') || lower.includes('deletar') || lower.includes('remover') || lower.includes('apagar'))
    return 'deletion'
  if (lower.includes('cpf') || lower.includes('cnpj') || lower.includes('bank') || lower.includes('banco') || lower.includes('conta') || lower.includes('transferencia'))
    return 'financial_data'
  if (lower.includes('email') && (lower.includes('massa') || lower.includes('multiplo') || lower.includes('lista') || lower.includes('enviar para'))) 
    return 'mass_send'
  if (lower.includes('whatsapp') && (lower.includes('massa') || lower.includes('multiplo') || lower.includes('lista') || lower.includes('enviar para')))
    return 'mass_send'
  if (lower.includes('senha') || lower.includes('password') || lower.includes('token') || lower.includes('chave') || lower.includes('credencial'))
    return 'sensitive_data'
  
  return null
}

// Hook for using HITL in components
export function useHITL() {
  const [pendingActions, setPendingActions] = useState<HITLPendingAction[]>([])
  const [waitingApproval, setWaitingApproval] = useState<string | null>(null)

  const requestApproval = (action: Omit<HITLPendingAction, 'id' | 'timestamp' | 'status'>): Promise<boolean> => {
    return new Promise((resolve) => {
      const newAction: HITLPendingAction = {
        ...action,
        id: Date.now().toString(),
        timestamp: new Date(),
        status: 'pending'
      }
      setPendingActions(prev => [...prev, newAction])
      setWaitingApproval(newAction.id)
      
      // Store resolve function to be called when approved/rejected
      const checkInterval = setInterval(() => {
        setPendingActions(prev => {
          const current = prev.find(a => a.id === newAction.id)
          if (current && current.status !== 'pending') {
            clearInterval(checkInterval)
            resolve(current.status === 'approved')
            setWaitingApproval(null)
          }
          return prev
        })
      }, 100)
    })
  }

  const approveAction = (actionId: string) => {
    setPendingActions(prev => prev.map(a => 
      a.id === actionId ? { ...a, status: 'approved' } : a
    ))
  }

  const rejectAction = (actionId: string) => {
    setPendingActions(prev => prev.map(a => 
      a.id === actionId ? { ...a, status: 'rejected' } : a
    ))
  }

  return {
    pendingActions,
    waitingApproval,
    requestApproval,
    approveAction,
    rejectAction
  }
}
