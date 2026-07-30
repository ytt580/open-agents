@echo off
echo.
echo  ==========================================
echo   BrowserClaw - Iniciando Chrome
echo  ==========================================
echo.

echo  1. Fechando Chrome...
taskkill /F /IM chrome.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo  2. Abrindo Chrome com porta 9222...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

echo.
echo  Chrome aberto! Volte ao Open-Agents e clique em "Testar".
echo.
pause
