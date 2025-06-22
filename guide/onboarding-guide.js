/**
 * 新手引导系统核心类
 * 基于 guide card.html 的现代设计升级版本
 * 实现完整的引导流程控制和交互功能
 */

class OnboardingGuide {
    constructor(config) {
        // 输入验证和错误处理
        if (!config || typeof config !== 'object') {
            throw new Error('OnboardingGuide: 配置对象是必需的');
        }

        if (!config.steps || !Array.isArray(config.steps) || config.steps.length === 0) {
            throw new Error('OnboardingGuide: 至少需要一个引导步骤');
        }

        this.config = config;
        this.currentStep = 0;
        this.steps = config.steps;
        this.isActive = false;
        this.autoAdvanceTimer = null;
        this.elements = {};
        this.performanceMetrics = {
            startTime: null,
            stepTimes: [],
            errors: []
        };

        // 绑定方法上下文
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.handleError = this.handleError.bind(this);

        // 初始化
        try {
            this.init();
        } catch (error) {
            this.handleError('初始化失败', error);
        }
    }
    
    /**
     * 初始化引导系统
     */
    init() {
        try {
            this.preloadElements();
            this.setupErrorHandling();
            this.setupPerformanceMonitoring();
        } catch (error) {
            this.handleError('初始化过程中发生错误', error);
        }
    }

    /**
     * 设置错误处理
     */
    setupErrorHandling() {
        // 全局错误捕获
        window.addEventListener('error', (event) => {
            if (this.isActive) {
                this.handleError('全局错误', event.error);
            }
        });

        // Promise 错误捕获
        window.addEventListener('unhandledrejection', (event) => {
            if (this.isActive) {
                this.handleError('未处理的Promise拒绝', event.reason);
            }
        });
    }

    /**
     * 设置性能监控
     */
    setupPerformanceMonitoring() {
        // 监控内存使用
        if (performance.memory) {
            this.initialMemory = performance.memory.usedJSHeapSize;
        }
    }

    /**
     * 错误处理器
     */
    handleError(message, error) {
        console.error(`OnboardingGuide Error: ${message}`, error);

        // 记录错误
        this.performanceMetrics.errors.push({
            message,
            error: error?.message || error,
            timestamp: Date.now(),
            step: this.currentStep
        });

        // 如果错误严重，停止引导
        if (this.isActive && this.performanceMetrics.errors.length > 5) {
            console.warn('OnboardingGuide: 错误过多，自动停止引导');
            this.stop();
        }
    }
    
    /**
     * 预加载元素
     */
    preloadElements() {
        // 验证所有步骤的选择器
        this.steps.forEach((step, index) => {
            if (step.element && step.element !== 'body' && step.element !== 'center') {
                const element = document.querySelector(step.element);
                if (!element) {
                    console.warn(`引导步骤 ${index + 1}: 找不到元素 "${step.element}"`);
                }
            }
        });
    }
    
    /**
     * 检查是否应该显示引导
     */
    shouldShowGuide() {
        // 检查localStorage是否已完成引导
        const completedGuides = JSON.parse(localStorage.getItem('completed_guides') || '{}');
        const hasCompleted = completedGuides[this.config.name];
        
        // 检查当前版本
        const lastVersion = localStorage.getItem('guide_version');
        const isNewVersion = lastVersion !== this.config.version;
        
        // 统计用户类型
        this.updateUserStats();
        
        return !hasCompleted || isNewVersion;
    }
    
    /**
     * 更新用户统计
     */
    updateUserStats() {
        const stats = JSON.parse(localStorage.getItem('guide_stats') || '{}');
        const today = new Date().toDateString();
        
        if (!stats.firstVisit) {
            stats.firstVisit = today;
            stats.userType = 'new';
        } else if (stats.lastVisit !== today) {
            stats.userType = 'returning';
        }
        
        stats.lastVisit = today;
        stats.visitCount = (stats.visitCount || 0) + 1;
        
        localStorage.setItem('guide_stats', JSON.stringify(stats));
    }
    
    /**
     * 开始引导
     */
    start() {
        if (this.isActive) return;

        try {
            this.isActive = true;
            this.currentStep = 0;
            this.performanceMetrics.startTime = performance.now();

            // 创建引导界面
            this.createOverlay();
            this.createTooltip();

            // 绑定事件
            this.bindEvents();

            // 显示第一步
            this.showStep(0);

            // 触发开始事件
            this.triggerEvent('guide:start', {
                guide: this.config.name,
                totalSteps: this.steps.length,
                startTime: this.performanceMetrics.startTime
            });

            // 性能监控
            this.monitorPerformance();

        } catch (error) {
            this.handleError('启动引导失败', error);
            this.isActive = false;
        }
    }
    
