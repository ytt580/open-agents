---
name: lead-outreach
description: Automação completa de geração de leads: busca no Google Maps via Playwright, scraping de sites, criação de sites melhorados, envio via WhatsApp/Instagram, negociação e fechamento de negócio.
license: MIT
metadata:
  author: jhon
  version: 1.0
---

# Lead Outreach Automação

Sistema completo de geração de leads e outreach automatizado. Encontra negócios com sites ruins, cria sites melhorados, envia propostas via WhatsApp/Instagram e fecha negócios.

---

## Quando Usar

- Encontrar negócios com sites ruins no Google Maps
- Scraping de dados de sites de empresas
- Criar sites melhorados para leads qualificados
- Enviar propostas via WhatsApp/Instagram
- Negociar e fechar negócios automaticamente
- Publicar sites e enviar URL para o cliente

---

## Workflow Completo

```
PASSO 1: Buscar leads no Google Maps (Playwright MCP)
    ↓
PASSO 2: Scraping do site do negócio
    ↓
PASSO 3: Criar site melhorado (frontend-design + shadcn)
    ↓
    ↓
PASSO 4: Enviar proposta via WhatsApp/Instagram
    ↓
PASSO 5: Negociar (se responder)
    ↓
PASSO 6: Fechar negócio + enviar PIX
    ↓
PASSO 7: Publicar site + enviar URL
    ↓
PASSO 8: Próximo lead
```

---

## PASSO 1: Buscar Leads no Google Maps

### Configuração do Playwright MCP

```json
// ~/.config/opencode/opencode.jsonc
{
  "mcp": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-playwright@latest"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "C:\\Users\\jhon\\AppData\\Local\\ms-playwright",
        "DISPLAY": ":99"
      }
    }
  }
}
```

### Scripts de Busca

```python
# scripts/buscar_leads.py
import asyncio
from playwright.async_api import async_playwright

async def buscar_leads(criterio: str, local: str = "Brasil"):
    """
    Busca negócios no Google Maps baseado em critérios.
    
    Exemplos de critérios:
    - "lojas que tem site feito que são nota 5"
    - "restaurantes sem site"
    - "academias com site ruim"
    - "clínicas nota 5 sem presença digital"
    - "oficinas com site desatualizado"
    """
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            locale="pt-BR"
        )
        page = await context.new_page()
        
        # Buscar no Google Maps
        query = f"{criterio} em {local}"
        await page.goto(f"https://www.google.com/maps/search/{query}")
        await page.wait_for_timeout(3000)
        
        # Rolar e coletar resultados
        leads = []
        for _ in range(10):  # Rolar 10 vezes
            await page.mouse.wheel(0, 500)
            await page.wait_for_timeout(1500)
            
            # Extrair cards de resultados
            cards = await page.query_selector_all('[class*="Nv2PK"]')
            for card in cards:
                try:
                    nome = await card.query_selector('[class*="qBF1Pd"]')
                    nota = await card.query_selector('[class*="MW4etd"]')
                    tipo = await card.query_selector('[class*="W4Efsd"]')
                    
                    if nome and nota:
                        lead = {
                            "nome": await nome.inner_text(),
                            "nota": await nota.inner_text(),
                            "tipo": await tipo.inner_text() if tipo else "",
                            "url_maps": await card.get_attribute("href") or ""
                        }
                        leads.append(lead)
                except:
                    continue
        
        await browser.close()
        return leads


# Exemplo de uso
leads = asyncio.run(buscar_leads(
    criterio="lojas que tem site feio que são nota 5",
    local="São Paulo"
))
```

### Script de Validação de Lead

```python
# scripts/validar_lead.py
def validar_lead(lead: dict) -> bool:
    """
    Valida se o lead atende aos critérios de qualidade.
    """
    # Nota mínima
    try:
        nota = float(lead.get("nota", "0").replace(",", "."))
        if nota < 4.0:
            return False
    except:
        return False
    
    # Nome não pode ser vazio
    if not lead.get("nome"):
        return False
    
    # Tipo deve existir
    if not lead.get("tipo"):
        return False
    
    return True


def filtrar_leads(leads: list) -> list:
    """
    Filtra leads qualificados.
    """
    return [lead for lead in leads if validar_lead(lead)]
```

