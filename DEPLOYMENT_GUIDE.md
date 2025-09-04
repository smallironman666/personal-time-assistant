# 🚀 个人时间助手 - GitHub 部署完整指南

## 📋 前提条件

- 已安装 Node.js (推荐 18+ 版本)
- 已安装 Git
- 拥有 GitHub 账号

## 🛠️ 第一步：本地测试

在推送到 GitHub 之前，先确保项目在本地运行正常：

```bash
# 进入项目目录
cd /Users/eason/IdeaProjects/personal-time-assistant

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

如果一切正常，应该能在 `http://localhost:3000` 看到应用运行。

## 📱 第二步：创建 GitHub 仓库

1. **登录 GitHub**: https://github.com
2. **创建新仓库**:
   - 点击右上角的 "+"，选择 "New repository"
   - Repository name: `personal-time-assistant`
   - Description: `个人时间助手 - 智能时间管理和健康提醒应用`
   - 选择 "Public"（如果想要免费使用 GitHub Pages）
   - **不要勾选** "Add a README file"（我们已经有了）
   - **不要勾选** "Add .gitignore"（我们已经有了）
   - 点击 "Create repository"

## 🔄 第三步：初始化 Git 和推送代码

在项目目录中执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "🎉 Initial commit: Personal Time Assistant with complete features"

# 设置默认分支为 main
git branch -M main

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/personal-time-assistant.git

# 推送代码到 GitHub
git push -u origin main
```

**⚠️ 重要**: 将上面命令中的 `YOUR_USERNAME` 替换为你的实际 GitHub 用户名！

## ⚙️ 第四步：配置 GitHub Pages

1. **进入仓库设置**:
   - 在 GitHub 仓库页面，点击 "Settings" 标签
   
2. **配置 Pages**:
   - 在左侧菜单中找到 "Pages"
   - Source 选择 "GitHub Actions"
   - 点击 "Save"

3. **更新仓库信息**:
   - 编辑 `package.json` 文件
   - 将其中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名：
   ```json
   "repository": {
     "type": "git", 
     "url": "https://github.com/YOUR_USERNAME/personal-time-assistant.git"
   },
   "homepage": "https://YOUR_USERNAME.github.io/personal-time-assistant"
   ```

4. **更新 Vite 配置**:
   - 编辑 `vite.config.js` 文件
   - 确认 `base` 路径正确：
   ```javascript
   base: '/personal-time-assistant/',
   ```

## 🚀 第五步：自动部署

1. **提交配置更改**:
   ```bash
   git add .
   git commit -m "📝 Update repository configuration"
   git push
   ```

2. **查看部署状态**:
   - 在 GitHub 仓库页面点击 "Actions" 标签
   - 你会看到一个部署工作流正在运行
   - 等待部署完成（通常需要 2-3 分钟）

3. **访问网站**:
   - 部署完成后，你的网站会在以下地址可用：
   - `https://YOUR_USERNAME.github.io/personal-time-assistant`

## 📊 部署状态检查

### 成功部署的标志：
- ✅ Actions 标签页显示绿色的勾
- ✅ Settings > Pages 显示网站地址
- ✅ 能够正常访问网站

### 常见问题解决：

**问题 1**: Actions 失败
- 检查 `package.json` 中的依赖是否正确
- 确保所有文件都已正确提交

**问题 2**: 网站显示 404
- 检查 `vite.config.js` 中的 `base` 配置
- 确认仓库名称拼写正确

**问题 3**: 样式不加载
- 检查 Tailwind CSS 配置
- 确保 PostCSS 配置文件存在

## 🔄 日后更新流程

当你需要更新应用时：

```bash
# 修改代码后...

# 添加更改
git add .

# 提交更改
git commit -m "✨ Add new feature or 🐛 Fix bug description"

# 推送到 GitHub
git push
```

GitHub Actions 会自动重新部署你的更改！

## 📱 移动设备优化

应用已经针对移动设备进行了优化：
- 响应式设计
- 触摸友好的界面
- 适配不同屏幕尺寸

## 🎯 功能扩展建议

你可以继续添加以下功能：
- 活动完成统计
- 自定义提醒音
- 数据导出功能
- 多人协作模式
- 与日历应用集成

## 🆘 需要帮助？

如果遇到问题：
1. 检查 GitHub Actions 的错误日志
2. 确认所有配置文件都正确
3. 检查 GitHub Pages 设置
4. 参考 README.md 中的详细说明

---

🎉 **恭喜！你的个人时间助手现在已经在线了！**

记住你的网站地址：`https://YOUR_USERNAME.github.io/personal-time-assistant`
