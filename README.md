# 跨境运营助手 (Cross-border Operation Assistant)

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Themes](https://img.shields.io/badge/themes-3+智能切换-purple.svg)
![Auto Switch](https://img.shields.io/badge/auto--switch-✓-green.svg)

一个面向跨境电商运营人员的现代化综合管理平台，集成AI助手、产品管理、网红建联、数据分析等功能。🌟 **全新智能主题系统2.0** - 支持系统主题跟随和时间自动切换！

## ✨ 主要功能

### 🤖 AI助手
- 智能产品分析
- 自动化邮件生成
- 网红推荐算法
- 对话式交互

### 📦 产品管理
- 产品库管理
- 批量操作
- 标签分类
- 统计分析

### 🎯 网红建联
- 网红发现
- 合作记录
- 沟通跟踪
- 效果评估

### 📊 数据分析
- 实时仪表盘
- 趋势分析
- 转化漏斗
- KPI监控

### 🎨 智能主题系统 2.0 ⭐ NEW

#### 🤖 四种智能模式
- **🌟 自动模式**: 优先跟随系统主题，无系统设置时根据时间自动切换
- **☀️ 浅色模式**: 强制使用浅色主题（现代简约），适合白天办公
- **🌙 深色模式**: 强制使用深色主题（深色专业），适合夜晚工作
- **🚀 外星人模式**: 强制使用外星人主题，科技游戏风格

#### 🎯 三大精美主题
- **现代简约**: 清新简洁的日间设计风格，Material Design风格
- **深色专业**: 高端专业的暗色主题，长时间使用护眼
- **外星人**: 未来科技感的游戏风格，灵感来自Alienware官网 🚀

#### 🔥 智能特性
- **系统主题跟随**: 支持macOS、Windows、iOS、Android系统主题自动检测
- **时间自动切换**: 6:00-18:00自动浅色，18:00-6:00自动深色
- **实时响应**: 系统主题变化时立即自动切换
- **设置持久化**: 所有偏好设置自动保存，重启后保持
- **平滑过渡**: 主题切换时丝滑流畅的动画效果

## 🚀 快速开始

### 环境要求

- 现代浏览器 (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- 支持CSS变量和ES6+语法
- 本地服务器环境 (推荐)

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-repo/cross-border-assistant.git
   cd cross-border-assistant
   ```

2. **启动项目**
   ```bash
   # 方法1: 直接打开HTML文件
   open public/index.html
   
   # 方法2: 使用Python本地服务器
   python -m http.server 8000
   
   # 方法3: 使用Node.js serve
   npx serve .
   
   # 方法4: 使用Live Server扩展（推荐）
   # 在VS Code中安装Live Server扩展，右键public/index.html选择"Open with Live Server"
   ```

3. **访问应用**
   ```
   本地文件: file:///path/to/public/index.html
   本地服务器: http://localhost:8000
   ```

## 🎨 智能主题系统详细指南

### 🤖 自动主题切换使用方法

1. **访问主题设置**
   - 点击右下角的 🎨 主题切换按钮
   - 主题面板会从底部弹出

2. **选择智能模式**
   - **🌟 自动**: 智能检测系统设置，优先使用系统深色/浅色设置，无系统设置时根据时间自动切换
   - **☀️ 浅色**: 始终使用浅色主题（现代简约），忽略系统设置和时间
   - **🌙 深色**: 始终使用深色主题（深色专业），忽略系统设置和时间
   - **🚀 外星人**: 始终使用外星人主题，炫酷科技风格

3. **系统主题跟随设置**
   
   **macOS设置方法:**
   ```
   系统偏好设置 → 通用 → 外观 → 选择"浅色"或"深色"
   ```
   
   **Windows设置方法:**
   ```
   设置 → 个性化 → 颜色 → 选择默认应用模式："浅色"或"深色"
   ```
   
   **iOS设置方法:**
   ```
   设置 → 显示与亮度 → 外观 → 选择"浅色"或"深色"
   ```
   
   **Android设置方法:**
   ```
   设置 → 显示 → 深色主题 → 开启/关闭
   ```

4. **时间自动切换规则**
   - **白天时间**: 6:00 - 18:00 → 自动使用"现代简约"主题
   - **夜晚时间**: 18:00 - 6:00 → 自动使用"深色专业"主题
   - **实时检测**: 每分钟检查时间变化，自动切换

### 🎯 四种主题模式详解

#### 🌅 现代简约主题
- **适用场景**: 日常办公、白天使用
- **设计特点**: 清新明亮、Material Design风格
- **颜色搭配**: 蓝白主调，简洁大方
- **字体**: PingFang SC、Helvetica Neue等现代字体

#### 🌙 深色专业主题  
- **适用场景**: 长时间工作、夜晚使用、护眼需求
- **设计特点**: 专业高效、商务感强
- **颜色搭配**: 深灰蓝主调，低对比度保护视力
- **字体**: Inter、SF Pro Display等专业字体

#### 🚀 外星人主题
- **适用场景**: 游戏爱好者、科技感需求、个性化展示
- **设计特点**: 未来科技感、炫酷特效、游戏风格
- **颜色搭配**: 深空灰底色 + 紫色科技点缀 + 荧光绿装饰
- **特殊效果**: 轻微发光、动态粒子、扫描线动画、按钮光晕
- **字体**: Orbitron、JetBrains Mono等科技字体
- **灵感来源**: Alienware官网设计风格

### 💾 设置持久化

所有主题设置都会自动保存到浏览器本地存储：
- **自动模式选择**: auto/light/dark/manual
- **手动选择的主题**: modern/professional/alien
- **页面刷新保持**: 重新打开页面时恢复之前的设置
- **跨设备同步**: 在同一浏览器的不同标签页间同步

## 📁 项目结构

```
跨境运营助手/
├── public/
│   └── index.html                  # 主页面 - 引入智能主题系统
├── src/
│   ├── main.js                     # 主脚本文件 - 业务逻辑
│   ├── notification-update.js      # 通知功能模块
│   ├── styles/
│   │   └── style.css               # 主样式文件 - 使用完整CSS变量系统
│   └── themes/                     # 🎨 智能主题系统 2.0
│       ├── theme-config.js         # 主题配置 + 自动切换配置 (867行)
│       ├── theme-manager.js        # 主题管理器 + 智能切换逻辑 (624行)
│       ├── theme-switcher.css      # 主题切换器样式 + 自动模式UI (286行)
│       └── alien-effects.css       # 外星人主题特效样式 (774行)
├── .cursor/
│   └── rules/
│       └── rules.mdc               # 项目开发规范文档
└── README.md                       # 项目文档（本文件）
```

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化标记、无障碍访问
- **CSS3**: Flexbox/Grid布局、CSS变量系统、动画过渡
- **JavaScript (ES6+)**: 模块化、异步处理、事件系统、媒体查询API
- **Chart.js**: 数据可视化和图表
- **RemixIcon**: 现代图标库

### 智能主题技术
- **CSS变量系统**: 80+个主题变量，实现即时主题切换
- **媒体查询API**: `prefers-color-scheme` 检测系统主题
- **本地存储**: localStorage持久化用户设置
- **定时器优化**: 智能时间检测，性能优化
- **事件系统**: 系统主题变更监听和响应

### 设计特性
- **响应式设计**: 适配桌面、平板、移动端
- **无障碍访问**: 遵循WCAG 2.1 AA级标准
- **现代UI**: Material Design + 专业商务 + 科技游戏风格
- **智能主题**: 自动检测用户偏好，提供最佳视觉体验

## 📱 响应式支持

| 设备类型 | 屏幕尺寸 | 布局特点 | 主题切换器位置 |
|---------|----------|----------|---------------|
| 桌面端 | ≥1200px | 完整侧边栏 + 主内容区 | 右下角 56px 按钮 |
| 平板端 | 768px-1199px | 折叠侧边栏 + 自适应布局 | 右下角 48px 按钮 |
| 移动端 | <768px | 抽屉式导航 + 单列布局 | 右下角 48px 按钮 |

所有设备均支持完整的智能主题功能。

## 🎯 使用指南

### 1. 首次使用

1. **打开应用**: 访问 public/index.html 或启动本地服务器
2. **登录系统**: 选择Google登录或手机号登录（演示界面）
3. **主题设置**: 首次使用会使用默认的"自动模式"
4. **个性化**: 根据个人喜好调整主题设置

### 2. 功能导航

- **🏠 仪表盘**: 查看总体数据概览和关键指标
- **📦 产品库**: 管理您的产品信息和库存
- **🤖 AI助手**: 使用智能分析功能和AI建议
- **🎯 建联记录**: 跟踪网红合作进展和效果
- **📊 数据分析**: 深入分析业务数据和趋势

### 3. AI助手使用

1. 点击侧边栏"AI助手"
2. 选择"新建商品分析"
3. 输入产品信息或Amazon/eBay链接
4. 获得智能分析结果和营销建议
5. 导出分析报告

### 4. 智能主题最佳实践 ⭐

#### 🌟 推荐配置
- **办公场景**: 使用"自动模式"，跟随系统设置
- **长期工作**: 白天使用"浅色模式"，夜晚使用"深色模式"
- **游戏娱乐**: 选择"外星人主题"，体验科技感
- **演示展示**: 根据受众选择合适主题

#### ⚡ 快捷操作
- **快速切换**: 点击主题按钮 → 选择模式 → 立即生效
- **系统跟随**: 设置为"自动模式" → 修改系统主题 → 自动响应
- **时间切换**: 设置为"自动模式" → 到达切换时间点 → 自动切换
- **临时切换**: 手动模式下快速尝试不同主题

#### 🎨 主题搭配建议
- **自动模式**: 跟随系统设置，智能切换，推荐日常使用
- **浅色模式**: 固定现代简约主题，适合白天办公
- **深色模式**: 固定深色专业主题，适合夜晚工作和护眼
- **外星人模式**: 固定外星人主题，个性化展示和游戏娱乐

## 🔧 开发指南

### 🎨 核心开发规范 ⭐⭐⭐

#### 🚨 CSS变量强制规范

**绝对禁止硬编码任何颜色值！必须使用CSS变量系统。**

```css
/* ✅ 正确使用方式 */
.component {
    color: var(--primary-color);
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 4px var(--shadow-color);
    border-radius: var(--radius-base);
    padding: var(--spacing-base);
    font-family: var(--font-family);
    transition: all var(--animation-duration) var(--animation-easing);
}

.component:hover {
    background: var(--surface-hover);
    border-color: var(--border-hover);
    box-shadow: 0 4px 8px var(--shadow-hover);
}

/* ❌ 严禁硬编码 */
.component {
    color: #1976d2;           /* 硬编码主色 */
    background: #ffffff;      /* 硬编码背景 */
    border: 1px solid #e0e0e0; /* 硬编码边框 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 硬编码阴影 */
}
```

#### 📝 可用CSS变量分类

1. **🎨 品牌色系**: `--primary-*`, `--secondary-*` (含 -dark, -light, -pale, -hover 变体)
2. **🎯 状态色系**: `--success-*`, `--warning-*`, `--error-*`, `--info-*` (含完整变体)
3. **📝 文本色系**: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-disabled`, `--text-inverse`
4. **🏠 背景色系**: `--background-*`, `--surface-*` (含 hover, active, disabled 状态)
5. **🖼️ 边框色系**: `--border-*` (含 light, dark, focus, hover 状态)
6. **🌫️ 阴影色系**: `--shadow-*`, `--overlay-*` (含不同强度)
7. **⚫ 灰色系统**: `--gray-50` 到 `--gray-900` (10个层级)
8. **💫 透明度系**: `--*-alpha-XX` (5%-90%透明度变体)
9. **🎛️ 交互状态**: `--hover-*`, `--active-*`, `--selected-*`, `--disabled-*`
10. **📊 数据可视化**: `--chart-primary` 到 `--chart-sixth`

#### 🔧 智能主题开发接口

```javascript
// 主题管理器API
window.themeManager.setAutoMode('auto');    // 设置自动模式
window.themeManager.setAutoMode('light');   // 强制浅色
window.themeManager.setAutoMode('dark');    // 强制深色
window.themeManager.setAutoMode('alien');   // 外星人模式

// 手动切换主题
window.themeManager.setTheme('modern');        // 现代简约
window.themeManager.setTheme('professional');  // 深色专业
window.themeManager.setTheme('alien');         // 外星人

// 获取当前状态
window.themeManager.getCurrentTheme();      // 当前主题ID
window.themeManager.autoMode;              // 当前自动模式
window.themeManager.isDarkTheme();         // 是否深色主题
```

#### 🎯 主题适配检查清单

开发新组件时必须检查：
- [ ] 所有颜色均使用CSS变量，无任何硬编码
- [ ] 在三个主题下显示效果正常
- [ ] 交互状态（hover/active/focus/disabled）颜色变化合理
- [ ] 文字对比度符合WCAG 2.1 AA级标准
- [ ] 响应式设计在各设备尺寸下正常
- [ ] 支持自动主题切换，无样式冲突

### 📋 添加新功能

1. **分析功能需求**，确定需要的新CSS变量
2. **在theme-config.js中为所有主题添加变量**
3. **更新CSS变量映射关系**
4. **在样式中严格使用CSS变量**
5. **测试三个主题下的显示效果**
6. **检查响应式兼容性**
7. **更新开发文档**

### 🎨 新主题开发

参考 `.cursor/rules/rules.mdc` 中的详细规范，包含完整的颜色系统和开发指南。

### ⚡ 性能优化要求

- **CSS变量**: 实现即时主题切换，避免重绘
- **事件防抖**: 优化系统主题检测和时间检查
- **懒加载**: 按需加载图片和内容
- **缓存策略**: 缓存主题配置，减少重复计算
- **内存管理**: 完善的资源清理机制，避免内存泄漏

## 🧪 测试

### 智能主题测试清单

#### 🤖 自动主题功能测试
- [ ] **系统主题跟随**: 修改系统深色/浅色设置，应用自动响应
- [ ] **时间自动切换**: 在6:00和18:00时间点测试自动切换
- [ ] **四种模式切换**: auto/light/dark/alien模式正常工作
- [ ] **设置持久化**: 刷新页面后设置保持
- [ ] **跨标签页同步**: 在多个标签页中测试设置同步

#### 🎨 手动主题测试
- [ ] **三个主题切换**: 现代简约/深色专业/外星人主题正常切换
- [ ] **UI组件适配**: 所有界面元素在各主题下显示正常
- [ ] **交互状态**: hover/active/focus状态颜色变化正确
- [ ] **过渡动画**: 主题切换动画流畅自然
- [ ] **主题切换器**: UI界面响应正常，按钮状态正确

#### 📱 响应式测试
- [ ] **桌面端**: 1920x1080, 1366x768分辨率测试
- [ ] **平板端**: 768x1024, 1024x768分辨率测试  
- [ ] **移动端**: 375x667, 414x896分辨率测试
- [ ] **主题切换器**: 各尺寸下显示和操作正常

#### 🔧 兼容性测试
- [ ] **Chrome**: 最新版本和Chrome 80+
- [ ] **Firefox**: 最新版本和Firefox 75+
- [ ] **Safari**: 最新版本和Safari 13+
- [ ] **Edge**: 最新版本和Edge 80+
- [ ] **移动浏览器**: iOS Safari, Android Chrome

#### ⚡ 性能测试
- [ ] **切换响应时间**: 主题切换 < 300ms
- [ ] **系统检测延迟**: 系统主题检测 < 100ms
- [ ] **内存使用**: 长时间使用无内存泄漏
- [ ] **CPU占用**: 自动检测功能CPU占用合理

### 手动测试步骤

1. **基础功能测试**
   ```bash
   # 打开应用
   # 检查控制台输出，确认主题系统初始化成功
   # 测试四种智能模式切换
   # 测试三个主题手动切换
   ```

2. **系统集成测试**
   ```bash
   # macOS: 系统偏好设置 → 通用 → 外观 → 切换浅色/深色
   # Windows: 设置 → 个性化 → 颜色 → 切换应用模式
   # 观察应用是否自动响应
   ```

3. **时间切换测试**
   ```bash
   # 修改系统时间到 5:59，观察6:00时是否自动切换到浅色
   # 修改系统时间到 17:59，观察18:00时是否自动切换到深色
   ```

## 🚀 部署指南

### 部署前检查清单

#### 📁 文件完整性
- [ ] `public/index.html` - 主页面文件
- [ ] `src/styles/style.css` - 主样式文件（使用CSS变量）
- [ ] `src/main.js` - 主脚本文件
- [ ] `src/notification-update.js` - 通知模块
- [ ] `src/themes/theme-config.js` - 主题配置文件
- [ ] `src/themes/theme-manager.js` - 主题管理器
- [ ] `src/themes/theme-switcher.css` - 主题切换器样式

#### 🔧 脚本引入顺序
```html
<!-- 在public/index.html中的正确引入顺序 -->
<script src="../src/themes/theme-config.js"></script>
<script src="../src/themes/theme-manager.js"></script>
<script src="../src/notification-update.js"></script>
<script src="../src/main.js"></script>
```

#### ✅ 功能验证
打开浏览器控制台，应该看到以下输出：
```
主题管理器初始化完成，当前主题: modern
自动主题系统初始化完成 - 模式: auto
系统主题检测: 浅色/深色
时间主题检测: XX时 - 白天/夜晚
主题已应用: 现代简约
```

### 生产环境部署

1. **静态文件托管** (推荐)
   ```bash
   # 上传到GitHub Pages、Netlify、Vercel等
   # 确保所有文件路径正确
   # 启用HTTPS以支持系统主题检测
   ```

2. **服务器部署**
   ```bash
   # 使用Nginx、Apache等Web服务器
   # 配置正确的MIME类型
   # 启用gzip压缩提升性能
   ```

3. **CDN加速** (可选)
   ```bash
   # 将静态资源部署到CDN
   # 注意保持文件引用路径的一致性
   ```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

### 开发规范要求
1. **严格遵循CSS变量规范** - 绝不允许硬编码颜色值
2. **确保智能主题兼容** - 新功能必须支持三个主题
3. **测试自动切换功能** - 验证系统主题跟随和时间切换
4. **保持响应式设计** - 适配所有设备尺寸
5. **遵循代码注释规范** - 添加必要的功能说明

### 贡献流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 遵循开发规范进行开发
4. 完成智能主题适配测试
5. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
6. 推送到分支 (`git push origin feature/AmazingFeature`)
7. 开启 Pull Request

### 代码审查要点
- [ ] CSS变量使用规范
- [ ] 智能主题兼容性
- [ ] 响应式设计适配
- [ ] 性能影响评估
- [ ] 代码质量和注释

## 🐛 问题反馈

### 常见问题自查

#### 🤖 智能主题相关
- **主题不自动切换**: 检查浏览器是否支持 `prefers-color-scheme`
- **设置不保存**: 检查浏览器localStorage权限
- **时间切换不工作**: 确认自动模式设置为'auto'
- **系统主题不响应**: 检查操作系统主题设置

#### 🎨 主题显示问题
- **颜色显示异常**: 检查是否使用了硬编码颜色值
- **部分元素不变色**: 确认CSS变量使用正确
- **外星人主题特效不显示**: 检查浏览器对CSS动画的支持

### 反馈渠道
- [GitHub Issues](https://github.com/your-repo/issues) - Bug报告和功能请求
- [讨论区](https://github.com/your-repo/discussions) - 使用问题和建议讨论
- 邮箱: support@example.com - 紧急问题联系

## 📈 更新日志

### 🚀 v2.0.0 (最新版本) - 智能主题系统

#### 🌟 重大更新
- **智能自动主题切换**: 支持系统主题跟随和时间自动切换
- **四种切换模式**: auto(自动)、light(浅色)、dark(深色)、alien(外星人)
- **全平台支持**: macOS、Windows、iOS、Android系统主题检测
- **时间智能切换**: 6:00-18:00白天模式，18:00-6:00夜晚模式

#### 🎨 界面升级
- **全新UI设计**: 主题切换器界面重新设计，支持自动模式选择
- **完整CSS变量系统**: 80+个主题变量，覆盖所有设计元素
- **流畅动画效果**: 主题切换时的平滑过渡动画
- **响应式优化**: 适配各种设备尺寸的主题切换器

#### ⚡ 性能优化
- **智能缓存机制**: 主题配置缓存，减少重复计算
- **批量更新策略**: 避免频繁DOM操作，提升切换性能
- **定时器优化**: 时间检测每60秒进行一次，平衡功能与性能
- **内存管理**: 完善的资源清理机制，避免内存泄漏

#### 💾 持久化存储
- **设置自动保存**: 用户偏好自动保存到localStorage
- **跨会话保持**: 页面刷新后设置完全保持
- **多标签页同步**: 同一浏览器的不同标签页设置同步

### 📋 v1.0.0 (基础版本)
- ✅ 三主题系统（现代简约、深色专业、外星人）
- ✅ 基础主题管理器
- ✅ 响应式主题切换器
- ✅ CSS变量重构
- ✅ 平滑过渡动画

### 🔮 计划更新 (v2.1+)
- 🔄 **主题编辑器**: 可视化自定义主题颜色
- 🔄 **主题导入/导出**: 支持主题配置的导入导出
- 🔄 **更多预设主题**: 增加更多风格的预设主题
- 🔄 **组件级主题定制**: 支持单独组件的主题定制
- 🔄 **主题动画效果库**: 丰富的主题切换动画效果
- 🔄 **暗色模式优化**: 进一步优化深色主题的可读性
- 🔄 **无障碍功能增强**: 更好的屏幕阅读器支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目和技术：

### 📚 核心技术
- [Chart.js](https://www.chartjs.org/) - 强大的数据可视化库
- [RemixIcon](https://remixicon.com/) - 精美的开源图标库
- [Material Design](https://material.io/) - Google的设计系统指导

### 🎨 设计灵感
- [Alienware官网](https://www.alienware.com/) - 外星人主题设计灵感来源
- [Apple Human Interface Guidelines](https://developer.apple.com/) - 系统主题跟随设计参考
- [Microsoft Fluent Design](https://www.microsoft.com/design/fluent/) - 现代UI设计理念

### 🔧 开发工具
- [CSS Variables](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties) - 强大的CSS变量系统
- [prefers-color-scheme](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme) - 系统主题检测API
- [localStorage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) - 本地存储解决方案

## 📞 联系我们

- **项目主页**: [https://github.com/your-repo](https://github.com/your-repo)
- **官方网站**: [https://your-website.com](https://your-website.com)
- **技术支持**: support@example.com
- **商务合作**: business@example.com

---

⭐️ **如果这个项目对您有帮助，请给我们一个星标！您的支持是我们持续改进的动力。**

🎨 **体验智能主题系统，让您的跨境运营更加高效和个性化！** 