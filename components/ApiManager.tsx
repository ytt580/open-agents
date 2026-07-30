'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Trash2, Edit3, Key, Eye, EyeOff,
  Copy, Check, Bot, Zap, Globe, Lock,
  ExternalLink, AlertCircle
} from 'lucide-react'

interface ApiKey {
  id: string
  nome: string
  provedor: 'openai' | 'anthropic' | 'google' | 'outro'
  chave: string
  ativo: boolean
  usoHoje: number
  limiteDiario: number
}

const provedores = {
  openai: { label: 'OpenAI (GPT-4/5)', icon: Bot, cor: 'var(--green)', bg: 'rgba(52, 211, 153, 0.08)', url: 'https://platform.openai.com/api-keys' },
  anthropic: { label: 'Anthropic (Claude)', icon: Bot, cor: 'var(--cyan)', bg: 'rgba(34, 211, 238, 0.08)', url: 'https://console.anthropic.com/' },
  google: { label: 'Google (Gemini)', icon: Globe, cor: 'var(--blue)', bg: 'rgba(59, 130, 246, 0.08)', url: 'https://aistudio.google.com/apikey' },
  outro: { label: 'Outro', icon: Key, cor: 'var(--fg-muted)', bg: 'var(--bg-alt)', url: '' },
}

const STORAGE_KEY = 'open-agents-api-keys'

function loadKeys(): ApiKey[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return [
    { id: '1', nome: 'OpenAI GPT-4/5', provedor: 'openai', chave: '', ativo: true, usoHoje: 0, limiteDiario: 100 },
  ]
}

function saveKeys(keys: ApiKey[]) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(keys)) } catch {}
}

