# 🚀 快速启动指南

## ⚠️ 重要提醒

**始终确保你在项目目录中运行命令！**

```bash
# 正确的做法：先导航到项目目录
cd /Users/eason/IdeaProjects/personal-time-assistant

# 然后运行命令
npm run preview
```

## 📂 目录说明

- **错误的目录**: `~` (用户主目录)
- **正确的目录**: `/Users/eason/IdeaProjects/personal-time-assistant`

## 🛠️ 可用的启动方式

### 方式1：直接使用脚本（推荐）

```bash
# 开发服务器
./start.sh

# 预览服务器
./preview.sh
```

### 方式2：手动命令

```bash
# 确保在正确目录
cd /Users/eason/IdeaProjects/personal-time-assistant

# 开发模式
npm run dev

# 预览模式（需要先构建）
npm run build
npm run preview
```

## 🌐 服务器地址

- **开发服务器**: http://localhost:3000
- **预览服务器**: http://localhost:4173

## 🔍 故障排除

如果遇到 "Could not read package.json" 错误：

1. 检查当前目录：`pwd`
2. 导航到项目目录：`cd /Users/eason/IdeaProjects/personal-time-assistant`
3. 验证文件存在：`ls package.json`
4. 然后运行命令

## 📱 验证应用正常

访问以下网址确认应用工作：
- ✅ 显示当前时间
- ✅ 侧边栏可以展开/收起
- ✅ 活动卡片显示正确颜色
- ✅ 进度条有动画效果
- ✅ 健康提醒正常显示

---

💡 **小贴士**: 将项目目录添加到书签，方便快速访问！
