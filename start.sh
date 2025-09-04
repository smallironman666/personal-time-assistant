#!/bin/bash

# 个人时间助手 - 快速启动脚本
echo "🚀 个人时间助手快速启动脚本"
echo "=================================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装。请先安装 Node.js (推荐版本 18+)"
    echo "   下载地址: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装。请确保 Node.js 正确安装"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"

# 安装依赖
echo ""
echo "📦 正在安装项目依赖..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功！"
else
    echo "❌ 依赖安装失败，请检查网络连接或手动运行 npm install"
    exit 1
fi

# 启动开发服务器
echo ""
echo "🎯 启动开发服务器..."
echo "   应用将在 http://localhost:3000 打开"
echo "   按 Ctrl+C 停止服务器"
echo ""

npm run dev
