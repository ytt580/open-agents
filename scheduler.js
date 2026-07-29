const http = require('http')
const { exec } = require('child_process')

const PORT = process.env.PORT || 3001

// Armazenar agendamentos (em produção, usar banco de dados)
let schedules = []
let isRunning = false

// Verificar agendamentos a cada minuto
function checkSchedules() {
  const now = new Date()
  
  schedules.forEach(schedule => {
    if (!schedule.ativo) return
    
    const nextRun = new Date(schedule.proximaExecucao)
    
    // Se chegou a hora de executar
    if (now >= nextRun && !schedule.executando) {
      console.log(`[${new Date().toISOString()}] Executando: ${schedule.nome}`)
      executeSchedule(schedule)
    }
  })
}

// Executar agendamento
async function executeSchedule(schedule) {
  schedule.executando = true
  schedule.ultimaExecucao = new Date().toISOString()
  
  try {
    // Simular execução do fluxo
    console.log(`[${new Date().toISOString()}] Fluxo ${schedule.flowId} iniciado`)
    
    // Aqui você integraria com Playwright/Outro browser
    // Exemplo: await runFlow(schedule.flowId)
    
    // Calcular próxima execução
    schedule.proximaExecucao = getNextCronRun(schedule.expressao)
    console.log(`[${new Date().toISOString()}] Próxima execução: ${schedule.proximaExecucao}`)
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro ao executar ${schedule.nome}:`, error)
  } finally {
    schedule.executando = false
  }
}

// Calcular próxima execução baseado no cron
function getNextCronRun(cron) {
  const [min, hour, day, month, dow] = cron.split(' ')
  const now = new Date()
  const next = new Date(now)
  
  if (min !== '*') next.setMinutes(parseInt(min))
  if (hour !== '*') next.setHours(parseInt(hour))
  
  if (next <= now) next.setDate(next.getDate() + 1)
  
  return next.toISOString()
}

// Servidor HTTP simples
const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  
  const url = new URL(req.url, `http://localhost:${PORT}`)
  
  // Health check
  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 
      status: 'ok', 
      uptime: process.uptime(),
      schedules: schedules.length,
      activeSchedules: schedules.filter(s => s.ativo).length,
      isRunning 
    }))
    return
  }
  
  // GET /api/schedules - Listar agendamentos
  if (url.pathname === '/api/schedules' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(schedules))
    return
  }
  
  // POST /api/schedules - Criar agendamento
  if (url.pathname === '/api/schedules' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        const schedule = {
          id: Date.now().toString(),
          ...data,
          ativo: data.ativo !== false,
          proximaExecucao: getNextCronRun(data.expressao),
          criadoEm: new Date().toISOString()
        }
        schedules.push(schedule)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(schedule))
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Dados inválidos' }))
      }
    })
    return
  }
  
  // PUT /api/schedules/:id - Atualizar agendamento
  if (url.pathname.startsWith('/api/schedules/') && req.method === 'PUT') {
    const id = url.pathname.split('/')[3]
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        const index = schedules.findIndex(s => s.id === id)
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Não encontrado' }))
          return
        }
        schedules[index] = { ...schedules[index], ...data }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(schedules[index]))
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Dados inválidos' }))
      }
    })
    return
  }
  
  // DELETE /api/schedules/:id - Deletar agendamento
  if (url.pathname.startsWith('/api/schedules/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[3]
    schedules = schedules.filter(s => s.id !== id)
    res.writeHead(204)
    res.end()
    return
  }
  
  // POST /api/schedules/:id/toggle - Ativar/Desativar
  if (url.pathname.endsWith('/toggle') && req.method === 'POST') {
    const id = url.pathname.split('/')[2]
    const schedule = schedules.find(s => s.id === id)
    if (schedule) {
      schedule.ativo = !schedule.ativo
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(schedule))
    } else {
      res.writeHead(404)
      res.end()
    }
    return
  }
  
  // Rota não encontrada
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Rota não encontrada' }))
})

// Iniciar verificação de agendamentos a cada minuto
setInterval(checkSchedules, 60000)

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 AutoFlows Scheduler rodando na porta ${PORT}`)
  console.log(`📅 Verificando agendamentos a cada minuto`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
  
  // Adicionar agendamento de exemplo
  schedules.push({
    id: 'example-1',
    nome: 'Prospecção Diária 9h',
    flowId: '1',
    expressao: '0 9 * * *',
    tipo: 'daily',
    ativo: true,
    timezone: 'America/Sao_Paulo',
    proximaExecucao: getNextCronRun('0 9 * * *'),
    criadoEm: new Date().toISOString()
  })
  
  console.log(`📋 ${schedules.length} agendamento(s) carregado(s)`)
})