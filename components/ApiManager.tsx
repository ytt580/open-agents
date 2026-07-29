'use client'

import { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Key, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Bot,
  Zap,
  Globe,
  Lock,
  ExternalLink,
  AlertCircle
} from 'lucide-react'

interface ApiKey {
  id: string
  nome: string
  provedor: 'openai' | 'anthropic' | 'google' | 'modal' | 'outro'
  chave: string
  ativo: boolean
  usoHoje: number
  limiteDiario: number
}

const provedores = {
  openai: { label: 'OpenAI (GPT-4/5)', icon: Bot, cor: 'var(--neon)', bg: 'rgba(6, 214, 160, 0.15)', url: 'https://platform.openai.com/api-keys' },
  anthropic: { label: 'Anthropic (Claude)', icon: Bot, cor: 'var(--accent)', bg: 'var(--accent-glow)', url: 'https://console.anthropic.com/' },
  google: { label: 'Google (Gemini)', icon: Globe, cor: 'var(--cyan)', bg: 'rgba(34, 211, 238, 0.15)', url: 'https://aistudio.google.com/apikey' },
  modal: { label: 'Bluesminds (Kimi K3)', icon: Zap, cor: 'var(--pink)', bg: 'rgba(244, 114, 182, 0.15)', url: '' },
  outro: { label: 'Outro', icon: Key, cor: 'var(--text-secondary)', bg: 'var(--bg-secondary)', url: '' },
}

