'use client'

import { 
  LayoutDashboard, GitBranch, Globe, Puzzle,
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
        background: '#ffffff', 
        borderRight: '1px solid #e7e5e4',
        boxShadow: '1px 0 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-5" style={{ borderBottom: '1px solid #e7e5e4' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}>
              <Zap className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="font-black text-lg tracking-tight" style={{ color: '#1c1917' }}>Open-Agents</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {currentPlan === 'premium' ? (
                    <Crown className="w-3 h-3" style={{ color: '#f97316' }} />
                  ) : (
                    <Zap className="w-3 h-3" style={{ color: '#78716c' }} />
                  )}
                  <span className="text-xs font-bold" style={{ color: currentPlan === 'premium' ? '#ea580c' : '#78716c' }}>
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
              'w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm transition-all duration-200',
              'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
            )} 
            style={{ 
              background: '#1c1917', 
              color: 'white',
              minHeight: '48px'
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
                    ? 'font-bold' 
                    : 'hover:bg-[#f5f5f4]'
                )}
                style={isActive ? {
                  background: '#fff7ed',
                  color: '#ea580c',
                } : {
                  color: '#78716c'
                }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && currentPlan === 'free' && (
          <div 
            className="mx-3 mb-3 p-4 rounded-xl"
            style={{ 
              background: '#fff7ed', 
              border: '1px solid #fed7aa',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4" style={{ color: '#f97316' }} />
              <span className="text-sm font-bold" style={{ color: '#ea580c' }}>Premium</span>
            </div>
            <p className="text-xs mb-3" style={{ color: '#78716c' }}>
              Desbloqueie Kimi K3 e agentes ilimitados
            </p>
            <button 
              className="w-full py-2.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.02]"
              style={{ background: '#f97316', color: 'white', minHeight: '40px' }}
            >
              Upgrade
            </button>
          </div>
        )}

        {/* Collapse button */}
        <div className="p-3">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-[#f5f5f4]"
            style={{ color: '#a8a29e' }}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
