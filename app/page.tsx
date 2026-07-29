'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Dashboard } from '@/components/Dashboard'
import { FlowEditor } from '@/components/FlowEditor'
import { BrowserView } from '@/components/BrowserView'
import { SkillsManager } from '@/components/SkillsManager'
import { ApiManager } from '@/components/ApiManager'
import { Scheduler } from '@/components/Scheduler'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={setSelectedFlow} />
      case 'flows':
        if (selectedFlow) {
          return <FlowEditor flowId={selectedFlow} onBack={() => setSelectedFlow(null)} />
        }
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={setSelectedFlow} />
      case 'browser':
        return <BrowserView />
      case 'skills':
        return <SkillsManager />
      case 'api':
        return <ApiManager />
      case 'scheduler':
        return <Scheduler />
      default:
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={setSelectedFlow} />
    }
  }

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={(page) => {
          setCurrentPage(page)
          if (page !== 'flows') setSelectedFlow(null)
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {renderPage()}
      </main>
    </div>
  )
}