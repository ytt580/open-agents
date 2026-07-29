'use client'

import { useState, useRef } from 'react'
import { 
  Globe, 
  Loader2, 
  Trash2, 
  Terminal,
  RefreshCw,
  Search,
  MapPin,
  Zap,
  Wifi,
  Shield
} from 'lucide-react'

const popularSites = [
  { nome: 'Google Maps', url: 'https://www.google.com/maps', icon: MapPin },
  { nome: 'Google', url: 'https://www.google.com', icon: Search },
  { nome: 'LinkedIn', url: 'https://www.linkedin.com', icon: Wifi },
  { nome: 'GitHub', url: 'https://github.com', icon: Shield },
]

export function BrowserView() {
  const [url, setUrl] = useState('https://www.google.com/maps')
  const [isLoading, setIsLoading] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[Sistema] Navegador pronto para automacao',
    '[Sistema] IA pode acessar este navegador',
    '[Dica] Use a sidebar para abrir sites populares'
  ])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleLoad = () => {
    setIsLoading(false)
    addLog(`[OK] Carregado: ${url}`)
  }

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setConsoleLogs(prev => [...prev, `[${timestamp}] ${msg}`].slice(-100))
  }

  const navigate = (newUrl: string) => {
    if (!newUrl.startsWith('http')) newUrl = 'https://' + newUrl
    setUrl(newUrl)
    setIsLoading(true)
    addLog(`[>] Navegando para: ${newUrl}`)
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar - Sites Populares */}
      <div className="w-72 flex flex-col" style={{ borderRight: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Globe className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            Sites Populares
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {popularSites.map((site) => {
            const Icon = site.icon
            return (
              <button key={site.url} onClick={() => navigate(site.url)} className="w-full p-3 rounded-xl text-left transition-all duration-200" style={{ border: '1px solid var(--border)' }}>
                <Icon className="w-5 h-5 mb-2" style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{site.nome}</span>
              </button>
            )
          })}
        </div>
        <div className="p-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--sage)15' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--sage)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--sage-dark)' }}>IA Online</span>
          </div>
        </div>
      </div>

      {/* Main Browser Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Address Bar */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(url)}
                placeholder="Digite URL ou pesquise..."
                className="input-field pl-12"
              />
            </div>
            <button onClick={() => navigate(url)} disabled={isLoading} className="btn-primary disabled:opacity-50">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            </button>
            <button onClick={() => { if (iframeRef.current) iframeRef.current.src = url; setIsLoading(true); }} className="btn-secondary p-3">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={() => setShowConsole(!showConsole)} className="btn-secondary p-3" style={showConsole ? { background: 'var(--accent-glow)', borderColor: 'var(--accent)' } : {}}>
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Area */}
        <div className="flex-1 relative min-h-0">
          <iframe ref={iframeRef} src={url} onLoad={handleLoad} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads" />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: 'var(--bg-primary)' }}>
              <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Carregando...</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{url}</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 right-4 z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--sage)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--sage-dark)' }}>IA pode acessar</span>
            </div>
          </div>
        </div>

        {/* Console */}
        {showConsole && (
          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }} className="h-64 flex flex-col">
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <h4 className="font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Terminal className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                Console do Navegador
              </h4>
              <button onClick={() => setConsoleLogs([])} className="p-1 rounded transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1" style={{ color: 'var(--text-tertiary)' }}>
              {consoleLogs.map((log, i) => (
                <div key={i} className="font-mono text-xs break-all">{log}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}