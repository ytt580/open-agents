'use client'

import { useState, useEffect } from 'react'
import { 
  Globe, Search, MapPin, Clock, Trash2, Plus,
  Monitor, Wifi, WifiOff, Shield, Eye, Play,
  Pause, Settings, Zap, RefreshCw
} from 'lucide-react'

interface SavedSite {
  nome: string
  url: string
  icon: any
}

interface BrowserClawSession {
  id: string
  url: string
  title: string
  status: 'active' | 'idle' | 'closed'
  lastActivity: Date
  hasAuth: boolean
}

interface RtrvrTab {
  id: string
  url: string
  status: 'running' | 'paused' | 'completed' | 'error'
  progress: number
  result?: any
}

const defaultSites: SavedSite[] = [
  { nome: 'Google Maps', url: 'https://www.google.com/maps', icon: MapPin },
  { nome: 'Google', url: 'https://www.google.com', icon: Search },
]

type BrowserMode = 'standard' | 'browserclaw' | 'rtrvr'

export function BrowserView() {
  const [url, setUrl] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [sites, setSites] = useState<SavedSite[]>(defaultSites)
  const [showAddSite, setShowAddSite] = useState(false)
  const [newSiteName, setNewSiteName] = useState('')
  const [newSiteUrl, setNewSiteUrl] = useState('')
  
  // BrowserClaw state
  const [mode, setMode] = useState<BrowserMode>('standard')
  const [browserclawConnected, setBrowserclawConnected] = useState(false)
  const [bcSessions, setBcSessions] = useState<BrowserClawSession[]>([])
  const [bcLoading, setBcLoading] = useState(false)
  
  // rtrvr.ai state
  const [rtrvrApiKey, setRtrvrApiKey] = useState('')
  const [rtrvrTabs, setRtrvrTabs] = useState<RtrvrTab[]>([])
  const [rtrvrMaxTabs, setRtrvrMaxTabs] = useState(10)
  const [showRtrvrConfig, setShowRtrvrConfig] = useState(false)

  // Check BrowserClaw availability
  useEffect(() => {
    const checkBrowserClaw = async () => {
      try {
        // Try to detect BrowserClaw on localhost
        const res = await fetch('http://localhost:9222/json/version', { 
          method: 'GET',
          signal: AbortSignal.timeout(2000)
        })
        if (res.ok) {
          setBrowserclawConnected(true)
          setMode('browserclaw')
        }
      } catch {
        setBrowserclawConnected(false)
      }
    }
    checkBrowserClaw()
    const interval = setInterval(checkBrowserClaw, 30000)
    return () => clearInterval(interval)
  }, [])

  // Load rtrvr config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('open-agents-rtrvr-config')
    if (saved) {
      const config = JSON.parse(saved)
      setRtrvrApiKey(config.apiKey || '')
      setRtrvrMaxTabs(config.maxTabs || 10)
    }
  }, [])

  const saveRtrvrConfig = () => {
    localStorage.setItem('open-agents-rtrvr-config', JSON.stringify({
      apiKey: rtrvrApiKey,
      maxTabs: rtrvrMaxTabs
    }))
    setShowRtrvrConfig(false)
  }

  const openUrl = (targetUrl: string) => {
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl
    
    if (mode === 'browserclaw' && browserclawConnected) {
      // Open via BrowserClaw CDP
      window.open(targetUrl, '_blank')
    } else if (mode === 'rtrvr' && rtrvrApiKey) {
      // Add to rtrvr queue
      addRtrvrTab(targetUrl)
    } else {
      window.open(targetUrl, '_blank')
    }
    
    setHistory(prev => [targetUrl, ...prev.filter(h => h !== targetUrl)].slice(0, 20))
    setUrl('')
  }

  const addRtrvrTab = async (targetUrl: string) => {
    if (rtrvrTabs.length >= rtrvrMaxTabs) {
      alert(`Limite de ${rtrvrMaxTabs} abas atingido`)
      return
    }

    const newTab: RtrvrTab = {
      id: Date.now().toString(),
      url: targetUrl,
      status: 'running',
      progress: 0
    }
    setRtrvrTabs(prev => [...prev, newTab])

    // Simulate rtrvr.ai execution
    // In production, this would call the rtrvr.ai API
    simulateRtrvrExecution(newTab.id)
  }

  const simulateRtrvrExecution = async (tabId: string) => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 500))
      setRtrvrTabs(prev => prev.map(t => 
        t.id === tabId ? { ...t, progress: i } : t
      ))
    }
    setRtrvrTabs(prev => prev.map(t => 
      t.id === tabId ? { ...t, status: 'completed', progress: 100 } : t
    ))
  }

  const pauseRtrvrTab = (tabId: string) => {
    setRtrvrTabs(prev => prev.map(t => 
      t.id === tabId ? { ...t, status: t.status === 'running' ? 'paused' : 'running' } : t
    ))
  }

  const removeRtrvrTab = (tabId: string) => {
    setRtrvrTabs(prev => prev.filter(t => t.id !== tabId))
  }

  const addSite = () => {
    if (!newSiteName || !newSiteUrl) return
    const fullUrl = newSiteUrl.startsWith('http') ? newSiteUrl : 'https://' + newSiteUrl
    setSites(prev => [...prev, { nome: newSiteName, url: fullUrl, icon: Globe }])
    setNewSiteName('')
    setNewSiteUrl('')
    setShowAddSite(false)
  }

  const removeSite = (url: string) => setSites(prev => prev.filter(s => s.url !== url))

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-void)' }}>
      {/* Sidebar */}
      <div className="w-72 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        {/* Mode Selector */}
        <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-1">
            <button
              onClick={() => setMode('standard')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[10px] font-medium transition-all"
              style={{
                background: mode === 'standard' ? 'var(--violet-600)' : 'var(--bg-secondary)',
                color: mode === 'standard' ? 'white' : 'var(--text-muted)'
              }}
            >
              <Globe className="w-3 h-3" />
              Standard
            </button>
            <button
              onClick={() => setMode('browserclaw')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[10px] font-medium transition-all"
              style={{
                background: mode === 'browserclaw' ? 'var(--emerald-500)' : 'var(--bg-secondary)',
                color: mode === 'browserclaw' ? 'white' : 'var(--text-muted)',
                opacity: !browserclawConnected ? 0.5 : 1
              }}
            >
              <Monitor className="w-3 h-3" />
              BrowserClaw
            </button>
            <button
              onClick={() => setMode('rtrvr')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[10px] font-medium transition-all"
              style={{
                background: mode === 'rtrvr' ? 'var(--cyan-500)' : 'var(--bg-secondary)',
                color: mode === 'rtrvr' ? 'white' : 'var(--text-muted)',
                opacity: !rtrvrApiKey ? 0.5 : 1
              }}
            >
              <Zap className="w-3 h-3" />
              rtrvr.ai
            </button>
          </div>
        </div>

        {/* Connection Status */}
        <div className="p-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
          {mode === 'browserclaw' && (
            <div className="flex items-center gap-2 p-2 rounded-md" style={{ 
              background: browserclawConnected ? 'rgba(52, 211, 153, 0.06)' : 'rgba(244, 63, 94, 0.06)',
              border: `1px solid ${browserclawConnected ? 'rgba(52, 211, 153, 0.15)' : 'rgba(244, 63, 94, 0.15)'}`
            }}>
              {browserclawConnected ? (
                <Wifi className="w-3.5 h-3.5" style={{ color: 'var(--emerald-400)' }} />
              ) : (
                <WifiOff className="w-3.5 h-3.5" style={{ color: 'var(--rose-400)' }} />
              )}
              <div className="flex-1">
                <p className="text-[10px] font-medium" style={{ color: browserclawConnected ? 'var(--emerald-400)' : 'var(--rose-400)' }}>
                  {browserclawConnected ? 'BrowserClaw Conectado' : 'BrowserClaw Off'}
                </p>
                <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                  {browserclawConnected ? 'Sessoes autenticadas disponiveis' : 'Porta 9222 nao encontrada'}
                </p>
              </div>
            </div>
          )}
          
          {mode === 'rtrvr' && (
            <div className="flex items-center gap-2 p-2 rounded-md" style={{ 
              background: rtrvrApiKey ? 'rgba(34, 211, 238, 0.06)' : 'rgba(251, 191, 36, 0.06)',
              border: `1px solid ${rtrvrApiKey ? 'rgba(34, 211, 238, 0.15)' : 'rgba(251, 191, 36, 0.15)'}`
            }}>
              <Zap className="w-3.5 h-3.5" style={{ color: rtrvrApiKey ? 'var(--cyan-400)' : 'var(--amber-400)' }} />
              <div className="flex-1">
                <p className="text-[10px] font-medium" style={{ color: rtrvrApiKey ? 'var(--cyan-400)' : 'var(--amber-400)' }}>
                  {rtrvrApiKey ? `rtrvr.ai Ativo` : 'rtrvr.ai Nao Configurado'}
                </p>
                <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                  {rtrvrApiKey ? `${rtrvrTabs.length}/${rtrvrMaxTabs} abas ativas` : 'Configure sua API key'}
                </p>
              </div>
              <button onClick={() => setShowRtrvrConfig(true)} className="p-1 rounded hover:bg-[var(--surface-hover)]">
                <Settings className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && url && openUrl(url)}
              placeholder={mode === 'rtrvr' ? "URL para automacao..." : "Digite uma URL..."}
              className="input-field text-xs pl-8"
            />
          </div>
        </div>

        {/* Saved Sites */}
        <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Sites Salvos</h3>
            <button onClick={() => setShowAddSite(!showAddSite)} className="p-1 rounded hover:bg-[var(--surface-hover)]" style={{ color: 'var(--violet-400)' }}>
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {showAddSite && (
            <div className="space-y-1.5 mb-2.5">
              <input type="text" value={newSiteName} onChange={(e) => setNewSiteName(e.target.value)} placeholder="Nome" className="input-field text-[10px]" />
              <input type="text" value={newSiteUrl} onChange={(e) => setNewSiteUrl(e.target.value)} placeholder="URL" className="input-field text-[10px]"
                onKeyDown={(e) => e.key === 'Enter' && addSite()} />
              <button onClick={addSite} className="btn-primary w-full text-[10px] py-1.5">Salvar</button>
            </div>
          )}

          <div className="space-y-1">
            {sites.map((site) => {
              const Icon = site.icon
              return (
                <div key={site.url} className="flex items-center gap-1.5 group">
                  <button onClick={() => openUrl(site.url)} className="flex-1 flex items-center gap-2 p-2 rounded-lg text-left transition-all hover:border-[var(--violet-500)]" style={{ border: '1px solid var(--border)' }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--cyan-400)' }} />
                    <span className="text-[10px] font-medium" style={{ color: 'var(--text-primary)' }}>{site.nome}</span>
                  </button>
                  <button onClick={() => removeSite(site.url)} className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }}>
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* BrowserClaw Sessions */}
        {mode === 'browserclaw' && browserclawConnected && (
          <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              <Shield className="w-3 h-3 inline mr-1" />
              Sessoes Autenticadas
            </h3>
            <div className="space-y-1">
              {bcSessions.length === 0 ? (
                <p className="text-[9px] text-center py-2" style={{ color: 'var(--text-muted)' }}>
                  Nenhuma sessao detectada
                </p>
              ) : (
                bcSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-2 p-1.5 rounded-md" style={{ background: 'var(--surface)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: session.status === 'active' ? 'var(--emerald-400)' : 'var(--text-muted)' }} />
                    <span className="text-[9px] truncate flex-1" style={{ color: 'var(--text-secondary)' }}>{session.title || session.url}</span>
                    {session.hasAuth && <Eye className="w-2.5 h-2.5" style={{ color: 'var(--emerald-400)' }} />}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* rtrvr.ai Active Tabs */}
        {mode === 'rtrvr' && rtrvrTabs.length > 0 && (
          <div className="p-3 flex-1 overflow-y-auto" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              <Zap className="w-3 h-3 inline mr-1" />
              Abas Ativas ({rtrvrTabs.length}/{rtrvrMaxTabs})
            </h3>
            <div className="space-y-1.5">
              {rtrvrTabs.map((tab) => (
                <div key={tab.id} className="p-2 rounded-md" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ 
                      background: tab.status === 'running' ? 'var(--emerald-400)' : 
                                  tab.status === 'paused' ? 'var(--amber-400)' : 
                                  tab.status === 'completed' ? 'var(--cyan-400)' : 'var(--rose-400)' 
                    }} />
                    <span className="text-[9px] truncate flex-1" style={{ color: 'var(--text-secondary)' }}>{tab.url}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                      <div className="h-full rounded-full transition-all" style={{ 
                        width: `${tab.progress}%`, 
                        background: tab.status === 'completed' ? 'var(--cyan-500)' : 'var(--emerald-500)' 
                      }} />
                    </div>
                    <span className="text-[8px] font-mono" style={{ color: 'var(--text-muted)' }}>{tab.progress}%</span>
                    <button onClick={() => pauseRtrvrTab(tab.id)} className="p-0.5 rounded hover:bg-[var(--surface-hover)]">
                      {tab.status === 'running' ? (
                        <Pause className="w-2.5 h-2.5" style={{ color: 'var(--amber-400)' }} />
                      ) : (
                        <Play className="w-2.5 h-2.5" style={{ color: 'var(--emerald-400)' }} />
                      )}
                    </button>
                    <button onClick={() => removeRtrvrTab(tab.id)} className="p-0.5 rounded hover:bg-[var(--surface-hover)]">
                      <Trash2 className="w-2.5 h-2.5" style={{ color: 'var(--text-muted)' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Historico</h3>
          {history.length === 0 ? (
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Nenhum site visitado</p>
          ) : (
            <div className="space-y-1">
              {history.map((h, i) => (
                <button key={i} onClick={() => openUrl(h)} className="w-full flex items-center gap-1.5 p-1.5 rounded-md text-left hover:bg-[var(--surface-hover)]">
                  <Clock className="w-2.5 h-2.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>{h}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ 
            background: mode === 'browserclaw' ? 'rgba(52, 211, 153, 0.08)' : 
                        mode === 'rtrvr' ? 'rgba(34, 211, 238, 0.08)' : 'rgba(34, 211, 238, 0.08)' 
          }}>
            {mode === 'browserclaw' ? (
              <Monitor className="w-8 h-8" style={{ color: 'var(--emerald-400)' }} />
            ) : mode === 'rtrvr' ? (
              <Zap className="w-8 h-8" style={{ color: 'var(--cyan-400)' }} />
            ) : (
              <Globe className="w-8 h-8" style={{ color: 'var(--cyan-400)' }} />
            )}
          </div>
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {mode === 'browserclaw' ? 'BrowserClaw' : mode === 'rtrvr' ? 'rtrvr.ai' : 'Navegador'}
          </h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
            {mode === 'browserclaw' 
              ? 'Acesse sites com suas sessoes ja autenticadas'
              : mode === 'rtrvr'
              ? 'Automacao multi-aba com Gemini Flash ($0.12/tarefa)'
              : 'Digite uma URL ou selecione um site salvo'}
          </p>
          
          <div className="card p-3 text-left">
            <p className="text-[10px] font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
              {mode === 'browserclaw' ? 'BrowserClaw:' : mode === 'rtrvr' ? 'rtrvr.ai:' : 'Como funciona:'}
            </p>
            <ul className="space-y-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              {mode === 'browserclaw' ? (
                <>
                  <li className="flex items-start gap-1.5">
                    <Shield className="w-3 h-3 mt-0.5" style={{ color: 'var(--emerald-400)' }} />
                    <span>Usa seus logins salvos (LinkedIn, CRM, SEO)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Monitor className="w-3 h-3 mt-0.5" style={{ color: 'var(--emerald-400)' }} />
                    <span>Executa na sua maquina local</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Eye className="w-3 h-3 mt-0.5" style={{ color: 'var(--emerald-400)' }} />
                    <span>Gravacao de sessao para auditoria</span>
                  </li>
                </>
              ) : mode === 'rtrvr' ? (
                <>
                  <li className="flex items-start gap-1.5">
                    <Zap className="w-3 h-3 mt-0.5" style={{ color: 'var(--cyan-400)' }} />
                    <span>Multi-aba simultaneas (ate {rtrvrMaxTabs})</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <RefreshCw className="w-3 h-3 mt-0.5" style={{ color: 'var(--cyan-400)' }} />
                    <span>Smart DOM Trees (baixo custo de tokens)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold" style={{ color: 'var(--cyan-400)' }}>$</span>
                    <span>Gemini Flash - $0.12 por tarefa</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-1.5">
                    <span style={{ color: 'var(--violet-400)' }}>1.</span>
                    <span>Digite uma URL no campo de busca</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span style={{ color: 'var(--cyan-400)' }}>2.</span>
                    <span>O site abre na sua aba do navegador</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span style={{ color: 'var(--emerald-400)' }}>3.</span>
                    <span>Use o Copilot para automatizar acoes</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* rtrvr Config Modal */}
      {showRtrvrConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-sm">
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Configurar rtrvr.ai</h3>
              <button onClick={() => setShowRtrvrConfig(false)} className="text-xs" style={{ color: 'var(--text-muted)' }}>X</button>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>API Key (Gemini Flash)</label>
                <input type="password" value={rtrvrApiKey} onChange={(e) => setRtrvrApiKey(e.target.value)} className="input-field text-xs" placeholder="AIza..." />
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Max Abas Simultaneas</label>
                <input type="number" value={rtrvrMaxTabs} onChange={(e) => setRtrvrMaxTabs(parseInt(e.target.value) || 10)} className="input-field text-xs" min={1} max={20} />
              </div>
              <div className="p-2 rounded-md" style={{ background: 'rgba(34, 211, 238, 0.06)', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
                <p className="text-[9px]" style={{ color: 'var(--cyan-400)' }}>
                  <strong>Custo estimado:</strong> ~$0.12 por tarefa automatizada via Gemini Flash
                </p>
              </div>
            </div>
            <div className="p-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setShowRtrvrConfig(false)} className="btn-secondary text-xs py-2 px-3">Cancelar</button>
              <button onClick={saveRtrvrConfig} className="btn-primary text-xs py-2 px-3">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
