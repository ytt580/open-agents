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
        'fixed left-0 top-0 h-full transition-all duration-300 z-50',
        collapsed ? 'w-20' : 'w-72'
      )} 
      style={{ 
        background: 'var(--bg)', 
        borderRight: '1px solid var(--border)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fafafa' }}>
              <Zap className="w-5 h-5" style={{ color: '#0a0a0a' }} strokeWidth={3} />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--fg)' }}>Open-Agents</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {currentPlan === 'premium' ? (
                    <Crown className="w-3.5 h-3.5" style={{ color: 'var(--orange)' }} />
                  ) : (
                    <Zap className="w-3.5 h-3.5" style={{ color: 'var(--fg-muted)' }} />
                  )}
                  <span className="text-sm font-semibold" style={{ color: currentPlan === 'premium' ? 'var(--orange)' : 'var(--fg-muted)' }}>
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
              'w-full flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-150',
              'hover:shadow-sm active:scale-[0.98]'
            )} 
            style={{ 
              background: 'var(--fg)', 
              color: 'white',
              minHeight: '52px',
              fontSize: '15px'
            }}
          >
            <Plus className="w-5 h-5" />
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
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150',
                  isActive 
                    ? 'font-semibold' 
                    : 'hover:bg-[var(--bg-muted)]'
                )}
                style={isActive ? {
                  background: 'var(--bg-muted)',
                  color: 'var(--fg)',
                } : {
                  color: 'var(--fg-muted)',
                  fontSize: '15px'
                }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
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
              background: 'var(--bg-muted)', 
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Crown className="w-4 h-4" style={{ color: 'var(--orange)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Premium</span>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--fg-muted)' }}>
              Puter.js, 500+ modelos IA
            </p>
            <button 
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: 'var(--fg)', color: 'white', minHeight: '42px' }}
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
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-150 hover:bg-[var(--bg-muted)]"
            style={{ color: 'var(--fg-faint)' }}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
