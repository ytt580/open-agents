'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Trash2, Edit3, Clock, Calendar, Play, Pause,
  Repeat, Sun, AlertTriangle, Save, ChevronDown
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
  { label: 'Todo dia as 9:00', tipo: 'daily' as ScheduleType, expressao: '0 9 * * *', desc: 'Executa diariamente as 09:00' },
  { label: 'Todo dia as 18:00', tipo: 'daily' as ScheduleType, expressao: '0 18 * * *', desc: 'Executa diariamente as 18:00' },
  { label: 'Segunda a sexta 9:00', tipo: 'cron' as ScheduleType, expressao: '0 9 * * 1-5', desc: 'Dias uteis as 09:00' },
  { label: 'A cada hora', tipo: 'interval' as ScheduleType, expressao: '0 * * * *', desc: 'Executa no inicio de cada hora' },
  { label: 'A cada 30 min', tipo: 'interval' as ScheduleType, expressao: '*/30 * * * *', desc: 'Executa a cada 30 minutos' },
  { label: 'Segundas 9:00', tipo: 'weekly' as ScheduleType, expressao: '0 9 * * 1', desc: 'Toda segunda as 09:00' },
  { label: 'Dia 1 de cada mes', tipo: 'monthly' as ScheduleType, expressao: '0 9 1 * *', desc: 'Primeiro dia do mes as 09:00' },
]

