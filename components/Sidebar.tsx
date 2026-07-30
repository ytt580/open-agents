'use client'

import { 
  LayoutDashboard, 
  GitBranch, 
  Globe, 
  Puzzle, 
  Key, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Plus,
  Clock,
  Crown,
  Bolt
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
        collapsed ? 'w-20' : 'w-64'
      )} 
      style={{ 
        background: 'var(--bg-secondary)', 
        borderRight: '1px solid var(--border)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src="/logo.svg" alt="Open-Agents" className="w-full h-full" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <h1 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Open-Agents</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {currentPlan === 'premium' ? (
                    <Crown className="w-3 h-3" style={{ color: 'var(--neural-400)' }} />
                  ) : (
                    <Bolt className="w-3 h-3" style={{ color: 'var(--electric-400)' }} />
                  )}
                  <span 
                    className="text-xs font-medium"
                    style={{ color: currentPlan === 'premium' ? 'var(--neural-400)' : 'var(--electric-400)' }}
                  >
                    {currentPlan === 'premium' ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Flow Button */}
        <div className="p-4">
          <button 
            onClick={onNewFlow} 
            className={clsx(
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200',
              'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
            )} 
            style={{ 
              background: 'linear-gradient(135deg, var(--neural-600), var(--neural-500))', 
              color: 'white', 
              boxShadow: '0 0 20px var(--accent-glow)' 
            }}
          >
            <Plus className="w-5 h-5" />
            {!collapsed && <span>Novo Fluxo</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive 
                    ? 'font-medium' 
                    : 'hover:bg-[var(--surface-hover)]'
                )}
                style={isActive ? {
                  background: 'var(--accent-glow)',
                  color: 'var(--neural-300)',
                  boxShadow: 'inset 0 0 20px var(--accent-glow)'
                } : {
                  color: 'var(--text-secondary)'
                }}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && currentPlan === 'free' && (
          <div 
            className="mx-3 mb-3 p-4 rounded-xl"
            style={{ 
              background: 'var(--accent-glow)', 
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 0 20px var(--accent-glow)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4" style={{ color: 'var(--neural-400)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--neural-400)' }}>Premium</span>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
              Desbloqueie Kimi K3 e agentes ilimitados
            </p>
            <button 
              className="w-full py-2 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
              style={{ background: 'var(--neural-600)', color: 'white' }}
            >
              Upgrade
            </button>
          </div>
        )}

        {/* Collapse button */}
        <div className="p-3">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[var(--surface-hover)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
