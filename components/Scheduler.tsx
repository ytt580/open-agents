'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Calendar, 
  Zap,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Repeat,
  Sun,
  Moon,
  Loader2,
  Trash2 as Trash,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Save
} from 'lucide-react'

type ScheduleType = 'cron' | 'interval' | 'once' | 'daily' | 'weekly' | 'monthly'

interface Schedule {
  id: string
  nome: string
  flowId: string
  tipo: ScheduleType
  expressao: string
  proximaExecucao: Date
  ativo: boolean
  ultimaExecucao?: Date
  proximaExecucaoStr: string
  timezone: string
}

const scheduleTemplates = [
  { label: 'Todo dia às 9:00', tipo: 'daily' as ScheduleType, expressao: '0 9 * * *', desc: 'Executa diariamente às 09:00' },
  { label: 'Todo dia às 18:00', tipo: 'daily' as ScheduleType, expressao: '0 18 * * *', desc: 'Executa diariamente às 18:00' },
  { label: 'Segunda a sexta 9:00', tipo: 'cron' as ScheduleType, expressao: '0 9 * * 1-5', desc: 'Dias úteis às 09:00' },
  { label: 'A cada hora', tipo: 'interval' as ScheduleType, expressao: '0 * * * *', desc: 'Executa no início de cada hora' },
  { label: 'A cada 30 min', tipo: 'interval' as ScheduleType, expressao: '*/30 * * * *', desc: 'Executa a cada 30 minutos' },
  { label: 'Segundas 9:00', tipo: 'weekly' as ScheduleType, expressao: '0 9 * * 1', desc: 'Toda segunda às 09:00' },
  { label: 'Dia 1 de cada mês', tipo: 'monthly' as ScheduleType, expressao: '0 9 1 * *', desc: 'Primeiro dia do mês às 09:00' },
  { label: 'Personalizado', tipo: 'cron' as ScheduleType, expressao: '', desc: 'Digite expressão cron customizada' },
]

const flows = [
  { id: '1', nome: 'Prospecção Google Maps' },
  { id: '2', nome: 'Automação WhatsApp' },
  { id: '3', nome: 'Criação de Sites' },
  { id: '4', nome: 'Scraping + Análise' },
]

function getProximaExecucao(cron: string, from: Date = new Date()): Date {
  const now = new Date(from)
  const [min, hour, day, month, dow] = cron.split(' ')
  
  if (min === '0' && hour !== '*' && day === '*' && month === '*' && dow === '*') {
    const targetHour = parseInt(hour)
    const next = new Date(now)
    next.setHours(targetHour, 0, 0, 0)
    if (next <= now) next.setDate(next.getDate() + 1)
    return next
  }
  
  if (min === '0' && hour === '9' && day === '*' && month === '*' && dow === '1-5') {
    const next = new Date(now)
    next.setHours(9, 0, 0, 0)
    while (next.getDay() === 0 || next.getDay() === 6 || next <= now) {
      next.setDate(next.getDate() + 1)
    }
    return next
  }
  
  if (min.startsWith('*/')) {
    const interval = parseInt(min.replace('*/', ''))
    const next = new Date(now)
    next.setMinutes(Math.ceil(next.getMinutes() / interval) * interval, 0, 0)
    return next
  }
  
  const next = new Date(now)
  next.setDate(next.getDate() + 1)
  next.setHours(9, 0, 0, 0)
  return next
}

