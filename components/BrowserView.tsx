'use client'

import { useState } from 'react'
import { 
  Globe, 
  Search,
  MapPin,
  ExternalLink,
  Clock,
  Trash2,
  Plus
} from 'lucide-react'

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

  const removeSite = (url: string) => {
    setSites(prev => prev.filter(s => s.url !== url))
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div className="w-72 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* Search */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && url && openUrl(url)}
              placeholder="Digite uma URL..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Saved Sites */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Sites Salvos</h3>
            <button onClick={() => setShowAddSite(!showAddSite)} className="p-1 rounded-lg" style={{ color: 'var(--accent)' }}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {showAddSite && (
            <div className="space-y-2 mb-3">
              <input
                type="text"
                value={newSiteName}
                onChange={(e) => setNewSiteName(e.target.value)}
                placeholder="Nome do site"
                className="input-field text-sm"
              />
              <input
                type="text"
                value={newSiteUrl}
                onChange={(e) => setNewSiteUrl(e.target.value)}
                placeholder="URL (ex: google.com)"
                className="input-field text-sm"
                onKeyDown={(e) => e.key === 'Enter' && addSite()}
              />
              <button onClick={addSite} className="btn-primary w-full text-sm py-2">
                Salvar
              </button>
            </div>
          )}

          <div className="space-y-2">
            {sites.map((site) => {
              const Icon = site.icon
              return (
                <div key={site.url} className="flex items-center gap-2 group">
                  <button 
                    onClick={() => openUrl(site.url)} 
                    className="flex-1 flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{site.nome}</span>
                  </button>
                  <button 
                    onClick={() => removeSite(site.url)} 
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Historico</h3>
          {history.length === 0 ? (
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Nenhum site visitado</p>
          ) : (
            <div className="space-y-2">
              {history.map((h, i) => (
                <button 
                  key={i} 
                  onClick={() => openUrl(h)} 
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                  <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{h}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: 'var(--bg-secondary)' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--sage-15)' }}>
            <Globe className="w-10 h-10" style={{ color: 'var(--sage)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Navegador</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Digite uma URL acima ou selecione um site salvo para abrir em uma nova aba
          </p>
          <div className="card p-4 text-left">
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Como funciona:</p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--accent)' }}>1.</span>
                <span>Digite uma URL no campo de busca</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--accent)' }}>2.</span>
                <span>O site abre na sua aba do navegador</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--accent)' }}>3.</span>
                <span>Use o Copilot para automatizar acoes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
