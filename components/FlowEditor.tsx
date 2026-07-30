'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft, Play, Plus, Trash2, Send, Bot, User,
  ChevronDown, ChevronRight, Loader2, CheckCircle,
  Clock, Zap, Globe, Code, Mail, Search, MessageSquare,
  Paperclip, File, X, Puzzle, Sparkles, Lock, Crown,
  Settings, Eye, AlertTriangle, Shield, Pause, Image as ImageIcon, Volume2
} from 'lucide-react'
import { chatAI, generateImage, textToSpeech, imageToText, getVisionFallback } from '@/lib/puter-ai'
import { SkillsSelector } from './SkillsSelector'
import { SiteBuilder } from './SiteBuilder'
import { Flow } from '@/app/dashboard/page'
import { detectDangerousAction, type HITLActionType } from './HITLSystem'
import { modelRouter } from '@/lib/model-router'

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
  images?: { name: string; mime: string; data: string }[]
}

interface ExecutionLog {
  step: string
  status: 'pending' | 'running' | 'done' | 'error'
  message: string
}

interface Checkpoint {
  id: string
  nome: string
  timestamp: Date
  steps: Step[]
  messages: Message[]
}

const MESSAGES_STORAGE_KEY = 'open-agents-messages'
const CHECKPOINTS_STORAGE_KEY = 'open-agents-checkpoints'

function loadMessages(flowId: string): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`${MESSAGES_STORAGE_KEY}-${flowId}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
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

function loadCheckpoints(flowId: string): Checkpoint[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`${CHECKPOINTS_STORAGE_KEY}-${flowId}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) }))
    }
  } catch {}
  return []
}

