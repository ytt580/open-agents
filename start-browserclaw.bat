@echo off
echo ========================================
echo   BrowserClaw - Chrome Debug Mode
echo ========================================
echo.
echo Fechando Chrome...
taskkill /F /IM chrome.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo.
echo Iniciando Chrome com porta 9222...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
echo.
echo Chrome iniciado! Agora volte ao Open-Agents.
echo.
pause
