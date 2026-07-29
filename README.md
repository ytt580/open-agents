# Open-Agents - Automação com IA

Plataforma completa de automação com IA para prospecção de leads.

## Deploy no Render

### Passo 1: Push para GitHub

```bash
cd C:\Users\jhon\Downloads\projeto\open-agents
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/open-agents.git
git push -u origin main
```

### Passo 2: Criar conta no Render

1. Acesse [render.com](https://render.com)
2. Crie conta com GitHub

### Passo 3: Criar Web Service

1. Clique em **New +** → **Web Service**
2. Conecte seu repositório GitHub
3. Configure:
   - **Name:** open-agents
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Plan:** Free

### Passo 4: Criar Background Worker (Scheduler)

1. Clique em **New +** → **Background Worker**
2. Conecte o mesmo repositório
3. Configure:
   - **Name:** open-agents-scheduler
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm run scheduler`
   - **Plan:** Free

### Passo 5: Variáveis de Ambiente

No **Web Service**, adicione:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Arquitetura no Render

```
┌─────────────────────────────────────────────────┐
│                  RENDER                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────┐    ┌─────────────────────┐ │
│  │   Web Service   │    │  Background Worker  │ │
│  │   (Frontend)    │    │    (Scheduler)      │ │
│  │                 │    │                     │ │
│  │  Next.js App    │    │  Verifica cron a    │ │
│  │  Porta: 3000    │    │  cada minuto        │ │
│  │                 │    │                     │ │
│  │  Rotas:         │    │  Executa fluxos:    │ │
│  │  - /            │    │  - Prospecção       │ │
│  │  - /flows       │    │  - Scraping         │ │
│  │  - /browser     │    │  - Criação sites    │ │
│  │  - /skills      │    │  - Envio propostas  │ │
│  │  - /scheduler   │    │                     │ │
│  │  - /api         │    │                     │ │
│  └─────────────────┘    └─────────────────────┘ │
│                                                 │
│  Ambos compartilham dados via API interna        │
└─────────────────────────────────────────────────┘
```

## Como Funciona 24/7

1. **Web Service** roda o frontend Next.js sempre acessível
2. **Background Worker** roda o scheduler que:
   - Lê agendamentos do banco de dados
   - Verifica a cada minuto se é hora de executar
   - Executa os fluxos automaticamente
   - Atualiza status e logs

## Limitações do Plano Free

| Recurso | Limite |
|---------|--------|
| Web Service | 750 horas/mês |
| Background Worker | 750 horas/mês |
| Sleep após inatividade | 15 minutos |
| Bandwidth | 100 GB/mês |

> **Dica:** Para não dormir, use um ping externo a cada 14 minutos em `https://seu-app.onrender.com/api/health`

## Verificar Status

```bash
# Health check
curl https://seu-app.onrender.com/api/health

# Resposta esperada:
# {"status":"ok","timestamp":"...","service":"Open-Agents","version":"1.0.0"}
```

## Comandos Úteis

```bash
# Rodar localmente
npm run dev

# Build para produção
npm run build

# Rodar scheduler localmente
npm run scheduler
```

## Estrutura

```
open-agents/
├── app/
│   ├── api/health/route.ts   # Health check
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout
│   └── globals.css           # Estilos
├── components/
│   ├── Sidebar.tsx           # Menu lateral
│   ├── Dashboard.tsx         # Dashboard
│   ├── FlowEditor.tsx        # Editor de fluxos + Chat IA
│   ├── BrowserView.tsx       # Navegador
│   ├── SkillsManager.tsx     # Gerenciar skills
│   ├── ApiManager.tsx        # Gerenciar APIs
│   └── Scheduler.tsx         # Agendador 24/7
├── scheduler.js              # Worker do Render
├── render.yaml               # Config do Render
└── package.json              # Dependências
```