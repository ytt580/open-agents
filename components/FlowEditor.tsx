'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Trash2,
  Send,
  Bot,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Loader2,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Code,
  Mail,
  Search,
  MessageSquare,
  Paperclip,
  File,
  X,
  Puzzle,
  Sparkles,
  Lock,
  Crown
} from 'lucide-react'
import { SkillsSelector } from './SkillsSelector'
import { Flow } from '@/app/dashboard/page'

interface FlowEditorProps {
  flowId: string
  flow?: Flow
  onBack: () => void
  onSave?: (id: string, nome: string, steps: any[]) => void
}

interface Step {
  id: string
  tipo: string
  nome: string
  descricao: string
  ativo: boolean
}

interface Message {
  id: string
  tipo: 'user' | 'ai' | 'system'
  conteudo: string
  timestamp: Date
  files?: string[]
}

interface ExecutionLog {
  step: string
  status: 'pending' | 'running' | 'done' | 'error'
  message: string
}

const MESSAGES_STORAGE_KEY = 'open-agents-messages'

function loadMessages(flowId: string): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`${MESSAGES_STORAGE_KEY}-${flowId}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }))
    }
  } catch {}
  return []
}

function saveMessages(flowId: string, messages: Message[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${MESSAGES_STORAGE_KEY}-${flowId}`, JSON.stringify(messages))
  } catch {}
}

const stepIcons: Record<string, any> = {
  busca: Search,
  scraping: Globe,
  analise: Code,
  criacao: Code,
  email: Mail,
  whatsapp: MessageSquare,
  publicacao: Globe,
}

