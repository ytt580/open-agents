# Skill: landingpage-design

# Landing Page Design de Alta Conversao

Crie landing pages que convertem visitantes em clientes. Baseado em padroes de paginas que geram $10K+ em vendas.

## Principios de Conversao

### 1. Hero que Converte
- **Headline focada no beneficio**, nao na feature. "Automatize sua prospeccao" > "Plataforma de IA"
- **Subheadline** em 1 linha explicando o que faz
- **CTA unico e claro** - um botao principal, cor contrastante
- **Prova social imediata** - numeros, logos, depoimentos
- **Sem distracao** - maximo 3 elementos no hero

### 2. Estrutura de Pagina (AIDA)
```
1. ATTENTION   → Hero com headline forte + CTA
2. INTEREST    → Problema que o usuario enfrenta
3. DESIRE      → Solucao + beneficios + prova social
4. ACTION      → CTA final com urgencia
```

### 3. Hierarquia Visual
- **H1**: 48-72px, bold, 1 linha maximo
- **H2**: 32-40px, medium, secao principal
- **H3**: 24-28px, regular, subsecoes
- **Body**: 16-18px, line-height 1.6
- **CTA**: 18-20px, bold, padding generoso

### 4. Cores de Conversao
- **Cor principal**: Acao (botao CTA)
- **Cor de fundo**: Neutra, limpa
- **Cor de destaque**: Para numeros e estatisticas
- **Contraste minimo**: 4.5:1 para acessibilidade

### 5. Padroes que Convertem
- **Numeros grandes** com labels pequenos ("10,000+ empresas ativas")
- **Depoimentos** com foto e nome real
- **Comparacao** antes/depois
- **Contador regressivo** para urgencia
- **Garantia** de 30 dias

## Template de Landing Page

```tsx
// 1. NAV - Fixa, transparente, logo + CTA
// 2. HERO - Headline + Subhead + CTA + Prova social
// 3. PROBLEMA - 3 dores do usuario
// 4. SOLUCAO - Features com icone + titulo + descricao
// 5. COMO FUNCIONA - 3-4 passos simples
// 6. PROVA SOCIAL - Numeros + Depoimentos
// 7. PRECOS - 2-3 planos com destaque no medio
// 8. FAQ - 5-7 perguntas comuns
// 9. CTA FINAL - Ultima chance de converter
// 10. FOOTER - Links + contato
```

## Copy que Converte

### Headlines
- "Automatize [ACAO] em [TEMPO] minutos"
- "[NUMERO] empresas ja usam para [RESULTADO]"
- "Pare de [DOR] e comece a [BENEFICIO]"

### Subheadlines
- "Sem [OBJECAO]. Sem [RISCO]. So [BENEFICIO]."
- "Em [TEMPO], voce tera [RESULTADO CONCRETO]"

### CTAs
- "Comecar Gratis" (primario)
- "Ver Demo" (secundario)
- "Falar com Consultor" (high-ticket)

### Prova Social
- "[NUMERO]+ empresas confiam"
- "Avaliacao 4.9/5 no [Plataforma]"
- "Economia media de [VALOR]/mes"

## Layout Responsivo

### Desktop (1200px+)
- Max-width: 1200px centralizado
- Grid 12 colunas
- Gap: 24-32px
- Padding: 80-120px vertical

### Tablet (768px-1199px)
- Grid 8 colunas
- Gap: 16-24px
- Padding: 60-80px vertical

### Mobile (ate 767px)
- Stack vertical
- Gap: 12-16px
- Padding: 40-60px vertical
- CTA full-width

## Ferramentas
- **shadcn/ui**: Componentes (Button, Card, Badge, Tabs)
- **Tailwind**: Utility classes
- **Lucide React**: Icones
- **Framer Motion**: Animacoes (opcional)

## Exemplo de Codigo

```tsx
// Hero Section
<section className="py-20 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <Badge>Novo</Badge>
    <h1 className="text-5xl font-bold mt-4">
      Automatize sua prospeccao
    </h1>
    <p className="text-xl mt-4 text-muted-foreground">
      Crie agentes de IA que buscam leads, criam sites e enviam propostas automaticamente
    </p>
    <div className="flex gap-4 justify-center mt-8">
      <Button size="lg">Comecar Gratis</Button>
      <Button size="lg" variant="outline">Ver Demo</Button>
    </div>
    <p className="text-sm mt-4 text-muted-foreground">
      10,000+ empresas ja automatizaram seus fluxos
    </p>
  </div>
</section>
```