    /**
     * 重新开始引导
     */
    restart() {
        this.stop();
        setTimeout(() => this.start(), 100);
    }
    
    /**
     * 停止引导
     */
    stop() {
        if (!this.isActive) return;

        try {
            this.isActive = false;
            this.clearAutoAdvanceTimer();
            this.unbindEvents();
            this.removeElements();

            // 清理性能监控
            this.cleanupPerformanceMonitoring();

            this.triggerEvent('guide:stop', {
                guide: this.config.name,
                stoppedAt: this.currentStep + 1,
                performanceMetrics: this.getPerformanceReport()
            });

        } catch (error) {
            this.handleError('停止引导时发生错误', error);
        }
    }

    /**
     * 性能监控
     */
    monitorPerformance() {
        if (!performance.memory) return;

        this.performanceTimer = setInterval(() => {
            const currentMemory = performance.memory.usedJSHeapSize;
            const memoryIncrease = currentMemory - this.initialMemory;

            // 如果内存增长超过10MB，发出警告
            if (memoryIncrease > 10 * 1024 * 1024) {
                console.warn('OnboardingGuide: 内存使用量过高', {
                    initial: this.initialMemory,
                    current: currentMemory,
                    increase: memoryIncrease
                });
            }
        }, 5000);
    }

    /**
     * 清理性能监控
     */
    cleanupPerformanceMonitoring() {
        if (this.performanceTimer) {
            clearInterval(this.performanceTimer);
            this.performanceTimer = null;
        }
    }

    /**
     * 获取性能报告
     */
    getPerformanceReport() {
        const endTime = performance.now();
        const totalTime = endTime - (this.performanceMetrics.startTime || endTime);

        return {
            totalTime,
            stepTimes: this.performanceMetrics.stepTimes,
            errors: this.performanceMetrics.errors,
            memoryUsage: performance.memory ? {
                initial: this.initialMemory,
                current: performance.memory.usedJSHeapSize,
                increase: performance.memory.usedJSHeapSize - this.initialMemory
            } : null
        };
    }
    
    /**
     * 创建遮罩层
     */
    createOverlay() {
        this.elements.overlay = document.createElement('div');
        this.elements.overlay.className = 'guide-overlay';
        this.elements.overlay.setAttribute('aria-hidden', 'true');
        
        // 点击遮罩进入下一步
        if (this.config.settings.clickMaskToNext) {
            this.elements.overlay.addEventListener('click', (e) => {
                if (e.target === this.elements.overlay) {
                    this.nextStep();
                }
            });
        }
        
        document.body.appendChild(this.elements.overlay);
        
        // 延迟激活以触发动画
        requestAnimationFrame(() => {
            this.elements.overlay.classList.add('active');
        });
    }
    
    /**
     * 创建提示框
     */
    createTooltip() {
        this.elements.tooltip = document.createElement('div');
        this.elements.tooltip.className = 'guide-tooltip';
        this.elements.tooltip.setAttribute('role', 'dialog');
        this.elements.tooltip.setAttribute('aria-modal', 'true');
        
        document.body.appendChild(this.elements.tooltip);
    }
    