function formatNextRun(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (diff < 0) return 'Atrasado'
  if (hours < 1) return `Em ${minutes}min`
  if (hours < 24) return `Em ${hours}h ${minutes}min`
  return date.toLocaleString('pt-BR', { 
    weekday: 'short', 
    day: '2-digit', 
    month: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

export function Scheduler() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      nome: 'Prospecção Diária 9h',
      flowId: '1',
      tipo: 'daily',
      expressao: '0 9 * * *',
      proximaExecucao: getProximaExecucao('0 9 * * *'),
      ativo: true,
      timezone: 'America/Sao_Paulo',
      proximaExecucaoStr: ''
    },
    {
      id: '2',
      nome: 'WhatsApp Follow-up',
      flowId: '2',
      tipo: 'interval',
      expressao: '*/30 * * * *',
      proximaExecucao: getProximaExecucao('*/30 * * * *'),
      ativo: true,
      timezone: 'America/Sao_Paulo',
      proximaExecucaoStr: ''
    },
    {
      id: '3',
      nome: 'Publicação Semanal',
      flowId: '3',
      tipo: 'weekly',
      expressao: '0 9 * * 1',
      proximaExecucao: getProximaExecucao('0 9 * * 1'),
      ativo: false,
      timezone: 'America/Sao_Paulo',
      proximaExecucaoStr: ''
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    flowId: '1',
    tipo: 'daily' as ScheduleType,
    expressao: '0 9 * * *',
    timezone: 'America/Sao_Paulo',
    ativo: true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSchedules(prev => prev.map(s => ({
        ...s,
        proximaExecucao: getProximaExecucao(s.expressao),
        proximaExecucaoStr: formatNextRun(getProximaExecucao(s.expressao))
      })))
    }, 60000)
    
    setSchedules(prev => prev.map(s => ({
      ...s,
      proximaExecucaoStr: formatNextRun(getProximaExecucao(s.expressao))
    })))
    
    return () => clearInterval(interval)
  }, [])

  const handleSave = () => {
    if (!formData.nome || !formData.expressao) return
    
    const newSchedule: Schedule = {
      id: editingSchedule?.id || Date.now().toString(),
      ...formData,
      proximaExecucao: getProximaExecucao(formData.expressao),
      proximaExecucaoStr: formatNextRun(getProximaExecucao(formData.expressao))
    }
    
    if (editingSchedule) {
      setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? newSchedule : s))
    } else {
      setSchedules(prev => [...prev, newSchedule])
    }
    
    closeModal()
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingSchedule(null)
    setFormData({
      nome: '',
      flowId: '1',
      tipo: 'daily',
      expressao: '0 9 * * *',
      timezone: 'America/Sao_Paulo',
      ativo: true
    })
  }

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setFormData({
      nome: schedule.nome,
      flowId: schedule.flowId,
      tipo: schedule.tipo,
      expressao: schedule.expressao,
      timezone: schedule.timezone,
      ativo: schedule.ativo
    })
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Excluir este agendamento?')) {
      setSchedules(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleTemplateClick = (template: typeof scheduleTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      tipo: template.tipo,
      expressao: template.expressao
    }))
  }

  const getDefaultCron = (tipo: ScheduleType): string => {
    switch (tipo) {
      case 'daily': return '0 9 * * *'
      case 'weekly': return '0 9 * * 1'
      case 'monthly': return '0 9 1 * *'
      case 'interval': return '*/30 * * * *'
      case 'cron': return '0 9 * * *'
      default: return '0 9 * * *'
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--terracotta-15)' }}>
            <Clock className="w-6 h-6" style={{ color: 'var(--terracotta)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Agendador 24/7</h1>
            <p style={{ color: 'var(--text-tertiary)' }}>
              {schedules.filter(s => s.ativo).length} ativos • {schedules.length} total
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Status do Servidor */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--sage-10)', border: '1px solid var(--sage-30)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--sage)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--sage-dark)' }}>Scheduler Online</span>
          </div>
          <button onClick={() => { setFormData({...formData, nome: '', expressao: '0 9 * * *'}); setShowModal(true); }} 
            className="btn-primary flex items-center gap-2"
            style={{ background: 'var(--terracotta)' }}
          >
            <Plus className="w-5 h-5" />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Aviso de Infraestrutura */}
      <div className="px-6 py-3" style={{ borderBottom: '1px solid var(--terracotta-30)', background: 'var(--terracotta-10)' }}>
        <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--terracotta-5)', border: '1px solid var(--terracotta-20)' }}>
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--terracotta)' }} />
          <div className="text-sm" style={{ color: 'var(--terracotta-dark)' }}>
            <strong>Para rodar 24/7:</strong> Este frontend precisa de um backend rodando continuamente. 
            Opções: <strong>Render Background Worker</strong> (grátis), 
            <strong>GitHub Actions</strong> (agendado), 
            <strong>Servidor próprio/VPS</strong> (PM2 + Node.js). 
            O agendamento aqui define <em>quando</em> rodar; a execução real precisa de um worker rodando 24/7.
          </div>
        </div>
      </div>

      {/* Templates Rápidos */}
      <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Templates Rápidos</h3>
        <div className="flex gap-2 flex-wrap">
          {scheduleTemplates.map((template) => (
            <button
              key={template.label}
              onClick={() => { handleTemplateClick(template); setFormData(prev => ({...prev, nome: template.label.replace('Todo ', '').replace(' às ', ' ').replace(' a ', ' ') })); setShowModal(true); }}
              className="px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
              style={{ 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="flex-1 overflow-y-auto p-6">
        {schedules.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--border)' }} />
            <h3 style={{ color: 'var(--text-primary)' }}>Nenhum agendamento</h3>
            <p style={{ color: 'var(--text-tertiary)' }}>Clique em "Novo Agendamento" para criar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule) => {
              const flow = flows.find(f => f.id === schedule.flowId)
              const isDue = schedule.proximaExecucao.getTime() - Date.now() < 5 * 60 * 1000 && schedule.ativo
              
              return (
                <div 
                  key={schedule.id}
                  className="card p-5 transition-all"
                  style={{
                    opacity: schedule.ativo ? 1 : 0.7,
                    boxShadow: isDue ? '0 0 0 2px var(--terracotta-40)' : 'none'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                        background: schedule.ativo ? 'var(--sage-20)' : 'var(--bg-secondary)'
                      }}>
                        <Clock className="w-6 h-6" style={{ color: schedule.ativo ? 'var(--sage)' : 'var(--text-tertiary)' }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{schedule.nome}</h3>
                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{
                            background: schedule.ativo ? 'var(--sage-20)' : 'var(--bg-secondary)',
                            color: schedule.ativo ? 'var(--sage-dark)' : 'var(--text-tertiary)'
                          }}>
                            {schedule.ativo ? 'Ativo' : 'Pausado'}
                          </span>
                          {isDue && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium animate-pulse" style={{
                              background: 'var(--terracotta-20)',
                              color: 'var(--terracotta)'
                            }}>
                              Executando em breve
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{flow?.nome}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Próxima: {schedule.proximaExecucaoStr}
                          </span>
                          <span className="flex items-center gap-1">
                            <Repeat className="w-3 h-3" />
                            Cron: <code className="px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{schedule.expressao}</code>
                          </span>
                          <span className="flex items-center gap-1">
                            <Sun className="w-3 h-3" />
                            {schedule.timezone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => setSchedules(prev => prev.map(s => s.id === schedule.id ? {...s, ativo: !s.ativo} : s))}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          background: schedule.ativo ? 'var(--terracotta-20)' : 'var(--bg-secondary)',
                          color: schedule.ativo ? 'var(--terracotta)' : 'var(--text-tertiary)'
                        }}
                        title={schedule.ativo ? 'Pausar' : 'Ativar'}
                      >
                        {schedule.ativo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button onClick={() => handleEdit(schedule)} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }} title="Editar">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(schedule.id)} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }} title="Excluir">
                        <Trash className="w-5 h-5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="card w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {editingSchedule ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Nome do Agendamento</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Prospecção Diária 9h"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Fluxo para Executar</label>
                <select
                  value={formData.flowId}
                  onChange={(e) => setFormData({...formData, flowId: e.target.value})}
                  className="input-field"
                >
                  {flows.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Tipo de Agendamento</label>
                <div className="flex gap-2 flex-wrap">
                  {(['daily', 'weekly', 'monthly', 'interval', 'cron'] as ScheduleType[]).map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setFormData({...formData, tipo, expressao: tipo === 'cron' ? formData.expressao : getDefaultCron(tipo)})}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      style={{
                        background: formData.tipo === tipo ? 'var(--terracotta-20)' : 'var(--bg-secondary)',
                        color: formData.tipo === tipo ? 'var(--terracotta)' : 'var(--text-tertiary)',
                        border: `1px solid ${formData.tipo === tipo ? 'var(--terracotta-40)' : 'var(--border)'}`
                      }}
                    >
                      {tipo === 'daily' && 'Diário'}
                      {tipo === 'weekly' && 'Semanal'}
                      {tipo === 'monthly' && 'Mensal'}
                      {tipo === 'interval' && 'Intervalo'}
                      {tipo === 'cron' && 'Cron Custom'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Expressão Cron {formData.tipo === 'cron' && <span style={{ color: 'var(--terracotta)' }}>(obrigatório)</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.expressao}
                    onChange={(e) => setFormData({...formData, expressao: e.target.value})}
                    className="input-field font-mono text-sm"
                    placeholder="0 9 * * *"
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                  Formato: <code className="px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>min hora dia mês dia_semana</code>
                  • Ex: <code className="px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>0 9 * * *</code> = todo dia 9h
                  • Ex: <code className="px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>*/30 * * * *</code> = a cada 30 min
                  • Ex: <code className="px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>0 9 * * 1-5</code> = seg-sex 9h
                </p>
                <div className="mt-2 text-sm">
                  <strong style={{ color: 'var(--text-primary)' }}>Próxima execução estimada:</strong>{' '}
                  <span className="font-mono" style={{ color: 'var(--terracotta)' }}>
                    {formData.expressao ? formatNextRun(getProximaExecucao(formData.expressao)) : 'Inválido'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                    className="input-field"
                  >
                    <option value="America/Sao_Paulo">America/Sao_Paulo (UTC-3)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (UTC-5)</option>
                    <option value="Europe/London">Europe/London (UTC+0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <input
                      type="checkbox"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: 'var(--terracotta)' }}
                    />
                    Ativar imediatamente após salvar
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={closeModal} className="btn-secondary">Cancelar</button>
              <button onClick={handleSave} disabled={!formData.nome || !formData.expressao} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'var(--terracotta)' }}>
                <Save className="w-5 h-5" />
                {editingSchedule ? 'Salvar Alterações' : 'Criar Agendamento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}