function saveCheckpoints(flowId: string, checkpoints: Checkpoint[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${CHECKPOINTS_STORAGE_KEY}-${flowId}`, JSON.stringify(checkpoints))
  } catch {}
}

const stepIcons: Record<string, any> = {
  busca: Search, scraping: Globe, analise: Code, criacao: Code,
  email: Mail, whatsapp: MessageSquare, publicacao: Globe,
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
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; mime: string; data: string }[]>([])
  const [showSkills, setShowSkills] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const [showModelMenu, setShowModelMenu] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
  const [showCheckpoints, setShowCheckpoints] = useState(false)
  const [hitlPending, setHitlPending] = useState<{ step: Step; actionType: HITLActionType; resolve: (approved: boolean) => void } | null>(null)
  const [hitlLog, setHitlLog] = useState<{ step: string; actionType: HITLActionType; status: 'approved' | 'rejected'; timestamp: Date }[]>([])
  const [showHitlLog, setShowHitlLog] = useState(false)
  const [captureTree, setCaptureTree] = useState(false)
  const [accessTree, setAccessTree] = useState<string | null>(null)
  const [showSiteBuilder, setShowSiteBuilder] = useState(false)
  const [scrapedData, setScrapedData] = useState<Record<string, unknown> | null>(null)
  const [generatedProject, setGeneratedProject] = useState<{ files: Record<string, string>; instructions: string; deployNotes: string } | null>(null)
  const currentPlan = 'free'
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = loadMessages(flowId)
    if (stored.length > 0) {
      setMessages(stored)
    } else {
      setMessages([{
        id: '1', tipo: 'ai',
        conteudo: 'Ola! Sou sua assistente de automacao.\n\nPara criar um fluxo, me diga o que voce quer fazer:\n\n- "Busque 20 clinicas sem site no Rio de Janeiro"\n- "Scraping de empresas de ar condicionado em SP"\n- "Pesquise leads e envie proposta por email"\n- "Crie um site melhorado para uma padaria"\n\nOu pergunte qualquer coisa sobre automacao!',
        timestamp: new Date()
      }])
    }
    setCheckpoints(loadCheckpoints(flowId))
    setLoaded(true)
  }, [flowId])

  useEffect(() => {
    if (loaded && messages.length > 0) saveMessages(flowId, messages)
  }, [messages, flowId, loaded])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  useEffect(() => {
    if (steps.length > 0 && onSave) onSave(flowId, flowName, steps)
  }, [steps])

  useEffect(() => {
    const handleClickOutside = () => setShowModelMenu(false)
    if (showModelMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showModelMenu])

  const createCheckpoint = (name: string) => {
    const checkpoint: Checkpoint = {
      id: Date.now().toString(), nome: name, timestamp: new Date(),
      steps: [...steps], messages: [...messages]
    }
    const updated = [...checkpoints, checkpoint]
    setCheckpoints(updated)
    saveCheckpoints(flowId, updated)
  }

  const restoreCheckpoint = (checkpointId: string) => {
    const checkpoint = checkpoints.find(c => c.id === checkpointId)
    if (checkpoint) {
      setSteps(checkpoint.steps)
      setMessages(checkpoint.messages)
      setShowCheckpoints(false)
    }
  }

  const deleteCheckpoint = (checkpointId: string) => {
    const updated = checkpoints.filter(c => c.id !== checkpointId)
    setCheckpoints(updated)
    saveCheckpoints(flowId, updated)
  }

  const parseFlowFromAI = (input: string): Step[] => {
    const lower = input.toLowerCase()
    const newSteps: Step[] = []
    let id = 1

    if (lower.includes('maps') || lower.includes('google') || lower.includes('buscar') || lower.includes('busca') || lower.includes('lead') || lower.includes('empresa'))
      newSteps.push({ id: String(id++), tipo: 'busca', nome: 'Buscar Leads', descricao: 'Pesquisar empresas no Google Maps por criterio e localizacao', ativo: true })
    if (lower.includes('scraping') || lower.includes('scrap') || lower.includes('extrair') || lower.includes('site'))
      newSteps.push({ id: String(id++), tipo: 'scraping', nome: 'Scraping do Site', descricao: 'Extrair dados e informacoes do site da empresa', ativo: true })
    if (lower.includes('analise') || lower.includes('analisar') || lower.includes('ia') || lower.includes('avaliar'))
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Analise com IA', descricao: 'Avaliar qualidade do site e identificar melhorias', ativo: true })
    if (lower.includes('criar site') || lower.includes('criar') || lower.includes('novo site') || lower.includes('repaginar') || lower.includes('repagina') || lower.includes('redesign'))
      newSteps.push({ id: String(id++), tipo: 'criacao', nome: 'Criar Site Melhorado', descricao: 'Gerar nova versao do site com design profissional', ativo: true })
    if (lower.includes('proposta') || lower.includes('orcamento') || lower.includes('orçamento'))
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Criar Proposta', descricao: 'Gerar proposta comercial personalizada', ativo: true })
    if (lower.includes('email') || lower.includes('enviar') || lower.includes('mandar'))
      newSteps.push({ id: String(id++), tipo: 'email', nome: 'Enviar Proposta', descricao: 'Enviar proposta por email para o empresario', ativo: true })
    if (lower.includes('whatsapp') || lower.includes('zap'))
      newSteps.push({ id: String(id++), tipo: 'whatsapp', nome: 'Enviar WhatsApp', descricao: 'Enviar mensagem no WhatsApp do empresario', ativo: true })
    if (lower.includes('publicar') || lower.includes('publicacao') || lower.includes('vercel') || lower.includes('netlify'))
      newSteps.push({ id: String(id++), tipo: 'publicacao', nome: 'Publicar Site', descricao: 'Publicar o novo site na internet', ativo: true })
    if (lower.includes('pagamento') || lower.includes('pagar') || lower.includes('aceito') || lower.includes('fechar'))
      newSteps.push({ id: String(id++), tipo: 'analise', nome: 'Fechar Negocio', descricao: 'Confirmar pagamento e fechar negocio', ativo: true })

    if (newSteps.length === 0)
      newSteps.push({ id: '1', tipo: 'busca', nome: 'Processar', descricao: input, ativo: true })

    return newSteps
  }

  const callAI = async (userInput: string, history: Message[], attachedImages?: { name: string; mime: string; data: string }[]): Promise<string> => {
    setApiError(null)
    try {
      let finalInput = userInput
      let model = selectedModel

      if (attachedImages && attachedImages.length > 0) {
        const { getVisionFallback } = await import('@/lib/puter-ai')
        const fallback = getVisionFallback(model)
        if (fallback !== model) model = fallback

        try {
          const imageDescriptions: string[] = []
          for (const img of attachedImages) {
            const dataUrl = `data:${img.mime};base64,${img.data}`
            const desc = await imageToText(dataUrl)
            imageDescriptions.push(`[Imagem "${img.name}": ${desc}]`)
          }
          if (imageDescriptions.length > 0) {
            finalInput = userInput + '\n\n' + imageDescriptions.join('\n')
          }
        } catch {
          finalInput = userInput + '\n\n[Usuario enviou ' + attachedImages.length + ' imagem(ns) - nao foi possivel analisar]'
        }
      }

      const apiMessages = history.slice(-10).map(m => ({
        role: m.tipo === 'user' ? 'user' as const : 'assistant' as const,
        content: m.conteudo
      }))
      apiMessages.push({ role: 'user', content: finalInput })

      const data = await chatAI(apiMessages, { model })
      setRetryCount(0)
      return data.content || 'Desculpe, nao consegui processar.'
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido'
      setApiError(message)
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1)
        return `Erro de conexao (tentativa ${retryCount + 1}/3). Verifique sua conexao e tente novamente.`
      }
      return 'Erro ao conectar com a IA. Verifique se voce esta logado no Puter.'
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const currentImages = attachedFiles.length > 0 ? [...attachedFiles] : []
    const userMessage: Message = {
      id: Date.now().toString(), tipo: 'user', conteudo: inputValue,
      timestamp: new Date(),
      images: currentImages.length > 0 ? currentImages.map(f => ({ name: f.name, mime: f.mime, data: f.data })) : undefined,
      files: currentImages.length > 0 ? currentImages.map(f => f.name) : undefined
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = inputValue
    setInputValue('')
    setAttachedFiles([])
    setIsTyping(true)

    const lower = userInput.toLowerCase()
    
    // Handle /img command for image generation
    if (userInput.startsWith('/img ')) {
      const imgPrompt = userInput.slice(5).trim()
      if (imgPrompt) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), tipo: 'user',
          conteudo: `Gerar imagem: ${imgPrompt}`,
          timestamp: new Date()
        }])
        try {
          const imageUrl = await generateImage(imgPrompt)
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(), tipo: 'ai',
            conteudo: `Imagem gerada com sucesso!`,
            timestamp: new Date()
          }])
          // Store image URL for display
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              conteudo: `Imagem gerada: ${imageUrl}`
            }
            return updated
          })
        } catch (err) {
          setApiError(err instanceof Error ? err.message : 'Erro ao gerar imagem')
        }
        setIsTyping(false)
        return
      }
    }
    
    // Route to Fable 5 for site creation
    if (lower.includes('criar site') || lower.includes('repagina') || lower.includes('repaginar') || lower.includes('redesign')) {
      const decision = modelRouter.route(userInput, { objective: userInput, isNewSite: true })
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), tipo: 'ai',
        conteudo: `🔄 roteando para **Fable 5** (Premium R$ 49)\n\n${decision.reason}\n\nAbrindo construtor de site Next.js...`,
        timestamp: new Date()
      }])
      setTimeout(() => setShowSiteBuilder(true), 500)
      setIsTyping(false)
      return
    }

    // Only create flow when user gives SPECIFIC automation instructions
    // NOT for generic messages like "oi", "quero criar fluxo", "o que voce faz"
    const specificActions = ['busque', 'busca', 'scraping', 'scrape', 'extrair', 'enviar email', 'enviar proposta', 'enviar whatsapp', 
      'maps do google', 'google maps']
    const hasSpecificAction = specificActions.some(action => lower.includes(action))
    
    // Also match if user mentions specific business context + action verb
    const businessContext = ['empresa', 'clinica', 'escritorio', 'loja', 'restaurante', 'salao', 'academia', 'escola']
    const actionVerbs = ['procurar', 'encontrar', 'pesquisar', 'buscar', 'analisar', 'melhorar', 'criar', 'enviar']
    const hasBusinessContext = businessContext.some(ctx => lower.includes(ctx)) && actionVerbs.some(verb => lower.includes(verb))
    
    const isCreatingFlow = hasSpecificAction || hasBusinessContext

    if (isCreatingFlow && steps.length > 0) createCheckpoint('Antes de modificar fluxo')

    if (isCreatingFlow) {
      const parsed = parseFlowFromAI(userInput)
      setSteps(parsed)
      
      const stepList = parsed.map((s, i) => `  ${i + 1}. ${s.nome} - ${s.descricao}`).join('\n')
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(), tipo: 'ai',
          conteudo: `Perfeito! Criei seu fluxo com ${parsed.length} etapas:\n\n${stepList}\n\nFluxo pronto! Clique em "Executar Fluxo" ou mande um prompt como "20 empresas com site feio em SP".`,
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 1000)
    } else {
      // Generic message - use AI to respond and ask what they want
      const aiResponse = await callAI(userInput, [...messages, userMessage], currentImages.length > 0 ? currentImages : undefined)
      const processedResponse = await processAIResponse(aiResponse)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), tipo: 'ai', conteudo: processedResponse,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }
  }

  const handleFileAttach = () => fileInputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return
    const newFiles: { name: string; mime: string; data: string }[] = []
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i]
      if (!f.type.startsWith('image/')) continue
      const buf = await f.arrayBuffer()
      const bytes = new Uint8Array(buf)
      let binary = ''
      for (let j = 0; j < bytes.length; j++) binary += String.fromCharCode(bytes[j])
      const data = btoa(binary)
      newFiles.push({ name: f.name, mime: f.type, data })
    }
    if (newFiles.length > 0) setAttachedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (name: string) => setAttachedFiles(prev => prev.filter(f => f.name !== name))

  const removeStep = (id: string) => setSteps(prev => prev.filter(s => s.id !== id))

  const toggleStep = (id: string) => setSteps(prev => prev.map(s => s.id === id ? { ...s, ativo: !s.ativo } : s))

  const requestHITLApproval = (step: Step, actionType: HITLActionType): Promise<boolean> => {
    return new Promise((resolve) => {
      setHitlPending({ step, actionType, resolve })
    })
  }

  const handleHITLDecision = (approved: boolean) => {
    if (hitlPending) {
      setHitlLog(prev => [...prev, {
        step: hitlPending.step.nome,
        actionType: hitlPending.actionType,
        status: approved ? 'approved' : 'rejected',
        timestamp: new Date()
      }])
      hitlPending.resolve(approved)
      setHitlPending(null)
    }
  }

  const executeFlow = async () => {
    if (steps.length === 0 || executing) return
    setExecuting(true)
    
    const logs: ExecutionLog[] = steps.map(s => ({ step: s.nome, status: 'pending' as const, message: 'Aguardando...' }))
    setExecutionLogs(logs)

    for (let i = 0; i < steps.length; i++) {
      if (!steps[i].ativo) continue

      const dangerType = detectDangerousAction(steps[i].nome, steps[i].descricao)
      if (dangerType) {
        setExecutionLogs(prev => prev.map((log, idx) => idx === i ? { ...log, status: 'running', message: 'Aguardando aprovacao HITL...' } : log))
        const approved = await requestHITLApproval(steps[i], dangerType)
        if (!approved) {
          setExecutionLogs(prev => prev.map((log, idx) => idx === i ? { ...log, status: 'error', message: 'Rejeitado pelo usuario' } : log))
          continue
        }
      }

      setExecutionLogs(prev => prev.map((log, idx) => idx === i ? { ...log, status: 'running', message: 'Executando...' } : log))
      await new Promise(r => setTimeout(r, 2000))
      setExecutionLogs(prev => prev.map((log, idx) => idx === i ? { ...log, status: 'done', message: 'Concluido!' } : log))
    }

    setExecuting(false)
    setMessages(prev => [...prev, {
      id: Date.now().toString(), tipo: 'system',
      conteudo: `Fluxo executado! ${steps.filter(s => s.ativo).length} etapas concluidas.`,
      timestamp: new Date()
    }])
  }

  const handleFileAction = async (action: string, path: string, content?: string) => {
    try {
      const res = await fetch('/api/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, path, content })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      return data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao acessar arquivo'
      setApiError(message)
      return null
    }
  }

  const processAIResponse = async (response: string) => {
    const jsonMatch = response.match(/\{"action":\s*"file"[^}]+\}/)
    if (jsonMatch) {
      try {
        const fileAction = JSON.parse(jsonMatch[0])
        if (fileAction.action === 'file') {
          const result = await handleFileAction(fileAction.type, fileAction.path, fileAction.content)
          if (result) {
            if (fileAction.type === 'read') return `Conteudo de ${fileAction.path}:\n\`\`\`\n${result.content}\n\`\`\``
            if (fileAction.type === 'write') return `Arquivo ${fileAction.path} criado/salvo com sucesso!`
            if (fileAction.type === 'list') {
              const items = result.items.map((i: any) => `${i.isDirectory ? '📁' : '📄'} ${i.name}`).join('\n')
              return `Arquivos em ${fileAction.path}:\n${items}`
            }
          }
          return 'Nao consegui processar a acao no arquivo.'
        }
      } catch {}
    }
    return response
  }

  const captureAccessibilityTree = async () => {
    setCaptureTree(true)
    setAccessTree(null)
    try {
      const res = await fetch('http://localhost:9222/json')
      if (!res.ok) throw new Error('BrowserClaw nao encontrado')
      const tabs = await res.json()
      if (tabs.length === 0) throw new Error('Nenhuma aba aberta')
      const ws = new WebSocket(tabs[0].webSocketDebuggerUrl)
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Accessibility.getFullAXTree' }))
      }
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.id === 1 && data.result && data.result.nodes) {
          const tree = data.result.nodes
            .filter((n: any) => n.role && n.role.value !== 'none' && n.name && n.name.value)
            .slice(0, 50)
            .map((n: any) => `[${n.role.value}] ${n.name.value}${n.children ? ' (expandir)' : ''}`)
            .join('\n')
          setAccessTree(tree || 'Arvore vazia')
          setMessages(prev => [...prev, {
            id: Date.now().toString(), tipo: 'system',
            conteudo: `Accessibility Tree capturado! ${tree.split('\n').length} elementos semanticos encontrados. A IA pode usar isto para navegar sem screenshots.`,
            timestamp: new Date()
          }])
        }
        ws.close()
      }
      ws.onerror = () => {
        setAccessTree('Erro ao conectar ao WebSocket')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido'
      const isNetworkError = msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('ECONNREFUSED')
      if (isNetworkError) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(), tipo: 'system',
          conteudo: `BrowserClaw nao detectado. Para usar a Accessibility Tree, inicie o BrowserClaw na porta 9222.`,
          timestamp: new Date()
        }])
      } else {
        setAccessTree(`Erro: ${msg}`)
        setMessages(prev => [...prev, {
          id: Date.now().toString(), tipo: 'ai',
          conteudo: `Nao foi possivel capturar a arvore de acessibilidade. Erro: ${msg}`,
          timestamp: new Date()
        }])
      }
    } finally {
      setCaptureTree(false)
    }
  }

  const freeModels = [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'GitHub AI - rapido', free: true },
    { id: 'gpt-4o', name: 'GPT-4o', desc: 'GitHub AI - visao', free: true },
    { id: 'gpt-4.1', name: 'GPT-4.1', desc: 'GitHub AI - novo', free: true },
    { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', desc: 'GitHub AI - leve', free: true },
    { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', desc: 'GitHub AI - minimo', free: true },
    { id: 'o4-mini', name: 'o4-mini', desc: 'GitHub AI - raciocinio', free: true },
    { id: 'gpt-5-nano', name: 'GPT-5 Nano', desc: 'GitHub AI - avancado', free: true },
    { id: 'gpt-5-mini', name: 'GPT-5 Mini', desc: 'GitHub AI - medio', free: true },
    { id: 'gpt-5', name: 'GPT-5', desc: 'GitHub AI - tope', free: true },
    { id: 'claude-sonnet-4-6', name: 'Claude Sonnet', desc: 'GitHub AI - analitico', free: true },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'GitHub AI - google', free: true },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'GitHub AI - google pro', free: true },
    { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', desc: 'GitHub AI - raciocinio', free: true },
    { id: 'deepseek/deepseek-v3', name: 'DeepSeek V3', desc: 'GitHub AI - trabalho', free: true },
    { id: 'meta-llama/llama-3.3-70b', name: 'Llama 3.3 70B', desc: 'GitHub AI - meta', free: true },
    { id: 'meta-llama/llama-4-scout', name: 'Llama 4 Scout', desc: 'GitHub AI - meta novo', free: true },
    { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick', desc: 'GitHub AI - meta 128e', free: true },
    { id: 'mistralai/mistral-large-latest', name: 'Mistral Large', desc: 'GitHub AI - europeu', free: true },
    { id: 'mistralai/codestral-latest', name: 'Codestral', desc: 'GitHub AI - codigo', free: true },
    { id: 'microsoft/phi-4', name: 'Phi-4', desc: 'GitHub AI - microsoft', free: true },
    { id: 'microsoft/phi-4-mini', name: 'Phi-4 Mini', desc: 'GitHub AI - microsoft leve', free: true },
    { id: 'cohere/command-a', name: 'Command A', desc: 'GitHub AI - cohere', free: true },
    { id: 'nvidia/llama-3.1-nemotron-70b', name: 'Nemotron 70B', desc: 'GitHub AI - nvidia', free: true },
    { id: 'ai21/jamba-1.5', name: 'Jamba 1.5', desc: 'GitHub AI - ai21', free: true },
  ]

  const premiumModels = [
    { id: 'gpt-4o', name: 'GPT-4o', desc: 'Puter.js - visao', premium: true },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Puter.js - rapido', premium: true },
    { id: 'claude-sonnet-4-6', name: 'Claude Sonnet', desc: 'Puter.js - analitico', premium: true },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Puter.js - google', premium: true },
    { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', desc: 'Puter.js - raciocinio', premium: true },
    { id: 'mistralai/mistral-large-latest', name: 'Mistral Large', desc: 'Puter.js - europeu', premium: true },
    { id: 'cloudflare/gpt-oss-120b', name: 'GPT-OSS 120B', desc: 'Cloudflare - open source', premium: true },
    { id: 'cloudflare/llama-4-scout', name: 'Llama 4 Scout', desc: 'Cloudflare - meta', premium: true },
    { id: 'cloudflare/deepseek-r1', name: 'DeepSeek R1 32B', desc: 'Cloudflare - raciocinio', premium: true },
    { id: 'cloudflare/gemma-4-26b', name: 'Gemma 4 26B', desc: 'Cloudflare - google', premium: true },
    { id: 'cloudflare/mistral-small', name: 'Mistral Small 3.1', desc: 'Cloudflare - 24B', premium: true },
    { id: 'cloudflare/nemotron-3-120b', name: 'Nemotron 3 120B', desc: 'Cloudflare - NVIDIA', premium: true },
    { id: 'cloudflare/kimi-k2.7', name: 'Kimi K2.7 Code', desc: 'Cloudflare - moonshot', premium: true },
    { id: 'cloudflare/qwq-32b', name: 'QwQ 32B', desc: 'Cloudflare - Qwen raciocinio', premium: true },
    { id: 'cloudflare/flux-2-dev', name: 'FLUX.2 Dev', desc: 'Cloudflare - imagem', premium: true },
  ]

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg)' }}>
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

      {/* Steps Panel */}
      <div className="w-[420px] flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <button onClick={onBack} className="btn-icon">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-xl" style={{ color: 'var(--fg)' }}>Meu Fluxo</h2>
            <p className="text-base" style={{ color: 'var(--fg-muted)' }}>{steps.length} etapas</p>
          </div>
          <button 
            onClick={() => setShowCheckpoints(!showCheckpoints)}
            className="btn-icon relative"
            style={{ color: checkpoints.length > 0 ? 'var(--green)' : 'var(--fg-muted)' }}
            title="Historico de checkpoints"
          >
            <Clock className="w-5 h-5" />
            {checkpoints.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold" style={{ background: 'var(--green)', color: 'white' }}>
                {checkpoints.length}
              </span>
            )}
          </button>
          <button 
            onClick={captureAccessibilityTree}
            disabled={captureTree}
            className="btn-icon"
            style={{ color: accessTree ? 'var(--blue)' : 'var(--fg-muted)' }}
            title="Capturar Accessibility Tree (BrowserClaw)"
          >
            {captureTree ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setShowHitlLog(!showHitlLog)}
            className="btn-icon relative"
            style={{ color: hitlLog.length > 0 ? 'var(--red)' : 'var(--fg-muted)' }}
            title="Historico de aprovacoes HITL"
          >
            <Shield className="w-5 h-5" />
            {hitlLog.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold" style={{ background: 'var(--red)', color: 'white' }}>
                {hitlLog.length}
              </span>
            )}
          </button>
        </div>

        {/* Checkpoints Panel */}
        {showCheckpoints && (
          <div className="p-4 space-y-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Historico</h3>
              <button 
                onClick={() => { if (steps.length > 0) createCheckpoint('Checkpoint manual') }}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ 
                  background: steps.length > 0 ? 'var(--bg-muted)' : 'var(--bg-inset)',
                  color: steps.length > 0 ? 'var(--fg)' : 'var(--fg-muted)'
                }}
                disabled={steps.length === 0}
              >
                + Salvar agora
              </button>
            </div>
            {checkpoints.length === 0 ? (
              <p className="text-sm text-center py-4" style={{ color: 'var(--fg-muted)' }}>Nenhum checkpoint salvo</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {checkpoints.map((cp) => (
                  <div key={cp.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>{cp.nome}</p>
                      <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                        {cp.steps.length} etapas - {cp.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <button onClick={() => restoreCheckpoint(cp.id)} className="text-xs px-2.5 py-1.5 rounded-lg font-semibold" style={{ background: 'var(--green)', color: 'white' }}>
                      Restaurar
                    </button>
                    <button onClick={() => deleteCheckpoint(cp.id)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {steps.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--bg-muted)', border: '1px dashed var(--fg)' }}>
                <Plus className="w-7 h-7" style={{ color: 'var(--fg)' }} />
              </div>
              <p className="text-base font-semibold" style={{ color: 'var(--fg)' }}>Nenhuma etapa ainda</p>
              <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>Descreva seu fluxo no chat ao lado</p>
              <div className="mt-4 p-3 rounded-xl text-left text-sm" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                <p className="font-semibold mb-2">Exemplos:</p>
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
                  className="card p-4 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--fg)]"
                  style={!step.ativo ? { opacity: 0.5 } : isExpanded ? { borderColor: 'var(--fg)' } : {}}
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
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--bg-muted)', color: 'var(--fg)' }}>
                      {index + 1}
                    </div>
                    
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: step.ativo ? 'var(--bg-muted)' : 'var(--bg-muted)' }}>
                      <Icon className="w-5 h-5" style={{ color: step.ativo ? 'var(--fg)' : 'var(--fg-muted)' }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate" style={{ color: 'var(--fg)' }}>{step.nome}</p>
                      <p className="text-base truncate" style={{ color: 'var(--fg-muted)' }}>{step.descricao}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => setExpandedStep(isExpanded ? null : step.id)} className="btn-icon" style={{ width: '36px', height: '36px' }}>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <div className={`toggle ${step.ativo ? 'active' : ''}`} onClick={() => toggleStep(step.id)} />
                      <button onClick={() => removeStep(step.id)} className="btn-icon" style={{ width: '36px', height: '36px' }}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div>
                        <label className="text-sm block mb-1" style={{ color: 'var(--fg-muted)' }}>Nome</label>
                        <input type="text" value={step.nome} className="input-field text-sm" readOnly />
                      </div>
                      <div>
                        <label className="text-sm block mb-1" style={{ color: 'var(--fg-muted)' }}>Descricao</label>
                        <textarea value={step.descricao} rows={2} className="input-field text-sm resize-none" readOnly />
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        <div className="p-4" style={{ borderTop: '1px solid var(--border)' }}>
          {executing ? (
            <div className="space-y-2">
              {executionLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm">
                  {log.status === 'running' && <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--fg)' }} />}
                  {log.status === 'done' && <CheckCircle className="w-4 h-4" style={{ color: 'var(--green)' }} />}
                  {log.status === 'pending' && <Clock className="w-4 h-4" style={{ color: 'var(--fg-muted)' }} />}
                  <span style={{ color: log.status === 'done' ? 'var(--green)' : 'var(--fg-secondary)' }}>{log.step}</span>
                </div>
              ))}
            </div>
          ) : (
            <button onClick={executeFlow} disabled={steps.length === 0} className="btn-primary w-full text-sm disabled:opacity-50">
              <Play className="w-5 h-5" />
              Executar Fluxo
            </button>
          )}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col" style={{ background: 'var(--bg-subtle)' }}>
        <div className="p-5 flex items-center gap-4" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--fg)' }}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl" style={{ color: 'var(--fg)' }}>Assistente de Fluxo</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
              <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>IA Ativa</span>
            </div>
          </div>
          
          {/* Model Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowModelMenu(!showModelMenu)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold"
              style={{ 
                background: 'var(--bg-muted)', 
                border: '1px solid rgba(249, 115, 22, 0.2)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--fg)' }} />
              <span style={{ color: 'var(--fg)' }}>
                {selectedModel.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--fg)' }} />
            </button>
            
            {showModelMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden z-50" style={{ 
                background: 'var(--bg-muted)', 
                border: '1px solid var(--border)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.5)'
              }}>
                <div className="p-2 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between px-3 py-1.5 mb-1">
                    <p className="text-xs font-semibold" style={{ color: 'var(--green)' }}>Free</p>
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: 'rgba(52, 211, 153, 0.1)', color: 'var(--green)' }}>R$0</span>
                  </div>
                  {freeModels.map(model => (
                    <button
                      key={model.id}
                      onClick={() => { setSelectedModel(model.id); setShowModelMenu(false) }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                      style={{ 
                        background: selectedModel === model.id ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                        color: selectedModel === model.id ? 'var(--green)' : 'var(--fg)'
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{model.name}</p>
                        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{model.desc}</p>
                      </div>
                    </button>
                  ))}
                  
                  <div className="my-2 border-t" style={{ borderColor: 'var(--border)' }} />
                  
                  <div className="flex items-center justify-between px-3 py-1.5 mb-1">
                    <p className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>Premium</p>
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: 'var(--bg-muted)', color: 'var(--fg)' }}>R$49/mes</span>
                  </div>
                  {premiumModels.map(model => {
                    const isLocked = currentPlan === 'free' && model.premium
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          if (isLocked) { setShowUpgradeModal(true); setShowModelMenu(false); return }
                          setSelectedModel(model.id); setShowModelMenu(false)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                        style={{ 
                          background: selectedModel === model.id ? 'var(--bg-muted)' : 'transparent',
                          color: selectedModel === model.id ? 'var(--fg)' : isLocked ? 'var(--fg-muted)' : 'var(--fg)',
                          opacity: isLocked ? 0.5 : 1
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{model.name}</p>
                          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{model.desc}</p>
                        </div>
                        {isLocked && <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--fg)' }} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {apiError && (
            <div 
              className="flex items-center gap-3 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', color: 'var(--red)' }}
              role="alert"
            >
              <span>Erro: {apiError}</span>
              <button onClick={() => setApiError(null)} className="ml-auto p-1 rounded hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {messages.length === 1 && !isTyping && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--bg-muted)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
                <Bot className="w-8 h-8" style={{ color: 'var(--fg)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Como posso ajudar?</h3>
              <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>
                Descreva o fluxo de automacao que voce quer criar. Posso fazer busca de leads, 
                scraping, analise com IA, criacao de sites e muito mais.
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.tipo === 'ai' && (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
              )}
              {message.tipo === 'system' && (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52, 211, 153, 0.1)' }}>
                  <Zap className="w-4.5 h-4.5" style={{ color: 'var(--green)' }} />
                </div>
              )}
              
              <div className="max-w-[75%] rounded-2xl px-4 py-3" style={{ 
                background: message.tipo === 'user' ? '#1c1917' : message.tipo === 'system' ? '#f0fdf4' : 'var(--bg-muted)',
                color: message.tipo === 'user' ? 'white' : 'var(--fg)',
                border: message.tipo === 'user' ? 'none' : message.tipo === 'system' ? '1px solid #bbf7d0' : '1px solid var(--border)',
              }}>
                <p className="text-base whitespace-pre-line leading-relaxed">{message.conteudo}</p>
                {message.images && message.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.images.map((img, i) => (
                      <img key={i} src={`data:${img.mime};base64,${img.data}`} alt={img.name} className="max-w-[200px] max-h-[200px] rounded-lg object-cover border" style={{ borderColor: 'var(--border)' }} />
                    ))}
                  </div>
                )}
                {message.files && message.files.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {message.files.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
                        <File className="w-3 h-3" />{f}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs mt-2 opacity-40">
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.tipo === 'user' && (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
                  <User className="w-4.5 h-4.5" style={{ color: 'var(--fg-muted)' }} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#f97316', animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#ef4444', animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#ec4899', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {attachedFiles.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border)' }}>
            {attachedFiles.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-muted)', color: 'var(--fg)' }}>
                <img src={`data:${f.mime};base64,${f.data}`} className="w-5 h-5 rounded object-cover" />
                {f.name}
                <button onClick={() => removeFile(f.name)} className="ml-0.5 hover:opacity-70"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        )}

        <div className="p-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowSkills(true)} 
              className="btn-icon"
              style={{ color: 'var(--fg)', border: '1px solid rgba(249, 115, 22, 0.2)', background: 'var(--bg-muted)' }}
              aria-label="Abrir seletor de skills"
            >
              <Puzzle className="w-5 h-5" />
            </button>
            <button 
              onClick={handleFileAttach} 
              className="btn-icon"
              aria-label="Anexar arquivo"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setInputValue('/img ')}
              className="btn-icon"
              style={{ color: '#8b5cf6' }}
              aria-label="Gerar imagem com IA"
              title="Gerar imagem (digite o prompt depois de /img)"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={async () => {
                if (!inputValue.trim()) return
                setIsTyping(true)
                try {
                  const audio = await textToSpeech(inputValue)
                  audio.play()
                } catch (err) {
                  setApiError(err instanceof Error ? err.message : 'Erro ao gerar audio')
                } finally {
                  setIsTyping(false)
                }
              }}
              className="btn-icon"
              style={{ color: '#06b6d4' }}
              aria-label="Converter texto em fala"
              title="Converter texto em fala"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder={steps.length === 0 ? "Descreva o fluxo que quer criar..." : "Mande um prompt para executar..."}
              className="input-field flex-1"
              aria-label="Mensagem para o assistente"
              maxLength={2000}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping} 
              className="btn-primary px-5 disabled:opacity-50"
              aria-label={isTyping ? "Enviando..." : "Enviar mensagem"}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              {steps.length === 0 ? (
                <>
                  <button onClick={() => setInputValue('Busque empresas no Google Maps, faca scraping, crie proposta e envie por email')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-inset)]" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                    Fluxo completo
                  </button>
                  <button onClick={() => setInputValue('Pesquise leads, analise com IA, crie site melhorado e publique')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-inset)]" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                    Criar sites
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setInputValue('20 empresas com site feio em Sao Paulo')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-inset)]" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                    20 empresas SP
                  </button>
                  <button onClick={() => setInputValue('10 clinicas 5 estrelas sem site no RJ')} className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-[var(--bg-inset)]" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                    10 clinicas RJ
                  </button>
                </>
              )}
            </div>
            <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              {inputValue.length}/2000
            </span>
          </div>
        </div>
      </div>

      {showSkills && (
        <SkillsSelector 
          onSelect={(skill) => setInputValue(`Use a skill ${skill.nome}: ${skill.descricao}`)} 
          onClose={() => setShowSkills(false)} 
        />
      )}

      {showSiteBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200 rounded-t-2xl">
              <span className="text-sm font-semibold text-gray-900">Construtor de Site - Fable 5 Premium (R$ 49)</span>
              <button 
                onClick={() => setShowSiteBuilder(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <SiteBuilder
              objective={inputValue || 'Criar site profissional'}
              onSiteGenerated={(project) => setGeneratedProject(project)}
            />
          </div>
        </div>
      )}

      {generatedProject && !showSiteBuilder && (
        <div className="fixed bottom-6 right-6 z-40 flex gap-2">
          <button
            onClick={() => {
              const data = { gerado: JSON.stringify(generatedProject) }
              const params = new URLSearchParams()
              if (scrapedData) params.set('original', encodeURIComponent(JSON.stringify(scrapedData)))
              params.set('gerado', encodeURIComponent(JSON.stringify(generatedProject)))
              window.open(`/comparacao?${params.toString()}`, '_blank')
            }}
            className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-medium shadow-lg hover:bg-green-700 transition"
          >
            <Eye className="w-4 h-4" />
            Ver Proposta (Comparação)
          </button>
          {generatedProject && (
            <button
              onClick={() => setShowSiteBuilder(true)}
              className="flex items-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-xl font-medium shadow-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <Code className="w-4 h-4" />
              Ver Código
            </button>
          )}
        </div>
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-md p-8 text-center" style={{ boxShadow: '0 0 50px var(--bg-muted)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--bg-muted)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <Crown className="w-8 h-8" style={{ color: 'var(--fg)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Upgrade para Premium</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
              Os modelos de IA avancados como Kimi K3, MiniMax e outros estao disponiveis no plano Premium.
            </p>
            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--fg)' }}>R$ 49<span className="text-sm font-normal" style={{ color: 'var(--fg-muted)' }}>/mes</span></p>
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Acesso ilimitado a todos os modelos</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowUpgradeModal(false)} className="btn-secondary flex-1 text-sm">
                Agora nao
              </button>
              <a href="#pricing" onClick={() => setShowUpgradeModal(false)} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                <Crown className="w-4 h-4" />
                Ver Planos
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HITL Approval Modal */}
      {hitlPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="card w-full max-w-lg" style={{ 
            boxShadow: '0 0 50px rgba(244, 63, 94, 0.15)',
            border: '1.5px solid var(--red)'
          }}>
            <div className="p-5" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244, 63, 94, 0.1)' }}>
                  <AlertTriangle className="w-6 h-6" style={{ color: 'var(--red)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>
                    Aprovacao Necessaria (HITL)
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--red)' }}>
                    Acao potencialmente perigosa detectada
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--fg-muted)' }}>Etapa</p>
                <p className="text-base font-bold" style={{ color: 'var(--fg)' }}>{hitlPending.step.nome}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--fg-muted)' }}>Descricao</p>
                <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{hitlPending.step.descricao}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--fg-muted)' }}>Tipo de risco</p>
                <p className="text-base font-bold" style={{ color: 'var(--red)' }}>{hitlPending.actionType.replace('_', ' ').toUpperCase()}</p>
              </div>
            </div>
            <div className="p-5 flex gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button 
                onClick={() => handleHITLDecision(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--red)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
              >
                <X className="w-4 h-4" />
                Rejeitar
              </button>
              <button 
                onClick={() => handleHITLDecision(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'var(--green)', color: 'white' }}
              >
                <CheckCircle className="w-4 h-4" />
                Aprovar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HITL Log Modal */}
      {showHitlLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" style={{ color: 'var(--fg)' }} />
                <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Historico de Aprovacoes</h3>
              </div>
              <button onClick={() => setShowHitlLog(false)} className="text-sm" style={{ color: 'var(--fg-muted)' }}>Fechar</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {hitlLog.length === 0 ? (
                <p className="text-center text-sm py-10" style={{ color: 'var(--fg-muted)' }}>Nenhuma aprovacao registrada</p>
              ) : (
                hitlLog.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: entry.status === 'approved' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(244, 63, 94, 0.1)' }}>
                      {entry.status === 'approved' ? <CheckCircle className="w-5 h-5" style={{ color: 'var(--green)' }} /> : <X className="w-5 h-5" style={{ color: 'var(--red)' }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>{entry.step}</p>
                      <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{entry.actionType.replace('_', ' ')} - {entry.timestamp.toLocaleTimeString('pt-BR')}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-lg" style={{
                      background: entry.status === 'approved' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      color: entry.status === 'approved' ? 'var(--green)' : 'var(--red)'
                    }}>
                      {entry.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Tree Panel */}
      {accessTree && (
        <div className="fixed bottom-4 left-4 z-40 w-[480px] max-h-80 rounded-xl overflow-hidden" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' }}>
          <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" style={{ color: 'var(--blue)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Accessibility Tree</span>
            </div>
            <button onClick={() => setAccessTree(null)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <pre className="p-4 text-sm font-mono overflow-y-auto max-h-60" style={{ color: 'var(--fg-secondary)' }}>
            {accessTree}
          </pre>
        </div>
      )}
    </div>
  )
}