export function ApiManager() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loaded, setLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<ApiKey | null>(null)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [form, setForm] = useState({ nome: '', provedor: 'openai' as keyof typeof provedores, chave: '' })

  useEffect(() => { setKeys(loadKeys()); setLoaded(true) }, [])
  useEffect(() => { if (loaded) saveKeys(keys) }, [keys, loaded])

  const handleSave = () => {
    if (!form.nome || !form.chave) return
    if (editing) {
      setKeys(prev => prev.map(k => k.id === editing.id ? { ...k, ...form } : k))
    } else {
      setKeys(prev => [...prev, { id: Date.now().toString(), ...form, ativo: true, usoHoje: 0, limiteDiario: 100 }])
    }
    closeModal()
  }

  const closeModal = () => { setShowModal(false); setEditing(null); setForm({ nome: '', provedor: 'openai', chave: '' }) }

  const handleEdit = (key: ApiKey) => { setEditing(key); setForm({ nome: key.nome, provedor: key.provedor, chave: key.chave }); setShowModal(true) }
  const handleDelete = (id: string) => { if (confirm('Excluir esta API key?')) setKeys(prev => prev.filter(k => k.id !== id)) }
  const handleCopy = (chave: string, id: string) => { navigator.clipboard.writeText(chave); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000) }
  const toggleShowKey = (id: string) => setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--bg-void)' }}>
        <div className="animate-pulse text-xs" style={{ color: 'var(--text-muted)' }}>Carregando...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-void)' }}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(244, 63, 94, 0.08)' }}>
            <Key className="w-5 h-5" style={{ color: 'var(--red)' }} />
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>APIs de IA</h1>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{keys.length} chaves configuradas</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>
      </div>

      <div className="px-4 py-2" style={{ borderBottom: '1px solid rgba(52, 211, 153, 0.15)', background: 'rgba(52, 211, 153, 0.03)' }}>
        <div className="flex items-start gap-2 p-2.5 rounded-lg" style={{ background: 'rgba(52, 211, 153, 0.04)', border: '1px solid rgba(52, 211, 153, 0.12)' }}>
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
          <p className="text-[10px]" style={{ color: 'var(--green)' }}>
            <strong>Salvo automaticamente:</strong> Chaves persistem no navegador. Para producao, use variaveis de ambiente no servidor.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {keys.length === 0 ? (
          <div className="text-center py-12">
            <Key className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--border)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Nenhuma API key configurada</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Adicione uma chave para comecar a usar IA</p>
          </div>
        ) : (
          <div className="space-y-2">
            {keys.map((key) => {
              const prov = provedores[key.provedor]
              const Icon = prov.icon
              const showKey = showKeys[key.id]
              
              return (
                <div key={key.id} className="card p-3.5 transition-all duration-200 hover:border-[var(--accent)]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: prov.bg }}>
                      <Icon className="w-4 h-4" style={{ color: prov.cor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{key.nome}</h3>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{
                          background: key.ativo ? 'rgba(52, 211, 153, 0.1)' : 'var(--bg-secondary)',
                          color: key.ativo ? 'var(--green)' : 'var(--text-muted)'
                        }}>
                          {key.ativo ? 'Ativa' : 'Inativa'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: prov.bg, color: prov.cor }}>
                          {prov.label}
                        </span>
                      </div>
                      
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Lock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                        <code className="px-2 py-1 rounded text-[10px] font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                          {showKey ? key.chave : key.chave.substring(0, 8) + '••••••••••••••••'}
                        </code>
                        <button onClick={() => toggleShowKey(key.id)} className="p-0.5 hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                          {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button onClick={() => handleCopy(key.chave, key.id)} className="p-0.5 hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                          {copiedId === key.id ? <Check className="w-3 h-3" style={{ color: 'var(--green)' }} /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-3 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        <span>Uso: <strong style={{ color: 'var(--text-primary)' }}>{key.usoHoje}</strong>/{key.limiteDiario}</span>
                        <div className="flex-1 max-w-[200px] h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                          <div className="h-full rounded-full" style={{ 
                            background: 'linear-gradient(90deg, var(--accent), var(--cyan))', 
                            width: `${Math.min((key.usoHoje / key.limiteDiario) * 100, 100)}%` 
                          }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button onClick={() => setKeys(prev => prev.map(k => k.id === key.id ? {...k, ativo: !k.ativo} : k))} className="p-1.5 rounded hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }} title={key.ativo ? 'Desativar' : 'Ativar'}>
                        {key.ativo ? <Zap className="w-3.5 h-3.5" style={{ color: 'var(--green)' }} /> : <Zap className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleEdit(key)} className="p-1.5 rounded hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }} title="Editar">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(key.id)} className="p-1.5 rounded hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }} title="Excluir">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-md" style={{ boxShadow: '0 0 40px var(--accent-glow)' }}>
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{editing ? 'Editar API Key' : 'Nova API Key'}</h2>
              <button onClick={closeModal} className="p-1 rounded hover:bg-[var(--surface-hover)]" style={{ color: 'var(--text-muted)' }}>X</button>
            </div>
            <div className="p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Nome</label>
                <input type="text" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="input-field text-xs" placeholder="Ex: OpenAI Producao" />
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Provedor</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(Object.keys(provedores) as Array<keyof typeof provedores>).map((p) => {
                    const prov = provedores[p]
                    const Icon = prov.icon
                    return (
                      <button key={p} onClick={() => setForm({...form, provedor: p})} className="flex items-center gap-1.5 p-2 rounded-lg border transition-all text-left" style={{
                        borderColor: form.provedor === p ? 'var(--accent)' : 'var(--border)',
                        background: form.provedor === p ? 'var(--accent-glow)' : 'transparent',
                        color: form.provedor === p ? 'var(--accent)' : 'var(--text-muted)',
                      }}>
                        <Icon className="w-3 h-3 flex-shrink-0" />
                        <span className="text-[10px]">{prov.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>API Key</label>
                <input type="password" value={form.chave} onChange={(e) => setForm({...form, chave: e.target.value})} className="input-field text-xs font-mono" placeholder="sk-..." />
              </div>
              {provedores[form.provedor].url && (
                <a href={provedores[form.provedor].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] hover:opacity-70" style={{ color: 'var(--accent)' }}>
                  <ExternalLink className="w-3 h-3" />
                  Obter API key em {provedores[form.provedor].label}
                </a>
              )}
            </div>
            <div className="p-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={closeModal} className="btn-secondary text-xs py-2 px-3">Cancelar</button>
              <button onClick={handleSave} disabled={!form.nome || !form.chave} className="btn-primary text-xs py-2 px-3 disabled:opacity-50">
                <Key className="w-3.5 h-3.5" />
                {editing ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