export function ApiManager() {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', nome: 'Bluesminds Kimi K3', provedor: 'modal', chave: 'sk-kHPpzsSnsB3qFGzLHc5faG2KDkOfXY16U7rTnzNDvIMiuc1l', ativo: true, usoHoje: 47, limiteDiario: 1000 },
    { id: '2', nome: 'OpenAI Principal', provedor: 'openai', chave: 'sk-proj-xxxxx...xxxxx', ativo: true, usoHoje: 23, limiteDiario: 1000 },
    { id: '3', nome: 'Claude Pro', provedor: 'anthropic', chave: 'sk-ant-xxxxx...xxxxx', ativo: true, usoHoje: 15, limiteDiario: 500 },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<ApiKey | null>(null)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [form, setForm] = useState({ nome: '', provedor: 'openai' as keyof typeof provedores, chave: '' })

  const handleSave = () => {
    if (!form.nome || !form.chave) return
    
    if (editing) {
      setKeys(prev => prev.map(k => k.id === editing.id ? { ...k, ...form } : k))
    } else {
      setKeys(prev => [...prev, { 
        id: Date.now().toString(), 
        ...form, 
        ativo: true, 
        usoHoje: 0, 
        limiteDiario: 100 
      }])
    }
    closeModal()
  }

  const closeModal = () => {
    setShowModal(false)
    setEditing(null)
    setForm({ nome: '', provedor: 'openai', chave: '' })
  }

  const handleEdit = (key: ApiKey) => {
    setEditing(key)
    setForm({ nome: key.nome, provedor: key.provedor, chave: key.chave })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Excluir esta API key?')) {
      setKeys(prev => prev.filter(k => k.id !== id))
    }
  }

  const handleCopy = (chave: string, id: string) => {
    navigator.clipboard.writeText(chave)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244, 114, 182, 0.15)' }}>
            <Key className="w-6 h-6" style={{ color: 'var(--pink)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>APIs de IA</h1>
            <p style={{ color: 'var(--text-tertiary)' }}>{keys.length} chaves configuradas</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Adicionar API Key
        </button>
      </div>

      {/* Aviso */}
      <div className="px-6 py-3" style={{ borderBottom: '1px solid rgba(6, 214, 160, 0.3)', background: 'rgba(6, 214, 160, 0.05)' }}>
        <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(6, 214, 160, 0.05)', border: '1px solid rgba(6, 214, 160, 0.2)' }}>
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--neon)' }} />
          <div className="text-sm" style={{ color: 'var(--neon)' }}>
            <strong>Seguranca:</strong> As chaves sao salvas localmente no navegador. Para producao, use variaveis de ambiente no servidor. As chaves ficam acessiveis para todos os fluxos e skills que precisem de IA.
          </div>
        </div>
      </div>

      {/* Lista de Keys */}
      <div className="flex-1 overflow-y-auto p-6">
        {keys.length === 0 ? (
          <div className="text-center py-16">
            <Key className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--border)' }} />
            <h3 style={{ color: 'var(--text-primary)' }}>Nenhuma API key configurada</h3>
            <p style={{ color: 'var(--text-tertiary)' }}>Adicione uma chave para comecar a usar IA nos seus fluxos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {keys.map((key) => {
              const prov = provedores[key.provedor]
              const Icon = prov.icon
              const showKey = showKeys[key.id]
              
              return (
                <div key={key.id} className="card p-5 transition-all duration-200 hover:border-[var(--accent)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: prov.bg }}>
                      <Icon className="w-6 h-6" style={{ color: prov.cor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{key.nome}</h3>
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{
                          background: key.ativo ? 'rgba(6, 214, 160, 0.2)' : 'var(--bg-secondary)',
                          color: key.ativo ? 'var(--neon)' : 'var(--text-tertiary)'
                        }}>
                          {key.ativo ? 'Ativa' : 'Inativa'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: prov.bg, color: prov.cor }}>
                          {prov.label}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                        <code className="px-3 py-1.5 rounded-lg text-sm font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>
                          {showKey ? key.chave : key.chave.substring(0, 8) + '••••••••••••••••'}
                        </code>
                        <button onClick={() => toggleShowKey(key.id)} className="p-1 transition-colors hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>
                          {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleCopy(key.chave, key.id)} className="p-1 transition-colors hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>
                          {copiedId === key.id ? <Check className="w-4 h-4" style={{ color: 'var(--neon)' }} /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        <span>Uso hoje: <strong style={{ color: 'var(--text-primary)' }}>{key.usoHoje}</strong> / {key.limiteDiario}</span>
                        <div className="flex-1 max-w-xs h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                          <div className="h-full rounded-full" style={{ 
                            background: 'linear-gradient(90deg, var(--accent), var(--cyan))', 
                            width: `${Math.min((key.usoHoje / key.limiteDiario) * 100, 100)}%` 
                          }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => setKeys(prev => prev.map(k => k.id === key.id ? {...k, ativo: !k.ativo} : k))} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }} title={key.ativo ? 'Desativar' : 'Ativar'}>
                        {key.ativo ? <Zap className="w-5 h-5" style={{ color: 'var(--neon)' }} /> : <Zap className="w-5 h-5" />}
                      </button>
                      <button onClick={() => handleEdit(key)} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }} title="Editar">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(key.id)} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }} title="Excluir">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-lg" style={{ boxShadow: '0 0 60px var(--accent-glow)' }}>
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{editing ? 'Editar API Key' : 'Nova API Key'}</h2>
              <button onClick={closeModal} className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-tertiary)' }}>X</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Nome</label>
                <input type="text" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="input-field" placeholder="Ex: OpenAI Producao" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Provedor</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(provedores) as Array<keyof typeof provedores>).map((p) => {
                    const prov = provedores[p]
                    const Icon = prov.icon
                    return (
                      <button key={p} onClick={() => setForm({...form, provedor: p})} className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all" style={{
                        borderColor: form.provedor === p ? 'var(--accent)' : 'var(--border)',
                        background: form.provedor === p ? 'var(--accent-glow)' : 'transparent',
                        color: form.provedor === p ? 'var(--accent)' : 'var(--text-tertiary)',
                        boxShadow: form.provedor === p ? '0 0 15px var(--accent-glow)' : 'none'
                      }}>
                        <Icon className="w-4 h-4" />
                        {prov.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>API Key</label>
                <input type="password" value={form.chave} onChange={(e) => setForm({...form, chave: e.target.value})} className="input-field font-mono text-sm" placeholder="sk-..." />
              </div>
              {provedores[form.provedor].url && (
                <a href={provedores[form.provedor].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:opacity-70" style={{ color: 'var(--accent)' }}>
                  <ExternalLink className="w-4 h-4" />
                  Obter API key em {provedores[form.provedor].label}
                </a>
              )}
            </div>
            <div className="p-4 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={closeModal} className="btn-secondary">Cancelar</button>
              <button onClick={handleSave} disabled={!form.nome || !form.chave} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Key className="w-5 h-5" />
                {editing ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
