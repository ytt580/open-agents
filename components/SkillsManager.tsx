'use client'

import { useState } from 'react'
import { 
  Plus, Trash2, Edit3, Copy, Code2, FileCode, Play,
  Save, Zap, Globe, Mail, Search, Settings, ChevronDown
} from 'lucide-react'

interface Skill {
  id: string
  nome: string
  descricao: string
  categoria: 'scraping' | 'analise' | 'criacao' | 'envio' | 'navegacao' | 'custom'
  codigo: string
  ativo: boolean
  uso: number
}

const categorias = {
  scraping: { label: 'Scraping', icon: Search, cor: 'var(--green)', bg: 'rgba(52, 211, 153, 0.08)' },
  analise: { label: 'Analise', icon: Code2, cor: 'var(--accent)', bg: 'var(--accent-glow)' },
  criacao: { label: 'Criacao', icon: Zap, cor: 'var(--cyan)', bg: 'rgba(34, 211, 238, 0.08)' },
  envio: { label: 'Envio', icon: Mail, cor: 'var(--rose-400)', bg: 'rgba(244, 63, 94, 0.08)' },
  navegacao: { label: 'Navegacao', icon: Globe, cor: 'var(--violet-300)', bg: 'var(--accent-glow)' },
  custom: { label: 'Custom', icon: Settings, cor: 'var(--text-secondary)', bg: 'var(--bg-alt)' },
}

