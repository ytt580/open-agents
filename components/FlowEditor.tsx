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
  AlertCircle,
  Zap,
  Globe,
  Code,
  Mail,
  Search,
  MessageSquare
} from 'lucide-react'

interface FlowEditorProps {
  flowId: string
  onBack: () => void
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
}

interface ExecutionLog {
  step: string
  status: 'pending' | 'running' | 'done' | 'error'
  message: string
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

export function FlowEditor({ flowId, onBack }: FlowEditorProps) {
  const [steps, setSteps] = useState<Step[]>([])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      tipo: 'ai',
      conteudo: 'Ola! Sou sua assistente de automacao. Descreva o fluxo que voce quer criar.\n\nExemplos:\n- "Busque empresas no Google Maps, faca scraping do site, crie uma proposta e envie por email"\n- "Pesquise leads, analise com IA, crie site melhorado e publique"\n\nO que voce quer automatizar?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [executing, setExecuting] = useState(false)
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [mode, setMode] = useState<'chat' | 'execute'>('chat')
  const [usedLeads, setUsedLeads] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const parseFlowFromAI = (input: string): Step[] => {
    const lower = input.toLowerCase()
    const newSteps: Step[] = []
    let id = 1

    if (lower.includes('maps') || lower.includes('google') || lower.includes('buscar') || lower.includes('busca') || lower.includes('lead')) {
      newSteps.push({ id: String(id++), tipo: 'busca', nome: 'Buscar Leads', descricao: 'Pesquisar empresas no Google Maps por criterio e localizacao', ativo: true })
    }
    if (lower.includes('scraping') || lower.includes('scrap') || lower.includes('extrair') || lower.includes('site')) {
      newSteps.push({ id: String(id++), tipo: 'scraping', nome: 'Scraping do Site', descricao: 'Extrair dados e informacoes do site da empresa', ativo: true })
    }
    if (lower.includes('analise') || lower.includes('analisar') || lower.includes('ia') || lower.includes('avaliar')) {
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Analise com IA', descricao: 'Avaliar qualidade do site e identificar melhorias', ativo: true })
    }
    if (lower.includes('criar site') || lower.includes('criar') || lower.includes('novo site') || lower.includes('repaginar') || lower.includes('repagina')) {
      newSteps.push({ id: String(id++), tipo: 'criacao', nome: 'Criar Site Melhorado', descricao: 'Gerar nova versao do site com design profissional', ativo: true })
    }
    if (lower.includes('proposta') || lower.includes('orçamento') || lower.includes('orcamento')) {
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
      newSteps.push({ id: '1', tipo: 'busca', nome: 'Buscar Leads', descricao: input, ativo: true })
    }

    return newSteps
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      tipo: 'user',
      conteudo: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = inputValue
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = userInput.toLowerCase()
      let aiResponse = ''

      const isCreatingFlow = lower.includes('fluxo') || lower.includes('automatizar') || 
        lower.includes('busque') || lower.includes('scraping') || lower.includes('criar site') ||
        lower.includes('enviar') || lower.includes('proposta') || lower.includes('repagina') ||
        lower.includes('maps') || lower.includes('google') || lower.includes('leads')

      if (isCreatingFlow) {
        const parsed = parseFlowFromAI(userInput)
        setSteps(parsed)
        
        const stepList = parsed.map(s => `  ${parsed.indexOf(s) + 1}. ${s.nome} - ${s.descricao}`).join('\n')
        aiResponse = `Perfeito! Criei seu fluxo com ${parsed.length} etapas:\n\n${stepList}\n\nFluxo pronto! Agora voce pode:\n- Clicar em "Executar Fluxo" para rodar\n- Ou me mandar um prompt como "20 empresas com site feio em Sao Paulo" para executar automaticamente`
      } else if (lower.includes('executar') || lower.includes('rodar') || lower.includes('run')) {
        if (steps.length === 0) {
          aiResponse = 'Nenhum fluxo criado ainda. Descreva o fluxo que voce quer automatizar primeiro.'
        } else {
          aiResponse = 'Para executar, clique no botao "Executar Fluxo" ou mande um prompt como:\n\n"20 empresas com site feio em SP"\n"10 clinicas 5 estrelas sem site no RJ"\n"15 restaurantes com avaliacao baixa"'
        }
      } else if (lower.includes('20 empresa') || lower.includes('10 empresa') || lower.includes('15 empresa') || /\d+\s*(empresa|lead|negocio)/.test(lower)) {
        const match = userInput.match(/(\d+)/)
        const count = match ? parseInt(match[1]) : 10
        aiResponse = `Vou executar seu fluxo para ${count} empresas!\n\nProcesso:\n1. Buscando ${count} empresas no Google Maps...\n2. Coletando dados de cada empresa...\n3. Analisando sites...\n4. Criando propostas...\n5. Enviando emails...\n\n(Execucao real em breve com backend)`
      } else {
        aiResponse = 'Entendi! Posso ajudar com isso. Para criar um fluxo, descreva o que quer automatizar. Para executar, mande um prompt como "20 empresas com site feio".'
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        tipo: 'ai',
        conteudo: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
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
    setMode('execute')
    
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
    const execMessage: Message = {
      id: Date.now().toString(),
      tipo: 'system',
      conteudo: `Fluxo executado! ${steps.filter(s => s.ativo).length} etapas concluidas.`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, execMessage])
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Steps Panel */}
      <div className="w-96 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* Header */}
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <button onClick={onBack} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Meu Fluxo</h2>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{steps.length} etapas</p>
          </div>
        </div>

        {/* Steps list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {steps.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--accent-15)' }}>
                <Plus className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Nenhuma etapa ainda
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Descreva seu fluxo no chat
              </p>
            </div>
          ) : (
            steps.map((step, index) => {
              const Icon = stepIcons[step.tipo] || Settings
              const isExpanded = expandedStep === step.id
              const log = executionLogs[index]
              
              return (
                <div 
                  key={step.id}
                  className="card p-4 transition-all duration-200"
                  style={!step.ativo ? { opacity: 0.5 } : isExpanded ? { borderColor: 'var(--accent)' } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                      style={{ background: 'var(--accent-15)', color: 'var(--accent)' }}>
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
                      <button onClick={() => setExpandedStep(isExpanded ? null : step.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <div className={`toggle ${step.ativo ? 'active' : ''}`} onClick={() => toggleStep(step.id)} />
                      <button onClick={() => removeStep(step.id)} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>
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

          {steps.length > 0 && (
            <button onClick={() => {}} className="w-full py-4 border-2 border-dashed rounded-xl font-medium transition-all duration-200" style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}>
              <Plus className="w-5 h-5 inline mr-2" />
              Adicionar Etapa
            </button>
          )}
        </div>

        {/* Execute button */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {executing ? (
            <div className="space-y-2">
              {executionLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {log.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" style={{ color: 'var(--accent)' }} />}
                  {log.status === 'done' && <CheckCircle className="w-3 h-3" style={{ color: 'var(--sage)' }} />}
                  {log.status === 'pending' && <Clock className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />}
                  <span style={{ color: log.status === 'done' ? 'var(--sage-dark)' : 'var(--text-secondary)' }}>{log.step}</span>
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
        {/* Chat header */}
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Assistente de Fluxo</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--sage)' }} />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.tipo === 'ai' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              {message.tipo === 'system' && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--sage-15)' }}>
                  <Zap className="w-4 h-4" style={{ color: 'var(--sage)' }} />
                </div>
              )}
              
              <div className="max-w-[80%] rounded-2xl px-4 py-3" style={{ 
                background: message.tipo === 'user' ? 'var(--accent)' : message.tipo === 'system' ? 'var(--sage-10)' : 'var(--surface)',
                color: message.tipo === 'user' ? 'white' : 'var(--text-primary)',
                border: message.tipo === 'user' ? 'none' : message.tipo === 'system' ? '1px solid var(--sage-30)' : '1px solid var(--border)'
              }}>
                <p className="text-sm whitespace-pre-line">{message.conteudo}</p>
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--sage))' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={steps.length === 0 ? "Descreva o fluxo que quer criar..." : "Mande um prompt para executar..."}
              className="input-field flex-1"
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} className="btn-primary disabled:opacity-50">
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {steps.length === 0 ? (
              <>
                <button onClick={() => { setInputValue('Busque empresas no Google Maps, faca scraping, crie proposta e envie por email'); }} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  Fluxo completo de prospeccao
                </button>
                <button onClick={() => { setInputValue('Pesquise leads, analise com IA, crie site melhorado e publique'); }} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  Criar e publicar sites
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setInputValue('20 empresas com site feio em Sao Paulo'); }} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  20 empresas com site feio
                </button>
                <button onClick={() => { setInputValue('10 clinicas 5 estrelas sem site no RJ'); }} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  10 clinicas sem site
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
