@echo off
echo =========================================
echo  Starting Vital App Local Environment
echo =========================================

echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo Installing dependencies...
npm install

echo.
echo Starting development server...
echo Access the frontend at http://localhost:5173
echo Ensure database is pushed if needed (npx prisma db push)
echo.

npm run dev:all
pause
