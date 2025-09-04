# 个人时间助手 (Personal Time Assistant)

一个智能的个人时间管理和健康提醒应用，帮助您建立更好的生活作息习惯。

## ✨ 功能特点

- **智能时间管理**: 根据时间自动显示当前应该进行的活动
- **详细作息安排**: 从早晨起床到晚上入睡的完整时间规划
- **健康提醒**: 针对不同活动类型提供相应的健康建议
- **进度跟踪**: 实时显示当前活动的进度和剩余时间
- **响应式设计**: 支持桌面和移动设备
- **定时提醒**: 自动喝水提醒等健康功能

## 📱 界面预览

- 主界面显示当前时间和活动
- 侧边栏展示全天活动安排
- 健康提醒和下一个活动预告
- 美观的进度条和状态指示

## 🚀 本地开发

### 环境要求

- Node.js 18 或更高版本
- npm 或 yarn

### 安装和运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-time-assistant.git
   cd personal-time-assistant
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **在浏览器中打开**
   ```
   http://localhost:3000
   ```

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中。

## 📦 部署到 GitHub Pages

### 自动部署（推荐）

本项目已配置 GitHub Actions 自动部署。只需：

1. **推送代码到 GitHub**
2. **GitHub Actions 会自动构建和部署**
3. **在仓库设置中启用 GitHub Pages**

### 手动部署

```bash
npm run deploy
```

## 🔧 配置说明

### 修改仓库信息

在 `package.json` 中更新以下字段：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/personal-time-assistant.git"
  },
  "homepage": "https://YOUR_USERNAME.github.io/personal-time-assistant"
}
```

### 自定义活动安排

在 `src/App.jsx` 中的 `activities` 数组里修改活动安排：

```javascript
const activities = [
  {
    id: "wake_up",
    name: "起床与喝水",
    startTime: "08:00",
    endTime: "08:05",
    description: "起床后喝一杯温水...",
    tips: ["..."],
    category: "morning"
  },
  // 添加更多活动...
];
```

## 📋 GitHub 仓库设置步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击 "New repository"
3. 仓库名称：`personal-time-assistant`
4. 选择 "Public"
5. 不要初始化 README（因为我们已有文件）

### 2. 推送代码

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Personal Time Assistant"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/personal-time-assistant.git

# 推送到 GitHub
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入仓库的 "Settings" 页面
2. 滚动到 "Pages" 部分
3. Source 选择 "GitHub Actions"
4. 保存设置

### 4. 触发部署

- 推送代码后，GitHub Actions 会自动运行
- 在 "Actions" 标签页可以查看部署状态
- 部署完成后，应用会在 `https://YOUR_USERNAME.github.io/personal-time-assistant` 可用

## 🛠️ 技术栈

- **React 18**: 前端框架
- **Vite**: 构建工具
- **Tailwind CSS**: 样式框架
- **GitHub Actions**: CI/CD 自动部署
- **GitHub Pages**: 静态网站托管

## 📝 活动类别

- **morning**: 早晨活动
- **work**: 工作时间
- **midday**: 午休时间
- **exercise**: 锻炼时间
- **relaxation**: 放松时间
- **homeRelaxation**: 在家放松
- **general**: 通用时间

每个类别都有对应的健康提醒和建议。

## 🎨 自定义样式

项目使用 Tailwind CSS，可以轻松自定义：

- 在 `tailwind.config.js` 中扩展主题
- 在 `src/index.css` 中添加全局样式
- 组件内使用 Tailwind 类名进行样式调整

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有为这个项目提供建议和反馈的朋友们！

---

⭐ 如果这个项目对您有帮助，请给它一个 Star！
