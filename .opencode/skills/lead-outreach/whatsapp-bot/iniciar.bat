@echo off
chcp 65001 >nul
title WhatsApp Bot - Lead Outreach

echo ============================================
echo   WHATSAPP BOT - Lead Outreach
echo ============================================
echo.

:: Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo    Baixe em: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
echo.

:: Verificar se dependências estão instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    call npm install
    echo.
)

echo 🚀 Iniciando Bot WhatsApp...
echo.
echo ⚠️  IMPORTANTE:
echo    1. Escaneie o QR Code que aparecerá
echo    2. Abra WhatsApp → Configurações → Dispositivos conectados
echo    3. Conecte o dispositivo
echo.

:: Iniciar bot
node index.js

pause
