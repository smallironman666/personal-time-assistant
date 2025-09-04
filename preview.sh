#!/bin/bash

# 个人时间助手 - 预览服务器启动脚本
echo "🚀 个人时间助手 - 预览服务器"
echo "=================================="

# 确保在正确的目录
cd /Users/eason/IdeaProjects/personal-time-assistant

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json 文件"
    echo "   请确保在正确的项目目录中"
    exit 1
fi

echo "✅ 当前目录: $(pwd)"
echo "✅ 找到 package.json 文件"

# 检查是否需要构建
if [ ! -d "dist" ]; then
    echo "📦 未找到 dist 目录，开始构建..."
    npm run build
fi

# 启动预览服务器
echo ""
echo "🎯 启动预览服务器..."
echo "   预览地址: http://localhost:4173"
echo "   按 Ctrl+C 停止服务器"
echo ""

npm run preview
