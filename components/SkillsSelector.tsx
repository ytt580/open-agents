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
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-xl max-h-[75vh] rounded-xl overflow-hidden flex flex-col" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', boxShadow: '0 0 40px var(--accent-glow)' }}>
        <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
              <Puzzle className="w-4 h-4" style={{ color: 'var(--violet-400)' }} />
            </div>
            <div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Skills Disponiveis</h3>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{skills.length} skills para automatizar</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar skill..."
              className="input-field text-xs pl-8"
            />
          </div>
          <div className="flex gap-1 mt-2">
            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium transition-all"
                style={{ 
                  background: filter === cat.id ? 'var(--violet-600)' : 'var(--bg-tertiary)',
                  color: filter === cat.id ? 'white' : 'var(--text-tertiary)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filtered.map(skill => {
            const Icon = skill.icone
            return (
              <button
                key={skill.id}
                onClick={() => { onSelect(skill); onClose() }}
                className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:border-[var(--violet-500)] flex items-start gap-3"
                style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-glow)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--violet-400)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{skill.nome}</p>
                  <p className="text-[10px] mt-0.5 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>{skill.descricao}</p>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                  {skill.categoria}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
