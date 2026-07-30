'use client'

import { useState, useEffect } from 'react'
import { 
  Globe, Search, MapPin, Clock, Trash2, Plus,
  Monitor, Wifi, WifiOff, Shield, Eye, Play,
  Pause, Settings, Zap, RefreshCw, X
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
  
  const [mode, setMode] = useState<BrowserMode>('standard')
  const [browserclawConnected, setBrowserclawConnected] = useState(false)
  const [bcSessions, setBcSessions] = useState<BrowserClawSession[]>([])
  
  const [rtrvrApiKey, setRtrvrApiKey] = useState('')
  const [rtrvrTabs, setRtrvrTabs] = useState<RtrvrTab[]>([])
  const [rtrvrMaxTabs, setRtrvrMaxTabs] = useState(10)
  const [showRtrvrConfig, setShowRtrvrConfig] = useState(false)

  useEffect(() => {
    const checkBrowserClaw = async () => {
      try {
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
    window.open(targetUrl, '_blank')
    setHistory(prev => [targetUrl, ...prev.filter(h => h !== targetUrl)].slice(0, 20))
    setUrl('')
  }

  const addRtrvrTab = async (targetUrl: string) => {
    if (rtrvrTabs.length >= rtrvrMaxTabs) return
    const newTab: RtrvrTab = {
      id: Date.now().toString(),
      url: targetUrl,
      status: 'running',
      progress: 0
    }
    setRtrvrTabs(prev => [...prev, newTab])
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 500))
      setRtrvrTabs(prev => prev.map(t => 
        t.id === newTab.id ? { ...t, progress: i } : t
      ))
    }
    setRtrvrTabs(prev => prev.map(t => 
      t.id === newTab.id ? { ...t, status: 'completed', progress: 100 } : t
    ))
  }

  const addSite = () => {
    if (!newSiteName || !newSiteUrl) return
    const fullUrl = newSiteUrl.startsWith('http') ? newSiteUrl : 'https://' + newSiteUrl
    setSites(prev => [...prev, { nome: newSiteName, url: fullUrl, icon: Globe }])
    setNewSiteName('')
    setNewSiteUrl('')
    setShowAddSite(false)
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-subtle)' }}>
      {/* Sidebar */}
      <div className="w-80 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--bg)' }}>
        {/* Mode Selector */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-2">
            {([
              { id: 'standard' as const, label: 'Standard', icon: Globe, color: 'var(--fg)' },
              { id: 'browserclaw' as const, label: 'BrowserClaw', icon: Monitor, color: 'var(--green)' },
              { id: 'rtrvr' as const, label: 'rtrvr.ai', icon: Zap, color: 'var(--blue)' },
            ]).map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: mode === m.id ? m.color : 'var(--bg-muted)',
                  color: mode === m.id ? 'white' : 'var(--fg-muted)'
                }}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          {mode === 'browserclaw' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ 
                background: browserclawConnected ? 'rgba(52, 211, 153, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                border: `1px solid ${browserclawConnected ? 'rgba(52, 211, 153, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`
              }}>
                {browserclawConnected ? (
                  <Wifi className="w-5 h-5" style={{ color: 'var(--green)' }} />
                ) : (
                  <WifiOff className="w-5 h-5" style={{ color: 'var(--red)' }} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: browserclawConnected ? 'var(--green)' : 'var(--red)' }}>
                    {browserclawConnected ? 'BrowserClaw Conectado' : 'BrowserClaw Off'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                    {browserclawConnected ? 'Sessoes autenticadas disponiveis' : 'Porta 9222 nao encontrada'}
                  </p>
                </div>
              </div>
              {!browserclawConnected && (
                <div className="p-3 rounded-xl text-xs space-y-2" style={{ 
                  background: 'var(--bg-muted)', 
                  border: '1px solid var(--border)',
                  color: 'var(--fg-muted)'
                }}>
                  <p className="font-semibold" style={{ color: 'var(--fg)' }}>Para ativar o BrowserClaw:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Fechhe todos os Chrome abertos</li>
                    <li>Abra o terminal e execute:</li>
                  </ol>
                  <code className="block p-2 rounded-lg text-xs" style={{ background: 'var(--bg)', color: 'var(--green)', wordBreak: 'break-all' }}>
                    chrome.exe --remote-debugging-port=9222
                  </code>
                  <p>Usara seus logins salvos (LinkedIn, CRM, etc.)</p>
                </div>
              )}
            </div>
          )}
          
          {mode === 'rtrvr' && (
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ 
              background: rtrvrApiKey ? 'rgba(34, 211, 238, 0.08)' : 'rgba(251, 191, 36, 0.08)',
              border: `1px solid ${rtrvrApiKey ? 'rgba(34, 211, 238, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`
            }}>
              <Zap className="w-5 h-5" style={{ color: rtrvrApiKey ? 'var(--blue)' : 'var(--orange)' }} />
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: rtrvrApiKey ? 'var(--blue)' : 'var(--orange)' }}>
                  {rtrvrApiKey ? 'rtrvr.ai Ativo' : 'rtrvr.ai Nao Configurado'}
                </p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  {rtrvrApiKey ? `${rtrvrTabs.length}/${rtrvrMaxTabs} abas ativas` : 'Configure sua API key'}
                </p>
              </div>
              <button onClick={() => setShowRtrvrConfig(true)} className="btn-icon" style={{ width: '36px', height: '36px' }}>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          )}

          {mode === 'standard' && (
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ 
              background: 'rgba(249, 115, 22, 0.08)',
              border: '1px solid rgba(249, 115, 22, 0.2)'
            }}>
              <Globe className="w-5 h-5" style={{ color: 'var(--fg)' }} />
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--fg)' }}>Navegador Standard</p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>Abre sites na sua aba do navegador</p>
              </div>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--fg-muted)' }} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && url && openUrl(url)}
              placeholder="Digite uma URL..."
              className="input-field text-sm pl-12"
              style={{ minHeight: '52px' }}
            />
          </div>
        </div>

        {/* Saved Sites */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Sites Salvos</h3>
            <button onClick={() => setShowAddSite(!showAddSite)} className="btn-icon" style={{ width: '36px', height: '36px', color: 'var(--fg)' }}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {showAddSite && (
            <div className="space-y-2 mb-3">
              <input type="text" value={newSiteName} onChange={(e) => setNewSiteName(e.target.value)} placeholder="Nome do site" className="input-field text-sm" />
              <input type="text" value={newSiteUrl} onChange={(e) => setNewSiteUrl(e.target.value)} placeholder="https://..." className="input-field text-sm"
                onKeyDown={(e) => e.key === 'Enter' && addSite()} />
              <button onClick={addSite} className="btn-primary w-full text-sm py-3">Salvar Site</button>
            </div>
          )}

          <div className="space-y-2">
            {sites.map((site) => {
              const Icon = site.icon
              return (
                <div key={site.url} className="flex items-center gap-2 group">
                  <button onClick={() => openUrl(site.url)} className="flex-1 flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:border-[var(--fg)]" style={{ border: '1px solid var(--border)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--blue)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{site.nome}</span>
                  </button>
                  <button onClick={() => setSites(prev => prev.filter(s => s.url !== site.url))} className="btn-icon opacity-0 group-hover:opacity-100" style={{ width: '32px', height: '32px' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--fg-muted)' }}>Historico</h3>
          {history.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Nenhum site visitado</p>
          ) : (
            <div className="space-y-1">
              {history.map((h, i) => (
                <button key={i} onClick={() => openUrl(h)} className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left hover:bg-[var(--bg-inset)]">
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--fg-muted)' }} />
                  <span className="text-sm truncate" style={{ color: 'var(--fg-muted)' }}>{h}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: 'var(--bg-muted)' }}>
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ 
            background: mode === 'browserclaw' ? 'rgba(52, 211, 153, 0.1)' : 
                        mode === 'rtrvr' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(249, 115, 22, 0.1)'
          }}>
            {mode === 'browserclaw' ? (
              <Monitor className="w-10 h-10" style={{ color: 'var(--green)' }} />
            ) : mode === 'rtrvr' ? (
              <Zap className="w-10 h-10" style={{ color: 'var(--blue)' }} />
            ) : (
              <Globe className="w-10 h-10" style={{ color: 'var(--fg)' }} />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>
            {mode === 'browserclaw' ? 'BrowserClaw' : mode === 'rtrvr' ? 'rtrvr.ai' : 'Navegador'}
          </h2>
          <p className="text-base mb-6" style={{ color: 'var(--fg-muted)' }}>
            {mode === 'browserclaw' 
              ? 'Acesse sites com suas sessoes ja autenticadas'
              : mode === 'rtrvr'
              ? 'Automacao multi-aba com Gemini Flash'
              : 'Digite uma URL ou selecione um site salvo'}
          </p>
          
          <div className="card p-5 text-left">
            <p className="text-sm font-bold mb-3" style={{ color: 'var(--fg)' }}>
              {mode === 'browserclaw' ? 'Como funciona:' : mode === 'rtrvr' ? 'Recursos:' : 'Como usar:'}
            </p>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--fg-muted)' }}>
              {mode === 'browserclaw' ? (
                <>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                    <span>Usa seus logins salvos (LinkedIn, CRM, SEO)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                    <span>Executa na sua maquina local</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Eye className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                    <span>Gravacao de sessao para auditoria</span>
                  </li>
                </>
              ) : mode === 'rtrvr' ? (
                <>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }} />
                    <span>Multi-aba simultaneas (ate {rtrvrMaxTabs})</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }} />
                    <span>Smart DOM Trees (baixo custo de tokens)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold" style={{ color: 'var(--blue)' }}>$</span>
                    <span>Gemini Flash - $0.12 por tarefa</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold" style={{ color: 'var(--fg)' }}>1.</span>
                    <span>Digite uma URL no campo de busca</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold" style={{ color: 'var(--blue)' }}>2.</span>
                    <span>O site abre na sua aba do navegador</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg font-bold" style={{ color: 'var(--green)' }}>3.</span>
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
          <div className="card w-full max-w-md">
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="font-bold text-lg" style={{ color: 'var(--fg)' }}>Configurar rtrvr.ai</h3>
              <button onClick={() => setShowRtrvrConfig(false)} className="btn-icon" style={{ width: '36px', height: '36px' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>API Key (Gemini Flash)</label>
                <input type="password" value={rtrvrApiKey} onChange={(e) => setRtrvrApiKey(e.target.value)} className="input-field text-sm" placeholder="Cole sua API key..." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>Max Abas Simultaneas</label>
                <input type="number" value={rtrvrMaxTabs} onChange={(e) => setRtrvrMaxTabs(parseInt(e.target.value) || 10)} className="input-field text-sm" min={1} max={20} />
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(34, 211, 238, 0.08)', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                <p className="text-sm" style={{ color: 'var(--blue)' }}>
                  <strong>Custo estimado:</strong> ~$0.12 por tarefa automatizada
                </p>
              </div>
            </div>
            <div className="p-5 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setShowRtrvrConfig(false)} className="btn-secondary text-sm py-3 px-5">Cancelar</button>
              <button onClick={saveRtrvrConfig} className="btn-primary text-sm py-3 px-5">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
