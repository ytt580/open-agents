'use client'

import { 
  LayoutDashboard, GitBranch, Globe, Puzzle, Key,
  ChevronLeft, ChevronRight, Plus, Clock,
  Crown, Zap
} from 'lucide-react'
import { clsx } from 'clsx'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  onNewFlow: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Visao Geral' },
  { id: 'flows', icon: GitBranch, label: 'Fluxos' },
  { id: 'browser', icon: Globe, label: 'Navegador' },
  { id: 'skills', icon: Puzzle, label: 'Skills' },
  { id: 'scheduler', icon: Clock, label: 'Agendador' },
  { id: 'api', icon: Key, label: 'APIs' },
]

export function Sidebar({ currentPage, onNavigate, onNewFlow, collapsed, onToggleCollapse }: SidebarProps) {
  const currentPlan = 'free' as string
  
  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 h-full transition-all duration-300 z-50',
        collapsed ? 'w-16' : 'w-56'
      )} 
      style={{ 
        background: 'var(--bg-primary)', 
        borderRight: '1px solid var(--border)',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex-shrink-0">
              <img src="/logo.svg" alt="Open-Agents" className="w-full h-full" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>Open-Agents</h1>
                <div className="flex items-center gap-1 mt-0.5">
                  {currentPlan === 'premium' ? (
                    <Crown className="w-2.5 h-2.5" style={{ color: 'var(--violet-400)' }} />
                  ) : (
                    <Zap className="w-2.5 h-2.5" style={{ color: 'var(--cyan-400)' }} />
                  )}
                  <span 
                    className="text-[10px] font-medium"
                    style={{ color: currentPlan === 'premium' ? 'var(--violet-400)' : 'var(--cyan-400)' }}
                  >
                    {currentPlan === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Flow Button */}
        <div className="p-3">
          <button 
            onClick={onNewFlow} 
            className={clsx(
              'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-xs transition-all duration-200',
              'hover:shadow-md hover:scale-[1.01] active:scale-[0.98]'
            )} 
            style={{ 
              background: 'linear-gradient(135deg, var(--violet-600), var(--violet-500))', 
              color: 'white', 
              boxShadow: '0 0 16px var(--accent-glow)' 
            }}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && <span>Novo Fluxo</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'font-medium' 
                    : 'hover:bg-[var(--surface-hover)]'
                )}
                style={isActive ? {
                  background: 'var(--accent-glow)',
                  color: 'var(--violet-300)',
                  boxShadow: 'inset 0 0 16px var(--accent-glow)'
                } : {
                  color: 'var(--text-tertiary)'
                }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span className="text-xs">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && currentPlan === 'free' && (
          <div 
            className="mx-2 mb-2 p-3 rounded-lg"
            style={{ 
              background: 'var(--accent-glow)', 
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '0 0 16px var(--accent-glow)'
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Crown className="w-3.5 h-3.5" style={{ color: 'var(--violet-400)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--violet-400)' }}>Premium</span>
            </div>
            <p className="text-[10px] mb-2" style={{ color: 'var(--text-tertiary)' }}>
              Desbloqueie Kimi K3 e agentes ilimitados
            </p>
            <button 
              className="w-full py-1.5 rounded-md text-[10px] font-semibold transition-all hover:scale-[1.01]"
              style={{ background: 'var(--violet-600)', color: 'white' }}
            >
              Upgrade
            </button>
          </div>
        )}

        {/* Collapse button */}
        <div className="p-2">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--surface-hover)]"
            style={{ color: 'var(--text-muted)' }}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
