/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatOptions {
  model?: string
  stream?: boolean
  temperature?: number
  max_tokens?: number
}

export interface ChatResponse {
  content: string
  model?: string
}

export interface ImageGenOptions {
  model?: string
  quality?: 'low' | 'medium' | 'high'
  provider?: string
}

export interface SpeechOptions {
  provider?: string
  voice?: string
  engine?: string
  language?: string
  model?: string
}

declare const puter: any

function ensurePuter(): void {
  if (typeof window === 'undefined') throw new Error('Puter.js only works in browser')
  if (!(window as any).puter) throw new Error('Puter.js not loaded. Add <script src="https://js.puter.com/v2/"></script> to your HTML.')
}

const VISION_MODELS = new Set([
  'gpt-4o', 'gpt-4o-mini', 'gpt-5-nano', 'gpt-5.2', 'gpt-5.2-pro',
  'claude-sonnet-4-6', 'claude-opus-4-8',
  'gemini-2.5-flash', 'gemini-3-flash', 'gemini-3-pro', 'gemini-3.1-pro',
  'nvidia/nemotron-3-nano-omni',
  'z-ai/glm-5v-turbo',
])

export function modelSupportsVision(modelId: string): boolean {
  const base = modelId.includes('/') ? modelId.split('/').pop()! : modelId
  return VISION_MODELS.has(base) || VISION_MODELS.has(modelId)
}

export function getVisionFallback(modelId: string): string {
  if (modelSupportsVision(modelId)) return modelId
  return 'gpt-4o'
}

// ─── AI CHAT ──────────────────────────────────────────

export async function chatAI(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<ChatResponse> {
  ensurePuter()

  const systemMsg: ChatMessage = {
    role: 'system',
    content: `Voce e a assistente de automacao da Open-Agents. Seu trabalho e:
1. Ajudar o usuario a criar fluxos de automacao descrevendo etapas
2. Responder sobre automacao, prospeccao, scraping, criacao de sites
3. Executar fluxos quando o usuario mandar um prompt
4. Editar arquivos no computador do usuario quando solicitado

EDICAO DE ARQUIVOS:
Quando o usuario pedir para criar ou editar um arquivo, responda com um JSON especial:
{"action": "file", "type": "read|write|list", "path": "caminho/do/arquivo", "content": "conteudo"}

Quando o usuario descrever um fluxo, responda com as etapas formatadas:
- Nome da etapa
- Descricao breve
- Tipo (busca, scraping, analise, criacao, envio, publicacao)

Seja objetiva e profissional. Responda em portugues.`
  }

  const formattedMessages = [
    systemMsg,
    ...messages.slice(-20).map(m => ({
      role: m.role,
      content: String(m.content || '').slice(0, 4000)
    }))
  ]

  const model = options.model || 'gpt-4o-mini'

  try {
    const response = await puter.ai.chat(formattedMessages, {
      model,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 4000,
    })

    const content = response?.message?.content || response?.message || String(response) || ''

    return { content, model }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido na IA'
    throw new Error(`Erro Puter AI: ${msg}`)
  }
}

// ─── STREAMING CHAT ───────────────────────────────────

export async function chatAIStream(
  messages: ChatMessage[],
  options: ChatOptions = {},
  onChunk: (text: string) => void
): Promise<string> {
  ensurePuter()

  const systemMsg: ChatMessage = {
    role: 'system',
    content: `Voce e a assistente de automacao da Open-Agents. Seja objetiva e profissional. Responda em portugues.`
  }

  const formattedMessages = [
    systemMsg,
    ...messages.slice(-20).map(m => ({
      role: m.role,
      content: String(m.content || '').slice(0, 4000)
    }))
  ]

  const model = options.model || 'gpt-4o-mini'

  try {
    const response = await puter.ai.chat(formattedMessages, {
      model,
      stream: true,
      temperature: options.temperature ?? 0.7,
    })

    let fullText = ''
    for await (const part of response) {
      if (part?.text) {
        fullText += part.text
        onChunk(fullText)
      }
    }
    return fullText
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido na IA'
    throw new Error(`Erro Puter AI: ${msg}`)
  }
}

// ─── SIMPLE PROMPT ────────────────────────────────────

export async function chatSimple(
  prompt: string,
  model: string = 'gpt-4o-mini'
): Promise<string> {
  ensurePuter()

  try {
    const response = await puter.ai.chat(prompt, { model })
    return response?.message?.content || String(response) || ''
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro desconhecido'
    throw new Error(`Erro Puter AI: ${msg}`)
  }
}

// ─── IMAGE GENERATION ─────────────────────────────────

export async function generateImage(
  prompt: string,
  options: ImageGenOptions = {}
): Promise<string> {
  ensurePuter()

  try {
    const image = await puter.ai.txt2img(prompt, {
      model: options.model || 'gpt-image-1-mini',
      quality: options.quality || 'low',
    })

    if (image instanceof HTMLImageElement) {
      return image.src
    }
    return String(image)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao gerar imagem'
    throw new Error(`Erro txt2img: ${msg}`)
  }
}

// ─── IMAGE TO TEXT (OCR) ──────────────────────────────

export async function imageToText(imageSource: string | File): Promise<string> {
  ensurePuter()

  try {
    const result = await puter.ai.img2txt(imageSource)
    return String(result) || ''
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao extrair texto'
    throw new Error(`Erro img2txt: ${msg}`)
  }
}

// ─── TEXT TO SPEECH ───────────────────────────────────

export async function textToSpeech(
  text: string,
  options: SpeechOptions = {}
): Promise<HTMLAudioElement> {
  ensurePuter()

  try {
    const audio = await puter.ai.txt2speech(text, {
      provider: options.provider || 'openai',
      voice: options.voice || 'alloy',
      language: options.language || 'pt-BR',
      model: options.model || 'gpt-4o-mini-tts',
    })
    return audio
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Erro ao gerar audio'
    throw new Error(`Erro txt2speech: ${msg}`)
  }
}

// ─── AUTH ─────────────────────────────────────────────

export async function signIn(): Promise<void> {
  ensurePuter()
  await puter.auth.signIn()
}

export async function signOut(): Promise<void> {
  ensurePuter()
  await puter.auth.signOut()
}

export async function isSignedIn(): Promise<boolean> {
  ensurePuter()
  return await puter.auth.isSignedIn()
}

export async function getUser(): Promise<any> {
  ensurePuter()
  try {
    return await puter.auth.getUser()
  } catch {
    return null
  }
}
