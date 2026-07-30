'use client'

import { useState } from 'react'
import { 
  X, Search, Globe, Code, Mail, Video, Database,
  Bug, TestTube, Layout, PenTool, Puzzle, Sparkles,
  Zap, FileText, MessageSquare, TestTube2, GitBranch,
  Paintbrush, Smartphone, Move, Layers, Film
} from 'lucide-react'

interface Skill {
  id: string
  nome: string
  descricao: string
  categoria: string
  icone: any
}

const skills: Skill[] = [
  { id: 'lead-outreach', nome: 'Lead Outreach', descricao: 'Busca no Google Maps, scraping, criacao de sites, envio via WhatsApp/Instagram', categoria: 'prospeccao', icone: Globe },
  { id: 'landingpage-design', nome: 'Landing Page Design', descricao: 'Crie landing pages que convertem visitantes em clientes', categoria: 'design', icone: Layout },
  { id: 'webapp-design', nome: 'Webapp Design', descricao: 'Dashboards e aplicacoes web com design premium', categoria: 'design', icone: Layout },
  { id: 'frontend-design', nome: 'Frontend Design', descricao: 'Design visual distintivo e intencional para UI', categoria: 'design', icone: PenTool },
  { id: 'design-system', nome: 'Design System', descricao: 'Sistema de design reutilizavel com tokens e consistencia', categoria: 'design', icone: Layers },
  { id: 'shadcn', nome: 'shadcn/ui', descricao: 'Componentes UI modernos e reutilizaveis', categoria: 'design', icone: Puzzle },
  { id: 'sites-animados', nome: 'Sites Animados', descricao: 'Transforme videos em sites animados por scroll', categoria: 'design', icone: Video },
  { id: 'remotion-video', nome: 'Remotion Video', descricao: 'Crie videos profissionais com React', categoria: 'design', icone: Film },
  { id: 'motion-dev', nome: 'Motion.dev', descricao: 'Animacoes de alta qualidade para React com spring physics', categoria: 'design', icone: Move },
  { id: 'gsap', nome: 'GSAP', descricao: 'Animacoes criativas e artisticas com timeline', categoria: 'design', icone: Move },
  { id: 'transitions-dev', nome: 'Transitions', descricao: 'Transicoes de UI prontas para web apps', categoria: 'design', icone: Sparkles },
  { id: 'material3', nome: 'Material Design 3', descricao: 'Design system do Google para mobile', categoria: 'design', icone: Paintbrush },
  { id: 'expo', nome: 'Expo', descricao: 'Apps cross-platform com React Native', categoria: 'design', icone: Smartphone },
  { id: 'firecrawl-build', nome: 'Firecrawl Scraping', descricao: 'Scraping web avancado com Firecrawl', categoria: 'scraping', icone: Globe },
  { id: 'firecrawl-build-search', nome: 'Firecrawl Search', descricao: 'Busca web integrada ao seu app', categoria: 'scraping', icone: Search },
  { id: 'firecrawl-build-scrape', nome: 'Firecrawl Scrape', descricao: 'Extracao de paginas web individuais', categoria: 'scraping', icone: Globe },
  { id: 'firecrawl-build-interact', nome: 'Firecrawl Interact', descricao: 'Interacao com paginas dinamicas e forms', categoria: 'scraping', icone: Globe },
  { id: 'react-best-practices', nome: 'React Best Practices', descricao: 'Otimizacao de performance React/Next.js', categoria: 'dev', icone: Code },
  { id: 'supabase-postgres', nome: 'Supabase Postgres', descricao: 'Otimizacao de queries e schema Postgres', categoria: 'dev', icone: Database },
  { id: 'mcp-builder', nome: 'MCP Builder', descricao: 'Crie servidores MCP para integrar APIs', categoria: 'dev', icone: GitBranch },
  { id: 'systematic-debugging', nome: 'Debugging', descricao: 'Encontre e corrija bugs de forma sistematica', categoria: 'dev', icone: Bug },
  { id: 'test-driven-dev', nome: 'Test Driven Dev', descricao: 'Escreva testes antes da implementacao', categoria: 'dev', icone: TestTube },
  { id: 'writing-plans', nome: 'Writing Plans', descricao: 'Planeje tarefas complexas antes de codar', categoria: 'dev', icone: FileText },
  { id: 'brainstorming', nome: 'Brainstorming', descricao: 'Explore ideias antes de criar features', categoria: 'dev', icone: Sparkles },
  { id: 'skill-creator', nome: 'Skill Creator', descricao: 'Crie e otimize skills de agentes', categoria: 'dev', icone: Zap },
  { id: 'webapp-testing', nome: 'Webapp Testing', descricao: 'Teste apps web com Playwright', categoria: 'dev', icone: TestTube2 },
]

interface SkillsSelectorProps {
  onSelect: (skill: Skill) => void
  onClose: () => void
}

export function SkillsSelector({ onSelect, onClose }: SkillsSelectorProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const categorias = [
    { id: 'all', label: 'Todas' },
    { id: 'prospeccao', label: 'Prospeccao' },
    { id: 'design', label: 'Design' },
    { id: 'scraping', label: 'Scraping' },
    { id: 'dev', label: 'Desenvolvimento' },
  ]

  const filtered = skills.filter(s => {
    const matchSearch = s.nome.toLowerCase().includes(search.toLowerCase()) || 
                        s.descricao.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || s.categoria === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-xl max-h-[75vh] rounded-2xl overflow-hidden flex flex-col" style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-muted)' }}>
              <Puzzle className="w-5 h-5" style={{ color: 'var(--fg)' }} />
            </div>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Skills Disponiveis</h3>
              <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{skills.length} skills para automatizar</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--fg-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search + Filters */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--fg-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar skill..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-colors"
              style={{ background: 'var(--bg-muted)', color: 'var(--fg)', border: '1px solid var(--border)' }}
            />
          </div>
          <div className="flex gap-2 mt-3">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ 
                  background: filter === cat.id ? 'var(--fg)' : 'var(--bg-muted)',
                  color: filter === cat.id ? 'white' : 'var(--fg-muted)',
                  border: '1px solid ' + (filter === cat.id ? 'var(--fg)' : 'var(--border)')
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map(skill => {
            const Icon = skill.icone
            return (
              <button
                key={skill.id}
                onClick={() => { onSelect(skill); onClose() }}
                className="w-full p-4 rounded-xl text-left transition-all duration-200 flex items-start gap-3 hover:shadow-sm"
                style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
                  <Icon className="w-5 h-5" style={{ color: 'var(--fg)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>{skill.nome}</p>
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--fg-muted)' }}>{skill.descricao}</p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-md font-medium flex-shrink-0" style={{ background: 'var(--bg-muted)', color: 'var(--fg-muted)' }}>
                  {skill.categoria}
                </span>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Nenhuma skill encontrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
