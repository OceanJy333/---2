/**
 * 新手引导系统配置文件
 * 根据需求文档定制的8步引导流程
 */

const ONBOARDING_CONFIG = {
    version: "2.1.0",
    name: "main_onboarding",
    enabled: true,
    
    // 引导系统设置 - 符合文档要求的配置
    settings: {
        autoAdvanceDelay: 15000,        // 15秒自动进入下一步
        clickMaskToNext: true,          // 点击遮罩进入下一步（核心功能）
        showProgress: true,             // 显示进度指示器
        allowKeyboardNav: true,         // 启用键盘导航（可访问性要求）
        allowSkip: true,                // 允许跳过（显著的跳过按钮）
        pauseOnHover: true,            // 鼠标悬停时暂停自动进入
        showCloseButton: true,         // 显示关闭按钮
        enableSmoothScrolling: true,   // 启用平滑滚动
        highlightPadding: 8,           // 高亮元素内边距

        // 新增的可访问性和性能设置
        minFontSize: 14,               // 最小字体大小（WCAG要求）
        contrastRatio: 4.5,            // 对比度要求（WCAG 4.5:1）
        maxMemoryUsage: 10485760,      // 最大内存使用（10MB）
        errorThreshold: 5,             // 错误阈值
        enablePerformanceMonitoring: true, // 启用性能监控
        enableErrorHandling: true      // 启用错误处理
    },
    
    // 8个引导步骤配置
    steps: [
        {
            id: 'welcome',
            element: 'body',
            title: '👋 欢迎使用跨境运营助手！',
            icon: 'fa-hand-wave',
            description: `
                我将为您介绍平台的主要功能，帮助您快速上手。
                <br><br>这个引导过程包含<strong>8个步骤</strong>，大约需要1.5-2分钟。
                <br>您可以随时按 <strong>Escape</strong> 键退出，或者<strong>点击遮罩层任意位置</strong>进入下一步。
                <br><br><i class="fas fa-info-circle text-blue-500"></i> 
                <strong>小贴士：</strong>建议您跟随引导完整体验一遍，这将帮助您更好地掌握平台功能。
            `,
            position: 'center',
            showButtons: ['next'],
            className: 'guide-step-welcome',
            keyboardHint: '使用 Tab 键导航，Enter 键继续，Escape 键退出',
            ariaLabel: '欢迎使用跨境运营助手',
            metadata: { 
                importance: 'normal', 
                category: 'introduction',
                estimatedDuration: 15
            }
        },
        
        {
            id: 'sidebar-overview',
            element: '.sidebar',
            title: '📋 主导航菜单',
            icon: 'fa-clipboard-list',
            description: `
                这里是主要的功能导航区域，包含平台的所有核心功能模块：
                <br><br><i class="fas fa-chart-line text-blue-600"></i> <strong>仪表盘</strong> - 查看业务数据总览
                <br><i class="fas fa-box text-orange-600"></i> <strong>产品库</strong> - 管理您的商品信息  
                <br><i class="fas fa-users text-purple-600"></i> <strong>建联记录</strong> - 跟踪合作进展
                <br><i class="fas fa-robot text-green-600"></i> <strong>AI助手</strong> - 智能分析和推荐
                <br><br><i class="fas fa-lightbulb text-yellow-500"></i> 
                <strong>提示：</strong>点击遮罩层任意位置可以快速进入下一步！
            `,
            position: 'right',
            showButtons: ['previous', 'next'],
            className: 'guide-step-sidebar',
            ariaLabel: '主导航菜单介绍',
            metadata: { 
                importance: 'normal', 
                category: 'navigation',
                estimatedDuration: 20
            }
        },
        
        {
            id: 'dashboard-menu',
            element: '.menu-item:first-child',
            title: '📊 仪表盘',
            icon: 'fa-chart-line',
            description: `
                仪表盘提供了业务数据的全面概览，您可以在这里查看：
                <br><br><i class="fas fa-handshake text-blue-500"></i> <strong>活跃合作数量</strong> - 正在进行的合作项目
                <br><i class="fas fa-envelope-open text-green-500"></i> <strong>邮件回复率</strong> - 建联效果统计
                <br><i class="fas fa-trending-up text-purple-500"></i> <strong>潜在触达量</strong> - 推广覆盖人群
                <br><i class="fas fa-calendar-week text-orange-500"></i> <strong>本周新增建联</strong> - 最新进展
                <br><br>通过这些关键指标，您可以快速了解业务表现并制定优化策略。
            `,
            position: 'right',
            showButtons: ['previous', 'next'],
            className: 'guide-step-dashboard',
            ariaLabel: '仪表盘功能介绍',
            metadata: { 
                importance: 'normal', 
                category: 'feature',
                estimatedDuration: 15
            }
        },
        
        {
            id: 'product-library',
            element: '.menu-item:nth-child(2)',
            title: '📦 产品库',
            icon: 'fa-box',
            description: `
                产品库是管理您所有商品的中心，在这里您可以：
                <br><br><i class="fas fa-plus-circle text-green-500"></i> <strong>添加产品</strong> - 录入新商品信息
                <br><i class="fas fa-images text-blue-500"></i> <strong>上传图片</strong> - 展示产品外观
                <br><i class="fas fa-tags text-orange-500"></i> <strong>设置价格</strong> - 管理价格策略
                <br><i class="fas fa-edit text-purple-500"></i> <strong>编辑详情</strong> - 完善产品描述
                <br><br>完善的产品信息将帮助AI更准确地匹配合适的合作博主。
            `,
            position: 'right',
            showButtons: ['previous', 'next'],
            className: 'guide-step-products',
            ariaLabel: '产品库功能介绍',
            metadata: { 
                importance: 'normal', 
                category: 'feature',
                estimatedDuration: 15
            }
        },
        
        {
            id: 'contact-records',
            element: '.menu-item:nth-child(3)',
            title: '👥 建联记录',
            icon: 'fa-users',
            description: `
                建联记录帮您管理与网红博主的完整合作流程：
                <br><br><i class="fas fa-search text-blue-500"></i> <strong>联系历史</strong> - 查看往来记录
                <br><i class="fas fa-tasks text-green-500"></i> <strong>跟踪进度</strong> - 监控合作状态
                <br><i class="fas fa-envelope text-purple-500"></i> <strong>管理邮件</strong> - 统一沟通管理
                <br><i class="fas fa-chart-bar text-orange-500"></i> <strong>效果分析</strong> - 评估合作成果
                <br><br>从初次接触到合作完成，全程可视化管理让您不错过任何重要进展。
            `,
            position: 'right',
            showButtons: ['previous', 'next'],
            className: 'guide-step-contacts',
            ariaLabel: '建联记录功能介绍',
            metadata: { 
                importance: 'normal', 
                category: 'feature',
                estimatedDuration: 15
            }
        },
        
        {
            id: 'ai-assistant',
            element: '#ai-assistant-menu',
            title: '🤖 AI助手',
            icon: 'fa-robot',
            description: `
                这是我们的<strong>核心功能</strong>！AI助手为您提供全方位的智能服务：
                <br><br><i class="fas fa-search text-green-500"></i> <strong>智能产品分析</strong> - 自动解析商品特点、目标受众、卖点提炼
                <br><i class="fas fa-user-friends text-purple-500"></i> <strong>精准博主推荐</strong> - 基于产品特性匹配最合适的合作伙伴
                <br><i class="fas fa-envelope text-blue-500"></i> <strong>个性化邮件生成</strong> - 自动生成专业的建联邮件模板
                <br><i class="fas fa-chart-line text-orange-500"></i> <strong>数据分析洞察</strong> - 提供市场趋势和竞争分析
                <br><br><strong>🚀 大大提高您的工作效率，让跨境推广变得更简单！</strong>
            `,
            position: 'right',
            showButtons: ['previous', 'next'],
            className: 'guide-step-ai guide-step-feature',
            ariaLabel: 'AI助手功能介绍',
            metadata: { 
                importance: 'critical', 
                category: 'feature',
                estimatedDuration: 25
            }
        },
        
        {
            id: 'ai-new-chat',
            element: '.new-chat',
            title: '💬 开始商品分析',
            icon: 'fa-comment-plus',
            description: `
                现在让我们开始第一次商品分析！点击这里可以创建新的分析会话。
                <br><br><strong>📝 使用方法：</strong>
                <br><i class="fas fa-link text-blue-500"></i> <strong>粘贴商品链接</strong> - 支持亚马逊、eBay、独立站等
                <br><i class="fas fa-language text-green-500"></i> <strong>输入产品描述</strong> - 用文字描述您的产品
                <br><i class="fas fa-magic text-purple-500"></i> <strong>AI自动分析</strong> - 获得详细的产品分析报告
                <br><br><strong>🎯 接下来请尝试：</strong>
                <br>1. 点击"新建商品分析"按钮
                <br>2. 在输入框中粘贴一个商品链接
                <br>3. 点击发送开始您的第一次AI分析体验！
                <br><br><i class="fas fa-rocket text-orange-500"></i> 
                <strong>建议：</strong>可以先使用平台提供的"试用演示"功能体验完整流程。
            `,
            position: 'bottom',
            showButtons: ['previous', 'next'],
            className: 'guide-step-new-chat guide-step-action',
            ariaLabel: '开始商品分析指导',
            metadata: { 
                importance: 'critical', 
                isActionStep: true, 
                category: 'action',
                estimatedDuration: 20
            }
        },
        
        {
            id: 'completion',
            element: 'body',
            title: '🎉 引导完成！',
            icon: 'fa-party-horn',
            description: `
                恭喜您完成了平台功能介绍！现在您已经了解了所有主要功能模块。
                <br><br><strong>🎯 下一步建议：</strong>
                <br><i class="fas fa-play-circle text-green-500"></i> <strong>开始第一次商品分析</strong> - 立即体验AI助手功能
                <br><i class="fas fa-plus text-blue-500"></i> <strong>添加产品到产品库</strong> - 建立您的商品档案
                <br><i class="fas fa-cog text-gray-500"></i> <strong>完善账户设置</strong> - 配置邮箱和偏好设置
                <br><br><i class="fas fa-redo text-blue-500"></i> 
                如需重新观看引导，可点击用户头像菜单中的<strong>"新手引导"</strong>选项。
                <br><br><i class="fas fa-heart text-red-500"></i> 
                <strong>祝您使用愉快，跨境推广事业蒸蒸日上！</strong>
            `,
            position: 'center',
            showButtons: ['done'],
            className: 'guide-step-complete',
            keyboardHint: '按 Enter 键或点击完成按钮结束引导',
            ariaLabel: '引导完成',
            metadata: { 
                importance: 'normal', 
                category: 'completion',
                estimatedDuration: 15
            }
        }
    ],
    
    // 回调函数配置
    callbacks: {
        onStart: function() {
            console.log('新手引导开始');
            // 可以在这里发送分析事件
        },
        
        onStepChange: function(step, index, direction) {
            console.log(`进入第${index + 1}步: ${step.title}，方向: ${direction || 'forward'}`);
            // 记录步骤切换事件
        },
        
        onComplete: function() {
            console.log('新手引导完成');
            // 标记用户完成引导
            localStorage.setItem('guide_completed', 'true');
            localStorage.setItem('guide_completed_at', Date.now());
        },
        
        onSkip: function(currentStep, index) {
            console.log(`用户在第${index + 1}步跳过引导，当前步骤: ${currentStep?.title || '未知'}`);
            // 记录跳过事件
        },

        onAbandon: function(currentStep, index) {
            console.log(`用户在第${index + 1}步放弃引导，当前步骤: ${currentStep?.title || '未知'}`);
            // 记录放弃事件
        },

        onStepTimeout: function(step, index) {
            console.log(`第${index + 1}步自动超时进入下一步，步骤: ${step?.title || '未知'}`);
            // 记录自动进入事件
        }
    },
    
    // 按钮文本配置
    buttonTexts: {
        next: '下一步',
        previous: '上一步',
        skip: '跳过',
        done: '完成',
        close: '关闭'
    },
    
    // 用户类型适配
    userTypeAdaptation: {
        new_user: {
            showAllSteps: true,
            autoAdvanceDelay: 15000,
            emphasizeCriticalSteps: true
        },
        returning_user: {
            showAllSteps: false,
            skipBasicSteps: true,
            focusOnNewFeatures: true
        },
        experienced_user: {
            showQuickTour: true,
            autoAdvanceDelay: 8000,
            highlightChanges: true
        }
    },
    
    // 个性化设置
    personalization: {
        adaptToUserBehavior: true,
        rememberPreferences: true,
        smartSkipping: true,
        contextualHelp: true
    }
};

// 工具函数：检测用户类型
function detectUserType() {
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
    const hasCompletedGuide = localStorage.getItem('guide_completed');
    const lastVisit = localStorage.getItem('last_visit');

    // 检查是否是新用户
    if (visitCount === 0) {
        return 'new_user';
    }

    // 检查是否是回访新用户
    if (visitCount < 5 && !hasCompletedGuide) {
        return 'returning_user';
    }

    // 检查是否是经验用户（考虑最后访问时间）
    if (visitCount > 20) {
        const daysSinceLastVisit = lastVisit ?
            (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24) : 0;

        return daysSinceLastVisit > 30 ? 'returning_experienced' : 'experienced_user';
    }

    return 'regular_user';
}

// 工具函数：更新访问统计
function updateVisitStats() {
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0') + 1;
    localStorage.setItem('visit_count', visitCount.toString());
    localStorage.setItem('last_visit', Date.now().toString());
}

// 页面加载时更新统计
updateVisitStats(); 