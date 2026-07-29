import { NextRequest, NextResponse } from 'next/server'

const BLUEMINDS_API = 'https://api.bluesminds.com/v1'
const BLUEMINDS_KEY = process.env.BLUEMINDS_API_KEY || 'sk-kHPpzsSnsB3qFGzLHc5faG2KDkOfXY16U7rTnzNDvIMiuc1l'

export async function POST(request: NextRequest) {
  try {
    const { messages, model } = await request.json()

    const response = await fetch(`${BLUEMINDS_API}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BLUEMINDS_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'moonshotai/kimi-k2.6',
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
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error }, { status: response.status })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || 'Erro ao obter resposta'

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao conectar com IA' }, { status: 500 })
  }
}
