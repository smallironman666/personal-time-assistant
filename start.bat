@echo off
echo 🚀 个人时间助手快速启动脚本
echo ==================================

REM 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装。请先安装 Node.js (推荐版本 18+^)
    echo    下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装

REM 检查 npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm 未安装。请确保 Node.js 正确安装
    pause
    exit /b 1
)

echo ✅ npm 已安装

REM 安装依赖
echo.
echo 📦 正在安装项目依赖...
npm install

if %errorlevel% equ 0 (
    echo ✅ 依赖安装成功！
) else (
    echo ❌ 依赖安装失败，请检查网络连接或手动运行 npm install
    pause
    exit /b 1
)

REM 启动开发服务器
echo.
echo 🎯 启动开发服务器...
echo    应用将在 http://localhost:3000 打开
echo    按 Ctrl+C 停止服务器
echo.

npm run dev
pause