const defaultSkills: Skill[] = [
  { id: '1', nome: 'Google Maps Scraper', descricao: 'Busca negocios no Google Maps por criterio e localizacao', categoria: 'scraping',
    codigo: `async function googleMapsScraper(criterio, localizacao) {\n  const page = await browser.newPage()\n  await page.goto('https://www.google.com/maps')\n  await page.fill('input[name=q]', criterio + ' em ' + localizacao)\n  await page.press('input[name=q]', 'Enter')\n  await page.waitForSelector('.Nv2PK')\n  const leads = await page.evaluate(() => {\n    const cards = document.querySelectorAll('.Nv2PK')\n    return Array.from(cards).map(card => ({\n      nome: card.querySelector('.qBF1Pd')?.textContent,\n      nota: card.querySelector('.MW4etd')?.textContent\n    }))\n  })\n  return leads\n}`,
    ativo: true, uso: 47 },
  { id: '2', nome: 'Website Analyzer', descricao: 'Analisa site e identifica problemas de SEO, design e performance', categoria: 'analise',
    codigo: `async function analyzeWebsite(url) {\n  const page = await browser.newPage()\n  await page.goto(url, { waitUntil: 'networkidle' })\n  const analysis = await page.evaluate(() => ({\n    title: document.title,\n    h1Count: document.querySelectorAll('h1').length\n  }))\n  return analysis\n}`,
    ativo: true, uso: 32 },
  { id: '3', nome: 'Site Generator', descricao: 'Cria site melhorado baseado em analise', categoria: 'criacao',
    codigo: `async function generateImprovedSite(data) {\n  return \`<!DOCTYPE html><html><head><title>\${data.nome}</title></head><body>...</body></html>\`\n}`,
    ativo: true, uso: 28 },
  { id: '4', nome: 'WhatsApp Sender', descricao: 'Envia mensagens via WhatsApp Web', categoria: 'envio',
    codigo: `async function sendWhatsApp(telefone, mensagem) {\n  const page = await browser.newPage()\n  await page.goto('https://web.whatsapp.com/send?phone=55' + telefone)\n  await page.fill('[data-testid=conversation-compose-box-input]', mensagem)\n  await page.click('[data-testid=send]')\n  return { success: true }\n}`,
    ativo: true, uso: 15 },
  { id: '5', nome: 'Auto Login Handler', descricao: 'Detecta e resolve login/captcha automaticamente', categoria: 'navegacao',
    codigo: `async function handleLogin(page, selectors) {\n  const loginForm = await page.$(selectors.login)\n  if (loginForm) {\n    await page.fill(selectors.email, process.env.EMAIL)\n    await page.fill(selectors.password, process.env.PASSWORD)\n    await page.click(selectors.submit)\n  }\n  return { loggedIn: true }\n}`,
    ativo: true, uso: 8 },
  { id: '6', nome: 'Vercel Publisher', descricao: 'Publica site na Vercel via API', categoria: 'envio',
    codigo: `async function publishToVercel(projectPath, token) {\n  const { exec } = require('child_process')\n  const { stdout } = await execAsync('vercel --prod --yes', { cwd: projectPath })\n  return { success: true, url: stdout.match(/https:\\/\\/[^\\s]+/)?.[0] }\n}`,
    ativo: false, uso: 12 },
]

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills)
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [newSkill, setNewSkill] = useState({ nome: '', descricao: '', categoria: 'custom' as keyof typeof categorias, codigo: '' })

  const handleSaveSkill = () => {
    if (!newSkill.nome || !newSkill.codigo) return
    setSkills(prev => [...prev, { id: Date.now().toString(), ...newSkill, ativo: true, uso: 0 }])
    setNewSkill({ nome: '', descricao: '', categoria: 'custom', codigo: '' })
    setShowModal(false)
  }

  const handleUpdateSkill = () => {
    if (!editingSkill) return
    setSkills(prev => prev.map(s => s.id === editingSkill.id ? editingSkill : s))
    setEditingSkill(null)
  }

  const handleDelete = (id: string) => setSkills(prev => prev.filter(s => s.id !== id))
  const handleEdit = (skill: Skill) => { setEditingSkill(skill); setShowModal(true) }
  const handleNew = () => { setEditingSkill(null); setNewSkill({ nome: '', descricao: '', categoria: 'custom', codigo: '' }); setShowModal(true) }
  const filteredSkills = skills.filter(s => filter === 'all' || s.categoria === filter)

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-void)' }}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
            <FileCode className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: 'var(--fg)' }}>Skills</h1>
            <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{skills.length} skills - {skills.filter(s => s.ativo).length} ativas</p>
          </div>
        </div>
        <button onClick={handleNew} className="btn-primary text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" />
          Nova Skill
        </button>
      </div>

      <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <div className="flex gap-1.5 flex-wrap">
          {(['all', 'scraping', 'analise', 'criacao', 'envio', 'navegacao', 'custom'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-2.5 py-1 rounded-md text-[10px] font-medium transition-all"
              style={{
                background: filter === cat ? 'var(--accent)' : 'var(--bg-alt)',
                color: filter === cat ? 'white' : 'var(--fg-subtle)',
              }}
            >
              {cat === 'all' ? 'Todas' : categorias[cat as keyof typeof categorias].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12">
            <FileCode className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--border)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Nenhuma skill encontrada</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--fg-subtle)' }}>Crie sua primeira skill ou ajuste os filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const cat = categorias[skill.categoria as keyof typeof categorias]
              const Icon = cat.icon
              
              return (
                <div key={skill.id} className="card p-3.5 transition-all duration-200 hover:border-[var(--violet-500)]" style={{ opacity: skill.ativo ? 1 : 0.6 }}>
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="p-2 rounded-lg" style={{ background: cat.bg }}>
                      <Icon className="w-4 h-4" style={{ color: cat.cor }} />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button onClick={() => handleEdit(skill)} className="p-1 rounded hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }} title="Editar">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, ativo: !s.ativo } : s))}
                        className="w-8 h-4 rounded-full transition-colors relative"
                        style={{ background: skill.ativo ? 'var(--emerald-500)' : 'var(--border)' }}
                        title={skill.ativo ? 'Desativar' : 'Ativar'}
                      >
                        <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform" style={{ transform: `translateX(${skill.ativo ? '16px' : '2px'})` }} />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="p-1 rounded hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }} title="Excluir">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-xs mb-0.5" style={{ color: 'var(--fg)' }}>{skill.nome}</h3>
                  <p className="text-[10px] mb-2 line-clamp-2" style={{ color: 'var(--fg-subtle)' }}>{skill.descricao}</p>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium" style={{ background: cat.bg, color: cat.cor }}>{cat.label}</span>
                    <span className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{skill.uso} usos</span>
                  </div>

                  <div className="rounded-lg p-2 max-h-28 overflow-y-auto" style={{ background: 'var(--bg-alt)' }}>
                    <pre className="text-[9px] font-mono overflow-x-auto" style={{ color: 'var(--fg-subtle)' }}>
                      {skill.codigo.substring(0, 300)}{skill.codigo.length > 300 ? '...' : ''}
                    </pre>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
                    <button className="flex-1 py-1.5 rounded-md text-[10px] transition-colors flex items-center justify-center gap-1 hover:bg-[var(--bg-alt)]" style={{ background: 'var(--bg-alt)', color: 'var(--fg-subtle)' }}>
                      <Copy className="w-3 h-3" />Copiar
                    </button>
                    <button className="flex-1 py-1.5 rounded-md text-[10px] transition-colors flex items-center justify-center gap-1" style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>
                      <Play className="w-3 h-3" />Testar
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="card w-full max-w-2xl max-h-[85vh] flex flex-col" style={{ boxShadow: '0 0 40px var(--accent-glow)' }}>
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{editingSkill ? 'Editar Skill' : 'Nova Skill'}</h2>
              <button onClick={() => { setShowModal(false); setEditingSkill(null); }} className="p-1 rounded hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }}>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Nome</label>
                <input type="text" value={editingSkill?.nome || newSkill.nome}
                  onChange={(e) => editingSkill ? setEditingSkill({...editingSkill, nome: e.target.value}) : setNewSkill({...newSkill, nome: e.target.value})}
                  className="input-field text-xs" placeholder="Ex: Meu Scraper Personalizado" />
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Descricao</label>
                <textarea value={editingSkill?.descricao || newSkill.descricao} rows={2}
                  onChange={(e) => editingSkill ? setEditingSkill({...editingSkill, descricao: e.target.value}) : setNewSkill({...newSkill, descricao: e.target.value})}
                  className="input-field text-xs resize-none" placeholder="O que esta skill faz..." />
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Categoria</label>
                <div className="flex gap-1.5 flex-wrap">
                  {(['scraping', 'analise', 'criacao', 'envio', 'navegacao', 'custom'] as const).map((catKey) => {
                    const catData = categorias[catKey]
                    const Icon = catData.icon
                    const isSelected = editingSkill?.categoria === catKey || newSkill.categoria === catKey
                    return (
                      <button key={catKey}
                        onClick={() => editingSkill ? setEditingSkill({...editingSkill, categoria: catKey}) : setNewSkill({...newSkill, categoria: catKey})}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border transition-all text-[10px]"
                        style={{
                          borderColor: isSelected ? 'var(--violet-500)' : 'var(--border)',
                          background: isSelected ? 'var(--accent-glow)' : 'transparent',
                          color: isSelected ? 'var(--accent)' : 'var(--fg-subtle)',
                        }}>
                        <Icon className="w-3 h-3" />{catData.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Codigo (JavaScript/TypeScript)</label>
                <textarea value={editingSkill?.codigo || newSkill.codigo} rows={12}
                  onChange={(e) => editingSkill ? setEditingSkill({...editingSkill, codigo: e.target.value}) : setNewSkill({...newSkill, codigo: e.target.value})}
                  className="input-field text-[10px] font-mono resize-none" placeholder="// Sua funcao async aqui" spellCheck={false} />
              </div>
            </div>

            <div className="p-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={() => { setShowModal(false); setEditingSkill(null); }} className="btn-secondary text-xs py-2 px-3">Cancelar</button>
              <button onClick={editingSkill ? handleUpdateSkill : handleSaveSkill} className="btn-primary text-xs py-2 px-3">
                <Save className="w-3.5 h-3.5" />
                {editingSkill ? 'Salvar' : 'Criar Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
