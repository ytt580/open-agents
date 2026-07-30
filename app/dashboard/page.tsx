'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Sidebar } from '@/components/Sidebar'
import { Dashboard } from '@/components/Dashboard'
import { FlowEditor } from '@/components/FlowEditor'
import { BrowserView } from '@/components/BrowserView'
import { SkillsManager } from '@/components/SkillsManager'
import { Scheduler } from '@/components/Scheduler'
import { HITLSystem } from '@/components/HITLSystem'
import { Zap, ArrowLeft } from 'lucide-react'

export interface Flow {
  id: string
  nome: string
  steps: any[]
  createdAt: string
}

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [flows, setFlows] = useState<Flow[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('open-agents-flows')
    if (saved) setFlows(JSON.parse(saved))
  }, [])

  const saveFlows = (newFlows: Flow[]) => {
    setFlows(newFlows)
    localStorage.setItem('open-agents-flows', JSON.stringify(newFlows))
  }

  const handleNewFlow = () => {
    const id = Date.now().toString()
    const newFlow: Flow = { id, nome: 'Novo Fluxo', steps: [], createdAt: new Date().toISOString() }
    saveFlows([...flows, newFlow])
    setSelectedFlow(id)
    setCurrentPage('flows')
  }

  const handleSelectFlow = (id: string) => {
    setSelectedFlow(id)
    setCurrentPage('flows')
  }

  const handleSaveFlow = (id: string, nome: string, steps: any[]) => {
    const updated = flows.map(f => f.id === id ? { ...f, nome, steps } : f)
    saveFlows(updated)
  }

  const handleDeleteFlow = (id: string) => {
    const updated = flows.filter(f => f.id !== id)
    saveFlows(updated)
    setSelectedFlow(null)
    setCurrentPage('dashboard')
  }

  const handleHITLApprove = useCallback((actionId: string) => {
    console.log('HITL approved:', actionId)
  }, [])

  const handleHITLReject = useCallback((actionId: string) => {
    console.log('HITL rejected:', actionId)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={handleSelectFlow} onNewFlow={handleNewFlow} flows={flows} />
      case 'flows':
        if (selectedFlow) {
          const flow = flows.find(f => f.id === selectedFlow)
          return <FlowEditor flowId={selectedFlow} flow={flow} onBack={() => setSelectedFlow(null)} onSave={handleSaveFlow} />
        }
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={handleSelectFlow} onNewFlow={handleNewFlow} flows={flows} />
      case 'browser':
        return <BrowserView />
      case 'skills':
        return <SkillsManager />
      case 'scheduler':
        return <Scheduler />
      default:
        return <Dashboard onNavigate={setCurrentPage} onSelectFlow={handleSelectFlow} onNewFlow={handleNewFlow} flows={flows} />
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
        onNewFlow={handleNewFlow}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 h-screen overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        {renderPage()}
      </main>
      <HITLSystem onApprove={handleHITLApprove} onReject={handleHITLReject} />
    </div>
  )
}
