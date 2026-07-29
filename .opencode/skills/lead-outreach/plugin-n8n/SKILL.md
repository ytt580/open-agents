# Skill: plugin-n8n-leads

Plugin n8n que automatiza a prospecção de leads: busca negócios no Google Maps, refaz o site com IA, publica, envia proposta e gerencia o pipeline de vendas.

---

## O que este plugin faz

1. **Varre o Google Maps** atrás de negócios bem avaliados (4.8-5.0) com site fraco/desatualizado
2. **Faz scraping do site** original e extrai todas as informações
3. **Redesenha o site com IA** mantendo dados originais (nome, telefone, endereço, serviços)
4. **Publica o novo site** na Vercel/Netlify
5. **Envia proposta** por e-mail para o lead
6. **Monitora respostas** no Gmail automaticamente
7. **Atualiza painel de vendas** com status de cada lead
8. **Notifica no WhatsApp** quando lead responde
9. **Gera contrato em Word** quando fecha negócio

---

## Instalação

### 1. Instalar n8n no Windows

```powershell
# Instalar n8n globalmente
npm install -g n8n

# Ou via Docker
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

### 2. Iniciar n8n

```powershell
n8n start
```

Acessar: http://localhost:5678

### 3. Importar o Plugin (Workflow)

1. Abra o n8n em http://localhost:5678
2. Clique em **Workflows** → **Import from File**
3. Selecione `monarchy-leads-workflow.json`
4. Clique em **Save**

### 4. Configurar Credenciais

| Serviço | Onde configurar | Como obter |
|---------|----------------|------------|
| Google Maps API | Credenciais → Google | console.cloud.google.com |
| OpenAI | Credenciais → OpenAI | platform.openai.com |
| Gmail | Credenciais → Google OAuth | console.cloud.google.com |
| PostgreSQL | Credenciais → PostgreSQL | Instalar PostgreSQL local |
| Vercel | Credenciais → Vercel | vercel.com |
| WhatsApp Bot | HTTP Request | Rodar bot local (lead-outreach) |

### 5. Variáveis de Ambiente

Crie um arquivo `.env` na pasta do n8n:

```env
# APIs
GOOGLE_MAPS_API_KEY=sua_chave_aqui
OPENAI_API_KEY=sua_chave_aqui

# Email
EMAIL_FROM=seu@email.com

# Vercel
VERCEL_TOKEN=seu_token
VERCEL_PROJECT_ID=seu_projeto

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=leads_monarchy
DB_USER=postgres
DB_PASSWORD=sua_senha

# WhatsApp
MONARCHY_PHONE=554784743492
WHATSAPP_API_URL=http://localhost:3001

# Monarchy
MONARCHY_NAME=Monarchy
MONARCHY_PIX=COLOQUE_SEU_PIX_AQUI
MONARCHY_VALOR=497
```

---

## Banco de Dados

### Criar Tabela de Leads

```sql
CREATE DATABASE leads_monarchy;

CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(50),
  email VARCHAR(255),
  nota DECIMAL(2,1),
  site_original TEXT,
  site_novo TEXT,
  status VARCHAR(50) DEFAULT 'novo',
  valor DECIMAL(10,2),
  resposta TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contratos (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  contrato_path TEXT,
  status VARCHAR(50) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Painel de Vendas

O plugin gera um dashboard HTML com:

| Métrica | Descrição |
|---------|-----------|
| Total de Leads | Quantos leads encontrados |
| Propostas Enviadas | Quantos e-mails enviados |
| Clientes Responderam | Quantos abriram/responderam |
| Fechados | Quantos fecharam contrato |
| Faturamento | Soma dos valores fechados |

---

## Fluxo Completo

```
INÍCIO (manual ou agendado)
    │
    ├─ Configurar busca (query, nicho, local)
    │
    ├─ Buscar no Google Maps
    │   └─ Filtro: nota >= 4.8, site desatualizado
    │
    ├─ Para cada lead:
    │   ├─ Scraping do site original
    │   ├─ IA redesenha o site (GPT-4o / Gemini)
    │   ├─ Publica na Vercel
    │   ├─ Salva no banco de dados
    │   └─ Envia e-mail de proposta
    │
    ├─ Monitorar Gmail (a cada 5 min)
    │   └─ Lead respondeu?
    │       ├─ SIM: Atualiza status + Notifica WhatsApp
    │       └─ NÃO: Follow-up automático (24h)
    │
    └─ Lead fechou?
        ├─ SIM: Gera contrato Word + Envia PIX
        └─ NÃO: Continua follow-up
```

---

## Dicas do Vídeo

### Perfil Ideal de Lead
- **Nota:** 4.8 a 5.0 no Google
- **Site:** Desatualizado, lento, template genérico
- **Poucas avaliações:** Menos de 50 avaliações
- **Segmentos quentes:** Clínicas, consultórios, academias, restaurantes, oficinas

### Abordagem que Funciona
> "Não venda a ideia de ter um site. Entregue a versão nova do site dele PRONTA e pergunte: 'E aí, gostou?'"

### Seis Comandos (do vídeo 2)
1. Configurar busca (query + nicho)
2. Rodar fluxo de busca
3. Revisar leads encontrados
4. Gerar sites com IA
5. Revisar sites gerados
6. Enviar propostas

---

## Exemplo de Proposta por Email

```
Assunto: Monarchy - Nova versão do site [NOME_DO_NEGÓCIO]

Olá [NOME],

Vi que vocês são muito bem avaliados no Google ([NOTA] ⭐) 
e criei uma versão moderna e profissional do site de vocês.

🔗 Confira: [LINK_DO_NOVO_SITE]

O que inclui:
✅ Design moderno e responsivo
✅ WhatsApp integrado
✅ Carregamento rápido
✅ SEO otimizado

Quer que eu publique oficialmente? O investimento é de R$ [VALOR].

Qualquer dúvida, estou à disposição!

Atenciosamente,
Monarchy Agência Digital
```

---

## Manutenção

```powershell
# Parar n8n
npx n8n stop

# Atualizar n8n
npm update -g n8n

# Ver logs
npx n8n start --logs

# Backup do banco
pg_dump -U postgres leads_monarchy > backup_$(Get-Date -Format yyyyMMdd).sql
```
