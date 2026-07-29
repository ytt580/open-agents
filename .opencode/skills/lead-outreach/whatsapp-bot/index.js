const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURAÇÃO
// ============================================
const CONFIG = {
    port: 3001,
    pix: 'COLOQUE_SEU_PIX_AQUI',
    valor: '497',
    nomeBusiness: 'Monarchy',
};

// ============================================
// INICIALIZAR BOT
// ============================================
const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, '.wwebjs_auth')
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// ============================================
// TEMPLATES DE MENSAGENS
// ============================================
const TEMPLATES = {
    proposta_inicial: (nome, nota, url) => 
        `Olá ${nome}! 👋

Vi que vocês são muito bem avaliados no Google (${nota} ⭐), mas notei que o site de vocês poderia ser muito melhor!

Criei uma proposta de site moderno, rápido e que converte mais clientes. Dá uma olhada:

${url}

Se curtirem, posso explicar como funciona. Um abraço! 😊`,

    follow_up: (nome) =>
        `Oi ${nome}! 😊

Enviei uma proposta de site para vocês. Vi que vocês são nota 5 no Google e merecem um site à altura!

Quer que eu mostre como ficaria? É sem compromisso!

Abraço! 🤝`,

    apos_resposta: (nome) =>
        `Que bom que gostou, ${nome}! 🎉

O site que criei inclui:
✅ Design moderno e responsivo
✅ Velocidade otimizada (carrega em menos de 2s)
✅ WhatsApp integrado (clientes entram em contato na hora)
✅ SEO otimizado (aparece no Google)
✅ Galeria de fotos profissional

O investimento é muito acessível e eu configuro tudo para vocês!

Quer que eu publice? É rápido! 🚀`,

    fechamento: (valor, pix) =>
        `Perfeito! Vou publicar agora! 🚀

Para formalizar, o valor é de R$ ${valor}. 

PIX: ${pix}

Assim que confirmar o pagamento, publico o site e envio o link. 

Qualquer dúvida, estou aqui! 😊`,

    pos_publicacao: (url) =>
        `Site publicado! 🎉

Acesse: ${url}

Inclui:
✅ Hospedagem por 1 ano
✅ Certificado SSL (https)
✅ Suporte técnico por 30 dias

Se precisar de alterações, é só me chamar!

Bom uso! 🚀`,

    preco: (valor, pix) =>
        `O investimento é de apenas R$ ${valor}! 🎉

Isso inclui:
✅ Site completo e profissional
✅ Hospedagem por 1 ano
✅ Certificado SSL
✅ Suporte técnico por 30 dias

É um investimento que se paga com poucos clientes novos!

PIX: ${pix}

Quer que eu publice? 🚀`,

    prazo: () =>
        `O site fica pronto em até 24 horas! ⚡

Assim que fecharmos, eu:
1. Publico o site
2. Configuro o domínio
3. Envio o link para vocês

Rápido e sem burocracia! 🚀`,

    funcionalidades: () =>
        `O site inclui tudo que vocês precisam! 🎯

✅ Design moderno e responsivo
✅ Funciona no celular, tablet e PC
✅ WhatsApp integrado
✅ Galeria de fotos
✅ Formulário de contato
✅ Google Maps
✅ SEO otimizado
✅ Carregamento rápido

Seus clientes vão adorar! 😊`,

    sem_interesse: () =>
        `Sem problemas! 😊

Se mudarem de ideia, é só me chamar. O site está pronto e pode ser publicado a qualquer momento.

Bom trabalho para vocês! 🤝`,

    padrao: () =>
        `Oi! 😊

Posso te ajudar com mais informações sobre o site?

Qualquer dúvida, é só falar! 🤝`,
};

// ============================================
// FUNÇÕES DE RESPOSTA AUTOMÁTICA
// ============================================
function gerarResposta(mensagem) {
    const msg = mensagem.toLowerCase();

    // Pergunta sobre preço
    if (['preço', 'valor', 'quanto', 'custa'].some(p => msg.includes(p))) {
        return TEMPLATES.preco(CONFIG.valor, CONFIG.pix);
    }

    // Pergunta sobre prazo
    if (['prazo', 'tempo', 'demora', 'quando'].some(p => msg.includes(p))) {
        return TEMPLATES.prazo();
    }

    // Pergunta sobre funcionalidades
    if (['funciona', 'tem', 'inclui', 'faz'].some(p => msg.includes(p))) {
        return TEMPLATES.funcionalidades();
    }

    // Interessado
    if (['interessado', 'quero', 'sim', 'bora', 'vamos', 'beleza', 'top'].some(p => msg.includes(p))) {
        return TEMPLATES.fechamento(CONFIG.valor, CONFIG.pix);
    }

    // Não interessado
    if (['não', 'nao', 'depois', 'pensar', 'obrigado', 'vlw'].some(p => msg.includes(p))) {
        return TEMPLATES.sem_interesse();
    }

    // Padrão
    return TEMPLATES.padrao();
}