---

## PASSO 2: Scraping do Site

### Script de Scraping

```python
# scripts/scraping_site.py
import asyncio
from playwright.async_api import async_playwright

async def scraping_site(url: str) -> dict:
    """
    Faz scraping completo do site do lead.
    Coleta: texto, imagens, layout, tecnologias, contato.
    """
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            locale="pt-BR"
        )
        page = await context.new_page()
        
        try:
            await page.goto(url, wait_until="networkidle", timeout=30000)
        except:
            # Tentar com http:// se https:// falhar
            try:
                await page.goto(f"http://{url}", wait_until="networkidle", timeout=30000)
            except:
                return {"erro": "Site não acessível"}
        
        # Coletar dados
        dados = {
            "url": url,
            "titulo": await page.title(),
            "descricao": await page.get_attribute("meta[name='description']", "content") or "",
            "texto_principal": await page.inner_text("body"),
            "imagens": [],
            "links": [],
            "contato": {},
            "tecnologias": await detectar_tecnologias(page),
            "screenshots": await tirar_screenshot(page)
        }
        
        # Coletar imagens
        imagens = await page.query_selector_all("img")
        for img in imagens[:10]:  # Primeiras 10 imagens
            src = await img.get_attribute("src")
            alt = await img.get_attribute("alt")
            if src:
                dados["imagens"].append({"src": src, "alt": alt or ""})
        
        # Coletar links
        links = await page.query_selector_all("a[href]")
        for link in links[:20]:  # Primeiros 20 links
            href = await link.get_attribute("href")
            texto = await link.inner_text()
            if href and "mailto:" in href:
                dados["contato"]["email"] = href.replace("mailto:", "")
            elif href and "tel:" in href:
                dados["contato"]["telefone"] = href.replace("tel:", "")
            dados["links"].append({"href": href, "texto": texto})
        
        # Detectar contato no texto
        texto = dados["texto_principal"]
        import re
        emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', texto)
        telefones = re.findall(r'\(?\d{2}\)?\s*\d{4,5}-?\d{4}', texto)
        
        if emails:
            dados["contato"]["email"] = emails[0]
        if telefones:
            dados["contato"]["telefone"] = telefones[0]
        
        await browser.close()
        return dados


async def detectar_tecnologias(page) -> list:
    """Detecta tecnologias usadas no site."""
    techs = []
    
    # Verificar meta tags
    generator = await page.get_attribute("meta[name='generator']", "content")
    if generator:
        techs.append(generator)
    
    # Verificar scripts
    scripts = await page.query_selector_all("script[src]")
    for script in scripts:
        src = await script.get_attribute("src") or ""
        if "wordpress" in src:
            techs.append("WordPress")
        elif "shopify" in src:
            techs.append("Shopify")
        elif "wix" in src:
            techs.append("Wix")
        elif "squarespace" in src:
            techs.append("Squarespace")
    
    # Verificar classes CSS
    html = await page.content()
    if "wp-" in html:
        techs.append("WordPress")
    if "shopify" in html:
        techs.append("Shopify")
    
    return list(set(techs))


async def tirar_screenshot(page) -> dict:
    """Tira screenshot da página."""
    screenshot = await page.screenshot(full_page=True)
    return {"full_page": screenshot}
```

---

## PASSO 3: Criar Site Melhorado

### Workflow de Criação

