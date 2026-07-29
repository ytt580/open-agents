'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Plus, 
  Trash2, 
  GripVertical,
  Send,
  Bot,
  User,
  Globe,
  Search,
  Code,
  Mail,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight
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
  tipo: 'user' | 'ai'
  conteudo: string
  timestamp: Date
}

const defaultSteps: Step[] = [
  { id: '1', tipo: 'busca', nome: 'Buscar no Google Maps', descricao: 'Pesquisar negocios por criterio e localizacao', ativo: true },
  { id: '2', tipo: 'scraping', nome: 'Scraping do Site', descricao: 'Extrair dados e analisar site atual', ativo: true },
  { id: '3', tipo: 'analise', nome: 'Analise com IA', descricao: 'Identificar problemas e melhorias', ativo: true },
  { id: '4', tipo: 'criacao', nome: 'Criar Site Melhorado', descricao: 'Gerar nova versao do site', ativo: true },
  { id: '5', tipo: 'email', nome: 'Enviar Proposta', descricao: 'Enviar email/WhatsApp com proposta', ativo: true },
  { id: '6', tipo: 'publicacao', nome: 'Publicar Site', descricao: 'Publicar na Vercel/Netlify', ativo: true },
]

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
  const [steps, setSteps] = useState<Step[]>(defaultSteps)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      tipo: 'ai',
      conteudo: 'Ola! Sou sua assistente de automacao. Como posso ajudar a editar este fluxo?\n\nVoce pode:\n- Adicionar ou remover etapas\n- Configurar cada etapa\n- Alterar a ordem de execucao\n- Testar o fluxo\n\nO que deseja fazer?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      tipo: 'user',
      conteudo: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        tipo: 'ai',
        conteudo: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lower = input.toLowerCase()
    
    if (lower.includes('adicionar') || lower.includes('nova etapa')) {
      return 'Claro! Posso adicionar uma nova etapa. Que tipo de etapa voce gostaria?\n\n- **Busca** - Pesquisar no Google Maps\n- **Scraping** - Extrair dados de sites\n- **Analise** - Analisar com IA\n- **Criacao** - Criar sites/materiais\n- **Mensagem** - Enviar email/WhatsApp\n- **Publicacao** - Publicar sites\n\nOu descreva o que precisa e eu crio uma etapa personalizada.'
    }
    
    if (lower.includes('remover') || lower.includes('deletar')) {
      return 'Para remover uma etapa, clique no icone de lixeira ao lado da etapa que deseja remover.'
    }
    
    if (lower.includes('ordenar') || lower.includes('ordem')) {
      return 'Para reordenar as etapas, arraste-as usando o icone de gripper (⠿) ao lado esquerdo de cada etapa.'
    }
    
    if (lower.includes('testar') || lower.includes('executar')) {
      return 'Para testar o fluxo, clique no botao "Executar Fluxo" no canto superior direito.'
    }

    return 'Entendi! Posso ajudar com isso. Por favor, me de mais detalhes sobre o que voce gostaria de fazer no fluxo.'
  }

  const addStep = (tipo: string) => {
    const newStep: Step = {
      id: Date.now().toString(),
      tipo,
      nome: `Nova Etapa - ${tipo}`,
      descricao: 'Descricao da etapa',
      ativo: true
    }
    setSteps(prev => [...prev, newStep])
  }

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  const toggleStep = (id: string) => {
    setSteps(prev => prev.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ))
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
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Prospeccao Google Maps</h2>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{steps.length} etapas</p>
          </div>
        </div>

        {/* Steps list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {steps.map((step) => {
            const Icon = stepIcons[step.tipo] || Settings
            const isExpanded = expandedStep === step.id
            
            return (
              <div 
                key={step.id}
                className="card p-4 transition-all duration-200"
                style={!step.ativo ? { opacity: 0.5 } : isExpanded ? { borderColor: 'var(--accent)' } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-move" style={{ color: 'var(--text-tertiary)' }}>
                    <GripVertical className="w-4 h-4" />
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
                      <input type="text" value={step.nome} className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-xs block mb-1" style={{ color: 'var(--text-tertiary)' }}>Descricao</label>
                      <textarea value={step.descricao} rows={2} className="input-field text-sm resize-none" />
                    </div>
                    <button className="w-full py-2 text-sm font-medium rounded-lg transition-colors" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                      <Settings className="w-4 h-4 inline mr-2" />
                      Configurar Etapa
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          <button onClick={() => addStep('busca')} className="w-full py-4 border-2 border-dashed rounded-xl font-medium transition-all duration-200" style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}>
            <Plus className="w-5 h-5 inline mr-2" />
            Adicionar Etapa
          </button>
        </div>

        {/* Execute button */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button className="btn-sage w-full">
            <Play className="w-5 h-5" />
            Executar Fluxo
          </button>
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
              
              <div className="max-w-[80%] rounded-2xl px-4 py-3" style={{ 
                background: message.tipo === 'user' ? 'var(--accent)' : 'var(--surface)',
                color: message.tipo === 'user' ? 'white' : 'var(--text-primary)',
                border: message.tipo === 'user' ? 'none' : '1px solid var(--border)'
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
              placeholder="Digite sua mensagem para a IA..."
              className="input-field flex-1"
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim()} className="btn-primary disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}