export function FlowEditor({ flowId, flow, onBack, onSave }: FlowEditorProps) {
  const [steps, setSteps] = useState<Step[]>(flow?.steps || [])
  const [flowName, setFlowName] = useState(flow?.nome || 'Novo Fluxo')
  const [messages, setMessages] = useState<Message[]>([])
  const [loaded, setLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [executing, setExecuting] = useState(false)
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [attachedFiles, setAttachedFiles] = useState<string[]>([])
  const [showSkills, setShowSkills] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const [showModelMenu, setShowModelMenu] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const currentPlan = 'free'
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = loadMessages(flowId)
    if (stored.length > 0) {
      setMessages(stored)
    } else {
      setMessages([{
        id: '1',
        tipo: 'ai',
        conteudo: 'Ola! Sou sua assistente de automacao. Descreva o fluxo que voce quer criar.\n\nExemplos:\n- "Busque empresas no Google Maps, faca scraping do site, crie uma proposta e envie por email"\n- "Pesquise leads, analise com IA, crie site melhorado e publique"\n\nO que voce quer automatizar?',
        timestamp: new Date()
      }])
    }
    setLoaded(true)
  }, [flowId])

  useEffect(() => {
    if (loaded && messages.length > 0) {
      saveMessages(flowId, messages)
    }
  }, [messages, flowId, loaded])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (steps.length > 0 && onSave) {
      onSave(flowId, flowName, steps)
    }
  }, [steps])

  useEffect(() => {
    const handleClickOutside = () => setShowModelMenu(false)
    if (showModelMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showModelMenu])

  const parseFlowFromAI = (input: string): Step[] => {
    const lower = input.toLowerCase()
    const newSteps: Step[] = []
    let id = 1

    if (lower.includes('maps') || lower.includes('google') || lower.includes('buscar') || lower.includes('busca') || lower.includes('lead') || lower.includes('empresa')) {
      newSteps.push({ id: String(id++), tipo: 'busca', nome: 'Buscar Leads', descricao: 'Pesquisar empresas no Google Maps por criterio e localizacao', ativo: true })
    }
    if (lower.includes('scraping') || lower.includes('scrap') || lower.includes('extrair') || lower.includes('site')) {
      newSteps.push({ id: String(id++), tipo: 'scraping', nome: 'Scraping do Site', descricao: 'Extrair dados e informacoes do site da empresa', ativo: true })
    }
    if (lower.includes('analise') || lower.includes('analisar') || lower.includes('ia') || lower.includes('avaliar')) {
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Analise com IA', descricao: 'Avaliar qualidade do site e identificar melhorias', ativo: true })
    }
    if (lower.includes('criar site') || lower.includes('criar') || lower.includes('novo site') || lower.includes('repaginar') || lower.includes('repagina') || lower.includes('redesign')) {
      newSteps.push({ id: String(id++), tipo: 'criacao', nome: 'Criar Site Melhorado', descricao: 'Gerar nova versao do site com design profissional', ativo: true })
    }
    if (lower.includes('proposta') || lower.includes('orcamento') || lower.includes('orçamento')) {
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Criar Proposta', descricao: 'Gerar proposta comercial personalizada', ativo: true })
    }
    if (lower.includes('email') || lower.includes('enviar') || lower.includes('mandar')) {
      newSteps.push({ id: String(id++), tipo: 'email', nome: 'Enviar Proposta', descricao: 'Enviar proposta por email para o empresario', ativo: true })
    }
    if (lower.includes('whatsapp') || lower.includes('zap')) {
      newSteps.push({ id: String(id++), tipo: 'whatsapp', nome: 'Enviar WhatsApp', descricao: 'Enviar mensagem no WhatsApp do empresario', ativo: true })
    }
    if (lower.includes('publicar') || lower.includes('publicacao') || lower.includes('vercel') || lower.includes('netlify')) {
      newSteps.push({ id: String(id++), tipo: 'publicacao', nome: 'Publicar Site', descricao: 'Publicar o novo site na internet', ativo: true })
    }
    if (lower.includes('pagamento') || lower.includes('pagar') || lower.includes('aceito') || lower.includes('fechar')) {
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Fechar Negocio', descricao: 'Confirmar pagamento e fechar negocio', ativo: true })
    }

    if (newSteps.length === 0) {
      newSteps.push({ id: '1', tipo: 'busca', nome: 'Processar', descricao: input, ativo: true })
    }

    return newSteps
  }

  const callAI = async (userInput: string, history: Message[]): Promise<string> => {
    setApiError(null)
    try {
      const apiMessages = history.slice(-10).map(m => ({
        role: m.tipo === 'user' ? 'user' : 'assistant',
        content: m.conteudo
      }))
      apiMessages.push({ role: 'user', content: userInput })

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, model: selectedModel })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMsg = errorData.error || `Erro ${res.status}: ${res.statusText}`
        throw new Error(errorMsg)
      }
      
      const data = await res.json()
      setRetryCount(0)
      return data.content || 'Desculpe, nao consegui processar.'
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido'
      setApiError(message)
      
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1)
        return `Erro de conexao (tentativa ${retryCount + 1}/3). Verifique sua conexao e tente novamente.`
      }
      
      return 'Erro ao conectar com a IA. Verifique sua conexao e tente novamente.'
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      tipo: 'user',
      conteudo: inputValue,
      timestamp: new Date(),
      files: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = inputValue
    setInputValue('')
    setAttachedFiles([])
    setIsTyping(true)

    const lower = userInput.toLowerCase()
    const isCreatingFlow = lower.includes('fluxo') || lower.includes('automatizar') || 
      lower.includes('busque') || lower.includes('scraping') || lower.includes('criar site') ||
      lower.includes('enviar') || lower.includes('proposta') || lower.includes('repagina') ||
      lower.includes('maps') || lower.includes('google') || lower.includes('leads') ||
      lower.includes('empresa') || lower.includes('negocio')

    if (isCreatingFlow) {
      const parsed = parseFlowFromAI(userInput)
      setSteps(parsed)
      
      const stepList = parsed.map((s, i) => `  ${i + 1}. ${s.nome} - ${s.descricao}`).join('\n')
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          tipo: 'ai',
          conteudo: `Perfeito! Criei seu fluxo com ${parsed.length} etapas:\n\n${stepList}\n\nFluxo pronto! Clique em "Executar Fluxo" ou mande um prompt como "20 empresas com site feio em SP".`,
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 1000)
    } else {
      const aiResponse = await callAI(userInput, [...messages, userMessage])
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        tipo: 'ai',
        conteudo: aiResponse,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const names = Array.from(files).map(f => f.name)
      setAttachedFiles(prev => [...prev, ...names])
    }
  }

  const removeFile = (name: string) => {
    setAttachedFiles(prev => prev.filter(f => f !== name))
  }

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  const toggleStep = (id: string) => {
    setSteps(prev => prev.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ))
  }

  const executeFlow = async () => {
    if (steps.length === 0 || executing) return
    setExecuting(true)
    
    const logs: ExecutionLog[] = steps.map(s => ({
      step: s.nome,
      status: 'pending' as const,
      message: 'Aguardando...'
    }))
    setExecutionLogs(logs)

    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].ativo) continue
      
      setExecutionLogs(prev => prev.map((log, idx) => 
        idx === i ? { ...log, status: 'running', message: 'Executando...' } : log
      ))

      await new Promise(r => setTimeout(r, 2000))

      setExecutionLogs(prev => prev.map((log, idx) => 
        idx === i ? { ...log, status: 'done', message: 'Concluido!' } : log
      ))
    }

    setExecuting(false)
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      tipo: 'system',
      conteudo: `Fluxo executado! ${steps.filter(s => s.ativo).length} etapas concluidas.`,
      timestamp: new Date()
    }])
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

      {/* Steps Panel */}
      <div className="w-96 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <button onClick={onBack} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Meu Fluxo</h2>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{steps.length} etapas</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {steps.length === 0 ? (
            <div className="text-center py-8">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'var(--accent-glow)', border: '1px dashed var(--accent)' }}
              >
                <Plus className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Nenhuma etapa ainda</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Descreva seu fluxo no chat ao lado
              </p>
              <div className="mt-4 p-3 rounded-lg text-left text-xs" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                <p className="font-medium mb-1">Exemplos:</p>
                <p>&bull; &quot;Busque empresas no Google Maps&quot;</p>
                <p>&bull; &quot;Scraping de sites e criar proposta&quot;</p>
                <p>&bull; &quot;Criar site melhorado e publicar&quot;</p>
              </div>
            </div>
          ) : (
            steps.map((step, index) => {
              const Icon = stepIcons[step.tipo] || Settings
              const isExpanded = expandedStep === step.id
              const log = executionLogs[index]
              
              return (
                <div 
                  key={step.id}
                  className="card p-4 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  style={!step.ativo ? { opacity: 0.5 } : isExpanded ? { borderColor: 'var(--accent)', boxShadow: '0 0 15px var(--accent-glow)' } : {}}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedStep(isExpanded ? null : step.id)
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                      {index + 1}
                    </div>
                    
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                      style={{ background: step.ativo ? 'var(--accent-glow)' : 'var(--bg-secondary)' }}>
                      <Icon className="w-4 h-4" style={{ color: step.ativo ? 'var(--accent)' : 'var(--text-tertiary)' }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>{step.nome}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{step.descricao}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => setExpandedStep(isExpanded ? null : step.id)} className="p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }}>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <div className={`toggle ${step.ativo ? 'active' : ''}`} onClick={() => toggleStep(step.id)} />
                      <button onClick={() => removeStep(step.id)} className="p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <div>
                        <label className="text-xs block mb-1" style={{ color: 'var(--text-tertiary)' }}>Nome</label>
                        <input type="text" value={step.nome} className="input-field text-sm" readOnly />
                      </div>
                      <div>
                        <label className="text-xs block mb-1" style={{ color: 'var(--text-tertiary)' }}>Descricao</label>
                        <textarea value={step.descricao} rows={2} className="input-field text-sm resize-none" readOnly />
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {executing ? (
            <div className="space-y-2">
              {executionLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {log.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" style={{ color: 'var(--accent)' }} />}
                  {log.status === 'done' && <CheckCircle className="w-3 h-3" style={{ color: 'var(--neon)' }} />}
                  {log.status === 'pending' && <Clock className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />}
                  <span style={{ color: log.status === 'done' ? 'var(--neon)' : 'var(--text-secondary)' }}>{log.step}</span>
                </div>
              ))}
            </div>
          ) : (
            <button onClick={executeFlow} disabled={steps.length === 0} className="btn-sage w-full disabled:opacity-50">
              <Play className="w-5 h-5" />
              Executar Fluxo
            </button>
          )}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))' }}>
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Assistente de Fluxo</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>IA Ativa</span>
            </div>
          </div>
          
          {/* Model Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowModelMenu(!showModelMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105"
              style={{ 
                background: 'var(--accent-glow)', 
                border: '1px solid var(--accent)',
                boxShadow: '0 0 10px var(--accent-glow)'
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                {selectedModel.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <ChevronDown className="w-3 h-3" style={{ color: 'var(--accent)' }} />
            </button>
            
            {showModelMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50" style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--border)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}>
                <div className="p-2 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <p className="text-xs font-medium" style={{ color: 'var(--plasma-400)' }}>Free</p>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(52, 211, 153, 0.15)', color: 'var(--plasma-400)' }}>R$0</span>
                  </div>
                  {[
                    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Rapido e economico', icon: '⚡', free: true },
                    { id: 'gpt-4o', name: 'GPT-4o', desc: 'Inteligente', icon: '🧠', free: true },
                    { id: 'o3-mini', name: 'O3 Mini', desc: 'Raciocinio avancado', icon: '🎯', free: true },
                  ].map(model => (
                    <button
                      key={model.id}
                      onClick={() => { setSelectedModel(model.id); setShowModelMenu(false) }}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setShowModelMenu(false)
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedModel(model.id)
                          setShowModelMenu(false)
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      style={{ 
                        background: selectedModel === model.id ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
                        color: selectedModel === model.id ? 'var(--plasma-400)' : 'var(--text-primary)'
                      }}
                      aria-selected={selectedModel === model.id}
                      role="option"
                    >
                      <span className="text-lg">{model.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{model.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{model.desc}</p>
                      </div>
                    </button>
                  ))}
                  
                  <div className="my-2 border-t" style={{ borderColor: 'var(--border)' }} />
                  
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <p className="text-xs font-medium" style={{ color: 'var(--neural-400)' }}>Premium</p>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--neural-400)' }}>R$10/mes</span>
                  </div>
                  {[
                    { id: 'moonshotai/kimi-k2.6', name: 'Kimi K3', desc: 'Mais inteligente', icon: '✨', premium: true },
                    { id: 'minimaxai/minimax-m2.7', name: 'MiniMax M2.7', desc: 'Equilibrado', icon: '⚖️', premium: true },
                    { id: 'google/gemma-3-12b-it', name: 'Gemma 4', desc: 'Rapido', icon: '🏃', premium: true },
                    { id: 'meta/llama2-70b', name: 'Llama 2 70B', desc: 'Avancado', icon: '🦙', premium: true },
                    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B', desc: 'Leve', icon: '💨', premium: true },
                  ].map(model => {
                    const isLocked = currentPlan === 'free' && model.premium
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          if (isLocked) {
                            setShowUpgradeModal(true)
                            setShowModelMenu(false)
                            return
                          }
                          setSelectedModel(model.id)
                          setShowModelMenu(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setShowModelMenu(false)
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            if (isLocked) {
                              setShowUpgradeModal(true)
                              setShowModelMenu(false)
                              return
                            }
                            setSelectedModel(model.id)
                            setShowModelMenu(false)
                          }
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{ 
                          background: selectedModel === model.id ? 'var(--accent-glow)' : 'transparent',
                          color: selectedModel === model.id ? 'var(--accent)' : isLocked ? 'var(--text-tertiary)' : 'var(--text-primary)',
                          opacity: isLocked ? 0.6 : 1
                        }}
                        aria-selected={selectedModel === model.id}
                        role="option"
                      >
                        <span className="text-lg">{model.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{model.name}</p>
                          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{model.desc}</p>
                        </div>
                        {isLocked && (
                          <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--neural-400)' }} />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {apiError && (
            <div 
              className="flex items-center gap-3 p-3 rounded-xl text-sm"
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'var(--hot-400)'
              }}
              role="alert"
            >
              <span>Erro: {apiError}</span>
              <button 
                onClick={() => setApiError(null)}
                className="ml-auto p-1 rounded hover:bg-white/10"
                aria-label="Fechar erro"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {messages.length === 1 && !isTyping && (
            <div className="text-center py-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}
              >
                <Bot className="w-8 h-8" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Como posso ajudar?
              </h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Descreva o fluxo de automacao que voce quer criar. Posso fazer busca de leads, 
                scraping, analise com IA, criacao de sites e muito mais.
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.tipo === 'ai' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              {message.tipo === 'system' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6, 214, 160, 0.15)' }}>
                  <Zap className="w-4 h-4" style={{ color: 'var(--neon)' }} />
                </div>
              )}
              
              <div className="max-w-[80%] rounded-2xl px-4 py-3" style={{ 
                background: message.tipo === 'user' ? 'var(--accent)' : message.tipo === 'system' ? 'rgba(6, 214, 160, 0.1)' : 'var(--surface)',
                color: message.tipo === 'user' ? 'white' : 'var(--text-primary)',
                border: message.tipo === 'user' ? 'none' : message.tipo === 'system' ? '1px solid rgba(6, 214, 160, 0.3)' : '1px solid var(--border)',
                boxShadow: message.tipo === 'user' ? '0 0 20px var(--accent-glow)' : 'none'
              }}>
                <p className="text-sm whitespace-pre-line">{message.conteudo}</p>
                {message.files && message.files.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.files.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <File className="w-3 h-3" />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs mt-2 opacity-50">
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.tipo === 'user' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                  <User className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--cyan))' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent)', animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--cyan)', animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--neon)', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {attachedFiles.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {attachedFiles.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                <File className="w-3 h-3" />
                {f}
                <button onClick={() => removeFile(f)} className="ml-1 hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowSkills(true)} 
              className="p-3 rounded-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ color: 'var(--accent)', border: '1px solid var(--accent)', background: 'var(--accent-glow)', boxShadow: '0 0 15px var(--accent-glow)' }}
              aria-label="Abrir seletor de skills"
            >
              <Puzzle className="w-5 h-5" />
            </button>
            <button 
              onClick={handleFileAttach} 
              className="p-3 rounded-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ color: 'var(--text-tertiary)', border: '1px solid var(--border)' }}
              aria-label="Anexar arquivo"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder={steps.length === 0 ? "Descreva o fluxo que quer criar..." : "Mande um prompt para executar..."}
              className="input-field flex-1 focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              aria-label="Mensagem para o assistente"
              maxLength={2000}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping} 
              className="btn-primary disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              aria-label={isTyping ? "Enviando..." : "Enviar mensagem"}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              {steps.length === 0 ? (
                <>
                  <button onClick={() => setInputValue('Busque empresas no Google Maps, faca scraping, crie proposta e envie por email')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    Fluxo completo de prospeccao
                  </button>
                  <button onClick={() => setInputValue('Pesquise leads, analise com IA, crie site melhorado e publique')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    Criar e publicar sites
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setInputValue('20 empresas com site feio em Sao Paulo')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    20 empresas com site feio
                  </button>
                  <button onClick={() => setInputValue('10 clinicas 5 estrelas sem site no RJ')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    10 clinicas sem site
                  </button>
                </>
              )}
            </div>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {inputValue.length}/2000
            </span>
          </div>
        </div>
      </div>

      {showSkills && (
        <SkillsSelector 
          onSelect={(skill) => {
            setInputValue(`Use a skill ${skill.nome}: ${skill.descricao}`)
          }} 
          onClose={() => setShowSkills(false)} 
        />
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-md p-6 text-center" style={{ boxShadow: '0 0 60px var(--accent-glow)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}>
              <Crown className="w-8 h-8" style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Upgrade para Premium</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Os modelos de IA avancados como Kimi K3, MiniMax e outros estao disponiveis no plano Premium.
            </p>
            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>R$ 10<span className="text-sm font-normal" style={{ color: 'var(--text-tertiary)' }}>/mes</span></p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Acesso ilimitado a todos os modelos</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowUpgradeModal(false)} className="btn-secondary flex-1">
                Agora nao
              </button>
              <a href="#pricing" onClick={() => setShowUpgradeModal(false)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Crown className="w-4 h-4" />
                Ver Planos
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
