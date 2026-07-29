# Skill: webapp-design

# Webapp Design Profissional

Crie dashboards e aplicacoes web com design premium. Baseado em apps que cobram $10K+ por licenca.

## Principios de Design para Webapps

### 1. Layout de Dashboard
```
┌─────────────────────────────────────────┐
│ SIDEBAR  │  HEADER (breadcrumb + acoes) │
│          │─────────────────────────────│
│ Logo     │  CONTEUDO PRINCIPAL         │
│ Nav      │  (cards, tabelas, charts)   │
│ Menu     │                             │
│          │                             │
│ User     │                             │
└─────────────────────────────────────────┘
```

### 2. Hierarquia de Informacao
- **Nivel 1**: Metricas principais (KPIs) - cards grandes com numero + label
- **Nivel 2**: Acoes rapidas - botoes prominentes
- **Nivel 3**: Conteudo detalhado - tabelas, listas, graficos
- **Nivel 4**: Configuracoes - modais, formularios

### 3. Sistema de Cores para Apps
```css
/* Fundo */
--bg-primary: #fafaf9;      /* Fundo principal */
--bg-secondary: #f5f5f4;    /* Fundo de cards */
--bg-tertiary: #e7e5e4;     /* Fundo de hover */

/* Superficies */
--surface: #ffffff;          /* Cards, modais */
--surface-elevated: #ffffff; /* Dropdowns, tooltips */

/* Acento */
--accent: #c4704b;          /* Botoes primarios */
--accent-hover: #a85a3a;    /* Hover state */
--accent-light: #fef2f2;    /* Background leve */

/* Sucesso/Erro/Alerta */
--success: #7d9b76;
--warning: #d4a84b;
--error: #c45b5b;

/* Texto */
--text-primary: #1c1917;
--text-secondary: #57534e;
--text-tertiary: #a8a29e;

/* Bordas */
--border: #e7e5e4;
--border-subtle: #f5f5f4;
```

### 4. Tipografia para Apps
- **Display**: 24-32px, bold (titulos de pagina)
- **Heading**: 18-20px, semibold (secoes)
- **Body**: 14-16px, regular (conteudo)
- **Caption**: 12-13px, regular (labels, metadata)
- **Mono**: 13px, JetBrains Mono (codigo, dados)

### 5. Componentes Essenciais

#### Sidebar
- Largura: 256px (expandida) / 80px (colapsada)
- Fundo: surface
- Nav items: 44px altura, icon + label
- Active state: accent background leve

#### Cards
- Border-radius: 12-16px
- Border: 1px solid var(--border)
- Shadow: sm (0 1px 2px)
- Padding: 24px
- Hover: shadow-md

#### Botoes
- Primario: accent bg, white text, 44px height
- Secundario: surface bg, border, text-primary
- Ghost: transparent, text-secondary
- Icon: 40x40px, rounded-xl

#### Inputs
- Height: 44px
- Border: 1px solid var(--border)
- Border-radius: 12px
- Focus: accent border + glow
- Label: 14px, medium, text-secondary

#### Tabelas
- Header: bg-secondary, text-secondary, 12px uppercase
- Rows: border-bottom, hover:bg-secondary
- Cells: 14px, padding 12px 16px
- Actions: right-aligned, ghost buttons

### 6. Padroes de Interacao

#### Empty States
```
┌─────────────────────────────┐
│       [Icone grande]        │
│                             │
│    Nenhum [item] ainda      │
│    Descricao curta          │
│                             │
│    [Botao de acao primaria] │
└─────────────────────────────┘
```

#### Loading States
- Skeleton screens (nao spinners)
- Shimmer animation
- Layout identico ao conteudo real

#### Error States
- Mensagem clara do erro
- Acao para corrigir
- Botao "Tentar novamente"

### 7. Animacoes Subis
- **Transicoes**: 200ms ease-out
- **Hover**: scale(1.02) ou shadow-md
- **Page transitions**: fade-in 300ms
- **Loading**: pulse ou shimmer
- **Reduced motion**: respeitar prefers-reduced-motion

### 8. Responsividade

#### Desktop (1200px+)
- Sidebar fixa
- Grid 12 colunas
- Cards em grid

#### Tablet (768px-1199px)
- Sidebar colapsada (icones)
- Grid 8 colunas
- Cards stack

#### Mobile (ate 767px)
- Sidebar hidden (drawer)
- Stack vertical
- Cards full-width
- Bottom navigation

### 9. Acessibilidade
- Contraste minimo 4.5:1
- Focus visible em todos os botoes
- aria-labels em icones
- Keyboard navigation
- Screen reader friendly

### 10. Padrao de Arquitetura
```
/components
  /ui           # Componentes base (Button, Card, Input)
  /layout       # Sidebar, Header, Footer
  /features     # Componentes especificos de features
/lib
  /utils        # Funcoes utilitarias
  /hooks        # Custom hooks
/app
  /dashboard    # Paginas do app
  /api          # API routes
```

## Ferramentas
- **shadcn/ui**: Componentes base
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icones consistentes
- **clsx**: Class name merging
- **next/font**: Fontes otimizadas