const flows = [
  { id: '1', nome: 'Prospeccao Google Maps' },
  { id: '2', nome: 'Automacao WhatsApp' },
  { id: '3', nome: 'Criacao de Sites' },
  { id: '4', nome: 'Scraping + Analise' },
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
  return date.toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export function Scheduler() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', nome: 'Prospeccao Diaria 9h', flowId: '1', tipo: 'daily', expressao: '0 9 * * *', proximaExecucao: getProximaExecucao('0 9 * * *'), ativo: true, timezone: 'America/Sao_Paulo', proximaExecucaoStr: '' },
    { id: '2', nome: 'WhatsApp Follow-up', flowId: '2', tipo: 'interval', expressao: '*/30 * * * *', proximaExecucao: getProximaExecucao('*/30 * * * *'), ativo: true, timezone: 'America/Sao_Paulo', proximaExecucaoStr: '' },
    { id: '3', nome: 'Publicacao Semanal', flowId: '3', tipo: 'weekly', expressao: '0 9 * * 1', proximaExecucao: getProximaExecucao('0 9 * * 1'), ativo: false, timezone: 'America/Sao_Paulo', proximaExecucaoStr: '' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)
  const [formData, setFormData] = useState({ nome: '', flowId: '1', tipo: 'daily' as ScheduleType, expressao: '0 9 * * *', timezone: 'America/Sao_Paulo', ativo: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setSchedules(prev => prev.map(s => ({
        ...s, proximaExecucao: getProximaExecucao(s.expressao), proximaExecucaoStr: formatNextRun(getProximaExecucao(s.expressao))
      })))
    }, 60000)
    setSchedules(prev => prev.map(s => ({ ...s, proximaExecucaoStr: formatNextRun(getProximaExecucao(s.expressao)) })))
    return () => clearInterval(interval)
  }, [])

  const handleSave = () => {
    if (!formData.nome || !formData.expressao) return
    const newSchedule: Schedule = {
      id: editingSchedule?.id || Date.now().toString(), ...formData,
      proximaExecucao: getProximaExecucao(formData.expressao), proximaExecucaoStr: formatNextRun(getProximaExecucao(formData.expressao))
    }
    if (editingSchedule) setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? newSchedule : s))
    else setSchedules(prev => [...prev, newSchedule])
    closeModal()
  }

  const closeModal = () => { setShowModal(false); setEditingSchedule(null); setFormData({ nome: '', flowId: '1', tipo: 'daily', expressao: '0 9 * * *', timezone: 'America/Sao_Paulo', ativo: true }) }
  const handleEdit = (schedule: Schedule) => { setEditingSchedule(schedule); setFormData({ nome: schedule.nome, flowId: schedule.flowId, tipo: schedule.tipo, expressao: schedule.expressao, timezone: schedule.timezone, ativo: schedule.ativo }); setShowModal(true) }
  const handleDelete = (id: string) => { if (confirm('Excluir este agendamento?')) setSchedules(prev => prev.filter(s => s.id !== id)) }
  const getDefaultCron = (tipo: ScheduleType): string => {
    switch (tipo) {
      case 'daily': return '0 9 * * *'; case 'weekly': return '0 9 * * 1'; case 'monthly': return '0 9 1 * *'; case 'interval': return '*/30 * * * *'; default: return '0 9 * * *'
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-void)' }}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34, 211, 238, 0.08)' }}>
            <Clock className="w-5 h-5" style={{ color: 'var(--cyan)' }} />
          </div>
          <div>
            <h1 className="text-base font-bold" style={{ color: 'var(--fg)' }}>Agendador 24/7</h1>
            <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
              {schedules.filter(s => s.ativo).length} ativos - {schedules.length} total
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium" style={{ background: 'rgba(52, 211, 153, 0.06)', border: '1px solid rgba(52, 211, 153, 0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
            <span style={{ color: 'var(--green)' }}>Online</span>
          </div>
          <button onClick={() => { setFormData({...formData, nome: '', expressao: '0 9 * * *'}); setShowModal(true) }} className="btn-primary text-xs py-2 px-3">
            <Plus className="w-3.5 h-3.5" />
            Novo
          </button>
        </div>
      </div>

      <div className="px-4 py-2" style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.15)', background: 'rgba(251, 191, 36, 0.03)' }}>
        <div className="flex items-start gap-2 p-2.5 rounded-lg" style={{ background: 'rgba(251, 191, 36, 0.04)', border: '1px solid rgba(251, 191, 36, 0.12)' }}>
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--amber-400)' }} />
          <p className="text-[10px]" style={{ color: 'var(--amber-400)' }}>
            <strong>Para rodar 24/7:</strong> Render Background Worker, GitHub Actions ou VPS + PM2.
          </p>
        </div>
      </div>

      <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
        <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--fg-subtle)' }}>Templates Rapidos</h3>
        <div className="flex gap-1.5 flex-wrap">
          {scheduleTemplates.map((template) => (
            <button key={template.label}
              onClick={() => { setFormData(prev => ({...prev, tipo: template.tipo, expressao: template.expressao, nome: template.label.replace('Todo ', '').replace(' as ', ' ').replace(' a ', ' ') })); setShowModal(true) }}
              className="px-2.5 py-1 rounded-md text-[10px] transition-all whitespace-nowrap hover:border-[var(--violet-500)]"
              style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--fg-faint)' }}>
              {template.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {schedules.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--border)' }} />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Nenhum agendamento</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--fg-subtle)' }}>Clique em "Novo" para criar</p>
          </div>
        ) : (
          <div className="space-y-2">
            {schedules.map((schedule) => {
              const flow = flows.find(f => f.id === schedule.flowId)
              const isDue = schedule.proximaExecucao.getTime() - Date.now() < 5 * 60 * 1000 && schedule.ativo
              
              return (
                <div key={schedule.id} className="card p-3.5 transition-all duration-200 hover:border-[var(--violet-500)]" style={{ opacity: schedule.ativo ? 1 : 0.6 }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: schedule.ativo ? 'rgba(52, 211, 153, 0.08)' : 'var(--bg-alt)' }}>
                        <Clock className="w-4 h-4" style={{ color: schedule.ativo ? 'var(--green)' : 'var(--fg-subtle)' }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--fg)' }}>{schedule.nome}</h3>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{
                            background: schedule.ativo ? 'rgba(52, 211, 153, 0.1)' : 'var(--bg-alt)',
                            color: schedule.ativo ? 'var(--green)' : 'var(--fg-subtle)'
                          }}>
                            {schedule.ativo ? 'Ativo' : 'Pausado'}
                          </span>
                          {isDue && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium animate-pulse" style={{ background: 'rgba(34, 211, 238, 0.1)', color: 'var(--cyan)' }}>
                              Executando
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{flow?.nome}</p>
                        <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                          <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />{schedule.proximaExecucaoStr}</span>
                          <span className="flex items-center gap-1"><Repeat className="w-2.5 h-2.5" /><code className="px-1 py-0.5 rounded" style={{ background: 'var(--bg-alt)', color: 'var(--fg)' }}>{schedule.expressao}</code></span>
                          <span className="flex items-center gap-1"><Sun className="w-2.5 h-2.5" />{schedule.timezone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                      <button onClick={() => setSchedules(prev => prev.map(s => s.id === schedule.id ? {...s, ativo: !s.ativo} : s))}
                        className="p-1.5 rounded-md transition-colors" style={{ background: schedule.ativo ? 'rgba(34, 211, 238, 0.08)' : 'var(--bg-alt)', color: schedule.ativo ? 'var(--cyan)' : 'var(--fg-subtle)' }}
                        title={schedule.ativo ? 'Pausar' : 'Ativar'}>
                        {schedule.ativo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleEdit(schedule)} className="p-1.5 rounded-md hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }} title="Editar">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(schedule.id)} className="p-1.5 rounded-md hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }} title="Excluir">
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
          <div className="card w-full max-w-lg max-h-[85vh] flex flex-col" style={{ boxShadow: '0 0 40px var(--accent-glow)' }}>
            <div className="p-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{editingSchedule ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
              <button onClick={closeModal} className="p-1 rounded hover:bg-[var(--bg-alt)]" style={{ color: 'var(--fg-subtle)' }}>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Nome</label>
                <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="input-field text-xs" placeholder="Ex: Prospeccao Diaria 9h" />
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Fluxo</label>
                <select value={formData.flowId} onChange={(e) => setFormData({...formData, flowId: e.target.value})} className="input-field text-xs">
                  {flows.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>Tipo</label>
                <div className="flex gap-1.5 flex-wrap">
                  {(['daily', 'weekly', 'monthly', 'interval', 'cron'] as ScheduleType[]).map((tipo) => (
                    <button key={tipo}
                      onClick={() => setFormData({...formData, tipo, expressao: tipo === 'cron' ? formData.expressao : getDefaultCron(tipo)})}
                      className="px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all"
                      style={{
                        background: formData.tipo === tipo ? 'var(--accent)' : 'var(--bg-alt)',
                        color: formData.tipo === tipo ? 'white' : 'var(--fg-subtle)',
                      }}>
                      {tipo === 'daily' && 'Diario'}{tipo === 'weekly' && 'Semanal'}{tipo === 'monthly' && 'Mensal'}{tipo === 'interval' && 'Intervalo'}{tipo === 'cron' && 'Cron'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--fg-faint)' }}>
                  Expressao Cron {formData.tipo === 'cron' && <span style={{ color: 'var(--accent)' }}>(obrigatorio)</span>}
                </label>
                <input type="text" value={formData.expressao} onChange={(e) => setFormData({...formData, expressao: e.target.value})} className="input-field text-xs font-mono" placeholder="0 9 * * *" />
                <p className="text-[9px] mt-1" style={{ color: 'var(--fg-subtle)' }}>
                  Formato: <code className="px-1 py-0.5 rounded" style={{ background: 'var(--bg-alt)' }}>min hora dia mes dia_semana</code>
                </p>
                <p className="text-[10px] mt-1">
                  <strong style={{ color: 'var(--fg)' }}>Proxima:</strong>{' '}
                  <span className="font-mono" style={{ color: 'var(--accent)' }}>
                    {formData.expressao ? formatNextRun(getProximaExecucao(formData.expressao)) : 'Invalido'}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>Timezone</label>
                <select value={formData.timezone} onChange={(e) => setFormData({...formData, timezone: e.target.value})} className="input-field text-[10px] flex-1">
                  <option value="America/Sao_Paulo">Sao Paulo (UTC-3)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.ativo} onChange={(e) => setFormData({...formData, ativo: e.target.checked})} className="w-3.5 h-3.5 rounded" style={{ accentColor: 'var(--violet-500)' }} />
                <label className="text-[10px]" style={{ color: 'var(--fg-faint)' }}>Ativar imediatamente</label>
              </div>
            </div>

            <div className="p-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={closeModal} className="btn-secondary text-xs py-2 px-3">Cancelar</button>
              <button onClick={handleSave} disabled={!formData.nome || !formData.expressao} className="btn-primary text-xs py-2 px-3 disabled:opacity-50">
                <Save className="w-3.5 h-3.5" />
                {editingSchedule ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