```python
# scripts/criar_site.py
from datetime import datetime

def criar_site_melhorado(dados_scraping: dict, estilo: str = "moderno") -> dict:
    """
    Cria um site melhorado baseado nos dados coletados.
    Usa as skills: frontend-design, shadcn, remotion-video.
    """
    
    site = {
        "nome": dados_scraping.get("titulo", "Meu Negócio"),
        "descricao": dados_scraping.get("descricao", ""),
        "estilo": estilo,
        "cores": sugerir_cores(dados_scraping),
        "secoes": criar_secoes(dados_scraping),
        "componentes": criar_componentes(dados_scraping),
        "assets": preparar_assets(dados_scraping),
        "data_criacao": datetime.now().isoformat()
    }
    
    return site


def sugerir_cores(dados: dict) -> dict:
    """Sugere cores baseado no nicho do negócio."""
    nicho = dados.get("tipo", "").lower()
    
    cores_nicho = {
        "restaurante": {"primary": "#e74c3c", "secondary": "#f39c12", "bg": "#fff"},
        "loja": {"primary": "#3498db", "secondary": "#2ecc71", "bg": "#fff"},
        "academia": {"primary": "#e74c3c", "secondary": "#2c3e50", "bg": "#fff"},
        "clínica": {"primary": "#3498db", "secondary": "#ecf0f1", "bg": "#fff"},
        "oficina": {"primary": "#f39c12", "secondary": "#2c3e50", "bg": "#fff"},
        "salão": {"primary": "#9b59b6", "secondary": "#e91e63", "bg": "#fff"},
    }
    
    for chave, cores in cores_nicho.items():
        if chave in nicho:
            return cores
    
    return {"primary": "#3498db", "secondary": "#2c3e50", "bg": "#fff"}


def criar_secoes(dados: dict) -> list:
    """Cria seções do site baseado nos dados."""
    return [
        {"tipo": "hero", "titulo": dados.get("titulo", ""), "subtitulo": dados.get("descricao", "")},
        {"tipo": "sobre", "titulo": "Sobre Nós", "conteudo": ""},
        {"tipo": "servicos", "titulo": "Serviços", "items": []},
        {"tipo": "galeria", "titulo": "Galeria", "imagens": dados.get("imagens", [])},
        {"tipo": "contato", "titulo": "Contato", "dados": dados.get("contato", {})},
    ]


def criar_componentes(dados: dict) -> list:
    """Cria componentes React/Next.js."""
    return [
        "Header responsivo com nav",
        "Hero com CTA",
        "Cards de serviço",
        "Galeria de fotos",
        "Formulário de contato",
        "Footer com links",
        "WhatsApp flutuante",
    ]


def preparar_assets(dados: dict) -> dict:
    """Prepara assets para o site."""
    return {
        "logo": "placeholder.png",
        "imagens": dados.get("imagens", []),
        "icones": ["whatsapp", "instagram", "email", "telefone"],
    }
```

### Template do Site (Next.js + Tailwind)

```tsx
// src/app/page.tsx - Template do site melhorado
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Sobre } from '@/components/Sobre';
import { Servicos } from '@/components/Servicos';
import { Galeria } from '@/components/Galeria';
import { Contato } from '@/components/Contato';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Sobre />
      <Servicos />
      <Galeria />
      <Contato />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
```

---

## PASSO 4: Enviar Proposta via WhatsApp

### Bot WhatsApp (Recomendado)

O bot WhatsApp já está configurado na pasta `whatsapp-bot/`.

#### Como usar:

```bash
# 1. Ir para a pasta do bot
cd ~/.config/opencode/skills/lead-outreach/whatsapp-bot

# 2. Instalar dependências
npm install

# 3. Editar configuração
# Abra config.json e coloque seu PIX e dados

# 4. Iniciar o bot (Windows)
iniciar.bat

# Ou manualmente
node index.js
```

#### Configuração

Edite `config.json`:
```json
{
  "pix": "SEU_PIX_AQUI",
  "valor": "497",
  "nomeBusiness": "Seu Nome"
}
```

#### QR Code

1. Execute `node index.js`
2. Escaneie o QR Code que aparecer no terminal
3. Abra WhatsApp → Configurações → Dispositivos conectados
4. Conecte o dispositivo

