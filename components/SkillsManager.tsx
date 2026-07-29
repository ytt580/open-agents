'use client'

import { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Code2, 
  FileCode,
  Play,
  CheckCircle,
  ExternalLink,
  FolderOpen,
  Save,
  Zap,
  Bot,
  Globe,
  Mail,
  Search,
  Settings,
  ChevronDown,
  ChevronRight
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
  scraping: { label: 'Scraping', icon: Search, cor: 'var(--sage-dark)', bg: 'var(--sage)15' },
  analise: { label: 'Análise', icon: Code2, cor: 'var(--accent)', bg: 'var(--accent)15' },
  criacao: { label: 'Criação', icon: Zap, cor: 'var(--terracotta)', bg: 'var(--terracotta)15' },
  envio: { label: 'Envio', icon: Mail, cor: 'var(--sage)', bg: 'var(--sage)15' },
  navegacao: { label: 'Navegação', icon: Globe, cor: 'var(--terracotta-light)', bg: 'var(--terracotta)15' },
  custom: { label: 'Custom', icon: Settings, cor: 'var(--text-secondary)', bg: 'var(--bg-secondary)' },
}

const defaultSkills: Skill[] = [
  {
    id: '1',
    nome: 'Google Maps Scraper',
    descricao: 'Busca negócios no Google Maps por critério e localização',
    categoria: 'scraping',
    codigo: `async function googleMapsScraper(criterio, localizacao) {
  const page = await browser.newPage()
  await page.goto('https://www.google.com/maps')
  await page.fill('input[name=q]', criterio + ' em ' + localizacao)
  await page.press('input[name=q]', 'Enter')
  await page.waitForSelector('.Nv2PK')
  
  const leads = await page.evaluate(() => {
    const cards = document.querySelectorAll('.Nv2PK')
    return Array.from(cards).map(card => ({
      nome: card.querySelector('.qBF1Pd')?.textContent,
      nota: card.querySelector('.MW4etd')?.textContent,
      endereco: card.querySelector('.W4Efsd')?.textContent
    }))
  })
  return leads
}`,
    ativo: true,
    uso: 47
  },
  {
    id: '2',
    nome: 'Website Analyzer',
    descricao: 'Analisa site e identifica problemas de SEO, design e performance',
    categoria: 'analise',
    codigo: `async function analyzeWebsite(url) {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  
  const analysis = await page.evaluate(() => {
    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name=description]')?.content,
      h1Count: document.querySelectorAll('h1').length,
      images: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt
      })),
      links: Array.from(document.querySelectorAll('a')).length,
      technologies: detectTechnologies()
    }
  })
  return analysis
}`,
    ativo: true,
    uso: 32
  },
  {
    id: '3',
    nome: 'Site Generator',
    descricao: 'Cria site melhorado baseado em análise',
    categoria: 'criacao',
    codigo: `async function generateImprovedSite(data) {
  const template = \`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <title>\${data.nome} - Site Profissional</title>
      <meta name="description" content="\${data.descricao}">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-white">
      <header class="bg-indigo-600 text-white p-6">
        <h1 class="text-3xl font-bold">\${data.nome}</h1>
      </header>
      <main class="p-8">
        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-4">Sobre</h2>
          <p class="text-gray-600">\${data.descricao}</p>
        </section>
        <section>
          <h2 class="text-2xl font-bold mb-4">Serviços</h2>
          <div class="grid md:grid-cols-3 gap-6">
            \${data.servicos.map(s => \`
              <div class="border rounded-lg p-6">
                <h3 class="font-bold mb-2">\${s}</h3>
              </div>
            \`).join('')}
          </div>
        </section>
      </main>
      <footer class="bg-gray-100 p-6 text-center">
        <a href="https://wa.me/\${data.whatsapp}" class="text-green-600 font-bold">
          WhatsApp: \${data.whatsapp}
        </a>
      </footer>
    </body>
    </html>
  \`
  return template
}`,
    ativo: true,
    uso: 28
  },
  {
    id: '4',
    nome: 'WhatsApp Sender',
    descricao: 'Envia mensagens via WhatsApp Web',
    categoria: 'envio',
    codigo: `async function sendWhatsApp(telefone, mensagem) {
  const page = await browser.newPage()
  await page.goto('https://web.whatsapp.com')
  
  // Aguardar QR Code se necessário
  const qr = await page.$('[data-testid=qrcode]')
  if (qr) {
    await page.waitForSelector('[data-testid=conversation-compose-box-input]', { timeout: 60000 })
  }
  
  await page.goto(\`https://web.whatsapp.com/send?phone=55\${telefone}\`)
  await page.waitForSelector('[data-testid=conversation-compose-box-input]')
  await page.fill('[data-testid=conversation-compose-box-input]', mensagem)
  await page.click('[data-testid=send]')
  await page.waitForTimeout(2000)
  return { success: true }
}`,
    ativo: true,
    uso: 15
  },
  {
    id: '5',
    nome: 'Auto Login Handler',
    descricao: 'Detecta e resolve login/captcha automaticamente',
    categoria: 'navegacao',
    codigo: `async function handleLogin(page, selectors) {
  // Verificar se precisa de login
  const loginForm = await page.$(selectors.login)
  if (loginForm) {
    await page.fill(selectors.email, process.env.EMAIL)
    await page.fill(selectors.password, process.env.PASSWORD)
    await page.click(selectors.submit)
    await page.waitForNavigation()
  }
  
  // Verificar captcha
  const captcha = await page.$(selectors.captcha)
  if (captcha) {
    // Pausar para intervenção manual
    await page.waitForSelector(selectors.postLogin, { timeout: 300000 })
  }
  
  return { loggedIn: true }
}`,
    ativo: true,
    uso: 8
  },
  {
    id: '6',
    nome: 'Vercel Publisher',
    descricao: 'Publica site na Vercel via API',
    categoria: 'envio',
    codigo: `async function publishToVercel(projectPath, token) {
  const { exec } = require('child_process')
  const { promisify } = require('util')
  const execAsync = promisify(exec)
  
  try {
    const { stdout } = await execAsync('vercel --prod --yes', {
      cwd: projectPath,
      env: { ...process.env, VERCEL_TOKEN: token }
    })
    
    const urlMatch = stdout.match(/https:\\/\\/[^\\s]+/)
    return { success: true, url: urlMatch?.[0] }
  } catch (error) {
    return { success: false, error: error.message }
  }
}`,
    ativo: false,
    uso: 12
  }
]

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills)
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [newSkill, setNewSkill] = useState({
    nome: '',
    descricao: '',
    categoria: 'custom' as keyof typeof categorias,
    codigo: ''
  })

  const handleSaveSkill = () => {
    if (!newSkill.nome || !newSkill.codigo) return
    
    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill,
      ativo: true,
      uso: 0
    }
    
    setSkills(prev => [...prev, skill])
    setNewSkill({ nome: '', descricao: '', categoria: 'custom', codigo: '' })
    setShowModal(false)
  }

  const handleUpdateSkill = () => {
    if (!editingSkill) return
    setSkills(prev => prev.map(s => s.id === editingSkill.id ? editingSkill : s))
    setEditingSkill(null)
  }

  const handleDelete = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id))
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setShowModal(true)
  }

  const handleNew = () => {
    setEditingSkill(null)
    setNewSkill({ nome: '', descricao: '', categoria: 'custom', codigo: '' })
    setShowModal(true)
  }

  const filteredSkills = skills.filter(s => 
    filter === 'all' || s.categoria === filter
  )

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--terracotta)15' }}>
            <FileCode className="w-6 h-6" style={{ color: 'var(--terracotta)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Skills</h1>
            <p style={{ color: 'var(--text-tertiary)' }}>{skills.length} skills • {skills.filter(s => s.ativo).length} ativas</p>
          </div>
        </div>
        <button onClick={handleNew} className="btn-primary flex items-center gap-2" style={{ background: 'var(--terracotta)' }}>
          <Plus className="w-5 h-5" />
          Nova Skill
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'scraping', 'analise', 'criacao', 'envio', 'navegacao', 'custom'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: filter === cat ? 'var(--terracotta)20' : 'var(--bg-secondary)',
                color: filter === cat ? 'var(--terracotta)' : 'var(--text-tertiary)',
                border: `1px solid ${filter === cat ? 'var(--terracotta)40' : 'var(--border)'}`
              }}
            >
              {cat === 'all' ? 'Todas' : categorias[cat as keyof typeof categorias].label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16">
            <FileCode className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--border)' }} />
            <h3 style={{ color: 'var(--text-primary)' }}>Nenhuma skill encontrada</h3>
            <p style={{ color: 'var(--text-tertiary)' }}>Crie sua primeira skill ou ajuste os filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const cat = categorias[skill.categoria]
              const Icon = cat.icon
              const isEditing = editingSkill?.id === skill.id
              
              return (
                <div 
                  key={skill.id}
                  className="card p-5 transition-all"
                  style={{
                    opacity: skill.ativo ? 1 : 0.7,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-xl" style={{ background: cat.bg }}>
                      <Icon className="w-5 h-5" style={{ color: cat.cor }} />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--text-tertiary)' }}
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, ativo: !s.ativo } : s))}
                        className="w-10 h-5 rounded-full transition-colors relative"
                        style={{
                          background: skill.ativo ? 'var(--sage)' : 'var(--border)'
                        }}
                        title={skill.ativo ? 'Desativar' : 'Ativar'}
                      >
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform" style={{
                          transform: `translateX(${skill.ativo ? '20px' : '2px'})`
                        }} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--text-tertiary)' }}
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{skill.nome}</h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>{skill.descricao}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: cat.bg, color: cat.cor }}>
                      {cat.label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {skill.uso} usos
                    </span>
                  </div>

                  <div className="rounded-xl p-3 max-h-40 overflow-y-auto" style={{ background: 'var(--bg-secondary)' }}>
                    <pre className="text-xs font-mono overflow-x-auto" style={{ color: 'var(--text-tertiary)' }}>
{skill.codigo.substring(0, 500)}{skill.codigo.length > 500 ? '...' : ''}
                    </pre>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <button className="flex-1 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>
                      <Copy className="w-4 h-4" />
                      Copiar Código
                    </button>
                    <button className="flex-1 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2" style={{ background: 'var(--terracotta)20', color: 'var(--terracotta)' }}>
                      <Play className="w-4 h-4" />
                      Testar
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="card w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {editingSkill ? 'Editar Skill' : 'Nova Skill'}
              </h2>
              <button 
                onClick={() => { setShowModal(false); setEditingSkill(null); }}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Nome</label>
                <input
                  type="text"
                  value={editingSkill?.nome || newSkill.nome}
                  onChange={(e) => editingSkill 
                    ? setEditingSkill({...editingSkill, nome: e.target.value})
                    : setNewSkill({...newSkill, nome: e.target.value})
                  }
                  className="input-field"
                  placeholder="Ex: Meu Scraper Personalizado"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Descrição</label>
                <textarea
                  value={editingSkill?.descricao || newSkill.descricao}
                  onChange={(e) => editingSkill 
                    ? setEditingSkill({...editingSkill, descricao: e.target.value})
                    : setNewSkill({...newSkill, descricao: e.target.value})
                  }
                  rows={2}
                  className="input-field resize-none"
                  placeholder="O que esta skill faz..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Categoria</label>
                <div className="flex gap-2 flex-wrap">
                  {(Object.keys(categorias) as Array<keyof typeof categorias>).map((cat) => {
                    const Icon = cat.icon
                    const isSelected = editingSkill?.categoria === cat || newSkill.categoria === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => editingSkill 
                          ? setEditingSkill({...editingSkill, categoria: cat})
                          : setNewSkill({...newSkill, categoria: cat})
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-colors"
                        style={{
                          borderColor: isSelected ? 'var(--terracotta)' : 'var(--border)',
                          background: isSelected ? 'var(--terracotta)15' : 'transparent',
                          color: isSelected ? 'var(--terracotta)' : 'var(--text-tertiary)'
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Código (JavaScript/TypeScript)</label>
                <textarea
                  value={editingSkill?.codigo || newSkill.codigo}
                  onChange={(e) => editingSkill 
                    ? setEditingSkill({...editingSkill, codigo: e.target.value})
                    : setNewSkill({...newSkill, codigo: e.target.value})
                  }
                  rows={15}
                  className="input-field font-mono text-sm resize-none"
                  placeholder="// Sua função async aqui\nexport async function minhaSkill(params) {\n  // código...\n}"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="p-4 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => { setShowModal(false); setEditingSkill(null); }}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={editingSkill ? handleUpdateSkill : handleSaveSkill}
                className="btn-primary flex items-center gap-2"
                style={{ background: 'var(--terracotta)' }}
              >
                <Save className="w-5 h-5" />
                {editingSkill ? 'Salvar Alterações' : 'Criar Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}