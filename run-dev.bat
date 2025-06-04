@echo off
cd /d "%~dp0"

echo === Installing dependencies ===
call npm install

echo === Starting development server ===
call npm run dev

:: Prevent the window from closing immediately
echo.
echo Press any key to exit...
pause > nul