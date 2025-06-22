# 跨境运营助手 - 新手引导系统

## 📋 概述

这是一个完整的新手引导系统演示，实现了文档中定义的8步引导流程，包含智能交互、响应式设计和无障碍访问功能。

## 🎯 核心功能

- ✅ **8步完整引导流程** - 从欢迎到完成的完整体验
- ✅ **点击遮罩进入下一步** - 核心交互方式
- ✅ **智能元素高亮** - 准确定位和动画效果
- ✅ **响应式设计** - 支持桌面、平板、手机
- ✅ **键盘导航** - 完整的键盘操作支持
- ✅ **无障碍访问** - ARIA标签和屏幕阅读器支持
- ✅ **自动进入** - 15秒无操作自动进入下一步
- ✅ **进度持久化** - 支持中断和恢复
- ✅ **主题适配** - 支持浅色/深色模式

## 🚀 快速开始

### 直接运行
```bash
# 在浏览器中打开 demo.html
open demo.html
```

### 本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 然后访问 http://localhost:8000/demo.html
```

## 📁 文件结构

```
guide/
├── demo.html           # 主演示页面
├── guide-config.js     # 引导配置文件  
├── onboarding-guide.js # 核心引导系统
├── guide-styles.css    # 专门样式文件
└── README.md          # 使用说明
```

## 🎮 交互方式

### 主要交互
- **点击遮罩** - 快速进入下一步（核心功能）
- **点击按钮** - 标准导航（上一步/下一步/完成）
- **自动进入** - 15秒无操作自动进入下一步

### 键盘操作
- `Escape` - 退出引导
- `Enter` / `Space` - 进入下一步  
- `←` / `→` - 前/后导航
- `Tab` - 在按钮间切换

## 📋 引导步骤

| 步骤 | 目标元素 | 重点功能 | 时长 |
|------|----------|----------|------|
| 1 | 欢迎 | 整体介绍 | 15秒 |
| 2 | 侧边栏 | 主导航菜单 | 20秒 |
| 3 | 仪表盘 | 数据总览 | 15秒 |
| 4 | 产品库 | 商品管理 | 15秒 |
| 5 | 建联记录 | 合作管理 | 15秒 |
| 6 | **AI助手** | **核心功能** ⭐ | 25秒 |
| 7 | **开始分析** | **操作指导** ⭐ | 20秒 |
| 8 | 完成 | 后续建议 | 15秒 |

## 🔧 配置说明

### 基础配置
```javascript
// guide-config.js
const ONBOARDING_CONFIG = {
    version: "2.1.0",
    enabled: true,
    settings: {
        autoAdvanceDelay: 15000,    // 自动进入延迟
        clickMaskToNext: true,      // 点击遮罩进入下一步
        showProgress: true,         // 显示进度条
        allowKeyboardNav: true,     // 键盘导航
        enableSmoothScrolling: true // 平滑滚动
    }
}
```

### 自定义步骤
```javascript
{
    id: 'custom-step',
    element: '.target-selector',
    title: '步骤标题',
    icon: 'fa-icon-name',
    description: '步骤描述内容',
    position: 'right', // right|left|top|bottom|center
    showButtons: ['previous', 'next'],
    className: 'custom-style'
}
```

## 🎨 样式定制

### CSS变量系统
```css
:root {
    --guide-overlay-bg: rgba(0, 0, 0, 0.6);
    --guide-highlight-color: rgba(59, 130, 246, 0.8);
    --guide-tooltip-bg: #ffffff;
    --guide-animation-duration: 0.3s;
}
```

### 特殊步骤样式
- `.guide-step-welcome` - 欢迎步骤（渐变背景）
- `.guide-step-feature` - 功能介绍（绿色边框）
- `.guide-step-action` - 操作指导（红色边框）
- `.guide-step-complete` - 完成步骤（金色背景）

## 📱 响应式设计

### 桌面端 (≥1024px)
- 提示框最大宽度：380px
- 支持箭头指示
- 完整功能体验

### 平板端 (768px-1023px)  
- 提示框最大宽度：320px
- 保持箭头指示
- 优化触摸交互

### 移动端 (≤767px)
- 提示框固定底部
- 移除箭头指示
- 按钮布局优化

## ♿ 无障碍支持

### ARIA标签
```html
<div class="guide-tooltip" 
     role="dialog"
     aria-labelledby="guide-title"
     aria-describedby="guide-description"
     aria-modal="true">
```

### 屏幕阅读器
- 自动播报步骤信息
- 键盘导航支持
- 高对比度模式适配

## 🧪 测试功能

### 手动测试
1. 清除 localStorage：`localStorage.clear()`
2. 刷新页面自动启动引导
3. 点击"开始引导"按钮手动启动

### 状态重置
```javascript
// 重置引导状态
localStorage.removeItem('guide_completed');
localStorage.removeItem('visit_count');

// 强制显示引导
sessionStorage.setItem('guide_requested', 'true');
```

## 🔍 调试信息

### 控制台输出
- 引导开始/完成事件
- 步骤切换信息
- 元素定位状态
- 用户交互记录

### 常见问题
1. **目标元素未找到** - 检查CSS选择器是否正确
2. **引导不自动启动** - 检查localStorage中是否已标记完成
3. **移动端显示异常** - 检查viewport设置和CSS媒体查询

## 📊 性能指标

- **启动时间** ≤ 500ms
- **步骤切换** ≤ 100ms  
- **内存占用** ≤ 10MB
- **兼容性** Chrome 60+, Firefox 55+, Safari 12+

## 🚀 部署建议

### 生产环境
1. 压缩CSS/JS文件
2. 使用CDN加速字体图标
3. 启用Gzip压缩
4. 配置缓存策略

### 集成到现有项目
```html
<!-- 引入样式 -->
<link rel="stylesheet" href="guide/guide-styles.css">

<!-- 引入脚本 -->
<script src="guide/guide-config.js"></script>
<script src="guide/onboarding-guide.js"></script>

<!-- 初始化 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const guide = new OnboardingGuide(ONBOARDING_CONFIG);
    if (guide.shouldShowGuide()) {
        guide.start();
    }
});
</script>
```

## 📈 分析追踪

### 事件记录
- 引导开始/完成率
- 步骤停留时间
- 跳出位置分析
- 交互方式统计

### 本地存储
- `guide_completed` - 完成状态
- `visit_count` - 访问次数
- `guide_completed_at` - 完成时间

## 🔄 版本信息

- **当前版本**: 2.1.0
- **更新时间**: 2024年12月
- **兼容性**: 现代浏览器
- **依赖**: Font Awesome 6.0+

---

💡 **提示**: 如需自定义或扩展功能，请参考源代码中的详细注释和配置说明。 