#### API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/enviar-proposta` | POST | Enviar proposta para lead |
| `/api/enviar-mensagem` | POST | Enviar mensagem personalizada |
| `/api/status` | GET | Verificar status do bot |
| `/api/contatos` | GET | Listar contatos |

#### Exemplo de envio via API:

```bash
# Enviar proposta
curl -X POST http://localhost:3001/api/enviar-proposta \
  -H "Content-Type: application/json" \
  -d '{"telefone": "11999999999", "nome": "Loja XYZ", "nota": "5", "url": "https://meusite.com"}'

# Enviar mensagem personalizada
curl -X POST http://localhost:3001/api/enviar-mensagem \
  -H "Content-Type: application/json" \
  -d '{"telefone": "11999999999", "mensagem": "Olá! Tudo bem?"}'
```

#### Respostas Automáticas

O bot responde automaticamente baseado na mensagem:

| Palavra-chave | Resposta |
|---------------|----------|
| preço, valor, quanto | Envia tabela de preços |
| prazo, tempo, demora | Informa prazo de 24h |
| funciona, tem, inclui | Lista funcionalidades |
| quero, sim, bora | Envia PIX para fechar |
| não, depois, obrigado | Agradece e encerra |

### Script de Envio

```python
# scripts/enviar_proposta.py
import asyncio
from playwright.async_api import async_playwright

async def enviar_proposta_whatsapp(telefone: str, mensagem: str, site_url: str = None):
    """
    Envia proposta via WhatsApp Web.
    """
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 800}
        )
        page = await context.new_page()
        
        # Limpar telefone
        telefone = telefone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
        
        # Abrir WhatsApp Web
        await page.goto(f"https://web.whatsapp.com/send?phone=55{telefone}")
        await page.wait_for_timeout(5000)
        
        # Verificar se precisa de QR Code
        qr = await page.query_selector('[data-testid="qrcode"]')
        if qr:
            print("Escaneie o QR Code no WhatsApp Web")
            await page.wait_for_timeout(30000)  # Esperar scan
        
        # Digitar mensagem
        caixa_msg = await page.query_selector('[data-testid="conversation-compose-box-input"]')
        if caixa_msg:
            await caixa_msg.click()
            await caixa_msg.fill(mensagem)
            await page.wait_for_timeout(1000)
            
            # Enviar
            botao_enviar = await page.query_selector('[data-testid="send"]')
            if botao_enviar:
                await botao_enviar.click()
                await page.wait_for_timeout(2000)
        
        # Se tiver URL do site, enviar também
        if site_url:
            await caixa_msg.fill(f"Confira o site que criei para vocês: {site_url}")
            await page.wait_for_timeout(1000)
            await botao_enviar.click()
        
        await browser.close()
        return True


async def enviar_proposta_instagram(usuario: str, mensagem: str, site_url: str = None):
    """
    Envia proposta via Instagram DM.
    """
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 800}
        )
        page = await context.new_page()
        
        # Abrir Instagram
        await page.goto("https://www.instagram.com/")
        await page.wait_for_timeout(5000)
        
        # Verificar login
        login = await page.query_selector('[name="username"]')
        if login:
            print("Faça login no Instagram manualmente")
            await page.wait_for_timeout(60000)  # Esperar login
        
        # Ir para DM
        await page.goto(f"https://www.instagram.com/direct/t/{usuario}/")
        await page.wait_for_timeout(3000)
        
        # Digitar e enviar mensagem
        caixa_msg = await page.query_selector('[placeholder="Message..."]')
        if caixa_msg:
            await caixa_msg.click()
            await caixa_msg.fill(mensagem)
            await page.wait_for_timeout(1000)
            
            botao_enviar = await page.query_selector('button[type="submit"]')
            if botao_enviar:
                await botao_enviar.click()
                await page.wait_for_timeout(2000)
        
        if site_url:
            await caixa_msg.fill(f"Confira o site que criei para vocês: {site_url}")
            await page.wait_for_timeout(1000)
            await botao_enviar.click()
        
        await browser.close()
        return True
```

### Templates de Mensagens

