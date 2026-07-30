import { NextRequest, NextResponse } from 'next/server'

const BLUEMINDS_API = 'https://api.bluesminds.com/v1'
const BLUEMINDS_KEY = process.env.BLUEMINDS_API_KEY || 'sk-kHPpzsSnsB3qFGzLHc5faG2KDkOfXY16U7rTnzNDvIMiuc1l'

const GITHUB_API = 'https://models.inference.ai.azure.com'
const GITHUB_KEY = process.env.GITHUB_PAT || ''

const BLUESMINDS_MODELS = [
  'moonshotai/kimi-k2.6',
  'minimaxai/minimax-m2.7',
  'meta/llama2-70b',
  'google/gemma-3-12b-it',
  'mistralai/mistral-7b-instruct',
]

const GITHUB_MODELS = [
  'gpt-5',
  'gpt-4o',
  'gpt-4o-mini',
  'o3-mini',
]

function isGitHubModel(model: string): boolean {
  return GITHUB_MODELS.includes(model)
}

async function callBluesminds(messages: any[], model: string, signal: AbortSignal): Promise<string> {
  const response = await fetch(`${BLUEMINDS_API}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BLUEMINDS_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Bluesminds ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

async function callGitHub(messages: any[], model: string, signal: AbortSignal): Promise<string> {
  if (!GITHUB_KEY) {
    throw new Error('GitHub PAT not configured')
  }

  const response = await fetch(`${GITHUB_API}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
    signal,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`GitHub ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      )
    }

    const sanitizedMessages = [
      {
        role: 'system',
        content: `Voce e a assistente de automacao da Open-Agents. Seu trabalho e:
1. Ajudar o usuario a criar fluxos de automacao descrevendo etapas
2. Responder sobre automacao, prospeccao, scraping, criacao de sites
3. Executar fluxos quando o usuario mandar um prompt

Quando o usuario descrever um fluxo, responda com as etapas formatadas:
- Nome da etapa
- Descricao breve
- Tipo (busca, scraping, analise, criacao, envio, publicacao)

Seja objetiva e profissional. Responda em portugues.`
      },
      ...messages.slice(-20).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: String(msg.content || '').slice(0, 4000),
      }))
    ]

    const selectedModel = model || 'moonshotai/kimi-k2.6'
    const useGitHub = isGitHubModel(selectedModel)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)

    try {
      let content: string

      if (useGitHub) {
        content = await callGitHub(sanitizedMessages, selectedModel, controller.signal)
      } else {
        content = await callBluesminds(sanitizedMessages, selectedModel, controller.signal)
      }

      clearTimeout(timeoutId)

      if (!content) {
        return NextResponse.json(
          { error: 'Empty response from AI' },
          { status: 502 }
        )
      }

      return NextResponse.json({ content })
    } catch (apiError) {
      clearTimeout(timeoutId)
      throw apiError
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - AI took too long to respond' },
        { status: 504 }
      )
    }
    console.error('Chat API error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
