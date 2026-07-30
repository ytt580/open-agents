import { NextRequest, NextResponse } from 'next/server'

const BLUEMINDS_API = 'https://api.bluesminds.com/v1'
const BLUEMINDS_KEY = process.env.BLUEMINDS_API_KEY || 'sk-kHPpzsSnsB3qFGzLHc5faG2KDkOfXY16U7rTnzNDvIMiuc1l'

const VALID_MODELS = [
  'moonshotai/kimi-k2.6',
  'minimaxai/minimax-m2.7',
  'meta/llama2-70b',
  'google/gemma-3-12b-it',
  'mistralai/mistral-7b-instruct',
]

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

    const sanitizedMessages = messages.slice(-20).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: String(msg.content || '').slice(0, 4000),
    }))

    const selectedModel = VALID_MODELS.includes(model) ? model : 'moonshotai/kimi-k2.6'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(`${BLUEMINDS_API}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BLUEMINDS_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
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
          ...sanitizedMessages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error('Bluesminds API error:', response.status, errorText)
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status >= 500 ? 502 : response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'Empty response from AI' },
        { status: 502 }
      )
    }

    return NextResponse.json({ content })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - AI took too long to respond' },
        { status: 504 }
      )
    }
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