```python
# scripts/templates_mensagens.py

MENSAGENS = {
    "proposta_inicial": """
Olá {nome}! 👋

Vi que vocês são muito bem avaliados no Google ({nota} ⭐), mas notei que o site de vocês poderia ser muito melhor!

Criei uma proposta de site moderno, rápido e que converte mais clientes. Dá uma olhada:

{url_site}

Se curtirem, posso explicar como funciona. Um abraço! 😊
""",
    
    "apos_resposta": """
Que bom que gostou! 🎉

O site que criei inclui:
✅ Design moderno e responsivo
✅ Velocidade otimizada (carrega em menos de 2s)
✅ WhatsApp integrado (clientes entram em contato na hora)
✅ SEO otimizado (aparece no Google)
✅ Galeria de fotos profissional

O investimento é muito acessível e eu configuro tudo para vocês!

Quer que eu publice? É rápido! 🚀
""",
    
    "fechamento": """
Perfeito! Vou publicar agora! 🚀

Para formalizar, o valor é de R$ {valor}. 

PIX: {pix}

Assim que confirmar o pagamento, publico o site e envio o link. 

Qualquer dúvida, estou aqui! 😊
""",
    
    "pos_publicacao": """
Site publicado! 🎉

Acesse: {url}

Inclui:
✅ Hospedagem por 1 ano
✅ Certificado SSL (https)
✅ Suporte técnico por 30 dias

Se precisar de alterações, é só me chamar!

Bom uso! 🚀
""",
    
    "sem_resposta": """
Olá! 😊

Enviei uma proposta de site para vocês. Vi que vocês são nota 5 no Google e merecem um site à altura!

Quer que eu mostre como ficaria? É sem compromisso!

Abraço! 🤝
""",
}
```

---

## PASSO 5: Negociar (Se Responder)

### Script de Negociação

```python
# scripts/negociar.py

def negociar(mensagem_recebida: str, contexto: dict) -> str:
    """
    Responde de forma simpática baseado na mensagem recebida.
    """
    mensagem = mensagem_recebida.lower()
    
    # Pergunta sobre preço
    if any(palavra in mensagem for palavra in ["preço", "valor", "quanto", "custa"]):
        return MENSAGENS["preco"].format(valor=contexto.get("valor", "497"))
    
    # Pergunta sobre prazo
    if any(palavra in mensagem for palavra in ["prazo", "tempo", "demora", "quando"]):
        return MENSAGENS["prazo"]
    
    # Pergunta sobre funcionalidades
    if any(palavra in mensagem for palavra in ["funciona", "tem", "inclui", "faz"]):
        return MENSAGENS["funcionalidades"]
    
    # Quer ver exemplo
    if any(palavra in mensagem for palavra in ["exemplo", "mostra", "ver", "ver como"]):
        return MENSAGENS["exemplo"].format(url=contexto.get("url_site", ""))
    
    # Interessado
    if any(palavra in mensagem for palavra in ["interessado", "quero", "sim", "bora", "vamos"]):
        return MENSAGENS["fechamento"].format(
            valor=contexto.get("valor", "497"),
            pix=contexto.get("pix", "seu-pix@email.com")
        )
    
    # Não interressado
    if any(palavra in mensagem for palavra in ["não", "nao", "depois", "pensar"]):
        return MENSAGENS["sem_interesse"]
    
    # Padrão
    return MENSAGENS["padrao"]


MENSAGENS = {
    "preco": """
O investimento é de apenas R$ {valor}! 🎉

Isso inclui:
✅ Site completo e profissional
✅ Hospedagem por 1 ano
✅ Certificado SSL
✅ Suporte técnico por 30 dias

É um investimento que se paga com poucos clientes novos!

Quer que eu publice? 🚀
""",
    
    "prazo": """
O site fica pronto em até 24 horas! ⚡

Assim que fecharmos, eu:
1. Publico o site
2. Configuro o domínio
3. Envio o link para vocês

Rápido e sem burocracia! 🚀
""",
    
    "funcionalidades": """
O site inclui tudo que vocês precisam! 🎯

✅ Design moderno e responsivo
✅ Funciona no celular, tablet e PC
✅ WhatsApp integrado
✅ Galeria de fotos
✅ Formulário de contato
✅ Google Maps
✅ SEO otimizado
✅ Carregamento rápido

Seus clientes vão adorar! 😊
""",
    
    "exemplo": """
Dá uma olhada neste exemplo: {url}

Mas o site de vocês será personalizado com:
✅ Suas cores
✅ Suas fotos
✅ Seus serviços
✅ Seu logo

Ficou com dúvidas? 😊
""",
    
    "sem_interesse": """
Sem problemas! 😊

Se mudarem de ideia, é só me chamar. O site está pronto e pode ser publicado a qualquer momento.

Bom trabalho para vocês! 🤝
""",
    
    "padrao": """
Oi! 😊

Posso te ajudar com mais informações sobre o site?

Qualquer dúvida, é só falar! 🤝
""",
}
```