    /**
     * 显示指定步骤
     */
    showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.steps.length) return;
        
        this.currentStep = stepIndex;
        const step = this.steps[stepIndex];
        
        // 清除之前的高亮
        this.removeHighlight();
        
        // 高亮元素
        if (step.element && step.element !== 'center') {
            this.highlightElement(step.element);
        }
        
        // 更新提示框内容
        this.updateTooltipContent(step);
        
        // 定位提示框
        this.positionTooltip(step);
        
        // 显示提示框
        requestAnimationFrame(() => {
            this.elements.tooltip.classList.add('active');
        });
        
        // 设置自动进入下一步
        if (this.config.settings.autoAdvanceDelay > 0 && stepIndex < this.steps.length - 1) {
            this.setAutoAdvanceTimer();
        }
        
        // 无障碍播报
        this.announceStep(step, stepIndex);
        
        // 触发步骤显示事件
        this.triggerEvent('guide:step:show', {
            step: stepIndex + 1,
            total: this.steps.length,
            stepData: step
        });
    }
    
    /**
     * 高亮元素
     */
    highlightElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`找不到要高亮的元素: ${selector}`);
            return;
        }
        
        // 创建高亮框
        this.elements.highlight = document.createElement('div');
        this.elements.highlight.className = 'guide-highlight';
        
        // 特殊步骤的高亮效果
        const step = this.steps[this.currentStep];
        if (step.metadata?.importance === 'critical') {
            this.elements.highlight.classList.add('pulse');
        }
        
        // 计算位置
        const rect = element.getBoundingClientRect();
        const padding = this.config.settings.highlightPadding || 8;
        
        Object.assign(this.elements.highlight.style, {
            left: (rect.left - padding) + 'px',
            top: (rect.top - padding) + 'px',
            width: (rect.width + padding * 2) + 'px',
            height: (rect.height + padding * 2) + 'px'
        });
        
        document.body.appendChild(this.elements.highlight);
        
        // 平滑滚动到元素
        if (this.config.settings.enableSmoothScrolling) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
    
    /**
     * 移除高亮
     */
    removeHighlight() {
        if (this.elements.highlight) {
            this.elements.highlight.remove();
            delete this.elements.highlight;
        }
    }
    
    /**
     * 更新提示框内容
     */
    updateTooltipContent(step) {
        const stepIndex = this.currentStep;
        const totalSteps = this.steps.length;
        const progress = ((stepIndex + 1) / totalSteps) * 100;
        
        this.elements.tooltip.innerHTML = `
            <div class="guide-header">
                <div class="guide-icon">
                    ${step.icon ? `<i class="fas ${step.icon}"></i>` : '🎯'}
                </div>
                <div class="content">
                    <h2 class="guide-title">${step.title}</h2>
                </div>
            </div>
            
            ${this.config.settings.showCloseButton ? `
                <button class="guide-close" aria-label="关闭引导"></button>
            ` : ''}

            ${this.config.settings.allowSkip ? `
                <button class="guide-skip-btn" aria-label="跳过引导">跳过</button>
            ` : ''}

            <div class="guide-content">
                ${step.description}
            </div>

            ${this.config.settings.showProgress ? `
                <div class="guide-progress">
                    <div class="guide-progress-text">第 ${stepIndex + 1} 步，共 ${totalSteps} 步</div>
                    <div class="guide-progress-bar">
                        <div class="guide-progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            ` : ''}

            <div class="guide-footer">
                <div class="guide-buttons">
                    ${this.buildButtons(step.showButtons)}
                </div>
            </div>
            
            ${this.config.settings.allowKeyboardNav && step.keyboardHint ? `
                <div class="guide-keyboard-hint">${step.keyboardHint}</div>
            ` : ''}
        `;
        
        // 应用特殊样式类
        this.elements.tooltip.className = `guide-tooltip ${step.className || ''}`;
        
        // 绑定按钮事件
        this.bindButtonEvents();
    }
    
    /**
     * 构建按钮HTML
     */
    buildButtons(showButtons = ['next']) {
        let buttonsHtml = '';
        
        if (showButtons.includes('previous') && this.currentStep > 0) {
            buttonsHtml += `<button class="guide-btn guide-btn-secondary" data-action="previous">上一步</button>`;
        }
        
        if (showButtons.includes('next')) {
            const isLastStep = this.currentStep === this.steps.length - 1;
            const buttonText = isLastStep ? '完成' : '下一步';
            const buttonAction = isLastStep ? 'complete' : 'next';
            buttonsHtml += `<button class="guide-btn guide-btn-primary" data-action="${buttonAction}">${buttonText}</button>`;
        }
        
        if (showButtons.includes('skip') && this.config.settings.allowSkip) {
            buttonsHtml += `<button class="guide-btn guide-btn-secondary" data-action="skip">跳过</button>`;
        }
        
        return buttonsHtml;
    }
    
    /**
     * 绑定按钮事件
     */
    bindButtonEvents() {
        // 按钮点击事件
        this.elements.tooltip.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action) {
                // 添加按钮点击反馈
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 100);
                
                this.handleButtonAction(action);
            }
        });
        
        // 关闭按钮
        const closeBtn = this.elements.tooltip.querySelector('.guide-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.stop());
        }

        // 跳过按钮（新的显著位置）
        const skipBtn = this.elements.tooltip.querySelector('.guide-skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skip());
        }

        // 跳过链接（保留作为备选）
        const skipLink = this.elements.tooltip.querySelector('.guide-skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', () => this.skip());
        }
    }
    
    /**
     * 处理按钮动作
     */
    handleButtonAction(action) {
        this.clearAutoAdvanceTimer();
        
        switch (action) {
            case 'next':
                this.nextStep();
                break;
            case 'previous':
                this.previousStep();
                break;
            case 'complete':
                this.complete();
                break;
            case 'skip':
                this.skip();
                break;
            case 'abandon':
                this.abandon();
                break;
        }
    }
    
    /**
     * 下一步
     */
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.complete();
        }
    }
    
    /**
     * 上一步
     */
    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    /**
     * 跳过引导
     */
    skip() {
        if (confirm('确定要跳过新手引导吗？')) {
            this.markAsCompleted();
            this.stop();
            
            this.triggerEvent('guide:skip', {
                guide: this.config.name,
                skippedAt: this.currentStep + 1
            });
        }
    }
    
    /**
     * 放弃引导
     */
    abandon() {
        this.stop();
        
        this.triggerEvent('guide:abandon', {
            guide: this.config.name,
            abandonedAt: this.currentStep + 1
        });
    }
    
    /**
     * 完成引导
     */
    complete() {
        this.markAsCompleted();
        this.stop();
        
        this.triggerEvent('guide:complete', {
            guide: this.config.name,
            completedSteps: this.steps.length
        });
        
        // 显示完成消息
        setTimeout(() => {
            alert('🎉 恭喜！您已完成新手引导！现在可以开始使用跨境运营助手了。');
        }, 200);
    }
    
    /**
     * 标记为已完成
     */
    markAsCompleted() {
        const completedGuides = JSON.parse(localStorage.getItem('completed_guides') || '{}');
        completedGuides[this.config.name] = true;
        localStorage.setItem('completed_guides', JSON.stringify(completedGuides));
        localStorage.setItem('guide_version', this.config.version);
    }
    
    /**
     * 定位提示框
     */
    positionTooltip(step) {
        if (step.position === 'center' || step.element === 'center') {
            // 居中显示
            Object.assign(this.elements.tooltip.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '480px',
                width: 'calc(100vw - 32px)'
            });
            return;
        }
        
        const targetElement = document.querySelector(step.element);
        if (!targetElement) {
            console.warn(`找不到目标元素: ${step.element}`);
            return;
        }
        
        const targetRect = targetElement.getBoundingClientRect();
        const tooltipRect = this.elements.tooltip.getBoundingClientRect();
        
        // 计算最佳位置
        const position = this.calculateBestPosition(targetRect, tooltipRect, step.position);
        const coords = this.calculateTooltipPosition(targetRect, tooltipRect, position);
        
        // 应用位置
        Object.assign(this.elements.tooltip.style, {
            position: 'fixed',
            left: coords.x + 'px',
            top: coords.y + 'px',
            transform: 'none'
        });
        
        // 添加箭头
        this.addTooltipArrow(position);
    }
    
    /**
     * 计算最佳位置
     */
    calculateBestPosition(targetRect, tooltipRect, preferredPosition) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 20;
        
        // 可用空间检查
        const spaces = {
            top: targetRect.top - margin,
            bottom: viewportHeight - targetRect.bottom - margin,
            left: targetRect.left - margin,
            right: viewportWidth - targetRect.right - margin
        };
        
        // 如果首选位置有足够空间，使用首选位置
        if (preferredPosition && this.hasEnoughSpace(spaces, tooltipRect, preferredPosition)) {
            return preferredPosition;
        }
        
        // 自动选择最佳位置
        if (spaces.bottom >= tooltipRect.height) return 'bottom';
        if (spaces.top >= tooltipRect.height) return 'top';
        if (spaces.right >= tooltipRect.width) return 'right';
        if (spaces.left >= tooltipRect.width) return 'left';
        
        return 'bottom'; // 默认位置
    }
    
    /**
     * 检查是否有足够空间
     */
    hasEnoughSpace(spaces, tooltipRect, position) {
        switch (position) {
            case 'top':
            case 'bottom':
                return spaces[position] >= tooltipRect.height;
            case 'left':
            case 'right':
                return spaces[position] >= tooltipRect.width;
            default:
                return false;
        }
    }
    
    /**
     * 计算提示框位置坐标
     */
    calculateTooltipPosition(targetRect, tooltipRect, position) {
        const margin = 15;
        let x, y;
        
        switch (position) {
            case 'top':
                x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                y = targetRect.top - tooltipRect.height - margin;
                break;
                
            case 'bottom':
                x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                y = targetRect.bottom + margin;
                break;
                
            case 'left':
                x = targetRect.left - tooltipRect.width - margin;
                y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                break;
                
            case 'right':
                x = targetRect.right + margin;
                y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                break;
                
            default:
                x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                y = targetRect.bottom + margin;
        }
        
        // 边界检查
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 20;
        
        x = Math.max(padding, Math.min(viewportWidth - tooltipRect.width - padding, x));
        y = Math.max(padding, Math.min(viewportHeight - tooltipRect.height - padding, y));
        
        return { x, y };
    }
    
    /**
     * 添加提示框箭头
     */
    addTooltipArrow(position) {
        // 移除已存在的箭头
        const existingArrow = this.elements.tooltip.querySelector('.guide-tooltip-arrow');
        if (existingArrow) {
            existingArrow.remove();
        }
        
        if (position === 'center') return;
        
        const arrow = document.createElement('div');
        arrow.className = `guide-tooltip-arrow ${position}`;
        this.elements.tooltip.appendChild(arrow);
    }
    
    /**
     * 设置自动进入下一步定时器
     */
    setAutoAdvanceTimer() {
        this.clearAutoAdvanceTimer();
        
        const delay = this.config.settings.autoAdvanceDelay;
        if (delay > 0) {
            this.autoAdvanceTimer = setTimeout(() => {
                this.nextStep();
            }, delay);
        }
    }
    
    /**
     * 清除自动进入定时器
     */
    clearAutoAdvanceTimer() {
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        if (this.config.settings.allowKeyboardNav) {
            document.addEventListener('keydown', this.handleKeyDown);
        }
        
        window.addEventListener('resize', this.handleResize);
        
        // 鼠标悬停暂停自动进入
        if (this.config.settings.pauseOnHover) {
            this.elements.tooltip.addEventListener('mouseenter', () => {
                this.clearAutoAdvanceTimer();
            });
            
            this.elements.tooltip.addEventListener('mouseleave', () => {
                if (this.isActive && this.currentStep < this.steps.length - 1) {
                    this.setAutoAdvanceTimer();
                }
            });
        }
    }
    
    /**
     * 解绑事件监听器
     */
    unbindEvents() {
        document.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.handleResize);
    }
    
    /**
     * 处理键盘事件
     */
    handleKeyDown(e) {
        if (!this.isActive) return;
        
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.stop();
                break;
                
            case 'ArrowLeft':
                e.preventDefault();
                this.previousStep();
                break;
                
            case 'ArrowRight':
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.nextStep();
                break;
                
            case 'Tab':
                // 允许在提示框内导航
                const focusableElements = this.elements.tooltip.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length > 0) {
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
                break;
        }
    }
    
    /**
     * 处理窗口大小调整
     */
    handleResize() {
        if (!this.isActive) return;
        
        // 重新定位高亮和提示框
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            const currentStep = this.steps[this.currentStep];
            
            // 重新高亮元素
            if (currentStep.element && currentStep.element !== 'center') {
                this.removeHighlight();
                this.highlightElement(currentStep.element);
            }
            
            // 重新定位提示框
            this.positionTooltip(currentStep);
        }, 100);
    }
    
    /**
     * 无障碍播报步骤
     */
    announceStep(step, index) {
        const announcement = document.createElement('div');
        announcement.className = 'guide-sr-only';
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `步骤 ${index + 1}，共 ${this.steps.length} 步：${step.title}`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
    
    /**
     * 触发自定义事件
     */
    triggerEvent(eventName, detail) {
        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }
    
    /**
     * 清理所有元素
     */
    removeElements() {
        // 移除遮罩层
        if (this.elements.overlay) {
            this.elements.overlay.classList.remove('active');
            setTimeout(() => {
                if (this.elements.overlay) {
                    this.elements.overlay.remove();
                    delete this.elements.overlay;
                }
            }, 300);
        }
        
        // 移除提示框
        if (this.elements.tooltip) {
            this.elements.tooltip.classList.remove('active');
            setTimeout(() => {
                if (this.elements.tooltip) {
                    this.elements.tooltip.remove();
                    delete this.elements.tooltip;
                }
            }, 300);
        }
        
        // 移除高亮
        this.removeHighlight();
    }
}

// 全局暴露类
window.OnboardingGuide = OnboardingGuide; 