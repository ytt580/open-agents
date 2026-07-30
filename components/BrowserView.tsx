'use client'

import { useState } from 'react'
import { Globe, Search, MapPin, Clock, Trash2, Plus } from 'lucide-react'

interface SavedSite {
  nome: string
  url: string
  icon: any
}

const defaultSites: SavedSite[] = [
  { nome: 'Google Maps', url: 'https://www.google.com/maps', icon: MapPin },
  { nome: 'Google', url: 'https://www.google.com', icon: Search },
]

export function BrowserView() {
  const [url, setUrl] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [sites, setSites] = useState<SavedSite[]>(defaultSites)
  const [showAddSite, setShowAddSite] = useState(false)
  const [newSiteName, setNewSiteName] = useState('')
  const [newSiteUrl, setNewSiteUrl] = useState('')

  const openUrl = (targetUrl: string) => {
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl
    window.open(targetUrl, '_blank')
    setHistory(prev => [targetUrl, ...prev.filter(h => h !== targetUrl)].slice(0, 20))
    setUrl('')
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
      <div className="w-64 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <div className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && url && openUrl(url)}
              placeholder="Digite uma URL..."
              className="input-field text-xs pl-8"
            />
          </div>
        </div>

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
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34, 211, 238, 0.08)' }}>
            <Globe className="w-8 h-8" style={{ color: 'var(--cyan-400)' }} />
          </div>
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Navegador</h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Digite uma URL acima ou selecione um site salvo para abrir em nova aba
          </p>
          <div className="card p-3 text-left">
            <p className="text-[10px] font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Como funciona:</p>
            <ul className="space-y-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