---

## PASSO 6: Fechar Negócio + Enviar PIX

### Script de Fechamento

```python
# scripts/fechar_negocio.py

async def fechar_negocio(lead: dict, contexto: dict):
    """
    Fecha o negócio e envia PIX.
    """
    
    # 1. Enviar mensagem de fechamento
    mensagem = MENSAGENS["fechamento"].format(
        valor=contexto.get("valor", "497"),
        pix=contexto.get("pix", "seu-pix@email.com")
    )
    
    if lead.get("telefone"):
        await enviar_proposta_whatsapp(lead["telefone"], mensagem)
    elif lead.get("instagram"):
        await enviar_proposta_instagram(lead["instagram"], mensagem)
    
    # 2. Aguardar pagamento
    print("Aguardando confirmação do pagamento...")
    
    # 3. Publicar site (quando confirmar)
    # site_url = publicar_site(contexto["site"])
    
    return True
```

---

## PASSO 7: Publicar Site + Enviar URL

### Script de Publicação

```python
# scripts/publicar_site.py
import subprocess

def publicar_site(diretorio_site: str, nome_dominio: str) -> str:
    """
    Publica o site na Vercel/Netlify.
    """
    
    # Opção 1: Vercel
    try:
        result = subprocess.run(
            ["vercel", "--prod", "--yes"],
            cwd=diretorio_site,
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            # Extrair URL do output
            for line in result.stdout.split("\n"):
                if "https://" in line:
                    return line.strip()
    except:
        pass
    
    # Opção 2: Netlify
    try:
        result = subprocess.run(
            ["netlify", "deploy", "--prod", "--dir", "out"],
            cwd=diretorio_site,
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            for line in result.stdout.split("\n"):
                if "https://" in line:
                    return line.strip()
    except:
        pass
    
    return None


async def enviar_url_site(lead: dict, site_url: str):
    """Envia a URL do site publicado para o lead."""
    
    mensagem = MENSAGENS["pos_publicacao"].format(url=site_url)
    
    if lead.get("telefone"):
        await enviar_proposta_whatsapp(lead["telefone"], mensagem)
    elif lead.get("instagram"):
        await enviar_proposta_instagram(lead["instagram"], mensagem)
```

---

## PASSO 8: Próximo Lead

### Script de Orquestração

