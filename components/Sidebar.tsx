'use client'

import { 
  LayoutDashboard, GitBranch, Globe, Puzzle,
  ChevronLeft, ChevronRight, Plus, Clock,
  Crown, Zap
} from 'lucide-react'
import { clsx } from 'clsx'
import { LoginButton } from './LoginButton'

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
]

export function Sidebar({ currentPage, onNavigate, onNewFlow, collapsed, onToggleCollapse }: SidebarProps) {
  const currentPlan = 'free' as string
  
  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 h-full transition-all duration-500 z-50',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )} 
      style={{ 
        background: 'var(--bg)', 
        borderRight: '1px solid var(--border)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 h-16 flex items-center" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-[15px] tracking-[-0.03em]" style={{ color: 'var(--fg)' }}>open-agents</span>
          </div>
        </div>

        {/* New Flow Button */}
        <div className="p-4">
          <button 
            onClick={onNewFlow} 
            className={clsx(
              'w-full flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300',
              'hover:opacity-80 active:scale-[0.98]'
            )} 
            style={{ 
              background: 'var(--fg)', 
              color: 'var(--bg)',
              height: '44px',
              fontSize: '13px'
            }}
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            {!collapsed && <span>Novo Fluxo</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300',
                  isActive 
                    ? 'font-semibold' 
                    : 'hover:bg-[var(--bg-subtle)]'
                )}
                style={isActive ? {
                  background: 'var(--bg-subtle)',
                  color: 'var(--fg)',
                } : {
                  color: 'var(--fg-muted)',
                  fontSize: '13px'
                }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && currentPlan === 'free' && (
          <div 
            className="mx-3 mb-3 p-4 rounded-2xl"
            style={{ 
              background: 'var(--bg-subtle)', 
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-3.5 h-3.5" style={{ color: 'var(--fg-muted)' }} />
              <span className="text-[12px] font-semibold" style={{ color: 'var(--fg)' }}>Premium</span>
            </div>
            <p className="text-[11px] mb-3 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Puter.js + Cloudflare — 15 modelos premium
            </p>
            <button 
              className="w-full py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300 hover:opacity-80"
              style={{ background: 'var(--fg)', color: 'var(--bg)', height: '38px' }}
            >
              R$ 49/mes
            </button>
          </div>
        )}

        {/* Auth */}
        {!collapsed && (
          <div className="px-3 mb-3">
            <LoginButton />
          </div>
        )}

        {/* Collapse button */}
        <div className="p-3 pt-0">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-[var(--bg-subtle)]"
            style={{ color: 'var(--fg-faint)' }}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
