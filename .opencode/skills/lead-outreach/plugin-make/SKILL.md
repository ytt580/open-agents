# Skill: lead-automation-playwright

Automação standalone de prospecção de leads usando **Playwright + APIs diretas** — sem depender de Make.com, n8n ou qualquer intermediário.

## Fluxo

```
google-maps.js  →  scraper.js  →  redesign.js  →  vercel.js  →  email.js
(Playwright)       (Playwright)    (OpenAI API)    (API Vercel)   (Nodemailer)
```

## Como usar

```bash
cd "C:\Users\jhon\Downloads\projeto monarchy agents\lead-automation"

# 1. Configurar .env com suas chaves
cp .env.example .env
# Editar .env com suas credenciais:
#   OPENAI_API_KEY, VERCEL_TOKEN, GMAIL_USER, GMAIL_PASS

# 2. Executar automação principal
npm start
```

## Arquivos

| Arquivo | Função |
|---------|--------|
| `index.js` | Orquestrador principal (passo 1 a 5) |
| `google-maps.js` | Abre Google Maps via Playwright, extrai leads (nome, tel, site, nota) |
| `scraper.js` | Visita cada site, extrai HTML + email de contato |
| `redesign.js` | Chama OpenAI GPT-4o-mini para recriar o site com design premium |
| `vercel.js` | Faz deploy do HTML na Vercel via API REST |
| `email.js` | Envia proposta por email via Nodemailer (Gmail SMTP) |
| `monitor.js` | Monitora respostas (esqueleto, requer Gmail API OAuth) |
| `leads.json` | Histórico de leads processados |
| `.env` | Chaves: OpenAI, Vercel, Gmail |

## Nicho

Editar `NICHO` no `.env` para mudar a busca:
```
NICHO=restaurantes com site em São Paulo
NICHO=academias nota 5 em São Paulo
NICHO=clínicas com site em São Paulo
```

## Credenciais necessárias

| Serviço | Onde pegar |
|---------|-----------|
| OpenAI API Key | https://platform.openai.com/api-keys |
| Vercel Token | https://vercel.com/account/tokens |
| Gmail App Password | https://myaccount.google.com/apppasswords |