```python
# scripts/orquestrador.py
import asyncio
from buscar_leads import buscar_leads
from scraping_site import scraping_site
from criar_site import criar_site_melhorado
from enviar_proposta import enviar_proposta_whatsapp
from negociar import negociar
from fechar_negocio import fechar_negocio
from publicar_site import publicar_site, enviar_url_site

async def orquestrar(criterio: str, local: str, pix: str):
    """
    Orquestra todo o fluxo de geração de leads.
    """
    
    print(f"🔍 Buscando leads: {criterio} em {local}")
    leads = await buscar_leads(criterio, local)
    
    print(f"📋 Encontrados {len(leads)} leads")
    
    for i, lead in enumerate(leads):
        print(f"\n{'='*50}")
        print(f"📌 Lead {i+1}/{len(leads)}: {lead['nome']}")
        print(f"⭐ Nota: {lead.get('nota', 'N/A')}")
        
        # 1. Scraping do site
        if lead.get("url"):
            print(f"🌐 Fazendo scraping: {lead['url']}")
            dados = await scraping_site(lead["url"])
        else:
            print("⚠️ Lead sem URL, pulando...")
            continue
        
        # 2. Criar site melhorado
        print("🎨 Criando site melhorado...")
        site = criar_site_melhorado(dados)
        
        # 3. Publicar site
        print("🚀 Publicando site...")
        site_url = publicar_site(f"./sites/{lead['nome']}", lead["nome"])
        
        # 4. Enviar proposta
        print("📨 Enviando proposta...")
        contexto = {
            "site": site,
            "url_site": site_url,
            "pix": pix,
            "valor": "497"
        }
        
        if lead.get("telefone"):
            await enviar_proposta_whatsapp(
                lead["telefone"],
                f"Olá {lead['nome']}! Vi que vocês são nota {lead.get('nota', '5')} no Google! "
                f"Criei uma proposta de site para vocês: {site_url}",
                site_url
            )
        
        # 5. Aguardar resposta (simulado)
        print("⏳ Aguardando resposta...")
        # Em produção, aqui seria webhook do WhatsApp
        
        print(f"✅ Lead {lead['nome']} processado!")
    
    print(f"\n{'='*50}")
    print(f"🎉 Processamento concluído! {len(leads)} leads processados.")


# Executar
if __name__ == "__main__":
    asyncio.run(orquestrar(
        criterio="lojas que tem site feio que são nota 5",
        local="São Paulo",
        pix="seu-pix@email.com"
    ))
```

---

## Como Usar

### 1. Configurar

```bash
# Instalar dependências
pip install playwright
playwright install chromium

# Configurar WhatsApp Web (escanear QR Code uma vez)
# Abrir https://web.whatsapp.com e escanear
```

### 2. Executar

```bash
# Buscar leads e enviar propostas
python scripts/orquestrador.py

# Ou buscar apenas leads
python scripts/buscar_leads.py

# Ou enviar proposta manual
python scripts/enviar_proposta.py --telefone 11999999999 --mensagem "Olá!"
```

### 3. Personalizar

```python
# Editar scripts/templates_mensagens.py para personalizar mensagens
# Editar scripts/fechar_negocio.py para mudar valores
# Editar criar_site.py para mudar estilo dos sites
```

---

## Ferramentas Necessárias

| Ferramenta | Uso | Link |
|------------|-----|------|
| Playwright | Scraping + Envio | pip install playwright |
| Vercel/Netlify | Publicar sites | vercel.com / netlify.com |
| WhatsApp Web | Envio de mensagens | web.whatsapp.com |
| Instagram | Envio de DMs | instagram.com |

---

## Estrutura de Arquivos

```
lead-outreach/
├── scripts/
│   ├── buscar_leads.py
│   ├── scraping_site.py
│   ├── criar_site.py
│   ├── enviar_proposta.py
│   ├── negociar.py
│   ├── fechar_negocio.py
│   ├── publicar_site.py
│   ├── orquestrador.py
│   └── templates_mensagens.py
├── sites/
│   └── [nome-lead]/
│       ├── src/
│       ├── public/
│       └── package.json
└── SKILL.md
```

---

## Dicas

1. **WhatsApp Web**: Faça login uma vez e mantenha a sessão ativa
2. **Instagram**: Limite de DMs por dia (~50 para contas novas)
3. **Personalização**: Sempre personalize a mensagem com o nome do negócio
4. **Timing**: Envie em horário comercial (9h-18h)
5. **Follow-up**: Se não responder em 24h, envie lembrete
6. **VALOR**: R$ 497 é sugerido, mas ajuste conforme o nicho
7. **PIX**: Use seu PIX real nas configurações