// ============================================
// EVENTOS DO BOT
// ============================================
client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE O QR CODE NO WHATSAPP:\n');
    qrcode.generate(qr, { small: true });
    console.log('\n⚠️  Abra o WhatsApp → Configurações → Dispositivos conectados → Conectar dispositivo\n');
});

client.on('ready', () => {
    console.log('✅ Bot WhatsApp conectado!');
    console.log(`🌐 Servidor rodando em http://localhost:${CONFIG.port}`);
});

client.on('message', async (msg) => {
    try {
        // Ignorar mensagens de grupos e自己
        if (msg.fromMe) return;
        if (msg.isGroup) return;

        const chat = await msg.getChat();
        const contato = await chat.getContact();
        const nome = contato.pushname || contato.number || 'Cliente';

        console.log(`\n📩 Mensagem de ${nome} (${msg.from}):`);
        console.log(`   "${msg.body}"`);

        // Gerar resposta
        const resposta = gerarResposta(msg.body);

        // Enviar resposta
        await msg.reply(resposta);

        console.log(`✅ Resposta enviada para ${nome}`);

        // Salvar log
        salvarLog({
            data: new Date().toISOString(),
            de: msg.from,
            nome: nome,
            mensagem: msg.body,
            resposta: resposta
        });

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
    }
});

client.on('disconnected', (reason) => {
    console.log('⚠️  Desconectado:', reason);
});

// ============================================
// API PARA ENVIAR MENSAGENS
// ============================================

// Enviar proposta para lead
app.post('/api/enviar-proposta', async (req, res) => {
    try {
        const { telefone, nome, nota, url } = req.body;

        if (!telefone || !nome) {
            return res.status(400).json({ error: 'Telefone e nome são obrigatórios' });
        }

        // Formatar telefone
        const telFormatado = telefone.replace(/\D/g, '');
        const chatId = `55${telFormatado}@c.us`;

        // Verificar se número existe
        const chat = await client.getNumberId(telFormatado);
        if (!chat) {
            return res.status(404).json({ error: 'Número não encontrado no WhatsApp' });
        }

        // Enviar mensagem
        const mensagem = TEMPLATES.proposta_inicial(
            nome,
            nota || '5',
            url || 'https://seusite.com'
        );

        await client.sendMessage(chatId, mensagem);

        console.log(`✅ Proposta enviada para ${nome} (${telefone})`);

        res.json({ success: true, message: 'Proposta enviada com sucesso' });

    } catch (error) {
        console.error('❌ Erro ao enviar proposta:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enviar mensagem personalizada
app.post('/api/enviar-mensagem', async (req, res) => {
    try {
        const { telefone, mensagem } = req.body;

        if (!telefone || !mensagem) {
            return res.status(400).json({ error: 'Telefone e mensagem são obrigatórios' });
        }

        const telFormatado = telefone.replace(/\D/g, '');
        const chatId = `55${telFormatado}@c.us`;

        const chat = await client.getNumberId(telFormatado);
        if (!chat) {
            return res.status(404).json({ error: 'Número não encontrado no WhatsApp' });
        }

        await client.sendMessage(chatId, mensagem);

        console.log(`✅ Mensagem enviada para ${telefone}`);

        res.json({ success: true, message: 'Mensagem enviada com sucesso' });

    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error);
        res.status(500).json({ error: error.message });
    }
});

// Verificar status
app.get('/api/status', (req, res) => {
    res.json({
        status: client.info ? 'conectado' : 'desconectado',
        nome: CONFIG.nomeBusiness,
        pix: CONFIG.pix,
        valor: CONFIG.valor,
    });
});

// Listar contatos
app.get('/api/contatos', async (req, res) => {
    try {
        const chats = await client.getChats();
        const contatos = chats
            .filter(chat => !chat.isGroup)
            .map(chat => ({
                id: chat.id._serialized,
                nome: chat.name || chat.id.user,
                ultimaMensagem: chat.lastMessage?.body || '',
            }));

        res.json(contatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// SALVAR LOGS
// ============================================
function salvarLog(dados) {
    const logFile = path.join(__dirname, 'logs.json');
    
    let logs = [];
    if (fs.existsSync(logFile)) {
        logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }
    
    logs.push(dados);
    
    // Manter apenas últimos 1000 logs
    if (logs.length > 1000) {
        logs = logs.slice(-1000);
    }
    
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
}

// ============================================
// INICIAR
// ============================================
console.log('🚀 Iniciando Bot WhatsApp...\n');
console.log(`📌 Configuração:
   - PIX: ${CONFIG.pix}
   - Valor: R$ ${CONFIG.valor}
   - Porta: ${CONFIG.port}
`);

client.initialize();

app.listen(CONFIG.port, () => {
    console.log(`\n🌐 API rodando em http://localhost:${CONFIG.port}`);
    console.log('\n📋 Endpoints:');
    console.log('   POST /api/enviar-proposta  - Enviar proposta');
    console.log('   POST /api/enviar-mensagem  - Enviar mensagem');
    console.log('   GET  /api/status           - Ver status');
    console.log('   GET  /api/contatos         - Listar contatos');
});
